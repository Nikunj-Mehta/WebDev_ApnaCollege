import { useState } from "react"

export default function Form() {
   // For every new ele we associate a new state variable.Instead of creating sep state variable for each input create one object as state for all.
  let [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  // let handleNameChange = (event) => {
  //   console.log(event.target.value);
  //   setFullName(event.target.value);
  // };

  // let handleUsername = (event) => {
  //   console.log(event.target.value);
  //   setUsername(event.target.value);
  // }

  let handleInputChange = (event) =>{
    setFormData( (currData) => {
      return {...currData, [event.target.name]: event.target.value};
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      fullName: "",
      username: "",
      password: "",
    })
  }

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullname">Full Name</label>
      <input 
        placeholder="enter full name" 
        type="text" 
        value={formData.fullName}
        onChange={handleInputChange}
        id="fullname"
        name="fullName"
      />
      <br></br>
      <br></br>
      <label htmlFor="username">User Name</label>
      <input 
        placeholder="enter user name" 
        type="text" 
        value={formData.username} 
        onChange={handleInputChange}
        id="username"
        name="username"
      />
      <br></br>
      <br></br>
      <label htmlFor="password">Password</label>
      <input 
        placeholder="enter password" 
        type="password" 
        value={formData.password} 
        onChange={handleInputChange}
        id="password"
        name="password"
      />
      <button>Submit</button>
    </form>
  )
}