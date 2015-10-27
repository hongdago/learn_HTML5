//12.5.js 添加web Worker

//Catch message sent to the web worker
onmessage =function(event){
	//check for empty data and seng back an error
	if(event.data === ''){
		//post message to client with error info
		postMessage({msgType:'ERR',msg:'Invalid data entry'});
	}else{
		//post message to client confirming receipt
		newMessage='Work received "'+event.data+'"';
		postMessage({msgType:'MSG',msg:newMessage});
	}
	
}