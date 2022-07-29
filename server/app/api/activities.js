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
    order by activities.id desc`;
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
    condition += req.query.school_teacher_id !== '' && req.query.school_teacher_id !== undefined ? ` and activities.school_teacher_id="${req.query.school_teacher_id}"` : ``
    condition += req.query.date !== '' && req.query.date !== undefined ? ` and activities.issue_date="${req.query.date}"` : ``
    var sql = `select activities.id, class.class_name, subject.subject_name, activities.school_teacher_id as teacher_id, teacher.first_name, teacher.initial, topic, details, issue_date, due_date, session.session_year,attachment_link,section.section_default_name
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.school_teacher_id=teacher.id
    join session on activities.session_id=session.id
    where 1=1 ${condition}
    order by activities.id desc`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/activities/teacher/individual", authenticateToken, (req, res) => {
    var sql = `select activities.id, class.class_name, subject.subject_name, CONCAT( first_name, ' ', middle_name, ' ', last_name ) AS full_name, topic, details, issue_date, due_date, session.session_year,attachment_link,activities.class_id,activities.section_id,activities.subject_id,activities.session_id,section_default_name,school_name,activities.school_info_id,activities.school_teacher_id
    from activities
    join class on activities.class_id=class.id 
    join school_info on activities.school_info_id=school_info.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.school_teacher_id=teacher.id
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
        sql = `UPDATE activities
        SET school_info_id="${school_info_id}", class_id="${class_id}",section_id="${section_id}",teacher_id="${teacher_id}",subject_id="${subject_id}",session_id="${session_id}",topic="${topic}",school_teacher_id="${school_teacher_id}",details="${details}",issue_date="${issue_date}",due_date="${due_date}"${attachment}
        WHERE id=${id}`
        console.log(sql);
      } else {
        const attachment = attachment_link !== 'undefined' ? `"${attachment_link}"` : `""`
        if (school_type === 'all') {
          con.query(`select * from school_type`, function (err, result, fields) {
            if (err) throw err;
            result.map(type => {
              if (school_info_id === 'all') {
                let sql = `select * from school_info`
                con.query(sql, function (err, result, fields) {
                  if (err) throw err;
                  result.map(sch => {
                    if (class_id === 'all') {
                      con.query(`select * from class where school_type_id = ${type.id}`, function (err, result, fields) {
                        result.map(cls => {
    
                          if (err) throw err;
                          if (section_id === 'all') {
                            //all section if
                            con.query(`select * from section`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sec => {
                                if (session_id === 'all') {
                                  //all session
                                  con.query(`select * from session`, function (err, result, fields) {
                                    if (err) throw err;
                                    result.map(ses => {
                                      if (subject_id === 'all') {
                                        con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                                          if (err) throw err;
                                          result.map(sub => {
                                            if (school_teacher_id === 'all') {
                                              con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                                if (err) throw err;
                                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                                result.map(tec => {
                                                  sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                                })
                                                sql = sql.slice(0, -1);
                                                con.query(sql, function (err, result, fields) {
                                                  if (err) throw err;
                                                });
                                              })
                                            } else {
                                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                
                                              sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                              sql = sql.slice(0, -1);
                                              con.query(sql, function (err, result, fields) {
                                                if (err) throw err;
                                              });
                
                                            }
                                          })
                
                                        })
                                      } else {
                                        if (school_teacher_id === 'all') {
                                          con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                            if (err) throw err;
                                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                            result.map(tec => {
                                              sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                            })
                                            sql = sql.slice(0, -1);
                                            con.query(sql, function (err, result, fields) {
                                              if (err) throw err;
                                            });
                                          })
                                        } else {
                                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                
                                          sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                          sql = sql.slice(0, -1);
                                          con.query(sql, function (err, result, fields) {
                                            if (err) throw err;
                                          });
                
                                        }
                                      }
                                    })
                                  })
        
                                } else {
                                  //all session else
                                  con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    result.map(sub => {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    })
        
                                  })
                                }
                              })
                            })
                          } else {
                            //all section else
                            if (session_id === 'all') {
                              con.query(`select * from session`, function (err, result, fields) {
                                if (err) throw err;
                                result.map(ses => {
                                  if (subject_id === 'all') {
                                    con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                                      if (err) throw err;
                                      result.map(sub => {
                                        if (school_teacher_id === 'all') {
                                          con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                            if (err) throw err;
                                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                            result.map(tec => {
                                              sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                            })
                                            sql = sql.slice(0, -1);
                                            con.query(sql, function (err, result, fields) {
                                              if (err) throw err;
                                            });
                                          })
                                        } else {
                                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                          sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                          sql = sql.slice(0, -1);
                                          con.query(sql, function (err, result, fields) {
                                            if (err) throw err;
                                          });
            
                                        }
                                      })
            
                                    })
                                  } else {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                      sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
            
                                    }
                                  }
                                })
                              })
        
                            } else {
                              if (subject_id === 'all') {
                                con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                                  if (err) throw err;
                                  result.map(sub => {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                      sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
        
                                    }
                                  })
        
                                })
                              } else {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                  sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
        
                                }
                              }
        
                            }
        
                          }
                        })
                      })
                    } else {
                      if (section_id === 'all') {
                        //all section if
                        con.query(`select * from section`, function (err, result, fields) {
                          if (err) throw err;
                          result.map(sec => {
                            if (session_id === 'all') {
                              //all session
                              con.query(`select * from session`, function (err, result, fields) {
                                if (err) throw err;
                                result.map(ses => {
                                  if (subject_id === 'all') {
                                    con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${class_id}`, function (err, result, fields) {
                                      if (err) throw err;
                                      result.map(sub => {
                                        if (school_teacher_id === 'all') {
                                          con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                            if (err) throw err;
                                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                            result.map(tec => {
                                              sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                            })
                                            sql = sql.slice(0, -1);
                                            con.query(sql, function (err, result, fields) {
                                              if (err) throw err;
                                            });
                                          })
                                        } else {
                                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                          sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                          sql = sql.slice(0, -1);
                                          con.query(sql, function (err, result, fields) {
                                            if (err) throw err;
                                          });
            
                                        }
                                      })
            
                                    })
                                  } else {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                      sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
            
                                    }
                                  }
                                })
                              })
    
                            } else {
                              //all session else
                              con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${class_id}`, function (err, result, fields) {
                                if (err) throw err;
                                result.map(sub => {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                })
    
                              })
                            }
                          })
                        })
                      } else {
                        //all section else
                        if (session_id === 'all') {
                          con.query(`select * from session`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(ses => {
                              if (subject_id === 'all') {
                                con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${class_id}`, function (err, result, fields) {
                                  if (err) throw err;
                                  result.map(sub => {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                      sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
        
                                    }
                                  })
        
                                })
                              } else {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                  sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
        
                                }
                              }
                            })
                          })
    
                        } else {
                          if (subject_id === 'all') {
                            con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${class_id}`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sub => {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                                  sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
    
                                }
                              })
    
                            })
                          } else {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          }
    
                        }
    
                      }
                    }
                  })
                });
              } else {
                if (class_id === 'all') {
                  con.query(`select * from class where school_type_id = ${type.id}`, function (err, result, fields) {
                    result.map(cls => {
    
                      if (err) throw err;
                      if (section_id === 'all') {
                        //all section if
                        con.query(`select * from section`, function (err, result, fields) {
                          if (err) throw err;
                          result.map(sec => {
                            if (session_id === 'all') {
                              //all session
                              con.query(`select * from session`, function (err, result, fields) {
                                if (err) throw err;
                                result.map(ses => {
                                  if (subject_id === 'all') {
                                    con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                                      if (err) throw err;
                                      result.map(sub => {
                                        if (school_teacher_id === 'all') {
                                          con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                            if (err) throw err;
                                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                            result.map(tec => {
                                              sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                            })
                                            sql = sql.slice(0, -1);
                                            con.query(sql, function (err, result, fields) {
                                              if (err) throw err;
                                            });
                                          })
                                        } else {
                                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                          sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                          sql = sql.slice(0, -1);
                                          con.query(sql, function (err, result, fields) {
                                            if (err) throw err;
                                          });
            
                                        }
                                      })
            
                                    })
                                  } else {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                      sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
            
                                    }
                                  }
                                })
                              })
    
                            } else {
                              //all session else
                              con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                                if (err) throw err;
                                result.map(sub => {
                                  con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                })
    
                              })
                            }
                          })
                        })
                      } else {
                        //all section else
                        if (session_id === 'all') {
                          con.query(`select * from session`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(ses => {
                              if (subject_id === 'all') {
                                con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                                  if (err) throw err;
                                  result.map(sub => {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                      sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
        
                                    }
                                  })
        
                                })
                              } else {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                  sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
        
                                }
                              }
                            })
                          })
    
                        } else {
                          if (subject_id === 'all') {
                            con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${cls.id}`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sub => {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                                  sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
    
                                }
                              })
    
                            })
                          } else {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          }
    
                        }
    
                      }
                    })
                  })
                } else {
                  if (section_id === 'all') {
                    //all section if
                    con.query(`select * from section`, function (err, result, fields) {
                      if (err) throw err;
                      result.map(sec => {
                        if (session_id === 'all') {
                          //all session
                          con.query(`select * from session`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(ses => {
                              if (subject_id === 'all') {
                                con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${class_id}`, function (err, result, fields) {
                                  if (err) throw err;
                                  result.map(sub => {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                      sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
        
                                    }
                                  })
        
                                })
                              } else {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                  sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
        
                                }
                              }
                            })
                          })
    
                        } else {
                          //all session else
                          con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${class_id}`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(sub => {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            })
    
                          })
                        }
                      })
                    })
                  } else {
                    //all section else
                    if (session_id === 'all') {
                      con.query(`select * from session`, function (err, result, fields) {
                        if (err) throw err;
                        result.map(ses => {
                          if (subject_id === 'all') {
                            con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${class_id}`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sub => {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                                  sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
    
                                }
                              })
    
                            })
                          } else {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          }
                        })
                      })
    
                    } else {
                      if (subject_id === 'all') {
                        con.query(`select * from subject where school_type_id = ${type.id} and class_id = ${school_info_id}`, function (err, result, fields) {
                          if (err) throw err;
                          result.map(sub => {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          })
    
                        })
                      } else {
                        if (school_teacher_id === 'all') {
                          con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                            if (err) throw err;
                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                            result.map(tec => {
                              sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                            })
                            sql = sql.slice(0, -1);
                            console.log(sql);
                            con.query(sql, function (err, result, fields) {
                              if (err) throw err;
                            });
                          })
                        } else {
                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                          sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                          sql = sql.slice(0, -1);
                          con.query(sql, function (err, result, fields) {
                            if (err) throw err;
                          });
    
                        }
                      }
    
                    }
    
                  }
                }
              }
            })
          })
        } else {
          //when school type is single
          if (school_info_id === 'all') {
            let sql = `select * from school_info`
            con.query(sql, function (err, result, fields) {
              if (err) throw err;
              result.map(sch => {
                if (class_id === 'all') {
                  con.query(`select * from class where school_type_id = ${school_type}`, function (err, result, fields) {
                    result.map(cls => {

                      if (err) throw err;
                      if (section_id === 'all') {
                        //all section if
                        con.query(`select * from section`, function (err, result, fields) {
                          if (err) throw err;
                          result.map(sec => {
                            if (session_id === 'all') {
                              //all session
                              con.query(`select * from session`, function (err, result, fields) {
                                if (err) throw err;
                                result.map(ses => {
                                  if (subject_id === 'all') {
                                    con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                                      if (err) throw err;
                                      result.map(sub => {
                                        if (school_teacher_id === 'all') {
                                          con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                            if (err) throw err;
                                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                            result.map(tec => {
                                              sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                            })
                                            sql = sql.slice(0, -1);
                                            con.query(sql, function (err, result, fields) {
                                              if (err) throw err;
                                            });
                                          })
                                        } else {
                                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                          sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                          sql = sql.slice(0, -1);
                                          con.query(sql, function (err, result, fields) {
                                            if (err) throw err;
                                          });
            
                                        }
                                      })
            
                                    })
                                  } else {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
            
                                      sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
            
                                    }
                                  }
                                })
                              })
    
                            } else {
                              //all session else
                              con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                                if (err) throw err;
                                result.map(sub => {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                })
    
                              })
                            }
                          })
                        })
                      } else {
                        //all section else
                        if (session_id === 'all') {
                          con.query(`select * from session`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(ses => {
                              if (subject_id === 'all') {
                                con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                                  if (err) throw err;
                                  result.map(sub => {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                      sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
        
                                    }
                                  })
        
                                })
                              } else {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                  sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
        
                                }
                              }
                            })
                          })
    
                        } else {
                          if (subject_id === 'all') {
                            con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sub => {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                                  sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
    
                                }
                              })
    
                            })
                          } else {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${sch.id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          }
    
                        }
    
                      }
                    })
                  })
                } else {
                  if (section_id === 'all') {
                    //all section if
                    con.query(`select * from section`, function (err, result, fields) {
                      if (err) throw err;
                      result.map(sec => {
                        if (session_id === 'all') {
                          //all session
                          con.query(`select * from session`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(ses => {
                              if (subject_id === 'all') {
                                con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                                  if (err) throw err;
                                  result.map(sub => {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                      sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
        
                                    }
                                  })
        
                                })
                              } else {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                  sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
        
                                }
                              }
                            })
                          })

                        } else {
                          //all session else
                          con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(sub => {
                              con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${sch.id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            })

                          })
                        }
                      })
                    })
                  } else {
                    //all section else
                    if (session_id === 'all') {
                      con.query(`select * from session`, function (err, result, fields) {
                        if (err) throw err;
                        result.map(ses => {
                          if (subject_id === 'all') {
                            con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sub => {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                                  sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
    
                                }
                              })
    
                            })
                          } else {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          }
                        })
                      })

                    } else {
                      if (subject_id === 'all') {
                        con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                          if (err) throw err;
                          result.map(sub => {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                              sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });

                            }
                          })

                        })
                      } else {
                        if (school_teacher_id === 'all') {
                          con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                            if (err) throw err;
                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                            result.map(tec => {
                              sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                            })
                            sql = sql.slice(0, -1);
                            con.query(sql, function (err, result, fields) {
                              if (err) throw err;
                            });
                          })
                        } else {
                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                          sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                          sql = sql.slice(0, -1);
                          con.query(sql, function (err, result, fields) {
                            if (err) throw err;
                          });

                        }
                      }

                    }

                  }
                }
              })
            });
          } else {
            if (class_id === 'all') {
              con.query(`select * from class where school_type_id = ${school_type}`, function (err, result, fields) {
                result.map(cls => {

                  if (err) throw err;
                  if (section_id === 'all') {
                    //all section if
                    con.query(`select * from section`, function (err, result, fields) {
                      if (err) throw err;
                      result.map(sec => {
                        if (session_id === 'all') {
                          //all session
                          con.query(`select * from session`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(ses => {
                              if (subject_id === 'all') {
                                con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                                  if (err) throw err;
                                  result.map(sub => {
                                    if (school_teacher_id === 'all') {
                                      con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                        if (err) throw err;
                                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                        result.map(tec => {
                                          sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                        })
                                        sql = sql.slice(0, -1);
                                        con.query(sql, function (err, result, fields) {
                                          if (err) throw err;
                                        });
                                      })
                                    } else {
                                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                      sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                      sql = sql.slice(0, -1);
                                      con.query(sql, function (err, result, fields) {
                                        if (err) throw err;
                                      });
        
                                    }
                                  })
        
                                })
                              } else {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${sch.id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
        
                                  sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
        
                                }
                              }
                            })
                          })

                        } else {
                          //all session else
                          con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                            if (err) throw err;
                            result.map(sub => {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${cls.id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            })

                          })
                        }
                      })
                    })
                  } else {
                    //all section else
                    if (session_id === 'all') {
                      con.query(`select * from session`, function (err, result, fields) {
                        if (err) throw err;
                        result.map(ses => {
                          if (subject_id === 'all') {
                            con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sub => {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                                  sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
    
                                }
                              })
    
                            })
                          } else {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          }
                        })
                      })

                    } else {
                      if (subject_id === 'all') {
                        con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${cls.id}`, function (err, result, fields) {
                          if (err) throw err;
                          result.map(sub => {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                              sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });

                            }
                          })

                        })
                      } else {
                        if (school_teacher_id === 'all') {
                          con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                            if (err) throw err;
                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                            result.map(tec => {
                              sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                            })
                            sql = sql.slice(0, -1);
                            con.query(sql, function (err, result, fields) {
                              if (err) throw err;
                            });
                          })
                        } else {
                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                          sql += `("${school_info_id}", "${cls.id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                          sql = sql.slice(0, -1);
                          con.query(sql, function (err, result, fields) {
                            if (err) throw err;
                          });

                        }
                      }

                    }

                  }
                })
              })
            } else {
              if (section_id === 'all') {
                //all section if
                con.query(`select * from section`, function (err, result, fields) {
                  if (err) throw err;
                  result.map(sec => {
                    if (session_id === 'all') {
                      //all session
                      con.query(`select * from session`, function (err, result, fields) {
                        if (err) throw err;
                        result.map(ses => {
                          if (subject_id === 'all') {
                            con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                              if (err) throw err;
                              result.map(sub => {
                                if (school_teacher_id === 'all') {
                                  con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                    if (err) throw err;
                                    let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                    result.map(tec => {
                                      sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                    })
                                    sql = sql.slice(0, -1);
                                    con.query(sql, function (err, result, fields) {
                                      if (err) throw err;
                                    });
                                  })
                                } else {
                                  let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                                  sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                                  sql = sql.slice(0, -1);
                                  con.query(sql, function (err, result, fields) {
                                    if (err) throw err;
                                  });
    
                                }
                              })
    
                            })
                          } else {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
    
                              sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });
    
                            }
                          }
                        })
                      })

                    } else {
                      //all session else
                      con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                        if (err) throw err;
                        result.map(sub => {
                          con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                            if (err) throw err;
                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                            result.map(tec => {
                              sql += `("${school_info_id}", "${class_id}", "${sec.id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                            })
                            sql = sql.slice(0, -1);
                            con.query(sql, function (err, result, fields) {
                              if (err) throw err;
                            });
                          })
                        })

                      })
                    }
                  })
                })
              } else {
                //all section else
                if (session_id === 'all') {
                  con.query(`select * from session`, function (err, result, fields) {
                    if (err) throw err;
                    result.map(ses => {
                      if (subject_id === 'all') {
                        con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                          if (err) throw err;
                          result.map(sub => {
                            if (school_teacher_id === 'all') {
                              con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                                if (err) throw err;
                                let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                                result.map(tec => {
                                  sql += `("${sch.id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                                })
                                sql = sql.slice(0, -1);
                                con.query(sql, function (err, result, fields) {
                                  if (err) throw err;
                                });
                              })
                            } else {
                              let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                              sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                              sql = sql.slice(0, -1);
                              con.query(sql, function (err, result, fields) {
                                if (err) throw err;
                              });

                            }
                          })

                        })
                      } else {
                        if (school_teacher_id === 'all') {
                          con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                            if (err) throw err;
                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                            result.map(tec => {
                              sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                            })
                            sql = sql.slice(0, -1);
                            con.query(sql, function (err, result, fields) {
                              if (err) throw err;
                            });
                          })
                        } else {
                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                          sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${ses.id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                          sql = sql.slice(0, -1);
                          con.query(sql, function (err, result, fields) {
                            if (err) throw err;
                          });

                        }
                      }
                    })
                  })

                } else {
                  if (subject_id === 'all') {
                    con.query(`select * from subject where school_type_id = ${school_type} and class_id = ${class_id}`, function (err, result, fields) {
                      if (err) throw err;
                      result.map(sub => {
                        if (school_teacher_id === 'all') {
                          con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                            if (err) throw err;
                            let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                            result.map(tec => {
                              sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                            })
                            sql = sql.slice(0, -1);
                            con.query(sql, function (err, result, fields) {
                              if (err) throw err;
                            });
                          })
                        } else {
                          let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                          sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${sub.id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                          sql = sql.slice(0, -1);
                          con.query(sql, function (err, result, fields) {
                            if (err) throw err;
                          });

                        }
                      })

                    })
                  } else {
                    if (school_teacher_id === 'all') {
                      con.query(`select * from teacher where school_info_id = ${school_info_id}`, function (err, result, fields) {
                        if (err) throw err;
                        let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `
                        result.map(tec => {
                          sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${tec.id}",${attachment} ),`
                        })
                        sql = sql.slice(0, -1);
                        con.query(sql, function (err, result, fields) {
                          if (err) throw err;
                        });
                      })
                    } else {
                      let sql = `INSERT INTO activities (school_info_id, class_id, section_id, teacher_id, subject_id, session_id , topic, details, issue_date, due_date,school_teacher_id, attachment_link) VALUES `

                      sql += `("${school_info_id}", "${class_id}", "${section_id}", "${teacher_id}", "${subject_id}", "${session_id}", "${topic}", "${details}", "${issue_date}", "${due_date}","${teacher_id}",${attachment} ),`
                      sql = sql.slice(0, -1);
                      con.query(sql, function (err, result, fields) {
                        if (err) throw err;
                      });

                    }
                  }

                }

              }
            }
          }
        }
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

    const file = req.files.file
    var uploadPath = path.resolve(__dirname, '../../uploads/');
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
    condition += issue_date !== '' ? ` and activities.due_date BETWEEN "${issue_date}" AND "${due_date}"` : ``
    var sql = `select activities.id, class.class_name, subject.subject_name, CONCAT( teacher.first_name, ' ',  teacher.middle_name, ' ',  teacher.last_name ) AS full_name, topic, details, issue_date, due_date, session.session_year,attachment_link,(SELECT count(*) from activities_submission where activities_id = activities.id) submission,school_name
    from activities
    join class on activities.class_id=class.id 
    join section on activities.section_id=section.id
    join subject on activities.subject_id=subject.id
    join teacher on activities.school_teacher_id=teacher.id
    join school_info on activities.school_info_id=school_info.id 
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
    var sql = `select * from activities_submission order by id desc`;
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
  app.get("/api/activities/byTeacher", authenticateToken, (req, res) => {
    var sql = `select * from activities where school_teacher_id = ${req.query.teacher_id};`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
};
