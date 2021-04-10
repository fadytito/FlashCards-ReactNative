import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import Decks from "./Decks";
import CreateDeck from "./CreateDeck";
import { primary, secondaryLight, white } from "./../styles/colors";

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
    },
    Create: {
      screen: CreateDeck,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Decks") {
          return <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
        } else if (routeName === "Create") {
          return <Ionicons name="create" size={30} color={tintColor} />;
        }
      },
    }),
    navigationOptions: {
      headerShown: false,
    },
    tabBarOptions: {
      activeTintColor: white,
      inactiveTintColor: secondaryLight,
      style: {
        height: 65,
        backgroundColor: primary,
      },
    },
  }
);

export default Tabs;
