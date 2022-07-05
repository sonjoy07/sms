module.exports = (app) => {
    const con = require("../models/db");
    const authenticateToken = require("../middleware/middleware");
    app.get("/api/mark", authenticateToken, (req, res) => {
        var sql = `SELECT student.student_code,school_info.address_division,CONCAT(student.first_name,' ' ,student.middle_name) as name, school_info.school_name, session.session_year,section.section_default_name, class.class_name,student.student_code,exam_grade_sheet.subject_id,
        subject.subject_name,exam_grade_sheet.*,(SELECT sum(marks_obtained) as total_marks FROM exam_marks left join exam_name on exam_name.id = exam_marks.exam_info_id where student_id = exam_grade_sheet.student_id and exam_marks.subject_id=exam_grade_sheet.subject_id and exam_code = 11 group by exam_info_id) as ct1,(SELECT sum(marks_obtained) as total_marks FROM exam_marks left join exam_name on exam_name.id = exam_marks.exam_info_id where student_id = exam_grade_sheet.student_id and exam_marks.subject_id=exam_grade_sheet.subject_id and exam_code = 12 group by exam_info_id) as ct2,(SELECT sum(marks_obtained) as total_marks FROM exam_marks left join exam_name on exam_name.id = exam_marks.exam_info_id where student_id =1 and exam_marks.subject_id=exam_grade_sheet.subject_id and exam_code = 13 group by exam_info_id) as ct3,(SELECT sum(marks_obtained) as total_marks FROM exam_marks left join exam_name on exam_name.id = exam_marks.exam_info_id where student_id =1 and exam_marks.subject_id=exam_grade_sheet.subject_id and exam_code = 14 group by exam_info_id) as ct4,(SELECT sum(marks_obtained) as total_marks FROM exam_marks left join exam_name on exam_name.id = exam_marks.exam_info_id where student_id =1 and exam_marks.subject_id=exam_grade_sheet.subject_id and exam_code = 15 group by exam_info_id) as half,(SELECT sum(marks_obtained) as total_marks FROM exam_marks left join exam_name on exam_name.id = exam_marks.exam_info_id where student_id =1 and exam_marks.subject_id=exam_grade_sheet.subject_id and exam_code = 16 group by exam_info_id) as final,(SELECT count(*) as total FROM attendance left join student_present_status on student_present_status.id = attendance.student_present_status_id where YEAR(date) = 2022 and student_id = exam_grade_sheet.student_id and attendance=1  group by date) as total_present,(SELECT count(DISTINCT date) FROM attendance left join routine on attendance.routine_id = routine.id where subject_id =exam_grade_sheet.subject_id) as total_school_day FROM exam_grade_sheet join session on exam_grade_sheet.session_id=session.id
        join section on exam_grade_sheet.section_id=section.id
        join class on exam_grade_sheet.class_id=class.id
        join subject on exam_grade_sheet.subject_id=subject.id
        join student on exam_grade_sheet.student_id=student.id
        left join school_info on exam_grade_sheet.school_info_id=school_info.id where exam_grade_sheet.student_id='${req.query.student_code}' and session_id="${req.query.session_id}"`;

        console.log(sql);
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get("/api/mark/:id", authenticateToken, (req, res) => {
        var sql = `select exam_grade_sheet.id,student.student_code,school_info.address_division,CONCAT(student.first_name,' ' ,student.middle_name) as name, school_info.school_name, session.session_year,section.section_local_name, class.class_name,student.student_code,subject.subject_code,monthly_class_test_average,half_yearly_exam_sub 
        from exam_grade_sheet where id=?
        join session on exam_grade_sheet.session_id=session.id
        join section on exam_grade_sheet.section_id=section.id
        join class on exam_grade_sheet.class_id=class.id
        join subject on exam_grade_sheet.subject_id=subject.id
        join student on exam_grade_sheet.student_id=student.id
        join school_info on exam_grade_sheet.school_info_id=school_info.id
        `;

        con.query(sql, [req.params.id], (err, result, fields) => {
            if (err) { throw err; }

            res.send(result[0]);

        });
    });


    app.get("/api/grade", authenticateToken, (req, res) => {
        var sql = `select student_mark.id,number_Sum.num1,number_Sum.num2,mcq, (num1+num2) as total, (num1+num2)/2 as net_number, if(num1+num2>=40, "A","B") as grade, (num1+num2)/2*.70 as avg, if(num1+num2>=40, 5.00,4.00) as grade_point
        
        from student_mark 

        join number_Sum on student_mark.Grade=number_Sum.id
       
        order by  student_mark.id;`;

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get("/api/grade/:id", authenticateToken, (req, res) => {
        var sql = `select student_mark.id,number_Sum.num1,number_Sum.num2,mcq, (num1+num2) as total, (num1+num2)/2 as net_number, if(num1+num2>=40, "A","B") as grade, (num1+num2)/2*.70 as avg, if(num1+num2>=40, 5.00,4.00) as grade_point
        
        from student_mark 

        join number_Sum on student_mark.Grade=number_Sum.id
       
        order by  student_mark.id;`;

        con.query(sql, [req.params.id], (err, result, fields) => {
            if (err) throw err;
            res.json(result[0]);
        });
    });

} 