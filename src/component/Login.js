import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import AlertContext from '../context/Alert/AlertContext';

function Login() {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const [credintial, setcredintial] = useState({email:"",password:""})
    let history = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email:credintial.email,password:credintial.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.AuthToken);
            history("/");
            showAlert("Successfully login","success")
        }
        else{
            showAlert("Wrong Credentials","danger")
        }
    }
    
    const onChange = (e)=>{
        setcredintial({...credintial,[e.target.name]:e.target.value})
    }
    return (
        <div className='mt-3'>
            <h2>Login To Continue to Add Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credintial.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credintial.password} name="password" id="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login