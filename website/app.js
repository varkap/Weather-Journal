/* Global Variables */
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = 'c8a7f3f6dfd07df9398c6b8370755fd2&units=imperial';

// Create a new date instance dynamically with JS
let newDate = new Date().toString();

document.getElementById('generate').addEventListener('click', action);
function action(err) {
	const zip = document.getElementById('zip').value;
	const content = document.getElementById('feelings').value;
	getTemp(url, zip, key)
	.then(function (data) {
		postData('http://localhost:8080/addInfo', {temp: data.main.temp, date: newDate, content: content})
		.then(function() {UIUpdate()})
	})
}

const getTemp = async (url, zip, key) => {
	const fullURL = url + zip + ',us' + '&APPID=' + key;
	const res = await fetch(fullURL);
	try {
		const data = await res.json();
		return data;
	} catch (e) {
		console.log('ERROR!!');
	}
}

// POST
const postData = async (url = '', data = {}) => {
	const postRequest = await fetch (url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	try {
		const d = await postRequest.json();
	} catch (err) {
		console.log('ERROR!!');
	}
}

// Update UI
const UIUpdate = async () => {
	const req = await fetch('http://localhost:8080/all');
	try {
		const stuff = await req.json();
		document.getElementById('date').innerHTML = stuff.date;
		document.getElementById('temp').innerHTML = stuff.temp;
		document.getElementById('content').innerHTML = stuff.content;
	} catch (err) {
		document.getElementById('date').innerHTML = "ERROR";
		document.getElementById('temp').innerHTML = "ERROR";
		document.getElementById('content').innerHTML = "ERROR";
	}
}



















