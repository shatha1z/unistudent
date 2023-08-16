import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Registration from './Component/Registration'
import GraduatePrograms from './Component/GraduatePrograms'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<Registration />} />
    <Route path="graduatePrograms/:id/" element={<GraduatePrograms />} />
    <Route path="login/" element={<Login />} />
    <Route path="dashboard/" element={<Dashboard />} />
    </Routes>
</Router>
  );
};

export default App;


