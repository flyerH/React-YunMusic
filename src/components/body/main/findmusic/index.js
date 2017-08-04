/*!
 * Created by He on 2017/7/16.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import 'whatwg-fetch';
import './index.css';
import Soar from './billboard/soar';
import New from './billboard/new';
import Singer from './billboard/singer';

class FindMusic extends Component {
  constructor() {
    super();
    this.state = {
      soarData: {},
      newData: {},
      originData: {},
      hotsongData: {},
      singerData: {},
      tempIndex: -1
    }
  }

  componentDidMount() {
    fetch('/top/list?idx=3', {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      this.setState({
        soarData: data.result,
      });
    }).catch(err => console.log(err));

    fetch('/top/list?idx=0', {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      this.setState({
        newData: data.result,
      });
    }).catch(err => console.log(err));

    fetch('/top/list?idx=2', {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      this.setState({
        originData: data.result,
      });
    }).catch(err => console.log(err));

    fetch('/top/list?idx=1', {
      method: 'GET',
    }).then(res => {
      console.log("res1");
      return res.json()
    }).then((data) => {
      console.log("data1");
      this.setState({
        hotsongData: data.result,
      });
    }).catch(err => console.log(err));

    fetch('/toplist/artist', {
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then((data) => {
      this.setState({
        singerData: data.list,
      });
    }).catch(err => console.log(err));

  }

  getSongID(id) {
    this.props.getSongID(id);
    this.props.changePlayIndex(0)
  }

  render() {
    const soar_arr = this.state.soarData;
    const new_arr = this.state.newData;
    const origin_arr = this.state.originData;
    const hotsong_arr = this.state.hotsongData;
    const singer_arr = this.state.singerData;

    return (
        <div className="FindMusic" style={{"display": this.props.choice}}>
          <div className="FindMusic_header">
            <ul>
              <li>个性推荐</li>
              <li>歌单</li>
              <li>主播电台</li>
              <li>排行榜</li>
              <li>歌手</li>
              <li>最新音乐</li>
            </ul>
          </div>
          <div className="billboard">
            <p className="billboard_title">官方榜</p>
            <div className="billboard_list">
              <Soar soar_arr={soar_arr} getSongID={this.getSongID.bind(this)}/>
              <New new_arr={new_arr} newsong_img={require('../../../../static/images/newsong.png')}
                   titleBgColor={'billboard_list2_title_bg1'} getSongID={this.getSongID.bind(this)}/>
              <New new_arr={origin_arr} newsong_img={require('../../../../static/images/origin.png')}
                   titleBgColor={'billboard_list2_title_bg2'} getSongID={this.getSongID.bind(this)}/>
            </div>
            <div className="billboard_list2">
              <New new_arr={hotsong_arr} newsong_img={require('../../../../static/images/hotsong.png')}
                   titleBgColor={'billboard_list2_title_bg3'} getSongID={this.getSongID.bind(this)}/>
              <Singer singer_arr={singer_arr} singer_img={require('../../../../static/images/singer.png')}
                   titleBgColor={'billboard_list2_title_bg4'}/>
            </div>
          </div>
        </div>
    )
  }
}

export default FindMusic;
