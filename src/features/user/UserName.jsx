import React from 'react';
import { useSelector } from 'react-redux';
import { getUserName } from './userSlice';

const UserName = () => {
  const username = useSelector(getUserName);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
};

export default UserName;
