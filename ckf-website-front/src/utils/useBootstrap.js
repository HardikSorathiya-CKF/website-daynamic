import { useEffect } from 'react';
import { loadBootstrap } from './loadBootstrap';

export function useBootstrap() {
  useEffect(() => {
    loadBootstrap();
  }, []);
}
