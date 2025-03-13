import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up browser
    void WebBrowser.warmUpAsync();
    return () => {
      // Clean up
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
WebBrowser.maybeCompleteAuthSession();
