import { BASE_URL } from './Api'
import axios from 'axios'

var TOKEN = ""

const instance = axios.create({
    baseURL: BASE_URL+"/v1",
    headers: { 'x-token': TOKEN }
});


// Function to set the token in both localStorage and the Axios instance
function setToken(newToken) {
    TOKEN = newToken;
    localStorage.setItem('x_token', newToken);
    instance.defaults.headers['x-token'] = newToken;
}

// Initially check if a token exists in localStorage
const storedToken = localStorage.getItem('x_token');
if (storedToken) {
    setToken(storedToken);
}

// Get Request
const getRequest = (path) => {
    return instance.get(path);
}

// Post Request
const postRequest = (path, data) => {
    return instance.post(path, data);
}

// Put Request
const putRequest = (path, data) => {
    return instance.put(path, data);
}

// Patch Request
const patchRequest = (path, data) => {
    return instance.patch(path, data);
}

// Delete Request
const deleteRequest = (path) => {
    return instance.delete(path);
}

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest, setToken }