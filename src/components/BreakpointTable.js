export const BreakpointTable = {
  name: "BreakpointTable",
  props: {
    result: { type: Object, default: null },
    t: { type: Function, required: true },
    formatters: { type: Object, required: true },
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
              <th>{{ t("table.columns.tick") }}</th>
              <th>{{ t("table.columns.actualCooldown") }}</th>
              <th>{{ t("table.columns.requiredCdr") }}</th>
              <th>{{ t("table.columns.maxAps") }}</th>
              <th>{{ t("table.columns.status") }}</th>
            </tr>
          </thead>
          <tbody v-if="rows.length">
            <tr v-for="row in rows" :key="row.tickCount">
              <td>{{ row.tickCount }}</td>
              <td>{{ formatters.seconds(row.actualCooldown, 3) }}</td>
              <td>{{ formatters.percent(row.requiredCdr) }}</td>
              <td>{{ formatters.aps(row.maxAps) }}</td>
              <td><span class="row-tag" :class="row.tagClass">{{ row.tagText }}</span></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="table-placeholder">{{ t("table.placeholder") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
};
