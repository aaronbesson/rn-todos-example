import React, { Component } from 'react';
import {
	View,
	Alert,
	Text,
	Share,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Platform, Animated, Easing
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Moment from 'react-moment';
import {
	itemListText,
	itemListTextStrike,
	circleInactive,
	circleActive,
	deleteIconColor
} from '../utils/Colors';
import Autolink from 'react-native-autolink';
import Swipeable from 'react-native-swipeable-row';
import moment from 'moment/min/moment-with-locales';


const { width } = Dimensions.get('window');

// Sets the moment instance to use.
Moment.globalMoment = moment;
Moment.globalFormat = 'LLL';


class List extends Component {
	onToggleCircle = () => {
		const { isCompleted, createdAt, id, completeItem, incompleteItem } = this.props;
		if (isCompleted) {
			incompleteItem(id);
		} else {
			completeItem(id);
		}
	};

	onShare = () => {
		try {
			const result = Share.share({
				message: this.props.text,
			})

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};


	render() {
		const { date, text, deleteItem, id, isCompleted, createdAt } = this.props;
		const unixTimestamp = createdAt;
		const rightButtons = [
			<View style={
				{
					flexDirection: 'row',
					flex: 1,
					marginLeft: 10
				}
			}><TouchableOpacity
				onPress={this.onShare}
			>
					<View style={
						styles.share
					}>
						<MaterialIcons
							name="share"
							size={24}
							color="#fff"
						/>
					</View>
				</TouchableOpacity>,
			<TouchableOpacity
					onPressOut={() => deleteItem(id)}
				>
					<View style={
						styles.delete
					}>
						<MaterialIcons
							name="delete"
							size={24}
							color="#fff"
						/>
					</View>
				</TouchableOpacity>
			</View>

		];
		return (
			<View style={styles.container}>
				<Swipeable
					rightButtons={rightButtons}
					rightButtonWidth={100}
					style={{ paddingRight: 0 }}
				>
					<View style={styles.column}>
						<TouchableOpacity onPress={this.onToggleCircle}>
							<MaterialIcons
								name={isCompleted ? 'check-circle' : 'radio-button-unchecked'}
								size={25}
								style={{ marginRight: 8 }}
								color='#00DD99' />
						</TouchableOpacity>
						<View style={{ paddingRight: 20 }}>
							<Autolink
								hashtag="instagram"
								text={text}
								latlng
								mention="twitter"
								style={[
									styles.text,
									isCompleted
										? {
											color: itemListTextStrike,
											textDecorationLine: 'line-through',
											fontStyle: 'italic'
										}
										: { color: itemListText }
								]}
							>
								<Text

								>
									{text}
								</Text></Autolink>
							<Text style={{ fontSize: 12, color: '#bbb', marginTop: 5 }}>
								<Moment utc-4 element={Text}>{unixTimestamp}</Moment></Text>
						</View>

					</View>
				</Swipeable>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: 14,
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ececec',
	},
	share: {
		backgroundColor: '#4A90E2',
		height: 40,
		width: 40,
		marginRight: 10,
		borderRadius: 99,
		alignItems: 'center',
		justifyContent: 'center'
	},
	column: {
		flexDirection: 'row',
		width: width,
	},
	text: {
		color: '#222',
		fontWeight: '500',
		fontSize: 17,
		paddingRight: 40,
		width: 350
	},
	delete: {
		backgroundColor: '#FF4B61',
		height: 40,
		width: 40,
		borderRadius: 99,
		alignItems: 'center',
		justifyContent: 'center'
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 8,
		marginHorizontal: 15,
	},
	button: {
		marginRight: 15
	}
});

export default List;
