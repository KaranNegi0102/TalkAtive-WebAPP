import React from "react";

const videoChatPanel = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      
    </div>
  );
};

export default videoChatPanel;
