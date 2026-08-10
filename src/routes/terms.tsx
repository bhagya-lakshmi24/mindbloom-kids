import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const title = "Terms of Use — MindBloom ADHD Kids";
const description =
  "The terms for using MindBloom's activities, parent accounts and consultation bookings.";

export const Route = createFileRoute("/terms")({
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
      eyebrow="Terms"
      title="Terms of Use"
      description="What you can expect from MindBloom, and what we ask of you."
    >
      <div>
        <h2>Accounts are for adults</h2>
        <p>
          MindBloom accounts must be created and managed by a parent, guardian or authorised
          caregiver aged 18 or over. Children use the app through a child profile inside your
          account.
        </p>
      </div>
      <div>
        <h2>Not a medical service</h2>
        <p>
          MindBloom is an educational and well-being app. It does not diagnose, treat or cure ADHD
          or any other condition. The activities support skills such as focus, routines, emotional
          awareness and engagement. Please consult a qualified healthcare or child-development
          professional for medical advice.
        </p>
      </div>
      <div>
        <h2>Acceptable use</h2>
        <ul>
          <li>Keep your password private and do not share your account.</li>
          <li>Do not attempt to access data belonging to other families.</li>
          <li>Do not store personal information about a child that isn't needed.</li>
        </ul>
      </div>
      <div>
        <h2>Consultations and payments</h2>
        <p>
          Consultation requests are booking enquiries. Our team confirms availability by email
          before any session or payment is finalised. You can cancel your own bookings from the
          Bookings page.
        </p>
      </div>
      <div>
        <h2>Changes</h2>
        <p>
          We may update these terms as the app evolves. Continued use after an update means you
          accept the revised terms.
        </p>
      </div>
    </LegalPage>
  ),
});