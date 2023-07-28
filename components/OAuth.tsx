import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { styles } from "./Styles";
import { useWamUpBrowser } from "../hooks/useWarmUpBrowser";
import { Image } from "expo-image";
import type { OAuthStrategy } from '@clerk/types';

WebBrowser.maybeCompleteAuthSession();

interface OAuthButtonsProps {
  iconSource: string
  strategy: OAuthStrategy
}

export function OAuthButtons({ iconSource, strategy }:OAuthButtonsProps) {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWamUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{ ...styles.oauthButton, marginBottom: 20 }}
      onPress={onPress}
    >
      <Image source={iconSource} style={{ width:24, height: 24, objectFit: "cover" }} />
    </TouchableOpacity>
  );
}
