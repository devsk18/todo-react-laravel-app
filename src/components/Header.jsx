import React, { useContext } from 'react'
import { Navbar } from 'react-navbar-menu'
import logo from '../assets/react.svg'
import { UserAuthContext } from '../context/UserContext'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../helper/Toast'

const Header = () => {
    const navigate = useNavigate();

    const logOut = async () => {
      const cookie = new Cookies();
      cookie.remove('auth-token',{ path: '/'});
      Toast.fire({
        icon: 'warning',
        title: 'Please wait. You are logging out!'
      }).then(()=>{
        navigate('/login')
      })

    }

    return (
      <div>
        <Navbar
          IconColor={"white"}
          MenuNumber={3}
          Position={"bottom"}
          url1={"/dashboard"}
          icon1={"bx bx-home-alt"}
          Center={true}
          url2={"/dashboard/todo"}
          icon2={"bx bx-book-alt"}
          url3={"/dashboard/profile"}
          icon3={"bx bx-user"}
          backgroundColor={"#151c28"}
          activeColor={"yellow"}
        />
        <div className="w-100 bg-dark d-flex justify-content-between p-3 text-white">
          <div className="logo d-flex justify-content-center align-items-center">
            <img src={logo} alt="logo" />
          </div>
          <div className="app-name text-white d-flex justify-content-center align-items-center">
            <h1>ToDo App</h1>
          </div>
          <div className="avatar d-flex justify-content-center align-items-center">
            <div className="circle bg-info d-flex justify-content-center align-items-center" 
            style={{width:'40px',height:'40px',borderRadius:'50%'}}> <b>S</b> </div>
            <p onClick={logOut} style={{cursor:'pointer'}} className='align-items-center mt-3 mx-3'>Logout</p>
          </div>
        </div>
      </div>
    );
}

export default Header