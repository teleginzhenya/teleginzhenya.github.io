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

class Layout extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
  }

  render() {
    const { children, title } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <ThemeProvider theme={theme.day}>
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
