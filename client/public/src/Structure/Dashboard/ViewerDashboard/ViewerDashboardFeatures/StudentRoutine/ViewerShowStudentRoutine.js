import React, { useState, useEffect } from "react";
import moment from "moment";

import axios from "axios";
import ViewerHeader from "../../ViewerHeader";

const ViewerShowStudentRoutine = () => {
  const [school_info_id, setSchool_info_id] = useState(
    localStorage.getItem("school_id")
  );
  const [today, setToday] = useState(moment().format("dddd"));
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/routine/school/filter?school_info_id=${localStorage.getItem("school_id")}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setRoutine(response.data);
      });

  }, [])



  return (
    <div>
      <ViewerHeader />
      <section className="container">

        <div className="mt-5">
          <div className="card card-primary mt-2">
            <div
              className="card-body"
              style={{ background: "#EFEFEF", height: "", padding: "0" }}
            >
              <div className="row">
                <div className="col-12 text-center">
                  {routine.map((routineJSON) => {
                    return (
                      <div
                        className="row"
                        style={{
                          padding: "20px",
                          margin: "10px",
                          background: "#fff",
                          borderRadius: "5px",
                        }}
                      >
                        {/* <div className='col-2'>
         <img style={{ width: "50px" }} src={profile} alt=""/>
      </div> */}
                        <div className="col-12">
                          <div style={{ display: "flex" }}>
                            <h5
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              {routineJSON.day}
                            </h5>
                          </div>
                          <div style={{ display: "flex" }}>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              {routineJSON.period_code} Period
                            </h6>
                            <h5
                              className="mx-2 text-warning"
                              style={{ textAlign: "left" }}
                            >
                              {" "}
                              ||{" "}
                            </h5>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              {routineJSON.start_time} - {routineJSON.end_time}
                            </h6>
                          </div>
                          <div style={{ display: "flex" }}>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Subject : {routineJSON.subject_name}
                            </h6>
                            <h5
                              className="mx-2 text-warning"
                              style={{ textAlign: "left" }}
                            >
                              {" "}
                              ||{" "}
                            </h5>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Class : {routineJSON.class_name}
                            </h6>
                          </div>
                          <div style={{ display: "flex" }}>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Section : {routineJSON.section_default_name}
                            </h6>
                            <h5
                              className="mx-2 text-warning"
                              style={{ textAlign: "left" }}
                            >
                              {" "}
                              ||{" "}
                            </h5>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Room : {routineJSON.room}
                            </h6>
                          </div>
                          <h6
                            className=""
                            style={{ textAlign: "left", color: "#00CC99" }}
                          >
                            Teacher Initial : {routineJSON.initial}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewerShowStudentRoutine;
