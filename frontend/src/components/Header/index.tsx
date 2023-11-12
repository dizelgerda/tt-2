import { logout } from "@helpers/api/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Container, Navbar, Stack } from "react-bootstrap";

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    const res = await logout();
    if (res.ok) {
      router.push("/sign-in");
    }
  }

  return (
    <Navbar className="bg-light mb-4">
      <Container>
        <Stack direction="horizontal" gap={2}>
          <Button variant="link" type="button">
            Главная
          </Button>
          <Link href="/news/edit">
            <Button variant="outline-success" type="button">
              Добавить новость
            </Button>
          </Link>
        </Stack>

        <Stack direction="horizontal" gap={2}>
          <Link href="/profile">
            <Button variant="link" type="button">
              Профиль
            </Button>
          </Link>

          <Button
            variant="outline-secondary"
            type="button"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Stack>
      </Container>
    </Navbar>
  );
}
