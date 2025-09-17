import { View } from 'react-native';
import EmailForm from '../components/Signin';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <EmailForm />
    </View>
  );
}
