import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/useAuthStore';
import { colors, typography, spacing } from '../../theme';

export default function DashboardHeader() {
  const navigation = useNavigation();
  const { user } = useAuthStore();

  const firstName = user?.name?.split(' ')[0] || 'Usuário';

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá, {firstName}</Text>
        <Text style={styles.subtitle}>Bem-vindo de volta</Text>
      </View>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Settings' as never)}
      >
        {user?.photoURL ? (
          <Image 
            source={{ uri: user.photoURL }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileInitial}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold as any,
    color: colors.gray[900],
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profilePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium as any,
  },
});