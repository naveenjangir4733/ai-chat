import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(135deg,_#07111f,_#111827_45%,_#020617)] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-blue-950/40 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden flex-col justify-between bg-[linear-gradient(160deg,_rgba(14,165,233,0.16),_rgba(15,23,42,0.88),_rgba(2,6,23,0.96))] p-10 lg:flex">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-200/70">
                AI Workspace
              </p>
              <h1 className="max-w-md text-4xl font-semibold leading-tight">
                A clean chat experience with login, history, and a real sidebar.
              </h1>
            </div>

            <div className="grid gap-4 text-left">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-200">
                  Persistent conversations per user
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-200">
                  Protected routes with local session handling
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-200">
                  Searchable chat sidebar for end users
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[720px] bg-slate-950/60 p-6 sm:p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
