// import { Navbar, Main, Product, Footer } from "../components";
import { Navbar, Main, Footer } from "../components";
import { useSelector } from 'react-redux';

function Home() {
  const reducerData = useSelector((state) => state?.isLoginSuccess);
  if (reducerData) {
    return (
      <>
        <Navbar />
        <Main />
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <div className="container my-3 py-3">
          <div className="col-12">
            <h4 className="display-7 text-center">You're not authorized to access this application.</h4>
            <h4 className="display-7 text-center">Please login to continue</h4>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home