import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default Layout;
