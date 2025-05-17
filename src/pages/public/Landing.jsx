import Hero from '../../components/Hero.jsx'
import Faqs from '../../components/Faqs.jsx'
import Team from '../../components/Team.jsx'
import About from '../../components/About.jsx'
import Contact from '../../components/Contact.jsx'
import Services from '../../components/Services.jsx'
import Waitlist from '../../components/Waitlist.jsx'
import Footer from '../../components/layout/Footer.jsx'
import Backtotop from '../../components/common/Backtotop.jsx'
import MainNavbar from '../../components/layout/MainNavbar.jsx'
import BlogCollection from '../../components/BlogCollection.jsx'

export default function Landing() {
    window.document.title = 'Wink - The Ultimate Tasks Marketplace'
    return(
        <>
            <MainNavbar />
            <Hero />
            <About />
            <Services />
            <Waitlist />
            <Faqs />
            <BlogCollection />
            <Team />
            <Contact />
            <Footer />
            <Backtotop />
        </>
    )
}