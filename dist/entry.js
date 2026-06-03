(function () {
  const LOGO_SRC = "../pic/戀與可可豆 標準字-02.png";
  const SLIDES = ["../pic/04.png", "../pic/05.png", "../pic/06.png"];

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
        <div class="entry-slideshow" aria-hidden="true">
          <div class="entry-slide is-visible"></div>
          <div class="entry-slide"></div>
        </div>
        <img class="entry-logo" src="${LOGO_SRC}" alt="戀與可可豆">
        <div class="entry-hint">點擊畫面開始</div>
      </div>
    `;

    document.body.prepend(layer);

    const splashScreen = document.getElementById("splashScreen");
    const slideEls = Array.from(document.querySelectorAll(".entry-slide"));
    let currentSlide = 0;
    let visibleSlide = 0;

    slideEls[0].style.backgroundImage = `url("${SLIDES[0]}")`;
    slideEls[1].style.backgroundImage = `url("${SLIDES[1]}")`;

    const slideTimer = window.setInterval(() => {
      currentSlide = (currentSlide + 1) % SLIDES.length;
      const nextVisibleSlide = visibleSlide === 0 ? 1 : 0;
      const currentEl = slideEls[visibleSlide];
      const nextEl = slideEls[nextVisibleSlide];

      nextEl.style.backgroundImage = `url("${SLIDES[currentSlide]}")`;
      nextEl.classList.add("is-visible");
      currentEl.classList.remove("is-visible");
      visibleSlide = nextVisibleSlide;
    }, 3600);

    const enterGame = () => {
      window.clearInterval(slideTimer);
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
