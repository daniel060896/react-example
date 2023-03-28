import PaginationBootstrap from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Pagination({ child, pages, page, getUrl, pageSize }) {
  function getPage({ num }) {
    return (
      <li className="page-item" key={`pag_${num}`}>
        <Link to={getUrl(num, pageSize)}>
          <div className="page-link">{num}</div>
        </Link>
      </li>
    );
  }
  let items = [];
  // First button: "<<"
  items.push(
    <li className="page-item" key={"pag_<<"}>
      <Link to={getUrl(1, pageSize)}>
        <div className="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </div>
      </Link>
    </li>
  );

  if (pages <= 7) {
    // Short size, just show all pages
    for (let i = 1; i <= pages; i++) {
      items.push(getPage({ num: i }));
    }
  } else if (page <= 3) {
    // First 4 pages should be shown
    for (let i = 1; i <= 4; i++) {
      items.push(getPage({ num: i }));
    }
    // Then, an ellipsis
    items.push(<PaginationBootstrap.Ellipsis key="pag_..." />);
    // Finally, the last 2 pages
    items.push(getPage({ num: pages - 1 }));
    items.push(getPage({ num: pages }));
  } else if (page >= pages - 2) {
    // First 2 pages
    items.push(getPage({ num: 1 }));
    items.push(getPage({ num: 2 }));
    // Then, ellipsis
    items.push(<PaginationBootstrap.Ellipsis key="pag_..." />);
    // Finally, the last 4 pages
    for (let i = pages - 3; i <= pages; i++) {
      items.push(getPage({ num: i }));
    }
  } else {
    // The first page
    items.push(getPage({ num: 1 }));
    // First ellipsis
    items.push(<PaginationBootstrap.Ellipsis key="pag_...f" />);
    // The, the closest pages (page-1, page, page+1)
    for (let i = page - 1; i <= page + 1; i++) {
      items.push(getPage({ num: i }));
    }
    // Last ellipsis
    items.push(<PaginationBootstrap.Ellipsis key="pag_...l" />);
    // Finally, last page
    items.push(getPage({ num: pages }));
  }
  // Last button: ">>"
  items.push(
    <li className="page-item" key={"pag_>>"}>
      <Link to={getUrl(pages, pageSize)}>
        <div className="page-link">
          <span aria-hidden="true">&raquo;</span>
        </div>
      </Link>
    </li>
  );

  return (
    <Container>
      <PaginationBootstrap className="justify-content-center">
        {items}
      </PaginationBootstrap>
    </Container>
  );
}

export default Pagination;
