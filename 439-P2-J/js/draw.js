// creates a multi dimentional array 
var size1 = 20;
var size2 = 41;
var matrix = createMat(size1, size2);

var elem = document.getElementById("block");

var canvas1 = document.getElementById('canvas1');
var context1 = canvas1.getContext("2d");
  
var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext("2d");
  
createGrid();

var states = [];
var stateCounter = 0;
var refreshVal = 0;
var across = 0;
var down = 0;

function createGrid()
{
	var x = 0;
	var	y = 0;
	
	context2.clearRect(0, 0, 50, 20); 	
	
	for( i = 0; i < 5; i++)
	{
		context2.strokeRect(x,y,10,10);
		context2.strokeRect(x,y+10,10,10);
		x += 10;
	}
}

/* Function was found online */
 /*link: https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript */
function createMat(length)
{
      var array = new Array(length || 0), y = length;
      if (arguments.length > 1)
      {
          var argument = Array.prototype.slice.call(arguments, 1);
          while(y-- != 0)
          {
            array[length-1 - y] = createMat.apply(this, argument);
          }
      }
      return array;
  }


function fillMat()
{
  for(var i = 0; i < size2; i++)
  {
    if(i != 20)
    {
      matrix[0][i] = 0;
    }
    else
    {
      matrix[0][i] = 1;
    }
  }
  for(i = 1; i < size1; i++) 
  {
    for(var j = 0; j < size2; j++) 
    {
      if(j==0)
      {
        
        if(matrix[i-1][j]==1 && matrix[i-1][j+1]==1)//rule 5
          matrix[i][j]=0;
        if(matrix[i-1][j]==1 && matrix[i-1][j+1]==0)//rule 6
          matrix[i][j]=1;
        if(matrix[i-1][j]==0 && matrix[i-1][j+1]==1)//rule 7
          matrix[i][j]=1;
        if(matrix[i-1][j]==0 && matrix[i-1][j+1]==0)//rule 8
          matrix[i][j]=0;
      }
      else if(j==(size2-1))
      {
        
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==1)//rule 2
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==0)//rule 4
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==1)//rule 6
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==0)//rule 8
          matrix[i][j]=0;
      }
      else
      {
        
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==1 && matrix[i-1][j+1]==1)//rule 1
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==1 && matrix[i-1][j+1]==0)//rule 2
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==0 && matrix[i-1][j+1]==1)//rule 3
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==0 && matrix[i-1][j+1]==0)//rule 4
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==1 && matrix[i-1][j+1]==1)//rule 5
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==1 && matrix[i-1][j+1]==0)//rule 6
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==0 && matrix[i-1][j+1]==1)//rule 7
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==0 && matrix[i-1][j+1]==0)//rule 8
          matrix[i][j]=0;
      }
    }
  }
}

fillMat();

function fillIn(passedAcross, passedDown)
{
	context1.fillRect((passedAcross)*10, (passedDown+1)*10, 10, 10);
}

function move()
{

  context1.fillRect(200, 0, 10, 10);
  
  if(across > 0)
  {
  $( ".block" ).animate({ "left": "+=10px" }, "fast");
  }
  console.log("states[" + stateCounter + "] = matrix[" + down + "][" + across +"]");
  states[stateCounter] = matrix[down][across];
 
  if(across == 0)
  {
    states[0] = 0;
    states[1] = matrix[down][across];
    states[2] = matrix[down][across+1];
  }
  if(across == 41)
  {
    states[2] = 0;
  }
  across++;
  stateCounter++;
  if(stateCounter == 3)
  {
    console.log("states = [" + states[0] + states[1] + states[2] + "]");
	
	$( ".block" ).animate({ "left": "-=10px" }, "fast"); 

    if(states[0] == 1 && states[1] == 1 && states[2] == 1) 
    { 
      document.getElementById("state").innerHTML = "1";
      $( ".block" ).animate({ "top": "+=10px" },"fast");
      $( ".block" ).animate({ "top": "-=10px" }, "fast");
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
      across-=2;
	  createGrid();
	  context2.fillRect(10,0,30,10);
	  context2.fillRect(20,10,10,10);
	  st = setTimeout(fillIn(across, down), 500);

    }
    if(states[0] == 1 && states[1] == 1 && states[2] == 0)
    {
      document.getElementById("state").innerHTML = "2";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
	  createGrid();	  
	  context2.fillRect(10,0,20,10);
      across-=2;
    }
    if(states[0] == 1 && states[1] == 0 && states[2] == 1)
    {
      document.getElementById("state").innerHTML = "3";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
 	  createGrid();
	  context2.fillRect(10,0,10,10);
	  context2.fillRect(30,0,10,10);
      across-=2;
    }
    if(states[0] == 1 && states[1] == 0 && states[2] == 0)
    { 
      document.getElementById("state").innerHTML = "4";
      $( ".block" ).animate({ "top": "+=10px" },"fast");
      $( ".block" ).animate({ "top": "-=10px" }, "fast");
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
	  createGrid();
	  context2.fillRect(10,0,10,10);
	  context2.fillRect(20,10,10,10);
      across-=2;
	  st = setTimeout(fillIn(across, down), 500);
    }
    if(states[0] == 0 && states[1] == 1 && states[2] == 1)
    {
      document.getElementById("state").innerHTML = "5";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
	  createGrid();	  
	  context2.fillRect(20,0,20,10);
      across-=2;
    }
    if(states[0] == 0 && states[1] == 1 && states[2] == 0)
    { 
      document.getElementById("state").innerHTML = "6";
      $( ".block" ).animate({ "top": "+=10px" },"fast");
      $( ".block" ).animate({ "top": "-=10px" }, "fast");
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
	  createGrid();	  
	  context2.fillRect(20,0,10,10);
	  context2.fillRect(20,10,10,10);
      across-=2;
	  st = setTimeout(fillIn(across, down), 500);
    }
    if(states[0] == 0 && states[1] == 0 && states[2] == 1)
    { 
      document.getElementById("state").innerHTML = "7";
      $( ".block" ).animate({ "top": "+=10px" },"fast");
      $( ".block" ).animate({ "top": "-=10px" }, "fast");
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
	  createGrid();	  
	  context2.fillRect(30,0,10,10);
	  context2.fillRect(20,10,10,10);
      across-=2;
	  st = setTimeout(fillIn(across, down), 500);
    }
    if(states[0] == 0 && states[1] == 0 && states[2] == 0)
    {
      document.getElementById("state").innerHTML = "8";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");
	  createGrid();
      across-=2;
    }
    stateCounter = 0;
    states = [];
  }
  if(across == 42)
  {
    $( ".block" ).animate({ "top": "+=10px" }, "fast");
    $( ".block" ).animate({ "left": "-=410px" }, "fast");
    down++;
    across=0;
    stateCounter = 0;
    states = [];
  }
  if(down == 20)
  {
    pause();
  }
  
}

function autoRun()
{
refreshVal = setInterval(move, 1010);
}

function pause()
{
  clearInterval(refreshVal);
}

