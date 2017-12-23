$(document).ready(function(){

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAIAqe_ZeprCz9w1_B7b2kSc2CN1HUHYe4",
	authDomain: "train-scheduler-d39aa.firebaseapp.com",
	databaseURL: "https://train-scheduler-d39aa.firebaseio.com",
	projectId: "train-scheduler-d39aa",
	storageBucket: "train-scheduler-d39aa.appspot.com",
	messagingSenderId: "264666298989"
	};

firebase.initializeApp(config);

var database = firebase.database();

// Add Train Button
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grab User Inputs
  var trainName = $("#train-name-input").val();
  var destination = $("#destination-input").val();
  var firstTrainTime = $("#first-train-time-input").val();
  var frequency = $("#frequency-input").val();

  // Test to console
  console.log (trainName)
  console.log (destination)
  console.log (firstTrainTime)
  console.log (frequency)

  // Temp object to hold train data
  var newTrain = {
  	name: trainName,
  	destination: destination,
  	traintime: firstTrainTime,
  	frequency: frequency
  }; 

  // Push train data to database
  database.ref().push(newTrain);

  // Test to console
  console.log (newTrain.name)
  console.log (newTrain.destination)
  console.log (newTrain.traintime)
  console.log (newTrain.frequency)

  // Clears all input text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

  return false;
});

// Firebase event for adding new train to database 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store into variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().traintime;
  var frequency = childSnapshot.val().frequency;

  // Test to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Calculations for Next Arrival and Minutes Away

  var timeDiff = moment().diff(moment.unix(firstTrainTime), "minutes");
  var timeRemainder = moment().diff(moment.unix(firstTrainTime), "minutes") % frequency;
  var minutesAway = frequency - timeRemainder;
  var nextArrival = moment().add(minutesAway, "m").format("hh:mm A"); 

  // Test to console
  console.log(minutesAway);
  console.log(nextArrival);
  console.log(timeRemainder);
  
  // Append and create rows in train table with new train data
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + " mins" + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});

});