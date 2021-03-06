// JavaScript Document

var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    var encodingType; // sets the format of returned value 

    // Wait for PhoneGap to connect with the device
    //
    function onLoad() {document.addEventListener("deviceready",onDeviceReady,false);
    }

    // PhoneGap is ready to be used!
    //
    function onDeviceReady() {
        console.log("onDeviceReady");
        pictureSource=navigator.camera.PictureSourceType;
        console.log("onDeviceReady1");

        destinationType=navigator.camera.DestinationType;
        console.log("onDeviceReady2");
        encodingType=navigator.camera.EncodingType;

    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      console.log(imageData);
      var re = /\?(\d*)$/;
      imageData=imageData.replace(re, "");
      alert("imageData is "+imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      console.log(imageURI);
      // alert("uri is "+imageURI);
      var re = /\?(\d*)$/;
      imageURI=imageURI.replace(re, "");
      alert("imageURI is "+imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI; 
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100, targetWidth: -1, targetHeight: -1, encodingType:encodingType.PNG });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
     navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality:40, destinationType:Camera.DestinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) { 
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100, targetWidth: -1, targetHeight: -1 , 
        destinationType: destinationType.FILE_URI,encodingType:PNG,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }
