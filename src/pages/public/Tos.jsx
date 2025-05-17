import Backtotop from '../../components/common/Backtotop.jsx'
import Footer from '../../components/layout/Footer.jsx'
import MainNavbar from '../../components/layout/MainNavbar.jsx'

export default function Tos() {
    window.document.title = 'Wink | Terms of Service'
    return(
        <>
            <MainNavbar />
            <section id="tos" className="tos">
                <div className="container">
                    <header>
                        <h2>Terms of Serivce</h2>
                        <p>
                            Welcome to Wink, a web app provided by Wink Inc. (hereinafter referred to as &quot;we&quot; or &quot;us&quot;). 
                            These Terms of Service (ToS) outline the rules and guidelines for using our Service, and by accessing or using our Service, you agree to be bound by these ToS.
                        </p>
                    </header>
                    <article>
                        <h4>User Accounts</h4>
                        <p>
                            To use our Service, you must create an account. You must be 15 years or older to create an account, and you are responsible for maintaining the security of your account. 
                            This includes keeping your password confidential and not sharing it with anyone.
                        </p>
                    </article>
                    <article>
                        <h4>User Conduct</h4>
                        <p>
                            When using our Service, you must comply with these ToS and all applicable laws and regulations. 
                            You may not use our Service for illegal or harmful activities, including but not limited to:
                            <ol>
                                <li>Infringing on others&apos; intellectual property rights</li>
                                <li>Engaging in harassment, abuse, or spamming</li>
                                <li>Transmitting viruses, worms, or other malicious code</li>
                                <li>Interfering with or disrupting our Service or servers</li>
                            </ol>
                        </p>
                    </article>
                    <article>
                        <h4>Intellectual Property</h4>
                        <p>
                            You retain ownership of any content you submit through our Service. 
                            However, by submitting such content, you grant us a worldwide, royalty-free, non-exclusive license to use, reproduce, modify, and distribute the content for internal purposes, such as improving our Service.
                        </p>
                    </article>
                    <article>
                        <h4>Termination</h4>
                        <p>
                            We may terminate your account or access to our Service at any time, with or without notice, if you violate these ToS or engage in behavior that we deem harmful or illegal. 
                            We will provide notice before terminating your account, unless circumstances require immediate termination.
                        </p>
                    </article>
                    <article>
                        <h4>Warranty Disclaimer</h4>
                        <p>
                            Our Service is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind, express or implied. 
                            We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
                        </p>
                    </article>
                    <article>
                        <h4>Limitation of Liability</h4>
                        <p>
                            In no event will we be liable for damages or losses resulting from your use or inability to use our Service, including but not limited to:
                            <ol>
                                <li>Direct, indirect, incidental, punitive, and consequential damages</li>
                                <li>Lost profits, business interruption, or loss of data</li>
                            </ol>
                        </p>
                    </article>
                    <article>
                        <h4>Governing Law</h4>
                        <p>
                        These ToS are governed by and construed in accordance with the laws of Ghana. 
                        Any disputes arising out of or related to these ToS will be resolved through binding arbitration in accordance with the rules of the Ghana Arbitration Association.
                        </p>
                    </article>
                    <article>
                        <h4>Changes to Terms</h4>
                        <p>
                        We may update or change these ToS at any time, with or without notice. 
                        The updated ToS will be effective immediately upon posting on our website. 
                        Your continued use of our Service will constitute acceptance of the updated ToS.
                        </p>
                    </article>
                    <article>
                        <h4>Contact Us</h4>
                        <p>
                        If you have questions or concerns about these ToS or our Service, please contact us at <a href="mailto:inquiries.wink@gmail.com">inquiries.wink@gmail.com</a>.
                        </p>
                        <p>By using our Service, you acknowledge that you have read, understand, and agree to be bound by these ToS. If you do not agree, please do not use our Service.</p>
                        <p>
                            Effective Date: 1st Decemeber, 2024
                        </p>
                    </article>
                </div>
            </section>
            <Footer />
            <Backtotop />
        </>
    )
}