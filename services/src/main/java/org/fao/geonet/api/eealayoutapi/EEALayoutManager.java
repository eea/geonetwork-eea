package org.fao.geonet.api.eealayoutapi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Properties;

import org.fao.geonet.api.API;
import org.fao.geonet.utils.Log;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class EEALayoutManager {

    private static String HEAD;
    private static String SCRIPTS;
    private static String HEADER;
    private static String FOOTER;

    public synchronized static void forceContentReload() throws Exception {
        Log.info(API.LOG_MODULE_NAME, "Updating EEA template layout from remote...");

        String tempHEAD = loadHeadFromAPI();
        String tempSCRIPTS = loadScriptFromAPI();
        String tempHEADER = loadHeaderFormEEAapi();
        String tempFOOTER = loadFooterFormEEAapi();

        HEAD = tempHEAD;
        SCRIPTS = tempSCRIPTS;
        HEADER = tempHEADER;
        FOOTER = tempFOOTER;

    }

    public static String getHEAD() {
        if (HEAD == null) {
            try {
                Log.info(API.LOG_MODULE_NAME, "Updating EEA head layout from remote...");
                HEAD = loadHeadFromAPI();
            } catch (Exception e) {
                Log.error(API.LOG_MODULE_NAME, "Error in updating EEA head from remote API", e);
                return "";
            }
        }

        return HEAD;
    }

    public static String getSCRIPTS() {
        if (SCRIPTS == null) {
            try {
                Log.info(API.LOG_MODULE_NAME, "Updating EEA scripts layout from remote...");
                SCRIPTS = loadScriptFromAPI();
            } catch (Exception e) {
                Log.error(API.LOG_MODULE_NAME, "Error in updating EEA scripts from remote API", e);
                return "";
            }
        }

        return SCRIPTS;
    }

    public static String getHEADER() {
        if (HEADER == null) {
            try {
                Log.info(API.LOG_MODULE_NAME, "Updating EEA header layout from remote...");
                HEADER = loadHeaderFormEEAapi();
            } catch (Exception e) {
                Log.error(API.LOG_MODULE_NAME, "Error in updating EEA header from remote API", e);
                return "";
            }
        }

        return HEADER;
    }

    public static String getFOOTER() {
        if (FOOTER == null) {
            try {
                Log.info(API.LOG_MODULE_NAME, "Updating EEA footer layout from remote...");
                FOOTER = loadFooterFormEEAapi();
            } catch (Exception e) {
                Log.error(API.LOG_MODULE_NAME, "Error in updating EEA footer from remote API", e);
                return "";
            }
        }

        return FOOTER;
    }

    private static String loadHeadFromAPI() throws Exception {
        URL url;
        InputStream is = null;
        BufferedReader inputReader = null;
        try {
            url = new URL(readProperty("eea.api.template.head"));
            is = url.openStream(); // throws an IOException
            inputReader = new BufferedReader(new InputStreamReader(is));

            StringBuilder sb = new StringBuilder();
            String inline;

            sb.append("<head>");
            while ((inline = inputReader.readLine()) != null) {

                sb.append(inline);
            }

            Document doc = Jsoup.parse(sb.toString());

            Elements script = doc.select("script");
            for (Element element : script) {
                element.html("");

            }

            return doc.head().html();

        } finally {
            try {
                if (is != null) {
                    is.close();
                }
                if (inputReader != null) {
                    inputReader.close();
                }
            } catch (IOException ioe) {
            }
        }
    }

    private static String loadScriptFromAPI() throws Exception {
        URL url;
        InputStream is = null;
        BufferedReader inputReader = null;
        try {
            url = new URL(readProperty("eea.api.template.head"));
            is = url.openStream(); // throws an IOException
            inputReader = new BufferedReader(new InputStreamReader(is));

            StringBuilder sb = new StringBuilder();
            String inline;

            sb.append("<head>");
            while ((inline = inputReader.readLine()) != null) {

                sb.append(inline);
            }
            sb.append("</head>");

            Document doc = Jsoup.parse(sb.toString());

            StringBuffer javascript = new StringBuffer();

            Elements script = doc.select("script");
            for (Element element : script) {
                javascript.append(element.data());

            }

            return javascript.toString();

        } finally {
            try {
                if (is != null) {
                    is.close();
                }
                if (inputReader != null) {
                    inputReader.close();
                }
            } catch (IOException ioe) {
            }
        }
    }

    private static String loadHeaderFormEEAapi() throws Exception {
        return loadPageSectionFormEEAapi(readProperty("eea.api.template.header"));
    }

    private static String loadFooterFormEEAapi() throws Exception {
        return loadPageSectionFormEEAapi(readProperty("eea.api.template.footer"));
    }

    private static String loadPageSectionFormEEAapi(String stringUrl) throws Exception {
        URL url;
        InputStream is = null;
        BufferedReader inputReader = null;
        try {
            url = new URL(stringUrl);
            is = url.openStream(); // throws an IOException
            inputReader = new BufferedReader(new InputStreamReader(is));
            StringBuilder sb = new StringBuilder();
            String inline = "";

            while ((inline = inputReader.readLine()) != null) {

                sb.append(inline);
            }

            return sb.toString();

        } finally {
            try {
                if (is != null) {
                    is.close();
                }
                if (inputReader != null) {
                    inputReader.close();
                }
            } catch (IOException ioe) {
            }
        }
    }

    private static String readProperty(String property) throws IOException {
        Properties prop = new Properties();
        // load a properties file from class path, inside static method
        prop.load(EEALayoutManager.class.getClassLoader().getResourceAsStream("eeaAPI.properties"));
        return prop.getProperty(property);

    }

}
