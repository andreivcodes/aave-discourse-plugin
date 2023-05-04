import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

export default createWidget("senate-aave", {
  tagName: "div.senate-aave",

  defaultState() {
    return {
      tooltipVisible: false,
      buttonEnabled: false,
      tooltipState: 0,
      email: "",
    };
  },

  buildKey: () => "senate-aave",

  async createAaveUser(email) {
    try {
      const response = await fetch(`/senate-aave/create-senate-user`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const jsonData = await response.json();

      if (response.status == 200 && jsonData.senate.result == "success") {
        this.state.tooltipState = 1;
        this.scheduleRerender();
      } else {
        this.state.tooltipState = 2;
        this.scheduleRerender();
      }
    } catch (error) {
      this.state.tooltipState = 2;
      this.scheduleRerender();
    }
  },

  html(attrs, state) {
    let icon = iconNode("envelope");

    return h(
      "div.senate-aave-container",
      {
        style: {
          display: "flex",
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
        state.tooltipVisible && state.tooltipState == 0
          ? h(
              "div.tooltip",
              {
                style: {
                  maxWidth: "380px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(48, 186, 198, 0.25) -0.34%, rgba(182, 80, 158, 0.25) 90.27%), #273248",
                  padding: "36px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                  display: "flex-row",
                  alignItems: "center",
                },
              },
              [
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 35px",
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
                      margin: "0 0 35px",
                    },
                  },
                  "Get an email to be notified of off-chain and on-chain Aave proposals that you can vote on."
                ),
                h(
                  "div.input-row",
                  {
                    style: {
                      display: "flex",
                      alignItems: "top",
                      justifyContent: "center",
                    },
                  },
                  [
                    h("input", {
                      type: "email",
                      placeholder: "voter@aave.com",
                      style: {
                        height: "44px",
                        width: "100%",
                        background: "#D9D9D9",
                        color: "#000000",
                        border: "1px solid #000",
                      },
                      oninput: (event) => {
                        state.buttonEnabled = event.target.value !== "";
                        state.email = event.target.value;
                        this.scheduleRerender();
                      },
                    }),
                    h(
                      "button",
                      {
                        type: "button",
                        style: {
                          opacity: state.buttonEnabled ? "100%" : "33%",
                          height: "44px",
                          background: "#FFFFFF",
                          color: "#333333",
                          border: "1px solid #333333",
                          borderStyle: "solid solid solid none",
                          cursor: "pointer",
                        },
                        onclick: () => {
                          this.createAaveUser(state.email);
                        },
                      },
                      "Subscribe"
                    ),
                  ]
                ),
                h("div.tooltip-tail", {
                  style: {
                    width: "0",
                    height: "0",
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(68, 66, 96, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-296px",
                  },
                }),
              ]
            )
          : null,
        state.tooltipVisible && state.tooltipState == 1
          ? h(
              "div.tooltip",
              {
                style: {
                  maxWidth: "380px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(48, 186, 198, 0.25) -0.34%, rgba(182, 80, 158, 0.25) 90.27%), #273248",
                  padding: "36px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                  display: "flex-row",
                  alignItems: "center",
                },
              },
              [
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "87px",
                      margin: "0 0 25px",
                    },
                  },
                  "🙏"
                ),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 25px",
                    },
                  },
                  "Thank you!"
                ),
                h(
                  "p",
                  {
                    style: {
                      fontWeight: "400",
                      fontSize: "16px",
                      margin: "0 0 25px",
                    },
                  },
                  "Please click on the link we just sent to your email to confirm your subscription to Aave Proposals Notifications"
                ),
                h("div.tooltip-tail", {
                  style: {
                    width: "0",
                    height: "0",
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(68, 66, 96, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-352px",
                  },
                }),
              ]
            )
          : null,
        state.tooltipVisible && state.tooltipState == 2
          ? h(
              "div.tooltip",
              {
                style: {
                  maxWidth: "380px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(48, 186, 198, 0.25) -0.34%, rgba(182, 80, 158, 0.25) 90.27%), #273248",
                  padding: "36px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                  display: "flex-row",
                  alignItems: "center",
                },
              },
              [
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "87px",
                      margin: "0 0 25px",
                    },
                  },
                  "😰"
                ),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 25px",
                    },
                  },
                  "Oops"
                ),
                h(
                  "p",
                  {
                    style: {
                      fontWeight: "400",
                      fontSize: "16px",
                      margin: "0 0 25px",
                    },
                  },
                  "Something went wrong and we couldn't create a new user for you. Please try again later."
                ),
                h("div.tooltip-tail", {
                  style: {
                    width: "0",
                    height: "0",
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(68, 66, 96, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-330px",
                  },
                }),
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
