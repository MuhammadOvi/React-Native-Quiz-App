import { createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import Questions from '../screens/Questions';
import ResultScreen from '../screens/ResultScreen';

export default createSwitchNavigator({
  Main: HomeScreen,
  Quiz: QuizScreen,
  Questions,
  Result: ResultScreen,
});
