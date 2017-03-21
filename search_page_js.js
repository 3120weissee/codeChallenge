function search(searchTerm) {
	
	var tableL = document.getElementById("tableLeft");
	tableL.innerHTML = "";
	var tableR = document.getElementById("tableRight");
	tableR.innerHTML = "";
	
	// Set URL for AJAX call
	var url = "https://webhose.io/";
	var params = "search?token=777dbe96-a433-4617-90c4-ad3f02111e5a"
					+"&format=json"
					+"&q="+searchTerm
					+"&language=english";
	
	// Testing data
	//var url = "https://jsonplaceholder.typicode.com";
	//var params = "/posts";
	
	// Setup API call
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		// Only execute when call has returned successfully
		if (this.readyState == 4 && this.status == 200) {
			// Send data to secondary function for processing
			var data = JSON.parse(this.responseText);
			console.log(data);
			setData(data['posts']);
		} 
    };
	
	// Open and send request
	request.open("GET", url+params, true);
	request.send(null);
}

function setData(dataSet) {
	// Sort results alphabetically by title
	dataSet.sort(function(a,b){return a['title'].localeCompare(b['title'])});
	console.log(dataSet);
	// Add results into tables
	var i = 0;
	var tableLeft = document.getElementById("tableLeft");
	var tableRight = document.getElementById("tableRight");	
	for(; i < dataSet.length/2; i++) {
		var description = dataSet[i]['text'];
		if(dataSet[i]['text'].length > 100) {
			description = description.substring(0,100) + "...";
		}
		var titleVar = dataSet[i]['title'];
		if(titleVar == "") {
			titleVar = "No title given";
		}
		var row = tableLeft.insertRow();
		var td = row.insertCell(0);
		var title = document.createElement("p");
		var a = document.createElement("a");
		a.setAttribute("href", dataSet[i]['url']);
		var titleNode = document.createTextNode(titleVar);
		title.setAttribute("class", "title");
		var body = document.createElement("p");
		var bodyNode = document.createTextNode(description);
		body.setAttribute("class", "body");
		a.appendChild(titleNode);
		title.appendChild(a);
		body.appendChild(bodyNode);
		td.appendChild(title);
		td.appendChild(body);
	}
	for(; i < dataSet.length; i++) {
		var description = dataSet[i]['text'];
		if(dataSet[i]['text'].length > 100) {
			description = description.substring(0,100) + "...";
		}
		var titleVar = dataSet[i]['title'];
		if(titleVar == "") {
			titleVar = "No title given";
		}
		var row = tableRight.insertRow();
		var td = row.insertCell(0);
		var title = document.createElement("p");
		var a = document.createElement("a");
		a.setAttribute("href", dataSet[i]['url']);
		var titleNode = document.createTextNode(titleVar);
		title.setAttribute("class", "title");
		var body = document.createElement("p");
		var bodyNode = document.createTextNode(description);
		body.setAttribute("class", "body");
		a.appendChild(titleNode);
		title.appendChild(a);
		body.appendChild(bodyNode);
		td.appendChild(title);
		td.appendChild(body);
	}
}
