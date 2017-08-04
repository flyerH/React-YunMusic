import React, {Component} from 'react';
import './index.css';
import Header from '../header';
import SideBar from '../body/sidebar';
import Footer from '../footer';
import FindMusic from '../body/main/findmusic';
import PersonalFM from '../body/main/personalfm';
import SongResult from '../body/main/songresult';
import nowPlay from '../body/nowplay';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: '0',
      inputValue: '',
      songResultData: [],
      isLoading: false,
      songID: -1,
      isMinimize:false,
      showMinimize:false,
      currentTime:0,
      isPlay:false,
      playIndex:-1    //正在播放的歌所属模块
    }
  }

  changeIndex(index) {
    this.setState({
          currentIndex: index
        },
    );
  }

  getInput(tempValue) {
    this.getSongResult(tempValue);
  }

  getSongResult(inputValue) {
    fetch('/search?keywords=' + inputValue, {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      let songCount = data.result.songCount;
      if (songCount > 100)
        songCount = 100;
      fetch('/search?keywords=' + inputValue + '&limit=' + songCount, {
        method: 'GET',
      }).then(res => {
        return res.json()
      }).then((data) => {
        this.setState({
          songResultData: data.result,
          isLoading: true
        })
      }).catch(err => console.log(err));
    })
  }

  getSongID(id) {
    this.setState({
          songID: id
        }
    )
  }

  setMinimize(status){
    const github=document.getElementsByClassName("GitHubBody")[0];
    if(status==="min") {
      github.style.display="block";
      this.setState({
        isMinimize: true
      })
    }
    if(status==="max") {
      github.style.display="none";
      this.setState({
        isMinimize:false
      })
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.setState({
      clientW: document.body.clientWidth,
    });
  }

  getCurrentTime(time){
      this.setState({
        currentTime:time
      })
  }

  isPlay(flag){
    this.setState({
      isPlay:flag
    })
  }

  nextSong(){
    if(this.state.currentIndex==='1')
      this.refs.PersonalFM.nextSong();
  }

  changePlayIndex(index){
    this.setState({
      playIndex:index
    })
  }

  render() {
    let isSongResult = this.state.currentIndex === '-1' ? 'block' : 'none';
    let isFindMusic = this.state.currentIndex === '0' ? 'block' : 'none';
    let isPersonalFM = this.state.currentIndex === '1' ? 'block' : 'none';
    return (
        <div id="Container" className={this.state.isMinimize?"ContainerMinimize":"Container"}>
          <Header isMinimize={this.state.isMinimize} setMinimize={this.setMinimize.bind(this)} getInput={this.getInput.bind(this)} changeIndex={this.changeIndex.bind(this)} getSongID={this.getSongID.bind(this)} changePlayIndex={this.changePlayIndex.bind(this)}/>
          <SideBar isMinimize={this.state.isMinimize} currentIndex={this.state.currentIndex} changeIndex={this.changeIndex.bind(this)}/>
          <div className={this.state.isMinimize?"displayNone":"tabs"}>
            <SongResult playIndex={this.state.playIndex} changePlayIndex={this.changePlayIndex.bind(this)} songResultData={this.state.songResultData} isLoading={this.state.isLoading}
                        getSongID={this.getSongID.bind(this)} choice={isSongResult}/>
            <FindMusic playIndex={this.state.playIndex} changePlayIndex={this.changePlayIndex.bind(this)} choice={isFindMusic} getSongID={this.getSongID.bind(this)}/>
            <PersonalFM ref="PersonalFM" playIndex={this.state.playIndex} changePlayIndex={this.changePlayIndex.bind(this)} propsIndex={this.state.currentIndex} isPlay={this.state.isPlay} choice={isPersonalFM} currentTime={this.state.currentTime} getSongID={this.getSongID.bind(this)}/>
          </div>
          <Footer nextSong={this.nextSong.bind(this)} currentIndex={this.state.currentIndex} isPlay={this.isPlay.bind(this)} getCurrentTime={this.getCurrentTime.bind(this)}  isMinimize={this.state.isMinimize} songID={this.state.songID}/>
          <nowPlay />
        </div>
    );
  }
}

export default Container;
