import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from "../../../images/profile/profile.png";
const SchoolHeader = () => {
    const navigate = useNavigate()
    const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
    const [user_code, setUser_code] = useState(localStorage.getItem("admin_code"));
    const [first_name, setFirst_code] = useState(localStorage.getItem("first_name"));
    const [school_id, setschool_code] = useState(localStorage.getItem("school_id"));
    const [last_name, setLast_code] = useState(localStorage.getItem("last_name"));
    const [access_token, setAccess_token] = useState(
        localStorage.getItem("access_token"));

    const checkLoggedIn = () => {
        if (localStorage.getItem("user_type") != 4) {
            navigate("/login");
        }
    };
    useEffect(() => {
        checkLoggedIn();
    }, []);
    return (
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
                        Name : {first_name} ({last_name})
                    </h3>
                    <h4
                        className=""
                        style={{
                            color: "white",
                            fontSize: "25px",
                            fontWeight: "bold",
                        }}
                    >
                        Admin Id: {user_code}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default SchoolHeader;