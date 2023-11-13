import { File } from "@helpers/types";
import { Card } from "react-bootstrap";

const BASE_URL = "http://localhost:3000";

function getFileLink(id: string) {
  return `${BASE_URL}/files/${id}`;
}

export default function FileCard({ _id, name }: File) {
  const fileType = name.split(".").pop();
  const isImage = ["jpg", "png", "swg", "jpeg", "gif"].includes(
    fileType as string,
  );

  return isImage ? (
    <Card className="text-bg-dark">
      <Card.Img src={getFileLink(_id)} />
      <Card.Body>
        <Card.Link
          className="text-white"
          target="_blank"
          href={getFileLink(_id)}
        >
          {name} ↗
        </Card.Link>
      </Card.Body>
    </Card>
  ) : (
    <Card>
      <Card.Body>
        <Card.Text>
          <Card.Link target="_blank" href={getFileLink(_id)}>
            {name} ↗
          </Card.Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
