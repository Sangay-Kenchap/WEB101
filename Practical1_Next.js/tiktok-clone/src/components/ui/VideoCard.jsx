export default function VideoCard({ username, caption }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 mb-6">

      <div className="bg-zinc-700 h-[500px] rounded-lg mb-4 flex items-center justify-center">
        <p className="text-2xl">Video Placeholder</p>
      </div>

      <h2 className="font-bold text-lg">
        @{username}
      </h2>

      <p className="text-gray-300">
        {caption}
      </p>

    </div>
  );
}