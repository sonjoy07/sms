module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/school_info", (req, res) => {
    con.query(
      `SELECT id, school_name, type_id,(SELECT COUNT(*) AS total FROM student WHERE school_info_id = school_info.id) as total_student,(SELECT COUNT(*) AS total FROM teacher WHERE school_info_id = school_info.id) as total_teacher FROM school_info where administrator_id="${req.query.admin_id}"`,
     async function (err, result, fields) {
        if (err) throw err;
       
        res.send(result);
      }
    );

  });
  app.get("/api/school_name", (req, res) => {
    con.query(
      `SELECT id, school_name FROM school_info
      
      where student_id="${req.query.student_id}"`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );

  });

  app.get("/api/school_info/all", authenticateToken, (req, res) => {
    con.query("SELECT * FROM school_info order by id desc", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/school_type/all", authenticateToken, (req, res) => {
    con.query("SELECT * FROM school_type order by id desc", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/school_info_by_student", authenticateToken, (req, res) => {
    con.query(`SELECT position,school_info.school_name,school_info.address_division,CONCAT(student.first_name,' ' ,student.middle_name) as name,session.session_year,section.section_default_name, class.class_name,student.student_code FROM student left join school_info on school_info.id = student.school_info_id left join student_present_status on student.id = student_present_status.student_id left join class on class.id = student_present_status.class_id left join session on session.id = student_present_status.session_id left join section on section.id = student_present_status.section_id where student.id = ${req.query.student_code}`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/schoolWiseInvoice", authenticateToken, (req, res) => {
    console.log(`SELECT payment_invoice.*,school_name,sector_name,amount,last_date from payment_invoice left join school_info on school_info.id = payment_invoice.school_info_id left join sector on sector.id = payment_invoice.sector_id where school_info_id = ${req.query.school_id} and type = 1`);
    con.query(`SELECT payment_invoice.*,school_name,sector_name,amount,last_date from payment_invoice left join school_info on school_info.id = payment_invoice.school_info_id left join sector on sector.id = payment_invoice.sector_id where school_info_id = ${req.query.school_id} and type = 1`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/studentsDue", authenticateToken, (req, res) => {
    con.query(`SELECT payment_invoice.*,school_name,sector_name,amount,last_date from payment_invoice join school_info on school_info.id = payment_invoice.school_info_id join sector on sector.id = payment_invoice.sector_id left join sector_child on sector_child.sector_id = sector.id where school_info_id = ${req.query.school_info_id} and type = 2 and class_id=${req.query.class_id} and section_id=${req.query.section_id} group by payment_invoice.id`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
};
