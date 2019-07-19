import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import CameraScreen from '../Screens/CameraScreen';
import LibraryScreen from '../Screens/LibraryScreen';
import HomeScreen from '../Screens/HomeScreen';

var BottomNavigator = createBottomTabNavigator(
	{
		Camera: CameraScreen,
		Library: LibraryScreen
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ tintColor }) => {
				var iconName;
				if (navigation.state.routeName == 'Camera') {
					iconName = 'ios-camera';
				} else if (navigation.state.routeName == 'Library') {
					iconName = 'ios-people';
				}

				return <Ionicons name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: 'black',
			inactiveTintColor: 'gray'
		}
	}
);
var StackNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		BottomNavigator: BottomNavigator
	},
	{ headerMode: 'none' }
);

export default (Navigation = createAppContainer(StackNavigator));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
