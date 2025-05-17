import Backtotop from '../components/common/Backtotop.jsx'
import Footer from '../components/layout/Footer.jsx'
import MainNavbar from '../components/layout/MainNavbar.jsx'

export default function Privacy() {
    window.document.title = 'Wink | Privacy Policy'
    return(
        <>
            <MainNavbar />
            <section id="privacy" className="privacy">
                <div className="container">
                    <header>
                        <h2>Privacy Policy</h2>
                        <p>
                            At Wink, we respect your privacy and are committed to protecting your personal information. 
                            This privacy policy explains how we collect, use, disclose, and manage user data.
                        </p>
                    </header>
                    <article>
                        <h4>Information We Collect</h4>
                        <p>
                            We collect personal information from users when they register for an account, use our services, or interact with our web app. 
                            This information may include names, email addresses, phone numbers, and other identifying information.
                        </p>
                    </article>
                    <article>
                        <h4>How We Use Your Information</h4>
                        <p>
                            We use collected information to provide our services, improve user experience, and communicate with users. 
                            We may also share user data with third-party services or partners to enhance our services.
                        </p>
                    </article>
                    <article>
                        <h4>Data Security</h4>
                        <p>
                            We take reasonable measures to protect user data from unauthorized access, disclosure, or use.
                            We use encryption and secure storage practices to safeguard user information.
                        </p>
                    </article>
                    <article>
                        <h4>Data Retention</h4>
                        <p>
                            We retain user data for as long as necessary to provide our services and comply with legal obligations. 
                            We may delete user data upon request or when it is no longer necessary.
                        </p>
                    </article>
                    <article>
                        <h4>User Rights</h4>
                        <p>
                            Users have the right to access, correct, or delete their personal information. 
                            They can exercise these rights by contacting us at <a href="mailto:inquiries.wink@gmail.com">inquiries.wink@gmail.com</a>.
                        </p>
                    </article>
                    <article>
                        <h4>Changes to This Privacy Policy</h4>
                        <p>
                            We will notify users of changes to this privacy policy by posting the updated policy on our website. 
                            Users can review changes to the privacy policy at any time.
                        </p>
                    </article>
                    <article>
                        <h4>Contact Us</h4>
                        <p>
                            If you have privacy-related questions or concerns, please contact us at <a href="mailto:inquiries.wink@gmail.com">inquiries.wink@gmail.com</a>.
                        </p>
                        <p>
                            Effective Date: 1st December, 2024
                        </p>
                    </article>
                </div>
            </section>
            <Footer />
            <Backtotop />
        </>
    )
}