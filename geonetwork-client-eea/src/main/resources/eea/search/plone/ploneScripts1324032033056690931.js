
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - swfobject.js - */
// http://www.eea.europa.eu/portal_javascripts/swfobject.js?original=1
if(typeof deconcept=="undefined"){var deconcept={}}
if(typeof deconcept.util=="undefined"){deconcept.util={}}
if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil={}}
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a,_b){if(!document.getElementById){return}
this.DETECT_KEY=_b?_b:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params={};this.variables={};this.attributes=[];if(_1){this.setAttribute("swf",_1)}
if(id){this.setAttribute("id",id)}
if(w){this.setAttribute("width",w)}
if(h){this.setAttribute("height",h)}
if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")))}
this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(c){this.addParam("bgcolor",c)}
var q=_8?_8:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",_7);this.setAttribute("doExpressInstall",false);var _d=(_9)?_9:window.location;this.setAttribute("xiRedirectUrl",_d);this.setAttribute("redirectUrl","");if(_a){this.setAttribute("redirectUrl",_a)}};deconcept.SWFObject.prototype={setAttribute:function(_e,_f){this.attributes[_e]=_f},getAttribute:function(_10){return this.attributes[_10]},addParam:function(_11,_12){this.params[_11]=_12},getParams:function(){return this.params},addVariable:function(_13,_14){this.variables[_13]=_14},getVariable:function(_15){return this.variables[_15]},getVariables:function(){return this.variables},getVariablePairs:function(){var _16=[];var key;var _18=this.getVariables();for(key in _18){_16.push(key+"="+_18[key])}
return _16},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn")}
_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+window.location.search+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=key+"=\""+_1a[key]+"\" "}
var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\""}
_19+="/>"}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX")}
_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+window.location.search+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />"}
var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />"}
_19+="</object>"}
return _19},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title)}}
if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true}else{if(this.getAttribute("redirectUrl")!==""){document.location.replace(this.getAttribute("redirectUrl"))}}
return false}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."))}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}
catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always"}
catch(e){if(_23.major==6){return _23}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}
catch(e){}}
if(axo!==null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","))}}
return _23};deconcept.PlayerVersion=function(_27){this.major=_27[0]!==null?parseInt(_27[0],10):0;this.minor=_27[1]!==null?parseInt(_27[1],10):0;this.rev=_27[2]!==null?parseInt(_27[2],10):0};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false}
if(this.major>fv.major){return true}
if(this.minor<fv.minor){return false}
if(this.minor>fv.minor){return true}
if(this.rev<fv.rev){return false}
return true};deconcept.util={getRequestParameter:function(_29){var q=document.location.search||document.location.hash;if(q){var _2b=q.substring(1).split("&");for(var i=0;i<_2b.length;i++){if(_2b[i].substring(0,_2b[i].indexOf("="))==_29){return _2b[i].substring((_2b[i].indexOf("=")+1))}}}
return ""}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2d=document.getElementsByTagName("OBJECT");for(var i=0;i<_2d.length;i++){_2d[i].style.display="none";for(var x in _2d[i]){if(typeof _2d[i][x]=="function"){_2d[i][x]=null}}}};if(typeof window.onunload=="function"){var oldunload=window.onunload;window.onunload=function(){deconcept.SWFObjectUtil.cleanupSWFs();oldunload()}}else{window.onunload=deconcept.SWFObjectUtil.cleanupSWFs}
if(Array.prototype.push==null){Array.prototype.push=function(_30){this[this.length]=_30;return this.length}}
var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

/* - resize.js - */
// http://www.eea.europa.eu/portal_javascripts/resize.js?original=1
function resizeDiv(){var myWidth=0,myHeight=0;if(typeof(window.innerWidth)=='number'){myWidth=window.innerWidth;myHeight=window.innerHeight} else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){myWidth=document.documentElement.clientWidth;myHeight=document.documentElement.clientHeight} else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){myWidth=document.body.clientWidth;myHeight=document.body.clientHeight}
var newHeight=myHeight * 0.8;ct=document.getElementById("region-content");if(ct!==null){ct.style.height='100%'}
ct=document.getElementById("content");if(ct!==null){ct.style.height='100%'}
return newHeight}
window.onresize=resizeDiv;AttachEvent(window,'load',resizeDiv,false);

/* - design.js - */
// http://www.eea.europa.eu/portal_javascripts/design.js?original=1
var DESIGN_MIN_WIDTH=972;var DESIGN_MAX_WIDTH=1280;jQuery(document).ready(function($){if($("#multimedia-widgets").length===0){var secundary_portaltabs=$("<ul id='secundary-portaltabs'></ul>"),global_nav=$('#portal-globalnav');$("#portaltab-pressroom, #portaltab-abouteea",global_nav).detach().appendTo(secundary_portaltabs);secundary_portaltabs.appendTo(global_nav)}
var r=/data-and-maps\/(figures|data)\/?$/;if(r.test(window.location.pathname)){$('body').addClass('fullscreen');$('#icon-full_screen').parent().remove()}
function toggleEcotipClass(){var ecotip=jQuery('#portlet-ecotip');ecotip.toggleClass('hover')}
window.setInterval(toggleEcotipClass,5000)});jQuery(window).load(function(){jQuery(window).resize()});jQuery(window).resize(function(){var wrapper=jQuery('#visual-portal-wrapper');var w=wrapper.width();if(w<DESIGN_MIN_WIDTH){wrapper.width(DESIGN_MIN_WIDTH)} else if(w>DESIGN_MAX_WIDTH){wrapper.width(DESIGN_MAX_WIDTH)}
var top_news=jQuery('#top-news-area'),top_news_width=top_news.width();var margin=top_news_width * 0.012;w=Math.floor((top_news_width-5 * margin)/5);var promotions=top_news.find('.portlet-promotions');promotions.width(w);var last=promotions.last();promotions.not(last).css('marginRight',(Math.floor(margin)+3)+'px');last.css({'marginRight':'0px'})});

