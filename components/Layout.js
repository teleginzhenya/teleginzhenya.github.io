import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";

import theme from "../static/theme";
import TypewriterContainer from "../containers/TypewriterContainer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChildrenContainer = styled.div`
  max-width: 800px;
`;

const Layout = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Ubuntu+Mono"
        rel="stylesheet"
      />
    </Head>
    <ThemeProvider theme={theme.day}>
      <PageContainer>
        <ChildrenContainer>
          <TypewriterContainer />
          {children}
        </ChildrenContainer>
      </PageContainer>
    </ThemeProvider>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

Layout.defaultProps = {
  title: "teleginzhenya.github.io"
};

export default Layout;
