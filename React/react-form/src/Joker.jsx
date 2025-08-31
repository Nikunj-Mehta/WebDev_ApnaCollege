import { useState, useEffect } from "react";
export default function Joker() {
  const URL = "https://official-joke-api.appspot.com/random_joke";

  const getNewJoke = async () => { // This will execute whenever we click on New Joke button but when we refresh page there will be no joke
    let response = await fetch(URL);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    setJoke({setup: jsonResponse.setup, punchline: jsonResponse.punchline});
  };

  useEffect(() => { // For every refresh we will be able to see the joke this is the benefit of it.
    async function getFirstJoke() {
      let response = await fetch(URL);
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      setJoke({setup: jsonResponse.setup, punchline: jsonResponse.punchline});
    } // Arrow function k andr apne async func ko banaya.
    getFirstJoke(); // Fir uss he ko call de do.
  }, []); // passing an empty array will ensure that this will execute only once at the time of initialization.

  let [joke, setJoke] = useState({});

  return(
    <div>
      <h3>Joker!</h3>
      <h2>{joke.setup}</h2>
      <h2>{joke.punchline}</h2>
      <button onClick={getNewJoke}>New Joke</button>
    </div>
  )
}