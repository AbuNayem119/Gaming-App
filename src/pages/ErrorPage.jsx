import React from 'react'
import PropTypes from 'prop-types'
import error404 from '../../public/error404.gif'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ErrorPage = props => {
  return (
    <>
      <div className='w-[1280px] mx-auto'>
        <div className='flex justify-center rounded-md'>
          <img className='' src={error404} alt="" />
        </div>
      </div>
    </>
  )
}

ErrorPage.propTypes = {}

export default ErrorPage