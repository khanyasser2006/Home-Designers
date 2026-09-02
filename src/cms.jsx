import React, { createContext, useContext, useState, useEffect } from 'react';

// Default Seed Data for the Entire Website
export const DEFAULT_CMS_DATA = {
  residences: [
    {
      id: 'villa-obsidian',
      title: 'The Mountain Villa',
      subtitle: 'Sculptural permanence carved directly into alpine bedrock',
      location: 'Swiss Alps, Switzerland',
      category: 'Mountain',
      year: '2025',
      area: '1,240 m²',
      orientation: 'South-Facing Alpine Valley (46.4908° N, 9.8355° E)',
      materials: ['travertine', 'yakisugi', 'fluted-bronze'],
      photo:
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'A peaceful home built directly into the mountain stone in the Swiss Alps, featuring warm heated terraces, zero-emission geothermal floor heating, and double-height living salons.',
      spatialProgram: [
        { room: 'The Grand Living Salon', area: '180 m²', note: '7-meter double-height travertine fireplace & alpine view' },
        { room: 'Master Sanctuary Pavilion', area: '140 m²', note: 'Private soaking bath, dressing suite & fireplace' },
        { room: 'Guest Suites (3)', area: '210 m²', note: 'En-suite travertine baths with private garden balconies' },
        { room: 'Subterranean Spa & Pool', area: '190 m²', note: 'Heated indoor-outdoor pool carved into mountain rock' },
      ],
      environmentalMetrics: {
        energyRating: 'Net-Zero Plus (Generates 120% of Energy)',
        heatingSystem: 'Deep Geothermal Probe Loops',
        glazing: 'Triple-Glazed Low-Iron Argon Fill',
        airTightness: '0.35 ACH50 (Passive House Certified)',
      },
    },
    {
      id: 'kyoto-pavilion',
      title: 'The Garden House',
      subtitle: 'Light-filled tranquility framed by Japanese timber craftsmanship',
      location: 'Kyoto, Japan',
      category: 'Garden',
      year: '2024',
      area: '860 m²',
      orientation: 'East-Facing Zen Garden (35.0116° N, 135.7681° E)',
      materials: ['yakisugi', 'hinoki', 'fluted-bronze'],
      photo:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'A light-filled villa built with traditional Japanese wood craftsmanship and modern glass walls that overlook a calm, private garden pond and stone courtyards.',
      spatialProgram: [
        { room: 'Engawa Veranda & Tea Room', area: '95 m²', note: 'Direct view across private water lily pond' },
        { room: 'Living Atrium', area: '140 m²', note: 'Sliding cedar shoji screens opening 100% to garden' },
        { room: 'Master Onsen Suite', area: '110 m²', note: 'Natural Hinoki wood tub with garden courtyard view' },
      ],
      environmentalMetrics: {
        energyRating: '100% Passive Solar Autonomy',
        heatingSystem: 'Sub-Floor Hydronic Radiant System',
        glazing: 'Ultra-Clear Anti-Reflective Glazing',
        airTightness: 'Natural Micro-Ventilation Architecture',
      },
    },
    {
      id: 'casa-vento',
      title: 'The Coast House',
      subtitle: 'Sculpted sandstone curves embracing the Atlantic horizon',
      location: 'Algarve, Portugal',
      category: 'Coastal',
      year: '2025',
      area: '1,450 m²',
      orientation: 'South-West Ocean Horizon (37.0194° N, 8.9304° W)',
      materials: ['travertine', 'marquina', 'basalt'],
      photo:
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'A bright oceanfront home designed with curved concrete walls that protect the sunny inner courtyard from strong ocean winds while maximizing endless ocean horizons.',
      spatialProgram: [
        { room: 'Panoramic Living Pavilion', area: '210 m²', note: '30-meter continuous frameless ocean glass wall' },
        { room: 'Sunset Infinity Pool & Loggia', area: '175 m²', note: 'Zero-edge pool merging with Atlantic horizon' },
        { room: 'Master Ocean Suite', area: '160 m²', note: 'Private rooftop terrace and outdoor rain shower' },
      ],
      environmentalMetrics: {
        energyRating: 'Net-Zero Solar Powered',
        heatingSystem: 'Seawater-Source Heat Pumps',
        glazing: 'Hurricane-Grade Solar Low-E Glass',
        airTightness: 'Salt-Air Marine Grade Sealed',
      },
    },
    {
      id: 'the-monolith',
      title: 'The City Penthouse',
      subtitle: 'A quiet, high-altitude sanctuary above Manhattan',
      location: 'New York, USA',
      category: 'City',
      year: '2026',
      area: '620 m²',
      orientation: '360° Panoramic Skyline (40.7128° N, 74.0060° W)',
      materials: ['marquina', 'fluted-bronze', 'travertine'],
      photo:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'A spacious top-floor penthouse apartment with 7-meter high ceilings, sound-insulated quiet rooms, and a private rooftop garden pool above the bustling city skyline.',
      spatialProgram: [
        { room: 'Triplex Great Room', area: '160 m²', note: '7-meter double-height bronze-clad windows' },
        { room: 'Private Rooftop Pool & Court', area: '140 m²', note: 'Heated plunge pool with skyline fireplace' },
        { room: 'Master Sanctuary Floor', area: '180 m²', note: 'Full-floor suite with dual marble dressing rooms' },
      ],
      environmentalMetrics: {
        energyRating: 'LEED Platinum Certified',
        heatingSystem: 'Acoustic Decoupled VRV Heat Pumps',
        glazing: 'Acoustic Laminated 52 dB Noise Reduction',
        airTightness: 'Hospital-Grade HEPA Air Purification',
      },
    },
    {
      id: 'lake-como',
      title: 'The Lake Pavilion',
      subtitle: 'Terraced Italian limestone cascading to private lake waters',
      location: 'Lake Como, Italy',
      category: 'Coastal',
      year: '2024',
      area: '1,120 m²',
      orientation: 'North-West Lakefront (45.9863° N, 9.2572° E)',
      materials: ['travertine', 'fluted-bronze', 'basalt'],
      photo:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'A hillside villa cascading down the Moltrasio cliffside to a private stone boat dock. Shaded loggias, solid travertine columns, and framed views across Lake Como create a tranquil retreat.',
      spatialProgram: [
        { room: 'Lakefront Great Loggia', area: '150 m²', note: 'Open-air dining overlooking Bellagio' },
        { room: 'Private Boat Boathouse & Dock', area: '110 m²', note: 'Direct deep-water mooring' },
      ],
      environmentalMetrics: {
        energyRating: 'A+ Italian Green Building Certified',
        heatingSystem: 'Lake-Water Geothermal Exchange',
        glazing: 'Triple-Glazed Anti-Reflective Low-E',
        airTightness: '0.40 ACH50 Air Sealed',
      },
    },
    {
      id: 'desert-sanctuary',
      title: 'The Desert Sanctuary',
      subtitle: 'Rammed earth thermal masses nestled in Sonoran boulders',
      location: 'Scottsdale, Arizona',
      category: 'Mountain',
      year: '2025',
      area: '980 m²',
      orientation: 'Canyon Ridge Panoramic (33.4942° N, 111.9261° W)',
      materials: ['basalt', 'fluted-bronze', 'hinoki'],
      photo:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Built from compacted site soil and native stone. The 60cm thick rammed earth walls absorb desert heat during the daytime and release it slowly throughout cold desert nights.',
      spatialProgram: [
        { room: 'Stargazing Court & Fire Hearth', area: '130 m²', note: 'Open-roof court framing dark desert night skies' },
        { room: 'Desert Shade Pavilion', area: '160 m²', note: 'Deep cantilevered steel roof for daytime comfort' },
      ],
      environmentalMetrics: {
        energyRating: '100% Off-Grid Solar Autonomy',
        heatingSystem: 'Passive Thermal Earth Mass & Solar Storage',
        glazing: 'Spectrally Selective Heat-Reflective Glass',
        airTightness: 'Natural Thermal Siphon Cooling',
      },
    },
    {
      id: 'forest-retreat',
      title: 'The Forest Retreat',
      subtitle: 'Glulam timber architecture elevated into old-growth pine canopy',
      location: 'Whistler, Canada',
      category: 'Country Estate',
      year: '2025',
      area: '1,380 m²',
      orientation: 'Old Growth Pine Canopy (50.1163° N, 122.9574° W)',
      materials: ['yakisugi', 'hinoki', 'basalt'],
      photo:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Nestled deep inside old-growth Canadian pine forests. Elevated cantilevered living pavilions protect the delicate forest root system while placing living rooms directly within tree canopies.',
      spatialProgram: [
        { room: 'Canopy Great Room', area: '190 m²', note: 'Massive Douglas fir glulam beams & wood-burning hearth' },
        { room: 'Finnish Sauna & Cold Plunge', area: '85 m²', note: 'Outdoor forest-facing wood-fired sauna' },
      ],
      environmentalMetrics: {
        energyRating: 'Zero Carbon Building Standard',
        heatingSystem: 'Biomass & Geothermal Hybrid System',
        glazing: 'Quadruple-Glazed Sub-Arctic Glass',
        airTightness: '0.28 ACH50 Extreme Climate Sealed',
      },
    },
    {
      id: 'subterranean-estate',
      title: 'The Subterranean Estate',
      subtitle: 'Sunlit sunken courtyards carved into Mediterranean bedrock',
      location: 'Mallorca, Spain',
      category: 'Country Estate',
      year: '2026',
      area: '1,750 m²',
      orientation: 'South Mediterranean Sunken Atrium (39.6953° N, 3.0176° E)',
      materials: ['travertine', 'marquina', 'fluted-bronze'],
      photo:
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85',
      blueprint:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Partially carved into native Mallorcan sandstone to preserve the olive grove landscape above. Sunken stone atriums bring cascading sunlight, cooling ocean breezes, and reflecting pools inside.',
      spatialProgram: [
        { room: 'Sunken Olive Court Living Room', area: '240 m²', note: 'Centuries-old olive tree growing in central court' },
        { room: 'Subterranean Stone Pool', area: '160 m²', note: 'Underground natural light-well pool sanctuary' },
      ],
      environmentalMetrics: {
        energyRating: '100% Earth-Cooled Passive Rating',
        heatingSystem: 'Geothermal Ground Heat Exchanger',
        glazing: 'Low-E Acoustic Solar Glass',
        airTightness: 'Underground Micro-Climate Sealed',
      },
    },
  ],

  materials: [
    {
      id: 'travertine',
      num: '01',
      name: 'Roman Navona Travertine',
      category: 'Sedimentary Limestone',
      origin: 'Tivoli Quarries, Lazio, Italy',
      quarryAge: 'Formed ~120,000 Years Ago in Thermal Springs',
      finish: 'Open-Pore Unfilled & Satin Honed',
      density: '2,480 kg/m³',
      compressiveStrength: '112 MPa',
      acousticAbsorption: '0.45 αw (Quiet Sound Diffusion)',
      thermalConductivity: '1.8 W/mK (Warm & Insulating)',
      porosity: '3.8% (Breathable Micro-Cavities)',
      fireRating: 'Class A1 Non-Combustible',
      hapticFeel: 'Warm, porous, geological velvet touch',
      image:
        'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1400&q=85',
      detailImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Quarried directly from the historic geothermal beds of Tivoli near Rome. We selectively harvest cross-cut slabs with rich linear sediment striations, purposefully leaving the natural cavitations unfilled so the stone breathes naturally.',
      geologicalNarrative:
        'Travertine is created by mineral-rich geothermal waters precipitating calcium carbonate over millennia. Because our slabs are never filled with synthetic resins, the stone feels warm to bare feet and stabilizes room humidity.',
      applications: [
        'Continuous Ground-Floor Heated Slabs',
        'Monolithic Fireplace Surrounds & Mantels',
        'Zero-Threshold Bathroom Wet Rooms',
        'Cantilevered Solid Stone Stair Treads',
      ],
      installedIn: [
        { id: 'villa-obsidian', title: 'The Mountain Villa', location: 'Swiss Alps' },
        { id: 'lake-como', title: 'The Lake Pavilion', location: 'Lake Como' },
      ],
    },
    {
      id: 'yakisugi',
      num: '02',
      name: 'Charred Yakisugi Cedar',
      category: 'Fire-Preserved Solid Timber',
      origin: 'Okayama Prefecture, Japan',
      quarryAge: 'Harvested from 60+ Year Old Sustainable Groves',
      finish: 'Triple-Burned Suyaki Heavy Alligator',
      density: '420 kg/m³',
      compressiveStrength: '38 MPa',
      acousticAbsorption: '0.62 αw (Natural Sound Diffuser)',
      thermalConductivity: '0.11 W/mK (High Wood Insulation)',
      porosity: 'Micro-Carbonized Surface',
      fireRating: 'Naturally Fire Retardant (Carbon Armor)',
      hapticFeel: 'Silky carbonized relief with subtle wood scent',
      image:
        'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1400&q=85',
      detailImages: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Handcrafted using the ancient Japanese technique of flame-charring Japanese cedar. The deep charred carbon armor provides 80+ years of rot, insect, and weather resistance without chemical coatings.',
      geologicalNarrative:
        'The pure carbon exterior forms a natural armor that makes the timber immune to weather without chemical sealers. The textured relief creates an organic, light-absorbing façade.',
      applications: [
        'Exterior Rainscreen Façades',
        'Garden Courtyard Shading Screens',
        'Acoustic Ceiling Coffers',
      ],
      installedIn: [
        { id: 'kyoto-pavilion', title: 'The Garden House', location: 'Kyoto, Japan' },
        { id: 'villa-obsidian', title: 'The Mountain Villa', location: 'Swiss Alps' },
      ],
    },
    {
      id: 'marquina',
      num: '03',
      name: 'Honed Nero Marquina Marble',
      category: 'Metamorphic Calcite Marble',
      origin: 'Markina-Xemein, Basque Country, Spain',
      quarryAge: 'Jurassic Geological Formation',
      finish: 'Ultra-Matte Velvet Diamond Honed',
      density: '2,690 kg/m³',
      compressiveStrength: '135 MPa',
      acousticAbsorption: '0.28 αw',
      thermalConductivity: '2.4 W/mK',
      porosity: '0.17% (Impermeable Dense Matrix)',
      fireRating: 'Class A1 Non-Combustible',
      hapticFeel: 'Cool, obsidian stillness with smooth calcite veins',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
      detailImages: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Deep nocturnal black limestone crossed by dramatic white calcite streaks. Hand-finished with diamond pads to achieve a satin matte touch without artificial high-gloss glare.',
      geologicalNarrative:
        'We finish each slab with progressive 800-grit diamond pads to produce a silky, non-reflective velvet touch that absorbs glare and creates a sense of tranquil, grounded weight.',
      applications: [
        'Kitchen Monolith Islands',
        'Master Vanity Slabs & Walk-In Showers',
        'Fireplace Hearths',
      ],
      installedIn: [
        { id: 'the-monolith', title: 'The City Penthouse', location: 'New York' },
        { id: 'casa-vento', title: 'The Coast House', location: 'Portugal' },
      ],
    },
    {
      id: 'fluted-bronze',
      num: '04',
      name: 'Patinated Fluted Bronze',
      category: 'Architectural Copper-Tin Alloy',
      origin: 'Brescia Foundry, Lombardy, Italy',
      quarryAge: 'Master Foundry Smelted',
      finish: 'Acid-Etched Dark Statuary Patina',
      density: '8,730 kg/m³',
      compressiveStrength: '380 MPa',
      acousticAbsorption: '0.18 αw',
      thermalConductivity: '48 W/mK',
      porosity: '0.00% (Solid Non-Porous Alloy)',
      fireRating: 'Class A1 Non-Combustible',
      hapticFeel: 'Substantial, heavy metallic touch with micro-fluted grip',
      image:
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85',
      detailImages: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Solid architectural alloy aged with natural minerals to create rich chocolate-brown undertones that gently wear into golden highlights at touchpoints over decades of living.',
      geologicalNarrative:
        'Bronze is a living metal. Over decades of daily living, the natural touch of your hands interacts with the alloy, creating a personalized golden wear pattern along door pulls and railings.',
      applications: [
        'Monumental Entrance Pivot Doors',
        'Custom Full-Height Cabinet Pulls',
        'Fireplace Flues & Hoods',
      ],
      installedIn: [
        { id: 'the-monolith', title: 'The City Penthouse', location: 'New York' },
        { id: 'villa-obsidian', title: 'The Mountain Villa', location: 'Swiss Alps' },
      ],
    },
    {
      id: 'basalt',
      num: '05',
      name: 'Swiss Alpine Basalt Stone',
      category: 'Extrusive Volcanic Rock',
      origin: 'Graubünden, Switzerland',
      quarryAge: 'Tertiary Alpine Orogeny',
      finish: 'Waterjet-Textured Velvet Matte',
      density: '2,950 kg/m³',
      compressiveStrength: '185 MPa',
      acousticAbsorption: '0.35 αw',
      thermalConductivity: '2.1 W/mK',
      porosity: '0.8% (Extreme Weather Resistant)',
      fireRating: 'Class A1 Non-Combustible',
      hapticFeel: 'Crisp, fine-grained volcanic stone',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      detailImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Dense volcanic rock quarried from the Swiss Alps. Highly resistant to frost and thermal expansion, making it ideal for continuous indoor-to-outdoor heated terraces and infinity pool surrounds.',
      geologicalNarrative:
        'Formed by the rapid cooling of basaltic lava, this fine-grained volcanic stone exhibits immense structural strength and thermal storage capacity.',
      applications: [
        'Outdoor Heated Terraces & Pools',
        'Subterranean Wine Vaults',
      ],
      installedIn: [
        { id: 'villa-obsidian', title: 'The Mountain Villa', location: 'Swiss Alps' },
        { id: 'lake-como', title: 'The Lake Pavilion', location: 'Lake Como' },
      ],
    },
    {
      id: 'hinoki',
      num: '06',
      name: 'Old-Growth Hinoki Cypress',
      category: 'Aromatic Structural Timber',
      origin: 'Nagano Prefecture, Japan',
      quarryAge: 'Harvested from Centuries-Old Forest Reserves',
      finish: 'Hand-Planed Kannagi (Zero Polish/VOC)',
      density: '480 kg/m³',
      compressiveStrength: '42 MPa',
      acousticAbsorption: '0.55 αw',
      thermalConductivity: '0.13 W/mK',
      porosity: 'Silky Natural Grain',
      fireRating: 'Naturally Resilient Timber',
      hapticFeel: 'Silky smooth, naturally fragrant aromatic grain',
      image:
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
      detailImages: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      ],
      description:
        'Sacred Japanese cypress revered for centuries. Hand-planed by master woodworkers without sandpaper or varnish, releasing a gentle citrus-pine aroma that naturally purifies room air.',
      geologicalNarrative:
        'Hinoki contains natural phytoncides that reduce stress and repel moisture naturally. Hand-planing creates a glass-smooth surface that repels water droplets while letting the wood breathe.',
      applications: [
        'Onsen Soaking Tubs & Steam Baths',
        'Private Meditation Rooms',
      ],
      installedIn: [
        { id: 'kyoto-pavilion', title: 'The Garden House', location: 'Kyoto' },
        { id: 'desert-sanctuary', title: 'The Desert Sanctuary', location: 'Scottsdale' },
      ],
    },
  ],

  philosophy: {
    script: 'Simple,',
    title: 'Natural Design',
    subtitle: 'We design custom homes using honest materials, abundant natural light, and open layouts that help you feel relaxed and at peace.',
    pillars: [
      {
        id: 'monolith',
        num: '01',
        script: 'Solid & Grounded',
        title: 'Real Stone & Wood',
        subtitle: 'Built with genuine, lasting materials that age beautifully',
        description:
          'We build homes using solid natural stone, honest concrete, and warm timber. Instead of following short-lived design trends, we create calm, grounded spaces where your family can live comfortably for decades.',
        specs: [
          { label: 'Craft Quality', val: 'Hand Finished' },
          { label: 'Energy Savings', val: 'High Insulation' },
          { label: 'Built To Last', val: '100+ Years' },
        ],
        material: 'Natural Italian Travertine & Oak',
        location: 'Swiss Alps Residence',
        blueprintImg:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      },
      {
        id: 'light',
        num: '02',
        script: 'Warm & Bright',
        title: 'Natural Sunlight',
        subtitle: 'Thoughtfully designed windows that welcome warm daylight all day',
        description:
          'Sunlight brings a home to life. We study how the sun moves across your property to position every window, courtyard, and ceiling opening so your home feels naturally warm, open, and cheerful from sunrise to dusk.',
        specs: [
          { label: 'Natural Light', val: 'All Day Sun' },
          { label: 'Window Quality', val: 'Triple Glazed' },
          { label: 'Sun Protection', val: 'Built-in Shades' },
        ],
        material: 'Clear Insulated Glass & Warm Bronze',
        location: 'Kyoto Pavilion',
        blueprintImg:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      },
      {
        id: 'biophilic',
        num: '03',
        script: 'Indoor-Outdoor',
        title: 'Connected to Nature',
        subtitle: 'Large sliding glass doors that open smoothly to your garden',
        description:
          'We believe living close to nature reduces stress and improves daily happiness. Our full-height glass walls slide away completely into the walls, effortlessly opening your living room to your garden, patio, and fresh outdoor air.',
        specs: [
          { label: 'Door Threshold', val: 'Completely Flush' },
          { label: 'Fresh Air Flow', val: 'Natural Breeze' },
          { label: 'Garden Integration', val: 'Seamless View' },
        ],
        material: 'Natural Basalt & Fragrant Cedar',
        location: 'Coastal Algarve Villa',
        blueprintImg:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      },
    ],
  },

  standards: {
    script: 'Our Quality',
    title: 'Standards',
    subtitle: 'Every home we build is backed by strict engineering standards, master craftsmanship, and eco-friendly technology.',
    metrics: [
      {
        id: 'completed',
        label: 'OUR TRACK RECORD',
        tag: 'GLOBAL PORTFOLIO',
        val: '48+',
        heading: 'Custom Homes Completed',
        description: 'Individually designed and constructed for families in Switzerland, Japan, Portugal, and the United States.',
      },
      {
        id: 'precision',
        label: 'PRECISION BUILD',
        tag: 'Master Joinery',
        val: '100%',
        heading: 'Hand-Inspected Precision',
        description: 'Every beam, wall, and cabinet is carefully measured and hand-finished by master carpenters.',
      },
      {
        id: 'clean-energy',
        label: 'ECO-FRIENDLY',
        tag: 'Clean Energy',
        val: 'Zero',
        heading: 'Zero Emission Heating & Cooling',
        description: 'Self-heating geothermal energy loops that save on power bills and protect the environment.',
      },
    ],
    warranty: '100-Year Structural Guarantee',
    precisionTolerance: '±0.5 mm',
  },

  acclaim: [
    {
      id: 'ad',
      pub: 'Architectural Digest',
      date: 'Autumn 2025 Edition',
      quote:
        'Aethel produces homes that feel like modern sanctuaries. The attention to natural materials and quiet comfort sets a new standard for luxury living.',
      author: 'Julian Thorne',
      role: 'Senior Design Editor',
      stat: 'Top 10 Global Architectural Studios',
    },
    {
      id: 'wallpaper',
      pub: 'Wallpaper* Magazine',
      date: 'Design Awards 2025',
      quote:
        'The seamless transition from natural stone to warm wood makes each room feel peaceful, bright, and deeply connected to its surroundings.',
      author: 'Marcus Lindqvist',
      role: 'Architecture Critic',
      stat: 'Best Private Residence of the Year',
    },
    {
      id: 'dezeen',
      pub: 'Dezeen International',
      date: 'Special Report 2024',
      quote:
        'By avoiding flashy trends and focusing on real stone, timber, and daylight, Aethel designs homes that will look timeless for generations.',
      author: 'Clara Delacroix',
      role: 'Contributing Editor',
      stat: 'Excellence in Sustainable Craft',
    },
  ],

  studios: [
    {
      id: 'zurich',
      city: 'Zurich',
      country: 'Switzerland',
      role: 'Principal Atelier & Engineering Lab',
      address: 'Talstrasse 42, 8001 Zürich',
      timezone: 'Europe/Zurich',
      utcOffset: 1,
      phone: '+41 44 211 48 00',
    },
    {
      id: 'tokyo',
      city: 'Tokyo',
      country: 'Japan',
      role: 'Timber Craft & Joinery Studio',
      address: '5-7-2 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
      timezone: 'Asia/Tokyo',
      utcOffset: 9,
      phone: '+81 3 5468 9100',
    },
    {
      id: 'new-york',
      city: 'New York',
      country: 'United States',
      role: 'Private Commission Family Office',
      address: '450 West 14th Street, New York, NY 10014',
      timezone: 'America/New_York',
      utcOffset: -5,
      phone: '+1 212 924 3300',
    },
    {
      id: 'lisbon',
      city: 'Lisbon',
      country: 'Portugal',
      role: 'Coastal Stone & Biophilic Studio',
      address: 'Avenida da Liberdade 240, 1250-096 Lisboa',
      timezone: 'Europe/Lisbon',
      utcOffset: 0,
      phone: '+351 21 340 7000',
    },
  ],

  heroChapters: [
    {
      id: 'ch-1',
      range: [0.03, 0.22],
      positionClass: 'bottom-10 left-6 md:left-14 text-left items-start',
      script: 'Welcome Home',
      title: 'The Main Entrance',
      subtitle: 'Built with solid stone and timeless architecture.',
    },
    {
      id: 'ch-2',
      range: [0.26, 0.49],
      positionClass: 'top-14 right-6 md:right-14 text-right items-end',
      script: 'Living Space',
      title: 'The Great Room',
      subtitle: 'High ceilings, natural wood, and warm sunlight.',
    },
    {
      id: 'ch-3',
      range: [0.53, 0.75],
      positionClass: 'bottom-10 right-6 md:right-14 text-right items-end',
      script: 'Outdoor Views',
      title: 'The Sunset Terrace',
      subtitle: 'Glass walls that open completely to the fresh mountain air.',
    },
    {
      id: 'ch-4',
      range: [0.78, 0.98],
      positionClass: 'top-1/3 left-6 md:left-14 text-left items-start',
      script: 'Rest & Quiet',
      title: 'The Master Suite',
      subtitle: 'A private, peaceful space designed for pure comfort.',
    },
  ],

  detailedPillars: [
    {
      id: 'dp-1',
      num: '01',
      script: 'Permanence & Weight',
      title: 'Solid Stone & Real Timber',
      subtitle: 'Materials that grow more beautiful with time, not decay',
      description:
        'We construct residences using thick Roman travertine, volcanic basalt, honest concrete, and solid aged timber. Rather than hiding structures behind thin synthetic drywall, our architecture celebrates the raw, enduring weight of natural stone that will stand proud for centuries.',
      points: [
        'Zero synthetic veneers or plastic laminates',
        'Naturally insulated thermal mass reduces heating demand',
        'Every stone slab hand-selected from heritage quarries',
        'Solid joinery designed for 100+ years of family life',
      ],
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      spec: 'Travertine Density: 2,480 kg/m³ // Fire-Proof Timber',
    },
    {
      id: 'dp-2',
      num: '02',
      script: 'Solar Harmony',
      title: 'Living With Natural Sunlight',
      subtitle: 'Designing every room around the path of the sun',
      description:
        'Sunlight is the most vital material in our architecture. We map the exact solar trajectory across your property throughout every season. Morning light gently illuminates the breakfast courtyard; soft northern light fills the library and studio; and warm golden-hour light floods the living salon as the day winds down.',
      points: [
        'Solar orientation tailored to your property latitude',
        'Deep architectural overhangs prevent summer glare',
        'Triple-glazed low-iron glass for pure color rendering',
        'Natural shadows create calm, shifting interior artwork',
      ],
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      spec: 'Daylight Autonomy: 84% // Triple-Glazed Argon Fill',
    },
    {
      id: 'dp-3',
      num: '03',
      script: 'Quiet Sanctuary',
      title: 'Seamless Indoor-Outdoor Flow',
      subtitle: 'Dissolving the boundaries between home and garden',
      description:
        'Living close to nature calms the human nervous system. Our custom glass walls slide completely into pocket walls with flush stone thresholds, allowing you to walk barefoot from your living room into the garden courtyard without stepping over tracks or frames.',
      points: [
        'Zero-threshold flush floor transitions',
        'Frameless pocket sliding walls up to 4 meters high',
        'Internal water courts and private stone zen gardens',
        'Natural cross-ventilation breezes throughout all seasons',
      ],
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      spec: 'Threshold Tolerance: ±0.0mm // Acoustic Buffer: 48 dB',
    },
  ],

  essays: [
    {
      id: 'essay-1',
      tag: 'Solar Architecture',
      title: 'The Chronobiology of Sunlight in Domestic Architecture',
      readTime: '4 Min Read',
      excerpt:
        'How natural daylight cycles regulate sleep quality, mental clarity, and emotional well-being inside modern residential spaces.',
      content:
        'For hundreds of thousands of years, human biology was synchronized with the rising and setting sun. Modern urban housing often traps occupants in uniform artificial light, disrupting natural circadian rhythms. By carving high clerestory windows, open-air atriums, and angled light wells, we restore the biological connection between morning dawn and evening dusk.',
    },
    {
      id: 'essay-2',
      tag: 'Material Longevity',
      title: 'Why True Luxury is Built From Restraint, Not Decoration',
      readTime: '6 Min Read',
      excerpt:
        'The quiet power of monolithic materials over short-lived trends and ephemeral interior ornamentation.',
      content:
        'True architectural longevity cannot be purchased through decorative trends that feel dated within five years. When you build with solid Roman travertine, charred Japanese cedar, and unlacquered bronze, the home acquires a soft, noble patina over decades of living. A home should feel like an ancient sanctuary that has always belonged to its land.',
    },
  ],

  founderLetter: {
    script: 'A Letter from the Principal Architect',
    quote:
      'We do not build houses to impress passersby on the street. We build sanctuaries where you can take off your shoes, feel the warmth of genuine stone under your feet, and watch the evening sun paint the walls with golden light.',
    author: 'Kaelen Voss',
    role: 'Founding Principal // Aethel Architectural Atelier',
  },

  benchmarks: [
    {
      id: 'bm-1',
      num: '48+',
      label: 'Custom Homes Completed',
      subtitle: 'Every home individually designed for its specific topography and family',
      description:
        'We have never repeated a floorplan or copied a design. Each residence is an original work of spatial architecture engineered specifically for the light, slope, and climate of its land.',
      tags: ['Switzerland', 'Japan', 'Portugal', 'United States', 'Italy'],
    },
    {
      id: 'bm-2',
      num: '±0.5mm',
      label: 'Joinery Precision Tolerance',
      subtitle: 'Millimetric accuracy combining 5-axis CNC with master hand-scraping',
      description:
        'We reject sloppy construction tolerances. Every stone corner, ceiling reveal, and flush door frame is inspected with digital laser levels and finished by hand to achieve museum-grade joints.',
      tags: ['Laser Verified', 'Hand Finished', 'Flush Reveals'],
    },
    {
      id: 'bm-3',
      num: '100%',
      label: 'Net-Zero Passive House Rigor',
      subtitle: 'Self-heating and cooling through natural geothermal earth loops',
      description:
        'Our homes generate clean energy on-site and maintain steady indoor temperatures without noisy, drafty air conditioners. Triple-insulated thermal envelopes reduce energy usage by up to 85%.',
      tags: ['Geothermal Earth Loops', 'Triple Glazing', 'Clean Indoor Air'],
    },
    {
      id: 'bm-4',
      num: '100 Yrs',
      label: 'Structural Warranty & Stewardship',
      subtitle: 'Engineered to withstand seismic shifts, storms, and centuries of living',
      description:
        'We build with reinforced concrete cores, solid stone masonry, and marine-grade stainless hardware. We provide lifetime architectural stewardship and maintenance archives for every client family.',
      tags: ['Seismic Rated', 'Storm Proof', 'Lifetime Archive'],
    },
  ],

  phases: [
    {
      id: 'phase-1',
      phase: '01',
      name: 'Land & Solar Analysis',
      duration: 'Weeks 1 – 4',
      description:
        'We map your property using high-precision 3D laser scans, soil core analysis, and solar shadow simulations to find the exact placement where morning and evening light will feel best.',
    },
    {
      id: 'phase-2',
      phase: '02',
      name: 'Spatial Concept & Floorplans',
      duration: 'Weeks 5 – 10',
      description:
        'We develop custom 3D physical models and architectural floorplans. We fine-tune room dimensions, ceiling heights, sightlines, and indoor-outdoor garden courtyards with your feedback.',
    },
    {
      id: 'phase-3',
      phase: '03',
      name: 'Material Sourcing & Testing',
      duration: 'Weeks 11 – 16',
      description:
        'We personally visit European stone quarries and Japanese timber mills to hand-select individual stone slabs and wood beams. Physical samples are tested for acoustic comfort and durability.',
    },
    {
      id: 'phase-4',
      phase: '04',
      name: 'Master Construction & Build',
      duration: 'Months 5 – 18',
      description:
        'Our master stone masons, carpenters, and structural engineers construct your residence with millimetric accuracy, strict daily site supervision, and rigorous quality check milestones.',
    },
    {
      id: 'phase-5',
      phase: '05',
      name: 'Acoustic Tuning & Handover',
      duration: 'Month 19',
      description:
        'Before handing over the keys, we test air tightness, calibrate room acoustics, ensure flawless thermal insulation, and provide a comprehensive leather-bound home operations dossier.',
    },
  ],

  commissionConfig: {
    typologies: [
      'Mountain Villa',
      'Coastal Beach Home',
      'Country Estate',
      'City Penthouse',
      'Modern Family House',
    ],
    scales: ['Small (300 – 600 m²)', 'Medium (600 – 1,200 m²)', 'Large (1,200 m²+)'],
    scopes: [
      'New Build on Raw Land',
      'Complete Architectural Design & Build',
      'Private Family Compound',
      'Major Architectural Renovation',
    ],
  },
};

