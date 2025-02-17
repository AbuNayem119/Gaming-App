import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cod from '../../public/cod.jpg'
import { Link, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import Swal from 'sweetalert2'
import error from '../../public/error.webp'

const GameWatchList = props => {


  const { user, loading, setLoading } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState()

  const [watchList, setWatchList] = useState([])

  const [reviewsData, setReviewsData] = useState([]);

  // Get watch list data
  const reviews = useLoaderData();





  //-------------------------------------------------------

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data)
      })
  }, [])


  useEffect(() => {
    fetch('http://localhost:5000/watchlist')
      .then(res => res.json())
      .then(data => {
        setWatchList(data)
      })
  }, [])

  const userWatchList = watchList.filter(data => data.user_email === user?.email)

  // console.log(currentUser)

  // console.log(user?.email)


  // console.log(userWatchList)
  // // console.log(reviews)

  const finalData = reviews.filter(data => userWatchList.map(data => data.game_id).includes(data._id))

  // const handleDelete = (id) => {

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Swal.fire({
  //       //   title: "Deleted!",
  //       //   text: "Your file has been deleted.",
  //       //   icon: "success"
  //       // });

  //       fetch(`http://localhost:5000/watchlist/${id}`, {
  //         method: 'DELETE'
  //       })
  //         .then(res => res.json())
  //         .then(data => {
  //           console.log(data)

  //           // setLoading(false)

  //           if (data.deletedCount > 0) {
  //             Swal.fire(
  //               'Deleted!',
  //               'Your Review has been deleted.',
  //               'success'
  //             )
  //             const remaining = reviews.filter(review => review._id !== id)
  //             setReviewsData(remaining)
  //           }
  //         })
  //     }
  //   });

  // }




  let count = 0;

  return (
    <>

      {
        loading ? <div className="mx-auto text-center">
          <span id="loading-spinner" className={`loading loading-spinner loading-lg text-red-600 ${loading ? '' : 'hidden'}`}></span>
        </div> : ''
      }

      {userWatchList.length > 0 ?
        <div className="w-[1280px] mx-auto my-6">
          <table className="table bg-slate-300">
            {/* head */}
            <thead>
              <tr>
                <th className='text-xl'>SL</th>
                <th className='text-xl'>Name</th>
                <th className='text-xl'>Image</th>
                <th className='text-xl'>Rating</th>
                <th className='text-xl'>Generas</th>
                {/* <th className='text-xl'>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                finalData?.map(review =>
                  <tr key={review._id}>
                    <th>{++count}</th>
                    <td>{review.name}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="">
                          <img className='h-16 w-32 rounded-md' src={review.image} alt="" />
                        </div>
                      </div>
                    </td>

                    <td>{review.rating}</td>
                    <td>{review.genre}</td>
                    <th className="flex gap-3">
                      {/* <Link to={`/updateReview/:id`}>
                    <button className="btn btn-ghost btn-md bg-orange-500 hover:bg-orange-600 text-white">Edit</button>
                  </Link> */}
                      {/* <button onClick={() => handleDelete(review._id)} className="btn btn-ghost btn-md bg-[#a91625] hover:bg-[#a91625] text-white">Delete</button> */}
                    </th>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        :
        <>

          <div className={`${loading ? 'hidden' : ''}`}>
            <div className='text-4xl font-bold text-slate-500 text-center my-4'>No Data found in watchlist</div>
            <img className='mx-auto w-80 my-8' src={error} alt="" />
          </div>

        </>
      }
    </>
  )
}

GameWatchList.propTypes = {}

export default GameWatchList