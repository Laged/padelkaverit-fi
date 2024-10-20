// app/page.tsx
import HeroSection from "@/components/HeroSection";
import IllustrationSection from "@/components/IllustrationSection";
import ContentSections from "@/components/ContentSections";

export default function Home() {
  const sectionsData = [
    {
      title: "Yhteisö",
      content: `Me Padelkavereissa haluamme luoda padelyhteisön, jossa jokainen voi
                pelata padelia omalla tavallaan. Olitpa vasta-alkaja tai
                tavoitteellinen pelaaja, meiltä löydät paikan kehittyä ja nauttia
                padelista.`,
      initialColor: "var(--color-primary-a40)",
      activeColor: "var(--electric-lime)",
    },
    {
      title: "Seura",
      content: `Seurassamme jokainen on kaveri! Hallirajoilla ei ole väliä, kun
                löydät meiltä samanhenkistä peliseuraa ja uusia kavereita.
                Tärkeintä on löytää saada hyvät pelit ja pitää hauskaa yhdessä.`,
      initialColor: "var(--electric-lime)",
      activeColor: "var(--electric-purple)",
    },
    {
      title: "Toiminta",
      content: `Kilpapelaajille tarjoamme tavoitteellista toimintaa ja mahdollisuuden
                kehittyä sarjapeleissä. Rentoja pelejä kaipaaville järjestämme
                leppoisia matseja, joissa pääasia on ilo pelata. Junioreille
                tarjoamme laadukasta ja edullista valmennusta, jossa taitoja voi
                kehittää omalla tasollaan.`,
      initialColor: "var(--electric-purple)",
      activeColor: "var(--color-primary-a40)",
    },
  ];

  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <div className="md:flex">
        <IllustrationSection />
        <ContentSections sections={sectionsData} />
      </div>
    </main>
  );
}
