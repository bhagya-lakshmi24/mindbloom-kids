import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const title = "Privacy Policy — MindBloom ADHD Kids";
const description =
  "What information MindBloom collects from parents and children, why we collect it, and who can access it.";

export const Route = createFileRoute("/privacy")({
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
      eyebrow="Privacy"
      title="Privacy Policy"
      description="Plain-language explanation of the data MindBloom stores and how it is protected."
    >
      <p>
        MindBloom is used by parents and guardians on behalf of their children. We collect the
        smallest amount of information needed to run the activities and your account.
      </p>
      <div>
        <h2>What we collect</h2>
        <ul>
          <li>Parent account: email address and, optionally, your name.</li>
          <li>
            Child profile: a nickname (not a full legal name), an age group, an avatar emoji and
            activity preferences you choose.
          </li>
          <li>
            Activity data: which activities were completed, mood check-in emojis, routine ticks and
            badges earned.
          </li>
          <li>Consultation bookings: the contact details you enter when requesting a session.</li>
        </ul>
      </div>
      <div>
        <h2>What we do not collect</h2>
        <ul>
          <li>We do not ask children for their real name, school, address or photographs.</li>
          <li>We do not ask for medical records or diagnoses.</li>
          <li>There is no chat, messaging or public profile anywhere in MindBloom.</li>
        </ul>
      </div>
      <div>
        <h2>Who can access it</h2>
        <ul>
          <li>Only the signed-in parent account that created a child profile can read its data.</li>
          <li>
            Access is enforced by database row-level security rules, not only by the interface, so
            one family can never read another family's data.
          </li>
          <li>
            Administrators can see consultation bookings in order to schedule them; they do not have
            access to children's profiles, moods or activity history.
          </li>
        </ul>
      </div>
      <div>
        <h2>Deleting your data</h2>
        <p>
          A parent can delete any child profile at any time from the Parent Dashboard. Deleting a
          child profile permanently removes that child's activity history, mood check-ins, routines
          and badges.
        </p>
      </div>
      <div>
        <h2>Questions</h2>
        <p>
          Email hello@mindbloomadhd.com and we will respond. This policy describes our current
          practices; it is not a statement of certified compliance with any specific regulation.
        </p>
      </div>
    </LegalPage>
  ),
});