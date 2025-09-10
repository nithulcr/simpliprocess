import 'react';

declare module 'react' {
  interface CSSProperties {
    '--node-bg-color'?: string;
    '--node-text-color'?: string;
  }
}