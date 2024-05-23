import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [lineOfBusiness, setLineOfBusiness] = useState(""); //use dropdown
  const [manager, setManager] = useState(""); //use dropdown
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeType, setEmployeeType] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const newUser = {
      employeeDetails: {
        firstName: firstName,
        lastname: lastName,
        workEmail: workEmail,
        company: company,
        lineOfBusiness: lineOfBusiness,
        manager: manager,
        username: username,
        password: password,
        isManager: employeeType,
      },
      employeeId: Math.floor(Math.random() * 1001),
      employeePosts: [],
      employeesManaged: [],
    };
    console.log("new user: ", newUser);
    try {
      // POST request to the API to add a new user
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("server response", data);
    } catch (error) {
      console.error("Error posting data", error);
    }
    navigate(`/employee/${newUser.employeeId}`);
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "lightblue",
        margin: 10,
        padding: 30,
        borderRadius: "10px",
      }}
    >
      <form
        onSubmit={handleRegistration}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
        className="mt-5"
      >
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <select
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value=""></option>
            <option value="Travelers">Travelers</option>
            <option value="Geico">Geico</option>
            <option value="State Farm">State Farm</option>
            <option value="Allstate">Allstate</option>
            <option value="Progressive">Progressive</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="workEmail">Work Email</label>
          <input
            type="text"
            className="form-control"
            id="workEmail"
            placeholder="Enter work email"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lineOfBusiness">Line Of Business</label>
          <select
            id="lineOfBusiness"
            value={lineOfBusiness}
            onChange={(e) => setLineOfBusiness(e.target.value)}
          >
            <option value=""></option>
            <option value="Bond & Specialty Insurance">
              Bond & Specialty Insurance
            </option>
            <option value="Business Insurance">Business Insurance</option>
            <option value="Claim">Claim</option>
            <option value="Personal Insurance">Personal Insurance</option>
            <option value="Risk Control">Risk Control</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="manager">Manager</label>
          <select
            id="manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          >
            <option value=""></option>
            <option value="Geoff Barnes">Geoff Barnes</option>
            <option value="DJ Crispy">DJ Crispy</option>
            <option value="C $">C $</option>
            <option value="JSON Derulo">JSON Derulo</option>
            <option value="Monty Python">Monty Python</option>
            <option value="Sarah Socks">Sarah Socks</option>
            <option value="Patrick Pandas">Patrick Pandas</option>
            <option value="Libby Matplot">Libby Matplot</option>
            <option value="Seamus Born">Seamus Born</option>
            <option value="Kera Smith">Kera Smith</option>
            <option value="SQL Sel Ect">SQL Sel Ect</option>
            <option value="Jupyter Spark">Jupyter Spark</option>
            <option value="Hugh Mongo">Hugh Mongo</option>
            <option value="Sir Jenkins">Sir Jenkins</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            className="form-control"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id="employeeType"
            name="employeeType"
            value={employeeType}
            onChange={() => setEmployeeType(!employeeType)}
          />
          <label htmlFor="manager">Click if you are a manager</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
