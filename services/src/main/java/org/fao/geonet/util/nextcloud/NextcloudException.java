package org.fao.geonet.util.nextcloud;

public class NextcloudException extends RuntimeException {
    public NextcloudException(String message) {
        super(message);
    }

    public NextcloudException(String message, Throwable cause) {
        super(message, cause);
    }
}
