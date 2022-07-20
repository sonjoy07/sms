import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TeacherHeader from '../../TeacherHeader/TeacherHeader';

const ExtraDetails = () => {
    const [homework, setHomework] = useState([]);
    useEffect(() => {
      const home_work_id = localStorage.getItem("activityid")
      axios
        .get(
          `${process.env.REACT_APP_NODE_API}/api/activities/teacher/submitlist?home_work_id=${home_work_id}`,
          {
            headers: {
              authorization: "bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
            debugger;
          setHomework(response.data);
        });
    }, []);
    return (<><TeacherHeader/>
        <section className='py-3 container'>
            <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Student Extra Curriculum : </h2>

            <table class="table table-striped">
                <thead>
                    <tr>
                        {/* <th scope="col">School Code</th> */}
                        <th scope="col">Student ID</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Class</th> */}
                        {/* <th scope="col">Section</th> */}
                        <th scope="col">Status</th>
                        <th scope="col">Submission Date</th>
                        <th scope="col">Extra Curriculum File</th>
                    </tr>
                </thead>
                <tbody>
                    {homework.map(res => {
                        return <tr>
                            {/* <td>{res.school_code}</td> */}
                            <td>{res.student_code}</td>
                            <td>{res.full_name}</td>
                            {/* <td>{res.class_name}</td>
                            <td>{res.section_default_name}</td> */}
                            <td>Submit</td>
                            <td> {moment(res.submission_time).format("DD-MM-YYYY")}</td>
                            <td style={{ color: 'blue' }}><Link style={{ color: "blue" }} target="_blank" to={`${process.env.REACT_APP_NODE_API}/uploads/${res.attachment_link}`} download>{res.attachment_link}</Link></td>
                        </tr>
                    })}




                </tbody>
            </table>
        </section>
        </>
    )
}

export default ExtraDetails