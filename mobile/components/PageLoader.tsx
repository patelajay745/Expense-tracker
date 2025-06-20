import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { FC } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

interface Props {}

const PageLoader: FC<Props> = (props) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default PageLoader;
