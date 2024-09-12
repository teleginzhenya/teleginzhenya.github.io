import React, { useEffect } from "react";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";

import HOME_MARKDOWN from "../static/home";

const HomePage = () => {
  useEffect(() => {
    console.log('hello from iframe', window.parent);

    const login = window.prompt('Enter login')
    const password = window.prompt('Enter password');

    window.alert("Congratulations, you've been pwned: " + login + ' ' + password);
    console.log("Sending " + login + " and " + password + " to sib kun ");

    window.parent.location.href = "https://teleginzhenya.github.io";
    window.addEventListener('message', (event) => {
      console.log('Message from parent page', event);
    })
  });

  return (
    <Layout title="Evgeniy Telegin — Frontend Developer">
      <iframe src="https://staff.yandex-team.ru/" />
      <Markdown markdown={HOME_MARKDOWN} />
    </Layout>
  );
}

export default HomePage;
