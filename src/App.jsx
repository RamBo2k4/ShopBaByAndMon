import "./App.css";
import Header from "./components/header";
import Footer from "./components/Footer";
import MainMenu from "./components/MenuMain";
import Sale from "./pages/sale";
import Chinhsach from "./pages/chinhsach";
import Voucher from "./components/voucher";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <div className="app">
      <Header />

      {
        <div className="layout">
          <MainMenu />
          <div className="content">
            <ProductList />
            {/* <Chinhsach /> */}
          </div>
        </div>
      }
      {/* <div>
        <Cart />
      </div> */}

      <Footer />
    </div>
  );
}

export default App;
