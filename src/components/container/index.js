import React, {Component} from 'react';
import './index.css';
import Header from '../header';
import SideBar from '../body/sidebar';
import FindMusic from '../body/main/findmusic';
import PersonalFM from '../body/main/personalfm';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: '0'
    }
  }

  changeIndex(index) {
    this.setState({
          currentIndex: index
        },
    );
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
    let isFindMusic=this.state.currentIndex==='0'?'block':'none';
    let isPersonalFM=this.state.currentIndex==='1'?'block':'none';
    return (
        <div className="Container">
          <Header />
          <SideBar changeIndex={this.changeIndex.bind(this)}/>
          <div className="tabs">
            <FindMusic choice={isFindMusic}/>
            <PersonalFM choice={isPersonalFM}/>
          </div>
        </div>
    );
  }
}

export default Container;
