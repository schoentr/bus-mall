'use strict';
var newPicturesUsed=0;
var picturesUsed=[1,2,3,4,5,6];
// access the img element from the DOM
Item.imgElement = document.getElementById('item-pic-one');
// Item.imgElement = document.getElementById('item-pic-two');
// Item.imgElement = document.getElementById('item-pic-three');

// store our goats in an array
Item.allItems = [];

// constructor function to make item instances
function Item(filepath, description) {
  this.url = filepath;
  this.altText = description;
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
  // randomly generate a number
  var random = Math.random() * Item.allItems.length;
  var roundedDown = Math.floor(random);

  return roundedDown;
};

Item.renderItem = function() {

console.log(picturesUsed);

  var random1 = Item.randomNum();
  var isPictureUsed = false;
  
  // console.log(random1);
  // console.log(picturesUsed.length);
  do{
    random1 = Item.randomNum();
    console.log(random1+':Random Number')
    for (var i = 0; i < picturesUsed.length; i++){
      if (picturesUsed[i]===random1){
        isPictureUsed=true;
         console.log('!!!!!' +isPictureUsed);
    
      }
    }
    if (isPictureUsed === false){
      console.log('!!!!!!!'+ isPictureUsed);
      console.log(picturesUsed);
      picturesUsed.unshift(random1)
      picturesUsed.pop();
      newPicturesUsed++;
      console.log('*****'+newPicturesUsed);

    }
  //   console.log(picturesUsed);
  //  console.log(newPictureUsed);
  }while(newPicturesUsed < 2);


  var randomItem = Item.allItems[random1];
  // console.log(random1);

  Item.imgElement.alt = randomItem.altText;
  Item.imgElement.src = randomItem.url;
};

// render a random goat on page load
Item.renderItem();
// Item2.renderItem();
// Item3.renderItem();
// listen to the img element
Item1.imgElement.addEventListener('click', Item.renderItem);













// 'use strict'
// var picturesUsed=[34,25,25,24,6,55,7,3,3];


// var randomNum = function() {
//   // randomly generate a number
//   var random = Math.random() * picures.length;
//   var roundedDown = Math.floor(random);
//   return roundedDown;
// };


// render = function() {
// 
