import React, { useState } from "react";
import axios from "axios";
const countriesData = require("./countries.json");

function OrganizationForm() {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    business_type: "",
    country: "",
    website: "",
    employee_count: null,
  });

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
        "http://localhost:8000/api/organization/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        }
      );
      console.log("Organization created successfully!", response.data);
    } catch (error) {
      console.error("Error creating organization", error);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  return (
    <div>
      <h2>Create Organization</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Logo:
          <input type="file" name="logo" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Business Type:
          <select name="business_type" onChange={handleChange}>
            <option value="">Select Business Type</option>
            <option value="sole">Şahıs</option>
            <option value="large">Büyük işletme</option>
            <option value="sme">KOBİ</option>
            <option value="ngo">STK</option>
          </select>
        </label>
        <br />
        <label>
          Country:
          <select name="country" onChange={handleChange}>
            <option value="">Select Country</option>
            {countriesData.countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Employee Count:
          <input
            type="number"
            name="employee_count"
            value={formData.employee_count}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Organization</button>
      </form>
    </div>
  );
}

export default OrganizationForm;
