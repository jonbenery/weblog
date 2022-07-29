
import React, {Component} from 'react'
import fetch from "../../../src/api/fetch"
import styles from '../css/tiktok.module.css'
export default class Tiktok extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      value: '',
      videoData: {}
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
          videoData: res
        })
      }
    })
  }
  handleDownload() {
    const link = document.createElement('a')
    link.setAttribute('href', this.state.videoData.play);
    link.setAttribute('download', this.state.videoData.title);
    const event = new MouseEvent('click');
    link.dispatchEvent(event);
  }
  render() {
    const { value, videoData } = this.state;
    return (
      <div>
        <div>
          <p className={styles.tag}>请输入视频的链接</p>
          <input className={styles.input} value={value} onChange={(evt) => this.handleChangeValue(evt)}></input>
          <button className={styles.button} onClick={(evt) => this.handleTranslate(evt)}>转换</button>
        </div>
        {
          this.state.show ?
          (<div>
            <p className={styles.tag}>视频预览</p>
            <video className={styles.preview} src={videoData.play}></video>
            <button className={styles.button} onClick={(evt) => this.handleDownload(evt)}>下载</button>
            </div>) :
          ''
        }
       
      </div>
    );
  }
}
