import React from 'react';
import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { firebaseAdmin } from '../util/firebaseAdmin';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
        const { uid, email } = token;

        // const subscriptions = await db
        //     .collection('customer')
        //     .doc(uid)
        //     .collection('subscriptions')
        //     .where('status', '==', 'active')
        //     .get()
        //     .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

        // .onSnapshot(async (snapshot) => {
        //     if (snapshot.empty) return;

        //     const subscription = snapshot.docs[0].data();
        //     const priceData = (await subscription.price.get()).data();
        //     return `You are paying ${new Intl.NumberFormat('en-US', {
        //         style: 'currency',
        //         currency: priceData.currency,
        //     }).format(priceData.unit_amount / 100)} per ${priceData.interval}, giving you the cool dude role! 🥳`;
        // });

        return {
            props: { message: `Your email is ${email} and your UID is ${uid}.`, subscriptions },
        };
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
        return { props: {} as never };
    }
};

export default function App(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <p>{props.message}</p>
        </div>
    );
}
