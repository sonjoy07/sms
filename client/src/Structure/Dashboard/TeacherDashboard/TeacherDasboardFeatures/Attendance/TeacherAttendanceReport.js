import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import profile from '../../../../images/profile/profile.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherHeader from "../../TeacherHeader/TeacherHeader";

axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
const TeacherAttendanceReport = (props) => {
    let navigate = useNavigate();
    /*
    const [user_code, setUser_code] = useState(localStorage.getItem('user_code'))
    */
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [school_type, setSchoolType] = useState(localStorage.getItem("school_type"))


    const [access_token, setAccess_token] = useState(
        localStorage.getItem("access_token")
    );

    const [search_issue_date, setSearch_Issue_date] = useState("");
    const [search_due_date, setSearch_Due_date] = useState("");
    const [notice, setNotice] = useState([]);
    const [reset, setReset] = useState(0);
    const checkLoggedIn = () => {
        if (user_type != 2) {
            navigate("/login");
        }
    };


    useEffect(() => {
        checkLoggedIn()
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/attendanceReport/student?school_info_id=${localStorage.getItem("school_id")}`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                setNotice(response.data);
            });
    }, [reset]);
    //get homework

    const handleSearch = () => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/attendanceReport/student?school_info_id=${localStorage.getItem("school_id")}&&start_date=${search_issue_date}&&end_date=${search_due_date}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setNotice(response.data);
            });
    };

    let handleIssueDateSearchChange = (e) => {
        setSearch_Issue_date(e.target.value);
    };
    let handleDueDateSearchChange = (e) => {
        setSearch_Due_date(e.target.value);
    };

    const changeStatus = async (id) => {
        const check = window.confirm('Are you sure to Change?');
        if (check) {
            axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
            const result = await axios.get(`${process.env.REACT_APP_NODE_API}/api/attendance/statusChange?id=${id}`)
            if (result) {
                toast("Attendance changed successfully");
                setReset(reset + 1)
            }
        }

    }


    return (
        <>
            <TeacherHeader />
            <div className="container ">
                <section className="py-5">
                    <h2
                        style={{ color: "white" }}
                        className="px-5 py-2 bg-info bg-gradient"
                    >
                        Attendance Report :{" "}
                    </h2>
                    <div className="row">
                        <div class={"col-sm-4 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className="pb-2" for="exampleInputEmail1">
                                    Start Date :{" "}
                                </label>
                                <input
                                    style={{ border: "1px solid blue" }}
                                    type="date"
                                    class="form-control"
                                    value={search_issue_date}
                                    onChange={handleIssueDateSearchChange}
                                />
                            </div>
                        </div>
                        <div class={"col-sm-4 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className="pb-2" for="exampleInputEmail1">
                                    End Date :{" "}
                                </label>
                                <input
                                    style={{ border: "1px solid blue" }}
                                    type="date"
                                    class="form-control"
                                    value={search_due_date}
                                    onChange={handleDueDateSearchChange}
                                />
                            </div>
                        </div>
                        <div class={"col-sm-2 p-2"}>
                            <div className='pt-2 mx-auto'>
                                <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Class</th>
                                <th scope="col">Section</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notice.map((noticeJSON) => {
                                return (
                                    <tr>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.class_name}
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.section_default_name}
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.full_name}
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            {moment(noticeJSON.date).format('DD-MM-YYYY')}
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.attendance}
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            <button className="btn btn-primary mt-1" onClick={() => changeStatus(noticeJSON.id)}>Change Attendance</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
};

export default TeacherAttendanceReport;
