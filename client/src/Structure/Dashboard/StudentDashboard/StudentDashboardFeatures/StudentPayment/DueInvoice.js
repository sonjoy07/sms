import React from 'react'
import axios from 'axios'
import moment from 'moment'
import StudentHeader from '../../StudentHeader'
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';

const DueInvoice = () => {
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
    const payment =(invoice,res)=>{
        const check = window.confirm('Are you sure to Pay?');
        if (check) {
            fetch(`${process.env.REACT_APP_NODE_API}/api/create_payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.getItem("access_token"),
              },
      
              body: JSON.stringify({
                invoice: invoice,
                sector_id: res.id,
                student_id: localStorage.getItem("user_code"),
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
                        {sectors.map(res=>{
                            const invoice =`${localStorage.getItem('u_id').substring(0,4)}${res.id}${moment(res.last_date).format('DDMM')}`
                        return<tr>
                            <td>{invoice}</td>
                            <td>{res.sector_name}</td>
                            <td>{res.amount}</td>
                            <td>{moment(res.last_date).format("Do MMM  YYYY")}</td>
                            <td>
                                <button onClick={()=>payment(invoice,res)} className='btn btn-danger mt-1' style={{ backgroundColor: 'tomato'}}>Pay Now</button>
                            </td>
                        </tr>})}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default DueInvoice