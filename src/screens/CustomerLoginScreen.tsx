import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function CustomerLoginScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Customer Login
      </Text>

      <Text style={styles.subtitle}>
        OTP login screen coming soon 🚀
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },

  backText: {
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
});