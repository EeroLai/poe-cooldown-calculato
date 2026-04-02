export const ResultsPanel = {
  name: "ResultsPanel",
  props: {
    result: { type: Object, default: null },
    t: { type: Function, required: true },
    formatters: { type: Object, required: true },
  },
  computed: {
    banner() {
      if (!this.result) {
        return {
          className: "is-neutral",
          title: this.t("status.invalid.title"),
          text: this.t("status.invalid.text"),
        };
      }

      if (!this.result.diluted) {
        return {
          className: "is-good",
          title: this.t("status.onPoint.title"),
          text: this.t("status.onPoint.text", this.result.tickCount),
        };
      }

      if (this.result.cdrGapPercent !== null && this.result.cdrGapPercent <= 1e-9) {
        return {
          className: "is-good",
          title: this.t("status.ready.title"),
          text: this.t("status.ready.text", this.result.tickCount),
        };
      }

      return {
        className: "is-warn",
        title: this.t("status.diluted.title"),
        text: this.result.cdrGapPercent
          ? this.t("status.diluted.textWithGap", this.formatters.percent(this.result.cdrGapPercent))
          : this.t("status.diluted.text"),
      };
    },
    cards() {
      if (!this.result) {
        return [
          { key: "theoreticalCooldown", value: "--" },
          { key: "tickCount", value: "--" },
          { key: "actualCooldown", value: "--" },
          { key: "dilutionState", value: "--" },
          { key: "requiredCdr", value: "--", accent: true },
          { key: "cdrGap", value: "--", accent: true },
          { key: "maxAps", value: "--" },
          { key: "safeAps", value: "--" },
          { key: "attackTime", value: "--", wide: true },
        ];
      }

      return [
        {
          key: "theoreticalCooldown",
          value: this.formatters.seconds(this.result.theoreticalCooldown),
        },
        {
          key: "tickCount",
          value: this.t("results.tickValue", this.result.tickCount),
        },
        {
          key: "actualCooldown",
          value: this.formatters.seconds(this.result.actualCooldown, 3),
        },
        {
          key: "dilutionState",
          value: this.result.diluted ? this.t("results.dilutedYes") : this.t("results.dilutedNo"),
        },
        {
          key: "requiredCdr",
          value:
            this.result.requiredCdrPercent === null
              ? this.t("results.noShorterTick")
              : this.formatters.percent(this.result.requiredCdrPercent),
          accent: true,
        },
        {
          key: "cdrGap",
          value:
            this.result.cdrGapPercent === null
              ? this.t("results.noNextTier")
              : this.result.cdrGapPercent <= 1e-9
                ? this.t("results.alreadyReached")
                : this.formatters.percent(this.result.cdrGapPercent),
          accent: true,
        },
        {
          key: "maxAps",
          value: this.formatters.aps(this.result.maxAps),
        },
        {
          key: "safeAps",
          value: this.formatters.aps(this.result.safeAps),
        },
        {
          key: "attackTime",
          value: `${this.formatters.number(this.result.bestAttackTime, 3)} ~ ${this.formatters.number(this.result.safeAttackTime, 3)} ${this.t("units.secondsShort")}`,
          wide: true,
        },
      ];
    },
    details() {
      if (!this.result) {
        return [
          { key: "currentTier", value: "--" },
          { key: "nextTier", value: "--" },
          { key: "targetCooldown", value: "--" },
        ];
      }

      return [
        {
          key: "currentTier",
          value: this.t("results.tickValue", this.result.tickCount),
        },
        {
          key: "nextTier",
          value: this.result.nextTickCount ? this.t("results.tickValue", this.result.nextTickCount) : this.t("results.none"),
        },
        {
          key: "targetCooldown",
          value: this.result.targetCooldown === null ? this.t("results.none") : this.formatters.seconds(this.result.targetCooldown, 3),
        },
      ];
    },
  },
  template: `
    <section class="panel panel--results" aria-labelledby="results-title">
      <div class="panel__header">
        <p class="panel__eyebrow">{{ t("results.eyebrow") }}</p>
        <h2 id="results-title">{{ t("results.title") }}</h2>
      </div>

      <div class="status-banner" :class="banner.className">
        <p class="status-banner__title">{{ banner.title }}</p>
        <p class="status-banner__text">{{ banner.text }}</p>
      </div>

      <div class="stats-grid">
        <article
          v-for="card in cards"
          :key="card.key"
          class="stat-card"
          :class="{ 'stat-card--accent': card.accent, 'stat-card--wide': card.wide }"
        >
          <span>{{ t('results.cards.' + card.key) }}</span>
          <strong>{{ card.value }}</strong>
        </article>
      </div>

      <div class="breakdown-grid">
        <article v-for="detail in details" :key="detail.key" class="detail-card">
          <p class="detail-card__label">{{ t('results.details.' + detail.key) }}</p>
          <p class="detail-card__value">{{ detail.value }}</p>
        </article>
      </div>
    </section>
  `,
};
