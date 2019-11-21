import { notification } from "antd";

export default function showNotification(params) {
  const show = notification[params.type || "open"]({
    message: params.message,
    description: params.description,
    duration: params.duration || 2.5
  });

  return show;
}
