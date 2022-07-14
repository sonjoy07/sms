import React from 'react';
import SuperAdminHeader from '../../SuperAdminHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateNewClass = () => {
  const [typies, setTypies] = useState([])
  const [className, setClassName] = useState("")
  const [classCode, setClassCode] = useState("")
  const [orgId, setOrgId] = useState("")
  const [shift, setShift] = useState('')
  const [id, setId] = useState("");
  const [shift_info, setShiftInfo] = useState([])
  const [classList, setClassList] = useState([])
  const [reset, setReset] = useState(0)
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/school_type/all`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setTypies(response.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/class/all_info`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setClassList(response.data);
      });
    axios.get(`${process.env.REACT_APP_NODE_API}/api/shift/all`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setShiftInfo(response.data);
      });
  }, [reset]);
  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/create_class`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },

        body: JSON.stringify({
          school_type_id: orgId,
          shift_id: shift,
          class_code: classCode,
          class_name: className,
          id:id

        }),
      })
      .then((res) => res.json())
      .then((json) => {
        if (id === '') {
          toast('Class saved successfully')
       } else {
          toast('Class updated successfully')
       }
        setClassCode("")
        setOrgId("")
        setShift("")
        setClassName("")
        setId("")
        setReset(reset + 1)
      });

  }
  const addClass = ()=>{
    setClassCode("")
        setOrgId("")
        setShift("")
        setClassName("")
        setId("")
  }
  const editClass = (res)=>{
    setClassCode(res.class_code)
    setOrgId(res.school_type_id)
    setShift(res.shift_id)
    setClassName(res.class_name)
    setId(res.id)
  }
  const deleteClass = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
       axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
       const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/class/delete?id=${id}`)
       if (result) {
          toast("Class deleted successfully");
          setReset(reset+1)
       }
    }
 }
  return (
    <>
      <SuperAdminHeader />
      <div className='container pt-4'>
        <div className='row'>
          <div className='col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-4'>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Add New Class : </h3>
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



                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Class Name : </label>
                      <input type="text" value={className} onChange={e => setClassName(e.target.value)} class="form-control" />
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Code : </label>
                      <input type="text" value={classCode} onChange={e => setClassCode(e.target.value)} class="form-control" />
                    </div>
                  </div>
                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Shift : </label>
                      <select class="form-control"  value={shift} onChange={e => setShift(e.target.value)} id="class" name="class">

                        <option>Select Shift</option>
                        {shift_info.map((schoolJSON) => {
                          return (
                            <option value={schoolJSON.id}>
                              {schoolJSON.shift_name}
                            </option>
                          );
                        })}
                      </select>

                    </div>
                  </div>
                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Organization Type : </label>
                      <select class="form-control" value={orgId} onChange={e => setOrgId(e.target.value)} id="class" name="class">

                        <option>Select Type</option>
                        {typies.map(res => {
                          return <option value={res.id}>{res.type_name}</option>
                        })}
                      </select>

                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div className='pt-2 mx-auto'>
                      <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSubmit}>Submit</button>
                    </div>
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
          <h2 style={{ color: 'white' }} className='px-3 py-2 bg-info bg-gradient'>Create New Class</h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Class Name</th>
                <th scope="col">Class Code</th>
                <th scope="col">Shift</th>
                <th scope="col">Organization Type</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {classList.map(res => {
                return (<tr>
                  <td>{res.class_name}</td>
                  <td>{res.class_code}</td>
                  <td>{res.shift_name}</td>
                  <td>{res.type_name}</td>
                  <td>
                    <div className='.d-flex'>
                      <div>
                        <button style={{ color: 'white' }}onClick={() => editClass(res)}className='bg-success'>Edit</button>
                      </div>
                      <div>
                        <button style={{ color: 'white' }} onClick={() => deleteClass(res.id)} className='bg-danger'>Delete</button>
                      </div>
                    </div>
                  </td></tr>)
              })}

            </tbody>
          </table>
        </section>
      </div></>
  );
};

export default CreateNewClass;