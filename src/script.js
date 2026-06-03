{
const game = {
  currentScene: "intro",
  playerName: "",
  affection: {
    alen: 0,
    noah: 0,
    kai: 0
  }
};

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
    startBgm();
  });
}

const scenes = {
  intro: {
    background: "url('../pic/可可莊園.png') center / cover no-repeat",
    character: "",
    speaker: "旁白",
    text: "身為可可愛好者的我，在參觀台灣可可莊園時，意外被一顆從樹上墜落的巨大黃金可可果擊中。",
    choices: [
      { text: "繼續", next: "introAwake" }
    ]
  },

  introAwake: {
    background: "url('../pic/黃金可可.png') center / cover no-repeat",
    character: "",
    sparkles: true,
    speaker: "旁白",
    text: "當我再次睜開雙眼，映入眼簾的是一片金黃色的可可森林。",
    choices: [
      { text: "環顧四周", next: "introForest" }
    ]
  },

  introForest: {
    background: "url('../pic/黃金可可.png') center / cover no-repeat",
    character: "",
    sparkles: true,
    speaker: "旁白",
    text: "空氣中瀰漫著濃郁巧克力香氣，遠方矗立著一棵巨大的黃金可可樹。",
    choices: [
      { text: "走向黃金可可樹", next: "introVoice" }
    ]
  },

  introVoice: {
    background: "url('../pic/黃金可可.png') center / cover no-repeat",
    character: "",
    sparkles: true,
    speaker: "旁白",
    text: "就在此時，一道低沉溫柔的聲音從身後傳來。",
    choices: [
      { text: "繼續", next: "introUnknownVoice" }
    ]
  },

  introUnknownVoice: {
    background: "url('../pic/黃金可可.png') center / cover no-repeat",
    character: "",
    sparkles: true,
    speaker: "？？？",
    text: "「妳終於來了。」",
    choices: [
      { text: "轉身查看", next: "alenReveal" }
    ]
  },

  alenReveal: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/02.png", alt: "鄭琰" },
    speaker: "旁白",
    text: "我轉身，看見一名身穿棕金色長袍的男子。\n\n他是——發酵魔術師【鄭琰】。",
    choices: [
      { text: "繼續", next: "nameRiteGaze" }
    ]
  },

  nameRiteGaze: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/02.png", alt: "鄭琰" },
    speaker: "旁白",
    text: "但男子沒有立刻靠近，只是靜靜凝視著我，像是在確認某個久遠預言中的人。",
    choices: [
      { text: "繼續", next: "nameRiteMeaning" }
    ]
  },

  nameRiteMeaning: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/02.png", alt: "鄭琰" },
    speaker: "鄭琰",
    text: "在這座森林裡，名字不是單純的稱呼。\n\n名字會決定妳與可可島之間的連結，也會讓這片森林記住妳的存在。",
    choices: [
      { text: "繼續", next: "nameRitePrompt" }
    ]
  },

  nameRitePrompt: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/02.png", alt: "鄭琰" },
    speaker: "鄭琰",
    text: "所以，告訴我——\n\n妳的名字是？",
    choices: [],
    nameInput: true,
    next: "nameRiteEcho"
  },

  nameRiteEcho: {
    background: "url('../pic/黃金可可.png') center / cover no-repeat",
    character: "",
    sparkles: true,
    speaker: "旁白",
    text: "【玩家姓名】。\n\n當我說出這個名字的瞬間，腳邊的金色可可葉微微發亮。\n\n遠方那棵巨大的黃金可可樹，像是聽見了什麼似的，枝葉輕輕搖曳。",
    choices: [
      { text: "繼續", next: "nameRiteWelcome" }
    ]
  },

  nameRiteWelcome: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/03.png", alt: "鄭琰" },
    speaker: "鄭琰",
    text: "鄭琰露出一抹溫柔的笑。\n\n「原來如此……」\n\n「那麼，從現在開始，可可島也會記住妳的名字。」\n\n「歡迎來到這裡，【玩家姓名】。」",
    choices: [
      { text: "結束", next: "fadeToBlack" }
    ]
  },

  fadeToBlack: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/03.png", alt: "鄭琰" },
    speaker: "",
    text: "",
    choices: [],
    hideDialogue: true,
    fadeOut: true
  },

  wakeUp: {
    background: "linear-gradient(180deg, #375c46, #c79a3a)",
    character: "✨",
    speaker: "女主角",
    text: "這裡是……哪裡？空氣裡有濃濃的可可香氣，但這裡絕對不是剛才的莊園。",
    choices: [
      { text: "往森林深處走去", next: "meetAlen" },
      { text: "沿著海岸尋找人影", next: "meetNoah" },
      { text: "調查發光的可可果碎片", next: "meetKai" }
    ]
  },

  meetAlen: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/03.png", alt: "鄭琰" },
    speaker: "鄭琰",
    text: "迷路的小姐？這裡是可可島。外來者很少能來到這裡，除非……黃金可可果選中了妳。",
    choices: [
      { text: "繼續", next: "prologueEnd" }
    ]
  },

  prologueEnd: {
    background: "linear-gradient(180deg, #6b4a2d, #241207)",
    character: { image: "../pic/03.png", alt: "鄭琰" },
    speaker: "旁白",
    text: "黃金可可果的香氣仍在空氣裡流動，而我的命運，也在這一刻悄悄偏離了原本的軌道。",
    choices: [
      { text: "重新開始", next: "intro", effect: resetGame }
    ]
  },

  meetNoah: {
    background: "linear-gradient(180deg, #315f7d, #172b3a)",
    character: "🎻",
    speaker: "蕭褐",
    text: "妳的眼神像剛磨好的可可粉，有點苦，卻藏著香氣。別害怕，我叫蕭褐。",
    choices: [
      {
        text: "你說話好奇怪，但我不討厭。",
        next: "noahGood",
        effect: () => game.affection.noah += 2
      },
      {
        text: "你知道怎麼離開這座島嗎？",
        next: "commonTruth",
        effect: () => game.affection.noah += 1
      }
    ]
  },

  meetKai: {
    background: "linear-gradient(180deg, #60336f, #1d0d25)",
    character: { image: "../pic/02.png", alt: "許騫譽" },
    speaker: "許騫譽",
    text: "別碰那碎片。黃金可可果不是祝福，而是封印。妳的到來，代表可可島的危機已經開始了。",
    choices: [
      {
        text: "封印？請告訴我真相。",
        next: "kaiGood",
        effect: () => game.affection.kai += 2
      },
      {
        text: "你為什麼知道這麼多？",
        next: "commonTruth",
        effect: () => game.affection.kai += 1
      }
    ]
  },

  alenGood: {
    background: "linear-gradient(180deg, #7b542f, #2a1508)",
    character: { image: "../pic/03.png", alt: "鄭琰" },
    speaker: "鄭琰",
    text: "可靠嗎？呵……那我就負責保護妳吧。畢竟可可島的森林，夜晚可不怎麼溫柔。",
    choices: [
      { text: "和鄭琰一起前往村落", next: "commonTruth" }
    ]
  },

  noahGood: {
    background: "linear-gradient(180deg, #3d7191, #142838)",
    character: "🎻",
    speaker: "蕭褐",
    text: "不討厭就夠了。很多感情，一開始都只是『不討厭』。來吧，我帶妳去聽可可島的歌。",
    choices: [
      { text: "跟著蕭褐前往海邊祭壇", next: "commonTruth" }
    ]
  },

  kaiGood: {
    background: "linear-gradient(180deg, #74438a, #1a0c22)",
    character: { image: "../pic/02.png", alt: "許騫譽" },
    speaker: "許騫譽",
    text: "真相會讓人受傷。但如果妳還是想知道，我會陪妳走到最後。",
    choices: [
      { text: "和許騫譽調查黃金可可果", next: "commonTruth" }
    ]
  },

  commonTruth: {
    background: "linear-gradient(180deg, #4a3b22, #0f0f0f)",
    character: "🌕",
    speaker: "旁白",
    text: "夜幕降臨，可可島中央的黃金樹開始枯萎。三位男子同時出現在妳面前，他們的身影逐漸被可可香氣包圍。",
    choices: [
      { text: "詢問三人的真正身份", next: "identityReveal" }
    ]
  },

  identityReveal: {
    background: "linear-gradient(180deg, #8b5a2b, #241207)",
    character: "🍫",
    speaker: "三人",
    text: "我們不是普通人。我們是可可豆的化身。鄭琰代表濃郁與守護，蕭褐代表香氣與記憶，許騫譽代表苦味與真相。",
    choices: [
      { text: "我想守護這座島", next: "finalChoice" }
    ]
  },

  finalChoice: {
    background: "linear-gradient(180deg, #d4af37, #2b1607)",
    character: "💛",
    speaker: "黃金可可果",
    text: "若要修復可可島的秩序，妳必須選擇一位與妳心意相通的化身，共同喚醒黃金可可果真正的力量。",
    choices: [
      {
        text: "選擇鄭琰：守護與安定",
        next: "endingAlen",
        effect: () => game.affection.alen += 3
      },
      {
        text: "選擇蕭褐：香氣與回憶",
        next: "endingNoah",
        effect: () => game.affection.noah += 3
      },
      {
        text: "選擇許騫譽：苦味與真相",
        next: "endingKai",
        effect: () => game.affection.kai += 3
      }
    ]
  },

  endingAlen: {
    background: "linear-gradient(180deg, #b98245, #2b1607)",
    character: { image: "../pic/03.png", alt: "鄭琰" },
    speaker: "鄭琰",
    text: "妳選擇了我，那我也會選擇妳。從今天開始，我不只守護可可島，也守護妳。",
    choices: [
      { text: "查看結局", next: "result" }
    ]
  },

  endingNoah: {
    background: "linear-gradient(180deg, #7fb3d5, #142838)",
    character: "🎻💛",
    speaker: "蕭褐",
    text: "妳的名字，會成為我最珍惜的旋律。即使有一天妳回到原本的世界，我也會記得妳的香氣。",
    choices: [
      { text: "查看結局", next: "result" }
    ]
  },

  endingKai: {
    background: "linear-gradient(180deg, #b573d1, #1a0c22)",
    character: { image: "../pic/02.png", alt: "許騫譽" },
    speaker: "許騫譽",
    text: "妳沒有逃避真相。這樣的妳，比黃金可可果還耀眼。留下來吧，和我一起改寫可可島的命運。",
    choices: [
      { text: "查看結局", next: "result" }
    ]
  },

  result: {
    background: "linear-gradient(180deg, #d4af37, #111)",
    character: "🏝️",
    speaker: "系統",
    text: "",
    choices: [
      {
        text: "重新開始",
        next: "intro",
        effect: resetGame
      }
    ],
    onEnter: showResult
  }
};

