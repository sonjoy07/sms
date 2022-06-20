import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const SchoolAdminSubject = () => {

    const [school_info, setSchool_info] = useState([])
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [class_id, setClass_id] = useState('')
    const [class_info, setClassInfo] = useState([])
    const [class_code, setClassCode] = useState('')
    const [class_name, setClassName] = useState('')
    const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"))
    const [subjects, setSubjects] = useState([])
    const checkLoggedIn = () => {
        if (user_type != 4) {
            Navigate("/login");
        }
    };
    useEffect(() => {
        checkLoggedIn()
    })
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/subject_type?school_type_id=${school_type}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                console.log(response.data)
                setSubjects(response.data);
            });
    }, [class_id])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setClassInfo(response.data);
            });
    }, [])
    const handleClassInfo = e => {
        setClass_id(e.target.value)
        console.log(e.target.value)
    }

    const handleClassCode = e => {
        setClassCode(e.target.value)
        console.log(e.target.value)
    }

    const handleclassName = e => {
        setClassName(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/create_subject`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },

                body: JSON.stringify({
                    school_type_id: school_type,
                    class_id: class_id,
                    subject_code: class_code,
                    subject_name: class_name

                }),
            })
            .then((res) => res.json())
            .then((json) => {
                alert('New Subject Created!')
            });
        setClassCode('')
        setSchool_type('')
        setClass_id('')
        setClassName('')

    }


    return (
        <div>
            <section className='container'>
                <div className='row mt-4'>
                    <div className=' col-md-12'>
                        <div className="card card-dark collapsed-card">
                            <div className="card-header">
                                <div className='d-flex justify-content-between px-4'>
                                    <div>
                                        <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Add New Subject</h3>
                                    </div>

                                </div>
                            </div>

                            <div className='card-body' >
                                {/* id='list' */}

                                <div className='row'>
                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Subject Code : </label>
                                            <input onChange={handleClassCode} style={{ border: '1px solid blue' }} class="form-control" id="class" value={class_code} name="class" placeholder='subject Code' />
                                        </div>
                                    </div>
                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Subject Name : </label>
                                            <input onChange={handleclassName} style={{ border: '1px solid blue' }} class="form-control" id="class" value={class_name} name="class" placeholder='subject Name' />
                                        </div>
                                    </div>

                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Class name : </label>
                                            <select
                                                className="form-control"
                                                value={class_id}
                                                onChange={handleClassInfo}
                                            >
                                                <option value="">Select</option>
                                                {class_info.map((schoolJSON) => {
                                                    return (
                                                        <option value={schoolJSON.id}>
                                                            {schoolJSON.class_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>


                                    <div class={"col-sm-3 p-4 mx-auto"}>
                                        <div className='pt-2 mx-auto'>
                                            <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <h2
                    style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}
                    className="px-3 py-2 bg-info bg-gradient"
                >
                    Organization Information
                </h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }} scope="col">id</th>
                            <th style={{ textAlign: 'center' }} scope="col">Subject Name</th>
                            <th style={{ textAlign: 'center' }} scope="col">Subject Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((info) => {


                            return (
                                <tr key={info.id}>
                                    <td style={{ textAlign: 'center' }}>{info.id}</td>
                                    <td style={{ textAlign: 'center' }}>{info.subject_name}</td>
                                    <td style={{ textAlign: 'center' }}>{info.subject_code}</td>

                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

            </section>
        </div>
    );
};

export default SchoolAdminSubject;