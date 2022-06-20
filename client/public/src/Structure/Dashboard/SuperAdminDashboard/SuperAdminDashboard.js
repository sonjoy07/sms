import React, { useEffect, useState } from 'react';
import school from '../../images/icons/school.png';
import organization from '../../images/icons/organization.png';
import class1 from '../../images/icons/class.png';
import section from '../../images/icons/section.png';
import period from '../../images/icons/clock.png';
import subject from '../../images/icons/subject.png';
import { useNavigate } from 'react-router-dom';



const SuperAdminDashboard = () => {
    let navigate = useNavigate();
    const [user_code, setUser_code] = useState(localStorage.getItem('user_code'))
    const [user_type, setUser_type] = useState(localStorage.getItem('user_type'))
    const [access_token, setAccess_token] = useState(
        localStorage.getItem("access_token")
    );
    const checkLoggedIn = () => {
        if (localStorage.getItem("user_type") != 5) {
            navigate("/login");
        }
    };
    useEffect(() => {
        checkLoggedIn();
    }, []);
    return (
        <section class="container">
            <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-5'>Super Admin Dashboard</h2>
            <div class="row mx-auto mt-5">
                <a style={{ textDecoration: 'none' }} href='/add-school' class="col-sm-12 col-md-6 my-4 col1">
                    <div class="card bg-light shadow-sm">
                        <div class="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={school} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 class="card-title">Add New School</h4>

                                </div>
                            </div>

                        </div>
                    </div>

                </a>
                <a style={{ textDecoration: 'none' }} href='/add-organization' class="col-sm-12 col-md-6 my-4 col1">
                    <div class="card bg-light shadow-sm">
                        <div class="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={organization} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 class="card-title">Create New Organization Type</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/create-class' class="col-sm-12 col-md-6 my-4 col1">
                    <div class="card bg-light shadow-sm">
                        <div class="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={class1} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 class="card-title">Create New Class</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/create-section' class="col-sm-12 col-md-6  my-4 col1">
                    <div class="card bg-light shadow-sm">
                        <div class="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={section} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 class="card-title">Create New Section</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/create-period' class="col-sm-12 col-md-6 my-4 col1">
                    <div class="card bg-light shadow-sm">
                        <div class="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={period} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 class="card-title">Create New Period</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/create-subject' class="col-sm-12 col-md-6 my-4 col1">
                    <div class="card bg-light shadow-sm">
                        <div class="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={subject} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 class="card-title">Create New Subject</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>




            </div>
        </section>
    );
};

export default SuperAdminDashboard;