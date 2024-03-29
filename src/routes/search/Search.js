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
  const { status, objects, tag, page, pageSize, pages, error_details } =
    useSelector(searchState);
  function getUrl(page_, pageSize_) {
    return `/tag/${encodeURIComponent(
      tag
    )}?page=${page_}&page_size=${pageSize_}`;
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
  }, [qTag, qPage, qPageSize, tag, page, pageSize, status]); // eslint-disable-line react-hooks/exhaustive-deps
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
            error={status === "error"}
          />
        )
      }
    />
  );
}
export default Search;
