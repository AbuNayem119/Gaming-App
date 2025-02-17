import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'

const Routes = props => {
    const { darkMode } = useContext(AuthContext)
    // console.log(darkMode)
    const url = useLocation();
    // console.log(url.pathname)
    return (
        <>
            <div className={`${darkMode && url.pathname === '/' && 'dark'}`}>
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </>
    )
}

Routes.propTypes = {}

export default Routes