import TopNav from "../../components/layout/TopNav";
import DashNav from "../../components/layout/DashNav"

export default function Post() {
    window.document.title = 'Wink - Post';
    return(
        <>
            <DashNav />
            <TopNav />
        </>
    )
}