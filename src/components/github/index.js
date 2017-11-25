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
            <a className="github-button" href="https://github.com/flyerH/React-YunMusic" data-size="large" data-show-count="true" aria-label="Star flyerH/React-YunMusic on GitHub">Star</a>
          </div>
        </div>
    );
  }
}

export default GitHub;

