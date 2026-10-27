// Type augmentation for React Three Fiber JSX elements
// R3F v8 with React 18's new JSX transform requires augmenting 'react' module
import type { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
