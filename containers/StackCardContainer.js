import React, { Component } from "react";
import PropTypes from "prop-types";

import StackCard from "../components/StackCard";

class StackCardContainer extends Component {
  state = {
    cards: {},
    topCardIndex: 0,
    bottomCardIndex: 0,
    disabled: false
  };

  componentDidMount = () => {
    const { maxVisibleCards, transformScaleStep, shadow } = this.props;

    const childrenArray = React.Children.toArray(this.props.children);

    const opacityStep = maxVisibleCards
      ? 1 / maxVisibleCards
      : 1 / childrenArray.length;

    const cardsArray = childrenArray
      .reverse()
      .map((children, index) => ({
        zIndex: childrenArray.length - index,
        transformScale:
          index < maxVisibleCards
            ? 1 - transformScaleStep * index
            : 1 - transformScaleStep * (maxVisibleCards - 1),
        translateX: 0,
        opacity:
          index < maxVisibleCards
            ? 1 - opacityStep * index
            : 1 - opacityStep * (maxVisibleCards - 1),
        boxShadow: index < maxVisibleCards && shadow,
        children
      }))
      .reverse();

    const cards = Object.assign({}, cardsArray);

    console.log("CARDSS", cards);
    this.setState({ cards, cardsArray, topCardIndex: cardsArray.length - 1 });
  };

  handleNextButtonClick = () => {
    const { cards, cardsArray, topCardIndex, bottomCardIndex } = this.state;
    const { cardShift, animationDuration } = this.props;

    this.setState(
      {
        disabled: true,
        cards: {
          ...cards,
          [topCardIndex]: {
            ...cards[topCardIndex],
            translateX: cardShift
          }
        }
      },
      () => {
        const updatedCards = cardsArray.map(
          (card, index) =>
            index === topCardIndex
              ? {
                  ...cards[bottomCardIndex],
                  translateX: 0
                }
              : {
                  ...cards[(index + 1) % cardsArray.length],
                  translateX: 0
                }
        );

        setTimeout(() => {
          this.setState({ cards: Object.assign({}, updatedCards) }, () => {
            setTimeout(() => {
              this.setState({
                topCardIndex:
                  topCardIndex === 0 ? cardsArray.length - 1 : topCardIndex - 1,
                bottomCardIndex: topCardIndex,
                disabled: false
              });
            });
          });
        }, animationDuration);
      }
    );
  };

  handlePreviousButtonClick = () => {
    const { cards, cardsArray, topCardIndex, bottomCardIndex } = this.state;
    const { cardShift, animationDuration } = this.props;

    this.setState(
      {
        disabled: true,
        cards: {
          ...cards,
          [bottomCardIndex]: {
            ...cards[bottomCardIndex],
            translateX: -1 * cardShift
          }
        }
      },
      () => {
        const updatedCards = cardsArray.map(
          (card, index) =>
            index === bottomCardIndex
              ? {
                  ...cards[topCardIndex],
                  translateX: 0
                }
              : {
                  ...cards[index === 0 ? cardsArray.length - 1 : index - 1],
                  translateX: 0
                }
        );

        setTimeout(() => {
          this.setState({ cards: Object.assign({}, updatedCards) }, () => {
            this.setState({
              topCardIndex: bottomCardIndex,
              bottomCardIndex:
                bottomCardIndex === cardsArray.length - 1
                  ? 0
                  : bottomCardIndex + 1,
              disabled: false
            });
          });
        }, animationDuration);
      }
    );
  };

  render() {
    const { cardsArray, cards, disabled } = this.state;
    const {
      maxVisibleCards,
      transformScaleStep,
      animationDuration,
      width,
      height
    } = this.props;

    return (
      <div>
        <StackCard
          cardsArray={cardsArray}
          cards={cards}
          width={width}
          height={height}
          transformScaleStep={maxVisibleCards}
          maxVisibleCards={transformScaleStep}
          animationDuration={animationDuration}
        />
        <button onClick={this.handlePreviousButtonClick} disabled={disabled}>
          previous
        </button>
        <button onClick={this.handleNextButtonClick} disabled={disabled}>
          next
        </button>
      </div>
    );
  }
}

StackCardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  maxVisibleCards: PropTypes.number,
  transformScaleStep: PropTypes.number,
  cardShift: PropTypes.number,
  animationDuration: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shadow: PropTypes.string
};

StackCardContainer.defaultProps = {
  maxVisibleCards: 3,
  transformScaleStep: 0.1,
  cardShift: 150,
  animationDuration: 300,
  shadow: "0 5px 15px 0 rgba(0, 0, 0, 0.1)"
};

export default StackCardContainer;
