import SuperAdminHeader from '../../SuperAdminHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const CreateNewSection = () => {
  const [classList, setClassList] = useState([])
  const [reset, setReset] = useState(0)
  const [id, setId] = useState("");
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [section, setSection] = useState([])
  const [section_default, setSection_default] = useState('')
  const checkLoggedIn = () => {
    if (user_type != 5) {
      Navigate("/login");
    }
  };


  useEffect(() => {
    checkLoggedIn()
    axios.get(`${process.env.REACT_APP_NODE_API}/api/section/all`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setSection(response.data);
      });
  }, [reset])

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/create_section`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },

        body: JSON.stringify({
          section_default_name: section_default,
          id:id
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        if (id === '') {
          toast('Section saved successfully')
       } else {
          toast('Section updated successfully')
       }
      });
    setSection_default('')
    setId("")
    setReset(reset + 1)
  }
  const editClass = (res)=>{
    setSection_default(res.section_default_name)
    setId(res.id)
  }
  const deleteClass = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
       axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
       const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/section/delete?id=${id}`)
       if (result) {
          toast("Section deleted successfully");
          setReset(reset+1)
       }
    }
 }
  const handleSection = e => {
    setSection_default(e.target.value)
}
  return (<><SuperAdminHeader />
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <div className="card card-dark collapsed-card">
            <div className="card-header">
              <div className='d-flex justify-content-between px-4'>
                <div>
                  <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Create New Section</h3>
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
                <div class={"col-sm-4 p-2 mx-auto"}>
                  <div class="form-group">
                    <label className='pb-2' for="exampleInputEmail1">Section Name : </label>
                    <input onChange={handleSection} value={section_default} type="text" class="form-control" />
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
      <section className='container py-5'>
        <h2 style={{ color: 'white' }} className='px-3 py-2 bg-info bg-gradient'>Section Information</h2>

        <table class="table table-striped">
          <thead>
            <tr>
            <th style={{ textAlign: 'center' }} scope="col">id</th>

<th style={{ textAlign: 'center' }} scope="col">Section Default Name</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {section.map((info) => {


              return (
                <tr key={info.id}>
                  <td style={{ textAlign: 'center' }}>{info.id}</td>
                  <td style={{ textAlign: 'center' }}>{info.section_default_name}</td>
                  <td>
                    <div className='.d-flex'>
                      <div>
                        <button style={{ color: 'white' }} className='bg-success' onClick={() => editClass(info)}>Edit</button>
                      </div>
                      <div>
                        <button style={{ color: 'white' }} className='bg-danger' onClick={() => deleteClass(info.id)} >Delete</button>
                      </div>
                    </div>
                  </td>

                </tr>
              )
            })
            }

          </tbody>
        </table>
      </section>
    </div></>
  );
};

export default CreateNewSection;