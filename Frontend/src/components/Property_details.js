import React from 'react'
import img1 from '../img/property1.png'


export default function Property_details() {
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="title mt-3 mb-3">Flat For Sell</div>
                    <div className="col-lg-7">
                        <div className="property_img">
                            <img src={img1} alt="Property Image " className='img-fluid w-100' />
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="location_map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3685463891984!2d-73.98750018467038!3d40.75391814298713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259aaebe1f649%3A0x4459eb2b1bfb093a!2s1065%206th%20Ave%20%231001%2C%20New%20York%2C%20NY%2010018%2C%20USA!5e0!3m2!1sen!2sin!4v1667477848362!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
