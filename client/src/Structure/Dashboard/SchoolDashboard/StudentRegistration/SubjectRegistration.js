import React from 'react'
import profile from '../../../images/profile/profile.png'

const SubjectRegistration = () => {
  return (
  <>
    <div style={{height: '80px', backgroundColor: ''}} className='bg-info'>
         <div style={{display: 'flex' , justifyContent: 'space-between'}} className='container'>
           {/* <div>
             <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
           </div> */}
            <div class="dropdown">
              <button style={{ padding: '0px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img style={{ width: "50px" }} className='' src={profile} alt="logo"/>
              </button>
              <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton">
                 <a style={{color: 'tomato'}} class="dropdown-item " href="">Profile</a>
                 <a style={{color: 'tomato'}} class="dropdown-item" href="#">LogOut</a>
            </div>
           </div>
           <div>
              <h3 className='pt-1' style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}}>School Name</h3>
              <h4 className='' style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}}>School Id</h4>
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
                 <h3 style={{color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold'}} class="card-title py-2">Subject Registration</h3>
              </div>
           <div className="card-tools">
           
              
          </div>
             </div>
         </div>

        <div className='card-body' >
       

            <div className='row'>


            <div class={"col-sm-6 mx-auto p-2"}>
                            <div class="form-group">
                                <label  className='pb-2' for="exampleSelect">Session :</label>
                                <select style={{border: '1px solid blue'}} class="form-control" id="class" name="class">

                                    <option>Select Session</option>
                                    <option>2022</option>
                                    <option>2021</option>
                                    <option>2020</option>
                                </select>

                            </div>
                        </div>
                <div class={"col-sm-6 p-2 mx-auto"}>
                <div class="form-group">
                                <label  className='pb-2' for="exampleSelect">Class: </label>
                                <select style={{border: '1px solid blue'}} class="form-control" id="class" name="class">

                                    <option>Select Class</option>
                                    <option>KG</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>

                            </div>
                </div>
                <div class={"col-sm-6 p-2 mx-auto"}>
                <div class="form-group">
                                <label  className='pb-2' for="exampleSelect">Group : </label>
                                <select style={{border: '1px solid blue'}} class="form-control" id="class" name="class">

                                    <option>Select Group</option>
                                    <option>Science</option>
                                </select>

                            </div>
                </div>
               <div class={"col-sm-6 p-2 mx-auto"}>
               <div class="form-group">
                                <label  className='pb-2' for="exampleSelect">Section: </label>
                                <select style={{border: '1px solid blue'}} class="form-control" id="class" name="class">

                                    <option>Select Section</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>

                            </div>
                </div>
               <div class={"col-sm-2 p-2 mx-auto"}>
                  <div  className='pt-2 mx-auto'>
                    <button style={{color: 'white', fontSize: '20px', backgroundColor:'LightSeaGreen' }} type="button" class="btn bg-gradient px-5">Search</button>
                  </div>
                </div>
               

           </div>
       </div>
    
 </div>
</div>
   </div>

   <section className='py-5'>
     <h2 style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}} className='px-3 py-2 bg-info bg-gradient'>Student Details</h2>

  <table class="table table-striped">
<thead>
<tr>
   <th scope="col">
       <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class="px-2">Select All</span>
        </label>
   </th>
   <th scope="col">Student ID</th>
   <th scope="col">Student Name</th>
</tr>
</thead>
<tbody>

  <tr>
    <td>
    <th  scope="col">
    <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
      </label>
   </th>
    </td>
    <td>68686765</td>
    <td>shfgakjashkj</td>
  </tr>
  <tr>
    <td>
    <th  scope="col">
    <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
      </label>
   </th>
    </td>
    <td>68686765</td>
    <td>shfgakjashkj</td>
  </tr>
  <tr>
    <td>
    <th  scope="col">
    <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
      </label>
   </th>
    </td>
    <td>68686765</td>
    <td>shfgakjashkj</td>
  </tr>




</tbody>
</table>
   </section>


   <section className='py-5'>
     <h2 style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}} className='px-3 py-2 bg-info bg-gradient'>Subject</h2>

  <table class="table table-striped">
<thead>
<tr>
   <th scope="col">
       <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class="px-2">Select All</span>
        </label>
   </th>
   <th scope="col">Subject Code</th>
   <th scope="col">Subject Name</th>
</tr>
</thead>
<tbody>

  <tr>
    <td>
    <th  scope="col">
    <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
      </label>
   </th>
    </td>
    <td>68686765</td>
    <td>Bangla</td>
  </tr>
  <tr>
    <td>
    <th  scope="col">
    <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
      </label>
   </th>
    </td>
    <td>68686765</td>
    <td>English</td>
  </tr>
</tbody>
</table>
   </section>

   <section className='pt-5'>
     <h2 style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}} className='px-3 py-2 bg-info bg-gradient'>4th Subject</h2>

  <table class="table table-striped">
<thead>
<tr>
   <th scope="col">
       <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class="px-2">Select All</span>
        </label>
   </th>
   <th scope="col">Subject Code</th>
   <th scope="col">Subject Name</th>
</tr>
</thead>
<tbody>

  <tr>
    <td>
    <th  scope="col">
    <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
      </label>
   </th>
    </td>
    <td>68686765</td>
    <td>Bangla</td>
  </tr>
  <tr>
    <td>
    <th  scope="col">
    <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
      </label>
   </th>
    </td>
    <td>68686765</td>
    <td>English</td>
  </tr>
</tbody>
</table>
   </section>

   <div class={"col-sm-2 p-2 mx-auto"}>
      <div  className='pt-2 mx-auto'>
        <button style={{color: 'white', fontSize: '20px', backgroundColor:'LightSeaGreen' }} type="button" class="btn bg-gradient px-5">Submit</button>
      </div>
    </div>



   <div className='pt-5'>
      <h2 style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}} className='px-3 py-2 bg-info '>Subject Registration Details</h2>

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
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>4001</td>
      <td>2022</td>
      <td>Six</td>
      <td>Science</td>
      <td>A</td>
      <td>21311</td>
      <td>dgfdsfsd</td>
      <td> <button style={{color: 'white', border: 'none'}} className='bg-success p-1'>Edit</button></td>
      <td><button style={{color: 'white',  border: 'none'}} className='bg-danger p-1'>Delete</button></td>

    </tr>
</tbody>
</table>
    </div>

   <div className='py-5'>
      <h2 style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}} className='px-3 py-2 bg-info '>4th Subject Registration Details</h2>

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
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>4001</td>
      <td>2022</td>
      <td>Six</td>
      <td>Science</td>
      <td>A</td>
      <td>21311</td>
      <td>dgfdsfsd</td>
      <td> <button style={{color: 'white', border: 'none'}} className='bg-success p-1'>Edit</button></td>
      <td><button style={{color: 'white',  border: 'none'}} className='bg-danger p-1'>Delete</button></td>

    </tr>
</tbody>
</table>
    </div>
    </div>
  </>
  )
}

export default SubjectRegistration