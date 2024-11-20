import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TasksScreen from '../screens/TasksScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IncomeScreen from '../screens/IncomeScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import ExpenseFormScreen from '../screens/ExpenseFormScreen';

// Auth Context
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'Tasks':
              iconName = 'calendar';
              break;
            case 'Expenses':
              iconName = 'dollar-sign';
              break;
            case 'Reports':
              iconName = 'pie-chart';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Início' }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen}
        options={{ title: 'Tarefas' }}
      />
      <Tab.Screen 
        name="Expenses" 
        component={ExpensesScreen}
        options={{ title: 'Despesas' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{ title: 'Relatórios' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ 
                headerShown: true,
                title: 'Configurações',
              }}
            />
            <Stack.Screen 
              name="Income" 
              component={IncomeScreen}
              options={{ 
                headerShown: true,
                title: 'Gerenciar Salário e Rendas',
              }}
            />
            <Stack.Screen 
              name="TaskForm" 
              component={TaskFormScreen}
              options={({ route }) => ({ 
                headerShown: true,
                title: route.params?.id ? 'Editar Tarefa' : 'Nova Tarefa',
              })}
            />
            <Stack.Screen 
              name="ExpenseForm" 
              component={ExpenseFormScreen}
              options={({ route }) => ({ 
                headerShown: true,
                title: route.params?.id ? 'Editar Despesa' : 'Nova Despesa',
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}