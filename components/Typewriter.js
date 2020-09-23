import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {fas} from '@fortawesome/free-solid-svg-icons'

const GradientContainer = styled.div`
  margin: 1em 0;
  color: ${props => props.theme.colors.white};
  background-image: ${props => props.theme.colors.gradient};
  border-radius: 0.1em;
  padding: 0.4em 0.8em;
  font-size: 2em;
  font-weight: bold;
  display: inline-block;

  @media (max-width: 550px) {
    word-break: break-all;
    display: block;
  }
`;

const LogoLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.colors.white};
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

library.add(fab, fas);

class Typewriter extends Component {
  handleClick = currentLink => {
    const {onClick} = this.props;
    onClick(currentLink);
  };

  render() {
    const { icon, link, text, isHomeLink } = this.props;
    return (
      <LogoLink
        href={isHomeLink ? "/" : link}
        onClick={() => this.handleClick(link)}
      >
        <GradientContainer>
          {icon && <StyledFontAwesomeIcon icon={icon} size="xs" />}
          <span>{text}</span>
          <Blink>_</Blink>
        </GradientContainer>
      </LogoLink>
    );
  }
}

Typewriter.propTypes = {
  icon: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  isHomeLink: PropTypes.bool.isRequired
};

Typewriter.defaultProps = {
  icon: null,
  link: null,
  text: null,
  onClick: () => {}
};

export default Typewriter;
