import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { firebase, db } from '../util/firebaseClient';
import { getStripe } from '../util/stripe';

interface IProduct {
    name: string;
    priceId: string;
    productId: string;
    value: string;
    content: string;
}

const Index = () => {
    const { user, logout } = useAuth();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        db.collection('product')
            .where('active', '==', true)
            .get()
            .then((querySnapshot) =>
                querySnapshot.docs.map((productDoc) => {
                    return productDoc.data() as IProduct;
                }),
            )
            .then((p) => setProducts(p));

        db.collection('customer')
            .doc(user.uid)
            .collection('subscriptions')
            .where('status', '==', 'active')
            .onSnapshot(async (snapshot) => {
                if (snapshot.empty) return;

                const subscription = snapshot.docs[0].data();
                const priceData = (await subscription.price.get()).data();
                const msg = `You are paying ${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: priceData.currency,
                }).format(priceData.unit_amount / 100)} per ${priceData.interval}, giving you the cool dude role! 🥳`;

                setMessage(msg);
            });
    }, [setProducts, user, setMessage]);

    const goToBillingPortal = async () => {
        setIsLoading(true);
        const functionRef = firebase.functions().httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
        const { data } = await functionRef({ returnUrl: window.location.origin });
        window.location.assign(data.url);
    };

    const subscribe = async (priceId: string) => {
        if (!user) return;
        setIsLoading(true);
        const thing = await db.collection('customer').doc(user.uid).collection('checkout_sessions').add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        thing.onSnapshot(async (snap) => {
            const { sessionId } = snap.data() as { sessionId: string };
            if (sessionId) {
                const stripe = await getStripe();
                if (!stripe) return;
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };
    if (!user) {
        return (
            <div>
                <p>Hi there!</p>
                <p>You are not signed in. </p>{' '}
                <div>
                    <Link href="/auth">Sign in</Link>
                </div>
            </div>
        );
    }

    if (isLoading) return <div>Loading....</div>;

    return (
        <div>
            <div>
                <div>
                    <Link href="/">Home</Link>
                    <Link href="/sandbox">Another Page</Link>
                </div>
                <div>
                    <p>
                        <strong>{user.email}</strong>
                    </p>
                    <button onClick={() => logout()}>Log out</button>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <p>Signed in</p>
                        <p>{message}</p>
                        <button onClick={goToBillingPortal}>Manage Subscription →</button>
                    </div>

                    {!message &&
                        products &&
                        products.map((p) => (
                            <div key={p.productId + p.priceId}>
                                {p.name} {p.content}
                                <button onClick={() => subscribe(p.priceId)}>Subscribe</button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
