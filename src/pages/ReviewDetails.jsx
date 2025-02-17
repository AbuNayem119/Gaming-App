import React, { useContext, useEffect, useState } from 'react'
import cod from '../../public/cod.jpg'
import PropTypes from 'prop-types'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const ReviewDetails = props => {

    const navigate = useNavigate();

    const { user, setLoading } = useContext(AuthContext);
    console.log("User email:", user?.email);

    const review = useLoaderData();
    console.log("Review data:", review);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setIsLoading(false); // Stop loading
                setLoading(false); // Ensure loading is stopped in the auth context
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setIsLoading(false);
                setLoading(false);
            });
    }, [setLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log("Users data:", users);

    const currentUser = users.find((data) => data.email === user?.email) || null;
    console.log("Current User:", currentUser);

    const watchListCollection = () => {
        if (currentUser) {
            const user_name = currentUser.name;
            const user_email = currentUser.email;
            const game_id = review._id;

            const user_data = { user_name, user_email, game_id };
            console.log("WatchList Data to Check:", user_data);

            // Check if the review already exists in the database
            fetch(`http://localhost:5000/watchlist/${user_email}/${game_id}`)
                .then((res) => {
                    console.log("Raw Response:", res); // Debugging
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.text(); // Use text() to safely handle empty responses
                })
                .then((text) => {
                    const existingData = text ? JSON.parse(text) : null; // Parse only if response isn't empty
                    console.log("Existing Data Response:", existingData);

                    if (existingData) {
                        Swal.fire({
                            icon: "info",
                            title: "Already Added",
                            text: "This review is already in your watchlist.",
                        });
                    } else {
                        console.log("No existing data. Sending to database:", user_data); // Debugging
                        // Data does not exist, send it to the database
                        fetch("http://localhost:5000/watchlist", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(user_data),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                // toast.success("Added Successfully!", {
                                //     position: "top-center",
                                // });
                                Swal.fire({
                                    icon: "success",
                                    title: "Added Successfully",
                                    text: "This review has been added to your watchlist.",
                                })
                                console.log("Added Successfully:", data);
                            })
                            .catch((err) => {
                                console.error("Error adding review to watchlist:", err);
                            });
                    }
                })
                .catch((err) => {
                    console.error("Error checking watchlist:", err); // Debugging
                });
        } else {
            toast.error("Please Login First!", {
                position: "top-center",
            });
            navigate("/login");
        }
    };



    // const watchListCollection = () => {
    //     if (currentUser) {
    //         const user_name = currentUser.name;
    //         const user_email = currentUser.email;
    //         const game_id = review._id;

    //         const user_data = { user_name, user_email, game_id };
    //         console.log("WatchList Data:", user_data);

    //         // Check if the review already exists in the database
    //         fetch(`http://localhost:5000/watchlist/${user_email}/${game_id}`)
    //             .then((res) => res.json())
    //             .then((existingData) => {
    //                 if (existingData && Object.keys(existingData).length > 0) {
    //                     // Data already exists
    //                     Swal.fire({
    //                         icon: "info",
    //                         title: "Already Added",
    //                         text: "This review is already in your watchlist.",
    //                     });
    //                     console.log("Existing Data:", existingData);
    //                     return;
    //                 } else {
    //                     // Data does not exist, send it to the database
    //                     fetch("http://localhost:5000/watchlist", {
    //                         method: "POST",
    //                         headers: {
    //                             "content-type": "application/json",
    //                         },
    //                         body: JSON.stringify(user_data),
    //                     })
    //                         .then((res) => res.json())
    //                         .then((data) => {
    //                             toast.success("Added Successfully!", {
    //                                 position: "top-center",
    //                             });
    //                             console.log("Added Successfully:", data);
    //                             // navigate("/gameWatchList");
    //                         })
    //                         .catch((err) => {
    //                             console.error("Error adding review to watchlist:", err);
    //                         });
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.error("Error checking watchlist:", err);
    //             });
    //     } else {
    //         toast.error("Please Login First!", {
    //             position: "top-center",
    //         });
    //         navigate("/login");
    //     }
    // };


    //     .then((res) => res.json())
    //     .then((existingData) => {
    //         if (existingData.length > 0) {
    //             Swal.fire({
    //                 icon: "info",
    //                 title: "Already Added",
    //                 text: "This review is already in your watchlist.",
    //             });
    //             return;
    //         }
    //     })
    //     .catch((err) => {
    //         console.error("Error adding review to watchlist:", err);
    //     });

    // // Send user data to the database
    // fetch("http://localhost:5000/watchlist", {
    //     method: "POST",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify(user_data),
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         toast.success("Added Successfully !", {
    //             position: "top-center",
    //         });
    //         // navigate("/gameWatchList");
    //     })
    //     .catch((err) => {
    //         console.error("Error adding review to watchlist:", err);
    //     });

    // Step 1: Check if the review already exists in the database
    // fetch(`http://localhost:5000/watchlist?userEmail=${user_email}&gameId=${game_id}`)
    //     .then((res) => res.json())
    //     .then((existingData) => {
    //         if (existingData.length > 0) {
    //             Swal.fire({
    //                 icon: "info",
    //                 title: "Already Added",
    //                 text: "This review is already in your watchlist.",
    //             });
    //             return;
    //         }

    //         // Step 3: If not, proceed to add it
    //         fetch("http://localhost:5000/watchlist", {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //             body: JSON.stringify(user_data),
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: "Added Successfully",
    //                     text: "Review has been added to your watchlist.",
    //                 });
    //             })
    //             .catch((err) => {
    //                 console.error("Error adding review to watchlist:", err);
    //             });
    //     })
    //     .catch((err) => {
    //         console.error("Error checking for existing review:", err);
    //     });
    // } else {
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Please login first . . !",
    //         footer: `<a style="text-decoration: underline; color: #a91625; font-weight: semibold; font-size: 18px" href="/login">Do you want to login Now?</a>`
    //     });
    // }
    // };

    //-----------------------------------------------------

    return (
        <>
            <div className='w-[800px] mx-auto my-5 flex flex-col gap-3'>
                <div>
                    <img className='w-full h-80 rounded-md' src={review.image} alt="" />
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold'>{review.name}</h1>
                    <p className='text-3xl font-bold'>Rating : {review.rating}</p>
                </div>
                <p>Game Id : {review._id}</p>
                <div>
                    <p className='text-lg'>{review.description}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-lg'>Reviewer's Name : {review.userName}</p>
                    <p className='text-lg'>Reviewer's Email : {review.userEmail}</p>
                </div>
                <div>
                    <button onClick={watchListCollection} className='py-2 w-full text-white font-semibold rounded-2xl bg-[#a91625] text-2xl gap-2'>Add to WatchList</button>
                </div>
            </div>
        </>
    )
}

ReviewDetails.propTypes = {}

export default ReviewDetails