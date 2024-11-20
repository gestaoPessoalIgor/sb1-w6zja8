import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button } from './Button';
import { colors, typography, spacing } from '../../theme';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Algo deu errado</Text>
          <Text style={styles.description}>
            Desculpe, ocorreu um erro inesperado.
          </Text>
          <Button
            title="Tentar novamente"
            onPress={this.handleRetry}
            style={styles.button}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold as any,
    color: colors.gray[900],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    minWidth: 200,
  },
});