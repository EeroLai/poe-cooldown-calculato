export const messages = {
  "zh-TW": {
    hero: {
      eyebrow: "Path of Exile 工具",
      title: "Cooldown / Tick / APS 一頁算清楚",
      description:
        "輸入技能冷卻與 CDR，立刻看出你現在吃到哪個 tick 檔位、離下一檔還差多少，以及這個檔位下該把攻速壓在哪。",
      presetLabel: "快速模式",
      languageLabel: "語言切換",
      presets: {
        coc: "CoC 0.15s",
        common: "常見 0.25s",
        skill2: "一般技能 2s",
        custom: "自訂",
      },
      pills: {
        tick: "Tick",
        safeAps: "Safe APS",
        safeApsValue: "預設 ",
        live: "即時更新",
        liveValue: "無需送出",
      },
    },
    input: {
      eyebrow: "輸入區",
      title: "設定參數",
      fields: {
        baseCooldown: {
          label: "原始冷卻時間",
          hint: "常見值：0.15、0.25、0.8、2、6",
        },
        cdr: {
          label: "冷卻恢復速度",
          hint: "例如：14、52、76、108、124",
        },
        tickDuration: {
          label: "Tick 長度",
          hint: "預設使用 POE 常見 tick 長度 0.033 秒",
        },
        safetyRatio: {
          label: "安全攻速比例",
          unit: "倍率",
          hint: "用來估算建議安全 APS，預設 0.98",
        },
      },
    },
    results: {
      eyebrow: "計算結果",
      title: "目前檔位分析",
      cards: {
        theoreticalCooldown: "理論冷卻",
        tickCount: "實際 Tick",
        actualCooldown: "實際冷卻",
        dilutionState: "Tick 稀釋",
        requiredCdr: "下一檔所需 CDR",
        cdrGap: "距離下一檔",
        maxAps: "最大 APS",
        safeAps: "安全 APS",
        attackTime: "建議 Attack Time",
      },
      details: {
        currentTier: "目前檔位",
        nextTier: "下一檔",
        targetCooldown: "下一檔目標冷卻",
      },
      tickValue: "{value} Tick",
      dilutedYes: "有，被 tick 稀釋",
      dilutedNo: "否，剛好命中檔位",
      noShorterTick: "已到最短 Tick",
      noNextTier: "無下一檔",
      alreadyReached: "已達成",
      none: "無",
    },
    status: {
      invalid: {
        title: "等待有效輸入",
        text: "請確認冷卻、CDR 與 tick 長度都是有效正數。",
      },
      onPoint: {
        title: "目前理論值已精準命中檔位",
        text: "你現在位於 {value} Tick，理論冷卻與實際冷卻幾乎一致，可以專注確認 APS 是否超線。",
      },
      ready: {
        title: "你的 CDR 已足夠進下一檔",
        text: "目前計算仍顯示在 {value} Tick，代表可能只差攻速或實戰條件設定，值得再對照角色配置。",
      },
      diluted: {
        title: "目前仍被 Tick 稀釋",
        text: "理論冷卻比實際生效更短，但尚未跨進下一檔。",
        textWithGap: "理論冷卻比實際生效更短，但尚未跨進下一檔。還差 {value} CDR。",
      },
    },
    table: {
      eyebrow: "檔位表",
      title: "Breakpoint Overview",
      columns: {
        tick: "Tick",
        actualCooldown: "實際冷卻",
        requiredCdr: "需要 CDR",
        maxAps: "最大 APS",
        status: "狀態",
      },
      placeholder: "請輸入有效數值以顯示檔位表。",
      states: {
        current: "目前檔位",
        next: "下一檔",
        ready: "已達成下一檔",
        cleared: "已可達",
        future: "未達成",
      },
      actions: {
        expand: "顯示完整檔位表",
        collapse: "收合檔位表",
      },
    },
    tips: {
      eyebrow: "說明",
      title: "判讀重點",
      items: {
        cdr: {
          title: "CDR 不是直接減秒",
          body: "冷卻恢復速度是提高恢復速率，所以公式是 base / (1 + cdr)，不是直接用秒數相減。",
        },
        tick: {
          title: "伺服器只認 Tick",
          body: "即使理論冷卻更短，只要沒進下一個 tick 檔位，實際生效仍會被向上取整。",
        },
        aps: {
          title: "APS 不是越高越好",
          body: "超過該檔位上限時，觸發流可能出現空揮或空觸發，通常建議壓在略低於上限的位置。",
        },
      },
    },
    units: {
      seconds: "秒",
      secondsShort: "秒",
    },
  },
  en: {
    hero: {
      eyebrow: "Path of Exile Tool",
      title: "See Cooldown, Tick, and APS at a Glance",
      description:
        "Enter your base cooldown and CDR to see your current tick breakpoint, how far you are from the next tier, and where your attack speed should stay.",
      presetLabel: "Quick presets",
      languageLabel: "Language switcher",
      presets: {
        coc: "CoC 0.15s",
        common: "Common 0.25s",
        skill2: "Skill 2s",
        custom: "Custom",
      },
      pills: {
        tick: "Tick",
        safeAps: "Safe APS",
        safeApsValue: "Default ",
        live: "Live update",
        liveValue: "No submit needed",
      },
    },
    input: {
      eyebrow: "Inputs",
      title: "Parameters",
      fields: {
        baseCooldown: {
          label: "Base cooldown",
          hint: "Common values: 0.15, 0.25, 0.8, 2, 6",
        },
        cdr: {
          label: "Cooldown recovery rate",
          hint: "Examples: 14, 52, 76, 108, 124",
        },
        tickDuration: {
          label: "Tick duration",
          hint: "Default is the common POE tick duration: 0.033 seconds",
        },
        safetyRatio: {
          label: "Safe APS ratio",
          unit: "ratio",
          hint: "Used to estimate a safer APS ceiling. Default: 0.98",
        },
      },
    },
    results: {
      eyebrow: "Results",
      title: "Current Breakpoint Analysis",
      cards: {
        theoreticalCooldown: "Theoretical cooldown",
        tickCount: "Actual ticks",
        actualCooldown: "Actual cooldown",
        dilutionState: "Tick dilution",
        requiredCdr: "CDR needed for next tier",
        cdrGap: "Gap to next tier",
        maxAps: "Max APS",
        safeAps: "Safe APS",
        attackTime: "Suggested attack time",
      },
      details: {
        currentTier: "Current tier",
        nextTier: "Next tier",
        targetCooldown: "Next tier target cooldown",
      },
      tickValue: "{value} Tick",
      dilutedYes: "Yes, diluted by server ticks",
      dilutedNo: "No, it lands on the breakpoint",
      noShorterTick: "Already at the shortest tick",
      noNextTier: "No next tier",
      alreadyReached: "Reached",
      none: "None",
    },
    status: {
      invalid: {
        title: "Waiting for valid input",
        text: "Please make sure cooldown, CDR, and tick duration are all valid positive numbers.",
      },
      onPoint: {
        title: "Your theoretical cooldown matches the breakpoint",
        text: "You are currently at {value} Tick, and the theoretical cooldown is effectively aligned with the actual cooldown. You can now focus on staying under the APS cap.",
      },
      ready: {
        title: "Your CDR is already enough for the next tier",
        text: "The calculator still shows {value} Tick, so you may only be limited by APS or practical setup details.",
      },
      diluted: {
        title: "Your cooldown is still diluted by ticks",
        text: "Your theoretical cooldown is shorter than the actual effective cooldown, but it still does not cross into the next breakpoint.",
        textWithGap:
          "Your theoretical cooldown is shorter than the actual effective cooldown, but it still does not cross into the next breakpoint. You are short by {value} CDR.",
      },
    },
    table: {
      eyebrow: "Breakpoint Table",
      title: "Breakpoint Overview",
      columns: {
        tick: "Tick",
        actualCooldown: "Actual cooldown",
        requiredCdr: "Required CDR",
        maxAps: "Max APS",
        status: "Status",
      },
      placeholder: "Enter valid values to show the breakpoint table.",
      states: {
        current: "Current",
        next: "Next",
        ready: "Ready for next",
        cleared: "Reachable",
        future: "Not reached",
      },
      actions: {
        expand: "Show full table",
        collapse: "Collapse table",
      },
    },
    tips: {
      eyebrow: "Notes",
      title: "How to Read It",
      items: {
        cdr: {
          title: "CDR does not subtract seconds directly",
          body: "Cooldown recovery rate increases recovery speed, so the formula is base / (1 + cdr), not a direct subtraction from the cooldown.",
        },
        tick: {
          title: "The server only cares about ticks",
          body: "Even if your theoretical cooldown is shorter, the real cooldown is rounded up unless you cross into the next tick breakpoint.",
        },
        aps: {
          title: "More APS is not always better",
          body: "Going above the cap for your breakpoint can cause missed triggers or empty attacks in trigger setups, so staying a little below the limit is usually safer.",
        },
      },
    },
    units: {
      seconds: "seconds",
      secondsShort: "s",
    },
  },
};
