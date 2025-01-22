'use client';

import React, { Component, ReactNode } from 'react';


interface ErrorBoundaryProps {
  children: ReactNode; // The children components to wrap inside the error boundary
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log the error details to an error tracking service
    console.error('Error captured by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any fallback UI here
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
