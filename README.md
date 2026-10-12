# Pamario NT – pradinio puslapio demo (v2)

Statinė demo versija (HTML / CSS / vanilla JS, be priklausomybių) svetainės **pamario-nt.lt** pradiniam puslapiui.
Dizaino kryptis – **XStore** (WordPress + WooCommerce temos struktūra: viršutinė juosta, antraštė su paieška ir
veiksmais, kategorijų meniu, „produktų“ tipo skelbimų kortelės, filtrų juosta, promo banneriai, naujienlaiškio poraštė),
pritaikyta pajūriui ir atostogų nuotaikai: smėlio / jūros / gintaro paletė, bangų jungtys tarp sekcijų, video montažas
hero sekcijoje, video plytelės „Pamario gyvenimas“, pajūrio grafika (saulė, kirai, kopų žolė, kompasas, švyturys),
parallax ir hover efektai. Pirmoji versija (be video) išsaugota kataloge `v1/`.

## Peržiūra

Gyva demo versija: **https://arvydastry.github.io/pamariont/** (GitHub Pages iš `main` šakos; `v1/`, `v2/`, `v3/` – ankstesnių antraščių variantai).

Vietinė peržiūra:

```bash
python3 -m http.server 8766
```

Tada atidarykite http://localhost:8766 (arba dukart spustelėkite `index.html` – veikia ir be serverio).

## Struktūra

