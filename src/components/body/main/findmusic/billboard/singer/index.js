/*!
 * Created by He on 2017/7/19.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';

class Singer extends Component {
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
    const updateTime = this.props.singer_arr.updateTime;
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

  render() {
    const singer_arr = this.props.singer_arr;
    const getupdateTime = this.getupdateTime();

    return (
        <div className="New">
          <div className={"billboard_list2_title " + this.props.titleBgColor}>
            <img src={this.props.singer_img} className="billboard_list2_title_img" alt="新歌榜"/>
            <span className="updateTime2">{getupdateTime}</span>
          </div>
          <div className="billboard_list2_body">
            <ul className="billboard_list2_body_ul" onClick={this.clickList.bind(this)}>
              {
                [...new Array(8)].map((item, index) => {
                  if (singer_arr.artists) {
                    let singerName = singer_arr.artists[index].name;

                    let lastRank = singer_arr.artists[index].lastRank;
                    let getRankPosition = '';
                    if (lastRank !== undefined) {
                      getRankPosition = this.getRank(index, singer_arr.artists[index].lastRank);
                    }
                    else
                      getRankPosition = '-44';
                    return (
                        <li key={index} data-index={index}
                            className={this.state.tempIndex === index ? 'choice' : ''}>
                          <span>{index + 1}</span>
                          <span className="rankImg" style={{backgroundPositionY: getRankPosition + 'px'}}> </span>
                          <span>{singerName}</span>
                        </li>
                    )
                  } else
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

export default Singer;