import { useEffect, useMemo, useState } from "react";

const useIntersectedElement = ({ callback, options }) => {
  const [thresholdElement, setThresholdElement] = useState(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        if (callback) callback();
      }, options),
    [callback, options]
  );

  useEffect(() => {
    if (!thresholdElement) return;

    observer.observe(thresholdElement);

    return () => {
      observer.unobserve(thresholdElement);
    };
  }, [observer, thresholdElement]);

  return { thresholdElementRef: setThresholdElement };
};

export default useIntersectedElement;
