import React from 'react'
import profile from '../../../images/profile/profile.png';
import link from '../../../images/icons/link.png'

const TeacherImportantLink = () => {
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
    <h2 style={{color: 'Blue', display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold'}} className='mt-4'>Important Link</h2>
    <div class="row mx-auto mt-4">
    <a href='https://www.10minuteschool.com/' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
        <div class="card bg-light shadow-sm">
           <div class="card-body py-4">
           <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                   <div className='px-3'>
                      <img style={{width:'64px', height:'64px'}} src={link}  alt=""/>
                   </div>
                   <div className='py-3'>
                     <h4 class="card-title">10 Min School</h4>
                   </div>
               </div>
             
           </div>
        </div>
      </a>
    <a href='https://www.coursera.org/' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
        <div class="card bg-light shadow-sm">
           <div class="card-body py-4">
           <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
           <div className='px-3'>
                      <img style={{width:'64px', height:'64px'}} src={link}  alt=""/>
                   </div>
                   <div className='py-3'>
                     <h4 class="card-title">Coursera</h4>
                   </div>
               </div>
             
           </div>
        </div>
      </a>
    <a href='https://www.fedex.com/' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
        <div class="card bg-light shadow-sm">
           <div class="card-body py-4">
           <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
           <div className='px-3'>
                      <img style={{width:'64px', height:'64px'}} src={link}  alt=""/>
                   </div>
                   <div className='py-3'>
                     <h4 class="card-title">Fdx</h4>
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

export default TeacherImportantLink