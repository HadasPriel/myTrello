export const cloudinaryService = {
  uploadImg
}
async function uploadImg(file) {
  // const CLOUD_NAME = 
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`

  const formData = new FormData();
  formData.append('file', file)
  formData.append('upload_preset', 'mkdsw2hg');
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    return data

  } catch (err) {
    console.log(err);
  }
}
