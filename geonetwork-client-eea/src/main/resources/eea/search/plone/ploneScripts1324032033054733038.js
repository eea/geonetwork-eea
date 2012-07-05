
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - event-registration.js - */
// http://www.eea.europa.eu/portal_javascripts/event-registration.js?original=1
function addDOMLoadEvent(listener){jQuery(listener)}


/* - register_function.js - */
// http://www.eea.europa.eu/portal_javascripts/register_function.js?original=1
var bugRiddenCrashPronePieceOfJunk=(navigator.userAgent.indexOf('MSIE 5')!==-1&&navigator.userAgent.indexOf('Mac')!==-1);var W3CDOM=(!bugRiddenCrashPronePieceOfJunk&&typeof document.getElementsByTagName!=='undefined'&&typeof document.createElement!=='undefined');var registerEventListener=function(elem,event,func){jQuery(elem).bind(event,func)};var unRegisterEventListener=function(elem,event,func){jQuery(elem).unbind(event,func)};var registerPloneFunction=jQuery;
function getContentArea(){var node=jQuery('#region-content,#content');return node.length?node[0]:null}


/* - plone_javascript_variables.js - */
// http://www.eea.europa.eu/portal_javascripts/plone_javascript_variables.js?original=1
var portal_url='http://www.eea.europa.eu';var form_modified_message='Your form has not been saved. All changes you have made will be lost.';var form_resubmit_message='You already clicked the submit button. Do you really want to submit this form again?';var external_links_open_new_window='false';var mark_special_links='True';var ajax_noresponse_message='No response from server. Please try again later.';

/* - nodeutilities.js - */
// http://www.eea.europa.eu/portal_javascripts/nodeutilities.js?original=1
function wrapNode(node,wrappertype,wrapperclass){jQuery(node).wrap('<'+wrappertype+'>').parent().addClass(wrapperclass)}
function nodeContained(innernode,outernode){return jQuery(innernode).parents().filter(function(){return this===outernode}).length>0}
function findContainer(node,func){var p=jQuery(node).parents().filter(func);return p.length?p.get(0):false}
function hasClassName(node,class_name){return jQuery(node).hasClass(class_name)}
function addClassName(node,class_name){jQuery(node).addClass(class_name)}
function removeClassName(node,class_name){jQuery(node).removeClass(class_name)}
function replaceClassName(node,old_class,new_class,ignore_missing){if(ignore_missing||jQuery(node).hasClass(old_class)){jQuery(node).removeClass(old_class).addClass(new_class)}}
function walkTextNodes(node,func,data){jQuery(node).find('*').andSelf().contents().each(function(){if(this.nodeType===3){func(this,data)}})}
function getInnerTextCompatible(node){return jQuery(node).text()}
function getInnerTextFast(node){return jQuery(node).text()}
function sortNodes(nodes,fetch_func,cmp_func){var SortNodeWrapper,items;SortNodeWrapper=function(node){this.value=fetch_func(node);this.cloned_node=node.cloneNode(true)};SortNodeWrapper.prototype.toString=function(){return this.value.toString?this.value.toString():this.value};items=jQuery(nodes).map(function(){return new SortNodeWrapper(this)});if(cmp_func){items.sort(cmp_func)} else{items.sort()}
jQuery.each(items, function(i){jQuery(nodes[i]).replace(this.cloned_node)})}
function copyChildNodes(srcNode,dstNode){jQuery(srcNode).children().clone().appendTo(jQuery(dstNode))}


/* - cookie_functions.js - */
// http://www.eea.europa.eu/portal_javascripts/cookie_functions.js?original=1
function createCookie(name,value,days){var date,expires;if(days){date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toGMTString()} else{expires=""}
document.cookie=name+"="+escape(value)+expires+"; path=/;"}
function readCookie(name){var nameEQ=name+"=",ca=document.cookie.split(';'),i,c;for(i=0;i<ca.length;i=i+1){c=ca[i];while(c.charAt(0)===' '){c=c.substring(1,c.length)}
if(c.indexOf(nameEQ)===0){return unescape(c.substring(nameEQ.length,c.length))}}
return null}


/* - select_all.js - */
// http://www.eea.europa.eu/portal_javascripts/select_all.js?original=1
function toggleSelect(selectbutton,id,initialState,formName){var fid,state,base;fid=id||'ids:list';state=selectbutton.isSelected;if(state===undefined){state=Boolean(initialState)}
selectbutton.isSelected=!state;jQuery(selectbutton).attr('src',portal_url+'/select_'+(state?'all':'none')+'_icon.png');base=formName?jQuery(document.forms[formName]):jQuery(document);base.find(':checkbox[name='+fid+']').attr('checked',!state)}


/* - attachevent.js - */
// http://www.eea.europa.eu/portal_javascripts/attachevent.js?original=1
function MyAttachEvent(obj,evt,fnc){if(!obj.myEvents){obj.myEvents={}}
if(!obj.myEvents[evt]){obj.myEvents[evt]=[]}
var evts=obj.myEvents[evt];evts[evts.length]=fnc}
function MyFireEvent(obj,evt){var i=0;if(!obj||!obj.myEvents||!obj.myEvents[evt]){return}
var evts=obj.myEvents[evt];for(len=evts.length;i<len;i++){evts[i]()}}
function AttachEvent(obj,evt,fnc,useCapture){if(!useCapture){useCapture=false}
if(obj.addEventListener){obj.addEventListener(evt,fnc,useCapture);return true} else if(obj.attachEvent){return obj.attachEvent("on"+evt,fnc)}
else{MyAttachEvent(obj,evt,fnc);obj['on'+evt]=function(){MyFireEvent(obj,evt)}}}


/* - drop.js - */
// http://www.eea.europa.eu/portal_javascripts/drop.js?original=1
var oDiv=null;var timer=null;var delayTime=500;
function objRef(mitid){if(document.getElementById){return document.getElementById(mitid)}
else if(document.all){return document.all[mitid]}}
function showMenu(menuDiv){objRef(menuDiv).style.display="block";if(timer){clearTimeout(timer)}
if(menuDiv!==oDiv){if(oDiv){objRef(oDiv).style.display="none"}
oDiv=menuDiv}}
function hideMenu(navn){n_navn=navn;timer=setTimeout(objRef(n_navn).style.display="none",delayTime)}


/* - hideemail.js - */
// http://www.eea.europa.eu/portal_javascripts/hideemail.js?original=1
function create_contact_info_local(theuser,thedomain,linktext){var thecontact=(theuser+'@'+thedomain);thecontact='<A href="mailto:'+thecontact+'">'+linktext+'</a>';return thecontact}

/* - ga.js - */
// http://www.eea.europa.eu/portal_javascripts/ga.js?original=1
var pageTracker;
function gaSSDSLoad(acct){var gaJsHost=(("https:"==document.location.protocol)?"https://ssl.":"http://www."),s;s=document.createElement('script');s.src=gaJsHost+'google-analytics.com/ga.js';s.type='text/javascript';s.onloadDone=false;
function init(){pageTracker=_gat._getTracker(acct);pageTracker._setDomainName("eea.europa.eu");pageTracker._initData();pageTracker._trackPageview()}
s.onload=function(){s.onloadDone=true;init()};s.onreadystatechange=function(){if(('loaded'===s.readyState||'complete'===s.readyState)&&!s.onloadDone){s.onloadDone=true;init()}};document.getElementsByTagName('head')[0].appendChild(s)}
function gaSSDSLoad_init(){gaSSDSLoad("UA-184389-1")}
registerPloneFunction(gaSSDSLoad_init);
