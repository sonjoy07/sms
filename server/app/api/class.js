module.exports = (app) => {
  const con = require("../models/db");
  const authenticateToken = require("../middleware/middleware");
  app.get("/api/class", authenticateToken, (req, res) => {
    con.query(
      `SELECT id, class_name,class_code FROM class where school_type_id="${req.query.school_type_id}"`,
      function (err, result, fields) {
        if (err) throw err;       
        res.send(result);
      }
    );
  });
  app.get("/api/class/all", authenticateToken, (req, res) => {
    con.query("SELECT * FROM class order by class.id desc", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/class/info_type", (req, res) => {
    con.query(`SELECT * FROM class where school_type_id="${req.query.school_type_id}" and school_info_id="${req.query.school_info_id}"`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get("/api/class/all_info", (req, res) => {
    con.query(`SELECT class.*,type_name,shift_name FROM class left join shift on shift.id = class.shift_id left join school_type on school_type.id = class.school_type_id order by class.id desc`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  app.delete("/api/class/delete",(req,res)=>{
    con.query(`delete from class where id = ${req.query.id}`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  })
};
