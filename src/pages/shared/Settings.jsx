import { useState } from "react";
import DashNav from "../../components/layout/DashNav"
import TopNav from "../../components/layout/TopNav";
import "bootstrap"
import AccountTab from "../../components/layout/settingstabs/AccountTab";
import SecurityTab from "../../components/layout/settingstabs/SecurityTab";
import Backtotop from "../../components/common/Backtotop";
import { Link, useNavigate } from "react-router-dom";

export default function Settings() {
    const [activeTab, setActiveTab] = useState('personal');
    window.document.title = 'Wink | Settings';

    const navigate = useNavigate();

    const handleBackBtnClick = () => {
        navigate(-1);
    };
    return(
        <>
            <DashNav />
            <TopNav />
            <main id="in">
                <section className="settings">
                    <h1>Settings & Preferences</h1>
                    <div className="settings-navbar">
                        <ul className="settings-nav">
                            <li><a href="#personal" className={`${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')} data-toggle="pill">Personal</a></li>
                            <li><a href="#themes" className={`${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')} data-toggle="pill">Themes</a></li>
                            <li><a href="#security" className={`${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')} data-toggle="pill">Passwords</a></li>
                            <li><Link to="/terms">Terms</Link></li>
                        </ul>
                    </div>
                    <div className="settings-body tab-content">
                        <div className="tab-pane fade show active">
                            {activeTab === 'personal' && <AccountTab />}
                            {activeTab === 'security' && <SecurityTab />}
                            <div className="form-submit">
                                <a href="/" className="btn btned-sec" onClick={handleBackBtnClick}>
                                    <i className="bi bi-arrow-left-circle-fill"></i>Back
                                </a>
                                <button type="submit" className="btned">
                                    <i className="bi bi-floppy2-fill"></i> Save
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Backtotop />
        </>
    )
}
