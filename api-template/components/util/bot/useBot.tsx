import alanBtn from "@alan-ai/alan-sdk-web";
import { useCallback, useEffect, useState } from "react";

const useBot = () => {
  const [alanInstance, setAlanInstance]: any = useState();


  const openCart = useCallback(() => {
    alanInstance.playText("Opening");
  }, [alanInstance]);

  const backHome = useCallback(() => {
    alanInstance.playText("Going Home");
  }, [alanInstance]);

  const emptyCart = useCallback(() => {
    alanInstance.playText("You do not have any items.");
  }, [alanInstance]);

  const handleSearch = useCallback(
    ({ detail }) => {
      alanInstance.playText(`finding ${detail}`);
    },
    [alanInstance]
  );

  const handleRemove = useCallback(({ detail }) => {}, [alanInstance]);

  const checkout = useCallback(() => {
    alanInstance.playText(
      "You haven't added any items. I can help you add some. Try,  add Jameson"
    );
  }, [alanInstance]);

  const addItem = useCallback(
    ({ detail: { name, quantity } }: any) => {},
    [alanInstance]
  );

  const handleAccount = () => {};

  const logout = () => {
    // auth.signOut();
    alanInstance.playText("You logged out");
  };

  useEffect(() => {
    window.addEventListener("open-cart", openCart);
    window.addEventListener("go-back", backHome);
    window.addEventListener("add-item", addItem);
    window.addEventListener("empty-cart", emptyCart);
    window.addEventListener("logout", logout);
    window.addEventListener("checkout", checkout);

    return () => {
      window.removeEventListener("go-back", backHome);
      window.removeEventListener("open-cart", openCart);
      window.removeEventListener("add-item", addItem);
      window.removeEventListener("empty-cart", emptyCart);
      window.removeEventListener("logout", logout);
      window.removeEventListener("checkout", checkout);
      window.removeEventListener("account", handleAccount);
    };
  }, [
    openCart,
    backHome,
    addItem,
    emptyCart,
    handleSearch,
    handleAccount,
    handleRemove,
  ]);

  useEffect(() => {
    alanBtn({
      key: process.env.NEXT_PUBLIC_BOT_ID,
      onCommand: (commandData) => {
        if ((commandData as any).command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);

  return null;
};

export default useBot;
