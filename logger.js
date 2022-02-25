/**
 * EssCsLeague logging module
 *
 * Author:    Superbia Alius
 * Created:   Nov 29, 2021
 * Copyright: (C) EssCsLeague
 */


 /** @USAGE
  * const log = logger.getLogger("MyModule")
  *
  * log.trace("Entering cheese testing")
  * log.debug("Got cheese.")
  * log.info("Cheese is Comté.")
  * log.warn("Cheese is quite smelly.")
  * log.error("Cheese is too ripe!")
  * log.fatal("Cheese was breeding ground for listeria.")
  */

global.logger = require('log4js')


const LOGPATH = __dirname + "/Application.log"
logger.configure({
  appenders: { application: { type: "file", filename: LOGPATH } },
  categories: { default: { appenders: ["application"], level: "trace" } }
})


exports.getLogger = function(author) {
  const customLogger = logger.getLogger(author)
  customLogger.info("Module initialized")
  return customLogger
}
