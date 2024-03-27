import gsap from "gsap";
import SplitText from "./Split3.min";

const split = new SplitText("#header-text", {
  type: "lines",
  linesClass: "lineChildren",
});
const splitParent = new SplitText("#header-text", {
  type: "lines",
  linesClass: "lineParent",
});
gsap.to(split.lines, {
  duration: 1,
  y: 0,
  opacity: 1,
  stagger: 0.1,
  eas,
});
