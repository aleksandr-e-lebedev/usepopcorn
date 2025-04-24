/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { useState, useEffect } from 'react';

type StoredData<T> = string | null | T;

function getDataFromStorage<T>(key: string): T | null {
  let data: StoredData<T> = localStorage.getItem(key);

  if (data) {
    data = JSON.parse(data) as T;
  } else {
    data = null;
  }

  return data;
}

function setDataToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

type Result<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): Result<T> {
  const [state, setState] = useState<T>(
    () => getDataFromStorage<T>(key) ?? defaultValue,
  );

  useEffect(() => {
    setDataToStorage<T>(key, state);
  }, [key, state]);

  return [state, setState];
}
