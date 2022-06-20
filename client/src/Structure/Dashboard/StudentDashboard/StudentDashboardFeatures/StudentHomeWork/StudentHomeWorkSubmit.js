import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import moment from "moment";

const StudentHomeWorkSubmit = (props) => {
  let navigate = useNavigate();
  /*
  const [user_code, setUser_code] = useState(localStorage.getItem('user_code'))
  const [user_type, setUser_type] = useState(localStorage.getItem('user_type'))
  const [homeworkid, setHomeworkid] = useState(localStorage.getItem('homeworkid'))
  */
  const [student_id, setStudent_id] = useState(
    localStorage.getItem("user_code")
  );
  const [homework_id, setHomework_id] = useState(
    localStorage.getItem("homeworkid")
  );
  const [submission_time, setSubmission_time] = useState(moment().format());

  const [attachment_link, setAttachment_link] = useState("");

  const [hw, setHw] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/homework/student/id?homework_id=${homework_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setHw(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/homework/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        student_id: student_id,
        homework_id: homework_id,
        submission_time: submission_time,
        attachment_link: attachment_link,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("ok");
        navigate("/studenthomework");
      });
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="-md-12">
          <div className="">
            <div className="">
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
                    {hw.topic}
                  </h3>
                  <h5
                    style={{
                      color: "LightSeaGreen",
                      fontSize: "18px",
                      fontWeight: "400",
                    }}
                    class="card-title pt-2"
                  >
                    {hw.subject_name}
                  </h5>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="mt-2">
                <div
                  className=""
                  style={{ background: "#EFEFEF", height: "", padding: "0" }}
                >
                  <div className="row">
                    <div className="col-12 text-center">
                      <div className="row" style={{ background: "#fff" }}>
                        <div className="col-12">
                          <div>
                            <p
                              style={{ textAlign: "left", color: "black" }}
                              className="py-3"
                            >
                              <a href={hw.attachment_link}>Attachment</a>
                            </p>
                          </div>
                          <div style={{ display: "flex", alignItem: "center" }}>
                            <i
                              style={{ color: "black" }}
                              class="fa-solid fa-person pt-1"
                            ></i>
                            <p
                              className="px-3"
                              style={{ textAlign: "left", color: "black" }}
                            >
                              {" "}
                              {hw.teacher_name}
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
                              {moment(hw.due_date).format("YYYY-MM-DD")}{" "}
                            </p>
                            <p
                              className=""
                              style={{ textAlign: "left", color: "black" }}
                            ></p>
                          </div>
                          <div>
                            <p
                              className="pt-4"
                              style={{
                                textAlign: "left",
                                color: "black",
                                fontSize: "24px",
                                fontWeight: "500",
                              }}
                            >
                              {hw.details}
                            </p>
                          </div>
                          <div
                            style={{ border: "1px solid red" }}
                            className="mt-5"
                          >
                            <div class="form-group p-5">
                              <label
                                style={{ fontSize: "20px", fontWeight: "700" }}
                                className="pb-3"
                                for="exampleInputEmail1"
                              >
                                Assignment Attachment :{" "}
                              </label>
                              <input
                                style={{
                                  border: "1px solid blue",
                                  padding: "5px 10px",
                                }}
                                type="file"
                                class="form-control"
                                value={attachment_link}
                                onChange={(e) =>
                                  setAttachment_link(e.target.value)
                                }
                                id="avatar"
                                name="avatar"
                                required
                              />
                            </div>
                          </div>
                          {/* <input
                            style={{ border: "1px solid blue" }}
                            type="text"
                            class="form-control"
                            value={attachment_link}
                            onChange={(e) => setAttachment_link(e.target.value)}
                          /> */}
                          <div className="row">
                            <button
                              className="btn btn-primary"
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
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
};

export default StudentHomeWorkSubmit;
