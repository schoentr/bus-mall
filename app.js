'use strict';
// var newPicturesUsed=0;
var picturesUsed=[1,2,3,4,5,6];

// access the img element from the DOM
Item.imgLeftElement = document.getElementById('img-left');
Item.imgCenterElement = document.getElementById('img-center');
Item.imgRightElement= document.getElementById('img-right');

// store our items in an array
Item.allItems = [];

// constructor function to make item instances
function Item(filepath, description) {
  this.filepath = filepath;
  this.altText = description;
  this.numberClicked =0;
  this.numberDisplayed =0;
  Item.allItems.push(this);
}


// Item -instances
new Item('img/bag.jpg', 'a bag');
new Item('img/banana.jpg', 'a banana');
new Item('img/bathroom.jpg', 'a bathroom stand');
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
new Item('img/tauntaun.jpg', 'breakfast');
new Item('img/unicorn.jpg', 'breakfast');
new Item('img/water-can.jpg', 'breakfast');
new Item('img/wine-glass.jpg', 'breakfast');


Item.randomNum = function() {
  var random = Math.random() * Item.allItems.length;
  var roundedDown = Math.floor(random);
  return roundedDown;
};

Item.dispayArray = function() {
  var newPicturesUsed=0;
  while(newPicturesUsed < 3){
   var random1 = Item.randomNum();
    if (picturesUsed.includes(random1)===false){
      picturesUsed.unshift(random1);
      picturesUsed.pop();
      newPicturesUsed++
    }
  }
 return picturesUsed;
} 




Item.render = function(){
  var newPicturesUsed=0;
  while(newPicturesUsed < 3){
   var random1 = Item.randomNum();
    if (picturesUsed.includes(random1)===false){
      picturesUsed.unshift(random1);
      picturesUsed.pop();
      newPicturesUsed++
    }
  }
  var rightIndex=picturesUsed[2];
  var  centerIndex=picturesUsed[1]
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
}

Item.render();

Item.clickRight = function(event){
  var rightIndex=picturesUsed[2];
  Item.allItems[rightIndex].numberClicked++;
  // alert(Item.allItems[rightIndex].numberClicked++);
  Item.render();
}
Item.clickLeft = function(event){
  var leftIndex=picturesUsed[0];
  Item.allItems[leftIndex].numberClicked++;
  // alert(Item.allItems[leftIndex].numberClicked++);
  Item.render();
}
Item.clickCenter = function(event){
  var centerIndex=picturesUsed[1];
  Item.allItems[centerIndex].numberClicked++;
  // alert(Item.allItems[centerIndex].numberClicked++);
  Item.render();
}


Item.imgRightElement.addEventListener('click', Item.clickRight);
Item.imgLeftElement.addEventListener('click', Item.clickLeft);
Item.imgCenterElement.addEventListener('click', Item.clickCenter);
