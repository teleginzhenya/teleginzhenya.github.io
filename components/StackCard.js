import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Card = styled.div`
  width: ${p => (p.width ? `${p.width}px` : "100%")};
  height: ${p => (p.height ? `${p.height}px` : "100%")};

  border-radius: 5px;
  position: absolute;
  transition: ${p => `all ${p.animationDuration}ms;`};
  transform-origin: 50% -50%;

  ${p => `z-index: ${p.zIndex};`};
  ${p =>
    `transform: translateX(${p.translateX}px) scale(${p.transformScale});`};
  ${p => p.opacity && `opacity: ${p.opacity};`};
  ${p => p.boxShadow && `box-shadow: ${p.boxShadow};`};

  & > * {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: ${p => (p.width ? `${p.width}px` : "100%")};
  height: ${p => (p.height ? `${p.height}px` : "100%")};
  padding-top: ${p => `${p.paddingTop}px`};
`;

const StackCard = ({
  cardsArray,
  cards,
  width,
  height,
  transformScaleStep,
  maxVisibleCards,
  animationDuration
}) => {
  console.log("cards", cards);
  console.log("cardsArray", cardsArray);
  return (
    <CardContainer
      width={width}
      height={height}
      cardsAmount={cardsArray ? cardsArray.length : 0}
      paddingTop={
        // eslint-disable-next-line no-restricted-properties
        height * Math.pow(transformScaleStep, maxVisibleCards) - height
      }
    >
      {cardsArray &&
        cardsArray.map((card, index) => (
          <Card
            {...cards[index]}
            width={width}
            height={height}
            key={card.children.key}
            animationDuration={animationDuration}
          >
            {card.children}
          </Card>
        ))}
    </CardContainer>
  );
};

StackCard.propTypes = {
  cardsArray: PropTypes.arrayOf(PropTypes.object),
  cards: PropTypes.shape().isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  transformScaleStep: PropTypes.number.isRequired,
  maxVisibleCards: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired
};

StackCard.defaultProps = {
  cardsArray: []
};

export default StackCard;
