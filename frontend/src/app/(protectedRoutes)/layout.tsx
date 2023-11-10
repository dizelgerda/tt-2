"use client";
import Header from "@components/Header";
import { getCurrentUser } from "@helpers/api";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Container } from "react-bootstrap";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();

  async function checkAuth() {
    const res = await getCurrentUser();
    if (!res.ok) {
      router.push("/sign-in");
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
