# Guide — Éditer le site sans développeur

Ce site possède un **tableau de bord d'édition** (Keystatic) : tu peux modifier
tous les textes et les images toi-même, sans toucher au code, **gratuitement** et
sans abonnement.

---

## 1. Où se trouve le tableau de bord ?

À l'adresse **`/keystatic`** de ton site.

- En local (sur ton ordinateur) : http://localhost:3000/keystatic
- En ligne (une fois publié) : https://ton-site.vercel.app/keystatic

Tu y retrouves des rubriques avec des champs simples à remplir :

| Rubrique | Ce que tu peux modifier |
|---|---|
| **Coordonnées & RDV** | Téléphone, **lien Doctolib**, email, adresse |
| **Page d'accueil** | Titres, sous-titres, statistiques, texte « cabinet », **photo du cabinet** |
| **Spécialités** | Tout le contenu des 3 pages + **photo par spécialité** |
| **Équipe** | Praticiens, rôles, bios, **photos** |
| **Témoignages** | Avis patients |
| **FAQ** | Questions / réponses |
| **Plateau technique** | Les technologies détaillées |
| **L'Expérience** | Les atouts du cabinet |

> 💡 Le **lien Doctolib** et le **téléphone** se modifient à un seul endroit
> (« Coordonnées & RDV ») et se mettent à jour **partout** sur le site.

---

## 2. Mettre le site en ligne avec l'édition autonome

Pour pouvoir éditer **depuis ton navigateur** (et que ça se publie tout seul), le
site doit vivre sur **GitHub** (gratuit) et être déployé par **Vercel** (gratuit).
Une seule mise en place, puis tu n'y touches plus.

### Étape A — Créer un compte GitHub
1. Va sur https://github.com → **Sign up** (gratuit).
2. Crée un **nouveau dépôt** (bouton **New**), par ex. `cabinet-hacmoun`.
   Laisse-le **vide** (sans README).

### Étape B — Envoyer le site sur GitHub
Dans un terminal, à la racine du projet :
```bash
git add .
git commit -m "Site cabinet Hacmoun + CMS"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/cabinet-hacmoun.git
git push -u origin main
```

### Étape C — Déployer sur Vercel
1. Va sur https://vercel.com → connexion avec ton compte GitHub.
2. **Add New → Project** → choisis le dépôt `cabinet-hacmoun` → **Deploy**.
3. Ton site est en ligne en ~1 minute. 🎉

### Étape D — Activer l'édition depuis le navigateur
1. Ouvre le fichier **`keystatic.config.ts`** et remplace le bloc :
   ```ts
   storage: { kind: "local" },
   ```
   par :
   ```ts
   storage: {
     kind: "github",
     repo: { owner: "TON-COMPTE", name: "cabinet-hacmoun" },
   },
   ```
   (puis `git commit` + `git push`, ou demande-moi de le faire).
2. Va sur `https://ton-site.vercel.app/keystatic` → un bouton propose de
   **connecter GitHub** → accepte. C'est fait.

À partir de là : tu modifies dans `/keystatic`, tu cliques **Save**, et le site se
met à jour tout seul en ~1 minute. Tes contenus et images sont stockés dans **ton
propre dépôt** — ils t'appartiennent.

---

## 3. Mises à jour techniques : automatiques

Le fichier `renovate.json` est déjà prêt. Pour activer le robot qui gère les MAJ
des dépendances à ta place :

1. Va sur https://github.com/apps/renovate → **Install** → choisis ton dépôt.
2. C'est tout. Renovate proposera (et fusionnera automatiquement) les petites
   mises à jour de sécurité, chaque lundi matin. Tu n'as **rien** à faire.

> Le site étant 100 % statique, il n'y a **aucun serveur à entretenir** : la
> maintenance se limite à ces mises à jour automatiques.

---

## 4. Modifier le site en local (avant publication)

```bash
npm install      # une seule fois
npm run dev      # démarre le site sur http://localhost:3000
```
Puis ouvre http://localhost:3000/keystatic pour éditer. Les modifications sont
enregistrées directement dans le dossier `content/` (textes) et `public/images/`
(photos).

---

## Récapitulatif

- **Éditer** : `/keystatic` → champs simples, textes + images.
- **Publier** : automatique (Vercel) dès que tu enregistres (mode GitHub).
- **Coût** : 0 € (GitHub + Vercel + Keystatic, tous gratuits).
- **Maintenance** : automatique (Renovate).
