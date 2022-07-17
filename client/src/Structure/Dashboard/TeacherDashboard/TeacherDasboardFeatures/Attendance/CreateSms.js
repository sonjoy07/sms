import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { axios } from 'axios';
const CreateSms = (props) => {
    const [absentList, setAbsentList] = useState([])
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState([]);
    const [smsText, setSmsText] = useState("প্রিয় অভিভাবক, আপনার সন্তান আজ স্কুলে অনুপস্থিত। দয়া করে স্কুল/কলেজ কর্তৃপক্ষের সাথে যোগাযোগ করুন - অধ্যক্ষ/প্রধান শিক্ষক");
    useEffect(() => {
        setAbsentList(props.latestStudent.filter(res => res.attendance === 'A'))
        let list = []
        for (const inputName in props.latestStudent.filter(res => res.attendance === 'A')) {
            list[inputName] = false;
        }
        setChecked(list)
    }, [])

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
    const handleSmsSend = async () => {
        const checksms = await axios.get(`${process.env.REACT_APP_NODE_API}/api/smsCheck?school_id=${localStorage.getItem('school_id')}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }
        )
        absentList.forEach((res, index) => {
            if (checked[index] === true) {
                fetch(`http://202.164.208.226/smsapi?api_key=C200164162b496a4b069b1.94693919&type=text&contacts=+880${res.mobile_no}&senderid=8809612441008&msg="${smsText}"`)

                fetch(`${process.env.REACT_APP_NODE_API}/api/save/smsReport`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                    body: JSON.stringify({
                        smsText: smsText,
                        user_id: localStorage.getItem('u_id'),
                        purpose: 2,
                        school_info_id: localStorage.getItem('school_id')
                    }),
                })
                    .then((res) => res.json())
                fetch(`${process.env.REACT_APP_NODE_API}/api/smsCountUpdate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                    body: JSON.stringify({
                        school_info_id: localStorage.getItem('school_info_id')
                    }),
                })
            }

        })

        toast("SMS Sent successfully");
        setAbsentList([]);
        setSmsText("")
        setChecked([])
        setCheckedAll(false)
    }
    return (
        <div className='container pt-4'>

            <section className='py-5'>
                <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Student Details</h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <label class="custom-control custom-switch mt-3">
                                    <input onChange={(event) => selectAll(event.target.checked)}
                                        checked={checkedAll} className="form-check-input" type="checkbox" />
                                    <span class="px-2">Select All</span>
                                </label>
                            </th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Student Mobile</th>
                            {/* <th scope="col">Status</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {absentList.map((res, index) => {
                            return <tr key={index}>
                                <td>
                                    <th scope="col">
                                        <label class="custom-control custom-switch mt-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                onChange={() => toggleCheck(index)}
                                                checked={checked[index]}
                                            />
                                            <span class=""></span>
                                        </label>
                                    </th>
                                </td>
                                <td>{res.student_code}</td>
                                <td>{res.full_name}</td>
                                <td>{res.mobile_no}</td>
                                {/* <td>pending</td> */}
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
                                        <textarea style={{ border: '1px solid blue' }} class="form-control" id="class" name="class"
                                            value={smsText}
                                            onChange={(e) => setSmsText(e.target.value)}
                                        >
                                        </textarea>

                                    </div>
                                </div>
                                <div class={"col-sm-2 p-2 mx-auto"}>
                                    <div className='pt-2 mx-auto'>
                                        <button style={{ color: 'white', fontSize: '20px' }} type="button" onClick={handleSmsSend} disabled={smsText === "" ? true : false} class="btn bg-secondary bg-gradient px-5">Submit</button>
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