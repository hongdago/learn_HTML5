//12.8.js 添加共享worker的 。js文件
//initialize the connections array for storing the connection ports
var count =0;
var connections = new Array();

//initialize our average formula variables
var average=0;
var numValues=0;
var sumValues=0;

//onconnect event for SharedWorker
onconnect=function(msg){
	//get the reference for this connection
	var port=msg.ports[0];
	
	//stroe this connection reference for future messages
	connections[count]=port;
	
	//increment the number of connections we hava
	count +=1;
	//respond to the client and initialize their average
	port.postMessage({msgType:'LOG',msgText:'[SW] Now Connected ['+count+'].'});
	port.postMessage({mstType:'AVE',msgText:'[SW] Average updated: '+average+'.',aveValue:average});
	
	//create handler for when we receive a messag from the client
	port.onmessage=function(msg){
		//set the value passed into the SharedWorker
		var newValue=msg.data;
		
		//report that we received the value
		port.postMessage({msgType:'LOG',msgText:'[SW] Received: '+newValue+'.'});
		//update the Average with the new value
		updateAverage(newValue);	
	}
}

//helper function to send a message to all clients
function sendAllConnedtions(msgTypeVal,msgVal){
	alert(count);
	//loop through the clients and postMessage
	for(var i=0 ; i<count; i++){
		//post message to client with our JSON formateed message
		//with message type ,text and current average
		connections[i].postMessage({msgType:msgTypeVal,mstText:msgVal,aveValue:average});
	}
}

//our simple average update function
function updateAverage(newValue){
	//adjust average formula avriables
	numValues++;
	sumValues +=parseFloat(newValue);
	
	//create new average
	average=Math.round((sumValue/numValues)*100)/100;
	sendAllConnedtions('AVE', '[SW] Average updated: '+average+'.');
}
