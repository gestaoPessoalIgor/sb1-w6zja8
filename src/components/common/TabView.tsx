import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  initialTab?: string;
}

export default function TabView({ tabs, initialTab }: TabViewProps) {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = React.useState(initialTab || tabs[0].key);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleTabPress = (tab: string, index: number) => {
    setActiveTab(tab);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const getTabStyle = (isActive: boolean) => [
    styles.tab,
    isActive && styles.activeTab,
  ];

  const getTabTextStyle = (isActive: boolean) => [
    styles.tabText,
    isActive && styles.activeTabText,
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={getTabStyle(activeTab === tab.key)}
            onPress={() => handleTabPress(tab.key, index)}
          >
            <Text style={getTabTextStyle(activeTab === tab.key)}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {tabs.map((tab) => (
          <View key={tab.key} style={[styles.tabContent, { width }]}>
            {tab.content}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  tabBarContent: {
    paddingHorizontal: spacing.md,
  },
  tab: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.md,
    color: colors.gray[600],
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.weights.medium as any,
  },
  tabContent: {
    flex: 1,
  },
});