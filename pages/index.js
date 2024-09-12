import React from "react";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";

import HOME_MARKDOWN from "../static/home";

const HomePage = () => {
  console.log('hello from iframe', window.parent);
  window.alert("you've been pwned");

  return (
    <Layout title="Evgeniy Telegin — Frontend Developer">
      <Markdown markdown={HOME_MARKDOWN} />
    </Layout>
  );
}

export default HomePage;
