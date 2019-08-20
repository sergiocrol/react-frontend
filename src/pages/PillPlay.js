import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import ImageCard from '../components/ImageCard';
import ImageCardSolution from '../components/ImageCardSolution';
import SoundCard from '../components/SoundCard';
import pillService from '../services/pill-service.js';
import { Spring, Transition, animated } from 'react-spring/renderprops'

class PillPlay extends Component {
  arrayCards = [];

  state = {
    pill: {},
    index: 5,
    flipped: false,
    finish: false,
    component: '',
    componentSolution: '',
    score: 0
  }

  updateFlip = (response) => {
    let newComponentSolution = '';
    switch (response.type) {
      case 'imageEasy':
        newComponentSolution = <ImageCardSolution answers={response.answers} content={response.content} flip={this.flip} toggle={this.toggle}/>
        break;
      default:
        newComponentSolution = <ImageCardSolution answers={response.answers} content={response.content} flip={this.flip} toggle={this.toggle} />
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
    console.log(this.state.index)
  }

  finishPill = () => {
    this.setState({
      finish: true
    })
  }


  componentDidMount() {
    pillService.getPill(this.props.match.params.id)
      .then(pill => {
        this.setState({
          pill: pill
        })
        console.log(pill);
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
    const firstComponent = this.arrayCards[5];
    this.setState({
      component: firstComponent
    })
    console.log(this.arrayCards)
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
  // imageEasy = <ImageEasy flip={this.updateFlip} props={this.props} toggle={this.toggle} />;
  // testCardTwo = <TestCardTwo />


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
        <p className="number-card">{this.state.index + 1} <span>of</span> {this.arrayCards.length}</p>
        <Navbar />
      </div>
    )
  }
}

export default withAuth(PillPlay);