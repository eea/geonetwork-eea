
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - readiness.js - */
// http://www.eea.europa.eu/portal_javascripts/readiness.js?original=1
function set_readiness_accordion(){(function($){$(".readiness_accordion").accordion({autoHeight:false})})(jQuery)}
jQuery(document).ready(set_readiness_accordion);

/* - eea-accordion.js - */
// http://www.eea.europa.eu/portal_javascripts/eea-accordion.js?original=1
jQuery(document).ready(function(){var portlet=jQuery('dl.portletNavigationTree');if(!portlet.length){return}
var tabs=jQuery('dd.portletItem',portlet);var index=0;tabs.each(function(idx,obj){var here=jQuery(this);if(jQuery('.navTreeCurrentNode',here).length>0){index=idx;return false}});jQuery('dl.portletNavigationTree').tabs("dl.portletNavigationTree dd.portletItem",{tabs:"dt.portletSubMenuHeader",effect:"slide",initialIndex:index});portlet.delegate('.current, .collapsed','click', function(){var tabs=portlet.data('tabs');if(index==tabs.getIndex()){if(tabs.getCurrentTab().hasClass('current')){tabs.getCurrentPane().slideUp();tabs.getCurrentTab().removeClass('current').addClass('collapsed')}else{tabs.getCurrentPane().slideDown();tabs.getCurrentTab().addClass('current').removeClass('collapsed')}}
index=tabs.getIndex()})});
