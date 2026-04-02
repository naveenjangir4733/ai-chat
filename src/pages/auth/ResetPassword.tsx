import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200/75">
        Reset flow
      </p>
      <h1 className="text-4xl font-semibold text-white">Reset password</h1>
      <p className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300">
        This route is ready for a real reset token workflow later. Right now it
        acts as a placeholder page so your routing structure is complete.
      </p>
      <Link
        to="/login"
        className="mt-6 inline-flex w-fit rounded-2xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
      >
        Return to login
      </Link>
    </div>
  );
}

export default ResetPassword;
