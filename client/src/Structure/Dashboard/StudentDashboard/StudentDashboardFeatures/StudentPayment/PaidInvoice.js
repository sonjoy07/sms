import React from 'react'
import profile from '../../../../images/profile/profile.png'

const PaidInvoice = () => {
    return (
        <>
            <div style={{ height: '80px', }} className='bg-info'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className='container'>
                    {/* <div>
     <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
   </div> */}
                    <div class="dropdown">
                        <button style={{ padding: '0px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img style={{ width: "50px" }} className='' src={profile} alt="profile" />
                        </button>
                        <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton">
                            <a style={{ color: 'tomato' }} class="dropdown-item " href="/studentprofile">Profile</a>
                            <a style={{ color: 'tomato' }} class="dropdown-item" href="#">LogOut</a>
                        </div>
                    </div>
                    <div>
                        <h3 className='pt-1' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>Name: Student Name</h3>
                        <h4 className='' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>Id : Student Id</h4>
                    </div>
                </div>
            </div>

            <section className='container mt-4'>
                <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-3 py-2 bg-gradient'>Paid Invoice</h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Invoice ID</th>
                            <th scope="col">Sector Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Paid Date</th>
                            <th scope="col">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>87487fch33</td>
                            <td>Registration</td>
                            <td>1200</td>
                            <td>30-June-2022</td>
                            <td>1262872dhdxg217fchb</td>
                        </tr>
                        <tr>

                            <td>87487fch33</td>
                            <td>Registration</td>
                            <td>1200</td>
                            <td>30-June-2022</td>
                            <td>1262872dhdxg217fchb</td>
                        </tr>
                        <tr>

                            <td>87487fch33</td>
                            <td>Registration</td>
                            <td>1200</td>
                            <td>30-June-2022</td>
                            <td>1262872dhdxg217fchb</td>
                        </tr>


                    </tbody>
                </table>
            </section>
        </>
    )
}

export default PaidInvoice