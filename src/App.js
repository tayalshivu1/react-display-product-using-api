import "./styles.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const location = useLocation();
  const prod = location.state;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="pd-wrapper">
      <button onClick={goBack} className="view-product">
        go back
      </button>
      <img className="pd-image" alt="" src={prod?.thumbnail} />
      <h1>{prod?.title}</h1>
      <h2>$ {prod?.price}</h2>
      <p>{prod?.description}</p>
    </div>
  );
}

function Product({ prod }) {
  return (
    <>
      <div className="wrapper">
        <img className="image" alt="" src={prod?.thumbnail} />
        <h1 className="title">{prod?.title}</h1>
        <p className="description">{prod?.description}</p>
        <h2 className="price">$ {prod?.price}</h2>
        <Link to={"/product/" + prod.id} state={prod}>
          <button className="view-product">View Product</button>
        </Link>
      </div>
    </>
  );
}

function Contact() {
  return <div>This Is Contacts Component.</div>;
}

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const HomePage = () => {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProductsList(data.products));
  }, []);
  return (
    <>
      <div className="products-list">
        {productsList.map((prod) => {
          return <Product key={prod.id} prod={prod} />;
        })}
      </div>
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
