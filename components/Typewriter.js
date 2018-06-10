import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";

const LogoContainer = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin: 1em 0;
`;

const LogoLink = styled.a`
  text-decoration: none;
`;

const GradientHighlight = styled.span`
  color: ${props => props.theme.colors.white};
  background-image: ${props => props.theme.colors.gradient};
  border: 0.025em solid ${props => props.theme.colors.gradientSecond};
  border-radius: 0.1em;
  padding: 0.4em 0.8em;
`;

const blinkAnimation = keyframes`
  50% {
    visibility: hidden;
  }
`;

const Blink = styled.span`
  font-weight: normal;
  animation: ${blinkAnimation} 1s step-start 0s infinite;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.4em;
`;

fontawesome.library.add(brands, solid);

const Typewriter = ({ currentIcon, currentLink, currentText }) => (
  <LogoContainer>
    <LogoLink href={currentLink}>
      <GradientHighlight>
        {currentIcon && <StyledFontAwesomeIcon icon={currentIcon} size="xs" />}
        {currentText}
        <Blink>_</Blink>
      </GradientHighlight>
    </LogoLink>
  </LogoContainer>
);

Typewriter.propTypes = {
  currentIcon: PropTypes.arrayOf(PropTypes.string),
  currentLink: PropTypes.string,
  currentText: PropTypes.string
};

Typewriter.defaultProps = {
  currentIcon: null,
  currentLink: null,
  currentText: null
};

export default Typewriter;
