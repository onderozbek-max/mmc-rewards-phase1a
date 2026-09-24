import * as React from "react";
import { Page } from "../components/Page";
import { Container } from "../components/Container";
import { Heading, Body } from "../components/Text";
import { Card, CardContent } from "../components/Card";
import { Tag } from "../components/Tag";
import { Divider } from "../components/Divider";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { Button } from "../components/Button";
import { CheckCircleIcon, GiftIcon } from "../components/Icons/Icons";
import { ScreenHeader } from "../components/custom/ScreenHeader";
import { getCommunityPassProgress } from "../utils/communityPassProgress";
import { formatPoints } from "../utils/communityPassProgress";
import { navigateTo, useMemberStateId } from "../utils/appState";
import { getLifetimePoints, MILESTONES } from "../data/communityPassData";

export function CommunityPassPage() {
  const memberStateId = useMemberStateId();
  const lifetimePoints = getLifetimePoints(memberStateId);
  const progress = getCommunityPassProgress(lifetimePoints);
  const { nextMilestone, pointsRemaining, unlockedMilestones, intervalFloor, intervalCeiling } = progress;
  const intervalValue = lifetimePoints - intervalFloor;
  const intervalMax = Math.max(1, intervalCeiling - intervalFloor);

  return (
    <Page title="Community Pass" titleVisuallyHidden>
      <ScreenHeader title="Community Pass" onBack={() => navigateTo("home")} />

      <div style={{ paddingBottom: 40 }}>
        <Container>
          <div style={{ padding: "20px 16px 0" }}>
            <Heading as="h2" UNSAFE_style={{ margin: "0 0 8px", fontSize: 24 }}>
              Community Pass
            </Heading>
            <Body UNSAFE_style={{ margin: 0, color: "var(--ld-semantic-color-text-subtle)" }}>
              Take part in Community activities and earn points. Your lifetime points move you toward benefit
              milestones.
            </Body>
          </div>

          {/* Current state */}
          <div style={{ padding: "24px 16px 0" }}>
            <Heading as="h3" UNSAFE_style={{ margin: "0 0 12px", fontSize: 18 }}>
              Your progress
            </Heading>
            <Card>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{formatPoints(lifetimePoints)}</span>
                    <span style={{ fontSize: 15, color: "var(--ld-semantic-color-text-subtle)" }}>lifetime points</span>
                  </div>

                  {unlockedMilestones.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <Body UNSAFE_style={{ margin: 0, fontWeight: 700 }}>Already unlocked</Body>
                      {unlockedMilestones.map((m) => (
                        <div key={m.points} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleIcon decorative style={{ color: "var(--ld-semantic-color-text-positive)" }} />
                          <Body UNSAFE_style={{ margin: 0 }}>
                            At {formatPoints(m.points)} points — {m.benefit}
                          </Body>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {nextMilestone ? (
                    <>
                      <ProgressIndicator
                        value={intervalValue}
                        max={intervalMax}
                        label="Progress toward your next benefit"
                        valueLabel={`${formatPoints(lifetimePoints)} pts`}
                      />
                      <div>
                        <Body UNSAFE_style={{ margin: 0, fontWeight: 700 }}>
                          Next benefit: {nextMilestone.benefit}
                        </Body>
                        <Body UNSAFE_style={{ margin: "4px 0 0", color: "var(--ld-semantic-color-text-subtle)" }}>
                          At {formatPoints(nextMilestone.points)} points — {formatPoints(pointsRemaining)} points
                          remaining
                        </Body>
                      </div>
                    </>
                  ) : (
                    <Body UNSAFE_style={{ margin: 0, color: "var(--ld-semantic-color-text-subtle)" }}>
                      You've unlocked every benefit milestone we've defined so far.
                    </Body>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefit milestone journey */}
          <div style={{ padding: "24px 16px 0" }}>
            <Heading as="h3" UNSAFE_style={{ margin: "0 0 4px", fontSize: 18 }}>
              Benefit journey
            </Heading>
            <Body UNSAFE_style={{ margin: "0 0 12px", color: "var(--ld-semantic-color-text-subtle)" }}>
              As your lifetime points grow, more benefits become available.
            </Body>
            <Card>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {MILESTONES.map((m, i) => {
                    const isUnlocked = lifetimePoints >= m.points;
                    const isNext = nextMilestone?.points === m.points;
                    return (
                      <React.Fragment key={m.points}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0" }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: isUnlocked
                                ? "var(--ld-semantic-color-fill-positive-subtle)"
                                : "var(--ld-semantic-color-fill-subtle)",
                            }}
                          >
                            {isUnlocked ? (
                              <CheckCircleIcon decorative style={{ color: "var(--ld-semantic-color-text-positive)" }} />
                            ) : (
                              <GiftIcon decorative style={{ color: "var(--ld-semantic-color-text-subtle)" }} />
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <Body UNSAFE_style={{ margin: 0, fontWeight: 700 }}>
                                {formatPoints(m.points)} points
                              </Body>
                              {isUnlocked ? (
                                <Tag color="positive" size="small">
                                  Already unlocked
                                </Tag>
                              ) : isNext ? (
                                <Tag color="brand" size="small">
                                  Next benefit
                                </Tag>
                              ) : null}
                            </div>
                            <Body
                              UNSAFE_style={{
                                margin: "2px 0 0",
                                color: isUnlocked
                                  ? "var(--ld-semantic-color-text)"
                                  : "var(--ld-semantic-color-text-subtle)",
                              }}
                            >
                              {m.benefit}
                            </Body>
                          </div>
                        </div>
                        {i < MILESTONES.length - 1 ? <Divider /> : null}
                      </React.Fragment>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How points are earned */}
          <div style={{ padding: "24px 16px 0" }}>
            <Heading as="h3" UNSAFE_style={{ margin: "0 0 8px", fontSize: 18 }}>
              How points are earned
            </Heading>
            <Body UNSAFE_style={{ margin: "0 0 12px", color: "var(--ld-semantic-color-text-subtle)" }}>
              Eligible Community activities show how many points you can earn before you start. Not every activity
              is points-eligible.
            </Body>
            <Button variant="secondary" size="medium" onClick={() => navigateTo("home")}>
              See open activities
            </Button>
          </div>
        </Container>
      </div>
    </Page>
  );
}
