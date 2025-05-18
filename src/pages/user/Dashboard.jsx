
import DashNav from "../../components/layout/DashNav";
import TopNav from "../../components/layout/TopNav";
import PostItem from "../../components/dashboard/PostItem";
import Backtotop from "../../components/common/Backtotop";

export default function Dashboard() {
  window.document.title = "Wink - Dashboard";

  const itemCount = 6; // Adjust based on real data

  return (
    <>
      <DashNav />
      <TopNav />
      <main id="in" className="py-3">
        <div className="container">
          <div className="row g-3">
            {Array(itemCount)
              .fill()
              .map((_, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-4">
                  <PostItem />
                </div>
              ))}
          </div>
        </div>
      </main>
      <Backtotop />
    </>
  );
}