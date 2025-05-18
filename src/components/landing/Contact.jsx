export default function Contact() {
    return(
        <>
            <section id="contact" className="contact">
                <div className="container">
                    <div className="section-header">
                    <h2>Contact Us</h2>
                    <p>Reach out to us at anytime, with your questions, comments or feedback. We&apos;re always happy to hear from you!</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row gy-5 gx-lg-5">
                    <div className="col-lg-4">
                        <div className="info">
                        <h3>Get in touch</h3>
                        <p>We&apos;re only a contact away! Contact Us. We&apos;ll get back to you as soon as we can.</p>
                        <div className="info-item d-flex">
                            <i className="bi bi-geo-alt flex-shrink-0"></i>
                            <div>
                            <h4>Location</h4>
                            <p>Accra, Ghana</p>
                            </div>
                        </div>
                        <div className="info-item d-flex">
                            <i className="bi bi-envelope flex-shrink-0"></i>
                            <div>
                            <h4>Email</h4>
                            <p><a className="contlink" href="mailto:inquiries.wink@gmail.com">inquiries.wink@gmail.com</a></p>
                            </div>
                        </div>
                        <div className="info-item d-flex">
                            <i className="bi bi-phone flex-shrink-0"></i>
                            <div>
                            <h4>Call</h4>
                            <p><a className="contlink" href="tel:+233535760503">+233 53 576 0503</a></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <form action="/" method="post" role="form" className="php-email-form d-flex justify-content-center flex-column">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                <input type="text" name="name" className="form-control form-control-c" id="name" placeholder="Your Name" required />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input type="email" className="form-control form-control-c" name="email" id="email" placeholder="Your Email" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control form-control-c" name="message" placeholder="Message" rows="7" required></textarea>
                            </div>
                            <div className="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}