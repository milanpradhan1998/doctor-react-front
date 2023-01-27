import Header from "../Common/Header/Header";
import SearchBanner from "./search-poster";
import CatagoryOthers from "./catagory-other";
import Footer from "../Common/Footer/footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  let [catagoriesList, setCatagoriesList] = useState([]);
  let getCatagoriesListServer = async () => {
    let url = "http://142.93.210.241:6600/api/catagories";
    let { data } = await axios.get(url);
    setCatagoriesList([...data.catagorie]);
  };

  useEffect(() => {
    getCatagoriesListServer();
  }, []);
  return (
    <>
      <Header />
      <SearchBanner catagoriesList={catagoriesList} />
      <CatagoryOthers catagoriesList={catagoriesList} />
      <Footer />
    </>
  );
}
export default Home;
