import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SchoolHeader from './schoolHeader/SchoolHeader';

const SchoolSMSreport = () => {
    const [total, setTotal] = useState("")
    const [totalPayment, setTotalPayment] = useState(0)
    const [totalUsed, setTotalUsed] = useState([])
    const [schools, setSchools] = useState([])
    const [school_id, setSchool_id] = useState(localStorage.getItem('school_id'))
    const [type_id, setType_id] = useState("")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/school_info/all`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }
        ).then((response) => {
            setSchools(response.data);
        });
        // const totalData = await fetch('http://isms.zaman-it.com/miscapi/C200164162b496a4b069b1.94693919/getBalance',{method: "GET",headers: headers})
        //         axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        // axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'x-access-token, Origin, Content-Type, Accept';
        // axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';

        // setTotal(totalData)
    }, [])
    const handleSearch = () => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/sms/count_report?school_info_id=${school_id}&&type_id=${type_id}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }
        ).then((response) => {
            setTotalUsed(response.data.result);
            setTotal(response.data.data);
            setTotalPayment(response.data.payment);
        });
    }
    const payNow = (id) => {
        const check = window.confirm('Are you sure to Pay?');
        if (check) {
            fetch(`${process.env.REACT_APP_NODE_API}/api/update_sms_payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },

                    body: JSON.stringify({
                        id: id,
                    }),
                })
                .then((res) => res.json())
                .then((json) => {
                    toast(json.status)
                });
            // }else{

        }
    }
    let totalPaid  = 0
    totalUsed.map(res=>totalPaid +=res.amount)
    return (
        <>
            <SchoolHeader />
            <div className='container'>
                
                <section className='py-5'>
                    <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>SMS Details</h2>
                    {/* <h4 style={{ textAlign: 'center' }}>{total}</h4> */}
                    <div className='row mb-3 mt-4'>
                        {/* <div className='col-sm-4'>
                            <select onChange={(e) => setSchool_id(e.target.value)} className='form-control'>
                                <option>Select School</option>
                                {schools?.map(res => {
                                    return <option value={res.id}>{res.school_name}</option>
                                })}
                            </select>
                        </div> */}
                        <div className='col-sm-4'>
                            <select onChange={(e) => setType_id(e.target.value)} className='form-control'>
                                <option>Select Type</option>
                                <option value={1}>SMS</option>
                                <option value={2}>Payment</option>
                            </select>
                        </div>
                        <div className='col-sm-4'>
                            <button onClick={handleSearch} className='btn btn-success mt-1'>Search</button>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='card col-sm-12'>
                            <div className='card-body'>
                                {type_id ==='1'?<h4 style={{ textAlign: 'center' }}>Total Payment:{totalPaid}</h4>:type_id ==='2'?<h4  style={{ textAlign: 'center' }}>Total Payment: {totalPayment}</h4>:''}
                            </div>
                        </div>
                        {/* <div className='card col-sm-6'>
                            <div className='card-body'>
                                <h4 style={{ textAlign: 'center' }}>SMS Used: {totalUsed.length}</h4>
                            </div>
                        </div> */}
                    </div>

                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">School Name</th>
                                <th scope="col">User</th>
                                {type_id === '2' && <th scope="col">Class</th>}
                                {type_id === '2' &&<th scope="col">Section</th>}
                                {type_id === '2' && <th scope="col">Student ID</th>}
                                {type_id === '2' &&<th scope="col">Sector Name</th>}
                                <th scope="col">Invoice No</th>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {totalUsed.map(res => {
                                return <tr>
                                    <td>{res.school_name}</td>
                                    <td>{res.full_name}</td>
                                    {type_id === '2' && <td>{res.class_name}</td>}
                                    {type_id === '2' && <td>{res.section_default_name}</td>}
                                    {type_id === '2' && <td>{res.student_code}</td>}
                                    {type_id === '2' &&<td>{res.sector_name}</td>}
                                    <td>{res.invoice_no}</td>
                                    <td>{res.transaction_id}</td>
                                    <td>{res.amount}</td>
                                    <td>{moment(res.payment_date).format('DD-MM-YYYY')}</td>
                                    <td>{res.status === 1 ? "Pending" : "Paid"}</td>
                                    <td>{res.status === 1 ? <button onClick={() => payNow(res.id)} className='btn btn-success mt-1'>Update Now</button> : ''}</td>
                                </tr>
                            })}




                        </tbody>
                    </table>
                </section>

            </div>




        </>
    )
}

export default SchoolSMSreport