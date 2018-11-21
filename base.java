package org.atmosphere.cpr;

import org.atmosphere.cpr.AtmosphereServlet.Action;
import org.atmosphere.cpr.AtmosphereServlet.AtmosphereConfig;
import org.atmosphere.cpr.AtmosphereServlet.AtmosphereHandlerWrapper;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import static org.atmosphere.cpr.ApplicationConfig.MAX_INACTIVE;
import static org.atmosphere.cpr.HeaderConfig.X_ATMOSPHERE_ERROR;

/**
 * Base class which implement the semantics of suspending and resuming of a
 * Comet Request.
 *
 * @author Jeanfrancois Arcand
 */
public abstract class AsynchronousProcessor implements CometSupport&lt;AtmosphereResourceImpl&gt; {

    private static final Logger logger = LoggerFactory.getLogger(AsynchronousProcessor.class);
