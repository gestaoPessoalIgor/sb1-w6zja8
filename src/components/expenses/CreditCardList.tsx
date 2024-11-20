import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useCardStore } from '../../store/useCardStore';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (spacing.lg * 2);

export default function CreditCardList() {
  const { cards } = useCardStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  if (cards.length === 0) {
    return (
      <Card style={styles.emptyContainer}>
        <Icon name="credit-card" size={32} color={colors.gray[400]} />
        <Text style={styles.emptyText}>Nenhum cartão cadastrado</Text>
        <Button
          title="Adicionar Cartão"
          variant="outline"
          onPress={() => {}}
          style={styles.emptyButton}
        />
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Cartões</Text>
        <Button
          title="Novo"
          size="sm"
          onPress={() => {}}
        />
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
      >
        {cards.map((card, index) => (
          <View
            key={card.id}
            style={[
              styles.cardContainer,
              { backgroundColor: card.color, width: CARD_WIDTH }
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{card.name}</Text>
              <Icon name="credit-card" size={24} style={styles.cardIcon} />
            </View>
            <Text style={styles.cardNumber}>
              **** **** **** {card.lastDigits}
            </Text>
            <Text style={styles.dueDate}>
              Vencimento dia {card.dueDate}
            </Text>
            <View style={styles.cardInfo}>
              <View>
                <Text style={styles.infoLabel}>Fatura Atual:</Text>
                <Text style={styles.infoValue}>
                  {formatCurrency(card.currentBill)}
                </Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>Limite Disponível:</Text>
                <Text style={styles.infoValue}>
                  {formatCurrency(card.limit - card.currentBill)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {cards.length > 1 && (
        <View style={styles.pagination}>
          {cards.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  cardList: {
    paddingHorizontal: spacing.lg,
  },
  cardContainer: {
    borderRadius: 16,
    padding: spacing.lg,
    marginRight: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium as any,
    color: colors.white,
  },
  cardIcon: {
    color: colors.white,
    opacity: 0.8,
  },
  cardNumber: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    opacity: 0.8,
    marginBottom: spacing.sm,
  },
  dueDate: {
    fontSize: typography.sizes.xs,
    color: colors.white,
    opacity: 0.8,
    marginBottom: spacing.lg,
  },
  cardInfo: {
    gap: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    opacity: 0.8,
  },
  infoValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold as any,
    color: colors.white,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[300],
  },
  paginationDotActive: {
    backgroundColor: colors.violet[600],
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.gray[500],
    marginVertical: spacing.md,
  },
  emptyButton: {
    marginTop: spacing.md,
  },
});