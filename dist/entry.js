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
      <div id="splashScreen" class="entry-screen" role="button" tabindex="0" aria-label="進入登入頁面">
        <img class="entry-logo" src="${LOGO_SRC}" alt="戀與可可豆">
        <div class="entry-hint">點擊畫面開始</div>
      </div>
      <form id="loginScreen" class="entry-screen is-hidden" autocomplete="on">
        <div class="login-panel">
          <img class="entry-logo" src="${LOGO_SRC}" alt="戀與可可豆">
          <label class="login-field">
            帳號
            <input id="loginAccount" type="text" autocomplete="username" required>
          </label>
          <label class="login-field">
            密碼
            <input id="loginPassword" type="password" autocomplete="current-password" required>
          </label>
          <button class="login-submit" type="submit">登入</button>
          <p class="login-note">輸入任意帳號密碼即可開始遊戲</p>
        </div>
      </form>
    `;

    document.body.prepend(layer);

    const splashScreen = document.getElementById("splashScreen");
    const loginScreen = document.getElementById("loginScreen");
    const loginAccount = document.getElementById("loginAccount");

    const showLogin = () => {
      splashScreen.classList.add("is-hidden");
      loginScreen.classList.remove("is-hidden");
      window.setTimeout(() => loginAccount.focus(), 260);
    };

    splashScreen.addEventListener("click", showLogin);
    splashScreen.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showLogin();
      }
    });

    loginScreen.addEventListener("submit", (event) => {
      event.preventDefault();
      layer.classList.add("is-hidden");
      document.body.classList.add("game-unlocked");

      if (typeof window.renderScene === "function") {
        window.renderScene("intro");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupEntryFlow);
  } else {
    setupEntryFlow();
  }
})();
