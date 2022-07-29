import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import profile from '../../../images/profile/profile.png'
import SuperAdminHeader from './../SuperAdminHeader';


const SuperAdminProfileEdit = () => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [student, setStudent] = useState([]);
  const [attachment_link, setAttachment_link] = useState("");
  const [preview, setPreview] = useState()

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/super-admin/profile?admin_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        let studentData = response.data[0]
        setFirstName(studentData.first_name)
        setLastName(studentData.last_name)
        setMiddleName(studentData.middle_name)
        setMobileNo(studentData.mobile_no)
        setEmail(studentData.email)       
        setStudent(response.data);
        setPreview(`${process.env.REACT_APP_NODE_API}/uploads/${studentData.photo_id}`);
      })
      .catch((e) => console.log(e));
  }, []);
  const nameChange = e => {
    setFirstName(e.target.value)
  }
  const emailChange = e => {
    setEmail(e.target.value)
    console.log(e.target.value)
  }
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", attachment_link);
    formData.append("fileName", attachment_link.name);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("middleName", middleName);
    formData.append("mobileNo", mobileNo);
    formData.append("email", email);
    fetch(`${process.env.REACT_APP_NODE_API}/api/super-admin/profile_update?student_code=${student[0].super_admin_code}`, {
      method: "POST",
      headers: {
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        toast('Profile Info is Changed successfully!!')
      });

  };
  const fileUpload = (e) => {
    setAttachment_link(e.target.files[0])
  }
  useEffect(() => {
    if (!attachment_link) {
      setPreview(undefined)
      return
    }

    const objectUrl = attachment_link.name
    setPreview(URL.createObjectURL(attachment_link))

    // free memory when ever this component is unmounted
    return () => URL.createObjectURL(attachment_link)
  }, [attachment_link])

  return (<>
    <SuperAdminHeader />
    <div class="container">
      <div class="main-body my-5">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body py-5">
                <div class="d-flex flex-column align-items-center text-center">
                  <img src={preview ? preview : profile} alt="" class="rounded-circle p-1 bg-primary" width="150" />
                  <div class="my-4">
                    <h4>{student[0]?.full_name}</h4>
                    <input type="file" className={'form-control'}
                      onChange={fileUpload} />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">First Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input onChange={nameChange} type="text" class="form-control" value={firstName} />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Middle Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input onChange={(e) => setMiddleName(e.target.value)} type="text" class="form-control" value={middleName} />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Last Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input onChange={(e) => setLastName(e.target.value)} type="text" class="form-control" value={lastName} />
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input onChange={emailChange} type="text" class="form-control" value={email} />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Mobile  No</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input type="text" onChange={(e) => setMobileNo(e.target.value)} class="form-control" value={mobileNo} />
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-9 text-secondary">
                    <input onClick={handleSubmit} type="button" class="btn btn-primary px-4" value="Save Changes" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default SuperAdminProfileEdit