export default function useUpload() {
  function uploadImages(files) {
    return new Promise((resolve) => {
      let uploads = [];
      files.forEach((file) => {
        const data = new FormData();
        data.append("file", file.fileData);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dreamercodes");
        fetch("  https://api.cloudinary.com/v1_1/dreamercodes/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            uploads.push({ field: file.field, url: data.url });
            if (uploads.length === files.length) {
              resolve(uploads);
            }
          })
          .catch((err) => {
            uploads.push(null);
            if (uploads.length === files.length) {
              resolve(uploads);
            }
          });
      });
    });
  }

  return uploadImages;
}
