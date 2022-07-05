import React, { useTransition } from 'react';
import SuperAdminHeader from '../../SuperAdminHeader';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateExamType = () => {
    const [type,setType] = useState("")
    const [typeList, setTypeList] = useState([])
    const [id, setId]= useState('')
    const [reset, setReset]= useState(0)

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_info_check`,
      {
          headers: {
              authorization: "bearer " + localStorage.getItem("access_token"),
          },
      }).then((response) => {
        setTypeList(response.data);
      });
    },[reset])
    const handleSubmit = ()=>{
      fetch(`${process.env.REACT_APP_NODE_API}/api/exam_type`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: "bearer " + localStorage.getItem("access_token"),
            },

            body: JSON.stringify({
              type: type,
              id: id
            }),
         })
         .then((res) => res.json())
         .then((json) => {
            toast('Exam Type updated Successfully')
         });

      setId('')
      setType('')
      setReset(reset+1)
    }
    return (
      <>
      <SuperAdminHeader/>
        <div className='container pt-4'>
            <div className='row'>
               <div className='col-md-12'>
                   <div className="card card-dark collapsed-card">
                   <div className="card-header">
                     <div className='d-flex justify-content-between px-4'>
                     <div>
                         <h3 style={{color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold'}} class="card-title pt-2">Exam Type : </h3>
                      </div>
                   <div className="card-tools">
                    {/* <button  id="w-change-close" type="button" className="btn btn-tool" data-card-widget="collapse"><i  className="fas fa-plus icons" />
                       </button> */}
                       {/* onClick={handlelist} */}
                       {/* active */}
                  </div>
                     </div>
                 </div>

                <div className='card-body' >
                {/* id='list' */}

                    <div className='row'>

                       

                       <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                               <label className='pb-2' for="exampleInputEmail1">Type : </label>
                                <input type="text" onChange={(e)=>setType(e.target.value)} value={type} class="form-control"/>
                             </div>
                        </div>
                       <div class={"col-sm-2 p-2 mx-auto"}>
                       <div  className='pt-2 mx-auto'>
                            <button style={{color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSubmit}>Submit</button>
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
             <h2 style={{color: 'white'}} className='px-3 py-2 bg-info bg-gradient'>Create New Class</h2>

          <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Exam Code</th>
      <th scope="col">Exam Name</th>
      <th scope="col">Edit/Delete</th>
    </tr>
  </thead>
  <tbody>

    {typeList.map(res=>{ return <tr>
      
      <td>{res.exam_code}</td>
      <td>{res.exam_name}</td>
      <td>
         <div className='.d-flex'>
           <div>
             <button style={{color: 'white'}} onClick={()=>{setId(res.id);setType(res.exam_name)}} className='bg-success'>Edit</button>
           </div>
         </div>
      </td>
    </tr>})}
    
      
      

  </tbody>
</table>
           </section>
        </div></>
    );
};

export default CreateExamType;