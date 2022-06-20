import React from 'react';
import './Attendance.css';
import profile from '../../../../images/profile/profile.png'

const Attendance = () => {



   const handlelist = () => {
      document.getElementById("list").classList.toggle("active");
  }

    return (
        <section>
           <div className='content container pt-4'>

            <div className='row'>
                <div className='col-md-12'>
                  <div className="card card-dark collapsed-card">
                    <div className="card-header">
         <div className='d-flex justify-content-between px-4'>
         <div>
             <h2 style={{color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold'}} class="card-title text-info pt-2">Attendance</h2>
          </div>
       <div className="card-tools">
        <button onClick={handlelist} id="w-change-close" type="button" className="btn btn-tool active" data-card-widget="collapse"><i  className="fas fa-plus icons " />
           </button>
      </div>
         </div>
     </div>
     

     <div>
     <div className='row' id='list' style={{ padding: "20px", margin: "10px", background: "#fff", borderRadius: "5px" }}>

{/* <div className='col-2'>
   <img style={{ width: "50px" }} src={profile} alt=""/>
</div> */}
<div className='col-12 p-4 border'>
   <div style={{display: 'flex'}}>
      <h5 className='' style={{ textAlign: "left" , color: '#00CC99' }}>Sunday</h5>
      <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
      <h5 className='' style={{ textAlign: "left", color: '#00CC99' }}>1 April ,2022</h5>
   </div>
  
    <div style={{display: 'flex'}}>
    <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>First Period</h6>
      <h5 className='mx-2 text-warning' style={{ textAlign: "left",  }}> || </h5>
     <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>10:00 AM - 11:00 PM</h6>
    </div>
   <div style={{display: 'flex'}}>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>Subject : English</h6>
   <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
   <h6 className='' style={{ textAlign: "left" , color: '#00CC99' }}>Class : Seven</h6>
   </div>
   <div style={{display: 'flex'}}>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>Section : A</h6>
   <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99'  }}>Room : 110B</h6>
   </div>
   <div>
      <button type="button" class="btn btn-secondary">Take Attendance</button>
   </div>
   
</div>
<div className='col-12 p-4 border  border-top-0 border-right-0 border-left-0'>
   <div style={{display: 'flex'}}>
      <h5 className='' style={{ textAlign: "left" , color: '#00CC99' }}>Sunday</h5>
      <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
      <h5 className='' style={{ textAlign: "left", color: '#00CC99' }}>1 April ,2022</h5>
   </div>
  
    <div style={{display: 'flex'}}>
    <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>First Period</h6>
      <h5 className='mx-2 text-warning' style={{ textAlign: "left",  }}> || </h5>
     <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>10:00 AM - 11:00 PM</h6>
    </div>
   <div style={{display: 'flex'}}>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>Subject : English</h6>
   <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
   <h6 className='' style={{ textAlign: "left" , color: '#00CC99' }}>Class : Seven</h6>
   </div>
   <div style={{display: 'flex'}}>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>Section : A</h6>
   <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99'  }}>Room : 110B</h6>
   </div>
   <div>
      <button type="button" class="btn btn-secondary">Take Attendance</button>
   </div>
   
</div>
<div className='col-12 p-4 border  border-top-0 border-right-0 border-left-0'>
   <div style={{display: 'flex'}}>
      <h5 className='' style={{ textAlign: "left" , color: '#00CC99' }}>Sunday</h5>
      <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
      <h5 className='' style={{ textAlign: "left", color: '#00CC99' }}>1 April ,2022</h5>
   </div>
  
    <div style={{display: 'flex'}}>
    <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>First Period</h6>
      <h5 className='mx-2 text-warning' style={{ textAlign: "left",  }}> || </h5>
     <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>10:00 AM - 11:00 PM</h6>
    </div>
   <div style={{display: 'flex'}}>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>Subject : English</h6>
   <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
   <h6 className='' style={{ textAlign: "left" , color: '#00CC99' }}>Class : Seven</h6>
   </div>
   <div style={{display: 'flex'}}>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99' }}>Section : A</h6>
   <h5 className='mx-2 text-warning' style={{ textAlign: "left" }}> || </h5>
   <h6 className='' style={{ textAlign: "left", color: '#00CC99'  }}>Room : 110B</h6>
   </div>
   <div>
      <button type="button" class="btn btn-secondary">Take Attendance</button>
   </div>
   
</div>

</div>
     </div>

    {/* <div className='card-body ' id='list'>

        <div className='row'>

        <div class={"col-sm-2 mx-auto"}>
            <div class="form-group">
            <label style={{fontSize: '20px', fontWeight: 'bolder' }} className='p-2' for="exampleInputEmail1">Date : </label>
            <br/>
            <input type="date" class="form-control"/>
             </div>
         </div>

         <div class={"col-sm-2 mx-auto"}>
                <div class="form-group">
                    <label style={{fontSize: '20px', fontWeight: 'bolder' }} className='p-2' for="exampleSelect">Period : </label>
                    <select class="form-control" id="class" name="class">

                        <option>Select Period</option>
                        <option>First</option>
                        <option>Second</option>
                    </select>

                </div>
            </div>

           
           <div class={"col-sm-2 mx-auto"}>
                <div class="form-group">
                    <label style={{fontSize: '20px', fontWeight: 'bolder' }} className='p-2' for="exampleSelect">Subject : </label>
                    <select class="form-control" id="class" name="class">

                       <option>Select Subject</option>
                        <option>Bangla</option>
                        <option>English</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>Higher Mathematics	</option>
                        <option>Psychology</option>
                        <option>Geography</option>
                        <option>Statics</option>
                        <option>Chemistry</option>
                        <option>Information and Communication Technology</option>
                        
                    </select>

                </div>
            </div>
           <div class={"col-sm-2 mx-auto"}>
                <div class="form-group">
                    <label style={{fontSize: '20px', fontWeight: 'bolder' }} className='p-2' for="exampleSelect">Class : </label>
                    <select class="form-control" id="class" name="class">

                        <option>Select Class</option>
                        <option>K.G</option>
                        <option>Nursery</option>
                        <option>Play</option>
                        <option>One</option>
                        <option>Two</option>
                        <option>Three</option>
                        <option>Four</option>
                        <option>Five</option>
                        <option>Six</option>
                        <option>Seven</option>
                        <option>Eight</option>
                        <option>Nine</option>
                        <option>Ten</option>
                        <option>Eleven</option>
                        <option>Twelve</option>
                    </select>

                </div>
            </div>
           <div class={"col-sm-2 mx-auto"}>
                <div class="form-group">
                    <label style={{fontSize: '20px', fontWeight: 'bolder' }} className='p-2' for="exampleSelect">Section : </label>
                    <select class="form-control" id="class" name="class">

                        <option>Select Section</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>

                </div>
            </div>
           <div class={"col-sm-3 mx-auto"}>
                <div class="form-group py-2 px-2">
                 <button style={{fontSize: '24px'}} type="button" class="btn btn-secondary form-control">Take Attendance </button>

                </div>
            </div>
       </div>
   </div> */}

</div>
</div>
</div>




</div>
<div className="card card-primary mt-5 container">


<div className="card-body" style={{ background: "#EFEFEF", height: "", padding: "0" }}>
<div className='row'>
<div className='col-12 text-center'>
   <div className='row' style={{ padding: "20px", margin: "10px", background: "#fff", borderRadius: "5px" }}>

      <div className='col-2'>
         <img style={{ width: "50px" }} src={profile} alt=""/>
      </div>
      <div className='col-8'>
         <h5 className='ml-3' style={{ textAlign: "left" }}>Md. Siam Hasan</h5>
         <p className='ml-3' style={{ textAlign: "left" }}>Roll: 1</p>
         <p className='ml-3' style={{ textAlign: "left" }}>ID: 22221130455</p>
         <p className='ml-3' style={{ textAlign: "left" }}>Phone: 01886396116</p>
         
      </div>
      <div className='col-2'>
        <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
        </label>
      </div>
      
   </div>
</div>
<div className='col-12 text-center'>
   <div className='row' style={{ padding: "20px", margin: "10px", background: "#fff", borderRadius: "5px" }}>

      <div className='col-2'>
         <img style={{ width: "50px" }} src={profile} alt=""/>
      </div>
      <div className='col-8'>
         <h5 className='ml-3' style={{ textAlign: "left" }}>Md. Siam Hasan</h5>
         <p className='ml-3' style={{ textAlign: "left" }}>Roll: 1</p>
         <p className='ml-3' style={{ textAlign: "left" }}>ID: 22221130455</p>
         <p className='ml-3' style={{ textAlign: "left" }}>Phone: 01886396116</p>
         
      </div>
      <div className='col-2'>
        <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
        </label>
      </div>
      
   </div>
</div>
<div className='col-12 text-center'>
   <div className='row' style={{ padding: "20px", margin: "10px", background: "#fff", borderRadius: "5px" }}>

      <div className='col-2'>
         <img style={{ width: "50px" }} src={profile} alt=""/>
      </div>
      <div className='col-8'>
         <h5 className='ml-3' style={{ textAlign: "left" }}>Md. Siam Hasan</h5>
         <p className='ml-3' style={{ textAlign: "left" }}>Roll: 1</p>
         <p className='ml-3' style={{ textAlign: "left" }}>ID: 22221130455</p>
         <p className='ml-3' style={{ textAlign: "left" }}>Phone: 01886396116</p>
         
      </div>
      <div className='col-2'>
        <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
        </label>
      </div>
      
   </div>
</div>
<div className='col-12 text-center'>
   <div className='row' style={{ padding: "20px", margin: "10px", background: "#fff", borderRadius: "5px" }}>

      <div className='col-2'>
         <img style={{ width: "50px" }} src={profile} alt=""/>
      </div>
      <div className='col-8'>
         <h5 className='ml-3' style={{ textAlign: "left" }}>Md. Siam Hasan</h5>
         <p className='ml-3' style={{ textAlign: "left" }}>Roll: 1</p>
         <p className='ml-3' style={{ textAlign: "left" }}>ID: 22221130455</p>
         <p className='ml-3' style={{ textAlign: "left" }}>Phone: 01886396116</p>
         
      </div>
      <div className='col-2'>
        <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
        </label>
      </div>
      
   </div>
</div>
<div className='col-12 text-center'>
   <div className='row' style={{ padding: "20px", margin: "10px", background: "#fff", borderRadius: "5px" }}>

      <div className='col-2'>
         <img style={{ width: "50px" }} src={profile} alt=""/>
      </div>
      <div className='col-8'>
         <h5 className='ml-3' style={{ textAlign: "left" }}>Md. Siam Hasan</h5>
         <p className='ml-3' style={{ textAlign: "left" }}>Roll: 1</p>
         <p className='ml-3' style={{ textAlign: "left" }}>ID: 22221130455</p>
         <p className='ml-3' style={{ textAlign: "left" }}>Phone: 01886396116</p>
         
      </div>
      <div className='col-2'>
        <label class="custom-control custom-switch mt-3">
            <input type="checkbox"/>
            <span class=""></span>
        </label>
      </div>
      
   </div>
</div>
</div>
</div>
</div>
</section>
    );
};

export default Attendance;
