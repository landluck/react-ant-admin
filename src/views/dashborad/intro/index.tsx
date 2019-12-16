import React, { memo, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PageWrap from '../../components/PageWrap';
import { requestMd } from '../../../api/requestMd';
import introMd from './intro.md';

function Intro() {
  const [introText, setIntroText] = useState<string>('');

  useEffect(() => {
    requestMd({ url: introMd }).then(({ data }) => {
      setIntroText(data);
    });
  }, []);

  return (
    <PageWrap className="intro">
      <ReactMarkdown className="markdown-body" source={introText} />
    </PageWrap>
  );
}

export default memo(Intro);
