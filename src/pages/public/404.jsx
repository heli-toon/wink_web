import errorimage from '../../assets/images/error-page.png'
export default function Error404() {
  window.document.title = 'Wink | Page Not Found'
  return (
    <>
      <section className="error-page min-vh-100 d-flex flex-column align-items-center justify-content-center" id="404">
        <h1>404</h1>
        <h2>The page you are looking for doesn&apos;t exist at all.</h2>
        <a className="btned" href="/">
          Back to home
        </a>
        <img
          src={errorimage}
          className="img-fluid py-5"
          alt="Page Not Found"
        />
      </section>
    </>
  );
}
