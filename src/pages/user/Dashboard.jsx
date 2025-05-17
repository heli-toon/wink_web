import TopNav from "../../components/layout/TopNav";
import DashNav from "../../components/layout/DashNav";
import PostItem from "../../components/dashboard/PostItem";
import Backtotop from "../../components/common/Backtotop";

const colors = [
    { main: '#9F6AFF80', time: '#9F6AFF' }, 
    { main: '#48C7FF80', time: '#48C7FF' }, 
    { main: '#5FFF6F80', time: '#5FFF6F' }, 
    { main: '#FF803880', time: '#FF8038' },
];

const itemCount = 11;

export default function Dashboard() {
    window.document.title = 'Wink - Dashboard';
    return(
        <>
            <DashNav />
            <TopNav />
            <main id="in">
                <div className="container">
                    <div className="row">
                    {Array(itemCount).fill().map((_, index) => (
                        <PostItem
                            key={index}
                            mainBackgroundColor={colors[index % colors.length].main}
                            timeBackgroundColor={colors[index % colors.length].time}
                        />
                    ))}
                    </div>
                </div>
            </main>
            <Backtotop />
        </>
    )
}