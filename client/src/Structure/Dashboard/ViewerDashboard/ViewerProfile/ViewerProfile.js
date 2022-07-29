import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../../images/profile/profile.png'
import ViewerHeader from '../ViewerHeader';

const ViewerProfile = () => {
  let navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [user_code] = useState(localStorage.getItem("user_code"));
  const [user_type] = useState(localStorage.getItem("user_type"));
  const [profilePhoto] = useState(profile)
  const checkLoggedIn = () => {
    if (user_type != 6) {
      navigate('/login')
    }
  }
  useEffect(() => {
    checkLoggedIn()
  }, [])
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/administrator/profile?administrator_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {

        setStudent(response.data[0]);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(student);
  return (<>
    <ViewerHeader />
    <div class="container">
      <div class="main-body my-5">

        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body py-5">
                <div class="d-flex flex-column align-items-center text-center">
                  <img src={
                    student.photo_id ? `${process.env.REACT_APP_NODE_API}/uploads/${student?.photo_id}` : profilePhoto} alt="Admin" class="rounded-circle" width="150" />
                  <div class="my-4">
                    <h4>{student?.full_name}</h4>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 ">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row py-2">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Admin Code : </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {student.admin_code}
                  </div>
                </div>

                <div class="row py-2">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Full Name : </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {student.full_name}
                    {/* <div className='row form-inline'>
                                        <input className='col-sm-4 form-control' />
                                        <input className='col-sm-4 form-control' />
                                        <input className='col-sm-4 form-control' />
                                    </div> */}
                  </div>
                </div>

                <div class="row py-2">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Mobile No. : </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {student.mobile_number}
                  </div>
                </div>

             

                <div class="row py-2">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email : </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {student.email_address}
                  </div>
                </div>

                <div className='' style={{ display: 'flex' }}>
                  <div class="row  p-2">
                    <div class="col-sm-12">
                      <a class="btn btn-info" href="/viewerprofileedit">Edit</a>
                    </div>
                  </div>
                  <div class="row mx-1 p-2">
                    <div class="col-sm-12">
                      <a class="btn btn-info" href="/viewerpassword">Reset Password</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div></>

  )
}

export default ViewerProfile