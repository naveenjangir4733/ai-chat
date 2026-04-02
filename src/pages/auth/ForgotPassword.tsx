import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200/75">
        Account recovery
      </p>
      <h1 className="text-4xl font-semibold text-white">Forgot password</h1>
      <p className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300">
        This demo project stores users locally for end-user flow testing. If you
        need access again, create a new demo account or extend this screen with
        your backend email reset flow.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/register"
          className="rounded-2xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
        >
          Create new account
        </Link>
        <Link
          to="/login"
          className="rounded-2xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/5"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
