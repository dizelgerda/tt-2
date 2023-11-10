"use client";
import { getCurrentUser } from "@helpers/api";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  async function checkAuth() {
    const res = await getCurrentUser();
    if (res.ok) {
      router.push("/");
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
