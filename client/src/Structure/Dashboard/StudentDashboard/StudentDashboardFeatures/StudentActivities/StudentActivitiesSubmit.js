import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentHeader from "../../StudentHeader";

const StudentActivitiesSubmit = (props) => {
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
  const [preview, setPreview] = useState()

  const [hw, setHw] = useState({});

  const [submissionList, setSubmissionList] = useState([])

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/student/id?homework_id=${homework_id}`,
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
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/teacher/submitlist?home_work_id=${homework_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSubmissionList(response.data.filter(res=>res.student_code == localStorage.getItem('u_id')));
        
      });
  }, []);

  const fileUpload = (e) => {
    setAttachment_link(e.target.files[0])
  }

  useEffect(() => {
    if (!attachment_link) {
      setPreview(undefined)
      return
    }

    const objectUrl = attachment_link.name
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [attachment_link])


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", attachment_link);
    formData.append("fileName", attachment_link.name);
    formData.append("student_id", student_id);
    formData.append("homework_id", homework_id);
    formData.append("submission_time", submission_time);
    fetch(`${process.env.REACT_APP_NODE_API}/api/activities/submit`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        toast("Extra Curriculum submitted successfully");
        console.log("ok",json);
        // navigate("/studenthomework");
      });
  };
  console.log(submissionList);
  return (
    <>
    <StudentHeader/>
    <div className="container">
      <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Student Extra Curriculum : </h2>
    <ToastContainer />
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
                              <Link target="_blank" to={`../uploads/${hw.attachment_link}`} download>{hw.attachment_link}</Link>
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
                              {preview &&
                                <p>{preview}
                                  <i
                                    style={{ color: "black", marginLeft: "5px", cursor: "pointer" }}
                                    class="fa-solid fa-times  pt-1"
                                    onClick={() => { setPreview(undefined); setAttachment_link("") }}
                                  ></i></p>}
                              <input
                                style={{
                                  border: "1px solid blue",
                                  padding: "5px 10px",
                                }}
                                type="file"
                                class="form-control"
                                onChange={fileUpload}
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
                      <div className="py-3 row">
                      
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Student Code</th>
                              <th scope="col">Submission Time</th>
                              <th scope="col">Status</th>
                              <th scope="col">Attachment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {submissionList.map(res => {
                              return (<tr>
                                <td>{res.full_name}</td>
                                <td>{res.student_code}</td>
                                <td>{moment(res.submission_time).format("Do MMM  YYYY")}</td>
                                <td>Submit</td>
                                <td style={{ color: 'blue' }}><Link style={{ color: "blue" }} target="_blank" to={`/uploads/${res.attachment_link}`} download>{res.attachment_link}</Link></td>
                              </tr>)
                            })}
                          </tbody>
                        </table>
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
    </>
  );
};

export default StudentActivitiesSubmit;
