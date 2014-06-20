var AppView = Parse.View.extend ({

	className: "post-view",

	initialize: function() {
		this.collection = new PostCollection();
		this.collection.on('add', this.addPost)
		this.collection.fetch({add:true});
	},

	addPost: function (photo) {
		new PhotoView({model: photo});
	}

});

var app = new AppView();

// Preview Function

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();            
        reader.onload = function (e) {
            $('#target').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

$(".photo-preview").change(function(){
    readURL(this);
	});

// Parse Save Function

$('.save-button').click(function(){

	var fileUploadControl = $(".photo-preview")[0];
	if (fileUploadControl.files.length > 0) {
	  var file = fileUploadControl.files[0];
	  var name = "photo.jpg";
	 
	  var parseFile = new Parse.File(name, file);
	}

	var uploadPromise = parseFile.save()


	uploadPromise.then(function() {
		console.log("success")
		}, function(error) {
			console.log("No")
	});


	uploadPromise.done(function(){

		var uploadPhoto = new Parse.Object("UploadPhoto");
		uploadPhoto.set("photo", parseFile.url() );
		uploadPhoto.set("caption", $('.caption').val() );
		uploadPhoto.set("photoRef", parseFile);

		app.collection.add(uploadPhoto)

		uploadPhoto.save()

	})

});

// Photo View

var PhotoView = Parse.View.extend ({
	
	className: 'photo-view',

	template: _.template($('.photo-view-template').text()),


	initialize: function(){
		$('.photo-container').append(this.el);
		this.render();
	},

	render: function(){
		renderTemplate = this.template(this.model.attributes);
		this.$el.html(renderTemplate)
		return this;
	}
});



















