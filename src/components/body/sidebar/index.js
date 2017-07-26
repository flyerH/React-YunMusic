/*!
 * Created by He on 2017/7/14.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';

class Sidebar extends Component {

  tabSelect(event) {
    let tempIndex = event.currentTarget.getAttribute("data-index")
    let currentIndex = this.props.currentIndex;
    if (currentIndex !== tempIndex) {
      console.log(tempIndex);
      this.props.changeIndex(tempIndex);
    }
  }

  render() {
    return (
        <div className="Sidebar inline">
          <ul className="title">
            <li>
              <p>推荐</p>
              <ul id="sideTab" className="sideTab">
                <li data-index={0} onClick={this.tabSelect.bind(this)}
                    className={this.props.currentIndex === '0' ? 'select' : ''}>
                  <p>发现音乐</p>
                </li>
                <li data-index={1} onClick={this.tabSelect.bind(this)}
                    className={this.props.currentIndex === '1' ? 'select' : ''}>
                  <p>私人FM</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
    );
  }
}

export default Sidebar;