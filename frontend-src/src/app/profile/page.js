export default function Profile() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-forest-dark text-white rounded-2xl p-6">
          <p><strong>Undergraduate Student</strong></p>
          <p>College of Engineering</p>
          <p>36 Credits Completed</p>
          <p>3.9 GPA</p>
        </div>
        <div className="bg-forest-dark text-white rounded-2xl p-6">
          <p><strong>Major:</strong> Computer Science</p>
          <p><strong>Minor:</strong> Cognitive Science</p>
          <p><strong>Graduation Year:</strong> Spring 2027</p>
          <p><strong>Credit Preference:</strong> 18</p>
        </div>
      </div>

      <section className="mt-8 bg-white rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Completed Coursework</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-forest-dark text-white rounded p-4">EGR 100<br/>Credits: 2</div>
          <div className="bg-forest-dark text-white rounded p-4">CSD 203<br/>Credits: 3</div>
          <div className="bg-forest-dark text-white rounded p-4">PHY 183<br/>Credits: 4</div>
          <div className="bg-forest-dark text-white rounded p-4">WRA 101<br/>Credits: 4</div>
        </div>
      </section>
    </div>
  );
}
