// TestPage1.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestPage1 = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("API_URL", { /* isteğe bağlı parametreler */ })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Axios hata: ", error);
      });
  }, []);

  const handleClick = () => {
    navigate("/forms");
  };

  return (
    <div>
      <h1>TestPage1</h1>
      {data ? <p>{JSON.stringify(data)}</p> : <p>Veri yükleniyor...</p>}
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

export default TestPage1;
