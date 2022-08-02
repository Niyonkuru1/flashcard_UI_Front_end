import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./components/PageOne";
import PageTwo from "./components/PageTwo";
import SubjectDetails from "./components/SubjectDetails";


function App() {
  return (
      <div className="w-screen h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageOne />} />
            <Route path="/user/:userId" element={<PageTwo />} />
            <Route path="/subjects/:userId/:subjectId" element={<SubjectDetails />} />
            {/* <Route path="/update_card" element={<EditCardForm />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
