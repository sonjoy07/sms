
var path = require('path');
module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/administrator", authenticateToken, (req, res) => {
    con.query(
      "SELECT id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name FROM administrator",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/administrator/profile", authenticateToken, (req, res) => {
    con.query(
      `SELECT id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name,  admin_code,photo_id,email_address,mobile_number, first_name,last_name,middle_name FROM administrator where id="${req.query.administrator_id}"`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/administrator/all", authenticateToken, (req, res) => {
    con.query("SELECT * FROM administrator order by id desc", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/super_admin", authenticateToken, (req, res) => {
    con.query("SELECT * FROM super_admin", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/api/schooladmin", (req, res) => {
    con.query(`select id from school_admin where admin_code="${req.query.admin_code}"`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  
  app.post("/api/administrator/profile_update", authenticateToken, (req, res) => {
    var mobile = req.body.mobileNo ? req.body.mobileNo : 0;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var middleName = req.body.middleName;
    var attachment_link = req.body.fileName;
    var uploadPath = path.resolve(__dirname, '../../uploads/');
    if (req.files !== null) {
      const file = req.files.file
      file.mv(`${uploadPath}/${file.name}`, err => {
        if (err) {
          return res.status(500).send(err)
        }
      })
    }
    var sql = `Update administrator 
    set mobile_number="${mobile}",
    email_address="${email}",first_name="${firstName}",last_name="${lastName}",middle_name="${middleName}",photo_id="${attachment_link}" 
    where admin_code="${req.query.student_code}"
    
    `
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
};
