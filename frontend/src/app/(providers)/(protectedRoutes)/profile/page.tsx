"use client";

import NewsCard from "@components/NewsCard";
import { getNewsByOwner } from "@helpers/api/news";
import { useAppSelector } from "@helpers/store/hooks";
import { News, User } from "@helpers/types";
import { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";

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
    fetchNews();
  }, []);

  return (
    <Container>
      <Row className="mb-5">
        <h2 className="mb-3">Неопубликованные</h2>
        <Col>
          <Stack gap={4}>
            {unpublishedNews.length
              ? unpublishedNews.map((news) => (
                  <NewsCard key={news._id} {...news} />
                ))
              : null}
          </Stack>
        </Col>
      </Row>
      <Row>
        <h2 className="mb-3">Опубликовано</h2>
        <Col>
          <Stack gap={4}>
            {publishedNews.length
              ? publishedNews.map((news) => (
                  <NewsCard key={news._id} {...news} />
                ))
              : null}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
