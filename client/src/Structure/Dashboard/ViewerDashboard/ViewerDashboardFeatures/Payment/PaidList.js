import React from 'react'
import profile from '../../../../images/profile/profile.png'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import moment from 'moment'
import ViewerHeader from '../../ViewerHeader';

const PaidList = () => {
  const [payments, setPayments] = useState([])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NODE_API}/api/allPaymentSchool?school_id=${localStorage.getItem('school_id')}`, {
      headers: {
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
    }).then((response) => {
      setPayments(response.data);
    });
  }, [])
  return (
    <>
      <ViewerHeader />

      <section className='container mt-4'>
        <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-3 py-2 bg-gradient'>Paid Invoice</h2>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">School Name</th>
              <th scope="col">Invoice ID</th>
              <th scope="col">Sector Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Paid Date</th>
              <th scope="col">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(res => {
              return <tr>

                <td>{localStorage.getItem('school_name')}</td>
                <td>{res.invoice_no}</td>
                <td>{res.sector_name}</td>
                <td>{res.amount}</td>
                <td>{moment(res.paid_date).format('Do MMM YYYY')}</td>
                <td>{res.transaction_id}</td>
              </tr>
            })}

          </tbody>
        </table>
      </section>
    </>
  )
}

export default PaidList