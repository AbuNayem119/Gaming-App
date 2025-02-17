import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import { MdOutlineAttachFile } from 'react-icons/md'

const Register = props => {

  const { createUser, loginWithGoogle, user, setUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const image = e.target.image.value
    const name = e.target.name.value
    const password = e.target.password.value
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      // toast.error("Password must be at least 6 characters and contain at least one uppercase letter and one lowercase letter !", {
      //   position: "top-center"
      // });
      alert("Password must be at least 6 characters and contain at least one uppercase letter and one lowercase letter !")
      
      e.target.password.value = '';
      return;
    }

    const userData = { name, email, image }

    // console.log(userData)

    createUser(email, password)
      .then(result => {
        const user = result.user
        console.log(user)

        // Save user data to Server
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
          .then(res => res.json())
          .then(data => {

            if (data.insertedId) {
              console.log('User created successfully')
              // e.target.reset()
              // Go to Home Page
              navigate('/')
            }
            console.log(data)

          })


      }).catch(error => {
        console.log(error.message)
      })
  }


  // // Login with Google
  // const handleGoogleLogin = () => {

  //   try {
  //     loginWithGoogle()
  //       .then(result => {
  //         const user = result.user;
  //         console.log(user)
  //         setUser(user);


  //         // toast.success("Login Successfully !", {
  //         //   position: "top-center"
  //         // });
  //         // navigate(location?.state ? location.state : '/');
  //         // console.log(user);
  //       })
  //       .catch(error => {
  //         // console.log("ERROR: ", error);
  //       })
  //   } finally {

  //     // Save user data to Server---------------------------
  //     const userData = { name: user.displayName, email: user.email, image: user.photoURL }
  //     fetch('http://localhost:5000/users', {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json'
  //       },
  //       body: JSON.stringify(userData)
  //     })
  //       .then(res => res.json())
  //       .then(data => {

  //         if (data.insertedId) {
  //           console.log('User created successfully')
  //           // e.target.reset()
  //         }
  //         console.log(data)
  //       })

  //   }

  // }

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


  console.log(user)


  return (
    <>
      <div className="flex flex-col gap-4 py-8">
        <div className='w-[700px] mx-auto flex flex-col gap-4 py-8 px-14 border rounded-xl shadow-md'>
          <h1 className='text-5xl mb-5 font-bold text-black'>Registration Here</h1>
          <form onSubmit={handleSignup} className='flex flex-col gap-4'>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input name='name' required type="text" className="grow" placeholder="Name" />
            </label>

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
              <input name='email' type="text" className="grow" placeholder="Email" />
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
              <input name='password' required type='password' className="grow" placeholder='Password' />

            </label>

            <label className="input input-bordered flex items-center gap-2">
              <MdOutlineAttachFile />
              <input name='image' required type="text" className="grow" placeholder="Photo URL" />
            </label>

            <input className='py-2 cursor-pointer px-5 rounded-2xl bg-[#a91625] text-2xl text-white font-bold' type="submit" value="Submit" />
          </form>

          <button onClick={handleGoogleLogin} className='py-2 pl-5 text-white font-semibold rounded-2xl bg-[#a91625] text-2xl flex items-center gap-2'><FaGoogle />Login with Google</button>

          {/* forget password */}
          <p className='text-xl text-black'>Forget Password? <Link to="/forget-password" className='text-[#a91625] font-bold'>Reset Password</Link></p>

          {/* Don't have an account? */}
          <p className='text-xl text-black'>Do you have an account? <Link to="/login" className='text-[#a91625] font-bold'>Log In</Link></p>



        </div>
      </div>
    </>
  )
}

Register.propTypes = {}

export default Register