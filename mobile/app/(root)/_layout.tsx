import PageLoader from "@/components/PageLoader";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default Layout;
