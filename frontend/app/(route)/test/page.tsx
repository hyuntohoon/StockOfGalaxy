import React from 'react';
import WordCloud from './WordCloudV2';
import BackgroundBlueCIRCLE from '@/public/images/word_circle_blue.png'

const hangulData = [
  {
      word: "React",
      value: 100
  },
  {
      word: "Next.js",
      value: 70
  },
  {
      word: "ECMA6",
      value: 70
  },
  {
      word: "Mobx",
      value: 55
  },
  {
      word: "Parcel",
      value: 60
  },
  {
      word: "Webpack",
      value: 40
  },
  {
      word: "GoLang",
      value: 40
  },
  {
      word: "AWS",
      value: 70
  },
  {
      word: "SCSS",
      value: 80
  },
  {
      word: "Node.js",
      value: 75
  },
  {
      word: "Nginx",
      value: 45
  },
  {
      word: "Mongo DB",
      value: 65
  },
  {
      word: "Redis",
      value: 45
  },
  {
      word: "Code Build",
      value: 22
  },
  {
      word: "Code Deploy",
      value: 22
  },
  {
      word: "Code Pipeline",
      value: 22
  },
  {
      word: "EC2",
      value: 22
  },
  {
      word: "ELB",
      value: 22
  },
  {
      word: "ECS",
      value: 22
  },
  {
      word: "Docker",
      value: 40
  },
  {
      word: "Compose",
      value: 40
  },
  {
      word: "Github",
      value: 67
  },
  {
      word: "Markdown",
      value: 20
  },
  {
      word: "CSS",
      value: 45
  },
  {
      word: "TypeScript",
      value: 50
  },
  {
      word: "Gimp",
      value: 28
  },
  {
      word: "Inkscape",
      value: 28
  },
  {
      word: "Linux",
      value: 28
  },
  {
      word: "Jest",
      value: 28
  },
  {
      word: "GraphQL",
      value: 40
  },
  {
      word: "ECR",
      value: 22
  },
  {
      word: "Slack",
      value: 22
  },
  {
      word: "figma",
      value: 22
  },
  {
      word: "Zeplin",
      value: 22
  },
  {
      word: "Javascript",
      value: 22
  }
]

const Test = () => {

  return (
    <div>
     <WordCloud words={hangulData}
                             width={530}
                             height={530}
                             opt={{
                                 minFontSize: 16,
                                 maxFontSize: 74,
                                 debugMode: true,
                                 sorted: false,
                                 maskingImage: null
                             }}/>
    </div>
  );
};

export default Test;
