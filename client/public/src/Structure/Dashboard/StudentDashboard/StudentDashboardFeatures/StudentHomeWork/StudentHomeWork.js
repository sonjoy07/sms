import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import profile from '../../../../images/profile/profile.png';

const StudentHomeWork = (props) => {
  let navigate = useNavigate();
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [student, setStudent] = useState([]);
  const [homework, setHomework] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setStudent(response.data);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data[0].section_id);
        axios
          .get(
            `${process.env.REACT_APP_NODE_API}/api/homework/student?section_id=${response.data[0].section_id}`,
            {
              headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            setHomework(response.data);
          });
      });
  }, []);

  return (
    <div>
      <div style={{ height: '80px', backgroundColor: '' }} className='bg-info'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='container'>
          {/* <div>
     <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
   </div> */}

          <div className="dropdown">
            <button style={{ padding: '0px' }} class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <img style={{ width: "50px", height: "50px" }} src={profile} alt="profile" />
            </button>
            <ul class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
              <li><a onClick={() => {
                localStorage.setItem("user_code", "");
                localStorage.setItem("user_type", "");
                navigate("/login");
              }} class="dropdown-item" href="#">Log out</a></li>
              <li><a class="dropdown-item" href="#">profile</a></li>

            </ul>
          </div>
          {student.map((studentJSON) => {
            return (
              <div>
                <h3
                  className=""
                  style={{
                    color: "white",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Name: {studentJSON.full_name}
                </h3>
                <h4
                  className=""
                  style={{
                    color: "white",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Id : {studentJSON.student_code}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container">
        {homework.map((homeworkJSON) => {
          return (
            <div className="row mt-4">
              <div className=" col-md-12">
                <div className="card card-dark collapsed-card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between px-4">
                      <div>
                        <h3
                          style={{
                            color: "LightSeaGreen",
                            fontSize: "25px",
                            fontWeight: "700",
                          }}
                          class="card-title pt-2"
                        >
                          {homeworkJSON.topic}
                        </h3>
                        <h5
                          style={{
                            color: "LightSeaGreen",
                            fontSize: "18px",
                            fontWeight: "400",
                          }}
                          class="card-title pt-2"
                        >
                          {homeworkJSON.subject_name}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="mt-2">
                      <div
                        className=""
                        style={{
                          background: "#EFEFEF",
                          height: "",
                          padding: "0",
                        }}
                      >
                        <div className="row">
                          <div className="col-12 text-center">
                            <div className="row" style={{ background: "#fff" }}>
                              <a
                                onClick={() => {
                                  localStorage.setItem(
                                    "homeworkid",
                                    homeworkJSON.id
                                  );
                                  navigate("/studenthomeworksubmit");
                                }}
                                style={{ textDecoration: "none" }}
                                className="col-12"
                              >
                                <div>
                                  <h5
                                    style={{ textAlign: "left", color: "black" }}
                                    className="py-3"
                                  >
                                    {homeworkJSON.details}
                                  </h5>
                                </div>
                                <div
                                  style={{ display: "flex", alignItem: "center" }}
                                >
                                  <i
                                    style={{ color: "black" }}
                                    class="fa-solid fa-person pt-1"
                                  ></i>
                                  <p
                                    className="px-3"
                                    style={{ textAlign: "left", color: "black" }}
                                  >
                                    {" "}
                                    {homeworkJSON.teacher_name}
                                  </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                  <i
                                    style={{ color: "black" }}
                                    class="fa-solid fa-clock  pt-1"
                                  ></i>
                                  <p
                                    className="mx-2"
                                    style={{ textAlign: "left", color: "red" }}
                                  >
                                    {" "}
                                    Last Date:{" "}
                                    {moment(homeworkJSON.due_date).format(
                                      "YYYY-MM-DD"
                                    )}{" "}
                                  </p>
                                  <p
                                    className=""
                                    style={{ textAlign: "left", color: "black" }}
                                  ></p>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentHomeWork;
