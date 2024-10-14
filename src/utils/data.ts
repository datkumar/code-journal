type NavLinkData = {
  title: string;
  url: string;
};

export const dsaLinks: NavLinkData[] = [
  { title: "DSA", url: "dsa" },
  { title: "C++", url: "cpp" },
];

export const devLinks: NavLinkData[] = [
  { title: "HTML, CSS", url: "html-css" },
  { title: "Javascript, Typescript", url: "js-ts" },
  { title: "Astro", url: "astro" },
  { title: "NodeJs", url: "node" },
  { title: "React, NextJs", url: "react-next" },
  { title: "Flutter, Dart", url: "flutter-dart" },
  { title: "Java", url: "java" },
];

export const coreLinks: NavLinkData[] = [
  { title: "DBMS", url: "dbms" },
  { title: "OOP", url: "oop" },
  { title: "OS", url: "os" },
];

export const problemDifficulties = [
  { icon: "🔵", level: 0, title: "Basic", color: "#3285fa" },
  { icon: "🟢", level: 1, title: "Easy", color: "#7cb342" },
  { icon: "🟡", level: 2, title: "Medium", color: "#ffcc32" },
  { icon: "🔴", level: 3, title: "Hard", color: "#f44336" },
  { icon: "🟣", level: 4, title: "Expert", color: "#ab47bc" },
];
