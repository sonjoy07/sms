import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profile from "../../../../images/profile/profile.png";
import TeacherHeader from "../../TeacherHeader/TeacherHeader";

const Routine = (props) => {
  const navigate = useNavigate();

  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [searchDay, setSearchDay] = useState('')
  const [routine, setRoutine] = useState([]);
  const [days, setDays] = useState([]);
  const [teacher, setTeacher] = useState({});

  const checkLoggedIn = () => {
    if (user_type != 2) {
      navigate("/login");
    }
  };
  //Get Routine Data
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/routine/teacher?teacher_id=${props.user[0]}`
      )
      .then((response) => {
        setRoutine(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${props.user[0]}`
      )
      .then((response) => {
        setTeacher(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/day`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setDays(response.data);
      });
  }, []);



  useEffect(() => {
    checkLoggedIn();
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setTeacher(response.data);

        axios
          .get(
            `${process.env.REACT_APP_NODE_API}/api/routine/teacher?teacher_id=${teacher.id}`,
            {
              headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            setRoutine(response.data);
          });
      });
  }, []);
  const handleSearch = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/routine/teacher?teacher_id=${teacher.id}&&day=${searchDay}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setRoutine(response.data);
      });
  }


  const handlelist = () => {
    document.getElementById("list").classList.toggle("active");
  };

  return (
    <>
    <TeacherHeader/>
      <div className="content container pt-3">
        <div className="row mt-2">
          <div className="col-sm-4">
            <select onChange={(e) => setSearchDay(e.target.value)} className="form-control">
              <option value={""}>Select Days</option>
              {days.map(res => {
                return <option value={res.id}>{res.day}</option>
              })}
            </select>
          </div>
          <div className="col-sm-4">
            <button type="button" onClick={handleSearch} className="btn btn-primary mt-1">Search</button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card card-dark collapsed-card">
              <section>
                <div className="">
                  <div className="card card-primary">
                    <div
                      className="card-body"
                      style={{
                        background: "#EFEFEF",
                        height: "",
                        padding: "0",
                      }}
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
                                <div className="col-12">
                                  <div style={{ display: "flex" }}>
                                    <h5
                                      className=""
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
                                    >
                                      {routineJSON.day}
                                    </h5>
                                    <h5
                                      className="mx-2 text-warning"
                                      style={{ textAlign: "left" }}
                                    >
                                      {" "}
                                    </h5>
                                    <h5
                                      className=""
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
                                    ></h5>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <h6
                                      className=""
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
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
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
                                    >
                                      {routineJSON.start_time} -{" "}
                                      {routineJSON.end_time}
                                    </h6>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <h6
                                      className=""
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
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
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
                                    >
                                      Class : {routineJSON.class_name}
                                    </h6>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <h6
                                      className=""
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
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
                                      style={{
                                        textAlign: "left",
                                        color: "#00CC99",
                                      }}
                                    >
                                      Room : {routineJSON.room}
                                    </h6>
                                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Routine;
