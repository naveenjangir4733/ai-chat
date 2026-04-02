import { useAppContext } from "@/context/AppContext";

function Profile() {
  const { sessionUser, chats } = useAppContext();

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,_rgba(2,6,23,0.96),_rgba(15,23,42,0.98))] p-6 text-white sm:p-8">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
          Profile
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Account details</h1>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm text-slate-400">Name</p>
            <p className="mt-2 text-lg font-medium">{sessionUser?.name}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-2 text-lg font-medium">{sessionUser?.email}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm text-slate-400">Plan</p>
            <p className="mt-2 text-lg font-medium">{sessionUser?.plan}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm text-slate-400">Saved chats</p>
            <p className="mt-2 text-lg font-medium">{chats.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
