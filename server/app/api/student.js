
var path = require('path');
module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/student/profile", (req, res) => {
    con.query(
      `SELECT student_present_status.id, CONCAT( student.first_name, ' ', student.middle_name, ' ', student.last_name ) AS full_name, student_present_status.section_id, student.student_code,student.school_info_id,session_id,class_id 
      FROM student_present_status 
      join student on student_present_status.student_id=student.id 
      where student_present_status.id="${req.query.student_id}";`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/student/section", authenticateToken, (req, res) => {
    con.query(
      `SELECT student_present_status.id,mobile_no,student.id as student_id, CONCAT( student.first_name, ' ', student.middle_name, ' ', student.last_name ) AS full_name, student_present_status.section_id, student.student_code 
      FROM student_present_status 
      join student on student_present_status.student_id=student.id 
      where student_present_status.section_id="${req.query.section_id}"and student_present_status.class_id="${req.query.class_id}" and student_present_status.school_info_id="${req.query.school_info_id}";`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/student/count/section/all", authenticateToken, (req, res) => {
    con.query(
      `select section.id, section.section_default_name, section.class_id, class.class_name, 
      count(*) as "total"
        from student_present_status
          join section on student_present_status.section_id=section.id
          join class on section.class_id=class.id
            group by section_id;`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/student/all", authenticateToken, (req, res) => {
    let condition = req.query.student_id !== undefined && req.query.student_id !== ""?` and student.student_code= "${req.query.student_id}"`:``
    con.query(`SELECT * FROM student where student.school_info_id="${req.query.school_info_id}"${condition}`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.post("/api/student/profile_update", authenticateToken, (req, res) => {
    var mobile = req.body.mobile;
    var email = req.body.email;
    var sql = `Update student 
    set mobile_no="${mobile}",
        email="${email}" 
    where student_code="${req.query.student_code}"
    
    `
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.post("/api/student/profile_photo_update", authenticateToken, (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' })
    }
    const file = req.files.file
    var uploadPath = path.resolve(__dirname, '../../../client/public/uploads/');
    file.mv(`${uploadPath}/${file.name}`, err => {
      if (err) {
        return res.status(500).send(err)
      }
    })
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    // var mobile = req.body.mobile;
    // var email = req.body.email;
    // var sql = `Update student 
    // set mobile_no="${mobile}",
    //     email="${email}" 
    // where student_code="${req.query.student_code}"

    // `
    // con.query(sql, function (err, result, fields) {
    //   if (err) throw err;
    //   res.send(result);
    // });
  });
  app.get("/api/gender", authenticateToken, (req, res) => {
    con.query("SELECT * FROM gender", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/division", authenticateToken, (req, res) => {
    con.query("SELECT * FROM divisions", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
};
