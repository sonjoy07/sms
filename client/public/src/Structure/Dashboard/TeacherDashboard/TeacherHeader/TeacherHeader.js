import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from "../../../images/profile/profile.png";
const TeacherHeader = () => {
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
            <div style={{ height: "80px" }} className="bg-primary">
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
                            <li><a class="dropdown-item" href="/teacherprofile">profile</a></li>

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
        </div>
    );
};

export default TeacherHeader;
