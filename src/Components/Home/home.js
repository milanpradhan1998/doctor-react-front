import Header from "../Common/Header/Header";
import SearchBanner from "./search-poster";
import CatagoryOthers from "./catagory-other";
import Footer from "../Common/Footer/footer";
import Loader from "../Common/Loading/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  let [loader, setLoader] = useState(false); //LOADER
  let [catagoriesList, setCatagoriesList] = useState([]);
  let getCatagoriesListServer = async () => {
    let url = "https://139.59.2.113:6600/api/catagories";
    let { data } = await axios.get(url);
    setCatagoriesList([...data.catagorie]);
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true); //LOADER
    getCatagoriesListServer();
  }, []);
  return (
    <>
      <Loader loader={loader} />
      <Header />
      <SearchBanner catagoriesList={catagoriesList} />
      <CatagoryOthers catagoriesList={catagoriesList} />
      <Footer />
    </>
  );
}
export default Home;
