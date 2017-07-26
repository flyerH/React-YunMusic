/*!
 * Created by He on 2017/7/21.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';
import play from '../../static/images/play2.png';
import pause from '../../static/images/pause.png';
import prePlay from '../../static/images/preplay.png';
import nextPlay from '../../static/images/nextplay.png';
import progressBarCircle from '../../static/images/progressBarCircle.png';
import volumeButton from '../../static/images/volume.png';
import muteButton from '../../static/images/mute.png';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      isPlay: false,
      currentTime: "00:00",
      audioTime: "00:00",
      progressBarLength: 0,
      volumeLength: 0,
      circleShowStatus: "hidden",
      downFlag: false
    }
  }

  changeStatus() {
    const audio = document.getElementById("audio");
    clearInterval(this.times);
    if (audio.paused) {
      this.setState({
        isPlay: true
      });
      audio.play();

    } else {
      this.setState({
        isPlay: false
      });
      audio.pause();
    }
  }

  playEnded() {
    clearInterval(this.times);
    this.setState({
      isPlay: false
    })
  }

  getTime(time) {
    let minute = Math.floor(time / 60 % 60);
    let second = Math.floor(time % 60);
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return minute + ":" + second;
  }

  currentTime() {
    const audio = document.getElementById("audio");
    const audioLength = Math.floor(audio.duration);
    this.setState({
      audioTime: this.getTime(audioLength)
    });
    console.log("duration: " + audio.duration)

    const progressBarBodyLength = document.getElementById("progressBarBody").offsetWidth;
    let length = 0;
    this.times = setInterval(() => {
      let tempTime = audio.currentTime;
      let time = this.getTime(tempTime);
      length = Math.floor(tempTime / audioLength * 1000) / 1000 * progressBarBodyLength;
      this.setState({
        currentTime: time,
        progressBarLength: length
      })
    }, 500)
  }

  clickVolumeBody(event) {
    const volumeBodyLength = event.currentTarget.offsetLeft;
    const volumeWidth = this.state.volumeWidth;
    let absoluteVolumeLength = event.clientX - volumeBodyLength + 3;

    if (absoluteVolumeLength > volumeWidth)
      absoluteVolumeLength = volumeWidth;
    this.changeVolume(absoluteVolumeLength);
    this.setState({
      volumeLength: absoluteVolumeLength
    });
  }

  changeVolume(newVolume) {
    const audio = document.getElementById("audio");
    const volumeWidth = this.state.volumeWidth;

    if (newVolume / volumeWidth < 0)
      audio.volume = 0;
    else if (newVolume / volumeWidth <= 1)
      audio.volume = newVolume / volumeWidth;
    else
      audio.volume = 1;
  }

  downVolumeButton(event) {
    //音量条最长的长度
    const volumeWidth = this.state.volumeWidth;
    //这里是音量条最左侧到屏幕最左侧之间的距离
    const distanceX = event.clientX - this.state.volumeLength;
    document.onmousemove = (event) => {
      //音量条拖动过程中的长度
      let tempLength = event.clientX - distanceX;
      this.changeVolume(tempLength);
      if (tempLength <= volumeWidth) {
        if (tempLength >= 0) {
          this.setState({
            volumeLength: tempLength
          })
        }
        else {
          this.setState({
            volumeLength: 0
          })
        }
      }
      else {
        this.setState({
          volumeLength: this.state.volumeLength
        })
      }
    };
    this.setState({
      downFlag: true
    });
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.setState({
        downFlag: false
      })
      this.hiddenVolumeCircle();
    };
  }

  showVolumeCircle() {
    this.setState({
      circleShowStatus: "visible"
    })
  }

  hiddenVolumeCircle() {
    if (!this.state.downFlag)
      this.setState({
        circleShowStatus: "hidden"
      })
  }

  getSongURL(songID) {
    fetch('http://localhost:4000/music/url?id=' + songID, {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      this.setState({
        songURL: data.data[0].url,
      });
      console.log(data.data[0].url)
      this.changeStatus();
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    const volumeBody = document.getElementsByClassName("volumeBody")[0].offsetWidth;
    this.setState({
      volumeWidth: volumeBody,
      volumeLength: volumeBody
    });
  }

  componentWillReceiveProps() {
    this.getSongURL(this.props.songID);
  }

  render() {
    let playStatus = this.state.isPlay ? pause : play;

    return (
        <div className="Footer">
          <div className="footerButton">
            <div className="prePlay"><img src={prePlay} alt="上一首"/></div>
            <div className="startPlay" onClick={this.changeStatus.bind(this)}><img src={playStatus} alt="播放/暂停"/></div>
            <div className="prePlay"><img src={nextPlay} alt="下一首"/></div>
          </div>
          <div className="progressBar">
            <span className="currentTime">{this.state.currentTime}</span>
            <div id="progressBarBody" className="progressBarBody">
              <div style={{width: this.state.progressBarLength + 'px'}}>
                <div className="progressBarCircle">
                  <img src={progressBarCircle} alt="拖动进度条"/>
                </div>
              </div>
            </div>
            <span>{this.state.audioTime}</span>
          </div>
          <div className="volume">
            <img className="volumeButton" src={this.state.volumeLength === 0 ? muteButton : volumeButton} alt="音量按钮"/>
            <div className="volumeBody" onClick={this.clickVolumeBody.bind(this)}
                 onMouseOver={this.showVolumeCircle.bind(this)}
                 onMouseOut={this.hiddenVolumeCircle.bind(this)}
            >
              <div style={{width: this.state.volumeLength + 'px'}}>
                <div className="volumeCircle" onMouseDown={this.downVolumeButton.bind(this)}
                     style={{visibility: this.state.circleShowStatus}}
                >
                  <img onMouseDown={(e) => {
                    e.preventDefault()
                  }} draggable="false" src={progressBarCircle} alt="拖动音量条"/>
                </div>
              </div>
            </div>
          </div>
          <audio id="audio" controls="controls"
                 src={this.state.songURL} onCanPlay={this.currentTime.bind(this)} onEnded={this.playEnded.bind(this)}>您的浏览器不支持HTML5 Audio标签</audio>
        </div>
    )
  }
}

export default Footer;
