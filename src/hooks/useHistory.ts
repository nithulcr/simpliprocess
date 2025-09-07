
import { useState, useCallback } from 'react';

export const useHistory = (initialState: { nodes: any[]; edges: any[] }) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = useCallback((action: (prevState: { nodes: any[]; edges: any[] }) => { nodes: any[]; edges: any[] }) => {
    const newState = typeof action === 'function' ? action(history[index]) : action;
    if (newState === history[index]) {
        return;
    }
    const newHistory = history.slice(0, index + 1);
    setHistory([...newHistory, newState]);
    setIndex(index + 1);
  }, [history, index]);

  const undo = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }, [index]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      setIndex(index + 1);
    }
  }, [index, history.length]);

  return { state: history[index], setState, undo, redo, canUndo: index > 0, canRedo: index < history.length - 1 };
};
