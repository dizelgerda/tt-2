import { getUserByID } from "@helpers/api/users";
import { News, User } from "@helpers/types";
import { useState } from "react";
import { Button, Card, OverlayTrigger, Popover, Stack } from "react-bootstrap";

export default function NewsData({ _id, files, owner, publishedAt }: News) {
  const [userData, setUserData] = useState<User>();

  async function handleChangeToggle(isShow: boolean) {
    if (isShow) {
      try {
        const res = await getUserByID(owner as string);
        if (res.ok) {
          setUserData(await res.json());
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <Card>
      <Card.Footer>{new Date(publishedAt).toLocaleString()}</Card.Footer>
      <Card.Body>
        <Card.Title>ID-{_id}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal">
          Файлов: {files.length}
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            onToggle={handleChangeToggle}
            overlay={(props) => (
              <Popover id="user-popper" {...props}>
                {userData ? (
                  <>
                    <Popover.Header>{userData.name}</Popover.Header>
                    <Popover.Body>{userData.email}</Popover.Body>
                  </>
                ) : (
                  <Popover.Body>Загрузка...</Popover.Body>
                )}
              </Popover>
            )}
          >
            <div>
              <Button variant="link" type="button">
                Автор 📋
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </Card.Footer>
    </Card>
  );
}
