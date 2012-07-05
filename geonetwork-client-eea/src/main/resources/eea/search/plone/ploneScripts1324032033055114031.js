
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* ERROR -- could not find '++resource++jquery.tools.min.js'*/

/* - ++resource++jquery.reflect.js - */
// http://www.eea.europa.eu/portal_javascripts/++resource++jquery.reflect.js?original=1
(function($){$.fn.extend({reflect: function(options){options=$.extend({height:0.33,opacity:0.5},options);return this.unreflect().each(function(){var img=this;if (/^img$/i.test(img.tagName)){
function doReflect(){var reflection,reflectionHeight=Math.floor(img.height * options.height),wrapper,context,gradient;if($.browser.msie){reflection=$("<img />").attr("src",img.src).css({width:img.width,height:img.height,marginBottom:-img.height+reflectionHeight,filter:"flipv progid:DXImageTransform.Microsoft.Alpha(opacity="+(options.opacity * 100)+", style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy="+(options.height * 100)+")"})[0]} else{reflection=$("<canvas />")[0];if(!reflection.getContext) return;context=reflection.getContext("2d");try{$(reflection).attr({width:img.width,height:reflectionHeight});context.save();context.translate(0,img.height-1);context.scale(1,-1);context.drawImage(img,0,0,img.width,img.height);context.restore();context.globalCompositeOperation="destination-out";gradient=context.createLinearGradient(0,0,0,reflectionHeight);gradient.addColorStop(0,"rgba(255, 255, 255, "+(1-options.opacity)+")");gradient.addColorStop(1,"rgba(255, 255, 255, 1.0)");context.fillStyle=gradient;context.rect(0,0,img.width,reflectionHeight);context.fill()} catch(e){return}}
$(reflection).css({display:"block",border:0});wrapper=$(/^a$/i.test(img.parentNode.tagName)?"<span />":"<div />").insertAfter(img).append([img,reflection])[0];wrapper.className=img.className;$.data(img,"reflected",wrapper.style.cssText=img.style.cssText);$(wrapper).css({width:img.width,height:img.height+reflectionHeight,overflow:"hidden"});img.style.cssText="display: block; border: 0px";img.className="reflected"}
if(img.complete) doReflect();else $(img).load(doReflect)}})},unreflect: function(){return this.unbind("load").each(function(){var img=this,reflected=$.data(this,"reflected"),wrapper;if(reflected!==undefined){wrapper=img.parentNode;img.className=wrapper.className;img.style.cssText=reflected;$.removeData(img,"reflected");wrapper.parentNode.replaceChild(img,wrapper)}})}})})(jQuery);

/* - ++resource++jquery.jqzoom.js - */
// http://www.eea.europa.eu/portal_javascripts/++resource++jquery.jqzoom.js?original=1
var JQEvent={};JQEvent.ACTIVATE='JQ-ACTIVATE';JQEvent.DEACTIVATE='JQ-DEACTIVATE';(function($){$.fn.jqzoom=function(options){var settings={zoomType:'standard',zoomWidth:200,zoomHeight:200,xOffset:10,yOffset:0,position:"right",lens:true,lensReset:false,imageOpacity:0.2,title:true,alwaysOn:false,startOpened:false,showEffect:'show',hideEffect:'hide',fadeinSpeed:'fast',fadeoutSpeed:'slow',preloadImages:true,showPreload:true,preloadText:'Loading zoom',preloadPosition:'center'};options=options||{};$.extend(settings,options);return this.each(function(){var a=$(this);var aTitle=a.attr('title');$(a).removeAttr('title');$(a).css('outline-style','none');var img=$("img",this);var imageTitle=img.attr('title');img.removeAttr('title');var smallimage=new Smallimage(img);var smallimagedata={};var btop=0;var bleft=0;var loader=null;loader=new Loader();var ZoomTitle=(trim(aTitle).length>0)?aTitle:(trim(imageTitle).length>0)?imageTitle:null;var ZoomTitleObj=new zoomTitle();var largeimage=new Largeimage(a[0].href);var lens=new Lens();var lensdata={};var largeimageloaded=false;var scale={};var stage=null;var running=false;var mousepos={};var firstime=0;var preloadshow=false;var isMouseDown=false;var dragstatus=false
smallimage.loadimage();$(this).click(function(){return false});$(this).hover(function(e){mousepos.x=e.pageX;mousepos.y=e.pageY;activate()},function(){deactivate()});if(settings.alwaysOn){setTimeout(function(){activate()},150)}
jQuery(document).bind(JQEvent.ACTIVATE, function(){activate()});jQuery(document).bind(JQEvent.DEACTIVATE, function(){deactivate()});if(settings.startOpened){var jq_timeout=setTimeout(function(){clearTimeout(jq_timeout);activate()},150)}
function activate(){if(!running){smallimage.findborder();running=true;imageTitle=img.attr('title');img.removeAttr('title');aTitle=a.attr('title');$(a).removeAttr('title');if(!largeimage||$.browser.safari){largeimage=new Largeimage(a[0].href)}
if(!largeimageloaded||$.browser.safari){largeimage.loadimage()}else{if(settings.zoomType!='innerzoom'){stage=new Stage();stage.activate()}
lens=new Lens;lens.activate()}
a[0].blur();return false}}
function deactivate(){if(settings.zoomType=='reverse'&&!settings.alwaysOn){img.css({'opacity':1})}
if(!settings.alwaysOn){running=false;largeimageloaded=false;$(lens.node).unbind('mousemove');lens.remove();if($('div.jqZoomWindow').length>0){stage.remove()}
if($('div.jqZoomTitle').length>0){ZoomTitleObj.remove()}
img.attr('title',imageTitle);a.attr('title',aTitle);$().unbind();a.unbind('mousemove');firstime=0;if(jQuery('.zoom_ieframe').length>0){jQuery('.zoom_ieframe').remove()}}else{if(settings.lensReset){switch(settings.zoomType){case 'innerzoom':largeimage.setcenter();break;default:lens.center();break}}}
if(settings.alwaysOn){activate()}};
function Smallimage(image){this.node=image[0];this.loadimage=function(){this.node.src=image[0].src};this.findborder=function(){var bordertop='';bordertop=$(img).css('border-top-width');btop='';var borderleft='';borderleft=$(img).css('border-left-width');bleft='';if(bordertop){for(i=0;i<3;i++){var x=[];x=bordertop.substr(i,1);if(isNaN(x)==false){btop=btop+''+bordertop.substr(i,1)}else{break}}}
if(borderleft){for(i=0;i<3;i++){if(!isNaN(borderleft.substr(i,1))){bleft=bleft+borderleft.substr(i,1)}else{break}}}
btop=(btop.length>0)?eval(btop):0;bleft=(bleft.length>0)?eval(bleft):0}
this.node.onload=function(){a.css({'cursor':'crosshair','display':'block'});if(a.css('position')!='absolute'&&a.parent().css('position')){a.css({'cursor':'crosshair','position':'relative','display':'block'})}
if(a.parent().css('position')!='absolute'){a.parent().css('position','relative')}
else{}
if($.browser.safari||$.browser.opera){$(img).css({position:'absolute',top:'0px',left:'0px'})}
smallimagedata.w=$(this).width();smallimagedata.h=$(this).height();smallimagedata.h=$(this).height();smallimagedata.pos=$(this).offset();smallimagedata.pos.l=$(this).offset().left;smallimagedata.pos.t=$(this).offset().top;smallimagedata.pos.r=smallimagedata.w+smallimagedata.pos.l;smallimagedata.pos.b=smallimagedata.h+smallimagedata.pos.t;a.height(smallimagedata.h);a.width(smallimagedata.w);if(settings.preloadImages){largeimage.loadimage()}};return this};
function Lens(){this.node=document.createElement("div");$(this.node).addClass('jqZoomPup');this.node.onerror=function(){$(lens.node).remove();lens=new Lens();lens.activate() };this.loadlens=function(){switch(settings.zoomType){case 'reverse':this.image=new Image();this.image.src=smallimage.node.src;this.node.appendChild(this.image);$(this.node).css({'opacity':1});break;case 'innerzoom':this.image=new Image();this.image.src=largeimage.node.src;this.node.appendChild(this.image);$(this.node).css({'opacity':1});break
default:break}
switch(settings.zoomType){case 'innerzoom':lensdata.w=smallimagedata.w;lensdata.h=smallimagedata.h;break;default:lensdata.w=(settings.zoomWidth)/scale.x;lensdata.h=(settings.zoomHeight)/scale.y;break}
$(this.node).css({width:lensdata.w+'px',height:lensdata.h+'px',position:'absolute',display:'none',borderWidth:1+'px'});a.append(this.node)}
return this};Lens.prototype.activate=function(){this.loadlens();switch(settings.zoomType){case 'reverse':img.css({'opacity':settings.imageOpacity});(settings.alwaysOn)?lens.center():lens.setposition(null);a.bind('mousemove', function(e){mousepos.x=e.pageX;mousepos.y=e.pageY;lens.setposition(e)});break;case 'innerzoom':$(this.node).css({top:0,left:0});if(settings.title){ZoomTitleObj.loadtitle()}
largeimage.setcenter();a.bind('mousemove', function(e){mousepos.x=e.pageX;mousepos.y=e.pageY;largeimage.setinner(e)});break;default:(settings.alwaysOn)?lens.center():lens.setposition(null);$(a).bind('mousemove', function(e){mousepos.x=e.pageX;mousepos.y=e.pageY;lens.setposition(e)});break}
return this};Lens.prototype.setposition=function(e){if(e){mousepos.x=e.pageX;mousepos.y=e.pageY}
if(firstime==0){var lensleft=(smallimagedata.w)/2-(lensdata.w)/2 ;var lenstop=(smallimagedata.h)/2-(lensdata.h)/2 ;$('div.jqZoomPup').show()
if(settings.lens){this.node.style.visibility='visible'}
else{this.node.style.visibility='hidden';$('div.jqZoomPup').hide()}
firstime=1}else{var lensleft=mousepos.x-smallimagedata.pos.l-(lensdata.w)/2 ;var lenstop=mousepos.y-smallimagedata.pos.t-(lensdata.h)/2 }
if(overleft()){lensleft=0+bleft}else
if(overright()){if($.browser.msie){lensleft=smallimagedata.w-lensdata.w+bleft+1 }else{lensleft=smallimagedata.w-lensdata.w+bleft-1 }}
if(overtop()){lenstop=0+btop }else
if(overbottom()){if($.browser.msie){lenstop=smallimagedata.h-lensdata.h+btop+1 }else{lenstop=smallimagedata.h-lensdata.h-1+btop }}
lensleft=parseInt(lensleft);lenstop=parseInt(lenstop);$('div.jqZoomPup',a).css({top:lenstop,left:lensleft});if(settings.zoomType=='reverse'){$('div.jqZoomPup img',a).css({'position':'absolute','top':-(lenstop-btop+1),'left':-(lensleft-bleft+1)})}
this.node.style.left=lensleft+'px';this.node.style.top=lenstop+'px';largeimage.setposition();
function overleft(){return mousepos.x-(lensdata.w+2*1)/2-bleft<smallimagedata.pos.l}
function overright(){return mousepos.x+(lensdata.w+2* 1)/2>smallimagedata.pos.r+bleft }
function overtop(){return mousepos.y-(lensdata.h+2* 1)/2-btop<smallimagedata.pos.t}
function overbottom(){return mousepos.y+(lensdata.h+2* 1)/2>smallimagedata.pos.b+btop}
return this};Lens.prototype.center=function(){$('div.jqZoomPup',a).css('display','none');var lensleft=(smallimagedata.w)/2-(lensdata.w)/2 ;var lenstop=(smallimagedata.h)/2-(lensdata.h)/2;this.node.style.left=lensleft+'px';this.node.style.top=lenstop+'px';$('div.jqZoomPup',a).css({top:lenstop,left:lensleft});if(settings.zoomType=='reverse'){$('div.jqZoomPup img',a).css({'position':'absolute','top':-(lenstop-btop+1),'left':-(lensleft-bleft+1)})}
largeimage.setposition();if($.browser.msie){$('div.jqZoomPup',a).show()}else{setTimeout(function(){$('div.jqZoomPup').fadeIn('fast')},10)}};Lens.prototype.getoffset=function(){var o={};o.left=parseInt(this.node.style.left) ;o.top=parseInt(this.node.style.top) ;return o};Lens.prototype.remove=function(){if(settings.zoomType=='innerzoom'){$('div.jqZoomPup',a).fadeOut('fast',function(){$(this).remove()})}else{$('div.jqZoomPup',a).remove()}};Lens.prototype.findborder=function(){var bordertop='';bordertop=$('div.jqZoomPup').css('borderTop');lensbtop='';var borderleft='';borderleft=$('div.jqZoomPup').css('borderLeft');lensbleft='';if($.browser.msie){var temp=bordertop.split(' ');bordertop=temp[1];var temp=borderleft.split(' ');borderleft=temp[1]}
if(bordertop){for(i=0;i<3;i++){var x=[];x=bordertop.substr(i,1);if(isNaN(x)==false){lensbtop=lensbtop+''+bordertop.substr(i,1)}else{break}}}
if(borderleft){for(i=0;i<3;i++){if(!isNaN(borderleft.substr(i,1))){lensbleft=lensbleft+borderleft.substr(i,1)}else{break}}}
lensbtop=(lensbtop.length>0)?eval(lensbtop):0;lensbleft=(lensbleft.length>0)?eval(lensbleft):0}
function Largeimage(url){this.url=url;this.node=new Image();this.loadimage=function(){if(!this.node)
this.node=new Image();this.node.style.position='absolute';this.node.style.display='none';this.node.style.left='-5000px';this.node.style.top='10px';loader=new Loader();if(settings.showPreload&&!preloadshow){loader.show();preloadshow=true}
document.body.appendChild(this.node);this.node.src=this.url}
this.node.onload=function(){this.style.display='block';var w=Math.round($(this).width());var h=Math.round($(this).height());this.style.display='none';scale.x=(w/smallimagedata.w);scale.y=(h/smallimagedata.h);if($('div.preload').length>0){$('div.preload').remove()}
largeimageloaded=true;if(settings.zoomType!='innerzoom'&&running){stage=new Stage();stage.activate()}
if(running){lens=new Lens();lens.activate() }
if($('div.preload').length>0){$('div.preload').remove()}}
return this}
Largeimage.prototype.setposition=function(){this.node.style.left=Math.ceil(-scale.x * parseInt(lens.getoffset().left)+bleft)+'px';this.node.style.top=Math.ceil(-scale.y * parseInt(lens.getoffset().top)+btop)+'px'};Largeimage.prototype.setinner=function(e){this.node.style.left=Math.ceil(-scale.x * Math.abs(e.pageX-smallimagedata.pos.l))+'px';this.node.style.top=Math.ceil(-scale.y * Math.abs(e.pageY-smallimagedata.pos.t))+'px';$('div.jqZoomPup img',a).css({'position':'absolute','top':this.node.style.top,'left':this.node.style.left})};Largeimage.prototype.setcenter=function(){this.node.style.left=Math.ceil(-scale.x * Math.abs((smallimagedata.w)/2))+'px';this.node.style.top=Math.ceil(-scale.y * Math.abs((smallimagedata.h)/2))+'px';$('div.jqZoomPup img',a).css({'position':'absolute','top':this.node.style.top,'left':this.node.style.left})};
function Stage(){var leftpos=smallimagedata.pos.l;var toppos=smallimagedata.pos.t;this.node=document.createElement("div");$(this.node).addClass('jqZoomWindow');$(this.node).css({position:'absolute',width:Math.round(settings.zoomWidth)+'px',height:Math.round(settings.zoomHeight)+'px',display:'none',zIndex:10000,overflow:'hidden'});switch(settings.position){case "right":leftpos=(smallimagedata.pos.r+Math.abs(settings.xOffset)+settings.zoomWidth<screen.width)?(smallimagedata.pos.l+smallimagedata.w+Math.abs(settings.xOffset)):(smallimagedata.pos.l-settings.zoomWidth-Math.abs(settings.xOffset));topwindow=smallimagedata.pos.t+settings.yOffset+settings.zoomHeight;toppos=(topwindow<screen.height&&topwindow>0)?smallimagedata.pos.t+settings.yOffset:smallimagedata.pos.t;break;case "left":leftpos=(smallimagedata.pos.l-Math.abs(settings.xOffset)-settings.zoomWidth>0)?(smallimagedata.pos.l-Math.abs(settings.xOffset)-settings.zoomWidth):(smallimagedata.pos.l+smallimagedata.w+Math.abs(settings.xOffset));topwindow=smallimagedata.pos.t+settings.yOffset+settings.zoomHeight;toppos=(topwindow<screen.height&&topwindow>0)?smallimagedata.pos.t+settings.yOffset:smallimagedata.pos.t;break;case "top":toppos=(smallimagedata.pos.t-Math.abs(settings.yOffset)-settings.zoomHeight>0)?(smallimagedata.pos.t-Math.abs(settings.yOffset)-settings.zoomHeight):(smallimagedata.pos.t+smallimagedata.h+Math.abs(settings.yOffset));leftwindow=smallimagedata.pos.l+settings.xOffset+settings.zoomWidth;leftpos=(leftwindow<screen.width&&leftwindow>0)?smallimagedata.pos.l+settings.xOffset:smallimagedata.pos.l;break;case "bottom":toppos=(smallimagedata.pos.b+Math.abs(settings.yOffset)+settings.zoomHeight<$('body').height())?(smallimagedata.pos.b+Math.abs(settings.yOffset)):(smallimagedata.pos.t-settings.zoomHeight-Math.abs(settings.yOffset));leftwindow=smallimagedata.pos.l+settings.xOffset+settings.zoomWidth;leftpos=(leftwindow<screen.width&&leftwindow>0)?smallimagedata.pos.l+settings.xOffset:smallimagedata.pos.l;break;default:leftpos=(smallimagedata.pos.l+smallimagedata.w+settings.xOffset+settings.zoomWidth<screen.width)?(smallimagedata.pos.l+smallimagedata.w+Math.abs(settings.xOffset)):(smallimagedata.pos.l-settings.zoomWidth-Math.abs(settings.xOffset));toppos=(smallimagedata.pos.b+Math.abs(settings.yOffset)+settings.zoomHeight<screen.height)?(smallimagedata.pos.b+Math.abs(settings.yOffset)):(smallimagedata.pos.t-settings.zoomHeight-Math.abs(settings.yOffset));break}
this.node.style.left=leftpos+'px';this.node.style.top=toppos+'px';return this}
Stage.prototype.activate=function(){if(!this.node.firstChild)
this.node.appendChild(largeimage.node);if(settings.title){ZoomTitleObj.loadtitle()}
document.body.appendChild(this.node);switch(settings.showEffect){case 'show':$(this.node).show();break;case 'fadein':$(this.node).fadeIn(settings.fadeinSpeed);break;default:$(this.node).show();break}
$(this.node).show();if($.browser.msie&&$.browser.version<7){this.ieframe=$('<iframe class="zoom_ieframe" frameborder="0" src="#"></iframe>').css({position:"absolute",left:this.node.style.left,top:this.node.style.top,zIndex:99,width:settings.zoomWidth,height:settings.zoomHeight}).insertBefore(this.node)};largeimage.node.style.display='block'}
Stage.prototype.remove=function(){switch(settings.hideEffect){case 'hide':$('.jqZoomWindow').remove();break;case 'fadeout':$('.jqZoomWindow').fadeOut(settings.fadeoutSpeed);break;default:$('.jqZoomWindow').remove();break}}
function zoomTitle(){this.node=jQuery('<div />').addClass('jqZoomTitle').html(''+ZoomTitle+'');this.loadtitle=function(){if(settings.zoomType=='innerzoom'){$(this.node).css({position:'absolute',top:smallimagedata.pos.b+3,left:(smallimagedata.pos.l+1),width:smallimagedata.w}).appendTo('body')}else{$(this.node).appendTo(stage.node)}}}
zoomTitle.prototype.remove=function(){$('.jqZoomTitle').remove()}
function Loader(){this.node=document.createElement("div");$(this.node).addClass('preload');$(this.node).html(settings.preloadText);$(this.node).appendTo("body").css('visibility','hidden');this.show=function(){if(!smallimagedata.pos){return this}
switch(settings.preloadPosition){case 'center':loadertop=smallimagedata.pos.t+(smallimagedata.h-$(this.node).height())/2;loaderleft=smallimagedata.pos.l+(smallimagedata.w-$(this.node).width())/2;break;default:var loaderoffset=this.getoffset();loadertop=!isNaN(loaderoffset.top)?smallimagedata.pos.t+loaderoffset.top:smallimagedata.pos.t+0;loaderleft=!isNaN(loaderoffset.left)?smallimagedata.pos.l+loaderoffset.left:smallimagedata.pos.l+0;break}
$(this.node).css({top:loadertop,left:loaderleft,position:'absolute',visibility:'visible'})}
return this}
Loader.prototype.getoffset=function(){var o=null;o=$('div.preload').offset();return o}})}})(jQuery);
function trim(stringa){while(stringa.substring(0,1)==' '){stringa=stringa.substring(1,stringa.length)}
while(stringa.substring(stringa.length-1,stringa.length)==' '){stringa=stringa.substring(0,stringa.length-1)}
return stringa}

