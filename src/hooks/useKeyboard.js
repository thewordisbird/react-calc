import { useEffect } from 'react';

const useKeyboard = ( deps, cb ) => {
  useEffect(() => {
    window.addEventListener('keydown', cb)
    return () => {
      window.removeEventListener('keydown', cb)
    }
  }, [deps])
}

export default useKeyboard;