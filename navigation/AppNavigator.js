import { createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';

export default createSwitchNavigator({
  Main: HomeScreen,
  Quiz: QuizScreen,
});
