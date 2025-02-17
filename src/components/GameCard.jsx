
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const GameCard = ({ review }) => {

    return (
        <>
            <div className="w-[400px]">
                <div key={review._id} className='p-4 border rounded-md flex flex-col gap-3 shadow-md'>
                    <div>
                        <img className='w-full h-80 rounded-md' src={review.image} alt="" />
                    </div>

                    <div>
                        <h2 className='text-xl font-bold dark:text-white'>{review.name}</h2>
                        <div className='flex justify-between'>
                            <p className='text-lg font-semibold dark:text-slate-400'>Rating : {review.rating}</p>
                            <p className='text-lg font-semibold dark:text-slate-400'>Generes : {review.genre}</p>
                        </div>
                    </div>

                    <Link to={`/reviews/${review._id}`}><button className='py-2 w-full text-white font-semibold rounded-2xl bg-[#a91625] text-2xl gap-2'>Explore Details</button></Link>
                </div>
            </div>
        </>
    )
}

GameCard.propTypes = {}

export default GameCard