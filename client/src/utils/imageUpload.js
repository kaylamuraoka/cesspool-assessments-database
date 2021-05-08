export const checkImage = (file) => {
  let err = "";

  if (!file) return (err = "No files were uploaded.");

  if (file.size > 1024 * 1024)
    err =
      "The file that you are trying to upload exceeds the 1 MB size limit. Please select a file less than 1 MB.";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Invalid File format. You may only upload JPG, JPEG, PNG files.";

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "xjom3hly");
    formData.append("cloud_name", "fukunagaengineers");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/fukunagaengineers/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};

export const postImageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "xc48xr6i");
    formData.append("cloud_name", "fukunagaengineers");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/fukunagaengineers/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};
