import './general';
//import { read } from 'fs';
class Memes 
{

  constructor() 
  {
    //$ sign in variable name refers to variable with dom element
    console.log("Memes JS File");
    this.$topTextInput =  document.getElementById('topText'); //id topText
    this.$bottomTextInput = document.getElementById('bottomText');    //id bottomText
    this.$imageInput = document.getElementById('image');   //topick file id image
    this.$downloadButton = document.getElementById('downloadMeme'); //id downloadMeme
    this.$canvas = document.getElementById('imgCanvas');
      // these are not in the book
    this.$defaultImage = document.querySelector('#defaultImage'); 
    this.image = this.$defaultImage;
    this.$context = this.$canvas.getContext('2d');//where we are drawing on the canvas
    this.deviceWidth = window.innerWidth;

    this.createCanvas();//dont need to bind becasue its being called in the constructor
    //this.createMeme=createMeme.bind(this);
    this.createMeme();
    this.downloadMeme();
    this.downloadMeme=this.downloadMeme.bind(this);
    this.loadImage=this.loadImage.bind(this);
    this.resize=this.resize.bind(this);
    this.addEventListeners();
    
  }
  createCanvas()
  {
    this.$canvas.width=Math.min(640,this.deviceWidth-30);
    this.$canvas.height=Math.min(480,this.deviceWidth-30);
    
  }
  //renders the canvas
  createMeme()
  {
    
    //we work with context variable not canvas variable
    //clear image
    this.$context.clearRect(0,0,this.$canvas.width,this.$canvas.height);
    //draw image
    this.resize(this.$canvas.height,this.$canvas.width);
    //this.$context.drawImage(this.image,0,0);

    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    this.$context.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,this.$canvas.width,this.$canvas.height);
    
    //setup the text for drawing
    
    let fontSize=((this.$canvas.width+this.$canvas.height)/2)*4/100;
    this.$context.font=`${fontSize}pt sans-serif`;
    this.$context.textAlign='center';
    this.$context.textBaseline='top';
    this.$context.lineWidth=fontSize/5;
    this.$context.strokeStyle='black';
    this.$context.fillStyle='white';

    //draw the text
    const topText=this.$topTextInput.value.toUpperCase();
    const botText=this.$bottomTextInput.value.toUpperCase();
    this.$context.strokeText(topText,this.$canvas.width/2,this.$canvas.height*(5/100));
    this.$context.fillText(topText,this.$canvas.width/2,this.$canvas.height*(5/100));
    
    this.$context.strokeText(botText,this.$canvas.width/2,this.$canvas.height*(90/100));
    this.$context.fillText(botText,this.$canvas.width/2,this.$canvas.height*(90/100));
    
