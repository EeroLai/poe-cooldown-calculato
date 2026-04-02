export const TipsPanel = {
  name: "TipsPanel",
  props: {
    t: { type: Function, required: true },
  },
  computed: {
    tips() {
      return ["cdr", "tick", "aps"];
    },
  },
  template: `
    <section class="panel panel--tips" aria-labelledby="tips-title">
      <div class="panel__header">
        <p class="panel__eyebrow">{{ t("tips.eyebrow") }}</p>
        <h2 id="tips-title">{{ t("tips.title") }}</h2>
      </div>

      <div class="tips-grid">
        <article v-for="tip in tips" :key="tip" class="tip-card">
          <h3>{{ t('tips.items.' + tip + '.title') }}</h3>
          <p>{{ t('tips.items.' + tip + '.body') }}</p>
        </article>
      </div>
    </section>
  `,
};
