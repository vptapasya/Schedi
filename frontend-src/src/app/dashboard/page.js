export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome, Tapasya Velmurugan</h1>
      <p className="text-sm text-muted text-center mb-6">You are 30% of the way to graduation!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-forest-dark text-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">January 15, 2025</h3>
          <ul className="space-y-3">
            <li className="bg-accent-blue p-2 rounded">ADV 205</li>
            <li className="bg-pink p-2 rounded">CSE 232</li>
            <li className="bg-amber p-2 rounded">CSE 260</li>
          </ul>
        </div>
        <div className="card bg-forest-dark text-white rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Explore These Courses:</h3>
          <div className="bg-white text-black rounded p-4 mb-3">COM 100: Human Communication (3)</div>
          <div className="bg-white text-black rounded p-4">PSY 101: Introductory Psychology (4)</div>
        </div>
      </div>
    </div>
  );
}
