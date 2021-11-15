import { signIn, useSession } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripeJs";
import styles from "./styles.module.scss";

//getServerSideProps (SSR)
//getStaticProps (SSG)

export function SubscribleButton() {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    //criação da checkout session
    try {
      const response = await api.post("subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (e) {
      console.log(e, "ola");
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribleButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
