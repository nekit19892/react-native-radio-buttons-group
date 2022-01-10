import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';

import { RadioButton, RadioButtonProps, RadioGroupProps } from './index';

export default function RadioGroup({ containerStyle, layout = 'column', onPress, radioButtons, pressableSingleStyle }: RadioGroupProps) {

  const [radioButtonsLocal, setRadioButtonsLocal] = useState<RadioButtonProps[]>(radioButtons);


  function handlePress(id: string) {
    for (const button of radioButtonsLocal) {
      if (button.selected && button.id === id) return;
      button.selected = button.id === id;
    }
    setRadioButtonsLocal([...radioButtonsLocal]);
    if (onPress) {
      onPress(radioButtonsLocal);
    }
  }

  useEffect(() => {
    if (JSON.stringify(radioButtons) !== JSON.stringify(radioButtonsLocal)) {
      setRadioButtonsLocal(radioButtons);
    }
  }, [radioButtons, radioButtonsLocal])

  return (
    <View style={[styles.container, { flexDirection: layout }, containerStyle]}>
      {
        radioButtonsLocal.map((button) => (
          <RadioButton
            {...button}
            pressableSingleStyle={pressableSingleStyle}
            key={button.id}
            onPress={handlePress}
          />
        ))
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
