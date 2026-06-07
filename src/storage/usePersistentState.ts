import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

type StateSetter<T> = T | ((current: T) => T);

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored && mounted) {
          setValue(JSON.parse(stored) as T);
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [key]);

  const update = useCallback(
    (next: StateSetter<T>) => {
      setValue(current => {
        const resolved =
          typeof next === 'function' ? (next as (current: T) => T)(current) : next;
        AsyncStorage.setItem(key, JSON.stringify(resolved));
        return resolved;
      });
    },
    [key],
  );

  return [value, update, ready] as const;
}
