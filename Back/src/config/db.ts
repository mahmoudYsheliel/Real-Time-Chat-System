import mysql from "mysql2/promise";

let mysqlDB: mysql.Pool | null = null
try {
  mysqlDB = mysql.createPool({
    host: "localhost",       // use "mysql" if inside another docker container
    user: "chatuser",
    password: "chatpassword",
    database: "chat_system",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log('DB Connected Successfuly')
}
catch (err) {
  console.log('DB Connection Failed')
}


export default mysqlDB
