import { config, fields, collection, singleton } from "@keystatic/core";

/* ============================================================
   KEYSTATIC — Tableau de bord d'édition du cabinet
   ------------------------------------------------------------
   Mode "local" : édition directe des fichiers (test en local).
   Pour activer l'édition depuis le navigateur en production,
   remplacer le bloc `storage` ci-dessous par :

     storage: {
       kind: "github",
       repo: { owner: "TON-COMPTE", name: "NOM-DU-DEPOT" },
     },

   (voir GUIDE-CMS.md)
   ============================================================ */

export default config({
  // Édition via GitHub dès que les clés de l'app GitHub sont présentes
  // (sur Vercel) ; sinon édition locale des fichiers (dev sur ton ordinateur).
  // ⚠️ On teste une variable NEXT_PUBLIC_ : elle est visible à la fois côté
  // serveur ET côté navigateur. Sinon le client retombe en mode "local".
  storage: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
    ? {
        kind: "github",
        repo: { owner: "Loichmd", name: "cabinet-hacmoun" },
      }
    : { kind: "local" },
  ui: {
    brand: { name: "Cabinet Dr. Hacmoun" },
  },

  singletons: {
    settings: singleton({
      label: "Coordonnées & RDV",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        phone: fields.text({
          label: "Téléphone (format international)",
          description: "Ex : +33493000000",
        }),
        phoneDisplay: fields.text({
          label: "Téléphone affiché",
          description: "Ex : +33 4 93 00 00 00",
        }),
        doctolib: fields.url({
          label: "Lien Doctolib",
          description: "L'URL de prise de rendez-vous Doctolib du cabinet",
        }),
        email: fields.text({ label: "Email" }),
        addressStreet: fields.text({ label: "Adresse — rue" }),
        addressCity: fields.text({ label: "Adresse — code postal & ville" }),
        addressMaps: fields.url({ label: "Lien Google Maps" }),
      },
    }),

    home: singleton({
      label: "Page d'accueil",
      path: "content/home",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero — petit titre" }),
        heroTitleLine1: fields.text({ label: "Hero — titre ligne 1" }),
        heroTitleEmphasis: fields.text({
          label: "Hero — mot en italique doré",
        }),
        heroTitleLine3: fields.text({ label: "Hero — fin du titre" }),
        heroSubtitle: fields.text({ label: "Hero — sous-titre", multiline: true }),
        heroStats: fields.array(
          fields.object({
            value: fields.text({ label: "Valeur" }),
            label: fields.text({ label: "Libellé" }),
          }),
          { label: "Hero — statistiques", itemLabel: (p) => p.fields.value.value },
        ),
        aboutHeading: fields.text({ label: "Cabinet — titre", multiline: true }),
        aboutParagraph: fields.text({
          label: "Cabinet — paragraphe",
          multiline: true,
        }),
        aboutPoints: fields.array(fields.text({ label: "Point" }), {
          label: "Cabinet — points clés",
          itemLabel: (p) => p.value,
        }),
        aboutImage: fields.image({
          label: "Cabinet — photo",
          description: "Laisser vide pour utiliser le visuel par défaut.",
          directory: "public/images/home",
          publicPath: "/images/home",
        }),
      },
    }),
  },

  collections: {
    specialties: collection({
      label: "Spécialités",
      slugField: "name",
      path: "content/specialties/*",
      format: { data: "json" },
      columns: ["name"],
      schema: {
        name: fields.slug({ name: { label: "Nom de la spécialité" } }),
        order: fields.number({ label: "Ordre d'affichage", defaultValue: 1 }),
        icon: fields.select({
          label: "Icône",
          options: [
            { label: "Implant / dent", value: "implant" },
            { label: "Aligneur", value: "ortho" },
            { label: "Étincelle (esthétique)", value: "esthetique" },
          ],
          defaultValue: "implant",
        }),
        shortText: fields.text({
          label: "Description courte (carte d'accueil)",
          multiline: true,
        }),
        image: fields.image({
          label: "Photo de la spécialité",
          description: "Laisser vide pour utiliser le visuel par défaut.",
          directory: "public/images/specialties",
          publicPath: "/images/specialties",
        }),
        cardItems: fields.array(fields.text({ label: "Élément" }), {
          label: "Carte — liste de traitements",
          itemLabel: (p) => p.value,
        }),
        title: fields.text({ label: "Page — grand titre" }),
        intro: fields.text({ label: "Page — introduction", multiline: true }),
        overview: fields.array(
          fields.text({ label: "Paragraphe", multiline: true }),
          { label: "Page — présentation", itemLabel: (p) => p.value.slice(0, 40) },
        ),
        treatments: fields.array(
          fields.object({
            title: fields.text({ label: "Titre" }),
            text: fields.text({ label: "Texte", multiline: true }),
          }),
          { label: "Traitements", itemLabel: (p) => p.fields.title.value },
        ),
        process: fields.array(
          fields.object({
            title: fields.text({ label: "Titre de l'étape" }),
            text: fields.text({ label: "Texte", multiline: true }),
          }),
          { label: "Parcours patient", itemLabel: (p) => p.fields.title.value },
        ),
        cabinet: fields.array(
          fields.object({
            title: fields.text({ label: "Titre" }),
            text: fields.text({ label: "Texte", multiline: true }),
          }),
          { label: "Au cabinet", itemLabel: (p) => p.fields.title.value },
        ),
        practitionerInitials: fields.text({ label: "Praticien — initiales" }),
        practitionerName: fields.text({ label: "Praticien — nom" }),
        practitionerRole: fields.text({ label: "Praticien — rôle" }),
        practitionerNote: fields.text({
          label: "Praticien — note",
          multiline: true,
        }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Valeur" }),
            label: fields.text({ label: "Libellé" }),
          }),
          { label: "Statistiques", itemLabel: (p) => p.fields.value.value },
        ),
      },
    }),

    team: collection({
      label: "Équipe",
      slugField: "name",
      path: "content/team/*",
      format: { data: "json" },
      columns: ["name"],
      schema: {
        name: fields.slug({ name: { label: "Nom" } }),
        order: fields.number({ label: "Ordre", defaultValue: 1 }),
        photo: fields.image({
          label: "Photo du praticien",
          description: "Laisser vide pour afficher les initiales.",
          directory: "public/images/team",
          publicPath: "/images/team",
        }),
        initials: fields.text({ label: "Initiales" }),
        role: fields.text({ label: "Rôle / spécialité" }),
        bio: fields.text({ label: "Biographie", multiline: true }),
        tags: fields.array(fields.text({ label: "Étiquette" }), {
          label: "Étiquettes",
          itemLabel: (p) => p.value,
        }),
      },
    }),

    testimonials: collection({
      label: "Témoignages",
      slugField: "name",
      path: "content/testimonials/*",
      format: { data: "json" },
      columns: ["name"],
      schema: {
        name: fields.slug({ name: { label: "Nom du patient" } }),
        order: fields.number({ label: "Ordre", defaultValue: 1 }),
        initials: fields.text({ label: "Initiales" }),
        treatment: fields.text({ label: "Traitement" }),
        text: fields.text({ label: "Témoignage", multiline: true }),
      },
    }),

    faq: collection({
      label: "FAQ",
      slugField: "question",
      path: "content/faq/*",
      format: { data: "json" },
      columns: ["question"],
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        order: fields.number({ label: "Ordre", defaultValue: 1 }),
        answer: fields.text({ label: "Réponse", multiline: true }),
      },
    }),

    technologies: collection({
      label: "Plateau technique",
      slugField: "name",
      path: "content/technologies/*",
      format: { data: "json" },
      columns: ["name"],
      schema: {
        name: fields.slug({ name: { label: "Nom de la technologie" } }),
        order: fields.number({ label: "Ordre", defaultValue: 1 }),
        icon: fields.select({
          label: "Icône",
          options: [
            { label: "Scanner 3D", value: "scan" },
            { label: "Écran / simulation", value: "simulation" },
            { label: "Aligneur", value: "aligner" },
            { label: "Étincelle / laser", value: "sparkle" },
            { label: "Apaisement", value: "calm" },
            { label: "Dent", value: "tooth" },
          ],
          defaultValue: "scan",
        }),
        text: fields.text({ label: "Description", multiline: true }),
      },
    }),

    features: collection({
      label: "L'Expérience (atouts)",
      slugField: "title",
      path: "content/features/*",
      format: { data: "json" },
      columns: ["title"],
      schema: {
        title: fields.slug({ name: { label: "Titre" } }),
        order: fields.number({ label: "Ordre", defaultValue: 1 }),
        icon: fields.select({
          label: "Icône",
          options: [
            { label: "Scanner 3D", value: "scan" },
            { label: "Écran / simulation", value: "simulation" },
            { label: "Apaisement", value: "calm" },
            { label: "Portefeuille", value: "wallet" },
            { label: "Calendrier", value: "calendar" },
            { label: "Bouclier", value: "shield" },
          ],
          defaultValue: "scan",
        }),
        big: fields.checkbox({
          label: "Grande carte (mise en avant)",
          defaultValue: false,
        }),
        text: fields.text({ label: "Description", multiline: true }),
      },
    }),

    quiz: collection({
      label: "Quiz parodontologie",
      slugField: "question",
      path: "content/quiz/*",
      format: { data: "json" },
      columns: ["question", "order"],
      schema: {
        question: fields.slug({
          name: {
            label: "Affirmation posée au patient",
            description:
              "Le patient doit répondre VRAI ou FAUX. Formulez une phrase courte et affirmative.",
          },
        }),
        order: fields.number({ label: "Ordre d'apparition", defaultValue: 1 }),
        theme: fields.select({
          label: "Thème (petite étiquette affichée)",
          options: [
            { label: "Les bases", value: "Les bases" },
            { label: "Les symptômes", value: "Les symptômes" },
            { label: "La contamination", value: "La contamination" },
            { label: "Le diagnostic", value: "Le diagnostic" },
            { label: "Les traitements", value: "Les traitements" },
            { label: "L'hygiène", value: "L'hygiène" },
          ],
          defaultValue: "Les bases",
        }),
        answer: fields.select({
          label: "La bonne réponse",
          options: [
            { label: "VRAI", value: "vrai" },
            { label: "FAUX", value: "faux" },
          ],
          defaultValue: "vrai",
        }),
        explanationCorrect: fields.text({
          label: "Message si le patient a juste",
          description: "Félicitez, puis expliquez pourquoi en 1 à 3 phrases.",
          multiline: true,
        }),
        explanationWrong: fields.text({
          label: "Message si le patient se trompe",
          description:
            "Rassurez, puis expliquez la bonne réponse en 1 à 3 phrases.",
          multiline: true,
        }),
      },
    }),
  },
});
