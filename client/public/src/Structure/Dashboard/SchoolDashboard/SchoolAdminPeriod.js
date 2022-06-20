import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SchoolAdminPeriod = () => {
    const [shift, setShift] = useState('')
    const [shift_info, setShiftInfo] = useState([])
    const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"))
    const [school_info, setSchool_info] = useState(localStorage.getItem("school_id"))
    const [period_code, setPeriod] = useState('')
    const [period, setPeriod_details] = useState([])

    const handlePeriod = e => {
        setPeriod(e.target.value)
        console.log(e.target.value)
    }


    const handleshift = e => {
        setShift(e.target.value)
        console.log(e.target.value)
    }


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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/period/all`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setPeriod_details(response.data);
            });
    }, [shift])

    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/create_period`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },

                body: JSON.stringify({
                    school_type_id: school_info,
                    shift_id: shift,
                    period_code: period_code,

                }),
            })
            .then((res) => res.json())
            .then((json) => {
                alert('New period Created!')
            });


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
                                        <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Add New Period</h3>
                                    </div>

                                </div>
                            </div>

                            <div className='card-body' >
                                {/* id='list' */}

                                <div className='row'>
                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Shift name : </label>
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
                                            <label className='pb-2' for="exampleSelect">Period Name : </label>
                                            <input onChange={handlePeriod} style={{ border: '1px solid blue' }} class="form-control" id="class" value={period_code} name="class" placeholder='period code' />
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
                            <th style={{ textAlign: 'center' }} scope="col">Period Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        {period.map((info) => {


                            return (
                                <tr key={info.id}>
                                    <td style={{ textAlign: 'center' }}>{info.id}</td>
                                    <td style={{ textAlign: 'center' }}>{info.period_code}</td>


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

export default SchoolAdminPeriod;