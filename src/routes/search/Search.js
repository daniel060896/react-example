import { useLoaderData } from "react-router-dom";
import Layout from "./../../components/layout/Layout";
import PictureList from "../../components/picture/PictureList";
import { useSelector, useDispatch } from "react-redux";
import { searchState } from "../../redux/states/searchSlice";
import { searchPhotosAsync } from "../../redux/states/searchSlice";
import Container from "react-bootstrap/Container";

import { useEffect } from "react";

function Search() {
  const { qTag, qPage, qPageSize } = useLoaderData();
  const { status, objects, tag, page, pageSize, pages } =
    useSelector(searchState);
  function getUrl(page_, pageSize_) {
    return `/search?tag=${tag}&page=${page_}&page_size=${pageSize_}`;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      status === "idle" ||
      tag !== qTag ||
      page !== qPage ||
      pageSize !== qPageSize
    ) {
      dispatch(
        searchPhotosAsync({ tag: qTag || "", page: qPage, pageSize: qPageSize })
      );
    }
  }, [qTag, qPage, qPageSize, pages, status, page, pageSize, tag, dispatch]);
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
            error={status === "error"}
          />
        )
      }
    />
  );
}
export default Search;
