import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import evaluation from "../../../../images/icons/evaluation.png";
import axios from "axios";
import profile from "../../../../images/profile/profile.png";
import TeacherHeader from "../../TeacherHeader/TeacherHeader";
const MarkentryPage = () => {
    let navigate = useNavigate();
    const [teacher, setTeacher] = useState({});
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [access_token, setAccess_token] = useState(
        localStorage.getItem("access_token")
    );
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${user_code}`,
                {
                    headers: { authorization: "bearer " + access_token },
                }
            )
            .then((response) => {
                setTeacher(response.data);
                console.log(response.data);
            });
    }, [user_code, access_token]);

    return (
        <div>
            
    <TeacherHeader/>


            <div className='d-flex mx-1'>
                <a style={{ textDecoration: "none" }} className="col-sm-6 my-4 col1 mx-1"
                    onClick={() => {
                        navigate("/teacherevaluation");
                    }}>
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
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
                                    <h4 className="card-title">Mark Entry</h4>

                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: "none" }} className="col-sm-6 my-4 col1 "
                    onClick={() => {
                        navigate("/teachermark");
                    }}>
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
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
                                    <h4 className="card-title">Check Mark Sheet</h4>

                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default MarkentryPage;