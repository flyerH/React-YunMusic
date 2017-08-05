/*!
 * Created by He on 2017/7/16.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';
import nextplay2 from '../../../../static/images/nextplay2.png';

class PersonalFM extends Component {

  constructor() {
    super();
    this.state = {
      personalFMData: {},
      currentIndex: 0,
      picUrl: '',
      songName: '',
      albumName: '',
      singerName: '',
      noLyric: false,
      lyricBody: [],
      lyricTime: [],
      lyricObj: {},
      tempIndex: -1,
      isLyricLoading: false,
      tempData:
          [
            {
              "id": 276294,
              "album":
                  {
                    "picUrl": "http://p1.music.126.net/OhnKZ86JoWQrVzTokYemuQ==/19078725765198702.jpg",
                    "name": "腔.调",
                  },
              "name": "相思",
              "artists":
                  [
                    {
                      "name": "毛阿敏"
                    }
                  ]
            },
            {
              "id": 432506345,
              "album":
                  {
                    "picUrl": "http://p1.music.126.net/tfa811GLreJI_S0h9epqRA==/3394192426154346.jpg",
                    "name": "童话镇",
                  },
              "name": "童话镇",
              "artists":
                  [
                    {
                      "name": "陈一发儿"
                    }
                  ]
            },
            {
              "id": 191126,
              "album":
                  {
                    "picUrl": "http://p1.music.126.net/HS9lZ38ZhCwIpI1DGcI9Ow==/6628955603935656.jpg",
                    "name": "演唱会2006",
                  },
              "name": "可惜我是水瓶座(Live) - live",
              "artists":
                  [
                    {
                      "name": "郑中基"
                    }
                  ]
            }
          ],
      lastNextSong:0
    }
  }

  getData() {
    this.props.changePlayIndex(1)
    fetch('/personal_fm', {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      if (data.code === 405) {
        this.setState({
          currentIndex: 0,
          personalFMData: this.state.tempData,
          imgSrc: this.state.tempData[this.state.currentIndex].album.picUrl,
          songName: this.state.tempData[this.state.currentIndex].name,
          albumName: this.state.tempData[this.state.currentIndex].album.name,
          singerName: this.state.tempData[this.state.currentIndex].artists[0].name,
          tempIndex:-1
        })
        //this.getLyric(this.state.tempData[this.state.currentIndex].id)
      } else {
        let album={"name":"未知","picUrl":""};
        if(data.data[this.state.currentIndex].album!==undefined)
          album=data.data[this.state.currentIndex].album;
        this.setState({
          currentIndex: 0,
          personalFMData: data.data,
          imgSrc: album.picUrl,
          songName: data.data[this.state.currentIndex].name,
          albumName: album.name,
          singerName: data.data[this.state.currentIndex].artists[0].name,
          tempIndex:-1
        });
        //this.getLyric(data.data[this.state.currentIndex].id)
      }
    }).catch(err => console.log(err));
  }

  nextSong() {
    let nowTime=Date.now();
    if(nowTime-this.state.lastNextSong<1000) {
      console.log("切这么快，怕不是帕金森犯了 ( ´﹀` )礼貌的微笑");
      return false;
    }
    else
      this.setState({
        lastNextSong:Date.now()
      })
    this.props.changePlayIndex(1);
    let currentIndex = this.state.currentIndex;
    if (currentIndex === 2) {
      this.setState({
        currentIndex:0
      })
      this.getData();
    } else {
      ++currentIndex;
      let album={"name":"未知","picUrl":""};
      if(this.state.personalFMData[currentIndex].album!==undefined)
          album=this.state.personalFMData[currentIndex].album;
      this.setState({
        currentIndex: currentIndex,
        imgSrc: album.picUrl,
        songName: this.state.personalFMData[currentIndex].name,
        albumName: album.name,
        singerName: this.state.personalFMData[currentIndex].artists[0].name,
        tempIndex:-1
      })
      this.getLyric(this.state.personalFMData[currentIndex].id)
    }

  }

  getLyric(songID) {
    //songID = '432506345';
    fetch('/lyric?id=' + songID, {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      if (!data.nolyric) {
        this.setState({
          noLyric:false
        })
        if(data.lrc.lyric!==undefined) {
          this.analyseLyric(data.lrc.lyric.toString());
        }
      }
      else
        this.setState({
          noLyric: true
        })
      this.props.getSongID(songID);
    }).catch(err => console.log(err));
  }

  analyseLyric(lyric) {
    let lyrics = lyric.split("\n");
    let lrcObj = {};
    let lrcArr = [];
    let timeTemp = [];
    for (let i = 0; i < lyrics.length; i++) {
      let lyric = decodeURIComponent(lyrics[i]);
      let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
      let timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      let clause = lyric.replace(timeReg, '');
      for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
        let t = timeRegExpArr[k];
        let min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/:\d*\.*\d?/i)).slice(1));
        let time =(min * 60 + sec).toFixed(1);
        lrcObj[time] = i;
        lrcArr.push(clause);
        timeTemp.push(time)
      }
    }
    this.setState({
      lyricBody: lrcArr,
      lyricTime: timeTemp,
      lyricObj: lrcObj,
      isLyricLoading: true
    })
    this.scrollLyric();
  }

  scrollLyric(index) {
    if (this.state.isLyricLoading) {
      let lyricBodyUL = document.getElementById("PersonalFMLyricUL");
      let lyricBody = document.getElementById("PersonalFMLyric");
      let lyricBodyLi = lyricBody.getElementsByTagName("LI")[index];
      let timeInterval = this.state.lyricTime[index] - this.state.lyricTime[index - 1];
      if (lyricBodyLi !== undefined) {
        let currentDistance = lyricBodyLi.offsetTop - lyricBody.clientHeight * 2 / 5;
        if (currentDistance > 0) {
          if (lyricBodyLi.offsetTop > (lyricBodyUL.scrollHeight - lyricBodyUL.clientHeight * 3 / 5)) {
            currentDistance = lyricBodyUL.scrollHeight - lyricBodyUL.clientHeight;
            let scrollDistance = Math.ceil(currentDistance / timeInterval / 20);
            this.scrollDelay(lyricBodyUL.scrollTop, currentDistance, scrollDistance);
          } else if (lyricBodyUL.scrollTop > lyricBodyLi.offsetTop || lyricBodyUL.scrollTop + lyricBodyUL.clientHeight * 2 / 5 < currentDistance) {
            lyricBodyUL.scrollTop = currentDistance;
          } else {
            let scrollDistance = Math.ceil(currentDistance / timeInterval / 20);
            this.scrollDelay(lyricBodyUL.scrollTop, currentDistance, scrollDistance);
          }
        } else
          lyricBodyUL.scrollTop = 0;
      }
    }
  }

  scrollDelay(preDistance, currentDistance, scrollDistance) {
    if (Math.abs(currentDistance - preDistance) < scrollDistance) {
      return false;
    }
    let lyricBodyUL = document.getElementById("PersonalFMLyricUL");
    if (preDistance < currentDistance) {
      lyricBodyUL.scrollTop += scrollDistance;
      preDistance += scrollDistance;
    } else if (preDistance > currentDistance) {
      lyricBodyUL.scrollTop -= scrollDistance;
      preDistance -= scrollDistance;
    }
    setTimeout(() => {
      this.scrollDelay(preDistance, currentDistance, scrollDistance)
    }, 20)

  }

  componentDidMount() {
    //if (this.props.propsIndex==='1')
    this.getData();
    //this.props.getSongID(432506345);
  }

  componentWillReceiveProps(nextProps) {
    let tempIndex = this.state.lyricObj[this.props.currentTime];
    if (tempIndex !== undefined&&this.props.playIndex===1) {
      this.scrollLyric(tempIndex);
      this.setState({
        tempIndex: tempIndex
      })
    }else if(this.props.playIndex!==nextProps.playIndex){
      this.setState({
        tempIndex:-1
      })
    }
    if(this.props.propsIndex!==nextProps.propsIndex) {
      if (nextProps.propsIndex === '1'&&!nextProps.isPlay)
        this.getLyric(this.state.personalFMData[this.state.currentIndex].id)
    }
  }

  render() {
    if (true)
      return (
          <div className="PersonalFM" style={{"display": this.props.choice}}>
            <div className="PersonalFMBody">
              <div className="PersonalFMLeftColumn">
                <img src={this.state.imgSrc} className="PersonalFMAlbumIMG" alt="专辑封面"/>
                <div className="PersonalFMMenu">
                  <div className="nextplay2" onClick={this.nextSong.bind(this)}><img src={nextplay2} alt="播放下一首"/></div>
                </div>
              </div>
              <div className="PersonalFMRightColumn">
                <div className="PersonalFMTitle">
                  <p className="PersonalFMSongName">{this.state.songName}</p>
                  <div className="PersonalFMSongDetail">
                    <p className="PersonalFMAlbumName">专辑：{this.state.albumName}</p>
                    <p className="PersonalFMSingerName">歌手：{this.state.singerName}</p>
                  </div>
                </div>
                <div id="PersonalFMLyric" className="PersonalFMLyric">
                  {
                    this.state.noLyric ? <p className="textCenter">纯音乐，请您欣赏</p> :
                        <ul id="PersonalFMLyricUL">
                          {
                            this.state.lyricBody.map((item, index) => {
                              return (
                                  <li key={index}
                                      className={this.state.tempIndex === index ? "lyricOutstanding" : ""}>{this.state.lyricBody[index]}</li>
                              )
                            })
                          }
                        </ul>
                  }
                </div>
              </div>
            </div>
          </div>
      )
    else
      return (
          <div className="PersonalFMError">错误码405：IP访问过于频繁，请稍后再试！</div>
      )
  }
}

export default PersonalFM;
