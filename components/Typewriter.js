import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";

const LogoContainer = styled.div`
  font-family: ${props => props.theme.font};
  font-size: 2em;
  font-weight: bold;

  margin: 16px 0 16px -16px;
`;

const LogoLink = styled.a`
  text-decoration: none;
`;

const GradientHighlight = styled.span`
  color: ${props => props.theme.colors.white};
  background-image: ${props => props.theme.colors.gradient};

  border-radius: 3px;
  padding: 8px 16px;
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
  margin-right: 8px;
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
