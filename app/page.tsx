import HeroSection from '@/components/HeroSection'
import ContentSection from '@/components/ContentSection'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <ContentSection title="Tavoitteet">
        Me Padelkavereissa haluamme luoda padelyhteisön, jossa jokainen voi
        pelata padelia omalla tavallaan. Olitpa vasta-alkaja tai tavoitteellinen
        pelaaja, meiltä löydät paikan kehittyä ja nauttia padelista.
      </ContentSection>

      <ContentSection title="Yhteisö">
        Seurassamme jokainen on kaveri! Hallirajoilla ei ole väliä, kun löydät
        meiltä samanhenkistä peliseuraa ja uusia kavereita. Tärkeintä on löytää
        mukavaa peliseuraa ja pitää hauskaa. Meillä hyvä yhteishenki kuuluu
        jokaiseen peliin.
      </ContentSection>

      <ContentSection title="Toiminta">
        Kilpapelaajille tarjoamme tavoitteellista toimintaa ja mahdollisuuden
        kehittyä sarjapeleissä. Rentoja pelejä kaipaaville järjestämme leppoisia
        matseja, joissa pääasia on ilo pelata. Junioreille tarjoamme laadukasta
        ja edullista valmennusta, jossa taitoja voi kehittää omalla tasollaan.
      </ContentSection>
    </main>
  )
}
