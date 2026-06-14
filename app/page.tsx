import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Specialties from "@/components/Specialties";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getSettings,
  getHome,
  getSpecialties,
  getFeatures,
  getTechnologies,
  getTestimonials,
  getTeam,
  getFaq,
} from "@/lib/content";

export default async function Home() {
  const [
    settings,
    home,
    specialties,
    features,
    technologies,
    testimonials,
    team,
    faqs,
  ] = await Promise.all([
    getSettings(),
    getHome(),
    getSpecialties(),
    getFeatures(),
    getTechnologies(),
    getTestimonials(),
    getTeam(),
    getFaq(),
  ]);

  return (
    <main className="bg-cream">
      <Nav settings={settings} />
      <Hero home={home} settings={settings} />
      <Marquee items={technologies.map((t) => t.name)} />
      <About home={home} />
      <Specialties specialties={specialties} />
      <Experience features={features} />
      <Technologies technologies={technologies} />
      <Testimonials testimonials={testimonials} />
      <Team team={team} />
      <FAQ faqs={faqs} />
      <CTA settings={settings} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
