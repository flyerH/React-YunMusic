import React, {Component} from 'react';
import './index.css';
import Header from '../header';
import SideBar from '../body/sidebar';
import Footer from '../footer';
import FindMusic from '../body/main/findmusic';
import PersonalFM from '../body/main/personalfm';
import SongResult from '../body/main/songresult';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: '-1',
      inputValue: '',
      songResultData: [],
      isLoading: false
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
    fetch('http://localhost:4000/search?keywords=' + inputValue, {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      let songCount = data.result.songCount;
      if (songCount > 100)
        songCount = 100;
      fetch('http://localhost:4000/search?keywords=' + inputValue + '&limit=' + songCount, {
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

  getSongID(id){
    this.setState({
      songID:id
        }
    )
  }

  componentWillMount() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.setState({
      clientW: document.body.clientWidth,
    });
  }

  render() {
    let isSongResult = this.state.currentIndex === '-1' ? 'block' : 'none';
    let isFindMusic = this.state.currentIndex === '0' ? 'block' : 'none';
    let isPersonalFM = this.state.currentIndex === '1' ? 'block' : 'none';
    return (
        <div className="Container">
          <Header getInput={this.getInput.bind(this)} changeIndex={this.changeIndex.bind(this)}/>
          <SideBar currentIndex={this.state.currentIndex} changeIndex={this.changeIndex.bind(this)}/>
          <div className="tabs">
            <SongResult songResultData={this.state.songResultData} isLoading={this.state.isLoading}
                        getSongID={this.getSongID.bind(this)} choice={isSongResult}/>
            <FindMusic choice={isFindMusic}/>
            <PersonalFM choice={isPersonalFM}/>
          </div>
          <Footer songID={this.state.songID}/>
        </div>
    );
  }
}

export default Container;
