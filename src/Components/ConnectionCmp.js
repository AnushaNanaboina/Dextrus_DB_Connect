import './CSS/connectionCmp.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function ConnectionCmp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    url: '',
    username: '',
    password: ''
  });
  const changeHandler = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  const submitHandler = event => {
    event.preventDefault()
    axios.post('http://localhost:8080/dextrus/connect', data)
      .then(response => {
        console.log(response.data);
        navigate("/home", { state: data })
      })
      .catch(error => {
        alert("Error");
        console.log(error);
      })

  }
  return (
    <div class="login-card">
      <div class="card-header">
        <div class="log">Connection Details</div>
      </div>
      <form onSubmit={submitHandler}>
        <div class="form-group">
          <label for="url">URL:</label>
          <input required="" name="url" id="username" type="text" onChange={changeHandler} />
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input required="" name="username" id="username" type="text" onChange={changeHandler} />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input required="" name="password" id="password" type="password" onChange={changeHandler} />
        </div>
        <div class="form-group">
          <input type="submit" name="submit" />
        </div>
      </form>
    </div>

  )
}
export default ConnectionCmp;