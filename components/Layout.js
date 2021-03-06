import React, { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";

import theme from "../static/theme";
import TypewriterContainer from "../containers/TypewriterContainer";
import Footer from "./Footer";
import { initGA, logPageView } from "../utils/analytics";
import { isDarkMode } from "../utils/isDarkMode";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChildrenContainer = styled.div`
  max-width: 640px;
  margin: 0 2em;
`;

class Layout extends Component {
  state = {
    isDarkMode: false
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isDarkMode: isDarkMode()
    });
  }

  render() {
    const { children, title, isHomeLink } = this.props;
    const { isDarkMode } = this.state;

    return (
      <div>
        <Head>
          <title>{title}</title>
          <style global="true">
            {`
          body {
            margin: 0;
            background: ${
              isDarkMode
                ? theme.dark.colors.backgroundColor
                : theme.day.colors.backgroundColor
            };
          }
          `}
          </style>
        </Head>
        <ThemeProvider theme={isDarkMode ? theme.dark : theme.day}>
          <PageContainer>
            <ChildrenContainer>
              <TypewriterContainer isHomeLink={isHomeLink} />
              {children}
              <Footer />
            </ChildrenContainer>
          </PageContainer>
        </ThemeProvider>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isHomeLink: PropTypes.bool
};

Layout.defaultProps = {
  title: "teleginzhenya.github.io",
  isHomeLink: false
};

export default Layout;
