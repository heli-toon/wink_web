import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import logo from "/logo.png";
import GoogleLogo from "../../components/GoogleLogo";

export default function Login() {
  window.document.title = "Wink | Login";
  const onboardingRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = onboardingRef.current;
    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
    }else{setIsSubmitting(true)}
  };
  return (
    <>
      <section className="login min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <Link href="/landing" className="logo d-flex align-items-center w-auto">
                  <img src={logo} alt="" />
                  <span className="d-none d-lg-block">Wink</span>
                </Link>
              </div>
              <div className="card mb-3">
                <div className="onboarding card-body">
                  <div className="pt-2 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Wink</h5>
                  </div>
                  <form className="row g-3 needs-validation" ref={onboardingRef} onSubmit={handleSubmit} noValidate>
                    <div className="col-12">
                      <label htmlFor="yourEmail" className="form-label">Your Email</label>
                      <input type="email" name="email" placeholder="Email" className="form-control" id="yourEmail" required />
                      {validated && <div className="invalid-feedback">Please enter a valid Email adddress!</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">Password</label>
                      <input type="password" name="password" className="form-control" id="yourPassword" placeholder="Password" required />
                      {validated && <div className="invalid-feedback">Please enter your password!</div>}
                      <p className="small mb-0 d-flex flex-row justify-content-end"><Link to="/reset-password" className='text-decoration-underline'>Forgot Password?</Link></p>
                    </div>
                    <div className="col-12">
                      <button className="btned w-100" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Login'}</button>
                    </div>
                    <div className="pt-2 pb-2">
                      <div className="or">OR</div>
                      <a href="alot" className="enterwgooogle d-flex align-items-center justify-content-center">
                        <GoogleLogo /> Continue with Google
                      </a>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">Don&apos;t have account? <Link className="text-decoration-underline" to="/register"> Create an account</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
