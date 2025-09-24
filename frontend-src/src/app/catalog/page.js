export default function Catalog() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Course Catalog</h1>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-forest-dark text-white rounded p-6">EGR 100<br/>Credits: 2</div>
        <div className="card bg-forest-dark text-white rounded p-6">CSD 203<br/>Credits: 3</div>
        <div className="card bg-forest-dark text-white rounded p-6">PHY 183<br/>Credits: 4</div>
        <div className="card bg-forest-dark text-white rounded p-6">WRA 101<br/>Credits: 4</div>
      </section>
    </div>
  );
}
