import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router";
import PersonalInformation from './modules/PersonalInformation/PersonalInformation';
import LoanParameters from './modules/LoanParameters/LoanParameters';
import { Paths } from './types/routesTypes';
import { FormProvider } from './context/FormContext/FormProvider';
import AddresPlaceWork from './modules/AddresPlaceWork/AddresPlaceWork';


function App() {


  return (
    <FormProvider>

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={Paths.personalInformation} element={<PersonalInformation />} />
            <Route path={Paths.loanParameters} element={<LoanParameters />} />
            <Route path={Paths.addresPlaceWork} element={<AddresPlaceWork />} />
          </Routes>
        </BrowserRouter>
      </div>
    </FormProvider>
  );
}

export default App;
