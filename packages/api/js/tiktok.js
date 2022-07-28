
import React, {Component} from 'react'
import fetch from "../../../src/api/fetch"
export default class Tiktok extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      value: '',
      videoSrc: ''
    }
  }
  handleChangeValue(evt) {
    this.setState({
      value: evt.target.value
    })
  }
  handleTranslate() {
    fetch({
      method: 'get',
      url: `https://api.oick.cn/douyin/api.php?url=${this.state.value}`
    }).then(res => {
      if (res.play) {
        this.setState({
          show: true,
          videoSrc: res.play
        })
      }
    })
    
  }
  render() {
    const { value, videoSrc } = this.state;
    return (
      <div>
        <div className='userInput'>
          <p>请输入视频的链接</p>
          <input value={value} onChange={(evt) => this.handleChangeValue(evt)}></input>
          <button onClick={(evt) => this.handleTranslate(evt)}>转换</button>
        </div>
        {
          this.state.show ?
          (<div>
            <p>视频预览</p>
            <video src={videoSrc}></video>
            </div>) :
          ''
        }
       
      </div>
    );
  }
}
