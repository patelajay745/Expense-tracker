import { COLORS } from "@/constants/colors";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};

const SafeScreen: React.FC<Props> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return <View style={{ paddingTop: insets.top, flex:1,backgroundColor:COLORS.background}}>{children}</View>;
};

export default SafeScreen;

const styles = StyleSheet.create({});
