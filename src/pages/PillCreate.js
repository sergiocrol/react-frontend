import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    component: "",
    index: 1,
    finish: false
  }

  updateFlip = () => {
    this.setState(state => ({
      flipped: !state.flipped,
    }))
  }

  toggle = e => {
    this.setState(state => ({
      index: state.index + 1
    }));
    console.log(this.state.index)
  }

  finishPill = () => {
    this.setState({
      finish: true
    })
  }

  hide = { opacity: 0 }
  show = { opacity: 1 }
  imageEasy = <ImageEasy flip={this.updateFlip} props={this.props} toggle={this.toggle} />;
  testCardTwo = <TestCardTwo />

  TestScreen1 = (props) => {
    const { flipped, component } = this.state;
    return (
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
                    <>
                      <ul>
                        <li>
                          <button onClick={() => { this.click("hola") }}>Name images</button>
                        </li>
                        <li>
                          <button onClick={this.toggle}>Sound test</button>
                        </li>
                      </ul>
                      {this.state.index > 1 && <button className="pill-finish-button" onClick={this.finishPill}>-FINISH-</button>}
                    </>
                  )}
                </animated.div>
              )}
            </Transition>
          </animated.div>
        )}
      </Spring>
    )
  }

  componentDidMount() {
    pillService.getPill(this.props.match.params.id)
      .then(pill => {
        this.setState({
          pill: pill
        })
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
    //const { name, fromLanguage, toLanguage } = this.state.pill;
    const { index, finish } = this.state;
    if (finish) { return <Redirect to="/home" /> }

    return (
      <div>
        <Header />
        <div className="dashboard-container card-container u-padding-top-big">
          <Transition
            native
            reset
            unique
            items={index}
            from={{ opacity: 0, transform: "translate3d(100%, 0 ,0)" }}
            enter={{ opacity: 1, transform: "translate3d(0%, 0, 0)" }}
            leave={{ opacity: 0, transform: "translate3d(-50%, 0, 0)" }}
          >
            {index => style => (
              <animated.div style={{ ...style }}>
                {React.createElement(this.TestScreen1)}
              </animated.div>
            )}
          </Transition>

        </div>
        <p className="number-card">{this.state.index} <span>of</span> {this.state.index}</p>
        <Navbar />
      </div>
    )
  }
}

export default PillCreate;