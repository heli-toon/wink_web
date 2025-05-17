import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import logo from "/logo.png";
import GoogleLogo from "../../components/GoogleLogo";

export default function SignUp() {
  window.document.title = "Wink | Register";
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
      <section className="register min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <Link href="/register" className="logo d-flex align-items-center w-auto">
                  <img src={logo} alt="Wink Logo" />
                  <span className="d-none d-lg-block">Wink</span>
                </Link>
              </div>
              <div className="card mb-3">
                <div className="onboarding card-body">
                  <div className="pt-2 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Create Account</h5>
                  </div>
                  <form className="row g-3 needs-validation" ref={onboardingRef} onSubmit={handleSubmit} noValidate>
                    <div className="col-12">
                      <label htmlFor="yourEmail" className="form-label">Your Email</label>
                      <input type="email" name="email" placeholder="Email" className="form-control" id="yourEmail" required />
                      {validated && <div className="invalid-feedback">Please enter a valid Email adddress!</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Password" id="yourPassword" required />
                      {validated && <div className="invalid-feedback">Please enter your password!</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">Confirm Password</label>
                      <input type="password" name="password2" className="form-control" placeholder="Password" id="yourPassword" required />
                      {validated && <div className="invalid-feedback">Please enter your password!</div>}
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" name="terms" type="checkbox" id="acceptTerms" required />
                        <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <Link className="text-decoration-underline" to="/terms">terms and conditions</Link></label>
                        {validated && <div className="invalid-feedback">You must agree before submitting.</div>}
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btned w-100" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Create Account'}</button>
                    </div>
                    <div className="pt-2 pb-2">
                      <div className="or">OR</div>
                      <a href="alot" className="enterwgooogle d-flex align-items-center justify-content-center">
                        <GoogleLogo /> Continue with Google
                      </a>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">Already have an account? <Link className="text-decoration-underline" to="/login"> Log in</Link></p>
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
