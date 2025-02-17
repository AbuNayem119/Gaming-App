import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cod from '../../public/cod.jpg'
import { Link, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import Swal from 'sweetalert2'
import error from '../../public/error.webp'

const MyReview = props => {


  const { user, loading, setLoading } = useContext(AuthContext);
  const review = useLoaderData()
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (review && user?.email) {
      const filteredReviews = review.filter(data => data.userEmail === user.email);
      setReviews(filteredReviews)
    }
  }, [review, user]);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Start loading spinner
        setLoading(true);

        fetch(`http://localhost:5000/reviews/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Delete Response:", data);

            setLoading(false); // Stop loading spinner

            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your Review has been deleted.",
                "success"
              );

              // Update state to remove the deleted review
              const remaining = reviews.filter(review => review._id !== id);
              setReviews(remaining);
            } else {
              Swal.fire(
                "Error",
                "Could not delete the review. Try again later.",
                "error"
              );
            }
          })
          .catch((err) => {
            setLoading(false); // Stop loading spinner
            console.error("Error deleting review:", err);

            Swal.fire(
              "Error",
              "Something went wrong. Try again later.",
              "error"
            );
          });
      }
    });
  };


  // if (loading) {
  //   return <span className="loading loading-spinner text-error loading-lg"></span>;
  // }

  console.log(loading);
  console.log(reviews)

  let i = 1;

  return (
    <>


      {
        loading ? <div className="mx-auto text-center">
          <span id="loading-spinner" className={`loading loading-spinner loading-lg text-red-600 ${loading ? '' : 'hidden'}`}></span>
        </div> : ''
      }

      {
        reviews.length > 0 ?
          <section className="w-[1280px] mx-auto my-6">
            <table className="table bg-slate-300">
              {/* head */}
              <thead>
                <tr>
                  <th className='text-xl'>SL</th>
                  <th className='text-xl'>Name</th>
                  <th className='text-xl'>Image</th>
                  <th className='text-xl'>Rating</th>
                  <th className='text-xl'>Generas</th>
                  <th className='text-xl'>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {
                  reviews.map(review =>
                    <tr key={review._id}>
                      <td>{i++}</td>
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
                      <td className="flex gap-3">
                        <Link to={`/updateReview/${review._id}`}>
                          <button className="btn btn-ghost btn-md bg-orange-500 hover:bg-orange-600 text-white">Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(review._id)} className="btn btn-ghost btn-md bg-[#a91625] hover:bg-[#a91625] text-white">Delete</button>
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </section>
          :

          <>

            <div className={`${loading ? 'hidden' : ''}`}>
              <div className='text-4xl font-bold text-slate-500 text-center my-4'>No Data Found in My Review</div>
              <img className='mx-auto w-80 my-8' src={error} alt="" />
            </div>

          </>

      }
    </>
  )
}

MyReview.propTypes = {}

export default MyReview