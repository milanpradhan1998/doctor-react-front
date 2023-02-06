import HashLoader from "react-spinners/HashLoader";

function Loader(props) {
  let { loader } = props;
  console.log(loader);
  return (
    <>
      {loader ? (
        <div className="loader">
          <HashLoader
            color={"#6c5ce7"}
            loading={loader}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default Loader;
