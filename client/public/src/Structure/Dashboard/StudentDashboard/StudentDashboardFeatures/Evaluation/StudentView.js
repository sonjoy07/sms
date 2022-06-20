import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import evaluation from "../../../../images/icons/evaluation.png";
import profile from '../../../../images/profile/profile.png';
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
        </div>
    );
};

export default StudentView;