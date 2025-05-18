export default function Hero() {
    return(
        <>
            <section id="hero" className="hero-fullscreen d-flex align-items-center">
                <div className="container d-flex flex-column align-items-center position-relative">
                    <h2>The <span>Ultimate</span> Tasks <em>Marketplace</em></h2>
                    <p>
                        Wink is the ultimate platform for that enables users to create employment for all workers. Need help? Post a task. 
                        Got skills? Offer your services. Let&apos;s get started! Advertise work opportunities or start working today!
                    </p>        
                    <div className="d-flex justify-content-lg-between btns">
                        <a href="#waitlist" className="btned btn-get-started scrollto">Join Us</a>
                        <a href="#about" className="btn-learn scrollto">Learn More</a>
                    </div>
                </div>
            </section>
        </>
    )
}