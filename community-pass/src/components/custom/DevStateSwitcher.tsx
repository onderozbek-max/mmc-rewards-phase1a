import * as React from "react";
import { Button } from "../../components/Button";
import { DEFAULT_MEMBER_STATE_ID, MEMBER_STATES, type MemberStateId } from "../../data/communityPassData";
import { useMemberStateId, setMemberStateId } from "../../utils/appState";

/**
 * Named milestone-boundary scenarios for deterministic QA/demo — Product,
 * Design, Engineering, and stakeholders should be able to land on "just
 * below 250" or "just past 250" without hunting through opaque state
 * letters or completing an unrealistic number of mock activities. Each maps
 * onto an existing representative member state (no new state machinery,
 * no change to point economics) — this is a labeling/entry-point layer on
 * top of the existing dev-state architecture.
 */
interface Scenario {
  key: string;
  label: string;
  points: number;
  stateId: MemberStateId;
}

const SCENARIOS: Scenario[] = [
  { key: "normal", label: "Normal Progression", points: 180, stateId: "B" },
  { key: "near", label: "Near Milestone", points: 240, stateId: "C" },
  { key: "achieved", label: "Milestone Achieved", points: 270, stateId: "D" },
];

/** Secondary states, kept for architecture/QA testing beyond the three named scenarios. */
const OTHER_STATE_ORDER: MemberStateId[] = ["A", "E"];

/**
 * Design-review-only member-state switcher. NOT part of the member
 * experience — visible only with `?dev=1` in the URL, so it's trivial to
 * hide for a stakeholder demo (just drop the query param) and impossible
 * for a member to stumble into.
 */
export function DevStateSwitcher() {
  const [visible, setVisible] = React.useState(false);
  const current = useMemberStateId();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setVisible(params.get("dev") === "1");
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Developer state switcher (not part of the member experience)"
      style={{
        position: "fixed",
        top: 8,
        right: 8,
        zIndex: 1000,
        background: "rgba(21,31,41,0.92)",
        borderRadius: 10,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        maxWidth: 200,
      }}
    >
      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "0 4px" }}>
        DEV — SCENARIOS
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {SCENARIOS.map((scenario) => (
          <Button
            key={scenario.key}
            size="small"
            variant={current === scenario.stateId ? "primary" : "tertiary"}
            onClick={() => setMemberStateId(scenario.stateId)}
          >
            {scenario.label} ({scenario.points})
          </Button>
        ))}
        <Button size="small" variant="tertiary" onClick={() => setMemberStateId(DEFAULT_MEMBER_STATE_ID)}>
          Reset
        </Button>
      </div>

      <span style={{ color: "#a7b0b9", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "0 4px" }}>
        OTHER TEST STATES
      </span>
      <div style={{ display: "flex", gap: 4 }}>
        {OTHER_STATE_ORDER.map((id) => (
          <Button
            key={id}
            size="small"
            variant={current === id ? "primary" : "tertiary"}
            onClick={() => setMemberStateId(id)}
          >
            {id}
          </Button>
        ))}
      </div>

      <span style={{ color: "#cfd6dc", fontSize: 10, padding: "0 4px" }}>
        {MEMBER_STATES[current].devLabel}
      </span>
    </div>
  );
}
