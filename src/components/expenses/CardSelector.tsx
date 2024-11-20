import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface Card {
  id: string;
  name: string;
  lastDigits: string;
  color: string;
  limit: number;
  currentBill: number;
}

interface CardSelectorProps {
  cards: Card[];
  selectedCardId: string;
  onSelect: (cardId: string) => void;
}

export default function CardSelector({ cards, selectedCardId, onSelect }: CardSelectorProps) {
  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Cartão</Text>
        <View style={styles.emptyState}>
          <Icon name="credit-card" size={24} color={colors.gray[400]} />
          <Text style={styles.emptyText}>Nenhum cartão cadastrado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cartão</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
      >
        {cards.map((card) => {
          const availableLimit = card.limit - card.currentBill;
          
          return (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.cardButton,
                { backgroundColor: card.color + '20' },
                selectedCardId === card.id && styles.cardButtonActive
              ]}
              onPress={() => onSelect(card.id)}
            >
              <View style={styles.cardHeader}>
                <Text style={[
                  styles.cardName,
                  { color: card.color }
                ]}>
                  {card.name}
                </Text>
                <Text style={styles.cardDigits}>
                  *{card.lastDigits}
                </Text>
              </View>
              <Text style={styles.limitLabel}>Limite Disponível</Text>
              <Text style={[
                styles.limitValue,
                { color: card.color }
              ]}>
                {formatCurrency(availableLimit)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  cardList: {
    gap: spacing.sm,
  },
  cardButton: {
    width: 200,
    padding: spacing.md,
    borderRadius: spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardButtonActive: {
    borderColor: colors.violet[600],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
  },
  cardDigits: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
  },
  limitLabel: {
    fontSize: typography.sizes.xs,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  limitValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.gray[50],
    borderRadius: spacing.lg,
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[500],
  },
});