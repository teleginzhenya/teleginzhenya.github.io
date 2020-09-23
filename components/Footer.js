import React from "react";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const FooterContainer = styled.footer`
  color: ${props => props.theme.colors.fontColor};
  margin: 2.5em 0;
`;

const StyledHearth = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.primaryColor};
  height: 1em;
  font-size: 0.75em;
`;

const A = styled.a`
  position: relative;
  color: ${props => props.theme.colors.fontColor};
  text-decoration: none;
  border-bottom: dotted 1px ${props => props.theme.colors.primaryColor};
  :hover {
    font-weight: bold;
  }
  :active {
    top: 2px;
  }
`;

library.add(faHeart);

const Footer = () => (
  <FooterContainer style={{ textAlign: "center" }}>
    Made with 
    {' '}
    <StyledHearth icon="heart" size="xs" />
    {` in `}
    <A href="https://en.wikipedia.org/wiki/Almaty">Almaty</A>
  </FooterContainer>
);

export default Footer;
