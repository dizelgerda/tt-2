"use client";

import { getCurrentUser } from "@helpers/api/users";
import { setCurrentUser } from "@helpers/store/slices/currentUser";
import store from "@helpers/store/store";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

interface ProvidersLayoutProps {
  children: ReactNode;
}

export default function ProvidersLayout({ children }: ProvidersLayoutProps) {
  async function checkAuth() {
    try {
      const res = await getCurrentUser();
      if (res.ok) {
        store.dispatch(setCurrentUser(await res.json()));
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
