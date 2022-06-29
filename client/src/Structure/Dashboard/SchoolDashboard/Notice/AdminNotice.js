import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import profile from '../../../images/profile/profile.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SchoolHeader from "../schoolHeader/SchoolHeader";

axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
const AdminNotice = (props) => {
    let navigate = useNavigate();
    /*
    const [user_code, setUser_code] = useState(localStorage.getItem('user_code'))
    */
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [school_type, setSchoolType] = useState(localStorage.getItem("school_type"))
    const [clses, setClses] = useState([]);
    const [cls, setCls] = useState("");
    const [id, setId] = useState("");

    const [sections, setSections] = useState([]);
    const [section, setSection] = useState("");

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");

    const [sessions, setSessions] = useState([]);
    const [session, setSession] = useState("");
    const [all, setAll] = useState(0);

    const [school_info_id, setSchool_info_id] = useState("");
    const [teacher_id, setTeacher_id] = useState(
        localStorage.getItem("user_code")
    );
    const [access_token, setAccess_token] = useState(
        localStorage.getItem("access_token")
    );
    const [uid, setUid] = useState(localStorage.getItem("u_id"));

    const [class_id, setClass_id] = useState(0);
    const [section_id, setSection_id] = useState(0);
    const [student_id, setStudent_id] = useState(0);
    const [session_id, setSession_id] = useState("");
    const [school_id, setSchool] = useState(localStorage.getItem("school_id"))
    const [headline, setHeadline] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [sendList, setSendList] = useState([]);
    const [notice, setNotice] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [checkedStudents, setCheckedStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState([]);
    const checkLoggedIn = () => {
        if (user_type != 4) {
            navigate("/login");
        }
    };

    //get teacher data
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${teacher_id}`,
                {
                    headers: { authorization: "bearer " + access_token },
                }
            )
            .then((response) => {
                setTeacher(response.data);
            });
    }, [teacher_id, access_token]);


    useEffect(() => {
        checkLoggedIn()
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/school-admin/profile?teacher_id=${teacher_id}`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                setSchool_info_id(response.data.school_info_id);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setClses(response.data);
            });
    }, []);

    useEffect(() => {
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
    }, [class_id]);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/student/section?section_id=${section_id}&class_id=${class_id}&school_info_id=${school_id}`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                debugger;
                setStudents(response.data);
                let tempList = [];

                response.data.map((stu) => {
                    const check = selectedStudents.find(res => res == stu.id)
                    if (check) {
                        tempList.push(1);
                    } else {
                        tempList.push(0);
                    }
                });
                setCheckedStudents(tempList);
                let list = []
                for (const inputName in response.data) {
                    const check = selectedStudents.find(res => res == response.data[inputName].student_id)
                    if (check) {
                        list[inputName] = true;
                    } else {
                        list[inputName] = false;

                    }
                }
                setChecked(list)
            });
    }, [section_id, class_id]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/session`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setSessions(response.data);
            });
    }, []);

    let handleClassChange = (e) => {
        setCls(e.target.value);
        setClass_id(e.target.value);
    };
    let handleSectionChange = (e) => {
        setSection(e.target.value);
        setSection_id(e.target.value);
    };

    let handleSessionChange = (e) => {
        setSession(e.target.value);
        setSession_id(e.target.value);
    };
    let handleTopicChange = (e) => {
        setHeadline(e.target.value);
    };
    let handleDetailsChange = (e) => {
        setDescription(e.target.value);
    };

    const toggleCheck = (inputName) => {
        setChecked((prevState) => {
            const newState = { ...prevState };
            newState[inputName] = !prevState[inputName];
            return newState;
        });
    };

    const selectAll = (value) => {
        setCheckedAll(value);
        setChecked((prevState) => {
            const newState = { ...prevState };
            for (const inputName in newState) {
                newState[inputName] = value;
            }
            return newState;
        });
    };
    const resetForm = () => {
        setClass_id("");
        setSection_id("");
        setStudent_id("");
        setSession_id("");
        setHeadline("");
        setDescription("");
        setDate("");
        setId("");
        setStudents([])
    }
    const handleSubmit = () => {
        let finalStudents = [];
        let finalStudentsmobile = [];
        students.forEach((res, index) => {
            if (checked[index] === true) {
                finalStudents.push(res.id);
                finalStudentsmobile.push(res.mobile_no);
            }
        })


        fetch(`${process.env.REACT_APP_NODE_API}/api/notice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                school_info_id: school_info_id,
                class_id: class_id,
                section_id: section_id,
                students: finalStudents,
                session_id: session_id,
                headline: headline,
                description: description,
                date: date,
                uid: uid,
                type: 2,
                id: id
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (id) {
                    toast("Notice updated successfully");

                } else {
                    toast("Notice saved successfully");
                }
                setClass_id("");
                setSection_id("");
                setStudent_id("");
                setSession_id("");
                setHeadline("");
                setDescription("");
                setDate("");
                setId("");
            })
            .then(() => getHWList());
    };
    //get homework
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/notice/creator?uid=${uid}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setNotice(response.data);
            });
    }, [uid]);

    const getHWList = () => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/notice/creator?uid=${uid}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setNotice(response.data);
            });
    };

    const deleteNotice = async (id) => {
        const check = window.confirm('Are you sure to delete?');
        if (check) {
            axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
            const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/notice/delete?id=${id}`)
            if (result) {
                toast("Notice deleted successfully");
                getHWList()
            }
        }

    }
    const editNotice = async (id) => {
        // setSection_id("");
        // setClass_id("");
        const result = await axios.get(`${process.env.REACT_APP_NODE_API}/api/notice/edit?id=${id}`)
        setDescription(result.data[0].notice_description);
        setHeadline(result.data[0].notice_headline);
        setSection_id(result.data[0].section_id);
        setStudent_id(result.data[0].student_id);
        setSession_id(result.data[0].session_id);
        setClass_id(result.data[0].class_id);
        setId(result.data[0].id);
        setDate(moment(result.data[0].publishing_date).format("YYYY-MM-DD"));
        const users = result.data[0].notice_users.split(',')
        // let list = []
        // for (const inputName in response.data) {
        //     console.log()
        //     list[inputName] = false;
        // }
        // setChecked(list)
        // users.map(res=>{

        // })
        setSelectedStudents(users)
    }
    return (
        <>
        <SchoolHeader/>
            <div className="container ">
                <div className="row mt-4">
                    <div className=" col-md-12">
                        <div className="card card-dark collapsed-card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between px-4">
                                    <div>
                                        <h3
                                            style={{
                                                color: "LightSeaGreen",
                                                fontSize: "25px",
                                                fontWeight: "bold",
                                            }}
                                            className="card-title pt-2"
                                        >
                                            Create Notice{" "}
                                        </h3>
                                    </div>
                                    <div className="card-tools">
                                        <button
                                            id="w-change-close"
                                            type="button"
                                            className="btn btn-tool"
                                            data-card-widget="collapse"
                                            onClick={resetForm}
                                        >
                                            <i className="fas fa-plus icons" />
                                        </button>
                                        {/* onClick={handlelist} */}
                                        {/* active */}
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                {/* id='list' */}

                                <div className="row">
                                    <div className={"col-sm-4 p-2 mx-auto"}>
                                        <div className="form-group">
                                            <label className="pb-2" for="exampleInputEmail1">
                                                Headline :{" "}
                                            </label>
                                            <input
                                                style={{ border: "1px solid blue" }}
                                                type="text"
                                                className="form-control"
                                                value={headline}
                                                onChange={handleTopicChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-sm-8 p-2 mx-auto"}>
                                        <div className="form-group">
                                            <label className="pb-2" for="exampleInputEmail1">
                                                Description :{" "}
                                            </label>
                                            <textarea
                                                style={{ width: "100%", border: "1px solid blue" }}
                                                className="form-control"
                                                value={description}
                                                onChange={handleDetailsChange}
                                                rows="4"
                                                cols="50"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className={"col-sm-4 mx-auto p-2"}>
                                        <div className="form-group">
                                            <label className="pb-2" for="exampleSelect">
                                                Academic Session :{" "}
                                            </label>
                                            <select
                                                style={{ border: "1px solid blue" }}
                                                className="form-control"
                                                value={session_id}
                                                onChange={handleSessionChange}
                                                id="class"
                                                name="class"
                                            >
                                                <option value="">Select Session</option>
                                                {sessions.map((sessionJSON) => {
                                                    return (
                                                        <option value={sessionJSON.id}>
                                                            {sessionJSON.session_year}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className={"col-sm-4 mx-auto p-2"}>
                                        <div className="form-group">
                                            <label className="pb-2" for="exampleSelect">
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
                                                <option value={0}>ALL</option>
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
                                    <div className={"col-sm-4 mx-auto p-2"}>
                                        <div className="form-group">
                                            <label className="pb-2" for="exampleSelect">
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
                                                <option value={0}>ALL</option>
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

                                    <div className={"col-sm-8 mx-auto p-2"}>

                                        <div className="form-group">
                                            {students.length > 0 && <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <td></td>
                                                        <td><input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            onChange={(event) => selectAll(event.target.checked)}
                                                            checked={checkedAll}
                                                        /></td>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {students.map((studentJSON, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{studentJSON.full_name}</td>
                                                                <td>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        onChange={() => toggleCheck(index)}
                                                                        checked={checked[index]}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>}
                                        </div>
                                    </div>

                                    {/* <div style={{paddingTop: '20px'}} className={"col-sm-2 mx-auto"}>
                   <button  type="button" className="btn btn-primary">Primary</button>
                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    className="pt-2 mx-auto"
                >
                    <button
                        style={{ color: "white", fontSize: "25px" }}
                        type="button"
                        className="btn bg-secondary bg-gradient py-2 px-5"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>

                <section className="py-5">
                    <h2
                        style={{ color: "white" }}
                        className="px-5 py-2 bg-info bg-gradient"
                    >
                        Information :{" "}
                    </h2>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Publishing Date</th>
                                <th scope="col">Notice Headline</th>
                                <th scope="col">Description</th>
                                <th scope="col">Class</th>
                                <th scope="col">Section</th>
                                <th scope="col">Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notice.map((noticeJSON) => {
                                return (
                                    <tr>
                                        <td style={{ color: "blue" }}>
                                            {moment(noticeJSON.publishing_date).format("YYYY-MM-DD")}
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.notice_headline}
                                        </td>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.notice_description}
                                        </td>
                                        <td style={{ color: "blue" }}>{noticeJSON.class_name}</td>
                                        <td style={{ color: "blue" }}>
                                            {noticeJSON.section_local_name}
                                        </td>

                                        <td>
                                            <div className=".d-flex">
                                                <div>
                                                    <button
                                                        style={{ color: "white" }}
                                                        className="bg-success"
                                                        onClick={() => editNotice(noticeJSON.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        style={{ color: "white" }}
                                                        className="bg-danger"
                                                        onClick={() => deleteNotice(noticeJSON.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
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

export default AdminNotice;
