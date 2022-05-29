import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/Route/types';

export default class HomeProps {
  navigation!: StackNavigationProp<RootStackParamList, 'Home'>;
}
