import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    let navigate = useNavigate();
    const [student, setStudent] = useState([]);
    const [old, setOld] = useState('');
    const [pass, newPass] = useState('')
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    console.log(user_code)
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${user_code}`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                console.log(response.data)
                setStudent(response.data);
            })
            .catch((e) => console.log(e));
    }, []);
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/update_user?user_code=${student[0].student_code}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                Pass: pass
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                alert('password Changed successfully!!')
            });
        setOld('')
        newPass('')
    };
    const handlechange = e => {
        newPass(e.target.value)
        console.log(e.target.value)
    }
    const handleOld = e => {
        setOld(e.target.value)
        console.log(e.target.value)
    }
    const checkLoggedIn = () => {
        if (user_type != 1) {
            navigate('/login')
        }
    }
    useEffect(() => {
        checkLoggedIn()
    }, [])
    return (
        <section className='container'>
            <div className='row mt-4'>
                <div className=' col-md-12'>
                    <div className="card card-dark collapsed-card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between px-4'>
                                <div>
                                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Reset Password</h3>
                                </div>

                            </div>
                        </div>

                        <div className='card-body' >
                            {/* id='list' */}



                            <div class={"col-sm-3 mx-auto p-2"}>
                                <div class="form-group">
                                    <label className='pb-2' for="exampleSelect">Type Old Password </label>
                                    <input onChange={handleOld} value={old} type="password" />
                                </div>
                            </div>


                            <div class={"col-sm-3 mx-auto p-2"}>
                                <div class="form-group">
                                    <label className='pb-2' for="exampleSelect">New Password </label>
                                    <input value={pass} onChange={handlechange} type="password" />
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



        </section>
    );
};

export default ChangePassword;