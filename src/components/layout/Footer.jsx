import logo from "/logo.png";

export default function Footer() {
    return(
        <>
            <footer id="footer" className="footer">  
                <div className="footer-top">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-5 col-md-12 footer-info">
                                <a href="/" className="logo d-flex align-items-center">
                                    <img src={logo} alt="" />
                                    <span>Wink</span>
                                </a>
                                <p>Do you need help with a task? Are you looking for a way to make money doing tasks for others? Wink is the perfect solution. Post a task or take on a task.</p>
                                <div className="social-links mt-3">
                                    <a target="_blank" rel="noreferer" title="Twitter/X" href="#" className="twitter-x"><i className="bi bi-twitter-x"></i></a>
                                    <a target="_blank" rel="noreferer" title="Facebook" href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a target="_blank" rel="noreferer" title="Instagram" href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                    <a target="_blank" rel="noreferer" title="Telegram" href="#" className="telegram"><i className="bi bi-telegram"></i></a>
                                    <a target="_blank" rel="noreferer" title="Linkedin" href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                    <a target="_blank" rel="noreferer" title="Tiktok" href="#" className="tiktok"><i className="bi bi-tiktok"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bi bi-house-door-fill"></i> <a href="/">Home</a></li>
                                    <li><i className="bi bi-question-circle-fill"></i> <a href="#">Help</a></li>
                                    <li><i className="bi bi-diagram-3"></i> <a href="/sitemap">Sitemap</a></li>
                                    <li><i className="bi bi-newspaper"></i> <a href="/terms">Terms of service</a></li>
                                    <li><i className="bi bi-lock-fill"></i> <a href="/privacy-policy">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-6 footer-links">
                                <h4>Features</h4>
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Web Design</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Web </a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Product </a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Marketing</a></li>
                                    <li><i className="bi bi-chevron-right"></i> <a href="#">Graphic Design</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>Contact Us</h4>
                                <p>
                                    Accra, Greater Accra <br />
                                    Ghana <br /><br />
                                    <strong>Phone:</strong><a href="tel:+233535760503"> +233 53 576 0503</a><br />
                                    <strong>Email:</strong><a href="mailto:inquiries.wink@gmail.com"> inquiries.wink@gmail.com</a><br />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="copyright">
                            &copy; Copyright 2025 <strong><span>Wink</span></strong>. All Rights Reserved
                        </div>
                        <div className="credits">
                            Designed by <a href="/landing">Wink</a>
                        </div>
                    </div>
                </div>
            </footer>
    </>
    )
}