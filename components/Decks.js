import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/decks";
import DeckPreview from "./DeckPreview";
import TabHeader from "./TabHeader";

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  handleNavigate = (deck) => {
    this.props.navigation.navigate("Deck", { id: deck.title });
  };

  render() {
    const { decks } = this.props;
    return (
      <ScrollView>
        <TabHeader title={"Decks"} />
        {Object.keys(decks).length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.message}>
              You don't have any decks, please create at least one to get
              started ☺
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            {Object.keys(decks).map((deck) => (
              <View key={deck}>
                <DeckPreview
                  deck={decks[deck]}
                  goToDeck={this.handleNavigate}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    fontSize: 20,
    margin: 30,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Decks);
