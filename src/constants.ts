import { Product } from './types';

export const CATEGORIES = [
  { id: 'all', label: 'All Supplies', description: 'Explore full catalog', count: 19 },
  { id: 'dogs', label: 'Dogs & Puppies', description: 'Backpacks, collars & feeding', count: 6 },
  { id: 'cats', label: 'Cats & Kittens', description: 'Calming, grooming & comfort', count: 4 },
  { id: 'birds', label: 'Birds & Poultry', description: 'Feeders, cages & heating', count: 4 },
  { id: 'fish', label: 'Fish & Aquarium', description: 'Thermometers, pH & filters', count: 4 },
  { id: 'reptiles', label: 'Reptiles & Amphibians', description: 'Lamp stands, platforms & heat', count: 4 }
];

export const PRODUCTS: Product[] = [
  // --- DOGS ---
  {
    id: 'denim-backpack',
    name: 'Denim Pet Dog Backpack',
    sku: 'DOG-BG-01',
    description: 'A stylish, rugged denim backpack designed to carry your dog comfortably while keeping them secure with integrated safety buckles and premium ventilation meshes.',
    category: 'dogs',
    price: 49.95,
    originalPrice: 65.00,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 142,
    isBestSeller: true,
    inStock: true,
    weightVolume: 'Supports up to 8kg',
    benefits: [
      'Ergonomic, padded shoulder straps for human comfort',
      'Dual breathable mesh windows for fresh air flow',
      'Internal security clip attaches directly to pet harness',
      'Two side pockets for keys, treats, and waste bags'
    ],
    specs: {
      Material: 'Pre-washed Raw Denim & Breathable Polyester Mesh',
      Dimensions: '42cm x 32cm x 25cm',
      Closure: 'Heavy-duty Japanese YKK Zippers',
      Cleanability: 'Hand wash cold or gentle machine spot cleaning'
    }
  },
  {
    id: 'raised-bowl',
    name: '15° Raised Stainless Steel Pet Bowl',
    sku: 'DOG-BW-02',
    description: 'Perfect for dogs and cats alike. This 15-degree tilted bowl reduces neck strain and helps prevent digestive issues by promoting a natural eating posture.',
    category: 'dogs',
    price: 29.95,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1535268647977-a403b69fc756?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 203,
    isNew: true,
    inStock: true,
    weightVolume: '450ml Capacity',
    benefits: [
      '15-degree orthopedic tilt reduces spinal & joints impact',
      'Removable food-grade SUS304 stainless steel basin',
      'Anti-slip, non-tip stable weighted composite base',
      'Dishwasher safe and extremely easy to sterilize'
    ],
    specs: {
      BowlMaterial: 'Food-Grade SUS304 Stainless Steel',
      BaseMaterial: 'Non-toxic weighted ABS Polymer',
      BowlDiameter: '14cm',
      BaseWeight: '450g'
    }
  },
  {
    id: 'adjustable-soft-ecollar',
    name: 'Adjustable Soft E-Collar | Padded Edge',
    sku: 'DOG-EC-03',
    description: 'A comfortable alternative to rigid plastic cones. Featuring soft padded cotton lining, quick adjustable toggles, and absolute visual freedom for post-op recovery.',
    category: 'dogs',
    price: 24.99,
    originalPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    weightVolume: 'Available S, M, L',
    benefits: [
      'Soft flexible edges prevent damage to walls and furniture',
      'Waterproof, water-resistant exterior wipes dry instantly',
      'Allows pets to eat, sleep, and play without restriction',
      'Adjustable drawstring lock ensures a secure, personalized fit'
    ],
    specs: {
      Core: 'High-density Memory Foam',
      OuterCoverImage: 'Premium Water-resistant Oxford Textile',
      Padding: 'Hypoallergenic Virgin PP Cotton Filling',
      Sizing: 'S: 15-20cm, M: 20-26cm, L: 26-34cm Neck Girth'
    }
  },
  {
    id: 'dog-calming-collar',
    name: 'Dog Calming Collar | 60-Day Pheromone Relief',
    sku: 'DOG-CL-04',
    description: 'Alleviate anxiety, separation fear, loud noises, and training stress. Uses safe, maternal pheromone technology activated by body temperature for 60 days.',
    category: 'dogs',
    price: 19.99,
    originalPrice: 28.00,
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 312,
    isBestSeller: true,
    inStock: true,
    weightVolume: 'One Size fits all (62cm)',
    benefits: [
      'Provides steady pheromone release for up to 60 continuous days',
      'Instantly reduces barking, destructive chewing, and shaking',
      'Pleasant, calming essential lavender & chamomile infusion',
      'Snaps easily to fit perfectly; trim the excess to custom size'
    ],
    specs: {
      ActiveIngredient: 'Maternal Pheromone Mimic (1%), Essential Oils (Chamomile, Lavender)',
      Duration: 'Up to 60 Days constant emission',
      Safety: '100% Drug-Free, Vet Recommended, Safe for puppies',
      Length: '62cm total length, easily adjustable'
    }
  },
  {
    id: 'dog-whistle',
    name: 'Ultrasonic Dog Whistle | Adjustable Sound',
    sku: 'DOG-WT-05',
    description: 'An essential training whistle that allows you to configure multiple sound frequencies. Emits ultrasonic pitches humans cannot hear, but dogs follow with accuracy.',
    category: 'dogs',
    price: 12.50,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1bf0?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviewsCount: 78,
    inStock: true,
    weightVolume: 'Lightweight Training Kit',
    benefits: [
      'Adjustable pitch frequency screw facilitates customized command pairs',
      'Includes premium lanyard & anti-loss dust protective cap',
      'Precision machined solid build for rain or shines',
      'Ideal for stop-barking, retrieve recall, and hand-motion syncing'
    ],
    specs: {
      Material: 'Chromium-plated Solid Premium Brass',
      Lanyard: '60cm comfortable soft braided fabric',
      PitchRange: '10kHz to 18kHz training wavelengths'
    }
  },
  {
    id: 'dog-flea-tick-collar',
    name: 'Adjustable Flea & Tick Collar | 8-Month Guard',
    sku: 'DOG-FT-06',
    description: 'Keep your pet fully protected from biting parasites long-term. Safely repels fleas, ticks, larvae, and lice for up to 8 continuous months with premium natural formulas.',
    category: 'dogs',
    price: 34.95,
    originalPrice: 45.00,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 421,
    isNew: false,
    inStock: true,
    weightVolume: '8 Months Protection',
    benefits: [
      'Repels and kills ticks, fleas, and lice on physical contact',
      'Natural, hypoallergenic formula safe for adult animals & puppies over 7 weeks',
      '100% waterproof design—no need to remove during bath or swimming',
      'Sustained continuous release system protects full body surface'
    ],
    specs: {
      ActiveAgents: 'Natural Eucalyptus (6%), Citronella (15%), Lavender Oil (9%)',
      Dimensions: 'Adjusts up to 63cm Girth',
      WaterResistance: 'Fully IPX8 Waterproof'
    }
  },

  // --- CATS ---
  {
    id: 'cat-calming-collar',
    name: 'Cat Calming Collar | 60-Day Pheromone Relief',
    sku: 'CAT-CL-01',
    description: 'Specifically engineered for feline behavioral support. Mimics the comforting feline facial pheromone to curb indoor scratching, marking, and multi-cat tension.',
    category: 'cats',
    price: 19.99,
    originalPrice: 28.00,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 189,
    isBestSeller: true,
    inStock: true,
    weightVolume: '38cm Length',
    benefits: [
      'Calms cat during Vet visits, boarding, fireworks, and storm cycles',
      'Suppresses destructive territorial vertical scratching and room peeing',
      'Self-breaking safety latch quickly releases if snagged on branches',
      'Clinical-grade synthetic feline pheromone analog (100% safe)'
    ],
    specs: {
      Mechanism: 'Feline Facial Pheromone analogue + Relaxing herbal elements',
      Size: '38cm with fully cuttable design',
      Lifespan: 'Releases calming particles for 60 active days'
    }
  },
  {
    id: 'cat-soft-ecollar',
    name: 'Adjustable Cat Soft E-Collar | Padded Edge',
    sku: 'CAT-EC-02',
    description: 'A soft, cushion-like collar for cats in recovering state. Keeps cats from biting wounds, but allows them to eat catnip, play with laser tags, and nap happily.',
    category: 'cats',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 94,
    inStock: true,
    weightVolume: 'Adjustable XS, S, M',
    benefits: [
      'Padded edge acts like a neck travel pillow for deep cozy naps',
      'Light enough to not interfere with jump coordination',
      'Prevents grooming or licking of torso, paws, and upper body',
      'Water-repellent, wipe-off surface ensures clean meal times'
    ],
    specs: {
      Sizing: 'XS: 13-17cm, S: 17-21cm, M: 21-25cm neck'
    }
  },
  {
    id: 'cat-flea-tick-collar',
    name: 'Adjustable Cat Flea & Tick Collar | 8 Month',
    sku: 'CAT-FT-03',
    description: 'Provides long-lasting defense against insects. Specially crafted for cats, this water-resistant herbal collar operates non-stop for up to eight months.',
    category: 'cats',
    price: 34.95,
    originalPrice: 45.00,
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 165,
    inStock: true,
    weightVolume: '8 Months Guard',
    benefits: [
      'Immediate action—kills newly acquired fleas within 24 hours of attachment',
      'Slow-release matrix spreads active compound across lipid layer',
      'Fragrance-free and non-greasy collar feels like a normal collar',
      'Safety breakaway point releases if cat gets stuck in tight bushes'
    ],
    specs: {
      Ingredients: 'Citronella Oil, Thyme Compound, Eucalyptus essential extract',
      Weight: '22g lightweight fit'
    }
  },
  {
    id: 'cat-flea-collar-natural',
    name: 'Anti-Flea & Tick Collar | Natural & Waterproof',
    sku: 'CAT-FT-04',
    description: 'Eco-conscious natural deterrent for indoor and outdoor cats. Combats biting flies, ticks, flea vectors, and mites safely without strong industrial pesticides.',
    category: 'cats',
    price: 29.95,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviewsCount: 52,
    inStock: false,
    weightVolume: 'Aromatherapy Defence',
    benefits: [
      '100% organic plant-derived repellent with pleasant fresh scent',
      'Completely hypoallergenic and gentle on sensitive skin or pets with allergies',
      'Weather-resistant, does not wash off during heavy rain cycles',
      'Adjustable clasp logic with quick-clip snap-on'
    ],
    specs: {
      Composition: 'Organic Peppermint extract, lemongrass, rosemary leaf',
      Lifespan: 'Replacement recommended every 4 months'
    }
  },

  // --- BIRDS ---
  {
    id: 'bird-seed-catcher',
    name: 'Nylon Bird Cage Seed Catcher | Elastic Mesh',
    sku: 'BRD-SC-011',
    description: 'Avoid messy seed scattered all over your living room floors. This stretchy, airy birdcage seed catcher wraps snugly around your bird cage to collect debris.',
    category: 'birds',
    price: 16.99,
    originalPrice: 22.00,
    image: 'https://images.unsplash.com/photo-1480044965905-02098d419e96?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 172,
    isBestSeller: true,
    inStock: true,
    weightVolume: 'Universal Elastic Fit',
    benefits: [
      'Heavy-duty elastic draws seal tightly at the top and bottom of cage',
      'Allows light and air to distribute freely—does not cover or shade cage',
      'Machine washable mesh—dries in minutes after washing',
      'Trapper mesh holds hulls, dander, feathers, and tiny pellets securely'
    ],
    specs: {
      Material: 'High-density stretch Nylon netting',
      Height: '33cm width bands',
      CircumferenceRange: 'Fits cages from 100cm to 200cm in perimeter'
    }
  },
  {
    id: 'bird-clip-on-bath',
    name: 'Clip-On Bird Cage Bath & Feeder',
    sku: 'BRD-BF-02',
    description: 'Give your birds a refreshing splash! This neat acrylic accessory easily hooks onto any standard cage door to double as a clean feeder or bath-tub.',
    category: 'birds',
    price: 21.50,
    image: 'https://images.unsplash.com/photo-1522850959076-58c71a3a5312?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 81,
    inStock: true,
    weightVolume: 'Dual Hook Acrylic',
    benefits: [
      'Encourages proper hydration, preening, and healthy feather shine',
      'Sturdy heavy-grade acrylic blocks splashing waste outside the cage',
      'Comes with dual security steel hooks for inside or outside mounting',
      'Smooth non-slip footing bar keeps birds perched safely'
    ],
    specs: {
      Material: 'Transparent premium Food-Grade Acrylic',
      Size: '15cm x 13cm x 13cm',
      MountOptions: 'Double-Hook Hanging wire brackets'
    }
  },
  {
    id: 'heat-lamp-heavy',
    name: 'Infrared Heating Bulb Lamp 220V | 100W-275W',
    sku: 'BRD-HL-03',
    description: 'Deliver comforting localized heat to baby chicks, sick birds, or poultry brooders. Provides essential thermal warmth without disrupting the biological sleep rhythm.',
    category: 'birds',
    price: 39.99,
    originalPrice: 49.95,
    image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 114,
    isPremium: true,
    inStock: true,
    weightVolume: 'E27 socket, choice 150W/250W',
    benefits: [
      'Thickened explosion-proof hard quartz glass prevents accidental crack incidents',
      'Emits deep penetrating infrared heat rays for healthy blood circulation',
      'Highly resistant to sudden water droplets splattered by chicks',
      'Provides steady 24-hour heat source for nesting or nursery recovery'
    ],
    specs: {
      Base: 'Standard E27 screw connector',
      Voltage: '220V-240V compliant with Australian Standards',
      HeatingTech: 'Deep Penetrating Shortwave Infrared'
    }
  },
  {
    id: 'heat-lamp-small',
    name: 'Infrared Heating Lamp | E27 Red Heat Bulb',
    sku: 'BRD-HL-04',
    description: 'An excellent light-neutral heat source for small cages and brooders. Keeps nesting birds cozy during cold winter nights with targeted, non-luminous heat profiles.',
    category: 'birds',
    price: 34.95,
    image: 'https://images.unsplash.com/photo-1609137144814-7d5ec9bf9d29?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviewsCount: 46,
    inStock: true,
    weightVolume: '100W Heat Output',
    benefits: [
      'Releases comforting red glow to stimulate sleep hormones',
      'Fits standard home E27 light fixtures and heating domes',
      'Durable filament allows up to 6,000 hours of operations',
      'Excellent for chickens, parakeets, nested finches, and budgies'
    ],
    specs: {
      BulbType: 'Standard Spot Focus R95 red coating glass',
      Output: '100 Watts',
      Warranty: '12 Months replacement warranty'
    }
  },

  // --- FISH ---
  {
    id: 'aquarium-thermometer',
    name: 'Digital Aquarium Thermometer | Adhesive Mount',
    sku: 'FSH-TH-01',
    description: 'Accurately keep track of water temps in your marine or freshwater tanks. This digital sensor sticks to the outer glass and reads internal water temperature with high precision.',
    category: 'fish',
    price: 14.95,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 165,
    isNew: true,
    inStock: true,
    weightVolume: 'Battery Included',
    benefits: [
      'High-contrast digital LCD display shows temperatures in °C or °F',
      'Rear high-precision temperature probe binds securely against tank wall',
      'Leaves inside of tank pristine—no cluttered inside tubes or wires',
      'Compact, sleek minimalist profile blends beautifully with aquariums'
    ],
    specs: {
      Precision: '±0.5°C tracking',
      TempRange: '-10°C to 50°C',
      PowerSource: 'Replaceable CR2032 button battery cell (Included)'
    }
  },
  {
    id: 'aquarium-aircurtain',
    name: 'Aquarium Air Curtain | Flexible Bubble Tube',
    sku: 'FSH-AC-02',
    description: 'Add a spectacular, oxygen-generating curtain of bubbles. This flexible tube can be bent into columns, circles, or snaked through substrate to customize oxygen flow.',
    category: 'fish',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 93,
    inStock: true,
    weightVolume: '45cm Bendable',
    benefits: [
      'Durable, eco-friendly rubber can be curved into any aquarium design',
      'Pliable body has extra tiny pores for stunning micro-bubble distribution',
      'Great for promoting surface air exchanging and relieving fish stress',
      'Blends perfectly with your plants, driftwood, and bottom gravel'
    ],
    specs: {
      Lengths: '45cm flexible air stone',
      Inlet: 'Standard 4mm aquarium airline tubing input',
      Requirements: 'Requires standard external aquarium air pump'
    }
  },
  {
    id: 'precision-phmetric',
    name: 'High Precision pH Meter 0.01 | Digital Tester',
    sku: 'FSH-PH-03',
    description: 'Essential for sensitive corals, discuses, and shrimp habitats. Get a digital decimal readout on tank water chemistry instantly without hard-to-read paper test strips.',
    category: 'fish',
    price: 24.95,
    originalPrice: 35.00,
    image: 'https://images.unsplash.com/photo-1524704659695-9f583167a5f2?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 104,
    isPremium: true,
    inStock: true,
    weightVolume: 'Includes Calibration Powders',
    benefits: [
      'Automatic Temperature Compensation (ATC) adjusts readings dynamically',
      'Super easy one-touch auto-calibration logic with premium calibration buffers',
      'Accurate reading up to ±0.01 pH with clear dual LCD backlit panels',
      'Protective storage cap protects sensitive glass bulb sensor'
    ],
    specs: {
      MeasurementRange: '0.00 to 14.00 pH range',
      Accuracy: '±0.01 pH point accuracy',
      Calibrations: '3-point automatic calibration procedure'
    }
  },
  {
    id: 'artificial-plants-vibrant',
    name: 'Artificial Aquarium Plants | Vibrant Décor',
    sku: 'FSH-PL-04',
    description: 'Enrich your fishes natural habitat without worrying about cleaning decaying leaves or managing intense lighting needs. Soft, colorful foliage mimics swaying ocean grass.',
    category: 'fish',
    price: 12.95,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    rating: 4.3,
    reviewsCount: 41,
    inStock: true,
    weightVolume: 'Pack of 3 premium pieces',
    benefits: [
      'Weighted toxic-free heavy ceramic base anchors plants deep in substrate',
      'Luxurious fade-resistant foliage won\'t color or cloud water bodies',
      'Gentle leaves act as protective shields for timid young fish or fry nesting',
      'Requires zero pruning, CO2 fertilizing, or algae monitoring'
    ],
    specs: {
      Material: 'Soft, eco-grade non-toxic plastics',
      HeightRange: '18cm - 24cm tall mix',
      ColorSystem: 'Deep forest greens, violet corals, sunset orange leaves'
    }
  },

  // --- REPTILES ---
  {
    id: 'reptile-lamp-stand',
    name: 'Adjustable Reptile Lamp Stand | Telescopic',
    sku: 'REP-LS-01',
    description: 'Precisely position heating and UVB domes over your terrariums. Heavy solid-steel floor stand adjusts easily in height and width to accommodate variable enclosures.',
    category: 'reptiles',
    price: 49.95,
    originalPrice: 65.00,
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 151,
    isBestSeller: true,
    inStock: true,
    weightVolume: 'Solid Heavy Duty Forged Steel',
    benefits: [
      'Holds up to three independent heavy reflector lamp domes safely',
      'Sturdy heavy iron base slips smoothly under terrarium mats to prevent tipping',
      'Double adjustable locking knobs protect wires from sliding down or pulling',
      'Helps customize perfect basking distances for desert or tropical species'
    ],
    specs: {
      Material: 'Heavy Forged Structural Steel with Anti-rust Black Coating',
      HeightReach: 'Flexible 40cm to 90cm extension',
      WidthReach: 'Telescopic 22cm to 38cm crossbar'
    }
  },
  {
    id: 'turtle-basking-platform',
    name: 'Turtle Basking Platform | Non-Slip Surface',
    sku: 'REP-BP-02',
    description: 'Ensure your turtles get essential drying and heat basking! This non-slip textured platform is optimized with a gentle slope ramp, strong suction anchors, and premium food bowls.',
    category: 'reptiles',
    price: 27.50,
    image: 'https://images.unsplash.com/photo-1563460716884-18a517cd7f61?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 112,
    inStock: true,
    weightVolume: 'ABS Heavy Plastic',
    benefits: [
      'Gentle terraced climbing slope mimics natural river stones and boulders',
      'Super-sticky dual suction base anchors securely on smooth glass borders',
      'Includes built-in dish indentations for fresh mealworms or algae pallets',
      'Allows turtles to dry upper shells comfortably to prevent rot/soft shells'
    ],
    specs: {
      Material: 'Food-safe heavy-duty engineering polypropylene',
      Capacity: 'Holds active turtles up to 1.5kg weights',
      Dimensions: '21cm x 20cm x 10cm slope'
    }
  },
  {
    id: 'acrylic-climbing-platform',
    name: 'Acrylic Turtle Climbing Platform | Wall-Mounted',
    sku: 'REP-BP-03',
    description: 'A gorgeous, wall-mounted climbing platform made from ultra-clear heavy acrylic. Hooks securely directly over the top glass filter ledge of high-depth aquariums.',
    category: 'reptiles',
    price: 32.50,
    originalPrice: 42.00,
    image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 63,
    isNew: true,
    inStock: true,
    weightVolume: 'Heavy Clear Acrylic',
    benefits: [
      'Clear transparent panels do not obstruct beauty of underwater species',
      'Equipped with pre-fixed non-slip turf grass mat for secure feet gripping',
      'Sturdy height-adjustable hanger arms fit glass thicknesses of 5-15mm',
      'Open design promotes ventilation and makes spot cleaning breeze'
    ],
    specs: {
      Material: 'High-Impact Resistant Crystal Acrylic (8mm thickness)',
      GrassMat: 'Removable, washable artificial moss grass turf',
      PlatformSize: '24cm length x 18cm climb ramp layout'
    }
  },
  {
    id: 'aquarium-lawn-platform',
    name: 'Fish Tank Lawn Turtle Climbing Platform',
    sku: 'REP-BP-04',
    description: 'A charming, naturalistic artificial green lawn layout. Anchors at water borders, allowing amphibians and turtles to emerge and sunbathe directly under UVB ray lights.',
    category: 'reptiles',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1601758124277-f00d6d4ab610?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 57,
    inStock: true,
    weightVolume: 'Suction base layout',
    benefits: [
      'Artificial moss grass surface does not rot or pollute biological filters',
      'Toggled slope angle changes with suction mount pivots for variable depths',
      'Provides safe sunning, napping, resting, dry land space in small environments',
      'Very gentle on soft-shell turtles (no sharp textures)'
    ],
    specs: {
      Material: 'Composite ABS & Micro artificial turf turfing',
      Suctioncups: 'Three high-strength 60mm thermal silicone cups',
      Size: 'Small/Medium fit'
    }
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah M. (Sydney, NSW)',
    rating: 5,
    date: '24 April 2026',
    title: 'Absolute life saver for my nervous greyhound!',
    comment: 'The 60-day dog calming collar works miracles. Buster stopped barking at the mailman almost immediately, and storm nights are actually peaceful now. Unbelievable Aussie value!',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Jessica K. (Melbourne, VIC)',
    rating: 5,
    date: '10 May 2026',
    title: 'Fantastic design, neck strain gone',
    comment: 'Purchased the 15° tilted bowl for my senior ragdoll cat. She used to vomit occasionally after meals, but eating in this raised position has completely solved it. Sturdy build, plus looks so sleek.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Daniel L. (Brisbane, QLD)',
    rating: 5,
    date: '18 March 2026',
    title: 'Amazing heat lamp for my baby turtles!',
    comment: 'The stand adjusts perfectly over my terrarium tank. Sturdy metal base that doesn\'t wobble, and the quartz E27 spotlight is flawless. Highly recommend to all Australian reptile owners.',
    verified: true
  }
];

