import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../theme/theme';

const matrix = [
  '111111001101111',
  '100001011001001',
  '101101110101101',
  '101101001101101',
  '100001101001001',
  '111111101111111',
  '000000111000000',
  '110101000110101',
  '010111101010001',
  '111001010111101',
  '100111010001101',
  '101000111101001',
  '101111000101111',
  '100001110100001',
  '111111001111111',
];

type QrCodeProps = {
  size?: number;
};

export function QrCode({size = 154}: QrCodeProps) {
  const cell = size / matrix.length;

  return (
    <View style={[styles.wrap, {width: size, height: size}]}>
      {matrix.map((row, rowIndex) =>
        row.split('').map((value, columnIndex) => (
          <View
            key={`${rowIndex}-${columnIndex}`}
            style={[
              styles.cell,
              {
                width: cell,
                height: cell,
                left: columnIndex * cell,
                top: rowIndex * cell,
                backgroundColor: value === '1' ? colors.bgDeep : colors.text,
              },
            ]}
          />
        )),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.text,
    borderRadius: 8,
    padding: 8,
    overflow: 'hidden',
  },
  cell: {
    position: 'absolute',
  },
});
