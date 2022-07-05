import React, { useEffect, useState } from 'react';
import school from '../../images/icons/school.png';
import organization from '../../images/icons/organization.png';
import class1 from '../../images/icons/class.png';
import section from '../../images/icons/section.png';
import period from '../../images/icons/clock.png';
import subject from '../../images/icons/subject.png';
import inventory from '../../images/icons/inventory.png';
import { useNavigate } from 'react-router-dom';
import SuperAdminHeader from './SuperAdminHeader';



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
        <>
        <SuperAdminHeader/>
        <section className="container">
            <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-5'>Super Admin Dashboard</h2>
            <div className="row mx-auto mt-5">
                <a style={{ textDecoration: 'none' }} href='/add-school' className="col-sm-12 col-md-6 my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={school} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Add New School</h4>

                                </div>
                            </div>

                        </div>
                    </div>

                </a>
                <a style={{ textDecoration: 'none' }} href='/add-organization' className="col-sm-12 col-md-6 my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={organization} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Create New Organization Type</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/create-class' className="col-sm-12 col-md-6 my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={class1} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Create New Class</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/period-create' className="col-sm-12 col-md-6  my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={section} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Create New Section</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/period-create' className="col-sm-12 col-md-6 my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={period} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Create New Period</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/create-subject' className="col-sm-12 col-md-6 my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={subject} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Create New Subject</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/admin-activities' className="col-sm-12 col-md-6 my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={inventory} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Activities</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>
                <a style={{ textDecoration: 'none' }} href='/newExamType' className="col-sm-12 col-md-6 my-4 col1">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body py-4">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                <div className='px-3'>
                                    <img style={{ width: '64px', height: '64px' }} src={inventory} alt="" />
                                </div>
                                <div className='px-3'>
                                    <h4 className="card-title">Exam</h4>

                                </div>
                            </div>

                        </div>
                    </div>
                </a>




            </div>
        </section>
        </>
    );
};

export default SuperAdminDashboard;