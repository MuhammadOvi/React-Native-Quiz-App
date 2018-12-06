import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Text,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import base64 from 'base-64';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Ionicons } from '@expo/vector-icons';

export default class Questions extends React.Component {
  state = {
    questions: [],
    currentQuestion: '',
    options: [
      {
        label: 'No Options!',
        disabled: true,
      },
    ],
    answers: [],
    asked: 0,
    userAnswer: 0,
    loading: false,
    time: {
      minutes: 0,
      seconds: 0,
    },
  };

  componentDidMount() {
    this.renderQuestions();

    this.timer = setInterval(() => {
      this.increaseSecond();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  increaseSecond = () => {
    let {
      time: { minutes, seconds },
    } = this.state;
    if (seconds < 59) {
      seconds += 1;
    } else {
      seconds = 0;
      minutes += 1;
    }

    this.setState({
      time: { minutes, seconds },
    });
  };

  renderQuestions = () => {
    const { navigation } = this.props;
    let { questions } = this.state;
    const { asked } = this.state;

    this.setState({
      options: {
        label: 'No Options!',
        disabled: true,
      },
    });

    questions = navigation.getParam('questions', []);
    if (!questions || questions.length === 0) {
      navigation.navigate('Quiz');
      return;
    }

    const questionToAsk = questions[asked];
    // creating options
    const optionItems = questionToAsk.incorrect_answers;
    optionItems.push(questionToAsk.correct_answer);

    const options = optionItems.map((option, index) => ({
      label: base64.decode(option),
      value: index,
    }));

    const currentQuestion = base64.decode(questionToAsk.question);

    this.setState({ options, currentQuestion, questions });
  };

  onPress = userAnswer => this.setState({ userAnswer });

  nextQuestion = last => {
    const {
      asked,
      questions,
      options,
      answers,
      userAnswer: answer,
    } = this.state;
    const currentQuestion = questions[asked];

    const currentAnswer = {
      question: base64.decode(currentQuestion.question),
      correct_answer: base64.decode(currentQuestion.correct_answer),
      userAnswer: options[answer].label,
      score:
        base64.decode(currentQuestion.correct_answer) === options[answer].label,
    };

    const updatedAnswers = answers;
    updatedAnswers.push(currentAnswer);

    this.setState(
      {
        answers: updatedAnswers,
        asked: asked + 1,
        userAnswer: 0,
      },
      () => (!last ? this.renderQuestions() : this.calculateResult()),
    );
  };

  calculateResult = () => {
    clearInterval(this.timer);

    const { navigation } = this.props;
    const { answers, time } = this.state;

    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].score) score += 1;
    }

    this.setState({ loading: true });

    navigation.navigate('Result', { answers, score, time });
  };

  render() {
    const {
      options,
      currentQuestion,
      userAnswer,
      questions,
      asked,
      loading,
      time,
    } = this.state;

    return loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="transparent" />
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    ) : (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            padding: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text style={{ fontFamily: 'Century-Gothic' }}>
            {`${asked + 1} of ${questions.length}`}
          </Text>
          <Text style={{ fontFamily: 'Century-Gothic' }}>
            Time: {time.minutes > 9 ? time.minutes : `0${time.minutes}`}:
            {time.seconds > 9 ? time.seconds : `0${time.seconds}`}
          </Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.question_text}>{currentQuestion}</Text>
          {options.length > 0 && (
            <RadioForm animation>
              {options.map((obj, i) => (
                <RadioButton labelHorizontal key={Math.random()}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={userAnswer === i}
                    onPress={this.onPress}
                    borderWidth={userAnswer === i ? 3 : 1}
                    buttonInnerColor="#008080"
                    buttonOuterColor={userAnswer === i ? '#008080' : '#000'}
                    buttonSize={15}
                    buttonOuterSize={25}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal
                    onPress={this.onPress}
                    labelStyle={{ fontSize: 16, fontFamily: 'Century-Gothic' }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          )}
          <View style={styles.nextBtn}>
            {questions.length === asked + 1 ? (
              <Button
                onPress={() => this.nextQuestion('last')}
                title="Finish"
                color="#2196F3"
              />
            ) : (
              <Button
                onPress={() => this.nextQuestion()}
                title="Next"
                color="#008080"
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  questionContainer: {
    width: '100%',
    padding: 20,
    fontFamily: 'Century-Gothic',
    borderWidth: 3,
    borderRadius: 5,
    maxWidth: 400,
  },
  question_text: {
    fontFamily: 'Century-Gothic-Bold',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  nextBtn: {
    width: '100%',
    maxWidth: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
});
