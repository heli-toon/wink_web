import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import MainNavbar from "../../components/layout/MainNavbar";

function Sitemap() {
  document.title = 'Wink | Sitemap';
  return (
    <>
      <MainNavbar />
      <section className="" >
        <div className="min-vh-100 py-5 px-3">
          <div className="sitemap container shadow rounded p-5">
            <h1 className="text-center mb-5" style={{ color: 'var(--primary)' }}>
              Sitemap
            </h1>
            {/* Main Sections */}
            <div className="mb-5">
              {/* Core Pages */}
              <div className="mb-4 text-left">
                <h2 className="border-bottom text-start pb-2 mb-4" style={{ color: 'var(--gray)' }}>
                  <i className="bi bi-house-door"></i> Core Pages
                </h2>
                <ul className="row text-start">
                  {['Home', 'Chat', 'Login', 'Sign Up', 'Register', 'Profile', 'Wishlist', 'Search',].map((page, index) => (
                    <li key={index} className="col-md-6 mb-2">
                      <Link to={`/${page.toLowerCase().replace(/\s/g, '-')}`} className="text-decoration-none">
                        <i className="bi bi-arrow-right-circle"></i> {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal & Support */}
              <div className="mb-4">
                <h2 className="border-bottom text-start pb-2 mb-4" style={{ color: 'var(--gray)' }}>
                  <i className="bi bi-file-earmark-text"></i> Legal & Support
                </h2>
                <ul className="row text-start">
                  {['Privacy Policy', 'Forgot Password', 'Terms of Service', 'Help Center'].map((page, index) => (
                    <li key={index} className="col-md-6 mb-2">
                      <Link to={`/${page.toLowerCase().replace(/\s/g, '-')}`} className="text-decoration-none">
                        <i className="bi bi-arrow-right-circle"></i> {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Pages */}
              <div>
                <h2 className="border-bottom text-start pb-2 mb-4" style={{ color: 'var(--gray)' }}>
                  <i className="bi bi-plus-circle"></i> Additional Pages
                </h2>
                <ul className="row text-start">
                  {['About Us', 'Contact', 'Sitemap', '404'].map((page, index) => (
                    <li key={index} className="col-md-6 mb-2">
                      <Link to={`/${page.toLowerCase().replace(/\s/g, '-')}`} className="text-decoration-none">
                        <i className="bi bi-arrow-right-circle"></i> {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Sitemap;