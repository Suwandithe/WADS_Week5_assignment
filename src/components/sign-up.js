// Signup.js
import { createUserWithEmailAndPassword} from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth,db} from '../firebase'
import { setDoc, doc } from 'firebase/firestore';
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
    
        // Password confirmation check before Firebase authentication
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            toast.success("You are registerd, redirecting back to login page...", {
                position: "top-center",
                onClose: () => navigate("/login")
            });
    
            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,  // Use name from input state
                email: email,
                uid : user.uid,
            });
    
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-center"
            });
        }
    };
    

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '25rem' }}>
                <h3 className="text-center">Sign Up</h3>
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Sign Up</button>
                </form>
                <p className="text-center mt-3">Already have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span></p>
            </div>
        </div>
    );
};

export default Signup;