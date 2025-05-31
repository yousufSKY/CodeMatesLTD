/// <reference types="react" />
/// <reference types="react-dom" />

import * as React from 'react';

declare module 'react' {
  export * from 'react';
  
  export interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    [key: string]: any;
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'submit' | 'reset' | 'button';
  }

  export interface ChangeEvent<T = Element> {
    target: T & EventTarget & {
      value: string;
    };
  }
  
  export type SetStateAction<S> = S | ((prevState: S) => S);
  export type Dispatch<A> = (value: A) => void;
  
  export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
    export interface ForwardRefExoticComponent<P = {}> {
    (props: P): React.ReactElement | null;
    displayName?: string;
  }

  export function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): ForwardRefExoticComponent<P & React.RefAttributes<T>>;
}
