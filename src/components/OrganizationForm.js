import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/OrganizationForm.css"; 
import config from '../config';

const countriesData = require("./countries.json");

function OrganizationForm() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    business_type: "",
    country: "",
    website: "",
    employee_count: null,
  });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken); // Set to true if authToken exists
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, logo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      console.log("Please log in to create an organization.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("logo", formData.logo);
    formDataToSend.append("business_type", formData.business_type);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("employee_count", formData.employee_count);

    try {
      const csrfToken = getCookie("csrftoken");
      const response = await axios.post(
        `${config.BASE_URL}api/organization/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        }
      );

      console.log("Organization created successfully!", response.data);

      navigate("/organization");
    } catch (error) {
      console.error("Error creating organization", error);
      alert("Doğru bir url yazdığına emin misin?");
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  return (
    <div className="container">
      <div className="form-container">
        {isAuthenticated ? (
          <form onSubmit={handleSubmit}>
            <label className="form-label">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Logo:
              <input type="file" name="logo" onChange={handleFileChange} />
            </label>
            <label className="form-label">
              Business Type:
              <select
                name="business_type"
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Business Type</option>
                <option value="sole">Şahıs</option>
                <option value="large">Büyük işletme</option>
                <option value="sme">KOBİ</option>
                <option value="ngo">STK</option>
              </select>
            </label>
            <label className="form-label">
              Country:
              <select
                name="country"
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Country</option>
                {countriesData.countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
              </select>
            </label>
            <label className="form-label">
              Website:
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Employee Count:
              <input
                type="number"
                name="employee_count"
                value={formData.employee_count}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <button type="submit" className="form-button">
              Create Organization
            </button>
          </form>
        ) : (
          <p>Please log in to create an organization.</p>
        )}
      </div>
    </div>
  );
}

export default OrganizationForm;
