import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import ImageCard from '../components/ImageCard';
import ImageCardSolution from '../components/ImageCardSolution';
import SoundCard from '../components/SoundCard';
import pillService from '../services/pill-service.js';
import userService from '../services/user-service.js';
import { Spring, Transition, animated } from 'react-spring/renderprops'

class PillPlay extends Component {
  arrayCards = [];

  state = {
    pill: {},
    index: 0,
    flipped: false,
    component: '',
    componentSolution: '',
    score: 0,
    redirect: false
  }

  updateFlip = (response) => {
    let newComponentSolution = '';
    switch (response.type) {
      case 'imageEasy':
        newComponentSolution = <ImageCardSolution answers={response.answers} content={response.content} flip={this.flip} toggle={this.toggle} index={this.state.index} last={this.arrayCards.length} score={this.updateScore} finish={this.finish}/>
        break;
      default:
        newComponentSolution = <ImageCardSolution answers={response.answers} content={response.content} flip={this.flip} toggle={this.toggle} index={this.state.index} last={this.arrayCards.length} score={this.updateScore} finish={this.finish}/>
        break;
    }
    this.setState(state => ({
      componentSolution: newComponentSolution,
      flipped: !state.flipped,
    }))
  }

  flip = () => {
    this.setState(state => ({
      flipped: !state.flipped,
    }))
  }

  toggle = e => {
    this.setState(state => ({
      index: state.index + 1,
      component: this.arrayCards[state.index + 1]
    }));
  }

  updateScore = (score) => {
    const newScore = this.state.score + score;
    this.setState({
      score: newScore
    })
  }

  finish = () => {
    userService.updateScore(this.state.score, this.props.match.params.id)
    .then(user => {
      console.log(user);
    })
    pillService.countTaken(this.props.match.params.id)
    .then(pill => {
      console.log(pill);
    })
    this.setState({
      redirect: true
    })
  }

  componentDidMount() {
    pillService.getPill(this.props.match.params.id)
      .then(pill => {
        this.setState({
          pill: pill
        })
        this.fillArrayComponents(pill.cards)
      })
  }

  fillArrayComponents = (cards) => {
    cards.map(card => {
      switch (card.type) {
        case 'imageEasy':
          this.arrayCards.push(<ImageCard content={card.images} flip={this.updateFlip} />)
          break;
        case 'soundEasy':
          this.arrayCards.push(<SoundCard content={card.sound} flip={this.updateFlip} />)
          break;
        default:
          break;
      }
    })
    const firstComponent = this.arrayCards[0];
    this.setState({
      component: firstComponent
    })
  }

  click = (str) => {
    const newComponent = (str === 'hola') ? this.imageEasy : this.testCardTwo;
    this.setState(state => ({
      flipped: !state.flipped,
      component: newComponent
    }))
  }

  hide = { opacity: 0 }
  show = { opacity: 1 }


  TestScreen1 = (props) => {
    const { flipped, component, componentSolution } = this.state;
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
                  {flipped ? componentSolution : component}
                </animated.div>
              )}
            </Transition>
          </animated.div>
        )}
      </Spring>
    )
  }

  render() {
    const { index, redirect, score } = this.state;
    if(redirect) {return <Redirect to={{pathname: `/pills/${this.props.match.params.id}/play/result`, state: 'dfg'}}/>}
    
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
        <p className="number-card">{this.state.index + 1} <span>of</span> {this.arrayCards.length}</p>
        <Navbar />
      </div>
    )
  }
}

export default withAuth(PillPlay);