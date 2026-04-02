import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAppContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const result = login(form.email, form.password);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200/75">
        Welcome back
      </p>
      <h1 className="text-4xl font-semibold text-white">Sign in</h1>
      <p className="mt-3 text-sm text-slate-300">
        Use your account to access saved chats, profile details, and your
        personal workspace.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
            placeholder="name@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Password</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
            placeholder="Enter your password"
          />
        </label>

        {error ? (
          <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
        >
          Login
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
        <Link to="/register" className="transition hover:text-white">
          Create account
        </Link>
        <Link to="/forgot-password" className="transition hover:text-white">
          Forgot password?
        </Link>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        Demo login works with any user you register in this app.
      </div>
    </div>
  );
}

export default Login;
