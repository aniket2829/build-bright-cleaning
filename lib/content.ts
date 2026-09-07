/**
 * ALL CONTENT IN THIS FILE IS AUTHORED DEMO CONTENT.
 *
 * Build Bright Cleaning is a portfolio build. Every name, review, price,
 * phone number and address below was written for this demo and describes no
 * real company, customer or transaction. Nothing here is attributed to a
 * third-party review platform, and no insurance policy, licence number,
 * certification or award is claimed anywhere in this file; those would be
 * material claims the day this site went live. See REPLACE-BEFORE-LAUNCH.md.
 */

export const business = {
  name: "Build Bright Cleaning",
  tagline: "One cleaner. The same one. Every time.",
  phoneDisplay: "(825) 963-3038",
  phoneHref: "+18259633038",
  email: "navneetlotey2000@gmail.com",
  cities: ["Edmonton"] as const,
  hours: "Mon–Sat, 7am–7pm MT",
};

/* --------------------------------------------------------------------------
   Services
   -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  dek: string;
  forWho: string;
  lede: string;
  body: string[];
  rooms: { room: string; tasks: string[] }[];
  extras: string[];
  notIncluded: string[];
};

export const services: Service[] = [
  {
    slug: "deep",
    name: "Deep clean",
    shortName: "Deep",
    dek: "For the places a routine clean politely walks past.",
    forWho: "Homes that have been maintained but not reset, or are about to host.",
    lede: "A complete reset for the parts a standard visit cannot reach: inside, behind, underneath, and above eye level.",
    body: [
      "A deep clean is not a faster clean with more pressure. It is a different list. Baseboards get washed rather than dusted. Cabinet fronts get degreased at the handles where the finish has gone tacky. Vents come off. Light fixtures come down.",
      "We book deep cleans as a single unbroken block so nothing is left half-dismantled. We quote for the house the job actually needs, not for the visit we would like it to be. We would rather lose the work than start something we have to walk away from half-finished.",
      "Most people book one before a holiday, a viewing, or the first warm week of spring, when the winter's worth of salt and grit finally has somewhere to go.",
    ],
    rooms: [
      {
        room: "Kitchen",
        tasks: [
          "Inside every cabinet and drawer, emptied and relined",
          "Oven interior, racks and door glass",
          "Fridge interior including seals and crisper runners",
          "Range hood filter degreased in the sink",
          "Behind and beneath movable appliances",
        ],
      },
      {
        room: "Bathrooms",
        tasks: [
          "Grout scrubbed line by line",
          "Shower head descaled by soak",
          "Extractor fan cover removed and washed",
          "Behind the toilet and along the base seal",
          "Vanity interiors wiped and reset",
        ],
      },
      {
        room: "Bedrooms",
        tasks: [
          "Under and behind beds and dressers",
          "Closet floors and shelf edges",
          "Headboards and fabric bases vacuumed",
          "Window tracks and sills scrubbed",
        ],
      },
      {
        room: "Living areas",
        tasks: [
          "Under sofas and heavy furniture",
          "Upholstery vacuumed seam by seam",
          "Baseboards washed, not dusted",
          "Door frames, casings and switch plates",
        ],
      },
      {
        room: "Entry and stairs",
        tasks: [
          "Salt residue lifted from tile and grout",
          "Stair spindles washed individually",
          "Closet floor cleared and vacuumed",
          "Threshold and door seal scrubbed",
        ],
      },
      {
        room: "Whole home",
        tasks: [
          "Interior window glass and frames",
          "Light fixtures and ceiling fan blades",
          "Vent and register covers washed",
          "Cobweb sweep at every ceiling line",
        ],
      },
    ],
    extras: ["Interior of a second fridge", "Garage sweep-out", "Balcony wash-down"],
    notIncluded: [
      "Mould remediation",
      "Post-construction dust (book the post-construction clean)",
      "Pest treatment",
    ],
  },
  {
    slug: "move-in-out",
    name: "Move-in / move-out clean",
    shortName: "Move-in / out",
    dek: "Written against the inspection, not against a general idea of clean.",
    forWho: "Anyone with a hard date, an empty house, and a deposit on the line.",
    lede: "An empty home hides nothing. We clean it in the order an inspector walks it, and we finish before your handover, not on the day of it.",
    body: [
      "Move cleans are the only job we schedule backwards. You tell us when the keys change hands; we book the visit far enough ahead of that day that a problem found late in the clean can still be fixed.",
      "Empty rooms are unforgiving. Every scuff on a baseboard, every ring inside a cabinet, every drift of dust behind where the fridge stood is visible from the doorway. That is the list we work to.",
      "If you are moving into a place someone else has left, we do the same clean in reverse, and we do it before your furniture arrives, the only time the house will ever be this easy to reach.",
    ],
    rooms: [
      {
        room: "Kitchen",
        tasks: [
          "Every cabinet and drawer inside and out",
          "Oven, including racks, glass and drawer",
          "Fridge interior, seals, coils and the floor beneath",
          "Sink, taps and drain descaled",
          "Backsplash degreased to the ceiling line",
        ],
      },
      {
        room: "Bathrooms",
        tasks: [
          "Full descale of tub, tile, glass and fittings",
          "Grout and silicone lines scrubbed",
          "Vanity and medicine cabinet interiors",
          "Extractor fan cover washed",
          "Floor washed by hand into every corner",
        ],
      },
      {
        room: "Bedrooms",
        tasks: [
          "Closet interiors, shelves and rails",
          "Window tracks, sills and frames",
          "Wall scuff spot-cleaning where the finish allows",
          "Full floor vacuum and wash",
        ],
      },
      {
        room: "Living areas",
        tasks: [
          "Baseboards, casings and door faces washed",
          "Light switches and outlet plates",
          "Interior window glass",
          "Floors edge to edge, corners by hand",
        ],
      },
      {
        room: "Entry and stairs",
        tasks: [
          "Closet interiors emptied and washed",
          "Stair treads, risers and spindles",
          "Door glass, handles and threshold",
          "Salt and grit lifted from all hard floors",
        ],
      },
      {
        room: "Laundry and utility",
        tasks: [
          "Behind and beneath the machines",
          "Lint trap and dryer vent face",
          "Utility sink descaled",
          "Shelving wiped and floor washed",
        ],
      },
    ],
    extras: ["Garage floor sweep and wash", "Balcony or patio wash-down", "Wall wash, priced by room"],
    notIncluded: [
      "Junk or furniture removal",
      "Carpet steam extraction (book the steam carpet clean)",
      "Repairs and patching of any kind",
    ],
  },
  {
    slug: "one-time",
    name: "One-time clean",
    shortName: "One-time",
    dek: "The reset before the guests, or after them.",
    forWho: "People who need one very good day and no ongoing arrangement.",
    lede: "A full clean of the whole home with no subscription attached. Book it, watch how it goes, decide about the rest later.",
    body: [
      "Most people start here. A one-time clean gives you the full standard without asking you to commit to an ongoing arrangement on the strength of a website.",
      "It is also just a useful thing on its own. The week before family arrives. The Monday after they leave. The Saturday you finally accept that the kitchen has gotten away from you.",
      "If you decide afterwards that you want it regularly, we keep the notes from this visit and you keep the cleaner who made them.",
    ],
    rooms: [
      {
        room: "Kitchen",
        tasks: [
          "Counters, sink and backsplash",
          "Appliance exteriors and cooktop",
          "Cabinet fronts wiped at the handles",
          "Floors vacuumed and mopped",
        ],
      },
      {
        room: "Bathrooms",
        tasks: [
          "Tub, shower, glass and toilet",
          "Mirrors and chrome polished",
          "Counters cleared and disinfected",
          "Floors washed to the edges",
        ],
      },
      {
        room: "Bedrooms",
        tasks: ["Beds made", "Surfaces dusted", "Floors vacuumed", "Glass and mirrors cleared"],
      },
      {
        room: "Living areas",
        tasks: [
          "Upholstery vacuumed and reset",
          "Baseboards and sills dusted",
          "Screens and high-touch points wiped",
          "Floors vacuumed and mopped",
        ],
      },
      {
        room: "Entry and stairs",
        tasks: ["Boot tray cleared", "Stairs vacuumed", "Railings and plates wiped", "Door glass cleaned"],
      },
      {
        room: "Laundry",
        tasks: ["Machine surfaces wiped", "Lint trap cleared", "Sink scrubbed", "Floor cleaned"],
      },
    ],
    extras: ["Inside the fridge", "Inside the oven", "Interior windows"],
    notIncluded: [
      "Inside cabinets",
      "Behind heavy appliances",
      "Wall washing (book wall stain removal)",
    ],
  },
  {
    slug: "post-construction",
    name: "Post-construction clean",
    shortName: "Post-construction",
    dek: "For the fine grey dust that comes back the day after you sweep.",
    forWho:
      "Anyone at the end of a renovation or a new build, standing in a finished room they still cannot use.",
    lede: "Drywall dust does not come out in one pass. We work top down in stages, let the air settle, then go back over the same surfaces a second time.",
    body: [
      "Construction dust is not ordinary dirt. It is ground gypsum and sawdust, light enough to hang in the air for hours, and it is sitting on the top edge of every door frame whether you can see it or not. Sweep once and the room looks finished. Come back in the morning and there is a new film on every flat surface, because everything you disturbed has landed.",
      "So we do it in passes. First a dry pass from the ceiling down, on vacuums with sealed HEPA filtration rather than brooms, so the dust leaves the room instead of moving around it. Then we stop. Then we wet-wipe the same surfaces in the same order, once what we lifted has had time to fall.",
      "We do not book this job until the trades have finished and the debris is gone. If the painter is still coming back for a second coat, we schedule you after them, because cleaning ahead of the last trade is money you spend twice.",
    ],
    rooms: [
      {
        room: "Whole home, first pass",
        tasks: [
          "Ceilings, corners and light coves vacuumed of dust and cobweb",
          "Every door frame, casing and top edge cleared",
          "Heating registers and cold-air returns vacuumed out",
          "Window frames, tracks and sills dry-vacuumed before anything wet",
          "Floors vacuumed on HEPA, edges and expansion gaps included",
        ],
      },
      {
        room: "Kitchen",
        tasks: [
          "New cabinets inside and out, shelves and drawer runners included",
          "Manufacturer film and adhesive lifted from appliance faces",
          "Counters, backsplash and grout haze cleared",
          "Sink, tap and drain flushed of grit",
          "Under and behind the fridge and range before they are pushed back",
        ],
      },
      {
        room: "Bathrooms",
        tasks: [
          "Grout haze and plaster spots off tile",
          "Tub, base and shower glass de-dusted, then washed",
          "Vanity interiors and mirror edges",
          "Extractor fan cover removed and washed",
          "Silicone lines wiped free of sanding residue",
        ],
      },
      {
        room: "Glass and fixtures",
        tasks: [
          "Interior glass washed after the dust pass, not before",
          "Paint flecks lifted from glass where the glazing allows",
          "Light fixtures, shades and ceiling fan blades",
          "Switch plates, outlets and thermostat faces",
        ],
      },
      {
        room: "Floors, final pass",
        tasks: [
          "Second HEPA vacuum once the surfaces are done",
          "Hard floors damp-mopped, water changed room by room",
          "New carpet vacuumed both directions to lift crushed pile",
          "Stair treads, risers and nosings by hand",
        ],
      },
      {
        room: "Garage and entry",
        tasks: [
          "Concrete swept and washed of drywall slurry",
          "Utility and mechanical room floors cleared",
          "Entry threshold, door glass and hardware",
          "Exterior stoop swept back to the walkway",
        ],
      },
    ],
    extras: [
      "A third dust pass a week later",
      "Interior of the garage or shop",
      "Window track detail on new builds",
      "Steam extraction of new carpet",
    ],
    notIncluded: [
      "Debris, offcut or packaging removal",
      "Paint touch-up, caulking or any repair",
      "Anything requiring a ladder over six feet",
      "Work on a site the trades have not finished",
    ],
  },
  {
    slug: "steam-carpet",
    name: "Steam carpet clean",
    shortName: "Steam carpet",
    dek: "Hot water extraction, and the drying time it honestly needs.",
    forWho:
      "Carpet that vacuums up fine and still looks tired: traffic lanes, pet accidents, a spill that came back.",
    lede: "We pre-treat, agitate, then extract with hot water under pressure. Most of the skill is in how much water goes in, because nearly everything that goes wrong with a steam clean is a drying problem.",
    body: [
      "Carpet goes grey in lanes rather than evenly, and the reason is soil ground down into the base of the pile where a vacuum head cannot reach. Extraction is the only thing that lifts it: hot water and detergent driven in, then pulled straight back out with the soil in it.",
      "The mistake is over-wetting. Too much water passes the backing into the underlay, takes three days to dry, and carries the old soil back up to the surface as it evaporates. That is why a carpet sometimes looks worse a week after a cheap clean. We make more extraction passes with less water, which takes longer on the day and is the whole difference.",
      "Expect to stay off it for the rest of the afternoon, and to leave heavy furniture until the following day. We put protectors under every leg we move, and before we start we walk the room with you and say which marks we think will lift and which are dye rather than soil.",
    ],
    rooms: [
      {
        room: "Before we start",
        tasks: [
          "Fibre and backing identified so the water temperature suits them",
          "Colourfastness tested in a closet",
          "Every mark walked with you and called honestly",
          "Small furniture moved, heavy pieces blocked and protected",
        ],
      },
      {
        room: "Living areas",
        tasks: [
          "Dry vacuumed twice, the second pass across the pile",
          "Traffic lanes pre-sprayed and left to dwell",
          "Agitated with a counter-rotating brush",
          "Extracted in overlapping passes, then dry passes to pull the water back",
          "Pile groomed one direction so it dries standing up",
        ],
      },
      {
        room: "Bedrooms",
        tasks: [
          "Edges and under-window strips worked with a hand tool",
          "Closet floors extracted where the carpet runs in",
          "Bed and dresser legs set on protectors",
          "Full extraction and grooming out to the doorway",
        ],
      },
      {
        room: "Stairs and hallways",
        tasks: [
          "Treads, risers and nosings done one at a time by hand tool",
          "Landing and turn carpet extracted as a single piece",
          "Spindle bases and stringer edges detailed",
          "Extra dry passes on stairs so they are safe to use sooner",
        ],
      },
      {
        room: "Spots and odour",
        tasks: [
          "Pet accidents treated with an enzyme, not a masking scent",
          "Wicking spots re-extracted after they resurface",
          "Grease and tannin marks worked with the chemistry each one needs",
          "Anything that will not lift is shown to you and explained",
        ],
      },
      {
        room: "Upholstery, if added",
        tasks: [
          "Sofa and chair fabric tested, then extracted at low moisture",
          "Cushions cleaned both faces and stood up to dry",
          "Arms and headrests, where the body oils sit",
          "Frames and legs wiped down",
        ],
      },
    ],
    extras: [
      "Sofa or sectional",
      "Area rugs cleaned in place",
      "Stain protector reapplied",
      "Air movers for a faster dry",
    ],
    notIncluded: [
      "Carpet repair, restretching or reseaming",
      "Dye stains, bleach marks and permanent discolouration",
      "Underlay replacement after flooding",
      "Any promise that a particular stain will lift",
    ],
  },
  {
    slug: "wall-stains",
    name: "Wall stain removal",
    shortName: "Wall stains",
    dek: "Scuffs, handprints and crayon off the wall, without the paint coming too.",
    forWho:
      "Walls that have taken a few years of family, or a rental that has an inspection next week.",
    lede: "Paint has a finish, and the finish is what fails first. We test in a corner, start with the gentlest thing that works, and stop before the wall goes patchy.",
    body: [
      "Most wall marks come off. The reason people give up is that the first hard scrub leaves a clean patch shinier than everything around it, which looks worse than the mark did. That burnishing is the real risk on any painted wall, and it is why this job is worth doing carefully rather than quickly.",
      "So we work in order. A dry sponge first, then a neutral cleaner on a soft pad, then something with more bite only where it is needed and only after a test patch behind a door. Flat and matte paint gets the gentlest treatment, because it has the least to give.",
      "We tell you what we expect before we start. Crayon, scuff marks, furniture rub and the greasy handprints around switches almost always come off. Smoke film, water staining, ink and anything soaked into flat paint often will not, and on those the honest answer is a coat of paint rather than a stronger chemical.",
    ],
    rooms: [
      {
        room: "Before we start",
        tasks: [
          "Paint sheen identified room by room",
          "Test patch in a low-visibility corner",
          "Every mark walked with you and called likely or unlikely",
          "Floors and trim covered before anything wet comes out",
        ],
      },
      {
        room: "Hallways and stairs",
        tasks: [
          "Handprints and shoulder rub down the traffic side",
          "Scuffs at stroller, suitcase and vacuum height",
          "Corner beads and door casings where knuckles land",
          "Light switch surrounds degreased",
        ],
      },
      {
        room: "Kitchen and dining",
        tasks: [
          "Grease film on the wall around the cooktop",
          "Splatter above the counter run and behind the bin",
          "Chair-back rub along the dining wall",
          "The fridge-side wall where hands push past",
        ],
      },
      {
        room: "Bedrooms and playrooms",
        tasks: [
          "Crayon, marker and pencil lifted where the paint allows",
          "Sticker and tape residue softened off rather than scraped",
          "Headboard and bedside rub marks",
          "Scuffs behind doors and along the baseboards",
        ],
      },
      {
        room: "Bathrooms and laundry",
        tasks: [
          "Splash marks and dried product runs",
          "Hairspray film beside the vanity",
          "Mildew spotting on paint where the finish allows",
          "Walls behind and beside the machines",
        ],
      },
      {
        room: "Finish and hand-back",
        tasks: [
          "Cleaned areas feathered out so no patch is left standing",
          "Trim and baseboards wiped to match",
          "Floors under the work vacuumed and mopped",
          "Anything that did not lift photographed and listed for you",
        ],
      },
    ],
    extras: [
      "A full wall wash rather than spot work",
      "Ceilings, where they are reachable",
      "Doors and trim washed throughout",
    ],
    notIncluded: [
      "Painting, priming or touch-up of any kind",
      "Patching, filling or drywall repair",
      "Wallpaper, limewash and unsealed specialty finishes",
      "Smoke, soot and water damage restoration",
      "Any promise that a particular stain will come out",
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/* --------------------------------------------------------------------------
   Cities
   -------------------------------------------------------------------------- */

