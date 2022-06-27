module.exports = (app) => {

    const con = require("../models/db");
    const authenticateToken = require("../middleware/middleware");
    app.get("/api/calender", authenticateToken, (req, res) => {
        con.query(
            "SELECT id,school_info_id,date,topics FROM academic_calendar",
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });

    app.get("/api/calender/student", (req, res) => {
        con.query(
            `SELECT id,date,topics FROM academic_calendar where school_info_id="${req.query.school_info_id}"`,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });
    app.get("/api/calender/teacher", authenticateToken, (req, res) => {
        const start_date = req.query.start_date
        const end_date = req.query.end_date
        let condition = start_date !== "null"|"" ? ` and academic_calendar.date BETWEEN "${start_date}" AND "${end_date}"` : ``
        console.log(`SELECT id,date,topics FROM academic_calendar where school_info_id="${req.query.school_info_id}"${condition}`);
        con.query(
            `SELECT id,date,topics FROM academic_calendar where school_info_id="${req.query.school_info_id}"${condition}`,
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    });

    app.post("/api/calender", authenticateToken, (req, res) => {
        var date = req.body.date;
        var topics = req.body.topics;
        var school_info_id = req.body.school_info_id;
        var id = req.body.id;
        var sql
        if (id === '') {
            sql = `INSERT INTO academic_calendar (school_info_id,date,topics) VALUES ("${school_info_id}", "${date}", "${topics}")`;
        } else {
            sql = `update academic_calendar set school_info_id = "${school_info_id}", date="${date}", topics = "${topics}" where id ="${id}"`
        }
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.delete("/api/calender/delete", authenticateToken, (req, res) => {
        var id = req.query.id;
        var sql = `delete from academic_calendar where id ="${id}"`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.post("/api/calender", authenticateToken, (req, res) => {
        var date = req.body.date;
        var topics = req.body.topics;
        var school_info_id = req.body.school_info_id;
        var id = req.body.id;
        var sql
        if (id === '') {
            sql = `INSERT INTO academic_calendar (school_info_id,date,topics) VALUES ("${school_info_id}", "${date}", "${topics}")`;
        } else {
            sql = `update academic_calendar set school_info_id = "${school_info_id}", date="${date}", topics = "${topics}" where id ="${id}"`
        }
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });

}