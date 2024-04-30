//Libraries
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import NavBar from "./Navbar";
import { getProducts } from "../../redux/actions/productActions";
import Slide from "./slide";
import MidSection from "./midSection";
import Merchant from "../Merchant/Merchant";
import { LoginContext } from "../../context/dataProvider";

const Home = () => {
  const {isMerchant} = useContext(LoginContext);

  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.getProducts);
  const { products } = getProduct;
  // console.log("products : ",products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {isMerchant ? (
        <Merchant />
      ) : (
        <>
          <NavBar isMerchant = {isMerchant}/>
          <Slide products={products} title={"Deal Of The Day"} timer={true} />
          <MidSection />
        </>
      )}
    </>
  );
};

export default Home;
