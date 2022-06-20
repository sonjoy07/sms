import React from 'react'
import './Header.css'

// import bgimg1 from '../../images/bgimg/bgimg1.jpg';
// import bgimg2 from '../../images/bgimg/bgimg2.jpg';
// import bgimg3 from '../../images/bgimg/bgimg3.jpeg';

const Header = () => {
  return (
    // <div>
    //    <div>
    //        <img style={{width: '100%', height: '100%'}} src={bgimg3}  class="img-fluid" alt="Responsive image">
              
    //         </img> 
    //     </div>
    // </div>

  <div >
<header class="masthead">
  <div class="container h-100">
    <div class="row h-100 align-items-center">
      <div class="col-12 ">
        
        <h1 style={{color: 'white' , fontWeight: 'bold', fontSize: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} class=""><span  style={{color: 'orange',fontSize: '55px' }}>e</span>PathShala</h1>
        <p  style={{color: 'white' , fontWeight: '400', fontSize: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} class="">WELCOME TO <span className='' style={{color:'orange', fontSize: '40px', paddingLeft:'5px', fontWeight: 'bold'}}>ePathShala</span></p>
      </div>
    </div>
  </div>
</header>
  </div>
  )
}

export default Header