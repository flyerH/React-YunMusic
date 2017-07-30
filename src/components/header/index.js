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
    input.removeEventListener('focus', this.showPla.bind(this));
    input.removeEventListener('blur', this.showPla.bind(this));
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

  searchSong(event) {
    const inputValue = document.getElementById("search").value;
    if ((event.keyCode === 13 || event.button === 0) && inputValue !== '') {
      this.props.changeIndex('-1');
      this.props.getInput(inputValue);
    }
  }

  closeWindow() {
    /*eslint-disable */
    if (confirm("确定关闭？")) {
      window.open('', '_self', '');
      window.close();
    }
    else {
    }

  }

  render() {
    return (
        <div className="Header" style={this.props.isMinimize?{lineHeight:"38px"}:{}}>
          <img src={softImg} className="softImg" style={this.props.isMinimize?{marginLeft:"20px"}:{}} onClick={()=>this.props.changeIndex("0")} alt="云音乐"/>
          <div className={this.props.isMinimize?"displayNone":"button inline"}>
            <div className="inline">
              <img src={arrl} alt="arr-left"/>
            </div>
            <div className="inline">
              <img src={arrr} alt="arr-right"/>
            </div>
          </div>
          <div className={this.props.isMinimize?"displayNone":"search inline"}>
            <input type="text" placeholder={this.state.showPla ? '搜索音乐，歌手，歌词，用户' : ''} id="search"
                   onKeyDown={this.searchSong.bind(this)}/>
            <button onClick={this.searchSong.bind(this)}>Nice Code!</button>
          </div>
          <div className={this.props.isMinimize?"displayNone":"system inline"}>
            <div className="userInfo inline">
              <img src={userImg} alt="用户头像"/>
              <span className="userName">flyer_H
               <div className="userChoice inline"> </div>
            </span>
            </div>
            <button className="skin"></button>
            <button className="email"></button>
            <button className="settings"></button>
          </div>
          <div className="line inline"></div>
          <div className="inline">
            <button className="minimode"></button>
            <button className="minimize" onClick={this.props.setMinimize.bind(this,"min")}>
              <div className={this.props.isMinimize?"displayNone":"point"}>
                <div className="pointContainer">
                  <span className="pointArrow"> </span>
                  <div className="pointBody">为什么不试试最小化呢？</div>
                </div>
              </div>
            </button>
            <button className="maximize" onClick={this.props.setMinimize.bind(this,"max")}></button>
            <button className="close" onClick={this.closeWindow.bind(this)}></button>
          </div>
        </div>
    );
  }
}

export default Header;
