import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../auth/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const UserPrivateRouter = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location.pathname);

    if(loading){
        return <span className="loading loading-spinner text-error"></span>
    }

    if(!user){
        return children;
    }

  return (
    <Navigate state={location.pathname} to='/'></Navigate>
  )
}

UserPrivateRouter.propTypes = {}

export default UserPrivateRouter