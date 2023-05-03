import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

function createTooltipButton(helper) {
  let icon = iconNode("envelope");
  let isVisible = false;

  return helper.h("div", {}, [
    helper.h(
      "button.senate-aave-btn",
      {
        onclick: () => {
          isVisible = !isVisible;
        },
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
    helper.h(
      "div.senate-aave-tooltip",
      { style: { display: isVisible ? "block" : "none" } },
      [h("p", "This is a test tooltip")]
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
