import React from 'react'
import axios from 'axios'
import moment from 'moment'
import StudentHeader from '../../StudentHeader'
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useSearchParams } from 'react-router-dom';

const DueInvoice = () => {
    const [sectors, setSectors] = useState([])
    // let [searchParams] = useSearchParams();
    // const success = searchParams.get('success')
    useEffect(() => {
        // if (success === "true") {
        //     toast('Payment Successfully Completed')
        // }else if(success === "false"){
        //     toast('Payment Failed.Please Try again')
        // }
        axios.get(`${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${localStorage.getItem("user_code")}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            axios.get(`${process.env.REACT_APP_NODE_API}/api/studentsDue?school_info_id=${localStorage.getItem("school_id")}&&class_id=${localStorage.getItem("class")}&&section_id=${response.data[0].section_id}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setSectors(response.data);
            });
        });
    }, [])
    return (
        <>
            <StudentHeader />
            <section className='container mt-4'>
                <h2 style={{ color: 'white' }} className='px-3 py-2 bg-info bg-gradient'>Due Invoice</h2>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Invoice ID</th>
                            <th scope="col">Sector Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Pay Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sectors.map(res => {
                            const invoice = `${localStorage.getItem('u_id').substring(0, 4)}${res.id}${moment(res.last_date).format('DDMM')}`
                            return <tr>
                                <td>{res.invoice_no}</td>
                                <td>{res.sector_name}</td>
                                <td>{res.amount}</td>
                                <td>{moment(res.last_date).format("DD-MM-YYYY")}</td>
                                <td>
                                    {/* <button onClick={()=>payment(invoice,res)} className='btn btn-danger mt-1' style={{ backgroundColor: 'tomato'}}>Pay Now</button> */}
                                    {res.status === 0 ? <a href={`${process.env.REACT_APP_NODE_API}/api/ssl-request?amount=${res.amount}&&product=payment&&redirect=dueinvoice&&invoice=${res.invoice_no}&&user=${localStorage.getItem('user_code')}`
                                    } style={{ color: 'white' }} className='btn btn-success mt-1'>Pay Now</a> : 'Paid'}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default DueInvoice