import React from "react";
import blessed from "blessed";
import { render } from "react-blessed";
import { Today } from "./components/Today";
import { Box } from "./components/Box";

const App = ({}) => {
  return (
    <>
      <Today
        top="0%"
        left="0%"
        width="50%"
        height="35%"
        updateInterval={5000}
      />
      <Box label="Recent Commits" top={0} left="50%" width="50%" height="50%" />
      <Box label="Time log" top="35%" left={0} width="25%" height="65%" />
      <Box label="Pomodoro" top="35%" left="25%" width="25%" height="65%" />
      <Box label="GitHub" top="50%" left="50%" width="5q0%" height="50%" />
    </>
  );
};

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Developer Dashboard",
});

screen.key(["escape", "q", "C-c"], () => process.exit(0));

const component = render(<App />, screen);
