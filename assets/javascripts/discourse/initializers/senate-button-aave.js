import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

function createTooltipButton(helper) {
  let icon = iconNode("envelope");

  return helper.h("div", {}, [
    helper.h(
      "button.senate-aave-btn",
      {
        style: {
          height: "34px",
          width: "249px",
          color: "#00000",
          background: "#333333",
          border: "1px solid #333333",
          cursor: "pointer",
          padding: "0.5em 1em",
          margin: "1em",
        },
      },
      helper.h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "0.5em" } },
        [icon, "Setup Proposal Notifications"]
      )
    ),
  ]);
}

export default {
  name: "senate-plugin-aave",

  initialize() {
    withPluginApi("0.8.20", (api) => {
      api.decorateWidget("header-buttons:before", (helper) => {
        if (api.getCurrentUser()) {
          return helper.h("div.senate-aave-container", [
            createTooltipButton(helper),
          ]);
        }
      });
    });
  },
};
