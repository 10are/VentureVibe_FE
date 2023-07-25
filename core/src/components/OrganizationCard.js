import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/OrganizationCard.css';

function OrganizationCard() {
  const [organizations, setOrganizations] = useState([]);
  const [displayedOrganizations, setDisplayedOrganizations] = useState([]);
  const [country, setCountry] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/organization/')
      .then(response => {
        setOrganizations(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the data!', error);
      });
  }, []);

  useEffect(() => {
    let filteredOrganizations = organizations.filter(org => {
      return (
        (country === '' || org.country.toLowerCase().includes(country.toLowerCase())) &&
        (businessType === '' || org.business_type.toLowerCase().includes(businessType.toLowerCase())) &&
        (employeeCount === '' || org.employee_count <= employeeCount)
      );
    });

    filteredOrganizations.sort((a, b) => {
      let matchesA = (
        (country === '' || a.country.toLowerCase() === country.toLowerCase()) &&
        (businessType === '' || a.business_type.toLowerCase() === businessType.toLowerCase()) &&
        (employeeCount === '' || a.employee_count <= employeeCount)
      );

      let matchesB = (
        (country === '' || b.country.toLowerCase() === country.toLowerCase()) &&
        (businessType === '' || b.business_type.toLowerCase() === businessType.toLowerCase()) &&
        (employeeCount === '' || b.employee_count <= employeeCount)
      );

      return matchesB - matchesA;
    });

    setDisplayedOrganizations(filteredOrganizations);
  }, [country, businessType, employeeCount, organizations]);

  return (
    <div className="container">
      <div className="filters">
        <input type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
        <input type="text" placeholder="Business Type" onChange={(e) => setBusinessType(e.target.value)} />
        <input type="number" placeholder="Max Employee Count" onChange={(e) => setEmployeeCount(e.target.value)} />
      </div>

      <div className="cards">
        {displayedOrganizations.map(org => (
          <div key={org.id} className="card">
            <img src={org.logo} alt={org.name} />
            <h2>{org.name}</h2>
            <p><strong>Business Type:</strong> {org.business_type}</p>
            <p><strong>Country:</strong> {org.country}</p>
            <p><strong>Website:</strong> {org.website}</p>
            <p><strong>Employees:</strong> {org.employee_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrganizationCard;
