function replaceTemplate(message, value) {
  if (typeof message !== "string") {
    return "";
  }

  if (value === undefined) {
    return message;
  }

  return message.replace("{value}", String(value));
}

export function createFormatters(locale, t) {
  const numberFormatter = (digits) =>
    new Intl.NumberFormat(locale === "zh-TW" ? "zh-Hant" : "en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    });

  return {
    t(path, value) {
      return replaceTemplate(t(path), value);
    },
    number(value, digits = 4) {
      if (!Number.isFinite(value)) {
        return "--";
      }

      return numberFormatter(digits).format(value);
    },
    seconds(value, digits = 4) {
      return `${this.number(value, digits)} ${t("units.secondsShort")}`;
    },
    percent(value, digits = 2) {
      return `${this.number(value, digits)}%`;
    },
    aps(value) {
      return this.number(value, 2);
    },
  };
}
