var config = {
  apiKey: "AIzaSyDQ2uJ1qsoNmhUEs20x5wDPF0w7WUOXYHg",
  authDomain: "autoqa-materials-zone.firebaseapp.com",
  databaseURL: "https://autoqa-materials-zone.firebaseio.com",
  storageBucket: "autoqa-materials-zone.appspot.com"
};

var fireBase = firebase.initializeApp(config);
window.FirebaseStorage = firebase.storage();
window.FirebaseDb = fireBase.database();
window.FirebaseAuth = fireBase.auth();
window.CloudappHost = "https://autoqa.materials.zone:4433";

if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {

      var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
          len = binStr.length,
          arr = new Uint8Array(len);

      for (var i=0; i<len; i++ ) {
        arr[i] = binStr.charCodeAt(i);
      }

      callback( new Blob( [arr], {type: type || 'image/png'} ) );
    }
  });
}