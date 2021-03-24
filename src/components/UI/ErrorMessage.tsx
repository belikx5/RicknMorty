import "../../styles/ui/errorMessage.scss";
import React from "react";

type MessageProps = {
  title: string;
  text: string;
};

function ErrorMessage({ title, text }: MessageProps) {
  return (
    <div className="message-container">
      <h1 className="message-title">🚧{title}🚧</h1>
      <h3 className="message-text">{text}</h3>
    </div>
  );
}

export default ErrorMessage;
