import {useNavi}
const checkLoggedIn = () =>{
    if(user_type!=2){
      const navigate = useNavigate()
      navigate('/login')
    }
  }