import React,{ useState } from 'react'
import login_img from '../img/login_banner.jpg'
import GreenLogo from '../img/green-logo.png'
import CommonFunctions from '../CommonFunctions'
import  { postRequest } from '../ApiFunctions'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'
import API from '../Api'

export default function Change_password() {
    const router = useNavigate()
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState(false);
    const [showOtp, setshowOtp] = useState(false);
    const showPass = () => {
        setShow(!show);
        setPass(!pass)
    }
    const [password,setEmail] = useState({
        password : '',
        cpassword : ''
    });
    const handleInput = (e) => {
        setEmail({
            ...password,
            [e.target.name]: e.target.value.trim()
        })
    }
    const verifyPassword = async (e) => {
        e.preventDefault()
        try {
            const data = await postRequest(API.CHANGE_PASSWORD,{email : sessionStorage.getItem('email'),password : password.password});
            if(data.data.status && data.data.code == 200){
                router('/')
                console.log(data.data.message)
            }else{
                console.log(data.data.message)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>
            <section className='login_page container-fluid'>
                <div className="login_page_inner row ">
                    <div className="left_side col-lg-6 p-0">
                        <img src={login_img} alt="Login banner" className='img-fluid' />
                    </div>
                    <div className="right_side p-3 col-lg-6">
                        <div className="logn_logo">
                            <img src={GreenLogo} alt="Login Logo" />
                        </div>
                        <div className="login_form mt-5">
                            <div className="login_top_heading text-center">
                                <h3>Change Password</h3>
                                <p>Enter Password For Change Password</p>
                            </div>
                    <form>
                            <div className="form_login mt-5 row">
                                <div className="center_content col-9 m-auto">
                                    <div className="form-group">
                                        <input type="password" name='password' value={password.password} onChange={handleInput} className='form-control' placeholder='Enter Password' />
                                        <span><svg width="18" height="22" viewBox="0 0 18 22" fill="none"><path d="M2.875 21.5H15.125C15.8212 21.5 16.4889 21.2234 16.9812 20.7312C17.4734 20.2389 17.75 19.5712 17.75 18.875V11.875C17.75 11.1788 17.4734 10.5111 16.9812 10.0188C16.4889 9.52656 15.8212 9.25 15.125 9.25H5.5V5.75C5.5 4.82174 5.86875 3.9315 6.52513 3.27513C7.1815 2.61875 8.07174 2.25 9 2.25C9.92826 2.25 10.8185 2.61875 11.4749 3.27513C12.1313 3.9315 12.5 4.82174 12.5 5.75C12.5 5.98206 12.5922 6.20462 12.7563 6.36872C12.9204 6.53281 13.1429 6.625 13.375 6.625C13.6071 6.625 13.8296 6.53281 13.9937 6.36872C14.1578 6.20462 14.25 5.98206 14.25 5.75C14.25 4.35761 13.6969 3.02226 12.7123 2.03769C11.7277 1.05312 10.3924 0.5 9 0.5C7.60761 0.5 6.27226 1.05312 5.28769 2.03769C4.30312 3.02226 3.75 4.35761 3.75 5.75V9.25H2.875C2.17881 9.25 1.51113 9.52656 1.01884 10.0188C0.526562 10.5111 0.25 11.1788 0.25 11.875V18.875C0.25 19.5712 0.526562 20.2389 1.01884 20.7312C1.51113 21.2234 2.17881 21.5 2.875 21.5ZM2 11.875C2 11.6429 2.09219 11.4204 2.25628 11.2563C2.42038 11.0922 2.64294 11 2.875 11H15.125C15.3571 11 15.5796 11.0922 15.7437 11.2563C15.9078 11.4204 16 11.6429 16 11.875V18.875C16 19.1071 15.9078 19.3296 15.7437 19.4937C15.5796 19.6578 15.3571 19.75 15.125 19.75H2.875C2.64294 19.75 2.42038 19.6578 2.25628 19.4937C2.09219 19.3296 2 19.1071 2 18.875V11.875Z" fill="#02919A"></path><path d="M8.125 16.005V17.125C8.125 17.3571 8.21719 17.5796 8.38128 17.7437C8.54538 17.9078 8.76794 18 9 18C9.23206 18 9.45462 17.9078 9.61872 17.7437C9.78281 17.5796 9.875 17.3571 9.875 17.125V16.005C10.1395 15.8523 10.3594 15.633 10.5129 15.369C10.6664 15.105 10.7482 14.8054 10.75 14.5C10.75 14.0359 10.5656 13.5908 10.2374 13.2626C9.90925 12.9344 9.46413 12.75 9 12.75C8.53587 12.75 8.09075 12.9344 7.76256 13.2626C7.43437 13.5908 7.25 14.0359 7.25 14.5C7.25184 14.8054 7.33358 15.105 7.48708 15.369C7.64058 15.633 7.86051 15.8523 8.125 16.005Z" fill="#02919A"></path></svg>
                                        </span>
                                    </div>
                                    <div className="form-group mt-4">
                                        <input type="password" name='cpassword' value={password.cpassword} onChange={handleInput} className='form-control' placeholder='Confirm Password' />
                                        <span><svg width="18" height="22" viewBox="0 0 18 22" fill="none"><path d="M2.875 21.5H15.125C15.8212 21.5 16.4889 21.2234 16.9812 20.7312C17.4734 20.2389 17.75 19.5712 17.75 18.875V11.875C17.75 11.1788 17.4734 10.5111 16.9812 10.0188C16.4889 9.52656 15.8212 9.25 15.125 9.25H5.5V5.75C5.5 4.82174 5.86875 3.9315 6.52513 3.27513C7.1815 2.61875 8.07174 2.25 9 2.25C9.92826 2.25 10.8185 2.61875 11.4749 3.27513C12.1313 3.9315 12.5 4.82174 12.5 5.75C12.5 5.98206 12.5922 6.20462 12.7563 6.36872C12.9204 6.53281 13.1429 6.625 13.375 6.625C13.6071 6.625 13.8296 6.53281 13.9937 6.36872C14.1578 6.20462 14.25 5.98206 14.25 5.75C14.25 4.35761 13.6969 3.02226 12.7123 2.03769C11.7277 1.05312 10.3924 0.5 9 0.5C7.60761 0.5 6.27226 1.05312 5.28769 2.03769C4.30312 3.02226 3.75 4.35761 3.75 5.75V9.25H2.875C2.17881 9.25 1.51113 9.52656 1.01884 10.0188C0.526562 10.5111 0.25 11.1788 0.25 11.875V18.875C0.25 19.5712 0.526562 20.2389 1.01884 20.7312C1.51113 21.2234 2.17881 21.5 2.875 21.5ZM2 11.875C2 11.6429 2.09219 11.4204 2.25628 11.2563C2.42038 11.0922 2.64294 11 2.875 11H15.125C15.3571 11 15.5796 11.0922 15.7437 11.2563C15.9078 11.4204 16 11.6429 16 11.875V18.875C16 19.1071 15.9078 19.3296 15.7437 19.4937C15.5796 19.6578 15.3571 19.75 15.125 19.75H2.875C2.64294 19.75 2.42038 19.6578 2.25628 19.4937C2.09219 19.3296 2 19.1071 2 18.875V11.875Z" fill="#02919A"></path><path d="M8.125 16.005V17.125C8.125 17.3571 8.21719 17.5796 8.38128 17.7437C8.54538 17.9078 8.76794 18 9 18C9.23206 18 9.45462 17.9078 9.61872 17.7437C9.78281 17.5796 9.875 17.3571 9.875 17.125V16.005C10.1395 15.8523 10.3594 15.633 10.5129 15.369C10.6664 15.105 10.7482 14.8054 10.75 14.5C10.75 14.0359 10.5656 13.5908 10.2374 13.2626C9.90925 12.9344 9.46413 12.75 9 12.75C8.53587 12.75 8.09075 12.9344 7.76256 13.2626C7.43437 13.5908 7.25 14.0359 7.25 14.5C7.25184 14.8054 7.33358 15.105 7.48708 15.369C7.64058 15.633 7.86051 15.8523 8.125 16.005Z" fill="#02919A"></path></svg>
                                        </span>
                                    </div>
                                    <div className="submit_btn mt-4">
                                        <button className='btn web_btn' data-bs-toggle="modal" data-bs-target="#forget_pass" type='submit' disabled={CommonFunctions.validate(password) || (password.password != password.cpassword)} onClick={verifyPassword}>Change Password</button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Popup onClose={()=>{setshowOtp(false)}} showOtp={showOtp?'show_p show':''}/>
        </>
    )
}
