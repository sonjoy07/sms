import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import profile from "../../images/profile/profile.png";
const StudentHeader = () => {
    const [student, setStudent] = useState([]);
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
    let Navigate = useNavigate();
    const logOut = () => {
        localStorage.setItem("user_code", "");
        localStorage.setItem("user_type", "");
        Navigate('/login')
    }
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
                        <button style={{ padding: '0px' }} className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img style={{ width: "50px", height: "50px" }} src={profile} alt="profile" />
                        </button>
                        <ul className="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
                            <li onClick={logOut} ><a
                                className="dropdown-item" href="#">Log out</a></li>
                            <li><a onClick={() => {
                                Navigate('/studentprofile')
                            }} className="dropdown-item" href="#">Profile</a></li>
                            <li><a onClick={(e) => {
                                e.preventDefault()
                                Navigate('/student-admin')
                            }} className="dropdown-item" href="">Home</a></li>

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
        </div>
    );
};

export default StudentHeader;