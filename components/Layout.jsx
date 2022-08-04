import Footer from "./Footer";
import Nav from "./Nav";

function Layout({ children }) {
  return (
    <div className="site">
      <Nav />
      <div className='main'>
        {children}
        <Footer />
      </div>

    </div>
  );
}

export default Layout;
