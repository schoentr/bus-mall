'use strict';
var globalClickCounter=0;
var picturesUsed=[1,2,3,4,5,6];

// access the img element from the DOM
Item.imgLeftElement = document.getElementById('img-left');
Item.imgCenterElement = document.getElementById('img-center');
Item.imgRightElement= document.getElementById('img-right');
Item.resultsChart = document.getElementById('results-chart');
Item.voteTable=document.getElementById('tally-box');

// store our items in an array
Item.allAltText=[];
Item.allItems = [];
Item.totalVotes =[];

// constructor function to make item instances
function Item(filepath, description) {
  this.filepath = filepath;
  this.altText = description;
  this.numberClicked =0;
  this.numberDisplayed =0;
  Item.allItems.push(this);
  Item.allAltText.push(this.altText);
}
// *******************************         Item -instances
new Item('img/bag.jpg', 'bag');
new Item('img/banana.jpg', 'banana');
new Item('img/bathroom.jpg', 'bathroom stand');
new Item('img/boots.jpg', 'boots');
new Item('img/breakfast.jpg', 'breakfast');
new Item('img/bubblegum.jpg', 'bubblegum');
new Item('img/chair.jpg', 'breakfast');
new Item('img/cthulhu.jpg', 'cthulhu');
new Item('img/dog-duck.jpg', 'dog-duck');
new Item('img/dragon.jpg', 'dragon');
new Item('img/pen.jpg', 'pen');
new Item('img/pet-sweep.jpg', 'pet-sweep');
new Item('img/scissors.jpg', 'scissors');
new Item('img/shark.jpg', 'shark');
new Item('img/sweep.png', 'sweep');
new Item('img/tauntaun.jpg', 'tauntaun');
new Item('img/unicorn.jpg', 'unicorn');
new Item('img/water-can.jpg', 'watering-can');
new Item('img/wine-glass.jpg', 'wine-glass');
new Item('img/usb.gif', 'usb');

// Generates a random interger  to be used as and index for
Item.randomNum = function() {
  var random = Math.random() * Item.allItems.length;
  var roundedDown = Math.floor(random);
  return roundedDown;
};

Item.updateVotes =function(){
  for (var i=0; i < Item.allItems.length; i++){
    Item.totalVotes[i]= Item.allItems[i].numberClicked;
    console.log(i);
  }

};
Item.dispayArray = function() {
  var newPicturesUsed=0;
  var random1 = Item.randomNum();
  while(newPicturesUsed < 3){
    random1 = Item.randomNum();
    if (picturesUsed.includes(random1)===false){
      picturesUsed.unshift(random1);
      if(picturesUsed.length > 6 ){
        picturesUsed.pop();
      }
      newPicturesUsed++;
    }
  }
};

//Creating  Table Displayed while clicking
Item.renderTable= function(){
  for(var i = 0; i < Item.allItems.length; i++){
    var trElement = document.createElement('tr');
    var tdElement =document.createElement('td');
    tdElement.textContent = Item.allItems[i].altText;
    trElement.appendChild(tdElement);
    tdElement = document.createElement('td');
    tdElement.textContent = ( ' was viewed '+Item.allItems[i].numberDisplayed+' times,');
    trElement.appendChild(tdElement);

    tdElement = document.createElement('td');
    tdElement.textContent= 'and selected '+ Item.allItems[i].numberClicked + '.';
    trElement.appendChild(tdElement);

    Item.voteTable.appendChild(trElement);

  }
};



Item.render = function(){


  Item.dispayArray();

  var rightIndex=picturesUsed[2];
  var centerIndex=picturesUsed[1];
  var leftIndex=picturesUsed[0];

  var pictureLeft =Item.allItems[leftIndex];
  var pictureRight=Item.allItems[rightIndex];
  var pictureCenter=Item.allItems[centerIndex];

  pictureLeft.numberDisplayed++;
  pictureRight.numberDisplayed++;
  pictureCenter.numberDisplayed++;

  Item.imgLeftElement.src=pictureLeft.filepath;
  Item.imgLeftElement.alt=pictureLeft.altText;

  Item.imgCenterElement.src=pictureCenter.filepath;
  Item.imgCenterElement.alt=pictureCenter.altText;

  Item.imgRightElement.src=pictureRight.filepath;
  Item.imgRightElement.alt=pictureRight.altText;
  // alert('about render Chart');
  Item.voteTable.textContent='';
  Item.renderTable();

};



Item.clickRight = function(event){ //eslint-disable-line
  var rightIndex=picturesUsed[2];
  Item.allItems[rightIndex].numberClicked++;
  globalClickCounter++;
  if(globalClickCounter<25){
    Item.render();
  }else{
    Item.voteTable.textContent='';
    Item.updateVotes();
    Item.displayChart();
  }
};
Item.clickLeft = function(event){ //eslint-disable-line
  var leftIndex=picturesUsed[0];
  Item.allItems[leftIndex].numberClicked++;
  globalClickCounter++;
  console.log(globalClickCounter);
  if(globalClickCounter<25){
    Item.render();
  }else{
    Item.voteTable.textContent='';
    Item.updateVotes();
    Item.displayChart();
  }
};
Item.clickCenter = function(event){ //eslint-disable-line
  var centerIndex=picturesUsed[1];
  Item.allItems[centerIndex].numberClicked++;
  globalClickCounter++;
  if(globalClickCounter<25){
    Item.render();
  }else{
    
    Item.voteTable.textContent='';
    Item.updateVotes();
    Item.displayChart();
  }
};
Item.render();

Item.imgRightElement.addEventListener('click', Item.clickRight);
Item.imgLeftElement.addEventListener('click', Item.clickLeft);
Item.imgCenterElement.addEventListener('click', Item.clickCenter);

Item.displayChart = function(){
  new Chart(Item.resultsChart,{//eslint-disable-line
    type: 'bar',
    data: {
      labels:Item.allAltText,
      datasets:[{
        label:'Number of votes',
        data:Item.totalVotes,
        backgroundColor:['#145d1c','#92f83b','#a54c3b','#ce9339','#0571e1','#d357af','#e6c940','#4df1ec,','#784268','#6dd448','#1b3b0f','#faeb48','#a37747','#aac25d','#f8ddf5','#fea04a','#EBE616', '#02D7B9', '#BE6AD9', '#78D01F', '#2FCE05'],
        borderColor:[],
        borderWidth:0
      }]
    },
    options:{
      scales:{
        yAxes:[{
          ticks:{
            stepsize:1,
            beginAtZero:true
          }
        }]
      }
    }
  });
};
