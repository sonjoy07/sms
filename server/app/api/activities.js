var path = require('path');
var moment = require('moment');
module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/activities/all", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, teacher.first_name, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    order by activities.id;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/all/date", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, activities.teacher_id, teacher.first_name, teacher.initial, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where activities.school_info_id="${req.query.school_info_id}" and activities.issue_date="${req.query.date}"
    order by activities.id;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/all/filter", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, activities.teacher_id, teacher.first_name, teacher.initial, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where activities.school_info_id="${req.query.school_info_id}" and activities.class_id="${req.query.class_id}" and activities.section_id="${req.query.section_id}" and activities.subject_id="${req.query.subject_id}" and activities.issue_date="${req.query.date}"
    order by activities.id;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/teacher/individual", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, teacher.first_name, topic, details, issue_date, due_date, session.session_year,attachment_link,activities.class_id,activities.section_id,activities.subject_id,activities.session_id,section_default_name
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where activities.teacher_id="${req.query.teacher_id}"
    order by activities.id;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/activities/teacher", authenticateToken, (req, res) => {
    var id = req.body.id;
    var school_info_id = req.body.school_info_id;
    var class_id = req.body.class_id;
    var section_id = req.body.section_id;
    var teacher_id = req.body.teacher_id;
    var subject_id = req.body.subject_id;
    var session_id = req.body.session_id;
    var topic = req.body.topic;
    var details = req.body.details;
    var issue_date = req.body.issue_date;
    var due_date = req.body.due_date;
    var attachment_link = req.body.fileName;
    if (req.files !== null) {
      const file = req.files.file
      var uploadPath = path.resolve(__dirname, '../../../client/public/uploads/');
      file.mv(`${uploadPath}/${file.name}`, err => {
        if (err) {
          return res.status(500).send(err)
        }
      })
    }
    if (class_id !== '' || section_id !== '' || teacher_id !== '' || subject_id !== '' || session_id !== '' || topic !== '' || issue_date !== '' || due_date !== '') {
      var sql = ''
      if (id) {
        const attachment = attachment_link !== 'undefined' ? `,attachment_link="${attachment_link}"` : ``
        sql = `UPDATE activities
        SET school_info_id="${school_info_id}", class_id="${class_id}",section_id="${section_id}",teacher_id="${teacher_id}",subject_id="${subject_id}",session_id="${session_id}",topic="${topic}",details="${details}",issue_date="${issue_date}",due_date="${due_date}"${attachment}
        WHERE id=${id}`
      } else {
        const attachment = attachment_link !== 'undefined' ? `"${attachment_link}"` : `""`
        sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date, attachment_link) VALUES ("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}",${attachment} )`;
      }

      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ status: "success" });
      });
    } else {
      res.status(500).json({ msg: "Please fill any field" })
    }
  });

  //Home Mark Submission
  app.post("/api/activities/submit", authenticateToken, (req, res) => {
    var student_id = req.body.student_id;
    var homework_id = req.body.homework_id;
    var submission_time = req.body.submission_time;
    var attachment_link = req.body.fileName;

    const file = req.files.file
    var uploadPath = path.resolve(__dirname, '../../../client/public/uploads/');
    file.mv(`${uploadPath}/${file.name}`, err => {
      if (err) {
        return res.status(500).send(err)
      }
    })

    var sql = `INSERT INTO activities_submission (student_present_status_id, activities_id, submission_time, attachment_link) VALUES ("${student_id}", "${homework_id}", "${submission_time}", "${attachment_link}" )`;

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json({ status: "success" });
    });
  });

  app.get("/api/activities/student/", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS teacher_name, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where activities.section_id="${req.query.section_id}"
    and activities.class_id = "${req.query.class_id}"
    and activities.session_id = "${req.query.session_id}"
    order by activities.due_date;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/student/filter", authenticateToken, (req, res) => {
    const secton_id = req.query.section_id
    const class_id = req.query.class_id
    const subject_id = req.query.subject_id
    const issue_date = moment(req.query.issue_date).format("YYYY-MM-DD")
    const due_date = moment(req.query.due_date).format("YYYY-MM-DD")
    const teacher_id = req.query.teacher_id
    let condition = secton_id!== ''?` and activities.section_id="${secton_id}"`:``
    condition+= class_id!== ''?` and activities.class_id="${class_id}"`:``
    condition+= subject_id!== ''?` and activities.subject_id="${subject_id}"`:``
    condition+= teacher_id!== ''?` and activities.teacher_id="${teacher_id}"`:``
    condition+= issue_date!== ''?` and activities.due_date BETWEEN "${issue_date}" AND "${due_date}"`:``
    var sql = `select activities.id, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS teacher_name, topic, details, issue_date, due_date, session.session_year,attachment_link,(SELECT count(*) from activities_submission where activities_id = activities.id) submission
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where 1=1 ${condition}
    order by activities.due_date;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/teacher/filter", authenticateToken, (req, res) => {
    const secton_id = req.query.section_id
    const session_id = req.query.session_id
    const class_id = req.query.class_id
    const subject_id = req.query.subject_id
    const issue_date = req.query.issue_date !== ""?moment(req.query.issue_date).format("YYYY-MM-DD"):""
    const due_date = req.query.due_date !== ""?moment(req.query.due_date).format("YYYY-MM-DD"):""
    let condition = secton_id!== ''?` and activities.section_id="${secton_id}"`:``
    condition+= class_id!== ''?` and activities.class_id="${class_id}"`:``
    condition+= subject_id!== ''?` and activities.subject_id="${subject_id}"`:``
    condition+= session_id!== ''?` and activities.session_id="${session_id}"`:``
    condition+= issue_date!== ''?` and activities.due_date BETWEEN "${issue_date}" AND "${due_date}"`:``
    var sql = `select activities.id, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS teacher_name, topic, details, issue_date, due_date, session.session_year,attachment_link,(SELECT count(*) from activities_submission where activities_id = activities.id) submission
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where 1=1 ${condition}
    order by activities.due_date;`;
    console.log(req.query.issue_date === "")
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/student/id", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS teacher_name, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where activities.id="${req.query.homework_id}";`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        res.send(result[0]);
      }
    });
  });

  app.get("/api/activities/student/submit/all", authenticateToken, (req, res) => {
    var sql = `select * from activities_submission;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.delete("/api/activities/student/delete", authenticateToken, (req, res) => {
    var sql = `delete from activities_submission where activities_id = ${req.query.id};`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      var sql = `delete from activities where id = ${req.query.id};`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
  app.get("/api/activities/teacher/submitlist", authenticateToken, (req, res) => {
    var sql = `select student.student_code, CONCAT( student.first_name, ' ', student.middle_name, ' ', student.last_name ) AS full_name, activities_submission.submission_time, activities_submission.attachment_link 
    from activities_submission 
    join student_present_status on activities_submission.student_present_status_id=student_present_status.id
    join student on student_present_status.student_id=student.id
    where activities_id="${req.query.home_work_id}";`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
};