function renderScene(sceneId) {
  const scene = scenes[sceneId];
  game.currentScene = sceneId;

  if (scene.onEnter) {
    scene.onEnter();
  }

  const gameEl = document.getElementById("game");
  gameEl.style.background = scene.background;
  gameEl.classList.toggle("has-sparkles", Boolean(scene.sparkles));
  gameEl.classList.remove("is-fading-out");
  const characterEl = document.getElementById("character");
  characterEl.classList.toggle("is-photo", typeof scene.character === "object");
  gameEl.classList.toggle("has-photo", typeof scene.character === "object");

  if (typeof scene.character === "object") {
    characterEl.textContent = scene.character.alt;
    characterEl.style.backgroundImage = `url("${scene.character.image}")`;
  } else {
    characterEl.textContent = scene.character;
    characterEl.style.backgroundImage = "";
  }
  const speakerEl = document.getElementById("speaker");
  speakerEl.textContent = scene.speaker;
  speakerEl.classList.toggle("is-hidden", scene.speaker === "旁白");

  if (sceneId !== "result") {
    document.getElementById("text").textContent = formatText(scene.text);
  }

  const choicesDiv = document.getElementById("choices");
  const dialogueBox = document.getElementById("dialogueBox");
  const nameForm = document.getElementById("nameForm");
  const playerNameInput = document.getElementById("playerNameInput");
  choicesDiv.innerHTML = "";
  dialogueBox.classList.toggle("is-hidden", Boolean(scene.hideDialogue));
  nameForm.classList.add("is-hidden");
  playerNameInput.value = "";
  gameEl.onclick = null;
  gameEl.classList.remove("can-advance");
  choicesDiv.classList.remove("is-hidden");

  const advanceChoice = (choice) => {
    startBgm();

    if (choice.effect) {
      choice.effect();
    }

    updateStatus();
    renderScene(choice.next);
  };

  const canTapAdvance = scene.choices.length === 1 && !scene.choices[0].effect;

  if (scene.fadeOut) {
    choicesDiv.classList.add("is-hidden");
    window.setTimeout(() => {
      gameEl.classList.add("is-fading-out");
    }, 80);
    updateStatus();
    return;
  }

  if (scene.nameInput) {
    choicesDiv.classList.add("is-hidden");
    nameForm.classList.remove("is-hidden");
    nameForm.onsubmit = (event) => {
      event.preventDefault();
      const name = playerNameInput.value.trim();

      if (!name) {
        playerNameInput.focus();
        return;
      }

      game.playerName = name;
      startBgm();
      renderScene(scene.next);
    };
    window.setTimeout(() => playerNameInput.focus(), 50);
    updateStatus();
    return;
  }

  if (canTapAdvance) {
    choicesDiv.classList.add("is-hidden");
    gameEl.classList.add("can-advance");
    gameEl.onclick = (event) => {
      if (event.target.closest("button, audio")) {
        return;
      }

      advanceChoice(scene.choices[0]);
    };
    updateStatus();
    return;
  }

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;

    button.onclick = () => {
      advanceChoice(choice);
    };

    choicesDiv.appendChild(button);
  });

  updateStatus();
}

