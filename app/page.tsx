// pages/index.tsx

import HeroSection from "@/components/HeroSection";
import IllustrationSection from "@/components/IllustrationSection";
import ContentSection from "@/components/ContentSection";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* Illustration and Content Wrapper */}
      <div className="md:flex">
        {/* Illustration Section */}
        <IllustrationSection />

        {/* Content Sections */}
        <div className="md:w-1/2 bg-dotted-orange">
          <ContentSection title="Yhteisö" color="orange">
            Me Padelkavereissa haluamme luoda padelyhteisön, jossa jokainen voi
            pelata padelia omalla tavallaan. Olitpa vasta-alkaja tai
            tavoitteellinen pelaaja, meiltä löydät paikan kehittyä ja nauttia
            padelista.
          </ContentSection>

          <ContentSection title="Seura" color="purple">
            Seurassamme jokainen on kaveri! Hallirajoilla ei ole väliä, kun
            löydät meiltä samanhenkistä peliseuraa ja uusia kavereita.
            Tärkeintä on löytää saada hyvät pelit ja pitää hauskaa yhdessä.
          </ContentSection>

          <ContentSection title="Toiminta" color="lime">
            Kilpapelaajille tarjoamme tavoitteellista toimintaa ja mahdollisuuden
            kehittyä sarjapeleissä. Rentoja pelejä kaipaaville järjestämme
            leppoisia matseja, joissa pääasia on ilo pelata. Junioreille
            tarjoamme laadukasta ja edullista valmennusta, jossa taitoja voi
            kehittää omalla tasollaan.
          </ContentSection>
        </div>
      </div>
    </main>
  );
}
