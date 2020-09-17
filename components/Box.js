import React from "react";

const Box = ({ label, top, left, width, height, children }) => {
  const boxProps = { label, top, left, width, height };

  return (
    <box
      {...boxProps}
      border={{ type: "line" }}
      style={{ border: { fg: "blue" } }}
    >
      {`${JSON.stringify({ top, left, width, height }, null, 2)}`}
      {children}
    </box>
  );
};

export { Box };
