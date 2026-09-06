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
  phoneDisplay: "(403) 555-0148",
  phoneHref: "+14035550148",
  email: "hello@buildbright.example",
  cities: ["Calgary", "Edmonton"] as const,
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
  from: number;
  hours: [number, number];
  cadence: string;
  forWho: string;
  lede: string;
  body: string[];
  rooms: { room: string; tasks: string[] }[];
  extras: string[];
  notIncluded: string[];
};

export const services: Service[] = [
  {
    slug: "recurring",
    name: "Recurring clean",
    shortName: "Recurring",
    dek: "The one that ends the argument about whose turn it is.",
    from: 149,
    hours: [2, 3],
    cadence: "Weekly, biweekly or monthly",
    forWho: "Households who want it handled and never want to think about it again.",
    lede: "Your cleaner learns your home once, then keeps it. Same person, same day, same standard: the visit you stop having to manage.",
    body: [
      "The first visit is the long one. Your cleaner walks the house with you, writes down what matters: the counter you want cleared, the room the dog is not allowed in, the mug that is not to be moved. That sheet stays with your home for as long as you are with us.",
      "After that, the visits get shorter and better. Nobody is relearning where you keep the vacuum. Nobody is guessing whether the hardwood takes a wet mop. By the fourth visit your cleaner is finding the things you did not think to ask for.",
      "If your regular cleaner is sick or on holiday, we tell you before the visit, not after, and we send the same substitute each time so there are only ever two people who know your home instead of nine.",
    ],
    rooms: [
      {
        room: "Kitchen",
        tasks: [
          "Counters, backsplash and sink scrubbed",
          "Exterior of every appliance, handles included",
          "Cooktop degreased, range hood face wiped",
          "Floors vacuumed then damp-mopped",
          "Bins emptied and liners replaced",
        ],
      },
      {
        room: "Bathrooms",
        tasks: [
          "Tub, shower and glass descaled",
          "Toilet cleaned base to tank",
          "Mirrors and chrome polished streak-free",
          "Floors washed by hand at the edges",
          "Towels straightened, paper restocked",
        ],
      },
      {
        room: "Bedrooms",
        tasks: [
          "Beds made, linens changed when left out",
          "All reachable surfaces dusted",
          "Under-bed vacuumed where accessible",
          "Mirrors and glass cleared",
        ],
      },
      {
        room: "Living areas",
        tasks: [
          "Upholstery vacuumed, cushions reset",
          "Baseboards, sills and ledges dusted",
          "Screens and remotes wiped",
          "Floors vacuumed and mopped",
        ],
      },
      {
        room: "Entry and stairs",
        tasks: [
          "Boot tray cleared of salt and grit",
          "Stair treads and risers vacuumed",
          "Railings and switch plates wiped",
          "Door glass cleaned inside and out",
        ],
      },
      {
        room: "Laundry",
        tasks: [
          "Machine tops and fronts wiped",
          "Lint trap cleared",
          "Sink and counter scrubbed",
          "Floor vacuumed and mopped",
        ],
      },
    ],
    extras: ["Inside the fridge", "Inside the oven", "Interior windows", "Laundry folded"],
    notIncluded: [
      "Exterior windows above ground level",
      "Carpet steam extraction",
      "Anything requiring a ladder over six feet",
    ],
  },
  {
    slug: "deep",
    name: "Deep clean",
    shortName: "Deep",
    dek: "For the places a weekly clean politely walks past.",
    from: 289,
    hours: [4, 6],
    cadence: "One visit, once or twice a year",
    forWho: "Homes that have been maintained but not reset, or are about to host.",
    lede: "Everything a recurring clean covers, plus the parts nobody gets to: inside, behind, underneath, and above eye level.",
    body: [
      "A deep clean is not a faster clean with more pressure. It is a different list. Baseboards get washed rather than dusted. Cabinet fronts get degreased at the handles where the finish has gone tacky. Vents come off. Light fixtures come down.",
      "We book deep cleans in a single unbroken block so nothing is left half-dismantled. If the house needs seven hours, we quote seven hours. We would rather lose the job than start something we have to abandon at five.",
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
      "Post-construction dust (book the move-out clean)",
      "Pest treatment",
    ],
  },
  {
    slug: "move-in-out",
    name: "Move-in / move-out clean",
    shortName: "Move-in / out",
    dek: "Written against the inspection, not against a general idea of clean.",
    from: 339,
    hours: [5, 7],
    cadence: "One visit, keyed to your possession date",
    forWho: "Anyone with a hard date, an empty house, and a deposit on the line.",
    lede: "An empty home hides nothing. We clean it in the order an inspector walks it, and we finish before your handover, not on the day of it.",
    body: [
      "Move cleans are the only job we schedule backwards. You tell us when the keys change hands; we book the visit far enough ahead that a problem found at hour five can still be fixed.",
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
      "Carpet steam extraction",
      "Repairs and patching of any kind",
    ],
  },
  {
    slug: "one-time",
    name: "One-time clean",
    shortName: "One-time",
    dek: "The reset before the guests, or after them.",
    from: 189,
    hours: [3, 4],
    cadence: "Single visit, no commitment",
    forWho: "People who need one very good day and no ongoing arrangement.",
    lede: "A full clean of the whole home with no subscription attached. Book it, watch how it goes, decide about the rest later.",
    body: [
      "Most of our recurring clients started here. A one-time clean is the same standard and the same person you would get on a recurring plan, without asking you to commit to a stranger on the strength of a website.",
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
    notIncluded: ["Inside cabinets", "Behind heavy appliances", "Wall washing"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/* Estimate model: illustrative only. Demo figures, not a real price list. */
export const estimate = (serviceSlug: string, beds: number, baths: number) => {
  const service = serviceBySlug(serviceSlug);
  if (!service) return null;
  const base = service.from;
  const perBed = { recurring: 22, deep: 44, "move-in-out": 52, "one-time": 28 }[serviceSlug] ?? 25;
  const perBath = { recurring: 26, deep: 55, "move-in-out": 64, "one-time": 34 }[serviceSlug] ?? 30;
  const low = base + Math.max(0, beds - 1) * perBed + Math.max(0, baths - 1) * perBath;
  return { low, high: Math.round((low * 1.22) / 5) * 5 };
};

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
    slug: "calgary",
    name: "Calgary",
    lede: "From the inner-city walk-ups to the new builds out past Stoney Trail.",
    body: [
      "Calgary homes have a specific problem, and it is the entryway. Six months of road salt and gravel comes through the front door on everybody's boots and then travels. Our cleaners here start at the threshold and work inward, because if you get the entry wrong you spend the rest of the visit spreading it around.",
      "Chinooks are the second one. A twenty-degree swing in a day pulls moisture out of everything, then puts it back. It is why we hand-wash window tracks in this city rather than just vacuuming them.",
    ],
    neighbourhoods: [
      "Altadore",
      "Bridgeland",
      "Killarney",
      "Inglewood",
      "Mount Pleasant",
      "Marda Loop",
      "Renfrew",
      "Bowness",
      "Auburn Bay",
      "Mahogany",
      "Tuscany",
      "Evanston",
    ],
    note: "Most Calgary quotes are returned the same working day.",
  },
  {
    slug: "edmonton",
    name: "Edmonton",
    lede: "River valley character homes, Whyte Ave walk-ups, and everything south of the Henday.",
    body: [
      "Edmonton runs colder and longer, and the houses are older on average. That means more original hardwood, more painted trim, and more surfaces that a wet mop will quietly ruin over a year. Our cleaners here are briefed on finish before they are briefed on anything else.",
      "Winter also means we plan around it. If a visit falls on a day the roads have genuinely gone, we call you the night before and move it, rather than sending someone who arrives an hour late and rushes.",
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
    name: "Priya M.",
    where: "Altadore, Calgary",
    service: "Recurring, biweekly",
    stars: 5,
    quote:
      "It is the same person every second Thursday and that is the entire reason I stayed. She knows the front closet is a disaster zone and she knows I do not want her touching my husband's desk. I have never had to explain either thing twice.",
    months: "Client for 14 months",
  },
  {
    name: "Dan W.",
    where: "Highlands, Edmonton",
    service: "Move-out",
    stars: 5,
    quote:
      "Possession was Friday at noon. They came Wednesday, which I thought was overkill until they found a problem in the oven that took an extra two hours. Deposit came back in full. On the day itself I would have been sunk.",
    months: "Booked March 2025",
  },
  {
    name: "Sarah L.",
    where: "Bridgeland, Calgary",
    service: "Deep clean",
    stars: 5,
    quote:
      "I have paid more for less. The thing that got me was the grout: actually done, line by line, not just wiped over and photographed at a flattering angle.",
    months: "Booked twice",
  },
  {
    name: "Marcus O.",
    where: "Garneau, Edmonton",
    service: "Recurring, weekly",
    stars: 5,
    quote:
      "Our house is 1912 with original fir floors and I have watched two previous companies wreck sections of it with a soaking mop. Build Bright asked about the finish before they asked about the price.",
    months: "Client for 2 years",
  },
  {
    name: "Jen T.",
    where: "Mahogany, Calgary",
    service: "One-time",
    stars: 4,
    quote:
      "Excellent clean, and honest about what they were not going to get to in the time booked. I would rather hear that up front than find out at the end. Only knocking a star because getting the first booking took a couple of days.",
    months: "Booked January 2026",
  },
  {
    name: "Ahmed R.",
    where: "Windermere, Edmonton",
    service: "Recurring, monthly",
    stars: 5,
    quote:
      "Two kids, a dog, and both of us working. The monthly reset is the only reason this house is survivable. Same cleaner since the first visit and she is genuinely part of how the place runs now.",
    months: "Client for 8 months",
  },
  {
    name: "Colleen B.",
    where: "Inglewood, Calgary",
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
      "We booked it for the day before the truck came and walking into an empty, actually-clean house was the only calm hour of that entire month.",
    months: "Booked August 2025",
  },
  {
    name: "Nadia F.",
    where: "Killarney, Calgary",
    service: "Recurring, biweekly",
    stars: 4,
    quote:
      "Very good, very consistent. My regular was away in December and they told me in advance and sent the same backup both times, which I appreciated more than I expected to.",
    months: "Client for 11 months",
  },
  {
    name: "Tom H.",
    where: "Westmount, Edmonton",
    service: "One-time",
    stars: 5,
    quote:
      "Booked one clean before my parents visited, mostly to prove a point to myself. Ended up on the recurring plan by February.",
    months: "Client for 6 months",
  },
  {
    name: "Bianca S.",
    where: "Evanston, Calgary",
    service: "Move-out",
    stars: 5,
    quote:
      "The quote was the price. Nothing was added at the end, and nothing was discovered at the end either. That is apparently rare and it should not be.",
    months: "Booked October 2025",
  },
  {
    name: "Greg P.",
    where: "Crestwood, Edmonton",
    service: "Recurring, biweekly",
    stars: 5,
    quote:
      "Six months in, the house is at a level I could not hold on my own even when I had time. I stopped tidying before they come, which was the real test.",
    months: "Client for 6 months",
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
    a: "No. Most of our recurring clients are at work. You can leave a key, a lockbox code, or let them in the first time and arrange access from there. Whatever you choose, it is recorded once and does not need re-explaining.",
  },
  {
    group: "Money",
    q: "Is the quoted price the final price?",
    a: "The quote is the price for the scope you agreed to. If we arrive and the job is genuinely bigger than described, say a deep clean booked as a one-time, we call you before we start and you decide. We never add to an invoice after the fact.",
  },
  {
    group: "Money",
    q: "Why are your prices a range?",
    a: "Because a three-bedroom bungalow and a three-bedroom infill are not the same job. The starting-at figure covers a one-bedroom; the quote form adds rooms and bathrooms and returns a real number.",
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
    group: "The visit",
    q: "How long does a visit take?",
    a: "A recurring clean of an average home runs two to three hours. A deep clean is four to six. A move clean is five to seven and is booked as one unbroken block. Your quote gives the estimate for your home specifically.",
  },
  {
    group: "Scheduling",
    q: "How far ahead should I book a move clean?",
    a: "As soon as you have a possession date. We schedule move cleans at least one full day before handover so that anything found at hour five can still be fixed before the inspection.",
  },
  {
    group: "Scheduling",
    q: "Can I skip or move a recurring visit?",
    a: "Yes, with two days' notice, as often as you need. Holidays, renovations, a week where it is genuinely not worth it. Just tell us.",
  },
  {
    group: "Scheduling",
    q: "What if something is not right?",
    a: "Tell us within 48 hours with a photo and your cleaner comes back and redoes that area. Not the whole house, not a credit note. The actual thing, actually fixed.",
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
          "Our cleaners start at the entry on every visit, before anything else, because a clean entry stops re-contaminating the rooms behind it for the next two hours. It is the least glamorous fifteen minutes of the visit and it decides how the rest of it goes.",
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
        h: "A recurring clean maintains a state",
        p: [
          "It assumes the house was clean recently and returns it to that. Surfaces get wiped, floors get done, bathrooms get reset. Nothing is dismantled, because nothing needs to be.",
        ],
      },
      {
        h: "A deep clean changes the state",
        p: [
          "Vent covers come off. The range hood filter goes in the sink. Baseboards get washed rather than dusted. That is a real difference, because dusting a baseboard that has six months of kitchen grease on it just relocates the grease.",
          "Cabinets get emptied at the areas that matter, the fridge comes apart down to the crisper runners, and the oven gets the full two hours it deserves rather than a wipe of the door glass.",
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
          "This is the single most useful thing in this article. A move-out clean scheduled the morning of handover has no slack in it. If the oven turns out to be a three-hour job, you find out at the moment you can least afford to.",
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
          "After that the same two hours buys noticeably more, because none of it is being spent on orientation. This is the entire economic argument, and it is why we can hold a price without cutting the visit short.",
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
