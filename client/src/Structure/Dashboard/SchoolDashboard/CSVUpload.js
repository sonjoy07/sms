import React, { useState } from 'react'
import SchoolHeader from './schoolHeader/SchoolHeader'

export default function CSVUpload() {
    const [csvFile, setCsvFile] = useState();
    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0])
        const formData = new FormData();
        formData.append('name', "FILENAME");
        formData.append('file', csvFile);
        fetch(`${process.env.REACT_APP_NODE_API}/api/csvUpload`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: "bearer " + localStorage.getItem("access_token"),
            },            
            body: formData,
         })
         .then((res) => res.json())
         .then((json) => {
            alert('New Schedule Added')
            console.log("ok");
         });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", attachment_link);
        formData.append("fileName", attachment_link.name);
        formData.append("student_id", student_id);
        formData.append("homework_id", homework_id);
        formData.append("submission_time", submission_time);
        fetch(`${process.env.REACT_APP_NODE_API}/api/activities/submit`, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((json) => {
            toast("Activities submitted successfully");
            console.log("ok",json);
            // navigate("/studenthomework");
          });
      };
    return (
        <>
            <SchoolHeader />
            <div className='container'    >
                <h2 className='text-center'>CSV Upload</h2>
                <h6>***Format Student: Student code,First Name,Middle Name,Last Name,Mobile No,Gender(Male,Female),Group(ex: science),Email,Present Address,Permanent Address,Father Name,Father Phone No,Mother Name,Mother Phone No,DOB,Blood Group,Photo,School Name </h6>
                <div className='row mt-6'>
                    <div className='col-sm-5'>
                        <select className='form-control'>
                            <option value="">Select</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="routine">Routine</option>
                        </select>
                    </div>
                    <div className='col-sm-5'>
                        <input type={'file'} onChange={handleFileChange} className="form-control" />
                    </div>
                    <div className='col-sm-2'>
                        <button className='btn btn-success mt-1' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
