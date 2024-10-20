import dynamic from "next/dynamic";

const ContentSections = dynamic(() => import("./ContentSections"), {
  ssr: false,
});

const sections = [
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

const ClientContentSections = () => <ContentSections sections={sections} />;

export default ClientContentSections;
