function Services() {
  return (
    <>
      <section id="features" className="services">
        <div className="container">
            <div className="section-header">
            <h2>Features</h2>
            <p>
                Introducing Wink - the ultimate tasks marketplace for getting things done! 
                Whether you&apos;re looking to outsource a time-consuming task or find a skilled helper for a project, Wink has you covered. 
                Our platform connects you with a network of experts in a variety of fields, from home improvement to personal errands. 
                All you have to do is post your task, and our dedicated helpers will handle the rest. 
                So sit back, relax, and let Wink take care of the details!
            </p>
            </div>
            <div className="row">
                <div className="col-xl-3 col-md-6 d-flex align-items-stretch">
                    <div className="icon-box">
                        <div className="icon"><i className="bi-check2"></i></div>
                        <h4><a href="">Get It Done</a></h4>
                        <p>Post jobs, tasks and chores that you need help with and let the Wink community bid on them. From cleaning to typing jobs, there&apos;s no task too small for our community.</p>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                    <div className="icon-box">
                        <div className="icon"><i className="bi-cash"></i></div>
                        <h4><a href="">Make Money</a></h4>
                        <p>Earn extra cash by completing small tasks and chores for people in your neighborhood. With Wink, you can turn your spare time into extra income.</p>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0">
                    <div className="icon-box">
                        <div className="icon"><i className="bi-cart-fill"></i></div>
                        <h4><a href="">Bid & Earn</a></h4>
                        <p>Place bids on tasks posted by others and compete with other members for the chance to complete the job.</p>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0">
                    <div className="icon-box">
                        <div className="icon"><i className="bi-clock-fill"></i></div>
                        <h4><a href="">Task Tracker</a></h4>
                        <p>Track the progress of tasks that you&apos;ve hired or posted, see who is are bidding on your tasks, and message other users directly to negotiate prices or ask questions.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Services
