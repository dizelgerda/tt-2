import { News } from "@helpers/types";
import Link from "next/link";
import { Button, Card, Stack } from "react-bootstrap";

export default function NewsCard({ _id, published, publishedAt }: News) {
  const publicationDate = new Date(publishedAt);

  return (
    <Card>
      <Card.Body>
        <Link href={`/news/${_id}`}>
          <Card.Title className="mb-3">Новость {_id}</Card.Title>{" "}
        </Link>
        <Stack direction="horizontal" gap={2}>
          <Button size="sm" variant="outline-danger">
            Удалить
          </Button>

          <Link href={`/news/edit?newsID=${_id}`}>
            <Button size="sm" variant="outline-secondary">
              Изменить
            </Button>
          </Link>
        </Stack>
      </Card.Body>
      {!published ? (
        <Card.Footer>
          Будет опубликована: {publicationDate.toLocaleDateString()}{" "}
          {publicationDate.toLocaleTimeString()}
        </Card.Footer>
      ) : null}
    </Card>
  );
}
