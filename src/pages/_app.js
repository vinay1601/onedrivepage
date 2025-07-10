import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store"
import Navbar from "@/components/Navbar";
import FeedBackAlert from "@/components/FeedBackAlert";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <FeedBackAlert />
      <Component {...pageProps} />
    </Provider>
  );
}
