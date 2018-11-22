import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Ionicons } from '@expo/vector-icons';
export default class ResultScreen extends React.Component {
  state = {
    answers: [],
    score: 0,
    time: {
      minutes: 0,
      seconds: 0,
    },
  };

  componentDidMount() {
    const { navigation } = this.props;

    const answers = navigation.getParam('answers', []);
    const score = navigation.getParam('score', 0);
    const time = navigation.getParam('time', {
      minutes: 0,
      seconds: 0,
    });

    this.setState({ answers, score, time });
  }

  startQuiz = () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  };

  render() {
    const { answers, score, time } = this.state;

    return (
      <ScrollView style={styles.container}>
        {/* Heading */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingTop: 100,
            paddingBottom: 100,
          }}
        >
          <Text
            style={{
              fontFamily: 'Century-Gothic-Bold',
              fontSize: 25,
              textAlign: 'center',
            }}
          >
            Your Score
          </Text>
          <Text
            style={{
              fontFamily: 'Century-Gothic-Bold',
              fontSize: 50,
              textAlign: 'center',
            }}
          >
            {score * 10}%
          </Text>
          <Text
            style={{
              fontFamily: 'Century-Gothic',
              fontSize: 25,
              textAlign: 'center',
            }}
          >
            Time: {time.minutes > 9 ? time.minutes : `0${time.minutes}`}:
            {time.seconds > 9 ? time.seconds : `0${time.seconds}`}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'Century-Gothic-Bold',
              fontSize: 20,
              marginBottom: 5,
            }}
          >
            Details
          </Text>
          {/* Questions */}
          {answers.map((ans, index) => (
            <View
              key={Math.random()}
              style={{
                width: '100%',
                padding: 10,
                borderLeftWidth: 8,
                marginBottom: 1,
                borderLeftColor: ans.score
                  ? 'lightgreen'
                  : 'rgba(255, 150, 150, 1)',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              {/* Ques */}
              <Text
                style={{
                  fontSize: 18,
                  width: '100%',
                  fontFamily: 'Century-Gothic-Bold',
                }}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}: {ans.question}
              </Text>
              {/* correct ans */}
              <Text
                style={{
                  fontSize: 18,
                  width: '100%',
                  fontFamily: 'Century-Gothic',
                }}
              >
                Correct: {ans.correct_answer}
              </Text>
              {/* your ans */}
              <Text
                style={{
                  fontSize: 18,
                  width: '100%',
                  fontFamily: 'Century-Gothic',
                }}
              >
                Your&apos;s: {ans.userAnswer}
              </Text>
            </View>
          ))}
        </View>

        {/* play again */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingTop: 50,
            paddingBottom: 100,
          }}
        >
          <Button onPress={this.startQuiz} title="Play Again" color="#008080" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 25,
  },
});
