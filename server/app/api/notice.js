const moment = require('moment')
const util = require('util');
module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");

  const query = util.promisify(con.query).bind(con);
  // app.get("/api/routine", (req, res) => {
  //   con.query(
  //     "SELECT id, routine_default_name FROM routine",
  //     function (err, result, fields) {
  //       if (err) throw err;
  //       res.send(result);
  //     }
  //   );
  // });
  app.get("/api/notice/all", authenticateToken, (req, res) => {
    var sql = `select notice.id, notice.school_info_id, session.session_year, notice.section_id, class.class_name,  notice.notice_headline, notice.notice_description, notice.publishing_date,section.section_default_name,notice.class_id,
    notice.session_id
    from notice
    left join class on (notice.class_id=class.id and all_class= 0)
    left join section on (notice.section_id=section.id and all_section= 0)
    join session on notice.session_id=session.id
    order by notice.id desc
    ;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/notice/edit", authenticateToken, (req, res) => {
    var sql = `select notice.id, notice.school_info_id, session.session_year, notice.section_id, class.class_name,  notice.notice_headline, notice.notice_description, notice.publishing_date,section.section_default_name,notice.class_id,
    notice.session_id,GROUP_CONCAT(notice_user.student_id) notice_users
    from notice
    left join notice_user on notice_user.notice_id = notice.id
    left join class on (notice.class_id=class.id and all_class= 0)
    left join section on (notice.section_id=section.id and all_section= 0)
    join session on notice.session_id=session.id
    where notice.id = ${req.query.id}
    group by notice.id
    ;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.delete("/api/notice/delete", authenticateToken, (req, res) => {
    con.query(`delete from  notice_user where notice_id = ${req.query.id}`)
    var sql = `delete from  notice where id = ${req.query.id}
    ;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/notice/school", authenticateToken, (req, res) => {
    var sql = `select notice.id, notice.school_info_id, session.session_year, notice.section_id, class.class_name,  notice.notice_headline, notice.notice_description, notice.publishing_date,section.section_default_name
    from notice
    left join class on (notice.class_id=class.id and all_class= 0)
    left join section on (notice.section_id=section.id and all_section =0)
    left join session on notice.session_id=session.id
    where notice.school_info_id="${req.query.school_info_id}"
    and type = "${req.query.type}"
    group by notice.id
    order by notice.id
    ;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  // var classes = [];
  // var sections = [];
  // function setClasses(value) {
  //   classes = value;
  // }
  // function setSections(value) {
  //   sections = value;
  // }
  app.get("/api/notice/creator", authenticateToken, (req, res) => {
    let condition = req.query.start_date !== "" && req.query.start_date !== undefined?` and notice.publishing_date between "${req.query.start_date}" and "${req.query.end_date}"`:``
    var sql = `select notice.id, notice.school_info_id, session.session_year, notice.section_id, class.class_name,  notice.notice_headline, notice.notice_description, notice.publishing_date,notice.class_id,section_default_name as section_local_name,
    notice.session_id,all_section,all_class
    from notice
    left join class on notice.class_id=class.id
    left join section on notice.section_id=section.id
    left join session on notice.session_id=session.id
    where notice.user_code="${req.query.uid}" ${condition}
    order by notice.id
    ;`;

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);

    });
  });
  app.get("/api/notice/student", authenticateToken, (req, res) => {
    let condition = req.query.start_date !== ""&& req.query.start_date!== undefined ?` and notice.publishing_date between "${req.query.start_date}" and "${req.query.end_date}"`:``
    condition += req.query.school_info_id !== ""&& req.query.school_info_id!== undefined ?` and notice.school_info_id = "${req.query.school_info_id}"`:``
    condition += req.query.student_id !== ""&& req.query.student_id!== undefined ?` and notice_user.student_id = "${req.query.student_id}"`:``
    var sql = `select notice.id, notice.school_info_id, session.session_year, notice.section_id, class.class_name,  notice.notice_headline, notice.notice_description, notice.publishing_date
    from notice
    left join notice_user on notice_user.notice_id = notice.id
    left join class on (class.id=notice.class_id and all_class = 0)  
    left join section on (notice.section_id=section.id and all_section = 0)
    left join session on notice.session_id=session.id
    where type = ${req.query.type === 'teacher' ? 1 : 2}${condition}
    group BY notice.id 
    order by notice.id
    ;`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  // app.get("/api/routine/teacher", (req, res) => {
  //   var sql = `select routine.id, routine.section_id, class.class_name,  day.day, period.period_code, period.start_time, period.end_time, routine.subject_id, subject.subject_name, teacher.first_name, room, session.session_year, shift.shift_name
  //     from routine
  //     join class on routine.class_id=class.id
  //     join section on routine.section_id=section.id
  //     join day on routine.day_id=day.id
  //     join period on routine.period_id=period.id
  //     join subject on routine.subject_id=subject.id
  //     join teacher on routine.teacher_id=teacher.id
  //     join session on routine.session_id=session.id
  //     join shift on routine.shift_id=shift.id
  //     where routine.teacher_id="${req.query.teacher_id}"
  //     order by routine.day_id
  //     ;`;
  //   con.query(sql, function (err, result, fields) {
  //     if (err) throw err;
  //     res.send(result);
  //   });
  // });
  // app.get("/api/routine/teacher/today", (req, res) => {
  //   var sql = `select routine.id, routine.section_id, class.class_name,  day.day, period.period_code, period.start_time, period.end_time, routine.subject_id, subject.subject_name, teacher.first_name, room, session.session_year, shift.shift_name
  //     from routine
  //     join class on routine.class_id=class.id
  //     join section on routine.section_id=section.id
  //     join day on routine.day_id=day.id
  //     join period on routine.period_id=period.id
  //     join subject on routine.subject_id=subject.id
  //     join teacher on routine.teacher_id=teacher.id
  //     join session on routine.session_id=session.id
  //     join shift on routine.shift_id=shift.id
  //     where routine.teacher_id="${req.query.teacher_id}" and day.day like "${req.query.today}"
  //     order by routine.id
  //     ;`;
  //   con.query(sql, function (err, result, fields) {
  //     if (err) throw err;
  //     res.send(result);
  //   });
  // });
  // app.get("/api/routine/student", (req, res) => {
  //   var sql = `select routine.id, routine.section_id, class.class_name,  day.day, period.period_code, period.start_time, period.end_time, routine.subject_id, subject.subject_name, teacher.first_name, room, session.session_year, shift.shift_name
  //     from routine
  //     join class on routine.class_id=class.id
  //     join section on routine.section_id=section.id
  //     join day on routine.day_id=day.id
  //     join period on routine.period_id=period.id
  //     join subject on routine.subject_id=subject.id
  //     join teacher on routine.teacher_id=teacher.id
  //     join session on routine.session_id=session.id
  //     join shift on routine.shift_id=shift.id
  //     where routine.section_id="${req.query.section_id}"
  //     order by routine.day_id
  //     ;`;

  //   con.query(sql, function (err, result, fields) {
  //     if (err) throw err;
  //     res.send(result);
  //   });
  // });

  app.post("/api/notice/individual", authenticateToken, (req, res) => {
    var school_info_id = req.body.school_info_id;
    var class_id = req.body.class_id;
    var section_id = req.body.section_id;
    var student_id = req.body.student_id;
    var session_id = req.body.session_id;
    var headline = req.body.headline;
    var description = req.body.description;
    var date = req.body.date;
    var uid = req.body.uid;

    var sql = `INSERT INTO notice (school_info_id, class_id, section_id, student_id, session_id, notice_headline, notice_description, publishing_date, user_code) VALUES ("${school_info_id}", "${class_id}", "${section_id}", "${student_id}", "${session_id}", "${headline}", "${description}", "${date}", "${uid}" )`;

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });
  app.post("/api/notice", authenticateToken, async (req, res) => {
    var school_info_id = req.body.school_info_id;
    var class_id = req.body.class_id;
    var section_id = req.body.section_id;
    var students = req.body.students;
    var session_id = req.body.session_id;
    var headline = req.body.headline;
    var description = req.body.description;
    var date = moment().format("YYYY-MM-DD");
    var uid = req.body.uid;
    var type = req.body.type;
    var id = req.body.id;

    if (id === '') {
      var sql
      if (class_id === 0 && section_id === 0) {
        
        sql = `Insert into notice (session_id,school_info_id,class_id,section_id,notice_headline,notice_description,publishing_date,user_code,type,all_class,all_section) values ("${session_id}", "${school_info_id}", "0", "0", "${headline}", "${description}", "${date}", "${uid}", "${type}",1,1)`
        notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
        res.json({ status: "success" });
      } else if (class_id === 0 && section_id !== 0) {
        sql = `Insert into notice (session_id,school_info_id,class_id,section_id,notice_headline,notice_description,publishing_date,user_code,type,all_class,all_section) values ("${session_id}", "${school_info_id}", "0", "${section_id}", "${headline}", "${description}", "${date}", "${uid}", "${type}",1,0)`
          notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
          res.json({ status: "success" });
      } else if (section_id === 0 && class_id !== 0) {
        sql = `Insert into notice (session_id,school_info_id,class_id,section_id,notice_headline,notice_description,publishing_date,user_code,type,all_class,all_section) values("${session_id}", "${school_info_id}", "${class_id}", "0", "${headline}", "${description}", "${date}", "${uid}", "${type}",0,1)`
          notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
          res.json({ status: "success" });
      } else {
        sql = `Insert into notice (session_id,school_info_id,class_id,section_id,notice_headline,notice_description,publishing_date,user_code,type,all_class,all_section) values ("${session_id}", "${school_info_id}", "${class_id}", "${section_id}", "${headline}", "${description}", "${date}", "${uid}", "${type}",0,0)`
        notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
        res.json({ status: "success" });
      }
    } else {
      if (class_id === 0 && section_id === 0) {
        
        sql = `Insert into notice (session_id,school_info_id,class_id,section_id,notice_headline,notice_description,publishing_date,user_code,type,all_class,all_section) values ("${session_id}", "${school_info_id}", "0", "0", "${headline}", "${description}", "${date}", "${uid}", "${type}",1,1)`
        notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
        res.json({ status: "success" });
      } else if (class_id === 0 && section_id !== 0) {
        sql = `Insert into notice (session_id,school_info_id,class_id,section_id,notice_headline,notice_description,publishing_date,user_code,type,all_class,all_section) values ("${session_id}", "${school_info_id}", "0", "${section_id}", "${headline}", "${description}", "${date}", "${uid}", "${type}",1,0)`
          notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
          res.json({ status: "success" });
      } else if (section_id === 0 && class_id !== 0) {
        sql = `Insert into notice (session_id,school_info_id,class_id,section_id,notice_headline,notice_description,publishing_date,user_code,type,all_class,all_section) values("${session_id}", "${school_info_id}", "${class_id}", "0", "${headline}", "${description}", "${date}", "${uid}", "${type}",0,1)`
          notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
          res.json({ status: "success" });
      } else {
        sql = `update notice set session_id = "${session_id}", school_info_id = "${school_info_id}", class_id = "${class_id}", section_id = "${section_id}", notice_headline= "${headline}",notice_description = "${description}", publishing_date="${date}",user_code= "${uid}",type="${type}" where id = ${id}`
        notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id)
        res.json({ status: "success" });
      }
    }

    // console.log(sql)
    // con.query(sql, async function (err, result, fields) {
    //   if (err) throw err;
    //   if (id) {
    //     con.query(`delete from notice_user where notice_id = ${id}`)
    //   }
    //   if (class_id === 0 && section_id === 0) {
    //     let stu = await query(`select student.* from student join student_present_status sps on sps.student_id = student.id where session_id = ${session_id}`)
    //     students = stu.map(res => { return res.id })
    //   } else if (class_id !== 0 && section_id === 0) {
    //     let stu = await query(`select student.* from student join student_present_status sps on sps.student_id = student.id where session_id = ${session_id} and class_id = ${class_id}`)
    //     students = stu.map(res => { return res.id })
    //   } else if (class_id === 0 && section_id !== 0) {
    //     let stu = await query(`select student.* from student join student_present_status sps on sps.student_id = student.id where session_id = ${session_id} and section_id = ${section_id}`)
    //     students = stu.map(res => { return res.id })
    //   }
    //   var sql2 = "insert into notice_user (notice_id,student_id) values "
    //   if (students.length > 0) {
    //     students.map((st_id) => {
    //       sql2 += `("${id ? id : result.insertId}","${st_id}"),`;
    //     });
    //     sql2 = sql2.slice(0, -1);
    //     con.query(sql2, function (err, result, fields) {
    //       if (err) throw err;
    //       res.json({ status: "success" });
    //     });
    //   } else {
    //     res.status(400).json({ msg: 'select users' })
    //   }
    // });
  });
};

function notice_users(con, sql, class_id, section_id, students, id, query, session_id, school_info_id) {
  con.query(sql, async function (err, result, fields) {
    if (err) throw err;
    if (id) {
      con.query(`delete from notice_user where notice_id = ${id}`)
    }
    if (class_id === 0 && section_id === 0) {
      let stu = await query(`select student.* from student join student_present_status sps on sps.student_id = student.id where session_id = ${session_id} and student.school_info_id = ${school_info_id}`)
      students = stu.map(res => { return res.id })
    } else if (class_id !== 0 && section_id === 0) {
      let stu = await query(`select student.* from student join student_present_status sps on sps.student_id = student.id where session_id = ${session_id} and class_id = ${class_id}  and student.school_info_id = ${school_info_id}`)
      students = stu.map(res => { return res.id })
    } else if (class_id === 0 && section_id !== 0) {
      let stu = await query(`select student.* from student join student_present_status sps on sps.student_id = student.id where session_id = ${session_id} and section_id = ${section_id} and student.school_info_id = ${school_info_id}`)
      students = stu.map(res => { return res.id })
    }
    var sql2 = "insert into notice_user (notice_id,student_id) values "
    if (students.length > 0) {
      students.map((st_id) => {
        sql2 += `("${id ? id : result.insertId}","${st_id}"),`;
      });
      sql2 = sql2.slice(0, -1);
      con.query(sql2, function (err, result, fields) {
        if (err) throw err;
      });
    } else {
      // res.status(400).json({ msg: 'select users' })
    }
  });
}
