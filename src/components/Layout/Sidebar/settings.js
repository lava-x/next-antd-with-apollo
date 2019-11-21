import React from "react";
import { Icon } from "antd";

export const menus = {
  user: [
    {
      key: "historical-logs",
      type: "menu",
      icon: <Icon type="history" style={{ fontSize: 18 }} />,
      title: "Historical Logs",
      path: "/admin/historical-logs",
      includes: ["/admin/historical-logs"]
    },
    {
      key: "users",
      type: "menu",
      icon: <Icon type="user" style={{ fontSize: 18 }} />,
      title: "Users",
      path: "/admin/users",
      includes: ["/admin/users"]
    },
    {
      key: "sellers",
      type: "menu",
      icon: <Icon type="shop" style={{ fontSize: 18 }} />,
      title: "Sellers",
      path: "/admin/sellers",
      includes: ["/admin/sellers"]
    },

    {
      key: "orders",
      type: "menu",
      icon: <Icon type="shopping-cart" style={{ fontSize: 18 }} />,
      title: "Orders",
      path: "/admin/orders",
      includes: ["/admin/orders"]
    },
    {
      key: "payments",
      type: "menu",
      icon: <Icon type="transaction" style={{ fontSize: 18 }} />,
      title: "Payments",
      path: "/admin/payments",
      includes: ["/admin/payments"]
    },
    {
      key: "vouchers",
      type: "menu",
      icon: <Icon type="tags" style={{ fontSize: 18 }} />,
      title: "Vouchers",
      path: "/admin/vouchers",
      includes: ["/admin/vouchers"]
    }
  ]
};

export default menus;
