const BASE_URL = process.env.BASE_URL

const API = {
    GET_ALL_PROPERTY : BASE_URL+'property/getAllProperities',
    LOGIN : BASE_URL+'user/login',
    REGISTER : BASE_URL+'user/register',
    RECOVER_ACCOUNT : BASE_URL+'user/recoverAccount',
    CHANGE_PASSWORD : BASE_URL+'user/verifyChangePassword',
    VERIFY_OTP : BASE_URL+'user/verifyOtp'
}

export default API