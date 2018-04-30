
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - ++resource++eea.epub.js - */
// https://www.eea.europa.eu/portal_javascripts/++resource++eea.epub.js?original=1
if(window.EEA===undefined){var EEA={who:'eea.epub',version:'6.0'}}
EEA.ePub=function(context,options){var self=this;self.context=context;self.settings={};if(options){jQuery.extend(self.settings,options)}
self.initialize()};EEA.ePub.prototype={initialize: function(){var self=this;self.async=self.context.data('async');if(self.async){self.init_async()}},init_async: function(){var self=this;self.links=jQuery('body').find('a[href$="download.epub"]');self.links.prepOverlay({subtype:'ajax',formselector:'form',filter:'.eea-epub-download',cssclass:'eea-epub-overlay'})}};jQuery.fn.EEAePub=function(options){return this.each(function(){var context=jQuery(this);var adapter=new EEA.ePub(context,options);context.data('EEAePub',adapter)})};jQuery(document).ready(function(){var items=jQuery('.eea-epub-viewlet');items.EEAePub()});

/* - ++resource++tcp_scripts/cookiepolicy.js - */
var CookiePolicy = {};

CookiePolicy.toggleCookiePolicy = function toggleCookiePolicy() {
    jQuery("#viewlet-cookiepolicy").slideToggle(500);
};

CookiePolicy.acceptCookiePolicy = function acceptCookiePolicy() {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    var expires = "; expires="+date.toGMTString();
    document.cookie = "cookie-policy=accepted"+expires+"; path=/";
    CookiePolicy.toggleCookiePolicy();
};

CookiePolicy.deleteCookies = function delete_cookies(domain) {
    var cookie_domain = domain || window.location.hostname;
    cookie_domain = cookie_domain.indexOf('www') === 0 ? cookie_domain.substr(3) : cookie_domain;
    var cookies = document.cookie.split(";");
    var i, cookie, key, cookie_length;
    for (i = 0, cookie_length = cookies.length; i < cookie_length; i += 1) {
        cookie = cookies[i];
        key = cookie.indexOf("=");
        var name = key > -1 ? cookie.substr(0, key) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT" +
            ";domain=" + cookie_domain + ";path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT" +
            ";path=/";
    }
};

jQuery(function() {
    var btn = document.getElementById("tlspu_cookiepolicy_button");
    if (!btn) {
        return;
    }

    btn.onclick = function(evt) {
        CookiePolicy.acceptCookiePolicy();
        evt.preventDefault();
    };

    var cookies = document.cookie.split(';');
    var i, c_length;
    for(i=0, c_length = cookies.length; i < c_length; i += 1) {
        if (cookies[i].indexOf("cookie-policy=") !== -1) {
            return;
        }
    }

    setTimeout(CookiePolicy.toggleCookiePolicy, 1000);
});

