/*!
 * Created by He on 2017/7/14.
 * E-mail:h@strawtc.cn
 */
import React, {Component} from 'react';
import './index.css';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: '0'
    }
  }

  tabSelect(event) {
    let tempIndex = event.currentTarget.getAttribute("data-index")
    let currentIndex = this.state.currentIndex;
    if (currentIndex !== tempIndex) {
      console.log(tempIndex);
      this.setState({
            currentIndex: tempIndex
          },
      );
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
                    className={this.state.currentIndex === '0' ? 'select' : ''}>
                  <p>发现音乐</p>
                </li>
                <li data-index={1} onClick={this.tabSelect.bind(this)}
                    className={this.state.currentIndex === '1' ? 'select' : ''}>
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