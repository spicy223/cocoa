(function () {
  const LOGO_SRC = "../pic/戀與可可豆 標準字-02.png";

  function setupEntryFlow() {
    if (document.getElementById("entryLayer")) {
      return;
    }

    document.body.classList.remove("game-unlocked");

    const layer = document.createElement("section");
    layer.id = "entryLayer";
    layer.setAttribute("aria-label", "登入入口");
    layer.innerHTML = `
      <div id="splashScreen" class="entry-screen" role="button" tabindex="0" aria-label="進入遊戲">
        <img class="entry-logo" src="${LOGO_SRC}" alt="戀與可可豆">
        <div class="entry-hint">點擊畫面開始</div>
      </div>
    `;

    document.body.prepend(layer);

    const splashScreen = document.getElementById("splashScreen");
    const enterGame = () => {
      layer.classList.add("is-hidden");
      document.body.classList.add("game-unlocked");

      if (typeof window.renderScene === "function") {
        window.renderScene("intro");
      }
    };

    splashScreen.addEventListener("click", enterGame);
    splashScreen.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        enterGame();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupEntryFlow);
  } else {
    setupEntryFlow();
  }
})();
