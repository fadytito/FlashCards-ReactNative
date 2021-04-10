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
import { handleAddCard } from "./../actions/decks";
import StackHeaderStyles from "./../components/StackHeaderStyles";
import { primary, secondaryLight, white } from "../styles/colors";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  static navigationOptions = () => {
    return StackHeaderStyles('Add card');
  };

  addCard = () => {
    const { dispatch } = this.props;
    const title = this.props.navigation.getParam("title");
    const { question, answer } = this.state;

    if (question.replace(" ", "") === "" || answer.replace(" ", "") === "") {
      return;
    }

    dispatch(handleAddCard({ question, answer, name: title }));

    Keyboard.dismiss();

    this.setState({
      question: "",
      answer: "",
    });

    this.props.navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;
    return (
      <ScrollView>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter question"
            value={question}
            onChangeText={(question) => {
              this.setState({ question });
            }}
            onBlur={() => Keyboard.dismiss}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Enter answer"
            value={answer}
            onChangeText={(answer) => {
              this.setState({ answer });
            }}
            onBlur={() => Keyboard.dismiss}
          ></TextInput>
          <TouchableOpacity onPress={this.addCard} style={styles.btn}>
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
    padding: 20,
    margin: 30,
    marginBottom: 0,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: primary,
    padding: 15,
    margin: 25,
    marginTop: 50,
    borderRadius: 10,
  },
  btnText: {
    color: white,
    fontSize: 20,
    textAlign: "center",
  },
});

export default connect()(AddCard);
