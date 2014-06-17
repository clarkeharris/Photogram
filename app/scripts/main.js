// Parse Initialize

Parse.initialize("jGM3Nq64tYbvhiJXvBiTeIaVfxL4MVqGK1n3wPXV", "mQkpxU7BXb28EbhzD7CbZluT4Xxn73hMYeyDye0g");

// End Parse Initialize

// Parse Model/Object

var Post = Parse.Object.extend({
	className: "post"
});

var post = new Post();


// Parse Collection

var PostCollection = Parse.Collection.extend({
	model: Post
});

// Parse View

var PhotoView = Parse.View.extend({

	template: _.template($('.photo-gram-template').text()),

	events: {
		'click .upload-button' : 'uploadPhoto'
	},

	initialize: function(){
 	this.listenTo(this.model, 'change', this.render);
 
	 $('.photo-gram').prepend(this.el);
	 this.render();
  },

    render: function(){
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate);
  },

// Upload and Save to Parse Button

$('.upload-button').click(function() {

  var fileUploadControl = $(".photo-upload")[0];
	if (fileUploadControl.files.length > 0) {
  	var file = fileUploadControl.files[0];
  	var name = "photo.jpg";

			var parseFile = new Parse.File(name, file);
			parseFile.save().then(function() {
			
				var post = new Post();
				post.set({
					"photo"   : parseFile.url(),
					"caption" : $('photo-caption').val()
				});

				post.save().then(function(){
					console.log('Go to bed!')
				});

		})
	}
});
    