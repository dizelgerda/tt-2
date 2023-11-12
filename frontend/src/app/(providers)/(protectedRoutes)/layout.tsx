"use client";

import Header from "@components/Header";
import { useAppSelector } from "@helpers/store/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Container } from "react-bootstrap";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const currentUser = useAppSelector((store) => store.currentUser);

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [currentUser]);

  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
