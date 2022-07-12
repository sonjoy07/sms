module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/teacher", authenticateToken, (req, res) => {
    con.query(
      "SELECT id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, initial FROM teacher",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/teacher/profile", (req, res) => {
    con.query(
      `SELECT teacher.id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, initial, teacher_code, mobile, school_name,designation,department,email,blood_group,dob, school_info_id FROM teacher left join school_info on school_info.id = teacher.school_info_id where teacher.id="${req.query.teacher_id}"`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result[0]);
      }
    );
  });
  app.get("/api/teacher/filter", (req, res) => {
    
    let condition = req.query.teacher_id!== undefined && req.query.teacher_id!==""?` and teacher_code = ${req.query.teacher_id}`:``
    con.query(
      `SELECT id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name,first_name,last_name,middle_name,title, initial, teacher_code,dob,blood_group, mobile,designation, email, subject_code,mpo_status,index_no,school_info_id FROM teacher where school_info_id="${req.query.school_info_id}"${condition}`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/teacher/all", authenticateToken, (req, res) => {
    con.query("SELECT * FROM teacher", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/teacher/schoolWise", authenticateToken, (req, res) => {
    con.query(`SELECT id,CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name FROM teacher where school_info_id=${req.query.school_info_id}` , function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

};
