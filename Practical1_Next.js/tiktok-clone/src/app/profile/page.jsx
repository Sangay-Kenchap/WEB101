export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto">

      <div className="flex items-center gap-6 mb-10">

        <div className="w-24 h-24 rounded-full bg-zinc-700"></div>

        <div>
          <h1 className="text-3xl font-bold">
            Jigme Nidup
          </h1>

          <p className="text-gray-400">
            @jigme
          </p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-zinc-800 h-52 rounded"></div>
        <div className="bg-zinc-800 h-52 rounded"></div>
        <div className="bg-zinc-800 h-52 rounded"></div>

      </div>

    </div>
  );
}