import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const SchoolAdminClassCreate = () => {
    const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"))
    const [school_info, setSchool_info] = useState([])
    const [shift, setShift] = useState('')
    const [shift_info, setShiftInfo] = useState([])
    const [class_code, setClassCode] = useState('')
    const [class_name, setClassName] = useState('')
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [classInfo, setClassInfo] = useState([])
    const [classinput, setclassInput] = useState('')

    const checkLoggedIn = () => {
        if (user_type != 4) {
            Navigate("/login");
        }
    };
    useEffect(() => {
        checkLoggedIn()
    })
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setClassInfo(response.data);
            });
    }, [shift, class_code])

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

    const handleshift = e => {
        setShift(e.target.value)
        console.log(e.target.value)
    }

    const handleClassCode = e => {
        setClassCode(e.target.value)
        setclassInput(e.target.value)
        console.log(e.target.value)
    }

    const handleclassName = e => {
        setClassName(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/create_class`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },

                body: JSON.stringify({
                    school_type_id: school_type,
                    shift_id: shift,
                    class_code: class_code,
                    class_name: class_name

                }),
            })
            .then((res) => res.json())
            .then((json) => {
                alert('New class Created!')
            });
        setClassCode('')
        setShift('')
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
                                        <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Add New Class</h3>
                                    </div>

                                </div>
                            </div>

                            <div className='card-body' >
                                {/* id='list' */}

                                <div className='row'>


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
                                            <label className='pb-2' for="exampleSelect">Class Code : </label>
                                            <input onChange={handleClassCode} style={{ border: '1px solid blue' }} class="form-control" id="class" value={class_code} name="class" placeholder='Class Code' />
                                        </div>
                                    </div>
                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Class Name : </label>
                                            <input onChange={handleclassName} style={{ border: '1px solid blue' }} class="form-control" id="class" value={class_name} name="class" placeholder='Class Name' />
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

                            <th style={{ textAlign: 'center' }} scope="col">Class Name</th>
                            <th style={{ textAlign: 'center' }} scope="col">Class Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classInfo.map((info) => {


                            return (
                                <tr key={info.id}>

                                    <td style={{ textAlign: 'center' }}>{info.class_name}</td>
                                    <td style={{ textAlign: 'center' }}>{info.class_code}</td>

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

export default SchoolAdminClassCreate;