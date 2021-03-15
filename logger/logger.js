const e = require('express');
const winston = require('winston');
require('winston-mongodb');

let options={
    level:"info",
    db:process.env.MONGO_DB_CLUSTER_URL,
    options:{poolSize: 2, useNewUrlParser: true, useUnifiedTopology: true},
    collection:"logs",
    storeHost:true,
    name:"POST_Monitor",
    tryReconnect:true,
    metaKey:"metadata",
    includeIds:true
}

 const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.MongoDB(options),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({filename:'info.log', level:'info'}),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  //
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }


  exports.logger= logger;