Ext.namespace('GeoNetwork');

var catalogue;
var app;
var cookie;

GeoNetwork.app = function () {
    // private vars:
    var geonetworkUrl;
    var searching = false;
    var editorWindow;
    var editorPanel;
    
    /**
     * Application parameters are :
     *
     *  * any search form ids (eg. any)
     *  * mode=1 for visualization
     *  * advanced: to open advanced search form by default
     *  * search: to trigger the search
     *  * uuid: to display a metadata record based on its uuid
     *  * extent: to set custom map extent
     */
    var urlParameters = {};
    /**
     * Catalogue manager
     */
    var catalogue;
    /**
     * An interactive map panel for data visualization
     */
    var iMap, searchForm, resultsPanel, metadataResultsView, tBar, bBar,
        mainTagCloudViewPanel, tagCloudViewPanel, infoPanel,
        visualizationModeInitialized = false;
    
    // private function:
    /**
     * Create a radio button switch in order to change perspective from a search
     * mode to a map visualization mode.
     */
    function createModeSwitcher() {
        var ms = {
            xtype: 'radiogroup',
            id: 'ms',
            hidden: !GeoNetwork.MapModule,
            items: [{
                name: 'mode',
                ctCls: 'mn-main',
                boxLabel: OpenLayers.i18n('discovery'),
                id: 'discoveryMode',
                width: 110,
                inputValue: 0,
                checked: true
            }, {
                name: 'mode',
                ctCls: 'mn-main',
                width: 140,
                boxLabel: OpenLayers.i18n('visualization'),
                id: 'visualizationMode',
                inputValue: 1
            }],
            listeners: {
                change: function (rg, checked) {
                    app.switchMode(checked.getGroupValue(), false);
                    /* TODO : update viewport */
                }
            }
        };
        
        return new Ext.form.FormPanel({
            renderTo: 'mode-form',
            border: false,
            layout: 'hbox',
            items: ms
        });
    }
    
    /**
     * Create a language switcher mode
     *
     * @return
     */
    function createLanguageSwitcher(lang) {
        return new Ext.form.FormPanel({
            renderTo: 'lang-form',
            width: 80,
            border: false,
            layout: 'hbox',
            hidden:  GeoNetwork.Util.locales.length === 1 ? true : false,
            items: [new Ext.form.ComboBox({
                mode: 'local',
                triggerAction: 'all',
                width: 80,
                store: new Ext.data.ArrayStore({
                    idIndex: 2,
                    fields: ['id', 'name', 'id2'],
                    data: GeoNetwork.Util.locales
                }),
                valueField: 'id2',
                displayField: 'name',
                value: lang,
                listeners: {
                    select: function (cb, record, idx){
                        window.location.replace('?hl=' + cb.getValue());
                    }
                }
            })]
        });
    }
    
    
    /**
     * Create a default login form and register extra events in case of error.
     *
     * @return
     */
    function createLoginForm() {
        var loginForm = new GeoNetwork.LoginForm({
            renderTo: 'login-form',
            catalogue: catalogue,
            width: 300,
            layout: 'form'
        });
        
        catalogue.on('afterBadLogin', loginAlert, this);
        // Store user info in cookie to be displayed if user reload the page
        // Register events to set cookie values
        catalogue.on('afterLogin', function(){
            cookie.set('user', catalogue.identifiedUser);
        });
        catalogue.on('afterLogout', function(){
            cookie.set('user', undefined);
        });
        
        // Refresh login form if needed
        var user = cookie.get('user');
        if (user) {
            catalogue.identifiedUser = user;
            loginForm.login(catalogue, true);
        }
    }
    /**
     * Create latest metadata panel.
     */
    function createLatestUpdate(){
        var latestView = new GeoNetwork.MetadataResultsView({
            catalogue: catalogue,
            height: 500,
            autoScroll: true,
            tpl: EEA.Templates.THUMBNAIL
        });
        var latestStore = GeoNetwork.Settings.mdStore();
        latestView.setStore(latestStore);
        latestStore.on('load', function(){
            Ext.ux.Lightbox.register('a[rel^=lightbox]');
        });
        new Ext.Panel({
            border: false,
            bodyCssClass: 'md-view',
            items: latestView,
            renderTo: 'latest'
        });
        catalogue.kvpSearch(GeoNetwork.Settings.latestQuery, null, null, null, true, latestView.getStore());
    }
    /**
     * Error message in case of bad login
     *
     * @param cat
     * @param user
     * @return
     */
    function loginAlert(cat, user) {
        Ext.Msg.show({
            title: 'Login',
            msg: 'Login failed. Check your username and password.',
            /* TODO : Get more info about the error */
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.MessageBox.OK
        });
    }
    
    /**
     * Create a default search form with advanced mode button
     *
     * @return
     */
    function createSearchForm() {
        
                // Add advanced mode criteria to simple form - start
        var advancedCriteria = [];
        var services = catalogue.services;
        var orgNameStore = new GeoNetwork.data.OpenSearchSuggestionStore({
            url: services.opensearchSuggest,
            rootId: 1,
            baseParams: {
                field: 'orgName'
            }
        });
        var orgNameField = new Ext.ux.form.SuperBoxSelect({
            hideLabel: false,
            minChars: 0,
            queryParam: 'q',
            hideTrigger: false,
            id: 'E_orgName',
            name: 'E_orgName',
            store: orgNameStore,
            valueField: 'value',
            displayField: 'value',
            valueDelimiter: ' or ',
//            tpl: tpl,
            fieldLabel: OpenLayers.i18n('org')
        });
        
        
        
        
        // Multi select keyword
        var themekeyStore = new GeoNetwork.data.OpenSearchSuggestionStore({
            url: services.opensearchSuggest,
            rootId: 1,
            baseParams: {
                field: 'keyword'
            }
        });
//        FIXME : could not underline current search criteria in tpl
//        var tpl = '<tpl for="."><div class="x-combo-list-item">' + 
//            '{[values.value.replace(Ext.getDom(\'E_themekey\').value, \'<span>\' + Ext.getDom(\'E_themekey\').value + \'</span>\')]}' + 
//          '</div></tpl>';
        var themekeyField = new Ext.ux.form.SuperBoxSelect({
            hideLabel: false,
            minChars: 0,
            queryParam: 'q',
            hideTrigger: false,
            id: 'E_themekey',
            name: 'E_themekey',
            store: themekeyStore,
            valueField: 'value',
            displayField: 'value',
            valueDelimiter: ' or ',
//            tpl: tpl,
            fieldLabel: OpenLayers.i18n('keyword')
//            FIXME : Allow new data is not that easy
//            allowAddNewData: true,
//            addNewDataOnBlur: true,
//            listeners: {
//                newitem: function (bs,v, f){
//                    var newObj = {
//                            value: v
//                        };
//                    bs.addItem(newObj, true);
//                }
//            }
        });
        
        var when = new Ext.form.FieldSet({
            title: OpenLayers.i18n('when'),
            autoWidth: true,
            //layout: 'row',
            defaultType: 'datefield',
            collapsible: true,
            collapsed: true,
            items: GeoNetwork.util.SearchFormTools.getWhen()
        });
        
        
        var catalogueField = GeoNetwork.util.SearchFormTools.getCatalogueField(services.getSources, services.logoUrl, true);
        var groupField = GeoNetwork.util.SearchFormTools.getGroupField(services.getGroups, true);
        var metadataTypeField = GeoNetwork.util.SearchFormTools.getMetadataTypeField(true);
        //var categoryField = GeoNetwork.util.SearchFormTools.getCategoryField(services.getCategories, '../../apps/images/default/category/');
        var validField = GeoNetwork.util.SearchFormTools.getValidField(true);
        var spatialTypes = GeoNetwork.util.SearchFormTools.getSpatialRepresentationTypeField([['grid', OpenLayers.i18n('grid')], 
                                                                                              ['textTabled', OpenLayers.i18n('textTable')], 
                                                                                              ['vector', OpenLayers.i18n('vector')] 
                                                                                              ], true);
        var denominatorField = GeoNetwork.util.SearchFormTools.getScaleDenominatorField(true);
        var typeCodeList = GeoNetwork.util.SearchFormTools.getTypesField(null, true);
        
        // Add hidden fields to be use by quick metadata links from the admin panel (eg. my metadata).
        var ownerField = new Ext.form.TextField({
            name: 'E__owner',
            hidden: true
        });
        var isHarvestedField = new Ext.form.TextField({
            name: 'E__isHarvested',
            hidden: true
        });
        
        advancedCriteria.push(themekeyField, orgNameField, typeCodeList, //categoryField, 
                                when, spatialTypes, denominatorField,
                                catalogueField, groupField, 
                                metadataTypeField, validField, ownerField, isHarvestedField);
        var adv = {
            xtype: 'fieldset',
            title: OpenLayers.i18n('advancedSearchOptions'),
            autoHeight: true,
            autoWidth: true,
            collapsible: true,
            collapsed: (urlParameters.advanced ? false : true),
            defaultType: 'checkbox',
            defaults: {
                width: 160
            },
            items: advancedCriteria
        };
        
        var inspire = {
                xtype: 'fieldset',
                title: OpenLayers.i18n('inspireSearchOptions'),
                autoHeight: true,
                autoWidth: true,
                collapsible: true,
                collapsed: (urlParameters.inspire ? false : true),
                defaultType: 'checkbox',
                defaults: {
                    width: 160
                },
                items: GeoNetwork.util.INSPIRESearchFormTools.getINSPIREFields(catalogue.services, true, {withAnnex: true, withRelated: true, withTheme: true})
            };
        var formItems = [];
        
        var any_or_id = new GeoNetwork.form.OpenSearchSuggestionTextField({
            hideLabel: true,
            width: 285,
            minChars: 2,
            loadingText: '...',
            hideTrigger: true,
            url: services.opensearchSuggest,
            name: 'E_any_OR_identifier'
        });
        var mapField = GeoNetwork.util.SearchFormTools.getSimpleMap(GeoNetwork.map.BACKGROUND_LAYERS, GeoNetwork.map.MAP_OPTIONS, GeoNetwork.searchDefault.activeMapControlExtent, {width: 290}, false);
        
        var opts = GeoNetwork.util.SearchFormTools.getOptions(catalogue.services);
        
        formItems.push(any_or_id, mapField, opts,
                    inspire, adv);
        // Add advanced mode criteria to simple form - end
        
        
        // Hide or show extra fields after login event
        var adminFields = [groupField, metadataTypeField, validField];
        Ext.each(adminFields, function (item) {
            item.setVisible(false);
        });
        
        catalogue.on('afterLogin', function () {
            Ext.each(adminFields, function (item) {
                item.setVisible(true);
            });
        });
        catalogue.on('afterLogout', function () {
            Ext.each(adminFields, function (item) {
                item.setVisible(false);
            });
        });
        
        
        return new GeoNetwork.SearchFormPanel({
            id: 'searchForm',
            stateId: 's',
            renderTo: 'search-form',
            border: false,
            searchCb: function(){
                if (metadataResultsView && Ext.getCmp('geometryMap')) {
                   metadataResultsView.addMap(Ext.getCmp('geometryMap').map, true);
                }
                var any = Ext.get('E_any_OR_identifier');
                if (any) {
                    if (any.getValue() === OpenLayers.i18n('fullTextSearch')) {
                        any.setValue('');
                    }
                }
                
                catalogue.startRecord = 1; // Reset start record
                search();
            },
            //autoShow : true,
            padding: 5,
            //autoHeight : true,
            defaults: {
                width : 180
            },
            items: formItems
        });
    }
    function loadCallback(el, success, response, options){
        if (success) {
            createLatestUpdate();
        } else {
            Ext.get('infoPanel').getUpdater().update({url:'home_en.html'});
        }
    }
    /** private: methode[createInfoPanel]
     *  Main information panel displayed on load
     *
     *  :return:
     */
    function createInfoPanel(){
        return new Ext.Panel({
            border: true,
            id: 'infoPanel',
            baseCls: 'md-info',
            autoWidth: true,
            renderTo: 'infoContent',
            //contentEl: 'infoContent',
            autoLoad: {
                url: 'home_' + catalogue.LANG + '.html',
                callback: loadCallback,
                scope: this,
                loadScripts: false
            }
        });
    }
    /** private: methode[createHelpPanel]
     *  Help panel displayed on load
     *
     *  :return:
     */
    function createHelpPanel(){
        return new Ext.Panel({
            border: false,
            frame: false,
            baseCls: 'none',
            id: 'helpPanel',
            autoWidth: true,
            renderTo: 'shortcut',
            autoLoad: {
                url: 'help_' + catalogue.LANG + '.html',
                callback: initShortcut,
                scope: this,
                loadScripts: false
            }
        });
    }
    function search(){
        searching = true;
        catalogue.search('searchForm', app.loadResults, null, catalogue.startRecord, true);
        
        var infoPanel = Ext.getCmp('infoPanel'), 
            resultsPanel = Ext.getCmp('resultsPanel'),
            tagCloudPanel = Ext.getCmp('tagCloudPanel');
          if (infoPanel.isVisible()) {
            infoPanel.hide();
          }
          if (!resultsPanel.isVisible()) {
             resultsPanel.show();
          }
          if (!tagCloudPanel.isVisible()) {
             tagCloudPanel.show();
          }
    }
    
    /**
     * Bottom bar
     *
     * @return
     */
    function createBBar(){
    
        var previousAction = new Ext.Action({
            id: 'previousBt',
            text: '&lt;&lt;',
            handler: function(){
            	var from = catalogue.startRecord - parseInt(Ext.getCmp('E_hitsperpage').getValue(), 10);
                if (from > 0) {
                	catalogue.startRecord = from;
	            	search();
                }
            },
            scope: this
        });
        
        var nextAction = new Ext.Action({
            id: 'nextBt',
            text: '&gt;&gt;',
            handler: function (){
                catalogue.startRecord += parseInt(Ext.getCmp('E_hitsperpage').getValue(), 10);
                search();
            },
            scope: this
        });
        
        return new Ext.Toolbar({
            items: [previousAction, '|', nextAction, '|', {
                xtype: 'tbtext',
                text: '',
                id: 'info'
            }]
        });
        
    }
    
    /**
     * Results panel layout with top, bottom bar and DataView
     *
     * @return
     */
    function createResultsPanel(permalinkProvider){
        metadataResultsView = new GeoNetwork.MetadataResultsView({
            catalogue: catalogue,
            autoScroll: true,
            autoHeight: true,
            displayContextualMenu: false,
            displaySerieMembers: true,
            tpl: EEA.Templates.FULL,
            templates: {
                SIMPLE: EEA.Templates.SIMPLE,
                THUMBNAIL: EEA.Templates.THUMBNAIL,
                FULL: EEA.Templates.FULL
            },
            featurecolor: GeoNetwork.Settings.results.featurecolor,
            colormap: GeoNetwork.Settings.results.colormap,
            featurecolorCSS: GeoNetwork.Settings.results.featurecolorCSS
        });
        
        catalogue.resultsView = metadataResultsView;
        
        tBar = new GeoNetwork.MetadataResultsToolbar({
            catalogue: catalogue,
            searchBtCmp: Ext.getCmp('searchBt'),
            sortByCmp: Ext.getCmp('E_sortBy'),
            metadataResultsView: metadataResultsView,
            permalinkProvider: permalinkProvider
        });
        
        bBar = createBBar();
        
        resultPanel = new Ext.Panel({
            id: 'resultsPanel',
            renderTo: 'region-content',
            border: false,
            hidden: true,
            autoHeight: true,
            //height: 750,
            bodyCssClass: 'md-view',
            //autoWidth: true,
            layout: 'fit',
            tbar: tBar,
            items: metadataResultsView,
            // paging bar on the bottom
            bbar: bBar
        });
        return resultPanel;
    }
   
    /**
     * Extra tag cloud to displayed current search summary TODO : not really a
     * narrow your search component.
     *
     * @return
     */
    function createTagCloud(){
        var tagCloudView = new GeoNetwork.TagCloudView({
            catalogue: catalogue,
            tpl: new Ext.XTemplate(
                    '<ul>', 
                    '<tpl for=".">', 
                        '<li class="tag-cloud">',
                            // TODO : hitsPerPage should take in account the current search form
                            '<a href="#" onclick="javascript:catalogue.kvpSearch(\'fast=index&summaryOnly=0&from=1&to=20&hitsPerPage=20&themekey={value}\', ' + 
                        'null, null, null);" alt="{value}" title="{count} records">{value} ({count} records)</a>', 
                        '</li>', 
                    '</tpl>', 
                '</ul>')
        });
        
        return new Ext.Panel({
            id: 'tagCloudPanel',
            renderTo: 'tag-cloud',
            layout: 'fit',
            border: false,
            hidden: true,
            autoHeight: true,
            baseCls: 'md-view',
            items: tagCloudView
        });
    }

    function show(uuid, record, url, maximized, width, height){
        var win = new GeoNetwork.view.ViewWindow({
            serviceUrl: url,
            lang: this.lang,
            currTab: GeoNetwork.defaultViewMode || 'simple',
            printDefaultForTabs: GeoNetwork.printDefaultForTabs || false,
            catalogue: catalogue,
            maximized: maximized || false,
            metadataUuid: uuid,
            record: record,
            resultsView: catalogue.resultsView
            });
        
        win.getPanel().on('aftermetadataload', app.registerTooltipLinks, this)
        
        win.show(this.resultsView);
        win.alignTo(Ext.getBody(), 'tr-tr');
    }
    
    function edit(metadataId, create, group, child){
        
        if (!this.editorWindow) {
            this.editorPanel = new GeoNetwork.editor.EditorPanel({
                defaultViewMode: GeoNetwork.Settings.editor.defaultViewMode,
                catalogue: catalogue,
                xlinkOptions: {CONTACT: true}
            });
            
            this.editorWindow = new Ext.Window({
                tools: [{
                    id: 'newwindow',
                    qtip: OpenLayers.i18n('newWindow'),
                    handler: function (e, toolEl, panel, tc){
                        window.open(GeoNetwork.Util.getBaseUrl(location.href) + "#edit=" + panel.getComponent('editorPanel').metadataId);
                        panel.hide();
                    },
                    scope: this
                }],
                title: OpenLayers.i18n('mdEditor'),
                id : 'editorWindow',
                layout: 'fit',
                modal: false,
                items: this.editorPanel,
                closeAction: 'hide',
                collapsible: true,
                collapsed: false,
                maximizable: true,
                maximized: true,
                resizable: true,
//                constrain: true,
                width: 980,
                height: 800
            });
            this.editorPanel.setContainer(this.editorWindow);
            this.editorPanel.on('editorClosed', function (){
                Ext.getCmp('searchBt').fireEvent('click');
            });
        }
        
        if (metadataId) {
            this.editorWindow.show();
            this.editorWindow.maximize();
            this.editorPanel.init(metadataId, create, group, child);
        }
    }
    
    function createHeader(){
        var info = catalogue.getInfo();
        document.title = info.name + " — European Environment Agency (EEA)";
        Ext.get('parent-fieldname-title').dom.innerHTML = info.name;
        // http://www.eea.europa.eu/en/getHeader
        // Load EEA header inf
        
        var wrapper = Ext.get('visual-portal-wrapper');
        OpenLayers.Request.GET({
            url: 'http://www.eea.europa.eu/templates/v2/getHeader',
            success: function(response){
                wrapper.insertHtml('beforeBegin', response.responseText);
            }
        });
        OpenLayers.Request.GET({
            url: 'http://www.eea.europa.eu/templates/v2/getFooter',
            success: function(response){
                wrapper.insertHtml('afterEnd', response.responseText);
            }
        });
    }
    
    // public space:
    return {
        registerTooltipLinks: function () {
            // Register tooltips for each hyperlink
            // to easy copy/paste the links. The tooltip
            // is composed of an hyperlink to trigger open in new
            // window and an input text to easily copy/paste the link.
            var links = Ext.query('a.with-tooltip', this.dom);
            Ext.each(links, function(item) {
                var el = Ext.get(item);
                var href = el.getAttribute('href')
                
                // Register hover tooltip and remove browser tooltip triggered by title
                var f = function(){
                    if (!Ext.get(href)) {
                        var title = el.getAttribute('title');
                        //var title = GeoNetwork.lang.en[titleId] && GeoNetwork.lang.en[titleId] != titleId ? GeoNetwork.lang.en[titleId] : titleId;
                        // FIXME 
                        var id = href;
                        if (href.indexOf('cifs://') != -1) {
                            href = href.replace(/\//g, '\\');
                            href = href.replace(/cifs:/, '');
                        }
                        var t = new Ext.ToolTip({
                                id: id,   // Identify tooltip by the href which might be unique
                                target: el,
                                title: title,
                                anchor: 'top',
                                closable: true,
                                //autoHide: false,
                                dismissDelay: 3000,
                                hideDelay: 4000,
                                html: '<span><a target="_blank" href="' + href + '">Open in new window</a> or copy link below<br/>' +
                                    '<input type="text" value="' + href + '" size="32"/></span>',
                                listeners: {
                                    show: function() {
                                        // When tooltip is displayed
                                        // select the text and focus in order to
                                        // quickly copy the link
                                        var input = Ext.query('input', Ext.get(href).dom);
                                        if (input && input.length===1) {
                                            if (!Ext.isIE8) {
                                                input[0].select();
                                            }
                                        }
                                    },
                                    // Short life popup to avoid duplicated popups
                                    // between search results and different view modes
                                    hide: function() {
                                        Ext.getCmp(this) && Ext.getCmp(this).destroy();
                                    },
                                    scope: this
                                }
                            });
                        if (!t.isVisible()){
                            //item.setAttribute('title', '');
                            t.setVisible(true);
                        }
                    } else {
                        //Ext.getCmp(href) && Ext.getCmp(href).destroy()
                    }
                };
                el.on('mouseover', f, this);
            
            });
        },
        init: function (){
            geonetworkUrl = GeoNetwork.URL || window.location.href.match(/(http.*\/.*)\/eea\/search.*/, '')[1];

            urlParameters = GeoNetwork.Util.getParameters(location.href);
            var lang = GeoNetwork.Util.getCatalogueLang(urlParameters.hl || GeoNetwork.defaultLocale);
            if (urlParameters.extent) {
                urlParameters.bounds = new OpenLayers.Bounds(urlParameters.extent[0], urlParameters.extent[1], urlParameters.extent[2], urlParameters.extent[3]);
            }

            // Init cookie
            cookie = new Ext.state.CookieProvider({
                expires: new Date(new Date().getTime()+(1000*60*60*24*365))
            });
            
                        // set a permalink provider which will be the main state provider.
            permalinkProvider = new GeoExt.state.PermalinkProvider({encodeType: false});
            
            Ext.state.Manager.setProvider(permalinkProvider);
            
            Ext.getDom('searchLb').innerHTML = OpenLayers.i18n('Search');
            Ext.getDom('loginLb').innerHTML = 'Admin login';//OpenLayers.i18n('login');
            
            // Create connexion to the catalogue
            catalogue = new GeoNetwork.Catalogue({
                statusBarId: 'info',
                lang: lang,
                hostUrl: geonetworkUrl,
                mdOverlayedCmpId: 'resultsPanel',
                adminAppUrl: geonetworkUrl + '/srv/' + lang + '/admin',
                // Declare default store to be used for records and summary
                metadataStore: GeoNetwork.Settings.mdStore(),
                metadataCSWStore : GeoNetwork.data.MetadataCSWResultsStore(),
                summaryStore: GeoNetwork.data.MetadataSummaryStore(),
                editMode: 2, // TODO : create constant
                metadataEditFn: edit,
                metadataShowFn: show
            });
            
            createHeader();
            
            // Override xml search service value
            catalogue.setServiceUrl('xmlSearch', GeoNetwork.Settings.searchService);
            
            // Search result
            resultsPanel = createResultsPanel(permalinkProvider);
            
            // Search form
            searchForm = createSearchForm();
            
            // Top navigation widgets
            createLanguageSwitcher(lang);
            createLoginForm();
            createTagCloud();
            edit();
            

            createHelpPanel();
            infoPanel = createInfoPanel();
            
            if (urlParameters.edit !== undefined && urlParameters.edit !== '') {
                catalogue.metadataEdit(urlParameters.edit);
            }
            if (urlParameters.create !== undefined) {
                resultPanel.getTopToolbar().createMetadataAction.fireEvent('click');
            }
            if (urlParameters.uuid !== undefined) {
                catalogue.metadataShow(urlParameters.uuid, false);
            } else if (urlParameters.id !== undefined) {
                catalogue.metadataShowById(urlParameters.id, true);
            }
            
            // FIXME : should be in Search field configuration
            Ext.get('E_any_OR_identifier').setWidth(285);
           Ext.get('E_any_OR_identifier').setHeight(28);
            if (GeoNetwork.searchDefault.activeMapControlExtent) {
                Ext.getCmp('geometryMap').setExtent();
            }
            if (urlParameters.bounds) {
                Ext.getCmp('geometryMap').map.zoomToExtent(urlParameters.bounds);
            }
            
//            resultPanel.setHeight(Ext.getCmp('center').getHeight());
            
            var events = ['afterDelete', 'afterRating', 'afterLogout', 'afterLogin'];
            Ext.each(events, function (e) {
                catalogue.on(e, function (){
                    if (searching === true) {
                        searchForm.fireEvent('search');
                    }
                });
            });
            
            // Hack to run search after all app is rendered within a sec ...
            // It could have been better to trigger event in SearchFormPanel#applyState
            // FIXME
            if (urlParameters.s_search !== undefined) {
                setTimeout(function(){searchForm.fireEvent('search');}, 500);
            }
        },
        getCatalogue: function (){
            return catalogue;
        },
        /**
         * Do layout
         *
         * @param response
         * @return
         */
        loadResults: function (response){
            // FIXME : result panel need to update layout in case of slider
            // Ext.getCmp('resultsPanel').syncSize();
            Ext.getCmp('previousBt').setDisabled(catalogue.startRecord === 1);
            Ext.getCmp('nextBt').setDisabled(catalogue.startRecord + 
                    parseInt(Ext.getCmp('E_hitsperpage').getValue(), 10) > catalogue.metadataStore.totalLength);
            if (Ext.getCmp('E_sortBy').getValue()) {
              Ext.getCmp('sortByToolBar').setValue(Ext.getCmp('E_sortBy').getValue()  + "#" + Ext.getCmp('sortOrder').getValue() );

            } else {
              Ext.getCmp('sortByToolBar').setValue(Ext.getCmp('E_sortBy').getValue());

            }
            
//            resultsPanel.syncSize();
//            console.log(Ext.getCmp('tagCloudPanel'));
//            Ext.getCmp('tagCloudPanel').setHeight(200);
            //resultPanel.setHeight(Ext.getCmp('center').getHeight());
            Ext.ux.Lightbox.register('a[rel^=lightbox]');
            
            app.registerTooltipLinks.call(Ext.get('resultsPanel'));
        }
    };
};
document.namespaces;
Ext.onReady(function (){
    var lang = /hl=([a-z]{3})/.exec(location.href);
    GeoNetwork.Util.setLang(lang && lang[1], '..');
    GeoNetwork.lang.en['login'] = 'Admin login';
    Ext.QuickTips.init();
    setTimeout(function () {
      Ext.get('loading').remove();
      Ext.get('loading-mask').fadeOut({remove:true});
    }, 250);

    app = new GeoNetwork.app();
    app.init();
    catalogue = app.getCatalogue();
    
    /* Focus on full text search field */
    Ext.getDom('E_any_OR_identifier').focus(true);
    
});


// When scrolling down in window, change search form top position
window.onscroll = function (e) {
    var pos = 0, searchFormTopUnderHeader = 160, searchFormBottomOverFooter = 160;
    if (pageYOffset)//usual
        pos = pageYOffset;
    else if (document.documentElement.clientHeight)//ie
        pos = document.documentElement.scrollTop;
    else if (document.body)//ie quirks
        pos = document.body.scrollTop;
    
    var e = Ext.get('slide-menu');
    
    // Close to the bottom of the page - stop moving the panel
    var newTop = pos < searchFormTopUnderHeader ? 5 : pos - searchFormTopUnderHeader;
    if (!(newTop + e.getHeight() > document.height)) {
        e.setTop(newTop);
    }
    
  }