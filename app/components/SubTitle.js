import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { lighterWhite } from '../utils/Colors';

const SubTitle = ({ subtitle }) => (
	<View>
		<Text style={styles.titleText}>{subtitle}</Text>
	</View >
);

const styles = StyleSheet.create({
	titleText: {
		fontSize: 48,
		fontWeight: '500',
		marginLeft: 0
	}
});

export default SubTitle;
