import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./components/PageOne";


function App() {
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageOne />} />
            {/* <Route path="/update_card" element={<EditCardForm />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
