import { Component, ReactNode } from 'react';

type ErrorBoundary_props = {
  children: ReactNode;
  fallback: (error: Error) => ReactNode;
};
type ErrorBoundary_state = {
  hasError: boolean;
};
export default class ErrorBoundary extends Component<
  ErrorBoundary_props,
  ErrorBoundary_state
> {
  static codeError?: Error;
  constructor(props: ErrorBoundary_props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    ErrorBoundary.codeError = error;
    return { hasError: true };
  }
  render() {
    if (this.state.hasError || ErrorBoundary.codeError !== undefined) {
      return (
        <>
          {this.props.fallback(
            ErrorBoundary.codeError || new Error('Cannot find the error')
          )}
        </>
      );
    }
    return this.props.children;
  }
}
