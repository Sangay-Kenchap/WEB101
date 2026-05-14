"use client";

export default function UploadPage() {
  return (
    <div className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-xl">

      <h1 className="text-3xl font-bold mb-6">
        Upload Video
      </h1>

      <form className="space-y-4">

        <input
          type="text"
          placeholder="Video Caption"
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="file"
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button
          className="bg-pink-500 px-6 py-3 rounded w-full"
        >
          Upload
        </button>

      </form>

    </div>
  );
}