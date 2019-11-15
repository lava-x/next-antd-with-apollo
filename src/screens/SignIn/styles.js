import css from "styled-jsx/css";

export default css`
  .sign-in-screen {
    background-image: url("https://storage.googleapis.com/teleport_social/assets/twin-tower.svg");
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    height: 100%;
    width: 100%;
    padding: 20px;

    .overlay {
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .bring-to-front {
      z-index: 2;
      width: 100%;
    }
  }
`;