const CMSContext = createContext({
  data: DEFAULT_CMS_DATA,
  // Residences CRUD
  createResidence: () => {},
  updateResidence: () => {},
  deleteResidence: () => {},
  // Materials CRUD
  createMaterial: () => {},
  updateMaterial: () => {},
  deleteMaterial: () => {},
  // Philosophy CRUD
  updatePhilosophy: () => {},
  updatePillar: () => {},
  updateDetailedPillar: () => {},
  // Essays CRUD
  createEssay: () => {},
  updateEssay: () => {},
  deleteEssay: () => {},
  // Founder's Letter
  updateFounderLetter: () => {},
  // Standards & Benchmarks CRUD
  updateStandards: () => {},
  updateBenchmark: () => {},
  // Phases CRUD
  createPhase: () => {},
  updatePhase: () => {},
  deletePhase: () => {},
  // Hero Chapters CRUD
  updateHeroChapter: () => {},
  // Acclaim CRUD
  createAcclaim: () => {},
  updateAcclaim: () => {},
  deleteAcclaim: () => {},
  // Studios CRUD
  createStudio: () => {},
  updateStudio: () => {},
  deleteStudio: () => {},
  // Commission Config CRUD
  updateCommissionConfig: () => {},
  // Reset
  resetToDefaults: () => {},
});

