import Home from "./Components/Home/home";
import Filter from "./Components/Filter/filter";
import OrderList from "./Components/Orders/orders-list";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Profile from "./Components/Profile/profile";
import Covid from "./Components/Covid/covid";
import Error_404 from "./Components/404-page/404-page";

function App() {
  return (
    <>
      <main className="container-fluid p-0 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filter/:_category_id/:id" element={<Filter />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/order-info" element={<OrderList />} />
          <Route path="/covid-19" element={<Covid />} />
          <Route path="*" element={<Error_404 />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
