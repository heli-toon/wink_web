export default function PostItem() {
  return (
    <div className="card shadow-sm" style={{ borderRadius: "var(--border-rad-card)" }}>
      <div className="card-body" style={{ background: "var(--bg-sec)", color: "var(--text-color)" }}>
        <h5 className="card-title">📌 Sample Task</h5>
        <p className="">Posted 2h ago • 10 bids</p>
        <button className="btned">
          View Task
        </button>
      </div>
    </div>
  );
}
