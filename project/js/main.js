
 function getWeather(searchQuery) {
 	var url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=imperial&APPID="+apiKey;

 	$(".city").text("");
 	$(".maxTemp").text("");
 	$(".minTemp").text("");

 	$.ajax(url,{success: function(data){
 		console.log(data);
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
 			$(".lastMonthPrices").text(jsonData);
 		}
 		//$(".lastMonthPrices").text(data);
 	}, error: function(error){
 		$(".error-message").text("An error occured");
 	}})
 }
 
 
 function getAdvice() {
 	var url = " https://api.adviceslip.com/advice";


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

function addMessage(postTitle, postBody) {
	var postData = {
		title: postTitle,
		body: postBody
	}

	var database = firebase.database().ref("posts");

	var newPostRef = database.push();
	newPostRef.set(postData, function(error) {
		if (error) {

		} else {
			window.location.reload();
		}
	});
}

function handleMessageFormSubmit(){
	var postTitle = $("#post-title").val();
	var postBody = $("#post-body").val();
	addMessage(postTitle, postBody);
}
 
function getposts() {
	return firebase.database().ref("posts").once('value').then(function(snapshot) {
		var posts = snapshot.val();
		console.log(posts);

		for (var postKey in posts) {
			var post = posts[postKey];
			$("#post-listing").append("<div>"+post.title+" - "+post.body+"</div>");
		}
		});
}
