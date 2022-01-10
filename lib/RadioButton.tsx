import React from 'react';
import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';

import { RadioButtonProps } from './types';

export default function RadioButton({
  marginHorizontal,
  marginVertical,
  borderColor,
  borderColorActive,
  borderWidth,
  borderWidthActive,
  color = '#444',
  pressableSingleStyle,
  disabled = false,
  id,
  label,
  labelStyle,
  layout = 'row',
  onPress,
  selected = false,
  size = 24 }: RadioButtonProps) {

  const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
  const sizeFull = PixelRatio.roundToNearestPixel(size);

  let orientation: any = { flexDirection: 'row' }
  let margin: any = { marginLeft: 10 };

  if (layout === 'column') {
    orientation = { alignItems: 'center' };
    margin = { marginTop: 10 };
  }

  function handlePress() {
    if (disabled) {
      return null;
    }
    if (onPress) {
      onPress(id);
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, orientation, {
        opacity: disabled ? 0.2 : 1, marginHorizontal: marginHorizontal || 0,
        marginVertical: marginVertical || 0
      }, pressableSingleStyle]}
    >
      <View
        style={[
          styles.border,
          {
            borderColor: selected ? (borderColorActive || 'black') : (borderColor || color),
            borderWidth: selected ? (borderWidthActive || 1) : (borderWidth || 1),
            width: sizeFull,
            height: sizeFull,
            borderRadius: sizeHalf
          }
        ]}>

      </View>
      {
        Boolean(label) && <Text style={[margin, labelStyle]}>{label}</Text>
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  border: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
