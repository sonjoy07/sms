import React from 'react'
import bkash from '../../../../images/payment/bkash.png'
import nagad from '../../../../images/payment/nagad.png'
import profile from '../../../../images/profile/profile.png';

const PayOption = () => {
    return (
        <>
            <div style={{ height: '80px', backgroundColor: '' }} className='bg-info'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className='container'>
                    {/* <div>
     <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
   </div> */}
                    <div class="dropdown">
                        <button style={{ padding: '0px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img style={{ width: "50px" }} className='' src={profile} alt="profile" />
                        </button>
                        <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton">
                            <a style={{ color: 'tomato' }} class="dropdown-item " href="/">Profile</a>
                            <a style={{ color: 'tomato' }} class="dropdown-item" href="#">LogOut</a>
                        </div>
                    </div>
                    <div>
                        <h3 className='pt-1' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>Name: Student Name</h3>
                        <h4 className='' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>Id : Student Id</h4>
                    </div>
                </div>
            </div>
            <section class="container">
                <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-5'>Payment Option</h2>
                <div class="row mx-auto mt-5">
                    <a href='' style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '100px', height: '70px' }} src={bkash} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Bkash</h4>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </a>

                    <a style={{ textDecoration: 'none' }} href='' class="col-sm-6 my-4 col1">
                        <div class="card bg-light shadow-sm">
                            <div class="card-body py-4">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=''>
                                    <div className='px-3'>
                                        <img style={{ width: '100px', height: '70px' }} src={nagad} alt="" />
                                    </div>
                                    <div className='px-3'>
                                        <h4 class="card-title">Nagad</h4>

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

export default PayOption