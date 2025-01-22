import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../config/FireBaseConfig";
import { getLocalStorage } from "../../service/Storage";

const TabLayout = () => {
  const router = useRouter();
  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    if (!userInfo) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    GetUserDetail();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: "Add New",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
