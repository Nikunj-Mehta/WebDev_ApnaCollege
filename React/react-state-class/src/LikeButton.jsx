import { useState } from "react";

export default function LikeButton() {
  let [isLiked, setIsLiked] = useState(false);
  let [clicks, setClicks] = useState(0);
  
  let toggleLike = () => {
    setIsLiked(!isLiked);
    setClicks(clicks+1);
  };

  let likeStyle = {color: "red"};

  return(
    <div>
      <h3>Practicing React State</h3>
      <p onClick={toggleLike}>
        {isLiked ?
          <i className="fa-solid fa-heart" style={likeStyle}></i> :
          <i className="fa-regular fa-heart"></i>
        }
      </p>
      <p>Clicks = {clicks}</p>
    </div>
  )
}