import React from 'react'
import library from '../../../images/icons/library.png'
import ebook from '../../../images/icons/ebook.png'
import link from '../../../images/icons/link.png'
import profile from "../../../images/profile/profile.png";

const TeacherResources = () => {
  return (
    <div>

     <div style={{height: '80px', backgroundColor: ''}} className='bg-info'>
         <div style={{display: 'flex' , justifyContent: 'space-between'}} className='container'>
           {/* <div>
             <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
           </div> */}
            <div class="dropdown">
              <button style={{ padding: '0px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img style={{ width: "50px" }} className='' src={profile} alt="profile"/>
              </button>
              <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton">
                 <a style={{color: 'tomato'}} class="dropdown-item " href="/teacherprofile">Profile</a>
                 <a style={{color: 'tomato'}} class="dropdown-item" href="#">LogOut</a>
            </div>
           </div>
           <div>
              <h3 className='pt-1' style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}}>Name: Teacher Name</h3>
              <h4 className='' style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}}>Id : Teacher Id</h4>
           </div>
        </div>
    </div>

    <section class="container mt-5 pt-2">
    <h2 style={{color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold'}} className='mt-4'>Resource</h2>
    <div class="row mx-auto mt-4">
    <a href='/teacherlibrary' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
        <div class="card bg-light shadow-sm">
           <div class="card-body py-4">
           <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                   <div className='px-3'>
                      <img style={{width:'64px', height:'64px'}} src={library} alt=""/>
                   </div>
                   <div className='px-3'>
                     <h4 class="card-title">Library</h4>
                   </div>
               </div>
             
           </div>
        </div>
      </a>
    <a href='/teacherebook' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
        <div class="card bg-light shadow-sm">
           <div class="card-body py-4">
           <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                   <div className='px-3'>
                      <img style={{width:'64px', height:'64px'}} src={ebook} alt=""/>
                   </div>
                   <div className='px-3'>
                     <h4 class="card-title">eBook</h4>
                   </div>
               </div>
             
           </div>
        </div>
      </a>
    <a href='/teacherimportantlink' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
        <div class="card bg-light shadow-sm">
           <div class="card-body py-4">
           <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                   <div className='px-3'>
                      <img style={{width:'64px', height:'64px'}} src={link} alt=""/>
                   </div>
                   <div className='px-3'>
                     <h4 class="card-title">Important Link</h4>
                   </div>
               </div>
             
           </div>
        </div>
      </a>



        
    </div>
    
    </section>
    </div>
  )
}

export default TeacherResources