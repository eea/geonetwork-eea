
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - ++resource++eea.forms.edit.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++eea.forms.edit.js?original=1
if(window.EEAFormsEdit===undefined){var EEAFormsEdit={'version':'1.0'}}
if((jQuery.tools!==undefined)&&(jQuery.tools.tabs!==undefined)){jQuery.tools.tabs.addEffect("eea-forms", function(tabIndex,done){var easing=jQuery.easing.easeOutQuad?'easeOutQuad':'swing';var panes=this.getPanes();if(panes.effect===undefined){panes.hide().eq(tabIndex).show()}else{var index=this.getIndex()!==undefined?this.getIndex():0;var direction='right';if(tabIndex<index){direction='left'}
panes.hide().eq(tabIndex).EEASlide({duration:500,easing:easing,direction:direction})}
done.call()})}
EEAFormsEdit.Wizard=function(context,options){var self=this;self.context=context;self.context.parent().addClass('eea-forms-wizard');self.settings={};if(options){jQuery.extend(self.settings,options)}
self.initialize()};EEAFormsEdit.Wizard.prototype={initialize: function(){var self=this;self.api=self.context.data('tabs');self.api.onClick(function(e,index){self.toggleButtons(index)});self.api.getConf().effect='eea-forms';self.leftButton();self.rightButton();self.toggleButtons()},leftButton: function(){var self=this;self.left=jQuery('<div>').addClass('wizard-left').html('<span>&lsaquo;</span>').click(function(){self.api.prev();self.toggleButtons()}).prependTo(self.context.parent());jQuery(document).bind('eea-wizard-changed', function(evt,data){data=data||{};var parent_height=self.left.parent().height()-70;var height=data.height||parent_height||'80%';self.left.height(height);self.right.height(height)})},rightButton: function(){var self=this;self.right=jQuery('<div>').addClass('wizard-right').html('<span>&rsaquo;</span>').click(function(){self.api.next();self.toggleButtons()}).prependTo(self.context.parent())},toggleButtons: function(index){var self=this;if(index===undefined){index=self.api.getIndex()}
var current=jQuery(self.api.getPanes()[index]);current.css('margin-left','4em');current.css('margin-right','4em');jQuery(document).trigger('eea-wizard-changed',{height:current.height()});self.left.show();self.right.show();if(index===0){self.left.hide();current.css('margin-left','0')}
if(index===(self.api.getTabs().length-1)){self.right.hide();current.css('margin-right','0')}}};EEAFormsEdit.Group=function(context,options){var self=this;self.context=context;self.settings={group:[]};if(options){jQuery.extend(self.settings,options)}
self.initialize()};EEAFormsEdit.Group.prototype={initialize: function(){var self=this;self.groupFields()},groupFields: function(){var self=this;jQuery.each(self.settings.group, function(index,field){var errors=jQuery.data(field[0],'errors');self.handleErrors(field,errors);field.addClass('eeaforms-presentation-group');var label=jQuery('label.formQuestion',field);label.after(jQuery('.formHelp',field).css('display','block'));var title=label.text();label.remove();var h3=jQuery('<h3>').addClass('eeaforms-presentation-group').addClass(errors?'eeaforms-error':'').append(jQuery('<a>').addClass('eeaforms-ajax').attr('href','#'+field.attr('id')).html(title));field.before(h3);self.handleHelp(field,h3)});var parent=self.context.parent();jQuery('.eeaforms-presentation-group',parent).wrapAll('<div class="eeaforms-group-accordion" />');var container=jQuery('.eeaforms-group-accordion',parent);container.accordion({change: function(evt,ui){jQuery(document).trigger('eea-wizard-changed')}});jQuery.each(self.settings.group, function(index,field){field.height('auto')})},handleErrors: function(field,errors){var self=this;if(!errors){return}
var errorsBox=jQuery('.fieldErrorBox',field);if(!errorsBox.length){errorsBox=jQuery('<div>').addClass('fieldErrorBox').prependTo(field)}
errorsBox.removeClass('fieldErrorBox').addClass('error').html(errors)},handleHelp: function(field,header){var self=this;var formHelp=jQuery('.formHelp',field);var help=jQuery('<a>').attr('href','#').addClass('eeaforms-group-help').text('Help').click(function(){formHelp.toggle('blind');return false});header.prepend(help);formHelp.hide()}};EEAFormsEdit.QuickUpload=function(context,options){var self=this;self.context=context;self.settings={basket:null,relatedItems:'relatedItems'};if(options){jQuery.extend(self.settings,options)}
if(!self.settings.basket){return}
jQuery(document).bind('qq-file-uploaded', function(evt,data){self.onFileUpload(data)});self.initialize()};EEAFormsEdit.QuickUpload.prototype={initialize: function(){var self=this;self.settings.basket.empty()},onFileUpload: function(data){var self=this;var name=self.settings.relatedItems+':list';var label=jQuery('<label>').text(data.title);self.settings.basket.append(label);jQuery('<input>').attr('type','checkbox').val(data.uid).attr('checked','checked').attr('name',name).prependTo(self.settings.basket)}};jQuery.fn.EEAFormsGroup=function(options){return this.each(function(){var context=jQuery(this).addClass('ajax');var spreadsheet=new EEAFormsEdit.Group(context,options);context.data('EEAFormsGroup',spreadsheet)})};jQuery.fn.EEAFormsWizard=function(options){return this.each(function(){var context=jQuery(this).addClass('ajax');var wizard=new EEAFormsEdit.Wizard(context,options);context.data('EEAFormsWizard',wizard)})};jQuery.fn.EEAFormsQuickUpload=function(options){return this.each(function(){var context=jQuery(this).addClass('ajax');var quickUpload=new EEAFormsEdit.QuickUpload(context,options);context.data('EEAFormsQuickUpload',quickUpload)})};jQuery.fn.EEASlide=function(options){return this.queue(function(){var el=jQuery(this);var mode=options.mode||'show';var direction=options.direction||'left';var easing=options.easing||'swing';var parent=el.parent();el.show().css('position','relative');parent.css('overflow','hidden');var ref=(direction=='up'||direction=='down')?'top':'left';var motion=(direction=='up'||direction=='left')?'pos':'neg';var distance=options.distance||(ref=='top'?el.outerHeight({margin:true}):el.outerWidth({margin:true}));if(mode=='show'){var tmp_pos=motion=='pos'?(isNaN(distance)?"-"+distance:-distance):distance;el.css(ref,tmp_pos);if(el.css(ref)!=tmp_pos){var el_pos=el.css(ref);var ratio=tmp_pos/parseInt(el_pos,10);el.css(ref,tmp_pos * ratio)}}
var pos=parseInt(el.css('left'),10);pos=pos<0?pos *-1:pos;distance=pos>distance?pos:distance;var animation={};animation[ref]=(mode=='show'?(motion=='pos'?'+=':'-='):(motion=='pos'?'-=':'+='))+distance;el.animate(animation,{queue:false,duration:options.duration,easing:easing,complete: function(){if(mode=='hide'){el.hide()}
if(options.callback){options.callback.apply(this,arguments)}
el.dequeue();parent.css('overflow','')}})})};

/* - ++resource++eea.sparql.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++eea.sparql.js?original=1
if(window.EEASparql===undefined){var EEASparql={version:'1.0'}}
EEASparql.Preview=function(context,options){var self=this;self.context=context;self.settings={};if(options){jQuery.extend(self.settings,options)}
self.initialize()};EEASparql.Preview.prototype={initialize: function(){var self=this;self.overlay=jQuery('#eea-sparql-overlay');if(!self.overlay.length){self.overlay=jQuery('<div>').attr('id','eea-sparql-overlay').append(jQuery('<div>').addClass('contentWrap')).appendTo(jQuery('body'))}
self.context.attr('rel','#eea-sparql-overlay');self.context.overlay({mask:'black',onBeforeLoad: function(){var wrap=this.getOverlay().find('.contentWrap');wrap.load(this.getTrigger().attr("href")+'/@@sparql.preview')},onClose: function(){var wrap=this.getOverlay().find('.contentWrap');wrap.html('<div class="loading">Loading preview...</div>')}})}};jQuery.fn.EEASparqlPreview=function(options){return this.each(function(){var context=jQuery(this).addClass('eea');var preview=new EEASparql.Preview(context,options);context.data('EEASparqlPreview',preview)})};

/* - ++resource++jquery.jqgrid.locale-en.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++jquery.jqgrid.locale-en.js?original=1
;(function($){$.jgrid={defaults:{recordtext:"View {0} - {1} of {2}",emptyrecords:"No records to view",loadtext:"Loading...",pgtext:"Page {0} of {1}"},search:{caption:"Search...",Find:"Find",Reset:"Reset",odata:['equal','not equal','less','less or equal','greater','greater or equal','begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain'],groupOps:[{op:"AND",text:"all"},{op:"OR",text:"any"}],matchText:" match",rulesText:" rules"},edit:{addCaption:"Add Record",editCaption:"Edit Record",bSubmit:"Submit",bCancel:"Cancel",bClose:"Close",saveData:"Data has been changed! Save changes?",bYes:"Yes",bNo:"No",bExit:"Cancel",msg:{required:"Field is required",number:"Please, enter valid number",minValue:"value must be greater than or equal to ",maxValue:"value must be less than or equal to",email:"is not a valid e-mail",integer:"Please, enter valid integer value",date:"Please, enter valid date value",url:"is not a valid URL. Prefix required ('http://' or 'https://')",nodefined:" is not defined!",novalue:" return value is required!",customarray:"Custom function should return array!",customfcheck:"Custom function should be present in case of custom checking!"}},view:{caption:"View Record",bClose:"Close"},del:{caption:"Delete",msg:"Delete selected record(s)?",bSubmit:"Delete",bCancel:"Cancel"},nav:{edittext:"",edittitle:"Edit selected row",addtext:"",addtitle:"Add new row",deltext:"",deltitle:"Delete selected row",searchtext:"",searchtitle:"Find records",refreshtext:"",refreshtitle:"Reload Grid",alertcap:"Warning",alerttext:"Please, select row",viewtext:"",viewtitle:"View selected row"},col:{caption:"Select columns",bSubmit:"Ok",bCancel:"Cancel"},errors:{errcap:"Error",nourl:"No url is set",norecords:"No records to process",model:"Length of colNames <> colModel!"},formatter:{integer:{thousandsSeparator:" ",defaultValue:'0'},number:{decimalSeparator:".",thousandsSeparator:" ",decimalPlaces:2,defaultValue:'0.00'},currency:{decimalSeparator:".",thousandsSeparator:" ",decimalPlaces:2,prefix:"",suffix:"",defaultValue:'0.00'},date:{dayNames:["Sun","Mon","Tue","Wed","Thr","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],AmPm:["am","pm","AM","PM"],S: function(j){return j<11||j>13?['st','nd','rd','th'][Math.min((j-1)%10,3)]:'th'},srcformat:'Y-m-d',newformat:'d/m/Y',masks:{ISO8601Long:"Y-m-d H:i:s",ISO8601Short:"Y-m-d",ShortDate:"n/j/Y",LongDate:"l, F d, Y",FullDateTime:"l, F d, Y g:i:s A",MonthDay:"F d",ShortTime:"g:i A",LongTime:"g:i:s A",SortableDateTime:"Y-m-d\\TH:i:s",UniversalSortableDateTime:"Y-m-d H:i:sO",YearMonth:"F, Y"},reformatAfterEdit:false},baseLinkUrl:'',showAction:'',target:'',checkbox:{disabled:true},idName:'id'}}})(jQuery);

/* - ++resource++jquery.jqgrid.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++jquery.jqgrid.js?original=1
(function($){"use strict";$.jgrid=$.jgrid||{};$.extend($.jgrid,{htmlDecode: function(value){if(value&&(value=='&nbsp;'||value=='&#160;'||(value.length===1&&value.charCodeAt(0)===160))){return ""}
return!value?value:String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g,"&")},htmlEncode: function(value){return!value?value:String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")},format: function(format){var args=$.makeArray(arguments).slice(1);if(format===undefined){format=""}
return format.replace(/\{(\d+)\}/g, function(m,i){return args[i]})},getCellIndex: function(cell){var c=$(cell);if(c.is('tr')){return-1}
c=(!c.is('td')&&!c.is('th')?c.closest("td,th"):c)[0];if($.browser.msie){return $.inArray(c,c.parentNode.cells)}
return c.cellIndex},stripHtml: function(v){v=v+"";var regexp=/<("[^"]*"|'[^']*'|[^'">])*>/gi;if(v){v=v.replace(regexp,"");return(v&&v!=='&nbsp;'&&v!=='&#160;')?v.replace(/\"/g,"'") : ""} else{return v}},realType: function(arg){return Object.prototype.toString.call(arg).slice(8,-1)},stripPref: function(pref,id){var obj=this.realType(pref);if(obj=="String"||obj=="Number"){pref=String(pref);id=pref!==""?String(id).replace(String(pref),""):id}
return id},stringToDoc: function(xmlString){var xmlDoc;if(typeof xmlString!=='string'){return xmlString}
try{var parser=new DOMParser();xmlDoc=parser.parseFromString(xmlString,"text/xml")}
catch(e){xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async=false;xmlDoc.loadXML(xmlString)}
return(xmlDoc&&xmlDoc.documentElement&&xmlDoc.documentElement.tagName!='parsererror')?xmlDoc:null},parse: function(jsonString){var js=jsonString;if(js.substr(0,9)=="while(1);"){js=js.substr(9)}
if(js.substr(0,2)=="/*"){js=js.substr(2,js.length-4)}
if(!js){js="{}"}
return($.jgrid.useJSON===true&&typeof(JSON)==='object'&&typeof(JSON.parse)==='function')?JSON.parse(js):eval('('+js+')')},parseDate: function(format,date){var tsp={m:1,d:1,y:1970,h:0,i:0,s:0,u:0},k,hl,dM,regdate=/[\\\/:_;.,\t\T\s-]/;if(date&&date!==null&&date!==undefined){date=$.trim(date);date=date.split(regdate);format=format.split(regdate);var dfmt=$.jgrid.formatter.date.monthNames;var afmt=$.jgrid.formatter.date.AmPm;var h12to24=function(ampm,h){if(ampm===0){if(h===12){h=0}}
else{if(h!==12){h+=12}}
return h};for(k=0,hl=format.length;k<hl;k++){if(format[k]=='M'){dM=$.inArray(date[k],dfmt);if(dM!==-1&&dM<12){date[k]=dM+1}}
if(format[k]=='F'){dM=$.inArray(date[k],dfmt);if(dM!==-1&&dM>11){date[k]=dM+1-12}}
if(format[k]=='a'){dM=$.inArray(date[k],afmt);if(dM!==-1&&dM<2&&date[k]==afmt[dM]){date[k]=dM;tsp.h=h12to24(date[k],tsp.h)}}
if(format[k]=='A'){dM=$.inArray(date[k],afmt);if(dM!==-1&&dM>1&&date[k]==afmt[dM]){date[k]=dM-2;tsp.h=h12to24(date[k],tsp.h)}}
if(date[k]!==undefined){tsp[format[k].toLowerCase()]=parseInt(date[k],10)}}
tsp.m=parseInt(tsp.m,10)-1;var ty=tsp.y;if(ty>=70&&ty<=99){tsp.y=1900+tsp.y}
else if(ty>=0&&ty<=69){tsp.y=2000+tsp.y}}
return new Date(tsp.y,tsp.m,tsp.d,tsp.h,tsp.i,tsp.s,tsp.u)},jqID: function(sid){return String(sid).replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^`{|}~]/g,"\\$&")},guid:1,uidPref:'jqg',randId: function(prefix){return(prefix?prefix:$.jgrid.uidPref)+($.jgrid.guid++)},getAccessor: function(obj,expr){var ret,p,prm=[],i;if(typeof expr==='function'){return expr(obj)}
ret=obj[expr];if(ret===undefined){try{if(typeof expr==='string'){prm=expr.split('.')}
i=prm.length;if(i){ret=obj;while(ret&&i--){p=prm.shift();ret=ret[p]}}} catch(e){}}
return ret},getXmlData: function(obj,expr,returnObj){var ret,m=typeof(expr)==='string'?expr.match(/^(.*)\[(\w+)\]$/):null;if(typeof(expr)==='function'){return expr(obj)}
if(m&&m[2]){return m[1]?$(m[1],obj).attr(m[2]):$(obj).attr(m[2])} else{ret=$(expr,obj);if(returnObj){return ret}
return ret.length>0?$(ret).text():undefined}},ajaxOptions:{},from: function(source,initalQuery){var queryObject=function(d,q){if(typeof(d)=="string"){d=$.data(d)}
var self=this,_data=d,_usecase=true,_trim=false,_query=q,_stripNum=/[\$,%]/g,_lastCommand=null,_lastField=null,_orDepth=0,_negate=false,_queuedOperator="",_sorting=[],_useProperties=true;if(typeof(d)=="object"&&d.push){if(d.length>0){if(typeof(d[0])!="object"){_useProperties=false}else{_useProperties=true}}}else{throw "data provides is not an array"}
this._hasData=function(){return _data===null?false:_data.length===0?false:true};this._getStr=function(s){var phrase=[];if(_trim){phrase.push("jQuery.trim(")}
phrase.push("String("+s+")");if(_trim){phrase.push(")")}
if(!_usecase){phrase.push(".toLowerCase()")}
return phrase.join("")};this._strComp=function(val){if(typeof(val)=="string"){return".toString()"}else{return""}};this._group=function(f,u){return({field:f.toString(),unique:u,items:[]})};this._toStr=function(phrase){if(_trim){phrase=$.trim(phrase)}
if(!_usecase){phrase=phrase.toLowerCase()}
phrase=phrase.toString().replace(/\\/g,'\\\\').replace(/\"/g,'\\"');return phrase};this._funcLoop=function(func){var results=[];$.each(_data,function(i,v){results.push(func(v))});return results};this._append=function(s){var i;if(_query===null){_query=""} else{_query+=_queuedOperator===""?" && ":_queuedOperator}
for(i=0;i<_orDepth;i++){_query+="("}
if(_negate){_query+="!"}
_query+="("+s+")";_negate=false;_queuedOperator="";_orDepth=0};this._setCommand=function(f,c){_lastCommand=f;_lastField=c};this._resetNegate=function(){_negate=false};this._repeatCommand=function(f,v){if(_lastCommand===null){return self}
if(f!==null&&v!==null){return _lastCommand(f,v)}
if(_lastField===null){return _lastCommand(f)}
if(!_useProperties){return _lastCommand(f)}
return _lastCommand(_lastField,f)};this._equals=function(a,b){return(self._compare(a,b,1)===0)};this._compare=function(a,b,d){if(d===undefined){d=1}
if(a===undefined){a=null}
if(b===undefined){b=null}
if(a===null&&b===null){return 0}
if(a===null&&b!==null){return 1}
if(a!==null&&b===null){return-1}
if(!_usecase&&typeof(a)!=="number"&&typeof(b)!=="number"){a=String(a).toLowerCase();b=String(b).toLowerCase()}
if(a<b){return-d}
if(a>b){return d}
return 0};this._performSort=function(){if(_sorting.length===0){return}
_data=self._doSort(_data,0)};this._doSort=function(d,q){var by=_sorting[q].by,dir=_sorting[q].dir,type=_sorting[q].type,dfmt=_sorting[q].datefmt;if(q==_sorting.length-1){return self._getOrder(d,by,dir,type,dfmt)}
q++;var values=self._getGroup(d,by,dir,type,dfmt);var results=[];for(var i=0;i<values.length;i++){var sorted=self._doSort(values[i].items,q);for(var j=0;j<sorted.length;j++){results.push(sorted[j])}}
return results};this._getOrder=function(data,by,dir,type,dfmt){var sortData=[],_sortData=[],newDir=dir=="a"?1:-1,i,ab,j,findSortKey;if(type===undefined){type="text"}
if(type=='float'||type=='number'||type=='currency'||type=='numeric'){findSortKey=function($cell,a){var key=parseFloat(String($cell).replace(_stripNum,''));return isNaN(key)?0.00:key}} else if(type=='int'||type=='integer'){findSortKey=function($cell,a){return $cell?parseFloat(String($cell).replace(_stripNum,'')):0}} else if(type=='date'||type=='datetime'){findSortKey=function($cell,a){return $.jgrid.parseDate(dfmt,$cell).getTime()}} else if($.isFunction(type)){findSortKey=type} else{findSortKey=function($cell,a){if(!$cell){$cell=""}
return $.trim(String($cell).toUpperCase())}}
$.each(data,function(i,v){ab=by!==""?$.jgrid.getAccessor(v,by):v;if(ab===undefined){ab=""}
ab=findSortKey(ab,v);_sortData.push({'vSort':ab,'index':i})});_sortData.sort(function(a,b){a=a.vSort;b=b.vSort;return self._compare(a,b,newDir)});j=0;var nrec=data.length;while(j<nrec){i=_sortData[j].index;sortData.push(data[i]);j++}
return sortData};this._getGroup=function(data,by,dir,type,dfmt){var results=[],group=null,last=null,val;$.each(self._getOrder(data,by,dir,type,dfmt),function(i,v){val=$.jgrid.getAccessor(v,by);if(val===undefined){val=""}
if(!self._equals(last,val)){last=val;if(group!==null){results.push(group)}
group=self._group(by,val)}
group.items.push(v)});if(group!==null){results.push(group)}
return results};this.ignoreCase=function(){_usecase=false;return self};this.useCase=function(){_usecase=true;return self};this.trim=function(){_trim=true;return self};this.noTrim=function(){_trim=false;return self};this.execute=function(){var match=_query,results=[];if(match===null){return self}
$.each(_data,function(){if(eval(match)){results.push(this)}});_data=results;return self};this.data=function(){return _data};this.select=function(f){self._performSort();if(!self._hasData()){return[]}
self.execute();if($.isFunction(f)){var results=[];$.each(_data,function(i,v){results.push(f(v))});return results}
return _data};this.hasMatch=function(f){if(!self._hasData()){return false}
self.execute();return _data.length>0};this.andNot=function(f,v,x){_negate=!_negate;return self.and(f,v,x)};this.orNot=function(f,v,x){_negate=!_negate;return self.or(f,v,x)};this.not=function(f,v,x){return self.andNot(f,v,x)};this.and=function(f,v,x){_queuedOperator=" && ";if(f===undefined){return self}
return self._repeatCommand(f,v,x)};this.or=function(f,v,x){_queuedOperator=" || ";if(f===undefined){return self}
return self._repeatCommand(f,v,x)};this.orBegin=function(){_orDepth++;return self};this.orEnd=function(){if(_query!==null){_query+=")"}
return self};this.isNot=function(f){_negate=!_negate;return self.is(f)};this.is=function(f){self._append('this.'+f);self._resetNegate();return self};this._compareValues=function(func,f,v,how,t){var fld;if(_useProperties){fld='jQuery.jgrid.getAccessor(this,\''+f+'\')'}else{fld='this'}
if(v===undefined){v=null}
var val=v,swst=t.stype===undefined?"text":t.stype;if(v!==null){switch(swst){case 'int':case 'integer':val=(isNaN(Number(val))||val==="")?'0':val;fld='parseInt('+fld+',10)';val='parseInt('+val+',10)';break;case 'float':case 'number':case 'numeric':val=String(val).replace(_stripNum,'');val=(isNaN(Number(val))||val==="")?'0':val;fld='parseFloat('+fld+')';val='parseFloat('+val+')';break;case 'date':case 'datetime':val=String($.jgrid.parseDate(t.newfmt||'Y-m-d',val).getTime());fld='jQuery.jgrid.parseDate("'+t.srcfmt+'",'+fld+').getTime()';break;default:fld=self._getStr(fld);val=self._getStr('"'+self._toStr(val)+'"')}}
self._append(fld+' '+how+' '+val);self._setCommand(func,f);self._resetNegate();return self};this.equals=function(f,v,t){return self._compareValues(self.equals,f,v,"==",t)};this.notEquals=function(f,v,t){return self._compareValues(self.equals,f,v,"!==",t)};this.isNull=function(f,v,t){return self._compareValues(self.equals,f,null,"===",t)};this.greater=function(f,v,t){return self._compareValues(self.greater,f,v,">",t)};this.less=function(f,v,t){return self._compareValues(self.less,f,v,"<",t)};this.greaterOrEquals=function(f,v,t){return self._compareValues(self.greaterOrEquals,f,v,">=",t)};this.lessOrEquals=function(f,v,t){return self._compareValues(self.lessOrEquals,f,v,"<=",t)};this.startsWith=function(f,v){var val=(v===undefined||v===null)?f:v,length=_trim?$.trim(val.toString()).length:val.toString().length;if(_useProperties){self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(v)+'"'))}else{length=_trim?$.trim(v.toString()).length:v.toString().length;self._append(self._getStr('this')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(f)+'"'))}
self._setCommand(self.startsWith,f);self._resetNegate();return self};this.endsWith=function(f,v){var val=(v===undefined||v===null)?f:v,length=_trim?$.trim(val.toString()).length:val.toString().length;if(_useProperties){self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr('+self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.length-'+length+','+length+') == "'+self._toStr(v)+'"')} else{self._append(self._getStr('this')+'.substr('+self._getStr('this')+'.length-"'+self._toStr(f)+'".length,"'+self._toStr(f)+'".length) == "'+self._toStr(f)+'"')}
self._setCommand(self.endsWith,f);self._resetNegate();return self};this.contains=function(f,v){if(_useProperties){self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.indexOf("'+self._toStr(v)+'",0) > -1')}else{self._append(self._getStr('this')+'.indexOf("'+self._toStr(f)+'",0) > -1')}
self._setCommand(self.contains,f);self._resetNegate();return self};this.groupBy=function(by,dir,type,datefmt){if(!self._hasData()){return null}
return self._getGroup(_data,by,dir,type,datefmt)};this.orderBy=function(by,dir,stype,dfmt){dir=dir===undefined||dir===null?"a":$.trim(dir.toString().toLowerCase());if(stype===null||stype===undefined){stype="text"}
if(dfmt===null||dfmt===undefined){dfmt="Y-m-d"}
if(dir=="desc"||dir=="descending"){dir="d"}
if(dir=="asc"||dir=="ascending"){dir="a"}
_sorting.push({by:by,dir:dir,type:stype,datefmt:dfmt});return self};return self};return new queryObject(source,null)},extend: function(methods){$.extend($.fn.jqGrid,methods);if(!this.no_legacy_api){$.fn.extend(methods)}}});$.fn.jqGrid=function(pin){if(typeof pin=='string'){var fn=$.jgrid.getAccessor($.fn.jqGrid,pin);if(!fn){throw("jqGrid - No such method: "+pin)}
var args=$.makeArray(arguments).slice(1);return fn.apply(this,args)}
return this.each( function(){if(this.grid){return}
var p=$.extend(true,{url:"",height:150,page:1,rowNum:20,rowTotal:null,records:0,pager:"",pgbuttons:true,pginput:true,colModel:[],rowList:[],colNames:[],sortorder:"asc",sortname:"",datatype:"xml",mtype:"GET",altRows:false,selarrrow:[],savedRow:[],shrinkToFit:true,xmlReader:{},jsonReader:{},subGrid:false,subGridModel:[],reccount:0,lastpage:0,lastsort:0,selrow:null,beforeSelectRow:null,onSelectRow:null,onSortCol:null,ondblClickRow:null,onRightClickRow:null,onPaging:null,onSelectAll:null,loadComplete:null,gridComplete:null,loadError:null,loadBeforeSend:null,afterInsertRow:null,beforeRequest:null,beforeProcessing:null,onHeaderClick:null,viewrecords:false,loadonce:false,multiselect:false,multikey:false,editurl:null,search:false,caption:"",hidegrid:true,hiddengrid:false,postData:{},userData:{},treeGrid:false,treeGridModel:'nested',treeReader:{},treeANode:-1,ExpandColumn:null,tree_root_level:0,prmNames:{page:"page",rows:"rows",sort:"sidx",order:"sord",search:"_search",nd:"nd",id:"id",oper:"oper",editoper:"edit",addoper:"add",deloper:"del",subgridid:"id",npage:null,totalrows:"totalrows"},forceFit:false,gridstate:"visible",cellEdit:false,cellsubmit:"remote",nv:0,loadui:"enable",toolbar:[false,""],scroll:false,multiboxonly:false,deselectAfterSort:true,scrollrows:false,autowidth:false,scrollOffset:18,cellLayout:5,subGridWidth:20,multiselectWidth:20,gridview:false,rownumWidth:25,rownumbers:false,pagerpos:'center',recordpos:'right',footerrow:false,userDataOnFooter:false,hoverrows:true,altclass:'ui-priority-secondary',viewsortcols:[false,'vertical',true],resizeclass:'',autoencode:false,remapColumns:[],ajaxGridOptions:{},direction:"ltr",toppager:false,headertitles:false,scrollTimeout:40,data:[],_index:{},grouping:false,groupingView:{groupField:[],groupOrder:[],groupText:[],groupColumnShow:[],groupSummary:[],showSummaryOnHide:false,sortitems:[],sortnames:[],groupDataSorted:false,summary:[],summaryval:[],plusicon:'ui-icon-circlesmall-plus',minusicon:'ui-icon-circlesmall-minus'},ignoreCase:false,cmTemplate:{},idPrefix:""},$.jgrid.defaults,pin||{});var grid={headers:[],cols:[],footers:[],dragStart: function(i,x,y){this.resizing={idx:i,startX:x.clientX,sOL:y[0]};this.hDiv.style.cursor="col-resize";this.curGbox=$("#rs_m"+$.jgrid.jqID(p.id),"#gbox_"+$.jgrid.jqID(p.id));this.curGbox.css({display:"block",left:y[0],top:y[1],height:y[2]});if($.isFunction(p.resizeStart)){p.resizeStart.call(this,x,i)}
document.onselectstart=function(){return false}},dragMove: function(x){if(this.resizing){var diff=x.clientX-this.resizing.startX,h=this.headers[this.resizing.idx],newWidth=p.direction==="ltr"?h.width+diff:h.width-diff,hn,nWn;if(newWidth>33){this.curGbox.css({left:this.resizing.sOL+diff});if(p.forceFit===true){hn=this.headers[this.resizing.idx+p.nv];nWn=p.direction==="ltr"?hn.width-diff:hn.width+diff;if(nWn>33){h.newWidth=newWidth;hn.newWidth=nWn}} else{this.newWidth=p.direction==="ltr"?p.tblwidth+diff:p.tblwidth-diff;h.newWidth=newWidth}}}},dragEnd: function(){this.hDiv.style.cursor="default";if(this.resizing){var idx=this.resizing.idx,nw=this.headers[idx].newWidth||this.headers[idx].width;nw=parseInt(nw,10);this.resizing=false;$("#rs_m"+$.jgrid.jqID(p.id)).css("display","none");p.colModel[idx].width=nw;this.headers[idx].width=nw;this.headers[idx].el.style.width=nw+"px";this.cols[idx].style.width=nw+"px";if(this.footers.length>0){this.footers[idx].style.width=nw+"px"}
if(p.forceFit===true){nw=this.headers[idx+p.nv].newWidth||this.headers[idx+p.nv].width;this.headers[idx+p.nv].width=nw;this.headers[idx+p.nv].el.style.width=nw+"px";this.cols[idx+p.nv].style.width=nw+"px";if(this.footers.length>0){this.footers[idx+p.nv].style.width=nw+"px"}
p.colModel[idx+p.nv].width=nw} else{p.tblwidth=this.newWidth||p.tblwidth;$('table:first',this.bDiv).css("width",p.tblwidth+"px");$('table:first',this.hDiv).css("width",p.tblwidth+"px");this.hDiv.scrollLeft=this.bDiv.scrollLeft;if(p.footerrow){$('table:first',this.sDiv).css("width",p.tblwidth+"px");this.sDiv.scrollLeft=this.bDiv.scrollLeft}}
if($.isFunction(p.resizeStop)){p.resizeStop.call(this,nw,idx)}}
this.curGbox=null;document.onselectstart=function(){return true}},populateVisible: function(){if(grid.timer){clearTimeout(grid.timer)}
grid.timer=null;var dh=$(grid.bDiv).height();if(!dh){return}
var table=$("table:first",grid.bDiv);var rows,rh;if(table[0].rows.length){try{rows=table[0].rows[1];rh=rows?$(rows).outerHeight()||grid.prevRowHeight:grid.prevRowHeight} catch(pv){rh=grid.prevRowHeight}}
if(!rh){return}
grid.prevRowHeight=rh;var rn=p.rowNum;var scrollTop=grid.scrollTop=grid.bDiv.scrollTop;var ttop=Math.round(table.position().top)-scrollTop;var tbot=ttop+table.height();var div=rh * rn;var page,npage,empty;if(tbot<dh&&ttop<=0&&(p.lastpage===undefined||parseInt((tbot+scrollTop+div-1)/div,10)<=p.lastpage)){npage=parseInt((dh-tbot+div-1)/div,10);if(tbot>=0||npage<2||p.scroll===true){page=Math.round((tbot+scrollTop)/div)+1;ttop=-1} else{ttop=1}}
if(ttop>0){page=parseInt(scrollTop/div,10)+1;npage=parseInt((scrollTop+dh)/div,10)+2-page;empty=true}
if(npage){if(p.lastpage&&page>p.lastpage||p.lastpage==1||(page===p.page&&page===p.lastpage)){return}
if(grid.hDiv.loading){grid.timer=setTimeout(grid.populateVisible,p.scrollTimeout)} else{p.page=page;if(empty){grid.selectionPreserver(table[0]);grid.emptyRows(grid.bDiv,false,false)}
grid.populate(npage)}}},scrollGrid: function(e){if(p.scroll){var scrollTop=grid.bDiv.scrollTop;if(grid.scrollTop===undefined){grid.scrollTop=0}
if(scrollTop!=grid.scrollTop){grid.scrollTop=scrollTop;if(grid.timer){clearTimeout(grid.timer)}
grid.timer=setTimeout(grid.populateVisible,p.scrollTimeout)}}
grid.hDiv.scrollLeft=grid.bDiv.scrollLeft;if(p.footerrow){grid.sDiv.scrollLeft=grid.bDiv.scrollLeft}
if(e){e.stopPropagation()}},selectionPreserver: function(ts){var p=ts.p;var sr=p.selrow,sra=p.selarrrow?$.makeArray(p.selarrrow):null;var left=ts.grid.bDiv.scrollLeft;var complete=p.gridComplete;p.gridComplete=function(){p.selrow=null;p.selarrrow=[];if(p.multiselect&&sra&&sra.length>0){for(var i=0;i<sra.length;i++){if(sra[i]!=sr){$(ts).jqGrid("setSelection",sra[i],false)}}}
if(sr){$(ts).jqGrid("setSelection",sr,false)}
ts.grid.bDiv.scrollLeft=left;p.gridComplete=complete;if(p.gridComplete){complete()}}}};if(this.tagName.toUpperCase()!='TABLE'){alert("Element is not a table");return}
$(this).empty().attr("tabindex","1");this.p=p ;this.p.useProp=!!$.fn.prop;var i,dir,ts;if(this.p.colNames.length===0){for(i=0;i<this.p.colModel.length;i++){this.p.colNames[i]=this.p.colModel[i].label||this.p.colModel[i].name}}
if(this.p.colNames.length!==this.p.colModel.length){alert($.jgrid.errors.model);return}
var gv=$("<div class='ui-jqgrid-view'></div>"),ii,isMSIE=$.browser.msie?true:false,isSafari=$.browser.webkit||$.browser.safari?true:false;ts=this;ts.p.direction=$.trim(ts.p.direction.toLowerCase());if($.inArray(ts.p.direction,["ltr","rtl"])==-1){ts.p.direction="ltr"}
dir=ts.p.direction;$(gv).insertBefore(this);$(this).appendTo(gv).removeClass("scroll");var eg=$("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");$(eg).insertBefore(gv).attr({"id":"gbox_"+this.id,"dir":dir});$(gv).appendTo(eg).attr("id","gview_"+this.id);if(isMSIE&&$.browser.version<=6){ii='<iframe style="display:block;position:absolute;z-index:-1;filter:Alpha(Opacity=\'0\');" src="javascript:false;"></iframe>'} else{ii=""}
$("<div class='ui-widget-overlay jqgrid-overlay' id='lui_"+this.id+"'></div>").append(ii).insertBefore(gv);$("<div class='loading ui-state-default ui-state-active' id='load_"+this.id+"'>"+this.p.loadtext+"</div>").insertBefore(gv);$(this).attr({cellspacing:"0",cellpadding:"0",border:"0","role":"grid","aria-multiselectable":!!this.p.multiselect,"aria-labelledby":"gbox_"+this.id});var sortkeys=["shiftKey","altKey","ctrlKey"],intNum=function(val,defval){val=parseInt(val,10);if(isNaN(val)){return defval?defval:0}
else{return val}},formatCol=function(pos,rowInd,tv,rawObject,rowId,rdata){var cm=ts.p.colModel[pos],ral=cm.align,result="style=\"",clas=cm.classes,nm=cm.name,celp,acp=[];if(ral){result+="text-align:"+ral+";"}
if(cm.hidden===true){result+="display:none;"}
if(rowInd===0){result+="width: "+grid.headers[pos].width+"px;"} else if(cm.cellattr&&$.isFunction(cm.cellattr)){celp=cm.cellattr.call(ts,rowId,tv,rawObject,cm,rdata);if(celp&&typeof(celp)==="string"){celp=celp.replace(/style/i,'style').replace(/title/i,'title');if(celp.indexOf('title')>-1){cm.title=false}
if(celp.indexOf('class')>-1){clas=undefined}
acp=celp.split("style");if(acp.length===2){acp[1]=$.trim(acp[1].replace("=",""));if(acp[1].indexOf("'")===0||acp[1].indexOf('"')===0){acp[1]=acp[1].substring(1)}
result+=acp[1].replace(/'/gi,'"')} else{result+="\""}}}
if(!acp.length){acp[0]="";result+="\""}
result+=(clas!==undefined?(" class=\""+clas+"\""):"")+((cm.title&&tv)?(" title=\""+$.jgrid.stripHtml(tv)+"\""):"");result+=" aria-describedby=\""+ts.p.id+"_"+nm+"\"";return result+acp[0]},cellVal=function(val){return val===undefined||val===null||val===""?"&#160;":(ts.p.autoencode?$.jgrid.htmlEncode(val):val+"")},formatter=function(rowId,cellval,colpos,rwdat,_act){var cm=ts.p.colModel[colpos],v;if(typeof cm.formatter!=='undefined'){var opts={rowId:rowId,colModel:cm,gid:ts.p.id,pos:colpos};if($.isFunction(cm.formatter)){v=cm.formatter.call(ts,cellval,opts,rwdat,_act)} else if($.fmatter){v=$.fn.fmatter(cm.formatter,cellval,opts,rwdat,_act)} else{v=cellVal(cellval)}} else{v=cellVal(cellval)}
return v},addCell=function(rowId,cell,pos,irow,srvr){var v,prp;v=formatter(rowId,cell,pos,srvr,'add');prp=formatCol(pos,irow,v,srvr,rowId,true);return "<td role=\"gridcell\" "+prp+">"+v+"</td>"},addMulti=function(rowid,pos,irow){var v="<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+ts.p.id+"_"+rowid+"\" class=\"cbox\" name=\"jqg_"+ts.p.id+"_"+rowid+"\"/>",prp=formatCol(pos,irow,'',null,rowid,true);return "<td role=\"gridcell\" "+prp+">"+v+"</td>"},addRowNum=function(pos,irow,pG,rN){var v=(parseInt(pG,10)-1)*parseInt(rN,10)+1+irow,prp=formatCol(pos,irow,v,null,irow,true);return "<td role=\"gridcell\" class=\"ui-state-default jqgrid-rownum\" "+prp+">"+v+"</td>"},reader=function(datatype){var field,f=[],j=0,i;for(i=0;i<ts.p.colModel.length;i++){field=ts.p.colModel[i];if(field.name!=='cb'&&field.name!=='subgrid'&&field.name!=='rn'){f[j]=datatype=="local"?field.name:((datatype=="xml"||datatype==="xmlstring")?field.xmlmap||field.name:field.jsonmap||field.name);j++}}
return f},orderedCols=function(offset){var order=ts.p.remapColumns;if(!order||!order.length){order=$.map(ts.p.colModel, function(v,i){return i})}
if(offset){order=$.map(order, function(v){return v<offset?null:v-offset})}
return order},emptyRows=function(parent,scroll,locdata){if(ts.p.deepempty){$("#"+$.jgrid.jqID(ts.p.id)+" tbody:first tr:gt(0)").remove()}
else{var trf=$("#"+$.jgrid.jqID(ts.p.id)+" tbody:first tr:first")[0];$("#"+$.jgrid.jqID(ts.p.id)+" tbody:first").empty().append(trf)}
if(scroll&&ts.p.scroll){$(">div:first",parent).css({height:"auto"}).children("div:first").css({height:0,display:"none"});parent.scrollTop=0}
if(locdata===true){if(ts.p.treeGrid===true){ts.p.data=[];ts.p._index={}}}},refreshIndex=function(){var datalen=ts.p.data.length,idname,i,val,ni=ts.p.rownumbers===true?1:0,gi=ts.p.multiselect===true?1:0,si=ts.p.subGrid===true?1:0;if(ts.p.keyIndex===false||ts.p.loadonce===true){idname=ts.p.localReader.id} else{idname=ts.p.colModel[ts.p.keyIndex+gi+si+ni].name}
for(i=0;i<datalen;i++){val=$.jgrid.getAccessor(ts.p.data[i],idname);ts.p._index[val]=i}},addXmlData=function(xml,t,rcnt,more,adjust){var startReq=new Date(),locdata=(ts.p.datatype!="local"&&ts.p.loadonce)||ts.p.datatype=="xmlstring",xmlid="_id_",xmlRd=ts.p.xmlReader,frd=ts.p.datatype=="local"?"local":"xml";if(locdata){ts.p.data=[];ts.p._index={};ts.p.localReader.id=xmlid}
ts.p.reccount=0;if($.isXMLDoc(xml)){if(ts.p.treeANode===-1&&!ts.p.scroll){emptyRows(t,false,true);rcnt=1} else{rcnt=rcnt>1?rcnt:1}} else{return}
var i,fpos,ir=0,v,row,gi=0,si=0,ni=0,idn,getId,f=[],F,rd={},xmlr,rid,rowData=[],cn=(ts.p.altRows===true)?" "+ts.p.altclass:"",cn1;if(!xmlRd.repeatitems){f=reader(frd)}
if(ts.p.keyIndex===false){idn=xmlRd.id} else{idn=ts.p.keyIndex}
if(f.length>0&&!isNaN(idn)){if(ts.p.remapColumns&&ts.p.remapColumns.length){idn=$.inArray(idn,ts.p.remapColumns)}
idn=f[idn]}
if((idn+"").indexOf("[")===-1){if(f.length){getId=function(trow,k){return $(idn,trow).text()||k}} else{getId=function(trow,k){return $(xmlRd.cell,trow).eq(idn).text()||k}}}
else{getId=function(trow,k){return trow.getAttribute(idn.replace(/[\[\]]/g,""))||k}}
ts.p.userData={};ts.p.page=$.jgrid.getXmlData(xml,xmlRd.page)||0;ts.p.lastpage=$.jgrid.getXmlData(xml,xmlRd.total);if(ts.p.lastpage===undefined){ts.p.lastpage=1}
ts.p.records=$.jgrid.getXmlData(xml,xmlRd.records)||0;if($.isFunction(xmlRd.userdata)){ts.p.userData=xmlRd.userdata.call(ts,xml)||{}} else{$.jgrid.getXmlData(xml,xmlRd.userdata,true).each(function(){ts.p.userData[this.getAttribute("name")]=$(this).text()})}
var gxml=$.jgrid.getXmlData(xml,xmlRd.root,true);gxml=$.jgrid.getXmlData(gxml,xmlRd.row,true);if(!gxml){gxml=[]}
var gl=gxml.length,j=0,grpdata={},rn=parseInt(ts.p.rowNum,10);if(gl>0&&ts.p.page<=0){ts.p.page=1}
if(gxml&&gl){var br=ts.p.scroll?$.jgrid.randId():1,altr;if(adjust){rn *=adjust+1}
var afterInsRow=$.isFunction(ts.p.afterInsertRow),hiderow="";if(ts.p.grouping&&ts.p.groupingView.groupCollapse===true){hiderow=" style=\"display:none;\""}
while(j<gl){xmlr=gxml[j];rid=getId(xmlr,br+j);rid=ts.p.idPrefix+rid;altr=rcnt===0?0:rcnt+1;cn1=(altr+j)%2==1?cn:'';rowData.push("<tr"+hiderow+" id=\""+rid+"\" tabindex=\"-1\" role=\"row\" class =\"ui-widget-content jqgrow ui-row-"+ts.p.direction+""+cn1+"\">");if(ts.p.rownumbers===true){rowData.push(addRowNum(0,j,ts.p.page,ts.p.rowNum));ni=1}
if(ts.p.multiselect===true){rowData.push(addMulti(rid,ni,j));gi=1}
if(ts.p.subGrid===true){rowData.push($(ts).jqGrid("addSubGridCell",gi+ni,j+rcnt));si=1}
if(xmlRd.repeatitems){if(!F){F=orderedCols(gi+si+ni)}
var cells=$.jgrid.getXmlData(xmlr,xmlRd.cell,true);$.each(F, function(k){var cell=cells[this];if(!cell){return false}
v=cell.textContent||cell.text;rd[ts.p.colModel[k+gi+si+ni].name]=v;rowData.push(addCell(rid,v,k+gi+si+ni,j+rcnt,xmlr))})} else{for(i=0;i<f.length;i++){v=$.jgrid.getXmlData(xmlr,f[i]);rd[ts.p.colModel[i+gi+si+ni].name]=v;rowData.push(addCell(rid,v,i+gi+si+ni,j+rcnt,xmlr))}}
rowData.push("</tr>");if(ts.p.grouping){var grlen=ts.p.groupingView.groupField.length,grpitem=[];for(var z=0;z<grlen;z++){grpitem.push(rd[ts.p.groupingView.groupField[z]])}
grpdata=$(ts).jqGrid('groupingPrepare',rowData,grpitem,grpdata,rd);rowData=[]}
if(locdata||ts.p.treeGrid===true){rd[xmlid]=rid;ts.p.data.push(rd);ts.p._index[rid]=ts.p.data.length-1}
if(ts.p.gridview===false){$("tbody:first",t).append(rowData.join(''));if(afterInsRow){ts.p.afterInsertRow.call(ts,rid,rd,xmlr)}
rowData=[]}
rd={};ir++;j++;if(ir==rn){break}}}
if(ts.p.gridview===true){fpos=ts.p.treeANode>-1?ts.p.treeANode:0;if(ts.p.grouping){$(ts).jqGrid('groupingRender',grpdata,ts.p.colModel.length);grpdata=null} else if(ts.p.treeGrid===true&&fpos>0){$(ts.rows[fpos]).after(rowData.join(''))} else{$("tbody:first",t).append(rowData.join(''))}}
if(ts.p.subGrid===true){try{$(ts).jqGrid("addSubGrid",gi+ni)} catch(_){}}
ts.p.totaltime=new Date()-startReq;if(ir>0){if(ts.p.records===0){ts.p.records=gl}}
rowData=null;if(ts.p.treeGrid===true){try{$(ts).jqGrid("setTreeNode",fpos+1,ir+fpos+1)} catch(e){}}
if(!ts.p.treeGrid&&!ts.p.scroll){ts.grid.bDiv.scrollTop=0}
ts.p.reccount=ir;ts.p.treeANode=-1;if(ts.p.userDataOnFooter){$(ts).jqGrid("footerData","set",ts.p.userData,true)}
if(locdata){ts.p.records=gl;ts.p.lastpage=Math.ceil(gl/rn)}
if(!more){ts.updatepager(false,true)}
if(locdata){while(ir<gl){xmlr=gxml[ir];rid=getId(xmlr,ir);rid=ts.p.idPrefix+rid;if(xmlRd.repeatitems){if(!F){F=orderedCols(gi+si+ni)}
var cells2=$.jgrid.getXmlData(xmlr,xmlRd.cell,true);$.each(F, function(k){var cell=cells2[this];if(!cell){return false}
v=cell.textContent||cell.text;rd[ts.p.colModel[k+gi+si+ni].name]=v})} else{for(i=0;i<f.length;i++){v=$.jgrid.getXmlData(xmlr,f[i]);rd[ts.p.colModel[i+gi+si+ni].name]=v}}
rd[xmlid]=rid;ts.p.data.push(rd);ts.p._index[rid]=ts.p.data.length-1;rd={};ir++}}},addJSONData=function(data,t,rcnt,more,adjust){var startReq=new Date();if(data){if(ts.p.treeANode===-1&&!ts.p.scroll){emptyRows(t,false,true);rcnt=1} else{rcnt=rcnt>1?rcnt:1}} else{return}
var dReader,locid="_id_",frd,locdata=(ts.p.datatype!="local"&&ts.p.loadonce)||ts.p.datatype=="jsonstring";if(locdata){ts.p.data=[];ts.p._index={};ts.p.localReader.id=locid}
ts.p.reccount=0;if(ts.p.datatype=="local"){dReader=ts.p.localReader;frd='local'} else{dReader=ts.p.jsonReader;frd='json'}
var ir=0,v,i,j,f=[],F,cur,gi=0,si=0,ni=0,len,drows,idn,rd={},fpos,idr,rowData=[],cn=(ts.p.altRows===true)?" "+ts.p.altclass:"",cn1,lp;ts.p.page=$.jgrid.getAccessor(data,dReader.page)||0;lp=$.jgrid.getAccessor(data,dReader.total);ts.p.lastpage=lp===undefined?1:lp;ts.p.records=$.jgrid.getAccessor(data,dReader.records)||0;ts.p.userData=$.jgrid.getAccessor(data,dReader.userdata)||{};if(!dReader.repeatitems){F=f=reader(frd)}
if(ts.p.keyIndex===false){idn=dReader.id} else{idn=ts.p.keyIndex}
if(f.length>0&&!isNaN(idn)){if(ts.p.remapColumns&&ts.p.remapColumns.length){idn=$.inArray(idn,ts.p.remapColumns)}
idn=f[idn]}
drows=$.jgrid.getAccessor(data,dReader.root);if(!drows){drows=[]}
len=drows.length;i=0;if(len>0&&ts.p.page<=0){ts.p.page=1}
var rn=parseInt(ts.p.rowNum,10),br=ts.p.scroll?$.jgrid.randId():1,altr;if(adjust){rn *=adjust+1}
var afterInsRow=$.isFunction(ts.p.afterInsertRow),grpdata={},hiderow="";if(ts.p.grouping&&ts.p.groupingView.groupCollapse===true){hiderow=" style=\"display:none;\""}
while(i<len){cur=drows[i];idr=$.jgrid.getAccessor(cur,idn);if(idr===undefined){idr=br+i;if(f.length===0){if(dReader.cell){var ccur=$.jgrid.getAccessor(cur,dReader.cell);idr=ccur!==undefined?ccur[idn]||idr:idr;ccur=null}}}
idr=ts.p.idPrefix+idr;altr=rcnt===1?0:rcnt;cn1=(altr+i)%2==1?cn:'';rowData.push("<tr"+hiderow+" id=\""+idr+"\" tabindex=\"-1\" role=\"row\" class= \"ui-widget-content jqgrow ui-row-"+ts.p.direction+""+cn1+"\">");if(ts.p.rownumbers===true){rowData.push(addRowNum(0,i,ts.p.page,ts.p.rowNum));ni=1}
if(ts.p.multiselect){rowData.push(addMulti(idr,ni,i));gi=1}
if(ts.p.subGrid){rowData.push($(ts).jqGrid("addSubGridCell",gi+ni,i+rcnt));si=1}
if(dReader.repeatitems){if(dReader.cell){cur=$.jgrid.getAccessor(cur,dReader.cell)}
if(!F){F=orderedCols(gi+si+ni)}}
for(j=0;j<F.length;j++){v=$.jgrid.getAccessor(cur,F[j]);rowData.push(addCell(idr,v,j+gi+si+ni,i+rcnt,cur));rd[ts.p.colModel[j+gi+si+ni].name]=v}
rowData.push("</tr>");if(ts.p.grouping){var grlen=ts.p.groupingView.groupField.length,grpitem=[];for(var z=0;z<grlen;z++){grpitem.push(rd[ts.p.groupingView.groupField[z]])}
grpdata=$(ts).jqGrid('groupingPrepare',rowData,grpitem,grpdata,rd);rowData=[]}
if(locdata||ts.p.treeGrid===true){rd[locid]=idr;ts.p.data.push(rd);ts.p._index[idr]=ts.p.data.length-1}
if(ts.p.gridview===false){$("#"+$.jgrid.jqID(ts.p.id)+" tbody:first").append(rowData.join(''));if(afterInsRow){ts.p.afterInsertRow.call(ts,idr,rd,cur)}
rowData=[]}
rd={};ir++;i++;if(ir==rn){break}}
if(ts.p.gridview===true){fpos=ts.p.treeANode>-1?ts.p.treeANode:0;if(ts.p.grouping){$(ts).jqGrid('groupingRender',grpdata,ts.p.colModel.length);grpdata=null} else if(ts.p.treeGrid===true&&fpos>0){$(ts.rows[fpos]).after(rowData.join(''))} else{$("#"+$.jgrid.jqID(ts.p.id)+" tbody:first").append(rowData.join(''))}}
if(ts.p.subGrid===true){try{$(ts).jqGrid("addSubGrid",gi+ni)} catch(_){}}
ts.p.totaltime=new Date()-startReq;if(ir>0){if(ts.p.records===0){ts.p.records=len}}
rowData=null;if(ts.p.treeGrid===true){try{$(ts).jqGrid("setTreeNode",fpos+1,ir+fpos+1)} catch(e){}}
if(!ts.p.treeGrid&&!ts.p.scroll){ts.grid.bDiv.scrollTop=0}
ts.p.reccount=ir;ts.p.treeANode=-1;if(ts.p.userDataOnFooter){$(ts).jqGrid("footerData","set",ts.p.userData,true)}
if(locdata){ts.p.records=len;ts.p.lastpage=Math.ceil(len/rn)}
if(!more){ts.updatepager(false,true)}
if(locdata){while(ir<len&&drows[ir]){cur=drows[ir];idr=$.jgrid.getAccessor(cur,idn);if(idr===undefined){idr=br+ir;if(f.length===0){if(dReader.cell){var ccur2=$.jgrid.getAccessor(cur,dReader.cell);idr=ccur2[idn]||idr;ccur2=null}}}
if(cur){idr=ts.p.idPrefix+idr;if(dReader.repeatitems){if(dReader.cell){cur=$.jgrid.getAccessor(cur,dReader.cell)}
if(!F){F=orderedCols(gi+si+ni)}}
for(j=0;j<F.length;j++){v=$.jgrid.getAccessor(cur,F[j]);rd[ts.p.colModel[j+gi+si+ni].name]=v}
rd[locid]=idr;ts.p.data.push(rd);ts.p._index[idr]=ts.p.data.length-1;rd={}}
ir++}}},addLocalData=function(){var st,fndsort=false,cmtypes={},grtypes=[],grindexes=[],srcformat,sorttype,newformat;if(!$.isArray(ts.p.data)){return}
var grpview=ts.p.grouping?ts.p.groupingView:false;$.each(ts.p.colModel,function(i,v){sorttype=this.sorttype||"text";if(sorttype=="date"||sorttype=="datetime"){if(this.formatter&&typeof(this.formatter)==='string'&&this.formatter=='date'){if(this.formatoptions&&this.formatoptions.srcformat){srcformat=this.formatoptions.srcformat} else{srcformat=$.jgrid.formatter.date.srcformat}
if(this.formatoptions&&this.formatoptions.newformat){newformat=this.formatoptions.newformat} else{newformat=$.jgrid.formatter.date.newformat}} else{srcformat=newformat=this.datefmt||"Y-m-d"}
cmtypes[this.name]={"stype":sorttype,"srcfmt":srcformat,"newfmt":newformat}} else{cmtypes[this.name]={"stype":sorttype,"srcfmt":'',"newfmt":''}}
if(ts.p.grouping&&this.name==grpview.groupField[0]){var grindex=this.name;if(typeof this.index!='undefined'){grindex=this.index}
grtypes[0]=cmtypes[grindex];grindexes.push(grindex)}
if(!fndsort&&(this.index==ts.p.sortname||this.name==ts.p.sortname)){st=this.name;fndsort=true}});if(ts.p.treeGrid){$(ts).jqGrid("SortTree",st,ts.p.sortorder,cmtypes[st].stype,cmtypes[st].srcfmt);return}
var compareFnMap={'eq':function(queryObj,op){return queryObj.equals},'ne':function(queryObj,op){return queryObj.notEquals},'lt':function(queryObj,op){return queryObj.less},'le':function(queryObj,op){return queryObj.lessOrEquals},'gt':function(queryObj,op){return queryObj.greater},'ge':function(queryObj,op){return queryObj.greaterOrEquals},'cn':function(queryObj,op){return queryObj.contains},'nc':function(queryObj,op){return op==="OR"?queryObj.orNot().contains:queryObj.andNot().contains},'bw':function(queryObj,op){return queryObj.startsWith},'bn':function(queryObj,op){return op==="OR"?queryObj.orNot().startsWith:queryObj.andNot().startsWith},'en':function(queryObj,op){return op==="OR"?queryObj.orNot().endsWith:queryObj.andNot().endsWith},'ew':function(queryObj,op){return queryObj.endsWith},'ni':function(queryObj,op){return op==="OR"?queryObj.orNot().equals:queryObj.andNot().equals},'in':function(queryObj,op){return queryObj.equals},'nu':function(queryObj,op){return queryObj.isNull},'nn':function(queryObj,op){return op==="OR"?queryObj.orNot().isNull:queryObj.andNot().isNull}},query=$.jgrid.from(ts.p.data);if(ts.p.ignoreCase){query=query.ignoreCase()}
function tojLinq(group){var s=0,index,gor,ror,opr,rule;if(group.groups!==undefined){gor=group.groups.length&&group.groupOp.toString().toUpperCase()==="OR";if(gor){query.orBegin()}
for(index=0;index<group.groups.length;index++){if(s>0&&gor){query.or()}
try{tojLinq(group.groups[index])} catch(e){alert(e)}
s++}
if(gor){query.orEnd()}}
if(group.rules!==undefined){if(s>0){var result=query.select();query=$.jgrid.from(result);if(ts.p.ignoreCase){query=query.ignoreCase()}}
try{ror=group.rules.length&&group.groupOp.toString().toUpperCase()==="OR";if(ror){query.orBegin()}
for(index=0;index<group.rules.length;index++){rule=group.rules[index];opr=group.groupOp.toString().toUpperCase();if(compareFnMap[rule.op]&&rule.field){if(s>0&&opr&&opr==="OR"){query=query.or()}
query=compareFnMap[rule.op](query,opr)(rule.field,rule.data,cmtypes[rule.field])}
s++}
if(ror){query.orEnd()}} catch(g){alert(g)}}}
if(ts.p.search===true){var srules=ts.p.postData.filters;if(srules){if(typeof srules=="string"){srules=$.jgrid.parse(srules)}
tojLinq(srules)} else{try{query=compareFnMap[ts.p.postData.searchOper](query)(ts.p.postData.searchField,ts.p.postData.searchString,cmtypes[ts.p.postData.searchField])} catch(se){}}}
if(ts.p.grouping){query.orderBy(grindexes,grpview.groupOrder[0],grtypes[0].stype,grtypes[0].srcfmt);grpview.groupDataSorted=true}
if(st&&ts.p.sortorder&&fndsort){if(ts.p.sortorder.toUpperCase()=="DESC"){query.orderBy(ts.p.sortname,"d",cmtypes[st].stype,cmtypes[st].srcfmt)} else{query.orderBy(ts.p.sortname,"a",cmtypes[st].stype,cmtypes[st].srcfmt)}}
var queryResults=query.select(),recordsperpage=parseInt(ts.p.rowNum,10),total=queryResults.length,page=parseInt(ts.p.page,10),totalpages=Math.ceil(total/recordsperpage),retresult={};queryResults=queryResults.slice((page-1)*recordsperpage,page*recordsperpage);query=null;cmtypes=null;retresult[ts.p.localReader.total]=totalpages;retresult[ts.p.localReader.page]=page;retresult[ts.p.localReader.records]=total;retresult[ts.p.localReader.root]=queryResults;retresult[ts.p.localReader.userdata]=ts.p.userData;queryResults=null;return retresult},updatepager=function(rn,dnd){var cp,last,base,from,to,tot,fmt,pgboxes="",sppg,tspg=ts.p.pager?"_"+$.jgrid.jqID(ts.p.pager.substr(1)):"",tspg_t=ts.p.toppager?"_"+ts.p.toppager.substr(1):"";base=parseInt(ts.p.page,10)-1;if(base<0){base=0}
base=base*parseInt(ts.p.rowNum,10);to=base+ts.p.reccount;if(ts.p.scroll){var rows=$("tbody:first > tr:gt(0)",ts.grid.bDiv);base=to-rows.length;ts.p.reccount=rows.length;var rh=rows.outerHeight()||ts.grid.prevRowHeight;if(rh){var top=base * rh;var height=parseInt(ts.p.records,10) * rh;$(">div:first",ts.grid.bDiv).css({height:height}).children("div:first").css({height:top,display:top?"":"none"})}
ts.grid.bDiv.scrollLeft=ts.grid.hDiv.scrollLeft}
pgboxes=ts.p.pager?ts.p.pager:"";pgboxes+=ts.p.toppager?(pgboxes?","+ts.p.toppager:ts.p.toppager):"";if(pgboxes){fmt=$.jgrid.formatter.integer||{};cp=intNum(ts.p.page);last=intNum(ts.p.lastpage);$(".selbox",pgboxes)[this.p.useProp?'prop':'attr']("disabled",false);if(ts.p.pginput===true){$('.ui-pg-input',pgboxes).val(ts.p.page);sppg=ts.p.toppager?'#sp_1'+tspg+",#sp_1"+tspg_t:'#sp_1'+tspg;$(sppg).html($.fmatter?$.fmatter.util.NumberFormat(ts.p.lastpage,fmt):ts.p.lastpage)}
if(ts.p.viewrecords){if(ts.p.reccount===0){$(".ui-paging-info",pgboxes).html(ts.p.emptyrecords)} else{from=base+1;tot=ts.p.records;if($.fmatter){from=$.fmatter.util.NumberFormat(from,fmt);to=$.fmatter.util.NumberFormat(to,fmt);tot=$.fmatter.util.NumberFormat(tot,fmt)}
$(".ui-paging-info",pgboxes).html($.jgrid.format(ts.p.recordtext,from,to,tot))}}
if(ts.p.pgbuttons===true){if(cp<=0){cp=last=0}
if(cp==1||cp===0){$("#first"+tspg+", #prev"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');if(ts.p.toppager){$("#first_t"+tspg_t+", #prev_t"+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover')}} else{$("#first"+tspg+", #prev"+tspg).removeClass('ui-state-disabled');if(ts.p.toppager){$("#first_t"+tspg_t+", #prev_t"+tspg_t).removeClass('ui-state-disabled')}}
if(cp==last||cp===0){$("#next"+tspg+", #last"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');if(ts.p.toppager){$("#next_t"+tspg_t+", #last_t"+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover')}} else{$("#next"+tspg+", #last"+tspg).removeClass('ui-state-disabled');if(ts.p.toppager){$("#next_t"+tspg_t+", #last_t"+tspg_t).removeClass('ui-state-disabled')}}}}
if(rn===true&&ts.p.rownumbers===true){$("td.jqgrid-rownum",ts.rows).each(function(i){$(this).html(base+1+i)})}
if(dnd&&ts.p.jqgdnd){$(ts).jqGrid('gridDnD','updateDnD')}
if($.isFunction(ts.p.gridComplete)){ts.p.gridComplete.call(ts)}
if($.isFunction(ts.p._complete)){ts.p._complete.call(ts)}},beginReq=function(){ts.grid.hDiv.loading=true;if(ts.p.hiddengrid){return}
switch(ts.p.loadui){case "disable":break;case "enable":$("#load_"+$.jgrid.jqID(ts.p.id)).show();break;case "block":$("#lui_"+$.jgrid.jqID(ts.p.id)).show();$("#load_"+$.jgrid.jqID(ts.p.id)).show();break}},endReq=function(){ts.grid.hDiv.loading=false;switch(ts.p.loadui){case "disable":break;case "enable":$("#load_"+$.jgrid.jqID(ts.p.id)).hide();break;case "block":$("#lui_"+$.jgrid.jqID(ts.p.id)).hide();$("#load_"+$.jgrid.jqID(ts.p.id)).hide();break}},populate=function(npage){if(!ts.grid.hDiv.loading){var pvis=ts.p.scroll&&npage===false;var prm={},dt,dstr,pN=ts.p.prmNames;if(ts.p.page<=0){ts.p.page=1}
if(pN.search!==null){prm[pN.search]=ts.p.search} if(pN.nd!==null){prm[pN.nd]=new Date().getTime()}
if(pN.rows!==null){prm[pN.rows]=ts.p.rowNum} if(pN.page!==null){prm[pN.page]=ts.p.page}
if(pN.sort!==null){prm[pN.sort]=ts.p.sortname} if(pN.order!==null){prm[pN.order]=ts.p.sortorder}
if(ts.p.rowTotal!==null&&pN.totalrows!==null){prm[pN.totalrows]=ts.p.rowTotal}
var lc=ts.p.loadComplete;var lcf=$.isFunction(lc);if(!lcf){lc=null}
var adjust=0;npage=npage||1;if(npage>1){if(pN.npage!==null){prm[pN.npage]=npage;adjust=npage-1;npage=1} else{lc=function(req){ts.p.page++;ts.grid.hDiv.loading=false;if(lcf){ts.p.loadComplete.call(ts,req)}
populate(npage-1)}}} else if(pN.npage!==null){delete ts.p.postData[pN.npage]}
if(ts.p.grouping){$(ts).jqGrid('groupingSetup');if(ts.p.groupingView.groupDataSorted===true){prm[pN.sort]=ts.p.groupingView.groupField[0]+" "+ts.p.groupingView.groupOrder[0]+", "+prm[pN.sort]}}
$.extend(ts.p.postData,prm);var rcnt=!ts.p.scroll?1:ts.rows.length-1;if($.isFunction(ts.p.datatype)){ts.p.datatype.call(ts,ts.p.postData,"load_"+ts.p.id);return}
else if($.isFunction(ts.p.beforeRequest)){var bfr=ts.p.beforeRequest.call(ts);if(bfr===undefined){bfr=true}
if(bfr===false){return}}
dt=ts.p.datatype.toLowerCase();switch(dt){case "json":case "jsonp":case "xml":case "script":$.ajax($.extend({url:ts.p.url,type:ts.p.mtype,dataType:dt,data:$.isFunction(ts.p.serializeGridData)?ts.p.serializeGridData.call(ts,ts.p.postData):ts.p.postData,success:function(data,st,xhr){if($.isFunction(ts.p.beforeProcessing)){ts.p.beforeProcessing.call(ts,data,st,xhr)}
if(dt==="xml"){addXmlData(data,ts.grid.bDiv,rcnt,npage>1,adjust)}
else{addJSONData(data,ts.grid.bDiv,rcnt,npage>1,adjust)}
if(lc){lc.call(ts,data)}
if(pvis){ts.grid.populateVisible()}
if(ts.p.loadonce||ts.p.treeGrid){ts.p.datatype="local"}
data=null;if(npage===1){endReq()}},error:function(xhr,st,err){if($.isFunction(ts.p.loadError)){ts.p.loadError.call(ts,xhr,st,err)}
if(npage===1){endReq()}
xhr=null},beforeSend: function(xhr,settings){var gotoreq=true;if($.isFunction(ts.p.loadBeforeSend)){gotoreq=ts.p.loadBeforeSend.call(ts,xhr,settings)}
if(gotoreq===undefined){gotoreq=true}
if(gotoreq===false){return false} else{beginReq()}}},$.jgrid.ajaxOptions,ts.p.ajaxGridOptions));break;case "xmlstring":beginReq();dstr=$.jgrid.stringToDoc(ts.p.datastr);addXmlData(dstr,ts.grid.bDiv);if(lcf){ts.p.loadComplete.call(ts,dstr)}
ts.p.datatype="local";ts.p.datastr=null;endReq();break;case "jsonstring":beginReq();if(typeof ts.p.datastr=='string'){dstr=$.jgrid.parse(ts.p.datastr)}
else{dstr=ts.p.datastr}
addJSONData(dstr,ts.grid.bDiv);if(lcf){ts.p.loadComplete.call(ts,dstr)}
ts.p.datatype="local";ts.p.datastr=null;endReq();break;case "local":case "clientside":beginReq();ts.p.datatype="local";var req=addLocalData();addJSONData(req,ts.grid.bDiv,rcnt,npage>1,adjust);if(lc){lc.call(ts,req)}
if(pvis){ts.grid.populateVisible()}
endReq();break}}},setHeadCheckBox=function(checked){$('#cb_'+$.jgrid.jqID(ts.p.id),ts.grid.hDiv)[ts.p.useProp?'prop':'attr']("checked",checked);var fid=ts.p.frozenColumns?ts.p.id+"_frozen":"";if(fid){$('#cb_'+$.jgrid.jqID(ts.p.id),ts.grid.fhDiv)[ts.p.useProp?'prop':'attr']("checked",checked)}},setPager=function(pgid,tp){var sep="<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>",pginp="",pgl="<table cellspacing='0' cellpadding='0' border='0' style='table-layout:auto;' class='ui-pg-table'><tbody><tr>",str="",pgcnt,lft,cent,rgt,twd,tdw,i,clearVals=function(onpaging){var ret;if($.isFunction(ts.p.onPaging)){ret=ts.p.onPaging.call(ts,onpaging)}
ts.p.selrow=null;if(ts.p.multiselect){ts.p.selarrrow=[];setHeadCheckBox(false)}
ts.p.savedRow=[];if(ret=='stop'){return false}
return true};pgid=pgid.substr(1);tp+="_"+pgid;pgcnt="pg_"+pgid;lft=pgid+"_left";cent=pgid+"_center";rgt=pgid+"_right";$("#"+$.jgrid.jqID(pgid)).append("<div id='"+pgcnt+"' class='ui-pager-control' role='group'><table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;' role='row'><tbody><tr><td id='"+lft+"' align='left'></td><td id='"+cent+"' align='center' style='white-space:pre;'></td><td id='"+rgt+"' align='right'></td></tr></tbody></table></div>").attr("dir","ltr");if(ts.p.rowList.length>0){str="<td dir='"+dir+"'>";str+="<select class='ui-pg-selbox' role='listbox'>";for(i=0;i<ts.p.rowList.length;i++){str+="<option role=\"option\" value=\""+ts.p.rowList[i]+"\""+((ts.p.rowNum==ts.p.rowList[i])?" selected=\"selected\"":"")+">"+ts.p.rowList[i]+"</option>"}
str+="</select></td>"}
if(dir=="rtl"){pgl+=str}
if(ts.p.pginput===true){pginp="<td dir='"+dir+"'>"+$.jgrid.format(ts.p.pgtext||"","<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+$.jgrid.jqID(pgid)+"'></span>")+"</td>"}
if(ts.p.pgbuttons===true){var po=["first"+tp,"prev"+tp,"next"+tp,"last"+tp];if(dir=="rtl"){po.reverse()}
pgl+="<td id='"+po[0]+"' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-first'></span></td>";pgl+="<td id='"+po[1]+"' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-prev'></span></td>";pgl+=pginp!==""?sep+pginp+sep:"";pgl+="<td id='"+po[2]+"' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-next'></span></td>";pgl+="<td id='"+po[3]+"' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-end'></span></td>"} else if(pginp!==""){pgl+=pginp}
if(dir=="ltr"){pgl+=str}
pgl+="</tr></tbody></table>";if(ts.p.viewrecords===true){$("td#"+pgid+"_"+ts.p.recordpos,"#"+pgcnt).append("<div dir='"+dir+"' style='text-align:"+ts.p.recordpos+"' class='ui-paging-info'></div>")}
$("td#"+pgid+"_"+ts.p.pagerpos,"#"+pgcnt).append(pgl);tdw=$(".ui-jqgrid").css("font-size")||"11px";$(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:"+tdw+";visibility:hidden;' ></div>");twd=$(pgl).clone().appendTo("#testpg").width();$("#testpg").remove();if(twd>0){if(pginp!==""){twd+=50}
$("td#"+pgid+"_"+ts.p.pagerpos,"#"+pgcnt).width(twd)}
ts.p._nvtd=[];ts.p._nvtd[0]=twd?Math.floor((ts.p.width-twd)/2):Math.floor(ts.p.width/3);ts.p._nvtd[1]=0;pgl=null;$('.ui-pg-selbox',"#"+pgcnt).bind('change',function(){ts.p.page=Math.round(ts.p.rowNum*(ts.p.page-1)/this.value-0.5)+1;ts.p.rowNum=this.value;if(tp){$('.ui-pg-selbox',ts.p.pager).val(this.value)}
else if(ts.p.toppager){$('.ui-pg-selbox',ts.p.toppager).val(this.value)}
if(!clearVals('records')){return false}
populate();return false});if(ts.p.pgbuttons===true){$(".ui-pg-button","#"+pgcnt).hover(function(e){if($(this).hasClass('ui-state-disabled')){this.style.cursor='default'} else{$(this).addClass('ui-state-hover');this.style.cursor='pointer'}},function(e){if(!$(this).hasClass('ui-state-disabled')){$(this).removeClass('ui-state-hover');this.style.cursor="default"}});$("#first"+$.jgrid.jqID(tp)+", #prev"+$.jgrid.jqID(tp)+", #next"+$.jgrid.jqID(tp)+", #last"+$.jgrid.jqID(tp)).click( function(e){var cp=intNum(ts.p.page,1),last=intNum(ts.p.lastpage,1),selclick=false,fp=true,pp=true,np=true,lp=true;if(last===0||last===1){fp=false;pp=false;np=false;lp=false}
else if(last>1&&cp>=1){if(cp===1){fp=false;pp=false}
else if(cp===last){np=false;lp=false}} else if(last>1&&cp===0){np=false;lp=false;cp=last-1}
if(this.id==='first'+tp&&fp){ts.p.page=1;selclick=true}
if(this.id==='prev'+tp&&pp){ts.p.page=(cp-1);selclick=true}
if(this.id==='next'+tp&&np){ts.p.page=(cp+1);selclick=true}
if(this.id==='last'+tp&&lp){ts.p.page=last;selclick=true}
if(selclick){if(!clearVals(this.id)){return false}
populate()}
return false})}
if(ts.p.pginput===true){$('input.ui-pg-input',"#"+pgcnt).keypress( function(e){var key=e.charCode?e.charCode:e.keyCode?e.keyCode:0;if(key==13){ts.p.page=($(this).val()>0)?$(this).val():ts.p.page;if(!clearVals('user')){return false}
populate();return false}
return this})}},sortData=function(index,idxcol,reload,sor){if(!ts.p.colModel[idxcol].sortable){return}
var so;if(ts.p.savedRow.length>0){return}
if(!reload){if(ts.p.lastsort==idxcol){if(ts.p.sortorder=='asc'){ts.p.sortorder='desc'} else if(ts.p.sortorder=='desc'){ts.p.sortorder='asc'}} else{ts.p.sortorder=ts.p.colModel[idxcol].firstsortorder||'asc'}
ts.p.page=1}
if(sor){if(ts.p.lastsort==idxcol&&ts.p.sortorder==sor&&!reload){return}
else{ts.p.sortorder=sor}}
var previousSelectedTh=ts.grid.headers[ts.p.lastsort].el,newSelectedTh=ts.grid.headers[idxcol].el;$("span.ui-grid-ico-sort",previousSelectedTh).addClass('ui-state-disabled');$(previousSelectedTh).attr("aria-selected","false");$("span.ui-icon-"+ts.p.sortorder,newSelectedTh).removeClass('ui-state-disabled');$(newSelectedTh).attr("aria-selected","true");if(!ts.p.viewsortcols[0]){if(ts.p.lastsort!=idxcol){$("span.s-ico",previousSelectedTh).hide();$("span.s-ico",newSelectedTh).show()}}
index=index.substring(5+ts.p.id.length+1);ts.p.sortname=ts.p.colModel[idxcol].index||index;so=ts.p.sortorder;if($.isFunction(ts.p.onSortCol)){if(ts.p.onSortCol.call(ts,index,idxcol,so)=='stop'){ts.p.lastsort=idxcol;return}}
if(ts.p.datatype=="local"){if(ts.p.deselectAfterSort){$(ts).jqGrid("resetSelection")}} else{ts.p.selrow=null;if(ts.p.multiselect){setHeadCheckBox(false)}
ts.p.selarrrow=[];ts.p.savedRow=[]}
if(ts.p.scroll){var sscroll=ts.grid.bDiv.scrollLeft;emptyRows(ts.grid.bDiv,true,false);ts.grid.hDiv.scrollLeft=sscroll}
if(ts.p.subGrid&&ts.p.datatype=='local'){$("td.sgexpanded","#"+$.jgrid.jqID(ts.p.id)).each(function(){$(this).trigger("click")})}
populate();ts.p.lastsort=idxcol;if(ts.p.sortname!=index&&idxcol){ts.p.lastsort=idxcol}},setColWidth=function(){var initwidth=0,brd=isSafari?0:ts.p.cellLayout,vc=0,lvc,scw=ts.p.scrollOffset,cw,hs=false,aw,gw=0,cl=0,cr;$.each(ts.p.colModel, function(i){if(typeof this.hidden==='undefined'){this.hidden=false}
this.widthOrg=cw=intNum(this.width,0);if(this.hidden===false){initwidth+=cw+brd;if(this.fixed){gw+=cw+brd} else{vc++}
cl++}});if(isNaN(ts.p.width)){ts.p.width=grid.width=initwidth}
else{grid.width=ts.p.width}
ts.p.tblwidth=initwidth;if(ts.p.shrinkToFit===false&&ts.p.forceFit===true){ts.p.forceFit=false}
if(ts.p.shrinkToFit===true&&vc>0){aw=grid.width-brd*vc-gw;if(!isNaN(ts.p.height)){aw-=scw;hs=true}
initwidth=0;$.each(ts.p.colModel, function(i){if(this.hidden===false&&!this.fixed){cw=Math.round(aw*this.width/(ts.p.tblwidth-brd*vc-gw));this.width=cw;initwidth+=cw;lvc=i}});cr=0;if(hs){if(grid.width-gw-(initwidth+brd*vc)!==scw){cr=grid.width-gw-(initwidth+brd*vc)-scw}} else if(!hs&&Math.abs(grid.width-gw-(initwidth+brd*vc))!==1){cr=grid.width-gw-(initwidth+brd*vc)}
ts.p.colModel[lvc].width+=cr;ts.p.tblwidth=initwidth+cr+brd*vc+gw;if(ts.p.tblwidth>ts.p.width){ts.p.colModel[lvc].width-=(ts.p.tblwidth-parseInt(ts.p.width,10));ts.p.tblwidth=ts.p.width}}},nextVisible=function(iCol){var ret=iCol,j=iCol,i;for(i=iCol+1;i<ts.p.colModel.length;i++){if(ts.p.colModel[i].hidden!==true){j=i;break}}
return j-ret},getOffset=function(iCol){var i,ret={},brd1=isSafari?0:ts.p.cellLayout;ret[0]=ret[1]=ret[2]=0;for(i=0;i<=iCol;i++){if(ts.p.colModel[i].hidden===false){ret[0]+=ts.p.colModel[i].width+brd1}}
if(ts.p.direction=="rtl"){ret[0]=ts.p.width-ret[0]}
ret[0]=ret[0]-ts.grid.bDiv.scrollLeft;if($(ts.grid.cDiv).is(":visible")){ret[1]+=$(ts.grid.cDiv).height()+parseInt($(ts.grid.cDiv).css("padding-top"),10)+parseInt($(ts.grid.cDiv).css("padding-bottom"),10)}
if(ts.p.toolbar[0]===true&&(ts.p.toolbar[1]=='top'||ts.p.toolbar[1]=='both')){ret[1]+=$(ts.grid.uDiv).height()+parseInt($(ts.grid.uDiv).css("border-top-width"),10)+parseInt($(ts.grid.uDiv).css("border-bottom-width"),10)}
if(ts.p.toppager){ret[1]+=$(ts.grid.topDiv).height()+parseInt($(ts.grid.topDiv).css("border-bottom-width"),10)}
ret[2]+=$(ts.grid.bDiv).height()+$(ts.grid.hDiv).height();return ret},getColumnHeaderIndex=function(th){var i,headers=ts.grid.headers,ci=$.jgrid.getCellIndex(th);for(i=0;i<headers.length;i++){if(th===headers[i].el){ci=i;break}}
return ci};this.p.id=this.id;if($.inArray(ts.p.multikey,sortkeys)==-1){ts.p.multikey=false}
ts.p.keyIndex=false;for(i=0;i<ts.p.colModel.length;i++){ts.p.colModel[i]=$.extend(true,{},ts.p.cmTemplate,ts.p.colModel[i].template||{},ts.p.colModel[i]);if(ts.p.keyIndex===false&&ts.p.colModel[i].key===true){ts.p.keyIndex=i}}
ts.p.sortorder=ts.p.sortorder.toLowerCase();if(ts.p.grouping===true){ts.p.scroll=false;ts.p.rownumbers=false;ts.p.subGrid=false;ts.p.treeGrid=false;ts.p.gridview=true}
if(this.p.treeGrid===true){try{$(this).jqGrid("setTreeGrid")} catch(_){}
if(ts.p.datatype!="local"){ts.p.localReader={id:"_id_"}}}
if(this.p.subGrid){try{$(ts).jqGrid("setSubGrid")} catch(s){}}
if(this.p.multiselect){this.p.colNames.unshift("<input role='checkbox' id='cb_"+this.p.id+"' class='cbox' type='checkbox'/>");this.p.colModel.unshift({name:'cb',width:isSafari?ts.p.multiselectWidth+ts.p.cellLayout:ts.p.multiselectWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true})}
if(this.p.rownumbers){this.p.colNames.unshift("");this.p.colModel.unshift({name:'rn',width:ts.p.rownumWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true})}
ts.p.xmlReader=$.extend(true,{root:"rows",row:"row",page:"rows>page",total:"rows>total",records:"rows>records",repeatitems:true,cell:"cell",id:"[id]",userdata:"userdata",subgrid:{root:"rows",row:"row",repeatitems:true,cell:"cell"}},ts.p.xmlReader);ts.p.jsonReader=$.extend(true,{root:"rows",page:"page",total:"total",records:"records",repeatitems:true,cell:"cell",id:"id",userdata:"userdata",subgrid:{root:"rows",repeatitems:true,cell:"cell"}},ts.p.jsonReader);ts.p.localReader=$.extend(true,{root:"rows",page:"page",total:"total",records:"records",repeatitems:false,cell:"cell",id:"id",userdata:"userdata",subgrid:{root:"rows",repeatitems:true,cell:"cell"}},ts.p.localReader);if(ts.p.scroll){ts.p.pgbuttons=false;ts.p.pginput=false;ts.p.rowList=[]}
if(ts.p.data.length){refreshIndex()}
var thead="<thead><tr class='ui-jqgrid-labels' role='rowheader'>",tdc,idn,w,res,sort,td,ptr,tbody,imgs,iac="",idc="";if(ts.p.shrinkToFit===true&&ts.p.forceFit===true){for(i=ts.p.colModel.length-1;i>=0;i--){if(!ts.p.colModel[i].hidden){ts.p.colModel[i].resizable=false;break}}}
if(ts.p.viewsortcols[1]=='horizontal'){iac=" ui-i-asc";idc=" ui-i-desc"}
tdc=isMSIE?"class='ui-th-div-ie'":"";imgs="<span class='s-ico' style='display:none'><span sort='asc' class='ui-grid-ico-sort ui-icon-asc"+iac+" ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-"+dir+"'></span>";imgs+="<span sort='desc' class='ui-grid-ico-sort ui-icon-desc"+idc+" ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-"+dir+"'></span></span>";for(i=0;i<this.p.colNames.length;i++){var tooltip=ts.p.headertitles?(" title=\""+$.jgrid.stripHtml(ts.p.colNames[i])+"\""):"";thead+="<th id='"+ts.p.id+"_"+ts.p.colModel[i].name+"' role='columnheader' class='ui-state-default ui-th-column ui-th-"+dir+"'"+tooltip+">";idn=ts.p.colModel[i].index||ts.p.colModel[i].name;thead+="<div id='jqgh_"+ts.p.id+"_"+ts.p.colModel[i].name+"' "+tdc+">"+ts.p.colNames[i];if(!ts.p.colModel[i].width){ts.p.colModel[i].width=150}
else{ts.p.colModel[i].width=parseInt(ts.p.colModel[i].width,10)}
if(typeof(ts.p.colModel[i].title)!=="boolean"){ts.p.colModel[i].title=true}
if(idn==ts.p.sortname){ts.p.lastsort=i}
thead+=imgs+"</div></th>"}
thead+="</tr></thead>";imgs=null;$(this).append(thead);$("thead tr:first th",this).hover(function(){$(this).addClass('ui-state-hover')},function(){$(this).removeClass('ui-state-hover')});if(this.p.multiselect){var emp=[],chk;$('#cb_'+$.jgrid.jqID(ts.p.id),this).bind('click',function(){ts.p.selarrrow=[];var froz=ts.p.frozenColumns===true?ts.p.id+"_frozen":"";if(this.checked){$(ts.rows).each(function(i){if(i>0){if(!$(this).hasClass("ui-subgrid")&&!$(this).hasClass("jqgroup")&&!$(this).hasClass('ui-state-disabled')){$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id))[ts.p.useProp?'prop':'attr']("checked",true);$(this).addClass("ui-state-highlight").attr("aria-selected","true");ts.p.selarrrow.push(this.id);ts.p.selrow=this.id;if(froz){$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id),ts.grid.fbDiv)[ts.p.useProp?'prop':'attr']("checked",true);$("#"+$.jgrid.jqID(this.id),ts.grid.fbDiv).addClass("ui-state-highlight")}}}});chk=true;emp=[]}
else{$(ts.rows).each(function(i){if(i>0){if(!$(this).hasClass("ui-subgrid")&&!$(this).hasClass('ui-state-disabled')){$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id))[ts.p.useProp?'prop':'attr']("checked",false);$(this).removeClass("ui-state-highlight").attr("aria-selected","false");emp.push(this.id);if(froz){$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(this.id),ts.grid.fbDiv)[ts.p.useProp?'prop':'attr']("checked",false);$("#"+$.jgrid.jqID(this.id),ts.grid.fbDiv).removeClass("ui-state-highlight")}}}});ts.p.selrow=null;chk=false}
if($.isFunction(ts.p.onSelectAll)){ts.p.onSelectAll.call(ts,chk?ts.p.selarrrow:emp,chk)}})}
if(ts.p.autowidth===true){var pw=$(eg).innerWidth();ts.p.width=pw>0?pw:'nw'}
setColWidth();$(eg).css("width",grid.width+"px").append("<div class='ui-jqgrid-resize-mark' id='rs_m"+ts.p.id+"'>&#160;</div>");$(gv).css("width",grid.width+"px");thead=$("thead:first",ts).get(0);var tfoot="";if(ts.p.footerrow){tfoot+="<table role='grid' style='width:"+ts.p.tblwidth+"px' class='ui-jqgrid-ftable' cellspacing='0' cellpadding='0' border='0'><tbody><tr role='row' class='ui-widget-content footrow footrow-"+dir+"'>"}
var thr=$("tr:first",thead),firstr="<tr class='jqgfirstrow' role='row' style='height:auto'>";ts.p.disableClick=false;$("th",thr).each(function(j){w=ts.p.colModel[j].width;if(typeof ts.p.colModel[j].resizable==='undefined'){ts.p.colModel[j].resizable=true}
if(ts.p.colModel[j].resizable){res=document.createElement("span");$(res).html("&#160;").addClass('ui-jqgrid-resize ui-jqgrid-resize-'+dir);if(!$.browser.opera){$(res).css("cursor","col-resize")}
$(this).addClass(ts.p.resizeclass)} else{res=""}
$(this).css("width",w+"px").prepend(res);var hdcol="";if(ts.p.colModel[j].hidden){$(this).css("display","none");hdcol="display:none;"}
firstr+="<td role='gridcell' style='height:0px;width:"+w+"px;"+hdcol+"'></td>";grid.headers[j]={width:w,el:this};sort=ts.p.colModel[j].sortable;if(typeof sort!=='boolean'){ts.p.colModel[j].sortable=true;sort=true}
var nm=ts.p.colModel[j].name;if(!(nm=='cb'||nm=='subgrid'||nm=='rn')){if(ts.p.viewsortcols[2]){$(">div",this).addClass('ui-jqgrid-sortable')}}
if(sort){if(ts.p.viewsortcols[0]){$("div span.s-ico",this).show();if(j==ts.p.lastsort){$("div span.ui-icon-"+ts.p.sortorder,this).removeClass("ui-state-disabled")}}
else if(j==ts.p.lastsort){$("div span.s-ico",this).show();$("div span.ui-icon-"+ts.p.sortorder,this).removeClass("ui-state-disabled")}}
if(ts.p.footerrow){tfoot+="<td role='gridcell' "+formatCol(j,0,'',null,'',false)+">&#160;</td>"}}).mousedown(function(e){if($(e.target).closest("th>span.ui-jqgrid-resize").length!=1){return}
var ci=getColumnHeaderIndex(this);if(ts.p.forceFit===true){ts.p.nv=nextVisible(ci)}
grid.dragStart(ci,e,getOffset(ci));return false}).click(function(e){if(ts.p.disableClick){ts.p.disableClick=false;return false}
var s="th>div.ui-jqgrid-sortable",r,d;if(!ts.p.viewsortcols[2]){s="th>div>span>span.ui-grid-ico-sort"}
var t=$(e.target).closest(s);if(t.length!=1){return}
var ci=getColumnHeaderIndex(this);if(!ts.p.viewsortcols[2]){r=true;d=t.attr("sort")}
sortData($('div',this)[0].id,ci,r,d);return false});if(ts.p.sortable&&$.fn.sortable){try{$(ts).jqGrid("sortableColumns",thr)} catch(e){}}
if(ts.p.footerrow){tfoot+="</tr></tbody></table>"}
firstr+="</tr>";tbody=document.createElement("tbody");this.appendChild(tbody);$(this).addClass('ui-jqgrid-btable').append(firstr);firstr=null;var hTable=$("<table class='ui-jqgrid-htable' style='width:"+ts.p.tblwidth+"px' role='grid' aria-labelledby='gbox_"+this.id+"' cellspacing='0' cellpadding='0' border='0'></table>").append(thead),hg=(ts.p.caption&&ts.p.hiddengrid===true)?true:false,hb=$("<div class='ui-jqgrid-hbox"+(dir=="rtl"?"-rtl":"")+"'></div>");thead=null;grid.hDiv=document.createElement("div");$(grid.hDiv).css({width:grid.width+"px"}).addClass("ui-state-default ui-jqgrid-hdiv").append(hb);$(hb).append(hTable);hTable=null;if(hg){$(grid.hDiv).hide()}
if(ts.p.pager){if(typeof ts.p.pager=="string"){if(ts.p.pager.substr(0,1)!="#"){ts.p.pager="#"+ts.p.pager}}
else{ts.p.pager="#"+$(ts.p.pager).attr("id")}
$(ts.p.pager).css({width:grid.width+"px"}).appendTo(eg).addClass('ui-state-default ui-jqgrid-pager ui-corner-bottom');if(hg){$(ts.p.pager).hide()}
setPager(ts.p.pager,'')}
if(ts.p.cellEdit===false&&ts.p.hoverrows===true){$(ts).bind('mouseover',function(e){ptr=$(e.target).closest("tr.jqgrow");if($(ptr).attr("class")!=="ui-subgrid"){$(ptr).addClass("ui-state-hover")}}).bind('mouseout',function(e){ptr=$(e.target).closest("tr.jqgrow");$(ptr).removeClass("ui-state-hover")})}
var ri,ci;$(ts).before(grid.hDiv).click(function(e){td=e.target;ptr=$(td,ts.rows).closest("tr.jqgrow");if($(ptr).length===0||ptr[0].className.indexOf('ui-state-disabled')>-1||$(td,ts).closest("table.ui-jqgrid-btable")[0].id.replace("_frozen","")!==ts.id){return this}
var scb=$(td).hasClass("cbox"),cSel=true;if($.isFunction(ts.p.beforeSelectRow)){cSel=ts.p.beforeSelectRow.call(ts,ptr[0].id,e)}
if(td.tagName=='A'||((td.tagName=='INPUT'||td.tagName=='TEXTAREA'||td.tagName=='OPTION'||td.tagName=='SELECT')&&!scb)){return this}
if(cSel===true){if(ts.p.cellEdit===true){if(ts.p.multiselect&&scb){$(ts).jqGrid("setSelection",ptr[0].id,true)} else{ri=ptr[0].rowIndex;ci=$.jgrid.getCellIndex(td);try{$(ts).jqGrid("editCell",ri,ci,true)} catch(_){}}} else if(!ts.p.multikey){if(ts.p.multiselect&&ts.p.multiboxonly){if(scb){$(ts).jqGrid("setSelection",ptr[0].id,true)}
else{var frz=ts.p.frozenColumns?ts.p.id+"_frozen":"";$(ts.p.selarrrow).each(function(i,n){var ind=ts.rows.namedItem(n);$(ind).removeClass("ui-state-highlight");$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(n))[ts.p.useProp?'prop':'attr']("checked",false);if(frz){$("#"+$.jgrid.jqID(n),"#"+$.jgrid.jqID(frz)).removeClass("ui-state-highlight");$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+$.jgrid.jqID(n),"#"+$.jgrid.jqID(frz))[ts.p.useProp?'prop':'attr']("checked",false)}});ts.p.selarrrow=[];$(ts).jqGrid("setSelection",ptr[0].id,true)}} else{$(ts).jqGrid("setSelection",ptr[0].id,true)}} else{if(e[ts.p.multikey]){$(ts).jqGrid("setSelection",ptr[0].id,true)} else if(ts.p.multiselect&&scb){scb=$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+ptr[0].id).is(":checked");$("#jqg_"+$.jgrid.jqID(ts.p.id)+"_"+ptr[0].id)[ts.p.useProp?'prop':'attr']("checked",scb)}}
if($.isFunction(ts.p.onCellSelect)){ri=ptr[0].id;ci=$.jgrid.getCellIndex(td);ts.p.onCellSelect.call(ts,ri,ci,$(td).html(),e)}}
return this}).bind('reloadGrid', function(e,opts){if(ts.p.treeGrid===true){ts.p.datatype=ts.p.treedatatype}
if(opts&&opts.current){ts.grid.selectionPreserver(ts)}
if(ts.p.datatype=="local"){$(ts).jqGrid("resetSelection");if(ts.p.data.length){refreshIndex()}}
else if(!ts.p.treeGrid){ts.p.selrow=null;if(ts.p.multiselect){ts.p.selarrrow=[];setHeadCheckBox(false)}
ts.p.savedRow=[]}
if(ts.p.scroll){emptyRows(ts.grid.bDiv,true,false)}
if(opts&&opts.page){var page=opts.page;if(page>ts.p.lastpage){page=ts.p.lastpage}
if(page<1){page=1}
ts.p.page=page;if(ts.grid.prevRowHeight){ts.grid.bDiv.scrollTop=(page-1) * ts.grid.prevRowHeight * ts.p.rowNum} else{ts.grid.bDiv.scrollTop=0}}
if(ts.grid.prevRowHeight&&ts.p.scroll){delete ts.p.lastpage;ts.grid.populateVisible()} else{ts.grid.populate()}
return false});if($.isFunction(this.p.ondblClickRow)){$(this).dblclick(function(e){td=e.target;ptr=$(td,ts.rows).closest("tr.jqgrow");if($(ptr).length===0){return false}
ri=ptr[0].rowIndex;ci=$.jgrid.getCellIndex(td);ts.p.ondblClickRow.call(ts,$(ptr).attr("id"),ri,ci,e);return false})}
if($.isFunction(this.p.onRightClickRow)){$(this).bind('contextmenu', function(e){td=e.target;ptr=$(td,ts.rows).closest("tr.jqgrow");if($(ptr).length===0){return false}
if(!ts.p.multiselect){$(ts).jqGrid("setSelection",ptr[0].id,true)}
ri=ptr[0].rowIndex;ci=$.jgrid.getCellIndex(td);ts.p.onRightClickRow.call(ts,$(ptr).attr("id"),ri,ci,e);return false})}
grid.bDiv=document.createElement("div");if(isMSIE){if(String(ts.p.height).toLowerCase()==="auto"){ts.p.height="100%"}}
$(grid.bDiv).append($('<div style="position:relative;'+(isMSIE&&$.browser.version<8?"height:0.01%;":"")+'"></div>').append('<div></div>').append(this)).addClass("ui-jqgrid-bdiv").css({height:ts.p.height+(isNaN(ts.p.height)?"":"px"),width:(grid.width)+"px"}).scroll(grid.scrollGrid);$("table:first",grid.bDiv).css({width:ts.p.tblwidth+"px"});if(isMSIE){if($("tbody",this).size()==2){$("tbody:gt(0)",this).remove()}
if(ts.p.multikey){$(grid.bDiv).bind("selectstart",function(){return false})}} else{if(ts.p.multikey){$(grid.bDiv).bind("mousedown",function(){return false})}}
if(hg){$(grid.bDiv).hide()}
grid.cDiv=document.createElement("div");var arf=ts.p.hidegrid===true?$("<a role='link' href='javascript:void(0)'/>").addClass('ui-jqgrid-titlebar-close HeaderButton').hover(
function(){arf.addClass('ui-state-hover')},
function(){arf.removeClass('ui-state-hover')}).append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css((dir=="rtl"?"left":"right"),"0px"):"";$(grid.cDiv).append(arf).append("<span class='ui-jqgrid-title"+(dir=="rtl"?"-rtl":"")+"'>"+ts.p.caption+"</span>").addClass("ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix");$(grid.cDiv).insertBefore(grid.hDiv);if(ts.p.toolbar[0]){grid.uDiv=document.createElement("div");if(ts.p.toolbar[1]=="top"){$(grid.uDiv).insertBefore(grid.hDiv)}
else if(ts.p.toolbar[1]=="bottom"){$(grid.uDiv).insertAfter(grid.hDiv)}
if(ts.p.toolbar[1]=="both"){grid.ubDiv=document.createElement("div");$(grid.uDiv).insertBefore(grid.hDiv).addClass("ui-userdata ui-state-default").attr("id","t_"+this.id);$(grid.ubDiv).insertAfter(grid.hDiv).addClass("ui-userdata ui-state-default").attr("id","tb_"+this.id);if(hg){$(grid.ubDiv).hide()}} else{$(grid.uDiv).width(grid.width).addClass("ui-userdata ui-state-default").attr("id","t_"+this.id)}
if(hg){$(grid.uDiv).hide()}}
if(ts.p.toppager){ts.p.toppager=$.jgrid.jqID(ts.p.id)+"_toppager";grid.topDiv=$("<div id='"+ts.p.toppager+"'></div>")[0];ts.p.toppager="#"+ts.p.toppager;$(grid.topDiv).insertBefore(grid.hDiv).addClass('ui-state-default ui-jqgrid-toppager').width(grid.width);setPager(ts.p.toppager,'_t')}
if(ts.p.footerrow){grid.sDiv=$("<div class='ui-jqgrid-sdiv'></div>")[0];hb=$("<div class='ui-jqgrid-hbox"+(dir=="rtl"?"-rtl":"")+"'></div>");$(grid.sDiv).append(hb).insertAfter(grid.hDiv).width(grid.width);$(hb).append(tfoot);grid.footers=$(".ui-jqgrid-ftable",grid.sDiv)[0].rows[0].cells;if(ts.p.rownumbers){grid.footers[0].className='ui-state-default jqgrid-rownum'}
if(hg){$(grid.sDiv).hide()}}
hb=null;if(ts.p.caption){var tdt=ts.p.datatype;if(ts.p.hidegrid===true){$(".ui-jqgrid-titlebar-close",grid.cDiv).click( function(e){var onHdCl=$.isFunction(ts.p.onHeaderClick),elems=".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-pager, .ui-jqgrid-sdiv",counter,self=this;if(ts.p.toolbar[0]===true){if(ts.p.toolbar[1]=='both'){elems+=', #'+$(grid.ubDiv).attr('id')}
elems+=', #'+$(grid.uDiv).attr('id')}
counter=$(elems,"#gview_"+$.jgrid.jqID(ts.p.id)).length;if(ts.p.gridstate=='visible'){$(elems,"#gbox_"+$.jgrid.jqID(ts.p.id)).slideUp("fast", function(){counter--;if(counter===0){$("span",self).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");ts.p.gridstate='hidden';if($("#gbox_"+$.jgrid.jqID(ts.p.id)).hasClass("ui-resizable")){$(".ui-resizable-handle","#gbox_"+$.jgrid.jqID(ts.p.id)).hide()}
if(onHdCl){if(!hg){ts.p.onHeaderClick.call(ts,ts.p.gridstate,e)}}}})} else if(ts.p.gridstate=='hidden'){$(elems,"#gbox_"+$.jgrid.jqID(ts.p.id)).slideDown("fast", function(){counter--;if(counter===0){$("span",self).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");if(hg){ts.p.datatype=tdt;populate();hg=false}
ts.p.gridstate='visible';if($("#gbox_"+$.jgrid.jqID(ts.p.id)).hasClass("ui-resizable")){$(".ui-resizable-handle","#gbox_"+$.jgrid.jqID(ts.p.id)).show()}
if(onHdCl){if(!hg){ts.p.onHeaderClick.call(ts,ts.p.gridstate,e)}}}})}
return false});if(hg){ts.p.datatype="local";$(".ui-jqgrid-titlebar-close",grid.cDiv).trigger("click")}}} else{$(grid.cDiv).hide()}
$(grid.hDiv).after(grid.bDiv).mousemove(function(e){if(grid.resizing){grid.dragMove(e);return false}});$(".ui-jqgrid-labels",grid.hDiv).bind("selectstart", function(){return false});$(document).mouseup(function(e){if(grid.resizing){grid.dragEnd();return false}
return true});ts.formatCol=formatCol;ts.sortData=sortData;ts.updatepager=updatepager;ts.refreshIndex=refreshIndex;ts.setHeadCheckBox=setHeadCheckBox;ts.formatter=function(rowId,cellval,colpos,rwdat,act){return formatter(rowId,cellval,colpos,rwdat,act)};$.extend(grid,{populate:populate,emptyRows:emptyRows});this.grid=grid;ts.addXmlData=function(d){addXmlData(d,ts.grid.bDiv)};ts.addJSONData=function(d){addJSONData(d,ts.grid.bDiv)};this.grid.cols=this.rows[0].cells;populate();ts.p.hiddengrid=false;$(window).unload(function(){ts=null})})};$.jgrid.extend({getGridParam: function(pName){var $t=this[0];if(!$t||!$t.grid){return}
if(!pName){return $t.p}
else{return typeof($t.p[pName])!="undefined"?$t.p[pName]:null}},setGridParam: function(newParams){return this.each(function(){if(this.grid&&typeof(newParams)==='object'){$.extend(true,this.p,newParams)}})},getDataIDs: function(){var ids=[],i=0,len,j=0;this.each(function(){len=this.rows.length;if(len&&len>0){while(i<len){if($(this.rows[i]).hasClass('jqgrow')){ids[j]=this.rows[i].id;j++}
i++}}});return ids},setSelection: function(selection,onsr){return this.each(function(){var $t=this,stat,pt,ner,ia,tpsr,fid;if(selection===undefined){return}
onsr=onsr===false?false:true;pt=$t.rows.namedItem(selection+"");if(!pt||!pt.className||pt.className.indexOf('ui-state-disabled')>-1){return}
function scrGrid(iR){var ch=$($t.grid.bDiv)[0].clientHeight,st=$($t.grid.bDiv)[0].scrollTop,rpos=$t.rows[iR].offsetTop,rh=$t.rows[iR].clientHeight;if(rpos+rh>=ch+st){$($t.grid.bDiv)[0].scrollTop=rpos-(ch+st)+rh+st}
else if(rpos<ch+st){if(rpos<st){$($t.grid.bDiv)[0].scrollTop=rpos}}}
if($t.p.scrollrows===true){ner=$t.rows.namedItem(selection).rowIndex;if(ner>=0){scrGrid(ner)}}
if($t.p.frozenColumns===true){fid=$t.p.id+"_frozen"}
if(!$t.p.multiselect){if(pt.className!=="ui-subgrid"){if($t.p.selrow!=pt.id){$($t.rows.namedItem($t.p.selrow)).removeClass("ui-state-highlight").attr({"aria-selected":"false","tabindex":"-1"});$(pt).addClass("ui-state-highlight").attr({"aria-selected":"true","tabindex":"0"});if(fid){$("#"+$.jgrid.jqID($t.p.selrow),"#"+$.jgrid.jqID(fid)).removeClass("ui-state-highlight");$("#"+$.jgrid.jqID(selection),"#"+$.jgrid.jqID(fid)).addClass("ui-state-highlight")}
stat=true} else{stat=false}
$t.p.selrow=pt.id;if($t.p.onSelectRow&&onsr){$t.p.onSelectRow.call($t,pt.id,stat)}}} else{$t.setHeadCheckBox(false);$t.p.selrow=pt.id;ia=$.inArray($t.p.selrow,$t.p.selarrrow);if(ia===-1){if(pt.className!=="ui-subgrid"){$(pt).addClass("ui-state-highlight").attr("aria-selected","true")}
stat=true;$("#jqg_"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID($t.p.selrow))[$t.p.useProp?'prop':'attr']("checked",stat);$t.p.selarrrow.push($t.p.selrow)} else{if(pt.className!=="ui-subgrid"){$(pt).removeClass("ui-state-highlight").attr("aria-selected","false")}
stat=false;$("#jqg_"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID($t.p.selrow))[$t.p.useProp?'prop':'attr']("checked",stat);$t.p.selarrrow.splice(ia,1);tpsr=$t.p.selarrrow[0];$t.p.selrow=(tpsr===undefined)?null:tpsr}
if(fid){if(ia===-1){$("#"+$.jgrid.jqID(selection),"#"+$.jgrid.jqID(fid)).addClass("ui-state-highlight")} else{$("#"+$.jgrid.jqID(selection),"#"+$.jgrid.jqID(fid)).removeClass("ui-state-highlight")}
$("#jqg_"+$.jgrid.jqID($t.p.id)+"_"+$.jgrid.jqID(selection),"#"+$.jgrid.jqID(fid))[$t.p.useProp?'prop':'attr']("checked",stat)}
if($t.p.onSelectRow&&onsr){$t.p.onSelectRow.call($t,pt.id,stat)}}})},resetSelection: function(rowid){return this.each(function(){var t=this,ind,sr;if(typeof(rowid)!=="undefined"){sr=rowid===t.p.selrow?t.p.selrow:rowid;$("#"+$.jgrid.jqID(t.p.id)+" tbody:first tr#"+$.jgrid.jqID(sr)).removeClass("ui-state-highlight").attr("aria-selected","false");if(t.p.multiselect){$("#jqg_"+$.jgrid.jqID(t.p.id)+"_"+$.jgrid.jqID(sr))[t.p.useProp?'prop':'attr']("checked",false);t.setHeadCheckBox(false)}
sr=null} else if(!t.p.multiselect){if(t.p.selrow){$("#"+$.jgrid.jqID(t.p.id)+" tbody:first tr#"+$.jgrid.jqID(t.p.selrow)).removeClass("ui-state-highlight").attr("aria-selected","false");t.p.selrow=null}} else{$(t.p.selarrrow).each(function(i,n){ind=t.rows.namedItem(n);$(ind).removeClass("ui-state-highlight").attr("aria-selected","false");$("#jqg_"+$.jgrid.jqID(t.p.id)+"_"+$.jgrid.jqID(n))[t.p.useProp?'prop':'attr']("checked",false)});t.setHeadCheckBox(false);t.p.selarrrow=[]}
if(t.p.cellEdit===true){if(parseInt(t.p.iCol,10)>=0&&parseInt(t.p.iRow,10)>=0){$("td:eq("+t.p.iCol+")",t.rows[t.p.iRow]).removeClass("edit-cell ui-state-highlight");$(t.rows[t.p.iRow]).removeClass("selected-row ui-state-hover")}}
t.p.savedRow=[]})},getRowData: function(rowid){var res={},resall,getall=false,len,j=0;this.each(function(){var $t=this,nm,ind;if(typeof(rowid)=='undefined'){getall=true;resall=[];len=$t.rows.length} else{ind=$t.rows.namedItem(rowid);if(!ind){return res}
len=2}
while(j<len){if(getall){ind=$t.rows[j]}
if($(ind).hasClass('jqgrow')){$('td',ind).each( function(i){nm=$t.p.colModel[i].name;if(nm!=='cb'&&nm!=='subgrid'&&nm!=='rn'){if($t.p.treeGrid===true&&nm==$t.p.ExpandColumn){res[nm]=$.jgrid.htmlDecode($("span:first",this).html())} else{try{res[nm]=$.unformat(this,{rowId:ind.id,colModel:$t.p.colModel[i]},i)} catch(e){res[nm]=$.jgrid.htmlDecode($(this).html())}}}});if(getall){resall.push(res);res={}}}
j++}});return resall?resall:res},delRowData: function(rowid){var success=false,rowInd,ia,ri;this.each(function(){var $t=this;rowInd=$t.rows.namedItem(rowid);if(!rowInd){return false}
else{ri=rowInd.rowIndex;$(rowInd).remove();$t.p.records--;$t.p.reccount--;$t.updatepager(true,false);success=true;if($t.p.multiselect){ia=$.inArray(rowid,$t.p.selarrrow);if(ia!=-1){$t.p.selarrrow.splice(ia,1)}}
if(rowid==$t.p.selrow){$t.p.selrow=null}}
if($t.p.datatype=='local'){var pos=$t.p._index[rowid];if(typeof(pos)!='undefined'){$t.p.data.splice(pos,1);$t.refreshIndex()}}
if($t.p.altRows===true&&success){var cn=$t.p.altclass;$($t.rows).each(function(i){if(i%2==1){$(this).addClass(cn)}
else{$(this).removeClass(cn)}})}});return success},setRowData: function(rowid,data,cssp){var nm,success=true,title;this.each(function(){if(!this.grid){return false}
var t=this,vl,ind,cp=typeof cssp,lcdata={};ind=t.rows.namedItem(rowid);if(!ind){return false}
if(data){try{$(this.p.colModel).each(function(i){nm=this.name;if(data[nm]!==undefined){lcdata[nm]=this.formatter&&typeof(this.formatter)==='string'&&this.formatter=='date'?$.unformat.date(data[nm],this):data[nm];vl=t.formatter(rowid,data[nm],i,data,'edit');title=this.title?{"title":$.jgrid.stripHtml(vl)}:{};if(t.p.treeGrid===true&&nm==t.p.ExpandColumn){$("td:eq("+i+") > span:first",ind).html(vl).attr(title)} else{$("td:eq("+i+")",ind).html(vl).attr(title)}}});if(t.p.datatype=='local'){var pos=t.p._index[rowid];if(t.p.treeGrid){for(var key in t.p.treeReader){if(lcdata.hasOwnProperty(t.p.treeReader[key])){delete lcdata[t.p.treeReader[key]]}}}
if(typeof(pos)!='undefined'){t.p.data[pos]=$.extend(true,t.p.data[pos],lcdata)}
lcdata=null}} catch(e){success=false}}
if(success){if(cp==='string'){$(ind).addClass(cssp)} else if(cp==='object'){$(ind).css(cssp)}
if($.isFunction(t.p._complete)){t.p._complete.call(t)}}});return success},addRowData: function(rowid,rdata,pos,src){if(!pos){pos="last"}
var success=false,nm,row,gi,si,ni,sind,i,v,prp="",aradd,cnm,cn,data,cm;if(rdata){if($.isArray(rdata)){aradd=true;pos="last";cnm=rowid} else{rdata=[rdata];aradd=false}
this.each(function(){var t=this,datalen=rdata.length;ni=t.p.rownumbers===true?1:0;gi=t.p.multiselect===true?1:0;si=t.p.subGrid===true?1:0;if(!aradd){if(typeof(rowid)!='undefined'){rowid=rowid+""}
else{rowid=$.jgrid.randId();if(t.p.keyIndex!==false){cnm=t.p.colModel[t.p.keyIndex+gi+si+ni].name;if(typeof rdata[0][cnm]!="undefined"){rowid=rdata[0][cnm]}}}}
cn=t.p.altclass;var k=0,cna="",lcdata={},air=$.isFunction(t.p.afterInsertRow)?true:false;while(k<datalen){data=rdata[k];row="";if(aradd){try{rowid=data[cnm]}
catch(e){rowid=$.jgrid.randId()}
cna=t.p.altRows===true?(t.rows.length-1)%2===0?cn:"":""}
rowid=t.p.idPrefix+rowid;if(ni){prp=t.formatCol(0,1,'',null,rowid,true);row+="<td role=\"gridcell\" aria-describedby=\""+t.p.id+"_rn\" class=\"ui-state-default jqgrid-rownum\" "+prp+">0</td>"}
if(gi){v="<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+t.p.id+"_"+rowid+"\" class=\"cbox\"/>";prp=t.formatCol(ni,1,'',null,rowid,true);row+="<td role=\"gridcell\" aria-describedby=\""+t.p.id+"_cb\" "+prp+">"+v+"</td>"}
if(si){row+=$(t).jqGrid("addSubGridCell",gi+ni,1)}
for(i=gi+si+ni;i<t.p.colModel.length;i++){cm=t.p.colModel[i];nm=cm.name;lcdata[nm]=cm.formatter&&typeof(cm.formatter)==='string'&&cm.formatter=='date'?$.unformat.date(data[nm],cm):data[nm];v=t.formatter(rowid,$.jgrid.getAccessor(data,nm),i,data,'edit');prp=t.formatCol(i,1,v,data,rowid,true);row+="<td role=\"gridcell\" aria-describedby=\""+t.p.id+"_"+nm+"\" "+prp+">"+v+"</td>"}
row="<tr id=\""+rowid+"\" role=\"row\" tabindex=\"-1\" class=\"ui-widget-content jqgrow ui-row-"+t.p.direction+" "+cna+"\">"+row+"</tr>";if(t.rows.length===0){$("table:first",t.grid.bDiv).append(row)} else{switch(pos){case 'last':$(t.rows[t.rows.length-1]).after(row);sind=t.rows.length-1;break;case 'first':$(t.rows[0]).after(row);sind=1;break;case 'after':sind=t.rows.namedItem(src);if(sind){if($(t.rows[sind.rowIndex+1]).hasClass("ui-subgrid")){$(t.rows[sind.rowIndex+1]).after(row)}
else{$(sind).after(row)}}
sind++;break;case 'before':sind=t.rows.namedItem(src);if(sind){$(sind).before(row);sind=sind.rowIndex}
sind--;break}}
if(t.p.subGrid===true){$(t).jqGrid("addSubGrid",gi+ni,sind)}
t.p.records++;t.p.reccount++;if(air){t.p.afterInsertRow.call(t,rowid,data,data)}
k++;if(t.p.datatype=='local'){lcdata[t.p.localReader.id]=rowid;t.p._index[rowid]=t.p.data.length;t.p.data.push(lcdata);lcdata={}}}
if(t.p.altRows===true&&!aradd){if(pos=="last"){if((t.rows.length-1)%2==1){$(t.rows[t.rows.length-1]).addClass(cn)}} else{$(t.rows).each(function(i){if(i%2==1){$(this).addClass(cn)}
else{$(this).removeClass(cn)}})}}
t.updatepager(true,true);success=true})}
return success},footerData: function(action,data,format){var nm,success=false,res={},title;
function isEmpty(obj){for(var i in obj){if(obj.hasOwnProperty(i)){return false}}
return true}
if(typeof(action)=="undefined"){action="get"}
if(typeof(format)!="boolean"){format=true}
action=action.toLowerCase();this.each(function(){var t=this,vl;if(!t.grid||!t.p.footerrow){return false}
if(action=="set"){if(isEmpty(data)){return false}}
success=true;$(this.p.colModel).each(function(i){nm=this.name;if(action=="set"){if(data[nm]!==undefined){vl=format?t.formatter("",data[nm],i,data,'edit'):data[nm];title=this.title?{"title":$.jgrid.stripHtml(vl)}:{};$("tr.footrow td:eq("+i+")",t.grid.sDiv).html(vl).attr(title);success=true}} else if(action=="get"){res[nm]=$("tr.footrow td:eq("+i+")",t.grid.sDiv).html()}})});return action=="get"?res:success},showHideCol: function(colname,show){return this.each(function(){var $t=this,fndh=false,brd=$.browser.webkit||$.browser.safari?0:$t.p.cellLayout,cw;if(!$t.grid){return}
if(typeof colname==='string'){colname=[colname]}
show=show!="none"?"":"none";var sw=show===""?true:false,gh=$t.p.groupHeader&&(typeof $t.p.groupHeader==='object'||$.isFunction($t.p.groupHeader));if(gh){$($t).jqGrid('destroyGroupHeader',false)}
$(this.p.colModel).each(function(i){if($.inArray(this.name,colname)!==-1&&this.hidden===sw){if($t.p.frozenColumns===true&&this.frozen===true){return true}
$("tr",$t.grid.hDiv).each(function(){$(this.cells[i]).css("display",show)});$($t.rows).each(function(j){$(this.cells[i]).css("display",show)});if($t.p.footerrow){$("tr.footrow td:eq("+i+")",$t.grid.sDiv).css("display",show)}
cw=this.widthOrg?this.widthOrg:parseInt(this.width,10);if(show==="none"){$t.p.tblwidth-=cw+brd} else{$t.p.tblwidth+=cw+brd}
this.hidden=!sw;fndh=true}});if(fndh===true){$($t).jqGrid("setGridWidth",$t.p.shrinkToFit===true?$t.p.tblwidth:$t.p.width)}
if(gh){$($t).jqGrid('setGroupHeaders',$t.p.groupHeader)}})},hideCol: function(colname){return this.each(function(){$(this).jqGrid("showHideCol",colname,"none")})},showCol: function(colname){return this.each(function(){$(this).jqGrid("showHideCol",colname,"")})},remapColumns: function(permutation,updateCells,keepHeader){
function resortArray(a){var ac;if(a.length){ac=$.makeArray(a)} else{ac=$.extend({},a)}
$.each(permutation, function(i){a[i]=ac[this]})}
var ts=this.get(0);
function resortRows(parent,clobj){$(">tr"+(clobj||""),parent).each(function(){var row=this;var elems=$.makeArray(row.cells);$.each(permutation, function(){var e=elems[this];if(e){row.appendChild(e)}})})}
resortArray(ts.p.colModel);resortArray(ts.p.colNames);resortArray(ts.grid.headers);resortRows($("thead:first",ts.grid.hDiv),keepHeader&&":not(.ui-jqgrid-labels)");if(updateCells){resortRows($("#"+$.jgrid.jqID(ts.p.id)+" tbody:first"),".jqgfirstrow, tr.jqgrow, tr.jqfoot")}
if(ts.p.footerrow){resortRows($("tbody:first",ts.grid.sDiv))}
if(ts.p.remapColumns){if(!ts.p.remapColumns.length){ts.p.remapColumns=$.makeArray(permutation)} else{resortArray(ts.p.remapColumns)}}
ts.p.lastsort=$.inArray(ts.p.lastsort,permutation);if(ts.p.treeGrid){ts.p.expColInd=$.inArray(ts.p.expColInd,permutation)}},setGridWidth: function(nwidth,shrink){return this.each(function(){if(!this.grid){return}
var $t=this,cw,initwidth=0,brd=$.browser.webkit||$.browser.safari?0:$t.p.cellLayout,lvc,vc=0,hs=false,scw=$t.p.scrollOffset,aw,gw=0,cl=0,cr;if(typeof shrink!='boolean'){shrink=$t.p.shrinkToFit}
if(isNaN(nwidth)){return}
else{nwidth=parseInt(nwidth,10);$t.grid.width=$t.p.width=nwidth}
$("#gbox_"+$.jgrid.jqID($t.p.id)).css("width",nwidth+"px");$("#gview_"+$.jgrid.jqID($t.p.id)).css("width",nwidth+"px");$($t.grid.bDiv).css("width",nwidth+"px");$($t.grid.hDiv).css("width",nwidth+"px");if($t.p.pager){$($t.p.pager).css("width",nwidth+"px")}
if($t.p.toppager){$($t.p.toppager).css("width",nwidth+"px")}
if($t.p.toolbar[0]===true){$($t.grid.uDiv).css("width",nwidth+"px");if($t.p.toolbar[1]=="both"){$($t.grid.ubDiv).css("width",nwidth+"px")}}
if($t.p.footerrow){$($t.grid.sDiv).css("width",nwidth+"px")}
if(shrink===false&&$t.p.forceFit===true){$t.p.forceFit=false}
if(shrink===true){$.each($t.p.colModel, function(i){if(this.hidden===false){cw=this.widthOrg?this.widthOrg:parseInt(this.width,10);initwidth+=cw+brd;if(this.fixed){gw+=cw+brd} else{vc++}
cl++}});if(vc===0){return}
$t.p.tblwidth=initwidth;aw=nwidth-brd*vc-gw;if(!isNaN($t.p.height)){if($($t.grid.bDiv)[0].clientHeight<$($t.grid.bDiv)[0].scrollHeight||$t.rows.length===1){hs=true;aw-=scw}}
initwidth=0;var cle=$t.grid.cols.length>0;$.each($t.p.colModel, function(i){if(this.hidden===false&&!this.fixed){cw=this.widthOrg?this.widthOrg:parseInt(this.width,10);cw=Math.round(aw*cw/($t.p.tblwidth-brd*vc-gw));if(cw<0){return}
this.width=cw;initwidth+=cw;$t.grid.headers[i].width=cw;$t.grid.headers[i].el.style.width=cw+"px";if($t.p.footerrow){$t.grid.footers[i].style.width=cw+"px"}
if(cle){$t.grid.cols[i].style.width=cw+"px"}
lvc=i}});if(!lvc){return}
cr=0;if(hs){if(nwidth-gw-(initwidth+brd*vc)!==scw){cr=nwidth-gw-(initwidth+brd*vc)-scw}} else if(Math.abs(nwidth-gw-(initwidth+brd*vc))!==1){cr=nwidth-gw-(initwidth+brd*vc)}
$t.p.colModel[lvc].width+=cr;$t.p.tblwidth=initwidth+cr+brd*vc+gw;if($t.p.tblwidth>nwidth){var delta=$t.p.tblwidth-parseInt(nwidth,10);$t.p.tblwidth=nwidth;cw=$t.p.colModel[lvc].width=$t.p.colModel[lvc].width-delta} else{cw=$t.p.colModel[lvc].width}
$t.grid.headers[lvc].width=cw;$t.grid.headers[lvc].el.style.width=cw+"px";if(cle){$t.grid.cols[lvc].style.width=cw+"px"}
if($t.p.footerrow){$t.grid.footers[lvc].style.width=cw+"px"}}
if($t.p.tblwidth){$('table:first',$t.grid.bDiv).css("width",$t.p.tblwidth+"px");$('table:first',$t.grid.hDiv).css("width",$t.p.tblwidth+"px");$t.grid.hDiv.scrollLeft=$t.grid.bDiv.scrollLeft;if($t.p.footerrow){$('table:first',$t.grid.sDiv).css("width",$t.p.tblwidth+"px")}}})},setGridHeight: function(nh){return this.each(function(){var $t=this;if(!$t.grid){return}
var bDiv=$($t.grid.bDiv);bDiv.css({height:nh+(isNaN(nh)?"":"px")});if($t.p.frozenColumns===true){$('#'+$t.p.id+"_frozen").parent().height(bDiv.height()-16)}
$t.p.height=nh;if($t.p.scroll){$t.grid.populateVisible()}})},setCaption: function(newcap){return this.each(function(){this.p.caption=newcap;$("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl",this.grid.cDiv).html(newcap);$(this.grid.cDiv).show()})},setLabel: function(colname,nData,prop,attrp){return this.each(function(){var $t=this,pos=-1;if(!$t.grid){return}
if(typeof(colname)!="undefined"){$($t.p.colModel).each(function(i){if(this.name==colname){pos=i;return false}})} else{return}
if(pos>=0){var thecol=$("tr.ui-jqgrid-labels th:eq("+pos+")",$t.grid.hDiv);if(nData){var ico=$(".s-ico",thecol);$("[id^=jqgh_]",thecol).empty().html(nData).append(ico);$t.p.colNames[pos]=nData}
if(prop){if(typeof prop==='string'){$(thecol).addClass(prop)} else{$(thecol).css(prop)}}
if(typeof attrp==='object'){$(thecol).attr(attrp)}}})},setCell: function(rowid,colname,nData,cssp,attrp,forceupd){return this.each(function(){var $t=this,pos=-1,v,title;if(!$t.grid){return}
if(isNaN(colname)){$($t.p.colModel).each(function(i){if(this.name==colname){pos=i;return false}})} else{pos=parseInt(colname,10)}
if(pos>=0){var ind=$t.rows.namedItem(rowid);if(ind){var tcell=$("td:eq("+pos+")",ind);if(nData!==""||forceupd===true){v=$t.formatter(rowid,nData,pos,ind,'edit');title=$t.p.colModel[pos].title?{"title":$.jgrid.stripHtml(v)}:{};if($t.p.treeGrid&&$(".tree-wrap",$(tcell)).length>0){$("span",$(tcell)).html(v).attr(title)} else{$(tcell).html(v).attr(title)}
if($t.p.datatype=="local"){var cm=$t.p.colModel[pos],index;nData=cm.formatter&&typeof(cm.formatter)==='string'&&cm.formatter=='date'?$.unformat.date(nData,cm):nData;index=$t.p._index[rowid];if(typeof index!="undefined"){$t.p.data[index][cm.name]=nData}}}
if(typeof cssp==='string'){$(tcell).addClass(cssp)} else if(cssp){$(tcell).css(cssp)}
if(typeof attrp==='object'){$(tcell).attr(attrp)}}}})},getCell: function(rowid,col){var ret=false;this.each(function(){var $t=this,pos=-1;if(!$t.grid){return}
if(isNaN(col)){$($t.p.colModel).each(function(i){if(this.name===col){pos=i;return false}})} else{pos=parseInt(col,10)}
if(pos>=0){var ind=$t.rows.namedItem(rowid);if(ind){try{ret=$.unformat($("td:eq("+pos+")",ind),{rowId:ind.id,colModel:$t.p.colModel[pos]},pos)} catch(e){ret=$.jgrid.htmlDecode($("td:eq("+pos+")",ind).html())}}}});return ret},getCol: function(col,obj,mathopr){var ret=[],val,sum=0,min,max,v;obj=typeof(obj)!='boolean'?false:obj;if(typeof mathopr=='undefined'){mathopr=false}
this.each(function(){var $t=this,pos=-1;if(!$t.grid){return}
if(isNaN(col)){$($t.p.colModel).each(function(i){if(this.name===col){pos=i;return false}})} else{pos=parseInt(col,10)}
if(pos>=0){var ln=$t.rows.length,i=0;if(ln&&ln>0){while(i<ln){if($($t.rows[i]).hasClass('jqgrow')){try{val=$.unformat($($t.rows[i].cells[pos]),{rowId:$t.rows[i].id,colModel:$t.p.colModel[pos]},pos)} catch(e){val=$.jgrid.htmlDecode($t.rows[i].cells[pos].innerHTML)}
if(mathopr){v=parseFloat(val);sum+=v;if(i===0){min=v;max=v} else{min=Math.min(min,v);max=Math.max(max,v)}}
else if(obj){ret.push({id:$t.rows[i].id,value:val})}
else{ret.push(val)}}
i++}
if(mathopr){switch(mathopr.toLowerCase()){case 'sum':ret=sum;break;case 'avg':ret=sum/ln;break;case 'count':ret=ln;break;case 'min':ret=min;break;case 'max':ret=max;break}}}}});return ret},clearGridData: function(clearfooter){return this.each(function(){var $t=this;if(!$t.grid){return}
if(typeof clearfooter!='boolean'){clearfooter=false}
if($t.p.deepempty){$("#"+$.jgrid.jqID($t.p.id)+" tbody:first tr:gt(0)").remove()}
else{var trf=$("#"+$.jgrid.jqID($t.p.id)+" tbody:first tr:first")[0];$("#"+$.jgrid.jqID($t.p.id)+" tbody:first").empty().append(trf)}
if($t.p.footerrow&&clearfooter){$(".ui-jqgrid-ftable td",$t.grid.sDiv).html("&#160;")}
$t.p.selrow=null;$t.p.selarrrow=[];$t.p.savedRow=[];$t.p.records=0;$t.p.page=1;$t.p.lastpage=0;$t.p.reccount=0;$t.p.data=[];$t.p._index={};$t.updatepager(true,false)})},getInd: function(rowid,rc){var ret=false,rw;this.each(function(){rw=this.rows.namedItem(rowid);if(rw){ret=rc===true?rw:rw.rowIndex}});return ret},bindKeys: function(settings){var o=$.extend({onEnter:null,onSpace:null,onLeftKey:null,onRightKey:null,scrollingRows:true},settings||{});return this.each(function(){var $t=this;if(!$('body').is('[role]')){$('body').attr('role','application')}
$t.p.scrollrows=o.scrollingRows;$($t).keydown(function(event){var target=$($t).find('tr[tabindex=0]')[0],id,r,mind,expanded=$t.p.treeReader.expanded_field;if(target){mind=$t.p._index[target.id];if(event.keyCode===37||event.keyCode===38||event.keyCode===39||event.keyCode===40){if(event.keyCode===38){r=target.previousSibling;id="";if(r){if($(r).is(":hidden")){while(r){r=r.previousSibling;if(!$(r).is(":hidden")&&$(r).hasClass('jqgrow')){id=r.id;break}}} else{id=r.id}}
$($t).jqGrid('setSelection',id)}
if(event.keyCode===40){r=target.nextSibling;id="";if(r){if($(r).is(":hidden")){while(r){r=r.nextSibling;if(!$(r).is(":hidden")&&$(r).hasClass('jqgrow')){id=r.id;break}}} else{id=r.id}}
$($t).jqGrid('setSelection',id)}
if(event.keyCode===37){if($t.p.treeGrid&&$t.p.data[mind][expanded]){$(target).find("div.treeclick").trigger('click')}
if($.isFunction(o.onLeftKey)){o.onLeftKey.call($t,$t.p.selrow)}}
if(event.keyCode===39){if($t.p.treeGrid&&!$t.p.data[mind][expanded]){$(target).find("div.treeclick").trigger('click')}
if($.isFunction(o.onRightKey)){o.onRightKey.call($t,$t.p.selrow)}}}
else if(event.keyCode===13){if($.isFunction(o.onEnter)){o.onEnter.call($t,$t.p.selrow)}} else if(event.keyCode===32){if($.isFunction(o.onSpace)){o.onSpace.call($t,$t.p.selrow)}}}})})},unbindKeys: function(){return this.each(function(){var $t=this;$($t).unbind('keydown')})},getLocalRow: function(rowid){var ret=false,ind;this.each(function(){if(typeof(rowid)!=="undefined"){ind=this.p._index[rowid];if(ind>=0){ret=this.p.data[ind]}}});return ret}})})(jQuery);(function($){$.jgrid.extend({getColProp: function(colname){var ret={},$t=this[0];if(!$t.grid){return false}
var cM=$t.p.colModel;for(var i=0;i<cM.length;i++){if(cM[i].name==colname){ret=cM[i];break}}
return ret},setColProp: function(colname,obj){return this.each(function(){if(this.grid){if(obj){var cM=this.p.colModel;for(var i=0;i<cM.length;i++){if(cM[i].name==colname){$.extend(this.p.colModel[i],obj);break}}}}})},sortGrid: function(colname,reload,sor){return this.each(function(){var $t=this,idx=-1;if(!$t.grid){return}
if(!colname){colname=$t.p.sortname}
for(var i=0;i<$t.p.colModel.length;i++){if($t.p.colModel[i].index==colname||$t.p.colModel[i].name==colname){idx=i;break}}
if(idx!=-1){var sort=$t.p.colModel[idx].sortable;if(typeof sort!=='boolean'){sort=true}
if(typeof reload!=='boolean'){reload=false}
if(sort){$t.sortData("jqgh_"+$t.p.id+"_"+colname,idx,reload,sor)}}})},GridDestroy: function(){return this.each(function(){if(this.grid){if(this.p.pager){$(this.p.pager).remove()}
var gid=this.id;try{$("#gbox_"+gid).remove()} catch(_){}}})},GridUnload: function(){return this.each(function(){if(!this.grid){return}
var defgrid={id:$(this).attr('id'),cl:$(this).attr('class')};if(this.p.pager){$(this.p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager corner-bottom")}
var newtable=document.createElement('table');$(newtable).attr({id:defgrid.id});newtable.className=defgrid.cl;var gid=this.id;$(newtable).removeClass("ui-jqgrid-btable");if($(this.p.pager).parents("#gbox_"+gid).length===1){$(newtable).insertBefore("#gbox_"+gid).show();$(this.p.pager).insertBefore("#gbox_"+gid)} else{$(newtable).insertBefore("#gbox_"+gid).show()}
$("#gbox_"+gid).remove()})},setGridState: function(state){return this.each(function(){if(!this.grid){return}
var $t=this;if(state=='hidden'){$(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv","#gview_"+$t.p.id).slideUp("fast");if($t.p.pager){$($t.p.pager).slideUp("fast")}
if($t.p.toppager){$($t.p.toppager).slideUp("fast")}
if($t.p.toolbar[0]===true){if($t.p.toolbar[1]=='both'){$($t.grid.ubDiv).slideUp("fast")}
$($t.grid.uDiv).slideUp("fast")}
if($t.p.footerrow){$(".ui-jqgrid-sdiv","#gbox_"+$t.p.id).slideUp("fast")}
$(".ui-jqgrid-titlebar-close span",$t.grid.cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");$t.p.gridstate='hidden'} else if(state=='visible'){$(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv","#gview_"+$t.p.id).slideDown("fast");if($t.p.pager){$($t.p.pager).slideDown("fast")}
if($t.p.toppager){$($t.p.toppager).slideDown("fast")}
if($t.p.toolbar[0]===true){if($t.p.toolbar[1]=='both'){$($t.grid.ubDiv).slideDown("fast")}
$($t.grid.uDiv).slideDown("fast")}
if($t.p.footerrow){$(".ui-jqgrid-sdiv","#gbox_"+$t.p.id).slideDown("fast")}
$(".ui-jqgrid-titlebar-close span",$t.grid.cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");$t.p.gridstate='visible'}})},filterToolbar: function(p){p=$.extend({autosearch:true,searchOnEnter:true,beforeSearch:null,afterSearch:null,beforeClear:null,afterClear:null,searchurl:'',stringResult:false,groupOp:'AND',defaultSearch:"bw"},p||{});return this.each(function(){var $t=this;if(this.ftoolbar){return}
var triggerToolbar=function(){var sdata={},j=0,v,nm,sopt={},so;$.each($t.p.colModel,function(i,n){nm=this.index||this.name;so=(this.searchoptions&&this.searchoptions.sopt)?this.searchoptions.sopt[0]:this.stype=='select'?'eq':p.defaultSearch;v=$("#gs_"+$.jgrid.jqID(this.name),(this.frozen===true&&$t.p.frozenColumns===true)?$t.grid.fhDiv:$t.grid.hDiv).val();if(v){sdata[nm]=v;sopt[nm]=so;j++} else{try{delete $t.p.postData[nm]} catch(z){}}});var sd=j>0?true:false;if(p.stringResult===true||$t.p.datatype=="local"){var ruleGroup="{\"groupOp\":\""+p.groupOp+"\",\"rules\":[";var gi=0;$.each(sdata,function(i,n){if(gi>0){ruleGroup+=","}
ruleGroup+="{\"field\":\""+i+"\",";ruleGroup+="\"op\":\""+sopt[i]+"\",";n+="";ruleGroup+="\"data\":\""+n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"')+"\"}";gi++});ruleGroup+="]}";$.extend($t.p.postData,{filters:ruleGroup});$.each(['searchField','searchString','searchOper'], function(i,n){if($t.p.postData.hasOwnProperty(n)){delete $t.p.postData[n]}})} else{$.extend($t.p.postData,sdata)}
var saveurl;if($t.p.searchurl){saveurl=$t.p.url;$($t).jqGrid("setGridParam",{url:$t.p.searchurl})}
var bsr=false;if($.isFunction(p.beforeSearch)){bsr=p.beforeSearch.call($t)}
if(!bsr){$($t).jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}])}
if(saveurl){$($t).jqGrid("setGridParam",{url:saveurl})}
if($.isFunction(p.afterSearch)){p.afterSearch()}};var clearToolbar=function(trigger){var sdata={},v,j=0,nm;trigger=(typeof trigger!='boolean')?true:trigger;$.each($t.p.colModel,function(i,n){v=(this.searchoptions&&this.searchoptions.defaultValue)?this.searchoptions.defaultValue:"";nm=this.index||this.name;switch(this.stype){case 'select':var v1;$("#gs_"+$.jgrid.jqID(this.name)+" option",(this.frozen===true&&$t.p.frozenColumns===true)?$t.grid.fhDiv:$t.grid.hDiv).each(function(i){if(i===0){this.selected=true}
if($(this).text()==v){this.selected=true;v1=$(this).val();return false}});if(v1){sdata[nm]=v1;j++} else{try{delete $t.p.postData[nm]} catch(e){}}
break;case 'text':$("#gs_"+$.jgrid.jqID(this.name),(this.frozen===true&&$t.p.frozenColumns===true)?$t.grid.fhDiv:$t.grid.hDiv).val(v);if(v){sdata[nm]=v;j++} else{try{delete $t.p.postData[nm]} catch(y){}}
break}});var sd=j>0?true:false;if(p.stringResult===true||$t.p.datatype=="local"){var ruleGroup="{\"groupOp\":\""+p.groupOp+"\",\"rules\":[";var gi=0;$.each(sdata,function(i,n){if(gi>0){ruleGroup+=","}
ruleGroup+="{\"field\":\""+i+"\",";ruleGroup+="\"op\":\""+"eq"+"\",";n+="";ruleGroup+="\"data\":\""+n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"')+"\"}";gi++});ruleGroup+="]}";$.extend($t.p.postData,{filters:ruleGroup});$.each(['searchField','searchString','searchOper'], function(i,n){if($t.p.postData.hasOwnProperty(n)){delete $t.p.postData[n]}})} else{$.extend($t.p.postData,sdata)}
var saveurl;if($t.p.searchurl){saveurl=$t.p.url;$($t).jqGrid("setGridParam",{url:$t.p.searchurl})}
var bcv=false;if($.isFunction(p.beforeClear)){bcv=p.beforeClear.call($t)}
if(!bcv){if(trigger){$($t).jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}])}}
if(saveurl){$($t).jqGrid("setGridParam",{url:saveurl})}
if($.isFunction(p.afterClear)){p.afterClear()}};var toggleToolbar=function(){var trow=$("tr.ui-search-toolbar",$t.grid.hDiv),trow2=$t.p.frozenColumns===true?$("tr.ui-search-toolbar",$t.grid.hDiv):false;if(trow.css("display")=='none'){trow.show();if(trow2){trow2.show()}} else{trow.hide();if(trow2){trow2.hide()}}};
function bindEvents(selector,events){var jElem=$(selector);if(jElem[0]){jQuery.each(events, function(){if(this.data!==undefined){jElem.bind(this.type,this.data,this.fn)} else{jElem.bind(this.type,this.fn)}})}}
var tr=$("<tr class='ui-search-toolbar' role='rowheader'></tr>");var timeoutHnd;$.each($t.p.colModel,function(i,n){var cm=this,thd,th,soptions,surl,self;th=$("<th role='columnheader' class='ui-state-default ui-th-column ui-th-"+$t.p.direction+"'></th>");thd=$("<div style='width:100%;position:relative;height:100%;padding-right:0.3em;'></div>");if(this.hidden===true){$(th).css("display","none")}
this.search=this.search===false?false:true;if(typeof this.stype=='undefined'){this.stype='text'}
soptions=$.extend({},this.searchoptions||{});if(this.search){switch(this.stype){case "select":surl=this.surl||soptions.dataUrl;if(surl){self=thd;$.ajax($.extend({url:surl,dataType:"html",success: function(res,status){if(soptions.buildSelect!==undefined){var d=soptions.buildSelect(res);if(d){$(self).append(d)}} else{$(self).append(res)}
if(soptions.defaultValue){$("select",self).val(soptions.defaultValue)}
$("select",self).attr({name:cm.index||cm.name,id:"gs_"+cm.name});if(soptions.attr){$("select",self).attr(soptions.attr)}
$("select",self).css({width:"100%"});if(soptions.dataInit!==undefined){soptions.dataInit($("select",self)[0])}
if(soptions.dataEvents!==undefined){bindEvents($("select",self)[0],soptions.dataEvents)}
if(p.autosearch===true){$("select",self).change(function(e){triggerToolbar();return false})}
res=null}},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions||{}))} else{var oSv;if(cm.searchoptions&&cm.searchoptions.value){oSv=cm.searchoptions.value} else if(cm.editoptions&&cm.editoptions.value){oSv=cm.editoptions.value}
if(oSv){var elem=document.createElement("select");elem.style.width="100%";$(elem).attr({name:cm.index||cm.name,id:"gs_"+cm.name});var so,sv,ov;if(typeof oSv==="string"){so=oSv.split(";");for(var k=0;k<so.length;k++){sv=so[k].split(":");ov=document.createElement("option");ov.value=sv[0];ov.innerHTML=sv[1];elem.appendChild(ov)}} else if(typeof oSv==="object"){for(var key in oSv){if(oSv.hasOwnProperty(key)){ov=document.createElement("option");ov.value=key;ov.innerHTML=oSv[key];elem.appendChild(ov)}}}
if(soptions.defaultValue){$(elem).val(soptions.defaultValue)}
if(soptions.attr){$(elem).attr(soptions.attr)}
if(soptions.dataInit!==undefined){soptions.dataInit(elem)}
if(soptions.dataEvents!==undefined){bindEvents(elem,soptions.dataEvents)}
$(thd).append(elem);if(p.autosearch===true){$(elem).change(function(e){triggerToolbar();return false})}}}
break;case 'text':var df=soptions.defaultValue?soptions.defaultValue:"";$(thd).append("<input type='text' style='width:95%;padding:0px;' name='"+(cm.index||cm.name)+"' id='gs_"+cm.name+"' value='"+df+"'/>");if(soptions.attr){$("input",thd).attr(soptions.attr)}
if(soptions.dataInit!==undefined){soptions.dataInit($("input",thd)[0])}
if(soptions.dataEvents!==undefined){bindEvents($("input",thd)[0],soptions.dataEvents)}
if(p.autosearch===true){if(p.searchOnEnter){$("input",thd).keypress(function(e){var key=e.charCode?e.charCode:e.keyCode?e.keyCode:0;if(key==13){triggerToolbar();return false}
return this})} else{$("input",thd).keydown(function(e){var key=e.which;switch(key){case 13:return false;case 9:case 16:case 37:case 38:case 39:case 40:case 27:break;default:if(timeoutHnd){clearTimeout(timeoutHnd)}
timeoutHnd=setTimeout(function(){triggerToolbar()},500)}})}}
break}}
$(th).append(thd);$(tr).append(th)});$("table thead",$t.grid.hDiv).append(tr);this.ftoolbar=true;this.triggerToolbar=triggerToolbar;this.clearToolbar=clearToolbar;this.toggleToolbar=toggleToolbar})},destroyGroupHeader: function(nullHeader){if(typeof(nullHeader)=='undefined'){nullHeader=true}
return this.each(function(){var $t=this,$tr,i,l,headers,$th,$resizing,grid=$t.grid,thead=$("table.ui-jqgrid-htable thead",grid.hDiv),cm=$t.p.colModel,hc;if(!grid) return;$tr=$("<tr>",{role:"rowheader"}).addClass("ui-jqgrid-labels");headers=grid.headers;for(i=0,l=headers.length;i<l;i++){hc=cm[i].hidden?"none":"";$th=$(headers[i].el).width(headers[i].width).css('display',hc);try{$th.removeAttr("rowSpan")} catch(rs){$th.attr("rowSpan",1)}
$tr.append($th);$resizing=$th.children("span.ui-jqgrid-resize");if($resizing.length>0){$resizing[0].style.height=""}
$th.children("div")[0].style.top=""}
$(thead).children('tr.ui-jqgrid-labels').remove();$(thead).prepend($tr);if(nullHeader===true){$($t).jqGrid('setGridParam',{'groupHeader':null})}})},setGroupHeaders: function(o){o=$.extend({useColSpanStyle:false,groupHeaders:[]},o||{});return this.each(function(){this.p.groupHeader=o;var ts=this,i,cmi,skip=0,$tr,$colHeader,th,$th,thStyle,iCol,cghi,numberOfColumns,titleText,cVisibleColumns,colModel=ts.p.colModel,cml=colModel.length,ths=ts.grid.headers,$htable=$("table.ui-jqgrid-htable",ts.grid.hDiv),$trLabels=$htable.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"),$thead=$htable.children("thead"),$theadInTable,originalResizeStop,$firstHeaderRow=$htable.find(".jqg-first-row-header");if($firstHeaderRow.html()===null){$firstHeaderRow=$('<tr>',{role:"row","aria-hidden":"true"}).addClass("jqg-first-row-header").css("height","auto")} else{$firstHeaderRow.empty()}
var $firstRow,inColumnHeader=function(text,columnHeaders){var i=0,length=columnHeaders.length;for(;i<length;i++){if(columnHeaders[i].startColumnName===text){return i}}
return-1};$(ts).prepend($thead);$tr=$('<tr>',{role:"rowheader"}).addClass("ui-jqgrid-labels jqg-third-row-header");for(i=0;i<cml;i++){th=ths[i].el;$th=$(th);cmi=colModel[i];thStyle={height:'0px',width:ths[i].width+'px',display:(cmi.hidden?'none':'')};$("<th>",{role:'gridcell'}).css(thStyle).addClass("ui-first-th-"+ts.p.direction).appendTo($firstHeaderRow);th.style.width="";iCol=inColumnHeader(cmi.name,o.groupHeaders);if(iCol>=0){cghi=o.groupHeaders[iCol];numberOfColumns=cghi.numberOfColumns;titleText=cghi.titleText;for(cVisibleColumns=0,iCol=0;iCol<numberOfColumns&&(i+iCol<cml);iCol++){if(!colModel[i+iCol].hidden){cVisibleColumns++}}
$colHeader=$('<th>').attr({role:"columnheader"}).addClass("ui-state-default ui-th-column-header ui-th-"+ts.p.direction).css({'height':'22px','border-top':'0px none'}).html(titleText);if(cVisibleColumns>0){$colHeader.attr("colspan",String(cVisibleColumns))}
if(ts.p.headertitles){$colHeader.attr("title",$colHeader.text())}
if(cVisibleColumns===0){$colHeader.hide()}
$th.before($colHeader);$tr.append(th);skip=numberOfColumns-1} else{if(skip===0){if(o.useColSpanStyle){$th.attr("rowspan","2")} else{$('<th>',{role:"columnheader"}).addClass("ui-state-default ui-th-column-header ui-th-"+ts.p.direction).css({"display":cmi.hidden?'none':'','border-top':'0px none'}).insertBefore($th);$tr.append(th)}} else{$tr.append(th);skip--}}}
$theadInTable=$(ts).children("thead");$theadInTable.prepend($firstHeaderRow);$tr.insertAfter($trLabels);$htable.append($theadInTable);if(o.useColSpanStyle){$htable.find("span.ui-jqgrid-resize").each(function(){var $parent=$(this).parent();if($parent.is(":visible")){this.style.cssText='height: '+$parent.height()+'px !important; cursor: col-resize;'}});$htable.find("div.ui-jqgrid-sortable").each(function(){var $ts=$(this),$parent=$ts.parent();if($parent.is(":visible")&&$parent.is(":has(span.ui-jqgrid-resize)")){$ts.css('top',($parent.height()-$ts.outerHeight())/2+'px')}})}
if($.isFunction(ts.p.resizeStop)){originalResizeStop=ts.p.resizeStop}
$firstRow=$theadInTable.find("tr.jqg-first-row-header");ts.p.resizeStop=function(nw,idx){$firstRow.find('th').eq(idx).width(nw);if($.isFunction(originalResizeStop)){originalResizeStop.call(ts,nw,idx)}}})},setFrozenColumns: function(){return this.each(function(){if(!this.grid){return}
var $t=this,cm=$t.p.colModel,i=0,len=cm.length,maxfrozen=-1,frozen=false;if($t.p.subGrid==true||$t.p.treeGrid===true||$t.p.cellEdit==true||$t.p.sortable||$t.p.scroll||$t.p.grouping){return}
if($t.p.rownumbers){i++}
if($t.p.multiselect){i++}
while(i<len){if(cm[i].frozen===true){frozen=true;maxfrozen=i} else{break}
i++}
if(maxfrozen>=0&&frozen){var top=$t.p.caption?$($t.grid.cDiv).outerHeight():0,hth=$(".ui-jqgrid-htable","#gview_"+$.jgrid.jqID($t.p.id)).height();$t.p.orgEvents={};if($t.p.toppager){top=top+$($t.grid.topDiv).outerHeight()}
if($t.p.toolbar[0]==true){if($t.p.toolbar[1]!="bottom"){top=top+$($t.grid.uDiv).outerHeight()}}
$t.grid.fhDiv=$('<div style="position:absolute;left:0px;top:'+top+'px;height:'+hth+'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>');$t.grid.fbDiv=$('<div style="position:absolute;left:0px;top:'+(parseInt(top,10)+parseInt(hth,10)+1)+'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>');$("#gview_"+$.jgrid.jqID($t.p.id)).append($t.grid.fhDiv);var htbl=$(".ui-jqgrid-htable","#gview_"+$.jgrid.jqID($t.p.id)).clone(true);if($t.p.groupHeader){$("tr.jqg-first-row-header, tr.jqg-third-row-header",htbl).each(function(){$("th:gt("+maxfrozen+")",this).remove()});var swapfroz=-1,fdel=-1;$("tr.jqg-second-row-header th",htbl).each(function(i){var cs=parseInt($(this).attr("colspan"),10);if(cs){swapfroz=swapfroz+cs;fdel++}
if(swapfroz===maxfrozen){return false}});if(swapfroz!==maxfrozen){fdel=maxfrozen}
$("tr.jqg-second-row-header",htbl).each(function(i){$("th:gt("+fdel+")",this).remove()})} else{$("tr",htbl).each(function(){$("th:gt("+maxfrozen+")",this).remove()})}
$(htbl).width(1);$($t.grid.fhDiv).append(htbl).mousemove(function(e){if($t.grid.resizing){$t.grid.dragMove(e);return false}});if($.isFunction($t.p.resizeStop)){$t.p.orgEvents.resizeStop=$t.p.resizeStop}
$t.p.resizeStop=function(w,index){var rhth=$(".ui-jqgrid-htable",$t.grid.fhDiv);$("th:eq("+index+")",rhth).width(w);var btd=$(".ui-jqgrid-btable",$t.grid.fbDiv);$("tr:first td:eq("+index+")",btd).width(w);if($.isFunction($t.p.orgEvents.resizeStop)){$t.p.orgEvents.resizeStop.call($t,w,index)} else{$t.p.orgEvents.resizeStop=null}};if($.isFunction($t.p.onSortCol)){$t.p.orgEvents.onSortCol=$t.p.onSortCol} else{$t.p.orgEvents.onSortCol=null}
$t.p.onSortCol=function(index,idxcol,so){var previousSelectedTh=$("tr.ui-jqgrid-labels:last th:eq("+$t.p.lastsort+")",$t.grid.fhDiv),newSelectedTh=$("tr.ui-jqgrid-labels:last th:eq("+idxcol+")",$t.grid.fhDiv);$("span.ui-grid-ico-sort",previousSelectedTh).addClass('ui-state-disabled');$(previousSelectedTh).attr("aria-selected","false");$("span.ui-icon-"+$t.p.sortorder,newSelectedTh).removeClass('ui-state-disabled');$(newSelectedTh).attr("aria-selected","true");if(!$t.p.viewsortcols[0]){if($t.p.lastsort!=idxcol){$("span.s-ico",previousSelectedTh).hide();$("span.s-ico",newSelectedTh).show()}}
if($.isFunction($t.p.orgEvents.onSortCol)){$t.p.orgEvents.onSortCol.call($t,index,idxcol,so)}};$("#gview_"+$.jgrid.jqID($t.p.id)).append($t.grid.fbDiv);jQuery($t.grid.bDiv).scroll(function(){jQuery($t.grid.fbDiv).scrollTop(jQuery(this).scrollTop())});if($.isFunction($t.p._complete)){$t.p.orgEvents.complete=$t.p._complete} else{$t.p.orgEvents.complete=null}
if($t.p.hoverrows===true){$("#"+$.jgrid.jqID($t.p.id)).unbind('mouseover').unbind('mouseout')}
$t.p._complete=function(){$("#"+$.jgrid.jqID($t.p.id)+"_frozen").remove();jQuery($t.grid.fbDiv).height(jQuery($t.grid.bDiv).height()-16);var btbl=$("#"+$.jgrid.jqID($t.p.id)).clone(true);$("tr",btbl).each(function(){$("td:gt("+maxfrozen+")",this).remove()});$(btbl).width(1).attr("id",$.jgrid.jqID($t.p.id)+"_frozen");$($t.grid.fbDiv).append(btbl);if($t.p.hoverrows===true){$("tr.jqgrow",btbl).hover(
function(){$(this).addClass("ui-state-hover");$("#"+$.jgrid.jqID(this.id),"#"+$.jgrid.jqID($t.p.id)).addClass("ui-state-hover")},
function(){$(this).removeClass("ui-state-hover");$("#"+$.jgrid.jqID(this.id),"#"+$.jgrid.jqID($t.p.id)).removeClass("ui-state-hover")});$("tr.jqgrow","#"+$.jgrid.jqID($t.p.id)).hover(
function(){$(this).addClass("ui-state-hover");$("#"+$.jgrid.jqID(this.id),"#"+$.jgrid.jqID($t.p.id)+"_frozen").addClass("ui-state-hover")},
function(){$(this).removeClass("ui-state-hover");$("#"+$.jgrid.jqID(this.id),"#"+$.jgrid.jqID($t.p.id)+"_frozen").removeClass("ui-state-hover")})}
btbl=null;if($.isFunction($t.p.orgEvents.complete)){$t.p.orgEvents.complete.call($t)}};$t.p.frozenColumns=true}})},destroyFrozenColumns: function(){return this.each(function(){if(!this.grid){return}
if(this.p.frozenColumns===true){var $t=this;$($t.grid.fhDiv).remove();$($t.grid.fbDiv).remove();$t.grid.fhDiv=null;$t.grid.fbDiv=null;$t.p._complete=$t.p.orgEvents.complete;$t.p.resizeStop=$t.p.orgEvents.resizeStop;$t.p.onSortCol=$t.p.orgEvents.onSortCol;$t.p.orgEvents=null;if($t.p.hoverrows==true){var ptr;$("#"+$.jgrid.jqID($t.p.id)).bind('mouseover',function(e){ptr=$(e.target).closest("tr.jqgrow");if($(ptr).attr("class")!=="ui-subgrid"){$(ptr).addClass("ui-state-hover")}}).bind('mouseout',function(e){ptr=$(e.target).closest("tr.jqgrow");$(ptr).removeClass("ui-state-hover")})}
this.p.frozenColumns=false}})}})})(jQuery);(function($){$.fn.jqm=function(o){var p={overlay:50,closeoverlay:true,overlayClass:'jqmOverlay',closeClass:'jqmClose',trigger:'.jqModal',ajax:F,ajaxText:'',target:F,modal:F,toTop:F,onShow:F,onHide:F,onLoad:F};return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};if(p.trigger)$(this).jqmAddTrigger(p.trigger)})};$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide')};$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow')};$.fn.jqmShow=function(t){return this.each(function(){$.jqm.open(this._jqm,t)})};$.fn.jqmHide=function(t){return this.each(function(){$.jqm.close(this._jqm,t)})};$.jqm={hash:{},open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index')));z=(z>0)?z:3000;var o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);if(c.modal){if(!A[0])setTimeout(function(){L('bind')},1);A.push(s)}
else if(c.overlay>0){if(c.closeoverlay) h.w.jqmAddClose(o)}
else o=F;h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in{Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'")}}
if(c.ajax){var r=c.target||h.w,u=c.ajax;r=(typeof r=='string')?$(r,h.w):$(r);u=(u.substr(0,1)=='@')?$(t).attr(u.substring(1)):u;r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h)})}
else if(cc)h.w.jqmAddClose($(cc,h.w));if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);(c.onShow)?c.onShow(h):h.w.show();e(h);return F},close:function(s){var h=H[s];if(!h.a)return F;h.a=F;if(A[0]){A.pop();if(!A[0])L('unbind')}
if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove()} return F},params:{}};var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version=="6.0"),F=false,e=function(h){var i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0});if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i);f(h)},f=function(h){try{$(':input:visible',h.w)[0].focus()}catch(_){}},L=function(t){$(document)[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m)},m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return!r},hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function(){if(!this[c]){this[c]=[];$(this).click(function(){for(var i in{jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F})}this[c].push(s)})})}})(jQuery);(function($){$.fn.jqDrag=function(h){return i(this,h,'d')};$.fn.jqResize=function(h,ar){return i(this,h,'r',ar)};$.jqDnR={dnr:{},e:0,drag:function(v){if(M.k=='d')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});else{E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});if(M1){E1.css({width:Math.max(v.pageX-M1.pX+M1.W,0),height:Math.max(v.pageY-M1.pY+M1.H,0)})}}
return false},stop:function(){$(document).unbind('mousemove',J.drag).unbind('mouseup',J.stop)}};var J=$.jqDnR,M=J.dnr,E=J.e,E1,i=function(e,h,k,aR){return e.each(function(){h=(h)?$(h,e):e;h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;E1=aR?$(aR):false;if(E.css('position')!='relative'){try{E.position(p)}catch(e){}}
M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k};if(E1&&d.k!='d'){M1={X:p.left||f1('left')||0,Y:p.top||f1('top')||0,W:E1[0].offsetWidth||f1('width')||0,H:E1[0].offsetHeight||f1('height')||0,pX:v.pageX,pY:v.pageY,k:d.k}} else{M1=false}
if($("input.hasDatepicker",E[0])[0]){try{$("input.hasDatepicker",E[0]).datepicker('hide')}catch(dpe){}}
$(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);return false})})},f=function(k){return parseInt(E.css(k))||false};f1=function(k){return parseInt(E1.css(k))||false}})(jQuery);var xmlJsonClass={xml2json: function(xml,tab){if(xml.nodeType===9){xml=xml.documentElement}
var nws=this.removeWhite(xml);var obj=this.toObj(nws);var json=this.toJson(obj,xml.nodeName,"\t");return "{\n"+tab+(tab?json.replace(/\t/g, tab) : json.replace(/\t|\n/g,""))+"\n}"},json2xml: function(o,tab){var toXml=function(v,name,ind){var xml="";var i,n;if(v instanceof Array){if(v.length===0){xml+=ind+"<"+name+">__EMPTY_ARRAY_</"+name+">\n"}
else{for(i=0,n=v.length;i<n;i+=1){var sXml=ind+toXml(v[i],name,ind+"\t")+"\n";xml+=sXml}}}
else if(typeof(v)==="object"){var hasChild=false;xml+=ind+"<"+name;var m;for(m in v) if(v.hasOwnProperty(m)){if(m.charAt(0)==="@"){xml+=" "+m.substr(1)+"=\""+v[m].toString()+"\""}
else{hasChild=true}}
xml+=hasChild?">":"/>";if(hasChild){for(m in v) if(v.hasOwnProperty(m)){if(m==="#text"){xml+=v[m]}
else if(m==="#cdata"){xml+="<![CDATA["+v[m]+"]]>"}
else if(m.charAt(0)!=="@"){xml+=toXml(v[m],m,ind+"\t")}}
xml+=(xml.charAt(xml.length-1)==="\n"?ind:"")+"</"+name+">"}}
else if(typeof(v)==="function"){xml+=ind+"<"+name+">"+"<![CDATA["+v+"]]>"+"</"+name+">"}
else{if(v===undefined){v=""}
if(v.toString()==="\"\""||v.toString().length===0){xml+=ind+"<"+name+">__EMPTY_STRING_</"+name+">"}
else{xml+=ind+"<"+name+">"+v.toString()+"</"+name+">"}}
return xml};var xml="";var m;for(m in o) if(o.hasOwnProperty(m)){xml+=toXml(o[m],m,"")}
return tab?xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g,"")},toObj: function(xml){var o={};var FuncTest=/function/i;if(xml.nodeType===1){if(xml.attributes.length){var i;for(i=0;i<xml.attributes.length;i+=1){o["@"+xml.attributes[i].nodeName]=(xml.attributes[i].nodeValue||"").toString()}}
if(xml.firstChild){var textChild=0,cdataChild=0,hasElementChild=false;var n;for(n=xml.firstChild;n;n=n.nextSibling){if(n.nodeType===1){hasElementChild=true}
else if(n.nodeType===3&&n.nodeValue.match(/[^ \f\n\r\t\v]/)){textChild+=1}
else if(n.nodeType===4){cdataChild+=1}}
if(hasElementChild){if(textChild<2&&cdataChild<2){this.removeWhite(xml);for(n=xml.firstChild;n;n=n.nextSibling){if(n.nodeType===3){o["#text"]=this.escape(n.nodeValue)}
else if(n.nodeType===4){if(FuncTest.test(n.nodeValue)){o[n.nodeName]=[o[n.nodeName],n.nodeValue]} else{o["#cdata"]=this.escape(n.nodeValue)}}
else if(o[n.nodeName]){if(o[n.nodeName] instanceof Array){o[n.nodeName][o[n.nodeName].length]=this.toObj(n)}
else{o[n.nodeName]=[o[n.nodeName],this.toObj(n)]}}
else{o[n.nodeName]=this.toObj(n)}}}
else{if(!xml.attributes.length){o=this.escape(this.innerXml(xml))}
else{o["#text"]=this.escape(this.innerXml(xml))}}}
else if(textChild){if(!xml.attributes.length){o=this.escape(this.innerXml(xml));if(o==="__EMPTY_ARRAY_"){o="[]"} else if(o==="__EMPTY_STRING_"){o=""}}
else{o["#text"]=this.escape(this.innerXml(xml))}}
else if(cdataChild){if(cdataChild>1){o=this.escape(this.innerXml(xml))}
else{for(n=xml.firstChild;n;n=n.nextSibling){if(FuncTest.test(xml.firstChild.nodeValue)){o=xml.firstChild.nodeValue;break} else{o["#cdata"]=this.escape(n.nodeValue)}}}}}
if(!xml.attributes.length&&!xml.firstChild){o=null}}
else if(xml.nodeType===9){o=this.toObj(xml.documentElement)}
else{alert("unhandled node type: "+xml.nodeType)}
return o},toJson: function(o,name,ind,wellform){if(wellform===undefined) wellform=true;var json=name?("\""+name+"\""):"",tab="\t",newline="\n";if(!wellform){tab="";newline=""}
if(o==="[]"){json+=(name?":[]":"[]")}
else if(o instanceof Array){var n,i,ar=[];for(i=0,n=o.length;i<n;i+=1){ar[i]=this.toJson(o[i],"",ind+tab,wellform)}
json+=(name?":[":"[")+(ar.length>1?(newline+ind+tab+ar.join(","+newline+ind+tab)+newline+ind):ar.join(""))+"]"}
else if(o===null){json+=(name&&":")+"null"}
else if(typeof(o)==="object"){var arr=[],m;for(m in o){if(o.hasOwnProperty(m)){arr[arr.length]=this.toJson(o[m],m,ind+tab,wellform)}}
json+=(name?":{":"{")+(arr.length>1?(newline+ind+tab+arr.join(","+newline+ind+tab)+newline+ind):arr.join(""))+"}"}
else if(typeof(o)==="string"){json+=(name&&":")+"\""+o.replace(/\\/g,'\\\\').replace(/\"/g,'\\"')+"\""}
else{json+=(name&&":")+"\""+o.toString()+"\""}
return json},innerXml: function(node){var s="";if("innerHTML" in node){s=node.innerHTML}
else{var asXml=function(n){var s="",i;if(n.nodeType===1){s+="<"+n.nodeName;for(i=0;i<n.attributes.length;i+=1){s+=" "+n.attributes[i].nodeName+"=\""+(n.attributes[i].nodeValue||"").toString()+"\""}
if(n.firstChild){s+=">";for(var c=n.firstChild;c;c=c.nextSibling){s+=asXml(c)}
s+="</"+n.nodeName+">"}
else{s+="/>"}}
else if(n.nodeType===3){s+=n.nodeValue}
else if(n.nodeType===4){s+="<![CDATA["+n.nodeValue+"]]>"}
return s};for(var c=node.firstChild;c;c=c.nextSibling){s+=asXml(c)}}
return s},escape: function(txt){return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r')},removeWhite: function(e){e.normalize();var n;for(n=e.firstChild;n;){if(n.nodeType===3){if(!n.nodeValue.match(/[^ \f\n\r\t\v]/)){var nxt=n.nextSibling;e.removeChild(n);n=nxt}
else{n=n.nextSibling}}
else if(n.nodeType===1){this.removeWhite(n);n=n.nextSibling}
else{n=n.nextSibling}}
return e}};(function($){$.fmatter={};$.extend($.fmatter,{isBoolean: function(o){return typeof o==='boolean'},isObject: function(o){return(o&&(typeof o==='object'||$.isFunction(o)))||false},isString: function(o){return typeof o==='string'},isNumber: function(o){return typeof o==='number'&&isFinite(o)},isNull: function(o){return o===null},isUndefined: function(o){return typeof o==='undefined'},isValue: function(o){return(this.isObject(o)||this.isString(o)||this.isNumber(o)||this.isBoolean(o))},isEmpty: function(o){if(!this.isString(o)&&this.isValue(o)){return false}else if(!this.isValue(o)){return true}
o=$.trim(o).replace(/\&nbsp\;/ig,'').replace(/\&#160\;/ig,'');return o===""}});$.fn.fmatter=function(formatType,cellval,opts,rwd,act){var v=cellval;opts=$.extend({},$.jgrid.formatter,opts);if($.fn.fmatter[formatType]){v=$.fn.fmatter[formatType](cellval,opts,rwd,act)}
return v};$.fmatter.util={NumberFormat: function(nData,opts){if(!$.fmatter.isNumber(nData)){nData *=1}
if($.fmatter.isNumber(nData)){var bNegative=(nData<0);var sOutput=nData+"";var sDecimalSeparator=(opts.decimalSeparator)?opts.decimalSeparator:".";var nDotIndex;if($.fmatter.isNumber(opts.decimalPlaces)){var nDecimalPlaces=opts.decimalPlaces;var nDecimal=Math.pow(10,nDecimalPlaces);sOutput=Math.round(nData*nDecimal)/nDecimal+"";nDotIndex=sOutput.lastIndexOf(".");if(nDecimalPlaces>0){if(nDotIndex<0){sOutput+=sDecimalSeparator;nDotIndex=sOutput.length-1}
else if(sDecimalSeparator!=="."){sOutput=sOutput.replace(".",sDecimalSeparator)}
while((sOutput.length-1-nDotIndex)<nDecimalPlaces){sOutput+="0"}}}
if(opts.thousandsSeparator){var sThousandsSeparator=opts.thousandsSeparator;nDotIndex=sOutput.lastIndexOf(sDecimalSeparator);nDotIndex=(nDotIndex>-1)?nDotIndex:sOutput.length;var sNewOutput=sOutput.substring(nDotIndex);var nCount=-1;for(var i=nDotIndex;i>0;i--){nCount++;if((nCount%3===0)&&(i!==nDotIndex)&&(!bNegative||(i>1))){sNewOutput=sThousandsSeparator+sNewOutput}
sNewOutput=sOutput.charAt(i-1)+sNewOutput}
sOutput=sNewOutput}
sOutput=(opts.prefix)?opts.prefix+sOutput:sOutput;sOutput=(opts.suffix)?sOutput+opts.suffix:sOutput;return sOutput} else{return nData}},DateFormat: function(format,date,newformat,opts){var token=/\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,msDateRegExp=new RegExp("^\/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)\/$"),msMatch=((typeof date==='string')?date.match(msDateRegExp):null),pad=function(value,length){value=String(value);length=parseInt(length,10)||2;while(value.length<length){value='0'+value}
return value},ts={m:1,d:1,y:1970,h:0,i:0,s:0,u:0},timestamp=0,dM,k,hl,dateFormat=["i18n"];dateFormat.i18n={dayNames:opts.dayNames,monthNames:opts.monthNames};if(format in opts.masks){format=opts.masks[format]}
if(!isNaN(date-0)&&String(format).toLowerCase()=="u"){timestamp=new Date(parseFloat(date)*1000)} else if(date.constructor===Date){timestamp=date} else if(msMatch!==null){timestamp=new Date(parseInt(msMatch[1],10));if(msMatch[3]){var offset=Number(msMatch[5]) * 60+Number(msMatch[6]);offset *=((msMatch[4]=='-')?1:-1);offset-=timestamp.getTimezoneOffset();timestamp.setTime(Number(Number(timestamp)+(offset * 60 * 1000)))}} else{date=String(date).split(/[\\\/:_;.,\t\T\s-]/);format=format.split(/[\\\/:_;.,\t\T\s-]/);for(k=0,hl=format.length;k<hl;k++){if(format[k]=='M'){dM=$.inArray(date[k],dateFormat.i18n.monthNames);if(dM!==-1&&dM<12){date[k]=dM+1}}
if(format[k]=='F'){dM=$.inArray(date[k],dateFormat.i18n.monthNames);if(dM!==-1&&dM>11){date[k]=dM+1-12}}
if(date[k]){ts[format[k].toLowerCase()]=parseInt(date[k],10)}}
if(ts.f){ts.m=ts.f}
if(ts.m===0&&ts.y===0&&ts.d===0){return "&#160;" }
ts.m=parseInt(ts.m,10)-1;var ty=ts.y;if(ty>=70&&ty<=99){ts.y=1900+ts.y}
else if(ty>=0&&ty<=69){ts.y=2000+ts.y}
timestamp=new Date(ts.y,ts.m,ts.d,ts.h,ts.i,ts.s,ts.u)}
if(newformat in opts.masks){newformat=opts.masks[newformat]} else if(!newformat){newformat='Y-m-d'}
var
G=timestamp.getHours(),i=timestamp.getMinutes(),j=timestamp.getDate(),n=timestamp.getMonth()+1,o=timestamp.getTimezoneOffset(),s=timestamp.getSeconds(),u=timestamp.getMilliseconds(),w=timestamp.getDay(),Y=timestamp.getFullYear(),N=(w+6)%7+1,z=(new Date(Y,n-1,j)-new Date(Y,0,1))/86400000,flags={d:pad(j),D:dateFormat.i18n.dayNames[w],j:j,l:dateFormat.i18n.dayNames[w+7],N:N,S:opts.S(j),w:w,z:z,W:N<5?Math.floor((z+N-1)/ 7) + 1 : Math.floor((z + N - 1) / 7)||((new Date(Y-1,0,1).getDay()+6)%7<4?53:52),F:dateFormat.i18n.monthNames[n-1+12],m:pad(n),M:dateFormat.i18n.monthNames[n-1],n:n,t:'?',L:'?',o:'?',Y:Y,y:String(Y).substring(2),a:G<12?opts.AmPm[0]:opts.AmPm[1],A:G<12?opts.AmPm[2]:opts.AmPm[3],B:'?',g:G%12||12,G:G,h:pad(G%12||12),H:pad(G),i:pad(i),s:pad(s),u:u,e:'?',I:'?',O:(o>0?"-":"+")+pad(Math.floor(Math.abs(o)/60) * 100+Math.abs(o)%60,4),P:'?',T:(String(timestamp).match(timezone)||[""]).pop().replace(timezoneClip,""),Z:'?',c:'?',r:'?',U:Math.floor(timestamp/1000)};return newformat.replace(token, function($0){return $0 in flags?flags[$0]:$0.substring(1)})}};$.fn.fmatter.defaultFormat=function(cellval,opts){return($.fmatter.isValue(cellval)&&cellval!=="")?cellval:opts.defaultValue?opts.defaultValue:"&#160;"};$.fn.fmatter.email=function(cellval,opts){if(!$.fmatter.isEmpty(cellval)){return "<a href=\"mailto:"+cellval+"\">"+cellval+"</a>"}else{return $.fn.fmatter.defaultFormat(cellval,opts)}};$.fn.fmatter.checkbox=function(cval,opts){var op=$.extend({},opts.checkbox),ds;if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend({},op,opts.colModel.formatoptions)}
if(op.disabled===true){ds="disabled=\"disabled\""} else{ds=""}
if($.fmatter.isEmpty(cval)||$.fmatter.isUndefined(cval)){cval=$.fn.fmatter.defaultFormat(cval,op)}
cval=cval+"";cval=cval.toLowerCase();var bchk=cval.search(/(false|0|no|off)/i)<0?" checked='checked' ":"";return "<input type=\"checkbox\" "+bchk+" value=\""+cval+"\" offval=\"no\" "+ds+"/>"};$.fn.fmatter.link=function(cellval,opts){var op={target:opts.target};var target="";if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend({},op,opts.colModel.formatoptions)}
if(op.target){target='target='+op.target}
if(!$.fmatter.isEmpty(cellval)){return "<a "+target+" href=\""+cellval+"\">"+cellval+"</a>"}else{return $.fn.fmatter.defaultFormat(cellval,opts)}};$.fn.fmatter.showlink=function(cellval,opts){var op={baseLinkUrl:opts.baseLinkUrl,showAction:opts.showAction,addParam:opts.addParam||"",target:opts.target,idName:opts.idName},target="",idUrl;if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend({},op,opts.colModel.formatoptions)}
if(op.target){target='target='+op.target}
idUrl=op.baseLinkUrl+op.showAction+'?'+op.idName+'='+opts.rowId+op.addParam;if($.fmatter.isString(cellval)||$.fmatter.isNumber(cellval)){return "<a "+target+" href=\""+idUrl+"\">"+cellval+"</a>"}else{return $.fn.fmatter.defaultFormat(cellval,opts)}};$.fn.fmatter.integer=function(cellval,opts){var op=$.extend({},opts.integer);if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend({},op,opts.colModel.formatoptions)}
if($.fmatter.isEmpty(cellval)){return op.defaultValue}
return $.fmatter.util.NumberFormat(cellval,op)};$.fn.fmatter.number=function(cellval,opts){var op=$.extend({},opts.number);if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend({},op,opts.colModel.formatoptions)}
if($.fmatter.isEmpty(cellval)){return op.defaultValue}
return $.fmatter.util.NumberFormat(cellval,op)};$.fn.fmatter.currency=function(cellval,opts){var op=$.extend({},opts.currency);if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend({},op,opts.colModel.formatoptions)}
if($.fmatter.isEmpty(cellval)){return op.defaultValue}
return $.fmatter.util.NumberFormat(cellval,op)};$.fn.fmatter.date=function(cellval,opts,rwd,act){var op=$.extend({},opts.date);if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend({},op,opts.colModel.formatoptions)}
if(!op.reformatAfterEdit&&act=='edit'){return $.fn.fmatter.defaultFormat(cellval,opts)} else if(!$.fmatter.isEmpty(cellval)){return $.fmatter.util.DateFormat(op.srcformat,cellval,op.newformat,op)} else{return $.fn.fmatter.defaultFormat(cellval,opts)}};$.fn.fmatter.select=function(cellval,opts,rwd,act){cellval=cellval+"";var oSelect=false,ret=[],sep;if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){oSelect=opts.colModel.formatoptions.value;sep=opts.colModel.formatoptions.separator===undefined?":":opts.colModel.formatoptions.separator} else if(!$.fmatter.isUndefined(opts.colModel.editoptions)){oSelect=opts.colModel.editoptions.value;sep=opts.colModel.editoptions.separator===undefined?":":opts.colModel.editoptions.separator}
if(oSelect){var msl=opts.colModel.editoptions.multiple===true?true:false,scell=[],sv;if(msl){scell=cellval.split(",");scell=$.map(scell,function(n){return $.trim(n)})}
if($.fmatter.isString(oSelect)){var so=oSelect.split(";"),j=0;for(var i=0;i<so.length;i++){sv=so[i].split(sep);if(sv.length>2){sv[1]=jQuery.map(sv,function(n,i){if(i>0){return n}}).join(":")}
if(msl){if(jQuery.inArray(sv[0],scell)>-1){ret[j]=sv[1];j++}} else if($.trim(sv[0])==$.trim(cellval)){ret[0]=sv[1];break}}} else if($.fmatter.isObject(oSelect)){if(msl){ret=jQuery.map(scell, function(n,i){return oSelect[n]})} else{ret[0]=oSelect[cellval]||""}}}
cellval=ret.join(", ");return cellval===""?$.fn.fmatter.defaultFormat(cellval,opts):cellval};$.fn.fmatter.rowactions=function(rid,gid,act,pos){var op={keys:false,onEdit:null,onSuccess:null,afterSave:null,onError:null,afterRestore:null,extraparam:{},url:null,delOptions:{},editOptions:{}};rid=$.jgrid.jqID(rid);gid=$.jgrid.jqID(gid);var cm=$('#'+gid)[0].p.colModel[pos];if(!$.fmatter.isUndefined(cm.formatoptions)){op=$.extend(op,cm.formatoptions)}
if(!$.fmatter.isUndefined($('#'+gid)[0].p.editOptions)){op.editOptions=$('#'+gid)[0].p.editOptions}
if(!$.fmatter.isUndefined($('#'+gid)[0].p.delOptions)){op.delOptions=$('#'+gid)[0].p.delOptions}
var $t=$("#"+gid)[0];var saverow=function(rowid,res){if(op.afterSave) op.afterSave.call($t,rowid,res);$("tr#"+rid+" div.ui-inline-edit, "+"tr#"+rid+" div.ui-inline-del","#"+gid+".ui-jqgrid-btable:first").show();$("tr#"+rid+" div.ui-inline-save, "+"tr#"+rid+" div.ui-inline-cancel","#"+gid+".ui-jqgrid-btable:first").hide()},restorerow=function(rowid){if(op.afterRestore) op.afterRestore.call($t,rowid);$("tr#"+rid+" div.ui-inline-edit, "+"tr#"+rid+" div.ui-inline-del","#"+gid+".ui-jqgrid-btable:first").show();$("tr#"+rid+" div.ui-inline-save, "+"tr#"+rid+" div.ui-inline-cancel","#"+gid+".ui-jqgrid-btable:first").hide()};if($("#"+rid,"#"+gid).hasClass("jqgrid-new-row")){var opers=$t.p.prmNames,oper=opers.oper;op.extraparam[oper]=opers.addoper}
switch(act){case 'edit':$('#'+gid).jqGrid('editRow',rid,op.keys,op.onEdit,op.onSuccess,op.url,op.extraparam,saverow,op.onError,restorerow);$("tr#"+rid+" div.ui-inline-edit, "+"tr#"+rid+" div.ui-inline-del","#"+gid+".ui-jqgrid-btable:first").hide();$("tr#"+rid+" div.ui-inline-save, "+"tr#"+rid+" div.ui-inline-cancel","#"+gid+".ui-jqgrid-btable:first").show();if($.isFunction($t.p._complete)){$t.p._complete.call($t)}
break;case 'save':if($('#'+gid).jqGrid('saveRow',rid,op.onSuccess,op.url,op.extraparam,saverow,op.onError,restorerow)){$("tr#"+rid+" div.ui-inline-edit, "+"tr#"+rid+" div.ui-inline-del","#"+gid+".ui-jqgrid-btable:first").show();$("tr#"+rid+" div.ui-inline-save, "+"tr#"+rid+" div.ui-inline-cancel","#"+gid+".ui-jqgrid-btable:first").hide();if($.isFunction($t.p._complete)){$t.p._complete.call($t)}}
break;case 'cancel':$('#'+gid).jqGrid('restoreRow',rid,restorerow);$("tr#"+rid+" div.ui-inline-edit, "+"tr#"+rid+" div.ui-inline-del","#"+gid+".ui-jqgrid-btable:first").show();$("tr#"+rid+" div.ui-inline-save, "+"tr#"+rid+" div.ui-inline-cancel","#"+gid+".ui-jqgrid-btable:first").hide();if($.isFunction($t.p._complete)){$t.p._complete.call($t)}
break;case 'del':$('#'+gid).jqGrid('delGridRow',rid,op.delOptions);break;case 'formedit':$('#'+gid).jqGrid('setSelection',rid);$('#'+gid).jqGrid('editGridRow',rid,op.editOptions);break}};$.fn.fmatter.actions=function(cellval,opts,rwd){var op={keys:false,editbutton:true,delbutton:true,editformbutton:false};if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){op=$.extend(op,opts.colModel.formatoptions)}
var rowid=opts.rowId,str="",ocl;if(typeof(rowid)=='undefined'||$.fmatter.isEmpty(rowid)){return ""}
if(op.editformbutton){ocl="onclick=jQuery.fn.fmatter.rowactions('"+rowid+"','"+opts.gid+"','formedit',"+opts.pos+"); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); "
str=str+"<div title='"+$.jgrid.nav.edittitle+"' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='ui-icon ui-icon-pencil'></span></div>"} else if(op.editbutton){ocl="onclick=jQuery.fn.fmatter.rowactions('"+rowid+"','"+opts.gid+"','edit',"+opts.pos+"); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";str=str+"<div title='"+$.jgrid.nav.edittitle+"' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='ui-icon ui-icon-pencil'></span></div>"}
if(op.delbutton){ocl="onclick=jQuery.fn.fmatter.rowactions('"+rowid+"','"+opts.gid+"','del',"+opts.pos+"); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";str=str+"<div title='"+$.jgrid.nav.deltitle+"' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' "+ocl+"><span class='ui-icon ui-icon-trash'></span></div>"}
ocl="onclick=jQuery.fn.fmatter.rowactions('"+rowid+"','"+opts.gid+"','save',"+opts.pos+"); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";str=str+"<div title='"+$.jgrid.edit.bSubmit+"' style='float:left;display:none' class='ui-pg-div ui-inline-save' "+ocl+"><span class='ui-icon ui-icon-disk'></span></div>";ocl="onclick=jQuery.fn.fmatter.rowactions('"+rowid+"','"+opts.gid+"','cancel',"+opts.pos+"); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";str=str+"<div title='"+$.jgrid.edit.bCancel+"' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel' "+ocl+"><span class='ui-icon ui-icon-cancel'></span></div>";return "<div style='margin-left:8px;'>"+str+"</div>"};$.unformat=function(cellval,options,pos,cnt){var ret,formatType=options.colModel.formatter,op=options.colModel.formatoptions||{},sep,re=/([\.\*\_\'\(\)\{\}\+\?\\])/g,unformatFunc=options.colModel.unformat||($.fn.fmatter[formatType]&&$.fn.fmatter[formatType].unformat);if(typeof unformatFunc!=='undefined'&&$.isFunction(unformatFunc)){ret=unformatFunc($(cellval).text(),options,cellval)} else if(!$.fmatter.isUndefined(formatType)&&$.fmatter.isString(formatType)){var opts=$.jgrid.formatter||{},stripTag;switch(formatType){case 'integer':op=$.extend({},opts.integer,op);sep=op.thousandsSeparator.replace(re,"\\$1");stripTag=new RegExp(sep,"g");ret=$(cellval).text().replace(stripTag,'');break;case 'number':op=$.extend({},opts.number,op);sep=op.thousandsSeparator.replace(re,"\\$1");stripTag=new RegExp(sep,"g");ret=$(cellval).text().replace(stripTag,"").replace(op.decimalSeparator,'.');break;case 'currency':op=$.extend({},opts.currency,op);sep=op.thousandsSeparator.replace(re,"\\$1");stripTag=new RegExp(sep,"g");ret=$(cellval).text().replace(stripTag,'').replace(op.decimalSeparator,'.').replace(op.prefix,'').replace(op.suffix,'');break;case 'checkbox':var cbv=(options.colModel.editoptions)?options.colModel.editoptions.value.split(":"):["Yes","No"];ret=$('input',cellval).is(":checked")?cbv[0]:cbv[1];break;case 'select':ret=$.unformat.select(cellval,options,pos,cnt);break;case 'actions':return "";default:ret=$(cellval).text()}}
return ret!==undefined?ret:cnt===true?$(cellval).text():$.jgrid.htmlDecode($(cellval).html())};$.unformat.select=function(cellval,options,pos,cnt){var ret=[];var cell=$(cellval).text();if(cnt===true){return cell}
var op=$.extend({},options.colModel.editoptions);if(op.value){var oSelect=op.value,msl=op.multiple===true?true:false,scell=[],sv;if(msl){scell=cell.split(",");scell=$.map(scell,function(n){return $.trim(n)})}
if($.fmatter.isString(oSelect)){var so=oSelect.split(";"),j=0;for(var i=0;i<so.length;i++){sv=so[i].split(":");if(sv.length>2){sv[1]=jQuery.map(sv,function(n,i){if(i>0){return n}}).join(":")}
if(msl){if(jQuery.inArray(sv[1],scell)>-1){ret[j]=sv[0];j++}} else if($.trim(sv[1])==$.trim(cell)){ret[0]=sv[0];break}}} else if($.fmatter.isObject(oSelect)||$.isArray(oSelect)){if(!msl){scell[0]=cell}
ret=jQuery.map(scell, function(n){var rv;$.each(oSelect, function(i,val){if(val==n){rv=i;return false}});if(typeof(rv)!='undefined'){return rv}})}
return ret.join(", ")} else{return cell||""}};$.unformat.date=function(cellval,opts){var op=$.jgrid.formatter.date||{};if(!$.fmatter.isUndefined(opts.formatoptions)){op=$.extend({},op,opts.formatoptions)}
if(!$.fmatter.isEmpty(cellval)){return $.fmatter.util.DateFormat(op.newformat,cellval,op.srcformat,op)} else{return $.fn.fmatter.defaultFormat(cellval,opts)}}})(jQuery);(function($){$.extend($.jgrid,{showModal: function(h){h.w.show()},closeModal: function(h){h.w.hide().attr("aria-hidden","true");if(h.o){h.o.remove()}},hideModal: function(selector,o){o=$.extend({jqm:true,gb:''},o||{});if(o.onClose){var oncret=o.onClose(selector);if(typeof oncret=='boolean'&&!oncret){return}}
if($.fn.jqm&&o.jqm===true){$(selector).attr("aria-hidden","true").jqmHide()} else{if(o.gb!==''){try{$(".jqgrid-overlay:first",o.gb).hide()} catch(e){}}
$(selector).hide().attr("aria-hidden","true")}},findPos: function(obj){var curleft=0,curtop=0;if(obj.offsetParent){do{curleft+=obj.offsetLeft;curtop+=obj.offsetTop} while(obj=obj.offsetParent)}
return [curleft,curtop]},createModal: function(aIDs,content,p,insertSelector,posSelector,appendsel,css){var mw=document.createElement('div'),rtlsup,self=this;css=$.extend({},css||{});rtlsup=$(p.gbox).attr("dir")=="rtl"?true:false;mw.className="ui-widget ui-widget-content ui-corner-all ui-jqdialog";mw.id=aIDs.themodal;var mh=document.createElement('div');mh.className="ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";mh.id=aIDs.modalhead;$(mh).append("<span class='ui-jqdialog-title'>"+p.caption+"</span>");var ahr=$("<a href='javascript:void(0)' class='ui-jqdialog-titlebar-close ui-corner-all'></a>").hover(function(){ahr.addClass('ui-state-hover')},
function(){ahr.removeClass('ui-state-hover')}).append("<span class='ui-icon ui-icon-closethick'></span>");$(mh).append(ahr);if(rtlsup){mw.dir="rtl";$(".ui-jqdialog-title",mh).css("float","right");$(".ui-jqdialog-titlebar-close",mh).css("left",0.3+"em")} else{mw.dir="ltr";$(".ui-jqdialog-title",mh).css("float","left");$(".ui-jqdialog-titlebar-close",mh).css("right",0.3+"em")}
var mc=document.createElement('div');$(mc).addClass("ui-jqdialog-content ui-widget-content").attr("id",aIDs.modalcontent);$(mc).append(content);mw.appendChild(mc);$(mw).prepend(mh);if(appendsel===true){$('body').append(mw)}
else if(typeof appendsel=="string")
$(appendsel).append(mw);else{$(mw).insertBefore(insertSelector)}
$(mw).css(css);if(typeof p.jqModal==='undefined'){p.jqModal=true}
var coord={};if($.fn.jqm&&p.jqModal===true){if(p.left===0&&p.top===0&&p.overlay){var pos=[];pos=this.findPos(posSelector);p.left=pos[0]+4;p.top=pos[1]+4}
coord.top=p.top+"px";coord.left=p.left} else if(p.left!==0||p.top!==0){coord.left=p.left;coord.top=p.top+"px"}
$("a.ui-jqdialog-titlebar-close",mh).click(function(e){var oncm=$("#"+aIDs.themodal).data("onClose")||p.onClose;var gboxclose=$("#"+aIDs.themodal).data("gbox")||p.gbox;self.hideModal("#"+aIDs.themodal,{gb:gboxclose,jqm:p.jqModal,onClose:oncm});return false});if(p.width===0||!p.width){p.width=300}
if(p.height===0||!p.height){p.height=200}
if(!p.zIndex){var parentZ=$(insertSelector).parents("*[role=dialog]").filter(':first').css("z-index");if(parentZ){p.zIndex=parseInt(parentZ,10)+2} else{p.zIndex=950}}
var rtlt=0;if(rtlsup&&coord.left&&!appendsel){rtlt=$(p.gbox).width()-(!isNaN(p.width)?parseInt(p.width,10):0)-8;coord.left=parseInt(coord.left,10)+parseInt(rtlt,10)}
if(coord.left){coord.left+="px"}
$(mw).css($.extend({width:isNaN(p.width)?"auto":p.width+"px",height:isNaN(p.height)?"auto":p.height+"px",zIndex:p.zIndex,overflow:'hidden'},coord)).attr({tabIndex:"-1","role":"dialog","aria-labelledby":aIDs.modalhead,"aria-hidden":"true"});if(typeof p.drag=='undefined'){p.drag=true}
if(typeof p.resize=='undefined'){p.resize=true}
if(p.drag){$(mh).css('cursor','move');if($.fn.jqDrag){$(mw).jqDrag(mh)} else{try{$(mw).draggable({handle:$("#"+mh.id)})} catch(e){}}}
if(p.resize){if($.fn.jqResize){$(mw).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se ui-icon-grip-diagonal-se'></div>");$("#"+aIDs.themodal).jqResize(".jqResize",aIDs.scrollelm?"#"+aIDs.scrollelm:false)} else{try{$(mw).resizable({handles:'se, sw',alsoResize:aIDs.scrollelm?"#"+aIDs.scrollelm:false})} catch(r){}}}
if(p.closeOnEscape===true){$(mw).keydown( function(e){if(e.which==27){var cone=$("#"+aIDs.themodal).data("onClose")||p.onClose;self.hideModal(this,{gb:p.gbox,jqm:p.jqModal,onClose:cone})}})}},viewModal: function(selector,o){o=$.extend({toTop:true,overlay:10,modal:false,overlayClass:'ui-widget-overlay',onShow:this.showModal,onHide:this.closeModal,gbox:'',jqm:true,jqM:true},o||{});if($.fn.jqm&&o.jqm===true){if(o.jqM){$(selector).attr("aria-hidden","false").jqm(o).jqmShow()}
else{$(selector).attr("aria-hidden","false").jqmShow()}} else{if(o.gbox!==''){$(".jqgrid-overlay:first",o.gbox).show();$(selector).data("gbox",o.gbox)}
$(selector).show().attr("aria-hidden","false");try{$(':input:visible',selector)[0].focus()}catch(_){}}},info_dialog: function(caption,content,c_b,modalopt){var mopt={width:290,height:'auto',dataheight:'auto',drag:true,resize:false,caption:"<b>"+caption+"</b>",left:250,top:170,zIndex:1000,jqModal:true,modal:false,closeOnEscape:true,align:'center',buttonalign:'center',buttons:[]};$.extend(mopt,modalopt||{});var jm=mopt.jqModal,self=this;if($.fn.jqm&&!jm){jm=false}
var buttstr="";if(mopt.buttons.length>0){for(var i=0;i<mopt.buttons.length;i++){if(typeof mopt.buttons[i].id=="undefined"){mopt.buttons[i].id="info_button_"+i}
buttstr+="<a href='javascript:void(0)' id='"+mopt.buttons[i].id+"' class='fm-button ui-state-default ui-corner-all'>"+mopt.buttons[i].text+"</a>"}}
var dh=isNaN(mopt.dataheight)?mopt.dataheight:mopt.dataheight+"px",cn="text-align:"+mopt.align+";";var cnt="<div id='info_id'>";cnt+="<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:"+dh+";"+cn+"'>"+content+"</div>";cnt+=c_b?"<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a href='javascript:void(0)' id='closedialog' class='fm-button ui-state-default ui-corner-all'>"+c_b+"</a>"+buttstr+"</div>":buttstr!==""?"<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>"+buttstr+"</div>":"";cnt+="</div>";try{if($("#info_dialog").attr("aria-hidden")=="false"){this.hideModal("#info_dialog",{jqm:jm})}
$("#info_dialog").remove()} catch(e){}
this.createModal({themodal:'info_dialog',modalhead:'info_head',modalcontent:'info_content',scrollelm:'infocnt'},cnt,mopt,'','',true);if(buttstr){$.each(mopt.buttons,function(i){$("#"+this.id,"#info_id").bind('click',function(){mopt.buttons[i].onClick.call($("#info_dialog"));return false})})}
$("#closedialog","#info_id").click(function(e){self.hideModal("#info_dialog",{jqm:jm});return false});$(".fm-button","#info_dialog").hover(
function(){$(this).addClass('ui-state-hover')},
function(){$(this).removeClass('ui-state-hover')});if($.isFunction(mopt.beforeOpen)){mopt.beforeOpen()}
this.viewModal("#info_dialog",{onHide: function(h){h.w.hide().remove();if(h.o){h.o.remove()}},modal:mopt.modal,jqm:jm});if($.isFunction(mopt.afterOpen)){mopt.afterOpen()}
try{$("#info_dialog").focus()} catch(m){}},createEl: function(eltype,options,vl,autowidth,ajaxso){var elem="";
function bindEv(el,opt){if($.isFunction(opt.dataInit)){opt.dataInit(el)}
if(opt.dataEvents){$.each(opt.dataEvents, function(){if(this.data!==undefined){$(el).bind(this.type,this.data,this.fn)} else{$(el).bind(this.type,this.fn)}})}
return opt}
function setAttributes(elm,atr,exl){var exclude=['dataInit','dataEvents','dataUrl','buildSelect','sopt','searchhidden','defaultValue','attr'];if(typeof(exl)!="undefined"&&$.isArray(exl)){exclude=$.extend(exclude,exl)}
$.each(atr, function(key,value){if($.inArray(key,exclude)===-1){$(elm).attr(key,value)}});if(!atr.hasOwnProperty('id')){$(elm).attr('id',$.jgrid.randId())}}
switch(eltype){case "textarea":elem=document.createElement("textarea");if(autowidth){if(!options.cols){$(elem).css({width:"98%"})}} else if(!options.cols){options.cols=20}
if(!options.rows){options.rows=2}
if(vl=='&nbsp;'||vl=='&#160;'||(vl.length==1&&vl.charCodeAt(0)==160)){vl=""}
elem.value=vl;setAttributes(elem,options);options=bindEv(elem,options);$(elem).attr({"role":"textbox","multiline":"true"});break;case "checkbox":elem=document.createElement("input");elem.type="checkbox";if(!options.value){var vl1=vl.toLowerCase();if(vl1.search(/(false|0|no|off|undefined)/i)<0&&vl1!==""){elem.checked=true;elem.defaultChecked=true;elem.value=vl} else{elem.value="on"}
$(elem).attr("offval","off")} else{var cbval=options.value.split(":");if(vl===cbval[0]){elem.checked=true;elem.defaultChecked=true}
elem.value=cbval[0];$(elem).attr("offval",cbval[1])}
setAttributes(elem,options,['value']);options=bindEv(elem,options);$(elem).attr("role","checkbox");break;case "select":elem=document.createElement("select");elem.setAttribute("role","select");var msl,ovm=[];if(options.multiple===true){msl=true;elem.multiple="multiple";$(elem).attr("aria-multiselectable","true")} else{msl=false}
if(typeof(options.dataUrl)!="undefined"){$.ajax($.extend({url:options.dataUrl,type:"GET",dataType:"html",context:{elem:elem,options:options,vl:vl},success: function(data,status){var a,ovm=[],elem=this.elem,vl=this.vl,options=$.extend({},this.options),msl=options.multiple===true;if(typeof(options.buildSelect)!="undefined"){var b=options.buildSelect(data);a=$(b).html()} else{a=$(data).html()}
if(a){$(elem).append(a);setAttributes(elem,options);options=bindEv(elem,options);if(typeof options.size==='undefined'){options.size=msl?3:1}
if(msl){ovm=vl.split(",");ovm=$.map(ovm,function(n){return $.trim(n)})} else{ovm[0]=$.trim(vl)}
setTimeout(function(){$("option",elem).each(function(i){$(this).attr("role","option");if($.inArray($.trim($(this).text()),ovm)>-1||$.inArray($.trim($(this).val()),ovm)>-1){this.selected="selected"}})},0)}}},ajaxso||{}))} else if(options.value){var i;if(typeof options.size==='undefined'){options.size=msl?3:1}
if(msl){ovm=vl.split(",");ovm=$.map(ovm,function(n){return $.trim(n)})}
if(typeof options.value==='function'){options.value=options.value()}
var so,sv,ov,sep=options.separator===undefined?":":options.separator;if(typeof options.value==='string'){so=options.value.split(";");for(i=0;i<so.length;i++){sv=so[i].split(sep);if(sv.length>2){sv[1]=$.map(sv,function(n,ii){if(ii>0){return n}}).join(":")}
ov=document.createElement("option");ov.setAttribute("role","option");ov.value=sv[0];ov.innerHTML=sv[1];elem.appendChild(ov);if(!msl&&($.trim(sv[0])==$.trim(vl)||$.trim(sv[1])==$.trim(vl))){ov.selected="selected"}
if(msl&&($.inArray($.trim(sv[1]),ovm)>-1||$.inArray($.trim(sv[0]),ovm)>-1)){ov.selected="selected"}}} else if(typeof options.value==='object'){var oSv=options.value;for(var key in oSv){if(oSv.hasOwnProperty(key)){ov=document.createElement("option");ov.setAttribute("role","option");ov.value=key;ov.innerHTML=oSv[key];elem.appendChild(ov);if(!msl&&($.trim(key)==$.trim(vl)||$.trim(oSv[key])==$.trim(vl))){ov.selected="selected"}
if(msl&&($.inArray($.trim(oSv[key]),ovm)>-1||$.inArray($.trim(key),ovm)>-1)){ov.selected="selected"}}}}
setAttributes(elem,options,['value']);options=bindEv(elem,options)}
break;case "text":case "password":case "button":var role;if(eltype=="button"){role="button"}
else{role="textbox"}
elem=document.createElement("input");elem.type=eltype;elem.value=vl;setAttributes(elem,options);options=bindEv(elem,options);if(eltype!="button"){if(autowidth){if(!options.size){$(elem).css({width:"98%"})}} else if(!options.size){options.size=20}}
$(elem).attr("role",role);break;case "image":case "file":elem=document.createElement("input");elem.type=eltype;setAttributes(elem,options);options=bindEv(elem,options);break;case "custom":elem=document.createElement("span");try{if($.isFunction(options.custom_element)){var celm=options.custom_element.call(this,vl,options);if(celm){celm=$(celm).addClass("customelement").attr({id:options.id,name:options.name});$(elem).empty().append(celm)} else{throw "e2"}} else{throw "e1"}} catch(e){if(e=="e1"){this.info_dialog($.jgrid.errors.errcap,"function 'custom_element' "+$.jgrid.edit.msg.nodefined,$.jgrid.edit.bClose)}
if(e=="e2"){this.info_dialog($.jgrid.errors.errcap,"function 'custom_element' "+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose)}
else{this.info_dialog($.jgrid.errors.errcap,typeof(e)==="string"?e:e.message,$.jgrid.edit.bClose)}}
break}
return elem},checkDate: function(format,date){var daysInFebruary=function(year){return(((year%4===0)&&(year%100!==0||(year%400===0)))?29:28)},DaysArray=function(n){for(var i=1;i<=n;i++){this[i]=31;if(i==4||i==6||i==9||i==11){this[i]=30}
if(i==2){this[i]=29}}
return this};var tsp={},sep;format=format.toLowerCase();if(format.indexOf("/")!=-1){sep="/"} else if(format.indexOf("-")!=-1){sep="-"} else if(format.indexOf(".")!=-1){sep="."} else{sep="/"}
format=format.split(sep);date=date.split(sep);if(date.length!=3){return false}
var j=-1,yln,dln=-1,mln=-1;for(var i=0;i<format.length;i++){var dv=isNaN(date[i])?0:parseInt(date[i],10);tsp[format[i]]=dv;yln=format[i];if(yln.indexOf("y")!=-1){j=i}
if(yln.indexOf("m")!=-1){mln=i}
if(yln.indexOf("d")!=-1){dln=i}}
if(format[j]=="y"||format[j]=="yyyy"){yln=4} else if(format[j]=="yy"){yln=2} else{yln=-1}
var daysInMonth=DaysArray(12),strDate;if(j===-1){return false} else{strDate=tsp[format[j]].toString();if(yln==2&&strDate.length==1){yln=1}
if(strDate.length!=yln||(tsp[format[j]]===0&&date[j]!="00")){return false}}
if(mln===-1){return false} else{strDate=tsp[format[mln]].toString();if(strDate.length<1||tsp[format[mln]]<1||tsp[format[mln]]>12){return false}}
if(dln===-1){return false} else{strDate=tsp[format[dln]].toString();if(strDate.length<1||tsp[format[dln]]<1||tsp[format[dln]]>31||(tsp[format[mln]]==2&&tsp[format[dln]]>daysInFebruary(tsp[format[j]]))||tsp[format[dln]]>daysInMonth[tsp[format[mln]]]){return false}}
return true},isEmpty: function(val){if(val.match(/^\s+$/)||val===""){return true} else{return false}},checkTime: function(time){var re=/^(\d{1,2}):(\d{2})([ap]m)?$/,regs;if(!this.isEmpty(time)){regs=time.match(re);if(regs){if(regs[3]){if(regs[1]<1||regs[1]>12){return false}} else{if(regs[1]>23){return false}}
if(regs[2]>59){return false}} else{return false}}
return true},checkValues: function(val,valref,g,customobject,nam){var edtrul,i,nm,dft,len;if(typeof(customobject)==="undefined"){if(typeof(valref)=='string'){for(i=0,len=g.p.colModel.length;i<len;i++){if(g.p.colModel[i].name==valref){edtrul=g.p.colModel[i].editrules;valref=i;try{nm=g.p.colModel[i].formoptions.label} catch(e){}
break}}} else if(valref>=0){edtrul=g.p.colModel[valref].editrules}} else{edtrul=customobject;nm=nam===undefined?"_":nam}
if(edtrul){if(!nm){nm=g.p.colNames[valref]}
if(edtrul.required===true){if(this.isEmpty(val)){return [false,nm+": "+$.jgrid.edit.msg.required,""]}}
var rqfield=edtrul.required===false?false:true;if(edtrul.number===true){if(!(rqfield===false&&this.isEmpty(val))){if(isNaN(val)){return [false,nm+": "+$.jgrid.edit.msg.number,""]}}}
if(typeof edtrul.minValue!='undefined'&&!isNaN(edtrul.minValue)){if(parseFloat(val)<parseFloat(edtrul.minValue)){return [false,nm+": "+$.jgrid.edit.msg.minValue+" "+edtrul.minValue,""]}}
if(typeof edtrul.maxValue!='undefined'&&!isNaN(edtrul.maxValue)){if(parseFloat(val)>parseFloat(edtrul.maxValue)){return [false,nm+": "+$.jgrid.edit.msg.maxValue+" "+edtrul.maxValue,""]}}
var filter;if(edtrul.email===true){if(!(rqfield===false&&this.isEmpty(val))){filter=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;if(!filter.test(val)){return [false,nm+": "+$.jgrid.edit.msg.email,""]}}}
if(edtrul.integer===true){if(!(rqfield===false&&this.isEmpty(val))){if(isNaN(val)){return [false,nm+": "+$.jgrid.edit.msg.integer,""]}
if((val%1!==0)||(val.indexOf('.')!=-1)){return [false,nm+": "+$.jgrid.edit.msg.integer,""]}}}
if(edtrul.date===true){if(!(rqfield===false&&this.isEmpty(val))){if(g.p.colModel[valref].formatoptions&&g.p.colModel[valref].formatoptions.newformat){dft=g.p.colModel[valref].formatoptions.newformat} else{dft=g.p.colModel[valref].datefmt||"Y-m-d"}
if(!this.checkDate(dft,val)){return [false,nm+": "+$.jgrid.edit.msg.date+" - "+dft,""]}}}
if(edtrul.time===true){if(!(rqfield===false&&this.isEmpty(val))){if(!this.checkTime(val)){return [false,nm+": "+$.jgrid.edit.msg.date+" - hh:mm (am/pm)",""]}}}
if(edtrul.url===true){if(!(rqfield===false&&this.isEmpty(val))){filter=/^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;if(!filter.test(val)){return [false,nm+": "+$.jgrid.edit.msg.url,""]}}}
if(edtrul.custom===true){if(!(rqfield===false&&this.isEmpty(val))){if($.isFunction(edtrul.custom_func)){var ret=edtrul.custom_func.call(g,val,nm);if($.isArray(ret)){return ret} else{return [false,$.jgrid.edit.msg.customarray,""]}} else{return [false,$.jgrid.edit.msg.customfcheck,""]}}}}
return [true,"",""]}})})(jQuery);(function($){$.fn.jqFilter=function(arg){if(typeof arg==='string'){var fn=$.fn.jqFilter[arg];if(!fn){throw("jqFilter - No such method: "+arg)}
var args=$.makeArray(arguments).slice(1);return fn.apply(this,args)}
var p=$.extend(true,{filter:null,columns:[],onChange:null,afterRedraw:null,checkValues:null,error:false,errmsg:"",errorcheck:true,showQuery:true,sopt:null,ops:[{"name":"eq","description":"equal","operator":"="},{"name":"ne","description":"not equal","operator":"<>"},{"name":"lt","description":"less","operator":"<"},{"name":"le","description":"less or equal","operator":"<="},{"name":"gt","description":"greater","operator":">"},{"name":"ge","description":"greater or equal","operator":">="},{"name":"bw","description":"begins with","operator":"LIKE"},{"name":"bn","description":"does not begin with","operator":"NOT LIKE"},{"name":"in","description":"in","operator":"IN"},{"name":"ni","description":"not in","operator":"NOT IN"},{"name":"ew","description":"ends with","operator":"LIKE"},{"name":"en","description":"does not end with","operator":"NOT LIKE"},{"name":"cn","description":"contains","operator":"LIKE"},{"name":"nc","description":"does not contain","operator":"NOT LIKE"},{"name":"nu","description":"is null","operator":"IS NULL"},{"name":"nn","description":"is not null","operator":"IS NOT NULL"}],numopts:['eq','ne','lt','le','gt','ge','nu','nn','in','ni'],stropts:['eq','ne','bw','bn','ew','en','cn','nc','nu','nn','in','ni'],_gridsopt:[],groupOps:[{op:"AND",text:"AND"},{op:"OR",text:"OR"}],groupButton:true,ruleButtons:true,direction:"ltr"},arg||{});return this.each( function(){if(this.filter){return}
this.p=p;if(this.p.filter===null||this.p.filter===undefined){this.p.filter={groupOp:this.p.groupOps[0].op,rules:[],groups:[]}}
var i,len=this.p.columns.length,cl,isIE=/msie/i.test(navigator.userAgent)&&!window.opera;if(this.p._gridsopt.length){for(i=0;i<this.p._gridsopt.length;i++){this.p.ops[i].description=this.p._gridsopt[i]}}
this.p.initFilter=$.extend(true,{},this.p.filter);if(!len){return}
for(i=0;i<len;i++){cl=this.p.columns[i];if(cl.stype){cl.inputtype=cl.stype} else if(!cl.inputtype){cl.inputtype='text'}
if(cl.sorttype){cl.searchtype=cl.sorttype} else if(!cl.searchtype){cl.searchtype='string'}
if(cl.hidden===undefined){cl.hidden=false}
if(!cl.label){cl.label=cl.name}
if(cl.index){cl.name=cl.index}
if(!cl.hasOwnProperty('searchoptions')){cl.searchoptions={}}
if(!cl.hasOwnProperty('searchrules')){cl.searchrules={}}}
if(this.p.showQuery){$(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='"+this.p.direction+"'><tbody><tr><td class='query'></td></tr></tbody></table>")}
var checkData=function(val,colModelItem){var ret=[true,""];if($.isFunction(colModelItem.searchrules)){ret=colModelItem.searchrules(val,colModelItem)} else if($.jgrid&&$.jgrid.checkValues){try{ret=$.jgrid.checkValues(val,-1,null,colModelItem.searchrules,colModelItem.label)} catch(e){}}
if(ret&&ret.length&&ret[0]===false){p.error=!ret[0];p.errmsg=ret[1]}};this.onchange=function(){this.p.error=false;this.p.errmsg="";return $.isFunction(this.p.onChange)?this.p.onChange.call(this,this.p):false};this.reDraw=function(){$("table.group:first",this).remove();var t=this.createTableForGroup(p.filter,null);$(this).append(t);if($.isFunction(this.p.afterRedraw)){this.p.afterRedraw.call(this,this.p)}};this.createTableForGroup=function(group,parentgroup){var that=this,i;var table=$("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"),align="left";if(this.p.direction=="rtl"){align="right";table.attr("dir","rtl")}
if(parentgroup===null){table.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='"+align+"'></th></tr>")}
var tr=$("<tr></tr>");table.append(tr);var th=$("<th colspan='5' align='"+align+"'></th>");tr.append(th);if(this.p.ruleButtons===true){var groupOpSelect=$("<select class='opsel'></select>");th.append(groupOpSelect);var str="",selected;for(i=0;i<p.groupOps.length;i++){selected=group.groupOp===that.p.groupOps[i].op?" selected='selected'":"";str+="<option value='"+that.p.groupOps[i].op+"'"+selected+">"+that.p.groupOps[i].text+"</option>"}
groupOpSelect.append(str).bind('change',function(){group.groupOp=$(groupOpSelect).val();that.onchange()})}
var inputAddSubgroup="<span></span>";if(this.p.groupButton){inputAddSubgroup=$("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>");inputAddSubgroup.bind('click',function(){if(group.groups===undefined){group.groups=[]}
group.groups.push({groupOp:p.groupOps[0].op,rules:[],groups:[]});that.reDraw();that.onchange();return false})}
th.append(inputAddSubgroup);if(this.p.ruleButtons===true){var inputAddRule=$("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>"),cm;inputAddRule.bind('click',function(){if(group.rules===undefined){group.rules=[]}
for(i=0;i<that.p.columns.length;i++){var searchable=(typeof that.p.columns[i].search==='undefined')?true:that.p.columns[i].search,hidden=(that.p.columns[i].hidden===true),ignoreHiding=(that.p.columns[i].searchoptions.searchhidden===true);if((ignoreHiding&&searchable)||(searchable&&!hidden)){cm=that.p.columns[i];break}}
var opr;if(cm.searchoptions.sopt){opr=cm.searchoptions.sopt}
else if(that.p.sopt){opr=that.p.sopt}
else if(cm.searchtype==='string'){opr=that.p.stropts}
else{opr=that.p.numopts}
group.rules.push({field:cm.name,op:opr[0],data:""});that.reDraw();return false});th.append(inputAddRule)}
if(parentgroup!==null){var inputDeleteGroup=$("<input type='button' value='-' title='Delete group' class='delete-group'/>");th.append(inputDeleteGroup);inputDeleteGroup.bind('click',function(){for(i=0;i<parentgroup.groups.length;i++){if(parentgroup.groups[i]===group){parentgroup.groups.splice(i,1);break}}
that.reDraw();that.onchange();return false})}
if(group.groups!==undefined){for(i=0;i<group.groups.length;i++){var trHolderForSubgroup=$("<tr></tr>");table.append(trHolderForSubgroup);var tdFirstHolderForSubgroup=$("<td class='first'></td>");trHolderForSubgroup.append(tdFirstHolderForSubgroup);var tdMainHolderForSubgroup=$("<td colspan='4'></td>");tdMainHolderForSubgroup.append(this.createTableForGroup(group.groups[i],group));trHolderForSubgroup.append(tdMainHolderForSubgroup)}}
if(group.groupOp===undefined){group.groupOp=that.p.groupOps[0].op}
if(group.rules!==undefined){for(i=0;i<group.rules.length;i++){table.append(this.createTableRowForRule(group.rules[i],group))}}
return table};this.createTableRowForRule=function(rule,group){var that=this,tr=$("<tr></tr>"),i,op,trpar,cm,str="",selected;tr.append("<td class='first'></td>");var ruleFieldTd=$("<td class='columns'></td>");tr.append(ruleFieldTd);var ruleFieldSelect=$("<select></select>"),ina,aoprs=[];ruleFieldTd.append(ruleFieldSelect);ruleFieldSelect.bind('change',function(){rule.field=$(ruleFieldSelect).val();trpar=$(this).parents("tr:first");for(i=0;i<that.p.columns.length;i++){if(that.p.columns[i].name===rule.field){cm=that.p.columns[i];break}}
if(!cm){return}
cm.searchoptions.id=$.jgrid.randId();if(isIE&&cm.inputtype==="text"){if(!cm.searchoptions.size){cm.searchoptions.size=10}}
var elm=$.jgrid.createEl(cm.inputtype,cm.searchoptions,"",true,that.p.ajaxSelectOptions,true);$(elm).addClass("input-elm");if(cm.searchoptions.sopt){op=cm.searchoptions.sopt}
else if(that.p.sopt){op=that.p.sopt}
else if(cm.searchtype==='string'){op=that.p.stropts}
else{op=that.p.numopts}
var s="",so=0;aoprs=[];$.each(that.p.ops, function(){aoprs.push(this.name)});for(i=0 ;i<op.length;i++){ina=$.inArray(op[i],aoprs);if(ina!==-1){if(so===0){rule.op=that.p.ops[ina].name}
s+="<option value='"+that.p.ops[ina].name+"'>"+that.p.ops[ina].description+"</option>";so++}}
$(".selectopts",trpar).empty().append(s);$(".selectopts",trpar)[0].selectedIndex=0;if($.browser.msie&&$.browser.version<9){var sw=parseInt($("select.selectopts",trpar)[0].offsetWidth)+1;$(".selectopts",trpar).width(sw);$(".selectopts",trpar).css("width","auto")}
$(".data",trpar).empty().append(elm);$(".input-elm",trpar).bind('change',function(){rule.data=$(this).val();that.onchange()});setTimeout(function(){rule.data=$(elm).val();that.onchange()},0)});var j=0;for(i=0;i<that.p.columns.length;i++){var searchable=(typeof that.p.columns[i].search==='undefined')?true:that.p.columns[i].search,hidden=(that.p.columns[i].hidden===true),ignoreHiding=(that.p.columns[i].searchoptions.searchhidden===true);if((ignoreHiding&&searchable)||(searchable&&!hidden)){selected="";if(rule.field===that.p.columns[i].name){selected=" selected='selected'";j=i}
str+="<option value='"+that.p.columns[i].name+"'"+selected+">"+that.p.columns[i].label+"</option>"}}
ruleFieldSelect.append(str);var ruleOperatorTd=$("<td class='operators'></td>");tr.append(ruleOperatorTd);cm=p.columns[j];cm.searchoptions.id=$.jgrid.randId();if(isIE&&cm.inputtype==="text"){if(!cm.searchoptions.size){cm.searchoptions.size=10}}
var ruleDataInput=$.jgrid.createEl(cm.inputtype,cm.searchoptions,rule.data,true,that.p.ajaxSelectOptions,true);var ruleOperatorSelect=$("<select class='selectopts'></select>");ruleOperatorTd.append(ruleOperatorSelect);ruleOperatorSelect.bind('change',function(){rule.op=$(ruleOperatorSelect).val();trpar=$(this).parents("tr:first");var rd=$(".input-elm",trpar)[0];if(rule.op==="nu"||rule.op==="nn"){rule.data="";rd.value="";rd.setAttribute("readonly","true");rd.setAttribute("disabled","true")} else{rd.removeAttribute("readonly");rd.removeAttribute("disabled")}
that.onchange()});if(cm.searchoptions.sopt){op=cm.searchoptions.sopt}
else if(that.p.sopt){op=that.p.sopt}
else if(cm.searchtype==='string'){op=p.stropts}
else{op=that.p.numopts}
str="";$.each(that.p.ops, function(){aoprs.push(this.name)});for(i=0;i<op.length;i++){ina=$.inArray(op[i],aoprs);if(ina!==-1){selected=rule.op===that.p.ops[ina].name?" selected='selected'":"";str+="<option value='"+that.p.ops[ina].name+"'"+selected+">"+that.p.ops[ina].description+"</option>"}}
ruleOperatorSelect.append(str);var ruleDataTd=$("<td class='data'></td>");tr.append(ruleDataTd);ruleDataTd.append(ruleDataInput);$(ruleDataInput).addClass("input-elm").bind('change', function(){rule.data=$(this).val();that.onchange()});var ruleDeleteTd=$("<td></td>");tr.append(ruleDeleteTd);if(this.p.ruleButtons===true){var ruleDeleteInput=$("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>");ruleDeleteTd.append(ruleDeleteInput);ruleDeleteInput.bind('click',function(){for(i=0;i<group.rules.length;i++){if(group.rules[i]===rule){group.rules.splice(i,1);break}}
that.reDraw();that.onchange();return false})}
return tr};this.getStringForGroup=function(group){var s="(",index;if(group.groups!==undefined){for(index=0;index<group.groups.length;index++){if(s.length>1){s+=" "+group.groupOp+" "}
try{s+=this.getStringForGroup(group.groups[index])} catch(eg){alert(eg)}}}
if(group.rules!==undefined){try{for(index=0;index<group.rules.length;index++){if(s.length>1){s+=" "+group.groupOp+" "}
s+=this.getStringForRule(group.rules[index])}} catch(e){alert(e)}}
s+=")";if(s==="()"){return ""} else{return s}};this.getStringForRule=function(rule){var opUF="",opC="",i,cm,ret,val,numtypes=['int','integer','float','number','currency'];for(i=0;i<this.p.ops.length;i++){if(this.p.ops[i].name===rule.op){opUF=this.p.ops[i].operator;opC=this.p.ops[i].name;break}}
for(i=0;i<this.p.columns.length;i++){if(this.p.columns[i].name===rule.field){cm=this.p.columns[i];break}}
val=rule.data;if(opC==='bw'||opC==='bn'){val=val+"%"}
if(opC==='ew'||opC==='en'){val="%"+val}
if(opC==='cn'||opC==='nc'){val="%"+val+"%"}
if(opC==='in'||opC==='ni'){val=" ("+val+")"}
if(p.errorcheck){checkData(rule.data,cm)}
if($.inArray(cm.searchtype,numtypes)!==-1||opC==='nn'||opC==='nu'){ret=rule.field+" "+opUF+" "+val}
else{ret=rule.field+" "+opUF+" \""+val+"\""}
return ret};this.resetFilter=function(){this.p.filter=$.extend(true,{},this.p.initFilter);this.reDraw();this.onchange()};this.hideError=function(){$("th.ui-state-error",this).html("");$("tr.error",this).hide()};this.showError=function(){$("th.ui-state-error",this).html(this.p.errmsg);$("tr.error",this).show()};this.toUserFriendlyString=function(){return this.getStringForGroup(p.filter)};this.toString=function(){var that=this;
function getStringRule(rule){if(that.p.errorcheck){var i,cm;for(i=0;i<that.p.columns.length;i++){if(that.p.columns[i].name===rule.field){cm=that.p.columns[i];break}}
if(cm){checkData(rule.data,cm)}}
return rule.op+"(item."+rule.field+",'"+rule.data+"')"}
function getStringForGroup(group){var s="(",index;if(group.groups!==undefined){for(index=0;index<group.groups.length;index++){if(s.length>1){if(group.groupOp==="OR"){s+=" || "}
else{s+=" && "}}
s+=getStringForGroup(group.groups[index])}}
if(group.rules!==undefined){for(index=0;index<group.rules.length;index++){if(s.length>1){if(group.groupOp==="OR"){s+=" || "}
else{s+=" && "}}
s+=getStringRule(group.rules[index])}}
s+=")";if(s==="()"){return ""} else{return s}}
return getStringForGroup(this.p.filter)};this.reDraw();if(this.p.showQuery){this.onchange()}
this.filter=true})};$.extend($.fn.jqFilter,{toSQLString: function(){var s="";this.each(function(){s=this.toUserFriendlyString()});return s},filterData: function(){var s;this.each(function(){s=this.p.filter});return s},getParameter: function(param){if(param!==undefined){if(this.p.hasOwnProperty(param)){return this.p[param]}}
return this.p},resetFilter: function(){return this.each(function(){this.resetFilter()})},addFilter: function(pfilter){if(typeof pfilter==="string"){pfilter=jQuery.jgrid.parse(pfilter)}
this.each(function(){this.p.filter=pfilter;this.reDraw();this.onchange()})}})})(jQuery);(function($){"use strict";var rp_ge={};$.jgrid.extend({searchGrid: function(p){p=$.extend({recreateFilter:false,drag:true,sField:'searchField',sValue:'searchString',sOper:'searchOper',sFilter:'filters',loadDefaults:true,beforeShowSearch:null,afterShowSearch:null,onInitializeSearch:null,afterRedraw:null,closeAfterSearch:false,closeAfterReset:false,closeOnEscape:false,multipleSearch:false,multipleGroup:false,top:0,left:0,jqModal:true,modal:false,resize:true,width:450,height:'auto',dataheight:'auto',showQuery:false,errorcheck:true,sopt:null,stringResult:undefined,onClose:null,onSearch:null,onReset:null,toTop:true,overlay:30,columns:[],tmplNames:null,tmplFilters:null,tmplLabel:' Template: ',showOnLoad:false,layer:null},$.jgrid.search,p||{});return this.each(function(){var $t=this;if(!$t.grid){return}
var fid="fbox_"+$t.p.id,showFrm=true,IDs={themodal:'searchmod'+fid,modalhead:'searchhd'+fid,modalcontent:'searchcnt'+fid,scrollelm:fid},defaultFilters=$t.p.postData[p.sFilter];if(typeof(defaultFilters)==="string"){defaultFilters=$.jgrid.parse(defaultFilters)}
if(p.recreateFilter===true){$("#"+IDs.themodal).remove()}
function showFilter(){if($.isFunction(p.beforeShowSearch)){showFrm=p.beforeShowSearch($("#"+fid));if(typeof(showFrm)==="undefined"){showFrm=true}}
if(showFrm){$.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+fid,jqm:p.jqModal,modal:p.modal,overlay:p.overlay,toTop:p.toTop});if($.isFunction(p.afterShowSearch)){p.afterShowSearch($("#"+fid))}}}
if($("#"+IDs.themodal).html()!==null){showFilter()} else{var fil=$("<div><div id='"+fid+"' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_"+$t.p.id),align="left",butleft="";if($t.p.direction=="rtl"){align="right";butleft=" style='text-align:left'";fil.attr("dir","rtl")}
var columns=$.extend([],$t.p.colModel),bS="<a href='javascript:void(0)' id='"+fid+"_search' class='fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset'><span class='ui-icon ui-icon-search'></span>"+p.Find+"</a>",bC="<a href='javascript:void(0)' id='"+fid+"_reset' class='fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search'><span class='ui-icon ui-icon-arrowreturnthick-1-w'></span>"+p.Reset+"</a>",bQ="",tmpl="",colnm,found=false,bt,cmi=-1;if(p.showQuery){bQ="<a href='javascript:void(0)' id='"+fid+"_query' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-comment'></span>Query</a>"}
if(!p.columns.length){$.each(columns, function(i,n){if(!n.label){n.label=$t.p.colNames[i]}
if(!found){var searchable=(typeof n.search==='undefined')?true:n.search,hidden=(n.hidden===true),ignoreHiding=(n.searchoptions&&n.searchoptions.searchhidden===true);if((ignoreHiding&&searchable)||(searchable&&!hidden)){found=true;colnm=n.index||n.name;cmi=i}}})} else{columns=p.columns}
if((!defaultFilters&&colnm)||p.multipleSearch===false){var cmop="eq";if(cmi>=0&&columns[cmi].searchoptions&&columns[cmi].searchoptions.sopt){cmop=columns[cmi].searchoptions.sopt[0]} else if(p.sopt&&p.sopt.length){cmop=p.sopt[0]}
defaultFilters={"groupOp":"AND",rules:[{"field":colnm,"op":cmop,"data":""}]}}
found=false;if(p.tmplNames&&p.tmplNames.length){found=true;tmpl=p.tmplLabel;tmpl+="<select class='ui-template'>";tmpl+="<option value='default'>Default</option>";$.each(p.tmplNames, function(i,n){tmpl+="<option value='"+i+"'>"+n+"</option>"});tmpl+="</select>"}
bt="<table class='EditTable' style='border:0px none;margin-top:5px' id='"+fid+"_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='EditButton' style='text-align:"+align+"'>"+bC+tmpl+"</td><td class='EditButton' "+butleft+">"+bQ+bS+"</td></tr></tbody></table>";$("#"+fid).jqFilter({columns:columns,filter:p.loadDefaults?defaultFilters:null,showQuery:p.showQuery,errorcheck:p.errorcheck,sopt:p.sopt,groupButton:p.multipleGroup,ruleButtons:p.multipleSearch,afterRedraw:p.afterRedraw,_gridsopt:$.jgrid.search.odata,ajaxSelectOptions:$t.p.ajaxSelectOptions,onChange: function(sp){if(this.p.showQuery){$('.query',this).html(this.toUserFriendlyString())}},direction:$t.p.direction});fil.append(bt);if(found&&p.tmplFilters&&p.tmplFilters.length){$(".ui-template",fil).bind('change', function(e){var curtempl=$(this).val();if(curtempl=="default"){$("#"+fid).jqFilter('addFilter',defaultFilters)} else{$("#"+fid).jqFilter('addFilter',p.tmplFilters[parseInt(curtempl,10)])}
return false})}
if(p.multipleGroup===true){p.multipleSearch=true}
if($.isFunction(p.onInitializeSearch)){p.onInitializeSearch($("#"+fid))}
p.gbox="#gbox_"+fid;if(p.layer){$.jgrid.createModal(IDs,fil,p,"#gview_"+$t.p.id,$("#gbox_"+$t.p.id)[0],"#"+p.layer,{position:"relative"})} else{$.jgrid.createModal(IDs,fil,p,"#gview_"+$t.p.id,$("#gbox_"+$t.p.id)[0])}
if(bQ){$("#"+fid+"_query").bind('click', function(e){$(".queryresult",fil).toggle();return false})}
if(p.stringResult===undefined){p.stringResult=p.multipleSearch}
$("#"+fid+"_search").bind('click', function(){var fl=$("#"+fid),sdata={},res,filters=fl.jqFilter('filterData');if(p.errorcheck){fl[0].hideError();if(!p.showQuery){fl.jqFilter('toSQLString')}
if(fl[0].p.error){fl[0].showError();return false}}
if(p.stringResult){try{res=xmlJsonClass.toJson(filters,'','',false)} catch(e){try{res=JSON.stringify(filters)} catch(e2){}}
if(typeof(res)==="string"){sdata[p.sFilter]=res;$.each([p.sField,p.sValue,p.sOper], function(){sdata[this]=""})}} else{if(p.multipleSearch){sdata[p.sFilter]=filters;$.each([p.sField,p.sValue,p.sOper], function(){sdata[this]=""})} else{sdata[p.sField]=filters.rules[0].field;sdata[p.sValue]=filters.rules[0].data;sdata[p.sOper]=filters.rules[0].op;sdata[p.sFilter]=""}}
$t.p.search=true;$.extend($t.p.postData,sdata);if($.isFunction(p.onSearch)){p.onSearch()}
$($t).trigger("reloadGrid",[{page:1}]);if(p.closeAfterSearch){$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+$t.p.id,jqm:p.jqModal,onClose:p.onClose})}
return false});$("#"+fid+"_reset").bind('click', function(){var sdata={},fl=$("#"+fid);$t.p.search=false;if(p.multipleSearch===false){sdata[p.sField]=sdata[p.sValue]=sdata[p.sOper]=""} else{sdata[p.sFilter]=""}
fl[0].resetFilter();if(found){$(".ui-template",fil).val("default")}
$.extend($t.p.postData,sdata);if($.isFunction(p.onReset)){p.onReset()}
$($t).trigger("reloadGrid",[{page:1}]);return false});showFilter();$(".fm-button:not(.ui-state-disabled)",fil).hover(
function(){$(this).addClass('ui-state-hover')},
function(){$(this).removeClass('ui-state-hover')})}})},editGridRow: function(rowid,p){p=$.extend({top:0,left:0,width:300,height:'auto',dataheight:'auto',modal:false,overlay:30,drag:true,resize:true,url:null,mtype:"POST",clearAfterAdd:true,closeAfterEdit:false,reloadAfterSubmit:true,onInitializeForm:null,beforeInitData:null,beforeShowForm:null,afterShowForm:null,beforeSubmit:null,afterSubmit:null,onclickSubmit:null,afterComplete:null,onclickPgButtons:null,afterclickPgButtons:null,editData:{},recreateForm:false,jqModal:true,closeOnEscape:false,addedrow:"first",topinfo:'',bottominfo:'',saveicon:[],closeicon:[],savekey:[false,13],navkeys:[false,38,40],checkOnSubmit:false,checkOnUpdate:false,_savedData:{},processing:false,onClose:null,ajaxEditOptions:{},serializeEditData:null,viewPagerButtons:true},$.jgrid.edit,p||{});rp_ge[$(this)[0].p.id]=p;return this.each(function(){var $t=this;if(!$t.grid||!rowid){return}
var gID=$t.p.id,frmgr="FrmGrid_"+gID,frmtb="TblGrid_"+gID,IDs={themodal:'editmod'+gID,modalhead:'edithd'+gID,modalcontent:'editcnt'+gID,scrollelm:frmgr},onBeforeShow=$.isFunction(rp_ge[$t.p.id].beforeShowForm)?rp_ge[$t.p.id].beforeShowForm:false,onAfterShow=$.isFunction(rp_ge[$t.p.id].afterShowForm)?rp_ge[$t.p.id].afterShowForm:false,onBeforeInit=$.isFunction(rp_ge[$t.p.id].beforeInitData)?rp_ge[$t.p.id].beforeInitData:false,onInitializeForm=$.isFunction(rp_ge[$t.p.id].onInitializeForm)?rp_ge[$t.p.id].onInitializeForm:false,copydata=null,showFrm=true,maxCols=1,maxRows=0,postdata,extpost,newData,diff;if(rowid==="new"){rowid="_empty";p.caption=rp_ge[$t.p.id].addCaption} else{p.caption=rp_ge[$t.p.id].editCaption}
if(p.recreateForm===true&&$("#"+IDs.themodal).html()!==null){$("#"+IDs.themodal).remove()}
var closeovrl=true;if(p.checkOnUpdate&&p.jqModal&&!p.modal){closeovrl=false}
function getFormData(){$("#"+frmtb+" > tbody > tr > td > .FormElement").each(function(i){var celm=$(".customelement",this);if(celm.length){var elem=celm[0],nm=$(elem).attr('name');$.each($t.p.colModel, function(i,n){if(this.name===nm&&this.editoptions&&$.isFunction(this.editoptions.custom_value)){try{postdata[nm]=this.editoptions.custom_value($("#"+$.jgrid.jqID(nm),"#"+frmtb),'get');if(postdata[nm]===undefined){throw "e1"}} catch(e){if(e==="e1"){$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,jQuery.jgrid.edit.bClose)}
else{$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,e.message,jQuery.jgrid.edit.bClose)}}
return true}})} else{switch($(this).get(0).type){case "checkbox":if($(this).is(":checked")){postdata[this.name]=$(this).val()}else{var ofv=$(this).attr("offval");postdata[this.name]=ofv}
break;case "select-one":postdata[this.name]=$("option:selected",this).val();extpost[this.name]=$("option:selected",this).text();break;case "select-multiple":postdata[this.name]=$(this).val();if(postdata[this.name]){postdata[this.name]=postdata[this.name].join(",")}
else{postdata[this.name]=""}
var selectedText=[];$("option:selected",this).each(
function(i,selected){selectedText[i]=$(selected).text()});extpost[this.name]=selectedText.join(",");break;case "password":case "text":case "textarea":case "button":postdata[this.name]=$(this).val();break}
if($t.p.autoencode){postdata[this.name]=$.jgrid.htmlEncode(postdata[this.name])}}});return true}
function createData(rowid,obj,tb,maxcols){var nm,hc,trdata,cnt=0,tmp,dc,elc,retpos=[],ind=false,tdtmpl="<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>",tmpl="",i;for(i=1;i<=maxcols;i++){tmpl+=tdtmpl}
if(rowid!='_empty'){ind=$(obj).jqGrid("getInd",rowid)}
$(obj.p.colModel).each( function(i){nm=this.name;if(this.editrules&&this.editrules.edithidden===true){hc=false} else{hc=this.hidden===true?true:false}
dc=hc?"style='display:none'":"";if(nm!=='cb'&&nm!=='subgrid'&&this.editable===true&&nm!=='rn'){if(ind===false){tmp=""} else{if(nm==obj.p.ExpandColumn&&obj.p.treeGrid===true){tmp=$("td:eq("+i+")",obj.rows[ind]).text()} else{try{tmp=$.unformat($("td:eq("+i+")",obj.rows[ind]),{rowId:rowid,colModel:this},i)} catch(_){tmp=(this.edittype&&this.edittype=="textarea")?$("td:eq("+i+")",obj.rows[ind]).text():$("td:eq("+i+")",obj.rows[ind]).html()}
if(!tmp||tmp=="&nbsp;"||tmp=="&#160;"||(tmp.length==1&&tmp.charCodeAt(0)==160)){tmp=''}}}
var opt=$.extend({},this.editoptions||{},{id:nm,name:nm}),frmopt=$.extend({},{elmprefix:'',elmsuffix:'',rowabove:false,rowcontent:''},this.formoptions||{}),rp=parseInt(frmopt.rowpos,10)||cnt+1,cp=parseInt((parseInt(frmopt.colpos,10)||1)*2,10);if(rowid=="_empty"&&opt.defaultValue){tmp=$.isFunction(opt.defaultValue)?opt.defaultValue():opt.defaultValue}
if(!this.edittype){this.edittype="text"}
if($t.p.autoencode){tmp=$.jgrid.htmlDecode(tmp)}
elc=$.jgrid.createEl(this.edittype,opt,tmp,false,$.extend({},$.jgrid.ajaxOptions,obj.p.ajaxSelectOptions||{}));if(tmp===""&&this.edittype=="checkbox"){tmp=$(elc).attr("offval")}
if(tmp===""&&this.edittype=="select"){tmp=$("option:eq(0)",elc).text()}
if(rp_ge[$t.p.id].checkOnSubmit||rp_ge[$t.p.id].checkOnUpdate){rp_ge[$t.p.id]._savedData[nm]=tmp}
$(elc).addClass("FormElement");if(this.edittype=='text'||this.edittype=='textarea'){$(elc).addClass("ui-widget-content ui-corner-all")}
trdata=$(tb).find("tr[rowpos="+rp+"]");if(frmopt.rowabove){var newdata=$("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");$(tb).append(newdata);newdata[0].rp=rp}
if(trdata.length===0){trdata=$("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);$(trdata).append(tmpl);$(tb).append(trdata);trdata[0].rp=rp}
$("td:eq("+(cp-2)+")",trdata[0]).html(typeof frmopt.label==='undefined'?obj.p.colNames[i]:frmopt.label);$("td:eq("+(cp-1)+")",trdata[0]).append(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);retpos[cnt]=i;cnt++}});if(cnt>0){var idrow=$("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+(maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='"+obj.p.id+"_id' value='"+rowid+"'/></td></tr>");idrow[0].rp=cnt+999;$(tb).append(idrow);if(rp_ge[$t.p.id].checkOnSubmit||rp_ge[$t.p.id].checkOnUpdate){rp_ge[$t.p.id]._savedData[obj.p.id+"_id"]=rowid}}
return retpos}
function fillData(rowid,obj,fmid){var nm,cnt=0,tmp,fld,opt,vl,vlc;if(rp_ge[$t.p.id].checkOnSubmit||rp_ge[$t.p.id].checkOnUpdate){rp_ge[$t.p.id]._savedData={};rp_ge[$t.p.id]._savedData[obj.p.id+"_id"]=rowid}
var cm=obj.p.colModel;if(rowid=='_empty'){$(cm).each(function(i){nm=this.name;opt=$.extend({},this.editoptions||{});fld=$("#"+$.jgrid.jqID(nm),"#"+fmid);if(fld&&fld.length&&fld[0]!==null){vl="";if(opt.defaultValue){vl=$.isFunction(opt.defaultValue)?opt.defaultValue():opt.defaultValue;if(fld[0].type=='checkbox'){vlc=vl.toLowerCase();if(vlc.search(/(false|0|no|off|undefined)/i)<0&&vlc!==""){fld[0].checked=true;fld[0].defaultChecked=true;fld[0].value=vl} else{fld[0].checked=false;fld[0].defaultChecked=false}} else{fld.val(vl)}} else{if(fld[0].type=='checkbox'){fld[0].checked=false;fld[0].defaultChecked=false;vl=$(fld).attr("offval")} else if(fld[0].type&&fld[0].type.substr(0,6)=='select'){fld[0].selectedIndex=0} else{fld.val(vl)}}
if(rp_ge[$t.p.id].checkOnSubmit===true||rp_ge[$t.p.id].checkOnUpdate){rp_ge[$t.p.id]._savedData[nm]=vl}}});$("#id_g","#"+fmid).val(rowid);return}
var tre=$(obj).jqGrid("getInd",rowid,true);if(!tre){return}
$('td[role="gridcell"]',tre).each( function(i){nm=cm[i].name;if(nm!=='cb'&&nm!=='subgrid'&&nm!=='rn'&&cm[i].editable===true){if(nm==obj.p.ExpandColumn&&obj.p.treeGrid===true){tmp=$(this).text()} else{try{tmp=$.unformat($(this),{rowId:rowid,colModel:cm[i]},i)} catch(_){tmp=cm[i].edittype=="textarea"?$(this).text():$(this).html()}}
if($t.p.autoencode){tmp=$.jgrid.htmlDecode(tmp)}
if(rp_ge[$t.p.id].checkOnSubmit===true||rp_ge[$t.p.id].checkOnUpdate){rp_ge[$t.p.id]._savedData[nm]=tmp}
nm=$.jgrid.jqID(nm);switch(cm[i].edittype){case "password":case "text":case "button":case "image":case "textarea":if(tmp=="&nbsp;"||tmp=="&#160;"||(tmp.length==1&&tmp.charCodeAt(0)==160)){tmp=''}
$("#"+nm,"#"+fmid).val(tmp);break;case "select":var opv=tmp.split(",");opv=$.map(opv,function(n){return $.trim(n)});$("#"+nm+" option","#"+fmid).each(function(j){if(!cm[i].editoptions.multiple&&($.trim(tmp)==$.trim($(this).text())||opv[0]==$.trim($(this).text())||opv[0]==$.trim($(this).val()))){this.selected=true} else if(cm[i].editoptions.multiple){if($.inArray($.trim($(this).text()),opv)>-1||$.inArray($.trim($(this).val()),opv)>-1){this.selected=true}else{this.selected=false}} else{this.selected=false}});break;case "checkbox":tmp=tmp+"";if(cm[i].editoptions&&cm[i].editoptions.value){var cb=cm[i].editoptions.value.split(":");if(cb[0]==tmp){$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("checked",true);$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("defaultChecked",true)} else{$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("checked",false);$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("defaultChecked",false)}} else{tmp=tmp.toLowerCase();if(tmp.search(/(false|0|no|off|undefined)/i)<0&&tmp!==""){$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("checked",true);$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("defaultChecked",true)} else{$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("checked",false);$("#"+nm,"#"+fmid)[$t.p.useProp?'prop':'attr']("defaultChecked",false)}}
break;case 'custom':try{if(cm[i].editoptions&&$.isFunction(cm[i].editoptions.custom_value)){cm[i].editoptions.custom_value($("#"+nm,"#"+fmid),'set',tmp)} else{throw "e1"}} catch(e){if(e=="e1"){$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,jQuery.jgrid.edit.bClose)}
else{$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,e.message,jQuery.jgrid.edit.bClose)}}
break}
cnt++}});if(cnt>0){$("#id_g","#"+frmtb).val(rowid)}}
function setNulls(){$.each($t.p.colModel, function(i,n){if(n.editoptions&&n.editoptions.NullIfEmpty===true){if(postdata.hasOwnProperty(n.name)&&postdata[n.name]===""){postdata[n.name]='null'}}})}
function postIt(){var copydata,ret=[true,"",""],onCS={},opers=$t.p.prmNames,idname,oper,key,selr,i;if($.isFunction(rp_ge[$t.p.id].beforeCheckValues)){var retvals=rp_ge[$t.p.id].beforeCheckValues(postdata,$("#"+frmgr),postdata[$t.p.id+"_id"]=="_empty"?opers.addoper:opers.editoper);if(retvals&&typeof(retvals)==='object'){postdata=retvals}}
for(key in postdata){if(postdata.hasOwnProperty(key)){ret=$.jgrid.checkValues(postdata[key],key,$t);if(ret[0]===false){break}}}
setNulls();if(ret[0]){if($.isFunction(rp_ge[$t.p.id].onclickSubmit)){onCS=rp_ge[$t.p.id].onclickSubmit(rp_ge[$t.p.id],postdata)||{}}
if($.isFunction(rp_ge[$t.p.id].beforeSubmit)){ret=rp_ge[$t.p.id].beforeSubmit(postdata,$("#"+frmgr))}}
if(ret[0]&&!rp_ge[$t.p.id].processing){rp_ge[$t.p.id].processing=true;$("#sData","#"+frmtb+"_2").addClass('ui-state-active');oper=opers.oper;idname=opers.id;postdata[oper]=($.trim(postdata[$t.p.id+"_id"])=="_empty")?opers.addoper:opers.editoper;if(postdata[oper]!=opers.addoper){postdata[idname]=postdata[$t.p.id+"_id"]} else{if(postdata[idname]===undefined){postdata[idname]=postdata[$t.p.id+"_id"]}}
delete postdata[$t.p.id+"_id"];postdata=$.extend(postdata,rp_ge[$t.p.id].editData,onCS);if($t.p.treeGrid===true){if(postdata[oper]==opers.addoper){selr=$($t).jqGrid("getGridParam",'selrow');var tr_par_id=$t.p.treeGridModel=='adjacency'?$t.p.treeReader.parent_id_field:'parent_id';postdata[tr_par_id]=selr}
for(i in $t.p.treeReader){if($t.p.treeReader.hasOwnProperty(i)){var itm=$t.p.treeReader[i];if(postdata.hasOwnProperty(itm)){if(postdata[oper]==opers.addoper&&i==='parent_id_field'){continue}
delete postdata[itm]}}}}
postdata[idname]=$.jgrid.stripPref($t.p.idPrefix,postdata[idname]);var ajaxOptions=$.extend({url:rp_ge[$t.p.id].url?rp_ge[$t.p.id].url:$($t).jqGrid('getGridParam','editurl'),type:rp_ge[$t.p.id].mtype,data:$.isFunction(rp_ge[$t.p.id].serializeEditData)?rp_ge[$t.p.id].serializeEditData(postdata):postdata,complete:function(data,Status){postdata[idname]=$t.p.idPrefix+postdata[idname];if(Status!="success"){ret[0]=false;if($.isFunction(rp_ge[$t.p.id].errorTextFormat)){ret[1]=rp_ge[$t.p.id].errorTextFormat(data)} else{ret[1]=Status+" Status: '"+data.statusText+"'. Error code: "+data.status}} else{if($.isFunction(rp_ge[$t.p.id].afterSubmit)){ret=rp_ge[$t.p.id].afterSubmit(data,postdata)}}
if(ret[0]===false){$("#FormError>td","#"+frmtb).html(ret[1]);$("#FormError","#"+frmtb).show()} else{$.each($t.p.colModel, function(i,n){if(extpost[this.name]&&this.formatter&&this.formatter=='select'){try{delete extpost[this.name]} catch(e){}}});postdata=$.extend(postdata,extpost);if($t.p.autoencode){$.each(postdata,function(n,v){postdata[n]=$.jgrid.htmlDecode(v)})}
if(postdata[oper]==opers.addoper){if(!ret[2]){ret[2]=$.jgrid.randId()}
postdata[idname]=ret[2];if(rp_ge[$t.p.id].closeAfterAdd){if(rp_ge[$t.p.id].reloadAfterSubmit){$($t).trigger("reloadGrid")}
else{if($t.p.treeGrid===true){$($t).jqGrid("addChildNode",ret[2],selr,postdata)} else{$($t).jqGrid("addRowData",ret[2],postdata,p.addedrow);$($t).jqGrid("setSelection",ret[2])}}
$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose})} else if(rp_ge[$t.p.id].clearAfterAdd){if(rp_ge[$t.p.id].reloadAfterSubmit){$($t).trigger("reloadGrid")}
else{if($t.p.treeGrid===true){$($t).jqGrid("addChildNode",ret[2],selr,postdata)} else{$($t).jqGrid("addRowData",ret[2],postdata,p.addedrow)}}
fillData("_empty",$t,frmgr)} else{if(rp_ge[$t.p.id].reloadAfterSubmit){$($t).trigger("reloadGrid")}
else{if($t.p.treeGrid===true){$($t).jqGrid("addChildNode",ret[2],selr,postdata)} else{$($t).jqGrid("addRowData",ret[2],postdata,p.addedrow)}}}} else{if(rp_ge[$t.p.id].reloadAfterSubmit){$($t).trigger("reloadGrid");if(!rp_ge[$t.p.id].closeAfterEdit){setTimeout(function(){$($t).jqGrid("setSelection",postdata[idname])},1000)}} else{if($t.p.treeGrid===true){$($t).jqGrid("setTreeRow",postdata[idname],postdata)} else{$($t).jqGrid("setRowData",postdata[idname],postdata)}}
if(rp_ge[$t.p.id].closeAfterEdit){$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose})}}
if($.isFunction(rp_ge[$t.p.id].afterComplete)){copydata=data;setTimeout(function(){rp_ge[$t.p.id].afterComplete(copydata,postdata,$("#"+frmgr));copydata=null},500)}
if(rp_ge[$t.p.id].checkOnSubmit||rp_ge[$t.p.id].checkOnUpdate){$("#"+frmgr).data("disabled",false);if(rp_ge[$t.p.id]._savedData[$t.p.id+"_id"]!="_empty"){for(var key in rp_ge[$t.p.id]._savedData){if(postdata[key]){rp_ge[$t.p.id]._savedData[key]=postdata[key]}}}}}
rp_ge[$t.p.id].processing=false;$("#sData","#"+frmtb+"_2").removeClass('ui-state-active');try{$(':input:visible',"#"+frmgr)[0].focus()} catch(e){}}},$.jgrid.ajaxOptions,rp_ge[$t.p.id].ajaxEditOptions);if(!ajaxOptions.url&&!rp_ge[$t.p.id].useDataProxy){if($.isFunction($t.p.dataProxy)){rp_ge[$t.p.id].useDataProxy=true} else{ret[0]=false;ret[1]+=" "+$.jgrid.errors.nourl}}
if(ret[0]){if(rp_ge[$t.p.id].useDataProxy){var dpret=$t.p.dataProxy.call($t,ajaxOptions,"set_"+$t.p.id);if(typeof(dpret)=="undefined"){dpret=[true,""]}
if(dpret[0]===false){ret[0]=false;ret[1]=dpret[1]||"Error deleting the selected row!" } else{if(ajaxOptions.data.oper==opers.addoper&&rp_ge[$t.p.id].closeAfterAdd){$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose})}
if(ajaxOptions.data.oper==opers.editoper&&rp_ge[$t.p.id].closeAfterEdit){$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose})}}} else{$.ajax(ajaxOptions)}}}
if(ret[0]===false){$("#FormError>td","#"+frmtb).html(ret[1]);$("#FormError","#"+frmtb).show()}}
function compareData(nObj,oObj){var ret=false,key;for(key in nObj){if(nObj[key]!=oObj[key]){ret=true;break}}
return ret}
function checkUpdates(){var stat=true;$("#FormError","#"+frmtb).hide();if(rp_ge[$t.p.id].checkOnUpdate){postdata={};extpost={};getFormData();newData=$.extend({},postdata,extpost);diff=compareData(newData,rp_ge[$t.p.id]._savedData);if(diff){$("#"+frmgr).data("disabled",true);$(".confirm","#"+IDs.themodal).show();stat=false}}
return stat}
function restoreInline(){if(rowid!=="_empty"&&typeof($t.p.savedRow)!=="undefined"&&$t.p.savedRow.length>0&&$.isFunction($.fn.jqGrid.restoreRow)){for(var i=0;i<$t.p.savedRow.length;i++){if($t.p.savedRow[i].id==rowid){$($t).jqGrid('restoreRow',rowid);break}}}}
function updateNav(cr,totr){if(cr===0){$("#pData","#"+frmtb+"_2").addClass('ui-state-disabled')} else{$("#pData","#"+frmtb+"_2").removeClass('ui-state-disabled')}
if(cr==totr){$("#nData","#"+frmtb+"_2").addClass('ui-state-disabled')} else{$("#nData","#"+frmtb+"_2").removeClass('ui-state-disabled')}}
function getCurrPos(){var rowsInGrid=$($t).jqGrid("getDataIDs"),selrow=$("#id_g","#"+frmtb).val(),pos=$.inArray(selrow,rowsInGrid);return [pos,rowsInGrid]}
if($("#"+IDs.themodal).html()!==null){if(onBeforeInit){showFrm=onBeforeInit($("#"+frmgr));if(typeof(showFrm)=="undefined"){showFrm=true}}
if(showFrm===false){return}
restoreInline();$(".ui-jqdialog-title","#"+IDs.modalhead).html(p.caption);$("#FormError","#"+frmtb).hide();if(rp_ge[$t.p.id].topinfo){$(".topinfo","#"+frmtb).html(rp_ge[$t.p.id].topinfo);$(".tinfo","#"+frmtb).show()} else{$(".tinfo","#"+frmtb).hide()}
if(rp_ge[$t.p.id].bottominfo){$(".bottominfo","#"+frmtb+"_2").html(rp_ge[$t.p.id].bottominfo);$(".binfo","#"+frmtb+"_2").show()} else{$(".binfo","#"+frmtb+"_2").hide()}
fillData(rowid,$t,frmgr);if(rowid=="_empty"||!rp_ge[$t.p.id].viewPagerButtons){$("#pData, #nData","#"+frmtb+"_2").hide()} else{$("#pData, #nData","#"+frmtb+"_2").show()}
if(rp_ge[$t.p.id].processing===true){rp_ge[$t.p.id].processing=false;$("#sData","#"+frmtb+"_2").removeClass('ui-state-active')}
if($("#"+frmgr).data("disabled")===true){$(".confirm","#"+IDs.themodal).hide();$("#"+frmgr).data("disabled",false)}
if(onBeforeShow){onBeforeShow($("#"+frmgr))}
$("#"+IDs.themodal).data("onClose",rp_ge[$t.p.id].onClose);$.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:p.jqModal,jqM:false,overlay:p.overlay,modal:p.modal});if(!closeovrl){$(".jqmOverlay").click(function(){if(!checkUpdates()){return false}
$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose});return false})}
if(onAfterShow){onAfterShow($("#"+frmgr))}} else{var dh=isNaN(p.dataheight)?p.dataheight:p.dataheight+"px",frm=$("<form name='FormPost' id='"+frmgr+"' class='FormGrid' onSubmit='return false;' style='width:100%;overflow:auto;position:relative;height:"+dh+";'></form>").data("disabled",false),tbl=$("<table id='"+frmtb+"' class='EditTable' cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>");if(onBeforeInit){showFrm=onBeforeInit($("#"+frmgr));if(typeof(showFrm)=="undefined"){showFrm=true}}
if(showFrm===false){return}
restoreInline();$($t.p.colModel).each( function(i){var fmto=this.formoptions;maxCols=Math.max(maxCols,fmto?fmto.colpos||0:0);maxRows=Math.max(maxRows,fmto?fmto.rowpos||0:0)});$(frm).append(tbl);var flr=$("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='"+(maxCols*2)+"'></td></tr>");flr[0].rp=0;$(tbl).append(flr);flr=$("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='"+(maxCols*2)+"'>"+rp_ge[$t.p.id].topinfo+"</td></tr>");flr[0].rp=0;$(tbl).append(flr);var rtlb=$t.p.direction=="rtl"?true:false,bp=rtlb?"nData":"pData",bn=rtlb?"pData":"nData";createData(rowid,$t,tbl,maxCols);var bP="<a href='javascript:void(0)' id='"+bp+"' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>",bN="<a href='javascript:void(0)' id='"+bn+"' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>",bS="<a href='javascript:void(0)' id='sData' class='fm-button ui-state-default ui-corner-all'>"+p.bSubmit+"</a>",bC="<a href='javascript:void(0)' id='cData' class='fm-button ui-state-default ui-corner-all'>"+p.bCancel+"</a>";var bt="<table border='0' cellspacing='0' cellpadding='0' class='EditTable' id='"+frmtb+"_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>"+(rtlb?bN+bP:bP+bN)+"</td><td class='EditButton'>"+bS+bC+"</td></tr>";bt+="<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>"+rp_ge[$t.p.id].bottominfo+"</td></tr>";bt+="</tbody></table>";if(maxRows>0){var sd=[];$.each($(tbl)[0].rows,function(i,r){sd[i]=r});sd.sort(function(a,b){if(a.rp>b.rp){return 1}
if(a.rp<b.rp){return-1}
return 0});$.each(sd, function(index,row){$('tbody',tbl).append(row)})}
p.gbox="#gbox_"+gID;var cle=false;if(p.closeOnEscape===true){p.closeOnEscape=false;cle=true}
var tms=$("<span></span>").append(frm).append(bt);$.jgrid.createModal(IDs,tms,p,"#gview_"+$t.p.id,$("#gbox_"+$t.p.id)[0]);if(rtlb){$("#pData, #nData","#"+frmtb+"_2").css("float","right");$(".EditButton","#"+frmtb+"_2").css("text-align","left")}
if(rp_ge[$t.p.id].topinfo){$(".tinfo","#"+frmtb).show()}
if(rp_ge[$t.p.id].bottominfo){$(".binfo","#"+frmtb+"_2").show()}
tms=null;bt=null;$("#"+IDs.themodal).keydown( function(e){var wkey=e.target;if($("#"+frmgr).data("disabled")===true){return false}
if(rp_ge[$t.p.id].savekey[0]===true&&e.which==rp_ge[$t.p.id].savekey[1]){if(wkey.tagName!="TEXTAREA"){$("#sData","#"+frmtb+"_2").trigger("click");return false}}
if(e.which===27){if(!checkUpdates()){return false}
if(cle){$.jgrid.hideModal(this,{gb:p.gbox,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose})}
return false}
if(rp_ge[$t.p.id].navkeys[0]===true){if($("#id_g","#"+frmtb).val()=="_empty"){return true}
if(e.which==rp_ge[$t.p.id].navkeys[1]){$("#pData","#"+frmtb+"_2").trigger("click");return false}
if(e.which==rp_ge[$t.p.id].navkeys[2]){$("#nData","#"+frmtb+"_2").trigger("click");return false}}});if(p.checkOnUpdate){$("a.ui-jqdialog-titlebar-close span","#"+IDs.themodal).removeClass("jqmClose");$("a.ui-jqdialog-titlebar-close","#"+IDs.themodal).unbind("click").click(function(){if(!checkUpdates()){return false}
$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose});return false})}
p.saveicon=$.extend([true,"left","ui-icon-disk"],p.saveicon);p.closeicon=$.extend([true,"left","ui-icon-close"],p.closeicon);if(p.saveicon[0]===true){$("#sData","#"+frmtb+"_2").addClass(p.saveicon[1]=="right"?'fm-button-icon-right':'fm-button-icon-left').append("<span class='ui-icon "+p.saveicon[2]+"'></span>")}
if(p.closeicon[0]===true){$("#cData","#"+frmtb+"_2").addClass(p.closeicon[1]=="right"?'fm-button-icon-right':'fm-button-icon-left').append("<span class='ui-icon "+p.closeicon[2]+"'></span>")}
if(rp_ge[$t.p.id].checkOnSubmit||rp_ge[$t.p.id].checkOnUpdate){bS="<a href='javascript:void(0)' id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+p.bYes+"</a>";bN="<a href='javascript:void(0)' id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+p.bNo+"</a>";bC="<a href='javascript:void(0)' id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+p.bExit+"</a>";var ii,zI=p.zIndex||999;zI++;if($.browser.msie&&$.browser.version==6){ii='<iframe style="display:block;position:absolute;z-index:-1;filter:Alpha(Opacity=\'0\');" src="javascript:false;"></iframe>'} else{ii=""}
$("<div class='ui-widget-overlay jqgrid-overlay confirm' style='z-index:"+zI+";display:none;'>&#160;"+ii+"</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:"+(zI+1)+"'>"+p.saveData+"<br/><br/>"+bS+bN+bC+"</div>").insertAfter("#"+frmgr);$("#sNew","#"+IDs.themodal).click(function(){postIt();$("#"+frmgr).data("disabled",false);$(".confirm","#"+IDs.themodal).hide();return false});$("#nNew","#"+IDs.themodal).click(function(){$(".confirm","#"+IDs.themodal).hide();$("#"+frmgr).data("disabled",false);setTimeout(function(){$(":input","#"+frmgr)[0].focus()},0);return false});$("#cNew","#"+IDs.themodal).click(function(){$(".confirm","#"+IDs.themodal).hide();$("#"+frmgr).data("disabled",false);$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose});return false})}
if(onInitializeForm){onInitializeForm($("#"+frmgr))}
if(rowid=="_empty"||!rp_ge[$t.p.id].viewPagerButtons){$("#pData,#nData","#"+frmtb+"_2").hide()} else{$("#pData,#nData","#"+frmtb+"_2").show()}
if(onBeforeShow){onBeforeShow($("#"+frmgr))}
$("#"+IDs.themodal).data("onClose",rp_ge[$t.p.id].onClose);$.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:p.jqModal,overlay:p.overlay,modal:p.modal});if(!closeovrl){$(".jqmOverlay").click(function(){if(!checkUpdates()){return false}
$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose});return false})}
if(onAfterShow){onAfterShow($("#"+frmgr))}
$(".fm-button","#"+IDs.themodal).hover(
function(){$(this).addClass('ui-state-hover')},
function(){$(this).removeClass('ui-state-hover')});$("#sData","#"+frmtb+"_2").click(function(e){postdata={};extpost={};$("#FormError","#"+frmtb).hide();getFormData();if(postdata[$t.p.id+"_id"]=="_empty"){postIt()}
else if(p.checkOnSubmit===true){newData=$.extend({},postdata,extpost);diff=compareData(newData,rp_ge[$t.p.id]._savedData);if(diff){$("#"+frmgr).data("disabled",true);$(".confirm","#"+IDs.themodal).show()} else{postIt()}} else{postIt()}
return false});$("#cData","#"+frmtb+"_2").click(function(e){if(!checkUpdates()){return false}
$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose});return false});$("#nData","#"+frmtb+"_2").click(function(e){if(!checkUpdates()){return false}
$("#FormError","#"+frmtb).hide();var npos=getCurrPos();npos[0]=parseInt(npos[0],10);if(npos[0]!=-1&&npos[1][npos[0]+1]){if($.isFunction(p.onclickPgButtons)){p.onclickPgButtons('next',$("#"+frmgr),npos[1][npos[0]])}
fillData(npos[1][npos[0]+1],$t,frmgr);$($t).jqGrid("setSelection",npos[1][npos[0]+1]);if($.isFunction(p.afterclickPgButtons)){p.afterclickPgButtons('next',$("#"+frmgr),npos[1][npos[0]+1])}
updateNav(npos[0]+1,npos[1].length-1)}
return false});$("#pData","#"+frmtb+"_2").click(function(e){if(!checkUpdates()){return false}
$("#FormError","#"+frmtb).hide();var ppos=getCurrPos();if(ppos[0]!=-1&&ppos[1][ppos[0]-1]){if($.isFunction(p.onclickPgButtons)){p.onclickPgButtons('prev',$("#"+frmgr),ppos[1][ppos[0]])}
fillData(ppos[1][ppos[0]-1],$t,frmgr);$($t).jqGrid("setSelection",ppos[1][ppos[0]-1]);if($.isFunction(p.afterclickPgButtons)){p.afterclickPgButtons('prev',$("#"+frmgr),ppos[1][ppos[0]-1])}
updateNav(ppos[0]-1,ppos[1].length-1)}
return false})}
var posInit=getCurrPos();updateNav(posInit[0],posInit[1].length-1)})},viewGridRow: function(rowid,p){p=$.extend({top:0,left:0,width:0,height:'auto',dataheight:'auto',modal:false,overlay:30,drag:true,resize:true,jqModal:true,closeOnEscape:false,labelswidth:'30%',closeicon:[],navkeys:[false,38,40],onClose:null,beforeShowForm:null,beforeInitData:null,viewPagerButtons:true},$.jgrid.view,p||{});return this.each(function(){var $t=this;if(!$t.grid||!rowid){return}
var gID=$t.p.id,frmgr="ViewGrid_"+gID,frmtb="ViewTbl_"+gID,IDs={themodal:'viewmod'+gID,modalhead:'viewhd'+gID,modalcontent:'viewcnt'+gID,scrollelm:frmgr},onBeforeInit=$.isFunction(p.beforeInitData)?p.beforeInitData:false,showFrm=true,maxCols=1,maxRows=0;
function focusaref(){if(p.closeOnEscape===true||p.navkeys[0]===true){setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+IDs.modalhead).focus()},0)}}
function createData(rowid,obj,tb,maxcols){var nm,hc,trdata,cnt=0,tmp,dc,retpos=[],ind=false,tdtmpl="<td class='CaptionTD form-view-label ui-widget-content' width='"+p.labelswidth+"'>&#160;</td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'>&#160;</td>",tmpl="",tdtmpl2="<td class='CaptionTD form-view-label ui-widget-content'>&#160;</td><td class='DataTD form-view-data ui-widget-content'>&#160;</td>",fmtnum=['integer','number','currency'],max1=0,max2=0,maxw,setme,viewfld;for(var i=1;i<=maxcols;i++){tmpl+=i==1?tdtmpl:tdtmpl2}
$(obj.p.colModel).each( function(i){if(this.editrules&&this.editrules.edithidden===true){hc=false} else{hc=this.hidden===true?true:false}
if(!hc&&this.align==='right'){if(this.formatter&&$.inArray(this.formatter,fmtnum)!==-1){max1=Math.max(max1,parseInt(this.width,10))} else{max2=Math.max(max2,parseInt(this.width,10))}}});maxw=max1!==0?max1:max2!==0?max2:0;ind=$(obj).jqGrid("getInd",rowid);$(obj.p.colModel).each( function(i){nm=this.name;setme=false;if(this.editrules&&this.editrules.edithidden===true){hc=false} else{hc=this.hidden===true?true:false}
dc=hc?"style='display:none'":"";viewfld=(typeof this.viewable!='boolean')?true:this.viewable;if(nm!=='cb'&&nm!=='subgrid'&&nm!=='rn'&&viewfld){if(ind===false){tmp=""} else{if(nm==obj.p.ExpandColumn&&obj.p.treeGrid===true){tmp=$("td:eq("+i+")",obj.rows[ind]).text()} else{tmp=$("td:eq("+i+")",obj.rows[ind]).html()}}
setme=this.align==='right'&&maxw!==0?true:false;var opt=$.extend({},this.editoptions||{},{id:nm,name:nm}),frmopt=$.extend({},{rowabove:false,rowcontent:''},this.formoptions||{}),rp=parseInt(frmopt.rowpos,10)||cnt+1,cp=parseInt((parseInt(frmopt.colpos,10)||1)*2,10);if(frmopt.rowabove){var newdata=$("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");$(tb).append(newdata);newdata[0].rp=rp}
trdata=$(tb).find("tr[rowpos="+rp+"]");if(trdata.length===0){trdata=$("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","trv_"+nm);$(trdata).append(tmpl);$(tb).append(trdata);trdata[0].rp=rp}
$("td:eq("+(cp-2)+")",trdata[0]).html('<b>'+(typeof frmopt.label==='undefined'?obj.p.colNames[i]:frmopt.label)+'</b>');$("td:eq("+(cp-1)+")",trdata[0]).append("<span>"+tmp+"</span>").attr("id","v_"+nm);if(setme){$("td:eq("+(cp-1)+") span",trdata[0]).css({'text-align':'right',width:maxw+"px"})}
retpos[cnt]=i;cnt++}});if(cnt>0){var idrow=$("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+(maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+rowid+"'/></td></tr>");idrow[0].rp=cnt+99;$(tb).append(idrow)}
return retpos}
function fillData(rowid,obj){var nm,hc,cnt=0,tmp,opt,trv;trv=$(obj).jqGrid("getInd",rowid,true);if(!trv){return}
$('td',trv).each( function(i){nm=obj.p.colModel[i].name;if(obj.p.colModel[i].editrules&&obj.p.colModel[i].editrules.edithidden===true){hc=false} else{hc=obj.p.colModel[i].hidden===true?true:false}
if(nm!=='cb'&&nm!=='subgrid'&&nm!=='rn'){if(nm==obj.p.ExpandColumn&&obj.p.treeGrid===true){tmp=$(this).text()} else{tmp=$(this).html()}
opt=$.extend({},obj.p.colModel[i].editoptions||{});nm=$.jgrid.jqID("v_"+nm);$("#"+nm+" span","#"+frmtb).html(tmp);if(hc){$("#"+nm,"#"+frmtb).parents("tr:first").hide()}
cnt++}});if(cnt>0){$("#id_g","#"+frmtb).val(rowid)}}
function updateNav(cr,totr){if(cr===0){$("#pData","#"+frmtb+"_2").addClass('ui-state-disabled')} else{$("#pData","#"+frmtb+"_2").removeClass('ui-state-disabled')}
if(cr==totr){$("#nData","#"+frmtb+"_2").addClass('ui-state-disabled')} else{$("#nData","#"+frmtb+"_2").removeClass('ui-state-disabled')}}
function getCurrPos(){var rowsInGrid=$($t).jqGrid("getDataIDs"),selrow=$("#id_g","#"+frmtb).val(),pos=$.inArray(selrow,rowsInGrid);return [pos,rowsInGrid]}
if($("#"+IDs.themodal).html()!==null){if(onBeforeInit){showFrm=onBeforeInit($("#"+frmgr));if(typeof(showFrm)=="undefined"){showFrm=true}}
if(showFrm===false){return}
$(".ui-jqdialog-title","#"+IDs.modalhead).html(p.caption);$("#FormError","#"+frmtb).hide();fillData(rowid,$t);if($.isFunction(p.beforeShowForm)){p.beforeShowForm($("#"+frmgr))}
$.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:p.jqModal,jqM:false,overlay:p.overlay,modal:p.modal});focusaref()} else{var dh=isNaN(p.dataheight)?p.dataheight:p.dataheight+"px";var frm=$("<form name='FormPost' id='"+frmgr+"' class='FormGrid' style='width:100%;overflow:auto;position:relative;height:"+dh+";'></form>"),tbl=$("<table id='"+frmtb+"' class='EditTable' cellspacing='1' cellpadding='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");if(onBeforeInit){showFrm=onBeforeInit($("#"+frmgr));if(typeof(showFrm)=="undefined"){showFrm=true}}
if(showFrm===false){return}
$($t.p.colModel).each( function(i){var fmto=this.formoptions;maxCols=Math.max(maxCols,fmto?fmto.colpos||0:0);maxRows=Math.max(maxRows,fmto?fmto.rowpos||0:0)});$(frm).append(tbl);createData(rowid,$t,tbl,maxCols);var rtlb=$t.p.direction=="rtl"?true:false,bp=rtlb?"nData":"pData",bn=rtlb?"pData":"nData",bP="<a href='javascript:void(0)' id='"+bp+"' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>",bN="<a href='javascript:void(0)' id='"+bn+"' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>",bC="<a href='javascript:void(0)' id='cData' class='fm-button ui-state-default ui-corner-all'>"+p.bClose+"</a>";if(maxRows>0){var sd=[];$.each($(tbl)[0].rows,function(i,r){sd[i]=r});sd.sort(function(a,b){if(a.rp>b.rp){return 1}
if(a.rp<b.rp){return-1}
return 0});$.each(sd, function(index,row){$('tbody',tbl).append(row)})}
p.gbox="#gbox_"+gID;var cle=false;if(p.closeOnEscape===true){p.closeOnEscape=false;cle=true}
var bt=$("<span></span>").append(frm).append("<table border='0' class='EditTable' id='"+frmtb+"_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='"+p.labelswidth+"'>"+(rtlb?bN+bP:bP+bN)+"</td><td class='EditButton'>"+bC+"</td></tr></tbody></table>");$.jgrid.createModal(IDs,bt,p,"#gview_"+$t.p.id,$("#gview_"+$t.p.id)[0]);if(rtlb){$("#pData, #nData","#"+frmtb+"_2").css("float","right");$(".EditButton","#"+frmtb+"_2").css("text-align","left")}
if(!p.viewPagerButtons){$("#pData, #nData","#"+frmtb+"_2").hide()}
bt=null;$("#"+IDs.themodal).keydown( function(e){if(e.which===27){if(cle){$.jgrid.hideModal(this,{gb:p.gbox,jqm:p.jqModal,onClose:p.onClose})}
return false}
if(p.navkeys[0]===true){if(e.which===p.navkeys[1]){$("#pData","#"+frmtb+"_2").trigger("click");return false}
if(e.which===p.navkeys[2]){$("#nData","#"+frmtb+"_2").trigger("click");return false}}});p.closeicon=$.extend([true,"left","ui-icon-close"],p.closeicon);if(p.closeicon[0]===true){$("#cData","#"+frmtb+"_2").addClass(p.closeicon[1]=="right"?'fm-button-icon-right':'fm-button-icon-left').append("<span class='ui-icon "+p.closeicon[2]+"'></span>")}
if($.isFunction(p.beforeShowForm)){p.beforeShowForm($("#"+frmgr))}
$.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:p.jqModal,modal:p.modal});$(".fm-button:not(.ui-state-disabled)","#"+frmtb+"_2").hover(
function(){$(this).addClass('ui-state-hover')},
function(){$(this).removeClass('ui-state-hover')});focusaref();$("#cData","#"+frmtb+"_2").click(function(e){$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:p.onClose});return false});$("#nData","#"+frmtb+"_2").click(function(e){$("#FormError","#"+frmtb).hide();var npos=getCurrPos();npos[0]=parseInt(npos[0],10);if(npos[0]!=-1&&npos[1][npos[0]+1]){if($.isFunction(p.onclickPgButtons)){p.onclickPgButtons('next',$("#"+frmgr),npos[1][npos[0]])}
fillData(npos[1][npos[0]+1],$t);$($t).jqGrid("setSelection",npos[1][npos[0]+1]);if($.isFunction(p.afterclickPgButtons)){p.afterclickPgButtons('next',$("#"+frmgr),npos[1][npos[0]+1])}
updateNav(npos[0]+1,npos[1].length-1)}
focusaref();return false});$("#pData","#"+frmtb+"_2").click(function(e){$("#FormError","#"+frmtb).hide();var ppos=getCurrPos();if(ppos[0]!=-1&&ppos[1][ppos[0]-1]){if($.isFunction(p.onclickPgButtons)){p.onclickPgButtons('prev',$("#"+frmgr),ppos[1][ppos[0]])}
fillData(ppos[1][ppos[0]-1],$t);$($t).jqGrid("setSelection",ppos[1][ppos[0]-1]);if($.isFunction(p.afterclickPgButtons)){p.afterclickPgButtons('prev',$("#"+frmgr),ppos[1][ppos[0]-1])}
updateNav(ppos[0]-1,ppos[1].length-1)}
focusaref();return false})}
var posInit=getCurrPos();updateNav(posInit[0],posInit[1].length-1)})},delGridRow: function(rowids,p){p=$.extend({top:0,left:0,width:240,height:'auto',dataheight:'auto',modal:false,overlay:30,drag:true,resize:true,url:'',mtype:"POST",reloadAfterSubmit:true,beforeShowForm:null,beforeInitData:null,afterShowForm:null,beforeSubmit:null,onclickSubmit:null,afterSubmit:null,jqModal:true,closeOnEscape:false,delData:{},delicon:[],cancelicon:[],onClose:null,ajaxDelOptions:{},processing:false,serializeDelData:null,useDataProxy:false},$.jgrid.del,p||{});rp_ge[$(this)[0].p.id]=p;return this.each(function(){var $t=this;if(!$t.grid){return}
if(!rowids){return}
var onBeforeShow=$.isFunction(rp_ge[$t.p.id].beforeShowForm),onAfterShow=$.isFunction(rp_ge[$t.p.id].afterShowForm),onBeforeInit=$.isFunction(rp_ge[$t.p.id].beforeInitData)?rp_ge[$t.p.id].beforeInitData:false,gID=$t.p.id,onCS={},showFrm=true,dtbl="DelTbl_"+gID,postd,idname,opers,oper,IDs={themodal:'delmod'+gID,modalhead:'delhd'+gID,modalcontent:'delcnt'+gID,scrollelm:dtbl};if(jQuery.isArray(rowids)){rowids=rowids.join()}
if($("#"+IDs.themodal).html()!==null){if(onBeforeInit){showFrm=onBeforeInit($("#"+dtbl));if(typeof(showFrm)=="undefined"){showFrm=true}}
if(showFrm===false){return}
$("#DelData>td","#"+dtbl).text(rowids);$("#DelError","#"+dtbl).hide();if(rp_ge[$t.p.id].processing===true){rp_ge[$t.p.id].processing=false;$("#dData","#"+dtbl).removeClass('ui-state-active')}
if(onBeforeShow){rp_ge[$t.p.id].beforeShowForm($("#"+dtbl))}
$.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:rp_ge[$t.p.id].jqModal,jqM:false,overlay:rp_ge[$t.p.id].overlay,modal:rp_ge[$t.p.id].modal});if(onAfterShow){rp_ge[$t.p.id].afterShowForm($("#"+dtbl))}} else{var dh=isNaN(rp_ge[$t.p.id].dataheight)?rp_ge[$t.p.id].dataheight:rp_ge[$t.p.id].dataheight+"px";var tbl="<div id='"+dtbl+"' class='formdata' style='width:100%;overflow:auto;position:relative;height:"+dh+";'>";tbl+="<table class='DelTable'><tbody>";tbl+="<tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>";tbl+="<tr id='DelData' style='display:none'><td >"+rowids+"</td></tr>";tbl+="<tr><td class=\"delmsg\" style=\"white-space:pre;\">"+rp_ge[$t.p.id].msg+"</td></tr><tr><td >&#160;</td></tr>";tbl+="</tbody></table></div>";var bS="<a href='javascript:void(0)' id='dData' class='fm-button ui-state-default ui-corner-all'>"+p.bSubmit+"</a>",bC="<a href='javascript:void(0)' id='eData' class='fm-button ui-state-default ui-corner-all'>"+p.bCancel+"</a>";tbl+="<table cellspacing='0' cellpadding='0' border='0' class='EditTable' id='"+dtbl+"_2'><tbody><tr><td><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>"+bS+"&#160;"+bC+"</td></tr></tbody></table>";p.gbox="#gbox_"+gID;$.jgrid.createModal(IDs,tbl,p,"#gview_"+$t.p.id,$("#gview_"+$t.p.id)[0]);if(onBeforeInit){showFrm=onBeforeInit($("#"+dtbl));if(typeof(showFrm)=="undefined"){showFrm=true}}
if(showFrm===false){return}
$(".fm-button","#"+dtbl+"_2").hover(
function(){$(this).addClass('ui-state-hover')},
function(){$(this).removeClass('ui-state-hover')});p.delicon=$.extend([true,"left","ui-icon-scissors"],rp_ge[$t.p.id].delicon);p.cancelicon=$.extend([true,"left","ui-icon-cancel"],rp_ge[$t.p.id].cancelicon);if(p.delicon[0]===true){$("#dData","#"+dtbl+"_2").addClass(p.delicon[1]=="right"?'fm-button-icon-right':'fm-button-icon-left').append("<span class='ui-icon "+p.delicon[2]+"'></span>")}
if(p.cancelicon[0]===true){$("#eData","#"+dtbl+"_2").addClass(p.cancelicon[1]=="right"?'fm-button-icon-right':'fm-button-icon-left').append("<span class='ui-icon "+p.cancelicon[2]+"'></span>")}
$("#dData","#"+dtbl+"_2").click(function(e){var ret=[true,""];onCS={};var postdata=$("#DelData>td","#"+dtbl).text();if($.isFunction(rp_ge[$t.p.id].onclickSubmit)){onCS=rp_ge[$t.p.id].onclickSubmit(rp_ge[$t.p.id],postdata)||{}}
if($.isFunction(rp_ge[$t.p.id].beforeSubmit)){ret=rp_ge[$t.p.id].beforeSubmit(postdata)}
if(ret[0]&&!rp_ge[$t.p.id].processing){rp_ge[$t.p.id].processing=true;$(this).addClass('ui-state-active');opers=$t.p.prmNames;postd=$.extend({},rp_ge[$t.p.id].delData,onCS);oper=opers.oper;postd[oper]=opers.deloper;idname=opers.id;postdata=postdata.split(",");for(var pk in postdata){if(postdata.hasOwnProperty(pk)){postdata[pk]=$.jgrid.stripPref($t.p.idPrefix,postdata[pk])}}
postd[idname]=postdata.join();var ajaxOptions=$.extend({url:rp_ge[$t.p.id].url?rp_ge[$t.p.id].url:$($t).jqGrid('getGridParam','editurl'),type:rp_ge[$t.p.id].mtype,data:$.isFunction(rp_ge[$t.p.id].serializeDelData)?rp_ge[$t.p.id].serializeDelData(postd):postd,complete:function(data,Status){if(Status!="success"){ret[0]=false;if($.isFunction(rp_ge[$t.p.id].errorTextFormat)){ret[1]=rp_ge[$t.p.id].errorTextFormat(data)} else{ret[1]=Status+" Status: '"+data.statusText+"'. Error code: "+data.status}} else{if($.isFunction(rp_ge[$t.p.id].afterSubmit)){ret=rp_ge[$t.p.id].afterSubmit(data,postd)}}
if(ret[0]===false){$("#DelError>td","#"+dtbl).html(ret[1]);$("#DelError","#"+dtbl).show()} else{if(rp_ge[$t.p.id].reloadAfterSubmit&&$t.p.datatype!="local"){$($t).trigger("reloadGrid")} else{var toarr=[];toarr=postdata.split(",");if($t.p.treeGrid===true){try{$($t).jqGrid("delTreeNode",$t.p.idPrefix+toarr[0])} catch(e){}} else{for(var i=0;i<toarr.length;i++){$($t).jqGrid("delRowData",$t.p.idPrefix+toarr[i])}}
$t.p.selrow=null;$t.p.selarrrow=[]}
if($.isFunction(rp_ge[$t.p.id].afterComplete)){setTimeout(function(){rp_ge[$t.p.id].afterComplete(data,postdata)},500)}}
rp_ge[$t.p.id].processing=false;$("#dData","#"+dtbl+"_2").removeClass('ui-state-active');if(ret[0]){$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose})}}},$.jgrid.ajaxOptions,rp_ge[$t.p.id].ajaxDelOptions);if(!ajaxOptions.url&&!rp_ge[$t.p.id].useDataProxy){if($.isFunction($t.p.dataProxy)){rp_ge[$t.p.id].useDataProxy=true} else{ret[0]=false;ret[1]+=" "+$.jgrid.errors.nourl}}
if(ret[0]){if(rp_ge[$t.p.id].useDataProxy){var dpret=$t.p.dataProxy.call($t,ajaxOptions,"del_"+$t.p.id);if(typeof(dpret)=="undefined"){dpret=[true,""]}
if(dpret[0]===false){ret[0]=false;ret[1]=dpret[1]||"Error deleting the selected row!" } else{$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal,onClose:rp_ge[$t.p.id].onClose})}}
else{$.ajax(ajaxOptions)}}}
if(ret[0]===false){$("#DelError>td","#"+dtbl).html(ret[1]);$("#DelError","#"+dtbl).show()}
return false});$("#eData","#"+dtbl+"_2").click(function(e){$.jgrid.hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:rp_ge[$t.p.id].jqModal,onClose:rp_ge[$t.p.id].onClose});return false});if(onBeforeShow){rp_ge[$t.p.id].beforeShowForm($("#"+dtbl))}
$.jgrid.viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:rp_ge[$t.p.id].jqModal,overlay:rp_ge[$t.p.id].overlay,modal:rp_ge[$t.p.id].modal});if(onAfterShow){rp_ge[$t.p.id].afterShowForm($("#"+dtbl))}}
if(rp_ge[$t.p.id].closeOnEscape===true){setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+IDs.modalhead).focus()},0)}})},navGrid: function(elem,o,pEdit,pAdd,pDel,pSearch,pView){o=$.extend({edit:true,editicon:"ui-icon-pencil",add:true,addicon:"ui-icon-plus",del:true,delicon:"ui-icon-trash",search:true,searchicon:"ui-icon-search",refresh:true,refreshicon:"ui-icon-refresh",refreshstate:'firstpage',view:false,viewicon:"ui-icon-document",position:"left",closeOnEscape:true,beforeRefresh:null,afterRefresh:null,cloneToTop:false,alertwidth:200,alertheight:'auto',alerttop:null,alertleft:null,alertzIndex:null},$.jgrid.nav,o||{});return this.each(function(){if(this.nav){return}
var alertIDs={themodal:'alertmod',modalhead:'alerthd',modalcontent:'alertcnt'},$t=this,twd,tdw;if(!$t.grid||typeof elem!='string'){return}
if($("#"+alertIDs.themodal).html()===null){if(!o.alerttop&&!o.alertleft){if(typeof window.innerWidth!='undefined'){o.alertleft=window.innerWidth;o.alerttop=window.innerHeight} else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!==0){o.alertleft=document.documentElement.clientWidth;o.alerttop=document.documentElement.clientHeight} else{o.alertleft=1024;o.alerttop=768}
o.alertleft=o.alertleft/2-parseInt(o.alertwidth,10)/2;o.alerttop=o.alerttop/2-25}
$.jgrid.createModal(alertIDs,"<div>"+o.alerttext+"</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>",{gbox:"#gbox_"+$t.p.id,jqModal:true,drag:true,resize:true,caption:o.alertcap,top:o.alerttop,left:o.alertleft,width:o.alertwidth,height:o.alertheight,closeOnEscape:o.closeOnEscape,zIndex:o.alertzIndex},"","",true)}
var clone=1;if(o.cloneToTop&&$t.p.toppager){clone=2}
for(var i=0;i<clone;i++){var tbd,navtbl=$("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table navtable' style='float:left;table-layout:auto;'><tbody><tr></tr></tbody></table>"),sep="<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>",pgid,elemids;if(i===0){pgid=elem;elemids=$t.p.id;if(pgid==$t.p.toppager){elemids+="_top";clone=1}} else{pgid=$t.p.toppager;elemids=$t.p.id+"_top"}
if($t.p.direction=="rtl"){$(navtbl).attr("dir","rtl").css("float","right")}
if(o.add){pAdd=pAdd||{};tbd=$("<td class='ui-pg-button ui-corner-all'></td>");$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.addicon+"'></span>"+o.addtext+"</div>");$("tr",navtbl).append(tbd);$(tbd,navtbl).attr({"title":o.addtitle||"",id:pAdd.id||"add_"+elemids}).click(function(){if(!$(this).hasClass('ui-state-disabled')){if($.isFunction(o.addfunc)){o.addfunc()} else{$($t).jqGrid("editGridRow","new",pAdd)}}
return false}).hover(
function(){if(!$(this).hasClass('ui-state-disabled')){$(this).addClass("ui-state-hover")}},
function(){$(this).removeClass("ui-state-hover")});tbd=null}
if(o.edit){tbd=$("<td class='ui-pg-button ui-corner-all'></td>");pEdit=pEdit||{};$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.editicon+"'></span>"+o.edittext+"</div>");$("tr",navtbl).append(tbd);$(tbd,navtbl).attr({"title":o.edittitle||"",id:pEdit.id||"edit_"+elemids}).click(function(){if(!$(this).hasClass('ui-state-disabled')){var sr=$t.p.selrow;if(sr){if($.isFunction(o.editfunc)){o.editfunc(sr)} else{$($t).jqGrid("editGridRow",sr,pEdit)}} else{$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus()}}
return false}).hover(
function(){if(!$(this).hasClass('ui-state-disabled')){$(this).addClass("ui-state-hover")}},
function(){$(this).removeClass("ui-state-hover")});tbd=null}
if(o.view){tbd=$("<td class='ui-pg-button ui-corner-all'></td>");pView=pView||{};$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.viewicon+"'></span>"+o.viewtext+"</div>");$("tr",navtbl).append(tbd);$(tbd,navtbl).attr({"title":o.viewtitle||"",id:pView.id||"view_"+elemids}).click(function(){if(!$(this).hasClass('ui-state-disabled')){var sr=$t.p.selrow;if(sr){if($.isFunction(o.viewfunc)){o.viewfunc(sr)} else{$($t).jqGrid("viewGridRow",sr,pView)}} else{$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus()}}
return false}).hover(
function(){if(!$(this).hasClass('ui-state-disabled')){$(this).addClass("ui-state-hover")}},
function(){$(this).removeClass("ui-state-hover")});tbd=null}
if(o.del){tbd=$("<td class='ui-pg-button ui-corner-all'></td>");pDel=pDel||{};$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.delicon+"'></span>"+o.deltext+"</div>");$("tr",navtbl).append(tbd);$(tbd,navtbl).attr({"title":o.deltitle||"",id:pDel.id||"del_"+elemids}).click(function(){if(!$(this).hasClass('ui-state-disabled')){var dr;if($t.p.multiselect){dr=$t.p.selarrrow;if(dr.length===0){dr=null}} else{dr=$t.p.selrow}
if(dr){if("function"==typeof o.delfunc){o.delfunc(dr)}else{$($t).jqGrid("delGridRow",dr,pDel)}} else{$.jgrid.viewModal("#"+alertIDs.themodal,{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus()}}
return false}).hover(
function(){if(!$(this).hasClass('ui-state-disabled')){$(this).addClass("ui-state-hover")}},
function(){$(this).removeClass("ui-state-hover")});tbd=null}
if(o.add||o.edit||o.del||o.view){$("tr",navtbl).append(sep)}
if(o.search){tbd=$("<td class='ui-pg-button ui-corner-all'></td>");pSearch=pSearch||{};$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.searchicon+"'></span>"+o.searchtext+"</div>");$("tr",navtbl).append(tbd);$(tbd,navtbl).attr({"title":o.searchtitle||"",id:pSearch.id||"search_"+elemids}).click(function(){if(!$(this).hasClass('ui-state-disabled')){$($t).jqGrid("searchGrid",pSearch)}
return false}).hover(
function(){if(!$(this).hasClass('ui-state-disabled')){$(this).addClass("ui-state-hover")}},
function(){$(this).removeClass("ui-state-hover")});if(pSearch.showOnLoad&&pSearch.showOnLoad===true){$(tbd,navtbl).click()}
tbd=null}
if(o.refresh){tbd=$("<td class='ui-pg-button ui-corner-all'></td>");$(tbd).append("<div class='ui-pg-div'><span class='ui-icon "+o.refreshicon+"'></span>"+o.refreshtext+"</div>");$("tr",navtbl).append(tbd);$(tbd,navtbl).attr({"title":o.refreshtitle||"",id:"refresh_"+elemids}).click(function(){if(!$(this).hasClass('ui-state-disabled')){if($.isFunction(o.beforeRefresh)){o.beforeRefresh()}
$t.p.search=false;try{var gID=$t.p.id;$t.p.postData.filters="";$("#fbox_"+gID).jqFilter('resetFilter');if($.isFunction($t.clearToolbar)){$t.clearToolbar(false)}} catch(e){}
switch(o.refreshstate){case 'firstpage':$($t).trigger("reloadGrid",[{page:1}]);break;case 'current':$($t).trigger("reloadGrid",[{current:true}]);break}
if($.isFunction(o.afterRefresh)){o.afterRefresh()}}
return false}).hover(
function(){if(!$(this).hasClass('ui-state-disabled')){$(this).addClass("ui-state-hover")}},
function(){$(this).removeClass("ui-state-hover")});tbd=null}
tdw=$(".ui-jqgrid").css("font-size")||"11px";$('body').append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:"+tdw+";visibility:hidden;' ></div>");twd=$(navtbl).clone().appendTo("#testpg2").width();$("#testpg2").remove();$(pgid+"_"+o.position,pgid).append(navtbl);if($t.p._nvtd){if(twd>$t.p._nvtd[0]){$(pgid+"_"+o.position,pgid).width(twd);$t.p._nvtd[0]=twd}
$t.p._nvtd[1]=twd}
tdw=null;twd=null;navtbl=null;this.nav=true}})},navButtonAdd: function(elem,p){p=$.extend({caption:"newButton",title:'',buttonicon:'ui-icon-newwin',onClickButton:null,position:"last",cursor:'pointer'},p||{});return this.each(function(){if(!this.grid){return}
if(elem.indexOf("#")!==0){elem="#"+elem}
var findnav=$(".navtable",elem)[0],$t=this;if(findnav){if(p.id&&$("#"+p.id,findnav).html()!==null){return}
var tbd=$("<td></td>");if(p.buttonicon.toString().toUpperCase()=="NONE"){$(tbd).addClass('ui-pg-button ui-corner-all').append("<div class='ui-pg-div'>"+p.caption+"</div>")} else{$(tbd).addClass('ui-pg-button ui-corner-all').append("<div class='ui-pg-div'><span class='ui-icon "+p.buttonicon+"'></span>"+p.caption+"</div>")}
if(p.id){$(tbd).attr("id",p.id)}
if(p.position=='first'){if(findnav.rows[0].cells.length===0){$("tr",findnav).append(tbd)} else{$("tr td:eq(0)",findnav).before(tbd)}} else{$("tr",findnav).append(tbd)}
$(tbd,findnav).attr("title",p.title||"").click(function(e){if(!$(this).hasClass('ui-state-disabled')){if($.isFunction(p.onClickButton)){p.onClickButton.call($t,e)}}
return false}).hover(
function(){if(!$(this).hasClass('ui-state-disabled')){$(this).addClass('ui-state-hover')}},
function(){$(this).removeClass("ui-state-hover")})}})},navSeparatorAdd:function(elem,p){p=$.extend({sepclass:"ui-separator",sepcontent:''},p||{});return this.each(function(){if(!this.grid){return}
if(elem.indexOf("#")!==0){elem="#"+elem}
var findnav=$(".navtable",elem)[0];if(findnav){var sep="<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='"+p.sepclass+"'></span>"+p.sepcontent+"</td>";$("tr",findnav).append(sep)}})},GridToForm: function(rowid,formid){return this.each(function(){var $t=this;if(!$t.grid){return}
var rowdata=$($t).jqGrid("getRowData",rowid);if(rowdata){for(var i in rowdata){if($("[name="+$.jgrid.jqID(i)+"]",formid).is("input:radio")||$("[name="+$.jgrid.jqID(i)+"]",formid).is("input:checkbox")){$("[name="+$.jgrid.jqID(i)+"]",formid).each( function(){if($(this).val()==rowdata[i]){$(this)[$t.p.useProp?'prop':'attr']("checked",true)} else{$(this)[$t.p.useProp?'prop':'attr']("checked",false)}})} else{$("[name="+$.jgrid.jqID(i)+"]",formid).val(rowdata[i])}}}})},FormToGrid: function(rowid,formid,mode,position){return this.each(function(){var $t=this;if(!$t.grid){return}
if(!mode){mode='set'}
if(!position){position='first'}
var fields=$(formid).serializeArray();var griddata={};$.each(fields, function(i,field){griddata[field.name]=field.value});if(mode=='add'){$($t).jqGrid("addRowData",rowid,griddata,position)}
else if(mode=='set'){$($t).jqGrid("setRowData",rowid,griddata)}})}})})(jQuery);(function($){"use strict";$.jgrid.inlineEdit=$.jgrid.inlineEdit||{};$.jgrid.extend({editRow: function(rowid,keys,oneditfunc,successfunc,url,extraparam,aftersavefunc,errorfunc,afterrestorefunc){var o={},args=$.makeArray(arguments).slice(1);if($.jgrid.realType(args[0])==="Object"){o=args[0]} else{if(typeof keys!=="undefined"){o.keys=keys}
if($.isFunction(oneditfunc)){o.oneditfunc=oneditfunc}
if($.isFunction(successfunc)){o.successfunc=successfunc}
if(typeof url!=="undefined"){o.url=url}
if(typeof extraparam!=="undefined"){o.extraparam=extraparam}
if($.isFunction(aftersavefunc)){o.aftersavefunc=aftersavefunc}
if($.isFunction(errorfunc)){o.errorfunc=errorfunc}
if($.isFunction(afterrestorefunc)){o.afterrestorefunc=afterrestorefunc}}
o=$.extend(true,{keys:false,oneditfunc:null,successfunc:null,url:null,extraparam:{},aftersavefunc:null,errorfunc:null,afterrestorefunc:null,restoreAfterError:true,mtype:"POST"},$.jgrid.inlineEdit,o);return this.each(function(){var $t=this,nm,tmp,editable,cnt=0,focus=null,svr={},ind,cm;if(!$t.grid){return}
ind=$($t).jqGrid("getInd",rowid,true);if(ind===false){return}
editable=$(ind).attr("editable")||"0";if(editable=="0"&&!$(ind).hasClass("not-editable-row")){cm=$t.p.colModel;$('td[role="gridcell"]',ind).each( function(i){nm=cm[i].name;var treeg=$t.p.treeGrid===true&&nm==$t.p.ExpandColumn;if(treeg){tmp=$("span:first",this).html()}
else{try{tmp=$.unformat(this,{rowId:rowid,colModel:cm[i]},i)} catch(_){tmp=(cm[i].edittype&&cm[i].edittype=='textarea')?$(this).text():$(this).html()}}
if(nm!='cb'&&nm!='subgrid'&&nm!='rn'){if($t.p.autoencode){tmp=$.jgrid.htmlDecode(tmp)}
svr[nm]=tmp;if(cm[i].editable===true){if(focus===null){focus=i}
if(treeg){$("span:first",this).html("")}
else{$(this).html("")}
var opt=$.extend({},cm[i].editoptions||{},{id:rowid+"_"+nm,name:nm});if(!cm[i].edittype){cm[i].edittype="text"}
if(tmp=="&nbsp;"||tmp=="&#160;"||(tmp.length==1&&tmp.charCodeAt(0)==160)){tmp=''}
var elc=$.jgrid.createEl(cm[i].edittype,opt,tmp,true,$.extend({},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions||{}));$(elc).addClass("editable");if(treeg){$("span:first",this).append(elc)}
else{$(this).append(elc)}
if(cm[i].edittype=="select"&&typeof(cm[i].editoptions)!=="undefined"&&cm[i].editoptions.multiple===true&&typeof(cm[i].editoptions.dataUrl)==="undefined"&&$.browser.msie){$(elc).width($(elc).width())}
cnt++}}});if(cnt>0){svr.id=rowid;$t.p.savedRow.push(svr);$(ind).attr("editable","1");$("td:eq("+focus+") input",ind).focus();if(o.keys===true){$(ind).bind("keydown",function(e){if(e.keyCode===27){$($t).jqGrid("restoreRow",rowid,afterrestorefunc);return false}
if(e.keyCode===13){var ta=e.target;if(ta.tagName=='TEXTAREA'){return true}
$($t).jqGrid("saveRow",rowid,o);return false}})}
if($.isFunction(o.oneditfunc)){o.oneditfunc.call($t,rowid)}}}})},saveRow: function(rowid,successfunc,url,extraparam,aftersavefunc,errorfunc,afterrestorefunc){var args=$.makeArray(arguments).slice(1),o={};if($.jgrid.realType(args[0])==="Object"){o=args[0]} else{if($.isFunction(successfunc)){o.successfunc=successfunc}
if(typeof url!=="undefined"){o.url=url}
if(typeof extraparam!=="undefined"){o.extraparam=extraparam}
if($.isFunction(aftersavefunc)){o.aftersavefunc=aftersavefunc}
if($.isFunction(errorfunc)){o.errorfunc=errorfunc}
if($.isFunction(afterrestorefunc)){o.afterrestorefunc=afterrestorefunc}}
o=$.extend(true,{successfunc:null,url:null,extraparam:{},aftersavefunc:null,errorfunc:null,afterrestorefunc:null,restoreAfterError:true,mtype:"POST"},$.jgrid.inlineEdit,o);var success=false;var $t=this[0],nm,tmp={},tmp2={},tmp3={},editable,fr,cv,ind;if(!$t.grid){return success}
ind=$($t).jqGrid("getInd",rowid,true);if(ind===false){return success}
editable=$(ind).attr("editable");o.url=o.url?o.url:$t.p.editurl;if(editable==="1"){var cm;$('td[role="gridcell"]',ind).each(function(i){cm=$t.p.colModel[i];nm=cm.name;if(nm!='cb'&&nm!='subgrid'&&cm.editable===true&&nm!='rn'&&!$(this).hasClass('not-editable-cell')){switch(cm.edittype){case "checkbox":var cbv=["Yes","No"];if(cm.editoptions){cbv=cm.editoptions.value.split(":")}
tmp[nm]=$("input",this).is(":checked")?cbv[0]:cbv[1];break;case 'text':case 'password':case 'textarea':case "button":tmp[nm]=$("input, textarea",this).val();break;case 'select':if(!cm.editoptions.multiple){tmp[nm]=$("select option:selected",this).val();tmp2[nm]=$("select option:selected",this).text()} else{var sel=$("select",this),selectedText=[];tmp[nm]=$(sel).val();if(tmp[nm]){tmp[nm]=tmp[nm].join(",")} else{tmp[nm]=""}
$("select option:selected",this).each(
function(i,selected){selectedText[i]=$(selected).text()});tmp2[nm]=selectedText.join(",")}
if(cm.formatter&&cm.formatter=='select'){tmp2={}}
break;case 'custom':try{if(cm.editoptions&&$.isFunction(cm.editoptions.custom_value)){tmp[nm]=cm.editoptions.custom_value.call($t,$(".customelement",this),'get');if(tmp[nm]===undefined){throw "e2"}} else{throw "e1"}} catch(e){if(e=="e1"){$.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,$.jgrid.edit.bClose)}
if(e=="e2"){$.jgrid.info_dialog($.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose)}
else{$.jgrid.info_dialog($.jgrid.errors.errcap,e.message,$.jgrid.edit.bClose)}}
break}
cv=$.jgrid.checkValues(tmp[nm],i,$t);if(cv[0]===false){cv[1]=tmp[nm]+" "+cv[1];return false}
if($t.p.autoencode){tmp[nm]=$.jgrid.htmlEncode(tmp[nm])}
if(o.url!=='clientArray'&&cm.editoptions&&cm.editoptions.NullIfEmpty===true){if(tmp[nm]===""){tmp3[nm]='null'}}}});if(cv[0]===false){try{var positions=$.jgrid.findPos($("#"+$.jgrid.jqID(rowid),$t.grid.bDiv)[0]);$.jgrid.info_dialog($.jgrid.errors.errcap,cv[1],$.jgrid.edit.bClose,{left:positions[0],top:positions[1]})} catch(e){alert(cv[1])}
return success}
var idname,opers,oper;opers=$t.p.prmNames;oper=opers.oper;idname=opers.id;if(tmp){tmp[oper]=opers.editoper;tmp[idname]=rowid;if(typeof($t.p.inlineData)=='undefined'){$t.p.inlineData={}}
tmp=$.extend({},tmp,$t.p.inlineData,o.extraparam)}
if(o.url=='clientArray'){tmp=$.extend({},tmp,tmp2);if($t.p.autoencode){$.each(tmp,function(n,v){tmp[n]=$.jgrid.htmlDecode(v)})}
var resp=$($t).jqGrid("setRowData",rowid,tmp);$(ind).attr("editable","0");for(var k=0;k<$t.p.savedRow.length;k++){if($t.p.savedRow[k].id==rowid){fr=k;break}}
if(fr>=0){$t.p.savedRow.splice(fr,1)}
if($.isFunction(o.aftersavefunc)){o.aftersavefunc.call($t,rowid,resp)}
success=true;$(ind).unbind("keydown")} else{$("#lui_"+$t.p.id).show();tmp3=$.extend({},tmp,tmp3);tmp3[idname]=$.jgrid.stripPref($t.p.idPrefix,tmp3[idname]);$.ajax($.extend({url:o.url,data:$.isFunction($t.p.serializeRowData)?$t.p.serializeRowData.call($t,tmp3):tmp3,type:o.mtype,async:false,complete: function(res,stat){$("#lui_"+$t.p.id).hide();if(stat==="success"){var ret=true,sucret;if($.isFunction(o.successfunc)){sucret=o.successfunc.call($t,res);if($.isArray(sucret)){ret=sucret[0];tmp=sucret[1]?sucret[1]:tmp} else{ret=sucret}}
if(ret===true){if($t.p.autoencode){$.each(tmp,function(n,v){tmp[n]=$.jgrid.htmlDecode(v)})}
tmp=$.extend({},tmp,tmp2);$($t).jqGrid("setRowData",rowid,tmp);$(ind).attr("editable","0");for(var k=0;k<$t.p.savedRow.length;k++){if($t.p.savedRow[k].id==rowid){fr=k;break}}
if(fr>=0){$t.p.savedRow.splice(fr,1)}
if($.isFunction(o.aftersavefunc)){o.aftersavefunc.call($t,rowid,res)}
success=true;$(ind).unbind("keydown")} else{if($.isFunction(o.errorfunc)){o.errorfunc.call($t,rowid,res,stat)}
if(o.restoreAfterError===true){$($t).jqGrid("restoreRow",rowid,o.afterrestorefunc)}}}},error:function(res,stat){$("#lui_"+$t.p.id).hide();if($.isFunction(o.errorfunc)){o.errorfunc.call($t,rowid,res,stat)} else{try{$.jgrid.info_dialog($.jgrid.errors.errcap,'<div class="ui-state-error">'+res.responseText+'</div>',$.jgrid.edit.bClose,{buttonalign:'right'})} catch(e){alert(res.responseText)}}
if(o.restoreAfterError===true){$($t).jqGrid("restoreRow",rowid,o.afterrestorefunc)}}},$.jgrid.ajaxOptions,$t.p.ajaxRowOptions||{}))}}
return success},restoreRow: function(rowid,afterrestorefunc){var args=$.makeArray(arguments).slice(1),o={};if($.jgrid.realType(args[0])==="Object"){o=args[0]} else{if($.isFunction(afterrestorefunc)){o.afterrestorefunc=afterrestorefunc}}
o=$.extend(true,$.jgrid.inlineEdit,o);return this.each(function(){var $t=this,fr,ind,ares={};if(!$t.grid){return}
ind=$($t).jqGrid("getInd",rowid,true);if(ind===false){return}
for(var k=0;k<$t.p.savedRow.length;k++){if($t.p.savedRow[k].id==rowid){fr=k;break}}
if(fr>=0){if($.isFunction($.fn.datepicker)){try{$("input.hasDatepicker","#"+$.jgrid.jqID(ind.id)).datepicker('hide')} catch(e){}}
$.each($t.p.colModel, function(i,n){if(this.editable===true&&this.name in $t.p.savedRow[fr]&&!$(this).hasClass('not-editable-cell')){ares[this.name]=$t.p.savedRow[fr][this.name]}});$($t).jqGrid("setRowData",rowid,ares);$(ind).attr("editable","0").unbind("keydown");$t.p.savedRow.splice(fr,1);if($("#"+$.jgrid.jqID(rowid),"#"+$.jgrid.jqID($t.p.id)).hasClass("jqgrid-new-row")){setTimeout(function(){$($t).jqGrid("delRowData",rowid)},0)}}
if($.isFunction(o.afterrestorefunc)){o.afterrestorefunc.call($t,rowid)}})},addRow: function(p){p=$.extend(true,{rowID:"new_row",initdata:{},position:"first",useDefValues:true,useFormatter:false,addRowParams:{extraparam:{}}},p||{});return this.each(function(){if(!this.grid){return}
var $t=this;if(p.useDefValues===true){$($t.p.colModel).each(function(i){if(this.editoptions&&this.editoptions.defaultValue){var opt=this.editoptions.defaultValue,tmp=$.isFunction(opt)?opt.call($t):opt;p.initdata[this.name]=tmp}})}
$($t).jqGrid('addRowData',p.rowID,p.initdata,p.position);$("#"+$.jgrid.jqID(p.rowID),"#"+$.jgrid.jqID($t.p.id)).addClass("jqgrid-new-row");if(p.useFormatter){$("#"+$.jgrid.jqID(p.rowID)+" .ui-inline-edit","#"+$.jgrid.jqID($t.p.id)).click()} else{var opers=$t.p.prmNames,oper=opers.oper;p.addRowParams.extraparam[oper]=opers.addoper;$($t).jqGrid('editRow',p.rowID,p.addRowParams);$($t).jqGrid('setSelection',p.rowID)}})},inlineNav: function(elem,o){o=$.extend({edit:true,editicon:"ui-icon-pencil",add:true,addicon:"ui-icon-plus",save:true,saveicon:"ui-icon-disk",cancel:true,cancelicon:"ui-icon-cancel",addParams:{useFormatter:false},editParams:{}},$.jgrid.nav,o||{});return this.each(function(){if(!this.grid){return}
var $t=this;if(o.addParams.useFormatter===true){var cm=$t.p.colModel,i;for(i=0;i<cm.length;i++){if(cm[i].formatter&&cm[i].formatter==="actions"){if(cm[i].formatoptions){var defaults={keys:false,onEdit:null,onSuccess:null,afterSave:null,onError:null,afterRestore:null,extraparam:{},url:null},ap=$.extend(defaults,cm[i].formatoptions);o.addParams.addRowParams={"keys":ap.keys,"oneditfunc":ap.onEdit,"successfunc":ap.onSuccess,"url":ap.url,"extraparam":ap.extraparam,"aftersavefunc":ap.afterSavef,"errorfunc":ap.onError,"afterrestorefunc":ap.afterRestore}}
break}}}
if(o.add){$($t).jqGrid('navButtonAdd',elem,{caption:o.addtext,title:o.addtitle,buttonicon:o.addicon,id:$t.p.id+"_iladd",onClickButton: function(e){$($t).jqGrid('addRow',o.addParams);if(!o.addParams.useFormatter){$("#"+$t.p.id+"_ilsave").removeClass('ui-state-disabled');$("#"+$t.p.id+"_ilcancel").removeClass('ui-state-disabled');$("#"+$t.p.id+"_iladd").addClass('ui-state-disabled');$("#"+$t.p.id+"_iledit").addClass('ui-state-disabled')}}})}
if(o.edit){$($t).jqGrid('navButtonAdd',elem,{caption:o.edittext,title:o.edittitle,buttonicon:o.editicon,id:$t.p.id+"_iledit",onClickButton: function(e){var sr=$($t).jqGrid('getGridParam','selrow');if(sr){$($t).jqGrid('editRow',sr,o.editParams);$("#"+$t.p.id+"_ilsave").removeClass('ui-state-disabled');$("#"+$t.p.id+"_ilcancel").removeClass('ui-state-disabled');$("#"+$t.p.id+"_iladd").addClass('ui-state-disabled');$("#"+$t.p.id+"_iledit").addClass('ui-state-disabled')} else{$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus()}}})}
if(o.save){$($t).jqGrid('navButtonAdd',elem,{caption:o.savetext||'',title:o.savetitle||'Save row',buttonicon:o.saveicon,id:$t.p.id+"_ilsave",onClickButton: function(e){var sr=$t.p.savedRow[0].id;if(sr){if($("#"+$.jgrid.jqID(sr),"#"+$.jgrid.jqID($t.p.id)).hasClass("jqgrid-new-row")){var opers=$t.p.prmNames,oper=opers.oper;if(!o.editParams.extraparam){o.editParams.extraparam={}}
o.editParams.extraparam[oper]=opers.addoper}
if($($t).jqGrid('saveRow',sr,o.editParams)){$("#"+$t.p.id+"_ilsave").addClass('ui-state-disabled');$("#"+$t.p.id+"_ilcancel").addClass('ui-state-disabled');$("#"+$t.p.id+"_iladd").removeClass('ui-state-disabled');$("#"+$t.p.id+"_iledit").removeClass('ui-state-disabled')}} else{$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus()}}});$("#"+$t.p.id+"_ilsave").addClass('ui-state-disabled')}
if(o.cancel){$($t).jqGrid('navButtonAdd',elem,{caption:o.canceltext||'',title:o.canceltitle||'Cancel row editing',buttonicon:o.cancelicon,id:$t.p.id+"_ilcancel",onClickButton: function(e){var sr=$t.p.savedRow[0].id;if(sr){$($t).jqGrid('restoreRow',sr,o.editParams);$("#"+$t.p.id+"_ilsave").addClass('ui-state-disabled');$("#"+$t.p.id+"_ilcancel").addClass('ui-state-disabled');$("#"+$t.p.id+"_iladd").removeClass('ui-state-disabled');$("#"+$t.p.id+"_iledit").removeClass('ui-state-disabled')} else{$.jgrid.viewModal("#alertmod",{gbox:"#gbox_"+$t.p.id,jqm:true});$("#jqg_alrt").focus()}}});$("#"+$t.p.id+"_ilcancel").addClass('ui-state-disabled')}})}})})(jQuery);(function($){$.jgrid.extend({editCell: function(iRow,iCol,ed){return this.each(function(){var $t=this,nm,tmp,cc,cm;if(!$t.grid||$t.p.cellEdit!==true){return}
iCol=parseInt(iCol,10);$t.p.selrow=$t.rows[iRow].id;if(!$t.p.knv){$($t).jqGrid("GridNav")}
if($t.p.savedRow.length>0){if(ed===true){if(iRow==$t.p.iRow&&iCol==$t.p.iCol){return}}
$($t).jqGrid("saveCell",$t.p.savedRow[0].id,$t.p.savedRow[0].ic)} else{window.setTimeout(function(){$("#"+$t.p.knv).attr("tabindex","-1").focus()},0)}
cm=$t.p.colModel[iCol];nm=cm.name;if(nm=='subgrid'||nm=='cb'||nm=='rn'){return}
cc=$("td:eq("+iCol+")",$t.rows[iRow]);if(cm.editable===true&&ed===true&&!cc.hasClass("not-editable-cell")){if(parseInt($t.p.iCol,10)>=0&&parseInt($t.p.iRow,10)>=0){$("td:eq("+$t.p.iCol+")",$t.rows[$t.p.iRow]).removeClass("edit-cell ui-state-highlight");$($t.rows[$t.p.iRow]).removeClass("selected-row ui-state-hover")}
$(cc).addClass("edit-cell ui-state-highlight");$($t.rows[iRow]).addClass("selected-row ui-state-hover");try{tmp=$.unformat(cc,{rowId:$t.rows[iRow].id,colModel:cm},iCol)} catch(_){tmp=(cm.edittype&&cm.edittype=='textarea')?$(cc).text():$(cc).html()}
if($t.p.autoencode){tmp=$.jgrid.htmlDecode(tmp)}
if(!cm.edittype){cm.edittype="text"}
$t.p.savedRow.push({id:iRow,ic:iCol,name:nm,v:tmp});if(tmp=="&nbsp;"||tmp=="&#160;"||(tmp.length==1&&tmp.charCodeAt(0)==160)){tmp=''}
if($.isFunction($t.p.formatCell)){var tmp2=$t.p.formatCell.call($t,$t.rows[iRow].id,nm,tmp,iRow,iCol);if(tmp2!==undefined){tmp=tmp2}}
var opt=$.extend({},cm.editoptions||{},{id:iRow+"_"+nm,name:nm});var elc=$.jgrid.createEl(cm.edittype,opt,tmp,true,$.extend({},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions||{}));if($.isFunction($t.p.beforeEditCell)){$t.p.beforeEditCell.call($t,$t.rows[iRow].id,nm,tmp,iRow,iCol)}
$(cc).html("").append(elc).attr("tabindex","0");window.setTimeout(function(){$(elc).focus()},0);$("input, select, textarea",cc).bind("keydown",function(e){if(e.keyCode===27){if($("input.hasDatepicker",cc).length>0){if($(".ui-datepicker").is(":hidden")){$($t).jqGrid("restoreCell",iRow,iCol)}
else{$("input.hasDatepicker",cc).datepicker('hide')}} else{$($t).jqGrid("restoreCell",iRow,iCol)}}
if(e.keyCode===13){$($t).jqGrid("saveCell",iRow,iCol)}
if(e.keyCode==9){if(!$t.grid.hDiv.loading){if(e.shiftKey){$($t).jqGrid("prevCell",iRow,iCol)}
else{$($t).jqGrid("nextCell",iRow,iCol)}} else{return false}}
e.stopPropagation()});if($.isFunction($t.p.afterEditCell)){$t.p.afterEditCell.call($t,$t.rows[iRow].id,nm,tmp,iRow,iCol)}} else{if(parseInt($t.p.iCol,10)>=0&&parseInt($t.p.iRow,10)>=0){$("td:eq("+$t.p.iCol+")",$t.rows[$t.p.iRow]).removeClass("edit-cell ui-state-highlight");$($t.rows[$t.p.iRow]).removeClass("selected-row ui-state-hover")}
cc.addClass("edit-cell ui-state-highlight");$($t.rows[iRow]).addClass("selected-row ui-state-hover");if($.isFunction($t.p.onSelectCell)){tmp=cc.html().replace(/\&#160\;/ig,'');$t.p.onSelectCell.call($t,$t.rows[iRow].id,nm,tmp,iRow,iCol)}}
$t.p.iCol=iCol;$t.p.iRow=iRow})},saveCell: function(iRow,iCol){return this.each(function(){var $t=this,fr;if(!$t.grid||$t.p.cellEdit!==true){return}
if($t.p.savedRow.length>=1){fr=0} else{fr=null}
if(fr!==null){var cc=$("td:eq("+iCol+")",$t.rows[iRow]),v,v2,cm=$t.p.colModel[iCol],nm=cm.name,nmjq=$.jgrid.jqID(nm) ;switch(cm.edittype){case "select":if(!cm.editoptions.multiple){v=$("#"+iRow+"_"+nmjq+">option:selected",$t.rows[iRow]).val();v2=$("#"+iRow+"_"+nmjq+">option:selected",$t.rows[iRow]).text()} else{var sel=$("#"+iRow+"_"+nmjq,$t.rows[iRow]),selectedText=[];v=$(sel).val();if(v){v.join(",")} else{v=""}
$("option:selected",sel).each(
function(i,selected){selectedText[i]=$(selected).text()});v2=selectedText.join(",")}
if(cm.formatter){v2=v}
break;case "checkbox":var cbv=["Yes","No"];if(cm.editoptions){cbv=cm.editoptions.value.split(":")}
v=$("#"+iRow+"_"+nmjq,$t.rows[iRow]).is(":checked")?cbv[0]:cbv[1];v2=v;break;case "password":case "text":case "textarea":case "button":v=$("#"+iRow+"_"+nmjq,$t.rows[iRow]).val();v2=v;break;case 'custom':try{if(cm.editoptions&&$.isFunction(cm.editoptions.custom_value)){v=cm.editoptions.custom_value.call($t,$(".customelement",cc),'get');if(v===undefined){throw "e2"} else{v2=v}} else{throw "e1"}} catch(e){if(e=="e1"){$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,jQuery.jgrid.edit.bClose)}
if(e=="e2"){$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,jQuery.jgrid.edit.bClose)}
else{$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,e.message,jQuery.jgrid.edit.bClose)}}
break}
if(v2!==$t.p.savedRow[fr].v){if($.isFunction($t.p.beforeSaveCell)){var vv=$t.p.beforeSaveCell.call($t,$t.rows[iRow].id,nm,v,iRow,iCol);if(vv){v=vv;v2=vv}}
var cv=$.jgrid.checkValues(v,iCol,$t);if(cv[0]===true){var addpost={};if($.isFunction($t.p.beforeSubmitCell)){addpost=$t.p.beforeSubmitCell.call($t,$t.rows[iRow].id,nm,v,iRow,iCol);if(!addpost){addpost={}}}
if($("input.hasDatepicker",cc).length>0){$("input.hasDatepicker",cc).datepicker('hide')}
if($t.p.cellsubmit=='remote'){if($t.p.cellurl){var postdata={};if($t.p.autoencode){v=$.jgrid.htmlEncode(v)}
postdata[nm]=v;var idname,oper,opers;opers=$t.p.prmNames;idname=opers.id;oper=opers.oper;postdata[idname]=$.jgrid.stripPref($t.p.idPrefix,$t.rows[iRow].id);postdata[oper]=opers.editoper;postdata=$.extend(addpost,postdata);$("#lui_"+$t.p.id).show();$t.grid.hDiv.loading=true;$.ajax($.extend({url:$t.p.cellurl,data:$.isFunction($t.p.serializeCellData)?$t.p.serializeCellData.call($t,postdata):postdata,type:"POST",complete: function(result,stat){$("#lui_"+$t.p.id).hide();$t.grid.hDiv.loading=false;if(stat=='success'){if($.isFunction($t.p.afterSubmitCell)){var ret=$t.p.afterSubmitCell.call($t,result,postdata.id,nm,v,iRow,iCol);if(ret[0]===true){$(cc).empty();$($t).jqGrid("setCell",$t.rows[iRow].id,iCol,v2,false,false,true);$(cc).addClass("dirty-cell");$($t.rows[iRow]).addClass("edited");if($.isFunction($t.p.afterSaveCell)){$t.p.afterSaveCell.call($t,$t.rows[iRow].id,nm,v,iRow,iCol)}
$t.p.savedRow.splice(0,1)} else{$.jgrid.info_dialog($.jgrid.errors.errcap,ret[1],$.jgrid.edit.bClose);$($t).jqGrid("restoreCell",iRow,iCol)}} else{$(cc).empty();$($t).jqGrid("setCell",$t.rows[iRow].id,iCol,v2,false,false,true);$(cc).addClass("dirty-cell");$($t.rows[iRow]).addClass("edited");if($.isFunction($t.p.afterSaveCell)){$t.p.afterSaveCell.call($t,$t.rows[iRow].id,nm,v,iRow,iCol)}
$t.p.savedRow.splice(0,1)}}},error:function(res,stat){$("#lui_"+$t.p.id).hide();$t.grid.hDiv.loading=false;if($.isFunction($t.p.errorCell)){$t.p.errorCell.call($t,res,stat);$($t).jqGrid("restoreCell",iRow,iCol)} else{$.jgrid.info_dialog($.jgrid.errors.errcap,res.status+" : "+res.statusText+"<br/>"+stat,$.jgrid.edit.bClose);$($t).jqGrid("restoreCell",iRow,iCol)}}},$.jgrid.ajaxOptions,$t.p.ajaxCellOptions||{}))} else{try{$.jgrid.info_dialog($.jgrid.errors.errcap,$.jgrid.errors.nourl,$.jgrid.edit.bClose);$($t).jqGrid("restoreCell",iRow,iCol)} catch(e){}}}
if($t.p.cellsubmit=='clientArray'){$(cc).empty();$($t).jqGrid("setCell",$t.rows[iRow].id,iCol,v2,false,false,true);$(cc).addClass("dirty-cell");$($t.rows[iRow]).addClass("edited");if($.isFunction($t.p.afterSaveCell)){$t.p.afterSaveCell.call($t,$t.rows[iRow].id,nm,v,iRow,iCol)}
$t.p.savedRow.splice(0,1)}} else{try{window.setTimeout(function(){$.jgrid.info_dialog($.jgrid.errors.errcap,v+" "+cv[1],$.jgrid.edit.bClose)},100);$($t).jqGrid("restoreCell",iRow,iCol)} catch(e){}}} else{$($t).jqGrid("restoreCell",iRow,iCol)}}
if($.browser.opera){$("#"+$t.p.knv).attr("tabindex","-1").focus()} else{window.setTimeout(function(){$("#"+$t.p.knv).attr("tabindex","-1").focus()},0)}})},restoreCell: function(iRow,iCol){return this.each(function(){var $t=this,fr;if(!$t.grid||$t.p.cellEdit!==true){return}
if($t.p.savedRow.length>=1){fr=0} else{fr=null}
if(fr!==null){var cc=$("td:eq("+iCol+")",$t.rows[iRow]);if($.isFunction($.fn.datepicker)){try{$("input.hasDatepicker",cc).datepicker('hide')} catch(e){}}
$(cc).empty().attr("tabindex","-1");$($t).jqGrid("setCell",$t.rows[iRow].id,iCol,$t.p.savedRow[fr].v,false,false,true);if($.isFunction($t.p.afterRestoreCell)){$t.p.afterRestoreCell.call($t,$t.rows[iRow].id,$t.p.savedRow[fr].v,iRow,iCol)}
$t.p.savedRow.splice(0,1)}
window.setTimeout(function(){$("#"+$t.p.knv).attr("tabindex","-1").focus()},0)})},nextCell: function(iRow,iCol){return this.each(function(){var $t=this,nCol=false;if(!$t.grid||$t.p.cellEdit!==true){return}
for(var i=iCol+1;i<$t.p.colModel.length;i++){if($t.p.colModel[i].editable===true){nCol=i;break}}
if(nCol!==false){$($t).jqGrid("editCell",iRow,nCol,true)} else{if($t.p.savedRow.length>0){$($t).jqGrid("saveCell",iRow,iCol)}}})},prevCell: function(iRow,iCol){return this.each(function(){var $t=this,nCol=false;if(!$t.grid||$t.p.cellEdit!==true){return}
for(var i=iCol-1;i>=0;i--){if($t.p.colModel[i].editable===true){nCol=i;break}}
if(nCol!==false){$($t).jqGrid("editCell",iRow,nCol,true)} else{if($t.p.savedRow.length>0){$($t).jqGrid("saveCell",iRow,iCol)}}})},GridNav: function(){return this.each(function(){var $t=this;if(!$t.grid||$t.p.cellEdit!==true){return}
$t.p.knv=$t.p.id+"_kn";var selection=$("<span style='width:0px;height:0px;background-color:black;' tabindex='0'><span tabindex='-1' style='width:0px;height:0px;background-color:grey' id='"+$t.p.knv+"'></span></span>"),i,kdir;$(selection).insertBefore($t.grid.cDiv);$("#"+$t.p.knv).focus().keydown(function(e){kdir=e.keyCode;if($t.p.direction=="rtl"){if(kdir==37){kdir=39}
else if(kdir==39){kdir=37}}
switch(kdir){case 38:if($t.p.iRow-1>0){scrollGrid($t.p.iRow-1,$t.p.iCol,'vu');$($t).jqGrid("editCell",$t.p.iRow-1,$t.p.iCol,false)}
break;case 40:if($t.p.iRow+1<=$t.rows.length-1){scrollGrid($t.p.iRow+1,$t.p.iCol,'vd');$($t).jqGrid("editCell",$t.p.iRow+1,$t.p.iCol,false)}
break;case 37:if($t.p.iCol-1>=0){i=findNextVisible($t.p.iCol-1,'lft');scrollGrid($t.p.iRow,i,'h');$($t).jqGrid("editCell",$t.p.iRow,i,false)}
break;case 39:if($t.p.iCol+1<=$t.p.colModel.length-1){i=findNextVisible($t.p.iCol+1,'rgt');scrollGrid($t.p.iRow,i,'h');$($t).jqGrid("editCell",$t.p.iRow,i,false)}
break;case 13:if(parseInt($t.p.iCol,10)>=0&&parseInt($t.p.iRow,10)>=0){$($t).jqGrid("editCell",$t.p.iRow,$t.p.iCol,true)}
break;default:return true}
return false});
function scrollGrid(iR,iC,tp){if(tp.substr(0,1)=='v'){var ch=$($t.grid.bDiv)[0].clientHeight,st=$($t.grid.bDiv)[0].scrollTop,nROT=$t.rows[iR].offsetTop+$t.rows[iR].clientHeight,pROT=$t.rows[iR].offsetTop;if(tp=='vd'){if(nROT>=ch){$($t.grid.bDiv)[0].scrollTop=$($t.grid.bDiv)[0].scrollTop+$t.rows[iR].clientHeight}}
if(tp=='vu'){if(pROT<st){$($t.grid.bDiv)[0].scrollTop=$($t.grid.bDiv)[0].scrollTop-$t.rows[iR].clientHeight}}}
if(tp=='h'){var cw=$($t.grid.bDiv)[0].clientWidth,sl=$($t.grid.bDiv)[0].scrollLeft,nCOL=$t.rows[iR].cells[iC].offsetLeft+$t.rows[iR].cells[iC].clientWidth,pCOL=$t.rows[iR].cells[iC].offsetLeft;if(nCOL>=cw+parseInt(sl,10)){$($t.grid.bDiv)[0].scrollLeft=$($t.grid.bDiv)[0].scrollLeft+$t.rows[iR].cells[iC].clientWidth} else if(pCOL<sl){$($t.grid.bDiv)[0].scrollLeft=$($t.grid.bDiv)[0].scrollLeft-$t.rows[iR].cells[iC].clientWidth}}}
function findNextVisible(iC,act){var ind,i;if(act=='lft'){ind=iC+1;for(i=iC;i>=0;i--){if($t.p.colModel[i].hidden!==true){ind=i;break}}}
if(act=='rgt'){ind=iC-1;for(i=iC;i<$t.p.colModel.length;i++){if($t.p.colModel[i].hidden!==true){ind=i;break}}}
return ind}})},getChangedCells: function(mthd){var ret=[];if(!mthd){mthd='all'}
this.each(function(){var $t=this,nm;if(!$t.grid||$t.p.cellEdit!==true){return}
$($t.rows).each(function(j){var res={};if($(this).hasClass("edited")){$('td',this).each( function(i){nm=$t.p.colModel[i].name;if(nm!=='cb'&&nm!=='subgrid'){if(mthd=='dirty'){if($(this).hasClass('dirty-cell')){try{res[nm]=$.unformat(this,{rowId:$t.rows[j].id,colModel:$t.p.colModel[i]},i)} catch(e){res[nm]=$.jgrid.htmlDecode($(this).html())}}} else{try{res[nm]=$.unformat(this,{rowId:$t.rows[j].id,colModel:$t.p.colModel[i]},i)} catch(e){res[nm]=$.jgrid.htmlDecode($(this).html())}}}});res.id=this.id;ret.push(res)}})});return ret}})})(jQuery);(function($){$.jgrid.extend({setSubGrid: function(){return this.each(function(){var $t=this,cm,suboptions={plusicon:"ui-icon-plus",minusicon:"ui-icon-minus",openicon:"ui-icon-carat-1-sw",expandOnLoad:false,delayOnLoad:50,selectOnExpand:false,reloadOnExpand:true};$t.p.subGridOptions=$.extend(suboptions,$t.p.subGridOptions||{});$t.p.colNames.unshift("");$t.p.colModel.unshift({name:'subgrid',width:$.browser.safari?$t.p.subGridWidth+$t.p.cellLayout:$t.p.subGridWidth,sortable:false,resizable:false,hidedlg:true,search:false,fixed:true});cm=$t.p.subGridModel;if(cm[0]){cm[0].align=$.extend([],cm[0].align||[]);for(var i=0;i<cm[0].name.length;i++){cm[0].align[i]=cm[0].align[i]||'left'}}})},addSubGridCell:function(pos,iRow){var prp='',ic,sid;this.each(function(){prp=this.formatCol(pos,iRow);sid=this.p.id;ic=this.p.subGridOptions.plusicon});return "<td role=\"gridcell\" aria-describedby=\""+sid+"_subgrid\" class=\"ui-sgcollapsed sgcollapsed\" "+prp+"><a href='javascript:void(0);'><span class='ui-icon "+ic+"'></span></a></td>"},addSubGrid: function(pos,sind){return this.each(function(){var ts=this;if(!ts.grid){return}
var subGridCell=function(trdiv,cell,pos){var tddiv=$("<td align='"+ts.p.subGridModel[0].align[pos]+"'></td>").html(cell);$(trdiv).append(tddiv)};var subGridXml=function(sjxml,sbid){var tddiv,i,sgmap,dummy=$("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"),trdiv=$("<tr></tr>");for(i=0;i<ts.p.subGridModel[0].name.length;i++){tddiv=$("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-"+ts.p.direction+"'></th>");$(tddiv).html(ts.p.subGridModel[0].name[i]);$(tddiv).width(ts.p.subGridModel[0].width[i]);$(trdiv).append(tddiv)}
$(dummy).append(trdiv);if(sjxml){sgmap=ts.p.xmlReader.subgrid;$(sgmap.root+" "+sgmap.row,sjxml).each( function(){trdiv=$("<tr class='ui-widget-content ui-subtblcell'></tr>");if(sgmap.repeatitems===true){$(sgmap.cell,this).each( function(i){subGridCell(trdiv,$(this).text()||'&#160;',i)})} else{var f=ts.p.subGridModel[0].mapping||ts.p.subGridModel[0].name;if(f){for(i=0;i<f.length;i++){subGridCell(trdiv,$(f[i],this).text()||'&#160;',i)}}}
$(dummy).append(trdiv)})}
var pID=$("table:first",ts.grid.bDiv).attr("id")+"_";$("#"+pID+sbid).append(dummy);ts.grid.hDiv.loading=false;$("#load_"+ts.p.id).hide();return false};var subGridJson=function(sjxml,sbid){var tddiv,result,i,cur,sgmap,j,dummy=$("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"),trdiv=$("<tr></tr>");for(i=0;i<ts.p.subGridModel[0].name.length;i++){tddiv=$("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-"+ts.p.direction+"'></th>");$(tddiv).html(ts.p.subGridModel[0].name[i]);$(tddiv).width(ts.p.subGridModel[0].width[i]);$(trdiv).append(tddiv)}
$(dummy).append(trdiv);if(sjxml){sgmap=ts.p.jsonReader.subgrid;result=sjxml[sgmap.root];if(typeof result!=='undefined'){for(i=0;i<result.length;i++){cur=result[i];trdiv=$("<tr class='ui-widget-content ui-subtblcell'></tr>");if(sgmap.repeatitems===true){if(sgmap.cell){cur=cur[sgmap.cell]}
for(j=0;j<cur.length;j++){subGridCell(trdiv,cur[j]||'&#160;',j)}} else{var f=ts.p.subGridModel[0].mapping||ts.p.subGridModel[0].name;if(f.length){for(j=0;j<f.length;j++){subGridCell(trdiv,cur[f[j]]||'&#160;',j)}}}
$(dummy).append(trdiv)}}}
var pID=$("table:first",ts.grid.bDiv).attr("id")+"_";$("#"+pID+sbid).append(dummy);ts.grid.hDiv.loading=false;$("#load_"+ts.p.id).hide();return false};var populatesubgrid=function(rd){var sid,dp,i,j;sid=$(rd).attr("id");dp={nd_:(new Date().getTime())};dp[ts.p.prmNames.subgridid]=sid;if(!ts.p.subGridModel[0]){return false}
if(ts.p.subGridModel[0].params){for(j=0;j<ts.p.subGridModel[0].params.length;j++){for(i=0;i<ts.p.colModel.length;i++){if(ts.p.colModel[i].name==ts.p.subGridModel[0].params[j]){dp[ts.p.colModel[i].name]=$("td:eq("+i+")",rd).text().replace(/\&#160\;/ig,'')}}}}
if(!ts.grid.hDiv.loading){ts.grid.hDiv.loading=true;$("#load_"+ts.p.id).show();if(!ts.p.subgridtype){ts.p.subgridtype=ts.p.datatype}
if($.isFunction(ts.p.subgridtype)){ts.p.subgridtype.call(ts,dp)} else{ts.p.subgridtype=ts.p.subgridtype.toLowerCase()}
switch(ts.p.subgridtype){case "xml":case "json":$.ajax($.extend({type:ts.p.mtype,url:ts.p.subGridUrl,dataType:ts.p.subgridtype,data:$.isFunction(ts.p.serializeSubGridData)?ts.p.serializeSubGridData.call(ts,dp):dp,complete: function(sxml){if(ts.p.subgridtype=="xml"){subGridXml(sxml.responseXML,sid)} else{subGridJson($.jgrid.parse(sxml.responseText),sid)}
sxml=null}},$.jgrid.ajaxOptions,ts.p.ajaxSubgridOptions||{}));break}}
return false};var _id,pID,atd,nhc=0,bfsc,r;$.each(ts.p.colModel,function(i,v){if(this.hidden===true||this.name=='rn'||this.name=='cb'){nhc++}});var len=ts.rows.length,i=1;if(sind!==undefined&&sind>0){i=sind;len=sind+1}
while(i<len){if($(ts.rows[i]).hasClass('jqgrow')){$(ts.rows[i].cells[pos]).bind('click', function(e){var tr=$(this).parent("tr")[0];r=tr.nextSibling;if($(this).hasClass("sgcollapsed")){pID=ts.p.id;_id=tr.id;if(ts.p.subGridOptions.reloadOnExpand===true||(ts.p.subGridOptions.reloadOnExpand===false&&!$(r).hasClass('ui-subgrid'))){atd=pos>=1?"<td colspan='"+pos+"'>&#160;</td>":"";bfsc=true;if($.isFunction(ts.p.subGridBeforeExpand)){bfsc=ts.p.subGridBeforeExpand.call(ts,pID+"_"+_id,_id)}
if(bfsc===false){return false}
$(tr).after("<tr role='row' class='ui-subgrid'>"+atd+"<td class='ui-widget-content subgrid-cell'><span class='ui-icon "+ts.p.subGridOptions.openicon+"'></span></td><td colspan='"+parseInt(ts.p.colNames.length-1-nhc,10)+"' class='ui-widget-content subgrid-data'><div id="+pID+"_"+_id+" class='tablediv'></div></td></tr>");if($.isFunction(ts.p.subGridRowExpanded)){ts.p.subGridRowExpanded.call(ts,pID+"_"+_id,_id)} else{populatesubgrid(tr)}} else{$(r).show()}
$(this).html("<a href='javascript:void(0);'><span class='ui-icon "+ts.p.subGridOptions.minusicon+"'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded");if(ts.p.subGridOptions.selectOnExpand){$(ts).jqGrid('setSelection',_id)}} else if($(this).hasClass("sgexpanded")){bfsc=true;if($.isFunction(ts.p.subGridRowColapsed)){_id=tr.id;bfsc=ts.p.subGridRowColapsed.call(ts,pID+"_"+_id,_id)}
if(bfsc===false){return false}
if(ts.p.subGridOptions.reloadOnExpand===true){$(r).remove(".ui-subgrid")} else if($(r).hasClass('ui-subgrid')){$(r).hide()}
$(this).html("<a href='javascript:void(0);'><span class='ui-icon "+ts.p.subGridOptions.plusicon+"'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed")}
return false})}
if(ts.p.subGridOptions.expandOnLoad===true){$(ts.rows[i].cells[pos]).trigger('click')}
i++}
ts.subGridXml=function(xml,sid){subGridXml(xml,sid)};ts.subGridJson=function(json,sid){subGridJson(json,sid)}})},expandSubGridRow: function(rowid){return this.each(function(){var $t=this;if(!$t.grid&&!rowid){return}
if($t.p.subGrid===true){var rc=$(this).jqGrid("getInd",rowid,true);if(rc){var sgc=$("td.sgcollapsed",rc)[0];if(sgc){$(sgc).trigger("click")}}}})},collapseSubGridRow: function(rowid){return this.each(function(){var $t=this;if(!$t.grid&&!rowid){return}
if($t.p.subGrid===true){var rc=$(this).jqGrid("getInd",rowid,true);if(rc){var sgc=$("td.sgexpanded",rc)[0];if(sgc){$(sgc).trigger("click")}}}})},toggleSubGridRow: function(rowid){return this.each(function(){var $t=this;if(!$t.grid&&!rowid){return}
if($t.p.subGrid===true){var rc=$(this).jqGrid("getInd",rowid,true);if(rc){var sgc=$("td.sgcollapsed",rc)[0];if(sgc){$(sgc).trigger("click")} else{sgc=$("td.sgexpanded",rc)[0];if(sgc){$(sgc).trigger("click")}}}}})}})})(jQuery);(function($){$.jgrid.extend({setTreeNode: function(i,len){return this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
var expCol=$t.p.expColInd,expanded=$t.p.treeReader.expanded_field,isLeaf=$t.p.treeReader.leaf_field,level=$t.p.treeReader.level_field,icon=$t.p.treeReader.icon_field,loaded=$t.p.treeReader.loaded,lft,rgt,curLevel,ident,lftpos,twrap,ldat,lf;while(i<len){var ind=$t.rows[i].id,dind=$t.p._index[ind],expan;ldat=$t.p.data[dind];if($t.p.treeGridModel=='nested'){if(!ldat[isLeaf]){lft=parseInt(ldat[$t.p.treeReader.left_field],10);rgt=parseInt(ldat[$t.p.treeReader.right_field],10);ldat[isLeaf]=(rgt===lft+1)?'true':'false';$t.rows[i].cells[$t.p._treeleafpos].innerHTML=ldat[isLeaf]}}
curLevel=parseInt(ldat[level],10);if($t.p.tree_root_level===0){ident=curLevel+1;lftpos=curLevel} else{ident=curLevel;lftpos=curLevel-1}
twrap="<div class='tree-wrap tree-wrap-"+$t.p.direction+"' style='width:"+(ident*18)+"px;'>";twrap+="<div style='"+($t.p.direction=="rtl"?"right:":"left:")+(lftpos*18)+"px;' class='ui-icon ";if(ldat[loaded]!==undefined){if(ldat[loaded]=="true"||ldat[loaded]===true){ldat[loaded]=true} else{ldat[loaded]=false}}
if(ldat[isLeaf]=="true"||ldat[isLeaf]===true){twrap+=((ldat[icon]!==undefined&&ldat[icon]!=="")?ldat[icon]:$t.p.treeIcons.leaf)+" tree-leaf treeclick";ldat[isLeaf]=true;lf="leaf"} else{ldat[isLeaf]=false;lf=""}
ldat[expanded]=((ldat[expanded]=="true"||ldat[expanded]===true)?true:false)&&ldat[loaded];if(ldat[expanded]===false){twrap+=((ldat[isLeaf]===true)?"'":$t.p.treeIcons.plus+" tree-plus treeclick'")} else{twrap+=((ldat[isLeaf]===true)?"'":$t.p.treeIcons.minus+" tree-minus treeclick'")}
twrap+="></div></div>";$($t.rows[i].cells[expCol]).wrapInner("<span class='cell-wrapper"+lf+"'></span>").prepend(twrap);if(curLevel!==parseInt($t.p.tree_root_level,10)){var pn=$($t).jqGrid('getNodeParent',ldat);expan=pn&&pn.hasOwnProperty(expanded)?pn[expanded]:true;if(!expan){$($t.rows[i]).css("display","none")}}
$($t.rows[i].cells[expCol]).find("div.treeclick").bind("click",function(e){var target=e.target||e.srcElement,ind2=$(target,$t.rows).closest("tr.jqgrow")[0].id,pos=$t.p._index[ind2];if(!$t.p.data[pos][isLeaf]){if($t.p.data[pos][expanded]){$($t).jqGrid("collapseRow",$t.p.data[pos]);$($t).jqGrid("collapseNode",$t.p.data[pos])} else{$($t).jqGrid("expandRow",$t.p.data[pos]);$($t).jqGrid("expandNode",$t.p.data[pos])}}
return false});if($t.p.ExpandColClick===true){$($t.rows[i].cells[expCol]).find("span.cell-wrapper").css("cursor","pointer").bind("click",function(e){var target=e.target||e.srcElement,ind2=$(target,$t.rows).closest("tr.jqgrow")[0].id,pos=$t.p._index[ind2];if(!$t.p.data[pos][isLeaf]){if($t.p.data[pos][expanded]){$($t).jqGrid("collapseRow",$t.p.data[pos]);$($t).jqGrid("collapseNode",$t.p.data[pos])} else{$($t).jqGrid("expandRow",$t.p.data[pos]);$($t).jqGrid("expandNode",$t.p.data[pos])}}
$($t).jqGrid("setSelection",ind2);return false})}
i++}})},setTreeGrid: function(){return this.each(function(){var $t=this,i=0,pico,ecol=false,nm,key,dupcols=[];if(!$t.p.treeGrid){return}
if(!$t.p.treedatatype){$.extend($t.p,{treedatatype:$t.p.datatype})}
$t.p.subGrid=false;$t.p.altRows=false;$t.p.pgbuttons=false;$t.p.pginput=false;$t.p.gridview=true;if($t.p.rowTotal===null){$t.p.rowNum=10000}
$t.p.multiselect=false;$t.p.rowList=[];$t.p.expColInd=0;pico='ui-icon-triangle-1-'+($t.p.direction=="rtl"?'w':'e');$t.p.treeIcons=$.extend({plus:pico,minus:'ui-icon-triangle-1-s',leaf:'ui-icon-radio-off'},$t.p.treeIcons||{});if($t.p.treeGridModel=='nested'){$t.p.treeReader=$.extend({level_field:"level",left_field:"lft",right_field:"rgt",leaf_field:"isLeaf",expanded_field:"expanded",loaded:"loaded",icon_field:"icon"},$t.p.treeReader)} else if($t.p.treeGridModel=='adjacency'){$t.p.treeReader=$.extend({level_field:"level",parent_id_field:"parent",leaf_field:"isLeaf",expanded_field:"expanded",loaded:"loaded",icon_field:"icon"},$t.p.treeReader)}
for(key in $t.p.colModel){if($t.p.colModel.hasOwnProperty(key)){nm=$t.p.colModel[key].name;if(nm==$t.p.ExpandColumn&&!ecol){ecol=true;$t.p.expColInd=i}
i++;for(var tkey in $t.p.treeReader){if($t.p.treeReader[tkey]==nm)
dupcols.push(nm)}}}
$.each($t.p.treeReader,function(j,n){if(n&&$.inArray(n,dupcols)===-1){if(j==='leaf_field'){$t.p._treeleafpos=i}
i++;$t.p.colNames.push(n);$t.p.colModel.push({name:n,width:1,hidden:true,sortable:false,resizable:false,hidedlg:true,editable:true,search:false})}})})},expandRow: function(record){this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
var childern=$($t).jqGrid("getNodeChildren",record),expanded=$t.p.treeReader.expanded_field;$(childern).each(function(i){var id=$.jgrid.getAccessor(this,$t.p.localReader.id);$("#"+id,$t.grid.bDiv).css("display","");if(this[expanded]){$($t).jqGrid("expandRow",this)}})})},collapseRow: function(record){this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
var childern=$($t).jqGrid("getNodeChildren",record),expanded=$t.p.treeReader.expanded_field;$(childern).each(function(i){var id=$.jgrid.getAccessor(this,$t.p.localReader.id);$("#"+id,$t.grid.bDiv).css("display","none");if(this[expanded]){$($t).jqGrid("collapseRow",this)}})})},getRootNodes: function(){var result=[];this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
switch($t.p.treeGridModel){case 'nested':var level=$t.p.treeReader.level_field;$($t.p.data).each(function(i){if(parseInt(this[level],10)===parseInt($t.p.tree_root_level,10)){result.push(this)}});break;case 'adjacency':var parent_id=$t.p.treeReader.parent_id_field;$($t.p.data).each(function(i){if(this[parent_id]===null||String(this[parent_id]).toLowerCase()=="null"){result.push(this)}});break}});return result},getNodeDepth: function(rc){var ret=null;this.each(function(){if(!this.grid||!this.p.treeGrid){return}
var $t=this;switch($t.p.treeGridModel){case 'nested':var level=$t.p.treeReader.level_field;ret=parseInt(rc[level],10)-parseInt($t.p.tree_root_level,10);break;case 'adjacency':ret=$($t).jqGrid("getNodeAncestors",rc).length;break}});return ret},getNodeParent: function(rc){var result=null;this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
switch($t.p.treeGridModel){case 'nested':var lftc=$t.p.treeReader.left_field,rgtc=$t.p.treeReader.right_field,levelc=$t.p.treeReader.level_field,lft=parseInt(rc[lftc],10),rgt=parseInt(rc[rgtc],10),level=parseInt(rc[levelc],10);$(this.p.data).each(function(){if(parseInt(this[levelc],10)===level-1&&parseInt(this[lftc],10)<lft&&parseInt(this[rgtc],10)>rgt){result=this;return false}});break;case 'adjacency':var parent_id=$t.p.treeReader.parent_id_field,dtid=$t.p.localReader.id;$(this.p.data).each(function(i,val){if(this[dtid]==rc[parent_id]){result=this;return false}});break}});return result},getNodeChildren: function(rc){var result=[];this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
switch($t.p.treeGridModel){case 'nested':var lftc=$t.p.treeReader.left_field,rgtc=$t.p.treeReader.right_field,levelc=$t.p.treeReader.level_field,lft=parseInt(rc[lftc],10),rgt=parseInt(rc[rgtc],10),level=parseInt(rc[levelc],10);$(this.p.data).each(function(i){if(parseInt(this[levelc],10)===level+1&&parseInt(this[lftc],10)>lft&&parseInt(this[rgtc],10)<rgt){result.push(this)}});break;case 'adjacency':var parent_id=$t.p.treeReader.parent_id_field,dtid=$t.p.localReader.id;$(this.p.data).each(function(i,val){if(this[parent_id]==rc[dtid]){result.push(this)}});break}});return result},getFullTreeNode: function(rc){var result=[];this.each(function(){var $t=this,len;if(!$t.grid||!$t.p.treeGrid){return}
switch($t.p.treeGridModel){case 'nested':var lftc=$t.p.treeReader.left_field,rgtc=$t.p.treeReader.right_field,levelc=$t.p.treeReader.level_field,lft=parseInt(rc[lftc],10),rgt=parseInt(rc[rgtc],10),level=parseInt(rc[levelc],10);$(this.p.data).each(function(i){if(parseInt(this[levelc],10)>=level&&parseInt(this[lftc],10)>=lft&&parseInt(this[lftc],10)<=rgt){result.push(this)}});break;case 'adjacency':if(rc){result.push(rc);var parent_id=$t.p.treeReader.parent_id_field,dtid=$t.p.localReader.id;$(this.p.data).each(function(i){len=result.length;for(i=0;i<len;i++){if(result[i][dtid]==this[parent_id]){result.push(this);break}}})}
break}});return result},getNodeAncestors: function(rc){var ancestors=[];this.each(function(){if(!this.grid||!this.p.treeGrid){return}
var parent=$(this).jqGrid("getNodeParent",rc);while(parent){ancestors.push(parent);parent=$(this).jqGrid("getNodeParent",parent)}});return ancestors},isVisibleNode: function(rc){var result=true;this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
var ancestors=$($t).jqGrid("getNodeAncestors",rc),expanded=$t.p.treeReader.expanded_field;$(ancestors).each(function(){result=result&&this[expanded];if(!result){return false}})});return result},isNodeLoaded: function(rc){var result;this.each(function(){var $t=this;if(!$t.grid||!$t.p.treeGrid){return}
var isLeaf=$t.p.treeReader.leaf_field;if(rc!==undefined){if(rc.loaded!==undefined){result=rc.loaded} else if(rc[isLeaf]||$($t).jqGrid("getNodeChildren",rc).length>0){result=true} else{result=false}} else{result=false}});return result},expandNode: function(rc){return this.each(function(){if(!this.grid||!this.p.treeGrid){return}
var expanded=this.p.treeReader.expanded_field,parent=this.p.treeReader.parent_id_field,loaded=this.p.treeReader.loaded,level=this.p.treeReader.level_field,lft=this.p.treeReader.left_field,rgt=this.p.treeReader.right_field;if(!rc[expanded]){var id=$.jgrid.getAccessor(rc,this.p.localReader.id);var rc1=$("#"+id,this.grid.bDiv)[0];var position=this.p._index[id];if($(this).jqGrid("isNodeLoaded",this.p.data[position])){rc[expanded]=true;$("div.treeclick",rc1).removeClass(this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.minus+" tree-minus")} else{rc[expanded]=true;$("div.treeclick",rc1).removeClass(this.p.treeIcons.plus+" tree-plus").addClass(this.p.treeIcons.minus+" tree-minus");this.p.treeANode=rc1.rowIndex;this.p.datatype=this.p.treedatatype;if(this.p.treeGridModel=='nested'){$(this).jqGrid("setGridParam",{postData:{nodeid:id,n_left:rc[lft],n_right:rc[rgt],n_level:rc[level]}})} else{$(this).jqGrid("setGridParam",{postData:{nodeid:id,parentid:rc[parent],n_level:rc[level]}})}
$(this).trigger("reloadGrid");rc[loaded]=true;if(this.p.treeGridModel=='nested'){$(this).jqGrid("setGridParam",{postData:{nodeid:'',n_left:'',n_right:'',n_level:''}})} else{$(this).jqGrid("setGridParam",{postData:{nodeid:'',parentid:'',n_level:''}})}}}})},collapseNode: function(rc){return this.each(function(){if(!this.grid||!this.p.treeGrid){return}
var expanded=this.p.treeReader.expanded_field;if(rc[expanded]){rc[expanded]=false;var id=$.jgrid.getAccessor(rc,this.p.localReader.id);var rc1=$("#"+id,this.grid.bDiv)[0];$("div.treeclick",rc1).removeClass(this.p.treeIcons.minus+" tree-minus").addClass(this.p.treeIcons.plus+" tree-plus")}})},SortTree: function(sortname,newDir,st,datefmt){return this.each(function(){if(!this.grid||!this.p.treeGrid){return}
var i,len,rec,records=[],$t=this,query,roots,rt=$(this).jqGrid("getRootNodes");query=$.jgrid.from(rt);query.orderBy(sortname,newDir,st,datefmt);roots=query.select();for(i=0,len=roots.length;i<len;i++){rec=roots[i];records.push(rec);$(this).jqGrid("collectChildrenSortTree",records,rec,sortname,newDir,st,datefmt)}
$.each(records, function(index,row){var id=$.jgrid.getAccessor(this,$t.p.localReader.id);$('#'+$t.p.id+' tbody tr:eq('+index+')').after($('tr#'+id,$t.grid.bDiv))});query=null;roots=null;records=null})},collectChildrenSortTree: function(records,rec,sortname,newDir,st,datefmt){return this.each(function(){if(!this.grid||!this.p.treeGrid){return}
var i,len,child,ch,query,children;ch=$(this).jqGrid("getNodeChildren",rec);query=$.jgrid.from(ch);query.orderBy(sortname,newDir,st,datefmt);children=query.select();for(i=0,len=children.length;i<len;i++){child=children[i];records.push(child);$(this).jqGrid("collectChildrenSortTree",records,child,sortname,newDir,st,datefmt)}})},setTreeRow: function(rowid,data){var success=false;this.each(function(){var t=this;if(!t.grid||!t.p.treeGrid){return}
success=$(t).jqGrid("setRowData",rowid,data)});return success},delTreeNode: function(rowid){return this.each(function(){var $t=this,rid=$t.p.localReader.id,left=$t.p.treeReader.left_field,right=$t.p.treeReader.right_field,myright,width,res,key;if(!$t.grid||!$t.p.treeGrid){return}
var rc=$t.p._index[rowid];if(rc!==undefined){myright=parseInt($t.p.data[rc][right],10);width=myright-parseInt($t.p.data[rc][left],10)+1;var dr=$($t).jqGrid("getFullTreeNode",$t.p.data[rc]);if(dr.length>0){for(var i=0;i<dr.length;i++){$($t).jqGrid("delRowData",dr[i][rid])}}
if($t.p.treeGridModel==="nested"){res=$.jgrid.from($t.p.data).greater(left,myright,{stype:'integer'}).select();if(res.length){for(key in res){res[key][left]=parseInt(res[key][left],10)-width }}
res=$.jgrid.from($t.p.data).greater(right,myright,{stype:'integer'}).select();if(res.length){for(key in res){res[key][right]=parseInt(res[key][right],10)-width }}}}})},addChildNode: function(nodeid,parentid,data){var $t=this[0];if(data){var expanded=$t.p.treeReader.expanded_field,isLeaf=$t.p.treeReader.leaf_field,level=$t.p.treeReader.level_field,icon=$t.p.treeReader.icon_field,parent=$t.p.treeReader.parent_id_field,left=$t.p.treeReader.left_field,right=$t.p.treeReader.right_field,loaded=$t.p.treeReader.loaded,method,parentindex,parentdata,parentlevel,i,len,max=0,rowind=parentid,leaf,maxright;if(typeof nodeid==='undefined'||nodeid===null){i=$t.p.data.length-1;if(i>=0){while(i>=0){max=Math.max(max,parseInt($t.p.data[i][$t.p.localReader.id],10));i--}}
nodeid=max+1}
var prow=$($t).jqGrid('getInd',parentid);leaf=false;if(parentid===undefined||parentid===null||parentid===""){parentid=null;rowind=null;method='last';parentlevel=$t.p.tree_root_level;i=$t.p.data.length+1} else{method='after';parentindex=$t.p._index[parentid];parentdata=$t.p.data[parentindex];parentid=parentdata[$t.p.localReader.id];parentlevel=parseInt(parentdata[level],10)+1;var childs=$($t).jqGrid('getFullTreeNode',parentdata);if(childs.length){i=childs[childs.length-1][$t.p.localReader.id];rowind=i;i=$($t).jqGrid('getInd',rowind)+1} else{i=$($t).jqGrid('getInd',parentid)+1}
if(parentdata[isLeaf]){leaf=true;parentdata[expanded]=true;$($t.rows[prow]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass($t.p.treeIcons.leaf+" tree-leaf").addClass($t.p.treeIcons.minus+" tree-minus");$t.p.data[parentindex][isLeaf]=false;parentdata[loaded]=true}}
len=i+1;data[expanded]=false;data[loaded]=true;data[level]=parentlevel;data[isLeaf]=true;if($t.p.treeGridModel==="adjacency"){data[parent]=parentid}
if($t.p.treeGridModel==="nested"){var query,res,key;if(parentid!==null){maxright=parseInt(parentdata[right],10);query=$.jgrid.from($t.p.data);query=query.greaterOrEquals(right,maxright,{stype:'integer'});res=query.select();if(res.length){for(key in res){res[key][left]=res[key][left]>maxright?parseInt(res[key][left],10)+2:res[key][left];res[key][right]=res[key][right]>=maxright?parseInt(res[key][right],10)+2:res[key][right]}}
data[left]=maxright;data[right]=maxright+1} else{maxright=parseInt($($t).jqGrid('getCol',right,false,'max'),10);res=$.jgrid.from($t.p.data).greater(left,maxright,{stype:'integer'}).select();if(res.length){for(key in res){res[key][left]=parseInt(res[key][left],10)+2 }}
res=$.jgrid.from($t.p.data).greater(right,maxright,{stype:'integer'}).select();if(res.length){for(key in res){res[key][right]=parseInt(res[key][right],10)+2 }}
data[left]=maxright+1;data[right]=maxright+2}}
if(parentid===null||$($t).jqGrid("isNodeLoaded",parentdata)||leaf){$($t).jqGrid('addRowData',nodeid,data,method,rowind);$($t).jqGrid('setTreeNode',i,len)}
if(parentdata&&!parentdata[expanded]){$($t.rows[prow]).find("div.treeclick").click()}}}})})(jQuery);(function($){$.jgrid.extend({groupingSetup: function(){return this.each(function(){var $t=this,grp=$t.p.groupingView;if(grp!==null&&((typeof grp==='object')||$.isFunction(grp))){if(!grp.groupField.length){$t.p.grouping=false} else{if(typeof(grp.visibiltyOnNextGrouping)=='undefined'){grp.visibiltyOnNextGrouping=[]}
for(var i=0;i<grp.groupField.length;i++){if(!grp.groupOrder[i]){grp.groupOrder[i]='asc'}
if(!grp.groupText[i]){grp.groupText[i]='{0}'}
if(typeof(grp.groupColumnShow[i])!='boolean'){grp.groupColumnShow[i]=true}
if(typeof(grp.groupSummary[i])!='boolean'){grp.groupSummary[i]=false}
if(grp.groupColumnShow[i]===true){grp.visibiltyOnNextGrouping[i]=true;$($t).jqGrid('showCol',grp.groupField[i])} else{grp.visibiltyOnNextGrouping[i]=$("#"+$t.p.id+"_"+grp.groupField[i]).is(":visible");$($t).jqGrid('hideCol',grp.groupField[i])}
grp.sortitems[i]=[];grp.sortnames[i]=[];grp.summaryval[i]=[];if(grp.groupSummary[i]){grp.summary[i]=[];var cm=$t.p.colModel;for(var j=0,cml=cm.length;j<cml;j++){if(cm[j].summaryType){grp.summary[i].push({nm:cm[j].name,st:cm[j].summaryType,v:''})}}}}
$t.p.scroll=false;$t.p.rownumbers=false;$t.p.subGrid=false;$t.p.treeGrid=false;$t.p.gridview=true}} else{$t.p.grouping=false}})},groupingPrepare: function(rData,items,gdata,record){this.each(function(){items[0]+="";var itm=items[0].toString().split(' ').join('');var grp=this.p.groupingView,$t=this;if(gdata.hasOwnProperty(itm)){gdata[itm].push(rData)} else{gdata[itm]=[];gdata[itm].push(rData);grp.sortitems[0].push(itm);grp.sortnames[0].push($.trim(items[0].toString()));grp.summaryval[0][itm]=$.extend(true,[],grp.summary[0])}
if(grp.groupSummary[0]){$.each(grp.summaryval[0][itm],function(){if($.isFunction(this.st)){this.v=this.st.call($t,this.v,this.nm,record)} else{this.v=$($t).jqGrid('groupingCalculations.'+this.st,this.v,this.nm,record)}})}});return gdata},groupingToggle: function(hid){this.each(function(){var $t=this,grp=$t.p.groupingView,strpos=hid.lastIndexOf('_'),uid=hid.substring(0,strpos+1),num=parseInt(hid.substring(strpos+1),10)+1,minus=grp.minusicon,plus=grp.plusicon,tar=$("#"+hid),r=tar.length?tar[0].nextSibling:null,tarspan=$("#"+hid+" span."+"tree-wrap-"+$t.p.direction),collapsed=false;if(tarspan.hasClass(minus)){if(grp.showSummaryOnHide&&grp.groupSummary[0]){if(r){while(r){if($(r).hasClass('jqfoot')){break}
$(r).hide();r=r.nextSibling}}} else{if(r){while(r){if($(r).attr('id')==uid+String(num)){break}
$(r).hide();r=r.nextSibling}}}
tarspan.removeClass(minus).addClass(plus);collapsed=true} else{if(r){while(r){if($(r).attr('id')==uid+String(num)){break}
$(r).show();r=r.nextSibling}}
tarspan.removeClass(plus).addClass(minus)}
if($.isFunction($t.p.onClickGroup)){$t.p.onClickGroup.call($t,hid,collapsed)}});return false},groupingRender: function(grdata,colspans){return this.each(function(){var $t=this,grp=$t.p.groupingView,str="",icon="",hid,pmrtl=grp.groupCollapse?grp.plusicon:grp.minusicon,gv,cp,ii;if(!grp.groupDataSorted){grp.sortitems[0].sort();grp.sortnames[0].sort();if(grp.groupOrder[0].toLowerCase()=='desc'){grp.sortitems[0].reverse();grp.sortnames[0].reverse()}}
pmrtl+=" tree-wrap-"+$t.p.direction;ii=0;while(ii<colspans){if($t.p.colModel[ii].name==grp.groupField[0]){cp=ii;break}
ii++}
$.each(grp.sortitems[0],function(i,n){hid=$t.p.id+"ghead_"+i;icon="<span style='cursor:pointer;' class='ui-icon "+pmrtl+"' onclick=\"jQuery('#"+$t.p.id+"').jqGrid('groupingToggle','"+hid+"');return false;\"></span>";try{gv=$t.formatter(hid,grp.sortnames[0][i],cp,grp.sortitems[0])} catch(egv){gv=grp.sortnames[0][i]}
str+="<tr id=\""+hid+"\" role=\"row\" class= \"ui-widget-content jqgroup ui-row-"+$t.p.direction+"\"><td colspan=\""+colspans+"\">"+icon+$.jgrid.format(grp.groupText[0],gv,grdata[n].length)+"</td></tr>";for(var kk=0;kk<grdata[n].length;kk++){str+=grdata[n][kk].join('')}
if(grp.groupSummary[0]){var hhdr="";if(grp.groupCollapse&&!grp.showSummaryOnHide){hhdr=" style=\"display:none;\""}
str+="<tr"+hhdr+" role=\"row\" class=\"ui-widget-content jqfoot ui-row-"+$t.p.direction+"\">";var fdata=grp.summaryval[0][n],cm=$t.p.colModel,vv,grlen=grdata[n].length;for(var k=0;k<colspans;k++){var tmpdata="<td "+$t.formatCol(k,1,'')+">&#160;</td>",tplfld="{0}";$.each(fdata,function(){if(this.nm==cm[k].name){if(cm[k].summaryTpl){tplfld=cm[k].summaryTpl}
if(this.st=='avg'){if(this.v&&grlen>0){this.v=(this.v/grlen)}}
try{vv=$t.formatter('',this.v,k,this)} catch(ef){vv=this.v}
tmpdata="<td "+$t.formatCol(k,1,'')+">"+$.jgrid.format(tplfld,vv)+"</td>";return false}});str+=tmpdata}
str+="</tr>"}});$("#"+$t.p.id+" tbody:first").append(str);str=null})},groupingGroupBy: function(name,options){return this.each(function(){var $t=this;if(typeof(name)=="string"){name=[name]}
var grp=$t.p.groupingView;$t.p.grouping=true;if(typeof grp.visibiltyOnNextGrouping=="undefined"){grp.visibiltyOnNextGrouping=[]}
var i;for(i=0;i<grp.groupField.length;i++){if(!grp.groupColumnShow[i]&&grp.visibiltyOnNextGrouping[i]){$($t).jqGrid('showCol',grp.groupField[i])}}
for(i=0;i<name.length;i++){grp.visibiltyOnNextGrouping[i]=$("#"+$t.p.id+"_"+name[i]).is(":visible")}
$t.p.groupingView=$.extend($t.p.groupingView,options||{});grp.groupField=name;$($t).trigger("reloadGrid")})},groupingRemove: function(current){return this.each(function(){var $t=this;if(typeof(current)=='undefined'){current=true}
$t.p.grouping=false;if(current===true){var grp=$t.p.groupingView;for(var i=0;i<grp.groupField.length;i++){if(!grp.groupColumnShow[i]&&grp.visibiltyOnNextGrouping[i]){$($t).jqGrid('showCol',grp.groupField)}}
$("tr.jqgroup, tr.jqfoot","#"+$t.p.id+" tbody:first").remove();$("tr.jqgrow:hidden","#"+$t.p.id+" tbody:first").show()} else{$($t).trigger("reloadGrid")}})},groupingCalculations:{"sum": function(v,field,rc){return parseFloat(v||0)+parseFloat((rc[field]||0))},"min": function(v,field,rc){if(v===""){return parseFloat(rc[field]||0)}
return Math.min(parseFloat(v),parseFloat(rc[field]||0))},"max": function(v,field,rc){if(v===""){return parseFloat(rc[field]||0)}
return Math.max(parseFloat(v),parseFloat(rc[field]||0))},"count": function(v,field,rc){if(v===""){v=0}
if(rc.hasOwnProperty(field)){return v+1} else{return 0}},"avg": function(v,field,rc){return parseFloat(v||0)+parseFloat((rc[field]||0))}}})})(jQuery);(function($){$.jgrid.extend({jqGridImport: function(o){o=$.extend({imptype:"xml",impstring:"",impurl:"",mtype:"GET",impData:{},xmlGrid:{config:"roots>grid",data:"roots>rows"},jsonGrid:{config:"grid",data:"data"},ajaxOptions:{}},o||{});return this.each(function(){var $t=this;var XmlConvert=function(xml,o){var cnfg=$(o.xmlGrid.config,xml)[0];var xmldata=$(o.xmlGrid.data,xml)[0],jstr,jstr1;if(xmlJsonClass.xml2json&&$.jgrid.parse){jstr=xmlJsonClass.xml2json(cnfg," ");jstr=$.jgrid.parse(jstr);for(var key in jstr){if(jstr.hasOwnProperty(key)){jstr1=jstr[key]}}
if(xmldata){var svdatatype=jstr.grid.datatype;jstr.grid.datatype='xmlstring';jstr.grid.datastr=xml;$($t).jqGrid(jstr1).jqGrid("setGridParam",{datatype:svdatatype})} else{$($t).jqGrid(jstr1)}
jstr=null;jstr1=null} else{alert("xml2json or parse are not present")}};var JsonConvert=function(jsonstr,o){if(jsonstr&&typeof jsonstr=='string'){var json=$.jgrid.parse(jsonstr);var gprm=json[o.jsonGrid.config];var jdata=json[o.jsonGrid.data];if(jdata){var svdatatype=gprm.datatype;gprm.datatype='jsonstring';gprm.datastr=jdata;$($t).jqGrid(gprm).jqGrid("setGridParam",{datatype:svdatatype})} else{$($t).jqGrid(gprm)}}};switch(o.imptype){case 'xml':$.ajax($.extend({url:o.impurl,type:o.mtype,data:o.impData,dataType:"xml",complete: function(xml,stat){if(stat=='success'){XmlConvert(xml.responseXML,o);if($.isFunction(o.importComplete)){o.importComplete(xml)}}
xml=null}},o.ajaxOptions));break;case 'xmlstring':if(o.impstring&&typeof o.impstring=='string'){var xmld=$.jgrid.stringToDoc(o.impstring);if(xmld){XmlConvert(xmld,o);if($.isFunction(o.importComplete)){o.importComplete(xmld)}
o.impstring=null}
xmld=null}
break;case 'json':$.ajax($.extend({url:o.impurl,type:o.mtype,data:o.impData,dataType:"json",complete: function(json,stat){if(stat=='success'){JsonConvert(json.responseText,o);if($.isFunction(o.importComplete)){o.importComplete(json)}}
json=null}},o.ajaxOptions));break;case 'jsonstring':if(o.impstring&&typeof o.impstring=='string'){JsonConvert(o.impstring,o);if($.isFunction(o.importComplete)){o.importComplete(o.impstring)}
o.impstring=null}
break}})},jqGridExport: function(o){o=$.extend({exptype:"xmlstring",root:"grid",ident:"\t"},o||{});var ret=null;this.each(function(){if(!this.grid){return}
var gprm=$.extend({},$(this).jqGrid("getGridParam"));if(gprm.rownumbers){gprm.colNames.splice(0,1);gprm.colModel.splice(0,1)}
if(gprm.multiselect){gprm.colNames.splice(0,1);gprm.colModel.splice(0,1)}
if(gprm.subGrid){gprm.colNames.splice(0,1);gprm.colModel.splice(0,1)}
gprm.knv=null;if(gprm.treeGrid){for(var key in gprm.treeReader){if(gprm.treeReader.hasOwnProperty(key)){gprm.colNames.splice(gprm.colNames.length-1);gprm.colModel.splice(gprm.colModel.length-1)}}}
switch(o.exptype){case 'xmlstring':ret="<"+o.root+">"+xmlJsonClass.json2xml(gprm,o.ident)+"</"+o.root+">";break;case 'jsonstring':ret="{"+xmlJsonClass.toJson(gprm,o.root,o.ident,false)+"}";if(gprm.postData.filters!==undefined){ret=ret.replace(/filters":"/,'filters":');ret=ret.replace(/}]}"/,'}]}')}
break}});return ret},excelExport: function(o){o=$.extend({exptype:"remote",url:null,oper:"oper",tag:"excel",exportOptions:{}},o||{});return this.each(function(){if(!this.grid){return}
var url;if(o.exptype=="remote"){var pdata=$.extend({},this.p.postData);pdata[o.oper]=o.tag;var params=jQuery.param(pdata);if(o.url.indexOf("?")!=-1){url=o.url+"&"+params}
else{url=o.url+"?"+params}
window.location=url}})}})})(jQuery);(function($){if($.browser.msie&&$.browser.version==8){$.expr[":"].hidden=function(elem){return elem.offsetWidth===0||elem.offsetHeight===0||elem.style.display=="none"}}
$.jgrid._multiselect=false;if($.ui){if($.ui.multiselect){if($.ui.multiselect.prototype._setSelected){var setSelected=$.ui.multiselect.prototype._setSelected;$.ui.multiselect.prototype._setSelected=function(item,selected){var ret=setSelected.call(this,item,selected);if(selected&&this.selectedList){var elt=this.element;this.selectedList.find('li').each(function(){if($(this).data('optionLink')){$(this).data('optionLink').remove().appendTo(elt)}})}
return ret}}
if($.ui.multiselect.prototype.destroy){$.ui.multiselect.prototype.destroy=function(){this.element.show();this.container.remove();if($.Widget===undefined){$.widget.prototype.destroy.apply(this,arguments)} else{$.Widget.prototype.destroy.apply(this,arguments)}}}
$.jgrid._multiselect=true}}
$.jgrid.extend({sortableColumns: function(tblrow){return this.each(function(){var ts=this,tid=ts.p.id;
function start(){ts.p.disableClick=true}
var sortable_opts={"tolerance":"pointer","axis":"x","scrollSensitivity":"1","items":'>th:not(:has(#jqgh_'+tid+'_cb'+',#jqgh_'+tid+'_rn'+',#jqgh_'+tid+'_subgrid),:hidden)',"placeholder":{element: function(item){var el=$(document.createElement(item[0].nodeName)).addClass(item[0].className+" ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0];return el},update: function(self,p){p.height(self.currentItem.innerHeight()-parseInt(self.currentItem.css('paddingTop')||0,10)-parseInt(self.currentItem.css('paddingBottom')||0,10));p.width(self.currentItem.innerWidth()-parseInt(self.currentItem.css('paddingLeft')||0,10)-parseInt(self.currentItem.css('paddingRight')||0,10))}},"update": function(event,ui){var p=$(ui.item).parent(),th=$(">th",p),colModel=ts.p.colModel,cmMap={},tid=ts.p.id+"_";$.each(colModel, function(i){cmMap[this.name]=i});var permutation=[];th.each(function(i){var id=$(">div",this).get(0).id.replace(/^jqgh_/,"").replace(tid,"");if(id in cmMap){permutation.push(cmMap[id])}});$(ts).jqGrid("remapColumns",permutation,true,true);if($.isFunction(ts.p.sortable.update)){ts.p.sortable.update(permutation)}
setTimeout(function(){ts.p.disableClick=false},50)}};if(ts.p.sortable.options){$.extend(sortable_opts,ts.p.sortable.options)} else if($.isFunction(ts.p.sortable)){ts.p.sortable={"update":ts.p.sortable}}
if(sortable_opts.start){var s=sortable_opts.start;sortable_opts.start=function(e,ui){start();s.call(this,e,ui)}} else{sortable_opts.start=start}
if(ts.p.sortable.exclude){sortable_opts.items+=":not("+ts.p.sortable.exclude+")"}
tblrow.sortable(sortable_opts).data("sortable").floating=true})},columnChooser: function(opts){var self=this;if($("#colchooser_"+self[0].p.id).length){return}
var selector=$('<div id="colchooser_'+self[0].p.id+'" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>');var select=$('select',selector);
function insert(perm,i,v){if(i>=0){var a=perm.slice();var b=a.splice(i,Math.max(perm.length-i,i));if(i>perm.length){i=perm.length}
a[i]=v;return a.concat(b)}}
opts=$.extend({"width":420,"height":240,"classname":null,"done": function(perm){if(perm){self.jqGrid("remapColumns",perm,true)}},"msel":"multiselect","dlog":"dialog","dlog_opts": function(opts){var buttons={};buttons[opts.bSubmit]=function(){opts.apply_perm();opts.cleanup(false)};buttons[opts.bCancel]=function(){opts.cleanup(true)};return{"buttons":buttons,"close": function(){opts.cleanup(true)},"modal":opts.modal?opts.modal:false,"resizable":opts.resizable?opts.resizable:true,"width":opts.width+20}},"apply_perm": function(){$('option',select).each(function(i){if(this.selected){self.jqGrid("showCol",colModel[this.value].name)} else{self.jqGrid("hideCol",colModel[this.value].name)}});var perm=[];$('option:selected',select).each(function(){perm.push(parseInt(this.value,10))});$.each(perm, function(){delete colMap[colModel[parseInt(this,10)].name]});$.each(colMap, function(){var ti=parseInt(this,10);perm=insert(perm,ti,ti)});if(opts.done){opts.done.call(self,perm)}},"cleanup": function(calldone){call(opts.dlog,selector,'destroy');call(opts.msel,select,'destroy');selector.remove();if(calldone&&opts.done){opts.done.call(self)}},"msel_opts":{}},$.jgrid.col,opts||{});if($.ui){if($.ui.multiselect){if(opts.msel=="multiselect"){if(!$.jgrid._multiselect){alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");return}
opts.msel_opts=$.extend($.ui.multiselect.defaults,opts.msel_opts)}}}
if(opts.caption){selector.attr("title",opts.caption)}
if(opts.classname){selector.addClass(opts.classname);select.addClass(opts.classname)}
if(opts.width){$(">div",selector).css({"width":opts.width,"margin":"0 auto"});select.css("width",opts.width)}
if(opts.height){$(">div",selector).css("height",opts.height);select.css("height",opts.height-10)}
var colModel=self.jqGrid("getGridParam","colModel");var colNames=self.jqGrid("getGridParam","colNames");var colMap={},fixedCols=[];select.empty();$.each(colModel, function(i){colMap[this.name]=i;if(this.hidedlg){if(!this.hidden){fixedCols.push(i)}
return}
select.append("<option value='"+i+"' "+(this.hidden?"":"selected='selected'")+">"+colNames[i]+"</option>")});
function call(fn,obj){if(!fn){return}
if(typeof fn=='string'){if($.fn[fn]){$.fn[fn].apply(obj,$.makeArray(arguments).slice(2))}} else if($.isFunction(fn)){fn.apply(obj,$.makeArray(arguments).slice(2))}}
var dopts=$.isFunction(opts.dlog_opts)?opts.dlog_opts.call(self,opts):opts.dlog_opts;call(opts.dlog,selector,dopts);var mopts=$.isFunction(opts.msel_opts)?opts.msel_opts.call(self,opts):opts.msel_opts;call(opts.msel,select,mopts)},sortableRows: function(opts){return this.each(function(){var $t=this;if(!$t.grid){return}
if($t.p.treeGrid){return}
if($.fn.sortable){opts=$.extend({"cursor":"move","axis":"y","items":".jqgrow"},opts||{});if(opts.start&&$.isFunction(opts.start)){opts._start_=opts.start;delete opts.start} else{opts._start_=false}
if(opts.update&&$.isFunction(opts.update)){opts._update_=opts.update;delete opts.update} else{opts._update_=false}
opts.start=function(ev,ui){$(ui.item).css("border-width","0px");$("td",ui.item).each(function(i){this.style.width=$t.grid.cols[i].style.width});if($t.p.subGrid){var subgid=$(ui.item).attr("id");try{$($t).jqGrid('collapseSubGridRow',subgid)} catch(e){}}
if(opts._start_){opts._start_.apply(this,[ev,ui])}};opts.update=function(ev,ui){$(ui.item).css("border-width","");if($t.p.rownumbers===true){$("td.jqgrid-rownum",$t.rows).each(function(i){$(this).html(i+1+(parseInt($t.p.page,10)-1)*parseInt($t.p.rowNum,10))})}
if(opts._update_){opts._update_.apply(this,[ev,ui])}};$("tbody:first",$t).sortable(opts);$("tbody:first",$t).disableSelection()}})},gridDnD: function(opts){return this.each(function(){var $t=this;if(!$t.grid){return}
if($t.p.treeGrid){return}
if(!$.fn.draggable||!$.fn.droppable){return}
function updateDnD(){var datadnd=$.data($t,"dnd");$("tr.jqgrow:not(.ui-draggable)",$t).draggable($.isFunction(datadnd.drag)?datadnd.drag.call($($t),datadnd):datadnd.drag)}
var appender="<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";if($("#jqgrid_dnd").html()===null){$('body').append(appender)}
if(typeof opts=='string'&&opts=='updateDnD'&&$t.p.jqgdnd===true){updateDnD();return}
opts=$.extend({"drag": function(opts){return $.extend({start: function(ev,ui){if($t.p.subGrid){var subgid=$(ui.helper).attr("id");try{$($t).jqGrid('collapseSubGridRow',subgid)} catch(e){}}
for(var i=0;i<$.data($t,"dnd").connectWith.length;i++){if($($.data($t,"dnd").connectWith[i]).jqGrid('getGridParam','reccount')=="0"){$($.data($t,"dnd").connectWith[i]).jqGrid('addRowData','jqg_empty_row',{})}}
ui.helper.addClass("ui-state-highlight");$("td",ui.helper).each(function(i){this.style.width=$t.grid.headers[i].width+"px"});if(opts.onstart&&$.isFunction(opts.onstart)){opts.onstart.call($($t),ev,ui)}},stop:function(ev,ui){if(ui.helper.dropped&&!opts.dragcopy){var ids=$(ui.helper).attr("id");$($t).jqGrid('delRowData',ids)}
for(var i=0;i<$.data($t,"dnd").connectWith.length;i++){$($.data($t,"dnd").connectWith[i]).jqGrid('delRowData','jqg_empty_row')}
if(opts.onstop&&$.isFunction(opts.onstop)){opts.onstop.call($($t),ev,ui)}}},opts.drag_opts||{})},"drop": function(opts){return $.extend({accept: function(d){if(!$(d).hasClass('jqgrow')){return d}
var tid=$(d).closest("table.ui-jqgrid-btable");if(tid.length>0&&$.data(tid[0],"dnd")!==undefined){var cn=$.data(tid[0],"dnd").connectWith;return $.inArray('#'+this.id,cn)!=-1?true:false}
return false},drop: function(ev,ui){if(!$(ui.draggable).hasClass('jqgrow')){return}
var accept=$(ui.draggable).attr("id");var getdata=ui.draggable.parent().parent().jqGrid('getRowData',accept);if(!opts.dropbyname){var j=0,tmpdata={},dropname;var dropmodel=$("#"+this.id).jqGrid('getGridParam','colModel');try{for(var key in getdata){if(getdata.hasOwnProperty(key)&&dropmodel[j]){dropname=dropmodel[j].name;tmpdata[dropname]=getdata[key]}
j++}
getdata=tmpdata} catch(e){}}
ui.helper.dropped=true;if(opts.beforedrop&&$.isFunction(opts.beforedrop)){var datatoinsert=opts.beforedrop.call(this,ev,ui,getdata,$('#'+$t.id),$(this));if(typeof datatoinsert!="undefined"&&datatoinsert!==null&&typeof datatoinsert=="object"){getdata=datatoinsert}}
if(ui.helper.dropped){var grid;if(opts.autoid){if($.isFunction(opts.autoid)){grid=opts.autoid.call(this,getdata)} else{grid=Math.ceil(Math.random()*1000);grid=opts.autoidprefix+grid}}
$("#"+this.id).jqGrid('addRowData',grid,getdata,opts.droppos)}
if(opts.ondrop&&$.isFunction(opts.ondrop)){opts.ondrop.call(this,ev,ui,getdata)}}},opts.drop_opts||{})},"onstart":null,"onstop":null,"beforedrop":null,"ondrop":null,"drop_opts":{"activeClass":"ui-state-active","hoverClass":"ui-state-hover"},"drag_opts":{"revert":"invalid","helper":"clone","cursor":"move","appendTo":"#jqgrid_dnd","zIndex":5000},"dragcopy":false,"dropbyname":false,"droppos":"first","autoid":true,"autoidprefix":"dnd_"},opts||{});if(!opts.connectWith){return}
opts.connectWith=opts.connectWith.split(",");opts.connectWith=$.map(opts.connectWith,function(n){return $.trim(n)});$.data($t,"dnd",opts);if($t.p.reccount!="0"&&!$t.p.jqgdnd){updateDnD()}
$t.p.jqgdnd=true;for(var i=0;i<opts.connectWith.length;i++){var cn=opts.connectWith[i];$(cn).droppable($.isFunction(opts.drop)?opts.drop.call($($t),opts):opts.drop)}})},gridResize: function(opts){return this.each(function(){var $t=this;if(!$t.grid||!$.fn.resizable){return}
opts=$.extend({},opts||{});if(opts.alsoResize){opts._alsoResize_=opts.alsoResize;delete opts.alsoResize} else{opts._alsoResize_=false}
if(opts.stop&&$.isFunction(opts.stop)){opts._stop_=opts.stop;delete opts.stop} else{opts._stop_=false}
opts.stop=function(ev,ui){$($t).jqGrid('setGridParam',{height:$("#gview_"+$t.p.id+" .ui-jqgrid-bdiv").height()});$($t).jqGrid('setGridWidth',ui.size.width,opts.shrinkToFit);if(opts._stop_){opts._stop_.call($t,ev,ui)}};if(opts._alsoResize_){var optstest="{\'#gview_"+$t.p.id+" .ui-jqgrid-bdiv\':true,'"+opts._alsoResize_+"':true}";opts.alsoResize=eval('('+optstest+')')} else{opts.alsoResize=$(".ui-jqgrid-bdiv","#gview_"+$t.p.id)}
delete opts._alsoResize_;$("#gbox_"+$t.p.id).resizable(opts)})}})})(jQuery);
function tableToGrid(selector,options){jQuery(selector).each(function(){if(this.grid){return}
jQuery(this).width("99%");var w=jQuery(this).width();var inputCheckbox=jQuery('tr td:first-child input[type=checkbox]:first',jQuery(this));var inputRadio=jQuery('tr td:first-child input[type=radio]:first',jQuery(this));var selectMultiple=inputCheckbox.length>0;var selectSingle=!selectMultiple&&inputRadio.length>0;var selectable=selectMultiple||selectSingle;var colModel=[];var colNames=[];jQuery('th',jQuery(this)).each(function(){if(colModel.length===0&&selectable){colModel.push({name:'__selection__',index:'__selection__',width:0,hidden:true});colNames.push('__selection__')} else{colModel.push({name:jQuery(this).attr("id")||jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),index:jQuery(this).attr("id")||jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),width:jQuery(this).width()||150});colNames.push(jQuery(this).html())}});var data=[];var rowIds=[];var rowChecked=[];jQuery('tbody > tr',jQuery(this)).each(function(){var row={};var rowPos=0;jQuery('td',jQuery(this)).each(function(){if(rowPos===0&&selectable){var input=jQuery('input',jQuery(this));var rowId=input.attr("value");rowIds.push(rowId||data.length);if(input.is(":checked")){rowChecked.push(rowId)}
row[colModel[rowPos].name]=input.attr("value")} else{row[colModel[rowPos].name]=jQuery(this).html()}
rowPos++});if(rowPos>0){data.push(row)}});jQuery(this).empty();jQuery(this).addClass("scroll");jQuery(this).jqGrid(jQuery.extend({datatype:"local",width:w,colNames:colNames,colModel:colModel,multiselect:selectMultiple},options||{}));var a;for(a=0;a<data.length;a++){var id=null;if(rowIds.length>0){id=rowIds[a];if(id&&id.replace){id=encodeURIComponent(id).replace(/[.\-%]/g,"_")}}
if(id===null){id=a+1}
jQuery(this).jqGrid("addRowData",id,data[a])}
for(a=0;a<rowChecked.length;a++){jQuery(this).jqGrid("setSelection",rowChecked[a])}})};

/* - ++resource++eea.uberlisting.js/uberlisting_view.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++eea.uberlisting.js/uberlisting_view.js?original=1
window.Uberlisting={};window.Uberlisting.Events={};window.Uberlisting.Events.Success=jQuery.Event('Success');window.Uberlisting.Events.Listing=jQuery.Event('Listing');jQuery(document).ready(function($){"use strict";var $uber_view_switch=$('#uber-view-switch');var faceted=$("#faceted-form").length;var selected_template=$("#selected-template").text();var $content=$("#content");var $uber_view_content=$('#uber-view-content');var events=window.Uberlisting.Events;var base_href=$('base').attr('href');var success_event=events.Success;var listing_event=events.Listing;var $window=$(window);if(window.EEA){$window.bind(success_event, function(evt){var uberTemplate=$.bbq.getState('uberTemplate');if(uberTemplate==='folder_tabs_view'){window.EEA.eea_tabs();return}
if(uberTemplate==='folder_accordion_view'){window.EEA.eea_accordion();return}
if(uberTemplate==='gallery_view'){$('#galleryView').eeaGalleryView()}})}
$window.bind(listing_event, function(evt){$content.find('.listingBar a').each(function(i){var batchQueryString=$.param.querystring(this.href);var uberTemplate=$.bbq.getState('uberTemplate')||selected_template;this.href=$.param.querystring(uberTemplate,batchQueryString)});$content.delegate('.listingBar ','click', function(evt){var $target=$(evt.target);var target_href=$target.attr('href');$uber_view_content.html('<img src="ajax-loader.gif" />');evt.preventDefault();if(target_href){$.get(target_href, function(data){var $data=$(data).find('#content-core').html();$uber_view_content.html($data)})}})});var markSelectedButton=function(){var uberTemplate=$.bbq.getState('uberTemplate')||selected_template;var $uber_view_switch=$("#uber-view-switch");$uber_view_switch.find('.selected').removeClass('selected');$uber_view_switch.find('a').each(function(i){var $this=$(this);var templateID=$this.data().templateid;if(templateID===uberTemplate){$this.addClass('selected')}})};var loadCookieSetttings=function(){var cookie=window.readCookie('uberTemplate');if(cookie===selected_template){cookie=undefined}
if($.bbq.getState('uberTemplate')===undefined&&cookie){$.bbq.pushState({'uberTemplate':cookie})}};var loadContent=function(){var $uber_view_content=$('#uber-view-content');var uberTemplate=$.bbq.getState('uberTemplate')||selected_template;$uber_view_content.html('<img src="ajax-loader.gif" />');var url=$.param.querystring(uberTemplate,$.param.querystring());url=base_href+'/'+url+'?ajax_load=1';$.get(url, function(data){var $data=$(data);$content=$data.find('#content-core');if(!$content.length){$content=$content.find('div').eq(0)}
$uber_view_content.html($content.html());$window.trigger(success_event)},'html')};$content.delegate('#uber-view-switch a','click', function(evt){var uberTemplate=$(this).data().templateid;$.bbq.pushState({'uberTemplate':uberTemplate});document.cookie='uberTemplate'+"="+uberTemplate+"; path="+window.location.pathname;evt.preventDefault()});if(faceted){$(window.Faceted.Events).bind('FACETED-AJAX-QUERY-SUCCESS', function(evt){var uber_view=$("#uber-view-content");if(uber_view.length){markSelectedButton();$window.trigger(success_event)}})}
if($uber_view_switch.length){$window.bind('hashchange', function(e){markSelectedButton();if(!faceted){loadContent()}});loadCookieSetttings();markSelectedButton();loadContent();$window.trigger(listing_event);if($("[id='plone-contentmenu-actions-uberlderlisting.disable']").length){$("#plone-contentmenu-display").hide()}}});

/* - ++resource++jquery.slickgrid.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++jquery.slickgrid.js?original=1
;(function(f){f.fn.drag=function(b,a,d){var e=typeof b=="string"?b:"",k=f.isFunction(b)?b:f.isFunction(a)?a:null;if(e.indexOf("drag")!==0)e="drag"+e;d=(b==k?a:d)||{};return k?this.bind(e,d,k):this.trigger(e)};var i=f.event,h=i.special,c=h.drag={defaults:{which:1,distance:0,not:":input",handle:null,relative:false,drop:true,click:false},datakey:"dragdata",livekey:"livedrag",add:function(b){var a=f.data(this,c.datakey),d=b.data||{};a.related+=1;if(!a.live&&b.selector){a.live=true;i.add(this,"draginit."+c.livekey,c.delegate)}f.each(c.defaults,function(e){if(d[e]!==undefined)a[e]=d[e]})},remove:function(){f.data(this,c.datakey).related-=1},setup:function(){if(!f.data(this,c.datakey)){var b=f.extend({related:0},c.defaults);f.data(this,c.datakey,b);i.add(this,"mousedown",c.init,b);this.attachEvent&&this.attachEvent("ondragstart",c.dontstart)}},teardown:function(){if(!f.data(this,c.datakey).related){f.removeData(this,c.datakey);i.remove(this,"mousedown",c.init);i.remove(this,"draginit",c.delegate);c.textselect(true);this.detachEvent&&this.detachEvent("ondragstart",c.dontstart)}},init:function(b){var a=b.data,d;if(!(a.which>0&&b.which!=a.which))if(!f(b.target).is(a.not))if(!(a.handle&&!f(b.target).closest(a.handle,b.currentTarget).length)){a.propagates=1;a.interactions=[c.interaction(this,a)];a.target=b.target;a.pageX=b.pageX;a.pageY=b.pageY;a.dragging=null;d=c.hijack(b,"draginit",a);if(a.propagates){if((d=c.flatten(d))&&d.length){a.interactions=[];f.each(d,function(){a.interactions.push(c.interaction(this,a))})}a.propagates=a.interactions.length;a.drop!==false&&h.drop&&h.drop.handler(b,a);c.textselect(false);i.add(document,"mousemove mouseup",c.handler,a);return false}}},interaction:function(b,a){return{drag:b,callback:new c.callback,droppable:[],offset:f(b)[a.relative?"position":"offset"]()||{top:0,left:0}}},handler:function(b){var a=b.data;switch(b.type){case!a.dragging&&"mousemove":if(Math.pow(b.pageX-a.pageX,2)+Math.pow(b.pageY-a.pageY,2)<Math.pow(a.distance,2))break;b.target=a.target;c.hijack(b,"dragstart",a);if(a.propagates)a.dragging=true;case "mousemove":if(a.dragging){c.hijack(b,"drag",a);if(a.propagates){a.drop!==false&&h.drop&&h.drop.handler(b,a);break}b.type="mouseup"}case "mouseup":i.remove(document,"mousemove mouseup",c.handler);if(a.dragging){a.drop!==false&&h.drop&&h.drop.handler(b,a);c.hijack(b,"dragend",a)}c.textselect(true);if(a.click===false&&a.dragging){jQuery.event.triggered=true;setTimeout(function(){jQuery.event.triggered=false},20);a.dragging=false}break}},delegate:function(b){var a=[],d,e=f.data(this,"events")||{};f.each(e.live||[],function(k,j){if(j.preType.indexOf("drag")===0)if(d=f(b.target).closest(j.selector,b.currentTarget)[0]){i.add(d,j.origType+"."+c.livekey,j.origHandler,j.data);f.inArray(d,a)<0&&a.push(d)}});if(!a.length)return false;return f(a).bind("dragend."+c.livekey,function(){i.remove(this,"."+c.livekey)})},hijack:function(b,a,d,e,k){if(d){var j={event:b.originalEvent,type:b.type},n=a.indexOf("drop")?"drag":"drop",l,o=e||0,g,m;e=!isNaN(e)?e:d.interactions.length;b.type=a;b.originalEvent=null;d.results=[];do if(g=d.interactions[o])if(!(a!=="dragend"&&g.cancelled)){m=c.properties(b,d,g);g.results=[];f(k||g[n]||d.droppable).each(function(q,p){l=(m.target=p)?i.handle.call(p,b,m):null;if(l===false){if(n=="drag"){g.cancelled=true;d.propagates-=1}if(a=="drop")g[n][q]=null}else if(a=="dropinit")g.droppable.push(c.element(l)||p);if(a=="dragstart")g.proxy=f(c.element(l)||g.drag)[0];g.results.push(l);delete b.result;if(a!=="dropinit")return l});d.results[o]=c.flatten(g.results);if(a=="dropinit")g.droppable=c.flatten(g.droppable);a=="dragstart"&&!g.cancelled&&m.update()}while(++o<e);b.type=j.type;b.originalEvent=j.event;return c.flatten(d.results)}},properties:function(b,a,d){var e=d.callback;e.drag=d.drag;e.proxy=d.proxy||d.drag;e.startX=a.pageX;e.startY=a.pageY;e.deltaX=b.pageX-a.pageX;e.deltaY=b.pageY-a.pageY;e.originalX=d.offset.left;e.originalY=d.offset.top;e.offsetX=b.pageX-(a.pageX-e.originalX);e.offsetY=b.pageY-(a.pageY-e.originalY);e.drop=c.flatten((d.drop||[]).slice());e.available=c.flatten((d.droppable||[]).slice());return e},element:function(b){if(b&&(b.jquery||b.nodeType==1))return b},flatten:function(b){return f.map(b,function(a){return a&&a.jquery?f.makeArray(a):a&&a.length?c.flatten(a):a})},textselect:function(b){f(document)[b?"unbind":"bind"]("selectstart",c.dontstart).attr("unselectable",b?"off":"on").css("MozUserSelect",b?"":"none")},dontstart:function(){return false},callback:function(){}};c.callback.prototype={update:function(){h.drop&&this.available.length&&f.each(this.available,function(b){h.drop.locate(this,b)})}};h.draginit=h.dragstart=h.dragend=c})(jQuery);(function(f){f.fn.drop=function(c,a,d){var g=typeof c=="string"?c:"",e=f.isFunction(c)?c:f.isFunction(a)?a:null;if(g.indexOf("drop")!==0)g="drop"+g;d=(c==e?a:d)||{};return e?this.bind(g,d,e):this.trigger(g)};f.drop=function(c){c=c||{};b.multi=c.multi===true?Infinity:c.multi===false?1:!isNaN(c.multi)?c.multi:b.multi;b.delay=c.delay||b.delay;b.tolerance=f.isFunction(c.tolerance)?c.tolerance:c.tolerance===null?null:b.tolerance;b.mode=c.mode||b.mode||"intersect"};var l=f.event,i=l.special,b=f.event.special.drop={multi:1,delay:20,mode:"overlap",targets:[],datakey:"dropdata",livekey:"livedrop",add:function(c){var a=f.data(this,b.datakey);a.related+=1;if(!a.live&&c.selector){a.live=true;l.add(this,"dropinit."+b.livekey,b.delegate)}},remove:function(){f.data(this,b.datakey).related-=1},setup:function(){if(!f.data(this,b.datakey)){f.data(this,b.datakey,{related:0,active:[],anyactive:0,winner:0,location:{}});b.targets.push(this)}},teardown:function(){if(!f.data(this,b.datakey).related){f.removeData(this,b.datakey);l.remove(this,"dropinit",b.delegate);var c=this;b.targets=f.grep(b.targets,function(a){return a!==c})}},handler:function(c,a){var d;if(a)switch(c.type){case "mousedown":d=f(b.targets);if(typeof a.drop=="string")d=d.filter(a.drop);d.each(function(){var g=f.data(this,b.datakey);g.active=[];g.anyactive=0;g.winner=0});a.droppable=d;b.delegates=[];i.drag.hijack(c,"dropinit",a);b.delegates=f.unique(i.drag.flatten(b.delegates));break;case "mousemove":b.event=c;b.timer||b.tolerate(a);break;case "mouseup":b.timer=clearTimeout(b.timer);if(a.propagates){i.drag.hijack(c,"drop",a);i.drag.hijack(c,"dropend",a);f.each(b.delegates||[],function(){l.remove(this,"."+b.livekey)})}break}},delegate:function(c){var a=[],d,g=f.data(this,"events")||{};f.each(g.live||[],function(e,h){if(h.preType.indexOf("drop")===0){d=f(c.currentTarget).find(h.selector);d.length&&d.each(function(){l.add(this,h.origType+"."+b.livekey,h.origHandler,h.data);f.inArray(this,a)<0&&a.push(this)})}});b.delegates.push(a);return a.length?f(a):false},locate:function(c,a){var d=f.data(c,b.datakey),g=f(c),e=g.offset()||{},h=g.outerHeight();g=g.outerWidth();e={elem:c,width:g,height:h,top:e.top,left:e.left,right:e.left+g,bottom:e.top+h};if(d){d.location=e;d.index=a;d.elem=c}return e},contains:function(c,a){return(a[0]||a.left)>=c.left&&(a[0]||a.right)<=c.right&&(a[1]||a.top)>=c.top&&(a[1]||a.bottom)<=c.bottom},modes:{intersect:function(c,a,d){return this.contains(d,[c.pageX,c.pageY])?1E9:this.modes.overlap.apply(this,arguments)},overlap:function(c,a,d){return Math.max(0,Math.min(d.bottom,a.bottom)-Math.max(d.top,a.top))*Math.max(0,Math.min(d.right,a.right)-Math.max(d.left,a.left))},fit:function(c,a,d){return this.contains(d,a)?1:0},middle:function(c,a,d){return this.contains(d,[a.left+a.width*0.5,a.top+a.height*0.5])?1:0}},sort:function(c,a){return a.winner-c.winner||c.index-a.index},tolerate:function(c){var a,d,g,e,h,m,j=0,k,p=c.interactions.length,n=[b.event.pageX,b.event.pageY],o=b.tolerance||b.modes[b.mode];do if(k=c.interactions[j]){if(!k)return;k.drop=[];h=[];m=k.droppable.length;if(o)g=b.locate(k.proxy);a=0;do if(d=k.droppable[a]){e=f.data(d,b.datakey);if(d=e.location){e.winner=o?o.call(b,b.event,g,d):b.contains(d,n)?1:0;h.push(e)}}while(++a<m);h.sort(b.sort);a=0;do if(e=h[a])if(e.winner&&k.drop.length<b.multi){if(!e.active[j]&&!e.anyactive)if(i.drag.hijack(b.event,"dropstart",c,j,e.elem)[0]!==false){e.active[j]=1;e.anyactive+=1}else e.winner=0;e.winner&&k.drop.push(e.elem)}else if(e.active[j]&&e.anyactive==1){i.drag.hijack(b.event,"dropend",c,j,e.elem);e.active[j]=0;e.anyactive-=1}while(++a<m)}while(++j<p);if(b.last&&n[0]==b.last.pageX&&n[1]==b.last.pageY)delete b.timer;else b.timer=setTimeout(function(){b.tolerate(c)},b.delay);b.last=b.event}};i.dropinit=i.dropstart=i.dropend=b})(jQuery);(function($){$.extend(true,window,{"Slick":{"Event":Event,"EventData":EventData,"EventHandler":EventHandler,"Range":Range,"NonDataRow":NonDataItem,"Group":Group,"GroupTotals":GroupTotals,"EditorLock":EditorLock,"GlobalEditorLock":new EditorLock()}});
function EventData(){var isPropagationStopped=false;var isImmediatePropagationStopped=false;this.stopPropagation=function(){isPropagationStopped=true};this.isPropagationStopped=function(){return isPropagationStopped};this.stopImmediatePropagation=function(){isImmediatePropagationStopped=true};this.isImmediatePropagationStopped=function(){return isImmediatePropagationStopped}}
function Event(){var handlers=[];this.subscribe=function(fn){handlers.push(fn)};this.unsubscribe=function(fn){for(var i=handlers.length-1;i>=0;i--){if(handlers[i]===fn){handlers.splice(i,1)}}};this.notify=function(args,e,scope){e=e||new EventData();scope=scope||this;var returnValue;for(var i=0;i<handlers.length&&!(e.isPropagationStopped()||e.isImmediatePropagationStopped());i++){returnValue=handlers[i].call(scope,e,args)}
return returnValue}}
function EventHandler(){var handlers=[];this.subscribe=function(event,handler){handlers.push({event:event,handler:handler});event.subscribe(handler);return this};this.unsubscribe=function(event,handler){var i=handlers.length;while(i--){if(handlers[i].event===event&&handlers[i].handler===handler){handlers.splice(i,1);event.unsubscribe(handler);return}}
return this};this.unsubscribeAll=function(){var i=handlers.length;while(i--){handlers[i].event.unsubscribe(handlers[i].handler)}
handlers=[];return this}}
function Range(fromRow,fromCell,toRow,toCell){if(toRow===undefined&&toCell===undefined){toRow=fromRow;toCell=fromCell}
this.fromRow=Math.min(fromRow,toRow);this.fromCell=Math.min(fromCell,toCell);this.toRow=Math.max(fromRow,toRow);this.toCell=Math.max(fromCell,toCell);this.isSingleRow=function(){return this.fromRow==this.toRow};this.isSingleCell=function(){return this.fromRow==this.toRow&&this.fromCell==this.toCell};this.contains=function(row,cell){return row>=this.fromRow&&row<=this.toRow&&cell>=this.fromCell&&cell<=this.toCell};this.toString=function(){if(this.isSingleCell()){return "("+this.fromRow+":"+this.fromCell+")"}
else{return "("+this.fromRow+":"+this.fromCell+" - "+this.toRow+":"+this.toCell+")"}}}
function NonDataItem(){this.__nonDataRow=true}
function Group(){this.__group=true;this.__updated=false;this.count=0;this.value=null;this.title=null;this.collapsed=false;this.totals=null}
Group.prototype=new NonDataItem();Group.prototype.equals=function(group){return this.value===group.value&&this.count===group.count&&this.collapsed===group.collapsed};
function GroupTotals(){this.__groupTotals=true;this.group=null}
GroupTotals.prototype=new NonDataItem();
function EditorLock(){var activeEditController=null;this.isActive=function(editController){return(editController?activeEditController===editController:activeEditController!==null)};this.activate=function(editController){if(editController===activeEditController){return}
if(activeEditController!==null){throw "SlickGrid.EditorLock.activate: an editController is still active, can't activate another editController"}
if(!editController.commitCurrentEdit){throw "SlickGrid.EditorLock.activate: editController must implement .commitCurrentEdit()"}
if(!editController.cancelCurrentEdit){throw "SlickGrid.EditorLock.activate: editController must implement .cancelCurrentEdit()"}
activeEditController=editController};this.deactivate=function(editController){if(activeEditController!==editController){throw "SlickGrid.EditorLock.deactivate: specified editController is not the currently active one"}
activeEditController=null};this.commitCurrentEdit=function(){return(activeEditController?activeEditController.commitCurrentEdit():true)};this.cancelCurrentEdit=function cancelCurrentEdit(){return(activeEditController?activeEditController.cancelCurrentEdit():true)}}})(jQuery);(function($){$.extend(true,window,{Slick:{Data:{DataView:DataView,Aggregators:{Avg:AvgAggregator,Min:MinAggregator,Max:MaxAggregator,Sum:SumAggregator}}}});
function DataView(options){var self=this;var defaults={groupItemMetadataProvider:null,inlineFilters:false};var idProperty="id";var items=[];var rows=[];var idxById={};var rowsById=null;var filter=null;var updated=null;var suspend=false;var sortAsc=true;var fastSortField;var sortComparer;var refreshHints={};var prevRefreshHints={};var filterArgs;var filteredItems=[];var compiledFilter;var compiledFilterWithCaching;var filterCache=[];var groupingGetter;var groupingGetterIsAFn;var groupingFormatter;var groupingComparer;var groups=[];var collapsedGroups={};var aggregators;var aggregateCollapsed=false;var compiledAccumulators;var pagesize=0;var pagenum=0;var totalRows=0;var onRowCountChanged=new Slick.Event();var onRowsChanged=new Slick.Event();var onPagingInfoChanged=new Slick.Event();options=$.extend(true,{},defaults,options);
function beginUpdate(){suspend=true}
function endUpdate(){suspend=false;refresh()}
function setRefreshHints(hints){refreshHints=hints}
function setFilterArgs(args){filterArgs=args}
function updateIdxById(startingIndex){startingIndex=startingIndex||0;var id;for(var i=startingIndex,l=items.length;i<l;i++){id=items[i][idProperty];if(id===undefined){throw "Each data element must implement a unique 'id' property"}
idxById[id]=i}}
function ensureIdUniqueness(){var id;for(var i=0,l=items.length;i<l;i++){id=items[i][idProperty];if(id===undefined||idxById[id]!==i){throw "Each data element must implement a unique 'id' property"}}}
function getItems(){return items}
function setItems(data,objectIdProperty){if(objectIdProperty!==undefined){idProperty=objectIdProperty}
items=filteredItems=data;idxById={};updateIdxById();ensureIdUniqueness();refresh()}
function setPagingOptions(args){if(args.pageSize!=undefined){pagesize=args.pageSize;pagenum=pagesize?Math.min(pagenum,Math.max(0,Math.ceil(totalRows/pagesize)-1)):0}
if(args.pageNum!=undefined){pagenum=Math.min(args.pageNum,Math.max(0,Math.ceil(totalRows/pagesize)-1))}
onPagingInfoChanged.notify(getPagingInfo(),null,self);refresh()}
function getPagingInfo(){var totalPages=pagesize?Math.max(1,Math.ceil(totalRows/pagesize)):1;return{pageSize:pagesize,pageNum:pagenum,totalRows:totalRows,totalPages:totalPages}}
function sort(comparer,ascending){sortAsc=ascending;sortComparer=comparer;fastSortField=null;if(ascending===false){items.reverse()}
items.sort(comparer);if(ascending===false){items.reverse()}
idxById={};updateIdxById();refresh()}
function fastSort(field,ascending){sortAsc=ascending;fastSortField=field;sortComparer=null;var oldToString=Object.prototype.toString;Object.prototype.toString=(typeof field=="function")?field: function(){return this[field]};if(ascending===false){items.reverse()}
items.sort();Object.prototype.toString=oldToString;if(ascending===false){items.reverse()}
idxById={};updateIdxById();refresh()}
function reSort(){if(sortComparer){sort(sortComparer,sortAsc)} else if(fastSortField){fastSort(fastSortField,sortAsc)}}
function setFilter(filterFn){filter=filterFn;if(options.inlineFilters){compiledFilter=compileFilter();compiledFilterWithCaching=compileFilterWithCaching()}
refresh()}
function groupBy(valueGetter,valueFormatter,sortComparer){if(!options.groupItemMetadataProvider){options.groupItemMetadataProvider=new Slick.Data.GroupItemMetadataProvider()}
groupingGetter=valueGetter;groupingGetterIsAFn=typeof groupingGetter==="function";groupingFormatter=valueFormatter;groupingComparer=sortComparer;collapsedGroups={};groups=[];refresh()}
function setAggregators(groupAggregators,includeCollapsed){aggregators=groupAggregators;aggregateCollapsed=(includeCollapsed!==undefined)?includeCollapsed:aggregateCollapsed;compiledAccumulators=[];var idx=aggregators.length;while(idx--){compiledAccumulators[idx]=compileAccumulatorLoop(aggregators[idx])}
refresh()}
function getItemByIdx(i){return items[i]}
function getIdxById(id){return idxById[id]}
function ensureRowsByIdCache(){if(!rowsById){rowsById={};for(var i=0,l=rows.length;i<l;i++){rowsById[rows[i][idProperty]]=i}}}
function getRowById(id){ensureRowsByIdCache();return rowsById[id]}
function getItemById(id){return items[idxById[id]]}
function mapIdsToRows(idArray){var rows=[];ensureRowsByIdCache();for(var i=0;i<idArray.length;i++){var row=rowsById[idArray[i]];if(row!=null){rows[rows.length]=row}}
return rows}
function mapRowsToIds(rowArray){var ids=[];for(var i=0;i<rowArray.length;i++){if(rowArray[i]<rows.length){ids[ids.length]=rows[rowArray[i]][idProperty]}}
return ids}
function updateItem(id,item){if(idxById[id]===undefined||id!==item[idProperty]){throw "Invalid or non-matching id"}
items[idxById[id]]=item;if(!updated){updated={}}
updated[id]=true;refresh()}
function insertItem(insertBefore,item){items.splice(insertBefore,0,item);updateIdxById(insertBefore);refresh()}
function addItem(item){items.push(item);updateIdxById(items.length-1);refresh()}
function deleteItem(id){var idx=idxById[id];if(idx===undefined){throw "Invalid id"}
delete idxById[id];items.splice(idx,1);updateIdxById(idx);refresh()}
function getLength(){return rows.length}
function getItem(i){return rows[i]}
function getItemMetadata(i){var item=rows[i];if(item===undefined){return null}
if(item.__group){return options.groupItemMetadataProvider.getGroupRowMetadata(item)}
if(item.__groupTotals){return options.groupItemMetadataProvider.getTotalsRowMetadata(item)}
return null}
function collapseGroup(groupingValue){collapsedGroups[groupingValue]=true;refresh()}
function expandGroup(groupingValue){delete collapsedGroups[groupingValue];refresh()}
function getGroups(){return groups}
function extractGroups(rows){var group;var val;var groups=[];var groupsByVal=[];var r;for(var i=0,l=rows.length;i<l;i++){r=rows[i];val=(groupingGetterIsAFn)?groupingGetter(r):r[groupingGetter];val=val||0;group=groupsByVal[val];if(!group){group=new Slick.Group();group.count=0;group.value=val;group.rows=[];groups[groups.length]=group;groupsByVal[val]=group}
group.rows[group.count++]=r}
return groups}
function calculateGroupTotals(group){if(group.collapsed&&!aggregateCollapsed){return}
var totals=new Slick.GroupTotals();var agg,idx=aggregators.length;while(idx--){agg=aggregators[idx];agg.init();compiledAccumulators[idx].call(agg,group.rows);agg.storeResult(totals)}
totals.group=group;group.totals=totals}
function calculateTotals(groups){var idx=groups.length;while(idx--){calculateGroupTotals(groups[idx])}}
function finalizeGroups(groups){var idx=groups.length,g;while(idx--){g=groups[idx];g.collapsed=(g.value in collapsedGroups);g.title=groupingFormatter?groupingFormatter(g):g.value}}
function flattenGroupedRows(groups){var groupedRows=[],gl=0,g;for(var i=0,l=groups.length;i<l;i++){g=groups[i];groupedRows[gl++]=g;if(!g.collapsed){for(var j=0,jj=g.rows.length;j<jj;j++){groupedRows[gl++]=g.rows[j]}}
if(g.totals&&(!g.collapsed||aggregateCollapsed)){groupedRows[gl++]=g.totals}}
return groupedRows}
function getFunctionInfo(fn){var fnRegex=/^function[^(]*\(([^)]*)\)\s*{([\s\S]*)}$/;var matches=fn.toString().match(fnRegex);return{params:matches[1].split(","),body:matches[2]}}
function compileAccumulatorLoop(aggregator){var accumulatorInfo=getFunctionInfo(aggregator.accumulate);var fn=new Function("_items","for (var "+accumulatorInfo.params[0]+", _i=0, _il=_items.length; _i<_il; _i++) {"+accumulatorInfo.params[0]+" = _items[_i]; "+accumulatorInfo.body+"}");fn.displayName=fn.name="compiledAccumulatorLoop";return fn}
function compileFilter(){var filterInfo=getFunctionInfo(filter);var filterBody=filterInfo.body.replace(/return false[;}]/gi,"{ continue _coreloop; }").replace(/return true[;}]/gi,"{ _retval[_idx++] = $item$; continue _coreloop; }").replace(/return ([^;}]+?);/gi,"{ if ($1) { _retval[_idx++] = $item$; }; continue _coreloop; }");var tpl=["var _retval = [], _idx = 0; ","var $item$, $args$ = _args; ","_coreloop: ","for (var _i = 0, _il = _items.length; _i < _il; _i++) { ","$item$ = _items[_i]; ","$filter$; ","} ","return _retval; "].join("");tpl=tpl.replace(/\$filter\$/gi,filterBody);tpl=tpl.replace(/\$item\$/gi,filterInfo.params[0]);tpl=tpl.replace(/\$args\$/gi,filterInfo.params[1]);var fn=new Function("_items,_args",tpl);fn.displayName=fn.name="compiledFilter";return fn}
function compileFilterWithCaching(){var filterInfo=getFunctionInfo(filter);var filterBody=filterInfo.body.replace(/return false[;}]/gi,"{ continue _coreloop; }").replace(/return true[;}]/gi,"{ _cache[_i] = true;_retval[_idx++] = $item$; continue _coreloop; }").replace(/return ([^;}]+?);/gi,"{ if ((_cache[_i] = $1)) { _retval[_idx++] = $item$; }; continue _coreloop; }");var tpl=["var _retval = [], _idx = 0; ","var $item$, $args$ = _args; ","_coreloop: ","for (var _i = 0, _il = _items.length; _i < _il; _i++) { ","$item$ = _items[_i]; ","if (_cache[_i]) { ","_retval[_idx++] = $item$; ","continue _coreloop; ","} ","$filter$; ","} ","return _retval; "].join("");tpl=tpl.replace(/\$filter\$/gi,filterBody);tpl=tpl.replace(/\$item\$/gi,filterInfo.params[0]);tpl=tpl.replace(/\$args\$/gi,filterInfo.params[1]);var fn=new Function("_items,_args,_cache",tpl);fn.displayName=fn.name="compiledFilterWithCaching";return fn}
function uncompiledFilter(items,args){var retval=[],idx=0;for(var i=0,ii=items.length;i<ii;i++){if(filter(items[i],args)){retval[idx++]=items[i]}}
return retval}
function uncompiledFilterWithCaching(items,args,cache){var retval=[],idx=0,item;for(var i=0,ii=items.length;i<ii;i++){item=items[i];if(cache[i]){retval[idx++]=item} else if(filter(item,args)){retval[idx++]=item;cache[i]=true}}
return retval}
function getFilteredAndPagedItems(items){if(filter){var batchFilter=options.inlineFilters?compiledFilter:uncompiledFilter;var batchFilterWithCaching=options.inlineFilters?compiledFilterWithCaching:uncompiledFilterWithCaching;if(refreshHints.isFilterNarrowing){filteredItems=batchFilter(filteredItems,filterArgs)} else if(refreshHints.isFilterExpanding){filteredItems=batchFilterWithCaching(items,filterArgs,filterCache)} else if(!refreshHints.isFilterUnchanged){filteredItems=batchFilter(items,filterArgs)}} else{filteredItems=pagesize?items:items.concat()}
var paged;if(pagesize){if(filteredItems.length<pagenum * pagesize){pagenum=Math.floor(filteredItems.length/pagesize)}
paged=filteredItems.slice(pagesize * pagenum,pagesize * pagenum+pagesize)} else{paged=filteredItems}
return{totalRows:filteredItems.length,rows:paged}}
function getRowDiffs(rows,newRows){var item,r,eitherIsNonData,diff=[];var from=0,to=newRows.length;if(refreshHints&&refreshHints.ignoreDiffsBefore){from=Math.max(0,Math.min(newRows.length,refreshHints.ignoreDiffsBefore))}
if(refreshHints&&refreshHints.ignoreDiffsAfter){to=Math.min(newRows.length,Math.max(0,refreshHints.ignoreDiffsAfter))}
for(var i=from,rl=rows.length;i<to;i++){if(i>=rl){diff[diff.length]=i} else{item=newRows[i];r=rows[i];if((groupingGetter&&(eitherIsNonData=(item.__nonDataRow)||(r.__nonDataRow))&&item.__group!==r.__group||item.__updated||item.__group&&!item.equals(r))||(aggregators&&eitherIsNonData&&(item.__groupTotals||r.__groupTotals))||item[idProperty]!=r[idProperty]||(updated&&updated[item[idProperty]])){diff[diff.length]=i}}}
return diff}
function recalc(_items){rowsById=null;if(refreshHints.isFilterNarrowing!=prevRefreshHints.isFilterNarrowing||refreshHints.isFilterExpanding!=prevRefreshHints.isFilterExpanding){filterCache=[]}
var filteredItems=getFilteredAndPagedItems(_items);totalRows=filteredItems.totalRows;var newRows=filteredItems.rows;groups=[];if(groupingGetter!=null){groups=extractGroups(newRows);if(groups.length){finalizeGroups(groups);if(aggregators){calculateTotals(groups)}
groups.sort(groupingComparer);newRows=flattenGroupedRows(groups)}}
var diff=getRowDiffs(rows,newRows);rows=newRows;return diff}
function refresh(){if(suspend){return}
var countBefore=rows.length;var totalRowsBefore=totalRows;var diff=recalc(items,filter);if(pagesize&&totalRows<pagenum * pagesize){pagenum=Math.max(0,Math.ceil(totalRows/pagesize)-1);diff=recalc(items,filter)}
updated=null;prevRefreshHints=refreshHints;refreshHints={};if(totalRowsBefore!=totalRows){onPagingInfoChanged.notify(getPagingInfo(),null,self)}
if(countBefore!=rows.length){onRowCountChanged.notify({previous:countBefore,current:rows.length},null,self)}
if(diff.length>0){onRowsChanged.notify({rows:diff},null,self)}}
function syncGridSelection(grid,preserveHidden){var self=this;var selectedRowIds=self.mapRowsToIds(grid.getSelectedRows());var inHandler;grid.onSelectedRowsChanged.subscribe(function(e,args){if(inHandler){return}
selectedRowIds=self.mapRowsToIds(grid.getSelectedRows())});this.onRowsChanged.subscribe(function(e,args){if(selectedRowIds.length>0){inHandler=true;var selectedRows=self.mapIdsToRows(selectedRowIds);if(!preserveHidden){selectedRowIds=self.mapRowsToIds(selectedRows)}
grid.setSelectedRows(selectedRows);inHandler=false}})}
function syncGridCellCssStyles(grid,key){var hashById;var inHandler;storeCellCssStyles(grid.getCellCssStyles(key));
function storeCellCssStyles(hash){hashById={};for(var row in hash){var id=rows[row][idProperty];hashById[id]=hash[row]}}
grid.onCellCssStylesChanged.subscribe(function(e,args){if(inHandler){return}
if(key!=args.key){return}
if(args.hash){storeCellCssStyles(args.hash)}});this.onRowsChanged.subscribe(function(e,args){if(hashById){inHandler=true;ensureRowsByIdCache();var newHash={};for(var id in hashById){var row=rowsById[id];if(row!=undefined){newHash[row]=hashById[id]}}
grid.setCellCssStyles(key,newHash);inHandler=false}})}
return{"beginUpdate":beginUpdate,"endUpdate":endUpdate,"setPagingOptions":setPagingOptions,"getPagingInfo":getPagingInfo,"getItems":getItems,"setItems":setItems,"setFilter":setFilter,"sort":sort,"fastSort":fastSort,"reSort":reSort,"groupBy":groupBy,"setAggregators":setAggregators,"collapseGroup":collapseGroup,"expandGroup":expandGroup,"getGroups":getGroups,"getIdxById":getIdxById,"getRowById":getRowById,"getItemById":getItemById,"getItemByIdx":getItemByIdx,"mapRowsToIds":mapRowsToIds,"mapIdsToRows":mapIdsToRows,"setRefreshHints":setRefreshHints,"setFilterArgs":setFilterArgs,"refresh":refresh,"updateItem":updateItem,"insertItem":insertItem,"addItem":addItem,"deleteItem":deleteItem,"syncGridSelection":syncGridSelection,"syncGridCellCssStyles":syncGridCellCssStyles,"getLength":getLength,"getItem":getItem,"getItemMetadata":getItemMetadata,"onRowCountChanged":onRowCountChanged,"onRowsChanged":onRowsChanged,"onPagingInfoChanged":onPagingInfoChanged}}
function AvgAggregator(field){this.field_=field;this.init=function(){this.count_=0;this.nonNullCount_=0;this.sum_=0};this.accumulate=function(item){var val=item[this.field_];this.count_++;if(val!=null&&val!=""&&val!=NaN){this.nonNullCount_++;this.sum_+=parseFloat(val)}};this.storeResult=function(groupTotals){if(!groupTotals.avg){groupTotals.avg={}}
if(this.nonNullCount_!=0){groupTotals.avg[this.field_]=this.sum_/this.nonNullCount_}}}
function MinAggregator(field){this.field_=field;this.init=function(){this.min_=null};this.accumulate=function(item){var val=item[this.field_];if(val!=null&&val!=""&&val!=NaN){if(this.min_==null||val<this.min_){this.min_=val}}};this.storeResult=function(groupTotals){if(!groupTotals.min){groupTotals.min={}}
groupTotals.min[this.field_]=this.min_}}
function MaxAggregator(field){this.field_=field;this.init=function(){this.max_=null};this.accumulate=function(item){var val=item[this.field_];if(val!=null&&val!=""&&val!=NaN){if(this.max_==null||val>this.max_){this.max_=val}}};this.storeResult=function(groupTotals){if(!groupTotals.max){groupTotals.max={}}
groupTotals.max[this.field_]=this.max_}}
function SumAggregator(field){this.field_=field;this.init=function(){this.sum_=null};this.accumulate=function(item){var val=item[this.field_];if(val!=null&&val!=""&&val!=NaN){this.sum_+=parseFloat(val)}};this.storeResult=function(groupTotals){if(!groupTotals.sum){groupTotals.sum={}}
groupTotals.sum[this.field_]=this.sum_}}})(jQuery);(function($){$.extend(true,window,{"Slick":{"Editors":{"Text":TextEditor,"Integer":IntegerEditor,"Date":DateEditor,"YesNoSelect":YesNoSelectEditor,"Checkbox":CheckboxEditor,"PercentComplete":PercentCompleteEditor,"LongText":LongTextEditor}}});
function TextEditor(args){var $input;var defaultValue;var scope=this;this.init=function(){$input=$("<INPUT type=text class='editor-text' />").appendTo(args.container).bind("keydown.nav", function(e){if(e.keyCode===$.ui.keyCode.LEFT||e.keyCode===$.ui.keyCode.RIGHT){e.stopImmediatePropagation()}}).focus().select()};this.destroy=function(){$input.remove()};this.focus=function(){$input.focus()};this.getValue=function(){return $input.val()};this.setValue=function(val){$input.val(val)};this.loadValue=function(item){defaultValue=item[args.column.field]||"";$input.val(defaultValue);$input[0].defaultValue=defaultValue;$input.select()};this.serializeValue=function(){return $input.val()};this.applyValue=function(item,state){item[args.column.field]=state};this.isValueChanged=function(){return(!($input.val()==""&&defaultValue==null))&&($input.val()!=defaultValue)};this.validate=function(){if(args.column.validator){var validationResults=args.column.validator($input.val());if(!validationResults.valid){return validationResults}}
return{valid:true,msg:null}};this.init()}
function IntegerEditor(args){var $input;var defaultValue;var scope=this;this.init=function(){$input=$("<INPUT type=text class='editor-text' />");$input.bind("keydown.nav", function(e){if(e.keyCode===$.ui.keyCode.LEFT||e.keyCode===$.ui.keyCode.RIGHT){e.stopImmediatePropagation()}});$input.appendTo(args.container);$input.focus().select()};this.destroy=function(){$input.remove()};this.focus=function(){$input.focus()};this.loadValue=function(item){defaultValue=item[args.column.field];$input.val(defaultValue);$input[0].defaultValue=defaultValue;$input.select()};this.serializeValue=function(){return parseInt($input.val(),10)||0};this.applyValue=function(item,state){item[args.column.field]=state};this.isValueChanged=function(){return(!($input.val()==""&&defaultValue==null))&&($input.val()!=defaultValue)};this.validate=function(){if(isNaN($input.val())){return{valid:false,msg:"Please enter a valid integer"}}
return{valid:true,msg:null}};this.init()}
function DateEditor(args){var $input;var defaultValue;var scope=this;var calendarOpen=false;this.init=function(){$input=$("<INPUT type=text class='editor-text' />");$input.appendTo(args.container);$input.focus().select();$input.datepicker({showOn:"button",buttonImageOnly:true,buttonImage:"++resource++slickgrid-images/calendar.gif",beforeShow: function(){calendarOpen=true},onClose: function(){calendarOpen=false}});$input.width($input.width()-18)};this.destroy=function(){$.datepicker.dpDiv.stop(true,true);$input.datepicker("hide");try{$input.datepicker("destroy")}catch(err){}
$input.remove()};this.show=function(){if(calendarOpen){$.datepicker.dpDiv.stop(true,true).show()}};this.hide=function(){if(calendarOpen){$.datepicker.dpDiv.stop(true,true).hide()}};this.position=function(position){if(!calendarOpen){return}
$.datepicker.dpDiv.css("top",position.top+30).css("left",position.left)};this.focus=function(){$input.focus()};this.loadValue=function(item){defaultValue=item[args.column.field];$input.val(defaultValue);$input[0].defaultValue=defaultValue;$input.select()};this.serializeValue=function(){return $input.val()};this.applyValue=function(item,state){item[args.column.field]=state};this.isValueChanged=function(){return(!($input.val()==""&&defaultValue==null))&&($input.val()!=defaultValue)};this.validate=function(){return{valid:true,msg:null}};this.init()}
function YesNoSelectEditor(args){var $select;var defaultValue;var scope=this;this.init=function(){$select=$("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");$select.appendTo(args.container);$select.focus()};this.destroy=function(){$select.remove()};this.focus=function(){$select.focus()};this.loadValue=function(item){$select.val((defaultValue=item[args.column.field])?"yes":"no");$select.select()};this.serializeValue=function(){return($select.val()=="yes")};this.applyValue=function(item,state){item[args.column.field]=state};this.isValueChanged=function(){return($select.val()!=defaultValue)};this.validate=function(){return{valid:true,msg:null}};this.init()}
function CheckboxEditor(args){var $select;var defaultValue;var scope=this;this.init=function(){$select=$("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");$select.appendTo(args.container);$select.focus()};this.destroy=function(){$select.remove()};this.focus=function(){$select.focus()};this.loadValue=function(item){defaultValue=item[args.column.field];if(defaultValue){$select.attr("checked","checked")} else{$select.removeAttr("checked")}};this.serializeValue=function(){return $select.attr("checked")};this.applyValue=function(item,state){item[args.column.field]=state};this.isValueChanged=function(){return($select.attr("checked")!=defaultValue)};this.validate=function(){return{valid:true,msg:null}};this.init()}
function PercentCompleteEditor(args){var $input,$picker;var defaultValue;var scope=this;this.init=function(){$input=$("<INPUT type=text class='editor-percentcomplete' />");$input.width($(args.container).innerWidth()-25);$input.appendTo(args.container);$picker=$("<div class='editor-percentcomplete-picker' />").appendTo(args.container);$picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");$picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");$input.focus().select();$picker.find(".editor-percentcomplete-slider").slider({orientation:"vertical",range:"min",value:defaultValue,slide: function(event,ui){$input.val(ui.value)}});$picker.find(".editor-percentcomplete-buttons button").bind("click", function(e){$input.val($(this).attr("val"));$picker.find(".editor-percentcomplete-slider").slider("value",$(this).attr("val"))})};this.destroy=function(){$input.remove();$picker.remove()};this.focus=function(){$input.focus()};this.loadValue=function(item){$input.val(defaultValue=item[args.column.field]);$input.select()};this.serializeValue=function(){return parseInt($input.val(),10)||0};this.applyValue=function(item,state){item[args.column.field]=state};this.isValueChanged=function(){return(!($input.val()==""&&defaultValue==null))&&((parseInt($input.val(),10)||0)!=defaultValue)};this.validate=function(){if(isNaN(parseInt($input.val(),10))){return{valid:false,msg:"Please enter a valid positive number"}}
return{valid:true,msg:null}};this.init()}
function LongTextEditor(args){var $input,$wrapper;var defaultValue;var scope=this;this.init=function(){var $container=$("body");$wrapper=$("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>").appendTo($container);$input=$("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>").appendTo($wrapper);$("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>").appendTo($wrapper);$wrapper.find("button:first").bind("click",this.save);$wrapper.find("button:last").bind("click",this.cancel);$input.bind("keydown",this.handleKeyDown);scope.position(args.position);$input.focus().select()};this.handleKeyDown=function(e){if(e.which==$.ui.keyCode.ENTER&&e.ctrlKey){scope.save()} else if(e.which==$.ui.keyCode.ESCAPE){e.preventDefault();scope.cancel()} else if(e.which==$.ui.keyCode.TAB&&e.shiftKey){e.preventDefault();args.grid.navigatePrev()} else if(e.which==$.ui.keyCode.TAB){e.preventDefault();args.grid.navigateNext()}};this.save=function(){args.commitChanges()};this.cancel=function(){$input.val(defaultValue);args.cancelChanges()};this.hide=function(){$wrapper.hide()};this.show=function(){$wrapper.show()};this.position=function(position){$wrapper.css("top",position.top-5).css("left",position.left-5)};this.destroy=function(){$wrapper.remove()};this.focus=function(){$input.focus()};this.loadValue=function(item){$input.val(defaultValue=item[args.column.field]);$input.select()};this.serializeValue=function(){return $input.val()};this.applyValue=function(item,state){item[args.column.field]=state};this.isValueChanged=function(){return(!($input.val()==""&&defaultValue==null))&&($input.val()!=defaultValue)};this.validate=function(){return{valid:true,msg:null}};this.init()}})(jQuery);(function($){$.extend(true,window,{"Slick":{"Formatters":{"PercentComplete":PercentCompleteFormatter,"PercentCompleteBar":PercentCompleteBarFormatter,"YesNo":YesNoFormatter,"Checkmark":CheckmarkFormatter}}});
function PercentCompleteFormatter(row,cell,value,columnDef,dataContext){if(value==null||value===""){return "-"} else if(value<50){return "<span style='color:red;font-weight:bold;'>"+value+"%</span>"} else{return "<span style='color:green'>"+value+"%</span>"}}
function PercentCompleteBarFormatter(row,cell,value,columnDef,dataContext){if(value==null||value===""){return ""}
var color;if(value<30){color="red"} else if(value<70){color="silver"} else{color="green"}
return "<span class='percent-complete-bar' style='background:"+color+";width:"+value+"%'></span>"}
function YesNoFormatter(row,cell,value,columnDef,dataContext){return value?"Yes":"No"}
function CheckmarkFormatter(row,cell,value,columnDef,dataContext){return value?"<img src='++resource++slickgrid-images/tick.png'>":""}})(jQuery);if(typeof jQuery==="undefined"){throw "SlickGrid requires jquery module to be loaded"}
if(!jQuery.fn.drag){throw "SlickGrid requires jquery.event.drag module to be loaded"}
if(typeof Slick==="undefined"){throw "slick.core.js not loaded"}(function($){$.extend(true,window,{Slick:{Grid:SlickGrid}});var scrollbarDimensions;var maxSupportedCssHeight;
function SlickGrid(container,data,columns,options){var defaults={explicitInitialization:false,rowHeight:25,defaultColumnWidth:80,enableAddRow:false,leaveSpaceForNewRows:false,editable:false,autoEdit:true,enableCellNavigation:true,enableColumnReorder:true,asyncEditorLoading:false,asyncEditorLoadDelay:100,forceFitColumns:false,enableAsyncPostRender:false,asyncPostRenderDelay:50,autoHeight:false,editorLock:Slick.GlobalEditorLock,showHeaderRow:false,headerRowHeight:25,showTopPanel:false,topPanelHeight:25,formatterFactory:null,editorFactory:null,cellFlashingCssClass:"flashing",selectedCellCssClass:"selected",multiSelect:true,enableTextSelectionOnCells:false,dataItemColumnValueExtractor:null,fullWidthRows:false,multiColumnSort:false,defaultFormatter:defaultFormatter,forceSyncScrolling:false};var columnDefaults={name:"",resizable:true,sortable:false,minWidth:30,rerenderOnResize:false,headerCssClass:null,defaultSortAsc:true};var th;var h;var ph;var n;var cj;var page=0;var offset=0;var vScrollDir=1;var initialized=false;var $container;var uid="slickgrid_"+Math.round(1000000 * Math.random());var self=this;var $focusSink;var $headerScroller;var $headers;var $headerRow,$headerRowScroller,$headerRowSpacer;var $topPanelScroller;var $topPanel;var $viewport;var $canvas;var $style;var $boundAncestors;var stylesheet,columnCssRulesL,columnCssRulesR;var viewportH,viewportW;var canvasWidth;var viewportHasHScroll,viewportHasVScroll;var headerColumnWidthDiff=0,headerColumnHeightDiff=0,cellWidthDiff=0,cellHeightDiff=0;var absoluteColumnMinWidth;var numberOfRows=0;var activePosX;var activeRow,activeCell;var activeCellNode=null;var currentEditor=null;var serializedEditorValue;var editController;var rowsCache={};var renderedRows=0;var numVisibleRows;var prevScrollTop=0;var scrollTop=0;var lastRenderedScrollTop=0;var lastRenderedScrollLeft=0;var prevScrollLeft=0;var scrollLeft=0;var selectionModel;var selectedRows=[];var plugins=[];var cellCssClasses={};var columnsById={};var sortColumns=[];var columnPosLeft=[];var columnPosRight=[];var h_editorLoader=null;var h_render=null;var h_postrender=null;var postProcessedRows={};var postProcessToRow=null;var postProcessFromRow=null;var counter_rows_rendered=0;var counter_rows_removed=0;
function init(){$container=$(container);if($container.length<1){throw new Error("SlickGrid requires a valid container, "+container+" does not exist in the DOM.")}
maxSupportedCssHeight=maxSupportedCssHeight||getMaxSupportedCssHeight();scrollbarDimensions=scrollbarDimensions||measureScrollbar();options=$.extend({},defaults,options);validateAndEnforceOptions();columnDefaults.width=options.defaultColumnWidth;columnsById={};for(var i=0;i<columns.length;i++){var m=columns[i]=$.extend({},columnDefaults,columns[i]);columnsById[m.id]=i;if(m.minWidth&&m.width<m.minWidth){m.width=m.minWidth}
if(m.maxWidth&&m.width>m.maxWidth){m.width=m.maxWidth}}
if(options.enableColumnReorder&&!$.fn.sortable){throw new Error("SlickGrid's 'enableColumnReorder = true' option requires jquery-ui.sortable module to be loaded")}
editController={"commitCurrentEdit":commitCurrentEdit,"cancelCurrentEdit":cancelCurrentEdit};$container.empty().css("overflow","hidden").css("outline",0).addClass(uid).addClass("ui-widget");if(!/relative|absolute|fixed/.test($container.css("position"))){$container.css("position","relative")}
$focusSink=$("<div tabIndex='0' hideFocus style='position:fixed;width:0;height:0;top:0;left:0;outline:0;'></div>").appendTo($container);$headerScroller=$("<div class='slick-header ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);$headers=$("<div class='slick-header-columns' style='left:-1000px' />").appendTo($headerScroller);$headers.width(getHeadersWidth());$headerRowScroller=$("<div class='slick-headerrow ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);$headerRow=$("<div class='slick-headerrow-columns' />").appendTo($headerRowScroller);$headerRowSpacer=$("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>").css("width",getCanvasWidth()+scrollbarDimensions.width+"px").appendTo($headerRowScroller);$topPanelScroller=$("<div class='slick-top-panel-scroller ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($container);$topPanel=$("<div class='slick-top-panel' style='width:10000px' />").appendTo($topPanelScroller);if(!options.showTopPanel){$topPanelScroller.hide()}
if(!options.showHeaderRow){$headerRowScroller.hide()}
$viewport=$("<div class='slick-viewport' style='width:100%;overflow:auto;outline:0;position:relative;;'>").appendTo($container);$viewport.css("overflow-y",options.autoHeight?"hidden":"auto");$canvas=$("<div class='grid-canvas' />").appendTo($viewport);if(!options.explicitInitialization){finishInitialization()}}
function finishInitialization(){if(!initialized){initialized=true;viewportW=parseFloat($.css($container[0],"width",true));measureCellPaddingAndBorder();disableSelection($headers);if(!options.enableTextSelectionOnCells){$viewport.bind("selectstart.ui", function(event){return $(event.target).is("input,textarea")})}
updateColumnCaches();createColumnHeaders();setupColumnSort();createCssRules();resizeCanvas();bindAncestorScrollEvents();$container.bind("resize.slickgrid",resizeCanvas);$viewport.bind("scroll",handleScroll);$headerScroller.bind("contextmenu",handleHeaderContextMenu).bind("click",handleHeaderClick).delegate(".slick-header-column","mouseenter",handleHeaderMouseEnter).delegate(".slick-header-column","mouseleave",handleHeaderMouseLeave);$headerRowScroller.bind("scroll",handleHeaderRowScroll);$focusSink.bind("keydown",handleKeyDown);$canvas.bind("keydown",handleKeyDown).bind("click",handleClick).bind("dblclick",handleDblClick).bind("contextmenu",handleContextMenu).bind("draginit",handleDragInit).bind("dragstart",handleDragStart).bind("drag",handleDrag).bind("dragend",handleDragEnd).delegate(".slick-cell","mouseenter",handleMouseEnter).delegate(".slick-cell","mouseleave",handleMouseLeave)}}
function registerPlugin(plugin){plugins.unshift(plugin);plugin.init(self)}
function unregisterPlugin(plugin){for(var i=plugins.length;i>=0;i--){if(plugins[i]===plugin){if(plugins[i].destroy){plugins[i].destroy()}
plugins.splice(i,1);break}}}
function setSelectionModel(model){if(selectionModel){selectionModel.onSelectedRangesChanged.unsubscribe(handleSelectedRangesChanged);if(selectionModel.destroy){selectionModel.destroy()}}
selectionModel=model;if(selectionModel){selectionModel.init(self);selectionModel.onSelectedRangesChanged.subscribe(handleSelectedRangesChanged)}}
function getSelectionModel(){return selectionModel}
function getCanvasNode(){return $canvas[0]}
function measureScrollbar(){var $c=$("<div style='position:absolute; top:-10000px; left:-10000px; width:100px; height:100px; overflow:scroll;'></div>").appendTo("body");var dim={width:$c.width()-$c[0].clientWidth,height:$c.height()-$c[0].clientHeight};$c.remove();return dim}
function getHeadersWidth(){var headersWidth=0;for(var i=0,ii=columns.length;i<ii;i++){var width=columns[i].width;headersWidth+=width}
headersWidth+=scrollbarDimensions.width;return Math.max(headersWidth,viewportW)+1000}
function getCanvasWidth(){var availableWidth=viewportHasVScroll?viewportW-scrollbarDimensions.width:viewportW;var rowWidth=0;var i=columns.length;while(i--){rowWidth+=columns[i].width}
return options.fullWidthRows?Math.max(rowWidth,availableWidth):rowWidth}
function updateCanvasWidth(forceColumnWidthsUpdate){var oldCanvasWidth=canvasWidth;canvasWidth=getCanvasWidth();if(canvasWidth!=oldCanvasWidth){$canvas.width(canvasWidth);$headerRow.width(canvasWidth);$headers.width(getHeadersWidth());viewportHasHScroll=(canvasWidth>viewportW-scrollbarDimensions.width)}
$headerRowSpacer.width(canvasWidth+(viewportHasVScroll?scrollbarDimensions.width:0));if(canvasWidth!=oldCanvasWidth||forceColumnWidthsUpdate){applyColumnWidths()}}
function disableSelection($target){if($target&&$target.jquery){$target.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui", function(){return false})}}
function getMaxSupportedCssHeight(){var supportedHeight=1000000;var testUpTo=($.browser.mozilla)?6000000:1000000000;var div=$("<div style='display:none' />").appendTo(document.body);while(true){var test=supportedHeight * 2;div.css("height",test);if(test>testUpTo||div.height()!==test){break} else{supportedHeight=test}}
div.remove();return supportedHeight}
function bindAncestorScrollEvents(){var elem=$canvas[0];while((elem=elem.parentNode)!=document.body&&elem!=null){if(elem==$viewport[0]||elem.scrollWidth!=elem.clientWidth||elem.scrollHeight!=elem.clientHeight){var $elem=$(elem);if(!$boundAncestors){$boundAncestors=$elem} else{$boundAncestors=$boundAncestors.add($elem)}
$elem.bind("scroll."+uid,handleActiveCellPositionChange)}}}
function unbindAncestorScrollEvents(){if(!$boundAncestors){return}
$boundAncestors.unbind("scroll."+uid);$boundAncestors=null}
function updateColumnHeader(columnId,title,toolTip){if(!initialized){return}
var idx=getColumnIndex(columnId);if(idx==null){return}
var columnDef=columns[idx];var $header=$headers.children().eq(idx);if($header){if(title!==undefined){columns[idx].name=title}
if(toolTip!==undefined){columns[idx].toolTip=toolTip}
trigger(self.onBeforeHeaderCellDestroy,{"node":$header[0],"column":columnDef});$header.attr("title",toolTip||"").children().eq(0).html(title);trigger(self.onHeaderCellRendered,{"node":$header[0],"column":columnDef})}}
function getHeaderRow(){return $headerRow[0]}
function getHeaderRowColumn(columnId){var idx=getColumnIndex(columnId);var $header=$headerRow.children().eq(idx);return $header&&$header[0]}
function createColumnHeaders(){
function hoverBegin(){$(this).addClass("ui-state-hover")}
function hoverEnd(){$(this).removeClass("ui-state-hover")}
$headers.find(".slick-header-column").each(function(){var columnDef=$(this).data("column");if(columnDef){trigger(self.onBeforeHeaderCellDestroy,{"node":this,"column":columnDef})}});$headers.empty();$headers.width(getHeadersWidth());$headerRow.find(".slick-headerrow-column").each(function(){var columnDef=$(this).data("column");if(columnDef){trigger(self.onBeforeHeaderRowCellDestroy,{"node":this,"column":columnDef})}});$headerRow.empty();for(var i=0;i<columns.length;i++){var m=columns[i];var header=$("<div class='ui-state-default slick-header-column' id='"+uid+m.id+"' />").html("<span class='slick-column-name'>"+m.name+"</span>").width(m.width-headerColumnWidthDiff).attr("title",m.toolTip||"").data("column",m).addClass(m.headerCssClass||"").appendTo($headers);if(options.enableColumnReorder||m.sortable){header.hover(hoverBegin,hoverEnd)}
if(m.sortable){header.append("<span class='slick-sort-indicator' />")}
trigger(self.onHeaderCellRendered,{"node":header[0],"column":m});if(options.showHeaderRow){var headerRowCell=$("<div class='ui-state-default slick-headerrow-column l"+i+" r"+i+"'></div>").data("column",m).appendTo($headerRow);trigger(self.onHeaderRowCellRendered,{"node":headerRowCell[0],"column":m})}}
setSortColumns(sortColumns);setupColumnResize();if(options.enableColumnReorder){setupColumnReorder()}}
function setupColumnSort(){$headers.click(function(e){e.metaKey=e.metaKey||e.ctrlKey;if($(e.target).hasClass("slick-resizable-handle")){return}
var $col=$(e.target).closest(".slick-header-column");if(!$col.length){return}
var column=$col.data("column");if(column.sortable){if(!getEditorLock().commitCurrentEdit()){return}
var sortOpts=null;var i=0;for(;i<sortColumns.length;i++){if(sortColumns[i].columnId==column.id){sortOpts=sortColumns[i];sortOpts.sortAsc=!sortOpts.sortAsc;break}}
if(e.metaKey&&options.multiColumnSort){if(sortOpts){sortColumns.splice(i,1)}}
else{if((!e.shiftKey&&!e.metaKey)||!options.multiColumnSort){sortColumns=[]}
if(!sortOpts){sortOpts={columnId:column.id,sortAsc:column.defaultSortAsc};sortColumns.push(sortOpts)} else if(sortColumns.length==0){sortColumns.push(sortOpts)}}
setSortColumns(sortColumns);if(!options.multiColumnSort){trigger(self.onSort,{multiColumnSort:false,sortCol:column,sortAsc:sortOpts.sortAsc},e)} else{trigger(self.onSort,{multiColumnSort:true,sortCols:$.map(sortColumns, function(col){return{sortCol:columns[getColumnIndex(col.columnId)],sortAsc:col.sortAsc}})},e)}}})}
function setupColumnReorder(){try{$headers.sortable("destroy")}catch(err){}
$headers.sortable({containment:"parent",axis:"x",cursor:"default",tolerance:"intersection",helper:"clone",delay:300,placeholder:"slick-sortable-placeholder ui-state-default slick-header-column",forcePlaceholderSize:true,start: function(e,ui){$(ui.helper).addClass("slick-header-column-active")},beforeStop: function(e,ui){$(ui.helper).removeClass("slick-header-column-active")},stop: function(e){if(!getEditorLock().commitCurrentEdit()){$(this).sortable("cancel");return}
var reorderedIds=$headers.sortable("toArray");var reorderedColumns=[];for(var i=0;i<reorderedIds.length;i++){reorderedColumns.push(columns[getColumnIndex(reorderedIds[i].replace(uid,""))])}
setColumns(reorderedColumns);trigger(self.onColumnsReordered,{});e.stopPropagation();setupColumnResize()}})}
function setupColumnResize(){var $col,j,c,pageX,columnElements,minPageX,maxPageX,firstResizable,lastResizable;columnElements=$headers.children();columnElements.find(".slick-resizable-handle").remove();columnElements.each(function(i,e){if(columns[i].resizable){if(firstResizable===undefined){firstResizable=i}
lastResizable=i}});if(firstResizable===undefined){return}
columnElements.each(function(i,e){if(i<firstResizable||(options.forceFitColumns&&i>=lastResizable)){return}
$col=$(e);$("<div class='slick-resizable-handle' />").appendTo(e).bind("dragstart", function(e,dd){if(!getEditorLock().commitCurrentEdit()){return false}
pageX=e.pageX;$(this).parent().addClass("slick-header-column-active");var shrinkLeewayOnRight=null,stretchLeewayOnRight=null;columnElements.each(function(i,e){columns[i].previousWidth=$(e).outerWidth()});if(options.forceFitColumns){shrinkLeewayOnRight=0;stretchLeewayOnRight=0;for(j=i+1;j<columnElements.length;j++){c=columns[j];if(c.resizable){if(stretchLeewayOnRight!==null){if(c.maxWidth){stretchLeewayOnRight+=c.maxWidth-c.previousWidth} else{stretchLeewayOnRight=null}}
shrinkLeewayOnRight+=c.previousWidth-Math.max(c.minWidth||0,absoluteColumnMinWidth)}}}
var shrinkLeewayOnLeft=0,stretchLeewayOnLeft=0;for(j=0;j<=i;j++){c=columns[j];if(c.resizable){if(stretchLeewayOnLeft!==null){if(c.maxWidth){stretchLeewayOnLeft+=c.maxWidth-c.previousWidth} else{stretchLeewayOnLeft=null}}
shrinkLeewayOnLeft+=c.previousWidth-Math.max(c.minWidth||0,absoluteColumnMinWidth)}}
if(shrinkLeewayOnRight===null){shrinkLeewayOnRight=100000}
if(shrinkLeewayOnLeft===null){shrinkLeewayOnLeft=100000}
if(stretchLeewayOnRight===null){stretchLeewayOnRight=100000}
if(stretchLeewayOnLeft===null){stretchLeewayOnLeft=100000}
maxPageX=pageX+Math.min(shrinkLeewayOnRight,stretchLeewayOnLeft);minPageX=pageX-Math.min(shrinkLeewayOnLeft,stretchLeewayOnRight)}).bind("drag", function(e,dd){var actualMinWidth,d=Math.min(maxPageX,Math.max(minPageX,e.pageX))-pageX,x;if(d<0){x=d;for(j=i;j>=0;j--){c=columns[j];if(c.resizable){actualMinWidth=Math.max(c.minWidth||0,absoluteColumnMinWidth);if(x&&c.previousWidth+x<actualMinWidth){x+=c.previousWidth-actualMinWidth;c.width=actualMinWidth} else{c.width=c.previousWidth+x;x=0}}}
if(options.forceFitColumns){x=-d;for(j=i+1;j<columnElements.length;j++){c=columns[j];if(c.resizable){if(x&&c.maxWidth&&(c.maxWidth-c.previousWidth<x)){x-=c.maxWidth-c.previousWidth;c.width=c.maxWidth} else{c.width=c.previousWidth+x;x=0}}}}} else{x=d;for(j=i;j>=0;j--){c=columns[j];if(c.resizable){if(x&&c.maxWidth&&(c.maxWidth-c.previousWidth<x)){x-=c.maxWidth-c.previousWidth;c.width=c.maxWidth} else{c.width=c.previousWidth+x;x=0}}}
if(options.forceFitColumns){x=-d;for(j=i+1;j<columnElements.length;j++){c=columns[j];if(c.resizable){actualMinWidth=Math.max(c.minWidth||0,absoluteColumnMinWidth);if(x&&c.previousWidth+x<actualMinWidth){x+=c.previousWidth-actualMinWidth;c.width=actualMinWidth} else{c.width=c.previousWidth+x;x=0}}}}}
applyColumnHeaderWidths();if(options.syncColumnCellResize){applyColumnWidths()}}).bind("dragend", function(e,dd){var newWidth;$(this).parent().removeClass("slick-header-column-active");for(j=0;j<columnElements.length;j++){c=columns[j];newWidth=$(columnElements[j]).outerWidth();if(c.previousWidth!==newWidth&&c.rerenderOnResize){invalidateAllRows()}}
updateCanvasWidth(true);render();trigger(self.onColumnsResized,{})})})}
function getVBoxDelta($el){var p=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];var delta=0;$.each(p, function(n,val){delta+=parseFloat($el.css(val))||0});return delta}
function measureCellPaddingAndBorder(){var el;var h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];var v=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];el=$("<div class='ui-state-default slick-header-column' style='visibility:hidden'>-</div>").appendTo($headers);headerColumnWidthDiff=headerColumnHeightDiff=0;$.each(h, function(n,val){headerColumnWidthDiff+=parseFloat(el.css(val))||0});$.each(v, function(n,val){headerColumnHeightDiff+=parseFloat(el.css(val))||0});el.remove();var r=$("<div class='slick-row' />").appendTo($canvas);el=$("<div class='slick-cell' id='' style='visibility:hidden'>-</div>").appendTo(r);cellWidthDiff=cellHeightDiff=0;$.each(h, function(n,val){cellWidthDiff+=parseFloat(el.css(val))||0});$.each(v, function(n,val){cellHeightDiff+=parseFloat(el.css(val))||0});r.remove();absoluteColumnMinWidth=Math.max(headerColumnWidthDiff,cellWidthDiff)}
function createCssRules(){$style=$("<style type='text/css' rel='stylesheet' />").appendTo($("head"));var rowHeight=(options.rowHeight-cellHeightDiff);var rules=["."+uid+" .slick-header-column { left: 1000px; }","."+uid+" .slick-top-panel { height:"+options.topPanelHeight+"px; }","."+uid+" .slick-headerrow-columns { height:"+options.headerRowHeight+"px; }","."+uid+" .slick-cell { height:"+rowHeight+"px; }","."+uid+" .slick-row { height:"+options.rowHeight+"px; }"];for(var i=0;i<columns.length;i++){rules.push("."+uid+" .l"+i+" { }");rules.push("."+uid+" .r"+i+" { }")}
if($style[0].styleSheet){$style[0].styleSheet.cssText=rules.join(" ")} else{$style[0].appendChild(document.createTextNode(rules.join(" ")))}}
function getColumnCssRules(idx){if(!stylesheet){var sheets=document.styleSheets;for(var i=0;i<sheets.length;i++){if((sheets[i].ownerNode||sheets[i].owningElement)==$style[0]){stylesheet=sheets[i];break}}
if(!stylesheet){throw new Error("Cannot find stylesheet.")}
columnCssRulesL=[];columnCssRulesR=[];var cssRules=(stylesheet.cssRules||stylesheet.rules);var matches,columnIdx;for(var i=0;i<cssRules.length;i++){var selector=cssRules[i].selectorText;if(matches=/\.l\d+/.exec(selector)){columnIdx=parseInt(matches[0].substr(2,matches[0].length-2),10);columnCssRulesL[columnIdx]=cssRules[i]} else if(matches=/\.r\d+/.exec(selector)){columnIdx=parseInt(matches[0].substr(2,matches[0].length-2),10);columnCssRulesR[columnIdx]=cssRules[i]}}}
return{"left":columnCssRulesL[idx],"right":columnCssRulesR[idx]}}
function removeCssRules(){$style.remove();stylesheet=null}
function destroy(){getEditorLock().cancelCurrentEdit();trigger(self.onBeforeDestroy,{});var i=plugins.length;while(i--){unregisterPlugin(plugins[i])}
if(options.enableColumnReorder&&$headers.sortable){try{$headers.sortable("destroy")} catch(err){}}
unbindAncestorScrollEvents();$container.unbind(".slickgrid");removeCssRules();$canvas.unbind("draginit dragstart dragend drag");$container.empty().removeClass(uid)}
function trigger(evt,args,e){e=e||new Slick.EventData();args=args||{};args.grid=self;return evt.notify(args,e,self)}
function getEditorLock(){return options.editorLock}
function getEditController(){return editController}
function getColumnIndex(id){return columnsById[id]}
function autosizeColumns(){var i,c,widths=[],shrinkLeeway=0,total=0,prevTotal,availWidth=viewportHasVScroll?viewportW-scrollbarDimensions.width:viewportW;for(i=0;i<columns.length;i++){c=columns[i];widths.push(c.width);total+=c.width;if(c.resizable){shrinkLeeway+=c.width-Math.max(c.minWidth,absoluteColumnMinWidth)}}
prevTotal=total;while(total>availWidth&&shrinkLeeway){var shrinkProportion=(total-availWidth)/shrinkLeeway;for(i=0;i<columns.length&&total>availWidth;i++){c=columns[i];var width=widths[i];if(!c.resizable||width<=c.minWidth||width<=absoluteColumnMinWidth){continue}
var absMinWidth=Math.max(c.minWidth,absoluteColumnMinWidth);var shrinkSize=Math.floor(shrinkProportion *(width-absMinWidth))||1;shrinkSize=Math.min(shrinkSize,width-absMinWidth);total-=shrinkSize;shrinkLeeway-=shrinkSize;widths[i]-=shrinkSize}
if(prevTotal==total){break}
prevTotal=total}
prevTotal=total;while(total<availWidth){var growProportion=availWidth/total;for(i=0;i<columns.length&&total<availWidth;i++){c=columns[i];if(!c.resizable||c.maxWidth<=c.width){continue}
var growSize=Math.min(Math.floor(growProportion * c.width)-c.width,(c.maxWidth-c.width)||1000000)||1;total+=growSize;widths[i]+=growSize}
if(prevTotal==total){break}
prevTotal=total}
var reRender=false;for(i=0;i<columns.length;i++){if(columns[i].rerenderOnResize&&columns[i].width!=widths[i]){reRender=true}
columns[i].width=widths[i]}
applyColumnHeaderWidths();updateCanvasWidth(true);if(reRender){invalidateAllRows();render()}}
function applyColumnHeaderWidths(){if(!initialized){return}
var h;for(var i=0,headers=$headers.children(),ii=headers.length;i<ii;i++){h=$(headers[i]);if(h.width()!==columns[i].width-headerColumnWidthDiff){h.width(columns[i].width-headerColumnWidthDiff)}}
updateColumnCaches()}
function applyColumnWidths(){var x=0,w,rule;for(var i=0;i<columns.length;i++){w=columns[i].width;rule=getColumnCssRules(i);rule.left.style.left=x+"px";rule.right.style.right=(canvasWidth-x-w)+"px";x+=columns[i].width}}
function setSortColumn(columnId,ascending){setSortColumns([{columnId:columnId,sortAsc:ascending}])}
function setSortColumns(cols){sortColumns=cols;var headerColumnEls=$headers.children();headerColumnEls.removeClass("slick-header-column-sorted").find(".slick-sort-indicator").removeClass("slick-sort-indicator-asc slick-sort-indicator-desc");$.each(sortColumns, function(i,col){if(col.sortAsc==null){col.sortAsc=true}
var columnIndex=getColumnIndex(col.columnId);if(columnIndex!=null){headerColumnEls.eq(columnIndex).addClass("slick-header-column-sorted").find(".slick-sort-indicator").addClass(col.sortAsc?"slick-sort-indicator-asc":"slick-sort-indicator-desc")}})}
function getSortColumns(){return sortColumns}
function handleSelectedRangesChanged(e,ranges){selectedRows=[];var hash={};for(var i=0;i<ranges.length;i++){for(var j=ranges[i].fromRow;j<=ranges[i].toRow;j++){if(!hash[j]){selectedRows.push(j);hash[j]={}}
for(var k=ranges[i].fromCell;k<=ranges[i].toCell;k++){if(canCellBeSelected(j,k)){hash[j][columns[k].id]=options.selectedCellCssClass}}}}
setCellCssStyles(options.selectedCellCssClass,hash);trigger(self.onSelectedRowsChanged,{rows:getSelectedRows()},e)}
function getColumns(){return columns}
function updateColumnCaches(){columnPosLeft=[];columnPosRight=[];var x=0;for(var i=0,ii=columns.length;i<ii;i++){columnPosLeft[i]=x;columnPosRight[i]=x+columns[i].width;x+=columns[i].width}}
function setColumns(columnDefinitions){columns=columnDefinitions;columnsById={};for(var i=0;i<columns.length;i++){var m=columns[i]=$.extend({},columnDefaults,columns[i]);columnsById[m.id]=i;if(m.minWidth&&m.width<m.minWidth){m.width=m.minWidth}
if(m.maxWidth&&m.width>m.maxWidth){m.width=m.maxWidth}}
updateColumnCaches();if(initialized){invalidateAllRows();createColumnHeaders();removeCssRules();createCssRules();resizeCanvas();applyColumnWidths();handleScroll()}}
function getOptions(){return options}
function setOptions(args){if(!getEditorLock().commitCurrentEdit()){return}
makeActiveCellNormal();if(options.enableAddRow!==args.enableAddRow){invalidateRow(getDataLength())}
options=$.extend(options,args);validateAndEnforceOptions();$viewport.css("overflow-y",options.autoHeight?"hidden":"auto");render()}
function validateAndEnforceOptions(){if(options.autoHeight){options.leaveSpaceForNewRows=false}}
function setData(newData,scrollToTop){data=newData;invalidateAllRows();updateRowCount();if(scrollToTop){scrollTo(0)}}
function getData(){return data}
function getDataLength(){if(data.getLength){return data.getLength()} else{return data.length}}
function getDataItem(i){if(data.getItem){return data.getItem(i)} else{return data[i]}}
function getTopPanel(){return $topPanel[0]}
function setTopPanelVisibility(visible){if(options.showTopPanel!=visible){options.showTopPanel=visible;if(visible){$topPanelScroller.slideDown("fast",resizeCanvas)} else{$topPanelScroller.slideUp("fast",resizeCanvas)}}}
function setHeaderRowVisibility(visible){if(options.showHeaderRow!=visible){options.showHeaderRow=visible;if(visible){$headerRowScroller.slideDown("fast",resizeCanvas)} else{$headerRowScroller.slideUp("fast",resizeCanvas)}}}
function scrollTo(y){y=Math.max(y,0);y=Math.min(y,th-viewportH+(viewportHasHScroll?scrollbarDimensions.height:0));var oldOffset=offset;page=Math.min(n-1,Math.floor(y/ph));offset=Math.round(page * cj);var newScrollTop=y-offset;if(offset!=oldOffset){var range=getVisibleRange(newScrollTop);cleanupRows(range);updateRowPositions()}
if(prevScrollTop!=newScrollTop){vScrollDir=(prevScrollTop+oldOffset<newScrollTop+offset)?1:-1;$viewport[0].scrollTop=(lastRenderedScrollTop=scrollTop=prevScrollTop=newScrollTop);trigger(self.onViewportChanged,{})}}
function defaultFormatter(row,cell,value,columnDef,dataContext){if(value==null){return ""} else{return value.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}
function getFormatter(row,column){var rowMetadata=data.getItemMetadata&&data.getItemMetadata(row);var columnOverrides=rowMetadata&&rowMetadata.columns&&(rowMetadata.columns[column.id]||rowMetadata.columns[getColumnIndex(column.id)]);return(columnOverrides&&columnOverrides.formatter)||(rowMetadata&&rowMetadata.formatter)||column.formatter||(options.formatterFactory&&options.formatterFactory.getFormatter(column))||options.defaultFormatter}
function getEditor(row,cell){var column=columns[cell];var rowMetadata=data.getItemMetadata&&data.getItemMetadata(row);var columnMetadata=rowMetadata&&rowMetadata.columns;if(columnMetadata&&columnMetadata[column.id]&&columnMetadata[column.id].editor!==undefined){return columnMetadata[column.id].editor}
if(columnMetadata&&columnMetadata[cell]&&columnMetadata[cell].editor!==undefined){return columnMetadata[cell].editor}
return column.editor||(options.editorFactory&&options.editorFactory.getEditor(column))}
function getDataItemValueForColumn(item,columnDef){if(options.dataItemColumnValueExtractor){return options.dataItemColumnValueExtractor(item,columnDef)}
return item[columnDef.field]}
function appendRowHtml(stringArray,row,range){var d=getDataItem(row);var dataLoading=row<getDataLength()&&!d;var rowCss="slick-row"+(dataLoading?" loading":"")+(row===activeRow?" active":"")+(row%2==1?" odd":" even");var metadata=data.getItemMetadata&&data.getItemMetadata(row);if(metadata&&metadata.cssClasses){rowCss+=" "+metadata.cssClasses}
stringArray.push("<div class='ui-widget-content "+rowCss+"' style='top:"+(options.rowHeight * row-offset)+"px'>");var colspan,m;for(var i=0,ii=columns.length;i<ii;i++){m=columns[i];colspan=1;if(metadata&&metadata.columns){var columnData=metadata.columns[m.id]||metadata.columns[i];colspan=(columnData&&columnData.colspan)||1;if(colspan==="*"){colspan=ii-i}}
if(columnPosRight[Math.min(ii-1,i+colspan-1)]>range.leftPx){if(columnPosLeft[i]>range.rightPx){break}
appendCellHtml(stringArray,row,i,colspan)}
if(colspan>1){i+=(colspan-1)}}
stringArray.push("</div>")}
function appendCellHtml(stringArray,row,cell,colspan){var m=columns[cell];var d=getDataItem(row);var cellCss="slick-cell l"+cell+" r"+Math.min(columns.length-1,cell+colspan-1)+(m.cssClass?" "+m.cssClass:"");if(row===activeRow&&cell===activeCell){cellCss+=(" active")}
for(var key in cellCssClasses){if(cellCssClasses[key][row]&&cellCssClasses[key][row][m.id]){cellCss+=(" "+cellCssClasses[key][row][m.id])}}
stringArray.push("<div class='"+cellCss+"'>");if(d){var value=getDataItemValueForColumn(d,m);stringArray.push(getFormatter(row,m)(row,cell,value,m,d))}
stringArray.push("</div>");rowsCache[row].cellRenderQueue.push(cell);rowsCache[row].cellColSpans[cell]=colspan}
function cleanupRows(rangeToKeep){for(var i in rowsCache){if(((i=parseInt(i,10))!==activeRow)&&(i<rangeToKeep.top||i>rangeToKeep.bottom)){removeRowFromCache(i)}}}
function invalidate(){updateRowCount();invalidateAllRows();render()}
function invalidateAllRows(){if(currentEditor){makeActiveCellNormal()}
for(var row in rowsCache){removeRowFromCache(row)}}
function removeRowFromCache(row){var cacheEntry=rowsCache[row];if(!cacheEntry){return}
$canvas[0].removeChild(cacheEntry.rowNode);delete rowsCache[row];delete postProcessedRows[row];renderedRows--;counter_rows_removed++}
function invalidateRows(rows){var i,rl;if(!rows||!rows.length){return}
vScrollDir=0;for(i=0,rl=rows.length;i<rl;i++){if(currentEditor&&activeRow===rows[i]){makeActiveCellNormal()}
if(rowsCache[rows[i]]){removeRowFromCache(rows[i])}}}
function invalidateRow(row){invalidateRows([row])}
function updateCell(row,cell){var cellNode=getCellNode(row,cell);if(!cellNode){return}
var m=columns[cell],d=getDataItem(row);if(currentEditor&&activeRow===row&&activeCell===cell){currentEditor.loadValue(d)} else{cellNode.innerHTML=d?getFormatter(row,m)(row,cell,getDataItemValueForColumn(d,m),m,d):"";invalidatePostProcessingResults(row)}}
function updateRow(row){var cacheEntry=rowsCache[row];if(!cacheEntry){return}
ensureCellNodesInRowsCache(row);for(var columnIdx in cacheEntry.cellNodesByColumnIdx){if(!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)){continue}
columnIdx=columnIdx|0;var m=columns[columnIdx],d=getDataItem(row),node=cacheEntry.cellNodesByColumnIdx[columnIdx];if(row===activeRow&&columnIdx===activeCell&&currentEditor){currentEditor.loadValue(d)} else if(d){node.innerHTML=getFormatter(row,m)(row,columnIdx,getDataItemValueForColumn(d,m),m,d)} else{node.innerHTML=""}}
invalidatePostProcessingResults(row)}
function getViewportHeight(){return parseFloat($.css($container[0],"height",true))-parseFloat($.css($container[0],"paddingTop",true))-parseFloat($.css($container[0],"paddingBottom",true))-parseFloat($.css($headerScroller[0],"height"))-getVBoxDelta($headerScroller)-(options.showTopPanel?options.topPanelHeight+getVBoxDelta($topPanelScroller):0)-(options.showHeaderRow?options.headerRowHeight+getVBoxDelta($headerRowScroller):0)}
function resizeCanvas(){if(!initialized){return}
if(options.autoHeight){viewportH=options.rowHeight *(getDataLength()+(options.enableAddRow?1:0))} else{viewportH=getViewportHeight()}
numVisibleRows=Math.ceil(viewportH/options.rowHeight);viewportW=parseFloat($.css($container[0],"width",true));if(!options.autoHeight){$viewport.height(viewportH)}
if(options.forceFitColumns){autosizeColumns()}
updateRowCount();handleScroll();render()}
function updateRowCount(){if(!initialized){return}
numberOfRows=getDataLength()+(options.enableAddRow?1:0)+(options.leaveSpaceForNewRows?numVisibleRows-1:0);var oldViewportHasVScroll=viewportHasVScroll;viewportHasVScroll=!options.autoHeight&&(numberOfRows * options.rowHeight>viewportH);var l=options.enableAddRow?getDataLength():getDataLength()-1;for(var i in rowsCache){if(i>=l){removeRowFromCache(i)}}
if(activeCellNode&&activeRow>l){resetActiveCell()}
var oldH=h;th=Math.max(options.rowHeight * numberOfRows,viewportH-scrollbarDimensions.height);if(th<maxSupportedCssHeight){h=ph=th;n=1;cj=0} else{h=maxSupportedCssHeight;ph=h/100;n=Math.floor(th/ph);cj=(th-h)/(n-1)}
if(h!==oldH){$canvas.css("height",h);scrollTop=$viewport[0].scrollTop}
var oldScrollTopInRange=(scrollTop+offset<=th-viewportH);if(th==0||scrollTop==0){page=offset=0} else if(oldScrollTopInRange){scrollTo(scrollTop+offset)} else{scrollTo(th-viewportH)}
if(h!=oldH&&options.autoHeight){resizeCanvas()}
if(options.forceFitColumns&&oldViewportHasVScroll!=viewportHasVScroll){autosizeColumns()}
updateCanvasWidth(false)}
function getVisibleRange(viewportTop,viewportLeft){if(viewportTop==null){viewportTop=scrollTop}
if(viewportLeft==null){viewportLeft=scrollLeft}
return{top:Math.floor((viewportTop+offset)/options.rowHeight),bottom:Math.ceil((viewportTop+offset+viewportH)/options.rowHeight),leftPx:viewportLeft,rightPx:viewportLeft+viewportW}}
function getRenderedRange(viewportTop,viewportLeft){var range=getVisibleRange(viewportTop,viewportLeft);var buffer=Math.round(viewportH/options.rowHeight);var minBuffer=3;if(vScrollDir==-1){range.top-=buffer;range.bottom+=minBuffer} else if(vScrollDir==1){range.top-=minBuffer;range.bottom+=buffer} else{range.top-=minBuffer;range.bottom+=minBuffer}
range.top=Math.max(0,range.top);range.bottom=Math.min(options.enableAddRow?getDataLength():getDataLength()-1,range.bottom);range.leftPx-=viewportW;range.rightPx+=viewportW;range.leftPx=Math.max(0,range.leftPx);range.rightPx=Math.min(canvasWidth,range.rightPx);return range}
function ensureCellNodesInRowsCache(row){var cacheEntry=rowsCache[row];if(cacheEntry){if(cacheEntry.cellRenderQueue.length){var lastChild=cacheEntry.rowNode.lastChild;while(cacheEntry.cellRenderQueue.length){var columnIdx=cacheEntry.cellRenderQueue.pop();cacheEntry.cellNodesByColumnIdx[columnIdx]=lastChild;lastChild=lastChild.previousSibling}}}}
function cleanUpCells(range,row){var totalCellsRemoved=0;var cacheEntry=rowsCache[row];var cellsToRemove=[];for(var i in cacheEntry.cellNodesByColumnIdx){if(!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(i)){continue}
i=i|0;var colspan=cacheEntry.cellColSpans[i];if(columnPosLeft[i]>range.rightPx||columnPosRight[Math.min(columns.length-1,i+colspan-1)]<range.leftPx){if(!(row==activeRow&&i==activeCell)){cellsToRemove.push(i)}}}
var cellToRemove;while((cellToRemove=cellsToRemove.pop())!=null){cacheEntry.rowNode.removeChild(cacheEntry.cellNodesByColumnIdx[cellToRemove]);delete cacheEntry.cellColSpans[cellToRemove];delete cacheEntry.cellNodesByColumnIdx[cellToRemove];if(postProcessedRows[row]){delete postProcessedRows[row][cellToRemove]}
totalCellsRemoved++}}
function cleanUpAndRenderCells(range){var cacheEntry;var stringArray=[];var processedRows=[];var cellsAdded;var totalCellsAdded=0;var colspan;for(var row=range.top;row<=range.bottom;row++){cacheEntry=rowsCache[row];if(!cacheEntry){continue}
ensureCellNodesInRowsCache(row);cleanUpCells(range,row);cellsAdded=0;var metadata=data.getItemMetadata&&data.getItemMetadata(row);metadata=metadata&&metadata.columns;for(var i=0,ii=columns.length;i<ii;i++){if(columnPosLeft[i]>range.rightPx){break}
if((colspan=cacheEntry.cellColSpans[i])!=null){i+=(colspan>1?colspan-1:0);continue}
colspan=1;if(metadata){var columnData=metadata[columns[i].id]||metadata[i];colspan=(columnData&&columnData.colspan)||1;if(colspan==="*"){colspan=ii-i}}
if(columnPosRight[Math.min(ii-1,i+colspan-1)]>range.leftPx){appendCellHtml(stringArray,row,i,colspan);cellsAdded++}
i+=(colspan>1?colspan-1:0)}
if(cellsAdded){totalCellsAdded+=cellsAdded;processedRows.push(row)}}
if(!stringArray.length){return}
var x=document.createElement("div");x.innerHTML=stringArray.join("");var processedRow;var node;while((processedRow=processedRows.pop())!=null){cacheEntry=rowsCache[processedRow];var columnIdx;while((columnIdx=cacheEntry.cellRenderQueue.pop())!=null){node=x.lastChild;cacheEntry.rowNode.appendChild(node);cacheEntry.cellNodesByColumnIdx[columnIdx]=node}}}
function renderRows(range){var parentNode=$canvas[0],stringArray=[],rows=[],needToReselectCell=false;for(var i=range.top;i<=range.bottom;i++){if(rowsCache[i]){continue}
renderedRows++;rows.push(i);rowsCache[i]={"rowNode":null,"cellColSpans":[],"cellNodesByColumnIdx":[],"cellRenderQueue":[]};appendRowHtml(stringArray,i,range);if(activeCellNode&&activeRow===i){needToReselectCell=true}
counter_rows_rendered++}
if(!rows.length){return}
var x=document.createElement("div");x.innerHTML=stringArray.join("");for(var i=0,ii=rows.length;i<ii;i++){rowsCache[rows[i]].rowNode=parentNode.appendChild(x.firstChild)}
if(needToReselectCell){activeCellNode=getCellNode(activeRow,activeCell)}}
function startPostProcessing(){if(!options.enableAsyncPostRender){return}
clearTimeout(h_postrender);h_postrender=setTimeout(asyncPostProcessRows,options.asyncPostRenderDelay)}
function invalidatePostProcessingResults(row){delete postProcessedRows[row];postProcessFromRow=Math.min(postProcessFromRow,row);postProcessToRow=Math.max(postProcessToRow,row);startPostProcessing()}
function updateRowPositions(){for(var row in rowsCache){rowsCache[row].rowNode.style.top=(row * options.rowHeight-offset)+"px"}}
function render(){if(!initialized){return}
var visible=getVisibleRange();var rendered=getRenderedRange();cleanupRows(rendered);if(lastRenderedScrollLeft!=scrollLeft){cleanUpAndRenderCells(rendered)}
renderRows(rendered);postProcessFromRow=visible.top;postProcessToRow=Math.min(options.enableAddRow?getDataLength():getDataLength()-1,visible.bottom);startPostProcessing();lastRenderedScrollTop=scrollTop;lastRenderedScrollLeft=scrollLeft;h_render=null}
function handleHeaderRowScroll(){var scrollLeft=$headerRowScroller[0].scrollLeft;if(scrollLeft!=$viewport[0].scrollLeft){$viewport[0].scrollLeft=scrollLeft}}
function handleScroll(){scrollTop=$viewport[0].scrollTop;scrollLeft=$viewport[0].scrollLeft;var vScrollDist=Math.abs(scrollTop-prevScrollTop);var hScrollDist=Math.abs(scrollLeft-prevScrollLeft);if(hScrollDist){prevScrollLeft=scrollLeft;$headerScroller[0].scrollLeft=scrollLeft;$topPanelScroller[0].scrollLeft=scrollLeft;$headerRowScroller[0].scrollLeft=scrollLeft}
if(vScrollDist){vScrollDir=prevScrollTop<scrollTop?1:-1;prevScrollTop=scrollTop;if(vScrollDist<viewportH){scrollTo(scrollTop+offset)} else{var oldOffset=offset;if(h==viewportH){page=0} else{page=Math.min(n-1,Math.floor(scrollTop *((th-viewportH)/ (h - viewportH)) * (1 / ph)))}
offset=Math.round(page * cj);if(oldOffset!=offset){invalidateAllRows()}}}
if(hScrollDist||vScrollDist){if(h_render){clearTimeout(h_render)}
if(Math.abs(lastRenderedScrollTop-scrollTop)>20||Math.abs(lastRenderedScrollLeft-scrollLeft)>20){if(options.forceSyncScrolling||(Math.abs(lastRenderedScrollTop-scrollTop)<viewportH&&Math.abs(lastRenderedScrollLeft-scrollLeft)<viewportW)){render()} else{h_render=setTimeout(render,50)}
trigger(self.onViewportChanged,{})}}
trigger(self.onScroll,{scrollLeft:scrollLeft,scrollTop:scrollTop})}
function asyncPostProcessRows(){while(postProcessFromRow<=postProcessToRow){var row=(vScrollDir>=0)?postProcessFromRow++:postProcessToRow--;var cacheEntry=rowsCache[row];if(!cacheEntry||row>=getDataLength()){continue}
if(!postProcessedRows[row]){postProcessedRows[row]={}}
ensureCellNodesInRowsCache(row);for(var columnIdx in cacheEntry.cellNodesByColumnIdx){if(!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)){continue}
columnIdx=columnIdx|0;var m=columns[columnIdx];if(m.asyncPostRender&&!postProcessedRows[row][columnIdx]){var node=cacheEntry.cellNodesByColumnIdx[columnIdx];if(node){m.asyncPostRender(node,postProcessFromRow,getDataItem(row),m)}
postProcessedRows[row][columnIdx]=true}}
h_postrender=setTimeout(asyncPostProcessRows,options.asyncPostRenderDelay);return}}
function updateCellCssStylesOnRenderedRows(addedHash,removedHash){var node,columnId,addedRowHash,removedRowHash;for(var row in rowsCache){removedRowHash=removedHash&&removedHash[row];addedRowHash=addedHash&&addedHash[row];if(removedRowHash){for(columnId in removedRowHash){if(!addedRowHash||removedRowHash[columnId]!=addedRowHash[columnId]){node=getCellNode(row,getColumnIndex(columnId));if(node){$(node).removeClass(removedRowHash[columnId])}}}}
if(addedRowHash){for(columnId in addedRowHash){if(!removedRowHash||removedRowHash[columnId]!=addedRowHash[columnId]){node=getCellNode(row,getColumnIndex(columnId));if(node){$(node).addClass(addedRowHash[columnId])}}}}}}
function addCellCssStyles(key,hash){if(cellCssClasses[key]){throw "addCellCssStyles: cell CSS hash with key '"+key+"' already exists."}
cellCssClasses[key]=hash;updateCellCssStylesOnRenderedRows(hash,null);trigger(self.onCellCssStylesChanged,{"key":key,"hash":hash})}
function removeCellCssStyles(key){if(!cellCssClasses[key]){return}
updateCellCssStylesOnRenderedRows(null,cellCssClasses[key]);delete cellCssClasses[key];trigger(self.onCellCssStylesChanged,{"key":key,"hash":null})}
function setCellCssStyles(key,hash){var prevHash=cellCssClasses[key];cellCssClasses[key]=hash;updateCellCssStylesOnRenderedRows(hash,prevHash);trigger(self.onCellCssStylesChanged,{"key":key,"hash":hash})}
function getCellCssStyles(key){return cellCssClasses[key]}
function flashCell(row,cell,speed){speed=speed||100;if(rowsCache[row]){var $cell=$(getCellNode(row,cell));
function toggleCellClass(times){if(!times){return}
setTimeout(function(){$cell.queue(function(){$cell.toggleClass(options.cellFlashingCssClass).dequeue();toggleCellClass(times-1)})},speed)}
toggleCellClass(4)}}
function handleDragInit(e,dd){var cell=getCellFromEvent(e);if(!cell||!cellExists(cell.row,cell.cell)){return false}
retval=trigger(self.onDragInit,dd,e);if(e.isImmediatePropagationStopped()){return retval}
return false}
function handleDragStart(e,dd){var cell=getCellFromEvent(e);if(!cell||!cellExists(cell.row,cell.cell)){return false}
var retval=trigger(self.onDragStart,dd,e);if(e.isImmediatePropagationStopped()){return retval}
return false}
function handleDrag(e,dd){return trigger(self.onDrag,dd,e)}
function handleDragEnd(e,dd){trigger(self.onDragEnd,dd,e)}
function handleKeyDown(e){trigger(self.onKeyDown,{row:activeRow,cell:activeCell},e);var handled=e.isImmediatePropagationStopped();if(!handled){if(!e.shiftKey&&!e.altKey&&!e.ctrlKey){if(e.which==27){if(!getEditorLock().isActive()){return}
cancelEditAndSetFocus()} else if(e.which==37){navigateLeft()} else if(e.which==39){navigateRight()} else if(e.which==38){navigateUp()} else if(e.which==40){navigateDown()} else if(e.which==9){navigateNext()} else if(e.which==13){if(options.editable){if(currentEditor){if(activeRow===getDataLength()){navigateDown()}
else{commitEditAndSetFocus()}} else{if(getEditorLock().commitCurrentEdit()){makeActiveCellEditable()}}}} else{return}} else if(e.which==9&&e.shiftKey&&!e.ctrlKey&&!e.altKey){navigatePrev()} else{return}}
e.stopPropagation();e.preventDefault();try{e.originalEvent.keyCode=0}
catch(error){}}
function handleClick(e){if(!currentEditor){if(e.target!=document.activeElement){setFocus()}}
var cell=getCellFromEvent(e);if(!cell||(currentEditor!==null&&activeRow==cell.row&&activeCell==cell.cell)){return}
trigger(self.onClick,{row:cell.row,cell:cell.cell},e);if(e.isImmediatePropagationStopped()){return}
if((activeCell!=cell.cell||activeRow!=cell.row)&&canCellBeActive(cell.row,cell.cell)){if(!getEditorLock().isActive()||getEditorLock().commitCurrentEdit()){scrollRowIntoView(cell.row,false);setActiveCellInternal(getCellNode(cell.row,cell.cell),(cell.row===getDataLength())||options.autoEdit)}}}
function handleContextMenu(e){var $cell=$(e.target).closest(".slick-cell",$canvas);if($cell.length===0){return}
if(activeCellNode===$cell[0]&&currentEditor!==null){return}
trigger(self.onContextMenu,{},e)}
function handleDblClick(e){var cell=getCellFromEvent(e);if(!cell||(currentEditor!==null&&activeRow==cell.row&&activeCell==cell.cell)){return}
trigger(self.onDblClick,{row:cell.row,cell:cell.cell},e);if(e.isImmediatePropagationStopped()){return}
if(options.editable){gotoCell(cell.row,cell.cell,true)}}
function handleHeaderMouseEnter(e){trigger(self.onHeaderMouseEnter,{"column":$(this).data("column")},e)}
function handleHeaderMouseLeave(e){trigger(self.onHeaderMouseLeave,{"column":$(this).data("column")},e)}
function handleHeaderContextMenu(e){var $header=$(e.target).closest(".slick-header-column",".slick-header-columns");var column=$header&&$header.data("column");trigger(self.onHeaderContextMenu,{column:column},e)}
function handleHeaderClick(e){var $header=$(e.target).closest(".slick-header-column",".slick-header-columns");var column=$header&&$header.data("column");if(column){trigger(self.onHeaderClick,{column:column},e)}}
function handleMouseEnter(e){trigger(self.onMouseEnter,{},e)}
function handleMouseLeave(e){trigger(self.onMouseLeave,{},e)}
function cellExists(row,cell){return!(row<0||row>=getDataLength()||cell<0||cell>=columns.length)}
function getCellFromPoint(x,y){var row=Math.floor((y+offset)/options.rowHeight);var cell=0;var w=0;for(var i=0;i<columns.length&&w<x;i++){w+=columns[i].width;cell++}
if(cell<0){cell=0}
return{row:row,cell:cell-1}}
function getCellFromNode(cellNode){var cls=/l\d+/.exec(cellNode.className);if(!cls){throw "getCellFromNode: cannot get cell - "+cellNode.className}
return parseInt(cls[0].substr(1,cls[0].length-1),10)}
function getRowFromNode(rowNode){for(var row in rowsCache){if(rowsCache[row].rowNode===rowNode){return row|0}}
return null}
function getCellFromEvent(e){var $cell=$(e.target).closest(".slick-cell",$canvas);if(!$cell.length){return null}
var row=getRowFromNode($cell[0].parentNode);var cell=getCellFromNode($cell[0]);if(row==null||cell==null){return null} else{return{"row":row,"cell":cell}}}
function getCellNodeBox(row,cell){if(!cellExists(row,cell)){return null}
var y1=row * options.rowHeight-offset;var y2=y1+options.rowHeight-1;var x1=0;for(var i=0;i<cell;i++){x1+=columns[i].width}
var x2=x1+columns[cell].width;return{top:y1,left:x1,bottom:y2,right:x2}}
function resetActiveCell(){setActiveCellInternal(null,false)}
function setFocus(){$focusSink[0].focus()}
function scrollCellIntoView(row,cell){var colspan=getColspan(row,cell);var left=columnPosLeft[cell],right=columnPosRight[cell+(colspan>1?colspan-1:0)],scrollRight=scrollLeft+viewportW;if(left<scrollLeft){$viewport.scrollLeft(left);handleScroll();render()} else if(right>scrollRight){$viewport.scrollLeft(Math.min(left,right-$viewport[0].clientWidth));handleScroll();render()}}
function setActiveCellInternal(newCell,editMode){if(activeCellNode!==null){makeActiveCellNormal();$(activeCellNode).removeClass("active");if(rowsCache[activeRow]){$(rowsCache[activeRow].rowNode).removeClass("active")}}
var activeCellChanged=(activeCellNode!==newCell);activeCellNode=newCell;if(activeCellNode!=null){activeRow=getRowFromNode(activeCellNode.parentNode);activeCell=activePosX=getCellFromNode(activeCellNode);$(activeCellNode).addClass("active");$(rowsCache[activeRow].rowNode).addClass("active");if(options.editable&&editMode&&isCellPotentiallyEditable(activeRow,activeCell)){clearTimeout(h_editorLoader);if(options.asyncEditorLoading){h_editorLoader=setTimeout(function(){makeActiveCellEditable()},options.asyncEditorLoadDelay)} else{makeActiveCellEditable()}}} else{activeRow=activeCell=null}
if(activeCellChanged){trigger(self.onActiveCellChanged,getActiveCell())}}
function clearTextSelection(){if(document.selection&&document.selection.empty){document.selection.empty()} else if(window.getSelection){var sel=window.getSelection();if(sel&&sel.removeAllRanges){sel.removeAllRanges()}}}
function isCellPotentiallyEditable(row,cell){if(row<getDataLength()&&!getDataItem(row)){return false}
if(columns[cell].cannotTriggerInsert&&row>=getDataLength()){return false}
if(!getEditor(row,cell)){return false}
return true}
function makeActiveCellNormal(){if(!currentEditor){return}
trigger(self.onBeforeCellEditorDestroy,{editor:currentEditor});currentEditor.destroy();currentEditor=null;if(activeCellNode){var d=getDataItem(activeRow);$(activeCellNode).removeClass("editable invalid");if(d){var column=columns[activeCell];var formatter=getFormatter(activeRow,column);activeCellNode.innerHTML=formatter(activeRow,activeCell,getDataItemValueForColumn(d,column),column,getDataItem(activeRow));invalidatePostProcessingResults(activeRow)}}
if($.browser.msie){clearTextSelection()}
getEditorLock().deactivate(editController)}
function makeActiveCellEditable(editor){if(!activeCellNode){return}
if(!options.editable){throw "Grid : makeActiveCellEditable : should never get called when options.editable is false"}
clearTimeout(h_editorLoader);if(!isCellPotentiallyEditable(activeRow,activeCell)){return}
var columnDef=columns[activeCell];var item=getDataItem(activeRow);if(trigger(self.onBeforeEditCell,{row:activeRow,cell:activeCell,item:item,column:columnDef})===false){setFocus();return}
getEditorLock().activate(editController);$(activeCellNode).addClass("editable");if(!editor){activeCellNode.innerHTML=""}
currentEditor=new(editor||getEditor(activeRow,activeCell))({grid:self,gridPosition:absBox($container[0]),position:absBox(activeCellNode),container:activeCellNode,column:columnDef,item:item||{},commitChanges:commitEditAndSetFocus,cancelChanges:cancelEditAndSetFocus});if(item){currentEditor.loadValue(item)}
serializedEditorValue=currentEditor.serializeValue();if(currentEditor.position){handleActiveCellPositionChange()}}
function commitEditAndSetFocus(){if(getEditorLock().commitCurrentEdit()){setFocus();if(options.autoEdit){navigateDown()}}}
function cancelEditAndSetFocus(){if(getEditorLock().cancelCurrentEdit()){setFocus()}}
function absBox(elem){var box={top:elem.offsetTop,left:elem.offsetLeft,bottom:0,right:0,width:$(elem).outerWidth(),height:$(elem).outerHeight(),visible:true};box.bottom=box.top+box.height;box.right=box.left+box.width;var offsetParent=elem.offsetParent;while((elem=elem.parentNode)!=document.body){if(box.visible&&elem.scrollHeight!=elem.offsetHeight&&$(elem).css("overflowY")!="visible"){box.visible=box.bottom>elem.scrollTop&&box.top<elem.scrollTop+elem.clientHeight}
if(box.visible&&elem.scrollWidth!=elem.offsetWidth&&$(elem).css("overflowX")!="visible"){box.visible=box.right>elem.scrollLeft&&box.left<elem.scrollLeft+elem.clientWidth}
box.left-=elem.scrollLeft;box.top-=elem.scrollTop;if(elem===offsetParent){box.left+=elem.offsetLeft;box.top+=elem.offsetTop;offsetParent=elem.offsetParent}
box.bottom=box.top+box.height;box.right=box.left+box.width}
return box}
function getActiveCellPosition(){return absBox(activeCellNode)}
function getGridPosition(){return absBox($container[0])}
function handleActiveCellPositionChange(){if(!activeCellNode){return}
trigger(self.onActiveCellPositionChanged,{});if(currentEditor){var cellBox=getActiveCellPosition();if(currentEditor.show&&currentEditor.hide){if(!cellBox.visible){currentEditor.hide()} else{currentEditor.show()}}
if(currentEditor.position){currentEditor.position(cellBox)}}}
function getCellEditor(){return currentEditor}
function getActiveCell(){if(!activeCellNode){return null} else{return{row:activeRow,cell:activeCell}}}
function getActiveCellNode(){return activeCellNode}
function scrollRowIntoView(row,doPaging){var rowAtTop=row * options.rowHeight;var rowAtBottom=(row+1) * options.rowHeight-viewportH+(viewportHasHScroll?scrollbarDimensions.height:0);if((row+1) * options.rowHeight>scrollTop+viewportH+offset){scrollTo(doPaging?rowAtTop:rowAtBottom);render()}
else if(row * options.rowHeight<scrollTop+offset){scrollTo(doPaging?rowAtBottom:rowAtTop);render()}}
function scrollRowToTop(row){scrollTo(row * options.rowHeight);render()}
function getColspan(row,cell){var metadata=data.getItemMetadata&&data.getItemMetadata(row);if(!metadata||!metadata.columns){return 1}
var columnData=metadata.columns[columns[cell].id]||metadata.columns[cell];var colspan=(columnData&&columnData.colspan);if(colspan==="*"){colspan=columns.length-cell} else{colspan=colspan||1}
return colspan}
function findFirstFocusableCell(row){var cell=0;while(cell<columns.length){if(canCellBeActive(row,cell)){return cell}
cell+=getColspan(row,cell)}
return null}
function findLastFocusableCell(row){var cell=0;var lastFocusableCell=null;while(cell<columns.length){if(canCellBeActive(row,cell)){lastFocusableCell=cell}
cell+=getColspan(row,cell)}
return lastFocusableCell}
function gotoRight(row,cell,posX){if(cell>=columns.length){return null}
do{cell+=getColspan(row,cell)}
while(cell<columns.length&&!canCellBeActive(row,cell));if(cell<columns.length){return{"row":row,"cell":cell,"posX":cell}}
return null}
function gotoLeft(row,cell,posX){if(cell<=0){return null}
var firstFocusableCell=findFirstFocusableCell(row);if(firstFocusableCell===null||firstFocusableCell>=cell){return null}
var prev={"row":row,"cell":firstFocusableCell,"posX":firstFocusableCell};var pos;while(true){pos=gotoRight(prev.row,prev.cell,prev.posX);if(!pos){return null}
if(pos.cell>=cell){return prev}
prev=pos}}
function gotoDown(row,cell,posX){var prevCell;while(true){if(++row>=getDataLength()+(options.enableAddRow?1:0)){return null}
prevCell=cell=0;while(cell<=posX){prevCell=cell;cell+=getColspan(row,cell)}
if(canCellBeActive(row,prevCell)){return{"row":row,"cell":prevCell,"posX":posX}}}}
function gotoUp(row,cell,posX){var prevCell;while(true){if(--row<0){return null}
prevCell=cell=0;while(cell<=posX){prevCell=cell;cell+=getColspan(row,cell)}
if(canCellBeActive(row,prevCell)){return{"row":row,"cell":prevCell,"posX":posX}}}}
function gotoNext(row,cell,posX){var pos=gotoRight(row,cell,posX);if(pos){return pos}
var firstFocusableCell=null;while(++row<getDataLength()+(options.enableAddRow?1:0)){firstFocusableCell=findFirstFocusableCell(row);if(firstFocusableCell!==null){return{"row":row,"cell":firstFocusableCell,"posX":firstFocusableCell}}}
return null}
function gotoPrev(row,cell,posX){var pos;var lastSelectableCell;while(!pos){pos=gotoLeft(row,cell,posX);if(pos){break}
if(--row<0){return null}
cell=0;lastSelectableCell=findLastFocusableCell(row);if(lastSelectableCell!==null){pos={"row":row,"cell":lastSelectableCell,"posX":lastSelectableCell}}}
return pos}
function navigateRight(){navigate("right")}
function navigateLeft(){navigate("left")}
function navigateDown(){navigate("down")}
function navigateUp(){navigate("up")}
function navigateNext(){navigate("next")}
function navigatePrev(){navigate("prev")}
function navigate(dir){if(!activeCellNode||!options.enableCellNavigation){return}
if(!getEditorLock().commitCurrentEdit()){return}
setFocus();var stepFunctions={"up":gotoUp,"down":gotoDown,"left":gotoLeft,"right":gotoRight,"prev":gotoPrev,"next":gotoNext};var stepFn=stepFunctions[dir];var pos=stepFn(activeRow,activeCell,activePosX);if(pos){var isAddNewRow=(pos.row==getDataLength());scrollRowIntoView(pos.row,!isAddNewRow);scrollCellIntoView(pos.row,pos.cell);setActiveCellInternal(getCellNode(pos.row,pos.cell),isAddNewRow||options.autoEdit);activePosX=pos.posX} else{setActiveCellInternal(getCellNode(activeRow,activeCell),(activeRow==getDataLength())||options.autoEdit)}}
function getCellNode(row,cell){if(rowsCache[row]){ensureCellNodesInRowsCache(row);return rowsCache[row].cellNodesByColumnIdx[cell]}
return null}
function setActiveCell(row,cell){if(!initialized){return}
if(row>getDataLength()||row<0||cell>=columns.length||cell<0){return}
if(!options.enableCellNavigation){return}
scrollRowIntoView(row,false);scrollCellIntoView(row,cell);setActiveCellInternal(getCellNode(row,cell),false)}
function canCellBeActive(row,cell){if(!options.enableCellNavigation||row>=getDataLength()+(options.enableAddRow?1:0)||row<0||cell>=columns.length||cell<0){return false}
var rowMetadata=data.getItemMetadata&&data.getItemMetadata(row);if(rowMetadata&&typeof rowMetadata.focusable==="boolean"){return rowMetadata.focusable}
var columnMetadata=rowMetadata&&rowMetadata.columns;if(columnMetadata&&columnMetadata[columns[cell].id]&&typeof columnMetadata[columns[cell].id].focusable==="boolean"){return columnMetadata[columns[cell].id].focusable}
if(columnMetadata&&columnMetadata[cell]&&typeof columnMetadata[cell].focusable==="boolean"){return columnMetadata[cell].focusable}
if(typeof columns[cell].focusable==="boolean"){return columns[cell].focusable}
return true}
function canCellBeSelected(row,cell){if(row>=getDataLength()||row<0||cell>=columns.length||cell<0){return false}
var rowMetadata=data.getItemMetadata&&data.getItemMetadata(row);if(rowMetadata&&typeof rowMetadata.selectable==="boolean"){return rowMetadata.selectable}
var columnMetadata=rowMetadata&&rowMetadata.columns&&(rowMetadata.columns[columns[cell].id]||rowMetadata.columns[cell]);if(columnMetadata&&typeof columnMetadata.selectable==="boolean"){return columnMetadata.selectable}
if(typeof columns[cell].selectable==="boolean"){return columns[cell].selectable}
return true}
function gotoCell(row,cell,forceEdit){if(!initialized){return}
if(!canCellBeActive(row,cell)){return}
if(!getEditorLock().commitCurrentEdit()){return}
scrollRowIntoView(row,false);scrollCellIntoView(row,cell);var newCell=getCellNode(row,cell);setActiveCellInternal(newCell,forceEdit||(row===getDataLength())||options.autoEdit);if(!currentEditor){setFocus()}}
function commitCurrentEdit(){var item=getDataItem(activeRow);var column=columns[activeCell];if(currentEditor){if(currentEditor.isValueChanged()){var validationResults=currentEditor.validate();if(validationResults.valid){if(activeRow<getDataLength()){var editCommand={row:activeRow,cell:activeCell,editor:currentEditor,serializedValue:currentEditor.serializeValue(),prevSerializedValue:serializedEditorValue,execute: function(){this.editor.applyValue(item,this.serializedValue);updateRow(this.row)},undo: function(){this.editor.applyValue(item,this.prevSerializedValue);updateRow(this.row)}};if(options.editCommandHandler){makeActiveCellNormal();options.editCommandHandler(item,column,editCommand)} else{editCommand.execute();makeActiveCellNormal()}
trigger(self.onCellChange,{row:activeRow,cell:activeCell,item:item})} else{var newItem={};currentEditor.applyValue(newItem,currentEditor.serializeValue());makeActiveCellNormal();trigger(self.onAddNewRow,{item:newItem,column:column})}
return!getEditorLock().isActive()} else{$(activeCellNode).addClass("invalid");$(activeCellNode).stop(true,true).effect("highlight",{color:"red"},300);trigger(self.onValidationError,{editor:currentEditor,cellNode:activeCellNode,validationResults:validationResults,row:activeRow,cell:activeCell,column:column});currentEditor.focus();return false}}
makeActiveCellNormal()}
return true}
function cancelCurrentEdit(){makeActiveCellNormal();return true}
function rowsToRanges(rows){var ranges=[];var lastCell=columns.length-1;for(var i=0;i<rows.length;i++){ranges.push(new Slick.Range(rows[i],0,rows[i],lastCell))}
return ranges}
function getSelectedRows(){if(!selectionModel){throw "Selection model is not set"}
return selectedRows}
function setSelectedRows(rows){if(!selectionModel){throw "Selection model is not set"}
selectionModel.setSelectedRanges(rowsToRanges(rows))}
this.debug=function(){var s="";s+=("\n"+"counter_rows_rendered:  "+counter_rows_rendered);s+=("\n"+"counter_rows_removed:  "+counter_rows_removed);s+=("\n"+"renderedRows:  "+renderedRows);s+=("\n"+"numVisibleRows:  "+numVisibleRows);s+=("\n"+"maxSupportedCssHeight:  "+maxSupportedCssHeight);s+=("\n"+"n(umber of pages):  "+n);s+=("\n"+"(current) page:  "+page);s+=("\n"+"page height (ph):  "+ph);s+=("\n"+"vScrollDir:  "+vScrollDir);alert(s)};this.eval=function(expr){return eval(expr)};$.extend(this,{"slickGridVersion":"2.1","onScroll":new Slick.Event(),"onSort":new Slick.Event(),"onHeaderMouseEnter":new Slick.Event(),"onHeaderMouseLeave":new Slick.Event(),"onHeaderContextMenu":new Slick.Event(),"onHeaderClick":new Slick.Event(),"onHeaderCellRendered":new Slick.Event(),"onBeforeHeaderCellDestroy":new Slick.Event(),"onHeaderRowCellRendered":new Slick.Event(),"onBeforeHeaderRowCellDestroy":new Slick.Event(),"onMouseEnter":new Slick.Event(),"onMouseLeave":new Slick.Event(),"onClick":new Slick.Event(),"onDblClick":new Slick.Event(),"onContextMenu":new Slick.Event(),"onKeyDown":new Slick.Event(),"onAddNewRow":new Slick.Event(),"onValidationError":new Slick.Event(),"onViewportChanged":new Slick.Event(),"onColumnsReordered":new Slick.Event(),"onColumnsResized":new Slick.Event(),"onCellChange":new Slick.Event(),"onBeforeEditCell":new Slick.Event(),"onBeforeCellEditorDestroy":new Slick.Event(),"onBeforeDestroy":new Slick.Event(),"onActiveCellChanged":new Slick.Event(),"onActiveCellPositionChanged":new Slick.Event(),"onDragInit":new Slick.Event(),"onDragStart":new Slick.Event(),"onDrag":new Slick.Event(),"onDragEnd":new Slick.Event(),"onSelectedRowsChanged":new Slick.Event(),"onCellCssStylesChanged":new Slick.Event(),"registerPlugin":registerPlugin,"unregisterPlugin":unregisterPlugin,"getColumns":getColumns,"setColumns":setColumns,"getColumnIndex":getColumnIndex,"updateColumnHeader":updateColumnHeader,"setSortColumn":setSortColumn,"setSortColumns":setSortColumns,"getSortColumns":getSortColumns,"autosizeColumns":autosizeColumns,"getOptions":getOptions,"setOptions":setOptions,"getData":getData,"getDataLength":getDataLength,"getDataItem":getDataItem,"setData":setData,"getSelectionModel":getSelectionModel,"setSelectionModel":setSelectionModel,"getSelectedRows":getSelectedRows,"setSelectedRows":setSelectedRows,"render":render,"invalidate":invalidate,"invalidateRow":invalidateRow,"invalidateRows":invalidateRows,"invalidateAllRows":invalidateAllRows,"updateCell":updateCell,"updateRow":updateRow,"getViewport":getVisibleRange,"getRenderedRange":getRenderedRange,"resizeCanvas":resizeCanvas,"updateRowCount":updateRowCount,"scrollRowIntoView":scrollRowIntoView,"scrollRowToTop":scrollRowToTop,"scrollCellIntoView":scrollCellIntoView,"getCanvasNode":getCanvasNode,"focus":setFocus,"getCellFromPoint":getCellFromPoint,"getCellFromEvent":getCellFromEvent,"getActiveCell":getActiveCell,"setActiveCell":setActiveCell,"getActiveCellNode":getActiveCellNode,"getActiveCellPosition":getActiveCellPosition,"resetActiveCell":resetActiveCell,"editActiveCell":makeActiveCellEditable,"getCellEditor":getCellEditor,"getCellNode":getCellNode,"getCellNodeBox":getCellNodeBox,"canCellBeSelected":canCellBeSelected,"canCellBeActive":canCellBeActive,"navigatePrev":navigatePrev,"navigateNext":navigateNext,"navigateUp":navigateUp,"navigateDown":navigateDown,"navigateLeft":navigateLeft,"navigateRight":navigateRight,"gotoCell":gotoCell,"getTopPanel":getTopPanel,"setTopPanelVisibility":setTopPanelVisibility,"setHeaderRowVisibility":setHeaderRowVisibility,"getHeaderRow":getHeaderRow,"getHeaderRowColumn":getHeaderRowColumn,"getGridPosition":getGridPosition,"flashCell":flashCell,"addCellCssStyles":addCellCssStyles,"setCellCssStyles":setCellCssStyles,"removeCellCssStyles":removeCellCssStyles,"getCellCssStyles":getCellCssStyles,"init":finishInitialization,"destroy":destroy,"getEditorLock":getEditorLock,"getEditController":getEditController});init()}}(jQuery));(function($){$.extend(true,window,{Slick:{Data:{GroupItemMetadataProvider:GroupItemMetadataProvider}}});
function GroupItemMetadataProvider(options){var _grid;var _defaults={groupCssClass:"slick-group",totalsCssClass:"slick-group-totals",groupFocusable:true,totalsFocusable:false,toggleCssClass:"slick-group-toggle",toggleExpandedCssClass:"expanded",toggleCollapsedCssClass:"collapsed",enableExpandCollapse:true};options=$.extend(true,{},_defaults,options);
function defaultGroupCellFormatter(row,cell,value,columnDef,item){if(!options.enableExpandCollapse){return item.title}
return "<span class='"+options.toggleCssClass+" "+(item.collapsed?options.toggleCollapsedCssClass:options.toggleExpandedCssClass)+"'></span>"+item.title}
function defaultTotalsCellFormatter(row,cell,value,columnDef,item){return(columnDef.groupTotalsFormatter&&columnDef.groupTotalsFormatter(item,columnDef))||""}
function init(grid){_grid=grid;_grid.onClick.subscribe(handleGridClick);_grid.onKeyDown.subscribe(handleGridKeyDown)}
function destroy(){if(_grid){_grid.onClick.unsubscribe(handleGridClick);_grid.onKeyDown.unsubscribe(handleGridKeyDown)}}
function handleGridClick(e,args){var item=this.getDataItem(args.row);if(item&&item instanceof Slick.Group&&$(e.target).hasClass(options.toggleCssClass)){if(item.collapsed){this.getData().expandGroup(item.value)}
else{this.getData().collapseGroup(item.value)}
e.stopImmediatePropagation();e.preventDefault()}}
function handleGridKeyDown(e,args){if(options.enableExpandCollapse&&(e.which==$.ui.keyCode.SPACE)){var activeCell=this.getActiveCell();if(activeCell){var item=this.getDataItem(activeCell.row);if(item&&item instanceof Slick.Group){if(item.collapsed){this.getData().expandGroup(item.value)}
else{this.getData().collapseGroup(item.value)}
e.stopImmediatePropagation();e.preventDefault()}}}}
function getGroupRowMetadata(item){return{selectable:false,focusable:options.groupFocusable,cssClasses:options.groupCssClass,columns:{0:{colspan:"*",formatter:defaultGroupCellFormatter,editor:null}}}}
function getTotalsRowMetadata(item){return{selectable:false,focusable:options.totalsFocusable,cssClasses:options.totalsCssClass,formatter:defaultTotalsCellFormatter,editor:null}}
return{"init":init,"destroy":destroy,"getGroupRowMetadata":getGroupRowMetadata,"getTotalsRowMetadata":getTotalsRowMetadata}}})(jQuery);(function($){
function RemoteModel(){var PAGESIZE=50;var data={length:0};var searchstr="apple";var sortcol=null;var sortdir=1;var h_request=null;var req=null;var onDataLoading=new Slick.Event();var onDataLoaded=new Slick.Event();
function init(){}
function isDataLoaded(from,to){for(var i=from;i<=to;i++){if(data[i]==undefined||data[i]==null){return false}}
return true}
function clear(){for(var key in data){delete data[key]}
data.length=0}
function ensureData(from,to){if(req){req.abort();for(var i=req.fromPage;i<=req.toPage;i++)
data[i * PAGESIZE]=undefined}
if(from<0){from=0}
var fromPage=Math.floor(from/PAGESIZE);var toPage=Math.floor(to/PAGESIZE);while(data[fromPage * PAGESIZE]!==undefined&&fromPage<toPage)
fromPage++;while(data[toPage * PAGESIZE]!==undefined&&fromPage<toPage)
toPage--;if(fromPage>toPage||((fromPage==toPage)&&data[fromPage * PAGESIZE]!==undefined)){return}
var url="http://services.digg.com/search/stories?query="+searchstr+"&offset="+(fromPage * PAGESIZE)+"&count="+(((toPage-fromPage) * PAGESIZE)+PAGESIZE)+"&appkey=http://slickgrid.googlecode.com&type=javascript";switch(sortcol){case "diggs":url+=("&sort="+((sortdir>0)?"digg_count-asc":"digg_count-desc"));break}
if(h_request!=null){clearTimeout(h_request)}
h_request=setTimeout(function(){for(var i=fromPage;i<=toPage;i++)
data[i * PAGESIZE]=null;onDataLoading.notify({from:from,to:to});req=$.jsonp({url:url,callbackParameter:"callback",cache:true,success:onSuccess,error: function(){onError(fromPage,toPage)}});req.fromPage=fromPage;req.toPage=toPage},50)}
function onError(fromPage,toPage){alert("error loading pages "+fromPage+" to "+toPage)}
function onSuccess(resp){var from=this.fromPage * PAGESIZE,to=from+resp.count;data.length=parseInt(resp.total);for(var i=0;i<resp.stories.length;i++){data[from+i]=resp.stories[i];data[from+i].index=from+i}
req=null;onDataLoaded.notify({from:from,to:to})}
function reloadData(from,to){for(var i=from;i<=to;i++)
delete data[i];ensureData(from,to)}
function setSort(column,dir){sortcol=column;sortdir=dir;clear()}
function setSearch(str){searchstr=str;clear()}
init();return{"data":data,"clear":clear,"isDataLoaded":isDataLoaded,"ensureData":ensureData,"reloadData":reloadData,"setSort":setSort,"setSearch":setSearch,"onDataLoading":onDataLoading,"onDataLoaded":onDataLoaded}}
$.extend(true,window,{Slick:{Data:{RemoteModel:RemoteModel}}})})(jQuery);(function($){
function SlickColumnPicker(columns,grid,options){var $menu;var columnCheckboxes;var defaults={fadeSpeed:250};
function init(){grid.onHeaderContextMenu.subscribe(handleHeaderContextMenu);options=$.extend({},defaults,options);$menu=$("<span class='slick-columnpicker' style='display:none;position:absolute;z-index:20;' />").appendTo(document.body);$menu.bind("mouseleave", function(e){$(this).fadeOut(options.fadeSpeed)});$menu.bind("click",updateColumn)}
function handleHeaderContextMenu(e,args){e.preventDefault();$menu.empty();columnCheckboxes=[];var $li,$input;for(var i=0;i<columns.length;i++){$li=$("<li />").appendTo($menu);$input=$("<input type='checkbox' />").data("column-id",columns[i].id);columnCheckboxes.push($input);if(grid.getColumnIndex(columns[i].id)!=null){$input.attr("checked","checked")}
$("<label />").text(columns[i].name).prepend($input).appendTo($li)}
$("<hr/>").appendTo($menu);$li=$("<li />").appendTo($menu);$input=$("<input type='checkbox' />").data("option","autoresize");$("<label />").text("Force fit columns").prepend($input).appendTo($li);if(grid.getOptions().forceFitColumns){$input.attr("checked","checked")}
$li=$("<li />").appendTo($menu);$input=$("<input type='checkbox' />").data("option","syncresize");$("<label />").text("Synchronous resize").prepend($input).appendTo($li);if(grid.getOptions().syncColumnCellResize){$input.attr("checked","checked")}
$menu.css("top",e.pageY-10).css("left",e.pageX-10).fadeIn(options.fadeSpeed)}
function updateColumn(e){if($(e.target).data("option")=="autoresize"){if(e.target.checked){grid.setOptions({forceFitColumns:true});grid.autosizeColumns()} else{grid.setOptions({forceFitColumns:false})}
return}
if($(e.target).data("option")=="syncresize"){if(e.target.checked){grid.setOptions({syncColumnCellResize:true})} else{grid.setOptions({syncColumnCellResize:false})}
return}
if($(e.target).is(":checkbox")){var visibleColumns=[];$.each(columnCheckboxes, function(i,e){if($(this).is(":checked")){visibleColumns.push(columns[i])}});if(!visibleColumns.length){$(e.target).attr("checked","checked");return}
grid.setColumns(visibleColumns)}}
init()}
$.extend(true,window,{Slick:{Controls:{ColumnPicker:SlickColumnPicker}}})})(jQuery);(function($){
function SlickGridPager(dataView,grid,$container){var $status;
function init(){dataView.onPagingInfoChanged.subscribe(function(e,pagingInfo){updatePager(pagingInfo)});constructPagerUI();updatePager(dataView.getPagingInfo())}
function getNavState(){var cannotLeaveEditMode=!Slick.GlobalEditorLock.commitCurrentEdit();var pagingInfo=dataView.getPagingInfo();var lastPage=pagingInfo.totalPages-1;return{canGotoFirst:!cannotLeaveEditMode&&pagingInfo.pageSize!=0&&pagingInfo.pageNum>0,canGotoLast:!cannotLeaveEditMode&&pagingInfo.pageSize!=0&&pagingInfo.pageNum!=lastPage,canGotoPrev:!cannotLeaveEditMode&&pagingInfo.pageSize!=0&&pagingInfo.pageNum>0,canGotoNext:!cannotLeaveEditMode&&pagingInfo.pageSize!=0&&pagingInfo.pageNum<lastPage,pagingInfo:pagingInfo}}
function setPageSize(n){dataView.setRefreshHints({isFilterUnchanged:true});dataView.setPagingOptions({pageSize:n})}
function gotoFirst(){if(getNavState().canGotoFirst){dataView.setPagingOptions({pageNum:0})}}
function gotoLast(){var state=getNavState();if(state.canGotoLast){dataView.setPagingOptions({pageNum:state.pagingInfo.totalPages-1})}}
function gotoPrev(){var state=getNavState();if(state.canGotoPrev){dataView.setPagingOptions({pageNum:state.pagingInfo.pageNum-1})}}
function gotoNext(){var state=getNavState();if(state.canGotoNext){dataView.setPagingOptions({pageNum:state.pagingInfo.pageNum+1})}}
function constructPagerUI(){$container.empty();var $nav=$("<span class='slick-pager-nav' />").appendTo($container);var $settings=$("<span class='slick-pager-settings' />").appendTo($container);$status=$("<span class='slick-pager-status' />").appendTo($container);$settings.append("<span class='slick-pager-settings-expanded' style='display:none'>Show: <a data=0>All</a><a data='-1'>Auto</a><a data=25>25</a><a data=50>50</a><a data=100>100</a></span>");$settings.find("a[data]").click(function(e){var pagesize=$(e.target).attr("data");if(pagesize!=undefined){if(pagesize==-1){var vp=grid.getViewport();setPageSize(vp.bottom-vp.top)} else{setPageSize(parseInt(pagesize))}}});var icon_prefix="<span class='ui-state-default ui-corner-all ui-icon-container'><span class='ui-icon ";var icon_suffix="' /></span>";$(icon_prefix+"ui-icon-lightbulb"+icon_suffix).click(function(){$(".slick-pager-settings-expanded").toggle()}).appendTo($settings);$(icon_prefix+"ui-icon-seek-first"+icon_suffix).click(gotoFirst).appendTo($nav);$(icon_prefix+"ui-icon-seek-prev"+icon_suffix).click(gotoPrev).appendTo($nav);$(icon_prefix+"ui-icon-seek-next"+icon_suffix).click(gotoNext).appendTo($nav);$(icon_prefix+"ui-icon-seek-end"+icon_suffix).click(gotoLast).appendTo($nav);$container.find(".ui-icon-container").hover(function(){$(this).toggleClass("ui-state-hover")});$container.children().wrapAll("<div class='slick-pager' />")}
function updatePager(pagingInfo){var state=getNavState();$container.find(".slick-pager-nav span").removeClass("ui-state-disabled");if(!state.canGotoFirst){$container.find(".ui-icon-seek-first").addClass("ui-state-disabled")}
if(!state.canGotoLast){$container.find(".ui-icon-seek-end").addClass("ui-state-disabled")}
if(!state.canGotoNext){$container.find(".ui-icon-seek-next").addClass("ui-state-disabled")}
if(!state.canGotoPrev){$container.find(".ui-icon-seek-prev").addClass("ui-state-disabled")}
if(pagingInfo.pageSize==0){$status.text("Showing all "+pagingInfo.totalRows+" rows")} else{$status.text("Showing page "+(pagingInfo.pageNum+1)+" of "+pagingInfo.totalPages)}}
init()}
$.extend(true,window,{Slick:{Controls:{Pager:SlickGridPager}}})})(jQuery);(function($){$.extend(true,window,{"Slick":{"AutoTooltips":AutoTooltips}});
function AutoTooltips(options){var _grid;var _self=this;var _defaults={maxToolTipLength:null};
function init(grid){options=$.extend(true,{},_defaults,options);_grid=grid;_grid.onMouseEnter.subscribe(handleMouseEnter)}
function destroy(){_grid.onMouseEnter.unsubscribe(handleMouseEnter)}
function handleMouseEnter(e,args){var cell=_grid.getCellFromEvent(e);if(cell){var node=_grid.getCellNode(cell.row,cell.cell);if($(node).innerWidth()<node.scrollWidth){var text=$.trim($(node).text());if(options.maxToolTipLength&&text.length>options.maxToolTipLength){text=text.substr(0,options.maxToolTipLength-3)+"..."}
$(node).attr("title",text)} else{$(node).attr("title","")}}}
$.extend(this,{"init":init,"destroy":destroy})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"CellCopyManager":CellCopyManager}});
function CellCopyManager(){var _grid;var _self=this;var _copiedRanges;
function init(grid){_grid=grid;_grid.onKeyDown.subscribe(handleKeyDown)}
function destroy(){_grid.onKeyDown.unsubscribe(handleKeyDown)}
function handleKeyDown(e,args){var ranges;if(!_grid.getEditorLock().isActive()){if(e.which==$.ui.keyCode.ESCAPE){if(_copiedRanges){e.preventDefault();clearCopySelection();_self.onCopyCancelled.notify({ranges:_copiedRanges});_copiedRanges=null}}
if(e.which==67&&(e.ctrlKey||e.metaKey)){ranges=_grid.getSelectionModel().getSelectedRanges();if(ranges.length!=0){e.preventDefault();_copiedRanges=ranges;markCopySelection(ranges);_self.onCopyCells.notify({ranges:ranges})}}
if(e.which==86&&(e.ctrlKey||e.metaKey)){if(_copiedRanges){e.preventDefault();clearCopySelection();ranges=_grid.getSelectionModel().getSelectedRanges();_self.onPasteCells.notify({from:_copiedRanges,to:ranges});_copiedRanges=null}}}}
function markCopySelection(ranges){var columns=_grid.getColumns();var hash={};for(var i=0;i<ranges.length;i++){for(var j=ranges[i].fromRow;j<=ranges[i].toRow;j++){hash[j]={};for(var k=ranges[i].fromCell;k<=ranges[i].toCell;k++){hash[j][columns[k].id]="copied"}}}
_grid.setCellCssStyles("copy-manager",hash)}
function clearCopySelection(){_grid.removeCellCssStyles("copy-manager")}
$.extend(this,{"init":init,"destroy":destroy,"clearCopySelection":clearCopySelection,"onCopyCells":new Slick.Event(),"onCopyCancelled":new Slick.Event(),"onPasteCells":new Slick.Event()})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"CellRangeDecorator":CellRangeDecorator}});
function CellRangeDecorator(grid,options){var _elem;var _defaults={selectionCss:{"zIndex":"9999","border":"2px dashed red"}};options=$.extend(true,{},_defaults,options);
function show(range){if(!_elem){_elem=$("<div></div>",{css:options.selectionCss}).css("position","absolute").appendTo(grid.getCanvasNode())}
var from=grid.getCellNodeBox(range.fromRow,range.fromCell);var to=grid.getCellNodeBox(range.toRow,range.toCell);_elem.css({top:from.top-1,left:from.left-1,height:to.bottom-from.top-2,width:to.right-from.left-2});return _elem}
function hide(){if(_elem){_elem.remove();_elem=null}}
$.extend(this,{"show":show,"hide":hide})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"CellRangeSelector":CellRangeSelector}});
function CellRangeSelector(options){var _grid;var _canvas;var _dragging;var _decorator;var _self=this;var _handler=new Slick.EventHandler();var _defaults={selectionCss:{"border":"2px dashed blue"}};
function init(grid){options=$.extend(true,{},_defaults,options);_decorator=new Slick.CellRangeDecorator(grid,options);_grid=grid;_canvas=_grid.getCanvasNode();_handler.subscribe(_grid.onDragInit,handleDragInit).subscribe(_grid.onDragStart,handleDragStart).subscribe(_grid.onDrag,handleDrag).subscribe(_grid.onDragEnd,handleDragEnd)}
function destroy(){_handler.unsubscribeAll()}
function handleDragInit(e,dd){e.stopImmediatePropagation()}
function handleDragStart(e,dd){var cell=_grid.getCellFromEvent(e);if(_self.onBeforeCellRangeSelected.notify(cell)!==false){if(_grid.canCellBeSelected(cell.row,cell.cell)){_dragging=true;e.stopImmediatePropagation()}}
if(!_dragging){return}
var start=_grid.getCellFromPoint(dd.startX-$(_canvas).offset().left,dd.startY-$(_canvas).offset().top);dd.range={start:start,end:{}};return _decorator.show(new Slick.Range(start.row,start.cell))}
function handleDrag(e,dd){if(!_dragging){return}
e.stopImmediatePropagation();var end=_grid.getCellFromPoint(e.pageX-$(_canvas).offset().left,e.pageY-$(_canvas).offset().top);if(!_grid.canCellBeSelected(end.row,end.cell)){return}
dd.range.end=end;_decorator.show(new Slick.Range(dd.range.start.row,dd.range.start.cell,end.row,end.cell))}
function handleDragEnd(e,dd){if(!_dragging){return}
_dragging=false;e.stopImmediatePropagation();_decorator.hide();_self.onCellRangeSelected.notify({range:new Slick.Range(dd.range.start.row,dd.range.start.cell,dd.range.end.row,dd.range.end.cell)})}
$.extend(this,{"init":init,"destroy":destroy,"onBeforeCellRangeSelected":new Slick.Event(),"onCellRangeSelected":new Slick.Event()})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"CellSelectionModel":CellSelectionModel}});
function CellSelectionModel(options){var _grid;var _canvas;var _ranges=[];var _self=this;var _selector=new Slick.CellRangeSelector({"selectionCss":{"border":"2px solid black"}});var _options;var _defaults={selectActiveCell:true};
function init(grid){_options=$.extend(true,{},_defaults,options);_grid=grid;_canvas=_grid.getCanvasNode();_grid.onActiveCellChanged.subscribe(handleActiveCellChange);grid.registerPlugin(_selector);_selector.onCellRangeSelected.subscribe(handleCellRangeSelected);_selector.onBeforeCellRangeSelected.subscribe(handleBeforeCellRangeSelected)}
function destroy(){_grid.onActiveCellChanged.unsubscribe(handleActiveCellChange);_selector.onCellRangeSelected.unsubscribe(handleCellRangeSelected);_selector.onBeforeCellRangeSelected.unsubscribe(handleBeforeCellRangeSelected);_grid.unregisterPlugin(_selector)}
function removeInvalidRanges(ranges){var result=[];for(var i=0;i<ranges.length;i++){var r=ranges[i];if(_grid.canCellBeSelected(r.fromRow,r.fromCell)&&_grid.canCellBeSelected(r.toRow,r.toCell)){result.push(r)}}
return result}
function setSelectedRanges(ranges){_ranges=removeInvalidRanges(ranges);_self.onSelectedRangesChanged.notify(_ranges)}
function getSelectedRanges(){return _ranges}
function handleBeforeCellRangeSelected(e,args){if(_grid.getEditorLock().isActive()){e.stopPropagation();return false}}
function handleCellRangeSelected(e,args){setSelectedRanges([args.range])}
function handleActiveCellChange(e,args){if(_options.selectActiveCell){setSelectedRanges([new Slick.Range(args.row,args.cell)])}}
$.extend(this,{"getSelectedRanges":getSelectedRanges,"setSelectedRanges":setSelectedRanges,"init":init,"destroy":destroy,"onSelectedRangesChanged":new Slick.Event()})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"CheckboxSelectColumn":CheckboxSelectColumn}});
function CheckboxSelectColumn(options){var _grid;var _self=this;var _handler=new Slick.EventHandler();var _selectedRowsLookup={};var _defaults={columnId:"_checkbox_selector",cssClass:null,toolTip:"Select/Deselect All",width:30};var _options=$.extend(true,{},_defaults,options);
function init(grid){_grid=grid;_handler.subscribe(_grid.onSelectedRowsChanged,handleSelectedRowsChanged).subscribe(_grid.onClick,handleClick).subscribe(_grid.onHeaderClick,handleHeaderClick).subscribe(_grid.onKeyDown,handleKeyDown)}
function destroy(){_handler.unsubscribeAll()}
function handleSelectedRowsChanged(e,args){var selectedRows=_grid.getSelectedRows();var lookup={},row,i;for(i=0;i<selectedRows.length;i++){row=selectedRows[i];lookup[row]=true;if(lookup[row]!==_selectedRowsLookup[row]){_grid.invalidateRow(row);delete _selectedRowsLookup[row]}}
for(i in _selectedRowsLookup){_grid.invalidateRow(i)}
_selectedRowsLookup=lookup;_grid.render();if(selectedRows.length&&selectedRows.length==_grid.getDataLength()){_grid.updateColumnHeader(_options.columnId,"<input type='checkbox' checked='checked'>",_options.toolTip)} else{_grid.updateColumnHeader(_options.columnId,"<input type='checkbox'>",_options.toolTip)}}
function handleKeyDown(e,args){if(e.which==32){if(_grid.getColumns()[args.cell].id===_options.columnId){if(!_grid.getEditorLock().isActive()||_grid.getEditorLock().commitCurrentEdit()){toggleRowSelection(args.row)}
e.preventDefault();e.stopImmediatePropagation()}}}
function handleClick(e,args){if(_grid.getColumns()[args.cell].id===_options.columnId&&$(e.target).is(":checkbox")){if(_grid.getEditorLock().isActive()&&!_grid.getEditorLock().commitCurrentEdit()){e.preventDefault();e.stopImmediatePropagation();return}
toggleRowSelection(args.row);e.stopPropagation();e.stopImmediatePropagation()}}
function toggleRowSelection(row){if(_selectedRowsLookup[row]){_grid.setSelectedRows($.grep(_grid.getSelectedRows(), function(n){return n!=row}))} else{_grid.setSelectedRows(_grid.getSelectedRows().concat(row))}}
function handleHeaderClick(e,args){if(args.column.id==_options.columnId&&$(e.target).is(":checkbox")){if(_grid.getEditorLock().isActive()&&!_grid.getEditorLock().commitCurrentEdit()){e.preventDefault();e.stopImmediatePropagation();return}
if($(e.target).is(":checked")){var rows=[];for(var i=0;i<_grid.getDataLength();i++){rows.push(i)}
_grid.setSelectedRows(rows)} else{_grid.setSelectedRows([])}
e.stopPropagation();e.stopImmediatePropagation()}}
function getColumnDefinition(){return{id:_options.columnId,name:"<input type='checkbox'>",toolTip:_options.toolTip,field:"sel",width:_options.width,resizable:false,sortable:false,cssClass:_options.cssClass,formatter:checkboxSelectionFormatter}}
function checkboxSelectionFormatter(row,cell,value,columnDef,dataContext){if(dataContext){return _selectedRowsLookup[row]?"<input type='checkbox' checked='checked'>":"<input type='checkbox'>"}
return null}
$.extend(this,{"init":init,"destroy":destroy,"getColumnDefinition":getColumnDefinition})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"Plugins":{"HeaderButtons":HeaderButtons}}});
function HeaderButtons(options){var _grid;var _self=this;var _handler=new Slick.EventHandler();var _defaults={buttonCssClass:"slick-header-button"};
function init(grid){options=$.extend(true,{},_defaults,options);_grid=grid;_handler.subscribe(_grid.onHeaderCellRendered,handleHeaderCellRendered).subscribe(_grid.onBeforeHeaderCellDestroy,handleBeforeHeaderCellDestroy);_grid.setColumns(_grid.getColumns())}
function destroy(){_handler.unsubscribeAll()}
function handleHeaderCellRendered(e,args){var column=args.column;if(column.header&&column.header.buttons){var i=column.header.buttons.length;while(i--){var button=column.header.buttons[i];var btn=$("<div></div>").addClass(options.buttonCssClass).data("column",column).data("button",button);if(button.showOnHover){btn.addClass("slick-header-button-hidden")}
if(button.image){btn.css("backgroundImage","url("+button.image+")")}
if(button.cssClass){btn.addClass(button.cssClass)}
if(button.tooltip){btn.attr("title",button.tooltip)}
if(button.command){btn.data("command",button.command)}
if(button.handler){btn.bind("click",button.handler)}
btn.bind("click",handleButtonClick).appendTo(args.node)}}}
function handleBeforeHeaderCellDestroy(e,args){var column=args.column;if(column.header&&column.header.buttons){$(args.node).find("."+options.buttonCssClass).remove()}}
function handleButtonClick(e){var command=$(this).data("command");var columnDef=$(this).data("column");var button=$(this).data("button");if(command!=null){_self.onCommand.notify({"grid":_grid,"column":columnDef,"command":command,"button":button},e,_self);_grid.updateColumnHeader(columnDef.id)}
e.preventDefault();e.stopPropagation()}
$.extend(this,{"init":init,"destroy":destroy,"onCommand":new Slick.Event()})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"Plugins":{"HeaderMenu":HeaderMenu}}});
function HeaderMenu(options){var _grid;var _self=this;var _handler=new Slick.EventHandler();var _defaults={buttonCssClass:null,buttonImage:"++resource++slickgrid-images/down.gif"};var $menu;var $activeHeaderColumn;
function init(grid){options=$.extend(true,{},_defaults,options);_grid=grid;_handler.subscribe(_grid.onHeaderCellRendered,handleHeaderCellRendered).subscribe(_grid.onBeforeHeaderCellDestroy,handleBeforeHeaderCellDestroy);_grid.setColumns(_grid.getColumns());$(document.body).bind("mousedown",handleBodyMouseDown)}
function destroy(){_handler.unsubscribeAll();$(document.body).unbind("mousedown",handleBodyMouseDown)}
function handleBodyMouseDown(e){if($menu&&$menu[0]!=e.target&&!$.contains($menu[0],e.target)){hideMenu()}}
function hideMenu(){if($menu){$menu.remove();$menu=null;$activeHeaderColumn.removeClass("slick-header-column-active")}}
function handleHeaderCellRendered(e,args){var column=args.column;var menu=column.header&&column.header.menu;if(menu){var $el=$("<div></div>").addClass("slick-header-menubutton").data("column",column).data("menu",menu);if(options.buttonCssClass){$el.addClass(options.buttonCssClass)}
if(options.buttonImage){$el.css("background-image","url("+options.buttonImage+")")}
if(menu.tooltip){$el.attr("title",menu.tooltip)}
$el.bind("click",showMenu).appendTo(args.node)}}
function handleBeforeHeaderCellDestroy(e,args){var column=args.column;if(column.header&&column.header.menu){$(args.node).find(".slick-header-menubutton").remove()}}
function showMenu(e){var $menuButton=$(this);var menu=$menuButton.data("menu");var columnDef=$menuButton.data("column");if(_self.onBeforeMenuShow.notify({"grid":_grid,"column":columnDef,"menu":menu},e,_self)==false){return}
if(!$menu){$menu=$("<div class='slick-header-menu'></div>").appendTo(document.body)}
$menu.empty();for(var i=0;i<menu.items.length;i++){var item=menu.items[i];var $li=$("<div class='slick-header-menuitem'></div>").data("command",item.command||'').data("column",columnDef).data("item",item).bind("click",handleMenuItemClick).appendTo($menu);if(item.disabled){$li.addClass("slick-header-menuitem-disabled")}
if(item.tooltip){$li.attr("title",item.tooltip)}
var $icon=$("<div class='slick-header-menuicon'></div>").appendTo($li);if(item.iconCssClass){$icon.addClass(item.iconCssClass)}
if(item.iconImage){$icon.css("background-image","url("+item.iconImage+")")}
$("<span class='slick-header-menucontent'></span>").text(item.title).appendTo($li)}
$menu.css("top",$(this).offset().top+$(this).height()).css("left",$(this).offset().left);$activeHeaderColumn=$menuButton.closest(".slick-header-column");$activeHeaderColumn.addClass("slick-header-column-active")}
function handleMenuItemClick(e){var command=$(this).data("command");var columnDef=$(this).data("column");var item=$(this).data("item");if(item.disabled){return}
hideMenu();if(command!=null&&command!=''){_self.onCommand.notify({"grid":_grid,"column":columnDef,"command":command,"item":item},e,_self)}
e.preventDefault();e.stopPropagation()}
$.extend(this,{"init":init,"destroy":destroy,"onBeforeMenuShow":new Slick.Event(),"onCommand":new Slick.Event()})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"RowMoveManager":RowMoveManager}});
function RowMoveManager(options){var _grid;var _canvas;var _dragging;var _self=this;var _handler=new Slick.EventHandler();var _defaults={cancelEditOnDrag:false};
function init(grid){options=$.extend(true,{},_defaults,options);_grid=grid;_canvas=_grid.getCanvasNode();_handler.subscribe(_grid.onDragInit,handleDragInit).subscribe(_grid.onDragStart,handleDragStart).subscribe(_grid.onDrag,handleDrag).subscribe(_grid.onDragEnd,handleDragEnd)}
function destroy(){_handler.unsubscribeAll()}
function handleDragInit(e,dd){e.stopImmediatePropagation()}
function handleDragStart(e,dd){var cell=_grid.getCellFromEvent(e);if(options.cancelEditOnDrag&&_grid.getEditorLock().isActive()){_grid.getEditorLock().cancelCurrentEdit()}
if(_grid.getEditorLock().isActive()||!/move|selectAndMove/.test(_grid.getColumns()[cell.cell].behavior)){return false}
_dragging=true;e.stopImmediatePropagation();var selectedRows=_grid.getSelectedRows();if(selectedRows.length==0||$.inArray(cell.row,selectedRows)==-1){selectedRows=[cell.row];_grid.setSelectedRows(selectedRows)}
var rowHeight=_grid.getOptions().rowHeight;dd.selectedRows=selectedRows;dd.selectionProxy=$("<div class='slick-reorder-proxy'/>").css("position","absolute").css("zIndex","99999").css("width",$(_canvas).innerWidth()).css("height",rowHeight * selectedRows.length).appendTo(_canvas);dd.guide=$("<div class='slick-reorder-guide'/>").css("position","absolute").css("zIndex","99998").css("width",$(_canvas).innerWidth()).css("top",-1000).appendTo(_canvas);dd.insertBefore=-1}
function handleDrag(e,dd){if(!_dragging){return}
e.stopImmediatePropagation();var top=e.pageY-$(_canvas).offset().top;dd.selectionProxy.css("top",top-5);var insertBefore=Math.max(0,Math.min(Math.round(top/_grid.getOptions().rowHeight),_grid.getDataLength()));if(insertBefore!==dd.insertBefore){var eventData={"rows":dd.selectedRows,"insertBefore":insertBefore};if(_self.onBeforeMoveRows.notify(eventData)===false){dd.guide.css("top",-1000);dd.canMove=false} else{dd.guide.css("top",insertBefore * _grid.getOptions().rowHeight);dd.canMove=true}
dd.insertBefore=insertBefore}}
function handleDragEnd(e,dd){if(!_dragging){return}
_dragging=false;e.stopImmediatePropagation();dd.guide.remove();dd.selectionProxy.remove();if(dd.canMove){var eventData={"rows":dd.selectedRows,"insertBefore":dd.insertBefore};_self.onMoveRows.notify(eventData)}}
$.extend(this,{"onBeforeMoveRows":new Slick.Event(),"onMoveRows":new Slick.Event(),"init":init,"destroy":destroy})}})(jQuery);(function($){$.extend(true,window,{"Slick":{"RowSelectionModel":RowSelectionModel}});
function RowSelectionModel(options){var _grid;var _ranges=[];var _self=this;var _handler=new Slick.EventHandler();var _inHandler;var _options;var _defaults={selectActiveRow:true};
function init(grid){_options=$.extend(true,{},_defaults,options);_grid=grid;_handler.subscribe(_grid.onActiveCellChanged,wrapHandler(handleActiveCellChange));_handler.subscribe(_grid.onKeyDown,wrapHandler(handleKeyDown));_handler.subscribe(_grid.onClick,wrapHandler(handleClick))}
function destroy(){_handler.unsubscribeAll()}
function wrapHandler(handler){return function(){if(!_inHandler){_inHandler=true;handler.apply(this,arguments);_inHandler=false}}}
function rangesToRows(ranges){var rows=[];for(var i=0;i<ranges.length;i++){for(var j=ranges[i].fromRow;j<=ranges[i].toRow;j++){rows.push(j)}}
return rows}
function rowsToRanges(rows){var ranges=[];var lastCell=_grid.getColumns().length-1;for(var i=0;i<rows.length;i++){ranges.push(new Slick.Range(rows[i],0,rows[i],lastCell))}
return ranges}
function getRowsRange(from,to){var i,rows=[];for(i=from;i<=to;i++){rows.push(i)}
for(i=to;i<from;i++){rows.push(i)}
return rows}
function getSelectedRows(){return rangesToRows(_ranges)}
function setSelectedRows(rows){setSelectedRanges(rowsToRanges(rows))}
function setSelectedRanges(ranges){_ranges=ranges;_self.onSelectedRangesChanged.notify(_ranges)}
function getSelectedRanges(){return _ranges}
function handleActiveCellChange(e,data){if(_options.selectActiveRow){setSelectedRanges([new Slick.Range(data.row,0,data.row,_grid.getColumns().length-1)])}}
function handleKeyDown(e){var activeRow=_grid.getActiveCell();if(activeRow&&e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.which==38||e.which==40)){var selectedRows=getSelectedRows();selectedRows.sort(function(x,y){return x-y});if(!selectedRows.length){selectedRows=[activeRow.row]}
var top=selectedRows[0];var bottom=selectedRows[selectedRows.length-1];var active;if(e.which==40){active=activeRow.row<bottom||top==bottom?++bottom:++top} else{active=activeRow.row<bottom?--bottom:--top}
if(active>=0&&active<_grid.getDataLength()){_grid.scrollRowIntoView(active);_ranges=rowsToRanges(getRowsRange(top,bottom));setSelectedRanges(_ranges)}
e.preventDefault();e.stopPropagation()}}
function handleClick(e){var cell=_grid.getCellFromEvent(e);if(!cell||!_grid.canCellBeActive(cell.row,cell.cell)){return false}
var selection=rangesToRows(_ranges);var idx=$.inArray(cell.row,selection);if(!e.ctrlKey&&!e.shiftKey&&!e.metaKey){return false}
else if(_grid.getOptions().multiSelect){if(idx===-1&&(e.ctrlKey||e.metaKey)){selection.push(cell.row);_grid.setActiveCell(cell.row,cell.cell)} else if(idx!==-1&&(e.ctrlKey||e.metaKey)){selection=$.grep(selection, function(o,i){return(o!==cell.row)});_grid.setActiveCell(cell.row,cell.cell)} else if(selection.length&&e.shiftKey){var last=selection.pop();var from=Math.min(cell.row,last);var to=Math.max(cell.row,last);selection=[];for(var i=from;i<=to;i++){if(i!==last){selection.push(i)}}
selection.push(last);_grid.setActiveCell(cell.row,cell.cell)}}
_ranges=rowsToRanges(selection);setSelectedRanges(_ranges);e.stopImmediatePropagation();return true}
$.extend(this,{"getSelectedRows":getSelectedRows,"setSelectedRows":setSelectedRows,"getSelectedRanges":getSelectedRanges,"setSelectedRanges":setSelectedRanges,"init":init,"destroy":destroy,"onSelectedRangesChanged":new Slick.Event()})}})(jQuery);

/* - ++resource++jquery.colorpicker.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++jquery.colorpicker.js?original=1
(function($){var ColorPicker=function(){var
ids={},inAction,charMin=65,visible,tpl='<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',defaults={eventName:'click',onShow: function(){},onBeforeShow: function(){},onHide: function(){},onChange: function(){},onSubmit: function(){},color:'ff0000',livePreview:true,flat:false},fillRGBFields=function(hsb,cal){var rgb=HSBToRGB(hsb);$(cal).data('colorpicker').fields.eq(1).val(rgb.r).end().eq(2).val(rgb.g).end().eq(3).val(rgb.b).end()},fillHSBFields=function(hsb,cal){$(cal).data('colorpicker').fields.eq(4).val(hsb.h).end().eq(5).val(hsb.s).end().eq(6).val(hsb.b).end()},fillHexFields=function(hsb,cal){$(cal).data('colorpicker').fields.eq(0).val(HSBToHex(hsb)).end()},setSelector=function(hsb,cal){$(cal).data('colorpicker').selector.css('backgroundColor','#'+HSBToHex({h:hsb.h,s:100,b:100}));$(cal).data('colorpicker').selectorIndic.css({left:parseInt(150 * hsb.s/100,10),top:parseInt(150 *(100-hsb.b)/100,10)})},setHue=function(hsb,cal){$(cal).data('colorpicker').hue.css('top',parseInt(150-150 * hsb.h/360,10))},setCurrentColor=function(hsb,cal){$(cal).data('colorpicker').currentColor.css('backgroundColor','#'+HSBToHex(hsb))},setNewColor=function(hsb,cal){$(cal).data('colorpicker').newColor.css('backgroundColor','#'+HSBToHex(hsb))},keyDown=function(ev){var pressedKey=ev.charCode||ev.keyCode||-1;if((pressedKey>charMin&&pressedKey<=90)||pressedKey==32){return false}
var cal=$(this).parent().parent();if(cal.data('colorpicker').livePreview===true){change.apply(this)}},change=function(ev){var cal=$(this).parent().parent(),col;if(this.parentNode.className.indexOf('_hex')>0){cal.data('colorpicker').color=col=HexToHSB(fixHex(this.value))} else if(this.parentNode.className.indexOf('_hsb')>0){cal.data('colorpicker').color=col=fixHSB({h:parseInt(cal.data('colorpicker').fields.eq(4).val(),10),s:parseInt(cal.data('colorpicker').fields.eq(5).val(),10),b:parseInt(cal.data('colorpicker').fields.eq(6).val(),10)})} else{cal.data('colorpicker').color=col=RGBToHSB(fixRGB({r:parseInt(cal.data('colorpicker').fields.eq(1).val(),10),g:parseInt(cal.data('colorpicker').fields.eq(2).val(),10),b:parseInt(cal.data('colorpicker').fields.eq(3).val(),10)}))}
if(ev){fillRGBFields(col,cal.get(0));fillHexFields(col,cal.get(0));fillHSBFields(col,cal.get(0))}
setSelector(col,cal.get(0));setHue(col,cal.get(0));setNewColor(col,cal.get(0));cal.data('colorpicker').onChange.apply(cal,[col,HSBToHex(col),HSBToRGB(col)])},blur=function(ev){var cal=$(this).parent().parent();cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus')},focus=function(){charMin=this.parentNode.className.indexOf('_hex')>0?70:65;$(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');$(this).parent().addClass('colorpicker_focus')},downIncrement=function(ev){var field=$(this).parent().find('input').focus();var current={el:$(this).parent().addClass('colorpicker_slider'),max:this.parentNode.className.indexOf('_hsb_h')>0?360:(this.parentNode.className.indexOf('_hsb')>0?100:255),y:ev.pageY,field:field,val:parseInt(field.val(),10),preview:$(this).parent().parent().data('colorpicker').livePreview};$(document).bind('mouseup',current,upIncrement);$(document).bind('mousemove',current,moveIncrement)},moveIncrement=function(ev){ev.data.field.val(Math.max(0,Math.min(ev.data.max,parseInt(ev.data.val+ev.pageY-ev.data.y,10))));if(ev.data.preview){change.apply(ev.data.field.get(0),[true])}
return false},upIncrement=function(ev){change.apply(ev.data.field.get(0),[true]);ev.data.el.removeClass('colorpicker_slider').find('input').focus();$(document).unbind('mouseup',upIncrement);$(document).unbind('mousemove',moveIncrement);return false},downHue=function(ev){var current={cal:$(this).parent(),y:$(this).offset().top};current.preview=current.cal.data('colorpicker').livePreview;$(document).bind('mouseup',current,upHue);$(document).bind('mousemove',current,moveHue)},moveHue=function(ev){change.apply(ev.data.cal.data('colorpicker').fields.eq(4).val(parseInt(360*(150-Math.max(0,Math.min(150,(ev.pageY-ev.data.y))))/150,10)).get(0),[ev.data.preview]);return false},upHue=function(ev){fillRGBFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));fillHexFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));$(document).unbind('mouseup',upHue);$(document).unbind('mousemove',moveHue);return false},downSelector=function(ev){var current={cal:$(this).parent(),pos:$(this).offset()};current.preview=current.cal.data('colorpicker').livePreview;$(document).bind('mouseup',current,upSelector);$(document).bind('mousemove',current,moveSelector)},moveSelector=function(ev){change.apply(ev.data.cal.data('colorpicker').fields.eq(6).val(parseInt(100*(150-Math.max(0,Math.min(150,(ev.pageY-ev.data.pos.top))))/150,10)).end().eq(5).val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX-ev.data.pos.left))))/150,10)).get(0),[ev.data.preview]);return false},upSelector=function(ev){fillRGBFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));fillHexFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));$(document).unbind('mouseup',upSelector);$(document).unbind('mousemove',moveSelector);return false},enterSubmit=function(ev){$(this).addClass('colorpicker_focus')},leaveSubmit=function(ev){$(this).removeClass('colorpicker_focus')},clickSubmit=function(ev){var cal=$(this).parent();var col=cal.data('colorpicker').color;cal.data('colorpicker').origColor=col;setCurrentColor(col,cal.get(0));cal.data('colorpicker').onSubmit(col,HSBToHex(col),HSBToRGB(col),cal.data('colorpicker').el)},show=function(ev){var cal=$('#'+$(this).data('colorpickerId'));cal.data('colorpicker').onBeforeShow.apply(this,[cal.get(0)]);var pos=$(this).offset();var viewPort=getViewport();var top=pos.top+this.offsetHeight;var left=pos.left;if(top+176>viewPort.t+viewPort.h){top-=this.offsetHeight+176}
if(left+356>viewPort.l+viewPort.w){left-=356}
cal.css({left:left+'px',top:top+'px'});if(cal.data('colorpicker').onShow.apply(this,[cal.get(0)])!=false){cal.show()}
$(document).bind('mousedown',{cal:cal},hide);return false},hide=function(ev){if(!isChildOf(ev.data.cal.get(0),ev.target,ev.data.cal.get(0))){if(ev.data.cal.data('colorpicker').onHide.apply(this,[ev.data.cal.get(0)])!=false){ev.data.cal.hide()}
$(document).unbind('mousedown',hide)}},isChildOf=function(parentEl,el,container){if(parentEl==el){return true}
if(parentEl.contains){return parentEl.contains(el)}
if(parentEl.compareDocumentPosition){return!!(parentEl.compareDocumentPosition(el)&16)}
var prEl=el.parentNode;while(prEl&&prEl!=container){if(prEl==parentEl)
return true;prEl=prEl.parentNode}
return false},getViewport=function(){var m=document.compatMode=='CSS1Compat';return{l:window.pageXOffset||(m?document.documentElement.scrollLeft:document.body.scrollLeft),t:window.pageYOffset||(m?document.documentElement.scrollTop:document.body.scrollTop),w:window.innerWidth||(m?document.documentElement.clientWidth:document.body.clientWidth),h:window.innerHeight||(m?document.documentElement.clientHeight:document.body.clientHeight)}},fixHSB=function(hsb){return{h:Math.min(360,Math.max(0,hsb.h)),s:Math.min(100,Math.max(0,hsb.s)),b:Math.min(100,Math.max(0,hsb.b))}},fixRGB=function(rgb){return{r:Math.min(255,Math.max(0,rgb.r)),g:Math.min(255,Math.max(0,rgb.g)),b:Math.min(255,Math.max(0,rgb.b))}},fixHex=function(hex){var len=6-hex.length;if(len>0){var o=[];for(var i=0;i<len;i++){o.push('0')}
o.push(hex);hex=o.join('')}
return hex},HexToRGB=function(hex){var hex=parseInt(((hex.indexOf('#')>-1)?hex.substring(1):hex),16);return{r:hex>>16,g:(hex&0x00FF00)>>8,b:(hex&0x0000FF)}},HexToHSB=function(hex){return RGBToHSB(HexToRGB(hex))},RGBToHSB=function(rgb){var hsb={h:0,s:0,b:0};var min=Math.min(rgb.r,rgb.g,rgb.b);var max=Math.max(rgb.r,rgb.g,rgb.b);var delta=max-min;hsb.b=max;if(max!=0){}
hsb.s=max!=0?255 * delta/max:0;if(hsb.s!=0){if(rgb.r==max){hsb.h=(rgb.g-rgb.b)/delta} else if(rgb.g==max){hsb.h=2+(rgb.b-rgb.r)/delta} else{hsb.h=4+(rgb.r-rgb.g)/delta}} else{hsb.h=-1}
hsb.h *=60;if(hsb.h<0){hsb.h+=360}
hsb.s *=100/255;hsb.b *=100/255;return hsb},HSBToRGB=function(hsb){var rgb={};var h=Math.round(hsb.h);var s=Math.round(hsb.s*255/100);var v=Math.round(hsb.b*255/100);if(s==0){rgb.r=rgb.g=rgb.b=v} else{var t1=v;var t2=(255-s)*v/255;var t3=(t1-t2)*(h%60)/60;if(h==360) h=0;if(h<60){rgb.r=t1;rgb.b=t2;rgb.g=t2+t3}
else if(h<120){rgb.g=t1;rgb.b=t2;rgb.r=t1-t3}
else if(h<180){rgb.g=t1;rgb.r=t2;rgb.b=t2+t3}
else if(h<240){rgb.b=t1;rgb.r=t2;rgb.g=t1-t3}
else if(h<300){rgb.b=t1;rgb.g=t2;rgb.r=t2+t3}
else if(h<360){rgb.r=t1;rgb.g=t2;rgb.b=t1-t3}
else{rgb.r=0;rgb.g=0;rgb.b=0}}
return{r:Math.round(rgb.r),g:Math.round(rgb.g),b:Math.round(rgb.b)}},RGBToHex=function(rgb){var hex=[rgb.r.toString(16),rgb.g.toString(16),rgb.b.toString(16)];$.each(hex, function(nr,val){if(val.length==1){hex[nr]='0'+val}});return hex.join('')},HSBToHex=function(hsb){return RGBToHex(HSBToRGB(hsb))},restoreOriginal=function(){var cal=$(this).parent();var col=cal.data('colorpicker').origColor;cal.data('colorpicker').color=col;fillRGBFields(col,cal.get(0));fillHexFields(col,cal.get(0));fillHSBFields(col,cal.get(0));setSelector(col,cal.get(0));setHue(col,cal.get(0));setNewColor(col,cal.get(0))};return{init: function(opt){opt=$.extend({},defaults,opt||{});if(typeof opt.color=='string'){opt.color=HexToHSB(opt.color)} else if(opt.color.r!=undefined&&opt.color.g!=undefined&&opt.color.b!=undefined){opt.color=RGBToHSB(opt.color)} else if(opt.color.h!=undefined&&opt.color.s!=undefined&&opt.color.b!=undefined){opt.color=fixHSB(opt.color)} else{return this}
return this.each(function(){if(!$(this).data('colorpickerId')){var options=$.extend({},opt);options.origColor=opt.color;var id='collorpicker_'+parseInt(Math.random() * 1000);$(this).data('colorpickerId',id);var cal=$(tpl).attr('id',id);if(options.flat){cal.appendTo(this).show()} else{cal.appendTo(document.body)}
options.fields=cal.find('input').bind('keyup',keyDown).bind('change',change).bind('blur',blur).bind('focus',focus);cal.find('span').bind('mousedown',downIncrement).end().find('>div.colorpicker_current_color').bind('click',restoreOriginal);options.selector=cal.find('div.colorpicker_color').bind('mousedown',downSelector);options.selectorIndic=options.selector.find('div div');options.el=this;options.hue=cal.find('div.colorpicker_hue div');cal.find('div.colorpicker_hue').bind('mousedown',downHue);options.newColor=cal.find('div.colorpicker_new_color');options.currentColor=cal.find('div.colorpicker_current_color');cal.data('colorpicker',options);cal.find('div.colorpicker_submit').bind('mouseenter',enterSubmit).bind('mouseleave',leaveSubmit).bind('click',clickSubmit);fillRGBFields(options.color,cal.get(0));fillHSBFields(options.color,cal.get(0));fillHexFields(options.color,cal.get(0));setHue(options.color,cal.get(0));setSelector(options.color,cal.get(0));setCurrentColor(options.color,cal.get(0));setNewColor(options.color,cal.get(0));if(options.flat){cal.css({position:'relative',display:'block'})} else{$(this).bind(options.eventName,show)}}})},showPicker: function(){return this.each( function(){if($(this).data('colorpickerId')){show.apply(this)}})},hidePicker: function(){return this.each( function(){if($(this).data('colorpickerId')){$('#'+$(this).data('colorpickerId')).hide()}})},setColor: function(col){if(typeof col=='string'){col=HexToHSB(col)} else if(col.r!=undefined&&col.g!=undefined&&col.b!=undefined){col=RGBToHSB(col)} else if(col.h!=undefined&&col.s!=undefined&&col.b!=undefined){col=fixHSB(col)} else{return this}
return this.each(function(){if($(this).data('colorpickerId')){var cal=$('#'+$(this).data('colorpickerId'));cal.data('colorpicker').color=col;cal.data('colorpicker').origColor=col;fillRGBFields(col,cal.get(0));fillHSBFields(col,cal.get(0));fillHexFields(col,cal.get(0));setHue(col,cal.get(0));setSelector(col,cal.get(0));setCurrentColor(col,cal.get(0));setNewColor(col,cal.get(0))}})}}}();$.fn.extend({ColorPicker:ColorPicker.init,ColorPickerHide:ColorPicker.hidePicker,ColorPickerShow:ColorPicker.showPicker,ColorPickerSetColor:ColorPicker.setColor})})(jQuery)

/* - eea_relations.js - */
// https://www.eea.europa.eu/portal_javascripts/eea_relations.js?original=1
jQuery(function($){var $relations_parent=$('#relatedItems');var $relations=$relations_parent.find('.visualNoMarker > div');var $tab_panels=$relations_parent.find(".eea-tabs-panel");var $sort_parent=$(".sorter_ctl");var $sort_select=$sort_parent.find('select');if($relations.children().length>10){$sort_parent.show()}
$(window).bind('relations.showSortingWidget', function(){if($tab_panels.length){$tab_panels.each(function(){var $this=$(this);var data_attr=$this.find('.page').eq(0).data();if(data_attr&&data_attr.count>10){$sort_parent.show();return false}})}});$(window).trigger('relations.showSortingWidget');$sort_select.change(function(e){var sort_parameter=e.currentTarget.value;$relations.each(function(){var $this=$(this);var $children=$this.children().detach();$children.sort(function(a,b){return $(a).data(sort_parameter)>$(b).data(sort_parameter)?1:-1});$this.append($children)});$(window).trigger('relations.sort',sort_parameter)});$(window).bind('relations.sort', function(ev,sort_parameter){$tab_panels.each(function(){var $this=$(this);var $listing_entries=$this.find('.photoAlbumEntry, .tileItem').detach();$listing_entries.sort(function(a,b){return $(a).data(sort_parameter)>$(b).data(sort_parameter)?1:-1});var slice_index=0;$('.page',$this).each(function(i,el){var $el=$(el);var count=$el.data('count');var current_index=slice_index;slice_index=slice_index+count;$el.append($listing_entries.slice(current_index,slice_index))})})})});

/* - ++resource++eea.alchemy.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++eea.alchemy.js?original=1
if(typeof String.prototype.endswith!=='function'){String.prototype.endswith=function(suffix){return this.indexOf(suffix,this.length-suffix.length)!==-1}}
if(window.EEA===undefined){var EEA={who:'eea.alchemy',version:'5.0'}}
EEA.Highlighter=function(context,options){var self=this;self.context=context;self.settings={highlightClass:'eea-alchemy-tag',caseInsensitive:true};if(options){jQuery.extend(self.settings,options)}
self.initialize()};EEA.Highlighter.prototype={initialize: function(){var self=this;self.highlight(self.context)},highlight: function(startnode){var self=this;if(!startnode.length){return}
jQuery.each(self.settings.search, function(key,value){startnode.find('*:not(textarea)').andSelf().contents().each(function(){if(this.nodeType===3){self.highlightTermInNode(this,key,value)}})})},highlightTermInNode: function(node,word,link){var self=this;var highlight,index,next;var c=node.nodeValue;var s1='\\s[\\"\\{\\[\\(]?';var s2='[\\"\\}\\]\\)\\.\\,\\!\\?\\;\\:\\s]';var search=new RegExp(s1+word+s2,'gi');highlight=function(content,word,url){return jQuery('<span class="'+self.settings.highlightClass+'" data-word="'+word+'" data-url="'+url+word+'">'+content+'</span>')};while(c&&c.search(search)>-1){index=c.toLowerCase().indexOf(word.toLowerCase());jQuery(node).before(document.createTextNode(c.substr(0,index))).before(highlight(c.substr(index,word.length),word,link)).before(document.createTextNode(c.substr(index+word.length)));next=node.previousSibling;jQuery(node).remove();node=next;c=node.nodeValue}}};EEA.Alchemy=function(context,options){var self=this;self.context=context;self.settings={api:'alchemy.tags.json',highlightClass:'eea-alchemy-tag'};if(options){jQuery.extend(self.settings,options)}
try{self.initialize()}catch(err){if(window.console){console.log(err)}}};EEA.Alchemy.prototype={initialize: function(){var self=this;jQuery.ajax({dataType:"json",url:self.settings.api,success: function(data){self.onSuccess(data)}})},onSuccess: function(options){var self=this;if(!options.enabled){return}
if(!options.search){return}
if(options.modal){self.makeModal()}
jQuery.extend(self.settings,options);return self.reload()},reload: function(){var self=this;self.exists={};var adapter=new EEA.Highlighter(self.context,self.settings);self.context.data('EEAHighlighter',adapter);jQuery('.'+self.settings.highlightClass,self.context).each(function(){return self.reloadItem(jQuery(this))})},reloadItem: function(item){var self=this;var blacklist=self.settings.blacklist||[];blacklist.push('a');blacklist=blacklist.join(',');if(item.parents(blacklist).length){item.removeClass(self.settings.highlightClass);return}
var url=item.data('url');if(!url){return}
var word=item.data('word');if(self.settings.firstOnly&&self.exists[word.toLowerCase()]){item.removeClass(self.settings.highlightClass);return}
self.exists[word.toLowerCase()]=url;var link=jQuery('<a>').attr('href',url).text(item.text());item.html(link);item.show('highlight',2000)},makeModal: function(){}};jQuery.fn.EEAlchemy=function(options){return this.each(function(){var context=jQuery(this);var adapter=new EEA.Alchemy(context,options);context.data('EEAlchemy',adapter)})};jQuery(document).ready(function(){var enabled=jQuery('#eea-alchemy-enabled');if(!enabled.length){return}
var items=jQuery('#region-content,#content');if(!items.length){return}
var href=window.location.href.split('?')[0];if(href.endswith('edit')){return}
if(items.find('[name="edit_form"]').length){return}
base=jQuery('base').attr('href')||'';if(base&&base.endswith('/view')){base=base.replace(/\/view$/g,'/')}
if(base&&!base.endswith('/')){base+='/'}
items.EEAlchemy({api:base+'alchemy.tags.json'});var modal=jQuery('#eea-alchemy-modalEnabled');if(modal.length){jQuery("body").delegate(".eea-alchemy-tag a","click", function(){jQuery("#eea-alchemy-modal-output").remove();jQuery("body").append(jQuery("<div id='eea-alchemy-modal-output'></div>"));var url=encodeURI(jQuery(this).attr("href").replace("@@search","@@updated_search"));jQuery("#eea-alchemy-modal-output").dialog({width:800,height:600,modal:true,title:"Results",open: function(evt,ui){jQuery("#eea-alchemy-modal-output").load(url)}});return false});jQuery("body").delegate("#eea-alchemy-modal-output #updated-sorting-options a","click", function(){var url=jQuery(this).attr("href").replace("@@search","@@updated_search");jQuery("#eea-alchemy-modal-output").html("");jQuery("#eea-alchemy-modal-output").load(url);return false});jQuery("body").delegate("#eea-alchemy-modal-output .listingBar a","click", function(){var url=jQuery(this).attr("href");jQuery("#eea-alchemy-modal-output").html("");jQuery("#eea-alchemy-modal-output").load(url);return false})}});
