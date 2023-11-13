"use client";

import store from "@helpers/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ProvidersLayoutProps {
  children: ReactNode;
}

export default function ProvidersLayout({ children }: ProvidersLayoutProps) {
  return <Provider store={store}>{children}</Provider>;
}
