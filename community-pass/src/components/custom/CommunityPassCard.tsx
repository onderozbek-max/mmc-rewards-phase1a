import * as React from "react";
import { Body, Heading } from "../../components/Text";
import { ChevronRightIcon, CheckCircleIcon } from "../../components/Icons/Icons";
import { MilestoneProgressBar } from "./MilestoneProgressBar";
import { formatPoints, type CommunityPassProgress } from "../../utils/communityPassProgress";

export interface CommunityPassCardProps {
  progress: CommunityPassProgress;
  onView: () => void;
}

/**
 * Compact Community Pass entry point on Community Home.
 *
 * This is deliberately an ORIENTATION + ENTRY POINT, not a rewards
 * dashboard: enough for a member to glance and know their lifetime points
 * and distance to the next benefit, then tap through to Community Pass for
 * the full story. Open Activities — the primary reason members come to
 * Home — should read as materially more prominent than this.
 */
export function CommunityPassCard({ progress, onView }: CommunityPassCardProps) {
  const { lifetimePoints, firstBenefit, firstBenefitUnlocked, pointsRemainingToFirstBenefit } = progress;

  return (
    <button
      type="button"
      onClick={onView}
      aria-label={
        firstBenefitUnlocked
          ? `Community Pass — ${formatPoints(lifetimePoints)} lifetime points, ${firstBenefit.benefit} unlocked`
          : `Community Pass — ${formatPoints(lifetimePoints)} lifetime points, ${formatPoints(pointsRemainingToFirstBenefit)} points until your next benefit`
      }
      style={{
        width: "100%",
        textAlign: "left",
        background: "var(--ld-semantic-color-surface, #ffffff)",
        border: "1px solid var(--ld-semantic-color-separator, #e0e8ee)",
        borderRadius: 12,
        padding: "14px 16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div aria-hidden style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Heading as="h3" UNSAFE_style={{ margin: 0, fontSize: 15 }}>
          Community Pass
        </Heading>
        <ChevronRightIcon decorative style={{ color: "var(--ld-semantic-color-text-subtle)" }} />
      </div>

      <div aria-hidden style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Body as="div" UNSAFE_style={{ margin: 0, fontSize: 15 }}>
          <strong>{formatPoints(lifetimePoints)}</strong> lifetime points
        </Body>

        {!firstBenefitUnlocked ? (
          <>
            <MilestoneProgressBar min={0} max={firstBenefit.points} value={lifetimePoints} a11yLabel="" />
            <Body as="div" UNSAFE_style={{ margin: 0, fontSize: 13, color: "var(--ld-semantic-color-text-subtle)" }}>
              {formatPoints(pointsRemainingToFirstBenefit)} points until your next benefit
            </Body>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <CheckCircleIcon decorative size="small" style={{ color: "var(--ld-semantic-color-text-positive)" }} />
            <Body as="div" UNSAFE_style={{ margin: 0, fontSize: 13, color: "var(--ld-semantic-color-text-subtle)" }}>
              {firstBenefit.benefit} unlocked
            </Body>
          </div>
        )}
      </div>
    </button>
  );
}
