import React from "react";
import "./App.css";
import CryptoTracker from "./cryptoTracker/cryptoTracker";

function App() {
  return (
    <div className="w-full m-0 p-0 flex flex-col justify-center items-center">
      <CryptoTracker />
    </div>
  );
}

export default App;
