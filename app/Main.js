import React from 'react';
import {
	Alert,
	StyleSheet,
	View,
	SafeAreaView,
	StatusBar,
	Text,
	TouchableOpacity,
	Modal,
	ActivityIndicator,
	ScrollView,
	AsyncStorage
} from 'react-native';
import uuid from 'uuid/v1';
import { LinearGradient } from 'expo';
import { primaryGradientArray } from './utils/Colors';
import Moment from 'react-moment';
import SubTitle from './components/SubTitle';
import Input from './components/Input';
import List from './components/List';
import Button from './components/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import moment from 'moment/min/moment-with-locales';

// Sets the moment instance to use.
Moment.globalMoment = moment;
Moment.globalFormat = 'LLL';

export default class Main extends React.Component {
	state = {
		inputValue: '',
		loadingItems: false,
		allItems: {},
		modalVisible: false,
		isCompleted: false
	};

	componentDidMount = () => {
		this.loadingItems();
	};

	newInputValue = value => {
		this.setState({
			inputValue: value
		});
	};

	loadingItems = async () => {
		try {
			const allItems = await AsyncStorage.getItem('Todos');
			this.setState({
				loadingItems: true,
				allItems: JSON.parse(allItems) || {}
			});
		} catch (err) {
			console.log(err);
		}
	};

	onDoneAddItem = () => {
		const { inputValue } = this.state;
		if (inputValue !== '') {
			this.setState(prevState => {
				const id = uuid();
				const newItemObject = {
					[id]: {
						id,
						isCompleted: false,
						text: inputValue,
						createdAt: Date.now(),
					}
				};
				const newState = {
					...prevState,
					inputValue: '',
					allItems: {
						...prevState.allItems,
						...newItemObject
					}
				};
				this.saveItems(newState.allItems);
				return { ...newState };
			});
		}
	};

	deleteItem = id => {
		Alert.alert(
			'Delete Item?',
			'Are you sure you wish to remove this item from your list?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Canceled'),
					style: 'cancel',
				},
				{
					text: 'Delete Item', onPress: () => this.setState(prevState => {
						const allItems = prevState.allItems;
						delete allItems[id];
						const newState = {
							...prevState,
							...allItems
						};
						this.saveItems(newState.allItems);
						return { ...newState };
					})
				},
			],
			{ cancelable: true },
		);
	};

	completeItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: true
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	incompleteItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: false
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	deleteAllItems = async () => {
		// Works on both iOS and Android
		Alert.alert(
			'Clear List?',
			'Are you sure you wish to clear your list?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'Clear List', onPress: () => this.setState({ allItems: {} }) },
			],
			{ cancelable: false },
		);
	};

	saveItems = newItem => {
		const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem));
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	render() {
		const { inputValue, loadingItems, allItems, createdAt } = this.state;
		const unixTimestamp = createdAt;
		return (
			<LinearGradient colors={primaryGradientArray} style={styles.container}>

				<SafeAreaView style={{ flex: 1 }}>

					<Modal
						animationType="slide"
						visible={this.state.modalVisible}
					>
						<View style={
							{
								flexDirection: 'row',
								width: '100%',
								justifyContent: 'space-between',
								paddingTop: 40,
								paddingHorizontal: 20,
							}
						}>
							<TouchableOpacity onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}>
								<Text style={{ fontSize: 18 }}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									this.onDoneAddItem(),
										this.setModalVisible(!this.state.modalVisible);
								}}
							>
								<Text style={{ fontSize: 18, color: '#4A90E2' }}>Done</Text>
							</TouchableOpacity>
						</View>

						<View style={
							{
								flex: 1,
								alignItems: 'center',
								paddingTop: 20,
							}
						}>
							<View style={
								{
									paddingHorizontal: 20,
									width: '99%',
								}
							}>
								<View style={styles.inputContainer}>
									<MaterialIcons
										name='radio-button-unchecked'
										size={32}
										style={{ margin: 8 }}
										color='#cecece' />
									<View><Input
										inputValue={inputValue}
										onChangeText={this.newInputValue}
										onDoneAddItem={this.onDoneAddItem}
									/>
										<Text style={{ fontSize: 14, color: '#bbb', margin: 10 }}>
											Created: <Moment utc-4 element={Text}>{unixTimestamp}</Moment>
										</Text>

										<Text style={{ fontSize: 12, color: '#bbb', marginLeft: 10 }}>
											Number formatting: 868-555-5555
									</Text>
										<Text style={{ fontSize: 12, color: '#bbb', marginLeft: 10 }}>
											Twitter usernames: @Twitter
									</Text>
										<Text style={{ fontSize: 12, color: '#bbb', marginLeft: 10 }}>
											Instagram tags: #imagetags
									</Text>

									</View>
								</View>
							</View>

						</View>
					</Modal>
					<StatusBar barStyle="dark-content" />

					<TouchableOpacity
						style={
							{
								height: 64,
								width: 64,
								borderRadius: 32,
								backgroundColor: '#00DD99',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								bottom: 10,
								right: '40%',
								zIndex: 99,
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 0 },
								shadowOpacity: 0.1,
								shadowRadius: 8,
								elevation: 1,
							}
						}
						onPress={() => {
							this.setModalVisible(true);
						}}>
						<MaterialIcons
							name="add"
							size={40}
							color="#fff"
						/>
					</TouchableOpacity>



					<View style={styles.list}>
						<View style={styles.column}>
							<SubTitle subtitle={'Your List'} />
							<View style={styles.deleteAllButton}>
								<Button deleteAllItems={this.deleteAllItems} />
							</View>
						</View>
						{loadingItems ? (
							<ScrollView contentContainerStyle={styles.scrollableList}
								showsVerticalScrollIndicator={false}
							>
								{Object.values(allItems)
									.reverse()
									.map(item => (
										<List
											key={item.id}
											{...item}
											deleteItem={this.deleteItem}
											completeItem={this.completeItem}
											incompleteItem={this.incompleteItem}
										/>
									))}
							</ScrollView>
						) : (
								<ActivityIndicator size="large" color="grey" />
							)}
					</View>

				</SafeAreaView>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		flex: 1
	},
	scrollableList: {
		padding: 4,
	},
	centered: {
		alignItems: 'center'
	},
	inputContainer: {
		flexDirection: 'row',
		width: '100%'
	},
	list: {
		flex: 1,
		marginTop: 20,
		marginBottom: 40,
		borderRadius: 20,
		backgroundColor: 'white',
		padding: 8,
		overflow: 'hidden',
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingLeft: 0,
	},
	deleteAllButton: {
		marginRight: 0,
		flexDirection: 'row',
	}
});
