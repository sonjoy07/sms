import React from 'react'
import teacher from '../../../images/icons/teacher.png';
import SchoolHeader from '../schoolHeader/SchoolHeader';


const TeacherFeatures = () => {
    return (
        <>
            <SchoolHeader />

            <section class="container">
                <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-5'>School Dashboard</h2>
                <div class="row mx-auto mt-5">

                    <a href='/add-teacher' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={teacher} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Create Teacher</h4>
                                        <p class="card-text">Create Teacher Data</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href='/teacherdata' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={teacher} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Teacher</h4>
                                        <p class="card-text">Add Teacher</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>

                </div>
            </section>
        </>
    )
}

export default TeacherFeatures