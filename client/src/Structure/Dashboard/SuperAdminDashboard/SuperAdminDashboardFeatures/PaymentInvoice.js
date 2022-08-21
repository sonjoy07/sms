import SuperAdminHeader from '../SuperAdminHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const PaymentInvoice = () => {
  const [subjectList, setSubjectList] = useState([])
  const [reset, setReset] = useState(0)
  const [id, setId] = useState("");
  const [schools, setSchools] = useState([])
  const [sectors, setSectors] = useState([])
  const [school_id, setSchool_id] = useState("")
  const [sector_id, setSector_id] = useState("")
  const [type_id, setType_id] = useState("")
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  const checkLoggedIn = () => {
    if (user_type != 5) {
      Navigate("/login");
    }
  };

  useEffect(() => {
    if (school_id !== '') {
      axios.get(`${process.env.REACT_APP_NODE_API}/api/sector/all?school_id=${school_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      ).then((response) => {
        setSectors(response.data);
      });
    }

  }, [school_id])
  useEffect(() => {
    checkLoggedIn()

    axios.get(`${process.env.REACT_APP_NODE_API}/api/school_info/all`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }
    ).then((response) => {
      setSchools(response.data);
    });
    axios.get(`${process.env.REACT_APP_NODE_API}/api/all_invoice`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setSubjectList(response.data);
      });

  }, [reset])

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/create_invoice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },

        body: JSON.stringify({
          school_id: school_id,
          sector_id: sector_id,
          type_id: type_id,
          id: id
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        if (id === '') {
          toast('Invoice saved successfully')
        } else {
          toast('Invoice updated successfully')
        }
      });
    setSchool_id('')
    setType_id('')
    setSector_id('')
    setId("")
    setReset(reset + 1)
  }
  const addClass = () => {
    setSchool_id('')
    setType_id('')
    setSector_id('')
    setId("")
  }

  const editClass = (res) => {
    setSchool_id(res.school_info_id)
    setType_id(res.type)
    setSector_id(res.sector_id)
    setId(res.id)
  }
  const deleteClass = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/invoice/delete?id=${id}`)
      if (result) {
        toast("Invoice deleted successfully");
        setReset(reset + 1)
      }
    }
  }
  return (<><SuperAdminHeader />
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <div className="card card-dark collapsed-card">
            <div className="card-header">
              <div className='d-flex justify-content-between px-4'>
                <div>
                  <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Payment Invoice Generate : </h3>
                </div>
                <div className="card-tools">
                  <button onClick={addClass} id="w-change-close" type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus icons" />
                  </button>
                  {/* onClick={handlelist} */}
                  {/* active */}
                </div>
              </div>
            </div>

            <div className='card-body' >
              {/* id='list' */}

              <div className='row'>


                <div className='col-sm-3'>
                  <select onChange={(e) => setSchool_id(e.target.value)} value={school_id} className='form-control'>
                    <option>Select School</option>
                    {schools?.map(res => {
                      return <option value={res.id}>{res.school_name}</option>
                    })}
                  </select>
                </div>
                <div className='col-sm-3'>
                  <select onChange={(e) => setSector_id(e.target.value)} value={sector_id} className='form-control'>
                    <option>Select Sector</option>
                    {sectors?.map(res => {
                      return <option value={res.id}>{res.sector_name}</option>
                    })}
                  </select>
                </div>
                <div className='col-sm-3'>
                  <select onChange={(e) => setType_id(e.target.value)} value={type_id} className='form-control'>
                    <option>Select Type</option>
                    <option value={1}>SMS</option>
                    <option value={2}>Payment</option>
                  </select>
                </div>

                <div class={"col-sm-2"}>
                  <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5 mt-1">Submit</button>
                </div>
                {/* <div style={{paddingTop: '20px'}} class={"col-sm-2 mx-auto"}>
                           <button  type="button" class="btn btn-primary">Primary</button>
                        </div> */}

              </div>
            </div>

          </div>
        </div>
      </div>

      <section className='py-5'>
        <h2 style={{ color: 'white' }} className='px-3 py-2 bg-info bg-gradient'>Subject Information</h2>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">School Name</th>
              <th scope="col">Sector Name</th>
              <th scope="col">Sector Code</th>
              <th scope="col">Class Name</th>
              <th scope="col">Section Name</th>
              <th scope="col">Student Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Invoice No</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {subjectList.map(res => {
              let className = schools.find(resc => resc.id === res.school_info_id)
              // console.log(className);
              return <tr>

                <td>{className?.school_name}</td>
                <td>{res?.sector_name}</td>
                <td>{res?.sector_code}</td>
                <td>{res?.class_name}</td>
                <td>{res?.section_default_name}</td>
                <td>{res?.full_name}</td>
                <td>{res?.amount}</td>
                <td>{res.type===1?'SMS':'Payment' }</td>
                <td>{res.invoice_no}</td>
                <td>
                  <div className='.d-flex'>
                    <div>
                      <button onClick={() => editClass(res)} style={{ color: 'white' }} className='bg-success'>Edit</button>
                    </div>
                    <div>
                      <button onClick={() => deleteClass(res.id)} style={{ color: 'white' }} className='bg-danger'>Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </section>
    </div>
  </>
  );
};

export default PaymentInvoice;