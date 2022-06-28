import React from "react";

function Video(props) {
  return (
    <>
      <iframe
        title="video"
        className="w-100 m-0"
        height="500px"
        src="https://www.youtube.com/embed/03GYzR0LyQM"
        frameBorder="0"
        allowFullScreen
      />
    </>
  );
}

export default Video;
