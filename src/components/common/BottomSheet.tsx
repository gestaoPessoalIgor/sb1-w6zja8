import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { colors, spacing } from '../../theme';

const { height } = Dimensions.get('window');
const SNAP_POINTS = {
  top: 0,
  middle: height * 0.4,
  bottom: height * 0.8,
};

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoint?: 'top' | 'middle' | 'bottom';
}

export default function BottomSheet({
  visible,
  onClose,
  children,
  snapPoint = 'bottom',
}: BottomSheetProps) {
  const translateY = React.useRef(new Animated.Value(height)).current;
  const lastGestureDy = React.useRef(0);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: SNAP_POINTS[snapPoint],
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: height,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, snapPoint]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dy }) => {
        const newValue = lastGestureDy.current + dy;
        if (newValue >= 0) {
          translateY.setValue(newValue);
        }
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        lastGestureDy.current += dy;

        if (lastGestureDy.current < height * 0.4 || vy < -0.5) {
          Animated.spring(translateY, {
            toValue: SNAP_POINTS[snapPoint],
            useNativeDriver: true,
          }).start();
          lastGestureDy.current = SNAP_POINTS[snapPoint];
        } else {
          onClose();
          lastGestureDy.current = height;
        }
      },
    })
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 200,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray[300],
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
});