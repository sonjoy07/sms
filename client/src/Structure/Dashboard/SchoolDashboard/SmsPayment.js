import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SchoolHeader from './schoolHeader/SchoolHeader';
// import bkash from '../../images/payment/bkash.png'
// import nagad from '../../images/payment/nagad.png'
import { Link, useNavigate } from 'react-router-dom';

const SmsPayment = () => {
    const [sectors, setSectors] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/schoolWiseInvoice?school_id=${localStorage.getItem("school_id")}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setSectors(response.data);
        });
    }, [])
    const payment = (invoice,amount) => {
        const check = window.confirm('Are you sure to Pay?');
        if (check) {
            fetch(`${process.env.REACT_APP_NODE_API}/api/ssl-request`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },

                    body: JSON.stringify({
                        amount: amount,
                        product: 'SMS'
                    }),
                })
                .then((res) => res.json())
                .then((json) => {
                    debugger
                    fetch(`${process.env.REACT_APP_NODE_API}/api/create_sms_payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },

                    body: JSON.stringify({
                        invoice: invoice,
                        user_id: localStorage.getItem("user_code"),
                        school_info_id: localStorage.getItem("school_id"),
                        transaction_id: "e7f4s54ad8d2d47c52e7",
                        paidDate: moment().format('YYYY-MM-DD')
                    }),
                })
                    toast(json.status)
                });            
                
            // }else{

        }
    }
    return (
        <>
            <SchoolHeader />

            <section class="container">
                <h2 style={{ color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }} className='mt-5'>Payment Option</h2>
                <div class="row mx-auto mt-5">
                    {/* <div style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1" onClick={()=>payment()}>
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
                    </div>

                    <div style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1" onClick={()=>payment()}>
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
                    </div> */}
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">School Name</th>
                                <th scope="col">Sector Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Invoice No</th>
                                <th scope="col">Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectors.map(res => {
                                // console.log(className);
                                return <tr>

                                    <td>{res?.school_name}</td>
                                    <td>{res?.sector_name}</td>
                                    <td>{res.type === 1 ? 'SMS' : 'Payment'}</td>
                                    <td>{res?.amount}</td>
                                    <td>{res.invoice_no}</td>
                                    <td>
                                        <div className='.d-flex'>
                                            <div>
                                            {res.status === 0?<a href={`${process.env.REACT_APP_NODE_API}/api/ssl-request?amount=${res.amount}&&product=sms&&redirect=sms-payment&&invoice=${res.invoice_no}`
                                                    // payment(res.invoice_no,res.amount)
                                                    } style={{ color: 'white' }} className='btn btn-success mt-1'>Pay</a>:'Paid'}
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>

                </div>

            </section>
        </>
    )
}

export default SmsPayment