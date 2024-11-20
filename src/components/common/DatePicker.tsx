import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import { formatDate } from '../../utils/formatters';

interface DatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
  selectedDate: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DatePicker({
  visible,
  onClose,
  onSelect,
  selectedDate,
  minimumDate,
  maximumDate,
}: DatePickerProps) {
  const [tempDate, setTempDate] = React.useState(new Date(selectedDate));

  const handleChange = (_: any, date?: Date) => {
    if (date) {
      setTempDate(date);
      if (Platform.OS === 'android') {
        onSelect(date.toISOString().split('T')[0]);
        onClose();
      }
    } else if (Platform.OS === 'android') {
      onClose();
    }
  };

  const handleConfirm = () => {
    onSelect(tempDate.toISOString().split('T')[0]);
    onClose();
  };

  if (Platform.OS === 'android') {
    if (!visible) return null;

    return (
      <DateTimePicker
        value={tempDate}
        mode="date"
        display="calendar"
        onChange={handleChange}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    );
  }

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
            <Text style={styles.title}>Selecionar Data</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color={colors.gray[500]} />
            </TouchableOpacity>
          </View>

          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            style={styles.picker}
          />

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={onClose}
            >
              <Text style={styles.buttonOutlineText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonPrimaryText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
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
  picker: {
    height: 200,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutlineText: {
    fontSize: typography.sizes.md,
    color: colors.gray[700],
  },
  buttonPrimaryText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.white,
  },
});