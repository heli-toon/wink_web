import { Link } from "react-router-dom";
import verba from "../../assets/images/hero-fullscreen-bg.jpg";
export default function BlogCollection() {
  return (
    <>
      <section id="recent-blog-posts" className="recent-blog-posts">
        <div className="container">
          <div className="section-header">
            <h2>Blog</h2>
            <p>Recent posts form my Blog</p>
          </div>
          <div className="row">
            <div className="col-lg-4 my-4">
              <div className="post-box">
                <div className="post-img">
                  <img src={verba} className="img-fluid" alt="" />
                </div>
                <div className="meta d-flex align-items-center">
                  <div className="meta-date">
                    <i className="bi bi-calendar mx-1"></i>
                    <span className="post-date">Tue, June 25, 2024</span>
                  </div>
                  <div className="meta-time">
                    <i className="bi bi-clock mx-1"></i>
                    <span className="post-date">2.1 min</span>
                  </div>
                </div>
                <h3 className="post-title">
                  Eum ad dolor et. Autem aut fugiat
                </h3>
                <p>
                  Illum voluptas ab enim placeat. Adipisci enim velit nulla. Vel
                  omnis laudantium. Asperiores eum ipsa est officiis. Modi
                  cupiditate exercitationem qui magni...
                </p>
                <a href="blog-details.html" className="readmore btned">
                  <span>Read More</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 my-4">
              <div className="post-box">
                <div className="post-img">
                  <img
                    src={verba}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="meta d-flex align-items-center">
                  <div className="meta-date">
                    <i className="bi bi-calendar mx-1"></i>
                    <span className="post-date">Tue, June 25, 2024</span>
                  </div>
                  <div className="meta-time">
                    <i className="bi bi-clock mx-1"></i>
                    <span className="post-date">2.1 min</span>
                  </div>
                </div>
                <h3 className="post-title">
                  Et repellendus molestiae qui est sed
                </h3>
                <p>
                  Voluptatem nesciunt omnis libero autem tempora enim ut ipsam
                  id. Odit quia ab eum assumenda. Quisquam omnis aliquid
                  necessitatibus tempora...
                </p>
                <a href="blog-details.html" className="readmore btned">
                  <span>Read More</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 my-4">
              <div className="post-box">
                <div className="post-img">
                  <img
                    src={verba}
                    className="img-fluid"
                    alt="Blog Image"
                  />
                </div>
                <div className="meta d-flex align-items-center">
                  <div className="meta-date">
                    <i className="bi bi-calendar mx-1"></i>
                    <span className="post-date">Tue, June 25, 2024</span>
                  </div>
                  <div className="meta-time">
                    <i className="bi bi-clock mx-1"></i>
                    <span className="post-date">2.1 min</span>
                  </div>
                </div>
                <h3 className="post-title">
                  Quia assumenda est et veritatis aut quae
                </h3>
                <p>
                  Quia nam eaque omnis explicabo similique eum quaerat similique
                  laboriosam. Quis omnis repellat sed quae consectetur magnam
                  veritatis...
                </p>
                <Link to="/blog" className="readmore btned">
                  <span>Read More</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
