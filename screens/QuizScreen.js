import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Ionicons } from '@expo/vector-icons';
export default class QuizScreen extends React.Component {
  state = {
    loading: false,
  };

  startQuiz = () => {
    const { loading } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: !loading });
    fetch(
      'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=base64',
    )
      .then(response => response.json())
      .then(({ results }) => {
        this.setState({ loading: false });
        navigation.navigate('Questions', { questions: results });
      })
      .catch(err => {
        console.log('ERR->', err);
        // eslint-disable-next-line no-alert
        alert(`ERROR:${err.message}`);
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#008080" />
        ) : (
          <Button
            onPress={() => this.startQuiz()}
            title="Start Quiz"
            color="#008080"
          />
        )}
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
