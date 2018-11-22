import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Ionicons } from '@expo/vector-icons';
export default class QuizScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {};

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('Quiz')}
          title="Start Quiz"
          color="#008080"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
