import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { AuthContext } from './AuthProvider'

const Login = props => {

  const { loginUser, setUser, loginWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    loginUser(email, password)
      .then(result => {
        const user = result.user
        setUser(user)

        e.target.reset()
        navigate('/')

        console.log(user)
      }).catch(error => {
        console.log(error.message)
      })
  }




  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user);

        navigate('/')
  
        // Check if the user already exists in the database using their email
        fetch(`http://localhost:5000/users/${user.email}`, {
          method: 'GET',
        })
          .then(res => res.json())
          .then(data => {
            if (data.exists) {
              console.log('User already exists in the database');
            } else {
              // User doesn't exist, send user data to the database
              const userData = { 
                name: user.displayName, 
                email: user.email, 
                image: user.photoURL 
              };
  
              fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              })
                .then(res => res.json())
                .then(data => {
                  if (data.insertedId) {
                    console.log('User created successfully');

                    navigate('/')
                    // You can handle success here, like navigating to another page or showing a toast
                  }
                  console.log(data);  // Log the response from the server
                })
                .catch(error => {
                  console.error("Error saving user data:", error);
                });
            }
          })
          .catch(error => {
            console.error("Error checking user existence:", error);
          });
      })
      .catch(error => {
        console.error("Google login error:", error);
      });
  };


  return (
    <>
      <div className="flex flex-col gap-4 py-8">
        <div className='w-[700px] mx-auto flex flex-col gap-4 py-8 px-14 border rounded-xl shadow-md'>
          <h1 className='text-5xl mb-5 font-bold text-black'>Login Here</h1>

          <form onSubmit={handleLogin} className='flex flex-col gap-4'>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input name="email" type="text" className="grow" placeholder="Email" />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input name="password" type="password" className="grow" placeholder='Password' />

            </label>

            <input className='py-2 cursor-pointer px-5 rounded-2xl bg-[#a91625] text-2xl text-white font-bold' type="submit" value="Login" />
          </form>

          <button onClick={handleGoogleLogin} className='py-2 pl-5 text-white font-semibold rounded-2xl bg-[#a91625] text-2xl flex items-center gap-2'><FaGoogle />Login with Google</button>

          {/* forget password */}
          <p className='text-xl text-black'>Forget Password? <Link to="/forget-password" className='text-[#a91625] font-bold'>Reset Password</Link></p>

          {/* Don't have an account? */}
          <p className='text-xl text-black'>Don't have an account? <Link to="/register" className='text-[#a91625] font-bold'>Sign Up</Link></p>


        </div>
      </div>
    </>
  )
}

Login.propTypes = {}

export default Login