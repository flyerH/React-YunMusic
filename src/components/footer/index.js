/*!
 * Created by He on 2017/7/21.
 * E-mail:h@strawtc.cn
 */
import React,{Component} from 'react';
import './index.css';
import play from '../../static/images/play2.png';
import pause from '../../static/images/pause.png';
import prePlay from '../../static/images/preplay.png';
import nextPlay from '../../static/images/nextplay.png';

class Footer extends Component{
  constructor(){
    super();
    this.state={
      isPlay:false,
    }
  }

  changeStatus(){
    const audio = document.getElementById("audio");
    if(audio.paused){
      this.setState({
        isPlay:true
      });
      audio.play();
    }else{
      this.setState({
        isPlay:false
      });
      audio.pause();
    }
  }

  render(){
    let playStatus=this.state.isPlay?pause:play;
    return(
      <div className="Footer">
        <div className="footerButton">
          <div className="prePlay"><img src={prePlay}/></div>
          <div className="startPlay" onClick={this.changeStatus.bind(this)}><img src={playStatus} /></div>
          <div className="prePlay"><img src={nextPlay}/></div>
        </div>
        <div className="progressBar">
          <span>00:16</span>
          <div className="progressBarBody">
            <div>Happy ever day</div>
          </div>
          <span>05:55</span>
        </div>
        <audio id="audio" controls="controls" src="http://m10.music.126.net/20170721222830/c46e356172a52fd2869398f5788dd6f9/ymusic/c9fc/0c8e/bf8f/98d785bed643f221b1d40e5fcc2f7790.mp3"></audio>
      </div>
    )
  }
}

export default Footer;
