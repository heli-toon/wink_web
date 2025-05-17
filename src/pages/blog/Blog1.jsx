import { useState, useEffect } from 'react';
import Footer from "../../components/Footer";
import map from "../../assets/images/dotted-map-bg.webp";

export default function Blog() {
    const [searchText, setSearchText] = useState('');
    const [paragraphs, setParagraphs] = useState([]);

    useEffect(() => {
        const paraElements = document.querySelectorAll('.paragraph');
        setParagraphs(paraElements);
    }, []);
    const handleSearch = (event) => {
        event.preventDefault();
        const textToSearch = searchText.trim();
        if (textToSearch === '') return;
    
        const pattern = new RegExp(`${textToSearch}`, 'gi');
    
        paragraphs.forEach((para) => {
          const markedText = para.textContent.replace(pattern, (match) => `<mark>${match}</mark>`);
          para.innerHTML = markedText;
        });
    };

    return(
        <>
            <div className="breadcrumbs glassm">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Coding vs Programming</h2>
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li><a href="/blog/">Blog</a></li>
                            <li>Coding vs Programming</li>
                        </ol>
                    </div>
                </div>
            </div>
            <section id="blog" className="blog">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-8">  
                            <article className="blog-details glassm">
                                <div className="post-img">
                                    <img src={map} alt="" className="img-fluid" />
                                </div>  
                                <h2 className="title">Coding vs Programming: Unraveling the Mysteries of Software Development</h2>
                                <div className="meta-top">
                                    <ul>
                                        <li className="d-flex align-items-center"><i className="bi bi-calendar"></i> <a href="blog-details.html"><time dateTime="2024-06-25">Jun 25, 2024</time></a></li>
                                        <li className="d-flex align-items-center"><i className="bi bi-clock"></i> <a href=""><time>2.10 minutes read</time></a></li>
                                    </ul>
                                </div>  
                                <div className="content">
                                    <p className='paragraph'>
                                        In the world of software development, two terms are often used interchangeably: coding and programming. While they are related, they have distinct differences. 
                                        In this blog post, we&amp;ll delve into the similarities and differences between coding and programming, providing a comprehensive understanding of these fundamental concepts.
                                    </p>
                                    <h3>The Coding Process</h3>
                                    <p className='paragraph'>
                                        Coding refers to the act of writing code in a programming language to create a software, app, or website. It&amp;s the process of translating human instructions into a language that computers can understand. Think of coding as writing a recipe for your computer to follow. 
                                        A coder&amp;s primary focus is on implementing a plan, using programming languages like Python, Java, HTML or C++ to bring a design to life.
                                    </p>
                                    <blockquote>
                                        <p className='paragraph'>
                                            Coding is like writing a recipe for your computer to follow
                                        </p>
                                    </blockquote>
                                    <h3>The Programming Process</h3>
                                    <p className='paragraph'>
                                        Programming is the broader process of designing, writing, testing, and maintaining software, apps, or websites. It encompasses not only coding but also problem-solving, algorithm development, and software engineering. 
                                        Programming is like creating a blueprint for a house, including the design, materials, and construction process. A programmer&amp;s role is to create the plan itself, considering the overall architecture, functionality, and performance of the software.
                                    </p>
                                    <h3>Similarities</h3>
                                    <p className='paragraph'>
                                        <ul>
                                            <li>Both coding and programming involve writing code in a programming language.</li>
                                            <li>Both require a good understanding of computer science concepts and logic.</li>
                                            <li>Both involve problem-solving and critical thinking.</li>
                                        </ul>                                    
                                    </p>
                                    <h3>Differences</h3>
                                    <p className='paragraph'>
                                        <ul>
                                            <li>Coding is a specific part of programming that focuses on writing code.</li>
                                            <li>Programming is a more comprehensive process that includes design, development, testing, and maintenance.</li>
                                            <li>Coding is like implementing a plan, while programming is like creating the plan itself.</li>
                                        </ul>                                 
                                    </p>
                                    <h3>Analogy</h3>
                                    <p className='paragraph'>
                                        Think of coding as writing a poem (focusing on the words and syntax), 
                                        while programming is like writing a novel (including plot development, character creation, and editing).
                                    </p>
                                    <h3>Real-World Applications</h3>
                                    <p className='paragraph'>
                                        <ul>
                                            <li>Coding is essential for building software applications, mobile apps, and websites.</li>
                                            <li>Programming is crucial for developing operating systems, games, and artificial intelligence systems.</li>
                                        </ul>
                                    </p>
                                    <h3>Conclusion</h3>
                                    <p className='paragraph'>
                                        In conclusion, coding and programming are two interconnected yet distinct concepts in software development. While coding focuses on implementing a plan, programming encompasses the entire process of designing, developing, and maintaining software. 
                                        Understanding both terms will help you appreciate the complexity and beauty of software development. 
                                        Whether you&amp;re a beginner or an experienced developer, recognizing the differences between coding and programming will enhance your skills and perspective in the world of software development.
                                    </p>
                                    <h3>Final Thoughts</h3>
                                    <p className='paragraph'>
                                        In the world of software development, coding and programming are fundamental concepts that work together to create innovative solutions. 
                                        By understanding the similarities and differences between these two terms, you&amp;ll be better equipped to navigate the exciting world of software development. <br />
                                        Happy coding and programming 😁!
                                    </p>
                                </div>
                                <div className="meta-bottom">
                                    <i className="bi bi-code-slash"></i>
                                    <ul className="cats">
                                        <li><a href="#">Software</a></li>
                                    </ul>
                                    <i className="bi bi-tags"></i>
                                    <ul className="tags">
                                        <li><a href="#">Programming</a></li>
                                        <li><a href="#">Coding</a></li>
                                    </ul>
                                </div>
                            </article>  
                            <div className="post-author glassm d-flex align-items-center">
                                <img src={map} className="rounded-circle flex-shrink-0" alt="" />
                                <div>
                                    <h4>Salay Abdul Muhaimin Kanton</h4>
                                    <div className="social-links">
                                        <a href="https://x.com/SalayAbdul"><i className="bi bi-twitter-x"></i></a>
                                        <a href="https://facebook.com/#"><i className="bi bi-facebook"></i></a>
                                        <a href="https://www.instagram.com/heli.toon/"><i className="bi bi-instagram"></i></a>
                                    </div>
                                    <p>
                                        I&amp;m a passionate web developer dedicated to crafting exceptional online experiences. With expertise in cutting-edge technologies, I create visually stunning and user-friendly websites and apps that drive results.
                                    </p>
                                </div>
                            </div>  
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="sidebar-item search-form">
                                    <h3 className="sidebar-title">Search</h3>
                                    <form className="mt-3" onSubmit={handleSearch}>
                                        <input type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} title="Search" placeholder="Search" />
                                        <button title="Search" className="btn"><i className="bi bi-search"></i></button>
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
                                    </ul>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}