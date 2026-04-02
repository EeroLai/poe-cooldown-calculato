export const ResultsPanel = {
  name: "ResultsPanel",
  props: {
    result: { type: Object, default: null },
    t: { type: Function, required: true },
    formatters: { type: Object, required: true },
  },
  methods: {
    tierValue(tierIndex) {
      return this.t("results.tierValue", tierIndex);
    },
    tickValue(tickCount) {
      return this.t("results.tickValue", tickCount);
    },
    tierTickValue(tierIndex, tickCount) {
      return `${this.tierValue(tierIndex)} / ${this.tickValue(tickCount)}`;
    },
  },
  computed: {
    cards() {
      if (!this.result) {
        return [
          { key: "theoreticalCooldown", value: "--" },
          { key: "tickCount", value: "--" },
          { key: "actualCooldown", value: "--" },
          { key: "maxAps", value: "--" },
          { key: "safeAps", value: "--" },
          { key: "attackTime", value: "--" },
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
        },
      ];
    },
    details() {
      if (!this.result) {
        return [
          { key: "currentTier", value: "--" },
          { key: "requiredCdr", value: "--" },
          { key: "nextTierAps", value: "--" },
        ];
      }

      return [
        {
          key: "currentTier",
          value: this.tierTickValue(this.result.currentTierIndex, this.result.tickCount),
        },
        {
          key: "requiredCdr",
          value:
            this.result.requiredCdrPercent === null
              ? this.t("results.noShorterTick")
              : this.formatters.percent(this.result.requiredCdrPercent),
        },
        {
          key: "nextTierAps",
          value: this.result.nextTierMaxAps === null ? this.t("results.noNextTier") : this.formatters.aps(this.result.nextTierMaxAps),
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

      <div class="result-stage-grid">
        <article v-for="detail in details" :key="detail.key" class="result-stage-card">
          <p class="detail-card__label">{{ t('results.details.' + detail.key) }}</p>
          <p class="detail-card__value">{{ detail.value }}</p>
        </article>
      </div>

      <div class="stats-grid">
        <article
          v-for="card in cards"
          :key="card.key"
          class="stat-card"
          :class="{ 'stat-card--accent': card.accent }"
        >
          <span>{{ t('results.cards.' + card.key) }}</span>
          <strong>{{ card.value }}</strong>
        </article>
      </div>
    </section>
  `,
};
