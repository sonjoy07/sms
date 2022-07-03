import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import axios from "axios";

import evaluation from "../../../../images/icons/evaluation.png";
import notices from "../../../../images/icons/notices.png";
import StudentHeader from "../../StudentHeader";

const StudentNotices = (props) => {
    let navigate = useNavigate();

    const [student, setStudent] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
    const checkLoggedIn = () => {
        if (user_type != 1) {
            navigate('/login')
        }
    }
    useEffect(() => {
        checkLoggedIn()
    }, [])
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

    return (
        <>
            <StudentHeader />

            <section class="container">
                <div class="row mx-auto mt-5">
                    <a
                        onClick={() => {
                            navigate("/student-notice-list?type=admin");
                        }} style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    className=""
                                >
                                    <div className="px-3">
                                        <img
                                            style={{ width: "64px", height: "64px" }}
                                            src={notices}
                                            alt=""
                                        />
                                    </div>
                                    <div className="px-3">
                                        <h4 class="card-title">School Note's</h4>
                                        {/* <p class="card-text">Add Note'ss/Events</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a onClick={() => {
                        navigate("/student-notice-list?type=teacher");
                    }} style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    className=""
                                >
                                    <div className="px-3">
                                        <img
                                            style={{ width: "64px", height: "64px" }}
                                            src={evaluation}
                                            alt=""
                                        />
                                    </div>
                                    <div className="px-3">
                                        <h4 class="card-title">Teacher's Note</h4>
                                        {/* <p class="card-text">Make Students Evaluation</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                   
                </div>

            </section>
        </>
    );
};

export default StudentNotices;
