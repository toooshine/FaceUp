import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Components/Navigation/Navigation';

// Import modules related to Redux
import pictures from './Components/Reducers/pictures.reducer';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
const store = createStore(combineReducers({ pictures }));

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Navigation />
			</Provider>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
