const sha1    = require('sha1')
const sqlite3 = require('sqlite3').verbose()
const log     = require("./../logs/logger.js").getLogger("database")


// __dirname needs to read db constantly in this path
exports.messages  = new sqlite3.Database(__dirname + '/MessagesLog.db')
exports.redirects = new sqlite3.Database(__dirname + '/RedirectsCount.db')
exports.config    = new sqlite3.Database(__dirname + '/PagesConfig.db')



/*
  database.createRow(database.users, 'USERS',
    "LOGIN, PASSWORD, STATUS, EMAIL, CITY, COUNTRY, DISCORD",
    ["'Tester'", "'tester'", "'tester'", "'tester'", "'tester'", "'tester'", "'tester'"]
  )
*/
exports.createRow = async function(db, tablename, datanames, values) {
  var sql = "INSERT INTO " + tablename + " (" + datanames + ") VALUES (" + values + ")"

  try
    { db.run(sql) }
  catch (e)
    { log.error(e) }
  finally
    { log.trace(sql) }
}


/*
  database.redactByParam(database.users, 'USERS',
    ["LOGIN='Diego'"],
    "ID=6"
  )
*/
exports.redactRowByParam = async function(db, tablename, datasets, param) {
  var sql = "UPDATE " + tablename + " SET " + datasets + " WHERE " + param

  try
    { db.run(sql)    }
  catch (e)
    { log.error(e)   }
  finally
    { log.trace(sql) }
}


/*
  database.getRowByParam(database.users, 'USERS', 'ID=0', function(err, row) {
    console.log(row)
    console.log(row.LOGIN)
  })
*/
exports.getRowByParam = async function(db, tablename, param, callback) {
  var sql = "SELECT * FROM " + tablename + " WHERE " + param

  try
    { db.each(sql, function(err, row) {callback(null, row)}) }
  catch (e)
    { log.error(e)   }
  finally
    { log.trace(sql) }
}



// database.deleteRow(database.users, 'USERS', 'ID=6')
exports.deleteRow = async function(db, tablename, param) {
  var sql = "DELETE FROM " + tablename + " WHERE " + param

  try
    { db.run(sql)    }
  catch (e)
    { log.error(e)   }
  finally
    { log.trace(sql) }
}



// console.log(database.makeHash("test"))
exports.makeHash = function(string) {
  var hash = sha1(string)
  log.trace("Making hash")
  return hash
}
