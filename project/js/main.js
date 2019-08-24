$(document).ready(function(){
	getPosts();
})


 function getWeather(searchQuery) {
 	var url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=imperial&APPID="+apiKey;

 	$(".city").text("");
 	$(".maxTemp").text("");
 	$(".minTemp").text("");

 	$.ajax(url,{success: function(data){
 		$(".city").text(data.name);
 		$(".maxTemp").text(data.main.temp_max);
 		$(".minTemp").text(data.main.temp_min);
 	}, error: function(error){
 		$(".error-message").text("An error occured");
 	}})
 }

 function searchWeather() {
 	var searchQuery = $(".search").val();
 	getWeather(searchQuery);
 }

 function handleSignIn() {
 	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Google Access Token. You can use it to access the Google API.
	var token = result.credential.accessToken;
	// The signed-in user info.
	var user = result.user;
	console.log(user.email);
	}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// The email of the user's account used.
	var email = error.email;
	// The firebase.auth.AuthCredential type that was used.
	var credential = error.credential;
	// ...
	});
 }



function getBTC() {
 	var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

 	$(".btcPrice").text("");

 	$.ajax(url,{success: function(data){

 		var jsonData = JSON.parse(data);   
		console.log(jsonData.time.updated);
 		$(".generationTime").text(jsonData.time.updated);


 		console.log(jsonData);
 		$(".btcPrice").text(jsonData.bpi.USD.rate);

 	}, error: function(error){
 		$(".error-message").text("An error occured");
 	}})
}

function get31Days() {
 	var url = "https://api.coindesk.com/v1/bpi/historical/close.json";

 	$.ajax(url,{success: function(data){
 		console.log(data);

 		var jsonData = JSON.parse(data); 
 		for (var i = 0; i < jsonData.bpi.length; i++) {
 			var dayPrice = jsonData.bpi[i];
 			console.log(dayPrice);
 			$(".lastMonthPrices").text(dayPrice);
 		}
 	}, error: function(error){
 		$(".error-message").text("An error occured");
 	}})
 }
 
 
 function getAdvice() {
 	var url = " https://api.adviceslip.com/advice";

 	var color = Math.floor(Math.random()*16777215).toString(16);

	var elements = document.getElementsByClassName('square-button');
	for(var i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = color;
	}

	var elements = document.getElementsByClassName('advice');
	for(var i = 0; i < elements.length; i++){
		elements[i].style.outlineColor = color;
	}

	var elements = document.getElementsByClassName('square-button');
	for(var i = 0; i < elements.length; i++){
		elements[i].style.outlineColor = color;
	}

 	$.ajax(url,{success: function(data){
 		console.log(data);
 		var jsonData = JSON.parse(data);   
		console.log(jsonData.slip.advice)
 		$(".advice").text(jsonData.slip.advice);
 	}, error: function(error){
 		$(".error-message").text("An error occured");
 	}})

}

function handleSignIn() {
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
		console.log(user.email);
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credental;
	});
}

function addMessage(postName, postWorkout, postDistance) {
	var postData = {
		name: postName,
		workout: postWorkout,
		distance: postDistance
	}

	var database = firebase.database().ref("posts");

	var newPostRef = database.push();
	newPostRef.set(postData, function(error) {
		if (error) {
			$(".error-message").text("An error occured");
		} else {
			//'Data saved successfully';
			window.location.reload();
		}
	});
}

function handleMessageFormSubmit(){
	var postName = $("#post-name").val();
	var postWorkout = $("#post-workout").val();
	var postDistance = $("#post-distance").val();
	addMessage(postName, postWorkout, postDistance);
	window.alert("Added a " + postWorkout + " workout for " + postName);
}
 
function getPosts() {
	return firebase.database().ref("posts").once('value').then(function(snapshot) {
		var posts = snapshot.val();
		console.log(posts);

		for (var postKey in posts) {
			var post = posts[postKey];
			$("#post-listing").append("<div>"+post.name+": "+post.workout+" for " + post.distance+"</div>");
		}
	});
}

function getEarthPic() {
	var url = "https://api.nasa.gov/planetary/apod?api_key="+nasaAPIKey;

 	$.ajax(url,{success: function(data){
	   	var img = $('<img />', {class: "image-responsive", src : data.hdurl, alt : "NASA EPOD"});
	    img.insertBefore('h2');

 		$(".earthVidTitle").text(data.title);
 		$(".earthExp").text(data.explanation);
 		$("#button").remove();


 	}, error: function(error){
 		$(".error-message").text("An error occured. Please log in to proceed.");
 	}})

}


