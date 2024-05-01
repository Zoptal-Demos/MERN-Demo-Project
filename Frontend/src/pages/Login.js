import React,{ useState } from 'react'
import login_img from '../img/login_banner.jpg'
import GreenLogo from '../img/green-logo.png'
import CommonFunctions from '../CommonFunctions'
import APIFunctions, { postRequest } from '../ApiFunctions'
import Toast from '../components/Toast'
import { useNavigate } from 'react-router-dom'
import API from '../Api'

export default function Login() {
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState(false);
    const router = useNavigate();
    const showPass = () => {
        setShow(!show);
        setPass(!pass)
    }
    const [login, setLogin] = useState({
        email: '',
        password: '',
        device_token: "string",
        device_type: "string",
        app_version: "string",
        device_model: "string",
        login_type : "NORMAL"
    })
    const handleInput = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value.trim()
        })
    }
    const loginNow = async (e) => {
        e.preventDefault()
        try {
            const data = await postRequest(API.LOGIN,login);
            if(data.data.status && data.data.code == 200){
                router('/')
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
                                <h3>Get Started Is Easy</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br />industry. Lorem </p>
                            </div>
                            <div className="login_social_login mt-5">
                                <div className="google_login social_login_btn">
                                    <button className='btn'>
                                        <span>
                                            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" >
                                                <path d="M11.5004 4.44715C13.1482 4.4218 14.7418 5.03568 15.9467 6.15999L19.1921 2.98643C17.1099 1.03534 14.3536 -0.0345242 11.5004 0.000850058C9.36853 0.000357454 7.27856 0.592919 5.46421 1.71227C3.64986 2.83162 2.18266 4.43362 1.22668 6.33912L4.94539 9.22628C5.40009 7.84369 6.27732 6.63871 7.45338 5.78127C8.62944 4.92383 10.045 4.45719 11.5004 4.44715Z" fill="#E43E2B" />
                                                <path d="M22.5401 11.7571C22.5537 10.9666 22.472 10.1773 22.2969 9.40625H11.5001V13.6745H17.8384C17.7182 14.4228 17.4478 15.1391 17.0436 15.7803C16.6394 16.4214 16.1097 16.9742 15.4864 17.4054L19.1156 20.2162C20.2466 19.1243 21.136 17.8072 21.7265 16.3502C22.3169 14.8931 22.5952 13.3284 22.5434 11.7571H22.5401Z" fill="#3B7DED" />
                                                <path d="M4.95865 13.7752C4.70721 13.0431 4.57759 12.2747 4.57495 11.5006C4.57953 10.7278 4.70451 9.96038 4.94538 9.22603L1.22668 6.33887C0.420122 7.94017 0 9.70819 0 11.5012C0 13.2941 0.420122 15.0621 1.22668 16.6634L4.95865 13.7752Z" fill="#F0B501" />
                                                <path d="M11.5003 23.0008C14.3015 23.08 17.0267 22.0833 19.1157 20.2154L15.4866 17.4045C14.3099 18.1934 12.9164 18.5954 11.5003 18.5545C10.0461 18.5459 8.63162 18.0796 7.4574 17.2217C6.28319 16.3639 5.4089 15.1581 4.95857 13.7754L1.23987 16.6637C2.19326 18.5683 3.65806 20.1699 5.47023 21.2892C7.28239 22.4084 9.37036 23.0011 11.5003 23.0008Z" fill="#2BA24C" />
                                            </svg>
                                        </span>Log In With Gmail</button>
                                </div>
                                <div className="facebook_login social_login_btn">
                                    <button className='btn'> <span><svg width="23" height="23" viewBox="0 0 23 23" fill="none" >
                                        <rect width="23" height="23" rx="11.5" fill="#1977F3" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5334 22.8205C12.8734 22.9383 12.194 22.9997 11.5002 22.9997C10.8851 22.9997 10.2814 22.9514 9.69253 22.8585V15.1631H6.57169V11.6219H9.69253V8.9229C9.69253 5.85331 11.5264 4.15723 14.3349 4.15723C15.2565 4.17006 16.176 4.25007 17.086 4.39661V7.41159H15.5353C14.0087 7.41159 13.5334 8.35584 13.5334 9.32561V11.6224H16.9421L16.3972 15.1631H13.5334V22.8205Z" fill="white" />
                                    </svg>
                                    </span>Log In With Facebook</button>
                                </div>
                            </div>
                            <div className="or_div text-center mt-5">
                                <div className="Or">Or Sign In With Email</div>
                            </div>
                            <div className="form_login mt-5 row">
                                <form onSubmit={loginNow}>
                                    <div className="center_content col-9 m-auto">
                                        <div className="form-group">
                                            <input type="email" name='email' onChange={handleInput} className='form-control' value={login.email} placeholder='Email' />
                                            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                                <path d="M16.1973 3C19.398 3.00979 21.9903 5.6212 22 8.84554V10.3069L21.9935 10.4037C21.9467 10.7516 21.6506 11.0198 21.2923 11.0198L21.2835 11.002L21.1721 10.9931C21.0257 10.9696 20.8893 10.9001 20.7831 10.7932C20.6504 10.6595 20.5759 10.4782 20.5759 10.2891V8.84554C20.5519 6.41955 18.6055 4.45879 16.1973 4.43465H7.80274C5.39451 4.45879 3.44811 6.41955 3.42415 8.84554V15.1545C3.44811 17.5805 5.39451 19.5412 7.80274 19.5653H16.1973C18.6055 19.5412 20.5519 17.5805 20.5759 15.1545C20.6163 14.7891 20.923 14.5127 21.2879 14.5127C21.6529 14.5127 21.9595 14.7891 22 15.1545C21.9903 18.3788 19.398 20.9902 16.1973 21H7.80274C4.6 20.9951 2.00487 18.3808 2 15.1545V8.84554C2 5.61714 4.59798 3 7.80274 3H16.1973ZM6.29443 8.38693C6.4807 8.36682 6.66718 8.4229 6.81203 8.54257L10.9695 11.8574C11.4888 12.2679 12.2193 12.2679 12.7386 11.8574L16.8518 8.54257H16.8607L16.9474 8.48292C17.2462 8.30809 17.6345 8.3726 17.8602 8.64951C17.9785 8.798 18.0329 8.988 18.0113 9.17715C17.9897 9.36629 17.8939 9.53888 17.7452 9.65644L13.632 12.9802C12.5862 13.828 11.0954 13.828 10.0495 12.9802L5.92747 9.65644L5.85135 9.58356C5.61891 9.32594 5.59998 8.93 5.82132 8.64951C5.93771 8.50163 6.10817 8.40703 6.29443 8.38693Z" fill="#02919A" />
                                            </svg>
                                            </span>
                                        </div>
                                        <div className="form-group mt-4">
                                            <input type={pass ? "text" : "password"} onChange={handleInput} name='password' value={login.password} className='form-control' placeholder='Password' />
                                            <span><svg width="18" height="22" viewBox="0 0 18 22" fill="none" >
                                                <path d="M2.875 21.5H15.125C15.8212 21.5 16.4889 21.2234 16.9812 20.7312C17.4734 20.2389 17.75 19.5712 17.75 18.875V11.875C17.75 11.1788 17.4734 10.5111 16.9812 10.0188C16.4889 9.52656 15.8212 9.25 15.125 9.25H5.5V5.75C5.5 4.82174 5.86875 3.9315 6.52513 3.27513C7.1815 2.61875 8.07174 2.25 9 2.25C9.92826 2.25 10.8185 2.61875 11.4749 3.27513C12.1313 3.9315 12.5 4.82174 12.5 5.75C12.5 5.98206 12.5922 6.20462 12.7563 6.36872C12.9204 6.53281 13.1429 6.625 13.375 6.625C13.6071 6.625 13.8296 6.53281 13.9937 6.36872C14.1578 6.20462 14.25 5.98206 14.25 5.75C14.25 4.35761 13.6969 3.02226 12.7123 2.03769C11.7277 1.05312 10.3924 0.5 9 0.5C7.60761 0.5 6.27226 1.05312 5.28769 2.03769C4.30312 3.02226 3.75 4.35761 3.75 5.75V9.25H2.875C2.17881 9.25 1.51113 9.52656 1.01884 10.0188C0.526562 10.5111 0.25 11.1788 0.25 11.875V18.875C0.25 19.5712 0.526562 20.2389 1.01884 20.7312C1.51113 21.2234 2.17881 21.5 2.875 21.5ZM2 11.875C2 11.6429 2.09219 11.4204 2.25628 11.2563C2.42038 11.0922 2.64294 11 2.875 11H15.125C15.3571 11 15.5796 11.0922 15.7437 11.2563C15.9078 11.4204 16 11.6429 16 11.875V18.875C16 19.1071 15.9078 19.3296 15.7437 19.4937C15.5796 19.6578 15.3571 19.75 15.125 19.75H2.875C2.64294 19.75 2.42038 19.6578 2.25628 19.4937C2.09219 19.3296 2 19.1071 2 18.875V11.875Z" fill="#02919A" />
                                                <path d="M8.125 16.005V17.125C8.125 17.3571 8.21719 17.5796 8.38128 17.7437C8.54538 17.9078 8.76794 18 9 18C9.23206 18 9.45462 17.9078 9.61872 17.7437C9.78281 17.5796 9.875 17.3571 9.875 17.125V16.005C10.1395 15.8523 10.3594 15.633 10.5129 15.369C10.6664 15.105 10.7482 14.8054 10.75 14.5C10.75 14.0359 10.5656 13.5908 10.2374 13.2626C9.90925 12.9344 9.46413 12.75 9 12.75C8.53587 12.75 8.09075 12.9344 7.76256 13.2626C7.43437 13.5908 7.25 14.0359 7.25 14.5C7.25184 14.8054 7.33358 15.105 7.48708 15.369C7.64058 15.633 7.86051 15.8523 8.125 16.005Z" fill="#02919A" />
                                            </svg>
                                            </span>
                                            <span className='showpass' onClick={showPass}>{show ? "Hide" : "Show"}</span>
                                        </div>
                                        <div className="forget_pass mt-2">
                                            <a href="/recover">Forgot Password?</a>
                                        </div>
                                        <div className="submit_btn mt-5 pt-3">
                                            <button className='btn web_btn' type='submit' disabled={CommonFunctions.validate(login)}>Login</button>
                                        </div>
                                        <div className="text-center have_acc mt-3">Don’t Have An Account? <a href="/signup">Sign Up</a></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Toast/> */}
        </>
    )
}
