import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import { formatMonth } from '../../utils/formatters';

interface MonthPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (month: string) => void;
  selectedMonth: string;
}

export function MonthPicker({
  visible,
  onClose,
  onSelect,
  selectedMonth,
}: MonthPickerProps) {
  // Gerar lista de meses (últimos 12 meses)
  const months = React.useMemo(() => {
    const result = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthStr = date.toISOString().slice(0, 7);
      result.push(monthStr);
    }
    
    return result;
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Selecionar Mês</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color={colors.gray[500]} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.monthList}>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.monthItem,
                  month === selectedMonth && styles.monthItemSelected,
                ]}
                onPress={() => {
                  onSelect(month);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.monthText,
                    month === selectedMonth && styles.monthTextSelected,
                  ]}
                >
                  {formatMonth(month + '-01')}
                </Text>
                {month === selectedMonth && (
                  <Icon name="check" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  closeButton: {
    padding: spacing.sm,
    margin: -spacing.sm,
  },
  monthList: {
    padding: spacing.md,
  },
  monthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: spacing.md,
  },
  monthItemSelected: {
    backgroundColor: colors.primary + '10',
  },
  monthText: {
    fontSize: typography.sizes.md,
    color: colors.gray[700],
  },
  monthTextSelected: {
    color: colors.primary,
    fontWeight: typography.weights.medium as any,
  },
});