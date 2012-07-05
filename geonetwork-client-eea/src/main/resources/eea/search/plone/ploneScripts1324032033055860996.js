
/* - accessibility.js - */
// http://www.eea.europa.eu/portal_javascripts/accessibility.js?original=1
function setBaseFontSize(f,r){var b=jQuery('body');if(r){b.removeClass('smallText').removeClass('largeText');createCookie("fontsize",f,365)}b.addClass(f)}jQuery(function($){var f=readCookie("fontsize");if(f){setBaseFontSize(f,0)}});