export function CMSProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('aethel_cms_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CMS_DATA,
          ...parsed,
          philosophy: {
            ...DEFAULT_CMS_DATA.philosophy,
            ...(parsed.philosophy || {}),
            pillars:
              Array.isArray(parsed?.philosophy?.pillars) && parsed.philosophy.pillars.length > 0
                ? parsed.philosophy.pillars
                : DEFAULT_CMS_DATA.philosophy.pillars,
          },
          standards: {
            ...DEFAULT_CMS_DATA.standards,
            ...(parsed.standards || {}),
            metrics:
              Array.isArray(parsed?.standards?.metrics) && parsed.standards.metrics.length > 0
                ? parsed.standards.metrics
                : DEFAULT_CMS_DATA.standards.metrics,
          },
          residences:
            Array.isArray(parsed.residences) && parsed.residences.length > 0
              ? parsed.residences
              : DEFAULT_CMS_DATA.residences,
          materials:
            Array.isArray(parsed.materials) && parsed.materials.length > 0
              ? parsed.materials
              : DEFAULT_CMS_DATA.materials,
          acclaim:
            Array.isArray(parsed.acclaim) && parsed.acclaim.length > 0
              ? parsed.acclaim
              : DEFAULT_CMS_DATA.acclaim,
          studios:
            Array.isArray(parsed.studios) && parsed.studios.length > 0
              ? parsed.studios
              : DEFAULT_CMS_DATA.studios,
          heroChapters:
            Array.isArray(parsed.heroChapters) && parsed.heroChapters.length > 0
              ? parsed.heroChapters
              : DEFAULT_CMS_DATA.heroChapters,
          detailedPillars:
            Array.isArray(parsed.detailedPillars) && parsed.detailedPillars.length > 0
              ? parsed.detailedPillars
              : DEFAULT_CMS_DATA.detailedPillars,
          essays:
            Array.isArray(parsed.essays) && parsed.essays.length > 0
              ? parsed.essays
              : DEFAULT_CMS_DATA.essays,
          founderLetter: {
            ...DEFAULT_CMS_DATA.founderLetter,
            ...(parsed.founderLetter || {}),
          },
          benchmarks:
            Array.isArray(parsed.benchmarks) && parsed.benchmarks.length > 0
              ? parsed.benchmarks
              : DEFAULT_CMS_DATA.benchmarks,
          phases:
            Array.isArray(parsed.phases) && parsed.phases.length > 0
              ? parsed.phases
              : DEFAULT_CMS_DATA.phases,
          commissionConfig: {
            ...DEFAULT_CMS_DATA.commissionConfig,
            ...(parsed.commissionConfig || {}),
          },
        };
      }
    } catch (e) {}
    return DEFAULT_CMS_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aethel_cms_data', JSON.stringify(data));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        console.warn('CMS LocalStorage quota exceeded. Image assets should be kept concise.');
      }
    }
  }, [data]);

  // RESIDENCES CRUD
  const createResidence = (item) => {
    const newRes = {
      ...item,
      id: item.id || 'residence-' + Date.now(),
      year: item.year || new Date().getFullYear().toString(),
      gallery: item.gallery || [item.photo],
      spatialProgram: item.spatialProgram || [],
      environmentalMetrics: item.environmentalMetrics || {
        energyRating: 'Net-Zero Standard',
        heatingSystem: 'Geothermal Hydronic',
        glazing: 'Triple Glazed Low-E',
        airTightness: '0.35 ACH50',
      },
    };
    setData((prev) => ({
      ...prev,
      residences: [newRes, ...prev.residences],
    }));
    return newRes;
  };

  const updateResidence = (id, updates) => {
    setData((prev) => ({
      ...prev,
      residences: prev.residences.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }));
  };

  const deleteResidence = (id) => {
    setData((prev) => ({
      ...prev,
      residences: prev.residences.filter((r) => r.id !== id),
    }));
  };

  // MATERIALS CRUD
  const createMaterial = (item) => {
    const newMat = {
      ...item,
      id: item.id || 'mat-' + Date.now(),
      num: String((data?.materials?.length || 0) + 1).padStart(2, '0'),
      applications: item.applications || [],
      installedIn: item.installedIn || [],
    };
    setData((prev) => ({
      ...prev,
      materials: [...prev.materials, newMat],
    }));
    return newMat;
  };

  const updateMaterial = (id, updates) => {
    setData((prev) => ({
      ...prev,
      materials: prev.materials.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  };

  const deleteMaterial = (id) => {
    setData((prev) => ({
      ...prev,
      materials: prev.materials.filter((m) => m.id !== id),
    }));
  };

  // PHILOSOPHY CRUD
  const updatePhilosophy = (updates) => {
    setData((prev) => ({
      ...prev,
      philosophy: { ...prev.philosophy, ...updates },
    }));
  };

  const updatePillar = (id, updates) => {
    setData((prev) => ({
      ...prev,
      philosophy: {
        ...prev.philosophy,
        pillars: prev.philosophy.pillars.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      },
    }));
  };

  const updateDetailedPillar = (id, updates) => {
    setData((prev) => ({
      ...prev,
      detailedPillars: (prev.detailedPillars || DEFAULT_CMS_DATA.detailedPillars).map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  };

  // ESSAYS CRUD
  const createEssay = (item) => {
    const newItem = { ...item, id: 'essay-' + Date.now() };
    setData((prev) => ({
      ...prev,
      essays: [...(prev.essays || DEFAULT_CMS_DATA.essays), newItem],
    }));
  };

  const updateEssay = (id, updates) => {
    setData((prev) => ({
      ...prev,
      essays: (prev.essays || DEFAULT_CMS_DATA.essays).map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }));
  };

  const deleteEssay = (id) => {
    setData((prev) => ({
      ...prev,
      essays: (prev.essays || DEFAULT_CMS_DATA.essays).filter((e) => e.id !== id),
    }));
  };

  // FOUNDER'S LETTER
  const updateFounderLetter = (updates) => {
    setData((prev) => ({
      ...prev,
      founderLetter: { ...(prev.founderLetter || DEFAULT_CMS_DATA.founderLetter), ...updates },
    }));
  };

  // STANDARDS & BENCHMARKS CRUD
  const updateStandards = (updates) => {
    setData((prev) => ({
      ...prev,
      standards: { ...prev.standards, ...updates },
    }));
  };

  const updateBenchmark = (id, updates) => {
    setData((prev) => ({
      ...prev,
      benchmarks: (prev.benchmarks || DEFAULT_CMS_DATA.benchmarks).map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    }));
  };

  // PHASES CRUD
  const createPhase = (item) => {
    const newItem = { ...item, id: 'phase-' + Date.now() };
    setData((prev) => ({
      ...prev,
      phases: [...(prev.phases || DEFAULT_CMS_DATA.phases), newItem],
    }));
  };

  const updatePhase = (id, updates) => {
    setData((prev) => ({
      ...prev,
      phases: (prev.phases || DEFAULT_CMS_DATA.phases).map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  };

  const deletePhase = (id) => {
    setData((prev) => ({
      ...prev,
      phases: (prev.phases || DEFAULT_CMS_DATA.phases).filter((p) => p.id !== id),
    }));
  };

  // HERO CHAPTERS CRUD
  const updateHeroChapter = (id, updates) => {
    setData((prev) => ({
      ...prev,
      heroChapters: (prev.heroChapters || DEFAULT_CMS_DATA.heroChapters).map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  };

  // ACCLAIM CRUD
  const createAcclaim = (item) => {
    const newItem = { ...item, id: 'review-' + Date.now() };
    setData((prev) => ({
      ...prev,
      acclaim: [...prev.acclaim, newItem],
    }));
  };

  const updateAcclaim = (id, updates) => {
    setData((prev) => ({
      ...prev,
      acclaim: prev.acclaim.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  };

  const deleteAcclaim = (id) => {
    setData((prev) => ({
      ...prev,
      acclaim: prev.acclaim.filter((a) => a.id !== id),
    }));
  };

  // STUDIOS CRUD
  const createStudio = (item) => {
    const newItem = { ...item, id: 'studio-' + Date.now() };
    setData((prev) => ({
      ...prev,
      studios: [...prev.studios, newItem],
    }));
  };

  const updateStudio = (id, updates) => {
    setData((prev) => ({
      ...prev,
      studios: prev.studios.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const deleteStudio = (id) => {
    setData((prev) => ({
      ...prev,
      studios: prev.studios.filter((s) => s.id !== id),
    }));
  };

  // COMMISSION CONFIG
  const updateCommissionConfig = (updates) => {
    setData((prev) => ({
      ...prev,
      commissionConfig: { ...(prev.commissionConfig || DEFAULT_CMS_DATA.commissionConfig), ...updates },
    }));
  };

  // RESET
  const resetToDefaults = () => {
    setData(DEFAULT_CMS_DATA);
    localStorage.removeItem('aethel_cms_data');
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        residences: data.residences || DEFAULT_CMS_DATA.residences,
        materials: data.materials || DEFAULT_CMS_DATA.materials,
        philosophy: data.philosophy || DEFAULT_CMS_DATA.philosophy,
        detailedPillars: data.detailedPillars || DEFAULT_CMS_DATA.detailedPillars,
        essays: data.essays || DEFAULT_CMS_DATA.essays,
        founderLetter: data.founderLetter || DEFAULT_CMS_DATA.founderLetter,
        standards: data.standards || DEFAULT_CMS_DATA.standards,
        benchmarks: data.benchmarks || DEFAULT_CMS_DATA.benchmarks,
        phases: data.phases || DEFAULT_CMS_DATA.phases,
        heroChapters: data.heroChapters || DEFAULT_CMS_DATA.heroChapters,
        acclaim: data.acclaim || DEFAULT_CMS_DATA.acclaim,
        studios: data.studios || DEFAULT_CMS_DATA.studios,
        commissionConfig: data.commissionConfig || DEFAULT_CMS_DATA.commissionConfig,
        createResidence,
        updateResidence,
        deleteResidence,
        createMaterial,
        updateMaterial,
        deleteMaterial,
        updatePhilosophy,
        updatePillar,
        updateDetailedPillar,
        createEssay,
        updateEssay,
        deleteEssay,
        updateFounderLetter,
        updateStandards,
        updateBenchmark,
        createPhase,
        updatePhase,
        deletePhase,
        updateHeroChapter,
        createAcclaim,
        updateAcclaim,
        deleteAcclaim,
        createStudio,
        updateStudio,
        deleteStudio,
        updateCommissionConfig,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
