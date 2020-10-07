import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { firebase } from '../util/firebaseClient';

export const useInterval = (_callback: (...args: any[]) => any, delay: number) => {
    const callback = useCallback(_callback, []);
    useEffect(() => {
        const id = setInterval(callback, delay);
        return () => clearInterval(id);
    }, [delay]);
};

const IndexPage = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: '40px' }}>
            <p>{`User ID: ${user ? user.uid : 'no user signed in'}`}</p>
            {user ? (
                <p>
                    <button
                        onClick={async () => {
                            await logout();
                        }}
                    >
                        Logout
                    </button>
                </p>
            ) : (
                <>
                    <p>
                        <Link href="/authenticated">Go to authenticated route</Link>
                    </p>
                    <p>
                        <Link href="/login">Login</Link>
                    </p>
                </>
            )}
        </div>
    );
};

export default IndexPage;
