"use client";

import { uploadFile } from "@helpers/api/files";
import { createNews, getNewsByID } from "@helpers/api/news";
import { News, PlainObject } from "@helpers/types";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import { Button, Card, Form, InputGroup, Stack } from "react-bootstrap";

const TIME_ARRAY: PlainObject<number> = {
  "10m": 10 * 60 * 1000,
  "30m": 30 * 60 * 1000,
  "1h": 1 * 60 * 60 * 1000,
  "2h": 2 * 60 * 60 * 1000,
  "5h": 5 * 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
};

function formatDate(date: Date): string {
  const YYYY = date.getFullYear().toString();
  let MM = (date.getMonth() + 1).toString();
  let DD = date.getDate().toString();

  [MM, DD] = [MM, DD].map((element) => {
    if (element.length === 1) return `0${element}`;
    return element;
  });

  return `${YYYY}-${MM}-${DD}`;
}

function formatTime(date: Date): string {
  let HH = date.getHours().toString();
  let MM = date.getMinutes().toString();

  [HH, MM] = [HH, MM].map((element) => {
    if (element.length === 1) return `0${element}`;
    return element;
  });

  return `${HH}:${MM}`;
}

function parseDate(dateInput: string, timeInput: string): Date {
  const date = new Date(0);

  let [YYYY, MONTH, DD] = dateInput.split("-").map((value) => Number(value));
  let [HH, MINUTES] = timeInput.split(":").map((value) => Number(value));
  MONTH -= 1;

  date.setFullYear(YYYY, MONTH, DD);
  date.setHours(HH, MINUTES);

  return date;
}

export default function EditNews() {
  const [data, setData] = useState<PlainObject<string | boolean>>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  async function fetchNews(newsID: string) {
    try {
      console.log(newsID);
      const res = await getNewsByID(newsID);
      if (res.ok) {
        const news = (await res.json()) as News;
        console.log(news);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const newsID = searchParams.get("newsID");
    if (newsID) {
      fetchNews(newsID);
    }
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  }

  function handleAddTime(e: MouseEvent<HTMLButtonElement>) {
    const { value } = e.target as HTMLButtonElement;
    let date = parseDate(
      (data.publicationDate as string) ?? formatDate(new Date()),
      (data.publicationTime as string) ?? formatTime(new Date()),
    );

    date = new Date(date.getTime() + TIME_ARRAY[value]);

    setData({
      ...data,
      publicationDate: formatDate(date),
      publicationTime: formatTime(date),
    });
  }

  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setData({ ...data, [name]: checked });
  }

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    let publishedAt;
    const files = (e.target.elements.namedItem("files") as HTMLInputElement)
      .files as FileList;

    if (data.delayed) {
      publishedAt = parseDate(
        (e.target.elements.namedItem("publicationDate") as HTMLInputElement)
          .value,
        (e.target.elements.namedItem("publicationTime") as HTMLInputElement)
          .value,
      );
    }

    try {
      const res = await createNews({
        text: data.text as string,
        publishedAt,
      });

      if (res.ok) {
        if (files) {
          const news = await res.json();
          const formData = new FormData();

          for (const file of Array.from(files)) {
            formData.append(file.name, file);

            console.log(formData.get(file.name));
          }

          await uploadFile(formData, news._id);
        }

        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Редактор новостей</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Form.Group>
              <Form.Label>Текст</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="text"
                required
                value={(data.text as string) ?? ""}
                onChange={handleChange}
                rows={10}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Прикрепленные файлы</Form.Label>
              <Form.Control type="file" name="files" multiple />
            </Form.Group>
            <Form.Group>
              <Form.Check
                id="delayed"
                type="checkbox"
                label="Отложенная публикация"
                name="delayed"
                checked={(data.delayed as boolean) ?? false}
                onChange={handleChecked}
              />
              {data.delayed ? (
                <InputGroup className="mt-2">
                  <Form.Control
                    type="date"
                    name="publicationDate"
                    required
                    value={
                      (data.publicationDate as string) ?? formatDate(new Date())
                    }
                    onChange={handleChange}
                    min={formatDate(new Date())}
                  ></Form.Control>
                  <Form.Control
                    type="time"
                    name="publicationTime"
                    required
                    value={
                      (data.publicationTime as string) ??
                      formatTime(
                        new Date(new Date().getTime() + TIME_ARRAY["10m"]),
                      )
                    }
                    onChange={handleChange}
                  ></Form.Control>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    value="30m"
                    onClick={handleAddTime}
                  >
                    +30 м
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    value="1h"
                    onClick={handleAddTime}
                  >
                    +1 ч
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    value="2h"
                    onClick={handleAddTime}
                  >
                    +2 ч
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    value="5h"
                    onClick={handleAddTime}
                  >
                    +5 ч
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    value="1d"
                    onClick={handleAddTime}
                  >
                    +1 д
                  </Button>
                </InputGroup>
              ) : null}
            </Form.Group>
            <div>
              <Button variant="primary" type="submit">
                Опубликовать
              </Button>
            </div>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}
