import React from "react";
import PropTypes from "prop-types";
import { withSize } from "react-sizeme";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import StackCardContainer from "../containers/StackCardContainer";

import { PRINTANI_MARKDOWN } from "../static/markdown";

const RATIO = 1.68784029;

const IMAGES = [
  {
    src: "../static/images/printani/6.png",
    alt: "Admin panel orders",
    key: 6
  },
  {
    src: "../static/images/printani/5.png",
    alt: "Admin panel settings",
    key: 5
  },
  {
    src: "../static/images/printani/4.png",
    alt: "Photos settings",
    key: 4
  },
  {
    src: "../static/images/printani/3.png",
    alt: "Instagram photos",
    key: 3
  },
  {
    src: "../static/images/printani/2.png",
    alt: "Upload photos",
    key: 2
  },
  {
    src: "../static/images/printani/1.png",
    alt: "Main page",
    key: 1
  }
];

class CardPage extends React.Component {
  state = {};
  render() {
    const cardsWidth =
      this.props.size.width > 640 ? 640 : this.props.size.width - 32;
    return (
      <Layout title="Printani — Evgeniy Telegin">
        <StackCardContainer
          width={cardsWidth}
          height={cardsWidth / RATIO}
          maxVisibleCards={4}
          cardShift={cardsWidth / 30}
          transformScaleStep={0.05}
        >
          {IMAGES.map(image => (
            <img src={image.src} alt={image.alt} key={image.key} />
          ))}
        </StackCardContainer>
        <Markdown markdown={PRINTANI_MARKDOWN} />
      </Layout>
    );
  }
}

CardPage.propTypes = {
  size: PropTypes.shape({ width: PropTypes.number }).isRequired
};

export default withSize()(CardPage);
