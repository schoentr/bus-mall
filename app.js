'use strict';
var globalClickCounter=0;
var picturesUsed=[1,2,3,4,5,6];

// access the img element from the DOM
Item.imgLeftElement = document.getElementById('img-left');
Item.imgCenterElement = document.getElementById('img-center');
Item.imgRightElement= document.getElementById('img-right');
Item.resultsChart = document.getElementById('results-chart');
Item.resultList=document.getElementById('results-list');

// store our items in an array

Item.allAltText=[];
Item.allItems = [];
Item.totalVotes =[];
Item.parsedItems = JSON.parse( localStorage.getItem('userResults') );

// constructor function to make item instances
function Item(filepath, description) {
  this.filepath = filepath;
  this.altText = description;
  this.numberClicked =0;
  this.numberDisplayed =0;
 
}

Item.allItems = Item.parsedItems || [
  new Item('img/bag.jpg', 'bag'),
  new Item('img/banana.jpg', 'banana'),
  new Item('img/bathroom.jpg', 'bathroom stand'),
  new Item('img/boots.jpg', 'boots'),
  new Item('img/breakfast.jpg', 'breakfast'),
  new Item('img/bubblegum.jpg', 'bubblegum'),
  new Item('img/chair.jpg', 'breakfast'),
  new Item('img/cthulhu.jpg', 'cthulhu'),
  new Item('img/dog-duck.jpg', 'dog-duck'),
  new Item('img/dragon.jpg', 'dragon'),
  new Item('img/pen.jpg', 'pen'),
  new Item('img/pet-sweep.jpg', 'pet-sweep'),
  new Item('img/scissors.jpg', 'scissors'),
  new Item('img/shark.jpg', 'shark'),
  new Item('img/sweep.png', 'sweep'),
  new Item('img/tauntaun.jpg', 'tauntaun'),
  new Item('img/unicorn.jpg', 'unicorn'),
  new Item('img/water-can.jpg', 'watering-can'),
  new Item('img/wine-glass.jpg', 'wine-glass'),
  new Item('img/usb.gif', 'usb'),
];
// Generates a random interger  to be used as and index for
Item.randomNum = function() {
  var random = Math.random() * Item.allItems.length;
  var roundedDown = Math.floor(random);
  return roundedDown;
};

Item.updateVotes =function(){
  for (var i=0; i < Item.allItems.length; i++){
  
    Item.totalVotes[i]= Item.allItems[i].numberClicked;
 }
};
Item.updateNames= function(){
  for(var i=0; i<Item.allItems.length; i++){
    Item.allAltText[i] = Item.allItems[i].altText;

  }

};
Item.updateNames();

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
    var liElement = document.createElement('li');
    liElement.textContent = `${Item.allItems[i].altText}-- Viewed:${Item.allItems[i].numberDisplayed}  Selected: ${Item.allItems[i].numberClicked}`;
    Item.resultList.appendChild(liElement);

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
  Item.resultList.textContent='';
  Item.renderTable();

};

Item.endClicks = function(){
  Item.resultList.textContent='';
  Item.updateVotes();
  Item.displayChart();
  localStorage.setItem('userResults',JSON.stringify(Item.allItems));
};

Item.clickRight = function(event){ //eslint-disable-line
  var rightIndex=picturesUsed[2];
  Item.allItems[rightIndex].numberClicked++;
  globalClickCounter++;
  if(globalClickCounter<25){
    Item.render();
  }else{
    Item.endClicks();
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
    Item.endClicks();
  }
};
Item.clickCenter = function(event){ //eslint-disable-line
  var centerIndex=picturesUsed[1];
  Item.allItems[centerIndex].numberClicked++;
  globalClickCounter++;
  if(globalClickCounter<25){
    Item.render();
  }else{
    Item.endClicks();
  }
};

Item.render();
Item.results;


Item.displayChart = function(){
  if (Item.results) Item.results.destroy();
  console.log(Item.totalVotes);
  console.log(Item.allAltText);
  Item.results = new Chart(Item.resultsChart,{//eslint-disable-line
    type: 'bar',
    data: {
      labels:Item.allAltText,
      datasets:[{
        label:'Number of votes',
        data:Item.totalVotes,
        backgroundColor:['#145d1c','#92f83b','#a54c3b','#ce9339','#0571e1','#d357af','#e6c940','#4df1ec,','#784268','#6dd448','#1b3b0f','#faeb48','#a37747','#aac25d','#f8ddf5','#fea04a','#EBE616', '#02D7B9', '#BE6AD9', '#78D01F', '#2FCE05'],
        borderColor:[],
        borderWidth:0,
      }]
    },
    options:{
      scales:{
        yAxes:[{
          ticks:{
            stepsize: 1,
            beginAtZero: true,
          }
        }],
        xAxes:[{
          ticks:{
            stepsize: 1,
            autoskip: false,
            minRotation: 90,
            maxRotation: 90,
          }
        }]
      }
    }
  });
};
Item.imgRightElement.addEventListener('click', Item.clickRight);
Item.imgLeftElement.addEventListener('click', Item.clickLeft);
Item.imgCenterElement.addEventListener('click', Item.clickCenter);