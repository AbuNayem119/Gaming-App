import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'

const UpdateReview = props => {

    const review = useLoaderData();

    const handleUpdate = (e) => {
        event.preventDefault();

        const name = e.target.name.value
        const image = e.target.image.value
        const rating = e.target.rating.value
        const year = e.target.year.value
        const genre = e.target.genre.value
        const userName = e.target.userName.value
        const userEmail = e.target.userEmail.value
        const description = e.target.description.value

        const reviewData = { name, image, rating, year, genre, userName, userEmail, description }
        console.log(reviewData)

        // Update Data to Server
        fetch(`http://localhost:5000/reviews/${review._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert('Review updated successfully')
                }
            })

    }

    return (
        <>
            <div className="flex flex-col gap-4 py-4">
                <div className='w-[800px] mx-auto flex flex-col gap-4 py-8 px-14 border rounded-xl shadow-md'>
                    <h1 className='text-5xl mb-5 font-bold text-black'>Update Review</h1>

                    <form onSubmit={handleUpdate} className='flex justify-between flex-wrap'>

                        <div className='w-[48%] mb-4'>
                            <p>Game Cover Image</p>
                            <label className="input input-bordered flex items-center gap-2">
                                <input name="image" defaultValue={review.image} type="text" className="grow" placeholder='URL for the game cover' />
                            </label>
                        </div>
                        <div className='w-[48%] mb-4'>
                            <p>Game Title</p>
                            <label className="input input-bordered flex items-center gap-2">
                                <input name="name" defaultValue={review.name} type="text" className="grow" placeholder='Name' />
                            </label>
                        </div>
                        <div className='w-[48%] mb-4'>
                            <p>Rating</p>
                            <label className="input input-bordered flex items-center gap-2">
                                <input name="rating" defaultValue={review.rating} type="text" className="grow" placeholder='Provide Rating from 1 to 5' />
                            </label>
                        </div>

                        <div className='w-[48%] mb-4'>
                            <p>Publishing year</p>
                            <label className="input input-bordered flex items-center gap-2">
                                <input name="year" defaultValue={review.year} type="text" className="grow" placeholder='Ex: 2021, 2024' />
                            </label>
                        </div>

                        <div className='w-full mb-4'>
                            <p>Game Genres</p>
                            <label className="input input-bordered flex items-center gap-2">
                                <select name="genre" defaultValue={review.genre} type="text" className="grow" placeholder='Name'>
                                    <option value="Action">Action</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="RPG">RPG</option>
                                    <option value="Strategy">Strategy</option>
                                </select>
                            </label>
                        </div>

                        <div className='w-[48%] mb-4'>
                            <p>User Name</p>
                            <label className="input input-bordered flex items-center gap-2">
                                <input name="userName" defaultValue={review.userName} type="text" className="grow" placeholder='Name' />
                            </label>
                        </div>

                        <div className='w-[48%] mb-4'>
                            <p>User Email</p>
                            <label className="input input-bordered flex items-center gap-2">
                                <input name="userEmail" defaultValue={review.userEmail} type="text" className="grow" placeholder='Email' />
                            </label>
                        </div>

                        <div className='w-full mb-4'>
                            <p>Review Description</p>
                            <textarea name='description'
                                placeholder="A detailed review of the game" defaultValue={review.description}
                                className="textarea textarea-bordered textarea-lg w-full"></textarea>
                        </div>


                        <input className='py-2 cursor-pointer px-5 rounded-2xl bg-[#a91625] text-2xl text-white font-bold' type="submit" value="Submit" />

                    </form>



                    {/* <button className='py-2 pl-5 text-white font-semibold rounded-2xl bg-[#a91625] text-2xl flex items-center gap-2'><FaGoogle />Login with Google</button> */}

                    {/* forget password
          <p className='text-xl text-black'>Forget Password? <Link to="/forget-password" className='text-[#a91625] font-bold'>Reset Password</Link></p>

          {/* Don't have an account? */}
                    {/* <p className='text-xl text-black'>Don't have an account? <Link to="/register" className='text-[#a91625] font-bold'>Sign Up</Link></p> */}


                </div>
            </div>
        </>
    )
}

UpdateReview.propTypes = {}

export default UpdateReview