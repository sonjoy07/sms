import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import SchoolHeader from './schoolHeader/SchoolHeader'
const Payment = () => {
  const [sector_code, setSector_code] = useState('')
  const [sector_name, setSector_name] = useState('')
  const [amount, setAmount] = useState('')
  const [classId, setClassId] = useState('')
  const [lastDate, setLastDate] = useState('')
  const [id, setId] = useState('')
  const [sectors, setSectors] = useState([])
  const [classes, setClasses] = useState([])
  const [reset, setReset] = useState(0)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${localStorage.getItem('school_type')}`, {
      headers: {
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
    }).then((response) => {
      setClasses(response.data);
    });
    axios.get(`${process.env.REACT_APP_NODE_API}/api/sector/all?school_id=${localStorage.getItem('school_id')}`, {
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
        class_id: classId,
        last_date: lastDate,
        school_id: localStorage.getItem('school_info_id'),
        id: id,
        amount: amount
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (id === '') {
          toast('New Sector saved successfully')
        } else {
          toast('Sector updated successfully')
        }
        setSector_code('')
        setAmount('')
        setClassId('')
        setLastDate('')
        setSector_name('')
        setReset(reset + 1)
      });
  }
  const editClass = (res)=>{
    setSector_code(res.sector_code)
    setAmount(res.amount)
    setClassId(res.class_id)
    setLastDate(moment(res.last_date).format('YYYY-MM-DD'))
    setSector_name(res.sector_name)
    setId(res.id)
  }
  const deleteClass = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
       axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
       const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/payment/delete?id=${id}`)
       if (result) {
          toast("Payment Sector deleted successfully");
          setReset(reset+1)
       }
    }
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
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Class : </label>
                      <select onChange={(e) => setClassId(e.target.value)}
                        value={classId} style={{ border: '1px solid blue' }} class="form-control" >
                        <option>select</option>
                        {classes.map(res => {
                          return <option value={res.id}>{res.class_name}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Sector Code : </label>
                      <input onChange={(e) => setSector_code(e.target.value)}
                        value={sector_code} style={{ border: '1px solid blue' }} type="text" class="form-control" />
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Sector Name : </label>
                      <input onChange={(e) => setSector_name(e.target.value)} value={sector_name} style={{ border: '1px solid blue' }} type="text" class="form-control" />
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Amount : </label>
                      <input onChange={(e) => setAmount(e.target.value)} value={amount} style={{ border: '1px solid blue' }} type="text" class="form-control" />
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Last Date : </label>
                      <input onChange={(e) => setLastDate(e.target.value)} value={lastDate} style={{ border: '1px solid blue' }} type="date" class="form-control" />
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
                <th scope="col">Class</th>
                <th scope="col">Amount</th>
                <th scope="col">Last Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {sectors.map(res => {
                let cls = classes.find(resc=>resc.id === res.class_id)
                return <tr style={{ textAlign: 'center' }}>
                  <td>{res.sector_code}</td>
                  <td>{res.sector_name}</td>
                  <td>{cls?.class_name}</td>
                  <td>{res.amount}</td>
                  <td>{moment(res.last_date).format("DD-MM-YYYY")}</td>
                  <td><div className='.d-flex'>
                      <div>
                        <button style={{ color: 'white' }}onClick={() => editClass(res)}className='bg-success'>Edit</button>
                      </div>
                      <div>
                        <button style={{ color: 'white' }} onClick={() => deleteClass(res.id)} className='bg-danger'>Delete</button>
                      </div>
                    </div></td>
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