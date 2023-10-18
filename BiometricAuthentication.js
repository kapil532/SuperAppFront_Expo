import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricAuthentication=()=> {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const isAvailable = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricAvailable(isAvailable);
  };

  const handleAuthenticate = async () => {
    if (isBiometricAvailable) {
      const result = await LocalAuthentication.authenticateAsync();
      console.log("result----------->",result)
      if (result.success) {
        alert('Authentication successfull!');
      } else {
        alert('Authentication failed or canceled.');
      }
    } else {
      alert('Biometric authentication is not available on this device.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isBiometricAvailable ? (
        <Button title="Authenticate" onPress={handleAuthenticate} />
      ) : (
        <Text>Biometric authentication is not available on this device.</Text>
      )}
    </View>
  );
}
export default BiometricAuthentication;