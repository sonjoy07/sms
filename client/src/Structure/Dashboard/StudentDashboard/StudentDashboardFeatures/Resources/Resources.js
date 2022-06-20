import React from 'react'
import library from '../../../../images/icons/library.png'
import ebook from '../../../../images/icons/ebook.png'
import link from '../../../../images/icons/link.png'
import profile from '../../../../images/profile/profile.png';
import StudentHeader from '../../StudentHeader';
const Resources = () => {
    return (
        <>
            <StudentHeader />

            <section class="container mt-5 pt-2">
                <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-4'>Resource</h2>
                <div class="row mx-auto mt-4">
                    <a href='/studentlibrary' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={library} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Library</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href='/studentebook' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={ebook} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">eBook</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href='/studentimportantlink' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '64px', height: '64px' }} src={link} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Important Link</h4>
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

export default Resources