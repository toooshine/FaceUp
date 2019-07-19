export default function(pictures = [], action) {
	var pictureCopy = [ ...pictures ];
	if (action.type === 'takePicture') {
		console.log('Reducer OK');
		console.log(action);
		pictureCopy.push({
			pictureName: action.pictureName,
			pictureUrl: action.pictureUrl
		});
		return pictureCopy;
	} else if (action.type === 'getPicsFromDB') {
		console.log('Reducer here');
		var results = action.pictures;
		for (var i = 0; i < results.length; i++) {
			pictureCopy.push(results[i]);
		}
		return pictureCopy;
	} else {
		return pictures;
	}
}
