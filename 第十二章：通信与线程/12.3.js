//12.3.js 在web worker中执行任务
//initialize our variables
var sum=0;
var currentPercentageComplete=0;
var maxLimit=1000000000;

//loop
for(var j=0 ; j<=maxLimit; j++){
	sum+=j;
	
	//datermine percentage complete
	newPercentageComplere=Math.round((j/maxLimit)*100);
	
	//minimize messages sent by only sendiong message
	//when percentage has change
	if(newPercentageComplere > currentPercentageComplete){
		//send message back to main page thread
		postMessage(newPercentageComplere+ '% complete');
		
		//update current percentage complete
		currentPercentageComplete=newPercentageComplere;
	}
}


//finally post resulting sum value to main page thread
postMessage('Sum = '+sum);