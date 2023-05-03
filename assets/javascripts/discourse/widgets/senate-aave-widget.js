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
                  maxWidth: "350px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(48, 186, 198, 0.25) -0.34%, rgba(182, 80, 158, 0.25) 90.27%), #273248",
                  padding: "20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                },
              },
              [
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 10px",
                    },
                  },
                  "Subscribe to Aave Proposal Notifications"
                ),
                h(
                  "p",
                  {
                    style: {
                      fontWeight: "400",
                      fontSize: "16px",
                      margin: "0 0 10px",
                    },
                  },
                  "Get an email to be notified of off-chain and on-chain Aave proposals that you can vote on."
                ),
                h(
                  "div.input-row",
                  {
                    style: {
                      display: "flex-row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                  [
                    h("input", {
                      type: "email",
                      placeholder: "voter@aave.com",
                      style: {
                        height: "46px",
                        width: "60%",
                        background: "#D9D9D9",
                        border: "1px solid #000",
                      },
                    }),
                    h(
                      "button",
                      {
                        type: "button",
                        style: {
                          opacity: "33%",
                          height: "46px",
                          background: "#333333",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        },
                      },
                      "Subscribe"
                    ),
                  ]
                ),
              ]
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
