module.exports = (app) => {

    const con = require('../models/db')
    const authenticateToken = require("../middleware/middleware");
    app.post("/api/organization", authenticateToken, (req, res) => {
        var type_name = req.body.type_name;
        var id = req.body.id;

        var sql
        if (id) {
            sql = `Update school_type set type_name= "${type_name}" where id = ${id}`
        } else {
            sql = `INSERT INTO school_type (type_name) VALUES ("${type_name}")`;
        }

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });
    app.post("/api/create_smsLimit", authenticateToken, (req, res) => {
        var school_type_id = req.body.school_type_id;
        var period_code = req.body.period_code;
        var id = req.body.id;

        var sql
        if (id) {
            sql = `Update sms_count set school_info_id= "${school_type_id}",sms_limit= "${period_code}" where id = ${id}`
        } else {
            sql = `INSERT INTO sms_count (school_info_id,sms_limit) VALUES ("${school_type_id}","${period_code}")`;
        }

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });

    app.post("/api/add_school", (req, res) => {
        var type_id = req.body.type_id;
        var school_code = req.body.school_code;
        var eiin = req.body.eiin;
        var administrator_id = req.body.administrator_id;
        var school_name = req.body.school_name;
        var short_name = req.body.short_name;
        var address_division = req.body.address_division;
        var address_district = req.body.address_district;
        var address_upazila = req.body.address_upazila;
        var address_village = req.body.address_village;
        var school_phone = req.body.school_phone;
        var school_email = req.body.school_email;
        var school_head_name = req.body.school_head_name;
        var school_head_phone = req.body.school_head_phone;
        var school_head_email = req.body.school_head_email;
        var contact_person_name = req.body.contact_person_name;
        var contact_person_phone = req.body.contact_person_phone;
        var contact_person_email = req.body.contact_person_email;
        var status = req.body.status;
        var id = req.body.id;


        var sql
        if (id) {
            sql = `update school_info set type_id="${type_id}",school_code="${school_code}",eiin="${eiin}",administrator_id="${administrator_id}",school_name="${school_name}",short_name="${short_name}",address_division="${address_division}",address_district="${address_district}",address_upazila="${address_upazila}",	address_village="${address_village}",school_phone="${school_phone}",school_email="${school_email}",school_head_name="${school_head_name}",school_head_phone="${school_head_phone}",school_head_email="${school_head_email}",contact_person_name="${contact_person_name}",contact_person_phone="${contact_person_phone}",contact_person_email="${contact_person_email}",status="${status}" where id =${id}`;
        } else {
            sql = `INSERT INTO school_info (type_id,school_code,eiin,administrator_id,school_name,short_name,address_division,address_district,address_upazila,	address_village,school_phone,school_email,school_head_name,school_head_phone,school_head_email,contact_person_name,contact_person_phone,contact_person_email,status) VALUES ("${type_id}","${school_code}","${eiin}","${administrator_id}","${school_name}","${short_name}","${address_division}","${address_district}","${address_upazila}","${address_village}","${school_phone}","${school_email}","${school_head_name}","${school_head_phone}","${school_head_email}","${contact_person_name}","${contact_person_phone}","${contact_person_email}","${status}")`;
        }

        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json({ status: "success" });
        });
    });

    app.delete("/api/school_type/delete", (req, res) => {
        con.query(`delete from school_type where id = ${req.query.id}`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        })
    })
    app.delete("/api/subject/delete", (req, res) => {
        con.query(`delete from subject where id = ${req.query.id}`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        })
    })

    app.delete("/api/period/delete", (req, res) => {
        con.query(`delete from period where id = ${req.query.id}`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        })
    })
    app.delete("/api/sms_count/delete", (req, res) => {
        con.query(`delete from sms_count where id = ${req.query.id}`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        })
    })
    app.delete("/api/exam_type/delete", (req, res) => {
        con.query(`delete from exam_name where id = ${req.query.id}`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        })
    })
    app.delete("/api/school/delete", (req, res) => {
        con.query(`delete from school_info where id = ${req.query.id}`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        })
    })
    app.get("/api/district", authenticateToken, (req, res) => {
        con.query(`SELECT * FROM districts where division_id = "${req.query.division_id}"`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get("/api/upazila", authenticateToken, (req, res) => {
        con.query(`SELECT * FROM upazilas where district_id = "${req.query.district_id}"`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });

    app.get("/api/school_info_type_wise", authenticateToken, (req, res) => {
        var sql = `select id,school_code,school_name from school_info where type_id=${req.query.type_id}`;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        })
    })

}