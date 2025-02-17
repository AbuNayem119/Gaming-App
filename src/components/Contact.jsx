import React from 'react'
import PropTypes from 'prop-types'

const Contact = props => {
    return (
        <>
            <div>
                <div>
                    <div className='max-w-[1540px] mt-8 mx-auto'>
                        <div className='py-8 flex flex-col gap-5 items-center'>
                            <h2 className='dark:text-white text-5xl font-bold text-black'>Contact With Us</h2>
                            <p className='dark:text-slate-400 w-7/12 text-xl text-center'>Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!</p>
                        </div>
                    </div>
                </div>
                <div className='max-w-[800px] mb-8 flex flex-col gap-3 justify-center items-center mx-auto border-2 border-[#a91625] dark:border-slate-400 p-6 rounded-2xl'>
                    <input type="text" placeholder="Your Name" className="input input-bordered bg-transparent p-7 input-secondary w-full border-[#a91625] dark:border-slate-400" />
                    <input type="text" placeholder="your Email" className="input bg-transparent input-bordered border-[#a91625] p-7 input-secondary w-full dark:border-slate-400" />
                    <textarea className="textarea bg-transparent  border-[#a91625] w-full textarea-lg textarea-secondary dark:border-slate-400" placeholder="Write Your Message"></textarea>
                    <button className='w-40 mx-auto py-2 text-white font-semibold rounded-2xl bg-[#a91625] text-2xl gap-2 dark:border-slate-400'>Submit</button>
                </div>
            </div>
        </>
    )
}

Contact.propTypes = {}

export default Contact