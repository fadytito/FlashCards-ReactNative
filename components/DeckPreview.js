import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { primary, secondary, secondaryLight } from "../styles/colors";

class DeckPreview extends Component {
  handleNavigate = () => {
    const { deck, goToDeck } = this.props;
    goToDeck(deck);
  };

  render() {
    const { deck } = this.props;
    const { questions, title } = deck;

    return (
      <TouchableOpacity onPress={this.handleNavigate} style={styles.deck}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.cardsLabel}>
          {questions.length > 1 || questions.length < 1 ? (
            <Text>
              <Text style={styles.cardsNumber}>{questions.length}</Text> cards
            </Text>
          ) : (
            <Text>
              <Text style={styles.cardsNumber}>{questions.length}</Text> card
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: secondaryLight,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: primary,
    marginBottom: 20,
  },
  cardsLabel: {
    fontSize: 15,
    color: secondary,
  },
  cardsNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DeckPreview;
