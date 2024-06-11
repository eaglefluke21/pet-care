import React from "react";
import { useState } from "react";
import {useParams} from "react-router-dom"

const ResetPassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch (`/users/forgot-password/${token}`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({password}),
            });

            const responseData = await response.json();
            setMessage(responseData);


        } catch(error){
            setMessage('Error sending password reset email');
            console.error(error);

        }
    }




return (
    <div>
        <p> Reset Password</p>
        <form onSubmit={handleSubmit}>
            <label>
                New Password:
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
                required
                />
            </label>
            <button type="submit">Reset Password</button>
        </form>

        {message && <p> {message}</p>}

    </div>
);
};

export default ResetPassword;