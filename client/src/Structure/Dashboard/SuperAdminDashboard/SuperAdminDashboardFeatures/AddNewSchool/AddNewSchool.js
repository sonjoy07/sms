import React, { useEffect } from 'react';
import SuperAdminHeader from '../../SuperAdminHeader';
import './AddNewSchool.css'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewSchool = () => {
  const [typies, setTypies] = useState([])
  const [schools, setSchools] = useState([])
  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  const [admins, setAdmins] = useState([])
  const [schoolType, setSchoolType] = useState("")
  const [eiinno, setEiinno] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [schoolShortName, setSchoolShortName] = useState("")
  const [divisionId, setdivisionId] = useState("")
  const [division, setdivision] = useState("")
  const [districtId, setdistrictId] = useState("")
  const [district, setdistrict] = useState("")
  const [upzilaId, setUpazilaId] = useState("")
  const [street, setStreet] = useState("")
  const [schoolCode, setSchoolCode] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [email, setEmail] = useState("")
  const [schoolHeadName, setSchoolHeadName] = useState("")
  const [schoolHeadPhone, setSchoolHeadPhone] = useState("")
  const [schoolHeadEmail, setSchoolHeadEmail] = useState("")
  const [adminId, setAdminId] = useState("")
  const [ContactPhone, setContactPhone] = useState("")
  const [ContactName, setContactName] = useState("")
  const [ContactEmail, setContactEmail] = useState("")
  const [reset, setReset] = useState(0)
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
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
        `${process.env.REACT_APP_NODE_API}/api/school_info/all`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setSchools(response.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/division`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setDivisions(response.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/administrator`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setAdmins(response.data);
      });
  }, [reset]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/district?division_id=${divisionId}`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setDistricts(response.data);
      });
  }, [divisionId])

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/upazila?district_id=${districtId}`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setUpazilas(response.data);
      });
  }, [districtId])
  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/add_school`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },

        body: JSON.stringify({
          type_id: schoolType,
          school_code: schoolCode,
          eiin: eiinno,
          administrator_id: adminId,
          school_name: schoolName,
          short_name: schoolShortName,
          address_division: division,
          address_district: district,
          address_upazila: upzilaId,
          address_village: street,
          school_phone: phoneNo,
          school_email: email,
          school_head_name: schoolHeadName,
          school_head_phone: schoolHeadPhone,
          school_head_email: schoolHeadEmail,
          contact_person_name: ContactName,
          contact_person_phone: ContactPhone,
          contact_person_email: ContactEmail,
          status: status,
          id: id
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        if (id === '') {
          toast('School saved successfully')
        } else {
          toast('School updated successfully')
        }
        setSchoolCode("")
        setSchoolName("")
        setSchoolType("")
        setEiinno("")
        setSchoolShortName("")
        setdivisionId("")
        setdistrictId("")
        setUpazilaId("")
        setStreet("")
        setPhoneNo("")
        setEmail("")
        setSchoolHeadName("")
        setSchoolHeadPhone("")
        setSchoolHeadEmail("")
        setAdminId("")
        setContactPhone("")
        setContactName("")
        setContactEmail("")
        setId("")
        setReset(reset + 1)
      });
  }
  const addClass = () => {
    setSchoolCode("")
    setSchoolName("")
    setSchoolType("")
    setEiinno("")
    setSchoolShortName("")
    setdivisionId("")
    setdivision("")
    setdistrictId("")
    setdistrict("")
    setUpazilaId("")
    setStreet("")
    setPhoneNo("")
    setEmail("")
    setSchoolHeadName("")
    setSchoolHeadPhone("")
    setSchoolHeadEmail("")
    setAdminId("")
    setContactPhone("")
    setContactName("")
    setContactEmail("")
    setId("")
  }
  const editClass = (res) => {
    let div = divisions.find(resc => resc.name === res.address_division)
    setdivision(div.name)
    setdivisionId(div.id)
    setSchoolCode(res.school_code)
    setSchoolName(res.school_name)
    setSchoolType(res.type_id)
    setEiinno(res.eiin)
    setSchoolShortName(res.short_name)
    // if()
    let dis = districts.find(resc => resc.name === res.address_district)
    console.log(dis);
    setdistrict(dis?.name)
    setdistrictId(dis?.id)
    // setdistrictId(res.address_district)
    setUpazilaId(res.address_upazila)
    setStreet(res.address_village)
    setPhoneNo(res.school_phone)
    setEmail(res.school_email)
    setSchoolHeadName(res.school_head_name)
    setSchoolHeadPhone(res.school_head_phone)
    setSchoolHeadEmail(res.school_head_phone)
    setAdminId(res.administrator_id)
    setContactPhone(res.contact_person_phone)
    setContactName(res.contact_person_name)
    setContactEmail(res.contact_person_email)
    setId(res.id)
  }
  const deleteClass = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/school/delete?id=${id}`)
      if (result) {
        toast("School deleted successfully");
        setReset(reset + 1)
      }
    }
  }

  const handleDivision = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    let text = e.nativeEvent.target[index].text
    setdivision(text)
  }
  const handleDistrict = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    let text = e.nativeEvent.target[index].text
    setdistrict(text)
  }
  // console.log(district);
  return (
    <>
      <SuperAdminHeader />
      <div className='container '>

        <div className='row mt-4'>
          <div className=' col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-4'>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} className="card-title pt-2">School-Type : </h3>
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


                  <div className={"col-sm-2 mx-auto p-2"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleSelect">School Type : </label>
                      <select className="form-control" id="class" value={schoolType} onChange={(e) => setSchoolType(e.target.value)} name="class">

                        <option>Select Type</option>
                        {typies.map(res => {
                          return <option value={res.id}>{res.type_name}</option>
                        })}
                      </select>

                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">EIIN No. : </label>
                      <input type="text" className="form-control" value={eiinno} onChange={(e) => setEiinno(e.target.value)} />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">School Code : </label>
                      <input type="text" value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">School Name : </label>
                      <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">School Short Name : </label>
                      <input type="text" value={schoolShortName} onChange={(e) => setSchoolShortName(e.target.value)} className="form-control" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div className='row pt-4'>
          <div className='col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-4'>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} className="card-title pt-2">Address : </h3>
                  </div>
                </div>
              </div>

              <div className='card-body' >
                {/* id='list' */}

                <div className='row'>


                  <div className={"col-sm-2 mx-auto p-2"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleSelect">Division : </label>
                      <select className="form-control" value={divisionId} onChange={(e) => { setdivisionId(e.target.value); handleDivision(e) }} id="class" name="class">

                        <option>Select</option>
                        {divisions.map(res => {
                          return <option value={res.id}>{res.name}</option>
                        })}
                      </select>

                    </div>
                  </div>
                  <div className={"col-sm-2 mx-auto p-2"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleSelect">District : </label>
                      <select className="form-control" value={districtId} onChange={(e) => { setdistrictId(e.target.value);handleDistrict(e) }} id="class" name="class">

                        <option>Select</option>
                        {districts.map(res => {
                          return <option value={res.id}>{res.name}</option>
                        })}
                      </select>

                    </div>
                  </div>
                  <div className={"col-sm-2 mx-auto p-2"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleSelect">Upazilla : </label>
                      <select className="form-control" value={upzilaId} onChange={(e) => setUpazilaId(e.target.value)} id="class" name="class">

                        <option>Select</option>
                        {upazilas.map(res => {
                          return <option value={res.name}>{res.name}</option>
                        })}
                      </select>

                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Street/Village : </label>
                      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Phone No. : </label>
                      <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Email : </label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='row pt-4'>
          <div className='col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-4'>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} className="card-title pt-2">School Head Details : </h3>
                  </div>
                </div>
              </div>

              <div className='card-body' >
                {/* id='list' */}

                <div className='row'>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">School Head Name: </label>
                      <input type="text" value={schoolHeadName} onChange={(e) => setSchoolHeadName(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Phone No : </label>
                      <input type="text" value={schoolHeadPhone} onChange={(e) => setSchoolHeadPhone(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Email : </label>
                      <input type="email" value={schoolHeadEmail} onChange={(e) => setSchoolHeadEmail(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Status : </label>
                      <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control">
                        <option value={0}>Select</option>
                        <option value={1}>Present</option>
                        <option value={2}>Absent</option>

                      </select>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-4'>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} className="card-title pt-2">School Admin Details : </h3>
                  </div>
                </div>
              </div>

              <div className='card-body' >
                {/* id='list' */}

                <div className='row'>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">School Admin Name : </label>
                      <select value={adminId} onChange={(e) => setAdminId(e.target.value)} className="form-control">
                        <option>Select</option>
                        {admins.map(res => {
                          return <option value={res.id}>{res.full_name}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Contact Person Name : </label>
                      <input type="text" value={ContactName} onChange={(e) => setContactName(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Contact Person Phone No : </label>
                      <input type="text" value={ContactPhone} onChange={(e) => setContactPhone(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className={"col-sm-2 p-2 mx-auto"}>
                    <div className="form-group">
                      <label className='pb-2' for="exampleInputEmail1">Contact Person Email</label>
                      <input type="email" value={ContactEmail} onChange={(e) => setContactEmail(e.target.value)} className="form-control" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='pt-2 mx-auto'>
          <button style={{ color: 'white', fontSize: '25px' }} type="button" className="btn bg-secondary bg-gradient py-2 px-5" onClick={handleSubmit}>Submit</button>
        </div>


        <section className='py-5'>
          <h2 style={{ color: 'white' }} className='px-5 py-2 bg-info bg-gradient'>School Information : </h2>
          <div className='table-responsive'>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">School Type</th>
                  <th scope="col">EIIN No.</th>
                  <th scope="col">School Name</th>
                  <th scope="col">School Short Name</th>
                  <th scope="col">Division</th>
                  <th scope="col">District</th>
                  <th scope="col">Upazilla</th>
                  <th scope="col">School Phone No.</th>
                  <th scope="col">School Email</th>
                  <th scope="col">School Head Name</th>
                  <th scope="col">S.Head Phone No</th>
                  <th scope="col">S.Head Email</th>
                  <th scope="col">School Admin Name</th>
                  <th scope="col"> School Admin Phone No</th>
                  <th scope="col"> School Admin Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {schools.map(res => {
                  let typeName = typies.find(resc => resc.id === res.type_id)
                  return <tr>

                    <td>{typeName?.type_name}</td>
                    <td>{res.eiin}</td>
                    <td>{res.school_name}</td>
                    <td>{res.short_name}</td>
                    <td>{res.address_division}</td>
                    <td>{res.address_district}</td>
                    <td>{res.address_upazila}</td>
                    <td>{res.school_phone}</td>
                    <td>{res.school_email}</td>
                    <td>{res.school_head_name}</td>
                    <td>{res.school_head_phone}</td>
                    <td>{res.school_head_email}</td>
                    <td>{res?.contact_person_name}</td>
                    <td>{res?.contact_person_phone}</td>
                    <td>{res?.contact_person_email}</td>
                    <td>{res?.status === "1" ? "Present" : "Absent"}</td>
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
          </div>
        </section>







      </div>
    </>
  );
};

export default AddNewSchool;