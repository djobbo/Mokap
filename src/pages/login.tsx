import React, { useState } from 'react';
import Link from 'next/link';
import { firebase } from '../util/firebaseClient';

const LoginPage = (_props: any) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div>
            <Link href="/">Go back to home page</Link>
            <br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
            <input type={'password'} value={pass} onChange={(e) => setPass(e.target.value)} placeholder={'Password'} />
            <button
                onClick={async () => {
                    await firebase.auth().createUserWithEmailAndPassword(email, pass);
                    window.location.href = '/';
                }}
            >
                Create account
            </button>
            <button
                onClick={async () => {
                    await firebase.auth().signInWithEmailAndPassword(email, pass);
                    window.location.href = '/';
                }}
            >
                Log in
            </button>
        </div>
    );
};

export default LoginPage;
