import css from "styled-jsx/css";

export default css.global`
  .ts-layout-with-sider {
    background-color: #000000;
    .ts-sider-wrapper {
      overflow: auto;
      min-height: 100vh;
      position: fixed;
      left: 0;
      background-color: #000000;

      .sider-trigger {
        position: fixed;
        left: 12px;
        bottom: 10px;
        color: #fff;
        font-size: 18px;
      }
      .ant-menu-inline,
      .ant-menu-vertical,
      .ant-menu-vertical-left {
        background: transparent;
        border-right: 0;
      }

      &.ant-layout-sider-collapsed {
        .ant-menu-item.ant-menu-item-selected::after {
          opacity: 1;
          transform: scaleY(1);
        }
      }
    }

    .ts-content-wrapper {
      transition: all 0.3s;
      position: relative;
      &.sider {
        margin-left: 200px;
        &.collapsed {
          margin-left: 80px;
        }
      }
    }
  }
`;
