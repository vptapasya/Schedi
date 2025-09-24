export default function Preferences() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prefs-card bg-white rounded-2xl p-10 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Enter Your Preferences:</h2>
        <div className="grid grid-cols-1 gap-6">
          <label className="flex flex-col">
            <span className="font-semibold">Major:</span>
            <input className="input" defaultValue="Computer Science" />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold">Minor:</span>
            <input className="input" defaultValue="" />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold">Graduation Year:</span>
            <input className="input" defaultValue="Spring 2027" />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold">Credit Preference:</span>
            <input className="input" defaultValue="18" />
          </label>
        </div>
      </div>
    </div>
  );
}
