import Picture from "./Picture";
import Pagination from "../pagination/Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PictureList({
  child,
  pictureObjects,
  page,
  pages,
  getUrl,
  loading,
  pageSize,
}) {
  return loading ? (
    <>
      <Container>
        <Row className="row-cols-12 w-100 m-0">
          {[...Array(10)].map((x, i) => (
            <Col xs="12" sm="12" xl="6" xxl="6" className="pb-3" key={i}>
              <div className="mb-2 mx-auto" style={{ maxWidth: "600px" }}>
                <Skeleton height="250px" />
                <Skeleton />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  ) : (
    <>
      <Container>
        <Row className="row-cols-12 w-100 m-0">
          {pictureObjects.map((pictureObj) => (
            <Picture
              key={pictureObj.id}
              id={pictureObj.id}
              createdBy={pictureObj.createdBy}
              photoUrl={pictureObj.photoUrl}
              tags={pictureObj.tags}
              takenOn={pictureObj.takenOn}
            />
          ))}
        </Row>
      </Container>
      <Pagination
        page={page}
        pages={pages}
        getUrl={getUrl}
        pageSize={pageSize}
      />
    </>
  );
}
export default PictureList;
