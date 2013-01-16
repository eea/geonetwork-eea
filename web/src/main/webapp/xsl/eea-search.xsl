<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:exslt="http://exslt.org/common" xmlns:g="http://g">
	
	<xsl:output
		omit-xml-declaration="yes" 
		method="html" 
		doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN"
		doctype-system="http://www.w3.org/TR/html4/loose.dtd"
		indent="yes"
		encoding="UTF-8" />
	
	<xsl:include href="eea-layout.xsl"/>
	
	<xsl:template match="/">
		<html>
			<head>
				<xsl:call-template name="eea-head"/>
				
				
				<link href="../../srv/en/rss.latest?georss=gml" rel="alternate"
					type="application/rss+xml"
					title="GeoNetwork opensource GeoRSS | Recent Changes" />
				<link href="../../srv/en/portal.opensearch" rel="search"
					type="application/opensearchdescription+xml" title="GeoNetwork" />
				
				<link rel="stylesheet" type="text/css"
					href="../../apps/js/ext/resources/css/ext-all.css" />
				<link rel="stylesheet" type="text/css"
					href="../../apps/js/ext/resources/css/xtheme-gray.css" />
				
				
				<xsl:choose>
					<xsl:when test="/root/request/debug">
						<link rel="stylesheet" type="text/css" href="../../eea/search/css/eea.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/ext-ux/Rating/rating.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/ext-ux/LightBox/lightbox.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/ext-ux/FileUploadField/file-upload.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/ext-ux/SuperBoxSelect/superboxselect.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/ext-ux/MultiselectItemSelector-3.0/Multiselect.css" />
						<link rel="stylesheet" type="text/css" href="../../eea/search/css/gndefault.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/css/gnmapdefault.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/css/gnmetadatadefault.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/css/metadata-view.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/OpenLayers/theme/default/style.css" />
					</xsl:when>
					<xsl:otherwise>
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/ext-ux/css/ext-ux.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/css/geonetwork.css" />
						<link rel="stylesheet" type="text/css"
							href="../../eea/search/css/eea-mini.css" />
						<link rel="stylesheet" type="text/css"
							href="../../apps/js/OpenLayers/theme/default/style.css" />
					</xsl:otherwise>
				</xsl:choose>
				
				
				
			</head>
			<body style="overflow: auto;">
				<xsl:call-template name="eea-header"/>
				<div id="visual-portal-wrapper">
					
					<!--<tal:header tal:replace="structure context/getHeader"> </tal:header>-->
					<!-- The wrapper div. It contains the two columns. -->
					<div id="portal-columns">
						<!-- start of the content column -->
						<div id="content" class="column-area">
							
							
							
							<div id="portal-breadcrumbs">
								<span id="breadcrumbs-you-are-here">You are here:</span>
								<span id="breadcrumbs-home">
									<a href="http://www.eea.europa.eu">Home</a>
									<span class="breadcrumbSeparator">›
									</span>
								</span>
								<span id="breadcrumbs-1" dir="ltr">
									<span id="breadcrumbs-current"><a href="http://www.eea.europa.eu/data-and-maps">Data and maps</a></span>
									<span class="breadcrumbSeparator">›
									</span>
								</span>
								<span id="breadcrumbs-2" dir="ltr">
									<span id="breadcrumbs-current">Geospatial data catalogue</span>
								</span>
							</div>
							<h1 id="parent-fieldname-title" class="documentFirstHeading" style="font-size: 150% !important;margin: 0.67em 0;">
								Geospatial data Catalogue
							</h1>
							
							<div id="parent-fieldname-description" class="documentDescription">
								Spatial Data Infrastructure metadata catalogue.
							</div> 
							<!--                   Document content region: Your static/dynamic content goes here.-->
							<div id="loading-mask"></div>
							<div id="loading">
								<div class="loading-indicator">Loading ...</div>
							</div>
							<div class="documentContent panels" id="region-content"></div>
							<div id="infoContent"></div>
							
							<div class="documentActions">
								<h5 class="hiddenStructure">
									Document Actions
								</h5>
								<h2 class="share-title">Share with others</h2>
								
								<table class="table-document-actions">
									<tr>
										<td>
											<div id="socialmedia-list">
												<div id="delicious" class="social-box">
													<a href="http://www.delicious.com/save" onclick="window.open('http://www.delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url='+encodeURIComponent(location.href)+'&amp;title='+encodeURIComponent(document.title), 'delicious','toolbar=no,width=550,height=550'); return false;">
														<img src="http://www.eea.europa.eu/delicious20x20.png" alt="Delicious"/>
													</a>
												</div>                                     
												<div id="twitter" class="social-box">
													<a href="https://twitter.com/share" class="twitter-share-button"></a>
													<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
												</div>
												<div id="google" class="social-box">
													<g:plusone size="medium"></g:plusone>
													<script type="text/javascript">
                                                (function() {
                                                    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                                                    po.src = 'https://apis.google.com/js/plusone.js';
                                                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
                                                })();
                                            </script>
												</div>
												<div id="facebook" class="social-box">
													<div id="fb-root"></div>
													<script> 
                                                (function(d, s, id) {
                                                    var js, fjs = d.getElementsByTagName(s)[0];
                                                    if (d.getElementById(id)) return;
                                                    js = d.createElement(s); js.id = id;
                                                    js.src = '//connect.facebook.net/en_GB/all.js#xfbml=1';
                                                    fjs.parentNode.insertBefore(js, fjs);
                                                }(document, 'script', 'facebook-jssdk'));
                                            </script>
													<div class="fb-like" data-send="true" data-layout="button_count" data-show-faces="false"></div>
												</div>
											</div>
										</td>
										<td class="align-right">
											<ul>
												<li id="document-action-print">
													<a href="javascript:this.print();">
														<img src="http://www.eea.europa.eu/templates/print_icon.gif"
															alt="Print this page"
															title="Print this page" />
													</a>
												</li>
											</ul>
										</td>
									</tr>
								</table>
							</div>
						</div>
						
						<!-- end of the main column -->
						
						<!-- start of right column -->
						<div id="right-column" class="right-column-area" style="min-height: 800px;">
							<div class="visualPadding" id="slide-menu">
								
								<h1 id="parent-fieldname-title" style="font-size: 150% !important;margin: 0.67em 0;" class="documentFirstHeading"><span id="searchLb">Search</span></h1>
								<div id="search-form" style="height:100%"></div>
								
								<div id="tag-cloud"></div>

                                <div id="breadcrumb-facets"></div>
                                <div id="facets-panel"></div>

								<h1 id="parent-fieldname-title" style="font-size: 150% !important;margin: 0.67em 0;" class="documentFirstHeading"><span id="loginLb">Admin login</span></h1>
								
                                
								<div id="login-form"></div>
								
								<br />
								<div id="lang-form"></div>
							</div>
						</div>
						<!-- end of the right (by default at least) column -->
						
						<div class="visualClear"><!-- --></div> 
					</div>
					<!-- end column wrapper -->
					
					<div id="shortcut" style="display: none;"></div>
					
					<!--<tal:footer tal:replace="structure context/getFooter"> </tal:footer>-->
				</div> <!-- visual-portal-wrapper" -->
				
				<xsl:call-template name="eea-footer"/>
				
				
				
				<xsl:choose>
					<xsl:when test="/root/request/debug">
						<script type="text/javascript"
        src="../../apps/js/ext/adapter/ext/ext-base.js"></script>
						<script type="text/javascript" src="../../apps/js/ext/ext-all-debug.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/FileUploadField/FileUploadField.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/TwinTriggerComboBox/TwinTriggerComboBox.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/DateTime/DateTime.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/RowExpander/RowExpander.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/MultiselectItemSelector-3.0/DDView.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/MultiselectItemSelector-3.0/Multiselect.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/LightBox/lightbox.js"></script>
						<script type="text/javascript"
        src="../../apps/js/ext-ux/SuperBoxSelect/SuperBoxSelect.js"></script>
						
						<script type="text/javascript"
        src="../../apps/js/proj4js-compressed.js"></script>
						<script type="text/javascript"
        src="../../apps/js/OpenLayers/lib/OpenLayers.js"></script>
						<script type="text/javascript"
        src="../../apps/js/GeoExt/lib/overrides/override-ext-ajax.js"></script>
						<script type="text/javascript" src="../../apps/js/GeoExt/lib/GeoExt.js"></script>
						<script type="text/javascript"
        src="../../apps/js/GeoExt-ux/LayerOpacitySliderPlugin/LayerOpacitySliderPlugin.js"></script>
						
						<script type="text/javascript"
        src="../../apps/js/GeoNetwork/lib/GeoNetwork.js"></script>
						
						<script type="text/javascript" src="../../eea/search/js/Settings.js"></script>
						<script type="text/javascript" src="../../eea/search/js/Shortcuts.js"></script>
						<script type="text/javascript" src="../../eea/search/js/map/Settings.js"></script>
						<script type="text/javascript" src="../../eea/search/js/Templates.js"></script>
						<script type="text/javascript" src="../../eea/search/js/App.js"></script>
						
					</xsl:when>
					<xsl:otherwise>
						
						<script type="text/javascript"
        src="../../apps/js/ext/adapter/ext/ext-base.js"></script>
						<script type="text/javascript" src="../../apps/js/ext/ext-all.js"></script>
						
						<script type="text/javascript" src="../../eea/search/js/App-mini.js"></script>
						
					</xsl:otherwise>
				</xsl:choose>
				
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