/* - sub_cookies.js - */
// http://www.eea.europa.eu/portal_javascripts/sub_cookies.js?original=1
var SubCookieUtil={get: function(name,subName){var subCookies=this.getAll(name);if(subCookies){return subCookies[subName]} else{return null}},getAll: function(name){var cookieName=encodeURIComponent(name)+"=",cookieStart=document.cookie.indexOf(cookieName),cookieValue=null,result={};if(cookieStart>-1){var cookieEnd=document.cookie.indexOf(";",cookieStart);if(cookieEnd==-1){cookieEnd=document.cookie.length}
cookieValue=document.cookie.substring(cookieStart+cookieName.length,cookieEnd);if(cookieValue.length>0){var subCookies=cookieValue.split("&");for(var i=0,len=subCookies.length;i<len;i++){var parts=subCookies[i].split("=");result[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1])}
return result}}
return null},set: function(name,subName,value,expires,path,domain,secure){var subcookies=this.getAll(name)||{};subcookies[subName]=value;this.setAll(name,subcookies,expires,path,domain,secure)},setAll: function(name,subcookies,expires,path,domain,secure){var cookieText=encodeURIComponent(name)+"=";var subcookieParts=[];for(var subName in subcookies){if(subName.length>0&&subcookies.hasOwnProperty(subName)){subcookieParts.push(encodeURIComponent(subName)+"="+encodeURIComponent(subcookies[subName]))}}
if(subcookieParts.length>0){cookieText+=subcookieParts.join("&");if(expires instanceof Date){cookieText+="; expires="+expires.toGMTString()}
if(path){cookieText+="; path="+path}
if(domain){cookieText+="; domain="+domain}
if(secure){cookieText+="; secure"}} else{cookieText+="; expires="+(new Date(0)).toGMTString()}
document.cookie=cookieText},unset: function(name,subName,path,domain,secure){var subcookies=this.getAll(name);if(subcookies){delete subcookies[subName];this.setAll(name,subcookies,null,path,domain,secure)}},unsetAll: function(name,path,domain,secure){this.setAll(name,null,new Date(0),path,domain,secure)}};

/* - promotions.js - */
// http://www.eea.europa.eu/portal_javascripts/promotions.js?original=1
var btn_ready=true;
function getRandom(range){return Math.floor(Math.random()*range)}
function updateCounter(portlet_id){var sel_index=jQuery('#'+portlet_id+' DD').index(jQuery('#'+portlet_id+' DD.active-promo')[0])+1;var max_items=jQuery('#'+portlet_id+' DD').length;jQuery("#count-"+portlet_id).html(sel_index+'/'+max_items)}
function getPortletId(context){return context.id.substring(5,context.id.length)+'-portlet'}
function promoMoveSlide(context,direction,speed){if(btn_ready===true){var portlet_id=getPortletId(context);var sel_promo=jQuery('#'+portlet_id+' .active-promo');var next_promo;if(direction=='next'){next_promo=sel_promo.next()}
else{next_promo=sel_promo.prev()}
if(next_promo.length>0&&next_promo[0].tagName=='DD'){var sel_promo_id=sel_promo[0].id;var next_promo_id=next_promo[0].id;jQuery("#"+sel_promo_id).slideToggle(speed);jQuery("#"+next_promo_id).slideToggle(speed);jQuery("#"+sel_promo_id).removeClass('active-promo');jQuery("#"+sel_promo_id).addClass('hide-promo');jQuery("#"+next_promo_id).removeClass('hide-promo');jQuery("#"+next_promo_id).addClass('active-promo')}
updateCounter(portlet_id)}}
function rssBehavior(element){var tabs=element.parentNode.getElementsByTagName('span');var feeds=[];var current_feed=document.getElementById('container-rss-'+element.id);var i;for(i=0;i<tabs.length;i++){feeds[i]=document.getElementById('container-rss-'+tabs[i].id)}
for(i=0;i<tabs.length;i++){tabs[i].className='portletTabHead'}
element.className='portletTabHead_current';for(i=0;i<feeds.length;i++){feeds[i].style.display='none'}
current_feed.style.display='block';return false}
function setPromo(){var animation_speed=800;var promo_portlets=jQuery('.promo-nav-portlet');jQuery.each(promo_portlets, function(){var promos=jQuery('dd',this);if(promos.length>0){var sel_promo_id=promos[getRandom(promos.length)].id;jQuery("#"+sel_promo_id).toggle(animation_speed);jQuery('#'+sel_promo_id).addClass('active-promo');jQuery('#'+sel_promo_id).removeClass('hide-promo');updateCounter(this.id)}});jQuery(".promo-next").click(function(){promoMoveSlide(this,'next',animation_speed)});jQuery(".promo-prev").click(function(){promoMoveSlide(this,'prev',animation_speed)});jQuery("span.portletTabHead").click(function(){rssBehavior(this)});jQuery("span.portletTabHead_current").click(function(){rssBehavior(this)})}
function showImage(promo_id){var promo=jQuery('#'+promo_id);var image_ob=promo.find('img')[0];var image_src=promo.find('a').last()[0].href;image_ob.src=image_src}
jQuery(document).ready(function(){if(jQuery('#top-news-area').length>0){jQuery('#top-news-area .portlet-promotions .promo-nav-portlet dd').removeClass('hide-promo')}
else{setPromo()}});
