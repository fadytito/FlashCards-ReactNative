import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import StackHeaderStyles from "./../components/StackHeaderStyles";
import { handleDeleteDeck } from "../actions/decks";
import { primary, secondary, secondaryLight, white } from "./../styles/colors";

class Deck extends Component {
  static navigationOptions = () => {
    return StackHeaderStyles("Deck");
  };

  handleRemoveDeck = () => {
    const { deck, dispatch, navigation } = this.props;
    const { title } = deck;
    navigation.navigate("Decks");
    dispatch(handleDeleteDeck(title));
  };

  render() {
    const { deck } = this.props;
    if (deck) {
      const { title, questions } = deck;
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.cardsLabel}>
            {questions.length !== 1 ? (
              <Text>
                <Text style={styles.cardsNumber}>{questions.length}</Text> card
              </Text>
            ) : (
              <Text>
                <Text style={styles.cardsNumber}>{questions.length}</Text> cards
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate("AddCard", { title })}
          >
            <Text style={styles.btnText}>Add card</Text>
          </TouchableOpacity>

          {questions.length > 0 && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate("Quiz", { title })}
            >
              <Text style={styles.btnText}>Start quiz</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btnLink}
            onPress={this.handleRemoveDeck}
          >
            <Text style={styles.btnLinkText}>Delete this deck</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <View/>;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
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
  input: {
    borderColor: secondaryLight,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginTop: 50,
    textAlign: "center",
  },
  btnLinkText: {
    color: primary,
  },
});

function mapStateToProps(decks, { navigation }) {
  const { id } = navigation.state.params;
  return {
    deck: decks[id],
  };
}

export default connect(mapStateToProps)(Deck);
