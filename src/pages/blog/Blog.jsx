import Footer from "../../components/Footer";
import MainNavbar from "../../components/MainNavbar";

export default function Blog() {
    return(
        <>
            <MainNavbar />
            <div className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Wink Intro</h2>
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li>Wink Intro</li>
                        </ol>
                    </div>
                </div>
            </div>
            <section id="blog" className="blog">
                <div className="container">
                <div className="row g-5">
                    <div className="col-lg-8">  
                    <article className="blog-details">
                        <div className="post-img">
                        <img src="assets/img/blog/blog-1.jpg" alt="" className="img-fluid" />
                        </div>  
                        <h2 className="title">Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia</h2>
                        <div className="meta-top">
                        <ul>
                            <li className="d-flex align-items-center"><i className="bi bi-person"></i> <a href="blog-details.html">John Doe</a></li>
                            <li className="d-flex align-items-center"><i className="bi bi-clock"></i> <a href="blog-details.html"><time datetime="2020-01-01">Jan 1, 2022</time></a></li>
                            <li className="d-flex align-items-center"><i className="bi bi-chat-dots"></i> <a href="blog-details.html">12 Comments</a></li>
                        </ul>
                        </div>  
                        <div className="content">
                        <p>
                            Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                            Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta. Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur assumenda perferendis dolore.
                        </p>
                        <p>
                            Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi in accusamus harum vel aspernatur. Excepturi numquam nihil cumque odio. Et voluptate cupiditate.
                        </p>
                        <blockquote>
                            <p>
                            Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi aut. Aut eos aliquam doloribus minus autem quos.
                            </p>
                        </blockquote>
                        <p>
                            Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores nihil quaerat.
                            Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis neque.
                            Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error rerum nihil tempora.
                        </p>
                        <h3>Et quae iure vel ut odit alias.</h3>
                        <p>
                            Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid qui.
                            Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed. Quibusdam rerum dolores sint consequatur quidem ea.
                            Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
                        </p>
                        <img src="assets/img/blog/blog-inside-post.jpg" className="img-fluid" alt="" />
                        <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                        <p>
                            Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero sed occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt labore. Autem facilis hic dolorum dolores vel.
                            Consectetur quasi id et optio praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut aut blanditiis. Veritatis numquam ut illum ut a quam vitae.
                        </p>
                        <p>
                            Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                        </p>
                        </div>
        
                        <div className="meta-bottom">
                        <i className="bi bi-folder"></i>
                        <ul className="cats">
                            <li><a href="#">Business</a></li>
                        </ul>
                        <i className="bi bi-tags"></i>
                        <ul className="tags">
                            <li><a href="#">Creative</a></li>
                            <li><a href="#">Tips</a></li>
                            <li><a href="#">Marketing</a></li>
                        </ul>
                        </div>
                    </article>  
                    <div className="post-author d-flex align-items-center">
                        <img src="assets/img/blog/blog-author.jpg" className="rounded-circle flex-shrink-0" alt="" />
                        <div>
                        <h4>Jane Smith</h4>
                        <div className="social-links">
                            <a href="https://twitters.com/#"><i className="bi bi-twitter-x"></i></a>
                            <a href="https://facebook.com/#"><i className="bi bi-facebook"></i></a>
                            <a href="https://instagram.com/#"><i className="bi bi-instagram"></i></a>
                        </div>
                        <p>
                            Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.
                        </p>
                        </div>
                    </div>  
                    </div>
                    <div className="col-lg-4">
                    <div className="sidebar">
                        <div className="sidebar-item search-form">
                        <h3 className="sidebar-title">Search</h3>
                        <form action="" className="mt-3">
                            <input type="search" title="Search" placeholder="Search" />
                            <button type="submit" title="search" className="btn"><i className="bi bi-search"></i></button>
                        </form>
                        </div>
                        <div className="sidebar-item categories">
                        <h3 className="sidebar-title">Categories</h3>
                        <ul className="mt-3">
                            <li><a href="#">General <span>(25)</span></a></li>
                            <li><a href="#">Lifestyle <span>(12)</span></a></li>
                            <li><a href="#">Educaion <span>(14)</span></a></li>
                        </ul>
                        </div>  
                        <div className="sidebar-item tags">
                        <h3 className="sidebar-title">Tags</h3>
                        <ul className="mt-3">
                            <li><a href="#">App</a></li>
                            <li><a href="#">IT</a></li>
                            <li><a href="#">Business</a></li>
                            <li><a href="#">Mac</a></li>
                            <li><a href="#">Design</a></li>
                            <li><a href="#">Office</a></li>
                            <li><a href="#">Creative</a></li>
                            <li><a href="#">Marketing</a></li>
                        </ul>
                        </div>
                    </div>  
                    </div>
                </div>
                </div>
            </section>
            <Footer />
            <Backtotop />
        </>
    )
}