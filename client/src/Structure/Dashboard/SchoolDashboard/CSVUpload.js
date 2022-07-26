import React, { useState } from 'react'
import SchoolHeader from './schoolHeader/SchoolHeader'
import { toast } from 'react-toastify';

export default function CSVUpload() {
    const [option, setOption] = useState("");
    const [csvFile, setCsvFile] = useState("");
    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0])
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();   
        formData.append("file", csvFile);
        formData.append("option", option);
        
        fetch(`${process.env.REACT_APP_NODE_API}/api/csvUpload`, {
          method: "POST",
          headers: {
               authorization: "bearer " + localStorage.getItem("access_token"),
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((json) => {
            toast("CSV submitted successfully");
            console.log("ok",json);
            // navigate("/studenthomework");
          });
      };
    return (
        <>
            <SchoolHeader />
            <div className='container'    >
                <h2 className='text-center'>CSV Upload</h2>
                <h6>***Format Student: student_code,first_name,middle_name,last_name,mobile_no,gender_id,group_id,email,present_address, permanent_address,father_name,father_phone_number,mother_name,mother_phone_number,dob,blood_group,photo_id,school_info_id </h6>
                <h6>***Format Teacher: teacher_code,title,first_name,middle_name,last_name,initial,subject_code,designation,department,dob,blood_group,mpo_status,index_no,mobile,email,school_info_id </h6>
                <h6>***Format Routine: class_id, section_id, day_id, period_id,start_time,end_time, subject_id, teacher_id, room, school_info_id, session_id, shift_id </h6>
                <div className='row mt-6'>
                    <div className='col-sm-5'>
                        <select className='form-control' onClick={(e)=>setOption(e.target.value)}>
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
                        <button className='btn btn-success mt-1' onClick={handleSubmit} type="button">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
