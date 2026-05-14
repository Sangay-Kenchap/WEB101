import VideoCard from "./VideoCard";

export default function VideoFeed() {

  const videos = [
    {
      id: 1,
      username: "Kenchap",
      caption: "My first TikTok clone"
    },
    {
      id: 2,
      username: "student",
      caption: "Next.js assignment"
    },
    {
      id: 3,
      username: "developer",
      caption: "Learning React"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">

      {videos.map((video) => (
        <VideoCard
          key={video.id}
          username={video.username}
          caption={video.caption}
        />
      ))}

    </div>
  );
}