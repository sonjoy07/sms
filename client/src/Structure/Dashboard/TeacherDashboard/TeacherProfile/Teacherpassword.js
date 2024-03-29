import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherHeader from '../TeacherHeader/TeacherHeader';

const Teacherpassword = () => {

    let navigate = useNavigate();

    const [old, setOld] = useState('');
    const [pass, newPass] = useState('')
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [access_token, setAccess_token] = useState(
        localStorage.getItem("access_token")
    );
    const [teacher, setTeacher] = useState({});

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${user_code}`,
                {
                    headers: { authorization: "bearer " + access_token },
                }
            )
            .then((response) => {
                setTeacher(response.data);
                console.log(response.data);
            });
    }, [user_code, access_token]);
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/update_user?user_code=${teacher.teacher_code}`, {
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
        if (user_type != 2) {
            navigate('/login')
        }
    }
    useEffect(() => {
        checkLoggedIn()
    }, [])
    return (
        <>
            <TeacherHeader />
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
                                        <input onChange={handleOld} value={old} type="password" className='form-control'/>
                                    </div>
                                </div>


                                <div class={"col-sm-3 mx-auto p-2"}>
                                    <div class="form-group">
                                        <label className='pb-2' for="exampleSelect">New Password </label>
                                        <input value={pass} onChange={handlechange} type="password" className='form-control'/>
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
        </>
    );

};

export default Teacherpassword;