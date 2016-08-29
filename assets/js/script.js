
$(function() {
	deleteUser();


});

var deleteUser = function(){


	$("a[data-method='delete']").click(function(){
		var deleteConfirmation = confirm("Do you want to delete this User");
		if (deleteConfirmation === true) {
			console.log(this.getAttribute('href'));
			console.log("delete user");
	    $.ajax({
	        url: this.getAttribute('href'),
	        type: 'DELETE',

	    }).done(function(data){
	    	console.log("done");
	    	console.log(data);
	    	window.location.reload();
	    })
		}  else {
			console.log('Dont delete the User')
		}
		console.log(" return false")
    return false;

	});

};