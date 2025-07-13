import { useState } from "react";
import { useFormik } from "formik";

const validate = values => {
  const errors = {};
  if(!values.username) {
    errors.username = "username cannot be empty";
  }
  return errors;
}

export default function CommentForm({addNewComment}) {
  // let [formData, setFormData] = useState({
  //   username: "",
  //   remarks: "",
  //   rating: 5
  // });

  let formik = useFormik({
    initialValues: {
      username: "",
      remarks: "",
      rating: 5
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  // let handleInputChange = (event) => {
  //   setFormData((currData) => {
  //     return {...currData, [event.target.name]: event.target.value};
  //   });
  // };

  // let handleSubmit = (event) => {
  //   console.log(formData);
  //   addNewComment(formData);
  //   event.preventDefault();
  //   setFormData({
  //     username: "",
  //     remarks: "",
  //     rating: 5
  //   })
  // }

  return (
    <div>
      <h4>Give a comment</h4>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="enter username"
          value={formik.values.username}
          onChange={formik.handleChange}
          id="username"
          name="username"
        ></input>
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        <br></br>
        <br></br>
        <label htmlFor="remarks">Remarks</label>
        <input
          type="textarea"
          placeholder="write a remarks"
          value={formik.values.remarks}
          onChange={formik.handleChange}
          id="remarks"
          name="remarks"
        ></input>
          <br></br>
          <br></br>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          placeholder="1-5"
          value={formik.values.rating}
          onChange={formik.handleChange}
          id="rating"
          name="rating"
          min={1}
          max={5}
        ></input>
        <br></br>
        <br></br>
        <button type="submit">Add comment</button>
      </form>
    </div>
  )
}