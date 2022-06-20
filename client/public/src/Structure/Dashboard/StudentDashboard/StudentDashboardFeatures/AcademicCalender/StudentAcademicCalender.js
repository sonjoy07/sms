import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import profile from '../../../../images/profile/profile.png';
import StudentHeader from "../../StudentHeader";

const StudentAcademicCalender = () => {
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [school_id, setSchool_type] = useState(localStorage.getItem("school_id"));
  const [calender, setcalender] = useState([])
  const [student, setStudent] = useState([]);
  const checkLoggedIn = () => {
    if (user_type != 1) {
      Navigate('/login')
    }
  }
  useEffect(() => {
    checkLoggedIn()
  }, [])


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setStudent(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NODE_API}/api/calender/student?school_info_id=${school_id}`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }
    ).then((response) => {
      setcalender(response.data);
      console.log(calender)
    });
  }, []);
  return (
    <div>
      <StudentHeader />
      <div className="container pt-4">
        {/* <div className='row'>
       <div className='col-md-12'>
           <div className="card card-dark collapsed-card">
           <div className="card-header">
             <div className='d-flex justify-content-between px-4'>
             <div>
                 <h3 style={{color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold'}} class="card-title py-2">Academic Calender</h3>
              </div>
           <div className="card-tools">
           
              
          </div>
             </div>
         </div>

        <div className='card-body' >
       

            <div className='row'>

               

               <div class={"col-sm-4 p-2 mx-auto"}>
                    <div class="form-group">
                       <label className='pb-2' for="exampleInputEmail1">Schedule Type : </label>
                        <input type="text" class="form-control"/>
                     </div>
                </div>
               <div class={"col-sm-4 p-2 mx-auto"}>
                    <div class="form-group">
                       <label className='pb-2' for="exampleInputEmail1">Schedule Date : </label>
                        <input type="text" class="form-control"/>
                     </div>
                </div>
               <div class={"col-sm-2 p-2 mx-auto"}>
                  <div  className='pt-2 mx-auto'>
                    <button style={{color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                  </div>
                </div>
               

           </div>
       </div>
    
 </div>
</div>
   </div> */}

        <section className="py-5">
          <h2
            style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}
            className="px-3 py-2 bg-info bg-gradient"
          >
            Organization Information
          </h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Schedule Type</th>
                <th scope="col">Schedule Date</th>
              </tr>
            </thead>
            <tbody>
              {calender.map((info) => {


                return (
                  <tr key={info.id}>
                    <td style={{ textAlign: 'center' }}>{info.topics}</td>
                    <td style={{ textAlign: 'center' }}>{info.date}</td>

                  </tr>
                )
              })
              }
            </tbody>
          </table>

        </section>
      </div>
    </div>
  );
};

export default StudentAcademicCalender;
