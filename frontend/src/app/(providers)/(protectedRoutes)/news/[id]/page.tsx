"use client";

import FileCard from "@components/FileCard";
import { getNewsByID } from "@helpers/api/news";
import { News, File } from "@helpers/types";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import Markdown from "react-markdown";

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
        <Row>
          <Col lg="8">
            <Card>
              <Card.Body>
                <Markdown>{data.text}</Markdown>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4">
            <Stack gap={3}>
              {(data.files as File[]).map((file) => {
                return <FileCard key={file._id} {...file} />;
              })}
            </Stack>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
