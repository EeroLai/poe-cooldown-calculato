export const BreakpointTable = {
  name: "BreakpointTable",
  props: {
    result: { type: Object, default: null },
    t: { type: Function, required: true },
    formatters: { type: Object, required: true },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  watch: {
    result() {
      this.isExpanded = false;
    },
  },
  computed: {
    rows() {
      if (!this.result) {
        return [];
      }

      return this.result.breakpoints.map((row) => {
        let tagClass = "is-future";
        let tagText = this.t("table.states.future");

        if (row.tickCount === this.result.tickCount) {
          tagClass = "is-current";
          tagText = this.t("table.states.current");
        } else if (this.result.nextTickCount && row.tickCount === this.result.nextTickCount) {
          tagClass = "is-next";
          tagText =
            this.result.cdrPercent + 1e-9 >= row.requiredCdr
              ? this.t("table.states.ready")
              : this.t("table.states.next");
        } else if (this.result.cdrPercent + 1e-9 >= row.requiredCdr) {
          tagClass = "is-cleared";
          tagText = this.t("table.states.cleared");
        }

        return {
          ...row,
          tagClass,
          tagText,
        };
      });
    },
    visibleRows() {
      if (this.isExpanded || this.rows.length <= 8) {
        return this.rows;
      }

      const currentIndex = this.rows.findIndex((row) => row.tickCount === this.result.tickCount);
      const start = Math.max(0, Math.min(currentIndex - 3, this.rows.length - 8));

      return this.rows.slice(start, start + 8);
    },
  },
  template: `
    <section class="panel panel--table" aria-labelledby="table-title">
      <div class="panel__header">
        <p class="panel__eyebrow">{{ t("table.eyebrow") }}</p>
        <h2 id="table-title">{{ t("table.title") }}</h2>
      </div>

      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{{ t("table.columns.tier") }}</th>
              <th>{{ t("table.columns.tick") }}</th>
              <th>{{ t("table.columns.actualCooldown") }}</th>
              <th>{{ t("table.columns.requiredCdr") }}</th>
              <th>{{ t("table.columns.maxAps") }}</th>
              <th>{{ t("table.columns.status") }}</th>
            </tr>
          </thead>
          <tbody v-if="visibleRows.length">
            <tr v-for="row in visibleRows" :key="row.tickCount">
              <td>{{ t("results.tierValue", row.tierIndex) }}</td>
              <td>{{ row.tickCount }}</td>
              <td>{{ formatters.seconds(row.actualCooldown, 3) }}</td>
              <td>{{ formatters.percent(row.requiredCdr) }}</td>
              <td>{{ formatters.aps(row.maxAps) }}</td>
              <td><span class="row-tag" :class="row.tagClass">{{ row.tagText }}</span></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="table-placeholder">{{ t("table.placeholder") }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="rows.length > 8" class="panel__footer">
        <button type="button" class="ghost-button" @click="isExpanded = !isExpanded">
          {{ isExpanded ? t("table.actions.collapse") : t("table.actions.expand") }}
        </button>
      </div>
    </section>
  `,
};
