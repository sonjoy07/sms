import React, { useState, useEffect, useRef } from "react";
const CreateSms = (props) => {
    const [absentList, setAbsentList] = useState([])
    const [attendance, setAttendance] = useState([]);
    const [all, setAll] = useState(0);
    useEffect(() => {
        setAbsentList(props.latestStudent.filter(res => res.attendance === 'A'))
        let at_list = [];
        props.latestStudent.filter(res => res.attendance === 'A').map((stu) => {
            at_list.push({ student_id: stu.id, attendance_status: 0 });
        });
        setAttendance(at_list);
    }, [])

    const handleAttendance = (index) => {
        let att_list = attendance;
        if (att_list[index].attendance_status == 0) {
            att_list[index].attendance_status = 1;
        } else {
            att_list[index].attendance_status = 0;
        }
        console.log(att_list);
        setAttendance(att_list);
    };
    const handleAttendanceAll = () => {
        if (all == 0) {
            setAll(1)
        } else {
            setAll(0)
        }
        let att_list = attendance;
        Promise.all(att_list.forEach(list => {
            if (all == 0) {
                list.attendance_status = 1;
            } else {
                list.attendance_status = 0;
            }
        }))
        setAttendance(att_list);
    };
    console.log(attendance)
    return (
        <div className='container pt-4'>

            <section className='py-5'>
                <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Student Details</h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <label class="custom-control custom-switch mt-3">
                                    <input onChange={() => handleAttendanceAll()} className="form-check-input" type="checkbox" />
                                    <span class="px-2">Select All</span>
                                </label>
                            </th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Student Mobile</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {absentList.map((res, index) => {
                            const checked = attendance.find(att => att.student_id === res.id)
                            console.log(checked.attendance_status === 1)
                            return <tr key={index}>
                                <td>
                                    <th scope="col">
                                        <label class="custom-control custom-switch mt-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={ true }
                                                onChange={() => handleAttendance(index)}
                                            />
                                            <span class=""></span>
                                        </label>
                                    </th>
                                </td>
                                <td>{res.student_code}</td>
                                <td>{res.full_name}</td>
                                <td>{res.mobile_no}</td>
                                <td>pending</td>
                            </tr>
                        })}





                    </tbody>
                </table>
            </section>

            <div className='row'>
                <div className='col-md-12'>
                    <div className="card card-dark collapsed-card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between px-1'>
                                <div>
                                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2">Create SMS</h3>
                                </div>
                                <div className="card-tools">


                                </div>
                            </div>
                        </div>

                        <div className='card-body' >


                            <div className='row'>
                                <div class={"col-sm-12 p-2 mx-auto"}>
                                    <div class="form-group">
                                        <label className='pb-2' for="exampleSelect">SMS Text : </label>
                                        <textarea style={{ border: '1px solid blue' }} class="form-control" id="class" name="class">
                                        </textarea>

                                    </div>
                                </div>
                                <div class={"col-sm-2 p-2 mx-auto"}>
                                    <div className='pt-2 mx-auto'>
                                        <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default CreateSms;