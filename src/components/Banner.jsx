import React from 'react'
import PropTypes from 'prop-types'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = props => {
    return (
        <>
            <div className="w-[1280px] mx-auto mt-5">
                <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} stopOnHover={false}>
                    <div>
                        <img className='h-[400px] rounded-xl' src="slider1.jpg" />
                        {/* <p className="legend">Legend 1</p> */}
                    </div>
                    <div>
                        <img className='h-[400px] rounded-xl' src="slider2.jpg" />
                        {/* <p className="legend">Legend 2</p> */}
                    </div>
                    <div>
                        <img className='h-[400px] rounded-xl' src="slider3.jpg" />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                    <div>
                        <img className='h-[400px] rounded-xl' src="slider4.jpg" />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                    <div>
                        <img className='h-[400px] rounded-xl' src="slider5.jpg" />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                </Carousel>
            </div>
        </>
    )
}

Banner.propTypes = {}

export default Banner