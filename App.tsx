import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigation/AppNavigator';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {SplashScreen} from './src/screens/SplashScreen';
import {AppDataProvider} from './src/storage/AppDataContext';
import {STORAGE_KEYS} from './src/storage/keys';
import {colors} from './src/theme/theme';

type AppPhase = 'splash' | 'onboarding' | 'main';

function App(): React.JSX.Element {
  const [phase, setPhase] = useState<AppPhase>('splash');

  useEffect(() => {
    let mounted = true;
    let timeout: ReturnType<typeof setTimeout>;
    const startedAt = Date.now();

    async function boot() {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.onboarded);
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, 5000 - elapsed);
      timeout = setTimeout(() => {
        if (mounted) {
          setPhase(stored === 'true' ? 'main' : 'onboarding');
        }
      }, wait);
    }

    boot();

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const finishOnboarding = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.onboarded, 'true');
    setPhase('main');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      {phase === 'splash' ? <SplashScreen /> : null}
      {phase === 'onboarding' ? <OnboardingScreen onFinish={finishOnboarding} /> : null}
      {phase === 'main' ? (
        <AppDataProvider>
          <AppNavigator />
        </AppDataProvider>
      ) : null}
    </SafeAreaProvider>
  );
}

export default App;
