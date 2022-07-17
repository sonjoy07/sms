import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import SchoolHeader from './schoolHeader/SchoolHeader';
import bkash from '../../images/payment/bkash.png'
import nagad from '../../images/payment/nagad.png'

const SmsPayment = () => {
    const [sectors, setSectors] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_NODE_API}/api/sectorBySchool?school_id=${localStorage.getItem("school_id")}&&class_id=${localStorage.getItem("class")}`, {
            headers: {
              authorization: "bearer " + localStorage.getItem("access_token"),
            },
          }).then((response) => {
            setSectors(response.data);
          });
    },[])
    const payment =()=>{
        const check = window.confirm('Are you sure to Pay?');
        if (check) {
            fetch(`${process.env.REACT_APP_NODE_API}/api/create_sms_payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.getItem("access_token"),
              },
      
              body: JSON.stringify({
                invoice: uuidv4(),
                user_id: localStorage.getItem("user_code"),
                school_info_id: localStorage.getItem("school_id"),
                transaction_id: "e7f4s54ad8d2d47c52e7",
                paidDate: moment().format('YYYY-MM-DD')
              }),
            })
            .then((res) => res.json())
            .then((json) => {
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
                    <div style={{ textDecoration: 'none' }} class="col-sm-6 my-4 col1" onClick={()=>payment()}>
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
                    </div>


                </div>

            </section>
        </>
    )
}

export default SmsPayment