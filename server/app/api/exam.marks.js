
const util = require('util');
module.exports = (app) => {
    const con = require("../models/db");
    const authenticateToken = require("../middleware/middleware");
    const query = util.promisify(con.query).bind(con);
    app.get('/api/student_mark', authenticateToken, (req, res) => {
        let condition = req.query.section_id !== '' && req.query.section_id !== undefined ? ` and section_id = "${req.query.section_id}"` : ''
        condition += req.query.session_id !== '' && req.query.session_id !== undefined ? ` and session_id = "${req.query.session_id}"` : ''
        condition += req.query.class_id !== '' && req.query.class_id !== undefined ? ` and class.id = "${req.query.class_id}"` : ''
        condition += req.query.school_info_id !== '' && req.query.school_info_id !== undefined ? ` and student_present_status.school_info_id = "${req.query.school_info_id}"` : ''
        //  condition +=req.query.subject_id !== '' && req.query.subject_id !== undefined?  ` and class.id = "${req.query.subject_id}"`:''
        var sql = `SELECT student.student_code,section.section_default_name,concat(student.first_name," " ,student.middle_name," ",student.last_name) as name, session.session_year,student_present_status.student_id,student_present_status.class_id,student_present_status.session_id,class.class_name,student_present_status.shift_id,student_present_status.class_roll_no,student_present_status.school_info_id,(
            SELECT marks_obtained
            FROM extra_curriculum_marks
            LEFT JOIN student_present_status sps ON sps.student_id = extra_curriculum_marks.student_id
            LEFT JOIN activities ON activities.id = extra_curriculum_marks.activities_id
            WHERE activities.activity_id="${req.query.exam_id}" and sps.student_id = student_present_status.student_id ) AS marks,(
                SELECT extra_curriculum_marks.id
                FROM extra_curriculum_marks
                LEFT JOIN student_present_status sps ON sps.student_id = extra_curriculum_marks.student_id
                LEFT JOIN activities ON activities.id = extra_curriculum_marks.activities_id
                WHERE activities.activity_id="${req.query.exam_id}" and sps.student_id = student_present_status.student_id ) AS mark_id
         from student 
         JOIN student_present_status ON student.id = student_present_status.student_id
         JOIN school_info ON school_info.id = student_present_status.school_info_id INNER JOIN session ON session.id = student_present_status.session_id 
         JOIN class ON class.id = student_present_status.class_id 
         JOIN section ON section.id = student_present_status.section_id 
        WHERE 1=1 ${condition}`
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })
    app.post("/api/exam_mark", authenticateToken, (req, res) => {
        var exam_info_id = req.body.exam_info_id;
        var subject_id = req.body.subject_id;
        var mark_update = req.body.mark_update;
        var teacher_id = req.body.teacher_id;

        var sql = `INSERT INTO exam_marks (exam_info_id,subject_id,student_id,marks_obtained,teacher_id) VALUES `
        mark_update.filter(res => res.mark_id === '').map((sts) => {
            sql += ` ('${exam_info_id}','${subject_id}','${sts.student_id}','${sts.mark_obtained}',"${teacher_id}"),`
        });
        sql = sql.slice(0, -1);
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            mark_update.filter(res => res.mark_id !== '').map(res => {
                var sql = `update exam_marks set marks_obtained = ${res.mark_obtained} where  id = ${res.mark_id}`
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                })
            })
            res.json({ status: "success" });
        });
    });
    app.get("/api/marks_exist", authenticateToken, (req, res) => {
        var exam_info_id = req.query.exam_id;
        var subject_id = req.query.subject_id;
        var teacher_id = req.query.teacher_id;
        var class_id = req.query.class_id;
        var section_id = req.query.section_id;
        var session_id = req.query.session_id;

        let condition = teacher_id !== '' && teacher_id !== undefined ? ` and teacher_id="${teacher_id}"` : ``
        condition += exam_info_id !== '' && exam_info_id !== undefined ? ` and exam_info_id="${exam_info_id}"` : ``
        condition += subject_id !== '' && subject_id !== undefined ? ` and subject_id="${subject_id}"` : ``
        condition += section_id !== '' && section_id !== undefined ? ` and section_id="${section_id}"` : ``
        condition += class_id !== '' && class_id !== undefined ? ` and class_id="${class_id}"` : ``
        condition += session_id !== '' && session_id !== undefined ? ` and exam_marks.session_id="${session_id}"` : ``



        var sql = `select exam_marks.* from exam_marks left join student_present_status sps on sps.student_id = exam_marks.student_id where 1=1${condition}`
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get("/api/extra_marks_exist", authenticateToken, (req, res) => {
        var exam_info_id = req.query.exam_id;
        var subject_id = req.query.subject_id;
        var teacher_id = req.query.teacher_id;
        var class_id = req.query.class_id;
        var section_id = req.query.section_id;
        var session_id = req.query.session_id;

        let condition = exam_info_id !== '' && exam_info_id !== undefined ? ` and activities.activity_id="${exam_info_id}"` : ``
        condition += subject_id !== '' && subject_id !== undefined ? ` and extra_curriculum_marks.subject_id="${subject_id}"` : ``
        condition += section_id !== '' && section_id !== undefined ? ` and sps.section_id="${section_id}"` : ``
        condition += class_id !== '' && class_id !== undefined ? ` and sps.class_id="${class_id}"` : ``
        condition += session_id !== '' && session_id !== undefined ? ` and sps.session_id="${session_id}"` : ``



        var sql = `select extra_curriculum_marks.* from extra_curriculum_marks left join student_present_status sps on sps.student_id = extra_curriculum_marks.student_id left join activities on activities.id = extra_curriculum_marks.activities_id where 1=1${condition}`
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get("/api/teacher_extra_marks_exist", authenticateToken, (req, res) => {
        var exam_info_id = req.query.exam_id;
        var subject_id = req.query.subject_id;
        var teacher_id = req.query.teacher_id;
        var class_id = req.query.class_id;
        var section_id = req.query.section_id;
        var session_id = req.query.session_id;
        var school_id = req.query.school_id;

        let condition = teacher_id !== '' && teacher_id !== undefined ? ` and teacher_id="${teacher_id}"` : ``
        condition += exam_info_id !== '' && exam_info_id !== undefined ? ` and activities_id="${exam_info_id}"` : ``
        condition += subject_id !== '' && subject_id !== undefined ? ` and subject_id="${subject_id}"` : ``
        condition += section_id !== '' && section_id !== undefined ? ` and section_id="${section_id}"` : ``
        condition += class_id !== '' && class_id !== undefined ? ` and class_id="${class_id}"` : ``
        condition += session_id !== '' && session_id !== undefined ? ` and session_id="${session_id}"` : ``
        condition += school_id !== '' && school_id !== undefined ? ` and school_info_id="${school_id}"` : ``



        var sql = `select teacher_extra_curriculum_marks.* from teacher_extra_curriculum_marks left join student_present_status sps on sps.student_id = teacher_extra_curriculum_marks.student_id where 1=1${condition}`
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.post("/api/extra_curriculum_marks", authenticateToken, (req, res) => {
        var exam_info_id = req.body.exam_info_id;
        var subject_id = req.body.subject_id;
        var mark_update = req.body.mark_update;
        var teacher_id = req.body.teacher_id;
        var subjects = req.body.subjects;
        let exist = mark_update.filter(res => res.mark_id === '')
        if (exist.length !== 0) {
            var sql = `INSERT INTO extra_curriculum_marks (activities_id,subject_id,student_id,marks_obtained,teacher_id) VALUES `
            mark_update.filter(res => res.mark_id === '').map((sts) => {

                if (subject_id === 'all') {
                    subjects.map(res => {
                        sql += ` ('${exam_info_id}','${res.id}','${sts.student_id}','${sts.mark_obtained}',"${teacher_id}"),`
                    })
                } else {
                    sql += ` ('${exam_info_id}','${subject_id}','${sts.student_id}','${sts.mark_obtained}',"${teacher_id}"),`
                }
            });
            sql = sql.slice(0, -1);
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.json({ status: "success" });
            });
        }else{
            mark_update.filter(res => res.mark_id !== '').map(res => {
                var sql = `update extra_curriculum_marks set marks_obtained = ${res.mark_obtained} where  id = ${res.mark_id}`
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                })
            })
            res.json({ status: "success" });
        }
    });
    app.post("/api/teacher_extra_curriculum_marks", authenticateToken, (req, res) => {
        var exam_info_id = req.body.exam_info_id;
        var subject_id = req.body.subject_id;
        var mark_update = req.body.mark_update;
        var teacher_id = req.body.teacher_id;
        var subjects = req.body.subjects;

        var sql = `INSERT INTO teacher_extra_curriculum_marks (activities_id,subject_id,student_id,marks_obtained,teacher_id) VALUES `
        mark_update.filter(res => res.mark_id === '').map((sts) => {
            if (subject_id === 'all') {
                subjects.map(res => {
                    sql += ` ('${exam_info_id}','${res.id}','${sts.student_id}','${sts.mark_obtained}',"${teacher_id}"),`
                })
            } else {
                sql += ` ('${exam_info_id}','${subject_id}','${sts.student_id}','${sts.mark_obtained}',"${teacher_id}"),`
            }
        });
        sql = sql.slice(0, -1);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            mark_update.filter(res => res.mark_id !== '').map(res => {
                var sql = `update teacher_extra_curriculum_marks set marks_obtained = ${res.mark_obtained} where  id = ${res.mark_id}`
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                })
            })
            res.json({ status: "success" });
        });
    });
    app.post("/api/exam_mark/update", authenticateToken, (req, res) => {
        var updateData = req.body.updateData;
        var index = req.body.index;

        var sql = `Update exam_marks set marks_obtained = ${updateData}  where id = ${index}`
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.post("/api/exam_curi_mark/update", authenticateToken, (req, res) => {
        var updateData = req.body.updateData;
        var index = req.body.index;
        console.log(updateData[0]);

        var sql = `Update extra_curriculum_marks set marks_obtained = ${updateData[0]}  where id = ${index}`
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.post("/api/exam_curi_mark/insert", authenticateToken, async (req, res) => {
        var updateData = req.body.updateData;
        var subject_id = req.body.subject_id;
        var student_id = req.body.student_id;
        var teacher_id = req.body.teacher_id;
        var index = req.body.index;
        let finalre = await query(`select id from extra_curriculum_marks where student_id = ${student_id} and subject_id=${subject_id} and activities_id = ${index} and teacher_id = ${teacher_id}`);
        console.log(finalre);
        if (finalre.length > 0) {
            var sql = `update extra_curriculum_marks set student_id = "${student_id}",subject_id="${subject_id}",activities_id="${index}",teacher_id="${teacher_id}",marks_obtained="${updateData}" where id = ${finalre[0].id}`
            console.log(sql);
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.json({ status: "success" });
            });
        } else {
            var sql = `Insert into extra_curriculum_marks (student_id,subject_id,activities_id,teacher_id,marks_obtained) value ("${student_id}","${subject_id}","${index}","${teacher_id}","${updateData}")`
            console.log(sql);
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.json({ status: "success" });
            });
        }

    });
    app.post("/api/teacher_exam_curi_mark/update", authenticateToken, (req, res) => {
        var updateData = req.body.updateData;
        var index = req.body.index;

        var sql = `Update teacher_extra_curriculum_marks set marks_obtained = ${updateData}  where id = ${index}`
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.delete("/api/exam-mark/delete", authenticateToken, (req, res) => {
        var id = req.query.id

        var sql = `delete from  exam_marks where id = ${id}`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.delete("/api/extra-exam-mark/delete", authenticateToken, (req, res) => {
        var id = req.query.id

        var sql = `delete from  extra_curriculum_marks where id = ${id}`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.delete("/api/teacher_extra-exam-mark/delete", authenticateToken, (req, res) => {
        var id = req.query.id

        var sql = `delete from  teacher_extra_curriculum_marks where id = ${id}`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });




    app.get('/api/exam_mark', authenticateToken, (req, res) => {

        var sql = `select exam_marks.id,marks_obtained,student.student_code,section.section_default_name,session.session_year,CONCAT(student.first_name,' ' ,student.middle_name) as name,class.class_name,exam_name.exam_name,school_info.school_name,school_info.address_district,subject.subject_name
        from exam_marks
        INNER join exam_name on exam_name.id=exam_marks.exam_info_id
          INNER join student_present_status on student_present_status.id=exam_marks.student_id
          LEFT join student on student.id=student_present_status.student_id
          LEFT join class on class.id=student_present_status.class_id
          LEFT join section on section.id=student_present_status.section_id
          LEFT join session on session.id=student_present_status.session_id
          LEFT join school_info on school_info.id=student_present_status.school_info_id
          inner join subject on subject.id=exam_marks.subject_id

          Where student_present_status.session_id="${req.query.session_id}" and exam_info_id="${req.query.exam_info_id}" and student_code="${req.query.student_code}" and student_present_status.school_info_id =${req.query.school_info_id}
        
        `
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })
    app.get('/api/exam_mark/search', authenticateToken, (req, res) => {

        var sql = `select exam_marks.id,marks_obtained,student_present_status.id,student.student_code,session.session_year,CONCAT(student.first_name,' ' ,student.middle_name) as name,class.class_name,exam_name.exam_name,school_info.school_name,school_info.address_district,subject.subject_name
        from student_present_status
        INNER join exam_name on exam_name.id=exam_marks.exam_info_id
          INNER join student_present_status on student_present_status.id=exam_marks.student_id
          LEFT join student on student.id=student_present_status.student_id
          LEFT join class on class.id=student_present_status.class_id
          LEFT join section on section.id=student_present_status.section_id
          LEFT join session on session.id=student_present_status.session_id
          LEFT join school_info on school_info.id=student_present_status.school_info_id
          inner join subject on subject.id=exam_marks.subject_id

          Where session_id="${req.query.session_id}" and exam_info_id="${req.query.exam_info_id}" and class.id="${req.query.class_id}" and section.id="${req.query.section_id}" and subject.id="${req.query.subject_id}" and school_info.id="${req.query.school_info_id}"
        
        `
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })
    app.get("/api/school_info", authenticateToken, (req, res) => {
        var sql = 'select school_code,school_name from school_info';
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        })
    })


}