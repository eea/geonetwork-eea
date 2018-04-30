
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - orderablereference.js - */
function oref_top(obj) { /*updated from version 1.2*/
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var elements = new Array();
	for (var i=0; i<obj.length; i++) {
		if (obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=0; i<obj.length; i++) {
		if (!obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=0; i<obj.length; i++) {
		if (document.body.innerHTML) obj[i].innerHTML = elements[i][0];
		else obj[i].text = elements[i][0];
		obj[i].value = elements[i][1];
		obj[i].style.color = elements[i][2];
		obj[i].style.backgroundColor = elements[i][3];
		obj[i].className = elements[i][4];
		obj[i].id = elements[i][5];
		obj[i].selected = elements[i][6];
	}
}

function oref_bottom(obj) { /*updated from version 1.2*/
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var elements = new Array();
	for (var i=0; i<obj.length; i++) {
		if (!obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=0; i<obj.length; i++) {
		if (obj[i].selected) {
			elements[elements.length] = new Array((document.body.innerHTML ? obj[i].innerHTML : obj[i].text), obj[i].value, obj[i].style.color, obj[i].style.backgroundColor, obj[i].className, obj[i].id, obj[i].selected);
		}
	}
	for (i=obj.length-1; i>-1; i--) {
		if (document.body.innerHTML) obj[i].innerHTML = elements[i][0];
		else obj[i].text = elements[i][0];
		obj[i].value = elements[i][1];
		obj[i].style.color = elements[i][2];
		obj[i].style.backgroundColor = elements[i][3];
		obj[i].className = elements[i][4];
		obj[i].id = elements[i][5];
		obj[i].selected = elements[i][6];
	}
}

function oref_up(obj) { /*updated from version 1.2*/
	var obj_string = obj;
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var sel = new Array();
	for (var i=0; i<obj.length; i++) {
		if (obj[i].selected == true) {
			sel[sel.length] = i;
		}
	}
	for (i in sel) {
	    if (sel[i] != 0) {
			if (obj[sel[i]-1]) {
				if (!obj[sel[i]-1].selected) {
				var tmp = new Array((document.body.innerHTML ? obj[sel[i]-1].innerHTML : obj[sel[i]-1].text), obj[sel[i]-1].value, obj[sel[i]-1].style.color, obj[sel[i]-1].style.backgroundColor, obj[sel[i]-1].className, obj[sel[i]-1].id);
				if (document.body.innerHTML) obj[sel[i]-1].innerHTML = obj[sel[i]].innerHTML;
				else obj[sel[i]-1].text = obj[sel[i]].text;
				obj[sel[i]-1].value = obj[sel[i]].value;
				obj[sel[i]-1].style.color = obj[sel[i]].style.color;
				obj[sel[i]-1].style.backgroundColor = obj[sel[i]].style.backgroundColor;
				obj[sel[i]-1].className = obj[sel[i]].className;
				obj[sel[i]-1].id = obj[sel[i]].id;
				if (document.body.innerHTML) obj[sel[i]].innerHTML = tmp[0];
				else obj[sel[i]].text = tmp[0];
				obj[sel[i]].value = tmp[1];
				obj[sel[i]].style.color = tmp[2];
				obj[sel[i]].style.backgroundColor = tmp[3];
				obj[sel[i]].className = tmp[4];
				obj[sel[i]].id = tmp[5];
				obj[sel[i]-1].selected = true;
				obj[sel[i]].selected = false;
				}
			}
		}
	}
	inout_selectAllWords(obj_string);
}

function oref_down(obj) {
	var obj_string = obj;
	obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
	if (obj.tagName.toLowerCase() != "select" && obj.length < 2)
		return false;
	var sel = new Array();
	for (var i=obj.length-1; i>-1; i--) {
		if (obj[i].selected == true) {
			sel[sel.length] = i;
		}
	}
	for (i in sel) {
		if (sel[i] != obj.length-1) {
			if (obj[sel[i]+1]) {
				if (!obj[sel[i]+1].selected) {
					var tmp = new Array((document.body.innerHTML ? obj[sel[i]+1].innerHTML : obj[sel[i]+1].text), obj[sel[i]+1].value, obj[sel[i]+1].style.color, obj[sel[i]+1].style.backgroundColor, obj[sel[i]+1].className, obj[sel[i]+1].id);
					if (document.body.innerHTML) obj[sel[i]+1].innerHTML = obj[sel[i]].innerHTML;
					else obj[sel[i]+1].text = obj[sel[i]].text;
					obj[sel[i]+1].value = obj[sel[i]].value;
					obj[sel[i]+1].style.color = obj[sel[i]].style.color;
					obj[sel[i]+1].style.backgroundColor = obj[sel[i]].style.backgroundColor;
					obj[sel[i]+1].className = obj[sel[i]].className;
					obj[sel[i]+1].id = obj[sel[i]].id;
					if (document.body.innerHTML) obj[sel[i]].innerHTML = tmp[0];
					else obj[sel[i]].text = tmp[0];
					obj[sel[i]].value = tmp[1];
					obj[sel[i]].style.color = tmp[2];
					obj[sel[i]].style.backgroundColor = tmp[3];
					obj[sel[i]].className = tmp[4];
					obj[sel[i]].id = tmp[5];
					obj[sel[i]+1].selected = true;
					obj[sel[i]].selected = false;
				}
			}
		}
	}
	inout_selectAllWords(obj_string);
}


/* from in and out */
function inout_selectAllWords(theList) {
  myList = document.getElementById(theList);
  for (var x=0; x < myList.length; x++) {
    myList[x].selected="selected";
  }
}

function inout_addNewKeyword(toList, newText, newValue) {
  theToList=document.getElementById(toList);
  for (var x=0; x < theToList.length; x++) {
    if (theToList[x].text == newText) {
      return false;
    }
  }
  theLength = theToList.length;
  theToList[theLength] = new Option(newText);
  theToList[theLength].value = newValue;
}

function inout_moveKeywords(fromList,toList,selectThese) {
  theFromList=document.getElementById(fromList);
  for (var x=0; x < theFromList.length; x++) {
    if (theFromList[x].selected) {
      inout_addNewKeyword(toList, theFromList[x].text, theFromList[x].value);
    }
  }
  theToList=document.getElementById(fromList);
  for (var x=theToList.length-1; x >= 0 ; x--) {
    if (theToList[x].selected) {
      theToList[x] = null;
    }
  }
  inout_selectAllWords(selectThese);
}




/* - table_sorter.js - */
// https://www.eea.europa.eu/portal_javascripts/table_sorter.js?original=1
(function($){
function sortabledataclass(cell){var re,matches;re=new RegExp("sortabledata-([^ ]*)","g");matches=re.exec(cell.attr('class'));if(matches){return matches[1]}
else{return null}}
function sortable(cell){var text=sortabledataclass(cell);if(text===null){text=cell.text()}
if(text.charAt(4)!=='-'&&text.charAt(7)!=='-'&&!isNaN(parseFloat(text))){return parseFloat(text)}
return text.toLowerCase()}
function sort(){var th,colnum,table,tbody,reverse,index,data,usenumbers,tsorted;th=$(this).closest('th');colnum=$('th',$(this).closest('thead')).index(th);table=$(this).parents('table:first');tbody=table.find('tbody:first');tsorted=parseInt(table.attr('sorted')||'-1',10);reverse=tsorted===colnum;$(this).parent().find('th:not(.nosort) .sortdirection').html('&#x2003;');$(this).children('.sortdirection').html(reverse?'&#x25b2;':'&#x25bc;');index=$(this).parent().children('th').index(this),data=[],usenumbers=true;tbody.find('tr').each(function(){var cells,sortableitem;cells=$(this).children('td');sortableitem=sortable(cells.slice(index,index+1));if(isNaN(sortableitem)){usenumbers=false}
data.push([sortableitem,sortable(cells.slice(1,2)),sortable(cells.slice(0,1)),this])});if(data.length){if(usenumbers){data.sort(function(a,b){return a[0]-b[0]})} else{data.sort()}
if(reverse){data.reverse()}
table.attr('sorted',reverse?'':colnum);tbody.append($.map(data, function(a){return a[3]}));tbody.each(setoddeven)}}
function setoddeven(){var tbody=$(this);tbody.find('tr').removeClass('odd').removeClass('even').filter(':odd').addClass('even').end().filter(':even').addClass('odd')}
$(function(){var blankarrow=$('<span>&#x2003;</span>').addClass('sortdirection');$('table.listing:not(.nosort) thead th:not(.nosort)').append(blankarrow.clone()).css('cursor','pointer').click(sort);$('table.listing:not(.nosort) tbody').each(setoddeven)})})(jQuery);

/* - resolveuid.js - */
// https://www.eea.europa.eu/portal_javascripts/resolveuid.js?original=1
(function($){
function set_resolveuids(){$(".reviewHistory span:contains('uid:')").each(function(){var text=$(this).text();var uid_start=text.lastIndexOf("(uid:");var uid_end=text.lastIndexOf(")");var uid=text.slice(uid_start+5,uid_end);var msg=text.slice(0,uid_start);var base=$("base").attr('href')||document.baseURI||window.location.href.split("?")[0];var node=$("<a>").attr('href',base+'/resolveuid/'+uid).text("original");var div=$("<span>").text(msg);div.append(node);$(this).html(div)})}
$(document).ready(set_resolveuids)})(jQuery);

/* - accessibility.js - */
// https://www.eea.europa.eu/portal_javascripts/accessibility.js?original=1
function setBaseFontSize($fontsize,$reset){var $body=jQuery('body');if($reset){$body.removeClass('smallText').removeClass('largeText');createCookie("fontsize",$fontsize,365)}
$body.addClass($fontsize)}
jQuery(function($){var $fontsize=readCookie("fontsize");if($fontsize){setBaseFontSize($fontsize,0)}});

/* - ga.js - */
// https://www.eea.europa.eu/portal_javascripts/ga.js?original=1
var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-184389-1']);_gaq.push(['_setDomainName',"eea.europa.eu"]);_gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s)})();

/* - collapsibleformfields.js - */
/* This code collapses fields in forms
 * It is used in plone_forms/search_form.pt
 *
 * Creates a jQuery function to install a click handler that will
 * collapse/expand form fields.
 * On page load, runs it for $('.field.collapsible').
 *
 * It uses the following markup:
 *
 * <div class="collapsible'>
 *   <label class="collapser"> label of the field </label>
 *   <div class="collapse"> block to collapse </div>
 *  </div>
 *
 */


(function($) {

$.fn.do_search_collapse = function() {

    function check_used(element) {
        var e = $(element);

        // is there a number of checkboxs with a toggle box
        if (e.find('input[id$=_toggle]:checkbox').length > 0) {
            // and the toggle checkbox is not checked.
            if (e.find('input[id$=_toggle]:checkbox:checked').length === 0) {
                return true;
            }
        }

        // is there a normal text input fields that is not empty (=has a value)
        if(e.find(':text[value]').length > 0) {
            return true;
        }

        // drop downs
        // we have an option marked as the default option
        if(e.find('select .default_option').length > 0) {
            // and this default option isn't selected
            if(e.find('select .default_option:selected').length === 0) {
                return true;
            }
        }
        return false;
    }

    return this.each( function() {
        var indicator =  $(this).find('.collapser:first'),
            collapse = $(this).find('.collapse:first');

        // install click handler
        indicator.click(function() {
                var container = $(this).parent(),
                    target = container.find('.collapse:first');

                target.slideToggle('normal');
                $(this).toggleClass('expanded');
                $(this).toggleClass('collapsed');
            });

        if (check_used(this)) {
            indicator.addClass('expanded');
        } else {
            collapse.hide();
            indicator.addClass('collapsed');
        }
    });
};

jQuery(function($){$('.field.collapsible').do_search_collapse();});


}(jQuery));


/* - ++resource++plone.app.discussion.javascripts/comments.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++plone.app.discussion.javascripts/comments.js?original=1
(function($){$.createReplyForm=function(comment_div){var comment_id=comment_div.attr("id");var reply_button=comment_div.find(".reply-to-comment-button");var reply_div=$("#commenting").clone(true);reply_div.find("#formfield-form-widgets-captcha").find("script").remove();reply_div.appendTo(comment_div).css("display","none");reply_div.removeAttr("id");$(reply_button).css("display","none");var reply_form=reply_div.find("form");reply_form.find("input[name='form.widgets.in_reply_to']").val(comment_id);var cancel_reply_button=reply_div.find(".cancelreplytocomment");cancel_reply_button.attr("id",comment_id);reply_form.find("input[name='form.buttons.cancel']").css("display","inline");reply_div.slideDown("slow");cancel_reply_button.css("display","inline")};$.clearForm=function(form_div){form_div.find(".error").removeClass("error");form_div.find(".fieldErrorBox").remove();form_div.find("input[type='text']").attr("value","");form_div.find("textarea").attr("value","")};$(window).load(function(){var post_comment_div=$("#commenting");var in_reply_to_field=post_comment_div.find("input[name='form.widgets.in_reply_to']");if(in_reply_to_field.val()!==""){var current_reply_id="#"+in_reply_to_field.val();var current_reply_to_div=$(".discussion").find(current_reply_id);$.createReplyForm(current_reply_to_div);$.clearForm(post_comment_div)}
$(".reply-to-comment-button").bind("click", function(e){var comment_div=$(this).parents().filter(".comment");$.createReplyForm(comment_div);$.clearForm(comment_div)});$("#commenting #form-buttons-cancel").bind("click", function(e){e.preventDefault();var reply_to_comment_button=$(this).
parents().
filter(".comment").
find(".reply-to-comment-button");$.reply_to_comment_form=$(this).parents().filter(".reply");$.reply_to_comment_form.slideUp("slow", function(){$(this).remove()});reply_to_comment_button.css("display","inline")});$("input[name='form.button.PublishComment']").on('click', function(){var trigger=this;var form=$(this).parents("form");var data=$(form).serialize();var form_url=$(form).attr("action");$.ajax({type:"GET",url:form_url,data:data,context:trigger,success: function(msg){form.find("input[name='form.button.PublishComment']").remove();form.parents(".state-pending").toggleClass('state-pending').toggleClass('state-published')},error: function(msg){return true}});return false});$("input[name='form.button.DeleteComment']").on('click', function(){var trigger=this;var form=$(this).parents("form");var data=$(form).serialize();var form_url=$(form).attr("action");$.ajax({type:'POST',url:form_url,data:data,context:$(trigger).parents(".comment"),success: function(data){var comment=$(this);var clss=comment.attr('class');var treelevel=parseInt(clss[clss.indexOf('replyTreeLevel')+'replyTreeLevel'.length],10);var selector=".replyTreeLevel"+treelevel;for(var i=0;i<treelevel;i++){selector+=", .replyTreeLevel"+i}
comment.nextUntil(selector).each(function(){$(this).fadeOut('fast', function(){$(this).remove()})});$(this).fadeOut('fast', function(){$(this).remove()})},error: function(req,error){return true}});return false});$(".reply").find("input[name='form.buttons.reply']").css("display","none");$(".reply").find("input[name='form.buttons.cancel']").css("display","none");$(".reply-to-comment-button").css("display","inline")})}(jQuery));

/* - global_searchbox.js - */
// https://www.eea.europa.eu/portal_javascripts/global_searchbox.js?original=1
(function($){$(function(){var search_forms=$("#portal-searchbox, #visual-column-wrapper").find(".searchforms");var text_inputs=search_forms.find("input:text");text_inputs.each( function(){var search_label=this.title+"...";this.onfocus=function(){if(this.value==search_label){this.value=""}};this.onblur=function(){if(this.value===""){this.value=search_label}};this.value=search_label})})})(jQuery);

/* - popupforms.js - */
// https://www.eea.europa.eu/portal_javascripts/popupforms.js?original=1
var common_content_filter='#content>*:not(div.configlet),dl.portalMessage.error,dl.portalMessage.info';jQuery.extend(jQuery.tools.overlay.conf,{fixed:false,speed:'fast',mask:{color:'#fff',opacity:0.4,loadSpeed:0,closeSpeed:0}});(function($){$.plonepopups=$.plonepopups||{};$.extend($.plonepopups,{noformerrorshow: function noformerrorshow(el,noform){var o=$(el),emsg=o.find('dl.portalMessage.error');if(emsg.length){o.children().replaceWith(emsg);return false} else{return noform}},redirectbasehref: function redirectbasehref(el,responseText){var mo=responseText.match(/<base href="(\S+?)"/i);if(mo.length===2){return mo[1]}
return location}})})(jQuery);jQuery(function($){if(jQuery.browser.msie&&parseInt(jQuery.browser.version,10)<7){return}
$('#portal-personaltools a[href$="/login"], #portal-personaltools a[href$="/login_form"], .discussion a[href$="/login"], .discussion a[href$="/login_form"]').prepOverlay({subtype:'ajax',filter:common_content_filter,formselector:'form#login_form',cssclass:'overlay-login',noform: function(){if(location.href.search(/pwreset_finish$/)>=0){return 'redirect'} else{return 'reload'}},redirect: function(){var href=location.href;if(href.search(/pwreset_finish$/)>=0){return href.slice(0,href.length-14)+'logged_in'} else{return href}}});$('#siteaction-contact a').prepOverlay({subtype:'ajax',filter:common_content_filter,cssclass:'overlay-contact',formselector:'form[name="feedback_form"]',noform: function(el){return $.plonepopups.noformerrorshow(el,'close')}});$('#contextSetDefaultPage, #folderChangeDefaultPage').prepOverlay({subtype:'ajax',filter:common_content_filter,cssclass:'overlay-default_view',formselector:'form[name="default_page_form"]',noform: function(el){return $.plonepopups.noformerrorshow(el,'reload')},closeselector:'[name="form.button.Cancel"]',width:'40%'});$('dl#plone-contentmenu-actions a#plone-contentmenu-actions-delete').prepOverlay({subtype:'ajax',filter:common_content_filter,formselector:'#delete_confirmation',cssclass:'overlay-delete',noform: function(el){return $.plonepopups.noformerrorshow(el,'redirect')},redirect:$.plonepopups.redirectbasehref,closeselector:'[name="form.button.Cancel"]',width:'50%'});$('dl#plone-contentmenu-actions a#plone-contentmenu-actions-rename').prepOverlay({subtype:'ajax',filter:common_content_filter,cssclass:'overlay-rename',closeselector:'[name="form.button.Cancel"]',width:'40%'});$('dl#plone-contentmenu-factories a#plone-contentmenu-add-to-default-page').prepOverlay({subtype:'ajax',filter:common_content_filter,cssclass:'overlay-folder-factories',closeselector:'[name="form.button.Cancel"]',width:'40%'});$('#portal-personaltools a[href$="/@@register"]').prepOverlay({subtype:'ajax',filter:common_content_filter,cssclass:'overlay-register',formselector:'form.kssattr-formname-register'});$('form[name="users_add"], form[name="groups_add"]').prepOverlay({subtype:'ajax',filter:common_content_filter,cssclass:'overlay-users',formselector:'form.kssattr-formname-new-user, form[name="groups"]',noform: function(el){return $.plonepopups.noformerrorshow(el,'redirect')},redirect: function(){return location.href}});$('form[name="users_add"], form[name="groups_add"]').width($('input.add').outerWidth());$('form[name="users_add"] input.add, form[name="groups_add"] input.add').css('cursor','pointer');$('#content-history a').prepOverlay({subtype:'ajax',filter:'h2, #content-history',cssclass:'overlay-history',urlmatch:'@@historyview',urlreplace:'@@contenthistorypopup'})});

/* - design.js - */
// https://www.eea.europa.eu/portal_javascripts/design.js?original=1
jQuery(document).ready(function($){'use strict';var url_path_name=window.location.pathname;var $body=$("body");var ie;if($.browser){ie=$.browser.msie&&parseInt($.browser.version,10)} else{var nav=navigator.userAgent;ie=nav.indexOf('MSIE');ie<0?ie=false:ie=parseInt(nav.substring(ie+5,ie+7))}
var secondary_portaltabs=$("<ul id='secondary-portaltabs'></ul>"),global_nav=$('#portal-globalnav'),global_nav_children=global_nav.children(),secondary_nav_items=global_nav_children.slice(global_nav_children.length-3);secondary_nav_items.appendTo(secondary_portaltabs);secondary_portaltabs.appendTo(global_nav);$('.eea-tabs').find('li:last-child').addClass('last-child');var $popup_login=$("#popup_login_form");$("#anon-personalbar, #siteaction-login").click(function(e){$popup_login.slideToggle();e.preventDefault()});var $navigation_submenus=$(".portletSubMenuHeader");if($navigation_submenus&&$navigation_submenus.length<2){$navigation_submenus.hide()}
$('.js-adoptHeight').each(function(){var $el=$(arguments[1]);var $target_el=$($el.data('target-element'));$el.css('height',$target_el.outerHeight())});$(".attention, .caution, .danger, .error, .hint, .important, .note, .tip, .warning").addClass('eea-icon');$(document).ajaxComplete(function(event,xhr,settings){var url=settings.url.split('/');var method=url[url.length-1];var reset_methods=['@@googlechart.googledashboard.edit','@@googlechart.googledashboards.edit','@@googlechart.savepngchart','@@googlechart.setthumb','@@daviz.properties.edit'];if(reset_methods.indexOf(method)>-1){$.timeoutDialog.reset()}});try{$.timeoutDialog({delay:900000})}
catch(err){}
$(".required:contains('■')").addClass('no-bg');if($("#portlet-prefs").length){$("#portal-column-two").remove();$("#portal-column-content").removeClass('width-3:4').addClass('width-full')}
var r=/data-and-maps\/(figures|data)\/?$/;if(r.test(url_path_name)){$body.addClass('fullscreen');$('#icon-full_screen').parent().remove()}
var edit_bar=$("#edit-bar");var edit_translate=function(){var translating=$("#content").find('form').find('.hiddenStructure').text().indexOf('Translating');if(translating!==-1){edit_bar.closest('#portal-column-content')[0].className="cell width-full position-0"}};if(edit_bar){edit_translate()}
var $auto_related=$("#auto-related"),$prev=$auto_related.prev(),$dls=$auto_related.find('dl');if($dls.length){$auto_related.detach();$dls.each(function(idx,item){var $item=$(item),$dt=$item.find('dt');$item.find('.portletItem').each(function(idx,item){if(item.className.indexOf('embedded')===-1){$(item).insertAfter($dt)}})});$auto_related.insertAfter($prev)}
var toggleEcotipClass=function(){var ecotip=$('#portlet-ecotip'),action,bulb,led;if(ie&&ie<10){bulb=ecotip.find('.ecotip-bulb');led=ecotip.find('.led-bulb');action=function(){if($.fadeToggle){bulb.fadeToggle();led.fadeToggle()}
else{bulb.is(":visible")?bulb.fadeOut():bulb.fadeIn();led.is(":visible")?led.fadeOut():led.fadeIn()}}}
else{action=function(){ecotip.toggleClass('hover')}}
toggleEcotipClass=function(){return action()};return toggleEcotipClass()};toggleEcotipClass();window.setInterval(toggleEcotipClass,5000);
function themePromotionPortlets(top_news){var top_news_width=top_news.width();var margin=top_news_width * 0.012,w=Math.floor((top_news_width-5 * margin)/5);var promotions=top_news.find('.portlet-promotions');promotions.width(w);var last=promotions.last();promotions.not(last).css('marginRight',(Math.floor(margin)+3)+'px');last.css({'marginRight':'0px'})}
var top_news=$('#top-news-area');if(top_news.length){themePromotionPortlets(top_news)}
jQuery.fn.avoidMultipleClicks=function(options){var settings={timeout:3000,linkSelector:'a',linkCSS:'downloading',lockCSS:'downloading-lock'};if(options){jQuery.extend(settings,options)}
var self=this;return this.each(function(){self.find(settings.linkSelector).click(function(){var context=$(this);var oldCSS=context.attr('class');context.removeClass();context.addClass(settings.linkCSS);self.addClass(settings.lockCSS);setTimeout(function(){self.removeClass(settings.lockCSS);context.removeClass(settings.linkCSS);context.addClass(oldCSS)},settings.timeout)})})};$('.documentActions .action-items').avoidMultipleClicks();$('.documentExportActions').avoidMultipleClicks({linkSelector:'.eea-icon',linkCSS:'eea-icon eea-icon-3x eea-icon-download eea-icon-anim-burst animated'});var file_types=['pdf','gif','tif','png','zip','xls','eps','csv','tsv','exhibit','txt','doc','docx','xlsx','table'];
function check_file_type(tokens){var tokens_length=tokens.length;var rought_ext=tokens[tokens_length-1];var guess=rought_ext.split('/')[0];return file_types.indexOf(guess)===-1?'file':guess}
function extract_file_type(url,txt_contents){var url_tokens=url.split('.');var txt_tokens=txt_contents.trim().toLowerCase().split('.');var txt_tokes_outcome=check_file_type(txt_tokens);if(txt_tokes_outcome==='file'){return check_file_type(url_tokens)}
return txt_tokes_outcome}
var links=document.getElementsByTagName('a');
function match_download_links(links){var list=[];var links_length=links.length;var link,link_href;for(var i=0;i<links_length;i++){link=links[i];link_href=link.href;if(!link_href.match('eea.europa')){continue}
if(link_href.match("/download[.a-zA-Z]*")||link_href.match("at_download")||link_href.match("/download$")||link_href.match("ftp.eea.europa")){list.push(link)}}
return list}
var downloads_list=match_download_links(links);
function add_downloads_tracking_code(idx,el){el.onclick=function(){var text=el.textContent||el.innerText;var ftype=extract_file_type(el.href,text);var _gaq=window._gaq||[];var link=el.href;_gaq.push(['_trackEvent','Downloads',link,ftype])};return el}
$.each(downloads_list,add_downloads_tracking_code)});

/* - promotions.js - */
// https://www.eea.europa.eu/portal_javascripts/promotions.js?original=1
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
