import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import {  toast } from 'react-toastify';
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
    const [clses, setClses] = useState([]);
    const [sections, setSections] = useState([]);
    const [reset, setReset] = useState(0);
    const [class_id, setClass_id] = useState('');
    const [section_id, setSection_id] = useState('');
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
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${localStorage.getItem("school_type")}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setClses(response.data);
            });
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/section/all`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                setSections(response.data);
            });
    }, [reset]);
    //get homework
    let handleClassChange = (e) => {
        setClass_id(e.target.value);
    };
    let handleSectionChange = (e) => {
        setSection_id(e.target.value);
      };
    const handleSearch = () => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/attendanceReport/student?school_info_id=${localStorage.getItem("school_id")}&&start_date=${search_issue_date}&&end_date=${search_due_date}&&section_id=${section_id}&&class_id=${class_id}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setNotice(response.data);
            });
    };

    let handleIssueDateSearchChange = (e) => {
        setSearch_Issue_date(e);
    };
    let handleDueDateSearchChange = (e) => {
        setSearch_Due_date(e);
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
                                    Class :{" "}
                                </label>
                                <select
                                    style={{ border: "1px solid blue" }}
                                    className="form-control"
                                    value={class_id}
                                    onChange={handleClassChange}
                                    id="class"
                                    name="class"
                                >
                                    <option value="">Select</option>
                                    {clses.map((classJSON) => {
                                        return (
                                            <option value={classJSON.id}>
                                                {classJSON.class_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div class={"col-sm-4 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className="pb-2" for="exampleInputEmail1">
                                    Section :{" "}
                                </label>
                                <select
                                    style={{ border: "1px solid blue" }}
                                    className="form-control"
                                    value={section_id}
                                    onChange={handleSectionChange}
                                    id="class"
                                    name="class"
                                >
                                    <option value="">Select</option>
                                    {sections.map((sectionJSON) => {
                                        return (
                                            <option value={sectionJSON.id}>
                                                {sectionJSON.section_default_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div class={"col-sm-4 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className="pb-2" for="exampleInputEmail1">
                                    Start Date :{" "}
                                </label>
                                {/* <input
                                    style={{ border: "1px solid blue" }}
                                    type="date"
                                    class="form-control"
                                    value={search_issue_date}
                                    pattern="\d{4}-\d{2}-\d{2}"
                                    onChange={handleIssueDateSearchChange}
                                /> */}
                                <DatePicker selected={search_issue_date} 
                                    className="form-control" onChange={(date) => handleIssueDateSearchChange(date)} dateFormat="dd/MM/yyyy" placeholderText="dd/mm/yyyy"/>
                            </div>
                        </div>
                        <div class={"col-sm-4 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className="pb-2" for="exampleInputEmail1">
                                    End Date :{" "}
                                </label>
                                {/* <input
                                    style={{ border: "1px solid blue" }}
                                    type="date"
                                    class="form-control"
                                    value={search_due_date}
                                    onChange={handleDueDateSearchChange}
                                /> */}
                                 <DatePicker selected={search_due_date} 
                                    className="form-control" onChange={(date) => handleDueDateSearchChange(date)} dateFormat="dd/MM/yyyy" placeholderText="dd/mm/yyyy"/>
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
                                <th scope="col">Class Time</th>
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
                                            {moment(noticeJSON.time, "HH:mm:ss").format("hh:mm A")
                                            }
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.attendance === 1 ? 'Present' : 'Absent'}
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
