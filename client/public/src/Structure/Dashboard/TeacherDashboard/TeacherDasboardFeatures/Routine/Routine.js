import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profile from "../../../../images/profile/profile.png";

const Routine = (props) => {
  const navigate = useNavigate();

  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [routine, setRoutine] = useState([]);
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
        console.log(response);

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
  }, [teacher]);


  const handlelist = () => {
    document.getElementById("list").classList.toggle("active");
  };

  return (
    <>
      <div style={{ height: "80px" }} className="bg-info">
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="container"
        >
          <div className="dropdown">
            <button style={{ padding: '0px' }} class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <img style={{ width: "50px", height: "50px" }} src={profile} alt="profile" />
            </button>
            <ul class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
              <li><a onClick={() => {
                localStorage.setItem("user_code", "");
                localStorage.setItem("user_type", "");
                navigate("/login");
              }} class="dropdown-item">Log out</a></li>
              <li><a class="dropdown-item" href="#">profile</a></li>

            </ul>
          </div>

          <div>
            <h3
              className=""
              style={{
                color: "white",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Name: {teacher.full_name}
            </h3>
            <h4
              className=""
              style={{
                color: "white",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Id : {teacher.teacher_code}
            </h4>
          </div>
        </div>
      </div>
      <div className="content container pt-3">
        <div className="row">
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
