import React from "react";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import StackCardContainer from "../containers/StackCardContainer";

import { PRINTANI_MARKDOWN } from "../static/markdown";

const IMAGES = [
  {
    src: "../static/images/printani/6.png",
    alt: "Admin panel orders"
  },
  {
    src: "../static/images/printani/5.png",
    alt: "Admin panel settings"
  },
  {
    src: "../static/images/printani/4.png",
    alt: "Photos settings"
  },
  {
    src: "../static/images/printani/3.png",
    alt: "Instagram photos"
  },
  {
    src: "../static/images/printani/2.png",
    alt: "Upload photos"
  },
  {
    src: "../static/images/printani/1.png",
    alt: "Main page"
  }
];

class CardPage extends React.Component {
  state = {};
  render() {
    return (
      <Layout title="Printani — Evgeniy Telegin">
        <StackCardContainer
          width={640}
          height={379.182796}
          maxVisibleCards={6}
          cardShift={50}
          transformScaleStep={0.05}
        >
          {IMAGES.map(image => <img src={image.src} alt={image.alt} />)}
        </StackCardContainer>
        <Markdown markdown={PRINTANI_MARKDOWN} />
      </Layout>
    );
  }
}

export default CardPage;
