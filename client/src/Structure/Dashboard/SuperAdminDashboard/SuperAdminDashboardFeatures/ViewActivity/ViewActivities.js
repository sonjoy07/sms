import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewActivities = () => {
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [student, setStudent] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [homework, setHomework] = useState([]);
    const [class_id, setClass_id] = useState("");
    const [section_id, setSection_id] = useState("");
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
                setClass_id(response.data[0].class_id)
                setSection_id(response.data[0].section_id)
                axios
                    .get(
                        `${process.env.REACT_APP_NODE_API}/api/activities/student?section_id=${response.data[0].section_id}&&school_info_id=${response.data[0].school_info_id}&&session_id=${response.data[0].session_id}&&class_id=${response.data[0].class_id}`,
                        {
                            headers: {
                                authorization: "bearer " + localStorage.getItem("access_token"),
                            },
                        }
                    )
                    .then((response) => {
                        setHomework(response.data);
                    });
            });
    }, []);
    return (
        <section className='py-3 container'>
            <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Student Activities : </h2>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">School Code</th>
                        <th scope="col">Student ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Section</th>
                        <th scope="col">Status</th>
                        <th scope="col">Submission Date</th>
                        <th scope="col">Activities File</th>
                    </tr>
                </thead>
                <tbody>
                    {homework.map(res => {
                        return <tr>
                            <td>{res.school_code}</td>
                            <td>{'0132874777'}</td>
                            <td>Tasmi Jahan</td>
                            <td>{res.class_name}</td>
                            <td>{res.section_default_name}</td>
                            <td>Submit</td>
                            <td>10 Feb 2022 </td>
                            <td style={{ color: 'blue' }}>Open File</td>
                        </tr>
                    })}




                </tbody>
            </table>
        </section>
    )
}

export default ViewActivities