import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Picture.css";

function Picture({ child, id, createdBy, photoUrl, tags, takenOn }) {
  let takenOnDate = new Date(takenOn);
  let month = takenOnDate.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  let creationText = `Taken on ${month} ${takenOnDate.getUTCDate()}, ${takenOnDate.getUTCFullYear()}`;
  return (
    <Col xs="12" sm="12" xl="6" xxl="6" className="pb-3">
      <Card
        className="bg-dark text-white picture-container mb-2 mx-auto"
        key={id}
      >
        <div className="card-img picture-img-container">
          <div className="picture-img">
            <Image className="picture-img" src={photoUrl} alt="Cat image" />
          </div>
        </div>
        <Card.ImgOverlay className="p-0">
          <div className="d-flex flex-column opacity-75 h-100">
            <div className="mt-auto bg-black d-flex ">
              <div className="picture-info m-2">
                <p className="mb-0">
                  by <b>{createdBy}</b>
                </p>
                <p className="mb-0">{creationText}</p>
              </div>
              <div className="ms-auto d-flex px-2">
                {tags.slice(0, 3).map((tag) => (
                  <Link
                    className="my-auto mx-1"
                    to={`/search?tag=${tag}`}
                    key={tag}
                  >
                    <Button
                      index={tag}
                      style={{ fontSize: "12px" }}
                      variant="outline-light"
                    >
                      {tag}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
}

export default Picture;
