// 'use client';

// // Toast tizimining Context-based store'i.
// // React Context + useReducer ishlatamiz.

// import {
//   createContext,
//   useContext,
//   useReducer,
//   useCallback,
//   createElement,
//   type ReactNode,
// } from 'react';

// export type ToastType = 'success' | 'error' | 'info';

// export type Toast = {
//   id: string;
//   message: string;
//   type: ToastType;
// };

// type State = { toasts: Toast[] };

// type Action =
//   | { type: 'ADD'; toast: Toast }
//   | { type: 'REMOVE'; id: string };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'ADD':
//       return { toasts: [...state.toasts, action.toast] };
//     case 'REMOVE':
//       return { toasts: state.toasts.filter((t) => t.id !== action.id) };
//     default:
//       return state;
//   }
// }

// type ToastContextValue = {
//   toasts: Toast[];
//   addToast: (message: string, type: ToastType) => void;
//   removeToast: (id: string) => void;
// };

// export const ToastContext = createContext<ToastContextValue | null>(null);

// export function ToastProvider({ children }: { children: ReactNode }): ReactNode {
//   const [state, dispatch] = useReducer(reducer, { toasts: [] });

//   const addToast = useCallback((message: string, type: ToastType) => {
//     const id = Math.random().toString(36).slice(2);
//     dispatch({ type: 'ADD', toast: { id, message, type } });
//     // 4 soniyadan keyin avtomatik o'chadi
//     setTimeout(() => dispatch({ type: 'REMOVE', id }), 4000);
//   }, []);

//   const removeToast = useCallback((id: string) => {
//     dispatch({ type: 'REMOVE', id });
//   }, []);

//   return createElement(
//     ToastContext.Provider,
//     { value: { toasts: state.toasts, addToast, removeToast } },
//     children,
//   );
// }

// export function useToastStore(): ToastContextValue {
//   const ctx = useContext(ToastContext);
//   if (!ctx) throw new Error('useToastStore must be used inside ToastProvider');
//   return ctx;
// }




'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  createElement,
  type ReactNode,
} from 'react';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type State = { toasts: Toast[] };

type Action =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { toasts: [...state.toasts, action.toast] };
    case 'REMOVE':
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

type ToastContextValue = {
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }): ReactNode {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: 'ADD', toast: { id, message, type } });
    // 4 soniyadan keyin avtomatik o'chadi
    setTimeout(() => dispatch({ type: 'REMOVE', id }), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return createElement(
    ToastContext.Provider,
    { value: { toasts: state.toasts, addToast, removeToast } },
    children,
  );
}

export function useToastStore(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastStore must be used inside <ToastProvider>');
  return ctx;
}