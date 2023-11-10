"use client";
import { login } from "@helpers/api";
import { PlainObject } from "@helpers/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";

export default function SignIn() {
  const [data, setData] = useState<PlainObject>({});
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login({ email: data.email, password: data.password });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Вход</Card.Title>
        <Form className="mt-4" onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                required
                value={data.email ?? ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                name="password"
                type="password"
                required
                value={data.password ?? ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Stack direction="horizontal">
              <Button variant="primary" type="submit">
                Войти
              </Button>

              <Button variant="link" type="button">
                <Link href="/sign-up">Зарегистрироваться</Link>
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}