/* - ++resource++jquery.timers.js - */
// http://www.eea.europa.eu/portal_javascripts/++resource++jquery.timers.js?original=1
﻿
jQuery.fn.extend({everyTime: function(interval,label,fn,times,belay){return this.each(function(){jQuery.timer.add(this,interval,label,fn,times,belay)})},oneTime: function(interval,label,fn){return this.each(function(){jQuery.timer.add(this,interval,label,fn,1)})},stopTime: function(label,fn){return this.each(function(){jQuery.timer.remove(this,label,fn)})}});jQuery.event.special
jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{'ms':1,'cs':10,'ds':100,'s':1000,'das':10000,'hs':100000,'ks':1000000},timeParse: function(value){if(value==undefined||value==null)
return null;var result=this.regex.exec(jQuery.trim(value.toString()));if(result[2]){var num=parseFloat(result[1]);var mult=this.powers[result[2]]||1;return num * mult} else{return value}},add: function(element,interval,label,fn,times,belay){var counter=0;if(jQuery.isFunction(label)){if(!times)
times=fn;fn=label;label=interval}
interval=jQuery.timer.timeParse(interval);if(typeof interval!='number'||isNaN(interval)||interval<=0)
return;if(times&&times.constructor!=Number){belay=!!times;times=0}
times=times||0;belay=belay||false;var timers=jQuery.data(element,this.dataKey)||jQuery.data(element,this.dataKey,{});if(!timers[label])
timers[label]={};fn.timerID=fn.timerID||this.guid++;var handler=function(){if(belay&&this.inProgress)
return;this.inProgress=true;if((++counter>times&&times!==0)||fn.call(element,counter)===false)
jQuery.timer.remove(element,label,fn);this.inProgress=false};handler.timerID=fn.timerID;if(!timers[label][fn.timerID])
timers[label][fn.timerID]=window.setInterval(handler,interval);this.global.push(element)},remove: function(element,label,fn){var timers=jQuery.data(element,this.dataKey),ret;if(timers){if(!label){for(label in timers)
this.remove(element,label,fn)} else if(timers[label]){if(fn){if(fn.timerID){window.clearInterval(timers[label][fn.timerID]);delete timers[label][fn.timerID]}} else{for(var fn in timers[label]){window.clearInterval(timers[label][fn]);delete timers[label][fn]}}
for(ret in timers[label]) break;if(!ret){ret=null;delete timers[label]}}
for(ret in timers) break;if(!ret)
jQuery.removeData(element,this.dataKey)}}}});jQuery(window).bind("unload", function(){jQuery.each(jQuery.timer.global, function(index,item){jQuery.timer.remove(item)})});

/* - ++resource++jquery.galleryview.js - */
// http://www.eea.europa.eu/portal_javascripts/++resource++jquery.galleryview.js?original=1
var window_loaded=false;(function($){$.fn.galleryView=function(options){var opts=$.extend($.fn.galleryView.defaults,options);var id;var iterator=0;var item_count=0;var slide_method;var theme_path="../../++resource++galleryview/themes/";var paused=false;var gallery_width;var gallery_height;var pointer_height;var pointer_width;var strip_width;var strip_height;var wrapper_width;var f_frame_width;var f_frame_height;var frame_caption_size=20;var gallery_padding;var filmstrip_margin;var filmstrip_orientation;var frame_img_scale=new Object();var panel_img_scale=new Object();var img_h=new Object();var img_w=new Object();var scale_panel_images=true;var panel_nav_displayed=false;var j_gallery;var j_filmstrip;var j_frames;var j_frame_img_wrappers;var j_panels;var j_pointer;
function showItem(i){$('.nav-next-overlay',j_gallery).unbind('click');$('.nav-prev-overlay',j_gallery).unbind('click');$('.nav-next',j_gallery).unbind('click');$('.nav-prev',j_gallery).unbind('click');j_frames.unbind('click');if(opts.show_filmstrip){j_frames.removeClass('current').find('img').stop().animate({'opacity':opts.frame_opacity},opts.transition_speed);j_frames.eq(i).addClass('current').find('img').stop().animate({'opacity':1.0},opts.transition_speed)}
if(opts.show_panels&&opts.fade_panels){j_panels.fadeOut(opts.transition_speed).eq(i%item_count).fadeIn(opts.transition_speed,function(){if(!opts.show_filmstrip){$('.nav-prev-overlay',j_gallery).click(showPrevItem);$('.nav-next-overlay',j_gallery).click(showNextItem);$('.nav-prev',j_gallery).click(showPrevItem);$('.nav-next',j_gallery).click(showNextItem)}})}
if(opts.show_filmstrip){if(slide_method=='strip'){j_filmstrip.stop();if(filmstrip_orientation=='horizontal'){var distance=getPos(j_frames[i]).left-(getPos(j_pointer[0]).left+(pointer_width/2)-(f_frame_width/2));var diststr=(distance>=0?'-=':'+=')+Math.abs(distance)+'px';j_filmstrip.animate({'left':diststr},opts.transition_speed,opts.easing,function(){var old_i=i;if(i>item_count){i=i%item_count;iterator=i;j_filmstrip.css('left','-'+((f_frame_width+opts.frame_gap)*i)+'px')} else if(i<=(item_count-strip_size)){i=(i%item_count)+item_count;iterator=i;j_filmstrip.css('left','-'+((f_frame_width+opts.frame_gap)*i)+'px')}
if(old_i!=i){j_frames.eq(old_i).removeClass('current').find('img').css({'opacity':opts.frame_opacity});j_frames.eq(i).addClass('current').find('img').css({'opacity':1.0})}
if(!opts.fade_panels){j_panels.hide().eq(i%item_count).show()}
$('.nav-prev-overlay',j_gallery).click(showPrevItem);$('.nav-next-overlay',j_gallery).click(showNextItem);$('.nav-prev',j_gallery).click(showPrevItem);$('.nav-next',j_gallery).click(showNextItem);enableFrameClicking()})} else{var distance=getPos(j_frames[i]).top-(getPos(j_pointer[0]).top+(pointer_height)-(f_frame_height/2));var diststr=(distance>=0?'-=':'+=')+Math.abs(distance)+'px';j_filmstrip.animate({'top':diststr},opts.transition_speed,opts.easing,function(){var old_i=i;if(i>item_count){i=i%item_count;iterator=i;j_filmstrip.css('top','-'+((f_frame_height+opts.frame_gap)*i)+'px')} else if(i<=(item_count-strip_size)){i=(i%item_count)+item_count;iterator=i;j_filmstrip.css('top','-'+((f_frame_height+opts.frame_gap)*i)+'px')}
if(old_i!=i){j_frames.eq(old_i).removeClass('current').find('img').css({'opacity':opts.frame_opacity});j_frames.eq(i).addClass('current').find('img').css({'opacity':1.0})}
if(!opts.fade_panels){j_panels.hide().eq(i%item_count).show()}
$('.nav-prev-overlay',j_gallery).click(showPrevItem);$('.nav-next-overlay',j_gallery).click(showNextItem);$('.nav-prev',j_gallery).click(showPrevItem);$('.nav-next',j_gallery).click(showNextItem);enableFrameClicking()})}} else if(slide_method=='pointer'){j_pointer.stop();var pos=getPos(j_frames[i]);if(filmstrip_orientation=='horizontal'){j_pointer.animate({'left':(pos.left+(f_frame_width/2)-(pointer_width/2)+'px')},opts.transition_speed,opts.easing,function(){if(!opts.fade_panels){j_panels.hide().eq(i%item_count).show()}
$('.nav-prev-overlay',j_gallery).click(showPrevItem);$('.nav-next-overlay',j_gallery).click(showNextItem);$('.nav-prev',j_gallery).click(showPrevItem);$('.nav-next',j_gallery).click(showNextItem);enableFrameClicking()})} else{j_pointer.animate({'top':(pos.top+(f_frame_height/2)-(pointer_height)+'px')},opts.transition_speed,opts.easing,function(){if(!opts.fade_panels){j_panels.hide().eq(i%item_count).show()}
$('.nav-prev-overlay',j_gallery).click(showPrevItem);$('.nav-next-overlay',j_gallery).click(showNextItem);$('.nav-prev',j_gallery).click(showPrevItem);$('.nav-next',j_gallery).click(showNextItem);enableFrameClicking()})}}}};
function extraWidth(el){if(!el) return 0;if(el.length==0) return 0;el=el.eq(0);var ew=0;ew+=getInt(el.css('paddingLeft'));ew+=getInt(el.css('paddingRight'));ew+=getInt(el.css('borderLeftWidth'));ew+=getInt(el.css('borderRightWidth'));return ew}
function extraHeight(el){if(!el) return 0;if(el.length==0) return 0;el=el.eq(0);var eh=0;eh+=getInt(el.css('paddingTop'));eh+=getInt(el.css('paddingBottom'));eh+=getInt(el.css('borderTopWidth'));eh+=getInt(el.css('borderBottomWidth'));return eh}
function showNextItem(){$(document).stopTime("transition");if(++iterator==j_frames.length){iterator=0}
showItem(iterator);if(!paused){$(document).everyTime(opts.transition_interval,"transition",function(){showNextItem()})}};
function showPrevItem(){$(document).stopTime("transition");if(--iterator<0){iterator=item_count-1}
showItem(iterator);if(!paused){$(document).everyTime(opts.transition_interval,"transition",function(){showNextItem()})}};
function getPos(el){var left=0,top=0;var el_id=el.id;if(el.offsetParent){do{left+=el.offsetLeft;top+=el.offsetTop} while(el=el.offsetParent)}
if(el_id==id){return{'left':left,'top':top}}
else{var gPos=getPos(j_gallery[0]);var gLeft=gPos.left;var gTop=gPos.top;return{'left':left-gLeft,'top':top-gTop}}};
function enableFrameClicking(){j_frames.each(function(i){if($('a',this).length==0){$(this).click(function(){if(iterator!=i){$(document).stopTime("transition");showItem(i);iterator=i;if(!paused){$(document).everyTime(opts.transition_interval,"transition",function(){showNextItem()})}}})}})};
function buildPanels(){j_panels.each(function(i){if($('.panel-overlay',this).length>0){$(this).append('<div class="overlay-background"></div>')}});if(!opts.show_filmstrip){$('<img />').addClass('nav-next').attr('src',theme_path+opts.nav_theme+'/next.gif').appendTo(j_gallery).css({'position':'absolute','zIndex':'1100','cursor':'pointer','top':((opts.panel_height-22)/2)+gallery_padding+'px','right':'10px','display':'none'}).click(showNextItem);$('<img />').addClass('nav-prev').attr('src',theme_path+opts.nav_theme+'/prev.gif').appendTo(j_gallery).css({'position':'absolute','zIndex':'1100','cursor':'pointer','top':((opts.panel_height-22)/2)+gallery_padding+'px','left':'10px','display':'none'}).click(showPrevItem);$('<img />').addClass('nav-next-overlay').attr('src',theme_path+opts.nav_theme+'/panel-nav-next.gif').appendTo(j_gallery).css({'position':'absolute','zIndex':'1099','top':((opts.panel_height-22)/2)+gallery_padding-10+'px','right':'0','display':'none','cursor':'pointer','opacity':0.75}).click(showNextItem);$('<img />').addClass('nav-prev-overlay').attr('src',theme_path+opts.nav_theme+'/panel-nav-prev.gif').appendTo(j_gallery).css({'position':'absolute','zIndex':'1099','top':((opts.panel_height-22)/2)+gallery_padding-10+'px','left':'0','display':'none','cursor':'pointer','opacity':0.75}).click(showPrevItem)}
j_panels.each(function(i){$(this).css({'width':(opts.panel_width-extraWidth(j_panels))+'px','height':(opts.panel_height-extraHeight(j_panels))+'px','position':'absolute','overflow':'hidden','display':'none'});switch(opts.filmstrip_position){case 'top':$(this).css({'top':strip_height+Math.max(gallery_padding,filmstrip_margin)+'px','left':gallery_padding+'px'});break;case 'left':$(this).css({'top':gallery_padding+'px','left':strip_width+Math.max(gallery_padding,filmstrip_margin)+'px'});break;default:$(this).css({'top':gallery_padding+'px','left':gallery_padding+'px'});break}});$('.panel-overlay',j_panels).css({'position':'absolute','zIndex':'999','width':(opts.panel_width-extraWidth($('.panel-overlay',j_panels)))+'px','left':'0'});$('.overlay-background',j_panels).css({'position':'absolute','zIndex':'998','width':opts.panel_width+'px','left':'0','opacity':opts.overlay_opacity});if(opts.overlay_position=='top'){$('.panel-overlay',j_panels).css('top',0);$('.overlay-background',j_panels).css('top',0)} else{$('.panel-overlay',j_panels).css('bottom',0);$('.overlay-background',j_panels).css('bottom',0)}
$('.panel iframe',j_panels).css({'width':opts.panel_width+'px','height':opts.panel_height+'px','border':'0'});if(scale_panel_images){$('img',j_panels).each(function(i){$(this).css({'height':panel_img_scale[i%item_count]*img_h[i%item_count],'width':panel_img_scale[i%item_count]*img_w[i%item_count],'position':'relative','top':(opts.panel_height-(panel_img_scale[i%item_count]*img_h[i%item_count]))/2+'px','left':(opts.panel_width-(panel_img_scale[i%item_count]*img_w[i%item_count]))/2+'px'})})}};
function buildFilmstrip(){j_filmstrip.wrap('<div class="strip_wrapper"></div>');if(slide_method=='strip'){j_frames.clone().appendTo(j_filmstrip);j_frames.clone().appendTo(j_filmstrip);j_frames=$('li',j_filmstrip)}
if(opts.show_captions){j_frames.append('<div class="caption"></div>').each(function(i){$(this).find('.caption').html($(this).find('img').attr('title'))})}
j_filmstrip.css({'listStyle':'none','margin':'0','padding':'0','width':strip_width+'px','position':'absolute','zIndex':'900','top':(filmstrip_orientation=='vertical'&&slide_method=='strip'?-((f_frame_height+opts.frame_gap)*iterator):0)+'px','left':(filmstrip_orientation=='horizontal'&&slide_method=='strip'?-((f_frame_width+opts.frame_gap)*iterator):0)+'px','height':strip_height+'px'});j_frames.css({'float':'left','position':'relative','height':f_frame_height+(opts.show_captions?frame_caption_size:0)+'px','width':f_frame_width+'px','zIndex':'901','padding':'0','cursor':'pointer'});switch(opts.filmstrip_position){case 'top':j_frames.css({'marginBottom':filmstrip_margin+'px','marginRight':opts.frame_gap+'px'});break;case 'bottom':j_frames.css({'marginTop':filmstrip_margin+'px','marginRight':opts.frame_gap+'px'});break;case 'left':j_frames.css({'marginRight':filmstrip_margin+'px','marginBottom':opts.frame_gap+'px'});break;case 'right':j_frames.css({'marginLeft':filmstrip_margin+'px','marginBottom':opts.frame_gap+'px'});break}
$('.img_wrap',j_frames).each(function(i){$(this).css({'height':Math.min(opts.frame_height,img_h[i%item_count]*frame_img_scale[i%item_count])+'px','width':Math.min(opts.frame_width,img_w[i%item_count]*frame_img_scale[i%item_count])+'px','position':'relative','top':(opts.show_captions&&opts.filmstrip_position=='top'?frame_caption_size:0)+Math.max(0,(opts.frame_height-(frame_img_scale[i%item_count]*img_h[i%item_count]))/2)+'px','left':Math.max(0,(opts.frame_width-(frame_img_scale[i%item_count]*img_w[i%item_count]))/2)+'px','overflow':'hidden'})});$('img',j_frames).each(function(i){$(this).css({'opacity':opts.frame_opacity,'height':img_h[i%item_count]*frame_img_scale[i%item_count]+'px','width':img_w[i%item_count]*frame_img_scale[i%item_count]+'px','position':'relative','top':Math.min(0,(opts.frame_height-(frame_img_scale[i%item_count]*img_h[i%item_count]))/2)+'px','left':Math.min(0,(opts.frame_width-(frame_img_scale[i%item_count]*img_w[i%item_count]))/2)+'px'}).mouseover(function(){$(this).stop().animate({'opacity':1.0},300)}).mouseout(function(){if(!$(this).parent().parent().hasClass('current')) $(this).stop().animate({'opacity':opts.frame_opacity},300)})});$('.strip_wrapper',j_gallery).css({'position':'absolute','overflow':'hidden'});if(filmstrip_orientation=='horizontal'){$('.strip_wrapper',j_gallery).css({'top':(opts.filmstrip_position=='top'?Math.max(gallery_padding,filmstrip_margin)+'px':opts.panel_height+gallery_padding+'px'),'left':((gallery_width-wrapper_width)/2)+gallery_padding+'px','width':wrapper_width+'px','height':strip_height+'px'})} else{$('.strip_wrapper',j_gallery).css({'left':(opts.filmstrip_position=='left'?Math.max(gallery_padding,filmstrip_margin)+'px':opts.panel_width+gallery_padding+'px'),'top':Math.max(gallery_padding,opts.frame_gap)+'px','width':strip_width+'px','height':wrapper_height+'px'})}
$('.caption',j_gallery).css({'position':'absolute','top':(opts.filmstrip_position=='bottom'?f_frame_height:0)+'px','left':'0','margin':'0','width':f_frame_width+'px','padding':'0','height':frame_caption_size+'px','overflow':'hidden','lineHeight':frame_caption_size+'px'});var pointer=$('<div></div>');pointer.addClass('pointer').appendTo(j_gallery).css({'position':'absolute','zIndex':'1000','width':'0px','fontSize':'0px','lineHeight':'0%','borderTopWidth':pointer_height+'px','borderRightWidth':(pointer_width/2)+'px','borderBottomWidth':pointer_height+'px','borderLeftWidth':(pointer_width/2)+'px','borderStyle':'solid'});var transColor=$.browser.msie&&$.browser.version.substr(0,1)=='6'?'pink':'transparent'
if(!opts.show_panels){pointer.css('borderColor',transColor)}
switch(opts.filmstrip_position){case 'top':pointer.css({'bottom':(opts.panel_height-(pointer_height*2)+gallery_padding+filmstrip_margin)+'px','left':((gallery_width-wrapper_width)/2)+(slide_method=='strip'?0:((f_frame_width+opts.frame_gap)*iterator))+((f_frame_width/2)-(pointer_width/2))+gallery_padding+'px','borderBottomColor':transColor,'borderRightColor':transColor,'borderLeftColor':transColor});break;case 'bottom':pointer.css({'top':(opts.panel_height-(pointer_height*2)+gallery_padding+filmstrip_margin)+'px','left':((gallery_width-wrapper_width)/2)+(slide_method=='strip'?0:((f_frame_width+opts.frame_gap)*iterator))+((f_frame_width/2)-(pointer_width/2))+gallery_padding+'px','borderTopColor':transColor,'borderRightColor':transColor,'borderLeftColor':transColor});break;case 'left':pointer.css({'right':(opts.panel_width-pointer_width+gallery_padding+filmstrip_margin)+'px','top':(f_frame_height/2)-(pointer_height)+(slide_method=='strip'?0:((f_frame_height+opts.frame_gap)*iterator))+gallery_padding+'px','borderBottomColor':transColor,'borderRightColor':transColor,'borderTopColor':transColor});break;case 'right':pointer.css({'left':(opts.panel_width-pointer_width+gallery_padding+filmstrip_margin)+'px','top':(f_frame_height/2)-(pointer_height)+(slide_method=='strip'?0:((f_frame_height+opts.frame_gap)*iterator))+gallery_padding+'px','borderBottomColor':transColor,'borderLeftColor':transColor,'borderTopColor':transColor});break}
j_pointer=$('.pointer',j_gallery);var navNext=$('<img />');navNext.addClass('nav-next').attr('src',theme_path+opts.nav_theme+'/next.gif').appendTo(j_gallery).css({'position':'absolute','cursor':'pointer'}).click(showNextItem);var navPrev=$('<img />');navPrev.addClass('nav-prev').attr('src',theme_path+opts.nav_theme+'/prev.gif').appendTo(j_gallery).css({'position':'absolute','cursor':'pointer'}).click(showPrevItem);if(filmstrip_orientation=='horizontal'){navNext.css({'top':(opts.filmstrip_position=='top'?Math.max(gallery_padding,filmstrip_margin):opts.panel_height+filmstrip_margin+gallery_padding)+((f_frame_height-22)/2)+'px','right':((gallery_width+(gallery_padding*2))/2)-(wrapper_width/2)-opts.frame_gap-22+'px'});navPrev.css({'top':(opts.filmstrip_position=='top'?Math.max(gallery_padding,filmstrip_margin):opts.panel_height+filmstrip_margin+gallery_padding)+((f_frame_height-22)/2)+'px','left':((gallery_width+(gallery_padding*2))/2)-(wrapper_width/2)-opts.frame_gap-22+'px'})} else{navNext.css({'left':(opts.filmstrip_position=='left'?Math.max(gallery_padding,filmstrip_margin):opts.panel_width+filmstrip_margin+gallery_padding)+((f_frame_width-22)/2)+13+'px','top':wrapper_height+(Math.max(gallery_padding,opts.frame_gap)*2)+'px'});navPrev.css({'left':(opts.filmstrip_position=='left'?Math.max(gallery_padding,filmstrip_margin):opts.panel_width+filmstrip_margin+gallery_padding)+((f_frame_width-22)/2)-13+'px','top':wrapper_height+(Math.max(gallery_padding,opts.frame_gap)*2)+'px'})}};
function mouseIsOverGallery(x,y){var pos=getPos(j_gallery[0]);var top=pos.top;var left=pos.left;return x>left&&x<left+gallery_width+(filmstrip_orientation=='horizontal'?(gallery_padding*2):gallery_padding+Math.max(gallery_padding,filmstrip_margin))&&y>top&&y<top+gallery_height+(filmstrip_orientation=='vertical'?(gallery_padding*2):gallery_padding+Math.max(gallery_padding,filmstrip_margin))};
function getInt(i){i=parseInt(i,10);if(isNaN(i)){i=0}
return i}
function buildGallery(){var gallery_images=opts.show_filmstrip?$('img',j_frames):$('img',j_panels);gallery_images.each(function(i){img_h[i]=this.height;img_w[i]=this.width;if(opts.frame_scale=='nocrop'){frame_img_scale[i]=Math.min(opts.frame_height/img_h[i],opts.frame_width/img_w[i])} else{frame_img_scale[i]=Math.max(opts.frame_height/img_h[i],opts.frame_width/img_w[i])}
if(opts.panel_scale=='nocrop'){panel_img_scale[i]=Math.min(opts.panel_height/img_h[i],opts.panel_width/img_w[i])} else{panel_img_scale[i]=Math.max(opts.panel_height/img_h[i],opts.panel_width/img_w[i])}});j_gallery.css({'position':'relative','width':gallery_width+(filmstrip_orientation=='horizontal'?(gallery_padding*2):gallery_padding+Math.max(gallery_padding,filmstrip_margin))+'px','height':gallery_height+(filmstrip_orientation=='vertical'?(gallery_padding*2):gallery_padding+Math.max(gallery_padding,filmstrip_margin))+'px'});if(opts.show_filmstrip){buildFilmstrip();enableFrameClicking()}
if(opts.show_panels){buildPanels()}
if(opts.pause_on_hover||(opts.show_panels&&!opts.show_filmstrip)){$().mousemove(function(e){if(mouseIsOverGallery(e.pageX,e.pageY)){if(opts.pause_on_hover){if(!paused){$(document).oneTime(500,"animation_pause",function(){$(document).stopTime("transition");paused=true})}}
if(opts.show_panels&&!opts.show_filmstrip&&!panel_nav_displayed){$('.nav-next-overlay').fadeIn('fast');$('.nav-prev-overlay').fadeIn('fast');$('.nav-next',j_gallery).fadeIn('fast');$('.nav-prev',j_gallery).fadeIn('fast');panel_nav_displayed=true}} else{if(opts.pause_on_hover){$(document).stopTime("animation_pause");if(paused){$(document).everyTime(opts.transition_interval,"transition",function(){showNextItem()});paused=false}}
if(opts.show_panels&&!opts.show_filmstrip&&panel_nav_displayed){$('.nav-next-overlay').fadeOut('fast');$('.nav-prev-overlay').fadeOut('fast');$('.nav-next',j_gallery).fadeOut('fast');$('.nav-prev',j_gallery).fadeOut('fast');panel_nav_displayed=false}}})}
j_filmstrip.css('visibility','visible');j_gallery.css('visibility','visible');$('.loader',j_gallery).fadeOut('1000',function(){showItem(iterator);if(item_count>1){$(document).everyTime(opts.transition_interval,"transition",function(){showNextItem()})}})}
return this.each(function(){$(this).css('visibility','hidden');$(this).wrap("<div></div>");j_gallery=$(this).parent();j_gallery.css('visibility','hidden').attr('id',$(this).attr('id')).addClass('gallery');$(this).removeAttr('id').addClass('filmstrip');$(document).stopTime("transition");$(document).stopTime("animation_pause");id=j_gallery.attr('id');scale_panel_images=$('.panel-content',j_gallery).length==0;pointer_height=opts.pointer_size;pointer_width=opts.pointer_size*2;filmstrip_orientation=(opts.filmstrip_position=='top'||opts.filmstrip_position=='bottom'?'horizontal':'vertical');if(filmstrip_orientation=='vertical') opts.show_captions=false;j_filmstrip=$('.filmstrip',j_gallery);j_frames=$('li',j_filmstrip);j_frames.addClass('frame');if(opts.show_panels){for(i=j_frames.length-1;i>=0;i--){if(j_frames.eq(i).find('.panel-content').length>0){j_frames.eq(i).find('.panel-content').remove().prependTo(j_gallery).addClass('panel')} else{p=$('<div>');p.addClass('panel');im=$('<img />');im.attr('src',j_frames.eq(i).find('img').eq(0).attr('src')).appendTo(p);p.prependTo(j_gallery);j_frames.eq(i).find('.panel-overlay').remove().appendTo(p)}}} else{$('.panel-overlay',j_frames).remove();$('.panel-content',j_frames).remove()}
if(!opts.show_filmstrip){j_filmstrip.remove()}
else{j_frames.each(function(i){if($(this).find('a').length>0){$(this).find('a').wrap('<div class="img_wrap"></div>')} else{$(this).find('img').wrap('<div class="img_wrap"></div>')}});j_frame_img_wrappers=$('.img_wrap',j_frames)}
j_panels=$('.panel',j_gallery);if(!opts.show_panels){opts.panel_height=0;opts.panel_width=0}
f_frame_width=opts.frame_width+extraWidth(j_frame_img_wrappers);f_frame_height=opts.frame_height+extraHeight(j_frame_img_wrappers);item_count=opts.show_panels?j_panels.length:j_frames.length;if(filmstrip_orientation=='horizontal'){strip_size=opts.show_panels?Math.floor((opts.panel_width-((opts.frame_gap+22)*2))/(f_frame_width+opts.frame_gap)):Math.min(item_count,opts.filmstrip_size)} else{strip_size=opts.show_panels?Math.floor((opts.panel_height-(opts.frame_gap+22))/(f_frame_height+opts.frame_gap)):Math.min(item_count,opts.filmstrip_size)}
if(strip_size>=item_count){slide_method='pointer';strip_size=item_count}
else{slide_method='strip'}
iterator=(strip_size<item_count?item_count:0)+opts.start_frame-1;filmstrip_margin=(opts.show_panels?getInt(j_filmstrip.css('marginTop')):0);j_filmstrip.css('margin','0px');if(filmstrip_orientation=='horizontal'){gallery_width=opts.show_panels?opts.panel_width:(strip_size*(f_frame_width+opts.frame_gap))+44+opts.frame_gap;gallery_height=(opts.show_panels?opts.panel_height:0)+(opts.show_filmstrip?f_frame_height+filmstrip_margin+(opts.show_captions?frame_caption_size:0):0)} else{gallery_height=opts.show_panels?opts.panel_height:(strip_size*(f_frame_height+opts.frame_gap))+22;gallery_width=(opts.show_panels?opts.panel_width:0)+(opts.show_filmstrip?f_frame_width+filmstrip_margin:0)}
if(filmstrip_orientation=='horizontal'){if(slide_method=='pointer'){strip_width=(f_frame_width*item_count)+(opts.frame_gap*(item_count))}
else{strip_width=(f_frame_width*item_count*3)+(opts.frame_gap*(item_count*3))}} else{strip_width=(f_frame_width+filmstrip_margin)}
if(filmstrip_orientation=='horizontal'){strip_height=(f_frame_height+filmstrip_margin+(opts.show_captions?frame_caption_size:0))} else{if(slide_method=='pointer'){strip_height=(f_frame_height*item_count+opts.frame_gap*(item_count))}
else{strip_height=(f_frame_height*item_count*3)+(opts.frame_gap*(item_count*3))}}
wrapper_width=((strip_size*f_frame_width)+((strip_size-1)*opts.frame_gap));wrapper_height=((strip_size*f_frame_height)+((strip_size-1)*opts.frame_gap));gallery_padding=getInt(j_gallery.css('paddingTop'));j_gallery.css('padding','0px');galleryPos=getPos(j_gallery[0]);$('<div>').addClass('loader').css({'position':'absolute','zIndex':'32666','opacity':1,'top':'0px','left':'0px','width':gallery_width+(filmstrip_orientation=='horizontal'?(gallery_padding*2):gallery_padding+Math.max(gallery_padding,filmstrip_margin))+'px','height':gallery_height+(filmstrip_orientation=='vertical'?(gallery_padding*2):gallery_padding+Math.max(gallery_padding,filmstrip_margin))+'px'}).appendTo(j_gallery);if(!window_loaded){$(window).load(function(){window_loaded=true;buildGallery()})} else{buildGallery()}})};$.fn.galleryView.defaults={show_panels:true,show_filmstrip:true,panel_width:600,panel_height:400,frame_width:60,frame_height:40,start_frame:1,filmstrip_size:3,transition_speed:800,transition_interval:4000,overlay_opacity:0.7,frame_opacity:0.3,pointer_size:8,nav_theme:'dark',easing:'swing',filmstrip_position:'bottom',overlay_position:'bottom',panel_scale:'nocrop',frame_scale:'crop',frame_gap:5,show_captions:false,fade_panels:true,pause_on_hover:false}})(jQuery);

