type NavLinkData = {
  title: string;
  url: string;
};

export const dsaLinks: NavLinkData[] = [
  { title: "DSA", url: "dsa" },
  { title: "C++", url: "cpp" },
];

export const devLinks: NavLinkData[] = [
  { title: "Git", url: "git" },
  { title: "Linux", url: "linux" },
  { title: "Java", url: "java" },
  { title: "Golang", url: "go" },
  { title: "HTML, CSS", url: "html-css" },
  { title: "Javascript, Typescript", url: "js-ts" },
  { title: "NodeJs", url: "nodejs" },
  { title: "React, NextJs", url: "react-next" },
  { title: "Astro", url: "astro" },
  { title: "Flutter, Dart", url: "flutter-dart" },
];

export const coreLinks: NavLinkData[] = [
  { title: "OOP", url: "oop" },
  { title: "DBMS", url: "dbms" },
  { title: "OS", url: "os" },
];

export const problemDifficulties = [
  { icon: "🔵", level: 0, title: "Basic", color: "#3285fa" },
  { icon: "🟢", level: 1, title: "Easy", color: "#7cb342" },
  { icon: "🟡", level: 2, title: "Medium", color: "#ffcc32" },
  { icon: "🔴", level: 3, title: "Hard", color: "#f44336" },
  { icon: "🟣", level: 4, title: "Expert", color: "#ab47bc" },
];
