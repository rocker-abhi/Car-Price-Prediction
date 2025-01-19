import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data_val, set_data] = useState({
    company_data: [],
    fuel_type: [],
    name: [],
    year: [],
  });

  const [form_data, set_form_data] = useState({
    name: "",
    company: "",
    year: "",
    fuel_type: "",
    kms_traveled: "",
  });

  const [company_drop_down_val, set_company_drop_down_val] = useState("");
  const [list_model_name, set_model_list] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null); // State for pop-up
  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State for pop-up visibility

  useEffect(() => {
    fetch_data();
  }, []);

  useEffect(() => {
    if (company_drop_down_val) {
      const filteredModels = data_val.name.filter((model) =>
        model.includes(company_drop_down_val)
      );
      set_model_list(filteredModels);
    } else {
      set_model_list([]);
    }
  }, [company_drop_down_val, data_val.name]);

  function fetch_data() {
    axios
      .get("http://127.0.0.1:5000/")
      .then((response) => {
        set_data(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handle_change = (e) => {
    const { name, value } = e.target;
    set_form_data({ ...form_data, [name]: value });
  };

  const handle_company_dropdown = (e) => {
    const { value } = e.target;
    set_company_drop_down_val(value);
    set_form_data({ ...form_data, company: value });
  };

  const handle_submit = () => {
    console.log(form_data);
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
      });
  };

  const closePopUp = () => {
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
      <div className="h-[100vh] w-[100%] flex flex-col justify-center items-center bg-gray-100 relative">
        {/* Pop-Up */}
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
        <div className="bg-slate-400 rounded-[10px] w-[80%] p-10 shadow-lg">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">
            Car Details Form
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <label htmlFor="companyDropdown" className="text-white font-bold">
              Select Company
            </label>
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

            <label htmlFor="modelDropdown" className="text-white font-bold">
              Select Model
            </label>
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

            <label htmlFor="yearDropdown" className="text-white font-bold">
              Select Year
            </label>
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

            <label htmlFor="fuelTypeDropdown" className="text-white font-bold">
              Select Fuel Type
            </label>
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

            <label htmlFor="kmsDriven" className="text-white font-bold">
              Kilometers Driven
            </label>
            <input
              type="number"
              className="border rounded p-2 w-full sm:col-span-2"
              name="kms_traveled"
              value={form_data.kms_traveled}
              onChange={handle_change}
            />
          </div>

          <div className="w-full flex justify-center items-center flex-col mt-5">
            <button
              className="bg-red-500 text-white font-bold py-2 px-8 rounded hover:bg-red-600"
              onClick={handle_submit}
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
