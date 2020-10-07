import { createContext, useEffect, useState } from 'react';
import nookies from 'nookies';

import { firebase } from '../util/firebaseClient';

export const AuthContext = createContext<{ user: firebase.User | null; logout: () => Promise<void> }>({
    user: null,
    logout: () => Promise.resolve(),
});

const cookieMaxAge = 30 * 24 * 60 * 60;

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.set(undefined, 'token', '', {
                    maxAge: cookieMaxAge,
                });
                return;
            }

            const token = await user.getIdToken();
            setUser(user);
            nookies.set(undefined, 'token', token, {
                maxAge: cookieMaxAge,
            });
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, logout: () => firebase.auth().signOut() }}>
            {children}
        </AuthContext.Provider>
    );
}
