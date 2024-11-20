import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import ScreenContainer from '../components/common/ScreenContainer';
import Header from '../components/common/Header';
import ProfileSection from '../components/settings/ProfileSection';
import SettingsSection from '../components/settings/SettingsSection';
import { spacing } from '../theme';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Conta',
      options: [
        {
          icon: 'dollar-sign',
          label: 'Gerenciar Salário e Rendas',
          onPress: () => navigation.navigate('Income' as never),
        },
        {
          icon: 'credit-card',
          label: 'Meus Cartões',
          onPress: () => navigation.navigate('Cards' as never),
        },
      ],
    },
    {
      title: 'Preferências',
      options: [
        {
          icon: 'globe',
          label: 'Idioma',
          value: 'Português',
          onPress: () => {},
        },
        {
          icon: 'moon',
          label: 'Tema',
          value: 'Claro',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Outros',
      options: [
        {
          icon: 'share-2',
          label: 'Compartilhar Aplicativo',
          onPress: () => {},
        },
        {
          icon: 'message-square',
          label: 'Feedback',
          onPress: () => {},
        },
        {
          icon: 'log-out',
          label: 'Sair',
          onPress: handleLogout,
          destructive: true,
        },
      ],
    },
  ];

  return (
    <ScreenContainer>
      <Header title="Configurações" />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <ProfileSection
          user={user!}
          onPress={() => {}}
        />
        {settingsSections.map((section, index) => (
          <SettingsSection
            key={index}
            title={section.title}
            options={section.options}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
});