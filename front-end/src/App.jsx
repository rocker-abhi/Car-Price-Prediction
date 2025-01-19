/*--------------------------------------------------------------------------------
# 
# aim : This is the main front-end code . Consist of Single form . 
#
--------------------------------------------------------------------------------- */

// importing libraries 
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import car from './assets/car.jpg'


function App() {
  /*--------------------------------------------------------------------------------
  # 
  # aim : this Function hold the Single Page which was used in the application .  
  # 
  --------------------------------------------------------------------------------- */

  const [data_val, set_data] = useState({
    company_data: [],
    fuel_type: [],
    name: [],
    year: [],
  }); // # <-- hold the data during the first fetch . which later on used in drop downs .

  const [form_data, set_form_data] = useState({
    name: "",
    company: "",
    year: "",
    fuel_type: "",
    kms_traveled: "",
  }); // # <-- record the data of form

  const [company_drop_down_val, set_company_drop_down_val] = useState(""); // <-- record the data of the company drop down
  const [list_model_name, set_model_list] = useState([]); // <-- as the company drop down got selected this variable got updated 
  const [predictedPrice, setPredictedPrice] = useState(null); // <- State for pop-up
  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // <-- State for pop-up visibility

  useEffect(() => {
      /*--------------------------------------------------------------------------------
      # 
      # aim : This function perform the fetch operation before mounting process .  
      # 
      --------------------------------------------------------------------------------- */
    fetch_data(); 
  }, []);

  useEffect(() => {
    /*--------------------------------------------------------------------------------
      # 
      # aim : The Function is responsible for update the model list when the company is 
      #       select from the company drop down . Also, This function is executed when
      #       there is any update in the variable company_drop_down_val and data_val.name
      # 
      --------------------------------------------------------------------------------- */

    if (company_drop_down_val) {
      // Block execute when the company_drop_down_val is not None .

      const filteredModels = data_val.name.filter((model) =>
        model.includes(company_drop_down_val)
      ); // <-- filter the according to company_drop_down_val
      set_model_list(filteredModels); // <-- update the model list  

    } else {
      // Block execute in case of company_drop_down in None

      set_model_list([]); // <-- update the the model list with blank list
    }
  }, [company_drop_down_val, data_val.name]);

  function fetch_data() {
      /*--------------------------------------------------------------------------------
      # 
      # aim : The Function is responsible for fetching the data from the api and store the
      #     data , to be used in later stages .
      # 
      --------------------------------------------------------------------------------- */
    axios
      .get("http://127.0.0.1:5000/")
      .then((response) => {
        set_data(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }); // <-- makeing the axios get request 

  }

  const handle_change = (e) => {
      /*--------------------------------------------------------------------------------
      # 
      # aim : This Function responsible forr handling the form data and record all the data
      #     of the form into the form_data variable 
      # 
      --------------------------------------------------------------------------------- */
    const { name, value } = e.target; // # <-- getting the name , value from the form .
    set_form_data({ ...form_data, [name]: value }); // # <-- record the form data . 
  };

  const handle_company_dropdown = (e) => {
      /*--------------------------------------------------------------------------------
      # 
      # aim : when the changes made to the company drop down , The model list has been updated
      #     corresponsding to the company .
      # 
      --------------------------------------------------------------------------------- */
    const { value } = e.target; // # <-- getting the drop down value 
    set_company_drop_down_val(value); // # <-- update variable
    set_form_data({ ...form_data, company: value }); // # <-- update form data 
  };

  const handle_submit = () => {
      /*--------------------------------------------------------------------------------
      # 
      # aim : This function is responsible for executing the post request and display the pop-up. 
      # 
      --------------------------------------------------------------------------------- */
    
    axios
      .post("http://127.0.0.1:5000/", form_data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPredictedPrice(response.data.predicted_price); // Set the predicted price
        setIsPopUpVisible(true); // Show the pop-up
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form.");
      }); // # <-- making axios post request 
  };

  const closePopUp = () => {
      /*--------------------------------------------------------------------------------
      # 
      # aim : This function is responsible for closing the pop-up and reset the form to the initial stage . 
      # 
      --------------------------------------------------------------------------------- */

    setIsPopUpVisible(false); // Hide the pop-up
    set_form_data({
      name: "",
      company: "",
      year: "",
      fuel_type: "",
      kms_traveled: "",
    }); // Reset the form to its initial state

    set_company_drop_down_val(""); // Reset dropdown
    set_model_list([]); // Reset model dropdown
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 z-10" />
      <div className="h-[100vh] w-[100%] flex flex-col justify-center items-center bg-gray-100 relative z-5"
            style={{
              backgroundImage: `url(${car})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
              width: '100vw',
            }}
      >
        {/*
          about : This div is the main backgound that cover the entire website . First-layer 
        */}

        {/*about :  Pop-Up code*/}
        {isPopUpVisible && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] sm:w-[400px]">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
                onClick={closePopUp}
              >
                X
              </button>
              <h2 className="text-2xl font-bold text-center mb-4">
                Predicted Price
              </h2>
              <p className="text-center text-lg font-medium">
                ₹ {predictedPrice}
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-[#8E1616] rounded-[10px] w-[95%]  md:w-[55%] p-10  shadow-lg z-40 bg-opacity-70">

          {/* Main Header of Form */}
          <h1 className="text-white text-4xl font-bold mb-6 text-center font-sans">
            Car Price Prediction
          </h1>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">

            {/* row-1 col-1 : label*/}
            <label htmlFor="companyDropdown" className="text-white font-bold">
              Select Company
            </label>

            {/* row-1 col-2 : drop_down*/}
            <select
              id="company_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
              onChange={handle_company_dropdown}
              name="company"
              value={form_data.company}
            >
              <option value="">Select a company</option>
              {data_val.company_data.length > 0 ? (
                data_val.company_data.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))
              ) : (
                <option value="">No company</option>
              )}
            </select>
            
            {/* row-2 col-1 : label*/}
            <label htmlFor="modelDropdown" className="text-white font-bold">
              Select Model
            </label>

            {/* row-2 col-2 : drop-down*/}
            <select
              id="model_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
              name="name"
              value={form_data.name}
              onChange={handle_change}
            >
              <option value="">Select a model</option>
              {list_model_name.length > 0 ? (
                list_model_name.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))
              ) : (
                <option value="">No model</option>
              )}
            </select>
            
            {/* row-3 col-1 : label*/}
            <label htmlFor="yearDropdown" className="text-white font-bold">
              Select Year
            </label>

            {/* row-3 col-2 : drop down*/}
            <select
              id="year_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
              name="year"
              value={form_data.year}
              onChange={handle_change}
            >
              <option value="">Select a year</option>
              {data_val.year.length > 0 ? (
                data_val.year.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))
              ) : (
                <option value="">No year</option>
              )}
            </select>
            
            {/* row-4 col-1 : label*/}
            <label htmlFor="fuelTypeDropdown" className="text-white font-bold">
              Select Fuel Type
            </label>

            {/* row-4 col-2 : drop down*/}
            <select
              id="fuel_type_drop_down"
              className="border rounded p-2 w-full sm:col-span-2"
              name="fuel_type"
              value={form_data.fuel_type}
              onChange={handle_change}
            >
              <option value="">Select fuel type</option>
              {data_val.fuel_type.length > 0 ? (
                data_val.fuel_type.map((fuel_type, index) => (
                  <option key={index} value={fuel_type}>
                    {fuel_type}
                  </option>
                ))
              ) : (
                <option value="">No fuel type</option>
              )}
            </select>
            
            {/* row-5 col-1 : label*/}
            <label htmlFor="kmsDriven" className="text-white font-bold">
              Kilometers Driven
            </label>

            {/* row-5 col-2 : input box*/}
            <input
              type="number"
              className="border rounded p-2 w-full sm:col-span-2"
              name="kms_traveled"
              value={form_data.kms_traveled}
              onChange={handle_change}
            />
          </div>

          <div className="w-full flex justify-center items-center flex-col mt-5">
            {/* button */}
            <button
              className="bg-red-500 text-white font-bold py-2 px-8 rounded hover:bg-red-600"
              onClick={handle_submit}
            >
              Predict
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
