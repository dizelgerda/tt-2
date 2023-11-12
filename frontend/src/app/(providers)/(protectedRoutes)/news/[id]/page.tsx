"use client";

import { getNewsByID } from "@helpers/api";
import { News } from "@helpers/types";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

interface NewsViewerProps {
  params: {
    id: string;
  };
}

export default function NewsViewer({
  params: { id: newsID },
}: NewsViewerProps) {
  const [data, setData] = useState<News>();

  async function getNews() {
    try {
      const res = await getNewsByID(newsID);
      if (res.ok) {
        setData(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Container>
      {data ? (
        <Card>
          <Card.Body>{data.text}</Card.Body>
        </Card>
      ) : null}
    </Container>
  );
}
