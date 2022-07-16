import React from 'react'
import { Link } from 'react-router-dom';
import payment from '../../../../images/icons/payment.png';
import profile from '../../../../images/profile/profile.png'
import StudentHeader from '../../StudentHeader';

const StudentPayment = () => {
    return (
        <>
            <StudentHeader />
            <section class="container">
                <h2 style={{ color: 'blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-5'>Student's Invoice</h2>
                <div class="row mx-auto mt-5">
                    <Link to='/dueinvoice' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={payment} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 style={{ color: 'blue' }} class="card-title">Due Invoice</h4>
                                        <p class="card-text">Student Due Invoice</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>

                    <Link style={{ textDecoration: 'none' }} to='/paidinvoice' class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={payment} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 style={{ color: 'blue' }} class="card-title">Paid Invoice</h4>
                                        <p class="card-text">Student Paid Invoice</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>


                </div>

            </section>
        </>
    )
}

export default StudentPayment