function updateStatus() {
  document.getElementById("alenScore").textContent = game.affection.alen;
  document.getElementById("noahScore").textContent = game.affection.noah;
  document.getElementById("kaiScore").textContent = game.affection.kai;
}

function formatText(text) {
  return text.replaceAll("【玩家姓名】", game.playerName || "我");
}

function showResult() {
  const { alen, noah, kai } = game.affection;

  let endingText = "";

  if (alen >= noah && alen >= kai) {
    endingText = "結局：濃郁守護之戀。妳與鄭琰一起重建可可森林，可可島重新恢復生機。";
  } else if (noah >= alen && noah >= kai) {
    endingText = "結局：香氣記憶之戀。妳與蕭褐喚醒島上的古老旋律，讓失落的記憶回到人們心中。";
  } else {
    endingText = "結局：苦甜真相之戀。妳與許騫譽揭開黃金可可果的封印，讓可可島迎來真正的自由。";
  }

  document.getElementById("text").textContent = endingText;
}

function resetGame() {
  game.affection.alen = 0;
  game.affection.noah = 0;
  game.affection.kai = 0;
  game.playerName = "";
}

function startBgm() {
  const bgm = document.getElementById("bgm");

  if (bgm.paused) {
    bgm.volume = 0.8;
    bgm.play().catch(() => {});
  }
}

function toggleMusic() {
  const bgm = document.getElementById("bgm");

  if (bgm.paused) {
    bgm.volume = 0.8;
    bgm.play().catch(() => {
      console.log("瀏覽器需要先點擊畫面才允許播放音樂");
    });
  } else {
    bgm.pause();
  }
}

window.game = game;
window.renderScene = renderScene;
renderScene("intro");
setupEntryFlow();

document.addEventListener("pointerdown", startBgm, { once: true });
document.addEventListener("touchstart", startBgm, { once: true });
}
