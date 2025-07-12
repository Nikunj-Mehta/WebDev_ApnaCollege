import { useState } from "react"

export default function CommentForm({addNewComment}) {
  let [formData, setFormData] = useState({
    username: "",
    remarks: "",
    rating: 5
  });
  
  let handleInputChange = (event) => {
    setFormData((currData) => {
      return {...currData, [event.target.name]: event.target.value};
    });
  };

  let handleSubmit = (event) => {
    console.log(formData);
    addNewComment(formData);
    event.preventDefault();
    setFormData({
      username: "",
      remarks: "",
      rating: 5
    })
  }

  return (
    <div>
      <h4>Give a comment</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="enter username"
          value={formData.username}
          onChange={handleInputChange}
          id="username"
          name="username"
        ></input>
        <br></br>
        <br></br>
        <label htmlFor="remarks">Remarks</label>
        <input
          type="textarea"
          placeholder="write a remarks"
          value={formData.remarks}
          onChange={handleInputChange}
          id="remarks"
          name="remarks"
        ></input>
          <br></br>
          <br></br>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          placeholder="1-5"
          value={formData.rating}
          onChange={handleInputChange}
          id="rating"
          name="rating"
          min={1}
          max={5}
        ></input>
        <br></br>
        <br></br>
        <button>Add comment</button>
      </form>
    </div>
  )
}