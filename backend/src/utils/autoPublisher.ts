import News from "../models/news";

export function autoPublisher() {
  return setInterval(
    async () => {
      try {
        const news = await News.find({ published: false }).sort({
          publishedAt: 1,
        });

        const now = Date.now();

        for (let i = 0; i != news.length; i++) {
          const document = news[i];

          if (now >= document.publishedAt.getTime()) {
            document.updateOne({ published: true, publishedAt: now });
          } else {
            break;
          }
        }
      } catch (err) {
        console.error(`Ошибка при автоматической публикации: ${err}`);
      }
    },
    1 * 60 * 1000,
  );
}
