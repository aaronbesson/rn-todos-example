import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { lighterWhite } from '../utils/Colors';

const Button = ({ deleteAllItems }) => (
	<TouchableOpacity onPress={deleteAllItems} style={{
		height: 32, marginBottom: 8, marginRight: 5,
		backgroundColor: "#EFF3F7", borderRadius: 99, paddingVertical: 7, paddingHorizontal: 12
	}}><View style={{
		flex: 1,
		flexDirection: 'row',
	}}>
			<MaterialIcons name="delete" size={18} color="#646464" />
			<Text style={{ color: '#646464', marginLeft: 5 }}>Clear list</Text>
		</View>
	</TouchableOpacity>
);

export default Button;
