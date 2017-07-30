/*!
 * Created by He on 2017/7/12.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';

class GitHub extends Component {


  render() {
    return (
        <div className="GitHub">
          <div className="GitHubBody">
          <p>如果您觉得勉强还行的话，能给一个star就再好不过了 ^_^</p>
          <iframe src="https://ghbtns.com/github-btn.html?user=flyerH&repo=React-YunMusic&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px" title="star"> </iframe>
          </div>
        </div>
    );
  }
}

export default GitHub;

