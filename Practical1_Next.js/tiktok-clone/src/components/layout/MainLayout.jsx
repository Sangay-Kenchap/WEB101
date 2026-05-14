"use client";

import Link from "next/link";
import {
  FaHome,
  FaCompass,
  FaUserFriends,
  FaVideo,
  FaUpload,
  FaUser
} from "react-icons/fa";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-5">

        <h1 className="text-3xl font-bold text-pink-500 mb-10">
          TikTok
        </h1>

        <nav className="space-y-6">

          <Link href="/" className="flex items-center gap-3 hover:text-pink-500">
            <FaHome />
            <span>For You</span>
          </Link>

          <Link href="/following" className="flex items-center gap-3 hover:text-pink-500">
            <FaUserFriends />
            <span>Following</span>
          </Link>

          <Link href="/explore" className="flex items-center gap-3 hover:text-pink-500">
            <FaCompass />
            <span>Explore</span>
          </Link>

          <Link href="/live" className="flex items-center gap-3 hover:text-pink-500">
            <FaVideo />
            <span>Live</span>
          </Link>

          <Link href="/upload" className="flex items-center gap-3 hover:text-pink-500">
            <FaUpload />
            <span>Upload</span>
          </Link>

          <Link href="/profile" className="flex items-center gap-3 hover:text-pink-500">
            <FaUser />
            <span>Profile</span>
          </Link>

        </nav>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/login"
            className="bg-pink-500 px-4 py-2 rounded text-center"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="border border-pink-500 px-4 py-2 rounded text-center"
          >
            Signup
          </Link>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}