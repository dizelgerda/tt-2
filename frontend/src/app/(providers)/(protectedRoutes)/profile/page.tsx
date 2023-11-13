"use client";

import NewsCard from "@components/NewsCard";
import { deleteNews, getNewsByOwner } from "@helpers/api/news";
import { useAppSelector } from "@helpers/store/hooks";
import { News, User } from "@helpers/types";
import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Stack } from "react-bootstrap";

export default function Profile() {
  const [publishedNews, setPublishedNews] = useState<News[]>([]);
  const [unpublishedNews, setUnpublishedNews] = useState<News[]>([]);
  const currentUser = useAppSelector((store) => store.currentUser) as User;

  async function fetchNews() {
    try {
      const res = await getNewsByOwner(currentUser._id);
      if (res.ok) {
        const data = await res.json();
        setPublishedNews(data.publishedNews);
        setUnpublishedNews(data.unpublishedNews);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchNews();
    }
  }, [currentUser]);

  async function handleDelete(id: string) {
    try {
      const res = await deleteNews(id);

      if (res.ok) {
        fetchNews();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Row className="mb-5">
        <h2 className="mb-3">Неопубликованные</h2>
        <Col>
          <Stack gap={4}>
            {unpublishedNews.length ? (
              unpublishedNews.map((news) => (
                <NewsCard key={news._id} {...news} onDelete={handleDelete} />
              ))
            ) : (
              <Alert variant="secondary">Все новости опубликованы.</Alert>
            )}
          </Stack>
        </Col>
      </Row>
      <Row>
        <h2 className="mb-3">Опубликовано</h2>
        <Col>
          <Stack gap={4}>
            {publishedNews.length ? (
              publishedNews.map((news) => (
                <NewsCard key={news._id} {...news} onDelete={handleDelete} />
              ))
            ) : (
              <Alert variant="secondary">
                Вы пока не опубликовали ни одной новости.
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
