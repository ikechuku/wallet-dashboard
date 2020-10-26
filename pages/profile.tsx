import React from 'react';
import PrivateRoute from '../components/shared/PrivateRoute';
import ProfileTemplate from '../components/templates/Profile';
import InAppNav from '../components/molecule/InAppNav';

const Profile = () => {
  return (
    <PrivateRoute
      Component={() => (
        <InAppNav selected="">
          <ProfileTemplate />
        </InAppNav>
      )}
    />
  );
};

export default Profile;
