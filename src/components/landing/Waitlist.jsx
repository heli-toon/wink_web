export default function Waitlist() {
    return(
        <>
            <section id="waitlist" className="waitlist">
                <div className="waitlist">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12 text-center">
                                <h2>Join the Waitlist</h2>
                                <p>We&apos;re launching soon. Get on the list. Be notified when we launch.</p>
                            </div>
                            <div className="col-lg-6">
                                <form action="/" method="post" className="d-flex align-items-center justify-content-center">
                                    <input type="email" name="email" placeholder="Enter Email Address" id="waitlistinput" required />
                                    <input className="btned" type="submit" value="Get Notified" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}