import * as React from "react";
import { Card } from "../../components/Card";
import { Heading, Body } from "../../components/Text";
import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { CheckCircleIcon } from "../../components/Icons/Icons";
import { Illustration } from "../../utils/Illustration";
import { formatDate } from "../../utils/communityPassProgress";
import type { OpenActivity } from "../../data/communityPassData";

export interface ActivityCardProps {
  activity: OpenActivity;
  completed: boolean;
  onStart: () => void;
}

export function ActivityCard({ activity, completed, onStart }: ActivityCardProps) {
  return (
    <Card>
      <div style={{ display: "flex", gap: 16, padding: 16, alignItems: "flex-start" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <Heading as="h4" UNSAFE_style={{ margin: 0, fontSize: 16 }}>
            {activity.title}
          </Heading>
          <Body UNSAFE_style={{ margin: 0, color: "var(--ld-semantic-color-text-subtle)" }}>{activity.description}</Body>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Tag color="brand" size="small">
              {activity.points} points
            </Tag>
            <Body UNSAFE_style={{ margin: 0, fontSize: 13, color: "var(--ld-semantic-color-text-subtlest)" }}>
              Ends {formatDate(activity.endDate)}
            </Body>
          </div>
          <div style={{ marginTop: 4 }}>
            {completed ? (
              <Tag color="positive" leading={<CheckCircleIcon decorative />}>
                Completed
              </Tag>
            ) : (
              <Button variant="primary" size="medium" onClick={onStart}>
                Start
              </Button>
            )}
          </div>
        </div>

        <div
          aria-hidden
          style={{
            width: 84,
            height: 84,
            flexShrink: 0,
            borderRadius: 12,
            background: "var(--ld-semantic-color-fill-brand-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Illustration type="mono-small" name={activity.illustrationName as never} size={44} title="" />
        </div>
      </div>
    </Card>
  );
}
