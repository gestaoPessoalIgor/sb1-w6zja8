import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    photoURL?: string;
  };
  onPress: () => void;
}

export default function ProfileSection({ user, onPress }: ProfileSectionProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      {user.photoURL ? (
        <Image 
          source={{ uri: user.photoURL }}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.profilePlaceholder}>
          <Text style={styles.profileInitial}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={colors.gray[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: spacing.lg,
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profilePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold as any,
    color: colors.white,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  email: {
    fontSize: typography.sizes.sm,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
});