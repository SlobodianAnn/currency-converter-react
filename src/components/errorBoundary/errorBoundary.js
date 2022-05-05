import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);

    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <div>Sorry got some error, please try to reload the page</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
