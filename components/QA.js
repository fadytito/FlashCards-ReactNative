import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { primary, secondary, secondaryLight, white } from "../styles/colors";

class QA extends Component {
  state = {
    isAnswerDisplayed: false,
  };

  toggleAnswerDisplay = () => {
    this.setState((prevState) => ({
      isAnswerDisplayed: !prevState.isAnswerDisplayed,
    }));
  };

  correct = () => {
    const { question, handleAnswer } = this.props;
    handleAnswer(true, question.question);
  };

  wrong = () => {
    const { question, handleAnswer } = this.props;
    handleAnswer(false, question.question);
  };

  render() {
    const { question, index, questionsCount, current } = this.props;
    const { isAnswerDisplayed } = this.state;
    const i = index + 1;

    if (i === current) {
      return (
        <View style={styles.container}>
          <View style={styles.progressIndicator}>
            <Text style={styles.progressIndicatorText}>
              {i} of {questionsCount}
            </Text>
          </View>
          {!isAnswerDisplayed && (
            <Text style={styles.title}>{question.question}</Text>
          )}
          {isAnswerDisplayed && (
            <Text style={styles.title}>{question.answer}</Text>
          )}
          <TouchableOpacity
            onPress={this.toggleAnswerDisplay}
            style={styles.btnLink}
          >
            {!isAnswerDisplayed && (
              <Text style={styles.btnLinkText}>View answer</Text>
            )}
            {isAnswerDisplayed && (
              <Text style={styles.btnLinkText}>View question</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={this.correct} style={styles.btn}>
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSec} onPress={this.wrong}>
            <Text style={styles.btnText}>Wrong</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: primary,
    marginBottom: 10,
    marginTop: 25,
  },
  btn: {
    borderWidth: 1,
    borderColor: primary,
    backgroundColor: primary,
    padding: 15,
    marginTop: 25,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },
  btnSec: {
    borderWidth: 1,
    borderColor: secondaryLight,
    backgroundColor: secondary,
    padding: 15,
    marginTop: 25,
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
    textAlign: "center",
  },
  btnLinkText: {
    color: primary,
  },
  progressIndicator: {
    margin: 30,
  },
  progressIndicatorText: {
    color: secondary,
    fontWeight: "bold",
    fontSize: 20
  },
});

function mapStateToProps(decks, { deck }) {
  return {
    questionsCount: decks[deck].questions.length,
  };
}

export default connect(mapStateToProps)(QA);
