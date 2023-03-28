import { useLoaderData } from "react-router-dom";
import Layout from "./../../components/layout/Layout";
import PictureList from "../../components/picture/PictureList";
import { useSelector, useDispatch } from "react-redux";
import { homeState } from "./../../redux/states/homeSlice";
import { getPhotosAsync } from "./../../redux/states/homeSlice";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";

function getUrl(page, pageSize) {
  return `/?page=${page}&page_size=${pageSize}`;
}

function Home() {
  const { qPage, qPageSize } = useLoaderData();
  const { status, objects, page, pageSize, pages } = useSelector(homeState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle" || page !== qPage || pageSize !== qPageSize) {
      dispatch(getPhotosAsync({ page: qPage, pageSize: qPageSize }));
    }
  }, [qPage, qPageSize, pages, page, pageSize, status, dispatch]);
  return (
    <Layout
      title="Home"
      child={
        status === "error" ? (
          <Container>
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <div>
                There are some internal server error. Please try again in a few
                minutes
              </div>
            </div>
          </Container>
        ) : (
          <PictureList
            pictureObjects={objects}
            page={page}
            pages={pages}
            pageSize={pageSize}
            getUrl={getUrl}
            loading={status === "loading" || status === "iddle"}
          />
        )
      }
    />
  );
}
export default Home;
