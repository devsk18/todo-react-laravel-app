import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {Toast} from '../helper/Toast';
import AuthApi from '../helper/AuthApi';
import { UserAuthContext } from '../context/UserContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserAuthContext);
  const cookie = new Cookies();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      AuthApi.post('register', {
        name,
        email,
        password
      }).then((res)=>{
        
        setUser(res.data.data?.user)

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 2);
        cookie.set('auth-token',res.data.data?.token, {expires: expirationDate});

        Toast.fire({
          icon: 'success',
          title: res.data?.message
        }).then(navigate('/dashboard'))


      }).catch((res)=>{

        let nameErr = res.response.data.errors?.name
        let emailErr = res.response.data.errors?.email
        let passwordErr = res.response.data.errors?.password
        
        if(nameErr || emailErr || passwordErr){
          Toast.fire({
            icon: 'error',
            title: nameErr ? nameErr : (emailErr ? emailErr : passwordErr)
          })
        }
      });
      
    } catch (err) {

      Toast.fire({
        icon: 'error',
        title: 'Registration failed. Please try again.' + err.message
      });

    }
  };


  return (
    <div className="row d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="col-md-6">
        <div className="hero-text text-center mb-5">
          <h1>ToDo App</h1>
        </div>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-2">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
