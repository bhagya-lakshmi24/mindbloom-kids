import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const title = "Parent Consent — MindBloom ADHD Kids";
const description =
  "What a parent or guardian is agreeing to when creating a child profile on MindBloom.";

export const Route = createFileRoute("/parent-consent")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Consent"
      title="Parent / Guardian Consent"
      description="Before a child profile is created, we ask you to confirm a few things."
    >
      <div>
        <h2>You confirm that</h2>
        <ul>
          <li>You are the child's parent, guardian or an authorised caregiver.</li>
          <li>You are creating and managing this profile on the child's behalf.</li>
          <li>You agree to the information described below being stored in your account.</li>
        </ul>
      </div>
      <div>
        <h2>What is collected for a child profile</h2>
        <ul>
          <li>A nickname you choose (please avoid a full legal name).</li>
          <li>An age group, used only to pick suitable activities.</li>
          <li>An avatar emoji and activity preferences.</li>
          <li>
            Activity results, mood check-ins, routine ticks and badges created while using the app.
          </li>
        </ul>
      </div>
      <div>
        <h2>Why</h2>
        <p>
          This information lets the child dashboard show the right activities and lets you follow
          progress over time. Nothing more is collected, and nothing is shown publicly.
        </p>
      </div>
      <div>
        <h2>Your control</h2>
        <p>
          You may withdraw consent at any time by deleting the child profile from your dashboard,
          which removes the linked records. See the{" "}
          <Link to="/privacy" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/child-safety" className="underline">
            Child Safety
          </Link>{" "}
          pages for details.
        </p>
      </div>
      <div>
        <h2>A note on regulations</h2>
        <p>
          We ask for consent because it is the right thing to do for a children's product. We do not
          claim verified compliance with COPPA, GDPR-K, India's DPDP Act or any other regulation.
        </p>
      </div>
    </LegalPage>
  ),
});