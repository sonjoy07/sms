
module.exports = (app) => {
    const con = require('../models/db')
    const authenticateToken = require("../middleware/middleware");
    app.get("/api/exam_info", (req, res) => {
        var condition = req.query.school_info_id !== ''?` and exam_schedule.school_info_id="${req.query.school_info_id}"`: ``
        condition += req.query.teacher_id !== undefined && req.query.teacher_id !== ''? ` and exam_schedule.teacher_id = ${req.query.teacher_id}`: ``
        var sql = `select exam_schedule.id,exam_schedule.class_id,exam_schedule.school_info_id as school_id,exam_schedule.section_id,exam_schedule.session_id,exam_schedule.exam_name_id,exam_schedule.subject_id, session.session_year,exam_name.exam_name, class.class_name,section.section_default_name,subject.subject_name, teacher.teacher_code,converted_marks,full_marks,exam_date,exam_schedule.teacher_id
        from exam_schedule
        join class on exam_schedule.class_id=class.id 
        join section on exam_schedule.section_id=section.id
        join subject on exam_schedule.subject_id=subject.id
        join teacher on exam_schedule.teacher_id=teacher.id
        join session on exam_schedule.session_id=session.id
        join school_info on exam_schedule.school_info_id=school_info.id
        join exam_name on exam_schedule.exam_name_id=exam_name.id
        where 1=1${condition}
        order by exam_schedule.id;`;
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
    app.get('/api/exam-wise-marks',(req,res)=>{
        var sql = `SELECT sum(marks_obtained) as total_marks,exam_code,exam_info_id FROM exam_marks left join exam_name on exam_name.id = exam_marks.exam_info_id where student_id = ${req.query.student_id} and exam_marks.subject_id=${req.query.subject_id} group by exam_info_id`
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    })
    app.get('/api/total-school-day',(req,res)=>{
        var sql = `SELECT DISTINCT date FROM attendance left join routine on attendance.routine_id = routine.id where subject_id =  ${req.query.subject_id}`
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    })
    app.get('/api/student-present',(req,res)=>{
        var sql = `SELECT count(*) as total FROM attendance left join student_present_status on student_present_status.id = attendance.student_present_status_id where YEAR(date) = ${new Date().getFullYear()} and student_id = ${req.query.student_id} and attendance=1  group by date`
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result[0]);
            }
        );
    })
    app.get("/api/mark-entry-list", authenticateToken, (req, res) => {
        let condition = req.query.teacher_id !== '' && req.query.teacher_id !== undefined?` and exam_marks.teacher_id="${req.query.teacher_id}"`:``
    condition += req.query.exam_type !== '' && req.query.exam_type !== undefined?` and exam_marks.exam_info_id="${req.query.exam_type}"`: ``
    condition += req.query.student_code !== '' && req.query.student_code !== undefined?` and student_code="${req.query.student_code}"`: ``
    condition += req.query.school_id !== '' && req.query.school_id !== undefined?` and school_info_id="${req.query.school_id}"`: ``
        
        var sql = `select full_name, exam_marks.*,student_code,class_name, subject_name,section_default_name,exam_name from exam_marks left join student_info on student_info.id = exam_marks.student_id left join exam_name on exam_name.id = exam_marks.exam_info_id left join subject on subject.id = exam_marks.subject_id where 1=1${condition}`;
        console.log(sql);
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });
    app.get("/api/extra-mark-entry-list", authenticateToken, (req, res) => {
        let condition = req.query.teacher_id !== '' && req.query.teacher_id !== undefined?` and extra_curriculum_marks.teacher_id="${req.query.teacher_id}"`:``
    condition += req.query.exam_type !== '' && req.query.exam_type !== undefined?` and extra_curriculum_marks.activities_id="${req.query.exam_type}"`: ``
    condition += req.query.student_code !== '' && req.query.student_code !== undefined?` and student_code="${req.query.student_code}"`: ``
    condition += req.query.school_id !== '' && req.query.school_id !== undefined?` and school_info_id="${req.query.school_id}"`: ``
        
        var sql = `select full_name, extra_curriculum_marks.*,student_code,class_name, subject_name,section_default_name,exam_name from extra_curriculum_marks left join student_info on student_info.id = extra_curriculum_marks.student_id left join exam_name on exam_name.id = extra_curriculum_marks.activities_id left join subject on subject.id = extra_curriculum_marks.subject_id where 1=1${condition}`;
        console.log(sql);
        con.query(
            sql,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });
    app.get("/api/exam_info_check", authenticateToken, (req, res) => {
        var sql = "select * from exam_name";
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
            sql = `INSERT INTO exam_schedule (class_id, section_id, subject_id, session_id,exam_name_id,converted_marks,school_info_id,full_marks,teacher_id,exam_date) VALUES ("${class_id}", "${section_id}", "${subject_id}", "${session_id}", "${exam_name_id}","${converted_marks}","${school_info}","${full_marks}","${teacher}","${exam_date}")`;
        } else {
            sql=   `update exam_schedule set class_id = "${class_id}",section_id = "${section_id}",subject_id = "${subject_id}",session_id = "${session_id}",exam_name_id = "${exam_name_id}",converted_marks = "${converted_marks}",school_info_id = "${school_info}",full_marks = "${full_marks}",teacher_id = "${teacher}",exam_date = "${exam_date}" where id = "${id}"`
        }

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.delete("/api/exam/delete", authenticateToken, (req, res) => {
        var id = req.query.id;
        var sql = `delete from exam_schedule where id ="${id}"`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });

    app.post("/api/exam_type", authenticateToken, (req, res) => {
        var type = req.body.type
        var id = req.body.id
        if(id){
           let sql=   `update exam_name set exam_name = "${type}" where id = "${id}"`
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.json({ status: "success" });
            });
        }
    })
};


