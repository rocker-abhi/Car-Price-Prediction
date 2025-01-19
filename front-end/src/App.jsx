/*
  AIM: This is the main React App 
*/
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State to store the fetched data
  const [data_val, set_data] = useState({
    company_data: [],
    fuel_type: [],
    name: [],
    year: [],
  });

  // Fetch data when the component mounts
  useEffect( () => {
    /*
      aim: This Function executes before the component is mounted.
    */
    fetch_data();
  }, []);

  useEffect( ()=>{
    /*
      aim : This function Track data val every time it has been updated . 
    */
    console.log("data val is updated :" , data_val)
  }, [data_val])

  // Function to fetch data from the API
  function fetch_data() {
    /*
      aim : function responsible for updating the data_val 
    */
    axios
      .get("http://127.0.0.1:5000/") // Replace with your API endpoint
      .then((response) => {
        set_data(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <>
      <div className="h-[100vh] w-[100%] flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-slate-400 rounded-[10px] w-[80%] p-10 shadow-lg">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">Car Details Form</h1>

          {/* Grid container */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Company Dropdown */}
            <label htmlFor="companyDropdown" className="text-white font-bold">
              Select Company
            </label>
            <select
              id="company_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
            >
              {data_val.company_data.length > 0 ? (
                data_val.company_data.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))
              ) : (
                <option value={""}>No company</option>
              )}
            </select>

            {/* Model Dropdown */}
            <label htmlFor="modelDropdown" className="text-white font-bold">
              Select Model
            </label>
            <select
              id="model_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
            >
              {data_val.name.length > 0 ? (
                data_val.name.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))
              ) : (
                <option value={""}>No model</option>
              )}
            </select>

            {/* Year Dropdown */}
            <label htmlFor="yearDropdown" className="text-white font-bold">
              Select Year
            </label>
            <select
              id="year_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
            >
              {data_val.year.length > 0 ? (
                data_val.year.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))
              ) : (
                <option value={""}>No year</option>
              )}
            </select>

            {/* Fuel Type Dropdown */}
            <label htmlFor="fuelTypeDropdown" className="text-white font-bold">
              Select Fuel Type
            </label>
            <select
              id="fuel_type_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
            >
              {data_val.fuel_type.length > 0 ? (
                data_val.fuel_type.map((fuel_type, index) => (
                  <option key={index} value={fuel_type}>
                    {fuel_type}
                  </option>
                ))
              ) : (
                <option value={""}>No fuel type</option>
              )}
            </select>

            {/* Kilometers Driven Input */}
            <label htmlFor="kmsDriven" className="text-white font-bold">
              Kilometers Driven
            </label>
            <input
              type="number"
              id="kmsDriven"
              className="border rounded p-2 w-full sm:col-span-2"
            />
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
