package org.fao.geonet.services;

import jeeves.interfaces.Service;
import jeeves.server.ServiceConfig;
import jeeves.server.context.ServiceContext;
import jeeves.utils.Log;
import org.fao.geonet.GeonetContext;
import org.fao.geonet.constants.Geonet;
import org.jdom.Element;

/**
 * Base class for services that should not run their normal execution path if GeoNetwork is in read-only mode.
 * @author heikki doeleman
 */
public abstract class NotInReadOnlyModeService implements Service{
    @Override
    public void init(String appPath, ServiceConfig params) throws Exception {}

    @Override
    public Element exec(Element params, ServiceContext context) throws Exception {
        // READONLYMODE
        GeonetContext gc = (GeonetContext) context.getHandlerContext(Geonet.CONTEXT_NAME);
        if(!gc.isReadOnly()) {
            return serviceSpecificExec(params, context);
        }
        else {
            Log.debug(Geonet.DATA_MANAGER, "GeoNetwork is operating in read-only mode. Service execution skipped.");
            System.out.println("GeoNetwork is operating in read-only mode. Service execution skipped.");
            return null;
        }
    }

    /**
     * Contains the code for normal execution, when GeoNetwork is not in read-only mode.
     *
     * @param params
     * @param context
     * @return
     * @throws Exception
     */
    public abstract Element serviceSpecificExec(Element params, ServiceContext context) throws Exception;
}