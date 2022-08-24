

const util = require('util');
module.exports = (app) => {
    const con = require("../models/db");
    const authenticateToken = require("../middleware/middleware");
    const query = util.promisify(con.query).bind(con);
    app.get("/api/mark", authenticateToken, (req, res) => {
        var sql = `SELECT position,exam_marks.student_id, (SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 11 group by exam_info_id) as ct1,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 12 group by exam_info_id) as ct2,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 13 group by exam_info_id) as ct3,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 14 group by exam_info_id) as ct4,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 15 group by exam_info_id) as half,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 16 group by exam_info_id) as full, count(*),subject_name,student_code,(SELECT count(DISTINCT date) FROM attendance left join routine on attendance.routine_id = routine.id where subject_id =exam_marks.subject_id) as total_school_day,(SELECT count(*) as total FROM attendance left join routine on attendance.routine_id = routine.id left join student_present_status on student_present_status.id = attendance.student_present_status_id where YEAR(date) = ${new Date().getFullYear()} and student_id = exam_marks.student_id and attendance=1 and subject_id =exam_marks.subject_id) as total_present,(SELECT AVG(marks_obtained) FROM teacher_extra_curriculum_marks WHERE student_id = exam_marks.student_id group by student_id) extra_mark FROM exam_marks left join subject on subject.id = exam_marks.subject_id LEFT JOIN student on student.id = exam_marks.student_id  where student_id=${req.query.student_code} and session_id = "${req.query.session_id}" and student.school_info_id="${req.query.school_id}" group by subject_id`;

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

    app.get('/api/student-rank/:id', (req, res) => {
        let sql = `select * from school_info where id= ${req.params.id}`
        con.query(sql, (err, result, fields) => {
            if (err) throw err;
            let sql1 = `select * from class where school_type_id = ${result[0].type_id}`
            con.query(sql1, (err, result, fields) => {
                if (err) throw err;
                const classes = result
                let sql2 = `select * from section`
                con.query(sql2, (err, result, fields) => {
                    if (err) throw err;
                    const sections = result
                    classes.map(resc => {
                        sections.map(section => {
                            let sql3 = `select student_present_status.*,student_code from student_present_status left join student on student.id = student_present_status.student_id where student_present_status.section_id = ${section.id} and student_present_status.school_info_id = ${req.params.id} and class_id= ${resc.id}`

                            con.query(sql3, async (err, result, fields) => {
                                if (err) throw err;
                                const students = result
                                // console.log('inside',students);
                                let totalStudentResult = []
                                const finalResult = await Promise.all(students.map(async (student) => {
                                    let sql4 = `SELECT exam_marks.student_id, (SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 11 group by exam_info_id) as ct1,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 12 group by exam_info_id) as ct2,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 13 group by exam_info_id) as ct3,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 14 group by exam_info_id) as ct4,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 15 group by exam_info_id) as half,(SELECT sum(marks_obtained) as total_marks FROM exam_marks as em left join exam_name on exam_name.id = em.exam_info_id where student_id = exam_marks.student_id and em.subject_id=exam_marks.subject_id and exam_code = 16 group by exam_info_id) as full, count(*),subject_name,student_code,(SELECT count(DISTINCT date) FROM attendance left join routine on attendance.routine_id = routine.id where subject_id =exam_marks.subject_id) as total_school_day,(SELECT count(*) as total FROM attendance left join student_present_status on student_present_status.id = attendance.student_present_status_id where YEAR(date) = ${new Date().getFullYear()} and student_id = exam_marks.student_id and attendance=1  group by date) as total_present,(SELECT AVG(marks_obtained) FROM extra_curriculum_marks WHERE student_id = exam_marks.student_id group by student_id) FROM exam_marks left join subject on subject.id = exam_marks.subject_id LEFT JOIN student on student.id = exam_marks.student_id  where student_id=${student.id} and session_id = 1 group by subject_id`
                                    let studentResult = await query(sql4)
                                    const resFinal = studentResult[0]
                                    let total = 0
                                    if (resFinal !== undefined) {
                                        let ctTotal = (resFinal.ct1 + resFinal.ct2 + resFinal.ct3 + resFinal.ct4) / 4
                                        let half = resFinal.half / 2
                                        let final = resFinal.full / 2
                                        let attendance = resFinal.total_school_day > 0 ? (resFinal.total_present / resFinal.total_school_day) * 5 : 0
                                        let activities = resFinal.extra_mark > 0 ? resFinal.extra_mark : 0

                                        total = ctTotal + half + final + attendance + activities
                                    }
                                    totalStudentResult.push({ total: total, studentCode: student.student_code, student_id: student.id, class_id: resc.id, section_id: section.id })
                                    
                                    return Promise.resolve(totalStudentResult)

                                }))
                                if(finalResult[0] != undefined){
                                    // console.log('inside', finalResult[0].sort((a,b) =>  b.total-a.total ));
                                    const rank = finalResult[0].sort((a,b) =>  b.total-a.total )
                                    rank !== null && rank.map(async(res,index)=>{
                                        let sql5 = `update student set position = "${index+1}" where id = "${res.student_id}"`
                                        // console.log(sql5);
                                        let finalre = await query(sql5);
                                        // con.query(sql5, (err, result, fields) => {
                                            console.log(finalre);

                                        //     // if (err) throw err;
                                        //     console.log(err);
                                        //     // const students = result
                                        // })
                                        // console.log(finalre);
                                    })
                                    // res.setHeader('Content-Type', 'application/json');
                                    // res.send('done')
                                }
                                // console.log('student mark',resultData[0] !== undefined&& resultData[0].sort((a,b) =>  b.total-a.total));
                            })
                        })
                    })
                })
            })

        })
        res.send('done')
    })

    app.get('/api/subjectsCurriculum',(req,res)=>{
        con.query(`select * from curriculam_child left join subject on subject.id = curriculam_child.subject_id where activity_id = ${req.query.exam_id} and school_info_id =${req.query.school_id} group by subject_id`,(err,result,fields)=>{
            if (err) throw err;
            res.json(result);
        })
    })

} 