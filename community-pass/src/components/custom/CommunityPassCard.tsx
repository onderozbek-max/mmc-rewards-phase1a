import * as React from "react";
import { Card, CardHeader, CardContent, CardActions } from "../../components/Card";
import { Body } from "../../components/Text";
import { ProgressIndicator } from "../../components/ProgressIndicator";
import { Button } from "../../components/Button";
import { formatPoints, type CommunityPassProgress } from "../../utils/communityPassProgress";

export interface CommunityPassCardProps {
  progress: CommunityPassProgress;
  onView: () => void;
}

/**
 * Compact Community Pass entry on Community Home. Answers "what are my
 * points for, and how close am I" at a glance without becoming the loudest
 * thing on the page — Home stays an activities/participation surface first.
 */
export function CommunityPassCard({ progress, onView }: CommunityPassCardProps) {
  const { lifetimePoints, nextMilestone, pointsRemaining, intervalFloor, intervalCeiling } = progress;
  const intervalValue = lifetimePoints - intervalFloor;
  const intervalMax = Math.max(1, intervalCeiling - intervalFloor);

  return (
    <Card>
      <CardHeader title="Community Pass" headingLevel="h3" />
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, color: "var(--ld-semantic-color-text)" }}>
              {formatPoints(lifetimePoints)}
            </span>
            <span style={{ fontSize: 15, color: "var(--ld-semantic-color-text-subtle)" }}>lifetime points</span>
          </div>

          {nextMilestone ? (
            <>
              <ProgressIndicator
                value={intervalValue}
                max={intervalMax}
                label="Progress toward your next benefit"
                valueLabel={`${formatPoints(lifetimePoints)} pts`}
              />
              <Body UNSAFE_style={{ margin: 0, color: "var(--ld-semantic-color-text-subtle)" }}>
                {formatPoints(pointsRemaining)} points until your next benefit
                <br />
                Next benefit at {formatPoints(nextMilestone.points)} points
              </Body>
            </>
          ) : (
            <Body UNSAFE_style={{ margin: 0, color: "var(--ld-semantic-color-text-subtle)" }}>
              You've reached every benefit milestone we've defined so far.
            </Body>
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button variant="secondary" size="medium" onClick={onView}>
          View Community Pass
        </Button>
      </CardActions>
    </Card>
  );
}
