import css from 'styled-jsx/css';

export default css.global`
  .dialog-wrapper {
    text-align: center;
    white-space: nowrap;

    &:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      width: 0;
    }

    .ant-modal {
      display: inline-block;
      vertical-align: middle;
      top: 0;
      text-align: center;

      .ant-modal-content {
        border-radius: 20px;
        background-color: #15151e;
      }

      .ant-modal-close {
        color: #fff;
      }
    }
  }
`;
