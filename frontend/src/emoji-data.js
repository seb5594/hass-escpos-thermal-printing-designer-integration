// A hand-picked selection of the emoji that work well on a 1-bit label.
// Every one of them exists in the monochrome Noto Emoji font the printer side uses.
const words = (list) => list.split(/\s+/).filter(Boolean);

export const EMOJI_CATEGORIES = [
  {
    id: "smileys",
    label: "😀",
    emoji: words(
      "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 😉 😍 🥰 😘 😋 😜 🤪 😎 🤓 🥳 🤩 😏 😴 🤔 🤗 🙄 😬 😢 😭 😡 🥺 😱 😷 🤒 🤠 🤡 👻 💀 👽 🤖 😺 😻",
    ),
  },
  {
    id: "people",
    label: "👋",
    emoji: words(
      "👋 🤚 ✋ 👌 ✌ 🤞 🤟 🤘 👍 👎 👊 ✊ 👏 🙌 🙏 💪 👀 👂 👃 👶 👦 👧 👨 👩 👴 👵 💃 🕺 🏃 🚶 🧑‍🍳 👨‍🍳 👩‍💻 🧑‍🎨 💁 🙋 🤷",
    ),
  },
  {
    id: "nature",
    label: "🐶",
    emoji: words(
      "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🦆 🦉 🐺 🐴 🦄 🐝 🦋 🐌 🐞 🐢 🐍 🐙 🐟 🐬 🐳 🌲 🌳 🌴 🌵 🌷 🌸 🌹 🌻 🍀 🍁 🌈 ☀ ⛅ ☁ ❄ ⛄ 🔥 💧 🌙 ⭐ 🌍",
    ),
  },
  {
    id: "food",
    label: "🍕",
    emoji: words(
      "🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🍆 🥔 🥕 🌽 🌶 🥒 🥦 🍄 🥜 🍞 🥐 🥖 🧀 🥚 🍳 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🌮 🥗 🍝 🍜 🍣 🍤 🍚 🍦 🍩 🍪 🎂 🍰 🍫 🍬 🍯 🥛 ☕ 🍵 🍺 🍷 🥂 🍸 🧃 🧂",
    ),
  },
  {
    id: "activities",
    label: "⚽",
    emoji: words(
      "⚽ 🏀 🏈 ⚾ 🎾 🏐 🏓 🎱 🎯 🎮 🎲 🧩 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 🏆 🥇 🏅 🎁 🎈 🎉 🎊 🎄 🎃 🎀 🎂",
    ),
  },
  {
    id: "travel",
    label: "🚗",
    emoji: words(
      "🚗 🚕 🚌 🚑 🚒 🚚 🚲 🛵 🏍 🚂 ✈ 🚀 🚁 ⛵ 🚢 🏠 🏡 🏢 🏥 🏫 ⛪ 🏰 🗼 🗽 ⛺ 🌋 🏖 🗺 🧭 ⛽ 🚦 🅿",
    ),
  },
  {
    id: "objects",
    label: "💡",
    emoji: words(
      "⌚ 📱 💻 🖥 🖨 📷 📺 📻 ⏰ ⏳ 💡 🔦 🔋 🔌 🧯 🧰 🔧 🔨 🧲 🔑 🔒 🔓 🚪 🛏 🛋 🚿 🛁 🚽 🧻 🧼 🧽 🧴 🛒 💰 💳 💎 ✉ 📦 📫 📌 📎 ✂ 📝 📖 📚 📅 📞 🔔 🔕 🔍 🏷 🧪 💊 💉 🩹 🩺 🧸",
    ),
  },
  {
    id: "symbols",
    label: "❤️",
    emoji: words(
      "❤ 🧡 💛 💚 💙 💜 🖤 🤍 💔 💕 💖 💗 💘 💝 ✨ ⭐ 🌟 💫 ⚡ ✅ ❌ ❓ ❗ ⚠ ⛔ 🚫 ♻ ➕ ➖ ➡ ⬅ ⬆ ⬇ 🔴 🟠 🟡 🟢 🔵 🟣 ⚫ ⚪ ⬛ ⬜ 🔺 🔻 ♠ ♥ ♦ ♣ ✔ ✖ ™ © ® 🆗 🆕 🆓 🔝",
    ),
  },
];
