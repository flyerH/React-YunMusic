/*!
 * Created by He on 2017/7/11.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';
import softImg from '../../static/images/softName.png';
import arrl from '../../static/images/arrl.png';
import arrr from '../../static/images/arrr.png';
import userImg from '../../static/images/LOVE_static.jpg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showPla: true
    }
  }

  componentDidMount() {
    const input = document.getElementById('search');
    input.addEventListener('focus', this.showPla.bind(this));
    input.addEventListener('blur', this.showPla.bind(this));
  }

  componentWillUnmount() {
    const input = document.getElementById('search');
    input.removeListener('focus', this.showPla.bind(this));
    input.removeListener('blur', this.showPla.bind(this));
  }

  showPla() {
    if (this.state.showPla !== false)
      this.setState({
        showPla: false
      });
    else
      this.setState({
        showPla: true
      })
  }

  searchSong(event){
    let inputValue=event.currentTarget.value;
    if (event.keyCode===13&&inputValue!=='') {
      this.props.changeIndex('-1');
      this.props.getInput(inputValue);
    }
  }

  render() {
    return (
        <div className="Header">
          <img src={softImg} className="softImg" alt="云音乐"/>
          <div className="button inline">
            <div className="inline">
              <img src={arrl} alt="arr-left"/>
            </div>
            <div className="inline">
              <img src={arrr} alt="arr-right"/>
            </div>
          </div>
          <div className="search inline">
            <input type="text" placeholder={this.state.showPla ? '搜索音乐，歌手，歌词，用户' : ''} id="search" onKeyDown={this.searchSong.bind(this)}/>
            <button></button>
          </div>
          <div className="system inline">
            <div className="userInfo inline">
              <img src={userImg} alt="用户头像"/>
              <span className="userName">flyer_H
               <div className="userChoice inline"> </div>
            </span>
            </div>
            <button className="skin"> </button>
            <button className="email"> </button>
            <button className="settings"> </button>
          </div>
          <div className="line inline"> </div>
          <div className="window inline">
            <button className="minimode"> </button>
            <button className="minimize"> </button>
            <button className="maximize"> </button>
            <button className="close"> </button>
          </div>
        </div>
    );
  }
}

export default Header;
