import * as React from "react";
import { Heading, Body } from "../../components/Text";
import "./StakeholderShell.css";

interface Phase {
  id: string;
  name: string;
  tag?: string;
  description: string;
}

const PHASES: Phase[] = [
  { id: "1A", name: "Progression Foundation", tag: "CURRENT", description: "Points truthfully update the member's Community Pass state and unlock the first real benefit." },
  { id: "1B", name: "Progress Motivation", tag: "NEXT / EXPERIMENT", description: "Ways to make progress — motivational architecture for how members discover and pursue points." },
  { id: "1C", name: "Earn & Progress Feedback", description: "Explicit \"+30 points\" and progress-delta feedback at the moment of completion." },
  { id: "1D", name: "Milestone Achievement Experience", description: "Celebration and achievement-moment treatment when a milestone is reached." },
  { id: "1E", name: "Full Milestone & Benefit Expansion", description: "1,000 and 3,000 become real, operational benefits." },
  { id: "1F", name: "Historical Reconciliation & Full Population Rollout", description: "Migrating existing member history and rolling out to the full population." },
];

/**
 * Stakeholder review shell — a desktop/laptop-only explanation panel, shown
 * OUTSIDE the simulated mobile product (see App.tsx), so a reviewer opening
 * this prototype on a laptop understands what Phase 1A is and isn't before
 * they start tapping around the phone frame above. Hidden entirely on
 * phone-sized widths via StakeholderShell.css — MMC is a mobile app screen,
 * never a desktop site, so nothing here should ever be mistaken for member
 * experience.
 */
export function StakeholderShell() {
  return (
    <div
      className="mmc-stakeholder-shell"
      role="complementary"
      aria-label="Phase 1A stakeholder review notes"
      style={{
        width: "100%",
        maxWidth: 720,
        margin: "32px auto 48px",
        padding: "28px 32px",
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <Body as="div" UNSAFE_style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "var(--ld-semantic-color-text-subtle)" }}>
        PHASE 1A — PROGRESSION FOUNDATION
      </Body>
      <Heading as="h2" UNSAFE_style={{ margin: "0 0 20px", fontSize: 22 }}>
        Stakeholder review notes
      </Heading>

      <Heading as="h3" UNSAFE_style={{ margin: "0 0 8px", fontSize: 15 }}>
        What this establishes
      </Heading>
      <Body as="div" UNSAFE_style={{ margin: "0 0 20px", color: "var(--ld-semantic-color-text-subtle)" }}>
        The points members already earn in MMC now have a working, truthful purpose. Completing an eligible
        Community activity updates the member's real lifetime-point total, and the first benefit milestone
        (250 points) genuinely unlocks — not just in copy, in the running product.
      </Body>

      <Heading as="h3" UNSAFE_style={{ margin: "0 0 8px", fontSize: 15 }}>
        Foundational product truth
      </Heading>
      <Body as="div" UNSAFE_style={{ margin: "0 0 20px", color: "var(--ld-semantic-color-text-subtle)" }}>
        Example: a member at 240 lifetime points completes a 30-point eligible activity. Their lifetime total
        truthfully becomes 270. Because 270 is at or above the 250 threshold, What's New and Member Favorites
        become genuinely available to that member — no backend, but no fiction either. This happens with no
        celebration, no "+30 points" message, and no achievement moment. The member simply returns to a
        product that now reflects the truth.
      </Body>

      <Heading as="h3" UNSAFE_style={{ margin: "0 0 8px", fontSize: 15 }}>
        What is not built yet
      </Heading>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        {PHASES.slice(1).map((phase) => (
          <Body key={phase.id} as="div" UNSAFE_style={{ margin: 0, color: "var(--ld-semantic-color-text-subtle)" }}>
            <strong style={{ color: "var(--ld-semantic-color-text)" }}>
              {phase.id} — {phase.name}:
            </strong>{" "}
            {phase.description}
          </Body>
        ))}
      </div>

      <Heading as="h3" UNSAFE_style={{ margin: "0 0 12px", fontSize: 15 }}>
        Phase progression
      </Heading>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
        {PHASES.map((phase, i) => (
          <React.Fragment key={phase.id}>
            <div
              style={{
                border: `1px solid ${phase.tag === "CURRENT" ? "var(--wcp-semantic-color-surface-overlay-brand-bold, #283645)" : "var(--ld-semantic-color-separator, #d8dee3)"}`,
                background: phase.tag === "CURRENT" ? "var(--wcp-semantic-color-surface-overlay-brand-bold, #283645)" : "transparent",
                borderRadius: 8,
                padding: "8px 10px",
                minWidth: 128,
              }}
            >
              <Body
                as="div"
                UNSAFE_style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: phase.tag === "CURRENT" ? "#fff" : "var(--ld-semantic-color-text)",
                }}
              >
                {phase.id} {phase.name}
              </Body>
              {phase.tag ? (
                <Body
                  as="div"
                  UNSAFE_style={{
                    margin: "2px 0 0",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: phase.tag === "CURRENT" ? "rgba(255,255,255,0.8)" : "var(--ld-semantic-color-text-subtle)",
                  }}
                >
                  [{phase.tag}]
                </Body>
              ) : null}
            </div>
            {i < PHASES.length - 1 ? (
              <span aria-hidden style={{ color: "var(--ld-semantic-color-text-subtle)" }}>
                →
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
