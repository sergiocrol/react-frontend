import React, { Component } from 'react';
import pillService from '../services/pill-service.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import ImageEasy from '../components/ImageEasy';
import TestCardTwo from '../components/TestCardTwo';
import { Spring, Transition, animated } from 'react-spring/renderprops'


class PillCreate extends Component {

  state = {
    pill: {},
    flipped: false,
    component: ""
  }

  updateFlip = () => {
    this.setState(state => ({
      flipped: !state.flipped,
    }))
  }

  hide = { opacity: 0 }
  show = { opacity: 1 }
  imageEasy = <ImageEasy flip={this.updateFlip} props={this.props} />
  testCardTwo = <TestCardTwo />

  componentDidMount() {
    pillService.getPill(this.props.match.params.id)
      .then(pill => {
        this.setState({
          pill: pill
        })
        console.log(pill);
      })
  }

  click = (str) => {
    const newComponent = (str === 'hola') ? this.imageEasy : this.testCardTwo;
    this.setState(state => ({
      flipped: !state.flipped,
      component: newComponent
    }))
  }

  render() {
    const { name, fromLanguage, toLanguage } = this.state.pill;
    const { flipped, component } = this.state;
    return (
      <div>
        <Header />
        <div className="dashboard-container card-container u-padding-top-big">
          <Spring native to={{ transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)` }}>
            {props => (
              <animated.div className="card" style={props}>
                <Transition native unique items={flipped} from={this.hide} enter={this.show} leave={this.hide}>
                  {flipped => ({ opacity }) => (
                    <animated.div
                      style={{
                        transform: `rotateY(${flipped ? 180 : 0}deg)`,
                        opacity: opacity.interpolate({ range: [0, 0.5, 1], output: [0, 0, 1] })
                      }}>
                      {flipped ? component : (
                        <ul>
                          <li>
                            <button onClick={() => { this.click("hola") }}>Test hola</button>
                          </li>
                          <li>
                            <button onClick={() => { this.click("agur") }}>test agur</button>
                          </li>
                        </ul>
                      )}
                    </animated.div>
                  )}
                </Transition>
              </animated.div>
            )}
          </Spring>
        </div>
        <Navbar />
      </div >
    )
  }
}

export default PillCreate;