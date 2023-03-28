import Header from "./../header/Header";
function Layout({ child, title }) {
  return (
    <>
      <Header title={title} />
      {child}
    </>
  );
}
export default Layout;
