import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const SchoolAdminSection = () => {

    const [school_info, setSchool_info] = useState([])
    const [shift, setShift] = useState('')
    const [shift_info, setShiftInfo] = useState([])
    const [class_info, setClassInfo] = useState([])
    const [class_code, setClassCode] = useState('')
    const [school_name, setSchoolName] = useState('')
    const [section_default, setSection_default] = useState('')
    const [section_local, setSection_local] = useState('')
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"))
    const checkLoggedIn = () => {
        if (user_type != 4) {
            Navigate("/login");
        }
    };
    useEffect(() => {
        checkLoggedIn()
    })
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/school_info/all`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setSchool_info(response.data);
            });
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/class/all`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setClassInfo(response.data);
            });
    }, [])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/shift/all`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setShiftInfo(response.data);
            });
    }, [])

    const handleSection = e => {
        setSection_default(e.target.value)
        console.log(e.target.value)
    }
    const handleshift = e => {
        setShift(e.target.value)
        console.log(e.target.value)
    }

    const handleClassCode = e => {
        setClassCode(e.target.value)
        console.log(e.target.value)
    }
    const handleSchoolName = e => {
        setSchoolName(e.target.value)
        console.log(e.target.value)
    }

    const handleLocal = e => {
        setSection_local(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/create_section`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },

                body: JSON.stringify({
                    section_default_name: section_default,


                }),
            })
            .then((res) => res.json())
            .then((json) => {
                alert('New Section Created!')
            });
        setClassCode('')
        setSection_default('')
        setSection_local('')
        setSchoolName('')
        setShift('')


    }


    return (
        <section className='container'>
            <div className='row mt-4'>
                <div className=' col-md-12'>
                    <div className="card card-dark collapsed-card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between px-4'>
                                <div>
                                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Add New Section</h3>
                                </div>

                            </div>
                        </div>

                        <div className='card-body' >
                            {/* id='list' */}

                            <div className='row'>
                                <div class={"col-sm-3 mx-auto p-2"}>
                                    <div class="form-group">
                                        <label className='pb-2' for="exampleSelect">Section Default Name : </label>
                                        <input onChange={handleSection} style={{ border: '1px solid blue' }} class="form-control" id="class" value={section_default} name="class" placeholder='section Default Name' />
                                    </div>
                                </div>
                                <div class={"col-sm-3 mx-auto p-2"}>
                                    <div class="form-group">
                                        <label className='pb-2' for="exampleSelect">shift : </label>
                                        <select
                                            className="form-control"
                                            value={shift}
                                            onChange={handleshift}
                                        >
                                            <option value="">Select</option>
                                            {shift_info.map((schoolJSON) => {
                                                return (
                                                    <option value={schoolJSON.id}>
                                                        {schoolJSON.shift_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div class={"col-sm-3 mx-auto p-2"}>
                                    <div class="form-group">
                                        <label className='pb-2' for="exampleSelect">Class Name : </label>
                                        <select
                                            className="form-control"
                                            value={class_code}
                                            onChange={handleClassCode}
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
                                <div class={"col-sm-3 mx-auto p-2"}>
                                    <div class="form-group">
                                        <label className='pb-2' for="exampleSelect">School Name : </label>
                                        <select
                                            className="form-control"
                                            value={school_name}
                                            onChange={handleSchoolName}
                                        >
                                            <option value="">Select</option>
                                            {school_info.map((schoolJSON) => {
                                                return (
                                                    <option value={schoolJSON.id}>
                                                        {schoolJSON.school_name}
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
    );
};

export default SchoolAdminSection;