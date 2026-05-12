"use client";

import { useRef, useCallback } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchVideos } from "@/services/videoService";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const VideoFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["videos"],

    queryFn: fetchVideos,

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor || undefined;
    },
  });

  const observer = useRef();

  const lastVideoRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.videos.map((video, index) => {
            const isLast =
              index === page.videos.length - 1;

            return (
              <div
                key={video.id}
                ref={isLast ? lastVideoRef : null}
              >
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full"
                />

                <h2>{video.title}</h2>
              </div>
            );
          })}
        </div>
      ))}

      {isFetchingNextPage && (
        <p>Loading more...</p>
      )}
    </div>
  );
};

export default VideoFeed;