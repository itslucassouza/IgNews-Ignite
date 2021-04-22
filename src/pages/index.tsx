import {GetStaticProps}  from 'next';
import Head from 'next/head'
import { SubscribleButton } from '../components/SigInButton/SubscribleButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number
  }
}
export default function Home({ product }: HomeProps) {
  return (
    <>
    <Head>
      <title>igNews</title>
    </Head>

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
    <span>
    👏 hey, welcome
    </span>
    <h1>News About <br />
    the <span>React</span> world.</h1>
    <p>
      Get acess to all the publications <br />
      <span>for {product.amount} month</span>
    </p>
    <SubscribleButton priceId={product.priceId}/>
      </section>

      <img src="/images/avatar.svg" alt="Girld codding" />
    </main>
   </>
  );
}

export const getStaticProps: GetStaticProps  = async () => {
  const price = await stripe.prices.retrieve('price_1IZqqRIl29Tx1aMqei9wOnAt' )

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return{
    props: {
      product
      
    },
    revalidate: 60 * 60  * 24, // 24 hrs
  }
}
