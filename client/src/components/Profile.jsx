import React from 'react';

const Profile = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {user.personaname}!</h1>
      <img src={user.avatarfull} alt="Avatar" style={{ borderRadius: '50%', width: '150px' }} />
      <p>
        <a href={user.profileurl} target="_blank" rel="noopener noreferrer">
          Visit Steam Profile
        </a>
      </p>
    </div>
  );
};

export default Profile;
