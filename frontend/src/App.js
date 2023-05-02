import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [texts, setTexts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  axios.defaults.withCredentials = true; 
  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set isLoading to true
    axios.post("https://port-0-waktaversechatbotserver-3nec02mlh4yll6t.sel4.cloudtype.app/chat",{ withCredentials: true }, { inputValue })
      .then(response => {
        setTexts([...texts, response.data]);
        setInputValue("");
      })  
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false)); // Set isLoading to false when request is finished
  };

  return (
    <div className="App">
      <h1>고세구 GPT</h1>
      <form onSubmit={handleButtonClick}>
        <label>
          고세구 한테 할 말을 입력하세요 
          <input
            type="text"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
          />
        </label>
        <button type="submit">전송</button>
      </form>
      {isLoading && <p>Loading...</p>}
      <ul>
        {texts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
