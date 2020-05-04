// import "froala-editor/js/plugins/align.js";

var editor = new FroalaEditor("#text-editor", {
  heightMin: 500,
  //
  imageManagerLoadURL: "/admin/load_images",

  //
  imageUploadURL: "/admin/upload_image",
  imgaeUploadParam: "file",
  imageAllowedTypes: ["jpeg", "jpg", "png"],
  imageMaxSize: 5 * 1024 * 1024,
  imageUploadMethod: "POST",
  imageUploadParams: { name: "img" },
  //   //   imageManagerLoadURL: "/public/uploads"

  events: {
    "image.inserted": function($img, response) {
      console.log($img);
      // Image was inserted in the editor.
      //   var img = $img;
      //   console.log(img);
    },
    "image.replaced": function($img, response) {
      // Image was replaced in the editor.
    },
    "image.removed": function($img) {
      axios
        .post("/admin/delete_image", {
          src: $img.attr("src")
        })
        .then(data => {
          console.log("Image was deleted");
        })
        .catch(err => {
          console.log("Image delete problem: " + JSON.stringify(err));
        });
    }
  }

  //

  //   events: {

  //   }
});
