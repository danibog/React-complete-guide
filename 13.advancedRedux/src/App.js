import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiAction } from "./store/ui-slice";

function App() {
  const cartIsVisiblese = useSelector((state) => state.ui.cartIsVisible);

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiAction.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://react-first-38e92-default-rtdb.firebaseio.com/app13/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiAction.showNotification({
          status: "Success",
          title: "Sent",
          message: "Cart data sent Successfully!",
        })
      );
    };

    sendCartData().catch((err) => {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: `Sending cart data failed! error`,
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisiblese && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
