import React from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import Constants from "expo-constants";
import { createStore } from "redux";
import reducer from "./reducers/decks";
import middleware from "./middleware";
import { Provider } from "react-redux";
import Stacks from "./components/Stacks";
import { setLocalNotification } from "./utils/notifications";
import { primary } from "./styles/colors";

const store = createStore(reducer, middleware);
const Navigation = createAppContainer(Stacks);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: primary,
              height: Constants.statusBarHeight,
            }}
          ></View>
          <Navigation />
        </View>
      </Provider>
    );
  }
}
