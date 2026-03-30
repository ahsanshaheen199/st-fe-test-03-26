import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary caught an error:", error);
    console.error("Error Info:", errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-background">
          <div className="glass-panel p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-semibold mb-2 text-text-main">
              Oops! Something went wrong
            </h1>
            <p className="text-text-muted mb-6">
              We encountered an unexpected error. Don't worry, our team has been
              notified.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-text-muted hover:text-text-main mb-2">
                  Technical details
                </summary>
                <pre className="bg-surface-hover p-4 rounded-lg text-xs overflow-auto text-text-muted">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button onClick={this.handleReset} className="btn-primary w-full">
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
