import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

export default createWidget("senate-aave", {
  tagName: "div.senate-aave",

  defaultState() {
    return { tooltipVisible: false };
  },

  buildKey: () => "senate-aave",

  html(attrs, state) {
    let icon = iconNode("envelope");

    return h(
      "div.senate-aave-container",
      {
        style: {
          display: "flex",
          maxWidth: "1090px",
          margin: "0 auto",
          justifyContent: "end",
        },
      },
      [
        h(
          "button.senate-aave-btn",
          {
            onclick: () => this.toggleTooltip(),
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "34px",
              width: "249px",
              color: "#00000",
              background: "#333333",
              border: "1px solid #333333",
              cursor: "pointer",
              padding: "0.5em 1em",
              margin: "0.5em 0",
            },
          },
          h(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "0.5em" } },
            [icon, `Setup Proposal Notifications`]
          )
        ),
        state.tooltipVisible
          ? h(
              "div.tooltip",
              {
                style: {
                  position: "absolute",
                  background: "#f9f9f9",
                  border: "1px solid #ccc",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  color: "#333",
                  whiteSpace: "nowrap",
                  marginTop: "35px",
                },
              },
              "This is a test tooltip"
            )
          : null,
      ]
    );
  },

  toggleTooltip() {
    this.state.tooltipVisible = !this.state.tooltipVisible;
    this.scheduleRerender();
  },
});
