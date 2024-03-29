var path = require('path');
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
      `SELECT teacher.id,first_name,last_name,middle_name, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, initial, teacher_code, mobile, school_name,designation,department,email,blood_group,dob, school_info_id,photo_id FROM teacher left join school_info on school_info.id = teacher.school_info_id where teacher.id="${req.query.teacher_id}"`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result[0]);
      }
    );
  });
  app.get("/api/teacher/filter", (req, res) => {

    let condition = req.query.teacher_id !== undefined && req.query.teacher_id !== "" ? ` and teacher_code = ${req.query.teacher_id}` : ``
    condition += req.query.searchSectionID !== undefined && req.query.searchSectionID !== "" ? ` and routine.section_id = ${req.query.searchSectionID}` : ``
    condition += req.query.searchClassID !== undefined && req.query.searchClassID !== "" ? ` and routine.class_id = ${req.query.searchClassID}` : ``
    con.query(
      `SELECT teacher.id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name,first_name,last_name,middle_name,title, initial, teacher_code,dob,blood_group, mobile,designation, email, subject_code,mpo_status,index_no,teacher.school_info_id FROM teacher left join routine on routine.teacher_id= teacher.id where teacher.school_info_id="${req.query.school_info_id}"${condition} group by teacher.id`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/teacher/all", authenticateToken, (req, res) => {
    con.query("SELECT * FROM teacher order by id desc", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/teacher/schoolWise", authenticateToken, (req, res) => {
    let condition = req.query.school_info_id === 'all'?'':` and school_info_id="${req.query.school_info_id}"`
    con.query(`SELECT id,CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name,teacher_code,mobile as mobile_no FROM teacher where 1=1 ${condition}`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/teacher/profile_update", authenticateToken, (req, res) => {
    var mobile = req.body.mobileNo ? req.body.mobileNo : 0;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var middleName = req.body.middleName;
    var dob = req.body.dob;
    var bloodGroup = req.body.bloodGroup;
    var initial = req.body.initial;
    var designation = req.body.designation;
    var department = req.body.department;
    const file = req.files === null ? undefined : req.files.file
    var attachment_link = req.body.fileName;
    if (file !== undefined) {
      var uploadPath = path.resolve(__dirname, '../../uploads/');
      file.mv(`${uploadPath}/${file.name}`, err => {
        if (err) {
          return res.status(500).send(err)
        }
      })
    }
    var sql = `update teacher set first_name = "${firstName}",middle_name = "${middleName}",last_name = "${lastName}",dob = "${dob}",blood_group = "${bloodGroup}",mobile = "${mobile}",email = "${email}",photo_id="${attachment_link}",initial = "${initial}",department="${department}",designation="${designation}" where id = "${req.query.student_code}"`

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

};
