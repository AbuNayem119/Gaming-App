import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../../src/App.css'
import logo from '../../public/logo.png'
import PropTypes from 'prop-types'
import { AuthContext } from '../auth/AuthProvider'
import avator from '../../public/avator.png'
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify'

const Header = props => {

    const { user, setUser, logOut, toggleDarkMode, darkMode } = useContext(AuthContext)

    const url = useLocation();

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState()
    // console.log(user)

    // Handle logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                setUser(null);
                toast.success("LogOut Successfully !", {
                    position: "top-center"
                });
                navigate('/')
            })
            .catch(error => {
                toast.error(error.message, {
                    position: "top-center"
                });
                // toast.error(error.message, {
                //     position: "top-center"
                // });
            })
    }

    // Get user from database
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data)
            })
    })



    return (
        <>
            <div className={`border-b sticky top-0 z-50 bg-[#fffffff2] ${darkMode && url.pathname === '/' && 'dark'}`}>
                <header className="w-[1280px] mx-auto pr-5 pl-5 dark:bg-slate-700">
                    <div className="flex justify-between items-center">
                        <div>
                            <Link to={"/"}><img className='w-44' src={logo} alt="" /></Link>
                        </div>
                        {/* <p className='text-black'>Email: {user?.email}</p> */}
                        <div>
                            <nav>
                                <ul className="flex gap-4 dark:text-white font-semibold text-lg">
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={"/allReview"}>All Review</NavLink></li>
                                    {
                                        user &&
                                        <>
                                            <li><NavLink to={"/addReview"}>Add Review</NavLink></li>
                                            <li><NavLink to={"/myReview"}>My Review</NavLink></li>
                                            <li><NavLink to={"/gameWatchList"}>Game WatchList</NavLink></li>
                                        </>
                                    }
                                </ul>
                            </nav>
                        </div>



                        <div className="flex gap-10 items-center font-semibold text-lg">

                            {/* ------------------------ */}
                            {
                                url.pathname === '/' &&
                                <label className="flex items-baseline cursor-pointer gap-2">
                                    <svg
                                        className='dark:text-white'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5" />
                                        <path
                                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                    </svg>
                                    <input onClick={toggleDarkMode} type="checkbox" value="synthwave" className="toggle theme-controller" />
                                    <svg
                                        className='dark:text-white'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                </label>
                            }
                            {/* ------------------------ */}

                            {
                                !user ?
                                    <div className='flex gap-3 mb-2'>
                                        <Link to={"/login"}><button>Login</button></Link>
                                        <Link to={"/register"}><button>Register</button></Link>
                                    </div>
                                    :
                                    <div className='flex gap-3 bg-gray-100 border py-2 px-3 rounded-xl'>

                                        <img className='userPhoto w-12 rounded-full' src={currentUser?.image || avator} alt="" />


                                        <Tooltip anchorSelect=".userPhoto" place="top">
                                            {currentUser?.name}
                                        </Tooltip>

                                        <Link onClick={handleLogOut} className='flex items-center gap-1 bg-[#a91625] text-white hover:text-white font-semibold text-xl rounded-xl px-3'>Log Out</Link>
                                    </div>
                            }




                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

Header.propTypes = {}

export default Header