    /*
    - Write the method createMeme.  It should
    - clear the previous image from the page
    - draw the image
      - initialize the height and width of the canvas to the height and width of the (default) image
      - draw the image on the context
    - setup text drawing
      - initialize a local constant for the font size.  Here's the calculation   
        this.$canvas.width+this.$canvas.height)/2)*4/100;
      - set the font of the context to `${fontSize}pt sans-serif`
        Notice the template literal instead of concatenation!
      - set the textAlign property to center
      - set the textBaseline property to top
      - set the lineWidth property to 1/5 of the fontSize
      - set the strokeStyle (outline) property to black
      - set the fillStyle to white
    - draw the text
      - get the default top and bottom text from the ui and put both in a variable
      - make sure both of them are all caps
      - write them on the context 
      - don't forget to outline the text in black!
    - add a call to this method in the constructor
    */


  }
  addEventListeners()
  {
    /*
     PART 2 - Change the code as the user types
     Write the method addEventListeners
    - bind this to the class for the method createMeme
    - add the keyup event and the change event to the top and bottom text input elements
      -You can do this in the usual way OR you could create an array that contains the elements
      and then use the arrayName.forEach method and an arrow function
      Add a call to this method in the constructor
    */
    //these break my clearRect for some reason but may be useful in the future
    //let inputNodes=[this.$topTextInput,this.$bottomTextInput]; use array of elements to bind event listeners
    //inputNodes.forEach(element=>element.addEventListener('keyup',this.createMeme));
    //inputNodes.forEach(element=>element.addEventListener('change',this.createMeme));
    this.$topTextInput.addEventListener('keyup',this.createMeme.bind(this));
    this.$bottomTextInput.addEventListener('keyup',this.createMeme.bind(this));
    this.$topTextInput.addEventListener('change',this.createMeme.bind(this));
    this.$bottomTextInput.addEventListener('change',this.createMeme.bind(this));
    //this.$downloadButton.addEventListener('click',this.$downloadButton.setAttributeNode(att));
    this.$imageInput.addEventListener('change',this.loadImage.bind(this));   
    this.$downloadButton.addEventListener('click',this.downloadMeme.bind(this));
  }
  downloadMeme()
  {
    /*
     - Write the method downloadMeme
    - declare a constant imageSource and set it to the canvas converted to data
    - set the href attribute of the download button to the imageSource
    - Change the addEventListers method to include downloading
    - bind the class to the downloadMeme method
    - add an event handler to the click event for the download button
    */
   console.log('downloadMeme');

    /*/validates before donwload. return stops execution of the method
    if(!this.$imageInput.files[0])
    {
      this.$imageInput.parentElement.classList.add('has-error');
      return;
    }
    if(this.$bottomTextInput.value==='')
    {
      this.$imageInput.parentElement.classList.remove('has-error');
      this.$bottomTextInput.parentElement.classList.add('has-error');
      return;
    }
    */
    //this.$imageInput.parentElement.classList.remove('has-error');
    //this.$bottomTextInput.parentElement.classList.remove('has-error');
    console.log('after if statement download meme');
   //the canvas is change into a url put into variable, then put that into att, which
   //does some magic and tricks the browser into downloading instead of viewing the file.
   const imageSource=this.$canvas.toDataURL('image/png');
   this.$downloadButton.setAttribute('href',imageSource);
   //let att=document.createAttribute('href');
   //att.value=imageSource.replace(/^data:image\/{^;}/,'data:application/octec-stream');
   //this.$downloadButton.setAttribute(att);
   //this.$downloadButton.addEventListener('click',this.$downloadButton.setAttributeNode(att));

   
  }
  loadImage()
  {
   
    /*
    - PART 4 - Choose an image
      - Write the method loadImage
      - if there's something in the file input on the page
      - declare and instantiate a FileReader object
      - set it's onload hander to an anonymous function that
      - set the image instance variable to a new image
      - set it's onload handler to an anonymou function that
      - calls the createMeme method
      - set the src property of the image to the result from reading the file
      - read the file
  - Change the addEventListeners
    - bind the class to the loadImage method
    - add an event handler to the change event for the file input element on the page
    */
      if(this.$imageInput.files && this.$imageInput.files[0])
      {
        let reader=new FileReader();
        reader.onload=()=>
        {
          //call back function when reader is done do this.
          this.image=new Image();
          this.image.onload=()=>
          {
              //this.$canvas.height=image.height;
              //this.$canvas.width=image.width;
              this.createMeme();
          };
          this.image.src=reader.result;
        };
        reader.readAsDataURL(this.$imageInput.files[0]);

      }
  }

  resize(canvasHeight,canvasWidth)
  {
    let height=canvasHeight;
    let width=canvasWidth;
    while(height>Math.min(1000,this.deviceWidth-30)&&width>Math.min(1000,this.deviceWidth-30))
    {
      height/=2;
      width/=2;
    }
      
      this.$canvas.style.height = `${height}px`;
      this.$canvas.style.width = `${width}px`;
    
    /*
      - Part 5 - Resize the image if the user picks a really big image
     - Write the method resizeImage
        resizeCanvas(canvasHeight, canvasWidth) {
        let height = canvasHeight;
        let width = canvasWidth;
        while(height > Math.min(1000, this.deviceWidth-30) && width > Math.min(1000, this.deviceWidth-30)) {
          height /= 2;
          width /= 2;
      
      this.$canvas.style.height = `${height}px`;
      this.$canvas.style.width = `${width}px`;
    
  - Change the method addEventListener
    - bind the class to the resizeImage method
    - call resizeCanvas in createMeme just before you draw the image
    */
  }




}
//new Memes();
let myMemes;
window.onload=()=>{myMemes=new Memes();};

/*  
Create a class called Memes
- Part 1 - Setup the canvas and draw the default meme
  - Initialize instance variables for all of the ui elements in the constructor
  



END OF PART 5 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK A REALLY LARGE IMAGE
*/
