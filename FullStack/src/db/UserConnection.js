import mysql from 'mysql';

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lawlink",
  port: 3307,
  // This is the key for Arabic support
  charset: 'utf8mb4' 
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL with Arabic support!");

  // Now, when you select data, Arabic text will be handled correctly
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    
    // If your 'users' table has Arabic names, they will show up properly here
    console.log(result); 
  });
});

export default con;