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
  const { status, objects, page, pageSize, pages, error_details } =
    useSelector(homeState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle" || page !== qPage || pageSize !== qPageSize) {
      dispatch(getPhotosAsync({ page: qPage, pageSize: qPageSize }));
    }
  }, [qPage, qPageSize, page, pageSize, status]); // eslint-disable-line react-hooks/exhaustive-deps
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
              <div>{error_details.message}</div>
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
