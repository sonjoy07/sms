
module.exports = (app) => {
    const con = require('../models/db')
    const authenticateToken = require("../middleware/middleware");
    app.get("/api/exam_info", (req, res) => {
        var sql = `select exam_info.id,exam_info.class_id,exam_info.school_info_id as school_id,exam_info.section_id,exam_info.session_id,exam_info.exam_name_id,exam_info.subject_id, session.session_year,exam_name.exam_name, class.class_name,section.section_default_name,subject.subject_name, teacher.teacher_code,converted_marks,full_marks,exam_date,exam_info.teacher_id
        from exam_info
        join class on exam_info.class_id=class.id 
        join section on exam_info.section_id=section.id
        join subject on exam_info.subject_id=subject.id
        join teacher on exam_info.teacher_id=teacher.id
        join session on exam_info.session_id=session.id
        join school_info on exam_info.school_info_id=school_info.id
        join exam_name on exam_info.exam_name_id=exam_name.id
        where exam_info.school_info_id="${req.query.school_info_id}"
        order by exam_info.id;`;
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });

    app.get("/api/exam_name", authenticateToken, (req, res) => {
        var sql = "select * from exam_name";
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });
    app.get("/api/exam_info_check", authenticateToken, (req, res) => {
        var sql = "select  from exam_name";
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });
    app.post("/api/exam_info", authenticateToken, (req, res) => {
        var class_id = req.body.class_id;
        var section_id = req.body.section_id;
        var subject_id = req.body.subject_id;
        var session_id = req.body.session_id;
        var exam_name_id = req.body.exam_name_id;
        var full_marks = req.body.full_marks;
        var exam_date = req.body.exam_date;
        var teacher = req.body.teacher_id;
        var converted_marks = req.body.converted_marks;
        var school_info = req.body.school_info_id
        var id = req.body.id

        var sql
        if (id === '') {
            sql = `INSERT INTO exam_info (class_id, section_id, subject_id, session_id,exam_name_id,converted_marks,school_info_id,full_marks,teacher_id,exam_date) VALUES ("${class_id}", "${section_id}", "${subject_id}", "${session_id}", "${exam_name_id}","${converted_marks}","${teacher}","${full_marks}","${school_info}","${exam_date}")`;
        } else {
            sql=   `update exam_info set class_id = "${class_id}",section_id = "${section_id}",subject_id = "${subject_id}",session_id = "${session_id}",exam_name_id = "${exam_name_id}",converted_marks = "${converted_marks}",school_info_id = "${school_info}",full_marks = "${full_marks}",teacher_id = "${teacher}",exam_date = "${exam_date}" where id = "${id}"`
        }

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.delete("/api/exam/delete", authenticateToken, (req, res) => {
        var id = req.query.id;
        var sql = `delete from exam_info where id ="${id}"`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
};


