import React from "react";
import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch ('/users/forgot-password',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email}),
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
        <p> Forgot Password</p>
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}
                required
                />
            </label>
            <button type="submit">Send Reset Link</button>
        </form>

        {message && <p> {message}</p>}

    </div>
);
};

export default ForgotPassword;