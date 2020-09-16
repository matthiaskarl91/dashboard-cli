import React, { useState, useEffect, useCallback } from "react";
import figlet from "figlet";
import useInterval from "@use-it/interval";
import weather from "weather-js";
import util from "util";
import useDeepCompareEfffect from "use-deep-compare-effect";

const findWeather = util.promisify(weather.find);

const font = "Straight";

const formatWeather = ([results]) => {
  const { location, current, forecast } = results;
  const degreeType = location.degreetype;
  const temperature = `${current.temperature}°${degreeType}`;
  const conditions = current.skytext;
  const low = `${forecast[1].low}°${degreeType}`;
  const high = `${forecast[1].high}°${degreeType}`;

  return `${temperature} and ${conditions} (${low} -> ${high})`;
};

const useRequest = (promise, options, interval = null) => {
  const [state, setState] = useState({
    status: "loading",
    error: null,
    data: null,
  });

  const request = useCallback(
    async (options) => {
      setState({ status: "loading", error: null, data: null });
      let data;

      try {
        data = await promise(options);
        setState({ status: "complete", error: null, data });
      } catch (e) {
        setState({ status: "error", error, data: null });
      }
    },
    [promise]
  );

  useDeepCompareEfffect(() => {
    request(options);
  }, [options, request]);

  useInterval(() => {
    request(options);
  }, interval);

  return state;
};

const Today = ({
  updateInterval = 900000,
  search = "Munich, Germany",
  degreeType = "C",
}) => {
  const [now, setNow] = useState(new Date());
  const [time, setTime] = useState(currentTime);
  const [date, setDate] = useState(currentDate);
  const weather = useRequest(
    findWeather,
    { search, degreeType },
    updateInterval
  );

  useInterval(() => {
    setNow(new Date());
  }, 60000);

  const currentDate = figlet.textSync(
    new Date().toLocaleString("de-DE", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    { font }
  );

  const currentTime = figlet.textSync(
    new Date().toLocaleString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    { font }
  );

  useEffect(() => {
    const date = new Date().toLocaleString("de-DE", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const time = figlet.textSync(
      new Date().toLocaleString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      { font }
    );
    setTime(time);
    setDate(date);
  }, [now]);

  return (
    <box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{
        type: "line",
      }}
      style={{
        border: {
          fg: "blue",
        },
      }}
    >
      {`${date} 
        


        ${time}
        

        ${
          weather.status === "loading"
            ? "Loading"
            : weather.error
            ? `Error ${weather.error}`
            : formatWeather(weather.data)
        }
        `}
    </box>
  );
};

export { Today };
