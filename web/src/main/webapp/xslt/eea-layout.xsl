<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                exclude-result-prefixes="#all">

  <xsl:template name="eea-head">
    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216183212042.css" media="screen" />
    <style type="text/css">@import url(../../images/eea-api/ploneStyles1433419216183269024.css);</style>
    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216183810949.css" />
    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216184739113.css" media="print" />
    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216184762955.css" />
    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216186409950.css" />
    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216187398911.css" media="screen" />
    <!--[if lt IE 9]>

<link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216187609911.css" media="screen" />
    <![endif]-->

    <!--[if IE 7]>

<link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216187675953.css" media="screen" />
    <![endif]-->

    <!--[if IE 8]>

<link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216187743902.css" media="screen" />
    <![endif]-->

    <!--[if IE 9]>

<link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216187803984.css" media="screen" />
    <![endif]-->

    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216187879086.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../images/eea-api/ploneStyles1433419216187983990.css" media="screen" />

    <script type="text/javascript"> context_url='http://www.eea.europa.eu';</script>

  </xsl:template>

  <xsl:template name="eea-footer">
    <div>
      <div class="row">
        <div id="footer-wrapper">
          <div id="bg-wrapper">

            <div id="portal-footer">


            </div>
            <script type="text/javascript">
              jQuery(document).ready(function($){
                jQuery("#portal-footer").find(".managePortletsLink a")
                  .not(".managePortletsFallback").parent().remove();
              });
            </script>
          </div>
        </div>
      </div>

      <div id="portal-colophon">
        <metal>
          <div class="colophonWrapper">
            <div class="colophon-left">

              <a href="http://www.eea.europa.eu">European Environment Agency
                (EEA)
              </a>
              <br/>

              Kongens Nytorv 6
              <br/>
              1050 Copenhagen K
              <br/>
              Denmark
              <br/>
              Phone: +45 3336 7100


            </div>


            <div class="colophon-right colophon-links">
              <span>
                The European Environment Agency (EEA) is an agency of the
                European Union.
                <br/>
                <a href="http://www.eea.europa.eu/legal/">Legal notice</a>
              </span>
              <img alt="EU flag" title="European Union Flag"
                   src="../../images/eea-api/eu-flag.gif"/>
              <br/>
            </div>

            <div class="footer-clear">&#160;</div>


          </div>
          <div class="colophon-middle">
            <p class="discreet colophon-links">
              engineered by
              <br/>
              <a href="http://www.eea.europa.eu/help/contact-info">EEA Web
                Team
              </a>
            </p>

            <p class="discreet colophon-links">
              <a rel="license"
                 href="http://creativecommons.org/licenses/by/2.5/dk/deed.en_GB"
                 title="Creative Commons Attribution License">
                <img alt="Creative Commons Attribution License"
                     style="border-width: 0pt;"
                     src="http://www.eea.europa.eu/creativecommons-by-2.5-dk-80x15.png"/>
              </a>
              <a href="https://svn.eionet.europa.eu/repositories/Zope/trunk/www.eea.europa.eu/trunk/docs/"
                 title="Software updates history">Software updates history
              </a>
              <a href="http://www.eea.europa.eu/code"
                 title="Software updates history">Code for developers
              </a>
            </p>
          </div>

        </metal>
      </div>


      <!-- traceview endtag -->
      <div id="viewlet-cookiepolicy" class="portalMessage" style="display:none">
        <h1 id="tlspu_cookiepolicy_title">This site uses cookies</h1>
        <p id="tlspu_cookiepolicy_message">We use cookies to record some
          preference settings and to analyse how visitors use our web site. We
          may also use external tools which may set additional cookies to
          perform their analysis. These cookies are integral to our web site. If
          you wish, you can
          <a href="http://www.aboutcookies.org/default.aspx?page=2"
             title="how to delete or disable cookies">delete or disable these
            cookies in your web browser
          </a>
          but then our site may not work correctly. See also<a
                  href="http://www.eea.europa.eu/legal/privacy"
                  title="our privacy policy">our privacy policy</a>.
        </p>
        <form id="tlspu_cookiepolicy_form">
          <button id="tlspu_cookiepolicy_button" value="hide">I am fine with
            this
          </button>
        </form>
      </div>
    </div>

  </xsl:template>


  <xsl:template name="eea-header">
    <div id="header-holder">
      <div id="portal-top">
        <!-- ClickTale Top part -->
        <script type="text/javascript">
          var WRInitTime=(new Date()).getTime();
        </script>
        <!-- ClickTale end of Top part -->
        <div id="cross-site-top">
          <ul id="portal-externalsites">
            <li id="externalsites-networks">
              <a href="http://www.eea.europa.eu">Networks</a>
            </li>
          </ul>
          <div class="panel" id="tip-externalsites-networks"
               style="width:450px; margin-left: 10em;">
            <div class="panel-top" style="left: -195px;"><!-- --></div>
            <div class="panel-content shadow">
              <dl class="portlet networkSites">
                <dt>Networks</dt>
                <dd>
                  <ul>
                    <li id="externalsites-eionet">
                      <a title="Eionet" accesskey=""
                         href="http://www.eionet.europa.eu/">Eionet
                      </a>
                    </li>
                    <li id="externalsites-epanet">
                      <a title="EPA network" accesskey=""
                         href="http://epanet.ew.eea.europa.eu/">Network of the
                        Heads of Environment Protection Agencies (EPA network)
                      </a>
                    </li>
                    <li id="externalsites-envirowindows">
                      <a title="Partnerships beyond Eionet (PBE)" accesskey=""
                         href="http://ew.eea.europa.eu/">Partnerships beyond
                        Eionet (PBE)
                      </a>
                    </li>
                    <li id="seis-network">
                      <a title="SEIS network" accesskey=""
                         href="http://www.eea.europa.eu/about-us/what/shared-environmental-information-system">
                        Shared Environmental Information System (SEIS)
                      </a>
                    </li>
                  </ul>
                </dd>
                <dt>
                  European Topic Centres (ETCs)
                </dt>
                <dd>
                  <ul>
                    <li>
                      <a href="http://acm.eionet.europa.eu">Air pollution and
                        Climate Change mitigation (ACM)
                      </a>
                    </li>
                    <li>
                      <a href="http://bd.eionet.europa.eu">Biological Diversity
                        (BD)
                      </a>
                    </li>
                    <li>
                      <a href="http://cca.eionet.europa.eu">Climate Change
                        Impacts, Vulnerability and Adaptation (CCA)
                      </a>
                    </li>
                    <li>
                      <a href="http://icm.eionet.europa.eu">Inland, Coastal and
                        Marine waters (ICM)
                      </a>
                    </li>
                    <li>
                      <a href="http://etc-wmge.vito.be">Land and Soil systems
                        (ULS)
                      </a>
                    </li>
                    <li>
                      <a href="http://etc-wmge.vito.be">Waste and Materials in a
                        Green Economy (WMGE)
                      </a>
                    </li>
                  </ul>
                </dd>
                <dt class="hiddenStructure">
                  More networks
                </dt>
                <dd style="padding-bottom: 0.5em" class="portletFooter">
                  <a class="moreLink"
                     href="http://www.eea.europa.eu/about-us/key-partners">EU
                    partners</a>&#160;&#160;
                  <a class="moreLink"
                     href="http://www.eea.europa.eu/about-us/international-cooperation">
                    International cooperation
                  </a>
                </dd>
              </dl>
            </div>
          </div>
          <ul id="portal-siteactions">
            <li id="siteaction-subscriptions">
              <a href="http://www.eea.europa.eu/subscription"
                 title="Subscriptions" accesskey="">
                <span class="eea-icon eea-icon-lg"><!-- --></span>
                Subscriptions
              </a>
            </li>
            <li id="siteaction-formobile">
              <a href="http://www.eea.europa.eu/mobile" title="Mobile"
                 accesskey="">
                <span class="eea-icon eea-icon-lg"><!-- --></span>
                Mobile
              </a>
            </li>
            <li id="siteaction-contactus">
              <a href="http://www.eea.europa.eu/address.html" title="Contact us"
                 accesskey="">
                <span class="eea-icon eea-icon-lg"><!-- --></span>
                Contact us
              </a>
            </li>
            <li id="siteaction-chooselang">
              <a href="http://www.eea.europa.eu/chooselang"
                 title="EEA homepage in your language" accesskey="">
                <span class="eea-icon eea-icon-lg"><!-- --></span>
                EEA homepage in your language
              </a>
            </li>
          </ul>
          <div>
            <div class="panel" id="tip-siteaction-subscriptions"
                 style="width: 240px">
              <div class="panel-top">
                <!-- -->
              </div>
              <div class="panel-content shadow">
                <div>
                  <dl class="portlet portlet-subscribtion">
                    <dt>Subscriptions</dt>
                    <dd class="portletItem">
                      <span>
                        <span>
                          <a href="http://www.eea.europa.eu/subscription/targeted-subscription">
                            Sign up
                          </a>
                        </span>
                        to receive our reports (print and/or electronic) and
                        quarterly e-newsletter.
                      </span>
                    </dd>
                    <dt>Follow us</dt>
                    <dd>
                      <img alt="Twitter icon"
                           src="http://www.eea.europa.eu/twitter16x16.png"/>
                      <a href="http://twitter.com/euenvironment">Twitter</a>
                    </dd>
                    <dd>
                      <img alt="Facebook icon"
                           src="http://www.eea.europa.eu/facebook-icon.png"/>
                      <a href="http://www.facebook.com/pages/European-Environment-Agency/113006845445297">
                        Facebook
                      </a>
                    </dd>
                    <dd>
                      <img alt="YouTube icon"
                           src="http://www.eea.europa.eu/youtube16x16.png"/>
                      <a href="http://www.youtube.com/user/EEAvideos">YouTube
                        channel
                      </a>
                    </dd>
                    <dd>
                      <img alt="RSS logo"
                           src="http://www.eea.europa.eu/rss.gif"/>
                      <a href="http://www.eea.europa.eu/subscription/news-feeds">
                        <span>RSS Feeds</span>
                      </a>
                    </dd>
                    <dd class="portletFooter" style="padding-bottom: 0.5em">
                      <a href="http://www.eea.europa.eu/subscription"
                         class="moreLink">
                        <span>More</span>
                      </a>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="panel" id="tip-siteaction-contactus"
                 style="width: 420px">
              <div class="panel-top">
                <!-- -->
              </div>
              <div class="panel-content shadow">
                <table>
                  <tr>
                    <td style="width: 45%;">
                      <h2>
                        <span class="eea-icon eea-icon-lg eea-icon-envelope"/>
                        Write to us
                      </h2>
                      <p>
                        <strong>For the public:</strong>
                      </p>
                      <ul>
                        <li>
                          <p>
                            <a target="_self"
                               href="http://www.eea.europa.eu/help/infocentre/enquiries/">
                              Ask your question
                              <br/>
                            </a>
                          </p>
                        </li>
                      </ul>
                      <br/>
                      <strong style="white-space: nowrap">For media and
                        journalists:
                      </strong>
                      <br/>
                      <ul>
                        <li>
                          <p>
                            <a target="_self"
                               href="http://www.eea.europa.eu/pressroom">Press
                              room
                              <br/>
                            </a>
                          </p>
                        </li>
                      </ul>
                      <br/>
                      <a class="internal-link" title="Staff list"
                         href="http://www.eea.europa.eu/about-us/who/staff-list">
                        <strong>Contact EEA staff</strong>
                      </a>
                      <br/>
                      <a class="internal-link"
                         href="http://www.eea.europa.eu/help/contact-info">
                        <strong>Contact the web team</strong>
                      </a>
                      <br/>
                      <a class="internal-link"
                         href="http://www.eea.europa.eu/help/eea-help-centre/faqs">
                        <strong>FAQ</strong>
                      </a>
                      <br/>
                    </td>
                    <td style="vertical-align: top;">
                      <br/>
                    </td>
                    <td style="vertical-align: top;">
                      <h2>
                        <span class="eea-icon eea-icon-lg eea-icon-phone"/>
                        Call us
                      </h2>
                      <strong>Reception:</strong>
                      <br/>
                      <br/>
                      <strong>Phone:</strong>
                      (+45) 33 36 71 00
                      <br/>
                      <strong>Fax:</strong>
                      (+45) 33 36 71 99
                      <br/>
                      <br/>
                      <strong>
                        <a target="_self"
                           href="http://www.eea.europa.eu/help/infocentre/index_html">
                          <br/>
                        </a>
                      </strong>
                    </td>
                  </tr>
                </table>
                <div class="portletFooter">
                  <a class="moreLink"
                     href="http://www.eea.europa.eu/address.html">
                    <span>More</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="panel" id="tip-siteaction-chooselang"
                 style="width: 125px">
              <div class="panel-top">
                <!-- -->
              </div>
              <div class="panel-content shadow">
                <ul id="chooselang">
                  <li>
                    <a href="http://www.eea.europa.eu/bg" title="Bulgarian">
                      &#1041;&#1098;&#1083;&#1075;&#1072;&#1088;&#1089;&#1082;&#1080;
                      (bg)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/cs" title="Czech">&#269;e&#353;tina
                      (cs)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/hr" title="Croatian">
                      Hrvatski (hr)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/da" title="Danish">dansk
                      (da)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/nl" title="Dutch">
                      Nederlands (nl)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/el" title="Greek">&#949;&#955;&#955;&#951;&#957;&#953;&#954;&#940;
                      (el)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu" title="English">English
                      (en)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/et" title="Estonian">eesti
                      (et)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/fi" title="Finnish">Suomi
                      (fi)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/fr" title="French">Fran&#231;ais
                      (fr)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/de" title="German">Deutsch
                      (de)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/hu" title="Hungarian">
                      magyar (hu)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/is" title="Icelandic">
                      &#205;slenska (is)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/it" title="Italian">
                      italiano (it)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/lv" title="Latvian">Latvie&#353;u
                      (lv)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/lt" title="Lithuanian">
                      lietuvi&#371; (lt)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/mt" title="Maltese">Malti
                      (mt)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/no" title="Norwegian">
                      Norsk (no)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/pl" title="Polish">polski
                      (pl)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/pt" title="Portuguese">
                      Portugu&#234;s (pt)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/ro" title="Romanian">Rom&#226;n&#259;
                      (ro)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/sk" title="Slovak">sloven&#269;ina
                      (sk)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/sl" title="Slovenian">
                      Sloven&#353;&#269;ina (sl)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/es" title="Spanish">Espa&#241;ol
                      (es)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/sv" title="Swedish">
                      Svenska (sv)
                    </a>
                  </li>
                  <li>
                    <a href="http://www.eea.europa.eu/tr" title="Turkish">T&#252;rk&#231;e
                      (tr)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="visualClear"><!-- &nbsp; --></div>
        </div>
        <div id="popup_login_form" style="display:none;">
          <dl class="portalMessage error" id="enable_cookies_message"
              style="display:none">
            <dt>Error</dt>
            <dd>Cookies are not enabled. You must enable cookies before you can
              log in.
            </dd>
          </dl>
          <div class="portalMessage informationMessage">
            <p>The EEA Web CMS works best with following browsers:</p>
            <div id="cms-browsers-links">
              <ul>
                <li id="cms-chrome">
                  Google Chrome (recommended)
                </li>
                <li id="cms-firefox">
                  Firefox
                </li>
              </ul>
              <p class="discreet">Internet Explorer is not recommended for the
                CMS area.
              </p>
            </div>
          </div>
          <form class="enableAutoFocus" method="post" id="login_form"
                action="https://www.eea.europa.eu/login_form">
            <div id="login-form">
              <input type="hidden" name="came_from"
                     value="http://www.eea.europa.eu"/>
              <input type="hidden" name="next"/>
              <input type="hidden" name="ajax_load"/>
              <input type="hidden" name="ajax_include_head"/>
              <input type="hidden" name="target"/>
              <input type="hidden" name="mail_password_url"/>
              <input type="hidden" name="join_url"/>
              <input type="hidden" name="form.submitted" value="1"/>
              <input type="hidden" name="js_enabled" id="js_enabled" value="0"/>
              <input type="hidden" name="cookies_enabled" id="cookies_enabled"
                     value=""/>
              <input type="hidden" name="login_name" id="login_name" value=""/>
              <input type="hidden" name="pwd_empty" id="pwd_empty" value="0"/>
              <div class="field">
                <label for="__ac_name">Login Name</label>
                <input type="text" size="15" name="__ac_name" id="__ac_name"/>
              </div>
              <div class="field">
                <label for="__ac_password">Password</label>
                <input type="password" size="15" name="__ac_password"
                       id="__ac_password"/>
              </div>
              <div class="formControls">
                <input class="context" type="submit" name="submit"
                       value="Log in"/>
              </div>
            </div>
          </form>
          <div id="login-forgotten-password">
            <strong>Forgot your password?</strong>
            <p class="discreet">If you have forgotten your password,
              <span>
                <a href="http://www.eea.europa.eu/mail_password_form?userid=None">
                  we can send you a new one
                </a>
              </span>
              .
            </p>
          </div>
        </div>
        <div class="eea-i18n-js hiddenElem">
          <div id="eeaPaginationNext">next</div>
          <div id="eeaPaginationPrev">previous</div>
          <div id="eeaPaginationItems">items</div>
        </div>
        <div id="portal-header">
          <p class="hiddenStructure">
            <a accesskey="2" href="http://www.eea.europa.eu#content">Skip to
              content.
            </a>
            |
            <a accesskey="6"
               href="http://www.eea.europa.eu/getHeader#eea-portlet-navigation-tree">
              Skip to navigation
            </a>
          </p>
          <h2 id="logo-en" class="portal-logo">
            <a href="http://www.eea.europa.eu" accesskey="1"
               title="European Environment Agency (EEA)">
              <img src="http://www.eea.europa.eu/++resource++eea.translations.images/pdflogo-en.png"
                   alt="European Environment Agency (EEA)" id="printLogo"/>
            </a>
          </h2>
          <h3 class="site-description">Sound and independent information
            <br/>
            on the environment
          </h3>
          <!-- THE SEARCHBOX DEFINITION -->
          <div id="portal-searchbox">
            <form action="http://glossary.en.eea.europa.eu/terminology/sitesearch"
                  id="searchbox_terminology" class="searchforms">
              <input type="text" name="term" size="35"
                     title="Search Europe's environment"/>
              <input class="searchButton" type="submit" value="Search"/>
            </form>
            <a id="search_advanced_link"
               href="http://www.eea.europa.eu/help/advanced-search">Advanced
              search
            </a>
            <a id="search_glossary_link"
               href="http://glossary.en.eea.europa.eu">A-Z Glossary
            </a>
          </div>
          <script type="text/javascript">var object_archived = false;;</script>
        </div>
        <div id="globalnav-holder">
          <h5 class="hiddenStructure">Sections</h5>
          <ul id="portal-globalnav">
            <li id="portaltab-themes" class="plain">
              <a href="http://www.eea.europa.eu/themes"
                 title="Explore by environmental topics">Topics
              </a>
            </li>
            <li id="portaltab-data-and-maps" class="plain">
              <a href="http://www.eea.europa.eu/data-and-maps"
                 title="Environmental data, charts, maps, indicators and interactive data applications">
                Data and maps
              </a>
            </li>
            <li id="portaltab-indicators" class="plain">
              <a href="http://www.eea.europa.eu/data-and-maps/indicators/"
                 title="">Indicators
              </a>
            </li>
            <li id="portaltab-reports" class="plain">
              <a href="http://www.eea.europa.eu/publications" title="">
                Publications
              </a>
            </li>
            <li id="portaltab-media" class="plain">
              <a href="http://www.eea.europa.eu/media" title="">Media</a>
            </li>
            <li id="portaltab-abouteea" class="plain">
              <a href="http://www.eea.europa.eu/about-us" title="">About EEA</a>
            </li>
            <li id="portaltab-europe" class="plain">
              <a href="http://europa.eu/about-eu/agencies" title="">The EEA is
                an agency of the European Union
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </xsl:template>
</xsl:stylesheet>
