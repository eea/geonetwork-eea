package org.fao.geonet.resources;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.fao.geonet.constants.Geonet;
import org.fao.geonet.utils.Log;

/**
 * Servlet for serving up resources located in the configured path.
 * 
 * @author delawen
 */
public class PlainFilter implements Filter {
	private static final int CONTEXT_PATH_PREFIX = "/".length();
	private static final int FIVE_DAYS = 60 * 60 * 24 * 5;
	private String resourcesDir;
	private FilterConfig config;

	@Override
	public void init(FilterConfig config) throws ServletException {
		this.config = config;

		this.resourcesDir = this.config.getInitParameter("baseUrl");
		if (this.resourcesDir == null) {
			this.resourcesDir = "/WEB-INF";
		}
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		String servletPath = ((HttpServletRequest) request).getServletPath();

		Log.info(Geonet.RESOURCES, "Handling request: " + servletPath);
		Log.debug(Geonet.RESOURCES, "Resources dir: " + this.resourcesDir);

		String filename = servletPath.substring(CONTEXT_PATH_PREFIX)
				.replaceAll("/+", "/");
		int extIdx = filename.lastIndexOf('.');
		String ext;
		if (extIdx > 0) {
			ext = filename.substring(extIdx + 1);
		} else {
			ext = "txt";
		}

		if (ext.equalsIgnoreCase("js")) {
			ext = "javascript";
		}
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		httpServletResponse.setContentType("text/" + ext);
		httpServletResponse.addHeader("Cache-Control", "max-age=" + FIVE_DAYS
				+ ", public");

		String dir = this.resourcesDir;
		InputStream is = this.config.getServletContext().getResourceAsStream(
				dir + servletPath);

		if (is == null) {
			try {
				is = new FileInputStream(dir + servletPath);
			} catch (FileNotFoundException e) {
				Log.debug(Geonet.RESOURCES, e.getMessage(), e);
			}
		}

		if (is == null) {
			// Not running on a full container, like jetty:run?
			servletPath = ((HttpServletRequest) request).getServletPath();

			dir = "target/geonetwork/";
			try {
				is = new FileInputStream(dir + servletPath);
			} catch (FileNotFoundException e) {
				Log.debug(Geonet.RESOURCES, e.getMessage(), e);
			}
		}

		if (is == null) {
			// Not running on a full container, like jetty:run?
			servletPath = ((HttpServletRequest) request).getServletPath();

			dir = "target/"
					+ this.config.getServletContext().getServletContextName()
					+ "/";
			try {
				is = new FileInputStream(dir + servletPath);
			} catch (FileNotFoundException e) {
				Log.debug(Geonet.RESOURCES, e.getMessage(), e);
			}
		}

		OutputStream os = null;
		if (is != null) {
			try {
				os = response.getOutputStream();
				byte[] buf = new byte[2048];
				int c = 0;
				while ((c = is.read(buf, 0, buf.length)) > 0) {
					os.write(buf, 0, c);
					os.flush();
				}
			} catch (IOException io) {
				Log.error(Geonet.RESOURCES, io.getMessage(), io);
			} finally {
				if (os != null) {
					os.close();
				}
				if (is != null) {
					is.close();
				}
			}
		}
	}

	@Override
	public void destroy() {

	}
}
