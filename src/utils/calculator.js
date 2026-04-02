const EPSILON = 1e-9;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const getTierIndex = (maxBreakpointTick, tickCount) => maxBreakpointTick - tickCount + 1;

function calculateBreakpoint(baseCooldown, tickDuration, maxBreakpointTick, tickCount) {
  const actualCooldown = tickCount * tickDuration;
  const requiredCdr = Math.max(0, (baseCooldown / actualCooldown - 1) * 100);
  const maxAps = 1 / actualCooldown;

  return {
    tierIndex: getTierIndex(maxBreakpointTick, tickCount),
    tickCount,
    actualCooldown,
    requiredCdr,
    maxAps,
  };
}

export function calculate(values) {
  const baseCooldown = values.baseCooldown;
  const cdrPercent = values.cdrPercent;
  const tickDuration = values.tickDuration;
  const safetyRatio = clamp(values.safetyRatio, 0.5, 1);
  const cdr = cdrPercent / 100;
  const theoreticalCooldown = baseCooldown / (1 + cdr);
  const tickCount = Math.max(1, Math.ceil(theoreticalCooldown / tickDuration - EPSILON));
  const actualCooldown = tickCount * tickDuration;
  const diluted = actualCooldown - theoreticalCooldown > EPSILON;
  const nextTickCount = tickCount > 1 ? tickCount - 1 : null;
  const targetCooldown = nextTickCount ? nextTickCount * tickDuration : null;
  const requiredCdrPercent = nextTickCount
    ? Math.max(0, (baseCooldown / targetCooldown - 1) * 100)
    : null;
  const nextTierMaxAps = targetCooldown === null ? null : 1 / targetCooldown;
  const maxAps = 1 / actualCooldown;
  const safeAps = maxAps * safetyRatio;
  const bestAttackTime = actualCooldown;
  const safeAttackTime = 1 / safeAps;
  const maxBreakpointTick = Math.max(1, Math.ceil(baseCooldown / tickDuration));
  const breakpoints = Array.from({ length: maxBreakpointTick }, (_, index) =>
    calculateBreakpoint(baseCooldown, tickDuration, maxBreakpointTick, maxBreakpointTick - index),
  );
  const currentTierIndex = getTierIndex(maxBreakpointTick, tickCount);
  const nextTierIndex = nextTickCount ? getTierIndex(maxBreakpointTick, nextTickCount) : null;

  return {
    baseCooldown,
    cdrPercent,
    tickDuration,
    safetyRatio,
    theoreticalCooldown,
    tickCount,
    actualCooldown,
    diluted,
    nextTickCount,
    targetCooldown,
    requiredCdrPercent,
    nextTierMaxAps,
    maxAps,
    safeAps,
    bestAttackTime,
    safeAttackTime,
    currentTierIndex,
    nextTierIndex,
    maxBreakpointTick,
    breakpoints,
  };
}
