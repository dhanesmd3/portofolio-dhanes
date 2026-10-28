import {
  achievements,
  education,
  profile,
  socials,
  toolGroups,
} from "@/lib/data";
import { siteUrl } from "@/lib/site";

/**
 * Data terstruktur (JSON-LD, schema.org) untuk Google: menyatakan bahwa
 * halaman ini milik orang bernama Dhanesworo Muhammad Datiputro, beserta
 * akun-akun resminya (sameAs). Ini sinyal terkuat untuk pencarian nama.
 */
export function personJsonLd() {
  const url = siteUrl.replace(/\/$/, "");
  const person = {
    "@type": "Person",
    "@id": `${url}/#person`,
    name: profile.name,
    alternateName: [profile.nickname, profile.wordmark],
    url,
    image: `${url}${profile.photoUrl}`,
    description: profile.bio,
    jobTitle: "Informatics Student",
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bandung",
      addressCountry: "ID",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Institut Teknologi Bandung",
      alternateName: "ITB",
    },
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.school,
    })),
    award: achievements.map((item) => `${item.title} (${item.year})`),
    knowsAbout: toolGroups.flatMap((group) =>
      group.tools.map((tool) => tool.name),
    ),
    sameAs: socials
      .filter((social) => social.icon !== "mail")
      .map((social) => social.href),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: profile.name,
        alternateName: `${profile.nickname} — Portfolio`,
        about: { "@id": `${url}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profile`,
        url,
        name: `${profile.name} — Portfolio`,
        mainEntity: { "@id": `${url}/#person` },
      },
      person,
    ],
  };
}

/** Serialisasi aman untuk <script type="application/ld+json"> (cegah XSS). */
export const toJsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
