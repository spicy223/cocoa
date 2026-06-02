const game = {
  currentScene: "intro",
  affection: {
    alen: 0,
    noah: 0,
    kai: 0
  }
};

const scenes = {
  intro: {
    background: "linear-gradient(180deg, #9c6b2f, #2b1607)",
    character: "🌳",
    speaker: "旁白",
    text: "女主角在參觀可可莊園時，眼前忽然閃過一道金色光芒。一顆巨大的黃金可可果從樹上墜落，正中她的額頭。",
    choices: [
      { text: "睜開眼睛", next: "wakeUp" }
    ]
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
    character: "🧑‍🌾",
    speaker: "鄭琰",
    text: "迷路的小姐？這裡是可可島。外來者很少能來到這裡，除非……黃金可可果選中了妳。",
    choices: [
      {
        text: "你看起來很可靠，可以幫幫我嗎？",
        next: "alenGood",
        effect: () => game.affection.alen += 2
      },
      {
        text: "黃金可可果？那是什麼？",
        next: "commonTruth",
        effect: () => game.affection.alen += 1
      }
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
    character: { image: "../PIC/01.jpg", alt: "許騫譽" },
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
    character: "🧑‍🌾",
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
    character: { image: "../PIC/01.jpg", alt: "許騫譽" },
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
    character: "🧑‍🌾💛",
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
    character: { image: "../PIC/01.jpg", alt: "許騫譽" },
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
    document.getElementById("text").textContent = scene.text;
  }

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;

    button.onclick = () => {
      startBgm();

      if (choice.effect) {
        choice.effect();
      }

      updateStatus();
      renderScene(choice.next);
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

renderScene("intro");

document.addEventListener("pointerdown", startBgm, { once: true });
document.addEventListener("touchstart", startBgm, { once: true });
