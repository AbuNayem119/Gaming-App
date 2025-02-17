import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Banner from '../components/Banner'
import GameCard from '../components/GameCard'
import { AuthContext } from '../auth/AuthProvider'
import { useLoaderData } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import Contact from '../components/Contact'
import About from '../components/About'


const Home = props => {

    const { gamedata } = useContext(AuthContext)

    const reviews = useLoaderData();

    // Show Reviews Sort by Rating and show only 6
    const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);

    const limitedReviews = sortedReviews.slice(0, 6);
    // const limitedReviews = reviews.slice(0, 6);
    

    // console.log(reviews)

    return (
        <>
            <div className="w-[1280px] mx-auto dark:bg-slate-800">

                <Banner></Banner>

                <div className="mt-16">
                    <div className="text-center">
                        <h1 className="text-5xl dark:text-white font-bold text-black">Highest Rated <span style={{ color: 'red', fontWeight: 'bold' }}>
                            <Typewriter
                                words={['Epic', 'Thrilling', 'Captivating', 'Mind-blowing', 'Masterpiece']}
                                loop={false}
                                cursor={true}
                                cursorStyle='|'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span> Game</h1>
                        <p className="text-xl mt-4 dark:text-slate-400">Don't miss the most popular games on OpenCritic today</p>
                    </div>
                    <div className="flex flex-wrap mt-10 gap-5 justify-center">
                        {
                            limitedReviews?.map(review =>
                                <GameCard key={review._id} review={review}></GameCard>
                            )
                        }
                    </div>
                </div>

                <Contact></Contact>

                <About></About>

            </div>
        </>
    )
}

Home.propTypes = {}

export default Home