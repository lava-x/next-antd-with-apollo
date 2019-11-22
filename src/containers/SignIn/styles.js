import css from "styled-jsx/css";

export default css`
  :global(.spinner-wrapper.sign-in-container) {
    :global(.ant-spin-nested-loading) {
      width: 100%;
      max-width: 400px;

      :global(.ant-spin-container) {
        h1 {
          color: #ffffff;
          font-family: Avenir;
          font-style: normal;
          font-weight: bold;
          font-size: 48px;
          line-height: 56px;
          text-align: center;
        }

        h4 {
          color: #ffffff;
          font-family: Avenir;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 21px;
          text-align: center;
        }

        h5 {
          color: #ffffff;
          font-family: Avenir;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          text-align: left;
          margin-bottom: 0;

          &.text-center {
            text-align: center;
          }

          a {
            color: #11efb2;
          }
        }

        :global(.ant-input) {
          border-color: transparent;
          border-radius: 2px;
          background-color: rgba(110, 111, 115, 0.5);
          color: #ffffff;
          font-size: 18px;
          height: 50px;

          :global(&::placeholder) {
            color: #ffffff;
            font-family: Avenir;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;
            opacity: 0.6;
          }

          &:focus {
            border-color: #ff0c6d;
          }
        }

        :global(.ant-input-password) {
          :global(.ant-input-suffix) {
            max-width: 18px;
          }
          :global(.ant-input-password-icon) {
            color: #ffffff;
            font-size: 18px;
          }
        }
      }
    }
  }
`;
