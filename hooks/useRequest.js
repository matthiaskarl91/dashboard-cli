import { useState, useCallback } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import useInterval from "@use-it/interval";

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

  useDeepCompareEffect(() => {
    request(options);
  }, [options, request]);

  useInterval(() => {
    request(options);
  }, interval);

  return state;
};

export { useRequest };
