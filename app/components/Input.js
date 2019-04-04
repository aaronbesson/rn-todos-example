import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { inputPlaceholder } from '../utils/Colors';

const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
	<TextInput
		style={styles.input}
		value={inputValue}
		onChangeText={onChangeText}
		placeholder="Add to your list in 140 characters or less.
		Email addresses, phone numbers and twitter handles are auto detected and linked"
		placeholderTextColor={inputPlaceholder}
		multiline={true}
		autoFocus={true}
		autoCapitalize="sentences"
		underlineColorAndroid="transparent"
		selectionColor={'#ccc'}
		maxLength={140}
		returnKeyType="done"
		autoCorrect={true}
		blurOnSubmit={true}
		onSubmitEditing={onDoneAddItem}
	/>
);

const styles = StyleSheet.create({
	input: {
		width: 280,
		justifyContent: 'center',
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 5,
		fontSize: 21,
		borderRadius: 0,
		color: '#333',
		fontWeight: '500',
		borderBottomWidth: 1,
		borderColor: '#cecece',
	}
});

export default Input;
