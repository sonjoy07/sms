import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import profile from '../../../images/profile/profile.png'

const SubjectRegistration = () => {
  const [clses, setClses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSujects] = useState([]);
  const [forthSubjects, setForthSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [class_id, setClass_id] = useState(0);
  const [section_id, setSection_id] = useState(0);
  const [group_id, setGroup_id] = useState(0);
  const [session_id, setSession_id] = useState("");
  const [checkedStudentAll, setCheckedStudentAll] = useState(false);
  const [checkedStudent, setCheckedStudent] = useState([]);
  const [checkedSubjectAll, setCheckedSubjectAll] = useState(false);
  const [checkedSubject, setCheckedSubject] = useState([]);
  const [checkedForthAll, setCheckedForthAll] = useState(false);
  const [checkedForth, setCheckedForth] = useState([]);
  const [forthSubjectsList, setForthSubjectsList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [reset, setReset] = useState(0)
  const [id, setId] = useState(0)
  const [start_forth_date, setStart_forth_date] = useState(null);
  const [end_forth_date, setEnd_forth_date] = useState(null);

  const toggleCheckStudent = (inputName) => {
    setCheckedStudent((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const selectStudentAll = (value) => {
    setCheckedStudentAll(value);
    setCheckedStudent((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };

  const selectSubjectAll = (value) => {
    setCheckedSubjectAll(value);
    setCheckedSubject((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };
  const toggleCheckSubject = (inputName) => {
    setCheckedSubject((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };
  const toggleCheckForth = (inputName) => {
    setCheckedForth((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const selectForthAll = (value) => {
    setCheckedForthAll(value);
    setCheckedForth((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${localStorage.getItem('school_type')}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setClses(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/groups/all`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setGroups(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/session`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSessions(response.data);
      });

  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/forthSubjectList`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setForthSubjectsList(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/subjectList`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSubjectsList(response.data);
      });
  }, [reset])
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/section/all`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSections(response.data);
      });
  }, [class_id]);

  const handleSearch = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/search/subjects?section_id=${section_id}&&class_id=${class_id}&&session_id=${session_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        let list = []
        for (const inputName in response.data) {
          list[inputName] = false;
        }
        setSujects(response.data);
        setCheckedSubject(list)
        setForthSubjects(response.data);
        setCheckedForth(list)
      });
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/student/admin-search?section_id=${section_id}&&class_id=${class_id}&&session_id=${session_id}&&group_id=${group_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        let list = []
        for (const inputName in response.data) {
          list[inputName] = false;
        }
        setStudents(response.data);
        setCheckedStudent(list)
      });
  }
  const handleSubmit = () => {
    let studentChecked = students.filter((res, index) => {
      if (checkedStudent[index] === true) {
        return res
      }
    })
    let subjectChecked = subjects.filter((res, index) => {
      if (checkedSubject[index] === true) {
        return res
      }

    })
    let forthChecked = forthSubjects.filter((res, index) => {
      if (checkedForth[index] === true) {
        return res
      }

    })

    fetch(`${process.env.REACT_APP_NODE_API}/api/save/subjectRegistration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        studentChecked: studentChecked,
        subjectChecked: subjectChecked,
        forthChecked: forthChecked,
        school_info_id: localStorage.getItem('school_info_id'),
        id: id
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // resetForm()
        setReset(reset + 1)
        if (id === '') {
          setCheckedForth([])
          setCheckedStudent([])
          setCheckedSubject([])
          setCheckedForthAll(false)
          setCheckedStudentAll(false)
          setCheckedSubjectAll(false)
          setId('')
          toast('Subject Registration saved successfully')
        } else {
          toast('Routine updated successfully')
        }
      });
  }

  let handleClassChange = (e) => {
    setClass_id(e.target.value);
  };
  let handleSectionChange = (e) => {
    setSection_id(e.target.value);
  };
  let handleGroupChange = (e) => {
    setGroup_id(e.target.value);
  };

  let handleSessionChange = (e) => {
    setSession_id(e.target.value);
  };
  const searchSubject = () => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/subjectList?start_date=${start_date}&&end_date=${end_date}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSubjectsList(response.data);
      });
  }
  const searchForthSubject = () => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/forthSubjectList?start_date=${start_date}&&end_date=${end_date}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setForthSubjectsList(response.data);
      });
  }
  const deleteSubjcet = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/subRegistration/delete?id=${id}`)
      if (result) {
        setReset(reset + 1)
        toast("Subjcet deleted successfully");
      }
    }
  }
  const deleteForthSubjcet = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/forthSubject/delete?id=${id}`)
      if (result) {
        setReset(reset + 1)
        toast("Subjcet Forth deleted successfully");
      }
    }
  }

  const editSubject = (info) => {
    // const class_id = info.class_id
    // const section_id = info.section_id
    // const session_id = info.session_id
    // setId(info.id)
    // axios
    //   .get(
    //     `${process.env.REACT_APP_NODE_API}/api/student/admin-search?section_id=${section_id}&&class_id=${class_id}&&session_id=${session_id}&&group_id=${group_id}`,
    //     {
    //       headers: {
    //         authorization: "bearer " + localStorage.getItem("access_token"),
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     let list = []
    //     for (const inputName in response.data) {
    //       if (response.data[inputName].student_id === info.student_id) {
    //         list[inputName] = true;
    //       } else {
    //         list[inputName] = false;
    //       }
    //     }
    //     setStudents(response.data);
    //     setCheckedStudent(list)
    //   });
    // axios
    //   .get(
    //     `${process.env.REACT_APP_NODE_API}/api/search/subjects?section_id=${section_id}&&class_id=${class_id}&&session_id=${session_id}`,
    //     {
    //       headers: {
    //         authorization: "bearer " + localStorage.getItem("access_token"),
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     let list = []
    //     for (const inputName in response.data) {
    //       if (response.data[inputName].subject_id === info.subject_id) {
    //         list[inputName] = true;
    //       } else {
    //         list[inputName] = false;
    //       }
    //     }
    //     setSujects(response.data);
    //     setCheckedSubject(list)
    //   });

  }

  // const edit

  return (
    <>
      <div style={{ height: '80px', backgroundColor: '' }} className='bg-info'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='container'>
          {/* <div>
             <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
           </div> */}
          <div class="dropdown">
            <button style={{ padding: '0px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img style={{ width: "50px" }} className='' src={profile} alt="logo" />
            </button>
            <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton">
              <a style={{ color: 'tomato' }} class="dropdown-item " href="">Profile</a>
              <a style={{ color: 'tomato' }} class="dropdown-item" href="#">LogOut</a>
            </div>
          </div>
          <div>
            <h3 className='pt-1' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>School Name</h3>
            <h4 className='' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>School Id</h4>
          </div>
        </div>
      </div>

      <div className='container pt-4'>
        <div className='row'>
          <div className='col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-1'>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2">Subject Registration</h3>
                  </div>
                  <div className="card-tools">


                  </div>
                </div>
              </div>

              <div className='card-body' >


                <div className='row'>


                  <div class={"col-sm-6 mx-auto p-2"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Session :</label>
                      <select style={{ border: '1px solid blue' }} class="form-control"
                        value={session_id}
                        onChange={handleSessionChange} id="class" name="class">

                        <option>Select Session</option>
                        {sessions.map((sessionJSON) => {
                          return (
                            <option value={sessionJSON.id}>
                              {sessionJSON.session_year}
                            </option>
                          );
                        })}
                      </select>

                    </div>
                  </div>
                  <div class={"col-sm-6 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Class: </label>
                      <select style={{ border: '1px solid blue' }} class="form-control"
                        value={class_id}
                        onChange={handleClassChange} id="class" name="class">

                        <option>Select Class</option>
                        {clses.map((classJSON) => {
                          return (
                            <option value={classJSON.id}>
                              {classJSON.class_name}
                            </option>
                          );
                        })}
                      </select>

                    </div>
                  </div>
                  <div class={"col-sm-6 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Group : </label>
                      <select style={{ border: '1px solid blue' }} class="form-control"
                        value={group_id}
                        onChange={handleGroupChange} id="class" name="class">

                        <option>Select Group</option>
                        {groups.map((classJSON) => {
                          return (
                            <option value={classJSON.id}>
                              {classJSON.division_name}
                            </option>
                          );
                        })}
                      </select>

                    </div>
                  </div>
                  <div class={"col-sm-6 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Section: </label>
                      <select style={{ border: '1px solid blue' }} class="form-control"
                        value={section_id}
                        onChange={handleSectionChange} id="class" name="class">

                        <option>Select Section</option>
                        {sections.map((sectionJSON) => {
                          return (
                            <option value={sectionJSON.id}>
                              {sectionJSON.section_default_name}
                            </option>
                          );
                        })}
                      </select>

                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div className='pt-2 mx-auto'>
                      <button style={{ color: 'white', fontSize: '20px', backgroundColor: 'LightSeaGreen' }} type="button" onClick={handleSearch} class="btn bg-gradient px-5">Search</button>
                    </div>
                  </div>


                </div>
              </div>

            </div>
          </div>
        </div>

        <section className='py-5'>
          <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Student Details</h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <label class="custom-control custom-switch mt-3">
                    <input type="checkbox" onChange={(event) => selectStudentAll(event.target.checked)}
                      checked={checkedStudentAll} />
                    <span class="px-2">Select All</span>
                  </label>
                </th>
                <th scope="col">Student ID</th>
                <th scope="col">Student Name</th>
              </tr>
            </thead>
            <tbody>

              {students.map((res, index) => {
                return <tr>
                  <th scope="col">
                    <label class="custom-control custom-switch mt-3">
                      <input type="checkbox"
                        onChange={() => toggleCheckStudent(index)}
                        checked={checkedStudent[index]} />
                      <span class=""></span>
                    </label>
                  </th>
                  <td>{res.student_code}</td>
                  <td>{res.full_name}</td>
                </tr>
              })}
            </tbody>
          </table>
        </section>


        <section className='py-5'>
          <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Subject</h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <label class="custom-control custom-switch mt-3">
                    <input type="checkbox" onChange={(event) => selectSubjectAll(event.target.checked)}
                      checked={checkedSubjectAll} />
                    <span class="px-2">Select All</span>
                  </label>
                </th>
                <th scope="col">Subject Code</th>
                <th scope="col">Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 && subjects.map((res, index) => {
                return <tr>
                  <td>
                    <th scope="col">
                      <label class="custom-control custom-switch mt-3">
                        <input type="checkbox" onChange={() => toggleCheckSubject(index)}
                          checked={checkedSubject[index]} />
                        <span class=""></span>
                      </label>
                    </th>
                  </td>
                  <td>{res.subject_code}</td>
                  <td>{res.subject_name}</td>
                </tr>
              })}

            </tbody>
          </table>
        </section>

        <section className='pt-5'>
          <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>4th Subject</h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <label class="custom-control custom-switch mt-3">
                    <input type="checkbox" onChange={(event) => selectForthAll(event.target.checked)}
                      checked={checkedForthAll} />
                    <span class="px-2">Select All</span>
                  </label>
                </th>
                <th scope="col">Subject Code</th>
                <th scope="col">Subject Name</th>
              </tr>
            </thead>
            <tbody>

              {forthSubjects.length > 0 && forthSubjects.map((res, index) => {
                return <tr>
                  <td>
                    <th scope="col">
                      <label class="custom-control custom-switch mt-3">
                        <input type="checkbox"
                          onChange={() => toggleCheckForth(index)}
                          checked={checkedForth[index]} />
                        <span class=""></span>
                      </label>
                    </th>
                  </td>
                  <td>{res.subject_code}</td>
                  <td>{res.subject_name}</td>
                </tr>
              })}

            </tbody>
          </table>
        </section>

        <div class={"col-sm-2 p-2 mx-auto"}>
          <div className='pt-2 mx-auto'>
            <button style={{ color: 'white', fontSize: '20px', backgroundColor: 'LightSeaGreen' }} type="button" class="btn bg-gradient px-5" onClick={handleSubmit}>Submit</button>
          </div>
        </div>



        <div className='pt-5'>
          <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info '>Subject Registration Details</h2>
          <div className='row'>
            <div class={"col-sm-4 p-2 mx-auto"}>
              <div class="form-group">
                <input
                  placeholder='Start Date'
                  onChange={(e) => setStart_date(e.target.value)}
                  type="date"
                  value={start_date}
                  class="form-control" />
              </div>
            </div>
            <div class={"col-sm-4 p-2 mx-auto"}>
              <div class="form-group">
                <input
                  placeholder='End Date'
                  onChange={(e) => setEnd_date(e.target.value)}
                  value={end_date}
                  type="date"
                  class="form-control" />
              </div>
            </div>
            <div class={"col-sm-4"}>
              <div class="form-group">
                <button className='btn btn-success mt-2' onClick={searchSubject}>Search</button>
              </div>
            </div>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Session</th>
                <th scope="col">class</th>
                <th scope="col">Group</th>
                <th scope="col">Section</th>
                <th scope="col">Student Id</th>
                <th scope="col">Subject</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {subjectsList.map(res => {
                return <tr>
                  <td>{res.id}</td>
                  <td>{res.session_year}</td>
                  <td>{res.class_name}</td>
                  <td>{res.division_name}</td>
                  <td>{res.section_default_name}</td>
                  <td>{res.student_code}</td>
                  <td>{res.subject_name}</td>
                  <td><button onClick={() => deleteSubjcet(res.id)} style={{ color: 'white', border: 'none' }} className='bg-danger p-1'>Delete</button></td>

                </tr>
              })}
            </tbody>
          </table>
        </div>

        <div className='py-5'>
          <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info '>4th Subject Registration Details</h2>
          <div className='row'>
            <div class={"col-sm-4 p-2 mx-auto"}>
              <div class="form-group">
                <input
                  placeholder='Start Date'
                  onChange={(e) => setStart_forth_date(e.target.value)}
                  type="date"
                  value={start_forth_date}
                  class="form-control" />
              </div>
            </div>
            <div class={"col-sm-4 p-2 mx-auto"}>
              <div class="form-group">
                <input
                  placeholder='End Date'
                  onChange={(e) => setEnd_forth_date(e.target.value)}
                  value={end_forth_date}
                  type="date"
                  class="form-control" />
              </div>
            </div>
            <div class={"col-sm-4"}>
              <div class="form-group">
                <button className='btn btn-success mt-2' onClick={searchForthSubject}>Search</button>
              </div>
            </div>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Session</th>
                <th scope="col">class</th>
                <th scope="col">Group</th>
                <th scope="col">Section</th>
                <th scope="col">Student Id</th>
                <th scope="col">Subject</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {forthSubjectsList.map(res => {
                return <tr>
                  <td>{res.id}</td>
                  <td>{res.session_year}</td>
                  <td>{res.class_name}</td>
                  <td>{res.division_name}</td>
                  <td>{res.section_default_name}</td>
                  <td>{res.student_code}</td>
                  <td>{res.subject_name}</td>
                  <td><button onClick={() => deleteForthSubjcet(res.id)} style={{ color: 'white', border: 'none' }} className='bg-danger p-1'>Delete</button></td>

                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SubjectRegistration