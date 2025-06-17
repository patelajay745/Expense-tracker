import { SignOutButton } from "@/components/SignOutButton";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        console.log("Token:", token);
      } catch (err) {
        console.error("Failed to fetch token", err);
      }
    };

    fetchToken();
  }, [getToken]);

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
