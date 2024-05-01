import React from 'react'
import img1 from '../img/property1.png'
import go from '../img/go.png'
export default function More_Search(props) {
    return (
        <>
            <div className="property_list_main" data-aos="fade-up">
                <div className="imagetop">
                    <img src={props.moreimg} alt="property image" className='img-fluid' />
                </div>
                <div className="d-flex name_details justify-content-between mt-3">
                    <div className="name">{props.name}</div>
                </div>
                <div className="going_search d-flex align-items-center">
                    {/* <div className="text">
                        <p className='p-0 m-0'>Lorem Ipsum is simply dummy text of the printing and</p>
                    </div> */}
                    <div className="go_search">
                        <button className='btn'><img src={go} alt="Search " /></button>
                    </div>
                </div>
            </div>
        </>
    )
}
