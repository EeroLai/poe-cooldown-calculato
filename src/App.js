import { computed, reactive, watch } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
import { HeroSection } from "./components/HeroSection.js";
import { InputPanel } from "./components/InputPanel.js";
import { ResultsPanel } from "./components/ResultsPanel.js";
import { BreakpointTable } from "./components/BreakpointTable.js";
import { presets } from "./constants/presets.js";
import { messages } from "./i18n/messages.js";
import { calculate } from "./utils/calculator.js";
import { createFormatters } from "./utils/formatters.js";

const DEFAULT_FORM = {
  baseCooldown: "0.15",
  cdrPercent: "14",
  tickDuration: "0.033",
  safetyRatio: "0.98",
};

function readStoredLocale() {
  try {
    return localStorage.getItem("poe-calc-locale") || "zh-TW";
  } catch {
    return "zh-TW";
  }
}

function replaceTemplate(message, value) {
  if (typeof message !== "string") {
    return "";
  }

  if (value === undefined) {
    return message;
  }

  return message.replace("{value}", String(value));
}

export const App = {
  name: "App",
  components: {
    HeroSection,
    InputPanel,
    ResultsPanel,
    BreakpointTable,
  },
  setup() {
    const state = reactive({
      locale: readStoredLocale(),
      form: { ...DEFAULT_FORM },
    });

    const localeMessages = computed(() => messages[state.locale] ?? messages["zh-TW"]);

    const t = (path, templateValue) => {
      const keys = path.split(".");
      let message = localeMessages.value;

      for (const key of keys) {
        message = message?.[key];
      }

      return replaceTemplate(typeof message === "string" ? message : path, templateValue);
    };

    const formatters = computed(() => createFormatters(state.locale, t));

    const parsedInputs = computed(() => {
      const baseCooldown = Number.parseFloat(state.form.baseCooldown);
      const cdrPercent = Number.parseFloat(state.form.cdrPercent);
      const tickDuration = Number.parseFloat(state.form.tickDuration);
      const safetyRatio = Number.parseFloat(state.form.safetyRatio);

      if (
        !Number.isFinite(baseCooldown) ||
        !Number.isFinite(cdrPercent) ||
        !Number.isFinite(tickDuration) ||
        !Number.isFinite(safetyRatio) ||
        baseCooldown <= 0 ||
        cdrPercent < 0 ||
        tickDuration <= 0
      ) {
        return null;
      }

      return {
        baseCooldown,
        cdrPercent,
        tickDuration,
        safetyRatio,
      };
    });

    const result = computed(() => (parsedInputs.value ? calculate(parsedInputs.value) : null));

    const activePresetKey = computed(() => {
      const match = presets.find((preset) => preset.baseCooldown === state.form.baseCooldown);
      return match?.key ?? "custom";
    });

    function setLocale(locale) {
      state.locale = locale;
    }

    function applyPreset(baseCooldown) {
      if (!baseCooldown) {
        state.form.baseCooldown = "";
        return;
      }

      state.form.baseCooldown = baseCooldown;
    }

    function updateField(field, fieldValue) {
      state.form[field] = fieldValue;
    }

    watch(
      () => state.locale,
      (locale) => {
        document.documentElement.lang = locale === "zh-TW" ? "zh-Hant" : "en";

        try {
          localStorage.setItem("poe-calc-locale", locale);
        } catch {
          // Ignore storage failures in restricted environments.
        }
      },
      { immediate: true },
    );

    return {
      state,
      presets,
      result,
      activePresetKey,
      formatters,
      t,
      setLocale,
      applyPreset,
      updateField,
    };
  },
  template: `
    <div class="page-shell">
      <hero-section
        :locale="state.locale"
        :presets="presets"
        :active-preset-key="activePresetKey"
        :tick-duration="state.form.tickDuration"
        :safety-ratio="state.form.safetyRatio"
        :t="t"
        @set-locale="setLocale"
        @apply-preset="applyPreset"
      />

      <main class="dashboard">
        <section class="dashboard__primary">
          <input-panel
            :form="state.form"
            :t="t"
            @update-field="updateField"
          />

          <breakpoint-table
            :result="result"
            :t="t"
            :formatters="formatters"
          />
        </section>

        <aside class="dashboard__secondary">
          <results-panel
            :result="result"
            :t="t"
            :formatters="formatters"
          />
        </aside>
      </main>
    </div>
  `,
};
