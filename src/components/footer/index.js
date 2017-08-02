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
      progressLength: 0,
      volumeLength: 0,
      circleShowStatus: "hidden",
      downFlag: false
    }
  }

  changeStatus() {
    const audio = document.getElementById("audio");
    clearInterval(this.times);
    if(audio.src) {
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
      this.props.isPlay(this.state.isPlay);
    }
  }

  playEnded() {
    clearInterval(this.times);
    this.setState({
      isPlay: false
    })
    this.props.isPlay(this.state.isPlay);
  }

  getTime(time) {
    let minute = Math.floor(time / 60 % 60);
    let second = Math.floor(time % 60);
    if (second === 60) {
      ++minute;
      second = 0;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return minute + ":" + second;
  }

  currentTime() {
    clearInterval(this.times);
    const audio = document.getElementById("audio");
    let audioLength = Math.floor(audio.duration);
    this.setState({
      audioTime: this.getTime(audioLength)
    });

    let progressBarBodyLength = document.getElementById("progressBarBody").offsetWidth;
    let length = 0;
    this.times = setInterval(() => {
      let tempTime = audio.currentTime;
      this.props.getCurrentTime(Math.round(tempTime));
      let time = this.getTime(tempTime);
      length = Math.floor(tempTime / audioLength * 1000) / 1000 * progressBarBodyLength;
      this.setState({
        currentTime: time,
        progressLength: length
      })
    }, 500)
  }

  clickBarBody(type, event) {
    const barBodyLength = event.currentTarget.offsetLeft;
    let barWidth = this.state.progressWidth;
    if (type === "volume")
      barWidth = this.state.volumeWidth;
    let absoluteBarLength = event.clientX - barBodyLength + 3;

    if (absoluteBarLength > barWidth)
      absoluteBarLength = barWidth;
    if (type === "progress") {
      this.changePlayTime(absoluteBarLength);
      this.setState({
        progressLength: absoluteBarLength
      });
    }
    else {
      this.changeVolume(absoluteBarLength);
      this.setState({
        volumeLength: absoluteBarLength
      });
    }
  }

  changePlayTime(newTime) {
    const audio = document.getElementById("audio");
    if(audio.readyState!==0) {
    const duration = audio.duration;
    newTime *= duration;
    const progressWidth = this.state.progressWidth;
      if (newTime / progressWidth < 0)
        audio.currentTime = 0;
      else if (newTime / progressWidth <= duration)
        audio.currentTime = newTime / progressWidth;
      else
        audio.currentTime = duration;
    }
  }

  downProgressButton(event) {
    const progressWidth = this.state.progressWidth;
    const distanceX = event.clientX - this.state.progressLength;
    document.onmousemove = (event) => {
      let tempLength = event.clientX - distanceX;
      this.changePlayTime(tempLength);
      if (tempLength <= progressWidth) {
        if (tempLength >= 0) {
          this.setState({
            progressLength: tempLength
          })
        }
        else {
          this.setState({
            progressLength: 0
          })
        }
      }
      else {
        this.setState({
          progressLength: this.state.progressLength
        })
      }
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
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

  clickVolumeButton(){
    const audio = document.getElementById("audio");
    if (audio.volume!==0){
      audio.volume=0;
      this.setState({
        volumeLength:0
      })
    }
    else{
      audio.volume=1;
      this.setState({
        volumeLength:this.state.volumeWidth
      })
    }
  }

  downVolumeCircle(event) {
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
    fetch('/music/url?id=' + songID, {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      this.setState({
        songURL: data.data[0].url,
      });
      this.changeStatus();
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    const volumeBody = document.getElementsByClassName("volumeBody")[0].offsetWidth;
    const progressBody = document.getElementById("progressBarBody").offsetWidth;
    this.setState({
      progressWidth: progressBody,
      volumeWidth: volumeBody,
      volumeLength: volumeBody
    });
  }


  componentWillReceiveProps(nextProps) {
    let songID = parseInt(nextProps.songID, 10);
    if (songID !== -1) {
      if (parseInt(this.props.songID, 10) !== songID) {
        this.getSongURL(songID);
      }
    }
  }

  render() {
    let playStatus = this.state.isPlay ? pause : play;

    return (
        <div className={this.props.isMinimize?"displayNone":"Footer"}>
          <div className="footerButton">
            <div className="prePlay" style={{display:this.props.currentIndex==='1'?"none":""}}><img src={prePlay} alt="上一首"/></div>
            <div className="startPlay" onClick={this.changeStatus.bind(this)}><img src={playStatus} alt="播放/暂停"/></div>
            <div className="prePlay" onClick={this.props.nextSong}><img src={nextPlay} alt="下一首"/></div>
          </div>
          <div className="progressBar">
            <span>{this.state.currentTime}</span>
            <div id="progressBarBody" className="progressBarBody" onClick={this.clickBarBody.bind(this, "progress")}>
              <div style={{width: this.state.progressLength + 'px'}}>
                <div className="progressBarCircle" onMouseDown={this.downProgressButton.bind(this)}>
                  <img onMouseDown={(e) => {
                    e.preventDefault()
                  }} src={progressBarCircle} alt="拖动进度条"/>
                </div>
              </div>
            </div>
            <span>{this.state.audioTime}</span>
          </div>
          <div className="volume">
            <img className="volumeButton" src={this.state.volumeLength === 0 ? muteButton : volumeButton} alt="音量按钮" onClick={this.clickVolumeButton.bind(this)}/>
            <div className="volumeBody" onClick={this.clickBarBody.bind(this, "volume")}
                 onMouseOver={this.showVolumeCircle.bind(this)}
                 onMouseOut={this.hiddenVolumeCircle.bind(this)}
            >
              <div style={{width: this.state.volumeLength + 'px'}}>
                <div className="volumeCircle" onMouseDown={this.downVolumeCircle.bind(this)}
                     style={{visibility: this.state.circleShowStatus}}
                >
                  <img onMouseDown={(e) => {
                    e.preventDefault()
                  }} draggable="false" src={progressBarCircle} alt="拖动音量条"/>
                </div>
              </div>
            </div>
          </div>
          <audio id="audio" src={this.state.songURL} onCanPlay={this.currentTime.bind(this)}
                 onEnded={this.playEnded.bind(this)}>您的浏览器不支持HTML5 Audio标签
          </audio>
        </div>
    )
  }
}

export default Footer;
