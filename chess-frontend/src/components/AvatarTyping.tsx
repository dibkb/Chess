import React from "react";

interface AvatarTyping {
  typingSockets: Set<string>;
}
const AvatarTyping = ({ typingSockets }: AvatarTyping) => {
  console.log(typingSockets);
  return <div>AvatarTyping</div>;
};

export { AvatarTyping };
