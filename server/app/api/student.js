
var path = require('path');
module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/student/profile", (req, res) => {
    con.query(
      `select * from student_info where id="${req.query.student_id}";`,
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
    let condition = req.query.student_id !== undefined && req.query.student_id !== "" ? ` and student_info.student_code= "${req.query.student_id}"` : ``
    condition += req.query.searchSectionID !== undefined && req.query.searchSectionID !== "" ? ` and student_info.section_id= "${req.query.searchSectionID}"` : ``
    condition += req.query.searchClassID !== undefined && req.query.searchClassID !== "" ? ` and student_info.class_id= "${req.query.searchClassID}"` : ``
    con.query(`SELECT student_info.* FROM student_info where student_info.school_info_id="${req.query.school_info_id}"${condition}`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.post("/api/student/profile_update", authenticateToken, (req, res) => {
    var mobile = req.body.mobileNo ? req.body.mobileNo : 0;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var middleName = req.body.middleName;
    var presentAddress = req.body.presentAddress;
    var permanentAddress = req.body.permanentAddress;
    var sex = req.body.sex ? req.body.sex : 1;
    var fatherMobileNo = req.body.fatherMobileNo ? req.body.fatherMobileNo : 0;
    var fatherName = req.body.fatherName;
    var motherMobileNo = req.body.motherMobileNo ? req.body.motherMobileNo : 0;
    var motherName = req.body.motherName;
    var dob = req.body.dob;
    var bloodGroup = req.body.bloodGroup;
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
    var sql = `Update student 
    set mobile_no="${mobile}",
        email="${email}",first_name="${firstName}",last_name="${lastName}",middle_name="${middleName}",present_address="${presentAddress}",permanent_address="${permanentAddress}",gender_id="${sex}",father_name="${fatherName}",father_phone_number="${fatherMobileNo}",mother_name="${motherName}",mother_phone_number="${motherMobileNo}",dob="${dob}",blood_group="${bloodGroup}",photo_id="${attachment_link}" 
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
    var uploadPath = path.resolve(__dirname, '../../uploads/');
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
  app.get("/api/allPayment", authenticateToken, (req, res) => {
    con.query(`SELECT payment.*,sector_name,amount FROM payment left join sector on sector.id = payment.sector_id left join payment_invoice on payment_invoice.invoice_no = payment.invoice_no where payment.user_id = ${req.query.student_code} and type=2 order by payment.id desc`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/allPaymentSchool", authenticateToken, (req, res) => {
    con.query(`SELECT payment.*,sector_name,amount FROM payment left join sector on sector.id = payment.sector_id left join payment_invoice on sector.id = payment_invoice.sector_id where school_info_id = ${req.query.school_id} order by payment.id desc`, function (err, result, fields) {
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
  app.get("/api/getStudentId", authenticateToken, (req, res) => {
    con.query(`SELECT student.id FROM student where student_code = "${req.query.student_code}"`, function (err, result, fields) {
      if (err) throw err;
      res.send(result[0]);
    });
  });
  app.post("/api/create_payment", authenticateToken, (req, res) => {
    var invoice = req.body.invoice;
    var sector_id = req.body.sector_id;
    var student_id = req.body.student_id;
    var transaction_id = req.body.transaction_id;
    var paidDate = req.body.paidDate;

    con.query(`select * from payment where invoice_no=${invoice}`, function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        var sql = `INSERT INTO payment (sector_id, student_id, invoice_no, transaction_id, paid_date) VALUES ("${sector_id}", "${student_id}", "${invoice}", "${transaction_id}", "${paidDate}")`;

        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          res.json({ status: "Paid Successfully" });
        });
      }else{
        res.json({ status: "Already Paid", });
      }
    });
  });
  app.post("/api/create_sms_payment", authenticateToken, (req, res) => {
    var invoice = req.body.invoice;
    var user_id = req.body.user_id;
    var school_info_id = req.body.school_info_id;
    var transaction_id = req.body.transaction_id;
    var paidDate = req.body.paidDate;

  
        var sql = `INSERT INTO sms_payment (user_id, school_info_id, invoice_no, transaction_id, payment_date,amount) VALUES ("${user_id}", "${school_info_id}", "${invoice}", "${transaction_id}", "${paidDate}","1000")`;

        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          res.json({ status: "Paid Successfully" });
        });
  });
};
