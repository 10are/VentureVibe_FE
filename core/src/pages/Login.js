import React from 'react';
import LoginForm from '../components/LoginForm';
import OrganizationForm from '../components/OrganizationForm';

function Login() {
  return (
    <div>
      <OrganizationForm />,
      <LoginForm />
    </div>
  );
}

export default Login;
