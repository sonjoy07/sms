import SuperAdminHeader from '../../SuperAdminHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const CreateNewPeriod = () => {
  const [classList, setClassList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  const [reset, setReset] = useState(0)
  const [id, setId] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [classId, setClassId] = useState("");
  const [typeId, setTypeId] = useState("");
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
    checkLoggedIn()
    axios.get(`${process.env.REACT_APP_NODE_API}/api/school_info/all`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setClassList(response.data);
      });
    axios.get(`${process.env.REACT_APP_NODE_API}/api/shift/all`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setTypeList(response.data);
      });
    axios.get(`${process.env.REACT_APP_NODE_API}/api/period/all`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setSubjectList(response.data);
      });

  }, [reset])
  
  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/create_period`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },

        body: JSON.stringify({
          school_type_id: classId,
          shift_id: typeId,
          period_code: subjectName,
          id: id
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        if (id === '') {
          toast('Period saved successfully')
        } else {
          toast('Period updated successfully')
        }
      });
    setSubjectName('')
    setClassId('')
    setTypeId('')
    setId("")
    setReset(reset + 1)
  }
  const addClass = ()=>{
    setSubjectName('')
    setClassId('')
    setTypeId('')
    setId("")
  }

  const editClass = (res)=>{
    setSubjectName(res.period_code)
    setClassId(res.school_info_id)
    setTypeId(res.shift_id)
    setId(res.id)
  }
  const deleteClass = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
       axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
       const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/period/delete?id=${id}`)
       if (result) {
          toast("Period deleted successfully");
          setReset(reset+1)
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
                  <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Create New Period : </h3>
                </div>
                <div className="card-tools">
                  <button id="w-change-close" type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus icons" />
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
                    <label className='pb-2' for="exampleInputEmail1">School Info : </label>
                    <select value={classId} onChange={(e) => setClassId(e.target.value)} class="form-control" id="class" name="class">

                      <option>Select</option>
                      {classList.map(res => {
                        return <option value={res.id}>{res.school_name}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div class={"col-sm-2 p-2 mx-auto"}>
                  <div class="form-group">
                    <label className='pb-2' for="exampleInputEmail1">shift : </label>
                    <select value={typeId} onChange={(e) => setTypeId(e.target.value)} class="form-control" id="class" name="class">

                      <option>Select</option>
                      {typeList.map(res => {
                        return <option value={res.id}>{res.shift_name}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div class={"col-sm-2 p-2 mx-auto"}>
                  <div class="form-group">
                    <label className='pb-2' for="exampleInputEmail1">Period Code : </label>

                    <input type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} class="form-control" />
                  </div>
                </div>
                <div class={"col-sm-2 p-2 mx-auto"}>
                  <div className='pt-1 mx-auto'>
                    <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                  </div>
                </div>


              </div>
            </div>

          </div>
        </div>
      </div>

      <section className='py-5'>
        <h2 style={{ color: 'white' }} className='px-3 py-2 bg-info bg-gradient'>School Period Information</h2>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">School Info</th>
              <th scope="col">Shift</th>
              <th scope="col">Period Code</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
          {subjectList.map(res=>{
             let className= classList.find(resc=>resc.id === res.school_info_id)
             let typeName= typeList.find(resc=>resc.id === res.shift_id)
             console.log(className);
            return  <tr>

             <td>{className.school_name}</td>
             <td>{typeName.shift_name}</td>
             <td>{res.period_code}</td>
             <td>
               <div className='.d-flex'>
                 <div>
                   <button onClick={() => editClass(res)} style={{ color: 'white' }} className='bg-success'>Edit</button>
                 </div>
                 <div>
                   <button  onClick={() => deleteClass(res.id)}  style={{ color: 'white' }} className='bg-danger'>Delete</button>
                 </div>
               </div>
             </td>
           </tr>
           })} 

          </tbody>
        </table>
      </section>
    </div></>
  );
};

export default CreateNewPeriod;