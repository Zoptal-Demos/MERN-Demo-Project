import React, { useEffect, useState } from 'react'
import forget from '../img/forget_los.png'
import OTPInput, { ResendOTP } from "otp-input-react";
import Swim from '../img/Swim'
import Ac from '../img/Ac'
import Heater from '../img/Heater'
import Gas from '../img/Gas'
import { useNavigate } from 'react-router-dom';
import APIFunctions from '../ApiFunctions';

export default function Popup(props) {
    const [OTP, setOTP] = useState("");
    const [property, setProperty] = useState("Home Type");
    const [range, setRange] = useState("Range");
    const [select, setSelect] = useState("For Sale");

    const router = useNavigate()
    const [setShow, setShowClass] = useState('')
    useEffect(() => { setShowClass(props.showOtp); })
    const submitOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await APIFunctions.verifyOtp({ email: props.email, otp: OTP })
            if (response.data.status) {
                sessionStorage.setItem('email',props.email)
                router('/change_password')
            } else {
                console.log(response.data.data.message)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    const renderButton = (buttonProps) => {
        return <button className='btn r_send_btn' {...buttonProps}>
            {buttonProps.remainingTime !== 0 ? `Resend In ${buttonProps.remainingTime} sec` : "Resend"}
        </button>
    };
    const handleRadio = (name, val) => {

        name === 'for' ? setProperty(val) : setRange(val)
    };

    return (
        <>
            <div className="modal fade" id="filter" tabindex="-1" aria-labelledby="filter" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close_btn btn" data-bs-dismiss="modal" aria-label="Close">
                                <svg width="15px" height="15px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-xmark fa-xl"><path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" class=""></path></svg>
                            </button>
                        </div>
                        <div className="pop_title">Set Filter</div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <h4 className="pop_sub_title mb-4">Property Details:</h4>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="sqft">Property Sqft</label>
                                            <div className="combine mt-2">
                                                <input type="text" name="p_sqft" placeholder='Min' className='pop_input form-control' />
                                                <input type="text" name="p_sqft" placeholder='Max' className='pop_input form-control' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="sqft">Lot Size (Sqft)</label>
                                            <div className="combine mt-2">
                                                <input type="text" name="p_sqft" placeholder='Min' className='pop_input form-control' />
                                                <input type="text" name="p_sqft" placeholder='Max' className='pop_input form-control' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="sqft">Year Built</label>
                                            <div className="combine mt-2">
                                                <input type="text" name="p_sqft" placeholder='Min' className='pop_input form-control' />
                                                <input type="text" name="p_sqft" placeholder='Max' className='pop_input form-control' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="sqft">HOA Fee</label>
                                            <div className="combine mt-2">
                                                <input type="text" name="p_sqft" placeholder='$' className='pop_input form-control' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="addition_feature mt-4">
                                        <h4 className="pop_sub_title mb-4">Additional Features:</h4>
                                        <div className="add_feature_bg">
                                            <ul className="feature_opt">
                                                <li>
                                                    <input type="checkbox" name="swim" id="swimming" cl />
                                                    <span className='check_mark'></span>
                                                    <label htmlFor="swimming">
                                                        <Swim />
                                                        <span>Swimming</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="swim" id="Air" cl />
                                                    <span className='check_mark'></span>
                                                    <label htmlFor="Air">
                                                        <Ac />
                                                        <span>Air Conditioner</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="swim" id="Heating" cl />
                                                    <span className='check_mark'></span>
                                                    <label htmlFor="Heating">
                                                        <Heater />
                                                        <span>Heating</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="swim" id="Gas" cl />
                                                    <span className='check_mark'></span>
                                                    <label htmlFor="Gas">
                                                        <Gas />
                                                        <span>Gas</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="swim" id="Others" cl />
                                                    <span className='check_mark'></span>
                                                    <label htmlFor="Others">
                                                        <span>Others</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="filter_types mt-4">
                                        <div className="m-auto w-75">
                                            <div className="d-flex gap25">
                                                <div className="form-group w-50">
                                                    <div className="dropdown">
                                                        <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                                            {select}
                                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                                                                <path d="M15 1.0007C15 1.25656 14.8954 1.51254 14.6861 1.70752L8.25753 7.70705C7.83901 8.09765 7.16099 8.09765 6.74247 7.70705L0.313895 1.70752C-0.104632 1.31693 -0.104632 0.684165 0.313895 0.293571C0.732422 -0.097023 1.41043 -0.0970231 1.82896 0.293571L7.5 5.58628L13.1719 0.292946C13.5904 -0.0976483 14.2684 -0.0976483 14.6869 0.292946C14.8962 0.488243 15 0.744473 15 1.0007Z" fill="#02919A" />
                                                            </svg></span>
                                                        </button>
                                                        <ul className="dropdown-menu search_drop_color">
                                                            <li className="selector">
                                                                <label onClick={() => setSelect("RENT")}>Rent
                                                                    <input type="radio" name="properties" />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setSelect("SELL")}>Buy
                                                                    <input type="radio" name="properties" />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setSelect("AUCTION")}>Auction
                                                                    <input type="radio" name="properties" />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="form-group w-100">
                                                    <div className="dropdown">
                                                        <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                                            {property}
                                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                                                                <path d="M15 1.0007C15 1.25656 14.8954 1.51254 14.6861 1.70752L8.25753 7.70705C7.83901 8.09765 7.16099 8.09765 6.74247 7.70705L0.313895 1.70752C-0.104632 1.31693 -0.104632 0.684165 0.313895 0.293571C0.732422 -0.097023 1.41043 -0.0970231 1.82896 0.293571L7.5 5.58628L13.1719 0.292946C13.5904 -0.0976483 14.2684 -0.0976483 14.6869 0.292946C14.8962 0.488243 15 0.744473 15 1.0007Z" fill="#02919A" />
                                                            </svg></span>
                                                        </button>
                                                        <ul className="dropdown-menu search_drop_color">
                                                            <li className="selector">
                                                                <label onClick={() => handleRadio("for", "HOUSE")}>Houses
                                                                    <input type="radio" name="properties" />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => handleRadio("for", "FLAT")}>Flat
                                                                    <input type="radio" name="properties" />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => handleRadio("for", "APARTMENT")}>Apartments
                                                                    <input type="radio" name="properties" />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => handleRadio("for", "TOWNHOME")}>TownHomes
                                                                    <input type="radio" name="properties" />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => handleRadio("for", "CONDOS / CO-OPS")}>Condos / Co-ops
                                                                    <input type="radio" name="properties" value={"a"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => handleRadio("for", "LOTS / LAND")}>Lots / Land
                                                                    <input type="radio" name="properties" value={"asdf"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => handleRadio("for", "MANUFACTURED")}>Manufactured
                                                                    <input type="radio" name="properties" value={"saf"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="form-group w-100">
                                                    <div className="dropdown">
                                                        <button className="btn property_drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                                            {range}

                                                        </button>
                                                        <ul className="dropdown-menu search_drop_color">
                                                            <li className="selector">
                                                                <label onClick={() => setRange("$1,000 - $2,000")}>$1,000 - $2,000
                                                                    <input type="radio" name="porperty" value={"$1,000 - $2,000"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setRange("$2,000 - $5,000")}>$2,000 - $5,000
                                                                    <input type="radio" name="porperty" value={"$2,000 - $5,000"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setRange("$10,000 - $20,000")}>$10,000 - $20,000
                                                                    <input type="radio" name="porperty" value={"$10,000 - $20,000"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setRange("$50,000 - $100,000")}>$50,000 - $100,000
                                                                    <input type="radio" name="porperty" value={"$50,000 - $100,000"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setRange("$100,000 - $150,000")}>$100,000 - $150,000
                                                                    <input type="radio" name="porperty" value={"$100,000 - $150,000"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setRange("$300,000 - $500,000")}>$300,000 - $500,000
                                                                    <input type="radio" name="porperty" value={"$300,000 - $500,000"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                            <li className="selector">
                                                                <label onClick={() => setRange("$500,000 - And More")}>$500,000 - And More
                                                                    <input type="radio" name="porperty" value={"$500,000 - And More"} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal_footer">
                            <button type="button" className="btn web_btn m-auto w-25">Apply</button>
                            <div className="text-center mt-2 mb-2">
                                <a href="#" className='m-auto'>Reset Filter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forget Password Start */}
            <div className={"modal fade lost_pass " + setShow} id="setShow1" >
                <form onSubmit={submitOtp}>
                    <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close_btn btn" data-bs-dismiss="modal" aria-label="Close" onClick={() => { props.onClose(false) }}>
                                    <svg width="15px" height="15px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-xmark fa-xl"><path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" class=""></path></svg>
                                </button>
                            </div>
                            <div className="pop_top_img m-auto w-25">
                                <img src={forget} alt="lock" className='img-fluid' />
                            </div>
                            <h2 className="pop_title mt-5 pb-0 mb-0">To Verify For Forgot Password</h2>
                            <p className='text-center'>Please Enter The One Time Password We Sent On <br />Your Email ID.</p>
                            <div className="modal-body">
                                <div className="main_otp text-center">
                                    <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />
                                    <div className="resend_otp mt-3">
                                        <ResendOTP renderButton={renderButton} />
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className='btn web_btn w-50 m-auto' type='submit'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* Forget Password End */}
        </>
    )
}