| Failas | Paskirtis |
| --- | --- |
| `index.html` | Visas pradinis puslapis (LT) |
| `assets/css/style.css` | Dizaino sistema, komponentai, animacijos, responsive, `prefers-reduced-motion` |
| `assets/js/main.js` | 12 pavyzdinių skelbimų, filtrai, rikiavimas (įsk. „arčiausiai jūros“), mėgstamiausi, hero paieška, meniu, hero video montažas, tingiai kraunami video, parallax, reveal, skaitikliai, 3D pakreipimas |
| `v1/` | Pirmoji demo versija (XStore 3 eilučių antraštė, nuotraukų hero, senas footer) – palyginimui |
| `v2/` | Antra versija su plaukiojančia „stiklo“ antrašte – palyginimui |
| `v3/` | Trečia versija su solidžia balta antrašte – palyginimui |
| `assets/img/logo-full.png`, `logo-full-white.png`, `logo-icon.png`, `favicon.png` | Naujas kliento logotipas (permatomas fonas; balta versija poraštei; namelio ikona žemėlapiui ir favicon'ui). `logo.svg` – senasis logotipas iš dabartinės svetainės, nebenaudojamas |
| `media.md` | Pexels nuotraukų sąrašas su autoriais |

## Kas veikia demo versijoje

- **Filtrai** (sekcija „Skelbimai“): tipas (lustai), sandoris (pardavimas / nuoma), vietovė, kambariai, kaina nuo–iki,
  rikiavimas (naujausi, pigiausi, brangiausi, didžiausi), „Tik mėgstamiausi“, „Išvalyti“, rezultatų skaičius, „Rodyti daugiau“.
- **Hero paieška** (Pirkti / Nuomotis + tipas, vietovė, kambariai, kaina iki) – pritaiko filtrus ir nuslenka prie skelbimų.
- **Antraštės paieška** – ieško pagal skelbimo ID (pvz. `PNT-1021`), gatvę ar miestą tarp pavyzdinių skelbimų.
- **Mėgstamiausi** – širdelės kortelėse, skaitiklis antraštėje (saugoma naršyklėje, `localStorage`).
- Meniu, kategorijų plytelės, vietovių kortelės ir poraštės nuorodos filtruoja skelbimus (pvz. „Palanga“, „Nuoma“, „Naujos statybos“).
- **Hero video montažas**: 3 Pexels klipai (Baltijos pakrantė, kopos, saulėlydis) + Klaipėdos senamiesčio nuotrauka su „Ken Burns“
  efektu, perėjimai kas 7–9 s, klipo pavadinimas ir taškeliai (galima spustelėti). Telefonui kraunama 960 px versija,
  su `prefers-reduced-motion` ar „Data Saver“ rodomas tik pirmas kadras.
- **Video turinyje**: 6 kategorijų plytelės (interjeras, namas iš drono, sklypas, biuras, sodyba, raktai), „Pamario gyvenimas“ bento (4 klipai + skaičių kortelė), „Kodėl mes“ (Palangos paplūdimys), CTA fonas.
  Video kraunami tik priartėjus (IntersectionObserver), stabdomi išslinkus.
- **Pajūrio grafika**: saulė (lėtai sukasi), kirai (skrenda per hero ir CTA), kopų žolė (siūbuoja), kompasas, švyturys,
  vietovardžių juosta (Nida · Juodkrantė · … – slenka, sustoja užvedus), bangų skirtukai. Elementai juda parallax principu.
- Skelbimų kortelėse – atstumo iki jūros ženkliukas (iki 1 km – mėlynas), rikiavimas „arčiausiai jūros“.
- Poraštė: kontaktų kortelės + OpenStreetMap žemėlapis su biuro žyme (plytelės be API rakto) + tamsi nuorodų dalis.
- Efektai: hero ir CTA parallax, sekcijų „reveal“, animuoti skaitikliai, kortelių hover su antra nuotrauka, 3D plytelių
  pakreipimas, mygtukų blizgesys, lipni antraštė. Viskas išjungiama su `prefers-reduced-motion`.
- Antraštė: trys plaukiojančios „salelės“ virš video, be viršutinės kontaktų eilutės (kontaktai – viso ekrano meniu ir poraštėje); meniu indikatorius slenka pagal užvestą / aktyvią sekciją; mega meniu su tipais, vietovėmis, sandoriu ir savaitės objektu; paieška atsidaro kaip langas.
- Mobili versija: burgerio meniu, sutraukiami filtrai, apatinė juosta „Skambinti / Noriu parduoti“.
- Nuorodos, kurių dar nėra (skelbimo puslapis, komanda, Kipras, RU/EN, formos), rodo pranešimą „Demo versija“.

## Dizaino sistema (XStore atitikmenys)

| Elementas | Demo | WordPress + XStore |
| --- | --- | --- |
| Spalvos | jūra `#1B6E8A`, gilyn `#0E2A3B`, smėlis `#F7F3EC`, gintaras `#E39B45` (CTA „Noriu parduoti“), koralas `#E2735C` (ženkliukai) | Theme Options → Colors / Buttons |
| Šriftai | Newsreader (antraštės) + Manrope (tekstas), abu su lietuviškomis raidėmis | Theme Options → Typography (Google Fonts, latin-ext) |
| Antraštė – trys plaukiojančios baltos „salelės“ (logotipas, meniu su slankiojančiu aktyvaus punkto indikatoriumi, veiksmai su CTA), mega meniu „Skelbimai“, paieška per langą (`/` klavišas), pasislepia slenkant žemyn; telefone – viso ekrano tamsus meniu su didelėmis serif nuorodomis | `.site-head`, `.island`, `.mega`, `.menu-overlay`, `.search-overlay` | XStore Header Builder: Transparent header + Sticky header; salelių išvaizda ir indikatorius – Custom CSS/JS; Mega menu, Search popup, Mobile menu (fullscreen) |
| Hero su video montažu ir paieškos kortele | `.hero` + `.search-card` | Elementor sekcija su video fonu (XStore „Video background“ arba Slider Revolution su keliais klipais) + NT įskiepio paieškos forma (pvz. Estatik / WP Real Estate / Realtyna) |
| Vietovardžių juosta | `.marquee` | XStore / Elementor „Marquee“ (Text scroller) widget |
| „Pamario gyvenimas“ video plytelės | `.bento` | Elementor Video widget'ai su autoplay/mute arba XStore Banner su video |
| Pajūrio grafika | `.deco` SVG | Elementor sekcijų „Shape divider“ + absoliučiai pozicionuoti SVG elementai (Elementor Motion Effects – parallax) |
| Poraštės žemėlapis | `.map-card` | OSM plytelės (kaip demo) arba Google Maps widget su API raktu |
| Kategorijų plytelės su video fonu | `.cats-grid` | XStore „Banner“ widget'ai su video fonu (Elementor Video background) arba Categories widget + Custom CSS |
| Skelbimų kortelės ir filtrai | `.toolbar`, `.card` | NT įskiepio sąrašas, stilizuotas kaip XStore produktų tinklelis (ženkliukai, širdelė, hover nuotrauka) |
| Promo banneriai | `.promo` | XStore Banner widget (2 stulpeliai) |
| Vietovės | `.regions-scroller` | XStore / Elementor karuselė |
| Kodėl mes, atsiliepimai | `.features`, `.review` | Icon Box + XStore Testimonials |
| CTA juosta | `.cta` | Elementor sekcija su parallax fonu |
| Poraštė su naujienlaiškiu | `.footer` | XStore Footer Builder + MailPoet / Mailchimp forma |

## Kas yra demo / „placeholder“ (patikslinti su klientu)

- **Skelbimai** – 12 pavyzdinių objektų: adresai ir kainos pagal dabartinės svetainės pavyzdžius, plotai, kambariai, aukštai,
  nuotraukų skaičius ir brokeriai (Rūta K., Tomas B., Laura Ž., Andrius P.) – sugalvoti.
- **Skaičiai** 2 542 / 1 458 / 220 / 148 paimti iš dabartinės svetainės skaitiklių; „4 000+ skelbimų“, „24 val.“, „98 %“ – demo tekstai.
- **Atsiliepimai**, darbo laikas (I–V 9–18), „Kipras“ nuoroda, RU/EN kalbos, socialiniai tinklai – pavyzdiniai.
- **Kontaktai** (Taikos pr. 52C-601, Klaipėda, +370 648 52 180, info@pamario-nt.lt) – iš dabartinės svetainės.
- **Nuotraukos ir video** – Pexels (žr. `media.md`); tikroje svetainėje keisti objektų nuotraukomis ir kliento dronu filmuota
  Klaipėdos / Nidos medžiaga (Pexels neturi tikro Klaipėdos senamiesčio video – hero naudoja Klaipėdos nuotraukas).
- **Atstumai iki jūros** kortelėse – apytiksliai demo skaičiai.
- `index.html` turi `noindex` – į tikrą svetainę neperkelti.

## Siūlomi kiti etapai

1. Skelbimo vidinis puslapis (galerija, parametrai, žemėlapis, brokerio kortelė, užklausa).
2. Skelbimų sąrašas su šonine filtrų juosta ir žemėlapiu.
3. „Noriu parduoti“ / „Noriu pirkti“ formų puslapiai, komanda, kontaktai.
4. EN / RU versijos (Polylang) ir WordPress + XStore įgyvendinimas.
