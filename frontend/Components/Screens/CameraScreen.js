import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import ipAddress from '../../config';
import { connect } from 'react-redux';

class CameraScreen extends React.Component {
	onPictureSaved = async (photo) => {
		console.log('URI----->' + photo.uri);
		console.log('exif----->' + photo.exif);

		var data = new FormData();
		data.append('photo', {
			uri: photo.uri,
			type: 'image/jpeg',
			name: 'selfie'
		});
		await fetch(ipAddress + '/upload', {
			method: 'post',
			body: data
		})
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then((picture) => {
				console.log(picture);
				this.props.handlePicture(picture.data.name, picture.data.url);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	state = {
		permission: null,
		type: Camera.Constants.Type.back
	};
	async componentDidMount() {
		var { status } = await Permissions.askAsync(Permissions.CAMERA);
		var permission = status === 'granted' ? true : false;
		this.setState({ permission });
	}
	render() {
		if (this.state.permission === null) {
			return <View />;
		} else if (this.state.permission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={{ flex: 1 }}>
					<Camera
						ref={(ref) => {
							this.camera = ref;
						}}
						style={{ flex: 1 }}
						type={this.state.type}
					/>
					<Button
						title="Snapshot"
						onPress={() => {
							if (this.camera) {
								this.camera.takePictureAsync({
									onPictureSaved: this.onPictureSaved,
									quality: 0.7,
									base64: true,
									exif: true
								});
							}
						}}
					/>
					<Button
						title="Front/Back"
						onPress={() => {
							this.setState({
								type:
									this.state.type === Camera.Constants.Type.back
										? Camera.Constants.Type.front
										: Camera.Constants.Type.back
							});
						}}
					/>
				</View>
			);
		}
	}
}
function mapDispatchToProps(dispatch) {
	return {
		handlePicture: function(pictureName, pictureUrl) {
			dispatch({
				type: 'takePicture',
				pictureName,
				pictureUrl
			});
		}
	};
}
export default connect(null, mapDispatchToProps)(CameraScreen);
