const moment = require('moment')
const axios = require('axios')
const csv = require('csv-parser');
const fs = require('fs');
const util = require('util');
var path = require('path');
const csv2 = require('fast-csv');
const { ignore } = require('nodemon/lib/rules');
module.exports = (app) => {
  const con = require('../models/db')
  const query = util.promisify(con.query).bind(con);
  const authenticateToken = require("../middleware/middleware");
  app.post("/api/create_class", authenticateToken, (req, res) => {
    var school_type_id = req.body.school_type_id;
    var shift_id = req.body.shift_id;
    var class_code = req.body.class_code;
    var class_name = req.body.class_name;
    var id = req.body.id;

    var sql
    if (id) {
      sql = `Update class set school_type_id = "${school_type_id}", shift_id= "${shift_id}", class_code = "${class_code}", class_name = "${class_name}" where id = ${id}`;
    } else {
      sql = `INSERT INTO class (school_type_id, shift_id, class_code, class_name) VALUES ("${school_type_id}", "${shift_id}", "${class_code}", "${class_name}")`;
    }



    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });

  app.post("/api/create_section", authenticateToken, (req, res) => {
    var section_default_name = req.body.section_default_name;
    var id = req.body.id;
    var sql
    if (id) {
      sql = `update section set section_default_name = "${section_default_name}" where id = ${id}`
    } else {
      sql = `INSERT INTO section (section_default_name) VALUES ("${section_default_name}")`;
    }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });

  app.post("/api/create_subject", authenticateToken, (req, res) => {
    var subject_code = req.body.subject_code;
    var subject_name = req.body.subject_name;
    var class_id = req.body.class_id;
    var school_type_id = req.body.school_type_id
    var id = req.body.id

    var sql
    if (id) {
      sql = `update subject set subject_code = "${subject_code}",subject_name="${subject_name}", class_id="${class_id}", school_type_id="${school_type_id}" where id = ${id}`;

    } else {
      sql = `INSERT INTO subject (subject_code,subject_name, class_id, school_type_id) VALUES ("${subject_code}","${subject_name}", "${class_id}", "${school_type_id}")`;

    }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.post("/api/create_period", authenticateToken, (req, res) => {
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var shift_id = req.body.shift_id;
    var period_code = req.body.period_code;
    var school_type_id = req.body.school_type_id
    var id = req.body.id

    var sql
    if (id) {
      sql = `update period set school_info_id="${school_type_id}",shift_id="${shift_id}",period_code="${period_code}" where id = ${id}`;
    } else {
      sql = `INSERT INTO period (school_info_id,shift_id,period_code) VALUES ("${school_type_id}","${shift_id}","${period_code}")`;
    }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });

  app.post("/api/add_teacher", (req, res) => {
    var teacher_code = req.body.teacher_code;
    var title = req.body.title;
    var first_name = req.body.first_name;
    var middle_name = req.body.middle_name;
    var last_name = req.body.last_name;
    var initial = req.body.initial;
    var subject_code = req.body.subject_code;
    var designation = req.body.designation;
    var department = req.body.department;
    var dob = req.body.dob;
    var blood_group = req.body.blood_group;
    var mpo_status = req.body.mpo_status;
    var index_no = req.body.index_no;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var school_info_id = req.body.school_info_id;
    var id = req.body.id;


    var sql
    if (id === '') {
      sql = `INSERT INTO teacher (teacher_code,title,first_name,middle_name,last_name,initial,subject_code,designation,department,dob,blood_group,mpo_status,index_no,mobile,email,school_info_id) VALUES ("${teacher_code}","${title}","${first_name}","${middle_name}","${last_name}","${initial}","${subject_code}","${designation}","${department}","${dob}","${blood_group}","${mpo_status}","${index_no}","${mobile}","${email}","${school_info_id}")`;
    } else {
      sql = `update teacher set teacher_code = "${teacher_code}",title = "${title}",first_name = "${first_name}",middle_name = "${middle_name}",last_name = "${last_name}",initial = "${initial}",subject_code = "${subject_code}",designation = "${designation}",department = "${department}",department = "${department}",dob = "${dob}",blood_group = "${blood_group}",mpo_status = "${mpo_status}",index_no = "${index_no}",mobile = "${mobile}",email = "${email}",school_info_id = "${school_info_id}" where id = "${id}"`
    }
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (id === '') {
        let sql2 = `insert into users (user_type_id,user_code,password,status) values(2,"${teacher_code}","12345",1)`
        con.query(sql2, (err, result, fields) => {
          if (err) throw err
        })
      }
      res.json({ status: "success" });
    });
  });
  app.get("/api/school-admin/profile", (req, res) => {
    con.query(
      `SELECT id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, admin_code, mobile_number, email_address, photo_id,first_name,middle_name,last_name, school_info_id FROM school_admin where id="${req.query.teacher_id}"`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result[0]);
      }
    );
  });

  app.delete("/api/teacher/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    var sql = `delete from teacher where id ="${id}"`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.get("/api/student/filter", (req, res) => {
    const secton_id = req.query.section_id
    const class_id = req.query.class_id
    const session_id = req.query.session_id
    const school_id = req.query.school_id
    let condition = secton_id !== '' ? ` and student_present_status.section_id="${secton_id}"` : ``
    condition += class_id !== '' ? ` and student_present_status.class_id="${class_id}"` : ``
    condition += session_id !== '' && session_id !== undefined ? ` and student_present_status.session_id="${session_id}"` : ``
    console.log(`SELECT student.student_code, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, mobile_no,student.id FROM student left join student_present_status on student_present_status.student_id = student.id where school_info_id = ${school_id} ${condition}`);
    con.query(
      `SELECT student.student_code, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, mobile_no FROM student left join student_present_status on student_present_status.student_id = student.id where student.school_info_id = ${school_id} ${condition}`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/student/admin-search", (req, res) => {
    const secton_id = req.query.section_id
    const class_id = req.query.class_id
    const session_id = req.query.session_id
    const school_info_id = req.query.school_info_id
    const group_id = req.query.group_id
    let condition = secton_id !== '0' && secton_id !== undefined ? ` and student_present_status.section_id="${secton_id}"` : ``
    condition += class_id !== '0' && class_id !== undefined ? ` and student_present_status.class_id="${class_id}"` : ``
    condition += session_id !== '0' && session_id !== undefined ? ` and student_present_status.session_id="${session_id}"` : ``
    condition += group_id !== '0' && group_id !== undefined ? ` and student.group_id="${group_id}"` : ``
    condition += school_info_id !== '0' && school_info_id !== undefined ? ` and student.school_info_id="${school_info_id}"` : ``
console.log( `SELECT student.student_code, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, mobile_no,class_id,session_id,section_id,group_id,student_id  FROM student left join student_present_status on student_present_status.student_id = student.id where 1=1 ${condition}`);
    con.query(
      `SELECT student.student_code, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, mobile_no,class_id,session_id,section_id,group_id,student_id  FROM student left join student_present_status on student_present_status.student_id = student.id where 1=1 ${condition}`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/search/subjects", (req, res) => {
    const section_id = req.query.section_id
    const class_id = req.query.class_id
    const session_id = req.query.session_id
    const school_id = req.query.school_id
    let condition = section_id !== "0" ? ` and routine.section_id="${section_id}"` : ``
    condition += class_id !== "0" ? ` and routine.class_id="${class_id}"` : ``
    condition += session_id !== "0" ? ` and routine.session_id="${session_id}"` : ``
    condition += school_id !== "0" ? ` and routine.school_info_id="${school_id}"` : ``
    con.query(
      `SELECT distinct subject_code,subject_name, subject_id FROM subject left join routine on routine.subject_id = subject.id where 1=1 ${condition}`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get('/api/subjectList', (req, res) => {
    const student_id = req.query.student_id
    let condition = student_id !== undefined && student_id !== "" ? ` and student.student_code="${student_id}"` : ``
    var sql = "select section_default_name,session_year,division_name,class_name,subject_name,student_code,sr.* from subject_registration sr left join session on session.id = sr.session_id left join `group` gp on gp.id = sr.group_id left join class on class.id = sr.class_id left join subject on subject.id = sr.subject_id left join student on student.id = sr.student_id left join section on section.id = sr.section_id where sr.school_info_id=" + req.query.school_id + condition
    console.log(sql);
    con.query(sql,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
  })
  app.get('/api/forthSubjectList', (req, res) => {
    const student_id = req.query.student_id
    let condition = student_id !== undefined && student_id !== "" ? ` and student.student_code="${student_id}"` : ``
    var sql = "select section_default_name,session_year,division_name,class_name,subject_name,student_code,sr.* from subject_4th_registration sr left join session on session.id = sr.session_id left join `group` gp on gp.id = sr.group_id left join class on class.id = sr.class_id left join subject on subject.id = sr.subject_4th_id left join student on student.id = sr.student_id left join section on section.id = sr.section_id where sr.school_info_id=" + req.query.school_id + condition
    con.query(sql,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
  })
  app.get('/api/groups/all', (req, res) => {
    con.query(
      "SELECT * FROM `group` order by id desc",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  })
  app.post("/api/add_student", (req, res) => {
    var student_code = req.body.student_code;
    var first_name = req.body.first_name;
    var middle_name = req.body.middle_name;
    var last_name = req.body.last_name;
    var gender_id = req.body.gender_id;
    var present_address = req.body.present_address;
    var permanent_address = req.body.permanent_address;
    var father_phone_number = req.body.father_phone_number;
    var mother_name = req.body.mother_name;
    var mother_phone_number = req.body.mother_phone_number;
    var photo_id = req.body.photo_id;
    var dob = req.body.dob;
    var blood_group = req.body.blood_group;
    var father_name = req.body.father_name;
    var mobile_no = req.body.mobile_no;
    var email = req.body.email;
    var school_info_id = req.body.school_info_id;
    var division_id = req.body.division_id;
    var classID = req.body.classID;
    var sectionID = req.body.sectionID;
    var sessionID = req.body.sessionID;
    var shiftID = req.body.shiftID;
    var id = req.body.id;


    var sql
    if (id === '') {
      sql = `INSERT INTO student (student_code,first_name,middle_name,last_name,mobile_no,gender_id,email,present_address,permanent_address,father_name,father_phone_number,mother_name,mother_phone_number,dob,blood_group,photo_id,school_info_id) VALUES ("${student_code}","${first_name}","${middle_name}","${last_name}","${mobile_no}","${gender_id}","${email}","${present_address}","${permanent_address}","${father_name}","${father_phone_number}","${mother_name}","${mother_phone_number}","${dob}","${blood_group}","${photo_id}","${school_info_id}")`;
    } else {
      sql = `update student set student_code = "${student_code}",first_name = "${first_name}",middle_name = "${middle_name}",last_name = "${last_name}",mobile_no = "${mobile_no}",gender_id = "${gender_id}",email = "${email}",present_address = "${present_address}",father_name = "${father_name}",father_phone_number = "${father_phone_number}",mother_name = "${mother_name}",mother_phone_number = "${mother_phone_number}",dob = "${dob}",blood_group = "${blood_group}",photo_id = "${photo_id}",school_info_id = "${school_info_id}" where id = ${id}`
    }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (id === '') {
        let sql3 = `insert into student_present_status (school_info_id,session_id,shift_id,student_id,class_id,section_id,class_roll_no) values("${school_info_id}","${sessionID}","${shiftID}","${result.insertId}","${classID}","${sectionID}",0)`
        con.query(sql3)
        let sql2 = `insert into users (user_type_id,user_code,password,status) values(1,"${student_code}","12345",1)`
        con.query(sql2, (err, result, fields) => {
          if (err) throw err
        })
      }
      res.json({ status: "success" });
    });
  });
  app.post("/api/csvUpload", (req, res) => {

    const file = req.files.file
    const option = req.body.option
    console.log(option);
    var uploadPath = path.resolve(__dirname, '../../uploads/');
    file.mv(`${uploadPath}/${file.name}`, err => {
      if (err) {
        return res.status(500).send(err)
      }
    })

    let streamR = fs.createReadStream(`${uploadPath}/${file.name}`);
    let csvDataR = [];
    let csvStream = csv2
      .parse()
      .on("data", function (data) {
        csvDataR.push(data);
      })
      .on("end", async function () {
        // console.log('csvDataR',csvDataR);
        // Remove Header ROW
        csvDataR.shift();
        let students = []
        let presents = []
        let users = []
        if (option === 'student') {
          await csvDataR.filter(res => (res[0] !== '') && students.push([res[0], res[1], res[2], res[3], res[4], res[5], res[6], res[7], res[8], res[9], res[10], res[11], res[12], res[13], res[14], res[15], res[16], res[17], res[18]]))
          let sql = `insert into student(student_code,first_name,middle_name,last_name,mobile_no,gender_id,group_id,email,present_address, permanent_address,father_name,father_phone_number,mother_name,mother_phone_number,dob,blood_group,photo_id,school_info_id,position) values ?`
          con.query(sql, [students], async (err, result, fields) => {
            if (err) throw err
            let codes = []
            await csvDataR.filter(res => codes.push([res[0]]))
            con.query(`select id from student where (student_code) in (?)`, [codes], async (err, result, fields) => {
              if (err) throw err
              console.log(result);
              await csvDataR.filter((res, index) => (res[0] !== '') && presents.push([res[17], res[19], res[20], result[index].id, res[21], res[22], 0]))
              await csvDataR.filter(res => (res[0] !== '') && users.push([1, res[0], "12345", 1]))
              await query(`insert into student_present_status (school_info_id,session_id,shift_id,student_id,class_id,section_id,class_roll_no) values ?`, [presents])
              await query(`insert into users (user_type_id,user_code,password,status) values ?`, [users])
            })
          })

        }
        if (option === "teacher") {
          let teachers = []
          let users = []
          await csvDataR.filter(res => (res[0] !== '') && teachers.push([res[0], res[1], res[2], res[3], res[4], res[5], res[6] === '' ? 0 : res[6], res[7], res[8], res[9], res[10] === '' ? 0 : res[10], res[11] === '' ? 0 : res[11], res[12] === '' ? 0 : res[12], res[13] === '' ? 0 : res[13], res[14], res[15]]))
          await csvDataR.filter(res => (res[0] !== '') && users.push([2, res[0], "12345", 1]))

          const sql = `INSERT INTO teacher (teacher_code,title,first_name,middle_name,last_name,initial,subject_code,designation,department,dob,blood_group,mpo_status,index_no,mobile,email,school_info_id) VALUES ?`;
          await query(sql, [teachers])
          await query(`insert into users (user_type_id,user_code,password,status) values ?`, [users])
        }
        if (option === "routine") {
          let routines = []
          await csvDataR.filter(res => {
            if (res[0] !== '') {
              let splitInsertData = res[0].replaceAll('"', '').split(';')
              routines.push([splitInsertData[0], splitInsertData[1], splitInsertData[2], splitInsertData[3], splitInsertData[4], splitInsertData[5], splitInsertData[6], splitInsertData[7], splitInsertData[8], splitInsertData[9], splitInsertData[10], splitInsertData[11]])

            }
          })
          const sql = `INSERT INTO routine (class_id, section_id, day_id, period_id,start_time,end_time, subject_id, teacher_id, room, school_info_id, session_id, shift_id) VALUES ?`
          await query(sql, [routines])
        }
      })
    streamR.pipe(csvStream);
    res.json({ status: "success" });

  });
  app.post("/api/save/subjectRegistration", async (req, res) => {
    var studentChecked = req.body.studentChecked;
    var subjectChecked = req.body.subjectChecked;
    var forthChecked = req.body.forthChecked;
    var group_id = req.body.group_id;
    var school_info_id = req.body.school_info_id;
    const date = moment().format("YYYY-MM-DD")
    // var id = req.body.id;
    var sql

    const inserData = await Promise.all(studentChecked.map(res => {
      subjectChecked.length > 0 && subjectChecked.map(resSub => {
        con.query(`select id from subject_registration where school_info_id="${school_info_id}" and student_id= "${res.student_id}" and subject_id= "${resSub.subject_id}" and section_id = "${res.section_id}"`, function (err, result, fields) {
          if (result.length === 0) {
            sql = `insert into subject_registration (school_info_id,student_id,session_id,group_id,class_id,subject_id,section_id,created_at) values ("${school_info_id}","${res.student_id}","${res.session_id}","${group_id}","${res.class_id}","${resSub.subject_id}","${res.section_id}","${date}")`

            con.query(sql, function (err, result, fields) {
              if (err) throw err;
            });
          }
        })
      })
      forthChecked.length > 0 && forthChecked.map(resSub => {
        con.query(`select id from subject_registration where school_info_id="${school_info_id}" and student_id= "${res.student_id}" and subject_id= "${resSub.subject_id}" and section_id = "${res.section_id}"`, function (err, result, fields) {
          if (result.length === 0) {
            sql = `insert into subject_4th_registration (school_info_id,student_id,session_id,group_id,class_id,subject_4th_id,section_id,created_at) values ("${school_info_id}","${res.student_id}","${res.session_id}","${group_id}","${res.class_id}","${resSub.subject_id}","${res.section_id}","${date}")`

            con.query(sql, function (err, result, fields) {
              if (err) throw err;
            });
          }
        })
      })
    }))
    res.json({ status: "success" });


    // var sql
    // if (id === '') {
    //     sql = `INSERT INTO student (student_code,first_name,middle_name,last_name,mobile_no,gender_id,email,present_address,permanent_address,father_name,father_phone_number,mother_name,mother_phone_number,dob,blood_group,photo_id,school_info_id) VALUES ("${student_code}","${first_name}","${middle_name}","${last_name}","${mobile_no}","${gender_id}","${email}","${present_address}","${permanent_address}","${father_name}","${father_phone_number}","${mother_name}","${mother_phone_number}","${dob}","${blood_group}","${photo_id}","${school_info_id}")`;
    // } else {
    //     sql = `update student set student_code = "${student_code}",first_name = "${first_name}",middle_name = "${middle_name}",last_name = "${last_name}",mobile_no = "${mobile_no}",gender_id = "${gender_id}",email = "${email}",present_address = "${present_address}",father_name = "${father_name}",father_phone_number = "${father_phone_number}",mother_name = "${mother_name}",mother_phone_number = "${mother_phone_number}",dob = "${dob}",blood_group = "${blood_group}",photo_id = "${photo_id}",school_info_id = "${school_info_id}" where id = ${id}`
    // }

    // con.query(sql, function (err, result, fields) {
    //     if (err) throw err;
    //     res.json({ status: "success" });
    // });
  });

  function student_info(class_id, sectionId, studentId, school_id, school_type, sector_id) {
    if (studentId === 'all') {
      con.query(`select * from student_info where school_info_id = ${school_id} and class_id = ${class_id} and section_id = ${sectionId}`, function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          sql = `INSERT INTO sector_child (class_id,school_id,section_id,student_id,sector_id) VALUES `
          result.map(stu => {
            sql += `("${class_id}","${school_id}","${sectionId}","${stu.id}","${sector_id}"),`
          })
          sql = sql.slice(0, -1);
          console.log(sql);
          con.query(sql, function (err, result, fields) {
            if (err) throw err;
            // res.json({ status: "success" });
          });
        }
      })
    } else {
      sql = `INSERT INTO sector_child (class_id,school_id,section_id,student_id,sector_id) VALUES `
      sql += `("${class_id}","${school_id}","${sectionId}","${studentId}","${sector_id}"),`
      sql = sql.slice(0, -1);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // res.json({ status: "success" });
      });
    }
  }
  function section_info(class_id, sectionId, studentId, school_id, school_type, sector_id) {
    if (sectionId === 'all') {
      con.query(`select * from section`, function (err, result, fields) {
        if (err) throw err;
        result.map(sec => {
          student_info(class_id, sec.id, studentId, school_id, school_type, sector_id)

        })
      })
    } else {
      student_info(class_id, sectionId, studentId, school_id, school_type, sector_id)
    }
  }
  app.post("/api/add_sector", (req, res) => {
    var sector_code = req.body.sector_code;
    var sector_name = req.body.sector_name;
    var classId = req.body.class_id;
    var sectionId = req.body.section_id;
    var studentId = req.body.student_id;
    var lastDate = req.body.last_date;
    var school_id = req.body.school_id;
    var school_type = req.body.school_type;
    var amount = req.body.amount;
    var id = req.body.id;


    var sql
    if (id === '') {
      con.query(`insert into sector (sector_code,sector_name,amount,last_date,allsection,allstudent,allclass) values ("${sector_code}","${sector_name}","${amount}","${lastDate}","${sectionId === 'all' ? 1 : 0}","${studentId === 'all' ? 1 : 0}","${classId === 'all' ? 1 : 0}")`, function (err, result, fields) {
        const sectorId = result.insertId
        if (err) throw err;
        if (classId === 'all') {
          con.query(`select * from class where school_type_id = ${school_type}`, function (err, result, fields) {
            if (err) throw err;
            result.map(cls => {
              section_info(cls.id, sectionId, studentId, school_id, school_type, sectorId)
            })
          })
        } else {
          section_info(classId, sectionId, studentId, school_id, school_type, sectorId)
        }

        res.json({ status: "success" });
      })
    } else {
      con.query(`delete from sector_child where id = ${id}`)
      sql = `update sector set sector_code = "${sector_code}",sector_name = "${sector_name}",last_date = "${lastDate}",amount = "${amount}",allsection="${sectionId === 'all' ? 1 : 0}",allstudent="${studentId === 'all' ? 1 : 0}",allclass="${classId === 'all' ? 1 : 0}" where id = ${id}`
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (classId === 'all') {
          con.query(`select * from class where school_type_id = ${school_type}`, function (err, result, fields) {
            if (err) throw err;
            result.map(cls => {
              section_info(cls.id, sectionId, studentId, school_id, school_type, id)
            })
          })
        } else {
          section_info(classId, sectionId, studentId, school_id, school_type, id)
        }
        res.json({ status: "success" });
      });
    }


  });
  app.post("/api/save/smsReport", (req, res) => {
    var smsText = req.body.smsText;
    var user_id = req.body.user_id;
    var purpose = req.body.purpose;
    var school_info_id = req.body.school_info_id;
    var receive_id = req.body.receive_id;
    // var id = req.body.id;


    var sql
    // if (id === '') { 
    sql = `INSERT INTO smsReport (user_id,text,purpose,school_info_id,receive_id) VALUES ("${user_id}","${smsText}","${purpose}","${school_info_id}","${receive_id}")`;
    // } else {
    //     sql = `update student set student_code = "${student_code}",first_name = "${first_name}",middle_name = "${middle_name}",last_name = "${last_name}",mobile_no = "${mobile_no}",gender_id = "${gender_id}",email = "${email}",present_address = "${present_address}",father_name = "${father_name}",father_phone_number = "${father_phone_number}",mother_name = "${mother_name}",mother_phone_number = "${mother_phone_number}",dob = "${dob}",blood_group = "${blood_group}",photo_id = "${photo_id}",school_info_id = "${school_info_id}" where id = ${id}`
    // }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.post("/api/smsCountUpdate", (req, res) => {
    var school_info_id = req.body.school_info_id;


    var sql
    // if (id === '') { 
    sql = `update sms_count  set sms_limit = sms_limit-1 where school_info_id = "${school_info_id}"`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });

  app.get('/api/sms/count', async (req, res) => {
    try {
      const test = await axios.get('http://isms.zaman-it.com/miscapi/C200164162b496a4b069b1.94693919/getBalance')

      var sql = `SELECT smsReport.*, CONCAT(teacher.first_name, ' ', teacher.middle_name, ' ',
    teacher.last_name) AS teacher_full_name, CONCAT(school_admin.first_name, ' ', 
    school_admin.middle_name, ' ', school_admin.last_name) AS school_admin_full_name,
     CONCAT(t.first_name, ' ', t.middle_name, ' ',
    t.last_name) AS teacher_receiver_name,student_info.full_name AS student_receiver_name,class_name,t.teacher_code ,student_info.student_code,section_default_name
   FROM smsReport
   LEFT JOIN teacher ON teacher.teacher_code = smsReport.user_id
   LEFT JOIN school_admin ON school_admin.admin_code = smsReport.user_id
   LEFT JOIN teacher t ON t.id = smsReport.receive_id
   LEFT JOIN student_info ON student_info.student_code = smsReport.receive_id
   WHERE smsReport.school_info_id = ${req.query.school_info_id} order by created_at desc`
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send({ result: result, data: test.data });
      });
    } catch (err) {
      res.send({ result: [], data: '' })
    }

  })
  app.get('/api/sms/count_report', async (req, res) => {
    const test = await axios.get('http://isms.zaman-it.com/miscapi/C200164162b496a4b069b1.94693919/getBalance')
    let type_id = req.query.type_id
    let payment = 0
    var sql
    if (type_id === '1') {
      sql = `select sms_payment.*,CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name,school_name from sms_payment left join school_info on school_info.id = sms_payment.school_info_id left join school_admin on school_admin.id =sms_payment.user_id where sms_payment.school_info_id = ${req.query.school_info_id}`
    } else {
      sql = `select payment.*,full_name,student_code,school_name,amount,sector_name,class_name,section_default_name from payment  left join student_info on student_info.id =payment.user_id join sector on sector.id = payment.sector_id left join payment_invoice on payment_invoice.invoice_no=payment.invoice_no where student_info.school_info_id = ${req.query.school_info_id} and status = 1 group BY payment.user_id,invoice_no`
      let data = await query(`select sum(amount) as total_amount from payment  left join student_info on student_info.id =payment.user_id join sector on sector.id = payment.sector_id left join payment_invoice on payment_invoice.invoice_no=payment.invoice_no where student_info.school_info_id = ${req.query.school_info_id} and status = 1`)
      payment = data[0].total_amount
    }
    // var 
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send({ result: result, data: test.data, payment: payment });
    });
  })
  app.get("/api/sector/all", (req, res) => {
    var sql
    // if (id === '') {
    sql = `select sector.*,class_name,section_default_name,full_name from sector left join sector_child on sector_child.sector_id = sector.id left join student_info on student_info.id = sector_child.student_id where school_id = ${req.query.school_id} group by sector.id order by sector.id desc`;


    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
  app.get("/api/sectorBySchool", (req, res) => {
    var sql
    sql = `select * from sector left join sector_child on sector_child.sector_id = sector.id where school_id="${req.query.school_id}" and class_id = ${req.query.class_id} and section_id=${req.query.section_id}`;


    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
  app.get("/api/smsCheck", (req, res) => {
    var sql
    sql = `select * from sms_count where school_info_id="${req.query.school_id}"`;

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result[0])
    });
  });

  app.delete("/api/student/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    con.query(`delete from notice_user where student_id ="${id}"`)
    con.query(`select student_present_status.id,student_code from student_present_status left join student on student.id = student_present_status.student_id where student_id ="${res.id}"`, function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        con.query(`delete from attendance where student_present_status_id ="${result[0].id}"`)
        con.query(`delete from users where user_code ="${result[0].student_code}"`)
      }

      con.query(`delete from subject_registration where student_id ="${id}"`)
      con.query(`delete from student_present_status where student_id ="${id}"`)
      var sql = `delete from student where id ="${id}"`
      console.log(sql)
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ status: "success" });
      });
    });
  });
  app.post("/api/student/deleteAll", authenticateToken, async (req, res1) => {
    var checkedStudent = req.body.checkedStudent;
    var students = req.body.students;
    let ids = []
    let stud = []
    let codes = []
    await students.filter((res, index) => { if (checkedStudent[index] === true) ids.push([res.id]) })
    await students.filter((res, index) => { if (checkedStudent[index] === true) stud.push([res.student_present_status_id]) })
    await students.filter((res, index) => { if (checkedStudent[index] === true) codes.push([res.student_code]) })
    await query(`delete from notice_user where (student_id) in (?)`, [ids])
    await query(`delete from attendance where (student_present_status_id) in (?)`, [stud])
    await query(`delete from users where (user_code) in (?)`, [codes])
    await query(`delete from subject_registration where (student_id) in (?)`, [ids])
    await query(`delete from student_present_status where (student_id) in (?)`, [ids])
    await query(`delete from student where (id) in (?)`, [ids])

    res1.json({ status: "success" });

  });
  app.delete("/api/section/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    var sql = `delete from section where id ="${id}"`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.post("/api/update_sms_payment", authenticateToken, (req, res) => {
    var id = req.body.id;
    var sql = `update  sms_payment set status = 2 where id ="${id}"`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "Status Updated" });
    });
  });
  app.delete("/api/payment/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    con.query(`delete from sector_child where sector_id=${id}`)
    var sql = `delete from sector where id ="${id}"`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.delete("/api/subRegistration/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    var sql = `delete from subject_registration where id ="${id}"`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.delete("/api/forthSubject/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    var sql = `delete from subject_4th_registration where id ="${id}"`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.post("/api/school/profile_update", authenticateToken, (req, res) => {
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
    var sql = `Update school_admin 
    set mobile_number="${mobile}",
    email_address="${email}",first_name="${firstName}",last_name="${lastName}",middle_name="${middleName}",photo_id="${attachment_link}" 
    where admin_code="${req.query.student_code}"
    
    `
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}