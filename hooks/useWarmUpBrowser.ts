import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

export const useWamUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
