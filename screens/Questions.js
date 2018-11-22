import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Text,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Ionicons } from '@expo/vector-icons';
export default class Questions extends React.Component {
  state = {
    questions: [],
    currentQuestion: '',
    options: [],
    answers: [],
    asked: 0,
  };

  componentDidMount() {
    this.renderQuestions();
  }

  renderQuestions = () => {
    const { navigation } = this.props;
    let { questions } = this.state;
    const { answers, asked } = this.state;

    questions = navigation.getParam('questions', []);
    if (!questions || questions.length === 0) {
      navigation.navigate('Quiz');
      return;
    }

    console.log('questions', questions);
    const questionToAsk = questions[asked];
    // creating options
    const options = questionToAsk.incorrect_answers;
    options.push(questionToAsk.correct_answer);

    const currentQuestion = questionToAsk.question;

    this.setState({ options, currentQuestion });

    console.log('options', options);
  };

  render() {
    const { options, currentQuestion } = this.state;

    return (
      <View style={styles.container}>
        <Text>{currentQuestion}</Text>
        <Button onPress={() => {}} title="Display Questions" color="#008080" />
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
