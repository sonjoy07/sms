var path = require('path');
var moment = require('moment');
module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/activities/all", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, teacher.first_name, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join activity on activities.activity_id=activity.id 
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    order by activities.id desc`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/all/date", authenticateToken, (req, res) => {

    var sql = `select activities.id, class.class_name, subject.subject_name, activities.teacher_id, teacher.first_name, teacher.initial, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join activity on activities.activity_id=activity.id 
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where activities.school_info_id="${req.query.school_info_id}" and activities.issue_date="${req.query.date}"
    order by activities.id desc`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/all/filter", authenticateToken, (req, res) => {
    let condition = req.query.school_info_id !== '' && req.query.school_info_id !== undefined ? ` and activities.school_info_id="${req.query.school_info_id}"` : ``
    condition += req.query.section_id !== '' && req.query.section_id !== undefined ? ` and activities.section_id="${req.query.section_id}"` : ``
    condition += req.query.class_id !== '' && req.query.class_id !== undefined ? ` and activities.class_id="${req.query.class_id}"` : ``
    condition += req.query.subject_id !== '' && req.query.subject_id !== undefined ? ` and activities.subject_id="${req.query.subject_id}"` : ``
    condition += req.query.date !== '' && req.query.date !== undefined ? ` and activities.issue_date="${req.query.date}"` : ``
    var sql = `select activity.id, class.class_name, subject.subject_name,questions, topic, details, issue_date, due_date, session.session_year,attachment_link,section.section_default_name
    from activities
    join activity on activities.activity_id=activity.id 
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join session on activities.session_id=session.id
    where 1=1 ${condition} group by activity.id
    order by activity.id desc`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/teacher/individual", authenticateToken, (req, res) => {
    var sql = `select activity.id,questions, class.class_name, subject.subject_name, topic, details, issue_date, due_date, session.session_year,attachment_link,activities.class_id,activities.section_id,activities.subject_id,activities.session_id,section_default_name,school_name,activities.school_info_id,school_info.type_id,activities.school_teacher_id,all_school,all_class,all_section,all_session,all_subject,all_teacher
    from activity
    left join activities on activities.activity_id=activity.id 
    left join class on activities.class_id=class.id 
    left join school_info on activities.school_info_id=school_info.id 
    left join section on activities.section_id=section.id
    left join subject on activities.subject_id=subject.id
    left join session on activities.session_id=session.id
    where activities.teacher_id="${req.query.teacher_id}"
    group by activity.id order by activities.id `;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/extra_teacher/individual", authenticateToken, (req, res) => {
    var sql = `select curriculam.id,class.class_name, subject.subject_name, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, topic, details, issue_date, due_date, session.session_year,attachment_link,curriculam_child.class_id,curriculam_child.section_id,curriculam_child.subject_id,curriculam_child.session_id,section_default_name,school_name,curriculam_child.school_info_id,school_info.type_id,curriculam_child.school_teacher_id,all_school,all_class,all_section,all_session,all_subject
    from curriculam
    join curriculam_child on curriculam_child.activity_id=curriculam.id 
    join class on curriculam_child.class_id=class.id 
    join school_info on curriculam_child.school_info_id=school_info.id 
    join section on curriculam_child.section_id=section.id
    join subject on curriculam_child.subject_id=subject.id
    join teacher on curriculam_child.school_teacher_id=teacher.id
    join session on curriculam_child.session_id=session.id
    where curriculam_child.teacher_id="${req.query.teacher_id}"
    group by curriculam.id order by curriculam.id `;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/extra_teacher/individual/all", authenticateToken, (req, res) => {
    var sql = `select curriculam.id,class.class_name, subject.subject_name, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, topic, details, issue_date, due_date, session.session_year,attachment_link,curriculam_child.class_id,curriculam_child.section_id,curriculam_child.subject_id,curriculam_child.session_id,section_default_name,school_name,curriculam_child.school_info_id,school_info.type_id,curriculam_child.school_teacher_id,all_school,all_class,all_section,all_session,all_subject
    from curriculam
    join curriculam_child on curriculam_child.activity_id=curriculam.id 
    join class on curriculam_child.class_id=class.id 
    join school_info on curriculam_child.school_info_id=school_info.id 
    join section on curriculam_child.section_id=section.id
    join subject on curriculam_child.subject_id=subject.id
    join teacher on curriculam_child.school_teacher_id=teacher.id
    join session on curriculam_child.session_id=session.id
    group by curriculam.id order by curriculam.id `;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  function school_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {

    if (school_info_id === 'all') {
      let sql = `select * from school_info`
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        result.map(sch => {
          class_info2(school_type, sch.id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
        })
      })
    } else {
      class_info2(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
    }
  }
  function school_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {

    if (school_info_id === 'all') {
      let sql = `select * from school_info`
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        result.map(sch => {
          class_info2_extra(school_type, sch.id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
        })
      })
    } else {
      class_info2_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
    }
  }
  function class_info2(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {
    if (class_id === 'all') {
      console.log('all class ok')
      con.query(`select * from class where school_type_id = ${school_type}`, function (err, result, fields) {
        if (err) throw err;
        result.map(cls => {
          class_info(school_type, school_info_id, cls.id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
        })
      })
    } else {
      class_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
    }
  }
  function class_info2_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {
    if (class_id === 'all') {
      console.log('all class ok')
      con.query(`select * from class where school_type_id = ${school_type}`, function (err, result, fields) {
        if (err) throw err;
        result.map(cls => {
          class_info_extra(school_type, school_info_id, cls.id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
        })
      })
    } else {
      class_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
    }
  }
  function class_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {
    if (section_id === 'all') {
      console.log('all section ok')
      //all section if
      con.query(`select * from section`, function (err, result, fields) {
        if (err) throw err;
        result.map(sec => {
          section_info(school_type, school_info_id, class_id, sec.id, session_id, subject_id, school_teacher_id, activityId, teacher_id)

        })
      })
    } else {
      //all section else
      section_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)

    }
  }
  function class_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {
    if (section_id === 'all') {
      console.log('all section ok')
      //all section if
      con.query(`select * from section`, function (err, result, fields) {
        if (err) throw err;
        result.map(sec => {
          section_info_extra(school_type, school_info_id, class_id, sec.id, session_id, subject_id, school_teacher_id, activityId, teacher_id)

        })
      })
    } else {
      //all section else
      section_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)

    }
  }
  function section_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {
    if (session_id === 'all') {
      console.log('all session ok')
      //all session
      con.query(`select * from session`, function (err, result, fields) {
        if (err) throw err;
        result.map(ses => {
          session_info(school_type, school_info_id, class_id, section_id, ses.id, subject_id, school_teacher_id, activityId, teacher_id)
        })
      })

    } else {
      //all session else

      session_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)

    }
  }
  function section_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {
    if (session_id === 'all') {
      console.log('all session ok')
      //all session
      con.query(`select * from session`, function (err, result, fields) {
        if (err) throw err;
        result.map(ses => {
          session_info_extra(school_type, school_info_id, class_id, section_id, ses.id, subject_id, school_teacher_id, activityId, teacher_id)
        })
      })

    } else {
      //all session else

      session_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)

    }
  }
  function session_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {

    if (subject_id === 'all') {
      console.log('all subject ok')
      con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
        if (err) throw err;
        result.map(sub => {
          subject_info(school_type, school_info_id, class_id, section_id, session_id, sub.id, school_teacher_id, activityId, teacher_id)
        })

      })
    } else {
      subject_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
    }
  }
  function session_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {

    if (subject_id === 'all') {
      console.log('all subject ok')
      con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
        if (err) throw err;
        result.map(sub => {
          subject_info_extra(school_type, school_info_id, class_id, section_id, session_id, sub.id, school_teacher_id, activityId, teacher_id)
        })

      })
    } else {
      subject_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
    }
  }
  function subject_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {

    if (school_teacher_id === 'all') {
      console.log('all teacher ok')
      con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , activity_id, school_teacher_id) VALUES `
          result.map(tec => {
            sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${activityId}","${tec.id}" ),`
          })
          sql = sql.slice(0, -1);
          console.log('query', sql);
          con.query(sql, function (err, result, fields) {
            if (err) throw err;
          });
        }
      })
    } else {
      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , activity_id, school_teacher_id) VALUES `

      sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${activityId}", "${school_teacher_id}"),`
      sql = sql.slice(0, -1);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });

    }
  }
  function subject_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id) {

    if (school_teacher_id === 'all') {
      console.log('all teacher ok')
      con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
          let sql = `INSERT INTO curriculam_child (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , activity_id, school_teacher_id) VALUES `
          result.map(tec => {
            sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${activityId}","${tec.id}" ),`
          })
          sql = sql.slice(0, -1);
          console.log('query', sql);
          con.query(sql, function (err, result, fields) {
            if (err) throw err;
          });
        }
      })
    } else {
      let sql = `INSERT INTO curriculam_child (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , activity_id, school_teacher_id) VALUES `

      sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${activityId}", "${school_teacher_id}"),`
      sql = sql.slice(0, -1);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });

    }
  }

  app.post("/api/activities/teacher", authenticateToken, (req, res) => {
    var id = req.body.id;
    var school_info_id = req.body.school_info_id;
    var school_type = req.body.school_type;
    var class_id = req.body.class_id;
    var section_id = req.body.section_id;
    var teacher_id = req.body.teacher_id;
    var school_teacher_id = req.body.school_teacher_id;
    var subject_id = req.body.subject_id;
    var session_id = req.body.session_id;
    var topic = req.body.topic;
    var details = req.body.details;
    var questions = req.body.questions;
    var issue_date = req.body.issue_date;
    var due_date = req.body.due_date;
    var sub_start_date = req.body.sub_start_date;
    var sub_start_time = req.body.sub_start_time;
    var attachment_link = req.body.fileName;
    if (req.files !== null) {
      const file = req.files.file
      var uploadPath = path.resolve(__dirname, '../../uploads/');
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
        con.query(`delete from activities where activity_id = ${id}`, function (err, result, fields) {
          if (err) throw err
        })
        sql = `UPDATE activity
        SET questions="${questions}", all_class=${class_id === 'all' ? 1 : 0},all_school=${school_info_id === 'all' ? 1 : 0},all_section=${section_id === 'all' ? 1 : 0},all_session=${session_id === 'all' ? 1 : 0},all_subject=${subject_id === 'all' ? 1 : 0},all_teacher=${teacher_id === 'all' ? 1 : 0},topic="${topic}",details="${details}",issue_date="${issue_date}",due_date="${due_date},sub_start_time="${sub_start_time}",sub_start_date="${sub_start_time}""${attachment}
        WHERE id=${id}`
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          const activityId = id
          if (school_type === 'all') {
            con.query(`select * from school_type`, function (err, result, fields) {
              if (err) throw err;
              result.map(type => {
                school_info(type.id, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
              })
            })
          } else {
            school_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
          }
        })
      } else {
        const attachment = attachment_link !== 'undefined' ? `"${attachment_link}"` : `""`
        con.query(`insert into activity (topic,details,questions,attachment_link,issue_date,due_date,all_school,all_class,all_section,all_session,all_subject,all_teacher,sub_start_time,sub_start_date) values ("${topic}","${details}","${questions}",${attachment},"${issue_date}","${due_date}",${school_info_id === 'all' ? 1 : 0},${class_id === 'all' ? 1 : 0},${section_id === 'all' ? 1 : 0},${session_id === 'all' ? 1 : 0},${subject_id === 'all' ? 1 : 0},${school_teacher_id === 'all' ? 1 : 0},"${sub_start_time}","${sub_start_date}")`, function (err, result, fields) {
          if (err) throw err;
          const activityId = result.insertId
          if (school_type === 'all') {
            con.query(`select * from school_type`, function (err, result, fields) {
              if (err) throw err;
              result.map(type => {
                school_info(type.id, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
              })
            })
          } else {
            school_info(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
          }
        })
        res.json({ status: "success" });
      }


    } else {
      res.status(500).json({ msg: "Please fill any field" })
    }
  });
  app.post("/api/activities/extra_teacher", authenticateToken, (req, res) => {
    var id = req.body.id;
    var school_info_id = req.body.school_info_id;
    var school_type = req.body.school_type;
    var class_id = req.body.class_id;
    var section_id = req.body.section_id;
    var teacher_id = req.body.teacher_id;
    var school_teacher_id = req.body.school_teacher_id;
    var subject_id = req.body.subject_id;
    var session_id = req.body.session_id;
    var topic = req.body.topic;
    var details = req.body.details;
    var issue_date = req.body.issue_date;
    var due_date = req.body.due_date;
    var attachment_link = req.body.fileName;
    if (req.files !== null) {
      const file = req.files.file
      var uploadPath = path.resolve(__dirname, '../../uploads/');
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
        con.query(`delete from activities where activity_id = ${id}`, function (err, result, fields) {
          if (err) throw err
        })
        sql = `UPDATE curriculam
        SET all_class=${class_id === 'all' ? 1 : 0},all_school=${school_info_id === 'all' ? 1 : 0},all_section=${section_id === 'all' ? 1 : 0},all_session=${session_id === 'all' ? 1 : 0},all_subject=${subject_id === 'all' ? 1 : 0},topic="${topic}",details="${details}",issue_date="${issue_date}",due_date="${due_date}"${attachment}
        WHERE id=${id}`
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          const activityId = id
          if (school_type === 'all') {
            con.query(`select * from school_type`, function (err, result, fields) {
              if (err) throw err;
              result.map(type => {
                school_info_extra(type.id, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
              })
            })
          } else {
            school_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
          }
        })
      } else {
        const attachment = attachment_link !== 'undefined' ? `"${attachment_link}"` : `""`
        con.query(`insert into curriculam (topic,details,attachment_link,issue_date,due_date,all_school,all_class,all_section,all_session,all_subject) values ("${topic}","${details}",${attachment},"${issue_date}","${due_date}",${school_info_id === 'all' ? 1 : 0},${class_id === 'all' ? 1 : 0},${section_id === 'all' ? 1 : 0},${session_id === 'all' ? 1 : 0},${subject_id === 'all' ? 1 : 0})`, function (err, result, fields) {
          if (err) throw err;
          const activityId = result.insertId
          if (school_type === 'all') {
            con.query(`select * from school_type`, function (err, result, fields) {
              if (err) throw err;
              result.map(type => {
                school_info_extra(type.id, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
              })
            })
          } else {
            school_info_extra(school_type, school_info_id, class_id, section_id, session_id, subject_id, school_teacher_id, activityId, teacher_id)
          }
        })
        res.json({ status: "success" });
      }


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
    var answer = req.body.answer;
    if (req.files !== null) {
      const file = req.files.file
      var uploadPath = path.resolve(__dirname, '../../uploads/');
      file.mv(`${uploadPath}/${file.name}`, err => {
        if (err) {
          return res.status(500).send(err)
        }
      })
    }
    var sql = `INSERT INTO activities_submission (student_present_status_id, activities_id, submission_time, answer,attachment_link) VALUES ("${student_id}", "${homework_id}", "${submission_time}", "${answer}","${attachment_link}" )`;
    con.query(sql);
    res.json({ status: "success" });
    // con.query(sql, function (err, result, fields) {
      // console.log(sql);
      // if (err) throw err;
      
    // });
  });

  app.get("/api/activities/student", authenticateToken, (req, res) => {
    var sql = `select activities.id,activities.activity_id,questions, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS teacher_name, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activities
    join activity on activities.activity_id=activity.id 
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    left join subject on activities.subject_id=subject.id
    join teacher on activities.school_teacher_id=teacher.id
    join session on activities.session_id=session.id
    where activities.section_id="${req.query.section_id}"
    and activities.class_id = "${req.query.class_id}"
    and activities.session_id = "${req.query.session_id}"
    and activities.school_info_id = "${req.query.school_info_id}"
    and sub_start_date <=  "${moment().format('YYYY-MM-DD')}"
    and TIME_FORMAT(sub_start_time, '%r') <=  "${moment().format('LTS')}"
    order by due_date desc;`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/student/filter", authenticateToken, (req, res) => {
    const secton_id = req.query.section_id
    const class_id = req.query.class_id
    const subject_id = req.query.subject_id
    const issue_date = req.query.issue_date !== undefined && req.query.issue_date !== '' ? moment(req.query.issue_date).format("YYYY-MM-DD") : ''
    const due_date = req.query.due_date !== undefined && req.query.due_date !== '' ? moment(req.query.due_date).format("YYYY-MM-DD") : ''
    const teacher_id = req.query.teacher_id
    let condition = secton_id !== '' ? ` and activities.section_id="${secton_id}"` : ``
    condition += class_id !== '' ? ` and activities.class_id="${class_id}"` : ``
    condition += subject_id !== '' ? ` and activities.subject_id="${subject_id}"` : ``
    condition += teacher_id !== '' ? ` and activities.teacher_id="${teacher_id}"` : ``
    condition += issue_date !== undefined && issue_date !== '' ? ` and activities.due_date BETWEEN "${issue_date}" AND "${due_date}"` : ``
    var sql = `select activities.id, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS teacher_name, topic, details, issue_date, due_date, session.session_year,attachment_link,(SELECT count(*) from activities_submission where activities_id = activities.id) submission
    from activities
    join activity on activities.activity_id=activity.id 
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.teacher_id=teacher.id
    join session on activities.session_id=session.id
    where 1=1 ${condition}
    order by activities.due_date;`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/teacher/filter", authenticateToken, (req, res) => {
    const section_id = req.query.section_id
    const session_id = req.query.session_id
    const class_id = req.query.class_id
    const subject_id = req.query.subject_id
    const school_info_id = req.query.school_info_id
    const search_school_teacher_id = req.query.search_school_teacher_id
    const issue_date = req.query.issue_date !== "" ? moment(req.query.issue_date).format("YYYY-MM-DD") : ""
    const due_date = req.query.due_date !== "" ? moment(req.query.due_date).format("YYYY-MM-DD") : ""
    let condition = section_id !== '' ? ` and activities.section_id="${section_id}"` : ``
    condition += class_id !== '' ? ` and activities.class_id="${class_id}"` : ``
    condition += subject_id !== '' ? ` and activities.subject_id="${subject_id}"` : ``
    condition += session_id !== '' ? ` and activities.session_id="${session_id}"` : ``
    condition += school_info_id !== '' ? ` and activities.school_info_id="${school_info_id}"` : ``
    condition += search_school_teacher_id !== '' ? ` and activities.school_teacher_id="${search_school_teacher_id}"` : ``
    condition += issue_date !== '' ? ` and due_date BETWEEN "${issue_date}" AND "${due_date}"` : ``
    var sql = `select activity.id, class.class_name, subject.subject_name, topic, details, issue_date, due_date, session.session_year,attachment_link,(SELECT count(*) from activities_submission where activities_id = activities.id) submission,school_name,questions,all_school,all_class,all_section,all_session,all_subject
    from activity
    join activities on activities.activity_id=activity.id 
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join school_info on activities.school_info_id=school_info.id 
    join session on activities.session_id=session.id
    where 1=1 ${condition} group by activity.id
    order by due_date;`;
    console.log(sql)
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/extra_teacher/filter", authenticateToken, (req, res) => {
    const section_id = req.query.section_id
    const session_id = req.query.session_id
    const class_id = req.query.class_id
    const subject_id = req.query.subject_id
    const school_info_id = req.query.school_info_id
    const search_school_teacher_id = req.query.search_school_teacher_id
    const issue_date = req.query.issue_date !== "" ? moment(req.query.issue_date).format("YYYY-MM-DD") : ""
    const due_date = req.query.due_date !== "" ? moment(req.query.due_date).format("YYYY-MM-DD") : ""
    let condition = section_id !== '' ? ` and curriculam_child.section_id="${section_id}"` : ``
    condition += class_id !== '' ? ` and curriculam_child.class_id="${class_id}"` : ``
    condition += subject_id !== '' ? ` and curriculam_child.subject_id="${subject_id}"` : ``
    condition += session_id !== '' ? ` and curriculam_child.session_id="${session_id}"` : ``
    condition += school_info_id !== '' ? ` and curriculam_child.school_info_id="${school_info_id}"` : ``
    condition += issue_date !== '' ? ` and due_date BETWEEN "${issue_date}" AND "${due_date}"` : ``
    var sql = `select curriculam.id, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS full_name, topic, details, issue_date, due_date, session.session_year,attachment_link,school_name,all_school,all_class,all_section,all_session,all_subject
    from curriculam
    join curriculam_child on curriculam_child.activity_id=curriculam.id 
    join class on curriculam_child.class_id=class.id 
    join section on curriculam_child.section_id=section.id
    join subject on curriculam_child.subject_id=subject.id
    join teacher on curriculam_child.school_teacher_id=teacher.id
    join school_info on curriculam_child.school_info_id=school_info.id 
    join session on curriculam_child.session_id=session.id
    where 1=1 ${condition} group by curriculam.id
    order by due_date;`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/student/id", authenticateToken, (req, res) => {
    var sql = `select activities.id, questions,class.class_name, subject.subject_name, topic, details, issue_date, due_date, session.session_year,attachment_link
    from activity
    join activities on activities.activity_id=activity.id
    join class on activities.class_id=class.id
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join session on activities.session_id=session.id
    where activity.id="${req.query.homework_id}";`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        res.send(result[0]);
      }
    });
  });

  app.get("/api/activities/student/submit/all", authenticateToken, (req, res) => {
    var sql = `select * from activities_submission order by id desc`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.delete("/api/activities/student/delete", authenticateToken, (req, res) => {
    var sql = `delete from activities_submission where activities_id = ${req.query.id};`;
    con.query(`delete from activities where activity_id = ${req.query.id}`)
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      var sql = `delete from activity where id = ${req.query.id};`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
  app.delete("/api/subMission/delete", authenticateToken, (req, res) => {
    var sql = `delete from activities_submission where id = ${req.query.id};`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/teacher/submitlist", authenticateToken, (req, res) => {
    let cond = req.query.school_id !== '' && req.query.school_id !== undefined?` and student_info.school_info_id = ${req.query.school_id}`:''
    cond += req.query.section_id !== '' && req.query.section_id !== undefined?` and student_info.section_id = ${req.query.section_id}`:''
    cond += req.query.class_id !== '' && req.query.class_id !== undefined?` and student_info.class_id = ${req.query.class_id}`:''
    cond += req.query.user_id !== '' && req.query.user_id !== undefined?` and student_info.id = ${req.query.user_id}`:''
    var sql = `select student_info.*,activities_submission.submission_time, activities_submission.attachment_link,answer,activities_submission.id as sub_id,activities.subject_id,student_info.id as student_id,activities_submission.activities_id,(select marks_obtained from  extra_curriculum_marks where activities_submission.activities_id=extra_curriculum_marks.activities_id and student_info.id = extra_curriculum_marks.student_id order by extra_curriculum_marks.id desc limit 1) marks_obtained    
    from activities_submission
    join student_info on activities_submission.student_present_status_id=student_info.student_present_status_id
    join activities on activities.id=activities_submission.activities_id
    where activities_submission.activities_id="${req.query.home_work_id}" ${cond} group by activities_submission.id order by marks_obtained desc`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/admin/submitlist", authenticateToken, (req, res) => {
    let cond = req.query.school_id !== '' && req.query.school_id !== undefined?` and student_info.school_info_id = ${req.query.school_id}`:''
    cond += req.query.section_id !== '' && req.query.section_id !== undefined?` and student_info.section_id = ${req.query.section_id}`:''
    cond += req.query.class_id !== '' && req.query.class_id !== undefined?` and student_info.class_id = ${req.query.class_id}`:''
    cond += req.query.user_id !== '' && req.query.user_id !== undefined?` and student_info.id = ${req.query.user_id}`:''
    var sql = `select student_info.*,activities_submission.submission_time, activities_submission.attachment_link,answer,activities_submission.id as sub_id,activities.subject_id,student_info.id as student_id,activities_submission.activities_id,(select marks_obtained from  extra_curriculum_marks where activities_submission.activities_id=extra_curriculum_marks.activities_id and student_info.id = extra_curriculum_marks.student_id order by extra_curriculum_marks.id desc limit 1) marks_obtained    
    from activities_submission
    left join student_info on activities_submission.student_present_status_id=student_info.student_present_status_id
    left join activities on activities.id=activities_submission.activities_id
    where activities.activity_id="${req.query.home_work_id}" ${cond} group by activities_submission.id order by marks_obtained desc`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/byTeacher", authenticateToken, (req, res) => {
    var sql = `select activity.* from activity join activities on activities.activity_id = activity.id group by activity.id;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/extraByTeacher", authenticateToken, (req, res) => {
    var sql = `select curriculam.* from curriculam join curriculam_child on curriculam_child.activity_id = curriculam.id group by curriculam.id;`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
};
