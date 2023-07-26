import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/OrganizationCard.css';

const BUSINESS_TYPE_LABELS = {
  'sole': 'Şahıs',
  'large': 'Büyük işletme',
  'sme': 'KOBİ',
  'ngo': 'STK',
};

function OrganizationCard() {
  const [organizations, setOrganizations] = useState([]);
  const [displayedOrganizations, setDisplayedOrganizations] = useState([]);
  const [country, setCountry] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const userToken = JSON.parse(localStorage.getItem('user'))?.token || ''; // Get user token from localStorage

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/organization/?page=${currentPage}`)
      .then(response => {
        setOrganizations(response.data.results);
      })
      .catch(error => {
        console.error('There was an error retrieving the data!', error);
      });
  }, [currentPage]);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleVote = (organizationId, rating) => {
    axios.post(`http://127.0.0.1:8000/api/organizationrating/`, {
      organization: organizationId,
      rating: 1,
      user: userToken,
    })
    .then(response => {
      console.log('Vote success!', response.data);
      const updatedOrganizations = organizations.map(org => {
        if (org.id === organizationId) {
          if (rating === 'like') {
            return { ...org, likes: (org.likes || 0) + 1 };
          } else if (rating === 'dislike') {
            return { ...org, dislikes: (org.dislikes || 0) + 1 };
          }
        }
        return org;
      });
      setOrganizations(updatedOrganizations);
    })
    .catch(error => {
      console.error('Error voting!', error);
    });
  };
return (
    <div className="container">
      <h1 className="title">Organization List</h1>
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
            <p><strong>Business Type:</strong> {BUSINESS_TYPE_LABELS[org.business_type]}</p>
            <p><strong>Country:</strong> {org.country}</p>
            <p><strong>Website:</strong> <a href={org.website} target="_blank" rel="noopener noreferrer">{org.website}</a></p>
            <p><strong>Employees:</strong> {org.employee_count}</p>
            <p><strong>Likes:</strong> {org.likes || 0}</p>
            <p><strong>Dislikes:</strong> {org.dislikes || 0}</p>

            <div className="actions">
              <button className="action-button" onClick={() => handleVote(org.id, 'like')}>
                <i className="fas fa-thumbs-up"></i> Like
              </button>
              <button className="action-button" onClick={() => handleVote(org.id, 'dislike')}>
                <i className="fas fa-thumbs-down"></i> Dislike
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}

        {currentPage < 20000 && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default OrganizationCard;
