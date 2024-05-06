//Libraries
// import { Box } from "@mui/material";
import { BrowserRouter, Route,Routes} from "react-router-dom";

//components
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DataProvider from "./context/dataProvider";
import DetailView from "./components/details/detailView";
import Cart from "./components/cart/Cart";
import PaymentSuccess from "./components/payment/paymentSuccess";
import About from "./components/other/About";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header/>
        {/* <Box style={{marginTop : 54}}> */}
          <Routes>
              <Route path="/" element = {<Home/>}/>
              <Route path="/product/:id" element = {<DetailView/>}/>
              <Route path="/cart" element = {<Cart/>}/>
              <Route path="/paymentsuccess" element= {<PaymentSuccess/>} />
              <Route path="/about" element={<About/>} />
          </Routes>
        {/* </Box> */}
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
