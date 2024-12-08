import React, { useEffect, useRef } from "react";

const FlyInSection = ({ children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fly-in-visible");
          } else {
            entry.target.classList.remove("fly-in-visible");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const childrenArray = sectionRef.current.children;
    Array.from(childrenArray).forEach((child) => {
      observer.observe(child);
    });

    // Cleanup observer on unmount
    return () => {
      Array.from(childrenArray).forEach((child) => {
        observer.unobserve(child);
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="fly-in-parent">
      {React.Children.map(children, (child) => (
        <div className="fly-in-child">{child}</div>
      ))}
    </div>
  );
};

export default FlyInSection;
