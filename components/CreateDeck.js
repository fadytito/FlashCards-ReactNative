import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { handleCreateDeck } from "../actions/decks";
import TabHeader from "../components/TabHeader";
import { primary, secondaryLight, white } from "../styles/colors";

class CreateDeck extends Component {
  state = {
    title: "",
  };

  createDeck = () => {
    const { dispatch } = this.props;
    const { title } = this.state;

    if (title.replace(" ", "") === "") {
      return;
    }

    dispatch(handleCreateDeck(title));

    this.setState({ title: "" });

    Keyboard.dismiss();

    this.props.navigation.navigate("Deck", { id: title });
  };

  render() {
    const { title } = this.state;
    return (
      <ScrollView>
        <View>
          <TabHeader title="Create Deck"></TabHeader>
          <TextInput
            style={styles.input}
            placeholder="Enter deck title"
            value={title}
            onChangeText={(title) => {
              this.setState({ title });
            }}
            onBlur={() => Keyboard.dismiss}
          ></TextInput>
          <TouchableOpacity onPress={this.createDeck} style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: secondaryLight,
    borderWidth: 1,
    height: 80,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },
  btn: {
    borderWidth: 1,
    borderColor: primary,
    backgroundColor: primary,
    padding: 15,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },
  btnText: {
    color: white,
    fontSize: 20,
    textAlign: "center",
  },
});

export default connect()(CreateDeck);
