function Footer() {
  return (
    <>
      <section className="footer-main px-2">
        <div className="d-flex flex-column flex-lg-row p-2 text-white justify-content-lg-between align-items-lg-center">
          <div>
            <ul className="m-0 fs-6">
              <li>Home</li>
              <li>About us</li>
              <li>Privacy</li>
              <li>Payment</li>
            </ul>
          </div>
          <div>
            <ul className="list-unstyled m-0 fs-4 d-flex">
              <li>
                <i className="fa-brands mx-1 fa-facebook"></i>
              </li>
              <li>
                <i className="fa-brands mx-1 fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands mx-1 fa-twitter"></i>
              </li>
              <li>
                <i className="fa-brands mx-1 fa-linkedin"></i>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
export default Footer;
