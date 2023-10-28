import { Component } from 'react';

export function activateError(): void {
  throw new Error('OOPS! Something is wrong');
}
export default class ErrorBoundary extends Component {
  hasError: boolean;
  constructor(props: object) {
    super(props);
    this.hasError = false;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    return;
  }

  render() {
    if (this.hasError) {
      activateError();
    }
    return this.props.children;
  }
}
