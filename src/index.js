import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import reduxStore from "./redux/store"
import { Home, AddNewRecord, ShowDetails, ContactPage, Login, Register, PageNotFound } from "./pages"

const store=reduxStore()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/ABHI_Timesheet" element={<Login />} />
        <Route path="/addNewRecord" element={<AddNewRecord />} />
        <Route path="/showDetails" element={<ShowDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);