import { useEffect } from 'react';

const useKeyboard = (cb, deps) => {
  useEffect(() => {
    window.addEventListener('keydown', cb)
    return () => {
      window.removeEventListener('keydown', cb)
    }
  }, [deps])
}

export default useKeyboard;