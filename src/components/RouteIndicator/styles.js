import css from "styled-jsx/css";

// const DONE_DURATION = 250;

export default css`
  div {
    position: fixed;
    left: 0;
    top: 0;
    right: 100%;
    z-index: 2;
    height: 2px;
    background-color: hsla(207, 98%, 40%, 0.95);
    box-shadow: 0 1px 8px hsla(0, 0%, 0%, 0.1);
    opacity: 0;
    transition-property: right, opacity;
    transition-duration: 0s;
    pointer-events: none;
  }
  .loading {
    right: 5%;
    opacity: 1;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-duration: 8s, 0s;
  }
  .done {
    right: 0;
    transition-duration: 250ms;
    transition-delay: 0s, 250ms;
  }
`;
