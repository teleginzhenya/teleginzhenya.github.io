import React, { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";

import theme from "../static/theme";
import TypewriterContainer from "../containers/TypewriterContainer";
import Footer from "../components/Footer";
import { initGA } from "../utils/analytics";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChildrenContainer = styled.div`
  max-width: 640px;
  margin: 0 2em;
`;

const HeaderContainer = styled.div`
  margin-bottom: 3em;
`;

const DARK_MODE_START_HOUR = 22;
const DARK_MODE_END_HOUR = 10;

const isDarkMode = () => {
  const time = new Date();
  const hours = time.getHours();
  return hours >= DARK_MODE_START_HOUR || hours < DARK_MODE_END_HOUR;
};

class Layout extends Component {
  state = { isDarkMode: isDarkMode() };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
  }

  render() {
    console.log(this.state.isDarkMode);
    const { children, title } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <ThemeProvider theme={this.state.isDarkMode ? theme.dark : theme.day}>
          <PageContainer>
            <ChildrenContainer>
              <HeaderContainer>
                <TypewriterContainer />
              </HeaderContainer>
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
  title: PropTypes.string
};

Layout.defaultProps = {
  title: "teleginzhenya.github.io"
};

export default Layout;
