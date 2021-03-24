import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'

export class Uploader extends Component {
  state = {
    imgUrl: null,
    height: 300,
    width: 300,
    isUploading: false
  }
  onUploadImg = async ev => {
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await cloudinaryService.uploadImg(ev.target.files[0])
    this.setState({ imgUrl: secure_url, isUploading: false, height, width })
    this.props.addImg(secure_url)
    // this.props.onFinishUpload(secure_url)
  }
  render() {
    const { imgUrl, isUploading, height, width } = this.state
    const uploadStyle = {
      backgroundImage: `url(${imgUrl})`,
      height: height + 'px',
      width: width + 'px',
      objectFit: 'cover'
    }
    return (
      <div className="uploader flex align-center justify-center"
        style={ uploadStyle }>

        <label htmlFor="imageUploader">
          { isUploading ? 'Uploading....' : 'Upload Image' }
        </label>

        <input onChange={ this.onUploadImg } 
          type="file" accept="image/*" id="imageUploader" />
      </div>
    )
  }
}