export type City = {
  slug: string;
  name: string;
  lede: string;
  body: string[];
  neighbourhoods: string[];
  note: string;
};

export const cities: City[] = [
  {
    slug: "edmonton",
    name: "Edmonton",
    lede: "River valley character homes, Whyte Ave walk-ups, and everything south of the Henday.",
    body: [
      "Edmonton runs colder and longer, and the houses are older on average. That means more original hardwood, more painted trim, and more surfaces that a wet mop will quietly ruin over a year. Our cleaners here are briefed on finish before they are briefed on anything else.",
      "Winter also means we plan around it. If a visit falls on a day the roads have genuinely gone, we call you the night before and move it, rather than sending someone who arrives late and rushes.",
    ],
    neighbourhoods: [
      "Old Strathcona",
      "Garneau",
      "Westmount",
      "Highlands",
      "Glenora",
      "Ritchie",
      "Bonnie Doon",
      "Crestwood",
      "Windermere",
      "Terwillegar",
      "Griesbach",
      "Laurel",
      "Ottewell",
      "Oliver",
      "Belgravia",
    ],
    note: "Edmonton quotes are returned within one working day.",
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);

/* --------------------------------------------------------------------------
   Reviews: authored demo testimonials. Not collected, not verified, and
   deliberately not attributed to any review platform.
   -------------------------------------------------------------------------- */

export type Review = {
  name: string;
  where: string;
  service: string;
  stars: number;
  quote: string;
  months: string;
};

export const reviews: Review[] = [
  {
    name: "Dan W.",
    where: "Highlands, Edmonton",
    service: "Move-out",
    stars: 5,
    quote:
      "Possession was Friday at noon. They came Wednesday, which I thought was overkill until they found a problem in the oven that took most of the afternoon to put right. Deposit came back in full. On the day itself I would have been sunk.",
    months: "Booked March 2025",
  },
  {
    name: "Sarah L.",
    where: "Strathcona, Edmonton",
    service: "Deep clean",
    stars: 5,
    quote:
      "I have paid more for less. The thing that got me was the grout: actually done, line by line, not just wiped over and photographed at a flattering angle.",
    months: "Booked twice",
  },
  {
    name: "Jen T.",
    where: "Terwillegar, Edmonton",
    service: "One-time",
    stars: 4,
    quote:
      "Excellent clean, and honest about what they were not going to get to in the time booked. I would rather hear that up front than find out at the end. Only knocking a star because getting the first booking took a couple of days.",
    months: "Booked January 2026",
  },
  {
    name: "Colleen B.",
    where: "Oliver, Edmonton",
    service: "Deep clean",
    stars: 5,
    quote:
      "They took the vent covers off. Nobody takes the vent covers off. I did not know they came off.",
    months: "Booked November 2025",
  },
  {
    name: "Ross and Ellie K.",
    where: "Ritchie, Edmonton",
    service: "Move-in",
    stars: 5,
    quote:
      "We booked it for the day before the truck came and walking into an empty, actually-clean house was the only calm moment of that entire month.",
    months: "Booked August 2025",
  },
  {
    name: "Tom H.",
    where: "Westmount, Edmonton",
    service: "One-time",
    stars: 5,
    quote:
      "Booked one clean before my parents visited, mostly to prove a point to myself. It was exactly the reset the house needed.",
    months: "Client for 6 months",
  },
  {
    name: "Bianca S.",
    where: "Griesbach, Edmonton",
    service: "Move-out",
    stars: 5,
    quote:
      "The quote was the price. Nothing was added at the end, and nothing was discovered at the end either. That is apparently rare and it should not be.",
    months: "Booked October 2025",
  },
  {
    name: "Marc-André T.",
    where: "Ritchie, Edmonton",
    service: "Post-construction",
    stars: 5,
    quote:
      "We did the whole main floor and I thought the builder's clean-up was the clean. It was not. They came once when the site was handed over, then again the following week for the dust that was still coming down, which they had told me about in advance and I had not believed.",
    months: "Booked June 2025",
  },
  {
    name: "Alina K.",
    where: "Glenora, Edmonton",
    service: "Steam carpet",
    stars: 5,
    quote:
      "Two lanes down the hallway that I had written off. She said one would lift and one probably would not, and she was right on both, which is the part I would tell people about. Dry before we needed the room back.",
    months: "Booked August 2025",
  },
  {
    name: "Jenna R.",
    where: "Laurel, Edmonton",
    service: "Wall stains",
    stars: 4,
    quote:
      "Crayon, three years of it, gone off the hallway. He was straight with me that the water mark by the window was not coming out with anything he had, so we left it for the painter. I would rather hear that at the start.",
    months: "Booked May 2025",
  },
];

/* --------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */

export const faqs: { q: string; a: string; group: string }[] = [
  {
    group: "The cleaner",
    q: "Do I really get the same cleaner every time?",
    a: "Yes. That is the whole arrangement. You are matched with one cleaner who keeps your home for as long as you are with us. If they are sick or on holiday we tell you before the visit and send the same named substitute each time, so at most two people ever learn your home rather than nine.",
  },
  {
    group: "The cleaner",
    q: "What happens if I do not get on with my cleaner?",
    a: "Tell us and we rematch you, once, no explanation required and no awkward conversation on your doorstep. The fit matters more than the schedule and we would rather move it than lose you over it.",
  },
  {
    group: "The cleaner",
    q: "Do I need to be home?",
    a: "No. Most clients are at work. You can leave a key, a lockbox code, or let them in for the visit and arrange access from there. Whatever you choose, it is recorded once and does not need re-explaining.",
  },
  {
    group: "Money",
    q: "Is the quoted price the final price?",
    a: "The quote is the price for the scope you agreed to. If we arrive and the job is genuinely bigger than described, say a deep clean booked as a one-time, we call you before we start and you decide. We never add to an invoice after the fact.",
  },
  {
    group: "Money",
    q: "Do you charge by the hour?",
    a: "No. You are quoted for the job. If it takes longer than we estimated, that is our problem to absorb, and it means our estimate was wrong, which is a thing we would like to know about.",
  },
  {
    group: "The visit",
    q: "Do you bring your own supplies?",
    a: "Everything, including the vacuum. If you would rather we used a specific product on a specific surface, leave it out and it goes on your home's sheet permanently.",
  },
  {
    group: "The visit",
    q: "What about pets?",
    a: "Fine, and worth telling us about in the quote, not because it changes the price but because it changes the plan. Tell us where the dog goes during the visit and whether the cat is an escape risk at the front door.",
  },
  {
    group: "Scheduling",
    q: "How far ahead should I book a move clean?",
    a: "As soon as you have a possession date. We schedule move cleans well before handover so that anything found late in the clean can still be fixed before the inspection.",
  },
  {
    group: "Scheduling",
    q: "What if something is not right?",
    a: "Tell us within 48 hours with a photo and your cleaner comes back and redoes that area. Not the whole house, not a credit note. The actual thing, actually fixed.",
  },
  {
    group: "Carpets, walls and renovations",
    q: "How long does carpet take to dry?",
    a: "Stay off it for the rest of the afternoon, and leave heavy furniture until the next day. We extract with less water and more passes specifically to keep the drying short, and if you need it back sooner we can leave air movers running.",
  },
  {
    group: "Carpets, walls and renovations",
    q: "Will the stain actually come out?",
    a: "Sometimes, and we will tell you which before we start rather than after. Soil, grease, food and most pet accidents lift. Dye, bleach and ink are not dirt sitting on the fibre, they have changed its colour, and no amount of extraction brings that back. We do not promise a result we cannot see coming.",
  },
  {
    group: "Carpets, walls and renovations",
    q: "Can you clean walls without wrecking the paint?",
    a: "Usually, and the risk is not the mark, it is burnishing: scrubbing hard enough that the cleaned patch ends up shinier than the wall around it. We test behind a door first, work up from the gentlest method, and stop when the next step would cost you the finish. On flat paint that sometimes means the honest answer is a coat of paint.",
  },
  {
    group: "Carpets, walls and renovations",
    q: "When should I book the post-construction clean?",
    a: "After the last trade leaves and the debris is gone, not before. If the painter is coming back for a second coat, book us after them. We also do a lot of these in two visits: one when the site is handed over, and a lighter pass a week later once the dust that was still airborne has finished landing.",
  },
];

/* --------------------------------------------------------------------------
   Blog
   -------------------------------------------------------------------------- */

export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  displayDate: string;
  minutes: number;
  tag: string;
  body: { h?: string; p: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "salt-and-grit-alberta-entryways",
    title: "The entryway is the whole battle",
    dek: "Six months of road salt comes through your front door on everybody's boots. Where it goes next is up to you.",
    date: "2026-02-18",
    displayDate: "18 February 2026",
    minutes: 5,
    tag: "Winter",
    body: [
      {
        p: [
          "Every Alberta house has the same wear pattern, and it starts at the door. Salt and gravel arrive on boots, get walked ten feet down the hall, and then spend the winter being ground into whatever finish is unlucky enough to be there.",
          "Most people fight this at the far end: mopping the hallway, re-mopping the hallway, wondering why the hallway never looks right. The hallway is not the problem.",
        ],
      },
      {
        h: "Salt does not sweep",
        p: [
          "Dry salt crystals are the easy half. The half that ruins floors is the brine: salt that has dissolved in melted snow, wicked into grout and unsealed stone, and then dried again as a white bloom. Sweeping moves the crystals and leaves the brine behind.",
          "Warm water and a neutral cleaner, twice, with a rinse between, is what actually lifts it. On tile, that means getting into the grout lines with something stiffer than a mop head.",
        ],
      },
      {
        h: "A boot tray is a piece of cleaning equipment",
        p: [
          "Not a doormat: a tray with a lip, deep enough to hold meltwater. It works because it changes where the water stops. Everything that would have travelled down your hall is now sitting in four square feet you can lift and rinse in a sink.",
          "The good ones are ugly. Buy the ugly one.",
        ],
      },
      {
        h: "What we actually do at the threshold",
        p: [
          "Our cleaners start at the entry on every visit, before anything else, because a clean entry stops re-contaminating the rooms behind it for the rest of the clean. It is the least glamorous part of the visit and it decides how the rest of it goes.",
        ],
      },
    ],
  },
  {
    slug: "what-a-deep-clean-actually-includes",
    title: "What a deep clean actually includes",
    dek: "It is not a regular clean done harder. It is a different list, and the difference is mostly things that come apart.",
    date: "2026-01-27",
    displayDate: "27 January 2026",
    minutes: 6,
    tag: "Services",
    body: [
      {
        p: [
          "The phrase gets used loosely enough to be meaningless. Some companies mean a longer visit. Some mean the same visit with a bigger number attached. Here is the honest distinction.",
        ],
      },
      {
        h: "A one-time clean maintains a state",
        p: [
          "It assumes the house was clean recently and returns it to that. Surfaces get wiped, floors get done, bathrooms get reset. Nothing is dismantled, because nothing needs to be.",
        ],
      },
      {
        h: "A deep clean changes the state",
        p: [
          "Vent covers come off. The range hood filter goes in the sink. Baseboards get washed rather than dusted. That is a real difference, because dusting a baseboard that has six months of kitchen grease on it just relocates the grease.",
          "Cabinets get emptied at the areas that matter, the fridge comes apart down to the crisper runners, and the oven gets taken properly apart rather than given a wipe of the door glass.",
        ],
      },
      {
        h: "How to tell which one you need",
        p: [
          "If you cannot remember the last time anything was moved, it is a deep clean. If you are looking at one specific thing that has gotten away from you, like the oven or the shower glass, that might just be an add-on to a normal visit, and we will tell you so rather than upselling you.",
        ],
      },
    ],
  },
  {
    slug: "getting-your-damage-deposit-back",
    title: "Getting your damage deposit back",
    dek: "An empty rental hides nothing. Here is the order an inspector actually walks it in.",
    date: "2025-12-09",
    displayDate: "9 December 2025",
    minutes: 7,
    tag: "Moving",
    body: [
      {
        p: [
          "Deposits are rarely lost over big things. They are lost over a list of small ones, written down by somebody standing in an empty room with excellent sightlines and nothing to distract them.",
        ],
      },
      {
        h: "They start where you stopped looking",
        p: [
          "Inside the oven. Behind where the fridge stood. The inside faces of cabinet doors. The window tracks. The extractor fan cover in the bathroom. Every one of these is invisible while you live there and unmissable once the furniture is gone.",
        ],
      },
      {
        h: "Book the clean before the last day",
        p: [
          "This is the single most useful thing in this article. A move-out clean scheduled the morning of handover has no slack in it. If the oven turns out to be a job in its own right, you find out at the moment you can least afford to.",
          "One clear day between the clean and the handover turns a crisis into an errand.",
        ],
      },
      {
        h: "Photograph it after, not before",
        p: [
          "Take dated photographs of the empty, cleaned unit from the doorway of every room. It costs four minutes and it is the only evidence that exists on your side of the conversation.",
        ],
      },
    ],
  },
  {
    slug: "why-we-send-the-same-cleaner",
    title: "Why we send the same cleaner",
    dek: "It is more expensive to run and harder to schedule. We do it because the alternative does not work.",
    date: "2025-11-14",
    displayDate: "14 November 2025",
    minutes: 4,
    tag: "How we work",
    body: [
      {
        p: [
          "The standard model in this industry is a pool. Whoever is free takes the job. It is efficient on paper and it is the reason most people's experience of cleaning companies is a slow decline followed by a cancellation.",
        ],
      },
      {
        h: "A rotating crew cannot accumulate knowledge",
        p: [
          "Every visit starts from zero. Where the vacuum lives, which room is off-limits, that the dining table is a soft finish and takes no spray at all: none of it survives into the next visit, because the next visit is a different person who was told none of it.",
          "So the client re-explains, or stops re-explaining and quietly starts noticing that it is not as good as it was.",
        ],
      },
      {
        h: "One person learns your house in about four visits",
        p: [
          "After that the same visit buys noticeably more, because none of it is being spent on orientation. This is the entire economic argument, and it is why we can hold a quote without cutting the clean short.",
        ],
      },
      {
        h: "What it costs us",
        p: [
          "Scheduling is harder. Sickness is harder. Growth is slower, because we cannot take a client we cannot cover consistently. We think that is the correct set of problems to have.",
        ],
      },
    ],
  },
  {
    slug: "products-that-quietly-ruin-floors",
    title: "Five products that quietly ruin the thing you used them on",
    dek: "Nothing here fails immediately. That is what makes them dangerous.",
    date: "2025-10-02",
    displayDate: "2 October 2025",
    minutes: 5,
    tag: "Care",
    body: [
      {
        p: [
          "Damage from cleaning products almost never looks like damage on the day. It looks fine, and then eleven months later a floor has gone cloudy and nobody can point at the moment it happened.",
        ],
      },
      {
        h: "Vinegar on natural stone",
        p: [
          "Marble, limestone and travertine are calcium carbonate. Acid dissolves them. Each wipe etches a little, the polish goes, and it does not come back without refinishing.",
        ],
      },
      {
        h: "Oil soaps on polyurethane hardwood",
        p: [
          "They leave a film that builds. The floor looks conditioned for a week and then starts holding every footprint, and worse, refinishing will not bond over the residue later.",
        ],
      },
      {
        h: "Bleach on grout",
        p: [
          "It whitens the surface and degrades the binder underneath. Grout that has been bleached repeatedly goes chalky and starts shedding.",
        ],
      },
      {
        h: "Glass cleaner on coated screens",
        p: [
          "Ammonia strips anti-glare coatings. There is no repair; the panel is simply worse from then on.",
        ],
      },
      {
        h: "Magic-eraser foam on satin paint",
        p: [
          "It is a fine abrasive. It removes the mark and a thin layer of the sheen with it, leaving a permanently duller patch that is most visible in exactly the light you noticed the mark in.",
        ],
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
