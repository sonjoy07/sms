import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import SchoolHeader from './schoolHeader/SchoolHeader'
const Payment = () => {
    const [sector_code, setSector_code] = useState('')
    const [sector_name, setSector_name] = useState('')
    const [sectors, setSectors] = useState([])
    const [reset, setReset] = useState(0)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/sector/all`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setSectors(response.data);
        });
    }, [reset])
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/add_sector`, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: "bearer " + localStorage.getItem("access_token"), },
            body: JSON.stringify({
                sector_code: sector_code,
                sector_name: sector_name,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                // if (id === '') {
                toast('New Sector saved successfully')
                // } else {
                //     toast('Sector updated successfully')
                // }
            });
        setSector_code('')
        setSector_name('')
    }
    return (
        <>
            <SchoolHeader />

            <div className='container pt-4'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="card card-dark collapsed-card">
                            <div className="card-header">
                                <div className='d-flex justify-content-between px-4'>
                                    <div>
                                        <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2">Create Payment Sector Name</h3>
                                    </div>
                                    <div className="card-tools">


                                    </div>
                                </div>
                            </div>

                            <div className='card-body' >


                                <div className='row'>



                                    <div class={"col-sm-4 p-2 mx-auto"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleInputEmail1">Sector Code : </label>
                                            <input onChange={(e) => setSector_code(e.target.value)} style={{ border: '1px solid blue' }} type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class={"col-sm-4 p-2 mx-auto"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleInputEmail1">Sector Name : </label>
                                            <input onChange={(e) => setSector_name(e.target.value)} style={{ border: '1px solid blue' }} type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class={"col-sm-2 p-2 mx-auto"}>
                                        <div className='pt-2 mx-auto'>
                                            <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSubmit}>Submit</button>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <section className='py-5'>
                    <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Payment Sector Name</h2>

                    <table class="table table-striped">
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th scope="col">Sector Code</th>
                                <th scope="col">Sector Name</th>
                            </tr>
                        </thead>
                        <tbody>

                            {sectors.map(res => {
                                return <tr style={{ textAlign: 'center' }}>
                                    <td>{res.sector_code}</td>
                                    <td>{res.sector_name}</td>
                                </tr>
                            })
                            }

                        </tbody>
                    </table>
                </section>
            </div>

        </>
    )
}

export default Payment