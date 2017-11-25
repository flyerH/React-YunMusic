/*!
 * Created by He on 2017/7/19.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';
import play from '../../../../../../static/images/play.png';

class New extends Component {
  constructor() {
    super();
    this.state = {
      tempIndex: -1
    }
  }

  clickList(event) {
    let node = this.getNode(event.target);
    let index = parseInt(node.getAttribute('data-index'), 10);
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
    const updateTime = this.props.new_arr.updateTime;
    const formatTime = this.formatTime(new Date(updateTime).getMonth() + 1) + "月" + this.formatTime(new Date(updateTime).getDate()) + "日更新";
    return formatTime;
  }

  getRank(now, last) {
    if (parseInt(now, 10) !== parseInt(last, 10))
      if (parseInt(now, 10) < parseInt(last, 10))
        return '-111';
      else
        return '-77';
    else
      return '-11'
  }

  getSongID(id) {
    this.props.getSongID(id);
  }

  render() {
    const new_arr = this.props.new_arr;
    const getupdateTime = this.getupdateTime();

    return (
        <div className="New">
          <div className={"billboard_list2_title " + this.props.titleBgColor}>
            <img src={this.props.newsong_img} className="billboard_list2_title_img" alt="新歌榜"/>
            <span className="updateTime2">{getupdateTime}</span>
            <img src={play} className="billboard_list2_play" alt="play_button" onClick={()=>{this.getSongID(new_arr.tracks[0].id)}}/>
          </div>
          <div className="billboard_list2_body">
            <ul className="billboard_list2_body_ul" onClick={this.clickList.bind(this)}>
              {
                [...new Array(8)].map((item, index) => {
                 if (new_arr.tracks) {
                    let artists = [];
                    new_arr.tracks[index].ar.map(function (item) {
                      artists.push(item.name);
                      return true;
                    });
                    artists = artists.join('/');
                    let alias = new_arr.tracks[index].alia;
                    let transNames = new_arr.tracks[index].ar.tns;
                    if (transNames !== undefined)
                      alias = "(" + transNames + ")";
                    else if (alias.length)
                      alias = "(" + alias + ")";
                    let lastRank = new_arr.trackIds[index].lr;
                    let songID = new_arr.trackIds[index].id;
                    let getRankPosition = '';
                    if (lastRank !== undefined) {
                      getRankPosition = this.getRank(index, lastRank);
                    }
                    else
                      getRankPosition = '-44';
                    return (
                        <li key={index} data-index={index}
                            className={this.state.tempIndex === index ? 'choice' : ''} onDoubleClick={this.getSongID.bind(this, songID)}>
                          <span>{index + 1}</span>
                          <span className="rankImg" style={{backgroundPositionY: getRankPosition + 'px'}}> </span>
                          <span>{new_arr.tracks[index].name}<span>{alias}</span></span>
                          <span>{artists}</span>
                        </li>
                    )
                  } else {
                      return true;
                    }
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

export default New;