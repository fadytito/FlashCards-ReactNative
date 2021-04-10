import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import StackHeaderStyles from "./../components/StackHeaderStyles";
import QA from "./../components/QA";
import {
  setLocalNotification,
  clearLocalNotification,
} from "../utils/notifications";

import { primary, secondary, white } from "./../styles/colors";

class Quiz extends Component {
  state = {
    current: 1,
    count: 0,
    correct: [],
    wrong: [],
  };

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title");
    const style = StackHeaderStyles(`${title} quiz`);
    return style;
  };

  componentDidMount() {
    const { deck } = this.props;
    this.setState({ count: deck.questions.length });
    clearLocalNotification().then(setLocalNotification);
  }

  correctAnswer = (question) => {
    this.setState((prevState) => {
      return {
        current: prevState.current + 1,
        correct: prevState.correct.concat([question]),
      };
    });
  };

  wrongAnswer = (question) => {
    this.setState((prevState) => {
      return {
        current: prevState.current + 1,
        correct: prevState.wrong.concat([question]),
      };
    });
  };

  handleAnswer = (answer, question) => {
    answer
      ? this.correctAnswer(question.question)
      : this.wrongAnswer(question.question);
  };

  restartQuiz = () => {
    this.setState({ current: 1, count: 0, correct: [], incorrect: [] });
  };

  goToDeck = () => {
    const { title } = this.props.deck;
    this.props.navigation.navigate("Deck", { id: title });
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { current, correct } = this.state;
    return (
      <View style={styles.container}>
        {questions.map((question, index) => (
          <QA
            key={question.question}
            deck={deck.title}
            question={question}
            index={index}
            current={current}
            handleAnswer={this.handleAnswer}
          />
        ))}
        {current > questions.length && (
          <View>
            <Text style={styles.completeTitle}>Quiz complete!</Text>
            <Text style={styles.stats}>
              You got {correct.length} out of {questions.length} correct. (
              {Math.floor((correct.length / questions.length) * 100)}%)
            </Text>
            <TouchableOpacity style={styles.btn} onPress={this.restartQuiz}>
              <Text style={styles.btnText}>Restart quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLink} onPress={this.goToDeck}>
              <Text style={styles.btnLinkText}>Back to deck</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  completeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: primary,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  stats: {
    fontSize: 15,
    color: secondary,
  },
  btn: {
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
  btnLink: {
    padding: 15,
    marginTop: 25,
  },
  btnLinkText: {
    textAlign: "center",
    color: primary,
  },
});

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params;
  return {
    deck: decks[title],
  };
}

export default connect(mapStateToProps)(Quiz);
