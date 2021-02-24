import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import validator from 'email-validator';
import SystemService from './SystemService';
import 'react-dropdown/style.css';

const App = ({

}) => {
  const [email, setemail] = useState("");
  const [islogin, setislogin] = useState(false);
  const [username, setusername] = useState("");
  const [status, setstatus] = useState("");
  const [allusers, setallusers] = useState([]);
  const [filterByStatus, setFilterByStatus] = useState("");
  const [filterByName, setFilterByName] = useState("");

  const getAllUsers = () => {
    SystemService.getUsers()
    .then(users => {
      console.log(users.data);
      setallusers(users.data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  const login = () => {
    SystemService.login(email)
    .then(userDetails => {
      console.log(userDetails.data);
      setislogin(true);
      setusername(userDetails.data.username);
      setstatus(userDetails.data.status);
      getAllUsers();
    })
    .catch(err => {
      console.log(err);
    });
  }

  const updateStatus = (newStatus) => {
    if (newStatus) {
      SystemService.updateStatus(email, newStatus)
      .then(response => {
        console.log(response.data);
        setstatus(newStatus);
        getAllUsers();
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  const filterUsers = () => {
    let usersAfterFilter = allusers;
    if (filterByStatus) {
      usersAfterFilter = allusers.filter((user) => user.status === filterByStatus);
    }
    if (filterByName) {
      usersAfterFilter = usersAfterFilter.filter((user) => user.username.includes(filterByName));
    }
    return usersAfterFilter;
  }

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

  return (
    <div className="App">

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        { username && status && <a className="navbar-brand">
          hello {username}, you are {status}
        </a>}
        { username && !status && <a className="navbar-brand">
          hello {username}, you don't have status yet.
        </a>}
      </nav>

      {!islogin ? (<div className="myApp">
        <div> input your email</div>
        <input
          className="emailInput"
          onChange={(e) => setemail(e.target.value)}
          placeholder="email..."
        />
        <button 
          className="loginButton"
          disabled={!validator.validate(email)}
          onClick={login}>
          Login
        </button>
      </div>)
      : (
        <div className="myApp">
          <div>

            <div>
              <span className="updateStatus">Update My Current Status: </span>
              <select 
                value={status} 
                onChange={(e) => updateStatus(e.target.value)} 
              >
                <option value="">Status...</option>
                <option value="Working">Working</option>
                <option value="On Vacation">On Vacation</option>
                <option value="Lunch Time">Lunch Time</option>
                <option value="Business Trip">Business Trip</option>
              </select>
            </div>

          </div>

          {ColoredLine('black')}

          <div>
            <input
              className="filterNameInput"
              onChange={(e) => setFilterByName(e.target.value)}
              placeholder="Search by name..."
            />
            <select 
              value={filterByStatus} 
              onChange={(e) => setFilterByStatus(e.target.value)} 
            >
              <option value="">Filter By Status...</option>
              <option value="Working">Working</option>
              <option value="On Vacation">On Vacation</option>
              <option value="Lunch Time">Lunch Time</option>
              <option value="Business Trip">Business Trip</option>
            </select>
            <ul>
              {filterUsers().map(user => (
                <li key={user.username}>{user.username} ({user.status})</li>
              ))}
            </ul>
            
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
