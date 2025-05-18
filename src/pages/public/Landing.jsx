import Hero from '../../components/landing/Hero.jsx'
import Faqs from '../../components/landing/Faqs.jsx'
import Team from '../../components/landing/Team.jsx'
import About from '../../components/landing/About.jsx'
import Footer from '../../components/layout/Footer.jsx'
import Contact from '../../components/landing/Contact.jsx'
import Services from '../../components/landing/Services.jsx'
import Waitlist from '../../components/landing/Waitlist.jsx'
import Backtotop from '../../components/common/Backtotop.jsx'
import MainNavbar from '../../components/layout/MainNavbar.jsx'
import BlogCollection from '../../components/landing/BlogCollection.jsx'

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