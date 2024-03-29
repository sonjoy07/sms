const moment = require('moment')
const util = require('util');
module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  const query = util.promisify(con.query).bind(con);
  app.get("/api/attendance", authenticateToken, (req, res) => {
    con.query(
      "SELECT id, attendance FROM attendance",
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
  app.get("/api/attendance/all", authenticateToken, (req, res) => {
    con.query("SELECT * FROM attendance order by id desc", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/api/attendance/student", (req, res) => {
    var sql = `SELECT student_present_status.id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, class_roll_no, student_code, mobile_no FROM student_present_status
    join student on student_present_status.student_id=student.id
    join school_info on student_present_status.school_info_id=school_info.id
    join class on student_present_status.class_id=class.id
    where student_present_status.section_id="${req.query.section_id}" and student_present_status.school_info_id="${req.query.school_info_id}" and class.id="${req.query.class_id}" and exists(SELECT * from subject_registration where subject_registration.subject_id = "${req.query.subject_id}" 
      AND subject_registration.student_id = student.id) OR EXISTS ( SELECT * from subject_4th_registration where subject_4th_registration.subject_4th_id = "${req.query.subject_id}" 
      AND subject_4th_registration.student_id = student.id) 
   `;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/attendanceReport/student", (req, res) => {
    let condition = req.query.start_date !== '' && req.query.start_date !== undefined ? ` and date between "${moment(req.query.start_date).format('YYYY-MM-DD')}" and "${moment(req.query.end_date).format('YYYY-MM-DD')}"` : ''
    condition += req.query.section_id !== '' && req.query.section_id !== undefined ? ` and student_present_status.section_id ="${req.query.section_id}"` : ''
    condition += req.query.class_id !== '' && req.query.class_id !== undefined ? ` and student_present_status.class_id ="${req.query.class_id}"` : ''
    var sql = `SELECT attendance.id, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, class_roll_no, student_code,date, mobile_no,class.class_name,section.section_default_name,attendance,time 
    FROM attendance 
        left JOIN student_present_status on  student_present_status.id = attendance.student_present_status_id
       left join student on student_present_status.student_id=student.id
        left join class on student_present_status.class_id=class.id
       left join section on student_present_status.section_id=section.id
    where student_present_status.school_info_id = "${req.query.school_info_id}" ${condition} order by attendance.id desc
   `;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/attendance/statusChange", (req, res) => {
    var sql = `SELECT * from attendance where id= "${req.query.id}"`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      if (result[0].attendance === 1) {
        sql = `Update attendance set attendance = 0 where id= ${req.query.id}`
      } else {
        sql = `Update attendance set attendance = 1 where id= ${req.query.id}`
      }
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
  app.post("/api/attendance/student", authenticateToken, async(req, res) => {
    var date = req.body.date;
    var time = req.body.time;

    var routine_id = req.body.routine_id;
    var attendance = req.body.attendance;
    var sql = `INSERT INTO attendance (date, time, student_present_status_id, routine_id, attendance) VALUES `;
    await Promise.all(attendance.map(async (att) => {
      let exist = await query(`select * from attendance where date= "${date}" and time="${time}" and student_present_status_id = "${att.student_id}" and routine_id="${routine_id}"`)
      if (exist.length === 0) {
        sql += `("${date}", "${time}", "${att.student_id}", "${routine_id}", "${att.attendance_status}" ),`;
      }
    }));
    let sqlArray = sql.split(' ')
    if (sqlArray[9] !== '') {
      sql = sql.slice(0, -1);
      sql += ` on duplicate key 
    update 
    time = values(time),
    attendance = values(attendance)
    `;


      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ status: "success" });
      });
    } else {
      return res.status(400).send({
        message: 'This is an error!'
     });
    }
    //console.log(attendance);
  });

  app.get("/api/attendance/summary/all", authenticateToken, (req, res) => {
    var sql = `SELECT
    school_info.id, school_info.school_name,
      COUNT(*) as 'all', 
      COUNT(IF(attendance.attendance = 1, 1, NULL)) as 'present',
      COUNT(IF(attendance.attendance = 0, 1, NULL)) as 'absent',
      round( ( COUNT(IF(attendance.attendance = 1, 1, NULL)) / COUNT(*) ) * 100 ) as 'present_rate'
      FROM
      attendance
      join student_present_status on attendance.student_present_status_id=student_present_status.id
      join school_info on student_present_status.school_info_id=school_info.id
      
      group by school_info.id`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/api/attendance/summary/school", (req, res) => {
    var sql = `SELECT
    school_info.id, school_info.school_name,section.section_default_name,class.class_name,student_info.section_id,
      COUNT(student_info.id) as 'all', 
      COUNT(IF(attendance.attendance = 1, 1, NULL)) as 'present',
      COUNT(IF(attendance.attendance = 0, 1, NULL)) as 'absent',
      round( ( COUNT(IF(attendance.attendance = 1, 1, NULL)) / COUNT(*) ) * 100 ) as 'present_rate'
      FROM
      attendance
      join student_info on attendance.student_present_status_id=student_info.student_present_status_id
      join school_info on student_info.school_info_id=school_info.id
      join section on student_info.section_id=section.id
      join class on student_info.class_id=class.id
      where school_info.id="${req.query.school_info_id}" and attendance.date="${req.query.date}"
      group by section.id,school_info.id,class.id;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get(
    "/api/attendance/summary/section/today",
    authenticateToken,
    (req, res) => {
      let condition = req.query.section_id !== undefined && req.query.section_id !== "" ? ` and student_present_status.section_id= "${req.query.section_id}"` : ``
      condition += req.query.date !== undefined && req.query.date !== "" ? ` and attendance.date= "${req.query.date}"` : ``
      condition += req.query.class_id !== undefined && req.query.class_id !== "" ? ` and class.id= "${req.query.class_id}"` : ``
      var sql = `SELECT
    subject.subject_name, routine.subject_id, period.period_code, routine.start_time, attendance.time, teacher.id as t_id, teacher.initial,routine.id as r_id,
    COUNT(*) as 'all', 
    COUNT(IF(attendance.attendance = 1, 1, NULL)) as 'present',
    COUNT(IF(attendance.attendance = 0, 1, NULL)) as 'absent',
    round( ( COUNT(IF(attendance.attendance = 1, 1, NULL)) / COUNT(*) ) * 100 ) as 'present_rate'
    FROM
    attendance
    join student_present_status on attendance.student_present_status_id=student_present_status.id
    join section on student_present_status.section_id=section.id
    join routine on attendance.routine_id=routine.id
    join subject on routine.subject_id=subject.id
    join period on routine.period_id=period.id
    join teacher on routine.teacher_id=teacher.id
    join class on routine.class_id=class.id
    
    where 1=1 ${condition}
    group by routine.subject_id, routine.period_id, teacher.id, routine.id, attendance.time,class.id
    order by routine.period_id;`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    }
  );
  app.get(
    "/api/attendance/summary/section/daterange",
    authenticateToken,
    (req, res) => {
      var sql = `SELECT
    attendance.date, subject.subject_name, routine.subject_id, period.period_code, routine.start_time, attendance.time, teacher.id as t_id, teacher.initial,routine.id as r_id,
    COUNT(*) as 'all', 
    COUNT(IF(attendance.attendance = 1, 1, NULL)) as 'present',
    COUNT(IF(attendance.attendance = 0, 1, NULL)) as 'absent',
    round( ( COUNT(IF(attendance.attendance = 1, 1, NULL)) / COUNT(*) ) * 100 ) as 'present_rate'
    FROM
    attendance
    join student_present_status on attendance.student_present_status_id=student_present_status.id
    join section on student_present_status.section_id=section.id
    join class on section.class_id=class.id
    join routine on attendance.routine_id=routine.id
    join subject on routine.subject_id=subject.id
    join period on routine.period_id=period.id
    join teacher on routine.teacher_id=teacher.id
    where section.id="${req.query.section_id}" and attendance.date between "${req.query.start_date}" and "${req.query.end_date}"
    group by attendance.date, routine.subject_id, routine.period_id, teacher.id, routine.id, attendance.time
    order by attendance.date, routine.period_id;`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;

        var att_by_date = [];
        var prev_date = "2022-05-23";
        var att_by_sub = {};

        res.send(result);
      });
    }
  );
  app.get("/api/attendance/section/absent", authenticateToken, (req, res) => {
    let condition = req.query.section_id !== undefined && req.query.section_id !== "" ? ` and student_present_status.section_id= "${req.query.section_id}"` : ``
    condition += req.query.routine_id !== undefined && req.query.routine_id !== "" ? ` and attendance.routine_id= "${req.query.routine_id}"` : ``
    condition += req.query.date !== undefined && req.query.date !== "" ? ` and attendance.date= "${req.query.date}"` : ``
    var sql = `SELECT
    CONCAT( student.first_name, ' ', student.middle_name, ' ', student.last_name ) AS full_name, class.class_name, section.section_default_name, student.mobile_no, attendance.attendance
    FROM
    attendance
    join student_present_status on attendance.student_present_status_id=student_present_status.id
    join student on student_present_status.student_id=student.id
    join section on student_present_status.section_id=section.id
    join class on student_present_status.class_id=class.id
    join routine on attendance.routine_id=routine.id
    join subject on routine.subject_id=subject.id
    join period on routine.period_id=period.id
    
    where 1=1 ${condition} and attendance.attendance=0;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get(
    "/api/attendance/student/individual",
    (req, res) => {
      var suborper = "";
      console.log(req.query.subject_id, req.query.period_id);
      if (req.query.subject_id != "null" && req.query.period_id != "null") {
        suborper = `and (period.id="${req.query.period_id}" and subject.id="${req.query.subject_id}")`;
      } else if (
        req.query.subject_id != "null" ||
        req.query.period_id != "null"
      ) {
        suborper = `and (period.id="${req.query.period_id}" or subject.id="${req.query.subject_id}")`;
      }

      var sql =
        `SELECT attendance.date, period.period_code, subject.subject_name, CONCAT( teacher.first_name, ' ', teacher.middle_name, ' ', teacher.last_name ) AS teacher_name, attendance, if(attendance>0, "P", "A") as present_status FROM attendance
    join routine on attendance.routine_id=routine.id
    join period on routine.period_id=period.id
    join subject on routine.subject_id=subject.id
    join teacher on routine.teacher_id=teacher.id
    where attendance.student_present_status_id="${req.query.student_id}" ` +
        suborper +
        ` and attendance.date between "${req.query.start_date}" and "${req.query.end_date}" 
      order by attendance.date asc;`;

      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    }
  );
};
