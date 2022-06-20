import React from 'react'
import link from '../../../../images/icons/link.png'
import profile from '../../../../images/profile/profile.png';
import StudentHeader from '../../StudentHeader';

const ImportantLink = () => {
    return (
        <>
            <StudentHeader />

            <section class="container mt-5 pt-2">
                <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-4'>Important Link</h2>
                <div class="row mx-auto mt-4">
                    <a href='https://www.10minuteschool.com/' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={link} alt="" />
                                    </div>
                                    <div className='py-3'>
                                        <h4 class="card-title">10 Min School</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href='https://www.coursera.org/' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={link} alt="" />
                                    </div>
                                    <div className='py-3'>
                                        <h4 class="card-title">Coursera</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href='https://www.fedex.com/' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={link} alt="" />
                                    </div>
                                    <div className='py-3'>
                                        <h4 class="card-title">Fdx</h4>
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

export default ImportantLink