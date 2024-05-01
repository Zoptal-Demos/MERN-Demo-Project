import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Error from './pages/Error';
import Results from './pages/Results';
import Recover_acc from './pages/Recover_acc';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Change_password from './pages/Change_password';

export default function Linking() {
    return (
        <>
                <Routes>
                    <Route  exact path='/' element={<Home />} />
                    <Route exact path='/results' element={<Results />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/recover' element={<Recover_acc />} />
                    <Route exact path='/change_password' element={<Change_password />} />
                    <Route path='*' element={<Error />} />
                </Routes>

        </>
    )
}