/* - ++resource++jquery.flashembed.js - */
// http://www.eea.europa.eu/portal_javascripts/++resource++jquery.flashembed.js?original=1
function flashembed(root,userParams,flashvars){
function getHTML(){var html="";if(typeof flashvars=='function'){flashvars=flashvars()}
if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){html='<embed type="application/x-shockwave-flash" ';if(params.id){extend(params,{name:params.id})}
for(var key in params){if(params[key]!==null){html+=[key]+'="'+params[key]+'"\n\t'}}
if(flashvars){html+='flashvars=\''+concatVars(flashvars)+'\''}
html+='/>'} else{html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';html+='width="'+params.width+'" height="'+params.height+'"';if(!params.id&&document.all){params.id="_"+(""+Math.random()).substring(5)}
if(params.id){html+=' id="'+params.id+'"'}
html+='>';html+='\n\t<param name="movie" value="'+params.src+'" />';params.id=params.src=params.width=params.height=null;for(var k in params){if(params[k]!==null){html+='\n\t<param name="'+k+'" value="'+params[k]+'" />'}}
if(flashvars){html+='\n\t<param name="flashvars" value=\''+concatVars(flashvars)+'\' />'}
html+="</object>";if(debug){alert(html)}}
return html}
function init(name){var timer=setInterval(function(){var doc=document;var el=doc.getElementById(name);if(el){flashembed(el,userParams,flashvars);clearInterval(timer)} else if(doc&&doc.getElementsByTagName&&doc.getElementById&&doc.body){clearInterval(timer)}},13);return true}
function extend(to,from){if(from){for(key in from){if(from.hasOwnProperty(key)){to[key]=from[key]}}}}
var params={src:'#',width:'100%',height:'100%',version:null,onFail:null,expressInstall:null,debug:false,bgcolor:'#ffffff',allowfullscreen:true,allowscriptaccess:'always',quality:'high',type:'application/x-shockwave-flash',pluginspage:'http://www.adobe.com/go/getflashplayer'};if(typeof userParams=='string'){userParams={src:userParams}}
extend(params,userParams);var version=flashembed.getVersion();var required=params.version;var express=params.expressInstall;var debug=params.debug;if(typeof root=='string'){var el=document.getElementById(root);if(el){root=el} else{return init(root)}}
if(!root){return}
if(!required||flashembed.isSupported(required)){params.onFail=params.version=params.expressInstall=params.debug=null;root.innerHTML=getHTML();return root.firstChild} else if(params.onFail){var ret=params.onFail.call(params,flashembed.getVersion(),flashvars);if(ret){root.innerHTML=ret}} else if(required&&express&&flashembed.isSupported([6,65])){extend(params,{src:express});flashvars={MMredirectURL:location.href,MMplayerType:'PlugIn',MMdoctitle:document.title};root.innerHTML=getHTML()} else{if(root.innerHTML.replace(/\s/g,'')!==''){} else{root.innerHTML="<h2>Flash version "+required+" or greater is required</h2>"+"<h3>"+(version[0]>0?"Your version is "+version:"You have no flash plugin installed")+"</h3>"+"<p>Download latest version from <a href='"+params.pluginspage+"'>here</a></p>"}}
function concatVars(vars){var out="";for(var key in vars){if(vars[key]){out+=[key]+'='+asString(vars[key])+'&'}}
return out.substring(0,out.length-1)}
function asString(obj){switch(typeOf(obj)){case 'string':return '"'+obj.replace(new RegExp('(["\\\\])','g'),'\\$1')+'"';case 'array':return '['+map(obj, function(el){return asString(el)}).join(',')+']';case 'function':return '"function()"';case 'object':var str=[];for(var prop in obj){if(obj.hasOwnProperty(prop)){str.push('"'+prop+'":'+asString(obj[prop]))}}
return '{'+str.join(',')+'}'}
return String(obj).replace(/\s/g, " ").replace(/\'/g,"\"")}
function typeOf(obj){if(obj===null||obj===undefined){return false}
var type=typeof obj;return(type=='object'&&obj.push)?'array':type}
if(window.attachEvent){window.attachEvent("onbeforeunload", function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}
function map(arr,func){var newArr=[];for(var i in arr){if(arr.hasOwnProperty(i)){newArr[i]=func(arr[i])}}
return newArr}
return root}
if(typeof jQuery=='function'){(function($){$.fn.extend({flashembed: function(params,flashvars){return this.each(function(){flashembed(this,params,flashvars)})}})})(jQuery)}
flashembed=flashembed||{};flashembed.getVersion=function(){var version=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var _d=navigator.plugins["Shockwave Flash"].description;if(typeof _d!="undefined"){_d=_d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var _m=parseInt(_d.replace(/^(.*)\..*$/,"$1"),10);var _r=/r/.test(_d)?parseInt(_d.replace(/^.*r(.*)$/,"$1"),10):0;version=[_m,_r]}} else if(window.ActiveXObject){try{var _a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")} catch(e){try{_a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");version=[6,0];_a.AllowScriptAccess="always"} catch(ee){if(version[0]==6){return}}
try{_a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")} catch(eee){}}
if(typeof _a=="object"){_d=_a.GetVariable("$version");if(typeof _d!="undefined"){_d=_d.replace(/^\S+\s+(.*)$/,"$1").split(",");version=[parseInt(_d[0],10),parseInt(_d[2],10)]}}}
return version};flashembed.isSupported=function(version){var now=flashembed.getVersion();var ret=(now[0]>version[0])||(now[0]==version[0]&&now[1]>=version[1]);return ret};

/* - ++resource++jquery.fancybox.js - */
// http://www.eea.europa.eu/portal_javascripts/++resource++jquery.fancybox.js?original=1
;(function($){var tmp,loading,overlay,wrap,outer,content,close,title,nav_left,nav_right,selectedIndex=0,selectedOpts={},selectedArray=[],currentIndex=0,currentOpts={},currentArray=[],ajaxLoader=null,imgPreloader=new Image(),imgRegExp=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,swfRegExp=/[^\.]\.(swf)\s*$/i,loadingTimer,loadingFrame=1,titleHeight=0,titleStr='',start_pos,final_pos,busy=false,fx=$.extend($('<div/>')[0],{prop:0}),isIE6=$.browser.msie&&$.browser.version<7&&!window.XMLHttpRequest,_abort=function(){loading.hide();imgPreloader.onerror=imgPreloader.onload=null;if(ajaxLoader){ajaxLoader.abort()}
tmp.empty()},_error=function(){if(false===selectedOpts.onError(selectedArray,selectedIndex,selectedOpts)){loading.hide();busy=false;return}
selectedOpts.titleShow=false;selectedOpts.width='auto';selectedOpts.height='auto';tmp.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');_process_inline()},_start=function(){var obj=selectedArray[selectedIndex],href,type,title,str,emb,ret;_abort();selectedOpts=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data('fancybox')=='undefined'?selectedOpts:$(obj).data('fancybox')));ret=selectedOpts.onStart(selectedArray,selectedIndex,selectedOpts);if(ret===false){busy=false;return} else if(typeof ret=='object'){selectedOpts=$.extend(selectedOpts,ret)}
title=selectedOpts.title||(obj.nodeName?$(obj).attr('title'):obj.title)||'';if(obj.nodeName&&!selectedOpts.orig){selectedOpts.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj)}
if(title===''&&selectedOpts.orig&&selectedOpts.titleFromAlt){title=selectedOpts.orig.attr('alt')}
href=selectedOpts.href||(obj.nodeName?$(obj).attr('href'):obj.href)||null;if((/^(?:javascript)/i).test(href)||href=='#'){href=null}
if(selectedOpts.type){type=selectedOpts.type;if(!href){href=selectedOpts.content}} else if(selectedOpts.content){type='html'} else if(href){if(href.match(imgRegExp)){type='image'} else if(href.match(swfRegExp)){type='swf'} else if($(obj).hasClass("iframe")){type='iframe'} else if(href.indexOf("#")===0){type='inline'} else{type='ajax'}}
if(!type){_error();return}
if(type=='inline'){obj=href.substr(href.indexOf("#"));type=$(obj).length>0?'inline':'ajax'}
selectedOpts.type=type;selectedOpts.href=href;selectedOpts.title=title;if(selectedOpts.autoDimensions){if(selectedOpts.type=='html'||selectedOpts.type=='inline'||selectedOpts.type=='ajax'){selectedOpts.width='auto';selectedOpts.height='auto'} else{selectedOpts.autoDimensions=false}}
if(selectedOpts.modal){selectedOpts.overlayShow=true;selectedOpts.hideOnOverlayClick=false;selectedOpts.hideOnContentClick=false;selectedOpts.enableEscapeButton=false;selectedOpts.showCloseButton=false}
selectedOpts.padding=parseInt(selectedOpts.padding,10);selectedOpts.margin=parseInt(selectedOpts.margin,10);tmp.css('padding',(selectedOpts.padding+selectedOpts.margin));$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function(){$(this).replaceWith(content.children())});switch(type){case 'html':tmp.html(selectedOpts.content);_process_inline();break;case 'inline':if($(obj).parent().is('#fancybox-content')===true){busy=false;return}
$('<div class="fancybox-inline-tmp" />').hide().insertBefore($(obj)).bind('fancybox-cleanup', function(){$(this).replaceWith(content.children())}).bind('fancybox-cancel', function(){$(this).replaceWith(tmp.children())});$(obj).appendTo(tmp);_process_inline();break;case 'image':busy=false;$.fancybox.showActivity();imgPreloader=new Image();imgPreloader.onerror=function(){_error()};imgPreloader.onload=function(){busy=true;imgPreloader.onerror=imgPreloader.onload=null;_process_image()};imgPreloader.src=href;break;case 'swf':selectedOpts.scrolling='no';str='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+selectedOpts.width+'" height="'+selectedOpts.height+'"><param name="movie" value="'+href+'"></param>';emb='';$.each(selectedOpts.swf, function(name,val){str+='<param name="'+name+'" value="'+val+'"></param>';emb+=' '+name+'="'+val+'"'});str+='<embed src="'+href+'" type="application/x-shockwave-flash" width="'+selectedOpts.width+'" height="'+selectedOpts.height+'"'+emb+'></embed></object>';tmp.html(str);_process_inline();break;case 'ajax':busy=false;$.fancybox.showActivity();selectedOpts.ajax.win=selectedOpts.ajax.success;ajaxLoader=$.ajax($.extend({},selectedOpts.ajax,{url:href,data:selectedOpts.ajax.data||{},error: function(XMLHttpRequest,textStatus,errorThrown){if(XMLHttpRequest.status>0){_error()}},success: function(data,textStatus,XMLHttpRequest){var o=typeof XMLHttpRequest=='object'?XMLHttpRequest:ajaxLoader;if(o.status==200){if(typeof selectedOpts.ajax.win=='function'){ret=selectedOpts.ajax.win(href,data,textStatus,XMLHttpRequest);if(ret===false){loading.hide();return} else if(typeof ret=='string'||typeof ret=='object'){data=ret}}
tmp.html(data);_process_inline()}}}));break;case 'iframe':_show();break}},_process_inline=function(){var
w=selectedOpts.width,h=selectedOpts.height;if(w.toString().indexOf('%')>-1){w=parseInt(($(window).width()-(selectedOpts.margin * 2)) * parseFloat(w)/100,10)+'px'} else{w=w=='auto'?'auto':w+'px'}
if(h.toString().indexOf('%')>-1){h=parseInt(($(window).height()-(selectedOpts.margin * 2)) * parseFloat(h)/100,10)+'px'} else{h=h=='auto'?'auto':h+'px'}
tmp.wrapInner('<div style="width:'+w+';height:'+h+';overflow: '+(selectedOpts.scrolling=='auto'?'auto':(selectedOpts.scrolling=='yes'?'scroll':'hidden'))+';position:relative;"></div>');selectedOpts.width=tmp.width();selectedOpts.height=tmp.height();_show()},_process_image=function(){selectedOpts.width=imgPreloader.width;selectedOpts.height=imgPreloader.height;$("<img />").attr({'id':'fancybox-img','src':imgPreloader.src,'alt':selectedOpts.title}).appendTo(tmp);_show()},_show=function(){var pos,equal;loading.hide();if(wrap.is(":visible")&&false===currentOpts.onCleanup(currentArray,currentIndex,currentOpts)){$.event.trigger('fancybox-cancel');busy=false;return}
busy=true;$(content.add(overlay)).unbind();$(window).unbind("resize.fb scroll.fb");$(document).unbind('keydown.fb');if(wrap.is(":visible")&&currentOpts.titlePosition!=='outside'){wrap.css('height',wrap.height())}
currentArray=selectedArray;currentIndex=selectedIndex;currentOpts=selectedOpts;if(currentOpts.overlayShow){overlay.css({'background-color':currentOpts.overlayColor,'opacity':currentOpts.overlayOpacity,'cursor':currentOpts.hideOnOverlayClick?'pointer':'auto','height':$(document).height()});if(!overlay.is(':visible')){if(isIE6){$('select:not(#fancybox-tmp select)').filter(function(){return this.style.visibility!=='hidden'}).css({'visibility':'hidden'}).one('fancybox-cleanup', function(){this.style.visibility='inherit'})}
overlay.show()}} else{overlay.hide()}
final_pos=_get_zoom_to();_process_title();if(wrap.is(":visible")){$(close.add(nav_left).add(nav_right)).hide();pos=wrap.position(),start_pos={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};equal=(start_pos.width==final_pos.width&&start_pos.height==final_pos.height);content.fadeTo(currentOpts.changeFade,0.3, function(){var finish_resizing=function(){content.html(tmp.contents()).fadeTo(currentOpts.changeFade,1,_finish)};$.event.trigger('fancybox-change');content.empty().removeAttr('filter').css({'border-width':currentOpts.padding,'width':final_pos.width-currentOpts.padding * 2,'height':selectedOpts.autoDimensions?'auto':final_pos.height-titleHeight-currentOpts.padding * 2});if(equal){finish_resizing()} else{fx.prop=0;$(fx).animate({prop:1},{duration:currentOpts.changeSpeed,easing:currentOpts.easingChange,step:_draw,complete:finish_resizing})}});return}
wrap.removeAttr("style");content.css('border-width',currentOpts.padding);if(currentOpts.transitionIn=='elastic'){start_pos=_get_zoom_from();content.html(tmp.contents());wrap.show();if(currentOpts.opacity){final_pos.opacity=0}
fx.prop=0;$(fx).animate({prop:1},{duration:currentOpts.speedIn,easing:currentOpts.easingIn,step:_draw,complete:_finish});return}
if(currentOpts.titlePosition=='inside'&&titleHeight>0){title.show()}
content.css({'width':final_pos.width-currentOpts.padding * 2,'height':selectedOpts.autoDimensions?'auto':final_pos.height-titleHeight-currentOpts.padding * 2}).html(tmp.contents());wrap.css(final_pos).fadeIn(currentOpts.transitionIn=='none'?0:currentOpts.speedIn,_finish)},_format_title=function(title){if(title&&title.length){if(currentOpts.titlePosition=='float'){return '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+title+'</td><td id="fancybox-title-float-right"></td></tr></table>'}
return '<div id="fancybox-title-'+currentOpts.titlePosition+'">'+title+'</div>'}
return false},_process_title=function(){titleStr=currentOpts.title||'';titleHeight=0;title.empty().removeAttr('style').removeClass();if(currentOpts.titleShow===false){title.hide();return}
titleStr=$.isFunction(currentOpts.titleFormat)?currentOpts.titleFormat(titleStr,currentArray,currentIndex,currentOpts):_format_title(titleStr);if(!titleStr||titleStr===''){title.hide();return}
title.addClass('fancybox-title-'+currentOpts.titlePosition).html(titleStr).appendTo('body').show();switch(currentOpts.titlePosition){case 'inside':title.css({'width':final_pos.width-(currentOpts.padding * 2),'marginLeft':currentOpts.padding,'marginRight':currentOpts.padding});titleHeight=title.outerHeight(true);title.appendTo(outer);final_pos.height+=titleHeight;break;case 'over':title.css({'marginLeft':currentOpts.padding,'width':final_pos.width-(currentOpts.padding * 2),'bottom':currentOpts.padding}).appendTo(outer);break;case 'float':title.css('left',parseInt((title.width()-final_pos.width-40)/2,10) *-1).appendTo(wrap);break;default:title.css({'width':final_pos.width-(currentOpts.padding * 2),'paddingLeft':currentOpts.padding,'paddingRight':currentOpts.padding}).appendTo(wrap);break}
title.hide()},_set_navigation=function(){if(currentOpts.enableEscapeButton||currentOpts.enableKeyboardNav){$(document).bind('keydown.fb', function(e){if(e.keyCode==27&&currentOpts.enableEscapeButton){e.preventDefault();$.fancybox.close()} else if((e.keyCode==37||e.keyCode==39)&&currentOpts.enableKeyboardNav&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='SELECT'){e.preventDefault();$.fancybox[e.keyCode==37?'prev':'next']()}})}
if(!currentOpts.showNavArrows){nav_left.hide();nav_right.hide();return}
if((currentOpts.cyclic&&currentArray.length>1)||currentIndex!==0){nav_left.show()}
if((currentOpts.cyclic&&currentArray.length>1)||currentIndex!=(currentArray.length-1)){nav_right.show()}},_finish=function(){if(!$.support.opacity){content.get(0).style.removeAttribute('filter');wrap.get(0).style.removeAttribute('filter')}
if(selectedOpts.autoDimensions){content.css('height','auto')}
wrap.css('height','auto');if(titleStr&&titleStr.length){title.show()}
if(currentOpts.showCloseButton){close.show()}
_set_navigation();if(currentOpts.hideOnContentClick){content.bind('click',$.fancybox.close)}
if(currentOpts.hideOnOverlayClick){overlay.bind('click',$.fancybox.close)}
$(window).bind("resize.fb",$.fancybox.resize);if(currentOpts.centerOnScroll){$(window).bind("scroll.fb",$.fancybox.center)}
if(currentOpts.type=='iframe'){$('<iframe id="fancybox-frame" name="fancybox-frame'+new Date().getTime()+'" frameborder="0" hspace="0" '+($.browser.msie?'allowtransparency="true""':'')+' scrolling="'+selectedOpts.scrolling+'" src="'+currentOpts.href+'"></iframe>').appendTo(content)}
wrap.show();busy=false;$.fancybox.center();currentOpts.onComplete(currentArray,currentIndex,currentOpts);_preload_images()},_preload_images=function(){var href,objNext;if((currentArray.length-1)>currentIndex){href=currentArray[currentIndex+1].href;if(typeof href!=='undefined'&&href.match(imgRegExp)){objNext=new Image();objNext.src=href}}
if(currentIndex>0){href=currentArray[currentIndex-1].href;if(typeof href!=='undefined'&&href.match(imgRegExp)){objNext=new Image();objNext.src=href}}},_draw=function(pos){var dim={width:parseInt(start_pos.width+(final_pos.width-start_pos.width) * pos,10),height:parseInt(start_pos.height+(final_pos.height-start_pos.height) * pos,10),top:parseInt(start_pos.top+(final_pos.top-start_pos.top) * pos,10),left:parseInt(start_pos.left+(final_pos.left-start_pos.left) * pos,10)};if(typeof final_pos.opacity!=='undefined'){dim.opacity=pos<0.5?0.5:pos}
wrap.css(dim);content.css({'width':dim.width-currentOpts.padding * 2,'height':dim.height-(titleHeight * pos)-currentOpts.padding * 2})},_get_viewport=function(){return [$(window).width()-(currentOpts.margin * 2),$(window).height()-(currentOpts.margin * 2),$(document).scrollLeft()+currentOpts.margin,$(document).scrollTop()+currentOpts.margin]},_get_zoom_to=function(){var view=_get_viewport(),to={},resize=currentOpts.autoScale,double_padding=currentOpts.padding * 2,ratio;if(currentOpts.width.toString().indexOf('%')>-1){to.width=parseInt((view[0] * parseFloat(currentOpts.width))/100,10)} else{to.width=currentOpts.width+double_padding}
if(currentOpts.height.toString().indexOf('%')>-1){to.height=parseInt((view[1] * parseFloat(currentOpts.height))/100,10)} else{to.height=currentOpts.height+double_padding}
if(resize&&(to.width>view[0]||to.height>view[1])){if(selectedOpts.type=='image'||selectedOpts.type=='swf'){ratio=(currentOpts.width)/(currentOpts.height);if((to.width)>view[0]){to.width=view[0];to.height=parseInt(((to.width-double_padding)/ratio)+double_padding,10)}
if((to.height)>view[1]){to.height=view[1];to.width=parseInt(((to.height-double_padding) * ratio)+double_padding,10)}} else{to.width=Math.min(to.width,view[0]);to.height=Math.min(to.height,view[1])}}
to.top=parseInt(Math.max(view[3]-20,view[3]+((view[1]-to.height-40) * 0.5)),10);to.left=parseInt(Math.max(view[2]-20,view[2]+((view[0]-to.width-40) * 0.5)),10);return to},_get_obj_pos=function(obj){var pos=obj.offset();pos.top+=parseInt(obj.css('paddingTop'),10)||0;pos.left+=parseInt(obj.css('paddingLeft'),10)||0;pos.top+=parseInt(obj.css('border-top-width'),10)||0;pos.left+=parseInt(obj.css('border-left-width'),10)||0;pos.width=obj.width();pos.height=obj.height();return pos},_get_zoom_from=function(){var orig=selectedOpts.orig?$(selectedOpts.orig):false,from={},pos,view;if(orig&&orig.length){pos=_get_obj_pos(orig);from={width:pos.width+(currentOpts.padding * 2),height:pos.height+(currentOpts.padding * 2),top:pos.top-currentOpts.padding-20,left:pos.left-currentOpts.padding-20}} else{view=_get_viewport();from={width:currentOpts.padding * 2,height:currentOpts.padding * 2,top:parseInt(view[3]+view[1] * 0.5,10),left:parseInt(view[2]+view[0] * 0.5,10)}}
return from},_animate_loading=function(){if(!loading.is(':visible')){clearInterval(loadingTimer);return}
$('div',loading).css('top',(loadingFrame *-40)+'px');loadingFrame=(loadingFrame+1)%12};$.fn.fancybox=function(options){if(!$(this).length){return this}
$(this).data('fancybox',$.extend({},options,($.metadata?$(this).metadata():{}))).unbind('click.fb').bind('click.fb', function(e){e.preventDefault();if(busy){return}
busy=true;$(this).blur();selectedArray=[];selectedIndex=0;var rel=$(this).attr('rel')||'';if(!rel||rel==''||rel==='nofollow'){selectedArray.push(this)} else{selectedArray=$("a[rel="+rel+"], area[rel="+rel+"]");selectedIndex=selectedArray.index(this)}
_start();return});return this};$.fancybox=function(obj){var opts;if(busy){return}
busy=true;opts=typeof arguments[1]!=='undefined'?arguments[1]:{};selectedArray=[];selectedIndex=parseInt(opts.index,10)||0;if($.isArray(obj)){for(var i=0,j=obj.length;i<j;i++){if(typeof obj[i]=='object'){$(obj[i]).data('fancybox',$.extend({},opts,obj[i]))} else{obj[i]=$({}).data('fancybox',$.extend({content:obj[i]},opts))}}
selectedArray=jQuery.merge(selectedArray,obj)} else{if(typeof obj=='object'){$(obj).data('fancybox',$.extend({},opts,obj))} else{obj=$({}).data('fancybox',$.extend({content:obj},opts))}
selectedArray.push(obj)}
if(selectedIndex>selectedArray.length||selectedIndex<0){selectedIndex=0}
_start()};$.fancybox.showActivity=function(){clearInterval(loadingTimer);loading.show();loadingTimer=setInterval(_animate_loading,66)};$.fancybox.hideActivity=function(){loading.hide()};$.fancybox.next=function(){return $.fancybox.pos(currentIndex+1)};$.fancybox.prev=function(){return $.fancybox.pos(currentIndex-1)};$.fancybox.pos=function(pos){if(busy){return}
pos=parseInt(pos);selectedArray=currentArray;if(pos>-1&&pos<currentArray.length){selectedIndex=pos;_start()} else if(currentOpts.cyclic&&currentArray.length>1){selectedIndex=pos>=currentArray.length?0:currentArray.length-1;_start()}
return};$.fancybox.cancel=function(){if(busy){return}
busy=true;$.event.trigger('fancybox-cancel');_abort();selectedOpts.onCancel(selectedArray,selectedIndex,selectedOpts);busy=false};$.fancybox.close=function(){if(busy||wrap.is(':hidden')){return}
busy=true;if(currentOpts&&false===currentOpts.onCleanup(currentArray,currentIndex,currentOpts)){busy=false;return}
_abort();$(close.add(nav_left).add(nav_right)).hide();$(content.add(overlay)).unbind();$(window).unbind("resize.fb scroll.fb");$(document).unbind('keydown.fb');content.find('iframe').attr('src',isIE6&&/^https/i.test(window.location.href||'')?'javascript:void(false)':'about:blank');if(currentOpts.titlePosition!=='inside'){title.empty()}
wrap.stop();
function _cleanup(){overlay.fadeOut('fast');title.empty().hide();wrap.hide();$.event.trigger('fancybox-cleanup');content.empty();currentOpts.onClosed(currentArray,currentIndex,currentOpts);currentArray=selectedOpts=[];currentIndex=selectedIndex=0;currentOpts=selectedOpts={};busy=false}
if(currentOpts.transitionOut=='elastic'){start_pos=_get_zoom_from();var pos=wrap.position();final_pos={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};if(currentOpts.opacity){final_pos.opacity=1}
title.empty().hide();fx.prop=1;$(fx).animate({prop:0},{duration:currentOpts.speedOut,easing:currentOpts.easingOut,step:_draw,complete:_cleanup})} else{wrap.fadeOut(currentOpts.transitionOut=='none'?0:currentOpts.speedOut,_cleanup)}};$.fancybox.resize=function(){if(overlay.is(':visible')){overlay.css('height',$(document).height())}
$.fancybox.center(true)};$.fancybox.center=function(){var view,align;if(busy){return}
align=arguments[0]===true?1:0;view=_get_viewport();if(!align&&(wrap.width()>view[0]||wrap.height()>view[1])){return}
wrap.stop().animate({'top':parseInt(Math.max(view[3]-20,view[3]+((view[1]-content.height()-40) * 0.5)-currentOpts.padding)),'left':parseInt(Math.max(view[2]-20,view[2]+((view[0]-content.width()-40) * 0.5)-currentOpts.padding))},typeof arguments[0]=='number'?arguments[0]:200)};$.fancybox.init=function(){if($("#fancybox-wrap").length){return}
$('body').append(tmp=$('<div id="fancybox-tmp"></div>'),loading=$('<div id="fancybox-loading"><div></div></div>'),overlay=$('<div id="fancybox-overlay"></div>'),wrap=$('<div id="fancybox-wrap"></div>'));outer=$('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(wrap);outer.append(content=$('<div id="fancybox-content"></div>'),close=$('<a id="fancybox-close"></a>'),title=$('<div id="fancybox-title"></div>'),nav_left=$('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),nav_right=$('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));close.click($.fancybox.close);loading.click($.fancybox.cancel);nav_left.click(function(e){e.preventDefault();$.fancybox.prev()});nav_right.click(function(e){e.preventDefault();$.fancybox.next()});if($.fn.mousewheel){wrap.bind('mousewheel.fb', function(e,delta){if(busy){e.preventDefault()} else if($(e.target).get(0).clientHeight==0||$(e.target).get(0).scrollHeight===$(e.target).get(0).clientHeight){e.preventDefault();$.fancybox[delta>0?'prev':'next']()}})}
if(!$.support.opacity){wrap.addClass('fancybox-ie')}
if(isIE6){loading.addClass('fancybox-ie6');wrap.addClass('fancybox-ie6');$('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||'')?'javascript:void(false)':'about:blank')+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(outer)}};$.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:'auto',width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:'transparent'},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:'#777',titleShow:true,titlePosition:'float',titleFormat:null,titleFromAlt:false,transitionIn:'fade',transitionOut:'fade',speedIn:300,speedOut:300,changeSpeed:300,changeFade:'fast',easingIn:'swing',easingOut:'swing',showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart: function(){},onCancel: function(){},onComplete: function(){},onCleanup: function(){},onClosed: function(){},onError: function(){}};$(document).ready(function(){$.fancybox.init()})})(jQuery);

/* - eeareferencebrowser.js - */
var EEAReferenceBrowser = {version: '4.0'};
EEAReferenceBrowser.debug = false;

var AssertException = function(message) {
  this.message = message;
};

AssertException.prototype.toString = function() {
  return 'AssertException: ' + this.message;
};

var assert = function(exp, message) {
  if (!exp && EEAReferenceBrowser.debug) {
    throw new AssertException(message);
  }
};

// Events
EEAReferenceBrowser.Events = function(){
  this.BASKET_ADD = 'EEA-REFERENCEBROWSER-BASKET-ADD';
  this.BASKET_DELETE = 'EEA-REFERENCEBROWSER-BASKET-DELETE';
  this.AJAX_START = 'EEA-REFERENCEBROWSER-AJAX-START';
  this.AJAX_STOP = 'EEA-REFERENCEBROWSER-AJAX-STOP';
  this.SAVE = 'EEA-REFERENCEBROWSER-SAVE';
  this.CANCEL = 'EEA-REFERENCEBROWSER-CANCEL';
  this.CLOSE = 'EEA-REFERENCEBROWSER-CLOSE';
  this.SAVED = 'EEA-REFERENCEBROWSER-SAVED';
};

EEAReferenceBrowser.Events.prototype = {};

EEAReferenceBrowser.Tab = function(context, parent){
  this.parent = parent;
  this.context = context;
  this.panel = context.getPanes().eq(0);
  this.tab = context.getCurrentTab();
  this.name = this.tab.attr('id');
  this.url = jQuery('.tab-url', this.tab).text();
  this.panel.height(parent.height - 195);
  this.panel.css('overflow', 'auto');

  var self = this;
  Faceted.Load(0, this.url + '/');
  jQuery(Faceted.Events).bind(Faceted.Events.AJAX_QUERY_SUCCESS, function(){
    self.setup_links();
  });
};

EEAReferenceBrowser.Tab.prototype = {
  get_icon: function(){
    return jQuery('<div>').addClass('ui-icon')
    .addClass('ui-icon-extlink')
    .addClass('ui-icon-custom-add');
  },

  setup_links: function(){
    var results = jQuery('#faceted-results', this.panel);
    this.folder_summary_view(results);
    this.tabular_view(results);
    this.album_view(results);
    this.folder_listing(results);

    var tab = this.tab.parent();
    var creation_link = tab.children(".creation_link");
    var text = creation_link.text();
    var link = creation_link.children("span").get(0);
    var href = jQuery(link).attr('rel');
    jQuery(".popup-tips .content_name").html(text);
    jQuery(".popup-tips .content_default_location").attr('href', href);
    if (!href){
      href = [];
    }

    jQuery(".eea-refwidget-popup .loading").remove();
    if (href.length === 0) {
      jQuery(".eea-refwidget-popup .no_link").css('display','inline');
      jQuery(".eea-refwidget-popup .has_link").css('display','none');
    } else {
      jQuery(".eea-refwidget-popup .has_link").css('display','inline');
      jQuery(".eea-refwidget-popup .no_link").css('display','none');
    }
  },

  folder_summary_view: function(context){
    // Folder summary view
    var items = jQuery('.tileItem', context);
    jQuery('a', items).click(function(){
      return false;
    });

    // Add working css class
    items.addClass('refbrowser-faceted-addable-item');
    items.attr('title', 'Click to add it to current relations');
    items.prepend(this.get_icon());

    // Handle clicks
    var js_context = this;
    items.click(function(){
      var self = jQuery(this);
      var divname = '#' + js_context.parent.name + '-popup-selected-items';
      assert(jQuery(divname).length === 1, "The popup for selected elements could not be found");

      self.effect('transfer', {to: divname}, 'slow', function(){
        jQuery(js_context.parent.events).trigger(
          js_context.parent.events.BASKET_ADD,
          {url: jQuery('.tileHeadline a', self).attr('href')}
        );
      });
    });
  },

  tabular_view: function(context){
    // Tabular view
    var js_context = this;
    var table = jQuery('table', context);
    jQuery('a', table).click(function(){
      return false;
    });

    table.css('width', '100%');

    var th = jQuery('thead tr', table);
    th.append(jQuery('<th>').width(20));

    var rows = jQuery('tbody tr', table);
    rows.each(function(){
      var self = jQuery(this);
      self.attr('title', 'Click to add it to current relations');
      var td = jQuery('<td>');
      td.append(js_context.get_icon());
      self.append(td);
      // Backet add
      self.click(function(){
        self.effect('transfer', {to: '#' + js_context.parent.name + '-popup-selected-items'}, 'slow', function(){
          jQuery(js_context.parent.events).trigger(
            js_context.parent.events.BASKET_ADD,
            {url: jQuery('a', self).attr('href')}
          );
        });
      });
    });
    // Add working css class
    jQuery('tr', context).addClass('refbrowser-faceted-addable-item');
  },

  album_view: function(context){
    var js_context = this;
    var items = jQuery('.photoAlbumEntry', context);
    jQuery('a', items).click(function(){
      return false;
    });

    // Add working css class
    items.addClass('refbrowser-faceted-addable-item');
    items.attr('title', 'Click on right-top icon to add it to current relations');
    items.prepend(this.get_icon());

    items.click(function(){
      var self = jQuery(this);
      self.effect('transfer', {to: '#' + js_context.parent.name + '-popup-selected-items'}, 'slow', function(){
        jQuery(js_context.parent.events).trigger(
          js_context.parent.events.BASKET_ADD,
          {url: jQuery('a', self).attr('href')}
        );
      });
    });
  },

  folder_listing: function(context){
    // Folder listing
    var js_context = this;
    var items = jQuery('dt', context);
    jQuery('a', items).click(function(){
      return false;
    });

    items.addClass('refbrowser-faceted-addable-item');
    items.attr('title', 'Click to add it to current relations');
    items.prepend(this.get_icon());

    // Add working css class
    items.click(function(){
      var self = jQuery(this);
      self.effect('transfer', {to: '#' + js_context.parent.name + '-popup-selected-items'}, 'slow', function(){
        jQuery(js_context.parent.events).trigger(
          js_context.parent.events.BASKET_ADD,
          {url: jQuery('a', self).attr('href')}
        );
      });
    });
  }
};

EEAReferenceBrowser.Basket = function(context, parent){
  this.context = context;
  this.parent = parent;
  this.multiple = this.parent.storageedit.attr('multiple') ? true : false;
  this.context.height(this.parent.height - 161);
  this.context.css('overflow', 'auto');
  jQuery('.tileItem', this.context).attr('title', 'Click and drag to change order');
  this.context.sortable({
    items: '.tileItem',
    placeholder: 'ui-state-highlight'
  });

  this.initialize();
  var self = this;

  // Basket add
  jQuery(self.parent.events).bind(self.parent.events.BASKET_ADD,
    function(evt, data){
      self.basket_add_clicked(data);
    }
  );

  // Working in background
  jQuery(self.parent.events).bind(self.parent.events.AJAX_START,
    function(evt, data){
      jQuery('h4', self.context).addClass('ui-state-working');
    }
  );
  jQuery(self.parent.events).bind(self.parent.events.AJAX_STOP,
    function(evt, data){
      jQuery('h4', self.context).removeClass('ui-state-working');
    }
  );

  // Save button clicked
  jQuery(self.parent.events).bind(self.parent.events.SAVE,
    function(evt, data){
      self.save();
    }
  );

  // Cancel button clicked
  jQuery(self.parent.events).bind(self.parent.events.CANCEL,
    function(evt, data){
      self.cancel();
    }
  );

  // Popup closed
  jQuery(self.parent.events).bind(self.parent.events.CLOSE,
    function(evt, data){
      self.close();
    }
  );
};

EEAReferenceBrowser.Basket.prototype = {
  initialize: function(){
    jQuery('.tileItem', this.context).prepend(this.trash_icon());
    jQuery('.ui-icon-basket-trash', this.context).click(function(){
      var self = jQuery(this);
      self.parent().slideUp(function(){
        jQuery(this).remove();
      });
    });
  },

  trash_icon: function(){
    return jQuery('<div>').addClass('ui-icon')
    .addClass('ui-icon-trash')
    .addClass('ui-icon-basket-trash')
    .text('X');
  },

  get_url: function(url){
    var last_slash = url.lastIndexOf('/');
    var view = url.slice(last_slash+1, url.length);
    url = url.slice(0, last_slash);
    if(!view){
      return url;
    }
    // View
    if(view==='view'){
      return url;
    }
    // Zope 3 view
    if(view.indexOf('@@')===0){
      return url;
    }
    // index_html
    if(view.indexOf('index_html')!==-1){
      return url;
    }
    // index.html
    if(view.indexOf('index.html')!==-1){
      return url;
    }
    // Other view
    if(view.indexOf('_view')!==-1){
      return url;
    }
    return url + '/' + view;
  },

  basket_add_clicked: function(data){
    var url = this.get_url(data.url);
    var query = {};
    query.mode = 'edit';
    query.field = this.parent.name;
    query.nocache = new Date().getTime();
    var self = this;
    jQuery(self.parent.events).trigger(self.parent.events.AJAX_START);
    jQuery.get(url + '/@@eeareferencebrowser-popup-selecteditem.html', query, function(data){
      self.basket_add(data);
      jQuery(self.parent.events).trigger(self.parent.events.AJAX_STOP);
    });
  },

  basket_add: function(data){
    var data_dom = jQuery(data);
    var uid = jQuery('input[type=checkbox]', data_dom).val();
    var exists = jQuery('input[value=' + uid + ']', this.context);
    if(exists.length){
      var parent = exists.parent();
      parent.addClass('ui-pulsate-item');
      parent.effect('pulsate', {}, 200, function(){
        jQuery(this).removeClass('ui-pulsate-item');
      });
    }else{
      var basket = jQuery('.eea-ref-selecteditems', this.context);
      if(!this.multiple){
        basket.empty();
      }
      data_dom.prepend(this.trash_icon());
      jQuery('.ui-icon-basket-trash', data_dom).click(function(){
        var self = jQuery(this);
        self.parent().slideUp(function(){
          jQuery(this).remove();
        });
      });
      basket.prepend(data_dom);
      data_dom.addClass('ui-pulsate-item');
      data_dom.effect('pulsate', {}, 200, function(){
        jQuery(this).removeClass('ui-pulsate-item');
      });
    }
  },

  save: function(){
    var self = this;
    var storage = self.parent.storageedit;
    var values = jQuery('input[type=checkbox]', this.context);

    storage.empty();
    if(!this.multiple && !values.length){
      var option = jQuery('<option>').attr('selected', 'selected');
      option.val('');
      option.text('<No relation set>');
      storage.append(option);
    }
    values.each(function(){
      var input = jQuery(this);
      var val = input.val();
      var option = jQuery('<option>').attr('selected', 'selected');
      option.text(val);
      option.val(val);
      storage.append(option);
    });

    jQuery(self.parent.events).trigger(self.parent.events.SAVED, {msg: values});
  },

  cancel: function(){
    return;
  },

  close: function(){
    var self = this;

    var url = self.parent.skip_portal_factory('@@eeareferencebrowser-popup-selecteditems.html');
    var query = {};
    query.mode = 'edit';
    query.field = this.parent.name;
    query.uids = this.parent.storageedit.val();
    query.nocache = new Date().getTime();

    jQuery.get(url, query, function(data){
      jQuery('.eea-ref-selecteditems', self.context).html(data);
      self.initialize();
    });
  }
};

EEAReferenceBrowser.Widget = function(name, options){
  this.name = name;
  this.options = options || {};
  this.fieldname = this.options.fieldname || name;
  this.context = jQuery('#' + name + "-widget");
  this.popup = jQuery('#' + name + '-popup', this.context);
  this.tips = jQuery('.popup-tips', this.popup);
  this.workspace = jQuery('.popup-tabs' , this.popup);
  this.storageedit = jQuery('#' + name, this.context);
  this.storageview = jQuery('.eea-ref-selecteditems-box', this.context);
  this.basket = null;
  this.button = jQuery('.eea-ref-popup-button', this.context);
  this.current_tab = null;
  this.position = 0;

  // These asserts will make sure that a proper DOM structure is provided for the widget
  assert(this.context.length === 1, "The following important element of the widget could not be found: context");
  assert(this.popup.length === 1, "The following important element of the widget could not be found: popup");
  assert(this.storageedit.length === 1, "The following important element of the widget could not be found: storageedit");

  this.events = new EEAReferenceBrowser.Events();
  this.width = jQuery(window).width() * 0.85;
  this.height = jQuery(window).height() * 0.95;
  var js_context = this;

  // Popup dialog
  this.popup.dialog({
    bgiframe: true,
    modal: true,
    closeOnEscape: false,
    autoOpen: false,
    width: js_context.width,
    height: js_context.height,
    resize: false,
    dialogClass: 'eea-refwidget-popup',
    buttons: {
      'Done': function(){
        jQuery(js_context.events).trigger(js_context.events.SAVE);
      },
      'Cancel': function(){
        jQuery(js_context.events).trigger(js_context.events.CANCEL);
        jQuery(this).dialog('close');
      }
    },
    close: function(){
      jQuery(js_context.events).trigger(js_context.events.CLOSE);
      Faceted.Cleanup();
      jQuery('.popup-tabs #faceted-form').remove();
      jQuery('ul', js_context.workspace).data('tabs').destroy();
      jQuery(window).scrollTop(js_context.position);
    }
  });

  // Basket
  var basket = jQuery('.popup-selected-items', this.popup);
  this.basket = new EEAReferenceBrowser.Basket(basket, this);

  // Add button
  this.button.click(function(){
    js_context.popup_open();
  });

  // Double click
  if(this.storageview.length){
    this.storageview.dblclick(function(){
      js_context.popup_open();
    });
  }

  jQuery(this.events).bind(this.events.SAVED, function(evt, data){
    js_context.saved(data);
  });

  this.tips.click(function(){
    jQuery(this).hide('blind');
  });

  // Resize on window width change
  jQuery(Faceted.Events).bind(Faceted.Events.WINDOW_WIDTH_CHANGED, function(evt, data){
    if(data){
      js_context.width = data.width * 0.85;
      js_context.popup.dialog( "option", "width", js_context.width);
      js_context.popup.dialog( "option", "position", 'center');
    }
  });
};

EEAReferenceBrowser.Widget.prototype = {
  popup_open: function(){
    this.position = jQuery(window).scrollTop();
    jQuery(window).scrollTop(0);
    // Tabs
    var js_context = this;
    var index = this.default_tab();
    jQuery('ul', this.workspace).tabs('div.panes > div', {
      effect: 'ajax',
      initialIndex: index,
      onBeforeClick: function(evt, idx){
        Faceted.Cleanup();
        jQuery('.popup-tabs #faceted-form').remove();
      },
      onClick: function(evt, idx){
        js_context.tab_selected(this);
      }
    });
    this.popup.dialog('open');
    jQuery(Faceted.Events).trigger(Faceted.Events.WINDOW_WIDTH_CHANGED);
    this.tips.show();
  },

  default_tab: function(){
    var tabs = this.options.tabs;

    if(!this.options.tabs){
      if (window._selected_tab){
        tabs = {'selected': window._selected_tab};
      } else {
        return 0;
      }
    }
    var name = tabs.selected;
    if(!name){
      return 0;
    }
    if(name.indexOf(this.name)!==0){
      name = this.name + '-' + name;
    }
    var index = jQuery('#' + name, this.popup);
    if(!index){
      return 0;
    }

    var lis = jQuery('.formTabs li.formTab', this.workspace);
    var idx = 0;
    lis.each(function(i){
      if(jQuery('#' + name, jQuery(this)).length){
        idx = i;
        return false;
      }
    });
    return idx;
  },

  tab_selected: function(ui){
    this.current_tab = new EEAReferenceBrowser.Tab(ui, this);
  },

  skip_portal_factory: function(url){
    if(window.location.pathname.indexOf('portal_factory') === -1){
      return url;
    }
    var base_url = window.location.pathname.split('portal_factory')[0];
    return base_url + url;
  },

  saved: function(data){
    var area = this.storageview;
    if(area.length){
      area.empty();
      area.append(jQuery('<img src="../eeareferencebrowser-loading.gif" />'));

      var self = this;
      var url = self.skip_portal_factory('@@eeareferencebrowser-popup-selecteditems.html');
      var query = {};
      query.mode = 'view';
      query.field = self.fieldname;
      query.uids = this.storageedit.val();
      query.nocache = new Date().getTime();

      jQuery.get(url, query, function(data){
        area.html(data);
      });
    }
    this.popup.dialog('close');
  }
};
// vim: set ts=2 sw=2 et:


/* - faceted_view.js - */

/* - ++resource++eea.faceted-navigation.js - */
var Faceted={version:'2.0'};Faceted.Events={};Faceted.Events.INITIALIZE='FACETED-INITIALIZE';Faceted.Events.AJAX_QUERY_START='FACETED-AJAX-QUERY-START';Faceted.Events.AJAX_QUERY_SUCCESS='FACETED-AJAX-QUERY-SUCCESS';Faceted.Events.QUERY_INITIALIZED='FACETED-QUERY-INITIALIZED';Faceted.Events.QUERY_CHANGED='FACETED-QUERY-CHANGED';Faceted.Events.RESET='FACETED-RESET';Faceted.Events.FORM_DO_QUERY='FACETED-FORM-DO-QUERY';Faceted.Events.WINDOW_WIDTH_CHANGED='FACETED-WINDOW-WIDTH-CHANGED';Faceted.Events.WINDOW_HEIGHT_CHANGED='FACETED-WINDOW-HEIGHT-CHANGED';Faceted.Events.AJAX_START='FACETED-AJAX-START';Faceted.Events.AJAX_STOP='FACETED-AJAX-STOP';Faceted.Events.AJAX_ERROR='FACETED-AJAX-ERROR';Faceted.Events.REDRAW='FACETED-REDRAW';Faceted.Events.HASHCHANGE='hashchange.FACETED-HASHCHANGE';Faceted.Events.cleanup=function(){jQuery(Faceted.Events).unbind(Faceted.Events.AJAX_QUERY_START);jQuery(Faceted.Events).unbind(Faceted.Events.AJAX_QUERY_SUCCESS);jQuery(Faceted.Events).unbind(Faceted.Events.QUERY_INITIALIZED);jQuery(Faceted.Events).unbind(Faceted.Events.QUERY_CHANGED);jQuery(Faceted.Events).unbind(Faceted.Events.RESET);jQuery(Faceted.Events).unbind(Faceted.Events.FORM_DO_QUERY);jQuery(Faceted.Events).unbind(Faceted.Events.WINDOW_WIDTH_CHANGED);jQuery(Faceted.Events).unbind(Faceted.Events.WINDOW_HEIGHT_CHANGED);jQuery(Faceted.Events).unbind(Faceted.Events.AJAX_START);jQuery(Faceted.Events).unbind(Faceted.Events.AJAX_STOP);jQuery(Faceted.Events).unbind(Faceted.Events.AJAX_ERROR);jQuery(Faceted.Events).unbind(Faceted.Events.REDRAW);jQuery(window).unbind(Faceted.Events.HASHCHANGE)};Faceted.Widgets={};Faceted.Query={};Faceted.BASEURL='';Faceted.SortedQuery=function(query){if(!query){query=Faceted.Query}
var keys=[];jQuery.each(query, function(key){if(!this||this=='all'){return}
keys.push(key)});keys.sort();var res={};jQuery.each(keys, function(index){res[this]=query[this]});return res};Faceted.Window={initialize: function(){this.width=jQuery(window).width();this.height=jQuery(window).height();var js_window=this;jQuery(window).resize(function(){js_window.width_change();js_window.height_change()});var fullscreen=jQuery('a:has(img#icon-full_screen)');if(fullscreen.length){js_window.toggle_fullscreen(fullscreen)}},width_change: function(){var width=jQuery(window).width();if(width!=this.width){this.width=width;jQuery(Faceted.Events).trigger(Faceted.Events.WINDOW_WIDTH_CHANGED,{width:width})}},height_change: function(){var height=jQuery(window).height();if(height!=this.height){this.height=height;jQuery(Faceted.Events).trigger(Faceted.Events.WINDOW_HEIGHT_CHANGED,{height:height})}},toggle_fullscreen: function(button){button.attr('href','#');button.click(function(evt){var toggleFullScreenMode=window.toggleFullScreenMode;if(toggleFullScreenMode){toggleFullScreenMode();jQuery(Faceted.Events).trigger(Faceted.Events.WINDOW_WIDTH_CHANGED)}
return false})}};Faceted.Form={initialize: function(){this.form=jQuery('#faceted-form');this.area=jQuery('#faceted-results');this.version='';var version=jQuery('#faceted-version',this.form);if(version){this.version=version.text()}
this.area.ajaxError(function(event,request,settings){jQuery(this).html(''+'<h3>This site encountered an error trying to fulfill your request</h3>'+'<p>'+'If the error persists please contact the site maintainer. '+'Thank you for your patience.'+'</p>');jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_ERROR)});var has_hash=false;var hashquery=Faceted.URLHandler.get();jQuery.each(hashquery, function(){has_hash=true;Faceted.Query=hashquery;return false});if(Faceted.Query.b_start===undefined){Faceted.Query.b_start=0}
jQuery(Faceted.Events).trigger(Faceted.Events.QUERY_INITIALIZED);if(!has_hash){Faceted.URLHandler.set()}else{Faceted.URLHandler.hash_changed()}},initialize_paginator: function(){var context=this;jQuery('.listingBar a').each(function(i){jQuery(this).click(function(){var href=jQuery(this).attr('href');var regex=new RegExp('b_start\\:int=(\\d+)');var b_start=regex.exec(href)[1];context.do_query('b_start',b_start);return false})})},reset: function(evt){Faceted.Query={}},do_query: function(wid,value){if(wid!='b_start'){Faceted.Query.b_start=0}
if(!value){value=[]}
if(wid){Faceted.Query[wid]=value}
jQuery(Faceted.Events).trigger(Faceted.Events.FORM_DO_QUERY,{wid:wid});Faceted.URLHandler.set()},do_form_query: function(){var context=this;if(Faceted.Query.b_start===undefined){Faceted.Query.b_start=0}
jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_QUERY_START);context.area.fadeOut('fast', function(){var loading='<div class="faceted_loading"><img src="'+Faceted.BASEURL+'++resource++faceted_images/ajax-loader.gif" /></div>';context.area.html(loading);context.area.fadeIn('slow');var query=Faceted.SortedQuery();if(context.version){query.version=context.version}
jQuery.get(Faceted.BASEURL+'@@faceted_query',query, function(data){context.area.fadeOut('fast', function(){context.area.html(data);context.area.fadeIn('slow');jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_QUERY_SUCCESS)})})})},highlight: function(elements,css_class,remove){for(var i=0;i<elements.length;i++){var element=jQuery('#'+elements[i]);if(remove){jQuery(element).removeClass(css_class)}else{jQuery(element).addClass(css_class)}}},raise_error: function(msg,error_area,highlights){var area=jQuery('#'+error_area);msg='<div class="portalMessage">'+msg+'</div>';area.html(msg);this.highlight(highlights,'error')},clear_errors: function(error_area,highlights){var area=jQuery('#'+error_area);area.html('');this.highlight(highlights,'error',true)}};Faceted.URLHandler={initialize: function(){},hash_changed: function(){Faceted.Query=this.get();jQuery(Faceted.Events).trigger(Faceted.Events.QUERY_CHANGED);Faceted.Form.do_form_query()},document_hash: function(){var r=window.location.href;var i=r.indexOf("#");return(i>=0?r.substr(i+1):'')},get: function(){var hash=jQuery.bbq.getState();var query={};var types=["number","boolean","string"];jQuery.each(hash, function(key,value){var value_type=typeof(value);if(jQuery.inArray(value_type,types)!==-1){value=[value]}
query[key]=value});return query},set: function(query){if(!query){query=Faceted.Query}
query=jQuery.param(query,traditional=true);jQuery.bbq.pushState(query,2)}};Faceted.Sections={initialize: function(){var self=this;self.form=jQuery('.faceted-form');self.advanced=jQuery('.faceted-advanced-widgets',self.form).hide();if(!self.advanced.length){return}
self.buttons=jQuery('.faceted-sections-buttons',self.form);self.more=jQuery('.faceted-sections-buttons-more',self.form).show();self.less=jQuery('.faceted-sections-buttons-less',self.form).hide();jQuery('a',self.buttons).click(function(evt){self.toggle(jQuery(this),evt);return false})},toggle: function(element,evt){this.more.toggle();this.less.toggle();this.advanced.toggle('blind');var tags=jQuery('.faceted-tagscloud-widget:visible',this.form);if(tags.length){jQuery(Faceted.Events).trigger(Faceted.Events.WINDOW_WIDTH_CHANGED)}}};Faceted.AjaxLook={initialize: function(){this.slaves=[];this.locked=false;var js_object=this;jQuery(Faceted.Events).bind(Faceted.Events.AJAX_START, function(evt,data){js_object.add(data.wid)});jQuery(Faceted.Events).bind(Faceted.Events.AJAX_STOP, function(evt,data){js_object.remove(data.wid)});jQuery(Faceted.Events).bind(Faceted.Events.AJAX_QUERY_START, function(evt){js_object.add('faceted-results')});jQuery(Faceted.Events).bind(Faceted.Events.AJAX_QUERY_SUCCESS, function(evt){js_object.remove('faceted-results')});jQuery(Faceted.Events).bind(Faceted.Events.AJAX_ERROR, function(evt){jQuery(this.slaves).each(function(index){js_object.remove(js_object.slaves[index])})})},add: function(wid){this.lock();this.slaves.push(wid);var widget=jQuery('#'+wid+'_widget');if(widget.length){widget.addClass('faceted-widget-loading');if(jQuery.browser.msie){widget.addClass('faceted-widget-loading-msie')}}},remove: function(wid){if(this.slaves.length){this.slaves=jQuery.map(this.slaves, function(slave,index){if(slave==wid){return null}
return slave})}
var widget=jQuery('#'+wid+'_widget');if(widget.length){widget.removeClass('faceted-widget-loading');widget.removeClass('faceted-widget-loading-msie')}
this.unlock()},lock: function(){if(this.locked){return}
this.locked=true;jQuery.each(Faceted.Widgets, function(key){this.widget.addClass('faceted-widget-locked')});var overlay=jQuery('<div>');overlay.addClass('faceted-lock-overlay');overlay.addClass('ui-widget-overlay');overlay.css('z-index',1001);jQuery('#faceted-form').append(overlay)},unlock: function(){if(this.slaves.length){return}
this.locked=false;jQuery.each(Faceted.Widgets, function(key){this.widget.removeClass('faceted-widget-locked')});jQuery('.faceted-lock-overlay').remove()}};Faceted.Load=function(evt,baseurl){if(baseurl){Faceted.BASEURL=baseurl}
jQuery('.faceted-widget:has(div.faceted-widget-error)').remove();jQuery(Faceted.Events).bind(Faceted.Events.REDRAW, function(){if(jQuery('#faceted-left-column:has(div.faceted-widget)').length){jQuery('#center-content-area').addClass('left-area-js')}else{jQuery('#center-content-area').removeClass('left-area-js')}
if(jQuery('#faceted-right-column:has(div.faceted-widget)').length){jQuery('#center-content-area').addClass('right-area-js')}else{jQuery('#center-content-area').removeClass('right-area-js')}});jQuery(Faceted.Events).trigger(Faceted.Events.REDRAW);jQuery(Faceted.Events).trigger(Faceted.Events.INITIALIZE);jQuery(window).bind(Faceted.Events.HASHCHANGE, function(evt){Faceted.URLHandler.hash_changed()});jQuery(Faceted.Events).bind(Faceted.Events.AJAX_QUERY_SUCCESS, function(evt){Faceted.Form.initialize_paginator()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){Faceted.Form.reset()});Faceted.Window.initialize();Faceted.Sections.initialize();Faceted.AjaxLook.initialize();Faceted.Form.initialize();if(window.Calendar){Calendar.prototype.callCloseHandler=function(){if(this.onClose){this.onClose(this)}
this.hideShowCovered();var wid=this.params.inputField.id;wid=wid.split('_')[2];if(!wid){return false}
var widget=Faceted.Widgets[wid];widget.do_query();return false}}};Faceted.Unload=function(){};Faceted.Cleanup=function(){Faceted.Events.cleanup();Faceted.Widgets={};Faceted.Query={};Faceted.URLHandler.set()};

/* - ++resource++eea.faceted-navigation-expand.js - */
(function(jQuery){jQuery.fn.collapsible=function(settings){var self=this;self.colapsed=false;var options={maxitems:0,elements:'li',events:{refresh:'widget-refresh',expand:'widget-expand',colapse:'widget-colapse'},handle_refresh: function(evt,data){jQuery(options.elements,self).show();self.button.hide();if(!options.maxitems){return}
var elements=jQuery(options.elements,self);if(elements.length<options.maxitems){return}
if(self.colapsed){jQuery('a',self.button).text('More')}else{jQuery('a',self.button).text('Less')}
self.button.show();if(!self.colapsed){return}
elements.each(function(index){if(index<options.maxitems){jQuery(this).show()}else{jQuery(this).hide()}})},handle_expand: function(evt,data){self.colapsed=false;self.trigger(options.events.refresh)},handle_colapse: function(evt,data){self.colapsed=true;self.trigger(options.events.refresh)},initialize: function(){self.bind(options.events.refresh, function(evt,data){options.handle_refresh(evt,data)});self.bind(options.events.expand, function(evt,data){options.handle_expand(evt,data)});self.bind(options.events.colapse, function(evt,data){options.handle_colapse(evt,data)});var link=jQuery('<a>').attr('href','#').text('More');self.button=jQuery('<div>').addClass('faceted-checkbox-more').append(link).hide();self.append(self.button);link.click(function(){if(self.colapsed){self.trigger(options.events.expand)}else{self.trigger(options.events.colapse)}
return false});if(options.maxitems){link.click()}}};if(settings){jQuery.extend(options,settings)}
options.initialize();return this}})(jQuery);

/* - ++resource++eea.faceted-navigation-independent.js - */
jQuery(document).ready(function(){jQuery('form.faceted-external-search').submit(function(evt){evt.preventDefault();var form=jQuery(this);var action=form.attr('action');var query=form.serialize();window.location.href=action+'#'+query})});

/* - ++resource++eea.facetednavigation.widgets.checkbox.view.js - */
Faceted.CheckboxesWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.fieldset=jQuery('.widget-fieldset',this.widget);this.title=jQuery('legend',this.widget).html();this.elements=jQuery('input[type=checkbox]',this.widget);this.maxitems=parseInt(jQuery('span',this.widget).text(),10);this.selected=[];this.version='';var version=jQuery('#faceted-version');if(version){this.version=version.text()}
jQuery('form',this.widget).submit(function(){return false});var js_widget=this;this.elements.click(function(evt){js_widget.checkbox_click(this,evt)});var selected=jQuery('input[type=checkbox]:checked',this.widget);if(selected.length){this.selected=selected;Faceted.Query[this.wid]=[];selected.each(function(){Faceted.Query[js_widget.wid].push(jQuery(this).val())})}
if(this.maxitems){this.fieldset.collapsible({maxitems:this.maxitems,elements:'li:not(.faceted-checkbox-item-zerocount)'})}
jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()});if(this.widget.hasClass('faceted-count')){jQuery(Faceted.Events).bind(Faceted.Events.QUERY_INITIALIZED, function(evt){js_widget.count()});jQuery(Faceted.Events).bind(Faceted.Events.FORM_DO_QUERY, function(evt,data){if(data.wid==js_widget.wid||data.wid=='b_start'){return}
js_widget.count()})}};Faceted.CheckboxesWidget.prototype={checkbox_click: function(element,evt){this.do_query(element)},do_query: function(element){this.selected=jQuery('input[type=checkbox]:checked',this.widget);var value=[];this.selected.each(function(i){value.push(jQuery(this).val())});Faceted.Form.do_query(this.wid,value)},reset: function(){this.selected=[];jQuery(this.elements).attr('checked',false)},synchronize: function(){this.elements.attr('checked',false);var checked=Faceted.Query[this.wid];if(!checked){return}
jQuery('input[type=checkbox]',this.widget).val(checked);this.selected=jQuery('input[type=checkbox]:checked',this.widget)},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var widget=this;var html=jQuery('<dd>');widget.selected.each(function(i){var element=jQuery(this);var id=element.attr('id');var value=element.val();var label=jQuery('label[for='+id+']',widget.widget);var title=label.attr('title');label=label.html();var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+id);link.attr('title','Remove '+title+' filter');link.click(function(evt){widget.criteria_remove(value,element);return false});html.append(link);html.append('<span>'+label+'</span>')});return html},criteria_remove: function(value,element){if(!value){this.elements.attr('checked',false);this.do_query()}else{element.attr('checked',false);this.do_query()}},count: function(){var query=Faceted.SortedQuery();query.cid=this.wid;if(this.version){query.version=this.version}
var context=this;jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_START,{wid:context.wid});jQuery.getJSON(Faceted.BASEURL+'@@faceted_counter',query, function(data){context.count_update(data);jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_STOP,{wid:context.wid})})},count_update: function(data){var context=this;var lis=jQuery('li',context.widget);jQuery(lis).each(function(){var li=jQuery(this);li.removeClass('faceted-checkbox-item-disabled');li.removeClass('faceted-checkbox-item-zerocount');var input=jQuery('input',li);input.unbind();var key=input.val();var span=jQuery('span',li);if(!span.length){li.append(jQuery('<span>'));span=jQuery('span',li)}
var value=data[key];value=value?value:0;span.text('('+data[key]+')');if(!value){li.addClass('faceted-checkbox-item-disabled');if(context.widget.hasClass('faceted-zero-count-hidden')){li.addClass('faceted-checkbox-item-zerocount')}
input.attr('disabled','disabled')}else{input.attr('disabled',false);input.click(function(evt){context.checkbox_click(this,evt)})}});context.fieldset.trigger('widget-refresh')}};Faceted.initializeCheckboxesWidget=function(evt){jQuery('div.faceted-checkboxes-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.CheckboxesWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeCheckboxesWidget)});

/* - ++resource++eea.facetednavigation.widgets.sorting.view.js - */
Faceted.SortingWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+this.wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.reverse=jQuery('#'+this.wid+'_reversed');this.elements=jQuery('option',this.widget);this.selected=[];this.select=jQuery('#'+this.wid);var error=jQuery('.faceted-widget:has(div.faceted-sorting-errors)');if(error.length){error.remove();jQuery(Faceted.Events).trigger(Faceted.Events.REDRAW);return}
jQuery('form',this.widget).submit(function(){return false});var js_widget=this;this.select.change(function(evt){js_widget.select_change(this,evt)});this.reverse.click(function(evt){js_widget.reverse_change(this,evt)});var value=this.select.val();if(value){this.selected=jQuery('option[value='+value+']',this.widget);Faceted.Query[this.wid]=[value];var reverse=this.reverse.attr('checked');if(reverse){Faceted.Query.reversed='on'}}
jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(){js_widget.reset()})};Faceted.SortingWidget.prototype={select_change: function(element,evt){this.do_query(element)},reverse_change: function(element,evt){this.do_query(element)},do_query: function(element){if(!element){this.selected=[];Faceted.Form.do_query(this.wid,[]);return}
var value=null;if(jQuery(element).attr('type')=='checkbox'){value=jQuery(element).attr('checked')?'on':[];if(!this.selected.length){Faceted.Query.reversed=value;return}
Faceted.Form.do_query('reversed',value);return}else{value=jQuery(element).val();if(!value){this.selected=[];value=[]}else{this.selected=jQuery('option[value='+value+']',this.widget)}
Faceted.Form.do_query(this.wid,value);return}},reset: function(reversed){reversed=reversed?true:false;this.select.val("");this.reverse.attr('checked',reversed);this.selected=[]},synchronize: function(){var value=Faceted.Query[this.wid];var reversed_value=Faceted.Query.reversed;reversed_value=reversed_value?true:false;if(!value){this.reset(reversed_value);return}
var context=this;jQuery.each(value, function(){var selected=jQuery('option[value='+value+']',this.widget);if(!selected.length){context.reset(reversed_value)}else{context.selected=selected;context.select.val(value);context.reverse.attr('checked',reversed_value)}})},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var widget=this;var html=jQuery('<dd>');var element=jQuery(this.selected);var value=element.val();var label=element.html();var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid+'_'+value);link.attr('title','Remove '+label+' filter');link.click(function(evt){widget.criteria_remove();return false});html.append(link);html.append('<span>'+label+'</span>');if(this.reverse.attr('checked')){var rid=this.reverse.attr('id');var rlabel=jQuery('label[for='+rid+']').html();html.append('<span>('+rlabel+')</span>')}
return html},criteria_remove: function(){this.select.val('');this.reverse.attr('checked',false);this.do_query()}};Faceted.initializeSortingWidget=function(evt){jQuery('div.faceted-sorting-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.SortingWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeSortingWidget)});

/* - ++resource++eea.facetednavigation.widgets.text.view.js - */
Faceted.TextWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.selected=[];this.button=jQuery('input[type=submit]',this.widget);var js_widget=this;jQuery('form',this.widget).submit(function(){js_widget.text_change(js_widget.button);return false});var input=jQuery('#'+this.wid);var value=input.val();if(value){this.selected=input;Faceted.Query[this.wid]=[value]}
jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()})};Faceted.TextWidget.prototype={text_change: function(element,evt){this.do_query(element);jQuery(element).removeClass("submitting")},do_query: function(element){var input=jQuery('#'+this.wid);var value=input.val();value=value?[value]:[];if(!element){this.selected=[];return Faceted.Form.do_query(this.wid,[])}
this.selected=[input];var where=jQuery('input[type=radio]:checked',this.widget);where=where?where.val():'all';if(where=='all'){return Faceted.Form.do_query(this.wid,value)}
var current=Faceted.Query[this.wid];current=current?current:[];if(value.length&&!(value[0] in current)){current.push(value[0])}
return Faceted.Form.do_query(this.wid,current)},reset: function(){this.selected=[];jQuery('#'+this.wid).val('')},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset();return}
var input=jQuery('#'+this.wid);this.selected=[input]},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var widget=this;var html=jQuery('<dd>');var elements=Faceted.Query[this.wid];elements=elements?elements:[];jQuery.each(elements, function(){var label=this.toString();if(label.length>0){var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+widget.wid+'_'+label);link.attr('title','Remove '+label+' filter');link.click(function(evt){widget.criteria_remove(label);return false});html.append(link);html.append('<span>'+label+'</span>')}});return html},criteria_remove: function(value){jQuery('#'+this.wid).val('');if(!value){this.selected=[];this.do_query();return}
jQuery('#'+this.wid+'_place_current',this.widget).attr('checked',true);var element=jQuery('input[type=text]',this.widget);var current=Faceted.Query[this.wid];var index=jQuery.inArray(value,current);if(index==-1){return}
current.splice(index,1);Faceted.Query[this.wid]=current;this.do_query(element)}};Faceted.initializeTextWidget=function(evt){jQuery('div.faceted-text-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.TextWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeTextWidget)});

/* - ++resource++eea.facetednavigation.widgets.daterange.view.js - */
Faceted.DateRangeWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.start=jQuery('input[name=start]',this.widget);this.end=jQuery('input[name=end]',this.widget);this.selected=[];var start=this.start.val();var end=this.end.val();if(start&&end){this.selected=[this.start,this.end];Faceted.Query[this.wid]=[start,end]}
var js_widget=this;this.start.datepicker({changeMonth:true,changeYear:true,dateFormat:'yy-mm-dd',onSelect: function(date,cal){js_widget.select_change(js_widget.start)}});this.end.datepicker({changeMonth:true,changeYear:true,dateFormat:'yy-mm-dd',onSelect: function(date,cal){js_widget.select_change(js_widget.end)}});jQuery('form',this.widget).submit(function(){return false});jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()})};Faceted.DateRangeWidget.prototype={select_change: function(element){this.do_query(element)},do_query: function(element){var start=this.start.val();var end=this.end.val();if(!start||!end){this.selected=[];return false}
var value=[start,end];var start_date=new Date(start.replace(/-/g,'/'));var end_date=new Date(end.replace(/-/g,'/'));if(end_date<start_date){var msg='Invalid date range';Faceted.Form.raise_error(msg,this.wid+'_errors',[])}else{this.selected=[this.start,this.end];Faceted.Form.clear_errors(this.wid+'_errors',[]);Faceted.Form.do_query(this.wid,value)}},reset: function(){this.selected=[];this.start.val('');this.end.val('')},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset();return false}
if(!value.length){this.reset();return false}
if(value.length<2){this.reset();return false}
var start=value[0];var end=value[1];var start_date=new Date(start.replace(/-/g,'/'));var end_date=new Date(end.replace(/-/g,'/'));if(!start_date.getFullYear()){this.reset();return false}
if(!end_date.getFullYear()){this.reset();return false}
this.start.val(start);this.end.val(end);this.selected=[this.start,this.end]},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var widget=this;var html=jQuery('<dd>');var start=this.start.val();var end=this.end.val();var start_date=new Date(start.replace(/-/g,'/'));var end_date=new Date(end.replace(/-/g,'/'));var label=start_date.toDateString()+' - '+end_date.toDateString();var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid+'_');link.attr('title','Remove '+label+' filter');link.click(function(evt){widget.criteria_remove();return false});html.append(link);html.append('<span>'+label+'</span>');return html},criteria_remove: function(){this.reset();return Faceted.Form.do_query(this.wid,[])}};Faceted.initializeDateRangeWidget=function(evt){jQuery('div.faceted-daterange-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.DateRangeWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeDateRangeWidget)});

/* - ++resource++eea.facetednavigation.widgets.alphabets.view.js - */
Faceted.AlphabeticalWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.letters=jQuery('#'+wid+' span');this.selected=[];this.version='';var version=jQuery('#faceted-version');if(version){this.version=version.text()}
var selected=jQuery('.faceted_letter_selected');if(selected.length){Faceted.Query[this.wid]=[selected.attr('id').split('-')[1]];this.synchronize()}
var js_widget=this;this.letters.click(function(evt){js_widget.letter_click(this,evt)});jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()});if(this.widget.hasClass('faceted-count')){jQuery(Faceted.Events).bind(Faceted.Events.QUERY_INITIALIZED, function(evt){js_widget.count()});jQuery(Faceted.Events).bind(Faceted.Events.FORM_DO_QUERY, function(evt,data){if(data.wid==js_widget.wid||data.wid=='b_start'){return}
js_widget.count()})}};Faceted.AlphabeticalWidget.prototype={letter_click: function(letter,evt){this.do_query(letter)},letter_unselect: function(letter){jQuery(letter).removeClass('faceted_letter_selected');this.selected=[]},letter_select: function(letter){this.letter_unselect(this.letters);jQuery(letter).addClass('faceted_letter_selected');if(jQuery(letter).attr('id').split('-')[1]!='all'){this.selected=[letter]}},do_query: function(letter){var value=jQuery(letter).attr('id').split('-')[1];var selected_value='';if(this.selected.length){selected_value=jQuery(this.selected[0]).attr('id').split('-')[1]}
if(value==selected_value){this.letter_select(jQuery('#'+this.wid+'-all'),this.widget);value=[]}else{this.letter_select(letter)}
Faceted.Form.do_query(this.wid,value)},reset: function(){this.letter_select(jQuery('#'+this.wid+'-all',this.widget))},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset()}else{var letter=jQuery('#'+this.wid+'-'+value[0]);if(letter.length){this.letter_select(letter[0])}else{this.reset()}}},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove(this,evt);return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var label=jQuery(this.selected[0]).attr('id').split('-')[1];var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid+'_'+label);link.attr('title','Remove '+label+' filter');var widget=this;link.click(function(evt){widget.criteria_remove(this,evt);return false});var html=jQuery('<dd>');html.append(link);html.append('<span>'+label+'</span>');return html},criteria_remove: function(element,evt){this.do_query(this.selected[0])},count: function(){var query=Faceted.SortedQuery();query.cid=this.wid;if(this.version){query.version=this.version}
var context=this;jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_START,{wid:context.wid});jQuery.getJSON(Faceted.BASEURL+'@@faceted_counter',query, function(data){context.count_update(data);jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_STOP,{wid:context.wid})})},count_update: function(data){var context=this;context.letters.each(function(){var letter=jQuery(this);letter.removeClass('faceted-alphabetic-letter-disabled');letter.unbind();var key=letter.attr('id').split('-')[1];var value=data[key];value=value?value:0;letter.attr('title',value);if(!value){letter.addClass('faceted-alphabetic-letter-disabled')}else{letter.click(function(evt){context.letter_click(this,evt)})}})}};Faceted.initializeAlphabeticalWidget=function(evt){jQuery('div.faceted-alphabetic-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.AlphabeticalWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeAlphabeticalWidget)});

/* - ++resource++eea.facetednavigation.widgets.tagscloud.view.js - */
Faceted.TagsCloudWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.tags=jQuery('li',this.widget);this.faceted_count=this.widget.hasClass('faceted-count');this.selected=[];this.version='';var version=jQuery('#faceted-version');if(version){this.version=version.text()}
this.config={};this.initialize();var selected=jQuery('.faceted-tag-selected',this.widget);if(selected.length){var value=selected.attr('id').replace(this.wid,'');value=value.replace(/_-_/g,' ');Faceted.Query[this.wid]=[value];this.synchronize()}
var js_widget=this;this.tags.click(function(evt){js_widget.tag_click(this,evt)});jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()});jQuery(Faceted.Events).bind(Faceted.Events.QUERY_INITIALIZED, function(evt){js_widget.count()});jQuery(Faceted.Events).bind(Faceted.Events.FORM_DO_QUERY, function(evt,data){if(data.wid==js_widget.wid||data.wid=='b_start'){return}
js_widget.count()});jQuery(Faceted.Events).bind(Faceted.Events.WINDOW_WIDTH_CHANGED, function(evt,data){var width=js_widget.widget.width();jQuery('ul',js_widget.widget).width(width-30);js_widget.update()})};Faceted.TagsCloudWidget.prototype={initialize: function(){var cloud=jQuery('#'+this.wid+'-cloud',this.widget).text();cloud=cloud?cloud:'list';var sizemin=jQuery('#'+this.wid+'-sizemin',this.widget).text();sizemin=parseInt(sizemin,10);sizemin=sizemin?sizemin:10;var sizemax=jQuery('#'+this.wid+'-sizemax',this.widget).text();sizemax=parseInt(sizemax,10);sizemax=sizemax?sizemax:20;var colormin=jQuery('#'+this.wid+'-colormin',this.widget).text();var colormax=jQuery('#'+this.wid+'-colormax',this.widget).text();var height=jQuery('#'+this.wid+'-height',this.widget).text();height=parseInt(height,10);height=height?height:200;height=(cloud=='list')?'auto':height;this.config={type:cloud,sizemin:sizemin,sizemax:sizemax,height:height,colormin:colormin,colormax:colormax};this.update()},update: function(){jQuery('#'+this.wid,this.widget).tagcloud(this.config)},tag_click: function(tag,evt){this.do_query(tag)},unselect: function(tag){jQuery(tag).removeClass('faceted-tag-selected');this.selected=[]},select: function(tag){this.unselect(this.tags);jQuery(tag).addClass('faceted-tag-selected');if(jQuery(tag).attr('id').replace(this.wid,'')!='all'){this.selected=[tag]}},do_query: function(tag){var value=jQuery(tag).attr('id').replace(this.wid,'');value=value.replace(/_-_/g,' ');var selected_value='';if(this.selected.length){selected_value=jQuery(this.selected[0]).attr('id').replace(this.wid,'');selected_value=selected_value.replace(/_-_/g,' ')}
if(value==selected_value){this.select(jQuery('#'+this.wid+'all',this.widget));value=[]}else{this.select(tag)}
Faceted.Form.do_query(this.wid,value)},reset: function(){this.select(jQuery('#'+this.wid+'all',this.widget))},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset()}else{value=value[0].replace(/ /g,'_-_');var tag=jQuery('#'+this.wid+value,this.widget);if(tag.length){this.select(tag[0])}}},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove(this,evt);return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var tag_id=jQuery(this.selected[0]).attr('id');var label=jQuery(this.selected[0]).attr('title');var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+tag_id);link.attr('title','Remove '+label+' filter');var widget=this;link.click(function(evt){widget.criteria_remove(this,evt);return false});var html=jQuery('<dd>');html.append(link);html.append('<span>'+label+'</span>');return html},criteria_remove: function(tag,evt){this.do_query(this.selected[0])},count: function(){var query=Faceted.SortedQuery();query.cid=this.wid;if(this.version){query.version=this.version}
var context=this;jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_START,{wid:context.wid});jQuery.get(Faceted.BASEURL+'@@tagscloud_counter',query, function(data){context.count_update(data);jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_STOP,{wid:context.wid})})},count_update: function(data){var js_widget=this;var all_id=js_widget.wid+'all';var fieldset=jQuery('fieldset',jQuery(data));js_widget.widget.html(fieldset);var min=10000;jQuery('li',js_widget.widget).each(function(){var tag=jQuery(this);var val=tag.attr('value');val=parseInt(val,10);if(val<min&&val>0){min=val}});var all_tag=jQuery('#'+all_id,js_widget.widget);var all=all_tag.attr('value');all_tag.attr('value',min);js_widget.tags=jQuery('li',this.widget);js_widget.tags.click(function(evt){js_widget.tag_click(this,evt)});if(!js_widget.faceted_count){js_widget.update();return}
js_widget.tags.each(function(){var tag=jQuery(this);var html=tag.text();var value=parseInt(tag.attr('value'),10);if(tag.attr('id')==all_id){value=all}else{value-=1}
html=html.replace(/\s\(\d+\)/,'');html+=' ('+value+')';tag.html(html);tag.unbind();if((tag.attr('value')===1)&&(tag.attr('id')!=all_id)){tag.addClass('faceted-tag-disabled')}else{tag.removeClass('faceted-tag-disabled');tag.click(function(evt){js_widget.tag_click(this,evt)})}});js_widget.update()}};Faceted.initializeTagsCloudWidget=function(evt){jQuery('div.faceted-tagscloud-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.TagsCloudWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeTagsCloudWidget)});

/* - ++resource++Products.EEAContentTypes.faceted.themes.view.js - */


/* - ++resource++eea.facetednavigation.widgets.debug.view.js - */
Faceted.DebugWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.query_area=jQuery('dd.debug-query pre',this.widget);this.after_area=jQuery('dd.debug-after pre',this.widget);this.config_area=jQuery('dd.debug-config pre',this.widget);this.count_area=jQuery('dd.debug-count pre',this.widget);jQuery('dd',this.widget).hide();jQuery('dt',this.widget).each(function(){var dt=jQuery(this);var css=dt.attr('class');var parent=dt.parent('dl');var minmax=jQuery('<span>').addClass('ui-icon ui-icon-plus').css('float','left');minmax.click(function(){var button=jQuery(this);jQuery('dd.'+css,parent).toggle();if(button.hasClass('ui-icon-minus')){button.removeClass('ui-icon-minus');button.addClass('ui-icon-plus')}else{button.removeClass('ui-icon-plus');button.addClass('ui-icon-minus')}});dt.prepend(minmax)});var js_widget=this;jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()})};Faceted.DebugWidget.prototype={synchronize: function(){var context=this;var query=jQuery.extend({},Faceted.Query);query['debugger']=this.wid;jQuery.get(Faceted.BASEURL+'@@faceted.widget.debug.query',query, function(data){if(data=="[]"){jQuery('.debug-query',context.widget).hide()}else{jQuery('dt.debug-query',context.widget).show()}
context.query_area.text(data)});jQuery.get(Faceted.BASEURL+'@@faceted.widget.debug.after',query, function(data){if(data=="[]"){jQuery('.debug-after',context.widget).hide()}else{jQuery('dt.debug-after',context.widget).show()}
context.after_area.text(data)});jQuery.get(Faceted.BASEURL+'@@faceted.widget.debug.criteria',query, function(data){if(data=="[]"){jQuery('.debug-config',context.widget).hide()}else{jQuery('dt.debug-config',context.widget).show()}
context.config_area.text(data)});jQuery.get(Faceted.BASEURL+'@@faceted.widget.debug.counters',query, function(data){if(data=="[]"){jQuery('.debug-count',context.widget).hide()}else{jQuery('dt.debug-count',context.widget).show()}
context.count_area.text(data)})},criteria: function(){return []}};Faceted.initializeDebugWidget=function(evt){jQuery('div.faceted-debug-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.DebugWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeDebugWidget)});

/* - ++resource++eea.facetednavigation.widgets.radio.view.js - */
Faceted.RadioWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.fieldset=jQuery('.widget-fieldset',this.widget);this.title=jQuery('legend',this.widget).html();this.elements=jQuery('input[type=radio]',this.widget);this.maxitems=parseInt(jQuery('span',this.widget).text(),10);this.selected=[];this.version='';var version=jQuery('#faceted-version');if(version){this.version=version.text()}
jQuery('form',this.widget).submit(function(){return false});var js_widget=this;this.elements.click(function(evt){js_widget.radio_click(this,evt)});var selected=jQuery('input[type=radio]:checked',this.widget);if(selected.length){this.selected=selected;Faceted.Query[this.wid]=[this.selected.val()]}
jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(){js_widget.reset()});if(this.widget.hasClass('faceted-count')){jQuery(Faceted.Events).bind(Faceted.Events.QUERY_INITIALIZED, function(evt){js_widget.count()});jQuery(Faceted.Events).bind(Faceted.Events.FORM_DO_QUERY, function(evt,data){if(data.wid==js_widget.wid||data.wid=='b_start'){return}
js_widget.count()})}
if(this.maxitems){this.fieldset.collapsible({maxitems:this.maxitems,elements:'li:not(.faceted-radio-item-zerocount)'})}};Faceted.RadioWidget.prototype={radio_click: function(element,evt){if(!jQuery(element).val()){element=null}
this.do_query(element)},do_query: function(element){if(!element){this.selected=[];return Faceted.Form.do_query(this.wid,[])}else{this.selected=[element];var value=jQuery(this.selected[0]).val();return Faceted.Form.do_query(this.wid,value)}},reset: function(){jQuery(this.elements[0]).attr('checked',true);this.selected=[]},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset();return}
var context=this;if(typeof value!='object'){value=[value]}
jQuery.each(value, function(){var radio=jQuery('#'+context.wid+'_widget input[type=radio][value='+this+']');if(!radio.length){context.reset()}else{context.selected=radio;context.selected.attr('checked',true)}})},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var widget=this;var html=jQuery('<dd>');var element=jQuery(this.selected);var id=element.attr('id');var label=jQuery('label[for='+id+']');var title=label.attr('title');label=label.html();var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+id);link.attr('title','Remove '+title+' filter');link.click(function(evt){widget.criteria_remove();return false});html.append(link);html.append('<span>'+label+'</span>');return html},criteria_remove: function(){var element=jQuery(this.elements[0]);element.attr('checked',true);this.do_query()},count: function(){var query=Faceted.SortedQuery();query.cid=this.wid;if(this.version){query.version=this.version}
var context=this;jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_START,{wid:context.wid});jQuery.getJSON(Faceted.BASEURL+'@@faceted_counter',query, function(data){context.count_update(data);jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_STOP,{wid:context.wid})})},count_update: function(data){var context=this;var lis=jQuery('li',context.widget);jQuery(lis).each(function(){var li=jQuery(this);li.removeClass('faceted-radio-item-disabled');li.removeClass('faceted-radio-item-zerocount');var input=jQuery('input',li);input.unbind();var key=input.val();var span=jQuery('span',li);if(!span.length){li.append(jQuery('<span>'));span=jQuery('span',li)}
var value=data[key];value=value?value:0;span.text('('+value+')');if(!value){li.addClass('faceted-radio-item-disabled');if(context.widget.hasClass('faceted-zero-count-hidden')){li.addClass('faceted-radio-item-zerocount')}
input.attr('disabled','disabled')}else{input.attr('disabled',false);input.click(function(evt){context.radio_click(this,evt)})}});context.fieldset.trigger('widget-refresh')}};Faceted.initializeRadioWidget=function(evt){jQuery('div.faceted-radio-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.RadioWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeRadioWidget)});

/* - ++resource++eea.facetednavigation.widgets.select.view.js - */
Faceted.SelectWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+this.wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.elements=jQuery('option',this.widget);this.select=jQuery('#'+this.wid);this.selected=[];this.version='';var version=jQuery('#faceted-version');if(version){this.version=version.text()}
jQuery('form',this.widget).submit(function(){return false});var js_widget=this;this.select.change(function(evt){js_widget.select_change(this,evt)});var value=this.select.val();if(value){this.selected=jQuery('option[value='+value+']',js_widget.widget);Faceted.Query[this.wid]=[value]}
jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()});if(this.widget.hasClass('faceted-count')){jQuery(Faceted.Events).bind(Faceted.Events.QUERY_INITIALIZED, function(evt){js_widget.count()});jQuery(Faceted.Events).bind(Faceted.Events.FORM_DO_QUERY, function(evt,data){if(data.wid==js_widget.wid||data.wid=='b_start'){return}
js_widget.count()})}};Faceted.SelectWidget.prototype={select_change: function(element,evt){if(!jQuery(element).val()){element=null}
this.do_query(element)},do_query: function(element){if(!element){this.selected=[];return Faceted.Form.do_query(this.wid,[])}else{var value=jQuery(element).val();this.selected=jQuery('#'+this.wid+'_widget option[value='+value+']');return Faceted.Form.do_query(this.wid,value)}},reset: function(){this.select.val("");this.selected=[]},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset();return}
var context=this;jQuery.each(value, function(){var selected=jQuery('option[value='+value+']',context.widget);if(!selected.length){context.reset()}else{context.selected=selected;context.select.val(value)}})},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var widget=this;var html=jQuery('<dd>');var element=jQuery(this.selected);var value=element.val();var label=element.attr('title');var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid+'_'+value);link.attr('title','Remove '+label+' filter');link.click(function(evt){widget.criteria_remove();return false});html.append(link);html.append('<span>'+label+'</span>');return html},criteria_remove: function(){this.select.val('');this.do_query()},count: function(){var query=Faceted.SortedQuery();query.cid=this.wid;if(this.version){query.version=this.version}
var context=this;jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_START,{wid:context.wid});jQuery.getJSON(Faceted.BASEURL+'@@faceted_counter',query, function(data){context.count_update(data);jQuery(Faceted.Events).trigger(Faceted.Events.AJAX_STOP,{wid:context.wid})})},count_update: function(data){var context=this;var options=jQuery('option',context.widget);jQuery(options).each(function(){var option=jQuery(this);option.removeClass('faceted-select-item-disabled');option.attr('disabled',false);var key=option.val();var value=data[key];value=value?value:0;var option_txt=option.attr('title');option_txt+=' ('+value+')';option.html(option_txt);if(!value){option.attr('disabled','disabled');option.addClass('faceted-select-item-disabled')}})}};Faceted.initializeSelectWidget=function(evt){jQuery('div.faceted-select-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.SelectWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeSelectWidget)});

/* - ++resource++eea.facetednavigation.widgets.criteria.view.js - */
Faceted.CriteriaWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.area=jQuery('#'+wid);this.reset_button=jQuery('#'+wid+'_reset');this.toggle_button=jQuery('.faceted-criteria-hide-show',this.widget);this.toggle_button_count=jQuery('.faceted-criteria-count',this.toggle_button);var js_widget=this;this.reset_button.click(function(evt){js_widget.reset_click(this,evt);return false});var toggle_buttons=jQuery('a',this.toggle_button);toggle_buttons.click(function(evt){js_widget.toggle_button_click(this,evt);return false});js_widget.initialize_syndication();jQuery(Faceted.Events).bind(Faceted.Events.AJAX_QUERY_START, function(evt){return js_widget.update()});jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){return js_widget.update_syndication()});jQuery(toggle_buttons[0]).click()};Faceted.CriteriaWidget.prototype={reset_click: function(element,evt){jQuery(Faceted.Events).trigger(Faceted.Events.RESET);this.do_query()},toggle_button_click: function(element,evt){this.area.toggle('blind');jQuery('a',this.toggle_button).toggle();this.toggle_button_count.toggle()},do_query: function(wid,value){Faceted.Form.do_query(wid,value)},update: function(){var context=this;var empty=true;context.widget.fadeOut('fast', function(){context.area.empty();jQuery.each(Faceted.Query, function(key){var widget=Faceted.Widgets[key];if(!widget){return}
var criteria=widget.criteria();jQuery.each(criteria, function(){context.area.append(this);empty=false})});var count=jQuery('dd span',context.area).length;context.toggle_button_count.text('('+count+')');if(!empty){context.widget.fadeIn('fast')}})},criteria: function(){return []},initialize_syndication: function(){this.rss=null;this.rss_href='';this.skos=null;this.skos_href='';var icon=null;var rss=jQuery('a:has(img#icon-rss2)');if(rss.length){rss=jQuery(rss[0]).clone();icon=jQuery('img',rss);icon.attr('id',icon.attr('id')+'-'+this.wid);rss.addClass('faceted-criteria-syndication-rss');rss.attr('id',this.wid+'syndication-rss');jQuery('.faceted-criteria-reset',this.widget).prepend(rss);this.rss=jQuery('#'+this.wid+'syndication-rss',this.widget);this.rss_href=rss.attr('href')}
var skos=jQuery('a:has(img#icon-skos)');if(skos.length){skos=jQuery(skos[0]).clone();icon=jQuery('img',skos);icon.attr('id',icon.attr('id')+'-'+this.wid);skos.addClass('faceted-criteria-syndication-skos');skos.attr('id',this.wid+'syndication-skos');jQuery('.faceted-criteria-reset',this.widget).prepend(skos);this.skos=jQuery('#'+this.wid+'syndication-skos',this.widget);this.skos_href=this.skos.attr('href')}},update_syndication: function(){var hash='ajax=True&';hash+=Faceted.URLHandler.document_hash();if(this.rss){this.rss.attr('href',this.rss_href+'?'+hash)}
if(this.skos){this.skos.attr('href',this.skos_href+'?'+hash)}}};Faceted.initializeCriteriaWidget=function(evt){jQuery('div.faceted-criteria-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.CriteriaWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeCriteriaWidget)});

/* - ++resource++eea.facetednavigation.widgets.date.view.js - */
Faceted.DateWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.select_from=jQuery('select[name=from]',this.widget);this.select_to=jQuery('select[name=to]',this.widget);this.select_from.hide();this.select_to.hide();var js_widget=this;this.slider=jQuery('select',this.widget).selectToUISlider({labels:2,labelSrc:'text',sliderOptions:{change: function(){js_widget.change()}}});jQuery('span.ui-slider-label',this.widget).each(function(i){if(i!==11){return}
var span=jQuery(this);span.addClass('ui-slider-label-show')});this.selected=[];var from=this.select_from.val();var to=this.select_to.val();if((from!=='now-past')||(to!=='now_future')){this.selected=[this.select_from,this.select_to];Faceted.Query[this.wid]=[from,to]}
jQuery('form',this.widget).submit(function(){return false});jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset_ui()})};Faceted.DateWidget.prototype={change: function(){var from=this.select_from.val();var to=this.select_to.val();if(from==='now-past'&&to==='now_future'){this.reset();Faceted.Form.do_query(this.wid,[])}else{this.do_query()}},do_query: function(){var value=[this.select_from.val(),this.select_to.val()];this.selected=[this.select_from,this.select_to];Faceted.Form.do_query(this.wid,value)},reset: function(){this.selected=[];this.select_from.val('now-past');this.select_to.val('now_future')},reset_ui: function(){this.reset();this.select_from.trigger('change');this.select_to.trigger('change')},synchronize: function(){var q_value=Faceted.Query[this.wid];if(!q_value){this.reset_ui();return}
if(!q_value.length){this.reset_ui();return}
if(q_value.length<2){this.reset_ui();return}
this.select_from.val(q_value[0]);this.select_to.val(q_value[1])},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var from=jQuery('option:selected',this.select_from).text();var to=jQuery('option:selected',this.select_to).text();var label=from+' - '+to;var widget=this;var html=jQuery('<dd>');var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid+'_');link.attr('title','Remove '+label+' filter');link.click(function(evt){widget.criteria_remove();return false});html.append(link);html.append('<span>'+label+'</span>');return html},criteria_remove: function(){this.reset_ui();return Faceted.Form.do_query(this.wid,[])}};Faceted.initializeDateWidget=function(evt){jQuery('div.faceted-date-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.DateWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeDateWidget)});

/* - ++resource++eea.facetednavigation.widgets.resultsperpage.view.js - */
Faceted.ResultsPerPageWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+this.wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.elements=jQuery('option',this.widget);this.select=jQuery('#'+this.wid);this.selected=[];jQuery('form',this.widget).submit(function(){return false});var js_widget=this;this.select.change(function(evt){js_widget.select_change(this,evt)});var value=this.select.val();if(value){this.selected=jQuery('option[value='+value+']',this.widget);Faceted.Query[this.wid]=[value]}
jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()})};Faceted.ResultsPerPageWidget.prototype={select_change: function(element,evt){if(!jQuery(element).val()){element=null}
this.do_query(element)},do_query: function(element){if(!element){this.selected=[];return Faceted.Form.do_query(this.wid,[])}else{var value=jQuery(element).val();this.selected=jQuery('#'+this.wid+'_widget option[value='+value+']');return Faceted.Form.do_query(this.wid,value)}},reset: function(){this.select.val("");this.selected=[]},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset();return}
var context=this;jQuery.each(value, function(){var selected=jQuery('#'+context.wid+'_widget option[value='+value+']');if(!selected.length){context.reset()}else{context.selected=selected;context.select.val(value)}})},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var widget=this;var html=jQuery('<dd>');var element=jQuery(this.selected);var value=element.val();var label=element.html();var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid+'_'+value);link.attr('title','Remove '+label+' filter');link.click(function(evt){widget.criteria_remove();return false});html.append(link);html.append('<span>'+label+'</span>');return html},criteria_remove: function(){this.select.val('');this.do_query()}};Faceted.initializeResultsPerPageWidget=function(evt){jQuery('div.faceted-resultsperpage-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.ResultsPerPageWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializeResultsPerPageWidget)});

/* - ++resource++eea.facetednavigation.widgets.path.tree.js - */
var FacetedTree={version:'2.0'};FacetedTree.Events={};FacetedTree.Events.CHANGED='FACETEDTREE-CHANGED';FacetedTree.Events.AJAX_START='FACETEDTREE-AJAX-START';FacetedTree.Events.AJAX_STOP='FACETEDTREE-AJAX-STOP';FacetedTree.JsTree=function(wid,container,mode){this.BASEURL='';if(window.Faceted){this.BASEURL=Faceted.BASEURL}
this.wid=wid;this.mode=mode||'view';this.input=jQuery('#'+wid,container);this.input.attr('readonly','readonly');this.theme=jQuery('#'+wid+'-theme',container);this.area=jQuery('<div>');this.area.addClass('tree');this.area.text('Loading...');this.area.hide();this.area.width(this.input.width());this.input.after(this.area);var js_tree=this;this.input.click(function(evt){js_tree.show()});jQuery(document).click(function(e){var target=jQuery(e.target);if(target.is('#'+js_tree.input.attr('id'))){return}
var parent=target.parents('#'+js_tree.area.attr('id'));if(parent.length){return}
js_tree.hide()});jQuery(document).keydown(function(e){if(e.keyCode==27){js_tree.hide()}});var query={};query.cid=this.wid;query.mode=this.mode;jQuery(FacetedTree.Events).trigger(FacetedTree.Events.AJAX_START,{msg:'Loading ...'});jQuery.getJSON(js_tree.BASEURL+'@@faceted.path.tree.json',query, function(data){if(data.length){js_tree.initialize(data)}else{if(mode=='edit'){jQuery('form',container).hide();jQuery('div.faceted-path-errors',container).show()}else{jQuery('.faceted-widget:has(div.faceted-path-errors)').remove();jQuery(Faceted.Events).trigger(Faceted.Events.REDRAW)}}
jQuery(FacetedTree.Events).trigger(FacetedTree.Events.AJAX_STOP,{msg:data})})};FacetedTree.JsTree.prototype={initialize: function(static_tree){var js_tree=this;js_tree.area.tree({ui:{theme_name:js_tree.theme.attr('title'),theme_path:js_tree.theme.text()},types:{"default":{clickable:true,renameable:false,deletable:false,creatable:false,draggable:false}},data:{type:'json',async:true,opts:{method:'POST',url:js_tree.BASEURL+'@@faceted.path.tree.json'}},callback:{beforedata: function(node,tree){if(node===false){tree.settings.data.opts['static']=static_tree;return}
tree.settings.data.opts['static']=false;var data={cid:js_tree.wid};data.mode=js_tree.mode;if(node){data.path=node.attr('path')}
return data},onselect: function(node,tree){js_tree.change(node,tree)}}})},show: function(){this.area.show()},hide: function(){this.area.hide()},change: function(node,tree){this.hide();node=jQuery(node);var value=node.attr('path');if(this.input.val()==value){value=''}
this.input.val(value);jQuery(FacetedTree.Events).trigger(FacetedTree.Events.CHANGED,{path:value})}};

/* - ++resource++eea.facetednavigation.widgets.path.view.js - */
Faceted.PathWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();this.title=jQuery('legend',this.widget).html();this.input=jQuery('input',this.widget);this.breadcrumbs=jQuery('<dd>');this.selected=[];var value=this.input.val();if(value){this.selected=this.input;Faceted.Query[this.wid]=[value]}
var tree=new FacetedTree.JsTree(this.wid,this.widget);var js_widget=this;jQuery('form',this.widget).submit(function(){return false});jQuery(FacetedTree.Events).bind(FacetedTree.Events.CHANGED, function(data){js_widget.text_change(js_widget.input)});jQuery(Faceted.Events).bind(Faceted.Events.QUERY_CHANGED, function(evt){js_widget.synchronize()});jQuery(Faceted.Events).bind(Faceted.Events.RESET, function(evt){js_widget.reset()})};Faceted.PathWidget.prototype={text_change: function(element,evt){this.do_query(element)},do_query: function(element){var value=this.input.val();value=value?[value]:[];if(!element){this.selected=[];return Faceted.Form.do_query(this.wid,[])}
this.selected=[this.input];return Faceted.Form.do_query(this.wid,value)},reset: function(){this.selected=[];this.input.val('')},synchronize: function(){var value=Faceted.Query[this.wid];if(!value){this.reset();return}
this.selected=[this.input]},criteria: function(){var html=[];var title=this.criteria_title();var body=this.criteria_body();if(title){html.push(title)}
if(body){html.push(body)}
return html},criteria_title: function(){if(!this.selected.length){return ''}
var link=jQuery('<a href="#">[X]</a>');link.attr('id','criteria_'+this.wid);link.attr('title','Remove '+this.title+' filters');var widget=this;link.click(function(evt){widget.criteria_remove();return false});var html=jQuery('<dt>');html.append(link);html.append('<span>'+this.title+'</span>');return html},criteria_body: function(){if(!this.selected.length){return ''}
var js_widget=this;js_widget.breadcrumbs.text('Loading...');var query={};query.path=js_widget.input.val();query.cid=js_widget.wid;jQuery.getJSON(Faceted.BASEURL+'@@faceted.path.breadcrumbs.json',query, function(data){js_widget.breadcrumbs.empty();jQuery.each(data, function(){js_widget.breadcrumbs.append(jQuery('<span>').html('&raquo;'));var a=jQuery('<a>');a.attr('href',this.url);a.attr('title',this.title);a.text(this.title);a.click(function(){var path=jQuery(this).attr('href');js_widget.input.val(path);jQuery(FacetedTree.Events).trigger(FacetedTree.Events.CHANGED,{path:path});return false});js_widget.breadcrumbs.append(a)})});return js_widget.breadcrumbs},criteria_remove: function(){this.selected=[];this.input.val('');this.do_query()}};Faceted.initializePathWidget=function(evt){jQuery('div.faceted-path-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];Faceted.Widgets[wid]=new Faceted.PathWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializePathWidget)});

/* - ++resource++eea.facetednavigation.widgets.portlet.view.js - */
Faceted.PortletWidget=function(wid){this.wid=wid;this.widget=jQuery('#'+wid+'_widget');this.widget.show();jQuery('legend',this.widget).hide();jQuery('fieldset',this.widget).css('border','none');jQuery('form',this.widget).submit(function(){return true})};Faceted.initializePortletWidget=function(evt){jQuery('div.faceted-portlet-widget').each(function(){var wid=jQuery(this).attr('id');wid=wid.split('_')[0];var widget=new Faceted.PortletWidget(wid)})};jQuery(document).ready(function(){jQuery(Faceted.Events).bind(Faceted.Events.INITIALIZE,Faceted.initializePortletWidget)});

/* - ++resource++eea.dataservice.facetednavigation.dataservice.view.js - */

