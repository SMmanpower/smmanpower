import icon from '../assets/Circled_Right.png'
import React, { useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom'; 
import UserPool from '../../src/UserPool';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 



  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');  
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
  
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
  
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('Login successful:', data);
        localStorage.setItem('isAuthenticated', 'true'); 
        navigate('/admin'); 
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials.');
      },
      newPasswordRequired: (userAttributes) => {
        console.log('New password required:', userAttributes);
  
        const newPassword = prompt('Enter your new password:');
  
        if (newPassword) {
          delete userAttributes.email;
          delete userAttributes.email_verified;
  
          user.completeNewPasswordChallenge(newPassword, userAttributes, {
            onSuccess: (data) => {
              console.log('Password updated successfully:', data);
              localStorage.setItem('isAuthenticated', 'true'); 
              navigate('/admin'); 
            },
            onFailure: (err) => {
              console.error('Failed to update password:', err);
              alert('Password update failed. Try again.');
            },
          });
        }
      },
    });
  };
  
  return (
    <form action="" onSubmit={handleSubmit} className="m-auto my-2.5">
                     <div className="box text-left mt-2.5 m-auto">
                         <p className="text-sm sm:text-2xl aldrich-regular">Login ID</p>
                         <input type="text" className="h-10 input sm:input-box sm:min-w-450" value={username} onChange={(e) => setUsername(e.target.value)} required />
                     </div>
                     <div className="box text-left mt-2.5 m-auto">
                         <p className="text-sm sm:text-2xl aldrich-regular">Password</p>
                        <input type="password" className="h-10 input sm:input-box" value={password} onChange={(e) => setPassword(e.target.value)}  required />
                     </div>
                     {error && <p className="text-red-500">{error}</p>}
                         <button type="submit" className="btn px-2.5 sm:h-fit iceberg-regular bg-primary mx-auto my-5 text-2xl sm:text-4xl" >
                             Login
                             <img src={icon} alt="" className='h-9 sm:h-auto' />
                         </button>
                 </form> 
  );
};

export default Login;


