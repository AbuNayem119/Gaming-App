import React from 'react'
import PropTypes from 'prop-types'

const About = props => {
    return (
        <>
            <div className='pb-10'>
                <div className='max-w-[1540px] mt-8 mx-auto'>
                    <div className='py-8 flex flex-col gap-5 items-center'>
                        <h2 className='dark:text-white text-5xl font-bold text-black'>About Us</h2>
                        <p className='w-8/12 text-lg text-center dark:text-slate-400'>Chill Gamer is a user-friendly platform designed for gamers to explore, share, and discover game reviews effortlessly. With a focus on simplicity and functionality, Chill Gamer offers a clean, responsive interface that ensures a seamless browsing experience. Key features like user authentication and review management allow users to securely contribute their insights and engage with the gaming community. Whether you're seeking honest reviews or sharing your gaming experiences, Chill Gamer is the perfect place to unwind and connect with fellow gamers.</p>
                        <button className='w-40 mx-auto py-2 text-white font-semibold rounded-2xl bg-[#a91625] text-2xl gap-2'>Learn More</button>
                    </div>
                </div>
            </div>
        </>
    )
}

About.propTypes = {}

export default About