import mysql from 'mysql'

const connection = mysql.createConnection({
  host: '192.168.111.111',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'mydb'
})

connection.connect()

// const getConnection = (host, user, password, port, database) => {
//   connection = mysql.createConnection({
//     host: host,
//     user: user,
//     password: password,
//     port: port,
//     database: database
//   })
//   connection.connect()
//   return connection
// }

export const execute = (sql, params) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject('连接mysql失败')
    }
    const queryParam = {
      sql: sql
    }
    params ? queryParam['values'] = params : null
    connection.query(queryParam, function (error, result, fields) {
      if (error) {
        console.error('ERROR - ', error.message)
        reject(error)
      }
      resolve(result)
    })
  })
}

export const close = () => {
  connection.end()
}
