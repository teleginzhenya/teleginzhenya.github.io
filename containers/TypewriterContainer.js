import React, { Component } from "react";
import PropTypes from "prop-types";

import Typewriter from "../components/Typewriter";
import { logEvent } from "../utils/analytics";

const DELAY_BETWEEN_SYMBOLS = 100;
const DELAY_BETWEEN_WORDS = 2000;
const DELAY_BETWEEN_BACKSPACE = 75;

const CONTENT = [
  { icon: ["fas", "angle-right"], text: "Evgeniy Telegin" },
  {
    icon: ["fab", "github"],
    text: "teleginzhenya",
    link: "https://github.com/teleginzhenya"
  },
  {
    icon: ["fab", "stack-overflow"],
    text: "7887530",
    link: "https://stackoverflow.com/users/7887530/zhenya-telegin"
  },
  {
    icon: ["fab", "linkedin"],
    text: "evgeniytelegin",
    link: "https://www.linkedin.com/in/evgeniytelegin/"
  },
  {
    icon: ["fab", "telegram"],
    text: "@zhenyatelegin",
    link: "http://telegram.me/zhenyatelegin"
  },
  {
    icon: ["fas", "envelope"],
    text: "telegin.zhenya@gmail.com",
    link: "mailto:telegin.zhenya@gmail.com"
  }
];

class TypewriterContainer extends Component {
  state = { icon: null, text: "", link: null };

  componentDidMount() {
    this.startTypingAnimation(0, 0);
  }

  startTypingAnimation = (wordIndex, symbolIndex) => {
    setTimeout(() => {
      if (symbolIndex === 0 && CONTENT[wordIndex].icon && !this.state.icon) {
        this.setState(
          {
            icon: CONTENT[wordIndex].icon,
            link: CONTENT[wordIndex].link ? CONTENT[wordIndex].link : null
          },
          () => this.startTypingAnimation(wordIndex, symbolIndex)
        );
      } else {
        this.setState(
          {
            text: `${this.state.text}${CONTENT[wordIndex].text[symbolIndex]}`,
            link: CONTENT[wordIndex].link ? CONTENT[wordIndex].link : null
          },
          () => {
            if (symbolIndex < CONTENT[wordIndex].text.length - 1) {
              this.startTypingAnimation(wordIndex, symbolIndex + 1);
            } else {
              setTimeout(() => this.startBackspaceAnimation(wordIndex), 1000);
            }
          }
        );
      }
    }, DELAY_BETWEEN_SYMBOLS);
  };

  startBackspaceAnimation = wordIndex => {
    setTimeout(() => {
      this.setState(
        {
          text: this.state.text.slice(0, -1),
          icon: this.state.text.length === 0 ? null : this.state.icon,
          link: this.state.text.length === 0 ? null : this.state.link
        },
        () => {
          if (this.state.text.length !== 0) {
            this.startBackspaceAnimation(wordIndex);
          } else if (this.state.text.length === 0 && this.state.icon) {
            this.startBackspaceAnimation(wordIndex);
          } else if (wordIndex < CONTENT.length - 1 && !this.state.icon) {
            setTimeout(
              () => this.startTypingAnimation(wordIndex + 1, 0),
              DELAY_BETWEEN_WORDS
            );
          } else {
            setTimeout(
              () => this.startTypingAnimation(0, 0),
              DELAY_BETWEEN_WORDS
            );
          }
        }
      );
    }, DELAY_BETWEEN_BACKSPACE);
  };

  handleClick = link => {
    logEvent("headerClick", link);
  };

  render() {
    return (
      <Typewriter
        {...this.state}
        onClick={this.handleClick}
        isHomeLink={this.props.isHomeLink}
      />
    );
  }
}

TypewriterContainer.propTypes = {
  isHomeLink: PropTypes.bool.isRequired
};

export default TypewriterContainer;
