const moment = require('moment')
const axios = require('axios')
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');
const csv2 = require('fast-csv');
const { ignore } = require('nodemon/lib/rules');
module.exports = (app) => {
  const con = require('../models/db')
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
    if(id){
      sql = `update subject set subject_code = "${subject_code}",subject_name="${subject_name}", class_id="${class_id}", school_type_id="${school_type_id}" where id = ${id}`;

    }else{
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
    if(id){      
    sql = `update period set school_info_id="${school_type_id}",shift_id="${shift_id}",period_code="${period_code}" where id = ${id}`;
    }else{
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
      res.json({ status: "success" });
    });
  });
  app.get("/api/school-admin/profile", (req, res) => {
    con.query(
      `SELECT id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, admin_code, mobile_number, email_address, school_info_id FROM school_admin where id="${req.query.teacher_id}"`,
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
    let condition = secton_id !== '' ? ` and student_present_status.section_id="${secton_id}"` : ``
    condition += class_id !== '' ? ` and student_present_status.class_id="${class_id}"` : ``
    condition += session_id !== '' ? ` and student_present_status.session_id="${session_id}"` : ``
    con.query(
      `SELECT student.student_code, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, mobile_no FROM student left join student_present_status on student_present_status.student_id = student.id where 1=1 ${condition}`,
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
    let condition = secton_id !== '0' ? ` and student_present_status.section_id="${secton_id}"` : ``
    condition += class_id !== '0' ? ` and student_present_status.class_id="${class_id}"` : ``
    condition += session_id !== '0' ? ` and student_present_status.session_id="${session_id}"` : ``
    condition += group_id !== '0' ? ` and student.group_id="${group_id}"` : ``
    condition += school_info_id !== '0' ? ` and student.school_info_id="${school_info_id}"` : ``

    console.log(`SELECT student.student_code, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, mobile_no,class_id,session_id,section_id,group_id,student_id  FROM student left join student_present_status on student_present_status.student_id = student.id where 1=1 ${condition}`)
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
    var sql = "select section_default_name,session_year,division_name,class_name,subject_name,student_code,sr.* from subject_registration sr left join session on session.id = sr.session_id left join `group` gp on gp.id = sr.group_id left join class on class.id = sr.class_id left join subject on subject.id = sr.subject_id left join student on student.id = sr.student_id left join section on section.id = sr.section_id where sr.school_info_id="+req.query.school_id + condition
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
    var sql = "select section_default_name,session_year,division_name,class_name,subject_name,student_code,sr.* from subject_4th_registration sr left join session on session.id = sr.session_id left join `group` gp on gp.id = sr.group_id left join class on class.id = sr.class_id left join subject on subject.id = sr.subject_4th_id left join student on student.id = sr.student_id left join section on section.id = sr.section_id where sr.school_info_id="+req.query.school_id + condition
    con.query(sql,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
  })
  app.get('/api/groups/all', (req, res) => {
    con.query(
      "SELECT * FROM `group`",
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
    var id = req.body.id;


    var sql
    if (id === '') {
      sql = `INSERT INTO student (student_code,first_name,middle_name,last_name,mobile_no,gender_id,email,present_address,permanent_address,father_name,father_phone_number,mother_name,mother_phone_number,dob,blood_group,photo_id,school_info_id) VALUES ("${student_code}","${first_name}","${middle_name}","${last_name}","${mobile_no}","${gender_id}","${email}","${present_address}","${permanent_address}","${father_name}","${father_phone_number}","${mother_name}","${mother_phone_number}","${dob}","${blood_group}","${photo_id}","${school_info_id}")`;
    } else {
      sql = `update student set student_code = "${student_code}",first_name = "${first_name}",middle_name = "${middle_name}",last_name = "${last_name}",mobile_no = "${mobile_no}",gender_id = "${gender_id}",email = "${email}",present_address = "${present_address}",father_name = "${father_name}",father_phone_number = "${father_phone_number}",mother_name = "${mother_name}",mother_phone_number = "${mother_phone_number}",dob = "${dob}",blood_group = "${blood_group}",photo_id = "${photo_id}",school_info_id = "${school_info_id}" where id = ${id}`
    }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.post("/api/csvUpload", (req, res) => {

    const file = req.files.file
    const option = req.body.option
    console.log(option);
    var uploadPath = path.resolve(__dirname, '../../../client/public/uploads/');
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
      .on("end", function () {
        // console.log('csvDataR',csvDataR);
        // Remove Header ROW
        csvDataR.shift();
        csvDataR.map(res => {
          if (option === 'student') {
            let sql = `insert into student(student_code,first_name,middle_name,last_name,mobile_no,gender_id,group_id,email,present_address, permanent_address,father_name,father_phone_number,mother_name,mother_phone_number,dob,blood_group,photo_id,school_info_id) values ("${res[0]}","${res[1]}","${res[2]}","${res[3]}","${res[4]}","${res[5]}","${res[6]}","${res[7]}","${res[8]}","${res[9]}","${res[10]}","${res[11]}","${res[12]}","${res[13]}","${res[14]}","${res[15]}","${res[16]}","${res[17]}")`
            con.query(sql, (err, result, fields) => {
              if (err) throw err
            })
          }
          if (option === "teacher") {
            const sql = `INSERT INTO teacher (teacher_code,title,first_name,middle_name,last_name,initial,subject_code,designation,department,dob,blood_group,mpo_status,index_no,mobile,email,school_info_id) VALUES ("${res[0]}","${res[1]}","${res[2]}","${res[3]}","${res[4]}","${res[5]}","${res[6]}","${res[7]}","${res[8]}","${res[9]}","${res[10]}","${res[11]}","${res[12]}","${res[13]}","${res[14]}","${res[15]}")`;
            con.query(sql, function (err, result, fields) {
              if (err) throw err;
            });
          }
          if (option === "routine") {
            let splitInsertData = res[0].replaceAll('"', '').split(';')
            const sql = `INSERT INTO routine (class_id, section_id, day_id, period_id,start_time,end_time, subject_id, teacher_id, room, school_info_id, session_id, shift_id) VALUES ("${splitInsertData[0]}", "${splitInsertData[1]}", "${splitInsertData[2]}", "${splitInsertData[3]}","${splitInsertData[4]}","${splitInsertData[5]}", "${splitInsertData[6]}", "${splitInsertData[7]}", "${splitInsertData[8]}", "${splitInsertData[9]}", "${splitInsertData[10]}", "${splitInsertData[11]}" )`;

            con.query(sql, function (err, result, fields) {
              if (err) throw err;
            });
          }
        })
      })
    streamR.pipe(csvStream);
    res.json({ status: "success" });



    // let csvData = [];
    // let stream = fs.createReadStream(`${uploadPath}/${file.name}`).pipe(csv({})).on('data', (data => csvData.push(data))).on('end', () => {
    //     // csvData.shift()
    //     csvData.map(res => {
    //         let newD= JSON.stringify(res).replace(/[{()}]/g, '').split(":")
    //         const newInsertData = newD[1].replaceAll('\\', '').replaceAll('"','')
    //         const insertArray = newInsertData.split(";")
    //         if (option === 'student') {
    //             let sql = `insert into student(student_code,first_name,middle_name,last_name,mobile_no,gender_id,group_id,email,present_address, permanent_address,father_name,father_phone_number,mother_name,mother_phone_number,dob,blood_group,photo_id,school_info_id) values ("${insertArray[0]}","${insertArray[1]}","${insertArray[2]}","${insertArray[3]}","${insertArray[4]}","${insertArray[5]}","${insertArray[6]}","${insertArray[7]}","${insertArray[8]}","${insertArray[9]}","${insertArray[10]}","${insertArray[11]}","${insertArray[12]}","${insertArray[13]}","${insertArray[14]}","${insertArray[15]}","${insertArray[16]}","${insertArray[17]}")`
    //             con.query(sql, (err, result, fields) => {
    //                 if (err) throw err
    //             })
    //         }
    //         if(option === "teacher"){
    //            const sql = `INSERT INTO teacher (teacher_code,title,first_name,middle_name,last_name,initial,subject_code,designation,department,dob,blood_group,mpo_status,index_no,mobile,email,school_info_id) VALUES ("${insertArray[0]}","${insertArray[1]}","${insertArray[2]}","${insertArray[3]}","${insertArray[4]}","${insertArray[5]}","${insertArray[6]}","${insertArray[7]}","${insertArray[8]}","${insertArray[9]}","${insertArray[10]}","${insertArray[11]}","${insertArray[12]}","${insertArray[13]}","${insertArray[14]}","${insertArray[15]}")`;
    //            con.query(sql, function (err, result, fields) {
    //             if (err) throw err;
    //           });
    //         }
    //         if(option === "routine"){
    //         //     let newDR= JSON.stringify(res).replace(/[{()}]/g, '')
    //         //     const newInsertDataR = newD[1].replace(/\\/g, '')
    //         //     console.log("newInsertDataR",newInsertDataR);
    //         //   const sql = `INSERT INTO routine (class_id, section_id, day_id, period_id,start_time,end_time, subject_id, teacher_id, room, school_info_id, session_id, shift_id) VALUES ("${insertArray[0]}", "${insertArray[1]}", "${insertArray[2]}", "${insertArray[3]}","${insertArray[4]}","${insertArray[5]}", "${insertArray[6]}", "${insertArray[7]}", "${insertArray[8]}", "${insertArray[9]}", "${insertArray[10]}", "${insertArray[11]}" )`;

    //         //   con.query(sql, function (err, result, fields) {
    //         //     if (err) throw err;
    //         //   });
    //         }
    //         // if()
    //     })
    //     res.json({ status: "success" });
    // });


    // let csvStream = csv.parse()
    // .on("data", function (data) {
    //     console.log(csvData);
    //     csvData.push(data);
    // }).on("end", function () {
    //     // Remove Header ROW
    //     csvData.shift();
    // })
    // csv.fromStream(stream,{headers:["id","student_code","first_name"],ignoreEmpty:true})
    // .on("data",function(data){
    //     console.log(data);
    // }).on("end",function(){

    // console.log("ddone");
    // })

    // let test = stream.pipe(csvStream);
    // console.log(test);

  });
  app.post("/api/save/subjectRegistration", async (req, res) => {
    var studentChecked = req.body.studentChecked;
    var subjectChecked = req.body.subjectChecked;
    var forthChecked = req.body.forthChecked;
    var school_info_id = req.body.school_info_id;
    const date = moment().format("YYYY-MM-DD")
    // var id = req.body.id;
    var sql

    const inserData = await Promise.all(studentChecked.map(res => {
      subjectChecked.length > 0 && subjectChecked.map(resSub => {
        sql = `insert into subject_registration (school_info_id,student_id,session_id,group_id,class_id,subject_id,section_id,created_at) values ("${school_info_id}","${res.student_id}","${res.session_id}","${0}","${res.class_id}","${resSub.subject_id}","${res.section_id}","${date}")`

        con.query(sql, function (err, result, fields) {
          if (err) throw err;
        });
      })
      forthChecked.length > 0 && forthChecked.map(resSub => {
        sql = `insert into subject_4th_registration (school_info_id,student_id,session_id,group_id,class_id,subject_4th_id,section_id,created_at) values ("${school_info_id}","${res.student_id}","${res.session_id}","${0}","${res.class_id}","${resSub.subject_id}","${res.section_id}","${date}")`

        con.query(sql, function (err, result, fields) {
          if (err) throw err;
        });
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
  app.post("/api/add_sector", (req, res) => {
    var sector_code = req.body.sector_code;
    var sector_name = req.body.sector_name;
    var classId = req.body.class_id;
    var lastDate = req.body.last_date;
    var school_id = req.body.school_id;
    var amount = req.body.amount;
    var id = req.body.id;


    var sql
    if (id === '') {
    sql = `INSERT INTO sector (sector_code,sector_name,last_date,amount,class_id,school_id) VALUES ("${sector_code}","${sector_name}","${lastDate}","${amount}","${classId}","${school_id}")`;
    } else {
        sql = `update sector set sector_code = "${sector_code}",sector_name = "${sector_name}",last_date = "${lastDate}",amount = "${amount}",class_id = "${classId}" where id = ${id}`
    }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.post("/api/save/smsReport", (req, res) => {
    var smsText = req.body.smsText;
    var user_id = req.body.user_id;
    var purpose = req.body.purpose;
    var school_info_id = req.body.school_info_id;
    // var id = req.body.id;


    var sql
    // if (id === '') { 
    sql = `INSERT INTO smsReport (user_id,text,purpose,school_info_id) VALUES ("${user_id}","${smsText}","${purpose}","${school_info_id}")`;
    // } else {
    //     sql = `update student set student_code = "${student_code}",first_name = "${first_name}",middle_name = "${middle_name}",last_name = "${last_name}",mobile_no = "${mobile_no}",gender_id = "${gender_id}",email = "${email}",present_address = "${present_address}",father_name = "${father_name}",father_phone_number = "${father_phone_number}",mother_name = "${mother_name}",mother_phone_number = "${mother_phone_number}",dob = "${dob}",blood_group = "${blood_group}",photo_id = "${photo_id}",school_info_id = "${school_info_id}" where id = ${id}`
    // }

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });

  app.get('/api/sms/count', async (req, res) => {
    const test = await axios.get('http://isms.zaman-it.com/miscapi/C200164162b496a4b069b1.94693919/getBalance')
    var sql = `select smsReport.*,CONCAT( teacher.first_name, ' ', teacher.middle_name, ' ', teacher.last_name ) AS teacher_full_name,CONCAT( school_admin.first_name, ' ', school_admin.middle_name, ' ', school_admin.last_name ) AS school_admin_full_name from smsReport left join teacher on teacher.teacher_code = smsReport.user_id left join school_admin on school_admin.admin_code = smsReport.user_id where smsReport.school_info_id = ${req.query.school_info_id}`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send({ result: result, data: test.data });
    });
    console.log(test.data)
  })
  app.get("/api/sector/all", (req, res) => {
    var sql
    // if (id === '') {
    sql = `select * from sector`;
    

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
  app.get("/api/sectorBySchool", (req, res) => {
    var sql
    sql = `select * from sector where school_id="${req.query.school_id}" and class_id = ${req.query.class_id}`;
   

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });

  app.delete("/api/student/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    var sql = `delete from student where id ="${id}"`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.delete("/api/section/delete", authenticateToken, (req, res) => {
    var id = req.query.id;
    var sql = `delete from section where id ="${id}"`
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
}