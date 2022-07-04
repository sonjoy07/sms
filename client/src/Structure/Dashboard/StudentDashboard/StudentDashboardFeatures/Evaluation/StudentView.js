import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import evaluation from "../../../../images/icons/evaluation.png";
import profile from '../../../../images/profile/profile.png';
import StudentHeader from '../../StudentHeader';
import EvalutionSchedule from './../../../TeacherDashboard/TeacherDasboardFeatures/MarkEntry/EvalutionSchedule';
const StudentView = () => {
    let navigate = useNavigate();
    const [student, setStudent] = useState([]);
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const checkLoggedIn = () => {
        if (user_type != 1) {
            Navigate('/login')
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
        <div>
            <StudentHeader/>
            <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1"
                onClick={() => {
                    navigate("/marksheet");
                }}>
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
                                <h4 class="card-title">Check Mark Sheet</h4>

                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1"
                onClick={() => {
                    navigate("/gradesheet");
                }}>
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
                                <h4 class="card-title">Check Grade Sheet</h4>

                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1"
                onClick={() => {
                    navigate("/evalutionScheduleStudent");
                }}>
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
                                <h4 class="card-title">Evaluation Schedule</h4>

                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default StudentView;