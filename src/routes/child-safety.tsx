import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const title = "Child Safety & Trust — MindBloom ADHD Kids";
const description =
  "How MindBloom protects children: parent-controlled accounts, no chat, minimal data and database-level access rules.";

export const Route = createFileRoute("/child-safety")({
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
      eyebrow="Safety & Trust"
      title="Child Safety at MindBloom"
      description="Designed so that parents stay in control and children stay private."
    >
      <div>
        <h2>Parents control the account</h2>
        <p>
          Every MindBloom account belongs to a parent or guardian. Child profiles live inside that
          account. Children can play activities and check in on their mood, but they cannot change
          account settings, book consultations, delete records or see anything belonging to another
          child.
        </p>
      </div>
      <div>
        <h2>Protected by authentication and authorisation</h2>
        <ul>
          <li>Sign-in is required before any child data can be read or written.</li>
          <li>
            Row-level security rules in the database restrict every row to the parent who owns it —
            the browser cannot bypass them.
          </li>
          <li>Roles are stored separately from profiles, so permissions can't be self-edited.</li>
          <li>Administrators can manage bookings, not children's private records.</li>
        </ul>
      </div>
      <div>
        <h2>Only what we need</h2>
        <p>
          A child profile stores a nickname, an age group, an avatar emoji and activity preferences.
          No real names, photos, schools or locations. There is no chat, no friends list and no
          public profile, so children never communicate with strangers here.
        </p>
      </div>
      <div>
        <h2>You can remove everything</h2>
        <p>
          Delete a child profile at any time from the{" "}
          <Link to="/parent" className="underline">
            Parent Dashboard
          </Link>
          . Deletion removes the linked activity history, moods, routines and badges.
        </p>
      </div>
      <div>
        <h2>Honest about what we are</h2>
        <p>
          MindBloom supports focus, routines and emotional awareness. It does not diagnose, treat or
          cure ADHD, and we make no claim of certified compliance with any particular child-privacy
          regulation.
        </p>
      </div>
    </LegalPage>
  ),
});