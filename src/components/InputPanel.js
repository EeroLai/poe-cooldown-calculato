export const InputPanel = {
  name: "InputPanel",
  props: {
    form: { type: Object, required: true },
    t: { type: Function, required: true },
  },
  emits: ["update-field"],
  template: `
    <section class="panel panel--form" aria-labelledby="input-title">
      <div class="panel__header">
        <p class="panel__eyebrow">{{ t("input.eyebrow") }}</p>
        <h2 id="input-title">{{ t("input.title") }}</h2>
      </div>

      <form class="form-grid" novalidate>
        <label class="field">
          <span class="field__label">{{ t("input.fields.baseCooldown.label") }}</span>
          <div class="field__control">
            <input
              :value="form.baseCooldown"
              type="number"
              inputmode="decimal"
              min="0.001"
              step="0.001"
              @input="$emit('update-field', 'baseCooldown', $event.target.value)"
            />
            <span class="field__unit">{{ t("units.secondsShort") }}</span>
          </div>
          <small>{{ t("input.fields.baseCooldown.hint") }}</small>
        </label>

        <label class="field">
          <span class="field__label">{{ t("input.fields.cdr.label") }}</span>
          <div class="field__control">
            <input
              :value="form.cdrPercent"
              type="number"
              inputmode="decimal"
              min="0"
              step="0.01"
              @input="$emit('update-field', 'cdrPercent', $event.target.value)"
            />
            <span class="field__unit">%</span>
          </div>
          <small>{{ t("input.fields.cdr.hint") }}</small>
        </label>

        <label class="field">
          <span class="field__label">{{ t("input.fields.tickDuration.label") }}</span>
          <div class="field__control">
            <input
              :value="form.tickDuration"
              type="number"
              inputmode="decimal"
              min="0.001"
              step="0.001"
              @input="$emit('update-field', 'tickDuration', $event.target.value)"
            />
            <span class="field__unit">{{ t("units.secondsShort") }}</span>
          </div>
          <small>{{ t("input.fields.tickDuration.hint") }}</small>
        </label>

        <label class="field">
          <span class="field__label">{{ t("input.fields.safetyRatio.label") }}</span>
          <div class="field__control">
            <input
              :value="form.safetyRatio"
              type="number"
              inputmode="decimal"
              min="0.5"
              max="1"
              step="0.001"
              @input="$emit('update-field', 'safetyRatio', $event.target.value)"
            />
            <span class="field__unit">{{ t("input.fields.safetyRatio.unit") }}</span>
          </div>
          <small>{{ t("input.fields.safetyRatio.hint") }}</small>
        </label>
      </form>
    </section>
  `,
};
