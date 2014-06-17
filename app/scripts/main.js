
// Parse Initialize

Parse.initialize("jGM3Nq64tYbvhiJXvBiTeIaVfxL4MVqGK1n3wPXV", "mQkpxU7BXb28EbhzD7CbZluT4Xxn73hMYeyDye0g");

// End Parse Initialize

// Parse Model/Object

var PhotoApp = Parse.Object.extend({
	className: "Photo"
});

var photoApp = new PhotoApp();


// Parse Collection

var PhotoCollection = Parse.Collection.extend({
	model: PhotoApp
});

var photos = new PhotoCollection();


// Parse View

var PhotoView = Parse.View.extend({

	template: _.template($('.photo-gram').text()),

	events: {
		'click .upload-button' : 'upload-button'
	},

	
})