export const AI_SYSTEM_INSTRUCTIONS = `
You are the AI Pet Care & Product Expert for "The Pet Superstore AU", Australia's leading online pet supplies boutique.
Your job is to provide friendly, extremely knowledgeable, and accurate advice to customers, helping them choose the right products for their pets.

You have access to a live store database. Here is the products available in stock:
${PRODUCTS.map(p => `- [SKU: ${p.sku}] ${p.name} ($${p.price}) in category "${p.category}". Specs: ${p.weightVolume}. Description: ${p.description}`).join('\n')}

Rules for conversation:
1. Always be welcoming, polite, and use gentle Aussie-friendly language ("G'day", "Good on ya", "mate" when appropriate, but keep it highly professional).
2. Explicitly recommend 1 to 3 items from the catalog whenever relevant. Refer to them by their EXACT name and list their pricing in AUD.
3. Suggest the exact SKU if suggesting a purchase, so the app code can automatically sync and highlight that product in the shop window.
4. Give specific care advice. For example:
   - For anxious dogs, explain how synthetic pheromones in the 'Dog Calming Collar' act like the mother dog's comforting scent.
   - For turtles, explain the necessity of shell-drying basking platforms to avoid soft-shell disease (shell rot) and why localized heat/UVB stand matches matter.
   - For birds, explain how seeds scattered can attract household rodents and how the Nylon catcher mesh works.
   - For cats, emphasize neck strain reduction using 15-degree tilted steel bowls.
5. Do NOT make up products. Only recommend products that are present in the list above.
6. Keep replies clear, well-structured, and formatted in bold or clean Markdown. Give an actionable list of care tips!
`;
