import React, { useState } from 'react';
import SuperAdminHeader from '../../SuperAdminHeader';

const CreateNewOrganization = () => {
  const [organization_type, setOrganization_type] = useState('')
  const [orga_code, setOrgaName] = useState('')
  const handleType = e => {
    setOrganization_type(e.target.value)
  }
  const handlecode = e => {
    setOrgaName(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/organization`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },

        body: JSON.stringify({
          Organization_type: organization_type,
          organization_code: orga_code

        }),
      })
      .then((res) => res.json())
      .then((json) => {
        alert('New Organization Created!')
      });


  }

  return (<><SuperAdminHeader/>
    <div className='container pt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <div className="card card-dark collapsed-card">
            <div className="card-header">
              <div className='d-flex justify-content-between px-4'>
                <div>
                  <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Create New Organization Type</h3>
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
                    <label className='pb-2' for="exampleInputEmail1">Add New Type : </label>
                    <input onChange={handleType} value={organization_type} type="text" class="form-control" />
                  </div>
                </div>
                <div class={"col-sm-4 p-2 mx-auto"}>
                  <div class="form-group">
                    <label className='pb-2' for="exampleInputEmail1">Code : </label>
                    <input onChange={handlecode} value={orga_code} type="text" class="form-control" />
                  </div>
                </div>
                <div class={"col-sm-2 p-2 mx-auto"}>
                  <div className='pt-2 mx-auto'>
                    <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
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
        <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Organization Information</h2>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Organization Type</th>
              <th scope="col">Code</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td>07-APR-22</td>
              <td>22221130015</td>
              <td>Tasmi Jahan</td>
              <td>
                <div className='.d-flex'>
                  <div>
                    <button style={{ color: 'white' }} className='bg-success'>Edit</button>
                  </div>
                  <div>
                    <button style={{ color: 'white' }} className='bg-danger'>Delete</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>

              <td>07-APR-22</td>
              <td>22221130015</td>
              <td>Tasmi Jahan</td>
              <td>
                <div className='.d-flex'>
                  <div>
                    <button style={{ color: 'white' }} className='bg-success'>Edit</button>
                  </div>
                  <div>
                    <button style={{ color: 'white' }} className='bg-danger'>Delete</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>

              <td>07-APR-22</td>
              <td>22221130015</td>
              <td>Tasmi Jahan</td>
              <td>
                <div className='.d-flex'>
                  <div>
                    <button style={{ color: 'white' }} className='bg-success'>Edit</button>
                  </div>
                  <div>
                    <button style={{ color: 'white' }} className='bg-danger'>Delete</button>
                  </div>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </section>
    </div></>
  );
};

export default CreateNewOrganization;