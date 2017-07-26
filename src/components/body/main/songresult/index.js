/*!
 * Created by He on 2017/7/16.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';

class SongResult extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      tempIndex: -1
    }
  }

  getTime(time) {
    let minute = Math.floor(time / 60 % 60);
    let second = Math.floor(time % 60);
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return minute + ":" + second;
  }

  getNode(node) {
    if (node.nodeName === 'TR') {
      return node;
    } else {
      return this.getNode(node.parentNode);
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

  getSongID(id){
    this.props.getSongID(id);
  }

  render() {

    if (this.props.isLoading) {
      let songResultData = this.props.songResultData;
      let count = 0;
      if (songResultData)
        count = songResultData.songCount;
      if (count > 100)
        count = 100;
      return (
          <div className="SongResult" style={{"display": this.props.choice}}>
            <table>
              <thead>
              <tr className="tableHead">
                <th>&nbsp;</th>
                <th>操作</th>
                <th>音乐标题</th>
                <th>歌手</th>
                <th>专辑</th>
                <th>时长</th>
                <th>热度</th>
              </tr>
              </thead>
              <tbody onClick={this.clickList.bind(this)}>
              {
                [...new Array(count)].map((item, index) => {
                  if (this.props.isLoading) {
                    let songName = songResultData.songs[index].name;
                    let artists = [];
                    songResultData.songs[index].artists.map(function (item) {
                      artists.push(item.name);
                      return true;
                    });
                    artists = artists.join('/');
                    let album = songResultData.songs[index].album.name;
                    let playTime = this.getTime(Math.floor(songResultData.songs[index].duration / 1000));
                    let hotWidth = songResultData.songs[index].score / 100 * 82;
                    let songID = songResultData.songs[index].id
                    return (
                        <tr key={index} data-index={index}
                            className={this.state.tempIndex === index ? 'choice' : ''} onDoubleClick={this.getSongID.bind(this,songID)}>
                          <td className={this.state.tempIndex === index ? 'fontColorBlack' : ''}>{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</td>
                          <td className="SongResultOperate">
                            <div></div>
                            <div></div>
                          </td>
                          <td className={this.state.tempIndex === index ? 'fontColorBlack' : ''}>{songName}</td>
                          <td className={this.state.tempIndex === index ? 'fontColorBlack' : ''}>{artists}</td>
                          <td className={this.state.tempIndex === index ? 'fontColorBlack' : ''}>{album}</td>
                          <td className={this.state.tempIndex === index ? 'fontColorBlack' : ''}>{playTime}</td>
                          <td>
                            <div
                                className={this.state.tempIndex === index ? 'SongResultHotBg hotBgColorFocus' : 'SongResultHotBg'}>
                              <div className={this.state.tempIndex === index ? 'hotColorFocus' : ''}
                                   style={{width: hotWidth + "px"}}>Have a nice code!
                              </div>
                            </div>
                          </td>
                        </tr>
                    )
                  } else
                    return true;
                })
              }
              </tbody>
            </table>
          </div>
      )
    }
    else
      return (<div>not found</div>)
  }
}

export default SongResult;
