import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'

const AllReview = () => {
  const { loading, setLoading } = useContext(AuthContext);

  // Load reviews data
  const reviews = useLoaderData();

  // State for displayed reviews
  const [displayedReviews, setDisplayedReviews] = useState(reviews);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Initialize displayedReviews with the original reviews data
  // useEffect(() => {
  //   setDisplayedReviews(reviews);
  // }, [reviews]);

  // Handle genre filtering
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);

    if (genre === 'All' || genre === 'Filter By Genres') {
      setDisplayedReviews(reviews); // Show all reviews
    } else {
      const filtered = reviews.filter((review) =>
        review.genre.toLowerCase() === genre.toLowerCase()
      );
      setDisplayedReviews(filtered);
    }
  };

  // Sort reviews by rating in descending order
  const sortByRating = () => {
    const sorted = [...displayedReviews].sort((a, b) => b.rating - a.rating);
    setDisplayedReviews(sorted);
  };

  // Sort reviews by year in descending order
  const sortByYear = () => {
    const sorted = [...displayedReviews].sort((a, b) => b.year - a.year);
    setDisplayedReviews(sorted);
  };

  // Handle sort selection from the dropdown
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === 'Rating') {
      sortByRating();
    } else if (value === 'Year') {
      sortByYear();
    }
  };

  // Set loading state to false after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [setLoading]);


  return (
    <>
      <div className="mt-10 w-[1280px] mx-auto">
        <div>
          <h1 className="text-5xl text-center font-bold text-[#a91625]">All Reviews</h1>
        </div>

        <div className="flex justify-between mx-5">
          <div>
            <select onChange={handleSortChange} className="select select-bordered w-full max-w-xs">
              <option>Sort By</option>
              <option value="Rating">Rating (Higher to Lower)</option>
              <option value="Year">Year (Letest to Oldest)</option>
            </select>
          </div>
          <div>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleGenreChange}>
              <option>Filter By Genres</option>
              <option value="All">All</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
        </div>

        <div className="mx-auto text-center">
          <span id="loading-spinner" className={`loading loading-spinner loading-lg text-red-600 ${loading ? '' : 'hidden'}`}></span>
        </div>

        <div className={`flex flex-wrap justify-center gap-5 mt-10 ${loading ? 'hidden' : ''}`}>

          {
            displayedReviews.map(review =>
              <div key={review._id} className='w-[400px] p-4 border rounded-md flex flex-col gap-3 mb-3 shadow-md'>
                <div>
                  <img className='w-full h-80 rounded-md' src={review.image} alt="" />
                </div>

                <div className='flex flex-col'>
                  <h2 className='text-2xl font-bold'>{review.name}</h2>
                  <div className='flex justify-between'>
                    <p className='text-lg font-semibold'>Rating : {review.rating}</p>
                    <p className='text-lg font-semibold'>Release : {review.year}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-lg font-semibold'>genre : {review.genre}</p>
                    <p className='text-lg font-semibold'>Reviewar : {review.userName}</p>
                  </div>
                </div>

                <Link to={`/reviews/${review._id}`}><button className='py-2 w-full text-white font-semibold rounded-2xl bg-[#a91625] text-2xl gap-2'>Details</button></Link>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

AllReview.propTypes = {}

export default AllReview