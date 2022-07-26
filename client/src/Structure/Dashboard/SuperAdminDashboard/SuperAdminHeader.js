import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from "../../images/profile/profile.png";
import { Link } from 'react-router-dom';
const SuperAdminHeader = () => {
    const navigate = useNavigate()
   
    const checkLoggedIn = () => {
        if (localStorage.getItem("user_type") != 5) {
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
                    <button style={{ padding: '0px' }} className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img style={{ width: "50px", height: "50px" }} src={profile} alt="profile" />
                    </button>
                    <ul className="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
                        <li><a onClick={() => {
                            localStorage.setItem("user_code", "");
                            localStorage.setItem("user_type", "");
                            navigate("/login");
                        }} className="dropdown-item">Log out</a></li>
                        <li><Link className="dropdown-item" to="/super-admin-profile">Profile</Link></li>
                        <li><Link className='dropdown-item' to="/super-admin">Home</Link></li>

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
                        Name : Super Admin
                    </h3>
                   
                </div>
            </div>
        </div>
    );
};

export default SuperAdminHeader;