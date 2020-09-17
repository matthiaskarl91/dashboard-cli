import React, { useState } from "react";
import figlet from "figlet";
import useInterval from "@use-it/interval";
import weather from "weather-js";
import util from "util";
import chalk from "chalk";
import gradient from "gradient-string";
import { useRequest } from "../hooks/useRequest";
import { Box } from "./Box";

const findWeather = util.promisify(weather.find);

const font = "Straight";

const formatWeather = ([results]) => {
  const { location, current, forecast } = results;
  const degreeType = location.degreetype;
  const temperature = `${current.temperature}°${degreeType}`;
  const conditions = current.skytext;
  const low = `${forecast[1].low}°${degreeType}`;
  const high = `${forecast[1].high}°${degreeType}`;

  return `${chalk.yellow(temperature)} and ${chalk.green(
    conditions
  )} (${chalk.blue(low)} -> ${chalk.red(high)})`;
};

const Today = ({
  updateInterval = 900000,
  search = "Munich, Germany",
  degreeType = "C",
  top,
  left,
  width,
  height,
}) => {
  const boxProps = { top, left, width, height };
  const [now, setNow] = useState(new Date());
  const weather = useRequest(
    findWeather,
    { search, degreeType },
    updateInterval
  );

  useInterval(() => {
    setNow(new Date());
  }, 60000);

  const date = now.toLocaleString("de-DE", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = figlet.textSync(
    now.toLocaleString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    { font }
  );

  return (
    <Box
      {...boxProps}
      label="Today"
      border={{
        type: "line",
      }}
      style={{
        border: {
          fg: "blue",
        },
      }}
    >
      <text right={1}>{chalk.blue(date)}</text>
      <text top="center" left="center">
        {gradient.atlas.multiline(time)}
      </text>
      <text top="100%-3" left={1}>
        {weather.status === "loading"
          ? "Loading"
          : weather.error
          ? `Error ${weather.error}`
          : formatWeather(weather.data)}
      </text>
    </Box>
  );
};

export { Today };
