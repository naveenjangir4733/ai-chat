import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAppContext();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200/75">
        Start here
      </p>
      <h1 className="text-4xl font-semibold text-white">Create account</h1>
      <p className="mt-3 text-sm text-slate-300">
        Register once, then each user gets their own protected chat history.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Full name</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
            placeholder="Jane Doe"
          />
        </label>

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
            placeholder="At least 6 characters"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">
            Confirm password
          </span>
          <input
            type="password"
            required
            value={form.confirmPassword}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                confirmPassword: event.target.value,
              }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
            placeholder="Repeat your password"
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
          Register
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-300">
        Already have an account?{" "}
        <Link to="/login" className="text-white transition hover:text-cyan-200">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Register;
