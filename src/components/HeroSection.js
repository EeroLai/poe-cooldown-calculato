export const HeroSection = {
  name: "HeroSection",
  props: {
    locale: { type: String, required: true },
    presets: { type: Array, required: true },
    activePresetKey: { type: String, required: true },
    tickDuration: { type: String, required: true },
    safetyRatio: { type: String, required: true },
    t: { type: Function, required: true },
  },
  emits: ["set-locale", "apply-preset"],
  template: `
    <header class="hero">
      <div class="hero__copy">
        <div class="hero__topbar">
          <p class="eyebrow">{{ t("hero.eyebrow") }}</p>
          <div class="locale-switch" role="group" :aria-label="t('hero.languageLabel')">
            <button
              type="button"
              class="locale-switch__button"
              :class="{ 'is-active': locale === 'zh-TW' }"
              @click="$emit('set-locale', 'zh-TW')"
            >
              繁中
            </button>
            <button
              type="button"
              class="locale-switch__button"
              :class="{ 'is-active': locale === 'en' }"
              @click="$emit('set-locale', 'en')"
            >
              EN
            </button>
          </div>
        </div>

        <h1>{{ t("hero.title") }}</h1>
        <p class="hero__text">{{ t("hero.description") }}</p>

        <div class="preset-row" role="group" :aria-label="t('hero.presetLabel')">
          <button
            v-for="preset in presets"
            :key="preset.key"
            class="preset-button"
            :class="{ 'is-active': activePresetKey === preset.key }"
            type="button"
            @click="$emit('apply-preset', preset.baseCooldown)"
          >
            {{ t(preset.labelKey) }}
          </button>
        </div>
      </div>

      <div class="hero__panel">
        <div class="info-pill">
          <span>{{ t("hero.pills.tick") }}</span>
          <strong>{{ tickDuration }}{{ t("units.secondsShort") }}</strong>
        </div>
        <div class="info-pill">
          <span>{{ t("hero.pills.safeAps") }}</span>
          <strong>{{ t("hero.pills.safeApsValue") }}{{ Math.round(Number(safetyRatio || 0) * 100) }}%</strong>
        </div>
        <div class="info-pill">
          <span>{{ t("hero.pills.live") }}</span>
          <strong>{{ t("hero.pills.liveValue") }}</strong>
        </div>
      </div>
    </header>
  `,
};
