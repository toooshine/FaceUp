import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import ipAddress from '../../config';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
	componentDidMount() {
		fetch(ipAddress + '/pictures')
			.then((res) => {
				return res.json();
			})
			.then((picture) => {
				console.log(picture);
				var picturesFromDB = picture.data.map((pics) => {
					return {
						pictureName: pics.name,
						pictureUrl: pics.url
					};
				});
				console.log(picturesFromDB);
				this.props.handlePicsFromDB(picturesFromDB);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		return (
			<ImageBackground style={{ flex: 1 }} source={require('../../assets/background.jpg')}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text h1 style={{ color: '#FFFFFF' }}>
						FaceUp
					</Text>
					<Divider style={{ height: 10 }} />
					<Text h3 style={{ color: '#FFFFFF' }}>
						Artificial Intelligence
					</Text>
					<Text h3 style={{ color: '#FFFFFF' }}>
						at your service
					</Text>
					<Divider style={{ height: 20 }} />
					<Button
						title="Discover now"
						backgroundColor="#022F40"
						color="#FFF"
						style={{ width: 200 }}
						onPress={() => this.props.navigation.navigate('Camera')}
					/>
				</View>
			</ImageBackground>
		);
	}
}
function mapDispatchToProps(dispatch) {
	return {
		handlePicsFromDB: function(pictures) {
			dispatch({
				type: 'getPicsFromDB',
				pictures
			});
		}
	};
}

export default connect(null, mapDispatchToProps)(HomeScreen);
