/*!
 * Created by He on 2017/7/19.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';
import soar_img from '../../../../../../static/images/soar.png'
import play from '../../../../../../static/images/play.png'

class Soar extends Component {

  constructor() {
    super();
    this.state = {
      tempIndex: -1
    }
  }

  clickList(event) {
    let node = this.getNode(event.target);
    let index = parseInt(node.getAttribute('data-index'),10);
    if (index !== this.state.tempIndex)
      this.setState({
        tempIndex: index,
      })
  }

  getNode(node) {
    if (node.nodeName === 'LI') {
      return node;
    } else {
      return this.getNode(node.parentNode);
    }
  }

  formatTime(date) {
    if (date < 10)
      return "0" + date;
    else
      return date;
  }

  getupdateTime() {
    const updateTime = this.props.soar_arr.updateTime;
    const formatTime = this.formatTime(new Date(updateTime).getMonth() + 1) + "月" + this.formatTime(new Date(updateTime).getDate()) + "日更新";
    return formatTime;
  }

  getSongID(id) {
    this.props.getSongID(id);
  }

  render() {
    const soar_arr = this.props.soar_arr;
    const getupdateTime = this.getupdateTime();

    return (
        <div className="Soar">
          <div className="billboard_list_title">
            <img src={soar_img} className="billboard_list_title1_img" alt="飙升榜"/>
            <span className="updateTime">{getupdateTime}</span>
            <img src={play} className="billboard_list_play" alt="play_button"/>
          </div>
          <div className="billboard_list_body">
            <ul className="billboard_list_body_ul" onClick={this.clickList.bind(this)}>
              {
                [...new Array(8)].map((item, index) => {
                  if (soar_arr.tracks) {
                    let artists = [];
                    soar_arr.tracks[index].artists.map(function (item) {
                      artists.push(item.name);
                      return true;
                    });
                    artists = artists.join('/');
                    let alias = soar_arr.tracks[index].alias;
                    let songID = soar_arr.tracks[index].id;
                    let transNames = soar_arr.tracks[index].transNames;
                    if (transNames !== undefined)
                      alias = "(" + transNames + ")";
                    else if (alias.length)
                      alias = "(" + alias + ")";
                    return (
                        <li key={index} data-index={index}
                            className={this.state.tempIndex === index ? 'choice' : ''} onDoubleClick={this.getSongID.bind(this, songID)}>
                          <span>{index + 1}</span>
                          <span> {soar_arr.tracks[index].ratio}%</span>
                          <span>{soar_arr.tracks[index].name}<span>{alias}</span></span>
                          <span>{artists}</span>
                        </li>
                    )
                  }else
                    return true;
                })
              }
            </ul>
          </div>
          <div className="billboard_list_footer">
            <span>查看全部></span>
          </div>
        </div>
    )
  }
}

export default Soar;
