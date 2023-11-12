"use client";

import { useAppSelector } from "@helpers/store/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const currentUser = useAppSelector((store) => store.currentUser);

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <Container className="mt-5">
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
