import { useEffect } from 'react';

const useKeyboard = (cb, deps) => {
  // TODO: Add effect to key when pressed with the keyboard
  useEffect(() => {
    window.addEventListener('keydown', cb)
    return () => {
      window.removeEventListener('keydown', cb)
    }
  }, [deps])
}

export default useKeyboard;