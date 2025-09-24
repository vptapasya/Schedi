import Link from "next/link";
import "./styles/page.css";

export default function LoginPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="auth-card bg-white rounded-2xl p-10 shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Welcome to Schedi</h1>
        <form className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-medium">Email</span>
            <input className="input" defaultValue="student@msu.edu" />
          </label>
          <label className="flex flex-col">
            <span className="font-medium">Password</span>
            <input className="input" type="password" defaultValue="password" />
          </label>

          <div className="flex justify-between mt-6">
            <Link href="/preferences" className="btn-primary">
              Sign up
            </Link>
            <a className="text-sm underline">Forgot Password?</a>
          </div>
        </form>
      </div>
      <p className="mt-6 text-sm text-center text-muted">
        Temporary static auth - will be replaced with real auth later.
      </p>
    </div>
  );
}
