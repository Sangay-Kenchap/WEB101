import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback) => {
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    return () => {
      observerRef.current.disconnect();
    };
  }, [callback]);

  return observerRef;
};

export default useIntersectionObserver;