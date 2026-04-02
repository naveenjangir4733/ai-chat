import { useAppContext } from "@/context/AppContext";

function Dashboard() {
  const { activeChat, chats, sessionUser } = useAppContext();

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,_rgba(2,6,23,0.96),_rgba(15,23,42,0.98))] p-6 text-white sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
          Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Workspace overview</h1>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-300">Signed in user</p>
            <h2 className="mt-3 text-2xl font-semibold">{sessionUser?.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{sessionUser?.email}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-300">Chats created</p>
            <h2 className="mt-3 text-2xl font-semibold">{chats.length}</h2>
            <p className="mt-1 text-sm text-slate-400">
              Persistent per logged-in user
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-300">Active conversation</p>
            <h2 className="mt-3 text-2xl font-semibold">
              {activeChat?.messages.length ?? 0}
            </h2>
            <p className="mt-1 text-sm text-slate-400">Messages in current chat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
