(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={id:`demo-farm-green-valley`,isDemo:!0,name:`Green Valley Farm`,size:5,unit:`Acre`,cropId:`tomato`,cropName:`Tomato`,cropVariety:`Arka Rakshak (High-yield hybrid)`,growthStage:`flowering`,growthStageName:`Flowering & Early Fruit`,irrigation:`Drip Irrigation with Canopy Sensors`,hasPanels:!0,soilType:`Red Sandy Loam (Well Drained)`,orientation:`North-South Rows (180° Azimuth)`,plantSpacingCm:45,plantHeightM:.85,rowSpacingM:4,location:{source:`DEMO`,label:`Demo Location (Kolar Agricultural Belt)`,lat:13.1368,lon:78.1292,accuracy:10,elevation:822,village:`Vemgal Rural`,district:`Kolar`,state:`Karnataka`,country:`India`},solar:{panelType:`Bifacial Monocrystalline PERC`,wattage:450,panelCount:20,angle:25,height:3,panelSpacing:2.5,rowSpacing:4,dimensions:{length:2.1,width:1.05},azimuth:180,inverterEfficiency:.96},weather:{source:`DEMO`,timestamp:`2026-10-08T12:00:00Z`,temp:24,humidity:62,cloudCover:25,rainProb:20,windSpeed:12,solarRadiation:650,directNormalRadiation:740,diffuseRadiation:160,uvIndex:7.2,conditionText:`Partly Sunny / Ideal Solar`,conditionIcon:`🌤️`,sunrise:`06:08`,sunset:`18:19`,hourlyForecast:[{hour:`06:00`,temp:18,cloud:40,rad:80,rain:10},{hour:`08:00`,temp:20,cloud:30,rad:340,rain:10},{hour:`10:00`,temp:22,cloud:25,rad:580,rain:15},{hour:`12:00`,temp:24,cloud:25,rad:650,rain:20},{hour:`14:00`,temp:26,cloud:35,rad:560,rain:25},{hour:`16:00`,temp:23,cloud:45,rad:310,rain:20},{hour:`18:00`,temp:21,cloud:50,rad:60,rain:15}],dailyForecast:[{day:`Today`,tempMax:26,tempMin:18,rain:20,condition:`🌤️`},{day:`Tomorrow`,tempMax:27,tempMin:19,rain:15,condition:`☀️`},{day:`Day 3`,tempMax:25,tempMin:18,rain:35,condition:`🌦️`},{day:`Day 4`,tempMax:28,tempMin:20,rain:10,condition:`☀️`},{day:`Day 5`,tempMax:27,tempMin:19,rain:25,condition:`⛅`},{day:`Day 6`,tempMax:26,tempMin:18,rain:40,condition:`🌧️`},{day:`Day 7`,tempMax:27,tempMin:19,rain:20,condition:`🌤️`}]},cropAnalysis:{source:`DEMO`,detectedCrop:`Tomato (Solanum lycopersicum)`,condition:`Healthy Vegetative-Bloom Canopy`,healthScore:92,confidence:`89% Prototype CV Confidence`,leafColoration:`Vibrant Deep Chlorophyll Green`,sunlightStatus:`Moderate Sunlight (Borderline Shaded at 25° Tilt)`,notes:`Canopy is healthy. Midday sunlight under current 25° tilt is 68%, slightly below flowering target (78-85%).`}},t={tomato:{id:`tomato`,name:`Tomato`,icon:`🍅`,scientificName:`Solanum lycopersicum`,lightCategory:`High Sunlight`,minDLI:16,idealMinDLI:22,idealMaxDLI:30,maxToleratedDLI:36,idealPAR:650,minSunHours:6.5,idealSunHours:8.5,shadeTolerance:2,heatStressThreshold:32,notes:`Agrivoltaic sweet spot: Midday shading cools canopy, preventing blossom drop while retaining 85%+ photosynthetic efficiency.`,varieties:[`Roma`,`Beefsteak`,`Cherry`,`Arka Rakshak`,`Pusa Ruby`],stages:[{id:`seedling`,name:`Seedling`,lightMod:.75,sensitivity:3,desc:`Tender sprouts, vulnerable to scorching`},{id:`vegetative`,name:`Vegetative`,lightMod:.95,sensitivity:4,desc:`Rapid leaf & stem expansion`},{id:`flowering`,name:`Flowering`,lightMod:1.15,sensitivity:5,desc:`Critical bloom phase, demands balanced warmth and PAR`},{id:`fruiting`,name:`Fruiting`,lightMod:1.2,sensitivity:5,desc:`Fruit set and ripening, maximum energy assimilation`},{id:`mature`,name:`Mature / Harvest`,lightMod:.85,sensitivity:2,desc:`Ripening ready for picking`}]},wheat:{id:`wheat`,name:`Wheat`,icon:`🌾`,scientificName:`Triticum aestivum`,lightCategory:`Moderate-High Sunlight`,minDLI:14,idealMinDLI:20,idealMaxDLI:28,maxToleratedDLI:34,idealPAR:580,minSunHours:6,idealSunHours:8,shadeTolerance:3,heatStressThreshold:30,notes:`Agrivoltaic sweet spot: High clearance panels (3.5m+) prevent terminal heat stress during grain filling stage.`,varieties:[`HD 2967`,`PBW 343`,`Lok 1`,`Sharbati`,`Durum`],stages:[{id:`seedling`,name:`Germination / Crown Root`,lightMod:.8,sensitivity:3,desc:`Root anchor and early shoot`},{id:`vegetative`,name:`Tillering & Jointing`,lightMod:.95,sensitivity:4,desc:`Tillers emerge, canopy builds`},{id:`flowering`,name:`Booting & Heading`,lightMod:1.1,sensitivity:5,desc:`Spikelets develop`},{id:`fruiting`,name:`Grain Filling`,lightMod:1.15,sensitivity:5,desc:`Starch accumulation, heat sensitive`},{id:`mature`,name:`Ripening / Golden`,lightMod:.75,sensitivity:2,desc:`Dry down before harvest`}]},maize:{id:`maize`,name:`Maize (Corn)`,icon:`🌽`,scientificName:`Zea mays`,lightCategory:`High Sunlight (C4 Plant)`,minDLI:18,idealMinDLI:24,idealMaxDLI:34,maxToleratedDLI:40,idealPAR:750,minSunHours:7,idealSunHours:9,shadeTolerance:1,heatStressThreshold:35,notes:`C4 photosynthetic pathway requires high light; spacing panels at 3.5m-4.5m with steeper angles prevents yield loss.`,varieties:[`Sweet Corn`,`Field Corn`,`DHM 117`,`Pioneer Hybrid`,`Ganga 5`],stages:[{id:`seedling`,name:`Emergence (VE-V4)`,lightMod:.8,sensitivity:3,desc:`Early vegetative leaf collars`},{id:`vegetative`,name:`Knee-high to Tassel (V6-V12)`,lightMod:1.05,sensitivity:4,desc:`Rapid biomass accumulation`},{id:`flowering`,name:`Silking & Tasseling (R1)`,lightMod:1.25,sensitivity:5,desc:`Pollen shedding and ear fertilization`},{id:`fruiting`,name:`Milk to Dent (R2-R5)`,lightMod:1.2,sensitivity:5,desc:`Kernel filling stage`},{id:`mature`,name:`Black Layer (R6)`,lightMod:.8,sensitivity:2,desc:`Kernel physiological maturity`}]},rice:{id:`rice`,name:`Rice (Paddy)`,icon:`🍚`,scientificName:`Oryza sativa`,lightCategory:`Moderate Sunlight`,minDLI:13,idealMinDLI:18,idealMaxDLI:26,maxToleratedDLI:32,idealPAR:520,minSunHours:5.5,idealSunHours:7.5,shadeTolerance:3,heatStressThreshold:33,notes:`Paddy water reflection provides secondary albedo illumination back to bifacial solar modules!`,varieties:[`Basmati`,`Sona Masoori`,`IR 64`,`Jasmine`,`Swarna`],stages:[{id:`seedling`,name:`Nursery / Transformed`,lightMod:.75,sensitivity:3,desc:`Transplanting into wet fields`},{id:`vegetative`,name:`Tillering`,lightMod:.95,sensitivity:4,desc:`Stem multiplying`},{id:`flowering`,name:`Panicle Initiation & Heading`,lightMod:1.15,sensitivity:5,desc:`Panicle emergence above flood`},{id:`fruiting`,name:`Grain Milking & Dough`,lightMod:1.1,sensitivity:4,desc:`Golden grains form`},{id:`mature`,name:`Golden Harvest`,lightMod:.7,sensitivity:2,desc:`Field drained for cutting`}]},potato:{id:`potato`,name:`Potato`,icon:`🥔`,scientificName:`Solanum tuberosum`,lightCategory:`Moderate Sunlight (Cool Season)`,minDLI:12,idealMinDLI:16,idealMaxDLI:24,maxToleratedDLI:28,idealPAR:480,minSunHours:5,idealSunHours:7,shadeTolerance:4,heatStressThreshold:28,notes:`Outstanding agrivoltaic candidate: Excessive soil heat halts tuber bulking. Overhead panels provide cool ground shade.`,varieties:[`Kufri Jyoti`,`Russet Burbank`,`Kufri Chandramukhi`,`Yukon Gold`,`Kufri Pukhraj`],stages:[{id:`seedling`,name:`Sprout Emergence`,lightMod:.7,sensitivity:2,desc:`Eyes sprout through mound`},{id:`vegetative`,name:`Vegetative Growth`,lightMod:.9,sensitivity:3,desc:`Vigorous green foliage`},{id:`flowering`,name:`Tuber Initiation & Flowering`,lightMod:1.1,sensitivity:5,desc:`Underground stolons hook into tubers`},{id:`fruiting`,name:`Tuber Bulking`,lightMod:1.05,sensitivity:4,desc:`Tubers swell rapidly in cool soil`},{id:`mature`,name:`Vines Senesce`,lightMod:.65,sensitivity:1,desc:`Skin sets for digging`}]},vegetables:{id:`vegetables`,name:`Vegetables (Leafy / Greens)`,icon:`🥬`,scientificName:`Brassica & Lactuca spp.`,lightCategory:`Low-Moderate (Partial Shade Tolerant)`,minDLI:10,idealMinDLI:14,idealMaxDLI:20,maxToleratedDLI:24,idealPAR:400,minSunHours:4.5,idealSunHours:6.5,shadeTolerance:5,heatStressThreshold:27,notes:`Natural agrivoltaic champions: Spinach, lettuce, and brassicas thrive under solar panel shade, yielding crisper, sweeter leaves.`,varieties:[`Spinach (Palak)`,`Lettuce`,`Cabbage`,`Broccoli`,`Swiss Chard`],stages:[{id:`seedling`,name:`Microgreen / Cotyledon`,lightMod:.7,sensitivity:3,desc:`First true leaves`},{id:`vegetative`,name:`Rosette & Leaf Expansion`,lightMod:1,sensitivity:4,desc:`Primary edible leaf growth`},{id:`flowering`,name:`Heading / Pre-Bolting`,lightMod:1.05,sensitivity:4,desc:`Head tightens; shade prevents bolting`},{id:`fruiting`,name:`Full Head / Leaf Density`,lightMod:.95,sensitivity:3,desc:`Full harvest weight`},{id:`mature`,name:`Harvest Prime`,lightMod:.7,sensitivity:2,desc:`Cut and pack stage`}]},other:{id:`other`,name:`Custom / Other Crop`,icon:`🌱`,scientificName:`Agricultural crop`,lightCategory:`Configurable Sunlight`,minDLI:14,idealMinDLI:18,idealMaxDLI:26,maxToleratedDLI:32,idealPAR:550,minSunHours:6,idealSunHours:8,shadeTolerance:3,heatStressThreshold:32,notes:`Configurable baseline prototype. User can adjust target sunlight sensitivity in farm settings.`,varieties:[`Standard Variety`,`Hybrid Selection`,`Heritage Seed`],stages:[{id:`seedling`,name:`Seedling`,lightMod:.75,sensitivity:3,desc:`Initial germination`},{id:`vegetative`,name:`Vegetative`,lightMod:.95,sensitivity:4,desc:`Canopy growth`},{id:`flowering`,name:`Flowering / Bloom`,lightMod:1.15,sensitivity:5,desc:`Reproductive initiation`},{id:`fruiting`,name:`Fruiting / Filling`,lightMod:1.15,sensitivity:5,desc:`Yield formation`},{id:`mature`,name:`Mature`,lightMod:.8,sensitivity:2,desc:`Harvest ready`}]}},n={en:{appTitle:`SUN-STARVED TRACKER`,tagline:`Agri-Voltaics Optimizer`,subTagline:`“Power the farm without starving the crop.”`,heroTitle:`Find the sweet spot between crop sunlight and panel power.`,heroSubtitle:`AI-assisted panel positioning for healthier crops and smarter solar energy.`,btnGuide:`Simple Guide`,btnPresentation:`Presentation Tour`,syncOnline:`ONLINE — LIVE DATA ACTIVE`,syncOffline:`OFFLINE — USING SAVED LOCAL DATA`,syncRestored:`✓ Connection restored — syncing farm data...`,navHome:`Home`,navDashboard:`IoT Dashboard`,navCamera:`Crop Camera (3x)`,navEnergy:`Energy & Battery`,navPositioning:`Panel Positioning`,navAlerts:`Alerts & Incidents`,navScheduler:`Sensor Scheduler`,navSimulator:`System Simulator`,navReports:`Farm Reports`,navSupport:`Customer Care & Feedback`,navCare:`Care`,navScan:`Scan & Crop`,navWeather:`Weather`,navOptimize:`Optimize`,navResults:`Results`,navSecurity:`Security & ID`,navFarms:`My Farms`,navWhatIf:`What-If`,navOnboarding:`Guided Wizard`,btnCustomerCare:`Customer Care`,langSwitchedNotice:`Interface language updated successfully`,btnOptimize:`🌱 Optimize My Farm`,btnDemo:`🎮 Explore Demo Farm`,btnScan:`📷 Scan My Farm`,btnStart:`🌱 START MY FARM`,btnApplyAngle:`Apply Recommended Position`,btnSaveFarm:`💾 Save Farm to Device`,btnGenerateReport:`📄 Generate Farm Report`,btnResetDemo:`Reset Demo`,btnExplainFarmer:`Explain Like I'm a Farmer`,btnTechnicalView:`Technical View`,btnUseMyLocation:`📍 Use My Location`,btnEnterManually:`📝 Enter Location Manually`,btnBack:`Back`,btnNext:`Next`,btnCancel:`Cancel`,btnDelete:`Delete`,btnConfirm:`Confirm`,btnUploadPhoto:`🖼️ Upload Photo`,btnTakePhoto:`📷 Take Photo`,btnRetake:`Retake Photo`,btnAutoSweetSpot:`✨ One-Click Auto-Adjust to Sweet Spot`,btnReadGuide:`Read Simple Guide ❓`,btnRefreshWeather:`🔄 Refresh Live Weather`,btnManualWeather:`📝 Manual Weather Override`,btnAddFarm:`+ Add New Farm`,btnOpenFarm:`Open Farm`,btnEdit:`Edit`,btnPrintPdf:`🖨️ Print / Save PDF`,btnDownloadJson:`📥 Download Data JSON`,btnGotIt:`Got it, let's farm! 🌱`,badgeLive:`🟢 LIVE DATA`,badgeCached:`🟠 CACHED DATA`,badgeDemo:`🟣 DEMO DATA`,badgeSim:`🔵 SIMULATION / ESTIMATION`,badgeSweetSpot:`SWEET SPOT BALANCED`,badgeNeedsOpt:`NEEDS OPTIMIZATION`,howItWorksTitle:`HOW IT WORKS IN 3 SIMPLE STEPS`,step1Title:`1. Pick Your Crop`,step1Desc:`Choose what you grow. Every crop has specific sunlight needs to thrive.`,step2Title:`2. Watch Sun & Shadows`,step2Desc:`Move the sun slider or tap Play (▶) to see shadows move across crop rows.`,step3Title:`3. Find the Sweet Spot`,step3Desc:`Tap Auto-Adjust to balance sunlight for plants and high clean electricity.`,farmPulse:`🌱 FARM HEALTH PULSE`,cropSunlight:`Crop Sunlight`,solarEnergy:`Solar Generation`,farmBalance:`Farm Balance`,shadowImpact:`Shadow Distribution`,weatherStatus:`Weather Condition`,panelPosition:`Panel Position`,locationStatus:`Location Status`,networkStatus:`Network Status`,cropComfortLevel:`Crop Light Comfort`,cropHappy:`is Happy: Getting optimal sunlight!`,cropSad:`is Under-Sunned: Adjust tilt to let light through!`,digitalTwinTitle:`🌐 FARM DIGITAL TWIN`,digitalTwinSub:`Sun • Panels • Shadow • Crop Interaction`,timeOfDay:`Time of Day (Sun Position)`,panelAngle:`Panel Tilt Angle`,panelHeight:`Mounting Clearance Height`,panelSpacing:`Panel Gap / Spacing`,rowSpacing:`Row Spacing`,cloudCover:`Cloud Cover`,solarIrradiance:`Solar Radiation`,hintFlat:`☀️ Flatter tilt — creates cool ground shade below`,hintBalanced:`⚖️ Balanced sweet spot — sunlight streams onto crops + high solar power`,hintSteep:`🌅 Steep tilt — lets maximum ambient light reach the soil`,hintLowClearance:`🚶 Lower clearance — for hand-harvesting crops`,hintStdClearance:`🚜 Standard clearance — tractors and farm equipment pass easily`,hintHighClearance:`🌾 High clearance — combines and tall crops pass freely`,hintNarrowGap:`Narrow gap — denser shade directly underneath`,hintWideGap:`Wide gap — light bands sweep across crops during the day`,alertsTitle:`🔔 FARM OPERATIONAL ALERTS`,planTitle:`📅 TODAY'S FARM PLAN`,morning:`06:00 - 10:00 (Morning): Dew Dispersion`,midday:`10:00 - 14:00 (Midday): Balanced Tracking`,afternoon:`14:00 - 17:00 (Afternoon): Harvest Solar`,evening:`17:00 - 19:00 (Evening): Night Stow`,scanTitle:`📷 SCAN YOUR FARM`,scanSubtitle:`Take or upload a crop photo to detect canopy status & read GPS EXIF`,noPhotoYet:`No crop photo captured yet`,noPhotoSub:`Take a photo or upload an image from your device`,exifTitle:`📍 PHOTO GPS METADATA`,aiAnalysisTitle:`🟣 AI CROP ANALYSIS`,aiAnalysisSub:`AI prediction — verify if necessary`,detectedCrop:`Detected Crop`,estimatedCondition:`Estimated Condition`,growthStage:`Growth Stage`,lightRequirement:`Sunlight Requirement`,weatherTitle:`🌦️ FARM WEATHER INTELLIGENCE`,weatherHourlyTitle:`⏱️ 24-HOUR FORECAST & SOLAR IRRADIANCE`,weatherDailyTitle:`📆 7-DAY AGRI-VOLTAICS OUTLOOK`,optimizeHeroTitle:`Find the Sweet Spot Between Crop Sunlight & Solar Power`,currentSetup:`CURRENT FARM SETUP`,recommendedSetup:`AI RECOMMENDED SETUP`,whyRecommendation:`💡 WHY THIS RECOMMENDATION?`,evaluatedCandidates:`📊 EVALUATED CONFIGURATION CANDIDATES`,powerGeneration:`Power Generation`,actuatorTitle:`⚙️ VIRTUAL ACTUATOR SIMULATION`,currentAngle:`Current Angle`,targetSweetSpot:`Target Sweet Spot`,actuatorReady:`Simulation Ready for Repositioning`,actuatorAligning:`Actuator Motor Aligning (1.5°/sec)...`,actuatorReached:`✓ Target Position Reached`,actuatorDisclaimer:`⚠️ Virtual simulation for prototype demonstration.`,heatmapTitle:`🌱 CROP ROW SUNLIGHT HEATMAP`,heatmapSub:`Live Ground Shading Distribution`,row1:`Crop Row 1: Under Left Support Stilt`,row2:`Crop Row 2: Canopy Under Module Center`,row3:`Crop Row 3: Inner Sun-Penetration Corridor`,row4:`Crop Row 4: Inter-Row Equipment Lane`,highLight:`High Sunlight (>75%)`,modLight:`Moderate Sunlight (50-75%)`,lowLight:`Low Sunlight (30-50%)`,excessShade:`Excessive Shading (<30%)`,tradeoffTitle:`📈 FINDING THE SWEET SPOT (Pareto Frontier)`,tradeoffSub:`Multi-Objective Optimization Curve`,cropAxis:`🌱 Crop Sunlight Reception (%) →`,solarAxis:`⚡ Solar Generation Potential (%) →`,legendSweetSpot:`Recommended Sweet Spot`,legendCurrent:`Current Farm Setup`,legendCandidates:`Evaluated Configurations`,myFarmsTitle:`🌾 MY SAVED FARMS`,myFarmsSub:`Manage all local farm digital twins on this device`,noFarmsYet:`No farms saved yet. Create a farm or load the demo farm.`,whatIfTitle:`🔮 WHAT-IF SIMULATOR`,whatIfSub:`Explore alternative operational scenarios side-by-side`,scenarioSweet:`⭐ AI Recommended Sweet Spot`,scenarioCurrent:`Current Farm Setup`,scenarioCrop:`🌱 Crop-First (Max Sunlight)`,scenarioEnergy:`⚡ Energy-First (Max Solar)`,scenarioStorm:`🛡️ Storm Stow / Canopy Protection`,onboardingTitle:`🌱 GUIDED FARMER ONBOARDING`,crop_tomato:`Tomato`,crop_wheat:`Wheat`,crop_maize:`Maize (Corn)`,crop_rice:`Rice (Paddy)`,crop_potato:`Potato`,crop_vegetables:`Vegetables (Greens)`,crop_other:`Custom / Other Crop`,faqTitle:`SIMPLE FARMER & USER GUIDE`,faqIntro:`Welcome to Sun-Starved Tracker! Here is everything you need to know in simple, plain language so you can get the most out of your farm.`,faqQ1:`🌱 1. What is an Agri-Voltaic Farm?`,faqA1:`Agri-Voltaics means mounting solar panels up high (3 meters above ground) directly above living crops. This allows you to generate clean solar electricity from the sky while growing healthy crops on the ground simultaneously.`,faqQ2:`☀️ 2. Why shouldn't solar panels just face the sun all day?`,faqA2:`Conventional solar tracking systems only care about electricity. If panels track the sun flatly, they cast harsh, continuous shadows over crops underneath, starving plants of sunlight and reducing crop yields. Sun-Starved Tracker ensures your crops always get their vital photosynthetic light first!`,faqQ3:`⚖️ 3. What is the "Sweet Spot"?`,faqA3:`The Sweet Spot is the perfect panel tilt angle where your crops get 100% of the sunlight they need for photosynthesis, while the panels still capture high solar radiation. Neither crops nor energy are wasted!`,faqQ4:`📱 4. Does this work in the field without internet?`,faqA4:`Yes! Sun-Starved Tracker is a Progressive Web App (PWA). All mathematical calculations, shadow models, and crop databases run completely offline inside your browser.`,faqQ5:`🍅 5. How do I switch crops or enter my farm?`,faqA5:`Visit the Scan & Crop tab or the Guided Wizard. Select your crop (Tomato, Wheat, Maize, Rice, Potato, or Vegetables) and growth stage to customize the AI algorithm for your exact farm.`,reportTitle:`AGRI-VOLTAICS FARM REPORT`,reportSub:`Agri-Voltaics Decision Support Platform`,reportDate:`Date`,reportFarmCrop:`Farm Crop`,reportFarmArea:`Farm Area`,reportLocation:`Location`,reportWeatherStatus:`Weather Status`,reportSolarArray:`Solar Array`,reportDataQuality:`Data Quality`,reportSetupComparison:`Setup Comparison`,reportMetric:`Metric`,reportDelta:`Delta`,reportWhySelected:`Why this recommendation was selected:`,reportDisclaimer:`Prototype Advisory Disclaimer: This report contains prototype mathematical estimates and should not replace professional agricultural, structural, electrical, or engineering assessment.`,alertCropBelow:`Crop Sunlight Below Preferred Range`,alertStrongSun:`Strong Solar Radiation Available`,alertAiRecommends:`AI Recommends Angle Optimization`,alertCloudCover:`Cloud Cover Attenuation`,morningDesc:`Tilt 40° to let early rays warm soil`,middayDesc:`Position at sweet spot to shield canopy heat`,afternoonDesc:`Slew West to maximize grid generation`,eveningDesc:`Stow flat at 10° for wind stability`,colCandidate:`Candidate`,colTiltAngle:`Tilt Angle`,colHeight:`Height`,colSpacing:`Spacing`,colCropLight:`Crop Light`,colSolar:`Solar Potential`,colBalance:`Balance`,badgeOptimalConfig:`Optimal Configuration`,badgeCurrentConfig:`Current Configuration`,aiSweetSpotFound:`AI SWEET SPOT FOUND`,btnViewEngine:`View Detailed Engine ➔`,recommendedTilt:`Recommended Tilt`,clearanceHeight:`Clearance Height`,balanceScore:`Balance Score`,badgeLiveEvaluated:`Live Evaluated`,badgePrototypeSchedule:`Prototype Schedule`,statusGood:`GOOD`,statusModerate:`MODERATE`,statusHigh:`HIGH`,statusOptimal:`OPTIMAL`,statusOptimized:`OPTIMIZED`,statusNeedsAdjust:`NEEDS ADJUST`,statusAvailable:`AVAILABLE`,activeFarm:`ACTIVE FARM`,humidity:`Humidity`,windSpeed:`Wind Speed`,btnCaptureSnapshot:`📸 Capture Snapshot`,badgeGpsDetected:`🟢 GPS DETECTED`,badgeLocation:`🟣 LOCATION`,coordinates:`Coordinates`,farmLocation:`Farm Location`,badgeDemoAi:`🟣 DEMO AI PREDICTION`,aiDisclaimer:`Prototype computer-vision simulation. No remote server inference performed. You can manually adjust or select your exact crop in Farm Profile.`,btnEditCropProfile:`Edit Crop Profile Manually ➔`,step:`Step`,of:`of`,stepFarm:`FARM`,stepCrop:`CROP`,stepLocation:`LOCATION`,stepWeather:`WEATHER`,stepSolar:`SOLAR`,stepSimulation:`SIMULATION`,stepOptimization:`AI OPTIMIZATION`,stepResults:`RESULTS`,farmProfile:`Farm Profile`,farmName:`Farm Name`,farmSize:`Farm Size`,unitAcre:`Acre`,unitHectare:`Hectare`,selectCropStage:`Select Crop & Growth Stage`,stageSeedling:`Seedling`,stageVegetative:`Vegetative`,stageFlowering:`Flowering / Bloom`,stageFruiting:`Fruiting / Grain Filling`,stageMature:`Mature / Harvest`,irrigationMethod:`Irrigation Method`,irrigDrip:`Drip Irrigation`,irrigSprinkler:`Sprinkler`,irrigFlood:`Flood Irrigation`,irrigRainfed:`Rainfed`,farmLocationTitle:`Farm Location`,farmLocationDesc:`Coordinates calibrate astronomical solar elevation and shadow trajectory.`,latitude:`Latitude (°N)`,longitude:`Longitude (°E)`,weatherBaseline:`Weather Baseline`,weatherBaselineDesc:`Weather influences direct vs diffuse sunlight ratios.`,temperature:`Temperature (°C)`,cloudCoverPercent:`Cloud Cover (%)`,existingSolar:`Existing Solar Setup`,initialTilt:`Initial Tilt Angle (°)`,panelWattage:`Panel Wattage (W)`,twinVerification:`Farm Digital Twin Verification`,twinVerifDesc:`Your physical configuration parameters are being mapped into the 2D shadow physics model.`,aiReadyTitle:`Multi-Objective AI Optimization`,aiReadyDesc:`Evaluating configuration candidates across tilt, height, and spacing.`,setupComplete:`Setup Complete`,setupCompleteDesc:`Your farm has been initialized and saved to the offline database.`,btnSkip:`Skip / Auto-Fill`,btnNextStep:`Next Step ➔`,btnCompleteSetup:`Complete Setup ➔`,loadingFarms:`Loading local farms...`,confirmDeleteFarm:`Are you sure you want to delete this farm? This action cannot be undone.`,scenarioCropFirst:`CROP-FIRST`,scenarioEnergyFirst:`ENERGY-FIRST`,scenarioStormStow:`STORM STOW`,manualLocTitle:`MANUAL FARM LOCATION ENTRY`,villageTown:`Village / Town`,district:`District`,btnSaveLoc:`Save Location`,manualWeatherTitle:`MANUAL WEATHER OVERRIDE`,btnSaveWeather:`Apply Weather Override`,resultsSummary:`OPTIMIZATION RESULTS SUMMARY`,resultsSub:`Complete agricultural and solar dual-objective verification`,savedHistoryTitle:`SAVED RECOMMENDATIONS HISTORY`,savedHistorySub:`Stored locally in IndexedDB for auditability & seasonal comparison.`,canopySunlight:`Canopy Sunlight`,shadow:`Shadow`,row:`Row`,btnVoiceAssistant:`Kisan Vani AI`,voiceAssistantTitle:`Kisan Vani AI — Farm Voice Assistant`,voiceAssistantSubtitle:`Ask about crops, solar output, battery, or alerts`,voiceStatusIdle:`Tap microphone or ask a question below`,voiceStatusListening:`Listening... Please speak now`,voiceStatusThinking:`Analyzing live farm telemetry...`,voiceStatusSpeaking:`Speaking...`,voiceInputPlaceholder:`Ask a question or tap a prompt chip...`,voiceBtnSpeak:`Speak`,voiceBtnSend:`Send`,voiceBtnMute:`Mute Voice`,voiceBtnUnmute:`Unmute Voice`,voiceBtnStop:`Stop Speaking`,voiceSpeed:`Voice Speed`,voiceSpeedNormal:`Normal (1.0x)`,voiceSpeedSlow:`Gentle (0.85x)`,voiceChipCrop:`🌿 Crop Health`,voiceChipSolar:`☀️ Solar Power Output`,voiceChipBattery:`🔋 Battery & Backup`,voiceChipIrrigation:`💧 Irrigation Advice`,voiceChipAngle:`📐 Panel Angle Reason`,voiceChipAlerts:`🚨 Read Active Alerts`,voiceChipReadScreen:`📢 Read Screen Aloud`,voiceAlertsToggle:`Voice Alerts`,voiceAlertsActive:`Voice Alerts Active`,voiceAlertsMuted:`Voice Alerts Muted`,voiceBtnTestAlert:`🔊 Test Voice Alert`,voiceWelcomeMsg:`Namaste! I am Kisan Vani AI. I can guide you on crop health, solar power, battery status, and irrigation advice in real time. How may I help you?`,voiceAlertTestSpoken:`Attention farmer: Test voice alert. High wind warning active. Panels safely stowed flat at 0 degrees.`,voiceAlertWindSpoken:`Emergency Alert: High wind speeds detected. Solar panels automatically stowed flat at 0 degrees to protect equipment.`,voiceAlertRainSpoken:`Rain Alert: Rainfall detected. Panels tilted to 30 degrees to channel rainwater into drainage swales.`,voiceAlertBatteryLowSpoken:`Battery Alert: LiFePO4 battery has dropped below 20 percent. Emergency load shedding activated.`,voiceAlertIrrigationSpoken:`Irrigation Notice: Soil moisture is low. Smart drip irrigation recommended.`,voiceReadScreenNotice:`Reading current view summary aloud.`},hi:{appTitle:`सन-स्टार्व्ड ट्रैकर`,tagline:`एग्री-वोल्टाइक ऑप्टिमाइज़र`,subTagline:`“फसल को धूप से वंचित किए बिना खेत को ऊर्जा दें।”`,heroTitle:`फसल की धूप और सौर पैनल की बिजली के बीच सही संतुलन पाएं।`,heroSubtitle:`स्वस्थ फसलों और बेहतर सौर ऊर्जा के लिए AI-सहायक पैनल पोजीशनिंग।`,btnGuide:`सरल गाइड`,btnPresentation:`प्रस्तुति टूर`,syncOnline:`ऑनलाइन — लाइव डेटा सक्रिय`,syncOffline:`ऑफ़लाइन — सुरक्षित स्थानीय डेटा का उपयोग`,syncRestored:`✓ नेटवर्क वापस आ गया — खेत डेटा सिंक हो गया...`,navHome:`होम`,navDashboard:`IoT डैशबोर्ड`,navCamera:`फसल कैमरा (3x)`,navEnergy:`ऊर्जा और बैटरी`,navPositioning:`पैनल पोजिशनिंग`,navAlerts:`अलर्ट और घटनाएं`,navScheduler:`सेंसर शेड्यूलर`,navSimulator:`सिस्टम सिम्युलेटर`,navReports:`कृषि रिपोर्ट`,navSupport:`ग्राहक सेवा और प्रतिक्रिया`,navCare:`सहायता`,navScan:`स्कैन और फसल`,navWeather:`मौसम`,navOptimize:`ऑप्टिमाइज़`,navResults:`परिणाम`,navSecurity:`सुरक्षा और पहचान`,navFarms:`मेरे खेत`,navWhatIf:`व्हाट-इफ सिमुलेशन`,navOnboarding:`गाइडेड विज़ार्ड`,btnCustomerCare:`ग्राहक सेवा`,langSwitchedNotice:`भाषा सफलतापूर्वक बदल दी गई`,btnOptimize:`🌱 मेरे खेत को अनुकूलित करें`,btnDemo:`🎮 डेमो खेत देखें`,btnScan:`📷 खेत स्कैन करें`,btnStart:`🌱 मेरा खेत शुरू करें`,btnApplyAngle:`अनुशंसित कोण लागू करें`,btnSaveFarm:`💾 खेत डेटा सुरक्षित करें`,btnGenerateReport:`📄 खेत रिपोर्ट बनाएं`,btnResetDemo:`डेमो रीसेट करें`,btnExplainFarmer:`सरल किसान भाषा में समझें`,btnTechnicalView:`तकनीकी विवरण`,btnUseMyLocation:`📍 मेरी लोकेशन का उपयोग करें`,btnEnterManually:`📝 स्वयं लोकेशन दर्ज करें`,btnBack:`पीछे`,btnNext:`आगे`,btnCancel:`रद्द करें`,btnDelete:`हटाएं`,btnConfirm:`पुष्टि करें`,btnUploadPhoto:`🖼️ फोटो अपलोड करें`,btnTakePhoto:`📷 फोटो खींचें`,btnRetake:`दोबारा फोटो लें`,btnAutoSweetSpot:`✨ एक क्लिक में सही संतुलन (35°) सेट करें`,btnReadGuide:`सरल गाइड पढ़ें ❓`,btnRefreshWeather:`🔄 लाइव मौसम रीफ्रेश करें`,btnManualWeather:`📝 मौसम स्वयं दर्ज करें`,btnAddFarm:`+ नया खेत जोड़ें`,btnOpenFarm:`खेत खोलें`,btnEdit:`संपादित करें`,btnPrintPdf:`🖨️ प्रिंट / PDF सहेजें`,btnDownloadJson:`📥 डेटा JSON डाउनलोड करें`,btnGotIt:`समझ गया, खेती शुरू करें! 🌱`,badgeLive:`🟢 लाइव डेटा (LIVE)`,badgeCached:`🟠 सहेजा गया डेटा (CACHED)`,badgeDemo:`🟣 डेमो डेटा (DEMO)`,badgeSim:`🔵 सिमुलेशन / अनुमान`,badgeSweetSpot:`सर्वोत्तम संतुलन संतुलित`,badgeNeedsOpt:`सुधार की आवश्यकता है`,howItWorksTitle:`यह 3 आसान चरणों में कैसे काम करता है`,step1Title:`1. अपनी फसल चुनें`,step1Desc:`बताएं आप क्या उगा रहे हैं। हर फसल को अच्छी वृद्धि के लिए अलग मात्रा में धूप चाहिए।`,step2Title:`2. धूप और छाया देखें`,step2Desc:`सूरज के स्लाइडर को खिसकाएं या प्ले (▶) दबाकर देखें कि दिनभर में पैनल की छाया कैसे बदलती है।`,step3Title:`3. सही संतुलन लागू करें`,step3Desc:`"ऑटो-एडजस्ट" दबाएं जिससे फसल को पूरी धूप मिले और सौर बिजली भी भरपूर बने।`,farmPulse:`🌱 खेत स्वास्थ्य पल्स (FARM PULSE)`,cropSunlight:`फसल को धूप`,solarEnergy:`सौर ऊर्जा उत्पादन`,farmBalance:`समग्र संतुलन`,shadowImpact:`छाया वितरण`,weatherStatus:`मौसम की स्थिति`,panelPosition:`पैनल की स्थिति`,locationStatus:`स्थान स्थिति`,networkStatus:`नेटवर्क स्थिति`,cropComfortLevel:`फसल धूप संतुष्टि`,cropHappy:`स्वस्थ है: भरपूर आवश्यक धूप मिल रही है!`,cropSad:`धूप कम है: पैनल का कोण बदलकर धूप आने दें!`,digitalTwinTitle:`🌐 खेत डिजिटल ट्विन`,digitalTwinSub:`सूर्य • सोलर पैनल • छाया • फसल संबंध`,timeOfDay:`दिन का समय (सूर्य की स्थिति)`,panelAngle:`पैनल का झुकाव कोण`,panelHeight:`जमीन से पैनल की ऊंचाई`,panelSpacing:`पैनलों के बीच दूरी`,rowSpacing:`पंक्तियों की दूरी`,cloudCover:`बादल छाए रहना`,solarIrradiance:`सौर विकिरण`,hintFlat:`☀️ अधिक सपाट झुकाव — नीचे मिट्टी को ठंडी छाया देता है`,hintBalanced:`⚖️ संतुलित कोण — फसल को धूप भी मिलती है और बिजली भी भरपूर बनती है`,hintSteep:`🌅 खड़ा झुकाव — अधिकतम प्राकृतिक धूप को नीचे जमीन तक आने देता है`,hintLowClearance:`🚶 कम ऊंचाई — हाथ से तोड़ी जाने वाली फसलों के लिए उपयुक्त`,hintStdClearance:`🚜 मानक ऊंचाई — ट्रैक्टर और कृषि उपकरण आसानी से नीचे से निकल सकते हैं`,hintHighClearance:`🌾 अधिक ऊंचाई — कंबाइन हार्वेस्टर और लंबी फसलें आसानी से निकलती हैं`,hintNarrowGap:`कम दूरी — नीचे लगातार घनी छाया रहेगी`,hintWideGap:`अधिक दूरी — दिनभर धूप की किरणें घूम-घूम कर पौधों पर पड़ेंगी`,alertsTitle:`🔔 खेत संचालन अलर्ट`,planTitle:`📅 आज की कृषि-सौर योजना`,morning:`06:00 - 10:00 (सुबह): ओस सुखाने के लिए धूप आने दें`,midday:`10:00 - 14:00 (दोपहर): तेज गर्मी से छाया और अधिकतम बिजली`,afternoon:`14:00 - 17:00 (दोपहर बाद): पश्चिम की धूप से सौर ऊर्जा संग्रह`,evening:`17:00 - 19:00 (शाम): रात के हवा के लिए पैनल समतल रखें`,scanTitle:`📷 खेत की फोटो लें या स्कैन करें`,scanSubtitle:`फसल की स्वास्थ्य स्थिति जांचने और GPS पढ़ने के लिए फोटो लें`,noPhotoYet:`अभी तक कोई फोटो नहीं ली गई`,noPhotoSub:`कैमरे से फोटो खींचें या गैलरी से अपलोड करें`,exifTitle:`📍 फोटो से प्राप्त GPS स्थिति`,aiAnalysisTitle:`🟣 AI फसल विश्लेषण (पूर्वानुमान)`,aiAnalysisSub:`AI अनुमान — आवश्यकता पड़ने पर स्वयं सत्यापित करें`,detectedCrop:`पहचानी गई फसल`,estimatedCondition:`अनुमानित स्वास्थ्य`,growthStage:`वृद्धि अवस्था`,lightRequirement:`धूप की आवश्यकता`,weatherTitle:`🌦️ खेत मौसम जानकारी`,weatherHourlyTitle:`⏱️ 24 घंटे का पूर्वानुमान और सौर विकिरण`,weatherDailyTitle:`📆 7 दिनों का मौसम पूर्वानुमान`,optimizeHeroTitle:`फसल की धूप और सौर बिजली के बीच सही संतुलन खोजें`,currentSetup:`वर्तमान खेत व्यवस्था`,recommendedSetup:`AI अनुशंसित व्यवस्था`,whyRecommendation:`💡 यह अनुशंसा क्यों चुनी गई?`,evaluatedCandidates:`📊 जांचे गए पैनल कॉन्फ़िगरेशन`,powerGeneration:`सौर ऊर्जा उत्पादन`,actuatorTitle:`⚙️ वर्चुअल एक्चुएटर मोटर सिमुलेशन`,currentAngle:`वर्तमान कोण`,targetSweetSpot:`लक्ष्य संतुलन कोण`,actuatorReady:`कोण बदलने के लिए मोटर तैयार है`,actuatorAligning:`एक्चुएटर मोटर पैनल घुमा रही है (1.5°/सेकंड)...`,actuatorReached:`✓ लक्षित कोण पर सफलतापूर्वक पहुंच गए`,actuatorDisclaimer:`⚠️ प्रदर्शन के लिए सिमुलेशन है।`,heatmapTitle:`🌱 फसल पंक्तियों में धूप का हीटमैप`,heatmapSub:`जमीन पर छाया का वास्तविक वितरण`,row1:`पंक्ति 1: खंभे के ठीक नीचे`,row2:`पंक्ति 2: पैनल के मध्य भाग के नीचे`,row3:`पंक्ति 3: दो पैनलों के बीच का खुला गलियारा`,row4:`पंक्ति 4: ट्रैक्टर और उपकरण मार्ग`,highLight:`भरपूर धूप (>75%)`,modLight:`मध्यम धूप (50-75%)`,lowLight:`कम धूप (30-50%)`,excessShade:`अत्यधिक छाया (<30%)`,tradeoffTitle:`📈 सही संतुलन वक्र (Pareto Frontier)`,tradeoffSub:`फसल धूप बनाम सौर ऊर्जा संतुलन ग्राफ`,cropAxis:`🌱 फसल को धूप (%) →`,solarAxis:`⚡ सौर ऊर्जा उत्पादन (%) →`,legendSweetSpot:`अनुशंसित संतुलन बिंदु (Sweet Spot)`,legendCurrent:`वर्तमान व्यवस्था`,legendCandidates:`परीक्षित विकल्प`,myFarmsTitle:`🌾 मेरे सहेजे गए खेत`,myFarmsSub:`इस डिवाइस पर अपने सभी डिजिटल खेतों का प्रबंधन करें`,noFarmsYet:`कोई खेत सहेजा नहीं गया है। नया खेत बनाएं या डेमो खोलें।`,whatIfTitle:`🔮 व्हाट-इफ सिमुलेटर`,whatIfSub:`अलग-अलग स्थितियों के परिणाम एक साथ देखें`,scenarioSweet:`⭐ AI सर्वोत्तम संतुलन (Sweet Spot)`,scenarioCurrent:`वर्तमान खेत स्थिति`,scenarioCrop:`🌱 फसल प्राथमिकता (अधिकतम धूप)`,scenarioEnergy:`⚡ सौर ऊर्जा प्राथमिकता (अधिकतम बिजली)`,scenarioStorm:`🛡️ आंधी-तूफान सुरक्षा स्थिति`,onboardingTitle:`🌱 किसान गाइडेड सेटअप`,crop_tomato:`टमाटर`,crop_wheat:`गेहूं`,crop_maize:`मक्का`,crop_rice:`चावल (धान)`,crop_potato:`आलू`,crop_vegetables:`हरी सब्जियां`,crop_other:`अन्य फसल`,faqTitle:`सरल किसान एवं उपयोगकर्ता गाइड`,faqIntro:`सन-स्टार्व्ड ट्रैकर में आपका स्वागत है! यहाँ सरल और स्पष्ट भाषा में वह सब कुछ है जो आपको अपने खेत का अधिकतम लाभ उठाने के लिए जानना आवश्यक है।`,faqQ1:`🌱 1. एग्री-वोल्टाइक (Agri-Voltaic) खेत क्या है?`,faqA1:`एग्री-वोल्टाइक का अर्थ है फसलों के ऊपर ऊँचाई पर (जमीन से 3 मीटर ऊपर) सोलर पैनल लगाना। इससे आप एक ही जमीन पर ऊपर से स्वच्छ सौर बिजली और नीचे स्वस्थ फसलें एक साथ प्राप्त करते हैं।`,faqQ2:`☀️ 2. सोलर पैनलों को पूरे दिन केवल धूप की दिशा में क्यों नहीं रखना चाहिए?`,faqA2:`पारंपरिक सोलर ट्रैकर केवल बिजली उत्पादन पर ध्यान देते हैं। यदि पैनल केवल सूरज का पीछा करते हैं, तो वे नीचे की फसलों पर लगातार भारी छाया डालते हैं, जिससे पौधे धूप से वंचित हो जाते हैं और उपज घट जाती है। सन-स्टार्व्ड ट्रैकर सुनिश्चित करता है कि आपकी फसलों को प्रकाश संश्लेषण के लिए आवश्यक धूप हमेशा पहले मिले!`,faqQ3:`⚖️ 3. "स्वीट स्पॉट" (सही संतुलन) क्या है?`,faqA3:`स्वीट स्पॉट पैनल का वह आदर्श कोण (झुकाव) है जहाँ फसलों को 100% आवश्यक धूप मिलती है और पैनल भी अधिकतम बिजली बनाते हैं। न फसल का नुकसान, न बिजली का अपव्यय!`,faqQ4:`📱 4. क्या यह बिना इंटरनेट के खेत में काम करता है?`,faqA4:`हाँ! सन-स्टार्व्ड ट्रैकर एक प्रोग्रेसिव वेब ऐप (PWA) है। सभी गणनाएँ, छाया मॉडल और फसल डेटाबेस आपके ब्राउज़र में ऑफ़लाइन काम करते हैं।`,faqQ5:`🍅 5. मैं फसल कैसे बदलूँ या अपना खेत कैसे दर्ज करूँ?`,faqA5:`स्कैन और फसल टैब पर जाएँ या गाइडेड विज़ार्ड खोलें। अपनी फसल (टमाटर, गेहूँ, मक्का, धान, आलू, सब्जियां) और वृद्धि चरण चुनें।`,reportTitle:`एग्री-वोल्टाइक खेत रिपोर्ट`,reportSub:`एग्री-वोल्टाइक निर्णय सहायता मंच`,reportDate:`तारीख`,reportFarmCrop:`खेत की फसल`,reportFarmArea:`खेत का क्षेत्रफल`,reportLocation:`स्थान`,reportWeatherStatus:`मौसम स्थिति`,reportSolarArray:`सोलर पैनल सरणी`,reportDataQuality:`डेटा गुणवत्ता`,reportSetupComparison:`सेटअप तुलना`,reportMetric:`पैमाना`,reportDelta:`अंतर (Delta)`,reportWhySelected:`यह अनुशंसा क्यों चुनी गई:`,reportDisclaimer:`प्रोटोटाइप सलाहकार अस्वीकरण: इस रिपोर्ट में प्रोटोटाइप गणितीय अनुमान शामिल हैं और इसे पेशेवर कृषि, संरचनात्मक या विद्युत विशेषज्ञ सलाह का विकल्प नहीं माना जाना चाहिए।`,alertCropBelow:`फसल की धूप वांछित स्तर से कम है`,alertStrongSun:`प्रबल सौर विकिरण उपलब्ध है`,alertAiRecommends:`AI कोण अनुकूलन की सिफारिश करता है`,alertCloudCover:`बादल आवरण प्रभाव`,morningDesc:`सुबह की किरणों से मिट्टी गर्म करने के लिए 40° झुकाव`,middayDesc:`फसल को तेज गर्मी से बचाने के लिए संतुलित स्वीट स्पॉट`,afternoonDesc:`ग्रिड को अधिकतम बिजली देने के लिए पश्चिम की ओर मोड़ें`,eveningDesc:`हवा के दबाव से सुरक्षा के लिए रात में 10° पर समतल रखें`,colCandidate:`विकल्प`,colTiltAngle:`झुकाव कोण`,colHeight:`ऊंचाई`,colSpacing:`दूरी`,colCropLight:`फसल धूप`,colSolar:`सौर क्षमता`,colBalance:`संतुलन`,badgeOptimalConfig:`अनुकूलतम व्यवस्था`,badgeCurrentConfig:`वर्तमान व्यवस्था`,aiSweetSpotFound:`AI स्वीट स्पॉट प्राप्त हुआ`,btnViewEngine:`विस्तृत इंजन देखें ➔`,recommendedTilt:`अनुशंसित झुकाव`,clearanceHeight:`निकासी ऊंचाई`,balanceScore:`संतुलन स्कोर`,badgeLiveEvaluated:`सक्रिय रूप से विश्लेषित`,badgePrototypeSchedule:`प्रोटोटाइप अनुसूची`,statusGood:`उत्कृष्ट`,statusModerate:`मध्यम`,statusHigh:`उच्च`,statusOptimal:`अनुकूल`,statusOptimized:`अनुकूलित`,statusNeedsAdjust:`समायोजन की आवश्यकता`,statusAvailable:`उपलब्ध`,activeFarm:`सक्रिय खेत`,humidity:`नमी`,windSpeed:`हवा की गति`,btnCaptureSnapshot:`📸 फोटो कैप्चर करें`,badgeGpsDetected:`🟢 GPS प्राप्त हुआ`,badgeLocation:`🟣 स्थान`,coordinates:`निर्देशांक`,farmLocation:`खेत का स्थान`,badgeDemoAi:`🟣 डेमो AI पूर्वानुमान`,aiDisclaimer:`प्रोटोटाइप कंप्यूटर-विज़न सिमुलेशन। कोई बाहरी सर्वर गणना नहीं। आप खेत प्रोफ़ाइल में अपनी फसल समायोजित कर सकते हैं।`,btnEditCropProfile:`फसल प्रोफ़ाइल मैन्युअल रूप से संपादित करें ➔`,step:`चरण`,of:`का`,stepFarm:`खेत`,stepCrop:`फसल`,stepLocation:`स्थान`,stepWeather:`मौसम`,stepSolar:`सौर`,stepSimulation:`सिमुलेशन`,stepOptimization:`AI अनुकूलन`,stepResults:`परिणाम`,farmProfile:`खेत प्रोफ़ाइल`,farmName:`खेत का नाम`,farmSize:`खेत का आकार`,unitAcre:`एकड़`,unitHectare:`हेक्टेयर`,selectCropStage:`फसल और वृद्धि चरण चुनें`,stageSeedling:`अंकुरण (Seedling)`,stageVegetative:`वृद्धि (Vegetative)`,stageFlowering:`फूल आना (Flowering)`,stageFruiting:`फल/दाने लगना (Fruiting)`,stageMature:`परिपक्व / कटाई (Harvest)`,irrigationMethod:`सिंचाई विधि`,irrigDrip:`ड्रिप (टपक) सिंचाई`,irrigSprinkler:`फव्वारा सिंचाई`,irrigFlood:`बाढ़/खुली सिंचाई`,irrigRainfed:`वर्षा आधारित`,farmLocationTitle:`खेत का स्थान`,farmLocationDesc:`निर्देशांक सूर्य की खगोलीय स्थिति और छाया गति की गणना करते हैं।`,latitude:`अक्षांश (°N)`,longitude:`देशांतर (°E)`,weatherBaseline:`मौसम आधार`,weatherBaselineDesc:`मौसम सीधी और फैली हुई धूप के अनुपात को प्रभावित करता है।`,temperature:`तापमान (°C)`,cloudCoverPercent:`बादल आवरण (%)`,existingSolar:`वर्तमान सोलर संरचना`,initialTilt:`प्रारंभिक झुकाव कोण (°)`,panelWattage:`पैनल वाट क्षमता (W)`,twinVerification:`डिजिटल ट्विन सत्यापन`,twinVerifDesc:`आपके भौतिक मापदंड 2D छाया भौतिकी मॉडल में लोड किए जा रहे हैं।`,aiReadyTitle:`मल्टी-ऑब्जेक्टिव AI अनुकूलन`,aiReadyDesc:`झुकाव, ऊंचाई और दूरी के विभिन्न संयोजनों का मूल्यांकन हो रहा है।`,setupComplete:`सेटअप पूरा हुआ`,setupCompleteDesc:`आपका खेत स्थानीय डेटाबेस में सुरक्षित कर लिया गया है।`,btnSkip:`छोड़ें / स्वतः भरें`,btnNextStep:`अगला चरण ➔`,btnCompleteSetup:`सेटअप पूरा करें ➔`,loadingFarms:`स्थानीय खेत लोड हो रहे हैं...`,confirmDeleteFarm:`क्या आप निश्चित रूप से इस खेत को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।`,scenarioCropFirst:`फसल-प्रथम`,scenarioEnergyFirst:`ऊर्जा-प्रथम`,scenarioStormStow:`तूफान सुरक्षा`,manualLocTitle:`स्थान स्वयं दर्ज करें`,villageTown:`गाँव / शहर`,district:`ज़िला`,btnSaveLoc:`स्थान सहेजें`,manualWeatherTitle:`मौसम स्वयं दर्ज करें`,btnSaveWeather:`मौसम लागू करें`,resultsSummary:`अनुकूलन परिणाम सारांश`,resultsSub:`कृषि और सौर दोहरे उद्देश्यों का पूर्ण सत्यापन`,savedHistoryTitle:`सहेजी गई सिफारिशों का इतिहास`,savedHistorySub:`मौसमी तुलना के लिए IndexedDB में स्थानीय रूप से सहेजा गया।`,canopySunlight:`फसल पर धूप`,shadow:`छाया`,row:`पंक्ति`,btnVoiceAssistant:`किसान वाणी AI`,voiceAssistantTitle:`किसान वाणी AI — कृषि आवाज सहायक`,voiceAssistantSubtitle:`फसल, सौर ऊर्जा, बैटरी या अलर्ट के बारे में पूछें`,voiceStatusIdle:`माइक पर टैप करें या नीचे प्रश्न पूछें`,voiceStatusListening:`सुन रहा हूँ... कृपया बोलिए`,voiceStatusThinking:`खेत के लाइव सेंसर की जांच कर रहा हूँ...`,voiceStatusSpeaking:`बोल रहा हूँ...`,voiceInputPlaceholder:`प्रश्न पूछें या नीचे किसी सुझाव पर टैप करें...`,voiceBtnSpeak:`बोलें`,voiceBtnSend:`भेजें`,voiceBtnMute:`आवाज बंद करें`,voiceBtnUnmute:`आवाज चालू करें`,voiceBtnStop:`रोकें`,voiceSpeed:`आवाज की गति`,voiceSpeedNormal:`सामान्य (1.0x)`,voiceSpeedSlow:`धीमी (0.85x)`,voiceChipCrop:`🌿 फसल स्वास्थ्य`,voiceChipSolar:`☀️ सौर ऊर्जा उत्पादन`,voiceChipBattery:`🔋 बैटरी और बैकअप`,voiceChipIrrigation:`💧 सिंचाई की सलाह`,voiceChipAngle:`📐 पैनल झुकाव का कारण`,voiceChipAlerts:`🚨 सक्रिय अलर्ट सुनाएं`,voiceChipReadScreen:`📢 स्क्रीन पढ़कर सुनाएं`,voiceAlertsToggle:`वॉइस अलर्ट`,voiceAlertsActive:`वॉइस अलर्ट सक्रिय`,voiceAlertsMuted:`वॉइस अलर्ट म्यूट`,voiceBtnTestAlert:`🔊 वॉइस अलर्ट टेस्ट करें`,voiceWelcomeMsg:`नमस्ते! मैं किसान वाणी AI हूँ। मैं आपकी फसल, सौर उत्पादन, बैटरी और सिंचाई पर पूरी जानकारी दे सकता हूँ। आज मैं आपकी क्या सहायता करूँ?`,voiceAlertTestSpoken:`किसान भाई ध्यान दें: यह एक टेस्ट वॉइस अलर्ट है। तेज हवा की चेतावनी। पैनल सुरक्षित रूप से 0 डिग्री पर मोड़ दिए गए हैं।`,voiceAlertWindSpoken:`आपातकालीन चेतावनी: तेज हवाएं दर्ज की गईं। उपकरणों की सुरक्षा के लिए पैनल 0 डिग्री पर मोड़ दिए गए हैं।`,voiceAlertRainSpoken:`बारिश का अलर्ट: वर्षा दर्ज की गई। वर्षा जल संचयन के लिए पैनल 30 डिग्री पर झुकाए गए हैं।`,voiceAlertBatteryLowSpoken:`बैटरी अलर्ट: बैटरी चार्ज 20 प्रतिशत से नीचे चला गया है। आपातकालीन बैकअप मोड चालू किया गया है।`,voiceAlertIrrigationSpoken:`सिंचाई सूचना: मिट्टी में नमी कम है। ड्रिप सिंचाई शुरू करने की सलाह दी जाती है।`,voiceReadScreenNotice:`वर्तमान स्क्रीन का सारांश पढ़कर सुना रहा हूँ।`},kn:{appTitle:`ಸನ್-ಸ್ಟಾರ್ವ್ಡ್ ಟ್ರ್ಯಾಕರ್`,tagline:`ಕೃಷಿ-ಸೌರ ಆಪ್ಟಿಮೈಜರ್`,subTagline:`“ಬೆಳೆಗೆ ಬಿಸಿಲು ಕಸಿಯದೆ, ಹೊಲಕ್ಕೆ ಸೌರಶಕ್ತಿ ನೀಡಿ.”`,heroTitle:`ಬೆಳೆಯ ಬಿಸಿಲು ಮತ್ತು ಸೋಲಾರ್ ಪ್ಯಾನೆಲ್ ಶಕ್ತಿಯ ನಡುವಿನ ಸಮತೋಲನ ಕಂಡುಕೊಳ್ಳಿ.`,heroSubtitle:`ಉತ್ತಮ ಬೆಳೆ ಹಾಗೂ ಸೌರಶಕ್ತಿಗಾಗಿ AI-ಆಧಾರಿತ ಪ್ಯಾನೆಲ್ ಸ್ಥಾನ ಹೊಂದಾಣಿಕೆ.`,btnGuide:`ಸರಳ ಗೈಡ್`,btnPresentation:`ಡೆಮೊ ಪ್ರಸ್ತುತಿ`,syncOnline:`ಆನ್‌ಲೈನ್ — ನೇರ ಮಾಹಿತಿ ಲಭ್ಯ`,syncOffline:`ಆಫ್‌ಲೈನ್ — ಉಳಿಸಿದ ಸ್ಥಳೀಯ ಮಾಹಿತಿ ಬಳಕೆ`,syncRestored:`✓ ನೆಟ್‌ವರ್ಕ್ ಮರಳಿದೆ — ಮಾಹಿತಿ ಸಿಂಕ್ ಆಗಿದೆ...`,navHome:`ಮುಖಪುಟ`,navDashboard:`IoT ಡ್ಯಾಶ್‌ಬೋರ್ಡ್`,navCamera:`ಬೆಳೆ ಕ್ಯಾಮೆರಾ (3x)`,navEnergy:`ಶಕ್ತಿ ಮತ್ತು ಬ್ಯಾಟರಿ`,navPositioning:`ಸೌರ ಪ್ಯಾನಲ್ ಕೋನ`,navAlerts:`ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಘಟನೆಗಳು`,navScheduler:`ಸೆನ್ಸರ್ ವೇಳಾಪಟ್ಟಿ`,navSimulator:`ವ್ಯವಸ್ಥೆ ಸಿಮ್ಯುಲೇಟರ್`,navReports:`ಕೃಷಿ ವರದಿಗಳು`,navSupport:`ಗ್ರಾಹಕ ಸೇವೆ ಮತ್ತು ಬೆಂಬಲ`,navCare:`ಬೆಂಬಲ`,navScan:`ಬೆಳೆ ಸ್ಕ್ಯಾನ್`,navWeather:`ಹವಾಮಾನ`,navOptimize:`ಸುಧಾರಣೆ`,navResults:`ಫಲಿತಾಂಶ`,navSecurity:`ಭದ್ರತೆ ಮತ್ತು ID`,navFarms:`ನನ್ನ ಹೊಲಗಳು`,navWhatIf:`ವಾಟ್-ಇಫ್`,navOnboarding:`ಮಾರ್ಗದರ್ಶಿ ವಿಝಾರ್ಡ್`,btnCustomerCare:`ಗ್ರಾಹಕ ಸೇವೆ`,langSwitchedNotice:`ಭಾಷೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ`,btnOptimize:`🌱 ನನ್ನ ಹೊಲವನ್ನು ಸುಧಾರಿಸಿ`,btnDemo:`🎮 ಡೆಮೊ ಹೊಲ ವೀಕ್ಷಿಸಿ`,btnScan:`📷 ಹೊಲ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ`,btnStart:`🌱 ಹೊಲ ಪ್ರಾರಂಭಿಸಿ`,btnApplyAngle:`ಶಿಫಾರಸು ಮಾಡಿದ ಕೋನ ಅನ್ವಯಿಸಿ`,btnSaveFarm:`💾 ಹೊಲದ ಮಾಹಿತಿ ಉಳಿಸಿ`,btnGenerateReport:`📄 ಕೃಷಿ ವರದಿ ಪಡೆಯಿರಿ`,btnResetDemo:`ಡೆಮೊ ಮರುಹೊಂದಿಸಿ`,btnExplainFarmer:`ರೈತರ ಸರಳ ವಿವರಣೆ`,btnTechnicalView:`ತಾಂತ್ರಿಕ ನೋಟ`,btnUseMyLocation:`📍 ನನ್ನ ಸ್ಥಳ ಬಳಸಿ`,btnEnterManually:`📝 ಸ್ಥಳ ನಮೂದಿಸಿ`,btnBack:`ಹಿಂದೆ`,btnNext:`ಮುಂದೆ`,btnCancel:`ರದ್ದುಮಾಡಿ`,btnDelete:`ಅಳಿಸಿ`,btnConfirm:`ಖಚಿತಪಡಿಸಿ`,btnUploadPhoto:`🖼️ ಫೋಟೋ ಅಪ್‌ಲೋಡ್`,btnTakePhoto:`📷 ಫೋಟೋ ತೆಗೆಯಿರಿ`,btnRetake:`ಮತ್ತೆ ತೆಗೆಯಿರಿ`,btnAutoSweetSpot:`✨ ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಸಮತೋಲನ (35°) ಹೊಂದಿಸಿ`,btnReadGuide:`ಸರಳ ಮಾಹಿತಿ ಓದಿ ❓`,btnRefreshWeather:`🔄 ಹವಾಮಾನ ನವೀಕರಿಸಿ`,btnManualWeather:`📝 ಹವಾಮಾನ ನಮೂದಿಸಿ`,btnAddFarm:`+ ಹೊಸ ಹೊಲ ಸೇರಿಸಿ`,btnOpenFarm:`ಹೊಲ ತೆರೆಯಿರಿ`,btnEdit:`ಬದಲಾಯಿಸಿ`,btnPrintPdf:`🖨️ ಪ್ರಿಂಟ್ / PDF ಉಳಿಸಿ`,btnDownloadJson:`📥 JSON ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ`,btnGotIt:`ಅರ್ಥವಾಯಿತು, ಪ್ರಾರಂಭಿಸೋಣ! 🌱`,badgeLive:`🟢 ಲೈವ್ ಡೇಟಾ (LIVE)`,badgeCached:`🟠 ಉಳಿಸಿದ ಡೇಟಾ (CACHED)`,badgeDemo:`🟣 ಡೆಮೊ ಡೇಟಾ (DEMO)`,badgeSim:`🔵 ಸಿಮ್ಯುಲೇಶನ್ / ಅಂದಾಜು`,badgeSweetSpot:`ಉತ್ತಮ ಸಮತೋಲನ ಸಿಕ್ಕಿದೆ`,badgeNeedsOpt:`ಹೊಂದಾಣಿಕೆ ಅಗತ್ಯವಿದೆ`,howItWorksTitle:`ಇದು 3 ಸರಳ ಹಂತಗಳಲ್ಲಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ`,step1Title:`1. ನಿಮ್ಮ ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ`,step1Desc:`ಯಾವ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ ಎಂದು ತಿಳಿಸಿ. ಪ್ರತಿಯೊಂದು ಬೆಳೆಗೆ ಉತ್ತಮ ಇಳುವರಿಗೆ ನಿರ್ದಿಷ್ಟ ಬಿಸಿಲು ಬೇಕು.`,step2Title:`2. ಬಿಸಿಲು ಮತ್ತು ನೆರಳು ಗಮನಿಸಿ`,step2Desc:`ಸೂರ್ಯನ ಸ್ಲೈಡರ್ ಚಲಿಸಿ ಅಥವಾ ಪ್ಲೇ (▶) ಒತ್ತಿ ದಿನವಿಡೀ ನೆರಳು ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ಎಂದು ನೋಡಿ.`,step3Title:`3. ಸಮತೋಲನ ಅನ್ವಯಿಸಿ`,step3Desc:`"ಆಟೋ-ಅಡ್ಜಸ್ಟ್" ಒತ್ತಿ ಬೆಳೆಗೆ ಪೂರ್ಣ ಬಿಸಿಲು ಸಿಗುವಂತೆ ಮತ್ತು ಗರಿಷ್ಠ ಸೌರ ವಿದ್ಯುತ್ ಉತ್ಪಾದಿಸುವಂತೆ ಮಾಡಿ.`,farmPulse:`🌱 ಕೃಷಿ ನಾಡಿ (FARM PULSE)`,cropSunlight:`ಬೆಳೆಯ ಬಿಸಿಲು`,solarEnergy:`ಸೌರ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ`,farmBalance:`ಒಟ್ಟಾರೆ ಸಮತೋಲನ`,shadowImpact:`ನೆರಳು ವಿತರಣೆ`,weatherStatus:`ಹವಾಮಾನ ಸ್ಥಿತಿ`,panelPosition:`ಪ್ಯಾನೆಲ್ ಸ್ಥಿತಿ`,locationStatus:`ಸ್ಥಳ ಸ್ಥಿತಿ`,networkStatus:`ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ`,cropComfortLevel:`ಬೆಳೆಯ ಬಿಸಿಲಿನ ತೃಪ್ತಿ`,cropHappy:`ಆರೋಗ್ಯಕರವಾಗಿದೆ: ಸೂಕ್ತ ಪ್ರಮಾಣದ ಬಿಸಿಲು ಲಭ್ಯವಿದೆ!`,cropSad:`ಬಿಸಿಲು ಸಾಲುತ್ತಿಲ್ಲ: ಪ್ಯಾನೆಲ್ ಕೋನ ಸರಿಪಡಿಸಿ!`,digitalTwinTitle:`🌐 ಕೃಷಿ ಡಿಜಿಟಲ್ ಟ್ವಿನ್`,digitalTwinSub:`ಸೂರ್ಯ • ಸೌರ ಪ್ಯಾನೆಲ್‌ಗಳು • ನೆರಳು • ಬೆಳೆ ಪರಸ್ಪರ ಕ್ರಿಯೆ`,timeOfDay:`ದಿನದ ಸಮಯ (ಸೂರ್ಯನ ಸ್ಥಾನ)`,panelAngle:`ಪ್ಯಾನೆಲ್ ವಾಲುವಿಕೆ ಕೋನ`,panelHeight:`ನೆಲದಿಂದ ಪ್ಯಾನೆಲ್ ಎತ್ತರ`,panelSpacing:`ಪ್ಯಾನೆಲ್‌ಗಳ ನಡುವಿನ ಅಂತರ`,rowSpacing:`ಸಾಲುಗಳ ನಡುವಿನ ಅಂತರ`,cloudCover:`ಮೋಡ ಕವಿದ ವಾತಾವರಣ`,solarIrradiance:`ಸೌರ ವಿಕಿರಣ`,hintFlat:`☀️ ಚಪ್ಪಟೆ ಕೋನ — ಕೆಳಗಿನ ಮಣ್ಣಿಗೆ ತಂಪಾದ ನೆರಳು ನೀಡುತ್ತದೆ`,hintBalanced:`⚖️ ಸಮತೋಲನ ಕೋನ — ಬೆಳೆಗೆ ಬಿಸಿಲೂ ಸಿಗುತ್ತದೆ, ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆಯೂ ಹೆಚ್ಚುತ್ತದೆ`,hintSteep:`🌅 ಕಡಿದಾದ ಕೋನ — ಗರಿಷ್ಠ ನೈಸರ್ಗಿಕ ಬೆಳಕು ನೆಲಕ್ಕೆ ಬೀಳಲು ಅನುವು ಮಾಡುತ್ತದೆ`,hintLowClearance:`🚶 ಕಡಿಮೆ ಎತ್ತರ — ಕೈಯಿಂದ ಕೊಯ್ಲು ಮಾಡುವ ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ`,hintStdClearance:`🚜 ಪ್ರಮಾಣಿತ ಎತ್ತರ — ಟ್ರ್ಯಾಕ್ಟರ್ ಮತ್ತು ಉಪಕರಣಗಳು ಸುಲಭವಾಗಿ ಚಲಿಸುತ್ತವೆ`,hintHighClearance:`🌾 ಹೆಚ್ಚಿನ ಎತ್ತರ — ಕೊಯ್ಲು ಯಂತ್ರಗಳು ಸರಾಗವಾಗಿ ಹಾದುಹೋಗುತ್ತವೆ`,hintNarrowGap:`ಕಿರಿದಾದ ಅಂತರ — ಕೆಳಗೆ ದಟ್ಟವಾದ ನೆರಳು ಬೀಳುತ್ತದೆ`,hintWideGap:`ಅಗಲವಾದ ಅಂತರ — ದಿನವಿಡೀ ಬಿಸಿಲಿನ ಪಟ್ಟಿಗಳು ಸಸ್ಯಗಳ ಮೇಲೆ ಚಲಿಸುತ್ತವೆ`,alertsTitle:`🔔 ಕೃಷಿ ಕಾರ್ಯಾಚರಣೆಯ ಎಚ್ಚರಿಕೆಗಳು`,planTitle:`📅 ಇಂದಿನ ಕೃಷಿ-ಸೌರ ಯೋಜನೆ`,morning:`06:00 - 10:00 (ಬೆಳಿಗ್ಗೆ): ಇಬ್ಬನಿ ಆರಿಸಲು ಬಿಸಿಲು ಬೀಳಲಿ`,midday:`10:00 - 14:00 (ಮಧ್ಯಾಹ್ನ): ಅತಿಯಾದ ಶಾಖದಿಂದ ರಕ್ಷಣೆ ಮತ್ತು ವಿದ್ಯುತ್`,afternoon:`14:00 - 17:00 (ಮಧ್ಯಾಹ್ನದ ನಂತರ): ಪಶ್ಚಿಮದ ಬಿಸಿಲಿನಿಂದ ವಿದ್ಯುತ್ ಸಂಗ್ರಹ`,evening:`17:00 - 19:00 (ಸಂಜೆ): ಗಾಳಿಯ ರಕ್ಷಣೆಗೆ ಪ್ಯಾನೆಲ್ ಚಪ್ಪಟೆಯಾಗಿಡಿ`,scanTitle:`📷 ಹೊಲದ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ`,scanSubtitle:`ಬೆಳೆಯ ಆರೋಗ್ಯ ತಿಳಿಯಲು ಮತ್ತು GPS ದಾಖಲಿಸಲು ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ`,noPhotoYet:`ಇನ್ನೂ ಯಾವುದೇ ಫೋಟೋ ತೆಗೆದಿಲ್ಲ`,noPhotoSub:`ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ`,exifTitle:`📍 ಫೋಟೋದಿಂದ ಪಡೆದ GPS ವಿವರ`,aiAnalysisTitle:`🟣 AI ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ`,aiAnalysisSub:`AI ಅಂದಾಜು — ಅಗತ್ಯವಿದ್ದಲ್ಲಿ ನೀವೇ ಪರಿಶೀಲಿಸಿ`,detectedCrop:`ಗುರುತಿಸಲಾದ ಬೆಳೆ`,estimatedCondition:`ಅಂದಾಜು ಆರೋಗ್ಯ`,growthStage:`ಬೆಳವಣಿಗೆಯ ಹಂತ`,lightRequirement:`ಬಿಸಿಲಿನ ಅಗತ್ಯತೆ`,weatherTitle:`🌦️ ಕೃಷಿ ಹವಾಮಾನ ಮಾಹಿತಿ`,weatherHourlyTitle:`⏱️ 24 ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಸೌರ ವಿಕಿರಣ`,weatherDailyTitle:`📆 7 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ನೋಟ`,optimizeHeroTitle:`ಬೆಳೆಯ ಬಿಸಿಲು ಮತ್ತು ಸೌರ ಶಕ್ತಿಯ ನಡುವೆ ಸರಿಯಾದ ಸಮತೋಲನ ಪಡೆಯಿರಿ`,currentSetup:`ಪ್ರಸ್ತುತ ಹೊಲದ ಸೆಟಪ್`,recommendedSetup:`AI ಶಿಫಾರಸು ಮಾಡಿದ ಸೆಟಪ್`,whyRecommendation:`💡 ಈ ಶಿಫಾರಸು ಏಕೆ?`,evaluatedCandidates:`📊 ಪರಿಶೀಲಿಸಲಾದ ಆಯ್ಕೆಗಳು`,powerGeneration:`ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ`,actuatorTitle:`⚙️ ವರ್ಚುವಲ್ ಆಕ್ಚುಯೇಟರ್ ಮೋಟಾರ್ ಸಿಮ್ಯುಲೇಶನ್`,currentAngle:`ಪ್ರಸ್ತುತ ಕೋನ`,targetSweetSpot:`ಗುರಿ ಸಮತೋಲನ ಕೋನ`,actuatorReady:`ಮೋಟಾರ್ ಸಿದ್ಧವಾಗಿದೆ`,actuatorAligning:`ಮೋಟಾರ್ ಪ್ಯಾನೆಲ್ ತಿರುಗಿಸುತ್ತಿದೆ (1.5°/ಸೆಕೆಂಡ್)...`,actuatorReached:`✓ ಗುರಿ ಕೋನ ತಲುಪಿದೆ`,actuatorDisclaimer:`⚠️ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ ಸಿಮ್ಯುಲೇಶನ್.`,heatmapTitle:`🌱 ಸಾಲುಗಳಲ್ಲಿ ಬಿಸಿಲಿನ ಹೀಟ್‌ಮ್ಯಾಪ್`,heatmapSub:`ನೆಲದ ಮೇಲಿನ ನೆರಳಿನ ನೈಜ ಹಂಚಿಕೆ`,row1:`ಸಾಲು 1: ಎಡ ಕಂಬದ ಕೆಳಗೆ`,row2:`ಸಾಲು 2: ಪ್ಯಾನೆಲ್ ಮಧ್ಯಭಾಗದ ಕೆಳಗೆ`,row3:`ಸಾಲು 3: ಪ್ಯಾನೆಲ್‌ಗಳ ನಡುವಿನ ತೆರೆದ ಜಾಗ`,row4:`ಸಾಲು 4: ಟ್ರ್ಯಾಕ್ಟರ್ ಹಾದಿ`,highLight:`ಉತ್ತಮ ಬಿಸಿಲು (>75%)`,modLight:`ಮಧ್ಯಮ ಬಿಸಿಲು (50-75%)`,lowLight:`ಕಡಿಮೆ ಬಿಸಿಲು (30-50%)`,excessShade:`ಅತಿಯಾದ ನೆರಳು (<30%)`,tradeoffTitle:`📈 ಸಮತೋಲನ ರೇಖಾಚಿತ್ರ (Pareto Frontier)`,tradeoffSub:`ಬೆಳೆ ಬಿಸಿಲು ಮತ್ತು ಸೌರ ವಿದ್ಯುತ್ ಸಮತೋಲನ`,cropAxis:`🌱 ಬೆಳೆಯ ಬಿಸಿಲು (%) →`,solarAxis:`⚡ ಸೌರ ವಿದ್ಯುತ್ (%) →`,legendSweetSpot:`ಶಿಫಾರಸು ಮಾಡಿದ ಸಮತೋಲನ (Sweet Spot)`,legendCurrent:`ಪ್ರಸ್ತುತ ವ್ಯವಸ್ಥೆ`,legendCandidates:`ಪರೀಕ್ಷಿತ ಆಯ್ಕೆಗಳು`,myFarmsTitle:`🌾 ನನ್ನ ಉಳಿಸಿದ ಹೊಲಗಳು`,myFarmsSub:`ನಿಮ್ಮ ಎಲ್ಲಾ ಡಿಜಿಟಲ್ ಹೊಲಗಳನ್ನು ನಿರ್ವಹಿಸಿ`,noFarmsYet:`ಯಾವುದೇ ಹೊಲ ಉಳಿಸಿಲ್ಲ. ಹೊಸ ಹೊಲ ರಚಿಸಿ ಅಥವಾ ಡೆಮೊ ನೋಡಿ.`,whatIfTitle:`🔮 ವಾಟ್-ಇಫ್ ಸಿಮ್ಯುಲೇಟರ್`,whatIfSub:`ವಿವಿಧ ಸನ್ನಿವೇಶಗಳ ಫಲಿತಾಂಶಗಳನ್ನು ಹೋಲಿಸಿ`,scenarioSweet:`⭐ AI ಸಮತೋಲನ (Sweet Spot)`,scenarioCurrent:`ಪ್ರಸ್ತುತ ವ್ಯವಸ್ಥೆ`,scenarioCrop:`🌱 ಬೆಳೆಗೆ ಆದ್ಯತೆ (ಗರಿಷ್ಠ ಬಿಸಿಲು)`,scenarioEnergy:`⚡ ಸೌರ ಶಕ್ತಿಗೆ ಆದ್ಯತೆ (ಗರಿಷ್ಠ ವಿದ್ಯುತ್)`,scenarioStorm:`🛡️ ಬಿರುಗಾಳಿ ರಕ್ಷಣೆ`,onboardingTitle:`🌱 ರೈತರ ಮಾರ್ಗದರ್ಶಿ ಸೆಟಪ್`,crop_tomato:`ಟೊಮೆಟೊ`,crop_wheat:`ಗೋಧಿ`,crop_maize:`ಮೆಕ್ಕೆಜೋಳ`,crop_rice:`ಭತ್ತ`,crop_potato:`ಆಲೂಗಡ್ಡೆ`,crop_vegetables:`ತರಕಾರಿಗಳು`,crop_other:`ಇತರ ಬೆಳೆ`,faqTitle:`ರೈತರಿಗೆ ಸರಳ ಕೈಪಿಡಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶಿ`,faqIntro:`ಸನ್-ಸ್ಟಾರ್ವ್ಡ್ ಟ್ರ್ಯಾಕರ್ಗೆ ಸ್ವಾಗತ! ನಿಮ್ಮ ಕೃಷಿಯಿಂದ ಗರಿಷ್ಠ ಲಾಭ ಪಡೆಯಲು ಸುಲಭ ಕನ್ನಡದಲ್ಲಿ ಎಲ್ಲ ವಿವರ ಇಲ್ಲಿದೆ.`,faqQ1:`🌱 1. ಅಗ್ರಿ-ವೋಲ್ಟಾಯಿಕ್ (Agri-Voltaic) ಕೃಷಿ ಎಂದರೇನು?`,faqA1:`ಬೆಳೆಯುತ್ತಿರುವ ಬೆಳೆಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ (ನೆಲದಿಂದ 3 ಮೀಟರ್ ಎತ್ತರದಲ್ಲಿ) ಸೋಲಾರ್ ಪ್ಯಾನೆಲ್ ಅಳವಡಿಸುವುದನ್ನು ಅಗ್ರಿ-ವೋಲ್ಟಾಯಿಕ್ಸ್ ಎನ್ನಲಾಗುತ್ತದೆ. ಇದರಿಂದ ಒಂದೇ ಜಮೀನಿನಲ್ಲಿ ವಿದ್ಯುತ್ ಮತ್ತು ಸಮೃದ್ಧ ಬೆಳೆ ಎರಡನ್ನೂ ಪಡೆಯಬಹುದು.`,faqQ2:`☀️ 2. ಸೋಲಾರ್ ಪ್ಯಾನೆಲ್ಗಳು ದಿನಪೂರ್ತಿ ಸೂರ್ಯನನ್ನೇ ಏಕೆ ನೋಡಬಾರದು?`,faqA2:`ಸಾಂಪ್ರದಾಯಿಕ ಸೋಲಾರ್ ವ್ಯವಸ್ಥೆ ಕೇವಲ ವಿದ್ಯುತ್ ಮಾತ್ರ ನೋಡುತ್ತದೆ. ಪ್ಯಾನೆಲ್ ಸೂರ್ಯನನ್ನೇ ಹಿಂಬಾಲಿಸಿದರೆ ಕೆಳಗಿನ ಬೆಳೆಗೆ ದಟ್ಟ ನೆರಳು ಬಿದ್ದು, ಬೆಳಕು ಸಿಗದೆ ಇಳುವರಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ. ನಮ್ಮ ತಂತ್ರಜ್ಞಾನ ಬೆಳೆಗೆ ಬೇಕಾದ ಸೂರ್ಯನ ಬೆಳಕಿಗೆ ಮೊದಲ ಆದ್ಯತೆ ನೀಡುತ್ತದೆ!`,faqQ3:`⚖️ 3. "ಸ್ವೀಟ್ ಸ್ಪಾಟ್" (ಸರಿಯಾದ ಸಮತೋಲನ) ಎಂದರೇನು?`,faqA3:`ಬೆಳೆಗೆ ಬೇಕಾದ 100% ಸೂರ್ಯನ ಬೆಳಕು ಸಿಗುವ ಹಾಗೂ ಸೋಲಾರ್ ಪ್ಯಾನೆಲ್ಗಳು ಗರಿಷ್ಠ ವಿದ್ಯುತ್ ಉತ್ಪಾದಿಸುವ ನಿಖರವಾದ ಕೋನವೇ ಸ್ವೀಟ್ ಸ್ಪಾಟ್.`,faqQ4:`📱 4. ಇದು ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಹೊಲದಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆಯೇ?`,faqA4:`ಹೌದು! ಸನ್-ಸ್ಟಾರ್ವ್ಡ್ ಟ್ರ್ಯಾಕರ್ ಒಂದು ಪ್ರೋಗ್ರೆಸ್ಸಿವ್ ವೆಬ್ ಆ್ಯಪ್ (PWA). ನೆರಳು ಮಾದರಿ ಮತ್ತು ಲೆಕ್ಕಾಚಾರಗಳು ನಿಮ್ಮ ಫೋನ್ ಬ್ರೌಸರ್ನಲ್ಲೇ ಆಫ್ಲೈನ್ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.`,faqQ5:`🍅 5. ಬೆಳೆ ಬದಲಿಸುವುದು ಅಥವಾ ಹೊಸ ಜಮೀನು ಸೇರಿಸುವುದು ಹೇಗೆ?`,faqA5:`ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಬೆಳೆ ಟ್ಯಾಬ್ ಅಥವಾ ಗೈಡೆಡ್ ವಿಝಾರ್ಡ್ ತೆರೆಯಿರಿ. ನಿಮ್ಮ ಬೆಳೆ (ಟೊಮೆಟೊ, ಗೋಧಿ, ಮೆಕ್ಕೆಜೋಳ, ಭತ್ತ, ಆಲೂಗಡ್ಡೆ, ತರಕಾರಿಗಳು) ಆಯ್ಕೆಮಾಡಿ.`,reportTitle:`ಅಗ್ರಿ-ವೋಲ್ಟಾಯಿಕ್ಸ್ ಕೃಷಿ ವರದಿ`,reportSub:`ಕೃಷಿ-ಸೌರ ನಿರ್ಧಾರ ಬೆಂಬಲ ವೇದಿಕೆ`,reportDate:`ದಿನಾಂಕ`,reportFarmCrop:`ಬೆಳೆ`,reportFarmArea:`ವಿಸ್ತೀರ್ಣ`,reportLocation:`ಸ್ಥಳ`,reportWeatherStatus:`ಹವಾಮಾನ ಸ್ಥಿತಿ`,reportSolarArray:`ಸೋಲಾರ್ ರಚನೆ`,reportDataQuality:`ಡೇಟಾ ಗುಣಮಟ್ಟ`,reportSetupComparison:`ವ್ಯವಸ್ಥೆಗಳ ಹೋಲಿಕೆ`,reportMetric:`ಮಾನದಂಡ`,reportDelta:`ವ್ಯತ್ಯಾಸ (Delta)`,reportWhySelected:`ಈ ಶಿಫಾರಸನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ:`,reportDisclaimer:`ಮಾದರಿ ಸಲಹಾ ಹಕ್ಕುತ್ಯಾಗ: ಈ ವರದಿಯು ಗಣಿತೀಯ ಅಂದಾಜುಗಳನ್ನು ಒಳಗೊಂಡಿದೆ ಮತ್ತು ವೃತ್ತಿಪರ ಕೃಷಿ ಅಥವಾ ಎಂಜಿನಿಯರಿಂಗ್ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.`,alertCropBelow:`ಬೆಳೆಗೆ ಸಿಗುವ ಬಿಸಿಲು ಕಡಿಮೆಯಾಗಿದೆ`,alertStrongSun:`ಉತ್ತಮ ಸೌರ ವಿಕಿರಣ ಲಭ್ಯವಿದೆ`,alertAiRecommends:`AI ಕೋನ ಬದಲಾವಣೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ`,alertCloudCover:`ಮೋಡ ಕವಿದ ವಾತಾವರಣದ ಪ್ರಭಾವ`,morningDesc:`ಬೆಳಗಿನ ಕಿರಣಗಳಿಂದ ಮಣ್ಣು ಬೆಚ್ಚಗಾಗಲು 40° ಕೋನ`,middayDesc:`ಬಿಸಿಲಿನ ತಾಪದಿಂದ ಬೆಳೆಯನ್ನು ರಕ್ಷಿಸಲು ಸಮತೋಲನ ಕೋನ`,afternoonDesc:`ಗರಿಷ್ಠ ವಿದ್ಯುತ್ಗಾಗಿ ಪಶ್ಚಿಮಕ್ಕೆ ತಿರುಗಿಸಿ`,eveningDesc:`ಗಾಳಿಯ ರಕ್ಷಣೆಗಾಗಿ ರಾತ್ರಿ 10° ನಲ್ಲಿ ಸಮತಟ್ಟಾಗಿರಿಸಿ`,colCandidate:`ಆಯ್ಕೆ`,colTiltAngle:`ಕೋನ`,colHeight:`ಎತ್ತರ`,colSpacing:`ಅಂತರ`,colCropLight:`ಬೆಳೆಗೆ ಬೆಳಕು`,colSolar:`ಸೌರ ಶಕ್ತಿ`,colBalance:`ಸಮತೋಲನ`,badgeOptimalConfig:`ಅತ್ಯುತ್ತಮ ಸಂರಚನೆ`,badgeCurrentConfig:`ಪ್ರಸ್ತುತ ಸಂರಚನೆ`,aiSweetSpotFound:`AI ಸ್ವೀಟ್ ಸ್ಪಾಟ್ ಕಂಡುಹಿಡಿದಿದೆ`,btnViewEngine:`ವಿವರವಾದ ಎಂಜಿನ್ ವೀಕ್ಷಿಸಿ ➔`,recommendedTilt:`ಶಿಫಾರಸು ಮಾಡಿದ ಕೋನ`,clearanceHeight:`ತೆರವು ಎತ್ತರ`,balanceScore:`ಸಮತೋಲನ ಅಂಕ`,badgeLiveEvaluated:`ನೇರ ಮೌಲ್ಯಮಾಪನ`,badgePrototypeSchedule:`ದಿನಚರಿ ವೇಳಾಪಟ್ಟಿ`,statusGood:`ಉತ್ತಮ`,statusModerate:`ಮಧ್ಯಮ`,statusHigh:`ಹೆಚ್ಚು`,statusOptimal:`ಅನುಕೂಲಕರ`,statusOptimized:`ಆಪ್ಟಿಮೈಸ್ ಮಾಡಲಾಗಿದೆ`,statusNeedsAdjust:`ಹೊಂದಾಣಿಕೆ ಅಗತ್ಯ`,statusAvailable:`ಲಭ್ಯವಿದೆ`,activeFarm:`ಸಕ್ರಿಯ ಜಮೀನು`,humidity:`ಆರ್ದ್ರತೆ`,windSpeed:`ಗಾಳಿಯ ವೇಗ`,btnCaptureSnapshot:`📸 ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ`,badgeGpsDetected:`🟢 GPS ಪತ್ತೆಯಾಗಿದೆ`,badgeLocation:`🟣 ಸ್ಥಳ`,coordinates:`ನಿರ್ದೇಶಾಂಕಗಳು`,farmLocation:`ಜಮೀನಿನ ಸ್ಥಳ`,badgeDemoAi:`🟣 ಡೆಮೊ AI ಮುನ್ಸೂಚನೆ`,aiDisclaimer:`ಕಂಪ್ಯೂಟರ್-ವಿಷನ್ ಮಾದರಿ. ಯಾವುದೇ ಸರ್ವರ್ ಅಗತ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಬೆಳೆಯ ವಿವರಗಳನ್ನು ನೀವು ಬದಲಾಯಿಸಬಹುದು.`,btnEditCropProfile:`ಬೆಳೆಯ ವಿವರ ಸಂಪಾದಿಸಿ ➔`,step:`ಹಂತ`,of:`/`,stepFarm:`ಜಮೀನು`,stepCrop:`ಬೆಳೆ`,stepLocation:`ಸ್ಥಳ`,stepWeather:`ಹವಾಮಾನ`,stepSolar:`ಸೋಲಾರ್`,stepSimulation:`ಸಿಮ್ಯುಲೇಶನ್`,stepOptimization:`AI ಆಪ್ಟಿಮೈಸೇಶನ್`,stepResults:`ಫಲಿತಾಂಶ`,farmProfile:`ಜಮೀನಿನ ವಿವರ`,farmName:`ಜಮೀನಿನ ಹೆಸರು`,farmSize:`ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ`,unitAcre:`ಎಕರೆ`,unitHectare:`ಹೆಕ್ಟೇರ್`,selectCropStage:`ಬೆಳೆ ಮತ್ತು ಬೆಳವಣಿಗೆ ಹಂತ ಆಯ್ಕೆಮಾಡಿ`,stageSeedling:`ಸಸಿ ಹಂತ (Seedling)`,stageVegetative:`ಬೆಳವಣಿಗೆ (Vegetative)`,stageFlowering:`ಹೂ ಬಿಡುವ ಹಂತ (Flowering)`,stageFruiting:`ಕಾಯಿ/ಕಾಳು ಕಟ್ಟುವ ಹಂತ (Fruiting)`,stageMature:`ಕೊಯ್ಲು ಹಂತ (Harvest)`,irrigationMethod:`ನೀರಾವರಿ ವಿಧಾನ`,irrigDrip:`ಹನಿ ನೀರಾವರಿ`,irrigSprinkler:`ತುಂತುರು ನೀರಾವರಿ`,irrigFlood:`ಕಾಲುವೆ ನೀರಾವರಿ`,irrigRainfed:`ಮಳೆ ಆಧಾರಿತ`,farmLocationTitle:`ಜಮೀನಿನ ಸ್ಥಳ`,farmLocationDesc:`ನಿರ್ದೇಶಾಂಕಗಳು ಸೂರ್ಯನ ಕೋನ ಮತ್ತು ನೆರಳಿನ ಪಥವನ್ನು ನಿಖರಗೊಳಿಸುತ್ತವೆ.`,latitude:`ಅಕ್ಷಾಂಶ (°N)`,longitude:`ರೇಖಾಂಶ (°E)`,weatherBaseline:`ಹವಾಮಾನ ವಿವರ`,weatherBaselineDesc:`ಹವಾಮಾನವು ಬೆಳಕಿನ ತೀವ್ರತೆಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.`,temperature:`ತಾಪಮಾನ (°C)`,cloudCoverPercent:`ಮೋಡ ಕವಿದ ಪ್ರಮಾಣ (%)`,existingSolar:`ಹಾಲಿ ಸೋಲಾರ್ ವ್ಯವಸ್ಥೆ`,initialTilt:`ಪ್ರಾರಂಭಿಕ ಕೋನ (°)`,panelWattage:`ಪ್ಯಾನೆಲ್ ಸಾಮರ್ಥ್ಯ (W)`,twinVerification:`ಡಿಜಿಟಲ್ ಟ್ವಿನ್ ದೃಢೀಕರಣ`,twinVerifDesc:`ನೆರಳಿನ ಭೌತಶಾಸ್ತ್ರ ಮಾದರಿಗೆ ಮಾಹಿತಿ ದಾಖಲಾಗುತ್ತಿದೆ.`,aiReadyTitle:`AI ಆಪ್ಟಿಮೈಸೇಶನ್`,aiReadyDesc:`ಕೋನ, ಎತ್ತರ ಮತ್ತು ಅಂತರದ ಮೌಲ್ಯಮಾಪನ ಸಿದ್ಧವಾಗಿದೆ.`,setupComplete:`ಸೆಟಪ್ ಪೂರ್ಣಗೊಂಡಿದೆ`,setupCompleteDesc:`ನಿಮ್ಮ ಜಮೀನನ್ನು ಆಫ್ಲೈನ್ ಡೇಟಾಬೇಸ್ಗೆ ಉಳಿಸಲಾಗಿದೆ.`,btnSkip:`ಸ್ಕಿಪ್ / ಆಟೋ ತುಂಬಿರಿ`,btnNextStep:`ಮುಂದಿನ ಹಂತ ➔`,btnCompleteSetup:`ಸೆಟಪ್ ಪೂರ್ಣಗೊಳಿಸಿ ➔`,loadingFarms:`ಜಮೀನುಗಳ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...`,confirmDeleteFarm:`ನೀವು ಖಚಿತವಾಗಿ ಈ ಜಮೀನನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?`,scenarioCropFirst:`ಬೆಳೆ-ಮೊದಲು`,scenarioEnergyFirst:`ವಿದ್ಯುತ್-ಮೊದಲು`,scenarioStormStow:`ಬಿರುಗಾಳಿ ರಕ್ಷಣೆ`,manualLocTitle:`ಸ್ಥಳವನ್ನು ನೀವೇ ನಮೂದಿಸಿ`,villageTown:`ಗ್ರಾಮ / ಊರು`,district:`ಜಿಲ್ಲೆ`,btnSaveLoc:`ಸ್ಥಳ ಉಳಿಸಿ`,manualWeatherTitle:`ಹವಾಮಾನ ನಮೂದಿಸಿ`,btnSaveWeather:`ಹವಾಮಾನ ಅನ್ವಯಿಸಿ`,resultsSummary:`ಆಪ್ಟಿಮೈಸೇಶನ್ ಫಲಿತಾಂಶ ಸಾರಾಂಶ`,resultsSub:`ಕೃಷಿ ಮತ್ತು ಸೌರ ಶಕ್ತಿಯ ಸಮಗ್ರ ಪರಿಶೀಲನೆ`,savedHistoryTitle:`ಉಳಿಸಲಾದ ಶಿಫಾರಸುಗಳ ಇತಿಹಾಸ`,savedHistorySub:`IndexedDB ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.`,canopySunlight:`ಬೆಳೆಗೆ ಬಿಸಿಲು`,shadow:`ನೆರಳು`,row:`ಸಾಲು`,btnVoiceAssistant:`ಕಿಸಾನ್ ವಾಣಿ AI`,voiceAssistantTitle:`ಕಿಸಾನ್ ವಾಣಿ AI — ಕೃಷಿ ಧ್ವನಿ ಸಹಾಯಕ`,voiceAssistantSubtitle:`ಬೆಳೆ, ಸೌರ ಶಕ್ತಿ, ಬ್ಯಾಟರಿ ಅಥವಾ ಎಚ್ಚರಿಕೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ`,voiceStatusIdle:`ಮೈಕ್ ಒತ್ತಿ ಅಥವಾ ಕೆಳಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ`,voiceStatusListening:`ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ... ಮಾತನಾಡಿ`,voiceStatusThinking:`ಕೃಷಿ ಸೆನ್ಸರ್‌ಗಳ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...`,voiceStatusSpeaking:`ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ...`,voiceInputPlaceholder:`ಪ್ರಶ್ನೆ ಕೇಳಿ ಅಥವಾ ಕೆಳಗಿನ ಆಯ್ಕೆಗಳನ್ನು ಒತ್ತಿ...`,voiceBtnSpeak:`ಮಾತನಾಡಿ`,voiceBtnSend:`ಕಳುಹಿಸಿ`,voiceBtnMute:`ಧ್ವನಿ ಮ್ಯೂಟ್`,voiceBtnUnmute:`ಧ್ವನಿ ಆನ್ ಮಾಡಿ`,voiceBtnStop:`ನಿಲ್ಲಿಸಿ`,voiceSpeed:`ಧ್ವನಿ ವೇಗ`,voiceSpeedNormal:`ಸಾಮಾನ್ಯ (1.0x)`,voiceSpeedSlow:`ನಿಧಾನ (0.85x)`,voiceChipCrop:`🌿 ಬೆಳೆಗಳ ಆರೋಗ್ಯ`,voiceChipSolar:`☀️ ಸೌರ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ`,voiceChipBattery:`🔋 ಬ್ಯಾಟರಿ ಮತ್ತು ಬ್ಯಾಕಪ್`,voiceChipIrrigation:`💧 ನೀರಾವರಿ ಸಲಹೆ`,voiceChipAngle:`📐 ಫಲಕದ ಕೋನದ ವಿವರ`,voiceChipAlerts:`🚨 ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಓದಿ`,voiceChipReadScreen:`📢 ಪರದೆಯನ್ನು ಓದಿ ಹೇಳಿ`,voiceAlertsToggle:`ಧ್ವನಿ ಎಚ್ಚರಿಕೆಗಳು`,voiceAlertsActive:`ಧ್ವನಿ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ`,voiceAlertsMuted:`ಧ್ವನಿ ಎಚ್ಚರಿಕೆ ಮ್ಯೂಟ್ ಆಗಿದೆ`,voiceBtnTestAlert:`🔊 ಧ್ವನಿ ಎಚ್ಚರಿಕೆ ಪರೀಕ್ಷಿಸಿ`,voiceWelcomeMsg:`ನಮಸ್ಕಾರ! ನಾನು ಕಿಸಾನ್ ವಾಣಿ AI. ಬೆಳೆಗಳ ಆರೋಗ್ಯ, ಸೌರ ವಿದ್ಯುತ್, ಬ್ಯಾಟರಿ ಮತ್ತು ನೀರಾವರಿ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`,voiceAlertTestSpoken:`ಗಮನಿಸಿ: ಪರೀಕ್ಷಾ ಧ್ವನಿ ಎಚ್ಚರಿಕೆ. ಬಿರುಗಾಳಿಯ ಕಾರಣ ಸೌರ ಫಲಕಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಸಮತಟ್ಟಾಗಿ 0 ಡಿಗ್ರಿಗೆ ಮಡಚಲಾಗಿದೆ.`,voiceAlertWindSpoken:`ತುರ್ತು ಎಚ್ಚರಿಕೆ: ಬಲವಾದ ಗಾಳಿ ಪತ್ತೆಯಾಗಿದೆ. ಉಪಕರಣ ರಕ್ಷಿಸಲು ಸೌರ ಫಲಕಗಳನ್ನು 0 ಡಿಗ್ರಿಗೆ ಮಡಚಲಾಗಿದೆ.`,voiceAlertRainSpoken:`ಮಳೆ ಎಚ್ಚರಿಕೆ: ಮಳೆ ದಾಖಲಾಗಿದೆ. ಮಳೆ ನೀರು ಸಂಗ್ರಹಕ್ಕಾಗಿ ಫಲಕಗಳನ್ನು 30 ಡಿಗ್ರಿಗೆ ತಿರುಗಿಸಲಾಗಿದೆ.`,voiceAlertBatteryLowSpoken:`ಬ್ಯಾಟರಿ ಎಚ್ಚರಿಕೆ: ಬ್ಯಾಟರಿ ಚಾರ್ಜ್ 20 ಪ್ರತಿಶತಕ್ಕಿಂತ ಕಡಿಮೆಯಾಗಿದೆ. ತುರ್ತು ಲೋಡ್ ಕಡಿತ ಸಕ್ರಿಯವಾಗಿದೆ.`,voiceAlertIrrigationSpoken:`ನೀರಾವರಿ ಮಾಹಿತಿ: ಮಣ್ಣಿನ ತೇವಾಂಶ ಕಡಿಮೆಯಾಗಿದೆ. ಹನಿ ನೀರಾವರಿ ಆರಂಭಿಸಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.`,voiceReadScreenNotice:`ಪ್ರಸ್ತುತ ಪರದೆಯ ಮಾಹಿತಿಯನ್ನು ಓದಿ ಹೇಳುತ್ತಿದ್ದೇನೆ.`},ta:{appTitle:`சன்-ஸ்டார்வ்ட் டிராக்கர்`,tagline:`விவசாய-சூரிய மின் உகப்பாக்கி`,subTagline:`“பயிருக்கு சூரிய ஒளியைக் குறைக்காமல், பண்ணைக்கு மின்சாரம் எடுங்கள்.”`,heroTitle:`பயிருக்கான சூரிய ஒளிக்கும் சூரிய மின்சாரத்திற்கும் இடையே சரியான சமநிலையைக் கண்டறியவும்.`,heroSubtitle:`ஆரோக்கியமான பயிர்கள் மற்றும் சிறந்த சூரிய மின்சாரத்திற்காக AI-வழிகாட்டும் சோலார் கோணம்.`,btnGuide:`எளிய வழிகாட்டி`,btnPresentation:`விளக்கக்காட்சி`,syncOnline:`ஆன்லைன் — நேரலைத் தரவு தயார்`,syncOffline:`ஆஃப்லைன் — சேமிக்கப்பட்ட தகவல் பயன்பாட்டில் உள்ளது`,syncRestored:`✓ இணைப்பு மீட்டமைக்கப்பட்டது — தரவு ஒத்திசைக்கப்பட்டது...`,navHome:`முகப்பு`,navDashboard:`IoT கட்டுப்பாட்டு பலகை`,navCamera:`பயிர் கேமரா (3x)`,navEnergy:`ஆற்றல் மற்றும் பேட்டரி`,navPositioning:`பேனல் கோண நிலை`,navAlerts:`எச்சரிக்கைகள் & நிகழ்வுகள்`,navScheduler:`சென்சார் அட்டவணை`,navSimulator:`சிஸ்டம் சிமுலேட்டர்`,navReports:`பண்ணை அறிக்கைகள்`,navSupport:`வாடிக்கையாளர் சேவை & கருத்து`,navCare:`ஆதரவு`,navScan:`ஸ்கேன் & பயிர்`,navWeather:`வானிலை`,navOptimize:`உகப்பாக்கம்`,navResults:`முடிவுகள்`,navSecurity:`பாதுகாப்பு & ஐடி`,navFarms:`என் பண்ணைகள்`,navWhatIf:`வாட்-இஃப்`,navOnboarding:`வழிகாட்டி`,btnCustomerCare:`வாடிக்கையாளர் சேவை`,langSwitchedNotice:`மொழி வெற்றிகரமாக மாற்றப்பட்டது`,btnOptimize:`🌱 என் பண்ணையை மேம்படுத்துக`,btnDemo:`🎮 மாதிரி பண்ணையை பார்க்க`,btnScan:`📷 பண்ணையை ஸ்கேன் செய்`,btnStart:`🌱 பண்ணையை தொடங்குக`,btnApplyAngle:`பரிந்துரைக்கப்பட்ட கோணத்தை அமை`,btnSaveFarm:`💾 பண்ணையை சேமிக்க`,btnGenerateReport:`📄 பண்ணை அறிக்கை`,btnResetDemo:`மாதிரி மீட்டமை`,btnExplainFarmer:`விவசாயிக்கு எளிதாக விளக்கு`,btnTechnicalView:`தொழில்நுட்ப விவரம்`,btnUseMyLocation:`📍 என் இருப்பிடத்தைப் பயன்படுத்து`,btnEnterManually:`📝 இருப்பிடத்தை உள்ளிடவும்`,btnBack:`பின் செல்`,btnNext:`அடுத்து`,btnCancel:`ரத்து செய்`,btnDelete:`நீக்கு`,btnConfirm:`உறுதி செய்`,btnUploadPhoto:`🖼️ புகைப்படம் பதிவேற்று`,btnTakePhoto:`📷 புகைப்படம் எடு`,btnRetake:`மீண்டும் எடு`,btnAutoSweetSpot:`✨ ஒரே கிளிக்கில் சரியான கோணம் (35°) அமை`,btnReadGuide:`எளிய கையேடு வாசிக்க ❓`,btnRefreshWeather:`🔄 வானிலையைப் புதுப்பி`,btnManualWeather:`📝 வானிலையை உள்ளிடவும்`,btnAddFarm:`+ புதிய பண்ணை சேர்`,btnOpenFarm:`பண்ணையை திற`,btnEdit:`திருத்து`,btnPrintPdf:`🖨️ அச்சிடு / PDF சேமி`,btnDownloadJson:`📥 JSON பதிவிறக்கு`,btnGotIt:`புரிந்தது, தொடங்குவோம்! 🌱`,badgeLive:`🟢 நேரலைத் தரவு (LIVE)`,badgeCached:`🟠 சேமிக்கப்பட்ட தரவு (CACHED)`,badgeDemo:`🟣 மாதிரித் தரவு (DEMO)`,badgeSim:`🔵 கணிப்பு / மதிப்பீடு`,badgeSweetSpot:`சரியான சமநிலை கிடைத்தது`,badgeNeedsOpt:`மேம்படுத்தல் தேவை`,howItWorksTitle:`இது 3 எளிய படிகளில் எவ்வாறு செயல்படுகிறது`,step1Title:`1. உங்கள் பயிரைத் தேர்ந்தெடுக்கவும்`,step1Desc:`நீங்கள் என்ன பயிரிடுகிறீர்கள் என்று குறிப்பிடுங்கள். ஒவ்வொரு பயிருக்கும் குறிப்பிட்ட சூரிய ஒளி தேவை.`,step2Title:`2. சூரியனையும் நிழலையும் கவனியுங்கள்`,step2Desc:`சூரியன் ஸ்லைடரை நகர்த்தி நாள் முழுவதும் பேனல் நிழல் எவ்வாறு விழுகிறது என்று பாருங்கள்.`,step3Title:`3. சமநிலையை அமையுங்கள்`,step3Desc:`"ஆட்டோ-அட்ஜஸ்ட்" அழுத்தி பயிருக்கு முழு சூரிய ஒளியும் அதிக சூரிய மின்சாரமும் கிடைக்குமாறு செய்யுங்கள்.`,farmPulse:`🌱 பண்ணை துடிப்பு (FARM PULSE)`,cropSunlight:`பயிரின் சூரிய ஒளி`,solarEnergy:`சூரிய மின் உற்பத்தி`,farmBalance:`ஒட்டுமொத்த சமநிலை`,shadowImpact:`நிழல் பரவல்`,weatherStatus:`வானிலை நிலை`,panelPosition:`பேனல் நிலை`,locationStatus:`இருப்பிடம்`,networkStatus:`இணைய நிலை`,cropComfortLevel:`பயிர் சூரிய ஒளி திருப்தி`,cropHappy:`ஆரோக்கியமாக உள்ளது: சிறந்த சூரிய ஒளி கிடைக்கிறது!`,cropSad:`சூரிய ஒளி போதாது: பேனல் கோணத்தை மாற்றி ஒளியை விடுங்கள்!`,digitalTwinTitle:`🌐 பண்ணை டிஜிட்டல் இரட்டை`,digitalTwinSub:`சூரியன் • சோலார் பேனல்கள் • நிழல் • பயிர் தொடர்பு`,timeOfDay:`பகலின் நேரம் (சூரியனின் நிலை)`,panelAngle:`பேனல் சாய்வுக் கோணம்`,panelHeight:`தரையிலிருந்து பேனல் உயரம்`,panelSpacing:`பேனல்களுக்கு இடையே இடைவெளி`,rowSpacing:`வரிசை இடைவெளி`,cloudCover:`மேகமூட்டம்`,solarIrradiance:`சூரிய கதிர்வீச்சு`,hintFlat:`☀️ தட்டையான சாய்வு — பயிர்களுக்கு குளிர்ச்சியான நிழலைத் தருகிறது`,hintBalanced:`⚖️ சமநிலைக் கோணம் — பயிர்களுக்கு ஒளியும் தரும், மின்சாரமும் அதிகம் தரும்`,hintSteep:`🌅 செங்குத்தான சாய்வு — அதிக இயற்கை ஒளியை தரைக்கு வர அனுமதிக்கிறது`,hintLowClearance:`🚶 குறைந்த உயரம் — கையால் அறுவடை செய்யும் பயிர்களுக்கு ஏற்றது`,hintStdClearance:`🚜 நிலையான உயரம் — டிராக்டர்கள் எளிதில் கீழே செல்லலாம்`,hintHighClearance:`🌾 அதிக உயரம் — பெரிய அறுவடை இயந்திரங்கள் எளிதில் செல்லலாம்`,hintNarrowGap:`குறைந்த இடைவெளி — அடியில் அடர்ந்த நிழல் இருக்கும்`,hintWideGap:`அதிக இடைவெளி — நாள் முழுவதும் சூரிய ஒளிக்கற்றைகள் சுழலும்`,alertsTitle:`🔔 பண்ணை செயல்பாட்டு எச்சரிக்கைகள்`,planTitle:`📅 இன்றைய பண்ணை சூரிய திட்டம்`,morning:`06:00 - 10:00 (காலை): பனியை உலர்த்த சூரிய ஒளி`,midday:`10:00 - 14:00 (மதியம்): வெயிலில் இருந்து நிழல் மற்றும் மின்சாரம்`,afternoon:`14:00 - 17:00 (பிற்பகல்): மேற்கத்திய சூரியனில் இருந்து மின் உற்பத்தி`,evening:`17:00 - 19:00 (மாலை): காற்றுப் பாதுகாப்புக்கு பேனலை தட்டையாக வை`,scanTitle:`📷 பண்ணை புகைப்படம் & ஸ்கேன்`,scanSubtitle:`பயிரின் நிலை மற்றும் GPS பெற புகைப்படம் எடுக்கவும்`,noPhotoYet:`இன்னும் புகைப்படம் எடுக்கப்படவில்லை`,noPhotoSub:`கேமராவில் படம் எடுக்கவும் அல்லது பதிவேற்றவும்`,exifTitle:`📍 புகைப்பட GPS விவரம்`,aiAnalysisTitle:`🟣 AI பயிர் பகுப்பாய்வு`,aiAnalysisSub:`AI கணிப்பு — சரிபார்க்கவும்`,detectedCrop:`கண்டறியப்பட்ட பயிர்`,estimatedCondition:`மதிப்பிடப்பட்ட நிலை`,growthStage:`வளர்ச்சி நிலை`,lightRequirement:`சூரிய ஒளி தேவை`,weatherTitle:`🌦️ பண்ணை வானிலை தகவல்`,weatherHourlyTitle:`⏱️ 24 மணி நேர முன்னறிவிப்பு மற்றும் கதிர்வீச்சு`,weatherDailyTitle:`📆 7 நாள் வானிலை முன்னறிவிப்பு`,optimizeHeroTitle:`பயிருக்கான சூரிய ஒளிக்கும் சோலார் மின்சாரத்திற்கும் இடையே சமநிலையைக் காண்க`,currentSetup:`தற்போதைய அமைப்பு`,recommendedSetup:`AI பரிந்துரை அமைப்பு`,whyRecommendation:`💡 இந்த பரிந்துரைக்கு என்ன காரணம்?`,evaluatedCandidates:`📊 சோதிக்கப்பட்ட அமைப்புகள்`,powerGeneration:`மின் உற்பத்தி`,actuatorTitle:`⚙️ மெய்நிகர் ஆக்சுவேட்டர் மோட்டார் உருவகப்படுத்துதல்`,currentAngle:`தற்போதைய கோணம்`,targetSweetSpot:`இலக்கு கோணம்`,actuatorReady:`மோட்டார் தயாராக உள்ளது`,actuatorAligning:`மோட்டார் பேனலை நகர்த்துகிறது (1.5°/வினாடி)...`,actuatorReached:`✓ இலக்கு கோணம் அடைந்தது`,actuatorDisclaimer:`⚠️ மாதிரி நோக்கங்களுக்கானது.`,heatmapTitle:`🌱 வரிசை வாரியாக சூரிய ஒளி ஹீட்மேப்`,heatmapSub:`தரையில் நிழல் பரவலின் வரைபடம்`,row1:`வரிசை 1: தூணின் கீழே`,row2:`வரிசை 2: பேனலின் நடுப்பகுதிக்கு கீழே`,row3:`வரிசை 3: பேனல்களுக்கு இடையே திறந்த வழி`,row4:`வரிசை 4: பாதை`,highLight:`அதிக ஒளி (>75%)`,modLight:`மிதமான ஒளி (50-75%)`,lowLight:`குறைந்த ஒளி (30-50%)`,excessShade:`அதிக நிழல் (<30%)`,tradeoffTitle:`📈 சமநிலை வளைவு (Pareto Frontier)`,tradeoffSub:`பயிர் ஒளி vs சூரிய மின்சார வரைபடம்`,cropAxis:`🌱 பயிர் சூரிய ஒளி (%) →`,solarAxis:`⚡ சூரிய மின்சாரம் (%) →`,legendSweetSpot:`பரிந்துரைக்கப்பட்ட சமநிலை (Sweet Spot)`,legendCurrent:`தற்போதைய நிலை`,legendCandidates:`சோதிக்கப்பட்டவை`,myFarmsTitle:`🌾 என் சேமிக்கப்பட்ட பண்ணைகள்`,myFarmsSub:`உங்கள் டிஜிட்டல் பண்ணைகளை நிர்வகிக்கவும்`,noFarmsYet:`பண்ணைகள் எதுவும் இல்லை. புதிய பண்ணையைச் சேர்க்கவும்.`,whatIfTitle:`🔮 வாட்-இஃப் சிமுலேட்டர்`,whatIfSub:`வெவ்வேறு சூழ்நிலைகளின் முடிவுகளை ஒப்பிடுக`,scenarioSweet:`⭐ AI சமநிலை (Sweet Spot)`,scenarioCurrent:`தற்போதைய நிலை`,scenarioCrop:`🌱 பயிருக்கு முன்னுரிமை (அதிக ஒளி)`,scenarioEnergy:`⚡ மின்சாரத்திற்கு முன்னுரிமை (அதிக மின்சாரம்)`,scenarioStorm:`🛡️ புயல் பாதுகாப்பு`,onboardingTitle:`🌱 வழிகாட்டப்பட்ட விவசாய அமைப்பு`,crop_tomato:`தக்காளி`,crop_wheat:`கோதுமை`,crop_maize:`மக்காச்சோளம்`,crop_rice:`அரிசி (நெல்)`,crop_potato:`உருளைக்கிழங்கு`,crop_vegetables:`கீரைகள் / காய்கறிகள்`,crop_other:`பிற பயிர்`,faqTitle:`விவசாயிகளுக்கான எளிய வழிகாட்டி`,faqIntro:`சன்-ஸ்டார்வ்ட் டிராக்கருக்கு வரவேற்கிறோம்! உங்கள் பண்ணையில் இருந்து சிறந்த பலன்களைப் பெற தேவையான அனைத்தும் எளிய தமிழில் இங்கே உள்ளன.`,faqQ1:`🌱 1. அக்ரி-வோல்டாயிக் பண்ணை என்றால் என்ன?`,faqA1:`பயிர்களுக்கு மேலே (தரையில் இருந்து 3 மீட்டர் உயரத்தில்) சோலார் பேனல்களை அமைப்பதே அக்ரி-வோல்டாயிக்ஸ் ஆகும். ஒரே நிலத்தில் பயிர்களும் வளரும், சுத்தமான மின்சாரமும் உற்பத்தியாகும்.`,faqQ2:`☀️ 2. சோலார் பேனல்கள் நாள் முழுவதும் சூரியனை மட்டுமே நோக்கி இருக்கக்கூடாதா?`,faqA2:`வழக்கமான சோலார் அமைப்புகள் மின்சாரத்தை மட்டுமே கருத்தில் கொள்கின்றன. பேனல்கள் சூரியனை மட்டுமே பின்தொடர்ந்தால் பயிர்களுக்கு கடும் நிழல் விழுந்து மகசூல் குறையும். சன்-ஸ்டார்வ்ட் டிராக்கர் பயிர்களுக்கு தேவையான சூரிய ஒளிக்கு முன்னுரிமை அளிக்கிறது!`,faqQ3:`⚖️ 3. "ஸ்வீட் ஸ்பாட்" (சரியான சமநிலை) என்றால் என்ன?`,faqA3:`பயிர்களுக்கு 100% தேவையான சூரிய ஒளியும் கிடைத்து, அதிகபட்ச மின்சாரமும் உற்பத்தியாகும் துல்லியமான கோணமே ஸ்வீட் ஸ்பாட் ஆகும்.`,faqQ4:`📱 4. இணையம் (இன்டர்நெட்) இல்லாமல் வயலில் வேலை செய்யுமா?`,faqA4:`ஆம்! சன்-ஸ்டார்வ்ட் டிராக்கர் ஒரு PWA செயலி. நிழல் மாதிரிகள் மற்றும் அனைத்து கணக்கீடுகளும் உங்கள் பிரவுசரிலேயே ஆஃப்லைனில் இயங்கும்.`,faqQ5:`🍅 5. பயிரை மாற்றுவது அல்லது புதிய பண்ணையை சேர்ப்பது எப்படி?`,faqA5:`ஸ்கேன் மற்றும் பயிர் பகுதிக்கு செல்லவும் அல்லது வழிகாட்டி விஸார்டைத் திறக்கவும். உங்கள் பயிர் மற்றும் வளர்ச்சி நிலையைத் தேர்ந்தெடுக்கவும்.`,reportTitle:`அக்ரி-வோல்டாயிக்ஸ் பண்ணை அறிக்கை`,reportSub:`விவசாய-சூரிய முடிவெடுக்கும் தளம்`,reportDate:`தேதி`,reportFarmCrop:`பயிர்`,reportFarmArea:`பண்ணை பரப்பளவு`,reportLocation:`இடம்`,reportWeatherStatus:`வானிலை நிலை`,reportSolarArray:`சோலார் கட்டமைப்பு`,reportDataQuality:`தரவு தரம்`,reportSetupComparison:`அமைப்புகள் ஒப்பீடு`,reportMetric:`அளவீடு`,reportDelta:`வித்தியாசம் (Delta)`,reportWhySelected:`இந்த பரிந்துரை ஏன் தேர்ந்தெடுக்கப்பட்டது:`,reportDisclaimer:`மாதிரி ஆலோசனைக் குறிப்பு: இந்த அறிக்கை கணித மதிப்பீடுகளைக் கொண்டது மற்றும் தொழில்முறை விவசாய அல்லது பொறியியல் ஆலோசனைக்கு மாற்றாகாது.`,alertCropBelow:`பயிர்க்கான சூரிய ஒளி குறைவாக உள்ளது`,alertStrongSun:`அதிக சூரிய கதிர்வீச்சு கிடைக்கிறது`,alertAiRecommends:`AI கோண மாற்றத்தை பரிந்துரைக்கிறது`,alertCloudCover:`மேகமூட்ட தாக்கம்`,morningDesc:`மண்ணை கதகதப்பாக்க காலை 40° கோணம்`,middayDesc:`கடும் வெயிலில் இருந்து பயிரைப் பாதுகாக்க சமநிலை கோணம்`,afternoonDesc:`அதிக மின்சாரத்திற்கு மேற்கே திருப்பவும்`,eveningDesc:`காற்று பாதுகாப்பிற்காக இரவில் 10° சமதள நிலை`,colCandidate:`விருப்பம்`,colTiltAngle:`கோணம்`,colHeight:`உயரம்`,colSpacing:`இடைவெளி`,colCropLight:`பயிர் ஒளி`,colSolar:`சூரிய சக்தி`,colBalance:`சமநிலை`,badgeOptimalConfig:`சிறந்த கட்டமைப்பு`,badgeCurrentConfig:`தற்போதைய கட்டமைப்பு`,aiSweetSpotFound:`AI ஸ்வீட் ஸ்பாட் கண்டறியப்பட்டது`,btnViewEngine:`விரிவான இயந்திரத்தைக் காண்க ➔`,recommendedTilt:`பரிந்துரைக்கப்பட்ட கோணம்`,clearanceHeight:`உயர இடைவெளி`,balanceScore:`சமநிலை மதிப்பீடு`,badgeLiveEvaluated:`நேரடி மதிப்பீடு`,badgePrototypeSchedule:`திட்ட அட்டவணை`,statusGood:`நன்று`,statusModerate:`மிதமானது`,statusHigh:`அதிகம்`,statusOptimal:`உகந்தது`,statusOptimized:`மேம்படுத்தப்பட்டது`,statusNeedsAdjust:`சரிசெய்தல் தேவை`,statusAvailable:`கிடைக்கிறது`,activeFarm:`செயலில் உள்ள பண்ணை`,humidity:`ஈரப்பதம்`,windSpeed:`காற்றின் வேகம்`,btnCaptureSnapshot:`📸 புகைப்படம் எடுக்கவும்`,badgeGpsDetected:`🟢 GPS கண்டறியப்பட்டது`,badgeLocation:`🟣 இடம்`,coordinates:`ஆயத்தொலைவுகள்`,farmLocation:`பண்ணை அமைவிடம்`,badgeDemoAi:`🟣 மாதிரி AI கணிப்பு`,aiDisclaimer:`மாதிரி கணினி பார்வை உருவகப்படுத்துதல். சர்வர் தேவையில்லை. உங்கள் பயிரை நீங்களே மாற்றிக்கொள்ளலாம்.`,btnEditCropProfile:`பயிர் விவரத்தைத் திருத்தவும் ➔`,step:`படி`,of:`/`,stepFarm:`பண்ணை`,stepCrop:`பயிர்`,stepLocation:`இடம்`,stepWeather:`வானிலை`,stepSolar:`சோலார்`,stepSimulation:`மாதிரி`,stepOptimization:`AI தேர்வு`,stepResults:`முடிவுகள்`,farmProfile:`பண்ணை சுயவிவரம்`,farmName:`பண்ணை பெயர்`,farmSize:`பண்ணை அளவு`,unitAcre:`ஏக்கர்`,unitHectare:`ஹெக்டேர்`,selectCropStage:`பயிர் மற்றும் வளர்ச்சி நிலையைத் தேர்ந்தெடுக்கவும்`,stageSeedling:`நாற்று (Seedling)`,stageVegetative:`வளர்ச்சி (Vegetative)`,stageFlowering:`பூக்கும் நிலை (Flowering)`,stageFruiting:`காய்/தானிய நிலை (Fruiting)`,stageMature:`அறுவடை நிலை (Harvest)`,irrigationMethod:`பாசன முறை`,irrigDrip:`சொட்டு நீர் பாசனம்`,irrigSprinkler:`தெளிப்பு நீர் பாசனம்`,irrigFlood:`பாய்வு நீர் பாசனம்`,irrigRainfed:`மானாவாரி`,farmLocationTitle:`பண்ணை அமைவிடம்`,farmLocationDesc:`ஆயத்தொலைவுகள் சூரியனின் நிலை மற்றும் நிழலின் பாதையைக் கணக்கிடுகின்றன.`,latitude:`அட்சரேகை (°N)`,longitude:`தீர்க்கரேகை (°E)`,weatherBaseline:`வானிலை அடிப்படை`,weatherBaselineDesc:`வானிலை சூரிய ஒளியின் செறிவை பாதிக்கிறது.`,temperature:`வெப்பநிலை (°C)`,cloudCoverPercent:`மேகமூட்டம் (%)`,existingSolar:`தற்போதைய சோலார் கட்டமைப்பு`,initialTilt:`தொடக்க சாய்வு கோணம் (°)`,panelWattage:`பேனல் வாட் திறன் (W)`,twinVerification:`டிஜிட்டல் இரட்டை சரிபார்ப்பு`,twinVerifDesc:`அளவுருக்கள் 2D நிழல் மாதிரியுடன் இணைக்கப்படுகின்றன.`,aiReadyTitle:`AI தேர்வுத் தயார்`,aiReadyDesc:`கோணம், உயரம் மற்றும் இடைவெளிகளை AI மதிப்பீடு செய்கிறது.`,setupComplete:`அமைப்பு நிறைவுற்றது`,setupCompleteDesc:`பண்ணை ஆஃப்லைன் தரவுத்தளத்தில் சேமிக்கப்பட்டது.`,btnSkip:`தவிர் / தானாக நிரப்பு`,btnNextStep:`அடுத்த படி ➔`,btnCompleteSetup:`அமைப்பை முடிக்கவும் ➔`,loadingFarms:`பண்ணைகள் ஏற்றப்படுகின்றன...`,confirmDeleteFarm:`இந்த பண்ணையை நிச்சயமாக நீக்க விரும்புகிறீர்களா?`,scenarioCropFirst:`பயிர்-முதன்மை`,scenarioEnergyFirst:`மின்சாரம்-முதன்மை`,scenarioStormStow:`புயல் பாதுகாப்பு`,manualLocTitle:`இடத்தை நீங்களே உள்ளிடவும்`,villageTown:`கிராமம் / நகரம்`,district:`மாவட்டம்`,btnSaveLoc:`இடத்தைச் சேமிக்கவும்`,manualWeatherTitle:`வானிலையை நீங்களே உள்ளிடவும்`,btnSaveWeather:`வானிலையைப் பயன்படுத்தவும்`,resultsSummary:`உகப்பாக்க முடிவுகளின் சுருக்கம்`,resultsSub:`விவசாய மற்றும் சூரிய நோக்கங்களின் முழுமையான சரிபார்ப்பு`,savedHistoryTitle:`சேமிக்கப்பட்ட பரிந்துரைகளின் வரலாறு`,savedHistorySub:`உள்ளூர் IndexedDB இல் சேமிக்கப்பட்டுள்ளது.`,canopySunlight:`பயிருக்கு சூரிய ஒளி`,shadow:`நிழல்`,row:`வரிசை`,btnVoiceAssistant:`கிசான் வாணி AI`,voiceAssistantTitle:`கிசான் வாணி AI — விவசாய குரல் உதவியாளர்`,voiceAssistantSubtitle:`பயிர்கள், சூரிய மின்சாரம், பேட்டரி அல்லது எச்சரிக்கைகள் பற்றி கேளுங்கள்`,voiceStatusIdle:`மைக்கை அழுத்தவும் அல்லது கீழே கேள்வி கேட்கவும்`,voiceStatusListening:`கேட்கிறது... தயவுசெய்து பேசுங்கள்`,voiceStatusThinking:`பண்ணை சென்சார்களை ஆய்வு செய்கிறது...`,voiceStatusSpeaking:`பேசுகிறது...`,voiceInputPlaceholder:`கேள்வி கேளுங்கள் அல்லது பரிந்துரையைத் தேர்ந்தெடுக்கவும்...`,voiceBtnSpeak:`பேசுங்கள்`,voiceBtnSend:`அனுப்புக`,voiceBtnMute:`குரலை முடக்கு`,voiceBtnUnmute:`குரலை இயக்கு`,voiceBtnStop:`நிறுத்து`,voiceSpeed:`குரல் வேகம்`,voiceSpeedNormal:`சாதாரண (1.0x)`,voiceSpeedSlow:`மெதுவான (0.85x)`,voiceChipCrop:`🌿 பயிர் ஆரோக்கியம்`,voiceChipSolar:`☀️ சூரிய மின் உற்பத்தி`,voiceChipBattery:`🔋 பேட்டரி நிலை`,voiceChipIrrigation:`💧 பாசன ஆலோசனை`,voiceChipAngle:`📐 பேனல் கோணத்தின் காரணம்`,voiceChipAlerts:`🚨 எச்சரிக்கைகளை வாசிக்கவும்`,voiceChipReadScreen:`📢 திரையை வாசிக்கவும்`,voiceAlertsToggle:`குரல் எச்சரிக்கைகள்`,voiceAlertsActive:`குரல் எச்சரிக்கை இயக்கத்தில் உள்ளது`,voiceAlertsMuted:`குரல் எச்சரிக்கை முடக்கப்பட்டுள்ளது`,voiceBtnTestAlert:`🔊 குரல் எச்சரிக்கையை சோதிக்கவும்`,voiceWelcomeMsg:`வணக்கம்! நான் கிசான் வாணி AI. பயிர் ஆரோக்கியம், சூரிய மின்சாரம், பேட்டரி மற்றும் பாசனம் குறித்த தகவல்களை வழங்க முடியும். இன்று உங்களுக்கு எவ்வாறு உதவட்டும்?`,voiceAlertTestSpoken:`விவசாயி கவனத்திற்கு: சோதனை குரல் எச்சரிக்கை. பலத்த காற்று வீசுவதால் சோலார் பேனல்கள் 0 டிகிரியில் மடிக்கப்பட்டுள்ளன.`,voiceAlertWindSpoken:`அவசர எச்சரிக்கை: பலத்த காற்று கண்டறியப்பட்டது. சோலார் பேனல்கள் 0 டிகிரியில் பாதுகாப்பாக மடிக்கப்பட்டுள்ளன.`,voiceAlertRainSpoken:`மழை எச்சரிக்கை: மழை பதிவானது. மழைநீர் சேகரிப்பிற்காக பேனல்கள் 30 டிகிரி கோணத்தில் சாய்க்கப்பட்டுள்ளன.`,voiceAlertBatteryLowSpoken:`பேட்டரி எச்சரிக்கை: பேட்டரி சார்ஜ் 20 சதவீதத்திற்கும் குறைவாக உள்ளது. அவசர பேக்கப் முறை செயல்படுத்தப்பட்டது.`,voiceAlertIrrigationSpoken:`பாசன அறிவிப்பு: மண் ஈரப்பதம் குறைவாக உள்ளது. சொட்டு நீர் பாசனம் பரிந்துரைக்கப்படுகிறது.`,voiceReadScreenNotice:`தற்போதைய பக்கத்தின் தகவல்களை வாசிக்கிறேன்.`},te:{appTitle:`సన్-స్టార్వ్డ్ ట్రాకర్`,tagline:`అగ్రి-వోల్టాయిక్స్ ఆప్టిమైజర్`,subTagline:`“పైరుకి ఎండ ఆపకుండా, పొలానికి సోలార్ విద్యుత్ అందించండి.”`,heroTitle:`పంటకు కావాల్సిన ఎండ మరియు సోలార్ విద్యుత్ మధ్య సరైన సమతుల్యతను కనుగొనండి.`,heroSubtitle:`ఆరోగ్యకరమైన పంటలు మరియు అధిక సౌరశక్తి కోసం AI-సహాయక సోలార్ ప్యానెల్ పొజిషనింగ్.`,btnGuide:`సరళమైన గైడ్`,btnPresentation:`ప్రదర్శన టూర్`,syncOnline:`ఆన్‌లైన్ — లైవ్ డేటా సక్రియం`,syncOffline:`ఆఫ్‌లైన్ — లోకల్ డేటా ఉపయోగంలో ఉంది`,syncRestored:`✓ ఇంటర్నెట్ తిరిగి వచ్చింది — డేటా సమకాలీకరించబడింది...`,navHome:`హోమ్`,navDashboard:`IoT డ్యాష్‌బోర్డ్`,navCamera:`పంట కెమెరా (3x)`,navEnergy:`విద్యుత్ & బ్యాటరీ`,navPositioning:`ప్యానెల్ స్థానం & కోణం`,navAlerts:`హెచ్చరికలు & సంఘటనలు`,navScheduler:`సెన్సార్ షెడ్యూలర్`,navSimulator:`సిస్టమ్ సిమ్యులేటర్`,navReports:`వ్యవసాయ నివేదికలు`,navSupport:`కస్టమర్ కేర్ & ఫీడ్‌బ్యాక్`,navCare:`మద్దతు`,navScan:`స్కాన్ & పంట`,navWeather:`వాతావరణం`,navOptimize:`ఆప్టిమైజ్`,navResults:`ఫలితాలు`,navSecurity:`భద్రత & ID`,navFarms:`నా పొలాలు`,navWhatIf:`వాట్-ఇఫ్ సిమ్యులేషన్`,navOnboarding:`గైడెడ్ విజార్డ్`,btnCustomerCare:`కస్టమర్ కేర్`,langSwitchedNotice:`భాష విజయవంతంగా మార్చబడింది`,btnOptimize:`🌱 నా పొలాన్ని ఆప్టిమైజ్ చేయండి`,btnDemo:`🎮 డెమో పొలాన్ని చూడండి`,btnScan:`📷 పొలాన్ని స్కాన్ చేయండి`,btnStart:`🌱 నా పొలం ప్రారంభించండి`,btnApplyAngle:`సిఫార్సు చేసిన కోణాన్ని అమర్చండి`,btnSaveFarm:`💾 పొలం డేటా భద్రపరచండి`,btnGenerateReport:`📄 వ్యవసాయ నివేదిక పొందండి`,btnResetDemo:`డెమో రీసెట్ చేయండి`,btnExplainFarmer:`రైతుకు సులభంగా వివరించండి`,btnTechnicalView:`సాంకేతిక వివరాలు`,btnUseMyLocation:`📍 నా లొకేషన్ ఉపయోగించండి`,btnEnterManually:`📝 లొకేషన్ నమోదు చేయండి`,btnBack:`వెనుకకు`,btnNext:`తరువాత`,btnCancel:`రద్దు చేయండి`,btnDelete:`తొలగించండి`,btnConfirm:`నిర్ధారించండి`,btnUploadPhoto:`🖼️ ఫోటో అప్‌లోడ్`,btnTakePhoto:`📷 ఫోటో తీయండి`,btnRetake:`మళ్ళీ తీయండి`,btnAutoSweetSpot:`✨ ఒకే క్లిక్‌తో సరైన కోణం (35°) సెట్ చేయండి`,btnReadGuide:`గైడ్ చదవండి ❓`,btnRefreshWeather:`🔄 వాతావరణం తాజాకరించండి`,btnManualWeather:`📝 వాతావరణం నమోదు చేయండి`,btnAddFarm:`+ కొత్త పొలం జోడించండి`,btnOpenFarm:`పొలం తెరవండి`,btnEdit:`సవరించండి`,btnPrintPdf:`🖨️ ప్రింట్ / PDF భద్రపరచండి`,btnDownloadJson:`📥 JSON డౌన్‌లోడ్ చేయండి`,btnGotIt:`అర్థమైంది, మొదలుపెడదాం! 🌱`,badgeLive:`🟢 లైవ్ డేటా (LIVE)`,badgeCached:`🟠 భద్రపరిచిన డేటా (CACHED)`,badgeDemo:`🟣 డెమో డేటా (DEMO)`,badgeSim:`🔵 సిమ్యులేషన్ / అంచనా`,badgeSweetSpot:`సరైన సమతుల్యత లభించింది`,badgeNeedsOpt:`మెరుగుదల అవసరం`,howItWorksTitle:`ఇది 3 సులభమైన దశల్లో ఎలా పనిచేస్తుంది`,step1Title:`1. మీ పంటను ఎంచుకోండి`,step1Desc:`మీరు ఏమి పండిస్తున్నారో ఎంచుకోండి. ప్రతి పంటకు మంచి దిగుబడి కోసం నిర్దిష్ట ఎండ కావాలి.`,step2Title:`2. ఎండ మరియు నీడను గమనించండి`,step2Desc:`సూర్యుని స్లైడర్‌ను జరిపి ప్యానెల్ నీడలు రోజంతా ఎలా కదులుతాయో చూడండి.`,step3Title:`3. సమతుల్యతను సెట్ చేయండి`,step3Desc:`"ఆటో-అడ్జస్ట్" పై క్లిక్ చేసి పంటకు పూర్తి ఎండ మరియు గరిష్ట విద్యుత్ అందేలా చేయండి.`,farmPulse:`🌱 వ్యవసాయ పల్స్ (FARM PULSE)`,cropSunlight:`పంటకు ఎండ శాతం`,solarEnergy:`సోలార్ విద్యుత్ ఉత్పత్తి`,farmBalance:`మొత్తం సమతుల్యత`,shadowImpact:`నీడ ప్రభావం`,weatherStatus:`వాతావరణ స్థితి`,panelPosition:`ప్యానెల్ స్థితి`,locationStatus:`లొకేషన్ స్థితి`,networkStatus:`నెట్‌వర్క్ స్థితి`,cropComfortLevel:`పంట ఎండ సౌలభ్యం`,cropHappy:`ఆరోగ్యంగా ఉంది: సరిపడా ఎండ అందుతోంది!`,cropSad:`ఎండ చాలడం లేదు: ప్యానెల్ కోణాన్ని మార్చండి!`,digitalTwinTitle:`🌐 పొలం డిజిటల్ ట్విన్`,digitalTwinSub:`సూర్యుడు • సోలార్ ప్యానెల్స్ • నీడ • పంటల సంబంధం`,timeOfDay:`సమయం (సూర్యుని స్థానం)`,panelAngle:`ప్యానెల్ వంపు కోణం`,panelHeight:`నేల నుండి ప్యానెల్ ఎత్తు`,panelSpacing:`ప్యానెల్స్ మధ్య దూరం`,rowSpacing:`వరుసల మధ్య దూరం`,cloudCover:`మేఘావృతం`,solarIrradiance:`సౌర వికిరణం`,hintFlat:`☀️ తక్కువ వంపు — నేలకు చల్లని నీడను అందిస్తుంది`,hintBalanced:`⚖️ సమతుల్య కోణం — పంటకు ఎండ మరియు గరిష్ట విద్యుత్ రెండూ లభిస్తాయి`,hintSteep:`🌅 ఎక్కువ వంపు — నేలమీదకు గరిష్ట సహజ వెలుతురును రానిస్తుంది`,hintLowClearance:`🚶 తక్కువ ఎత్తు — చేతితో కోసే పంటలకు అనుకూలం`,hintStdClearance:`🚜 ప్రామాణిక ఎత్తు — ట్రాక్టర్లు సులభంగా కిందనుండి వెళ్ళవచ్చు`,hintHighClearance:`🌾 ఎక్కువ ఎత్తు — హార్వెస్టర్లు తేలికగా తిరగగలవు`,hintNarrowGap:`తక్కువ దూరం — కింద దట్టమైన నీడ పడుతుంది`,hintWideGap:`ఎక్కువ దూరం — రోజంతా ఎండ చారలు మొక్కలపై పడతాయి`,alertsTitle:`🔔 పొలం నిర్వహణ హెచ్చరికలు`,planTitle:`📅 నేటి వ్యవసాయ-సౌర ప్రణాళిక`,morning:`06:00 - 10:00 (ఉదయం): మంచు ఆరడానికి ఎండ`,midday:`10:00 - 14:00 (మధ్యాహ్నం): ఎండ రక్షణ మరియు గరిష్ట విద్యుత్`,afternoon:`14:00 - 17:00 (సాయంత్రం): పశ్చిమ ఎండ నుండి విద్యుత్ సేకరణ`,evening:`17:00 - 19:00 (రాత్రి): గాలి నుండి రక్షణకు ప్యానెల్స్ సమతలంగా ఉంచండి`,scanTitle:`📷 పొలాన్ని స్కాన్ చేయండి / ఫోటో తీయండి`,scanSubtitle:`పంట స్థితి మరియు GPS పొందడానికి ఫోటో తీయండి`,noPhotoYet:`ఇంకా ఫోటో తీయలేదు`,noPhotoSub:`కెమెరాతో ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి`,exifTitle:`📍 ఫోటో నుండి పొందిన GPS వివరాలు`,aiAnalysisTitle:`🟣 AI పంట విశ్లేషణ`,aiAnalysisSub:`AI అంచనా — అవసరమైతే స్వయంగా సరిచూసుకోండి`,detectedCrop:`గుర్తించిన పంట`,estimatedCondition:`అంచనా వేసిన స్థితి`,growthStage:`పెరుగుదల దశ`,lightRequirement:`ఎండ అవసరం`,weatherTitle:`🌦️ పొలం వాతావరణ సమాచారం`,weatherHourlyTitle:`⏱️ 24 గంటల సూచన మరియు సౌర వికిరణం`,weatherDailyTitle:`📆 7 రోజుల వాతావరణ అంచనా`,optimizeHeroTitle:`పంట ఎండ మరియు సోలార్ విద్యుత్ మధ్య సరైన సమతుల్యతను కనుగొనండి`,currentSetup:`ప్రస్తుత సెటప్`,recommendedSetup:`AI సిఫార్సు చేసిన సెటప్`,whyRecommendation:`💡 ఈ సిఫార్సు ఎందుకు?`,evaluatedCandidates:`📊 విశ్లేషించిన కాన్ఫిగరేషన్లు`,powerGeneration:`విద్యుత్ ఉత్పత్తి`,actuatorTitle:`⚙️ వర్చువల్ యాక్యుయేటర్ మోటార్ సిమ్యులేషన్`,currentAngle:`ప్రస్తుత కోణం`,targetSweetSpot:`లక్ష్య కోణం`,actuatorReady:`మోటార్ సిద్ధంగా ఉంది`,actuatorAligning:`మోటార్ ప్యానెల్ను తిప్పుతోంది (1.5°/సెకను)...`,actuatorReached:`✓ లక్ష్య కోణం చేరుకుంది`,actuatorDisclaimer:`⚠️ ప్రదర్శన కోసం మాత్రమే.`,heatmapTitle:`🌱 పంట వరుసలలో ఎండ హీట్‌మ్యాప్`,heatmapSub:`నేలపై నీడల నిజమైన పంపిణీ`,row1:`వరుస 1: స్తంభం కింద`,row2:`వరుస 2: ప్యానెల్ మధ్యభాగం కింద`,row3:`వరుస 3: ప్యానెల్స్ మధ్య ఖాళీ దారి`,row4:`వరుస 4: ట్రాక్టర్ దారి`,highLight:`ఎక్కువ ఎండ (>75%)`,modLight:`మధ్యస్థ ఎండ (50-75%)`,lowLight:`తక్కువ ఎండ (30-50%)`,excessShade:`విపరీతమైన నీడ (<30%)`,tradeoffTitle:`📈 సమతుల్యత గ్రాఫ్ (Pareto Frontier)`,tradeoffSub:`పంట ఎండ vs సోలార్ విద్యుత్ సమతుల్యత`,cropAxis:`🌱 పంటకు ఎండ (%) →`,solarAxis:`⚡ సోలార్ విద్యుత్ (%) →`,legendSweetSpot:`సిఫార్సు చేసిన సమతుల్యత (Sweet Spot)`,legendCurrent:`ప్రస్తుత సెటప్`,legendCandidates:`పరిశీలించినవి`,myFarmsTitle:`🌾 నా భద్రపరిచిన పొలాలు`,myFarmsSub:`మీ డిజిటల్ పొలాలను నిర్వహించండి`,noFarmsYet:`పొలాలు ఏవీ లేవు. కొత్త పొలాన్ని సృష్టించండి లేదా డెమో చూడండి.`,whatIfTitle:`🔮 వాట్-ఇఫ్ సిమ్యులేటర్`,whatIfSub:`వివిధ పరిస్థితుల ఫలితాలను సరిపోల్చండి`,scenarioSweet:`⭐ AI సమతుల్యత (Sweet Spot)`,scenarioCurrent:`ప్రస్తుత సెటప్`,scenarioCrop:`🌱 పంట ప్రాధాన్యత (గరిష్ట ఎండ)`,scenarioEnergy:`⚡ విద్యుత్ ప్రాధాన్యత (గరిష్ట సోలార్)`,scenarioStorm:`🛡️ తుఫాను రక్షణ మోడ్`,onboardingTitle:`🌱 రైతు మార్గదర్శక సెటప్`,crop_tomato:`టమోటా`,crop_wheat:`గోధుమ`,crop_maize:`మొక్కజొన్న`,crop_rice:`వరి (వరి ధాన్యం)`,crop_potato:`బంగాళాదుంప`,crop_vegetables:`ఆకుకూరలు / కూరగాయలు`,crop_other:`ఇతర పంట`,faqTitle:`రైతులకు సరళమైన గైడ్ & మార్గదర్శి`,faqIntro:`సన్-స్టార్వ్డ్ ట్రాకర్‌కు స్వాగతం! మీ వ్యవసాయం నుండి గరిష్ట ప్రయోజనం పొందడానికి సులభమైన తెలుగులో పూర్తి సమాచారం ఇక్కడ ఉంది.`,faqQ1:`🌱 1. అగ్రి-వోల్టాయిక్ (Agri-Voltaic) వ్యవసాయం అంటే ఏమిటి?`,faqA1:`పంటల పైభాగంలో (నేల నుండి 3 మీటర్ల ఎత్తులో) సోలార్ ప్యానెల్స్ అమర్చడాన్ని అగ్రి-వోల్టాయిక్స్ అంటారు. దీనివల్ల ఒకే భూమిలో పైనుండి శుభ్రమైన సౌర విద్యుత్ మరియు క్రింద ఆరోగ్యకరమైన పంటలు ఒకేసారి పండుతాయి.`,faqQ2:`☀️ 2. సోలార్ ప్యానెల్స్ రోజంతా సూర్యుడి వైపే ఎందుకు ఉండకూడదు?`,faqA2:`సాధారణ సోలార్ ట్రాకర్లు విద్యుత్‌ను మాత్రమే గమనిస్తాయి. ప్యానెల్స్ కేవలం సూర్యుడినే అనుసరిస్తే పంటలపై తీవ్రమైన నీడ పడి, వెలుతురు అందక దిగుబడి తగ్గుతుంది. మా సాంకేతికత పంటలకు అవసరమైన కాంతికి మొదటి ప్రాధాన్యత ఇస్తుంది!`,faqQ3:`⚖️ 3. "స్వీట్ స్పాట్" (సరైన సమతుల్యత) అంటే ఏమిటి?`,faqA3:`పంటలకు అవసరమైన 100% సూర్యకాంతి అందుతూనే, సోలార్ ప్యానెల్స్ ద్వారా గరిష్ట విద్యుత్ ఉత్పత్తి అయ్యే ఖచ్చితమైన కోణమే స్వీట్ స్పాట్.`,faqQ4:`📱 4. ఇది ఇంటర్నెట్ లేకపోయినా పొలంలో పనిచేస్తుందా?`,faqA4:`అవును! సన్-స్టార్వ్డ్ ట్రాకర్ ఒక PWA యాప్. నీడ నమూనాలు మరియు లెక్కలు అన్నీ మీ బ్రౌజర్‌లోనే ఆఫ్‌లైన్‌లో పనిచేస్తాయి.`,faqQ5:`🍅 5. పంటను మార్చడం లేదా కొత్త పొలం వివరాలు నమోదు చేయడం ఎలా?`,faqA5:`స్కాన్ & క్రాప్ ట్యాబ్ లేదా గైడెడ్ విజార్డ్ తెరవండి. మీ పంట (టమోటా, గోధుమ, మొక్కజొన్న, వరి, బంగాళాదుంప, కూరగాయలు) మరియు పెరుగుదల దశను ఎంచుకోండి.`,reportTitle:`అగ్రి-వోల్టాయిక్స్ పొలం నివేదిక`,reportSub:`వ్యవసాయ-సౌర నిర్ణయ మద్దతు వేదిక`,reportDate:`తేదీ`,reportFarmCrop:`పంట`,reportFarmArea:`విస్తీర్ణం`,reportLocation:`స్థానం`,reportWeatherStatus:`వాతావరణం`,reportSolarArray:`సోలార్ వ్యవస్థ`,reportDataQuality:`డేటా నాణ్యత`,reportSetupComparison:`అమరికల పోలిక`,reportMetric:`కొలమానం`,reportDelta:`తేడా (Delta)`,reportWhySelected:`ఈ సిఫార్సు ఎందుకు ఎంపిక చేయబడింది:`,reportDisclaimer:`నమూనా సలహా నిరాకరణ: ఈ నివేదిక గణిత అంచనాలను కలిగి ఉంది మరియు వృత్తిపరమైన వ్యవసాయ లేదా ఇంజనీరింగ్ సలహాకు ప్రత్యామ్నాయం కాదు.`,alertCropBelow:`పంటకు అందే ఎండ తక్కువగా ఉంది`,alertStrongSun:`మంచి సౌర వికిరణం లభిస్తోంది`,alertAiRecommends:`AI కోణం మార్పును సిఫార్సు చేస్తోంది`,alertCloudCover:`మేఘావృత వాతావరణ ప్రభావం`,morningDesc:`ఉదయం కిరణాలతో నేల వెచ్చబడటానికి 40° కోణం`,middayDesc:`ఎండ వేడిమి నుండి పంటను రక్షించడానికి సమతుల్య కోణం`,afternoonDesc:`గరిష్ట విద్యుత్ కోసం పశ్చిమానికి తిప్పండి`,eveningDesc:`గాలి రక్షణ కోసం రాత్రి 10° వద్ద సమతలంగా ఉంచండి`,colCandidate:`ఎంపిక`,colTiltAngle:`కోణం`,colHeight:`ఎత్తు`,colSpacing:`దూరం`,colCropLight:`పంటకు కాంతి`,colSolar:`సౌర విద్యుత్`,colBalance:`సమతుల్యత`,badgeOptimalConfig:`ఉత్తమ అమరిక`,badgeCurrentConfig:`ప్రస్తుత అమరిక`,aiSweetSpotFound:`AI స్వీట్ స్పాట్ లభించింది`,btnViewEngine:`వివరమైన ఇంజిన్ చూడండి ➔`,recommendedTilt:`సిఫార్సు చేసిన కోణం`,clearanceHeight:`ఎత్తు వ్యవధి`,balanceScore:`సమతుల్యత స్కోరు`,badgeLiveEvaluated:`ప్రత్యక్ష మూల్యాంకనం`,badgePrototypeSchedule:`షెడ్యూల్ ప్రణాళిక`,statusGood:`బాగుంది`,statusModerate:`మధ్యస్థం`,statusHigh:`ఎక్కువ`,statusOptimal:`అనుకూలం`,statusOptimized:`ఆప్టిమైజ్ చేయబడింది`,statusNeedsAdjust:`సర్దుబాటు అవసరం`,statusAvailable:`అందుబాటులో ఉంది`,activeFarm:`క్రియాశీల పొలం`,humidity:`తేమ`,windSpeed:`గాలి వేగం`,btnCaptureSnapshot:`📸 ఫోటో తీయండి`,badgeGpsDetected:`🟢 GPS కనుగొనబడింది`,badgeLocation:`🟣 స్థానం`,coordinates:`కోఆర్డినేట్స్`,farmLocation:`పొలం ఉన్న ప్రదేశం`,badgeDemoAi:`🟣 డెమో AI అంచనా`,aiDisclaimer:`కంప్యూటర్-విజన్ మోడల్. సర్వర్ అవసరం లేదు. మీ పంట వివరాలను మార్చుకోవచ్చు.`,btnEditCropProfile:`పంట వివరాలు సవరించండి ➔`,step:`దశ`,of:`/`,stepFarm:`పొలం`,stepCrop:`పంట`,stepLocation:`స్థానం`,stepWeather:`వాతావరణం`,stepSolar:`సోలార్`,stepSimulation:`సిమ్యులేషన్`,stepOptimization:`AI ఆప్టిమైజేషన్`,stepResults:`ఫలితాలు`,farmProfile:`పొలం వివరాలు`,farmName:`పొలం పేరు`,farmSize:`పొలం పరిమాణం`,unitAcre:`ఎకరం`,unitHectare:`హెక్టారు`,selectCropStage:`పంట మరియు ఎదుగుదల దశను ఎంచుకోండి`,stageSeedling:`మొలక దశ (Seedling)`,stageVegetative:`ఎదుగుదల (Vegetative)`,stageFlowering:`పూత దశ (Flowering)`,stageFruiting:`కాయ/గింజ దశ (Fruiting)`,stageMature:`కోత దశ (Harvest)`,irrigationMethod:`నీటిపారుదల పద్ధతి`,irrigDrip:`బిందు సేద్యం (Drip)`,irrigSprinkler:`తుంపర సేద్యం (Sprinkler)`,irrigFlood:`కాలువ సేద్యం (Flood)`,irrigRainfed:`వర్షాధారం`,farmLocationTitle:`పొలం ఉన్న స్థానం`,farmLocationDesc:`కోఆర్డినేట్స్ సూర్యుడి కోణాన్ని మరియు నీడ మార్గాన్ని లెక్కిస్తాయి.`,latitude:`అక్షాంశం (°N)`,longitude:`రేఖాంశం (°E)`,weatherBaseline:`వాతావరణ వివరాలు`,weatherBaselineDesc:`వాతావరణం వెలుతురు తీవ్రతను నిర్ణయిస్తుంది.`,temperature:`ఉష్ణోగ్రత (°C)`,cloudCoverPercent:`మేఘాల కవరేజ్ (%)`,existingSolar:`ప్రస్తుత సోలార్ అమరిక`,initialTilt:`ప్రారంభ కోణం (°)`,panelWattage:`ప్యానెల్ వాటేజ్ (W)`,twinVerification:`డిజిటల్ ట్విన్ ధృవీకరణ`,twinVerifDesc:`భౌతిక నమూనా నీడ లెక్కల్లోకి మ్యాప్ చేయబడుతోంది.`,aiReadyTitle:`AI ఆప్టిమైజేషన్ సిద్ధం`,aiReadyDesc:`కోణం, ఎత్తు మరియు దూరాల విశ్లేషణ సిద్ధంగా ఉంది.`,setupComplete:`సెటప్ పూర్తయింది`,setupCompleteDesc:`మీ పొలం ఆఫ్‌లైన్ డేటాబేస్‌లో సేవ్ చేయబడింది.`,btnSkip:`దాటవేయి / స్వయంగా నింపు`,btnNextStep:`తదుపరి దశ ➔`,btnCompleteSetup:`సెటప్ పూర్తిచేయి ➔`,loadingFarms:`పొలాల వివరాలు లోడ్ అవుతున్నాయి...`,confirmDeleteFarm:`మీరు ఖచ్చితంగా ఈ పొలం వివరాలను తొలగించాలనుకుంటున్నారా?`,scenarioCropFirst:`పంట-మొదట`,scenarioEnergyFirst:`విద్యుత్-మొదట`,scenarioStormStow:`తుఫాను రక్షణ`,manualLocTitle:`స్థానాన్ని మీరే నమోదు చేయండి`,villageTown:`గ్రామం / పట్టణం`,district:`జిల్లా`,btnSaveLoc:`స్థానాన్ని సేవ్ చేయండి`,manualWeatherTitle:`వాతావరణాన్ని మీరే నమోదు చేయండి`,btnSaveWeather:`వాతావరణాన్ని వర్తింపజేయండి`,resultsSummary:`ఆప్టిమైజేషన్ ఫలితాల సారాంశం`,resultsSub:`వ్యవసాయ మరియు సౌర లక్ష్యాల సమగ్ర ధృవీకరణ`,savedHistoryTitle:`సేవ్ చేసిన సిఫార్సుల చరిత్ర`,savedHistorySub:`IndexedDB లో భద్రపరచబడింది.`,canopySunlight:`పంటకు ఎండ`,shadow:`నీడ`,row:`వరుస`,btnVoiceAssistant:`కిసాన్ వాణి AI`,voiceAssistantTitle:`కిసాన్ వాణి AI — రైతు వాయిస్ అసిస్టెంట్`,voiceAssistantSubtitle:`పంటలు, సౌర విద్యుత్, బ్యాటరీ లేదా హెచ్చరికల గురించి అడగండి`,voiceStatusIdle:`మైక్ నొక్కండి లేదా క్రింద ప్రశ్న అడగండి`,voiceStatusListening:`వింటున్నాను... మాట్లాడండి`,voiceStatusThinking:`వ్యవసాయ సెన్సార్లను విశ్లేషిస్తోంది...`,voiceStatusSpeaking:`మాట్లాడుతోంది...`,voiceInputPlaceholder:`ప్రశ్న అడగండి లేదా ఎంపికపై నొక్కండి...`,voiceBtnSpeak:`మాట్లాడండి`,voiceBtnSend:`పంపండి`,voiceBtnMute:`వాయిస్ మ్యూట్`,voiceBtnUnmute:`వాయిస్ ఆన్ చేయండి`,voiceBtnStop:`ఆపండి`,voiceSpeed:`వాయిస్ వేగం`,voiceSpeedNormal:`సాధారణ (1.0x)`,voiceSpeedSlow:`నెమ్మదిగా (0.85x)`,voiceChipCrop:`🌿 పంట ఆరోగ్యం`,voiceChipSolar:`☀️ సౌర విద్యుత్ ఉత్పత్తి`,voiceChipBattery:`🔋 బ్యాటరీ మరియు బ్యాకప్`,voiceChipIrrigation:`💧 సాగునీటి సలహా`,voiceChipAngle:`📐 ప్యానెల్ కోణం వివరణ`,voiceChipAlerts:`🚨 హెచ్చరికలను చదవండి`,voiceChipReadScreen:`📢 స్క్రీన్‌ను చదవండి`,voiceAlertsToggle:`వాయిస్ హెచ్చరికలు`,voiceAlertsActive:`వాయిస్ అలర్ట్ యాక్టివ్‌గా ఉంది`,voiceAlertsMuted:`వాయిస్ అలర్ట్ మ్యూట్ చేయబడింది`,voiceBtnTestAlert:`🔊 వాయిస్ అలర్ట్ పరీక్షించండి`,voiceWelcomeMsg:`నమస్కారం! నేను కిసాన్ వాణి AI. మీ పంటల ఆరోగ్యం, సౌర విద్యుత్, బ్యాటరీ మరియు సాగునీరు గురించి సమాచారం అందించగలను. ఈరోజు మీకు ఎలా సహాయపడాలి?`,voiceAlertTestSpoken:`రైతు సోదరులకు గమనిక: పరీక్ష వాయిస్ హెచ్చరిక. బలమైన గాలుల వలన ప్యానెల్స్ 0 డిగ్రీల వద్ద ఫ్లాట్‌గా భద్రపరచబడ్డాయి.`,voiceAlertWindSpoken:`అత్యవసర హెచ్చరిక: బలమైన ఈదురుగాలులు నమోదయ్యాయి. పరికరాల రక్షణ కోసం ప్యానెల్స్ 0 డిగ్రీల వద్ద మడవబడ్డాయి.`,voiceAlertRainSpoken:`వర్షం హెచ్చరిక: వర్షపాతం నమోదైంది. వర్షపు నీటి నిల్వ కోసం ప్యానెల్స్ 30 డిగ్రీల కోణంలో వంచబడ్డాయి.`,voiceAlertBatteryLowSpoken:`బ్యాటరీ హెచ్చరిక: బ్యాటరీ ఛార్జ్ 20 శాతం కంటే తక్కువగా ఉంది. అత్యవసర బ్యాకప్ మోడ్ ఆన్ చేయబడింది.`,voiceAlertIrrigationSpoken:`సాగునీటి సూచన: నేలలో తేమ తక్కువగా ఉంది. బిందు సేద్యం ప్రారంభించమని సలహా.`,voiceReadScreenNotice:`ప్రస్తుత స్క్రీన్ సారాంశాన్ని చదువుతున్నాను.`},mr:{appTitle:`सन-स्टार्व्हड ट्रॅकर`,tagline:`अॅग्री-व्होल्टेईक्स ऑप्टिमायझर`,subTagline:`“पिकाचा सूर्यप्रकाश न हिरावता, शेताला सौरऊर्जा द्या.”`,heroTitle:`पिकासाठी सूर्यप्रकाश आणि सोलर पॅनेलमधून वीज यामधील सुवर्णमध्य शोधा.`,heroSubtitle:`निरोगी पिके आणि अधिक सौरऊर्जेसाठी AI-सहाय्यित पॅनेल पोझिशनिंग.`,btnGuide:`सोपी मार्गदर्शिका`,btnPresentation:`सादरीकरण दौरा`,syncOnline:`ऑनलाइन — थेट डेटा सक्रिय`,syncOffline:`ऑफलाइन — जतन केलेला स्थानिक डेटा वापरत आहे`,syncRestored:`✓ इंटरनेट परत आले — डेटा समक्रमित झाला...`,navHome:`मुख्यपृष्ठ`,navDashboard:`IoT डॅशबोर्ड`,navCamera:`पीक कॅमेरा (3x)`,navEnergy:`ऊर्जा आणि बॅटरी`,navPositioning:`सौर पॅनेल स्थिती`,navAlerts:`इशारे आणि घटना`,navScheduler:`सेन्सर वेळापत्रक`,navSimulator:`प्रणाली सिम्युलेटर`,navReports:`शेत अहवाल`,navSupport:`ग्राहक सेवा आणि अभिप्राय`,navCare:`मदत`,navScan:`स्कॅन आणि पीक`,navWeather:`हवामान`,navOptimize:`ऑप्टिमाइझ`,navResults:`निकाल`,navSecurity:`सुरक्षा आणि आयडी`,navFarms:`माझी शेते`,navWhatIf:`व्हॉट-इफ`,navOnboarding:`मार्गदर्शक विझार्ड`,btnCustomerCare:`ग्राहक सेवा`,langSwitchedNotice:`भाषा यशस्वीरित्या बदलली गेली`,btnOptimize:`🌱 माझे शेत ऑप्टिमाइझ करा`,btnDemo:`🎮 डेमो शेत एक्सप्लोर करा`,btnScan:`📷 शेत स्कॅन करा`,btnStart:`🌱 शेत सुरू करा`,btnApplyAngle:`शिफारस केलेला कोन लागू करा`,btnSaveFarm:`💾 शेत डेटा सुरक्षित जतन करा`,btnGenerateReport:`📄 कृषी अहवाल मिळवा`,btnResetDemo:`डेमो रीसेट करा`,btnExplainFarmer:`शेतकऱ्याला समजेल अशी भाषा`,btnTechnicalView:`तांत्रिक तपशील`,btnUseMyLocation:`📍 माझे स्थान वापरा`,btnEnterManually:`📝 स्थान स्वतः प्रविष्ट करा`,btnBack:`मागे`,btnNext:`पुढे`,btnCancel:`रद्द करा`,btnDelete:`हटवा`,btnConfirm:`निश्चित करा`,btnUploadPhoto:`🖼️ फोटो अपलोड करा`,btnTakePhoto:`📷 फोटो काढा`,btnRetake:`पुन्हा काढा`,btnAutoSweetSpot:`✨ एका क्लिकमध्ये सुवर्णमध्य (35°) सेट करा`,btnReadGuide:`मार्गदर्शिका वाचा ❓`,btnRefreshWeather:`🔄 थेट हवामान रीफ्रेश करा`,btnManualWeather:`📝 हवामान नोंदवा`,btnAddFarm:`+ नवीन शेत जोडा`,btnOpenFarm:`शेत उघडा`,btnEdit:`संपादित करा`,btnPrintPdf:`🖨️ प्रिंट / PDF जतन करा`,btnDownloadJson:`📥 JSON डाउनलोड करा`,btnGotIt:`समजले, शेती सुरू करूया! 🌱`,badgeLive:`🟢 थेट डेटा (LIVE)`,badgeCached:`🟠 जतन केलेला डेटा (CACHED)`,badgeDemo:`🟣 डेमो डेटा (DEMO)`,badgeSim:`🔵 सिम्युलेशन / अंदाज`,badgeSweetSpot:`उत्कृष्ट सुवर्णमध्य संतुलित`,badgeNeedsOpt:`सुधारणेची गरज आहे`,howItWorksTitle:`हे 3 सोप्या टप्प्यांत कसे कार्य करते`,step1Title:`1. आपले पीक निवडा`,step1Desc:`आपण काय पिकवत आहात ते सांगा. चांगल्या वाढीसाठी प्रत्येक पिकाला विशिष्ट सूर्यप्रकाश हवा असतो.`,step2Title:`2. ऊन आणि सावली पाहा`,step2Desc:`सूर्याचा स्लाइडर फिरवून किंवा प्ले (▶) दाबून दिवसभरात सावली कशी बदलते ते पाहा.`,step3Title:`3. सुवर्णमध्य सेट करा`,step3Desc:`"ऑटो-अ‍ॅडजस्ट" दाबा जेणेकरून पिकाला पूर्ण प्रकाश मिळेल आणि वीजही भरपूर तयार होईल.`,farmPulse:`🌱 शेत पल्स (FARM PULSE)`,cropSunlight:`पिकाला मिळणारा प्रकाश`,solarEnergy:`सौर ऊर्जा निर्मिती`,farmBalance:`एकूण सुवर्णमध्य`,shadowImpact:`सावलीचे प्रमाण`,weatherStatus:`हवामान स्थिती`,panelPosition:`पॅनेल स्थिती`,locationStatus:`स्थान स्थिती`,networkStatus:`नेटवर्क स्थिती`,cropComfortLevel:`पिकाचे प्रकाश समाधान`,cropHappy:`आनंदी आहे: आवश्यकतेनुसार पूर्ण प्रकाश मिळत आहे!`,cropSad:`प्रकाश कमी आहे: प्रकाश येण्यासाठी पॅनेलचा कोन बदला!`,digitalTwinTitle:`🌐 शेत डिजिटल ट्विन`,digitalTwinSub:`सूर्य • सोलर पॅनेल • सावली • पीक परस्परसंबंध`,timeOfDay:`दिवसाची वेळ (सूर्याचे स्थान)`,panelAngle:`पॅनेलचा कोन`,panelHeight:`जमिनीपासून पॅनेलची उंची`,panelSpacing:`पॅनेल अंतर`,rowSpacing:`ओळींमधील अंतर`,cloudCover:`ढगाळ वातावरण`,solarIrradiance:`सौर किरणोत्सर्ग`,hintFlat:`☀️ सपाट कोन — खाली मातीला थंड सावली देतो`,hintBalanced:`⚖️ संतुलित कोन — पिकाला प्रकाश आणि जास्त वीजनिर्मिती दोन्ही देतो`,hintSteep:`🌅 उभा कोन — जमिनीवर जास्तीत जास्त नैसर्गिक प्रकाश येऊ देतो`,hintLowClearance:`🚶 कमी उंची — हाताने काढणी करण्यायोग्य पिकांसाठी`,hintStdClearance:`🚜 प्रमाण उंची — ट्रॅक्टर आणि अवजारे सहज जाऊ शकतात`,hintHighClearance:`🌾 जास्त उंची — हार्वेस्टर आणि उंच पिके सहज जातात`,hintNarrowGap:`कमी अंतर — खाली सतत दाट सावली राहील`,hintWideGap:`जास्त अंतर — दिवसभरात प्रकाशाचे पट्टे पिकांवर फिरतील`,alertsTitle:`🔔 शेत कार्य सूचना`,planTitle:`📅 आजची कृषी-सौर योजना`,morning:`06:00 - 10:00 (सकाळ): दव सुकवण्यासाठी ऊन येऊ द्या`,midday:`10:00 - 14:00 (दुपार): कडक उन्हापासून संरक्षण आणि भरपूर वीज`,afternoon:`14:00 - 17:00 (दुपारनंतर): पश्चिमेकडील उन्हातून वीजनिर्मिती`,evening:`17:00 - 19:00 (संध्याकाळ): रात्रीच्या वाऱ्यापासून संरक्षणासाठी पॅनेल सपाट ठेवा`,scanTitle:`📷 शेत स्कॅन करा / फोटो घ्या`,scanSubtitle:`पिकाची स्थिती आणि GPS नोंदवण्यासाठी फोटो काढा`,noPhotoYet:`अद्याप फोटो काढलेला नाही`,noPhotoSub:`कॅमेऱ्याने फोटो काढा किंवा अपलोड करा`,exifTitle:`📍 फोटोमधून प्राप्त GPS स्थान`,aiAnalysisTitle:`🟣 AI पीक विश्लेषण`,aiAnalysisSub:`AI अंदाज — गरज भासल्यास स्वतः तपासा`,detectedCrop:`ओळखलेले पीक`,estimatedCondition:`अंदाजे स्थिती`,growthStage:`वाढीची अवस्था`,lightRequirement:`प्रकाशाची गरज`,weatherTitle:`🌦️ शेत हवामान माहिती`,weatherHourlyTitle:`⏱️ 24 तासांचा अंदाज आणि सौर विकिरण`,weatherDailyTitle:`📆 7 दिवसांचा हवामान अंदाज`,optimizeHeroTitle:`पिकाचा सूर्यप्रकाश आणि सौरऊर्जा यामधील सुवर्णमध्य शोधा`,currentSetup:`सध्याची रचना`,recommendedSetup:`AI शिफारस केलेली रचना`,whyRecommendation:`💡 ही शिफारस का निवडली गेली?`,evaluatedCandidates:`📊 तपासलेले पर्याय`,powerGeneration:`वीज निर्मिती`,actuatorTitle:`⚙️ व्हर्च्युअल अ‍ॅक्ट्युएटर मोटर सिम्युलेशन`,currentAngle:`सध्याचा कोन`,targetSweetSpot:`लक्ष्य सुवर्णमध्य कोन`,actuatorReady:`मोटार कोन बदलण्यासाठी तयार आहे`,actuatorAligning:`अ‍ॅक्ट्युएटर पॅनेल फिरवत आहे (1.5°/सेकंद)...`,actuatorReached:`✓ लक्ष्य कोनावर यशस्वीपणे पोहोचले`,actuatorDisclaimer:`⚠️ प्रात्यक्षिकासाठी सिम्युलेशन.`,heatmapTitle:`🌱 पिकांच्या ओळींमधील उन्हाचा हीटमॅप`,heatmapSub:`जमिनीवरील सावलीचे प्रत्यक्ष वितरण`,row1:`ओळ 1: खांबाच्या खाली`,row2:`ओळ 2: पॅनेलच्या मध्यभागाखाली`,row3:`ओळ 3: पॅनेलमधील मोकळा मार्ग`,row4:`ओळ 4: ट्रॅक्टर मार्ग`,highLight:`भरपूर ऊन (>75%)`,modLight:`मध्यम ऊन (50-75%)`,lowLight:`कमी ऊन (30-50%)`,excessShade:`जास्त सावली (<30%)`,tradeoffTitle:`📈 सुवर्णमध्य आलेख (Pareto Frontier)`,tradeoffSub:`पीक प्रकाश वि. सौरऊर्जा समतोल`,cropAxis:`🌱 पिकाचा प्रकाश (%) →`,solarAxis:`⚡ सौरऊर्जा निर्मिती (%) →`,legendSweetSpot:`शिफारस केलेला सुवर्णमध्य (Sweet Spot)`,legendCurrent:`सध्याची रचना`,legendCandidates:`तपासलेले पर्याय`,myFarmsTitle:`🌾 माझी जतन केलेली शेते`,myFarmsSub:`या डिव्हाइसवर आपली शेते व्यवस्थापित करा`,noFarmsYet:`शेत उपलब्ध नाही. नवीन जोडा किंवा डेमो पाहा.`,whatIfTitle:`🔮 व्हॉट-इफ सिम्युलेटर`,whatIfSub:`वेगवेगळ्या परिस्थितींचे निकाल एकाच वेळी पाहा`,scenarioSweet:`⭐ AI सुवर्णमध्य (Sweet Spot)`,scenarioCurrent:`सध्याची रचना`,scenarioCrop:`🌱 पिकाला प्राधान्य (जास्त ऊन)`,scenarioEnergy:`⚡ ऊर्जेला प्राधान्य (जास्त वीज)`,scenarioStorm:`🛡️ वादळ सुरक्षा मोड`,onboardingTitle:`🌱 शेतकरी मार्गदर्शक सेटअप`,crop_tomato:`टोमॅटो`,crop_wheat:`गहू`,crop_maize:`मका`,crop_rice:`भात (तांदूळ)`,crop_potato:`बटाटा`,crop_vegetables:`हिरव्या भाज्या`,crop_other:`इतर पीक`,faqTitle:`शेतकऱ्यांसाठी सोपी मार्गदर्शिका`,faqIntro:`सन-स्टार्व्हड ट्रॅकरमध्ये आपले स्वागत आहे! आपल्या शेतीचा जास्तीत जास्त फायदा घेण्यासाठी सोप्या मराठीत संपूर्ण माहिती येथे आहे.`,faqQ1:`🌱 1. ॲग्री-व्होल्टेइक (Agri-Voltaic) शेती म्हणजे काय?`,faqA1:`पिकांच्या वर (जमिनीपासून 3 मीटर उंचीवर) सोलर पॅनेल बसवण्याला ॲग्री-व्होल्टेइक्स म्हणतात. यामुळे एकाच जमिनीवर वरून सौर ऊर्जा आणि खाली दर्जेदार पिके एकाच वेळी मिळतात.`,faqQ2:`☀️ 2. सोलर पॅनेल दिवसभर फक्त सूर्याकडेच का तोंड करून राहू नयेत?`,faqA2:`पारंपारिक सोलर ट्रॅकर केवळ वीज निर्मितीवर लक्ष केंद्रित करतात. जर पॅनेल केवळ सूर्याचा पाठलाग करत राहिले तर खालील पिकांवर सतत दाट सावली पडते आणि उत्पादन घटते. सन-स्टार्व्हड ट्रॅकर पिकांना लागणाऱ्या सूर्यप्रकाशाला प्रथम प्राधान्य देतो!`,faqQ3:`⚖️ 3. "स्वीट स्पॉट" (योग्य समतोल) म्हणजे काय?`,faqA3:`स्वीट स्पॉट म्हणजे पॅनेलचा असा योग्य कोन जिथे पिकांना आवश्यक असलेला 100% सूर्यप्रकाश मिळतो आणि सोलर पॅनेल देखील भरपूर वीज तयार करतात.`,faqQ4:`📱 4. हे इंटरनेटशिवाय शेतात काम करते का?`,faqA4:`होय! सन-स्टार्व्हड ट्रॅकर हे PWA ॲप आहे. सर्व सावलीची मॉडेल्स आणि आकडेमोड आपल्या ब्राउझरमध्ये पूर्णपणे ऑफलाइन चालतात.`,faqQ5:`🍅 5. पीक कसे बदलावे किंवा नवीन शेत कसे जोडावे?`,faqA5:`स्कॅन आणि पीक टॅबवर जा किंवा मार्गदर्शित विझार्ड उघडा. आपले पीक (टोमॅटो, गहू, मका, भात, बटाटा, भाजीपाला) आणि वाढीची अवस्था निवडा.`,reportTitle:`ॲग्री-व्होल्टेइक्स शेत अहवाल`,reportSub:`कृषी-सौर निर्णय सहाय्य व्यासपीठ`,reportDate:`तारीख`,reportFarmCrop:`पीक`,reportFarmArea:`क्षेत्रफळ`,reportLocation:`स्थान`,reportWeatherStatus:`हवामान स्थिती`,reportSolarArray:`सोलर रचना`,reportDataQuality:`डेटा गुणवत्ता`,reportSetupComparison:`रचनेची तुलना`,reportMetric:`निकष`,reportDelta:`तफावत (Delta)`,reportWhySelected:`ही शिफारस का निवडली गेली:`,reportDisclaimer:`प्रोटोटाइप सल्लागार अस्वीकरण: या अहवालात गणितीय अंदाज आहेत आणि हे व्यावसायिक कृषी किंवा अभियांत्रिकी सल्ल्याचा पर्याय नाही.`,alertCropBelow:`पिकाला मिळणारा सूर्यप्रकाश कमी आहे`,alertStrongSun:`उत्तम सौर विकिरण उपलब्ध आहे`,alertAiRecommends:`AI कोनात बदल करण्याची शिफारस करतो`,alertCloudCover:`ढगाळ वातावरणाचा प्रभाव`,morningDesc:`सकाळच्या किरणांनी माती उबदार होण्यासाठी 40° कोन`,middayDesc:`पिकाचे अतिउष्णतेपासून रक्षण करण्यासाठी समतोल कोन`,afternoonDesc:`जास्तीत जास्त विजेसाठी पश्चिमेकडे फिरवा`,eveningDesc:`वाऱ्याच्या सुरक्षेसाठी रात्री 10° सपाट ठेवा`,colCandidate:`पर्याय`,colTiltAngle:`कोन`,colHeight:`उंची`,colSpacing:`अंतर`,colCropLight:`पीक प्रकाश`,colSolar:`सौर क्षमता`,colBalance:`समतोल`,badgeOptimalConfig:`सर्वोत्तम रचना`,badgeCurrentConfig:`सध्याची रचना`,aiSweetSpotFound:`AI स्वीट स्पॉट सापडला`,btnViewEngine:`सविस्तर इंजिन पहा ➔`,recommendedTilt:`शिफारस केलेला कोन`,clearanceHeight:`उंची मोकळीक`,balanceScore:`समतोल स्कोअर`,badgeLiveEvaluated:`थेट विश्लेषित`,badgePrototypeSchedule:`नियोजित वेळापत्रक`,statusGood:`उत्तम`,statusModerate:`मध्यम`,statusHigh:`जास्त`,statusOptimal:`अनुकूल`,statusOptimized:`ऑप्टಿमाइझ केले`,statusNeedsAdjust:`बदल आवश्यक`,statusAvailable:`उपलब्ध`,activeFarm:`सक्रिय शेत`,humidity:`आर्द्रता`,windSpeed:`वाऱ्याचा वेग`,btnCaptureSnapshot:`📸 फोटो कॅप्चर करा`,badgeGpsDetected:`🟢 GPS सापडले`,badgeLocation:`🟣 स्थान`,coordinates:`अक्षांश-रेखांश`,farmLocation:`शेताचे स्थान`,badgeDemoAi:`🟣 डेमो AI अंदाज`,aiDisclaimer:`संगणक दृष्टी मॉडेल. कोणत्याही सर्व्हरची गरज नाही. आपण शेत प्रोफाइलमध्ये पीक बदलू शकता.`,btnEditCropProfile:`पीक प्रोफाइल संपादित करा ➔`,step:`टप्पा`,of:`/`,stepFarm:`शेत`,stepCrop:`पीक`,stepLocation:`स्थान`,stepWeather:`हवामान`,stepSolar:`सोलर`,stepSimulation:`सिम्युलेशन`,stepOptimization:`AI ऑप्टिमायझेशन`,stepResults:`निकाल`,farmProfile:`शेत प्रोफाइल`,farmName:`शेताचे नाव`,farmSize:`शेताचा आकार`,unitAcre:`एकर`,unitHectare:`हेक्टर`,selectCropStage:`पीक आणि वाढीचा टप्पा निवडा`,stageSeedling:`रोपावस्था (Seedling)`,stageVegetative:`शाकीय वाढ (Vegetative)`,stageFlowering:`फुलोरा (Flowering)`,stageFruiting:`फळधारणा (Fruiting)`,stageMature:`कापणी (Harvest)`,irrigationMethod:`सिंचन पद्धत`,irrigDrip:`ठिबक सिंचन`,irrigSprinkler:`तुषार सिंचन`,irrigFlood:`प्रवाही सिंचन`,irrigRainfed:`पावसावर आधारित`,farmLocationTitle:`शेताचे स्थान`,farmLocationDesc:`अक्षांश-रेखांश सूर्याचा कोन आणि सावली अचूक ठरवतात.`,latitude:`अक्षांश (°N)`,longitude:`रेखांश (°E)`,weatherBaseline:`हवामान तपशील`,weatherBaselineDesc:`हवामान सूर्यप्रकाशाची तीव्रता ठरवते.`,temperature:`तापमान (°C)`,cloudCoverPercent:`ढगाळ वातावरण (%)`,existingSolar:`सध्याची सोलर रचना`,initialTilt:`सुरुवातीचा कोन (°)`,panelWattage:`पॅनेल वॅट क्षमता (W)`,twinVerification:`डिजिटल ट्विन पडताळणी`,twinVerifDesc:`सावलीच्या भौतिकशास्त्र मॉडेलमध्ये माहिती जोडली जात आहे.`,aiReadyTitle:`AI ऑप्टिमायझेशन सज्ज`,aiReadyDesc:`कोन, उंची आणि अंतराचे विश्लेषण सुरू आहे.`,setupComplete:`मांडणी पूर्ण झाली`,setupCompleteDesc:`आपले शेत ऑफलाइन डेटाबेसमध्ये सेव्ह झाले आहे.`,btnSkip:`वगळा / आपोआप भरा`,btnNextStep:`पुढील टप्पा ➔`,btnCompleteSetup:`मांडणी पूर्ण करा ➔`,loadingFarms:`शेतांची माहिती लोड होत आहे...`,confirmDeleteFarm:`तुम्हाला नक्की हे शेत हटवायचे आहे का?`,scenarioCropFirst:`पीक-प्रथम`,scenarioEnergyFirst:`ऊर्जा-प्रथम`,scenarioStormStow:`वादळ संरक्षण`,manualLocTitle:`स्थान स्वतः नोंदवा`,villageTown:`गाव / शहर`,district:`जिल्हा`,btnSaveLoc:`स्थान सेव्ह करा`,manualWeatherTitle:`हवामान स्वतः नोंदवा`,btnSaveWeather:`हवामान लागू करा`,resultsSummary:`ऑप्टिमायझेशन निकाल सारांश`,resultsSub:`कृषी आणि सौर उद्दिष्टांची संपूर्ण पडताळणी`,savedHistoryTitle:`जतन केलेल्या शिफारशींचा इतिहास`,savedHistorySub:`IndexedDB मध्ये सुरक्षित जतन केले आहे.`,canopySunlight:`पिकाला ऊन`,shadow:`सावली`,row:`ओळ`,btnVoiceAssistant:`किसान वाणी AI`,voiceAssistantTitle:`किसान वाणी AI — शेतकरी व्हॉईस असिस्टंट`,voiceAssistantSubtitle:`पिके, सौर ऊर्जा, बॅटरी किंवा सूचनांविषयी विचारा`,voiceStatusIdle:`माईकवर टॅप करा किंवा खाली प्रश्न विचारा`,voiceStatusListening:`ऐकत आहे... कृपया बोला`,voiceStatusThinking:`शेतातील सेन्सर्सचे विश्लेषण करत आहे...`,voiceStatusSpeaking:`बोलत आहे...`,voiceInputPlaceholder:`प्रश्न विचारा किंवा पर्यायावर टॅप करा...`,voiceBtnSpeak:`बोला`,voiceBtnSend:`पाठवा`,voiceBtnMute:`आवाज बंद करा`,voiceBtnUnmute:`आवाज चालू करा`,voiceBtnStop:`थांबवा`,voiceSpeed:`आवाजाचा वेग`,voiceSpeedNormal:`सामान्य (1.0x)`,voiceSpeedSlow:`हळू (0.85x)`,voiceChipCrop:`🌿 पिकांचे आरोग्य`,voiceChipSolar:`☀️ सौर ऊर्जा निर्मिती`,voiceChipBattery:`🔋 बॅटरी आणि बॅकअप`,voiceChipIrrigation:`💧 सिंचनाचा सल्ला`,voiceChipAngle:`📐 पॅनेलच्या कोनाचे कारण`,voiceChipAlerts:`🚨 सक्रिय सूचना ऐका`,voiceChipReadScreen:`📢 स्क्रीन वाचून दाखवा`,voiceAlertsToggle:`व्हॉईस सूचना`,voiceAlertsActive:`व्हॉईस अलर्ट सक्रिय`,voiceAlertsMuted:`व्हॉईस अलर्ट म्यूट`,voiceBtnTestAlert:`🔊 व्हॉईस अलर्ट तपासा`,voiceWelcomeMsg:`नमस्कार! मी किसान वाणी AI आहे. मी पिकांचे आरोग्य, सौर निर्मिती, बॅटरी आणि सिंचनाबाबत अचूक माहिती देऊ शकतो. आज मी तुम्हाला कशी मदत करू?`,voiceAlertTestSpoken:`शेतकरी बंधूंनो लक्ष द्या: चाचणी व्हॉईस अलर्ट. वादळी वाऱ्यामुळे सौर पॅनेल सुरक्षिततेसाठी 0 अंशांवर झुकवले आहेत.`,voiceAlertWindSpoken:`तातडीची सूचना: जोरदार वारे वाहत आहेत. उपकरणांच्या संरक्षणासाठी पॅनेल 0 अंशांवर झुकवले आहेत.`,voiceAlertRainSpoken:`पाऊस सूचना: पाऊस नोंदवला गेला. पावसाचे पाणी साठवण्यासाठी पॅनेल 30 अंशांवर झुकवले आहेत.`,voiceAlertBatteryLowSpoken:`बॅटरी सूचना: बॅटरी चार्ज 20 टक्क्यांपेक्षा कमी झाला आहे. आपत्कालीन लोड शेडिंग सुरू केली आहे.`,voiceAlertIrrigationSpoken:`सिंचन सूचना: मातीतील ओलावा कमी आहे. ठिबक सिंचन सुरू करण्याचा सल्ला दिला जातो.`,voiceReadScreenNotice:`सध्याच्या स्क्रीनचा सारांश वाचून दाखवत आहे.`}},r=`en`;function i(){return r}function a(e){if(n[e]){r=e;try{typeof localStorage<`u`&&localStorage.setItem(`sunstarved_lang`,e)}catch{}return!0}return!1}function o(e,t=``){return(n[r]||n.en)[e]||n.en[e]||t||e}function s(){try{if(typeof localStorage<`u`){let e=localStorage.getItem(`sunstarved_lang`);e&&n[e]&&(r=e)}}catch{}return r}var c=`SunStarvedTrackerDB`,l=1,u=[`farms`,`photos`,`locations`,`weather`,`solarConfigurations`,`optimizationResults`,`reports`,`settings`],d=null;function f(){return d||(d=new Promise((e,t)=>{let n=indexedDB.open(c,l);n.onupgradeneeded=e=>{let t=e.target.result;u.forEach(e=>{t.objectStoreNames.contains(e)||t.createObjectStore(e,{keyPath:`id`})})},n.onsuccess=t=>{e(t.target.result)},n.onerror=e=>{console.error(`IndexedDB error:`,e.target.error),t(e.target.error)}}),d)}async function p(e,t){let n=await f();return new Promise((r,i)=>{let a=n.transaction(e,`readonly`).objectStore(e).get(t);a.onsuccess=()=>r(a.result||null),a.onerror=()=>i(a.error)})}async function m(e){let t=await f();return new Promise((n,r)=>{let i=t.transaction(e,`readonly`).objectStore(e).getAll();i.onsuccess=()=>n(i.result||[]),i.onerror=()=>r(i.error)})}async function h(e,t){let n=await f();return new Promise((r,i)=>{let a=n.transaction(e,`readwrite`).objectStore(e).put(t);a.onsuccess=()=>r(t),a.onerror=()=>i(a.error)})}async function g(e,t){let n=await f();return new Promise((r,i)=>{let a=n.transaction(e,`readwrite`).objectStore(e).delete(t);a.onsuccess=()=>r(!0),a.onerror=()=>i(a.error)})}async function _(){return m(`farms`)}async function v(e){return p(`farms`,e)}async function y(e){return e.id||=`farm-`+Date.now()+`-`+Math.random().toString(36).substr(2,6),e.updatedAt=new Date().toISOString(),h(`farms`,e)}async function b(e){return await g(`farms`,e),await g(`photos`,e),!0}async function x(e,t,n={}){return h(`photos`,{id:e,dataUrl:t,metadata:n,savedAt:new Date().toISOString()})}async function S(e,t){return h(`weather`,{id:e,weather:t,cachedAt:new Date().toISOString()})}async function C(e){return p(`weather`,e)}async function w(e,t){return h(`optimizationResults`,{id:`opt-`+e+`-`+Date.now(),farmId:e,result:t,savedAt:new Date().toISOString()})}async function T(e,t){return h(`settings`,{id:e,value:t})}async function ee(t,n,r=`Farm Location`){let i=`weather_${Number(t).toFixed(2)}_${Number(n).toFixed(2)}`;if(!navigator.onLine){let t=await C(i);return t?{...t.weather,source:`CACHED`,cachedAt:t.cachedAt,message:`Using saved weather information from local cache (offline)`}:{...e.weather,source:`DEMO`,message:`Network offline and no cache found for this coordinate. Showing demo baseline.`}}try{let r=new AbortController,a=setTimeout(()=>r.abort(),7e3),o=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${n}&current=temperature_2m,relative_humidity_2m,cloud_cover,precipitation,surface_pressure,wind_speed_10m,direct_normal_irradiance,surface_solar_radiation,shortwave_radiation&hourly=temperature_2m,cloud_cover,direct_normal_irradiance,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=auto`,s=await fetch(o,{signal:r.signal});if(clearTimeout(a),!s.ok)throw Error(`Weather API responded with status ${s.status}`);let c=await s.json(),l=c.current||{},u=c.daily||{},d=c.hourly||{},f=l.cloud_cover===void 0?30:l.cloud_cover,p=Math.round(l.surface_solar_radiation||l.shortwave_radiation||re(t,f)),m=Math.round(l.direct_normal_irradiance||p*1.15),h=[];if(d.time&&d.time.length)for(let e=0;e<Math.min(d.time.length,24);e+=2){let t=d.time[e].split(`T`)[1]?.slice(0,5)||`${e}:00`;h.push({hour:t,temp:Math.round(d.temperature_2m?.[e]||22),cloud:Math.round(d.cloud_cover?.[e]||20),rad:Math.round(d.direct_normal_irradiance?.[e]||0),rain:Math.round(d.precipitation_probability?.[e]||0)})}let g=[];if(u.time&&u.time.length){let e=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];for(let t=0;t<Math.min(u.time.length,7);t++){let n=new Date(u.time[t]),r=t===0?`Today`:t===1?`Tomorrow`:e[n.getDay()],i=u.precipitation_probability_max?.[t]||0,a=`☀️`;i>50?a=`🌧️`:i>25?a=`🌦️`:(u.uv_index_max?.[t]||5)<4&&(a=`⛅`),g.push({day:r,tempMax:Math.round(u.temperature_2m_max?.[t]||26),tempMin:Math.round(u.temperature_2m_min?.[t]||18),rain:i,uv:u.uv_index_max?.[t]||6,condition:a})}}let _={source:`LIVE`,timestamp:new Date().toISOString(),temp:Math.round(l.temperature_2m||24),humidity:Math.round(l.relative_humidity_2m||55),cloudCover:Math.round(f),rainProb:Math.round(l.precipitation>0?80:u.precipitation_probability_max?.[0]||15),windSpeed:Math.round(l.wind_speed_10m||10),solarRadiation:p,directNormalRadiation:m,diffuseRadiation:Math.max(50,Math.round(f/100*p*.7)),uvIndex:u.uv_index_max?.[0]||6.5,conditionText:te(f,l.precipitation),conditionIcon:ne(f,l.precipitation),sunrise:u.sunrise?.[0]?.split(`T`)[1]?.slice(0,5)||`06:10`,sunset:u.sunset?.[0]?.split(`T`)[1]?.slice(0,5)||`18:20`,hourlyForecast:h.length?h:e.weather.hourlyForecast,dailyForecast:g.length?g:e.weather.dailyForecast};return await S(i,_),_}catch(t){console.warn(`Weather API failed or timed out:`,t);let n=await C(i);return n?{...n.weather,source:`CACHED`,cachedAt:n.cachedAt,message:`Live weather temporarily unavailable. Displaying cached information.`}:{...e.weather,source:`DEMO`,message:`Weather network request failed. Displaying demo values.`}}}function te(e,t){return t>.5?`Rain Showers`:e<20?`Clear Sunny Sky`:e<50?`Partly Sunny / Ideal Solar`:e<80?`Mostly Cloudy`:`Overcast Sky`}function ne(e,t){return t>.5?`🌧️`:e<20?`☀️`:e<50?`🌤️`:e<80?`⛅`:`☁️`}function re(e,t,n=12){let r=.409*Math.sin(2*Math.PI/365*172),i=e*Math.PI/180,a=(n-12)*15*Math.PI/180,o=Math.sin(i)*Math.sin(r)+Math.cos(i)*Math.cos(r)*Math.cos(a);if(o<=0)return 0;let s=1361*.7**(1/Math.max(.1,o))**.678*o,c=1-.75*(t/100)**3;return Math.round(s*c)}async function ie(){return new Promise((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(async t=>{let{latitude:n,longitude:r,accuracy:i,altitude:a}=t.coords,o={lat:Number(n.toFixed(6)),lon:Number(r.toFixed(6)),accuracy:Math.round(i||10),elevation:a?Math.round(a):840,source:`LIVE`,updatedAt:new Date().toISOString()};try{let e=await ae(n,r);Object.assign(o,e)}catch{o.label=`Coordinates (${o.lat}, ${o.lon})`}await T(`last_location`,o),e(o)},e=>{let n=`Location permission denied or unavailable.`;e.code===1?n=`Location permission was denied by user.`:e.code===2?n=`Position unavailable.`:e.code===3&&(n=`Location request timed out.`),t(Error(n))},{enableHighAccuracy:!0,timeout:8e3,maximumAge:6e4}):t(Error(`Geolocation is not supported by your browser.`))})}async function ae(e,t){if(!navigator.onLine)return{label:`Farm at ${e.toFixed(4)}°N, ${t.toFixed(4)}°E`,village:`Local Area`,district:`Saved District`,state:`Agricultural Zone`,country:`India`};let n=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=12&addressdetails=1`,r=new AbortController,i=setTimeout(()=>r.abort(),4e3),a=await fetch(n,{headers:{Accept:`application/json`},signal:r.signal});if(clearTimeout(i),!a.ok)throw Error(`Geocoding service unavailable`);let o=(await a.json()).address||{},s=o.village||o.suburb||o.town||o.hamlet||`Farm Area`,c=o.county||o.state_district||o.city||`District`,l=o.state||`State`,u=o.country||`India`;return{label:`${s}, ${c}`,village:s,district:c,state:l,country:u}}async function oe(e){try{let t=await e.arrayBuffer(),n=new DataView(t);if(n.getUint16(0)!==65496)return{hasGPS:!1,reason:`Not a JPEG image`};let r=2,i=n.byteLength;for(;r<i;){if(n.getUint8(r)!==255)return{hasGPS:!1,reason:`Invalid JPEG marker`};if(n.getUint8(r+1)===225)return se(n,r+4);r+=2+n.getUint16(r+2)}return{hasGPS:!1,reason:`No EXIF APP1 header found`}}catch(e){return console.warn(`EXIF parse error:`,e),{hasGPS:!1,reason:e.message}}}function se(e,t){let n=[69,120,105,102,0,0];for(let r=0;r<6;r++)if(e.getUint8(t+r)!==n[r])return{hasGPS:!1,reason:`Invalid Exif signature`};let r=t+6,i=e.getUint16(r)===18761,a=r+e.getUint32(r+4,i),o=e.getUint16(a,i),s=null;for(let t=0;t<o;t++){let n=a+2+t*12;if(e.getUint16(n,i)===34853){s=r+e.getUint32(n+8,i);break}}if(!s)return{hasGPS:!1,reason:`No GPS IFD tag present in image`};let c=e.getUint16(s,i),l=`N`,u=`E`,d=null,f=null;for(let t=0;t<c;t++){let n=s+2+t*12,a=e.getUint16(n,i);a===1?l=String.fromCharCode(e.getUint8(n+8)):a===2?d=ce(e,r+e.getUint32(n+8,i),i):a===3?u=String.fromCharCode(e.getUint8(n+8)):a===4&&(f=ce(e,r+e.getUint32(n+8,i),i))}if(d&&f){let e=d[0]+d[1]/60+d[2]/3600;l===`S`&&(e=-e);let t=f[0]+f[1]/60+f[2]/3600;return u===`W`&&(t=-t),{hasGPS:!0,lat:Number(e.toFixed(6)),lon:Number(t.toFixed(6)),latRef:l,lonRef:u}}return{hasGPS:!1,reason:`Incomplete GPS coordinates in photo`}}function ce(e,t,n){let r=[];for(let i=0;i<3;i++){let a=e.getUint32(t+i*8,n),o=e.getUint32(t+i*8+4,n);r.push(o===0?0:a/o)}return r}function le(e,t,n=new Date,r=null){let i=e*Math.PI/180,a=n-new Date(n.getFullYear(),0,0),o=Math.floor(a/864e5),s=23.45*Math.sin(2*Math.PI/365*(284+o))*Math.PI/180,c=r===null?n.getHours()+n.getMinutes()/60:r,l=(c-12)*15*Math.PI/180,u=Math.sin(i)*Math.sin(s)+Math.cos(i)*Math.cos(s)*Math.cos(l),d=Math.asin(Math.max(-1,Math.min(1,u))),f=d*180/Math.PI,p=180;if(f>0){let e=(Math.sin(d)*Math.sin(i)-Math.sin(s))/(Math.cos(d)*Math.cos(i)),t=Math.acos(Math.max(-1,Math.min(1,e)))*180/Math.PI;p=c<12?360-t:t}let m=Math.max(0,90-f);return{elevationDeg:Math.max(0,f),elevationRad:Math.max(0,d),azimuthDeg:p,zenithDeg:m,isDaylight:f>0,dayOfYear:o,hour:c}}function ue(e,t,n,r=180){if(e<=0)return 90;let i=(90-e)*Math.PI/180,a=n*Math.PI/180,o=(t-r)*Math.PI/180,s=Math.cos(i)*Math.cos(a)+Math.sin(i)*Math.sin(a)*Math.cos(o);return Math.acos(Math.max(-1,Math.min(1,s)))*180/Math.PI}function de({panelHeight:e,panelTiltDeg:t,panelWidth:n=2,panelSpacing:r,rowSpacing:i,sunElevDeg:a,sunAzimuthDeg:o=180,panelAzimuthDeg:s=180,cloudCover:c=25,ambientRadiation:l=650}){if(a<=2)return{shadowLength:0,shadowOffset:0,shadedFraction:0,groundSunlightPercent:0,rowLightDistribution:[0,0,0,0],rowStatus:[`none`,`none`,`none`,`none`],parUnderPanels:0,parBetweenPanels:0};let u=a*Math.PI/180,d=t*Math.PI/180,f=(e+n*Math.sin(d)/2)/Math.max(.08,Math.tan(u)),p=(o-s)*Math.PI/180,m=f*Math.cos(p),h=n*Math.cos(d),g=Math.abs(m)+h*.5,_=Math.min(.92,Math.max(.08,g/i)),v=Math.min(.85,.2+c/100*.6),y=1-_,b=Math.min(100,Math.round((y*(1-v)+v)*100)),x=v*100,S=m,C=[-i*.35,-i*.1,i*.15,i*.4].map(e=>{let t=Math.abs(e-S%i),n=g*.5,r=1;t<n&&(r=Math.max(.12,t/n*.7));let a=Math.round(x+r*(100-x));return Math.max(10,Math.min(100,a))}),w=C.map(e=>e>=75?`high`:e>=50?`moderate`:e>=30?`low`:`excessive`),T=l*2.1,ee=Math.round(v*.75*T),te=Math.round(T*(.95-_*.2));return{shadowLength:Number(f.toFixed(2)),shadowOffset:Number(m.toFixed(2)),groundShadedRatio:Number(_.toFixed(3)),groundSunlightPercent:b,rowLightDistribution:C,rowStatus:w,parUnderPanels:ee,parBetweenPanels:te}}var fe={crop:.4,solar:.35,shadow:.15,weather:.1};function pe({config:e,cropId:n,growthStageId:r,weather:i,location:a,solarPosition:o,weights:s=fe}){let c=t[n]||t.tomato,l=c.stages.find(e=>e.id===r)||c.stages[1],u=de({panelHeight:e.height,panelTiltDeg:e.angle,panelSpacing:e.spacing,rowSpacing:e.rowSpacing||4,sunElevDeg:o.elevationDeg,sunAzimuthDeg:o.azimuthDeg,panelAzimuthDeg:e.azimuth||180,cloudCover:i.cloudCover,ambientRadiation:i.solarRadiation}),d=Math.min(95,Math.max(50,c.idealMinDLI/28*80*l.lightMod)),f=u.groundSunlightPercent,p=100;if(f<d){let e=d-f;p=Math.max(10,100-e*2.2)}else if(f>90&&i.temp>c.heatStressThreshold){let e=f-90;p=Math.max(20,100-e*2.5)}else{let e=Math.abs(f-d);p=Math.max(85,100-e*.8)}let m=ue(o.elevationDeg,o.azimuthDeg,e.angle,e.azimuth||180),h=Math.max(0,Math.cos(m*Math.PI/180)),g=(e.panelCount||20)*(e.wattage||450),_=Math.max(.15,1-i.cloudCover/100*.7),v=g/1e3*h*(i.solarRadiation/1e3)*_*.92,y=g/1e3*1*(i.solarRadiation/1e3)*.92,b=Math.min(100,Math.max(5,Math.round(y>0?v/y*100:h*100))),x=Number((v*(c.idealSunHours||7.5)*.82).toFixed(1)),S=u.rowStatus.filter(e=>e===`excessive`).length*22,C=Math.min(100,Math.max(15,Math.round((1-u.groundShadedRatio*.5)*100-S))),w=80;if(i.cloudCover>60){let t=(e.angle-15)*.6;w=Math.min(100,Math.max(20,Math.round(95-Math.max(0,t))))}else w=i.temp>30?e.angle>=28?94:72:88;let T=Math.min(100,Math.max(0,Math.round(s.crop*p+s.solar*b+s.shadow*C+s.weather*w)));return{config:e,cropScore:Math.round(p),solarScore:Math.round(b),shadowScore:Math.round(C),weatherScore:Math.round(w),overallBalance:T,groundSunlightPercent:u.groundSunlightPercent,estimatedPowerKW:Number(v.toFixed(2)),estimatedKWhPerDay:x,shadow:u,aoi:Number(m.toFixed(1))}}function me({currentConfig:e,cropId:t,growthStageId:n,weather:r,location:i,solarPosition:a,weights:o=fe}){let s=[15,20,25,30,35,40,45,50,55],c=[2.5,3,3.5,4],l=[2,2.5,3,3.5],u=[],d=pe({config:e,cropId:t,growthStageId:n,weather:r,location:i,solarPosition:a,weights:o});s.forEach(s=>{c.forEach(c=>{l.forEach(l=>{let d=pe({config:{...e,angle:s,height:c,spacing:l,rowSpacing:e.rowSpacing||4},cropId:t,growthStageId:n,weather:r,location:i,solarPosition:a,weights:o});u.push(d)})})}),u.sort((e,t)=>t.overallBalance-e.overallBalance);let f=u[0],p=u[1]||f,m=u[2]||f,h=[...u].sort((e,t)=>t.cropScore-e.cropScore)[0],g=[...u].sort((e,t)=>t.solarScore-e.solarScore)[0],_=pe({config:{...e,angle:10,height:e.height,spacing:e.spacing},cropId:t,growthStageId:n,weather:r,location:i,solarPosition:a,weights:o}),v={cropSunlightDelta:f.groundSunlightPercent-d.groundSunlightPercent,solarScoreDelta:f.solarScore-d.solarScore,balanceDelta:f.overallBalance-d.overallBalance,powerDeltaKW:Number((f.estimatedPowerKW-d.estimatedPowerKW).toFixed(2))},y=he({currentEval:d,best:f,cropId:t,growthStageId:n,weather:r,deltas:v}),b={formula:`Balance = (${o.crop} × ${f.cropScore}) + (${o.solar} × ${f.solarScore}) + (${o.shadow} × ${f.shadowScore}) + (${o.weather} × ${f.weatherScore}) = ${f.overallBalance}`,weights:o,candidatesEvaluated:u.length,paretoFrontier:u.filter(e=>e.cropScore>=75&&e.solarScore>=75),shadowFormula:`Shadow Length ≈ Height / tan(Sun Elevation)`,solarFormula:`Power = P_rated × cos(AOI) × (GHI / 1000) × η_inverter × cloudFactor`};return{current:d,recommended:f,candidates:[{name:`Configuration A (Recommended)`,...f},{name:`Configuration B (Alternative)`,...p},{name:`Configuration C (Wide Clearance)`,...m}],whatIfScenarios:{current:d,recommended:f,cropFirst:h,energyFirst:g,stormStow:_},allEvaluations:u,deltas:v,explanation:y,technicalSummary:b}}function he({currentEval:e,best:n,cropId:r,growthStageId:i,weather:a,deltas:o}){let s=t[r]||t.tomato,c=s.stages.find(e=>e.id===i)||s.stages[1],l=``;return n.config.angle!==e.config.angle&&(n.config.angle>e.config.angle?l+=`Tilting panels slightly steeper from ${e.config.angle}° to ${n.config.angle}° allows ${o.cropSunlightDelta>0?`+`+o.cropSunlightDelta+`%`:``} more ambient sunlight to stream between the solar rows directly onto the ${s.name} canopy during its high-demand ${c.name} phase. `:l+=`Lowering the tilt from ${e.config.angle}° to ${n.config.angle}° maintains excellent panel irradiance while scattering light evenly to avoid dense shadow bands. `),n.config.height>e.config.height&&(l+=`Increasing clearance height to ${n.config.height}m elevates the panel shadow cone, softening ground shadow boundaries and ensuring inner crop rows receive diffuse photosynthetic radiation. `),a.cloudCover>50?l+=`With ${a.cloudCover}% cloud cover today, scattered light is dominant; this position captures diffuse sunlight from all directions without starving the crop. `:a.temp>30&&(l+=`Under today's high temperature (${a.temp}°C), this angle creates beneficial microclimate shading during peak afternoon heat, reducing crop water loss and heat stress. `),l+=`This strikes the optimal farm balance of ${n.overallBalance}/100, generating ${n.estimatedPowerKW} kW renewable power while preserving peak ${s.name} productivity.`,l}function ge({sunElevationDeg:e=45,sunAzimuthDeg:t=180,panelTiltDeg:n=25,panelHeight:r=3,panelSpacing:i=2.5,rowSpacing:a=4,cloudCover:s=25,cropId:c=`tomato`,growthStageId:l=`flowering`,groundLightPercent:u=84,shadowLength:d=3.2,shadowOffset:f=1.8,hour:p=12}){let m=(Math.max(6,Math.min(18,p))-6)/12,h=80+m*640,g=Math.sin(m*Math.PI),_=Math.max(60,360-g*300-Math.min(30,e*.4)),v=380-Math.min(180,Math.max(70,r*36));h-400;let y=Math.min(260,Math.max(40,(d||3)*36*.7)),b=400-y*.5-f*36*.3,x=b+y,S=u>70?`#2F7D4F`:u>45?`#4A7C59`:`#3E5C46`,C=c===`tomato`?`#E63946`:c===`maize`?`#F7C948`:`#8FCF64`,w=`#102638`,T=`#9ED4EC`;return p<7||p>17?(w=`#1E293B`,T=`#F59E0B`):s>60&&(w=`#475569`,T=`#94A3B8`),`
    <svg viewBox="0 0 800 460" class="digital-twin-svg" aria-label="Interactive Agri-Voltaics Digital Twin">
      <defs>
        <!-- Sky Gradient -->
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${w}" />
          <stop offset="100%" stop-color="${T}" />
        </linearGradient>

        <!-- Ground Soil Gradient -->
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A3525" />
          <stop offset="25%" stop-color="#362417" />
          <stop offset="100%" stop-color="#21150C" />
        </linearGradient>

        <!-- Sun Glow Filter -->
        <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <!-- Sunlight Cone Gradient -->
        <linearGradient id="sunbeamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFE066" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#F7C948" stop-opacity="0.04" />
        </linearGradient>

        <!-- Panel Shading Gradient -->
        <linearGradient id="pvCellGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1E3A8A" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>

      <!-- Background Sky -->
      <rect x="0" y="0" width="800" height="460" fill="url(#skyGrad)" rx="16" />

      <!-- Celestial Sun Path Arc (Dotted Reference) -->
      <path d="M 80 340 Q 400 40 720 340" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="5,6" opacity="0.3" />

      <!-- Sunlight Rays / Beam downwards -->
      ${e>5?`
        <polygon points="${h},${_} 180,380 620,380" fill="url(#sunbeamGrad)" />
      `:``}

      <!-- Animated Sun -->
      <g transform="translate(${h}, ${_})">
        <circle cx="0" cy="0" r="32" fill="#F7C948" filter="url(#sunGlow)" />
        <circle cx="0" cy="0" r="26" fill="#FFFBEB" />
        <!-- Sun Rays -->
        <g stroke="#F7C948" stroke-width="3" stroke-linecap="round" opacity="0.8">
          <line x1="0" y1="-44" x2="0" y2="-36" />
          <line x1="0" y1="36" x2="0" y2="44" />
          <line x1="-44" y1="0" x2="-36" y2="0" />
          <line x1="36" y1="0" x2="44" y2="0" />
          <line x1="-31" y1="-31" x2="-25" y2="-25" />
          <line x1="25" y1="25" x2="31" y2="31" />
          <line x1="-31" y1="31" x2="-25" y2="25" />
          <line x1="25" y1="-25" x2="31" y2="-31" />
        </g>
        <text x="0" y="4" font-size="11" font-weight="bold" fill="#123B2A" text-anchor="middle" font-family="sans-serif">${p.toFixed(0)}:00</text>
      </g>

      <!-- Cloud Layer (if cloudCover > 10) -->
      ${s>10?`
        <g opacity="${Math.min(.85,s/100)}" fill="#FFFFFF">
          <ellipse cx="260" cy="110" rx="65" ry="24" />
          <ellipse cx="300" cy="98" rx="55" ry="28" />
          <ellipse cx="340" cy="115" rx="50" ry="20" />
          <ellipse cx="550" cy="140" rx="75" ry="26" />
          <ellipse cx="590" cy="128" rx="60" ry="30" />
        </g>
      `:``}

      <!-- Horizon Distant Trees & Farmland -->
      <path d="M 0 380 Q 180 370 360 380 Q 560 368 800 380 L 800 380 L 0 380 Z" fill="#1E4731" opacity="0.6" />

      <!-- Ground Soil Bed -->
      <rect x="0" y="380" width="800" height="80" fill="url(#groundGrad)" />
      <!-- Turf / Topsoil line -->
      <line x1="0" y1="380" x2="800" y2="380" stroke="#2F7D4F" stroke-width="4" />

      <!-- Dynamic Ground Cast Shadow -->
      ${e>2?`
        <ellipse cx="${(b+x)/2}" cy="384"
                 rx="${Math.max(20,(x-b)/2)}" ry="10"
                 fill="#000000" opacity="${Math.max(.18,.45*(1-s/150))}" />
      `:``}

      <!-- Agri-Voltaic Mounting Stilts / Pylons (Clearance Height) -->
      <!-- Left Stilt -->
      <line x1="355" y1="380" x2="355" y2="${v}" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
      <circle cx="355" cy="380" r="5" fill="#334155" />
      <!-- Right Stilt -->
      <line x1="445" y1="380" x2="445" y2="${v}" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
      <circle cx="445" cy="380" r="5" fill="#334155" />
      <!-- Cross Truss Bracing -->
      <line x1="355" y1="350" x2="445" y2="${v+20}" stroke="#94A3B8" stroke-width="2.5" opacity="0.6" />
      <line x1="445" y1="350" x2="355" y2="${v+20}" stroke="#94A3B8" stroke-width="2.5" opacity="0.6" />

      <!-- Height Clearance Dimension Marker -->
      <line x1="320" y1="380" x2="320" y2="${v}" stroke="#F7C948" stroke-width="1.5" stroke-dasharray="3,3" />
      <line x1="313" y1="380" x2="327" y2="380" stroke="#F7C948" stroke-width="1.5" />
      <line x1="313" y1="${v}" x2="327" y2="${v}" stroke="#F7C948" stroke-width="1.5" />
      <text x="307" y="${(380+v)/2+4}" font-size="11" font-weight="bold" fill="#F7C948" text-anchor="end" font-family="sans-serif">${r}m</text>

      <!-- Solar Panel Array Assembly (Rotated at panelTiltDeg) -->
      <g transform="translate(400, ${v}) rotate(${-n})">
        <!-- Structural Bracket Pivot -->
        <circle cx="0" cy="0" r="9" fill="#F7C948" stroke="#123B2A" stroke-width="2.5" />

        <!-- Panel Frame -->
        <rect x="-140" y="-18" width="280" height="36" rx="6" fill="#0F172A" stroke="#9ED4EC" stroke-width="3" />

        <!-- PV Solar Cells (Bifacial) -->
        <g fill="url(#pvCellGrad)">
          <rect x="-132" y="-14" width="48" height="28" rx="2" />
          <rect x="-78" y="-14" width="48" height="28" rx="2" />
          <rect x="-24" y="-14" width="48" height="28" rx="2" />
          <rect x="30" y="-14" width="48" height="28" rx="2" />
          <rect x="84" y="-14" width="48" height="28" rx="2" />
        </g>

        <!-- Cell Busbars -->
        <line x1="-132" y1="0" x2="132" y2="0" stroke="#9ED4EC" stroke-width="1" opacity="0.6" />
        <line x1="-108" y1="-14" x2="-108" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="-54" y1="-14" x2="-54" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="0" y1="-14" x2="0" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="54" y1="-14" x2="54" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="108" y1="-14" x2="108" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />

        <!-- Angle Badge Indicator -->
        <text x="148" y="4" font-size="12" font-weight="bold" fill="#F7C948" font-family="sans-serif">${n}°</text>
      </g>

      <!-- Agricultural Crops Growing Beneath Solar System -->
      <!-- 4 Representative Rows -->
      <!-- Row 1: x = 240 (Direct under left structure) -->
      ${E(240,380,S,C,c,l,`${o(`row`)} 1`)}
      <!-- Row 2: x = 340 (Under panel array center) -->
      ${E(340,380,S,C,c,l,`${o(`row`)} 2`)}
      <!-- Row 3: x = 460 (Under panel array right) -->
      ${E(460,380,S,C,c,l,`${o(`row`)} 3`)}
      <!-- Row 4: x = 560 (Inter-row corridor / open sky) -->
      ${E(560,380,S,C,c,l,`${o(`row`)} 4`)}

      <!-- Ground Sunlight Indicator Ribbon -->
      <g transform="translate(400, 440)">
        <rect x="-140" y="-14" width="280" height="24" rx="12" fill="#123B2A" stroke="#2F7D4F" stroke-width="1.5" />
        <circle cx="-120" cy="-2" r="5" fill="#8FCF64" />
        <text x="0" y="2" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">
          ${o(`canopySunlight`)}: ${u}% • ${o(`shadow`)}: ${d}m
        </text>
      </g>
    </svg>
  `}function E(e,t,n,r,i,a,o){return`
    <g transform="translate(${e}, ${t})">
      <!-- Mounded Row Earth -->
      <ellipse cx="0" cy="0" rx="36" ry="6" fill="#2E1C0C" />

      <!-- Main Stems and Foliage -->
      <path d="M 0 0 Q -8 -22 -18 -38 Q -6 -28 0 -12 Q 6 -28 18 -38 Q 8 -22 0 0" fill="${n}" />
      <path d="M 0 -10 Q -15 -35 -28 -48 Q -10 -40 -3 -20 Q 10 -40 28 -48 Q 15 -35 0 -10" fill="${n}" />
      <path d="M 0 -22 Q -12 -52 -22 -66 Q -4 -50 0 -30 Q 4 -50 22 -66 Q 12 -52 0 -22" fill="${n}" />

      <!-- Fruit / Flower sets (if applicable) -->
      ${i===`tomato`?`
        <circle cx="-12" cy="-35" r="5.5" fill="${r}" />
        <circle cx="10" cy="-28" r="5" fill="${r}" />
        <circle cx="-4" cy="-52" r="4" fill="${r}" />
      `:i===`maize`?`
        <rect x="-3" y="-55" width="6" height="16" rx="3" fill="${r}" />
        <path d="M 0 -58 L -4 -66 M 0 -58 L 4 -66" stroke="#D97706" stroke-width="1.5" />
      `:``}

      <!-- Row Label -->
      <text x="0" y="16" font-size="10" font-weight="600" fill="#9ED4EC" text-anchor="middle" font-family="sans-serif">${o}</text>
    </g>
  `}function _e({cropSunlight:e=84,solarScore:t=91,overallBalance:n=88}){let r=2*Math.PI*64,i=`#2F7D4F`;return n<60?i=`#DC2626`:n<75?i=`#F59E0B`:n>=85&&(i=`#8FCF64`),`
    <div class="balance-meter-container" role="region" aria-label="Farm Sunlight Balance Meter">
      <div class="meter-header">
        <h3 class="meter-title">⚖️ ${o(`farmBalance`)}</h3>
        <span class="meter-badge">${o(n>=80?`badgeSweetSpot`:`badgeNeedsOpt`)}</span>
      </div>

      <div class="meter-body">
        <!-- Crop Sunlight Column -->
        <div class="meter-pillar crop-pillar">
          <div class="pillar-icon">🌱</div>
          <div class="pillar-label">${o(`cropSunlight`)}</div>
          <div class="pillar-value">${e}%</div>
          <div class="pillar-bar-track">
            <div class="pillar-bar-fill crop-bar" style="width: ${e}%;"></div>
          </div>
          <span class="pillar-caption">PAR (${e}%)</span>
        </div>

        <!-- Center Dial / Balance Scale -->
        <div class="meter-center-dial">
          <svg viewBox="0 0 160 160" class="dial-svg">
            <circle cx="80" cy="80" r="64" fill="none" stroke="#E2E8F0" stroke-width="10" opacity="0.4" />
            <circle cx="80" cy="80" r="64" fill="none" stroke="${i}" stroke-width="10"
                    stroke-dasharray="${n/100*r} ${r}"
                    stroke-linecap="round"
                    transform="rotate(-90 80 80)"
                    class="score-ring" />
          </svg>
          <div class="dial-content">
            <span class="scale-symbol">⚖️</span>
            <div class="dial-score-num" style="color: ${i};">${n}</div>
            <div class="dial-score-label">${o(`farmBalance`)}</div>
          </div>
        </div>

        <!-- Solar Energy Column -->
        <div class="meter-pillar solar-pillar">
          <div class="pillar-icon">⚡</div>
          <div class="pillar-label">${o(`solarEnergy`)}</div>
          <div class="pillar-value">${t}%</div>
          <div class="pillar-bar-track">
            <div class="pillar-bar-fill solar-bar" style="width: ${t}%;"></div>
          </div>
          <span class="pillar-caption">${o(`solarEnergy`)} (${t}%)</span>
        </div>
      </div>

      <div class="meter-footer">
        <span class="objective-tag">${o(`subTagline`)}</span>
      </div>
    </div>
  `}function ve({candidates:e=[],best:t=null,current:n=null}){let r={top:30,right:40,bottom:50,left:60},i=640-r.left-r.right,a=360-r.top-r.bottom,s=e=>r.left+(e-30)/70*i,c=e=>r.top+a-(e-30)/70*a,l=e.map((e,r)=>{let i=s(e.groundSunlightPercent),a=c(e.solarScore),o=t&&e.config.angle===t.config.angle&&e.config.height===t.config.height&&e.config.spacing===t.config.spacing,l=n&&e.config.angle===n.config.angle&&e.config.height===n.config.height;return o||l?``:`
      <circle cx="${i}" cy="${a}" r="4.5" fill="#2F7D4F" opacity="0.45" class="tradeoff-dot">
        <title>Angle: ${e.config.angle}°, Height: ${e.config.height}m | Crop: ${e.groundSunlightPercent}%, Solar: ${e.solarScore}%, Balance: ${e.overallBalance}</title>
      </circle>
    `}).join(``),u=``;n&&(u=`
      <g transform="translate(${s(n.groundSunlightPercent)}, ${c(n.solarScore)})">
        <circle cx="0" cy="0" r="8" fill="#E2E8F0" stroke="#64748B" stroke-width="2.5" />
        <circle cx="0" cy="0" r="4" fill="#64748B" />
        <rect x="-45" y="-28" width="90" height="20" rx="4" fill="#1E293B" opacity="0.9" />
        <text x="0" y="-14" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">${o(`currentSetup`)} (${n.overallBalance})</text>
      </g>
    `);let d=``;return t&&(d=`
      <g transform="translate(${s(t.groundSunlightPercent)}, ${c(t.solarScore)})">
        <circle cx="0" cy="0" r="14" fill="#F7C948" opacity="0.3" class="pulse-ring" />
        <circle cx="0" cy="0" r="9" fill="#F7C948" stroke="#123B2A" stroke-width="3" />
        <text x="0" y="4" font-size="10" font-weight="bold" fill="#123B2A" text-anchor="middle">★</text>
        <rect x="-65" y="-34" width="130" height="24" rx="6" fill="#123B2A" stroke="#F7C948" stroke-width="1.5" />
        <text x="0" y="-18" font-size="11" font-weight="bold" fill="#F7C948" text-anchor="middle" font-family="sans-serif">
          ⭐ ${o(`legendSweetSpot`)} (${t.overallBalance})
        </text>
      </g>
    `),`
    <div class="tradeoff-card">
      <div class="tradeoff-header">
        <h4 class="tradeoff-title">📈 ${o(`tradeoffTitle`)}</h4>
        <span class="tradeoff-sub">${o(`tradeoffSub`)}</span>
      </div>

      <div class="tradeoff-chart-wrapper">
        <svg viewBox="0 0 640 360" class="tradeoff-svg" aria-label="Crop Sunlight vs Solar Generation Pareto Curve">
          <!-- Background Grid Lines -->
          <line x1="${r.left}" y1="${c(50)}" x2="${640-r.right}" y2="${c(50)}" stroke="#E2E8F0" stroke-dasharray="3,3" />
          <line x1="${r.left}" y1="${c(75)}" x2="${640-r.right}" y2="${c(75)}" stroke="#E2E8F0" stroke-dasharray="3,3" />
          <line x1="${s(50)}" y1="${r.top}" x2="${s(50)}" y2="${360-r.bottom}" stroke="#E2E8F0" stroke-dasharray="3,3" />
          <line x1="${s(75)}" y1="${r.top}" x2="${s(75)}" y2="${360-r.bottom}" stroke="#E2E8F0" stroke-dasharray="3,3" />

          <!-- Axes -->
          <line x1="${r.left}" y1="${360-r.bottom}" x2="${640-r.right}" y2="${360-r.bottom}" stroke="#475569" stroke-width="2" />
          <line x1="${r.left}" y1="${r.top}" x2="${r.left}" y2="${360-r.bottom}" stroke="#475569" stroke-width="2" />

          <!-- Axis Labels -->
          <text x="320" y="348" font-size="12" font-weight="bold" fill="#123B2A" text-anchor="middle" font-family="sans-serif">
            ${o(`cropAxis`)}
          </text>
          <text x="18" y="180" font-size="12" font-weight="bold" fill="#123B2A" text-anchor="middle" font-family="sans-serif" transform="rotate(-90 18 180)">
            ${o(`solarAxis`)}
          </text>

          <!-- Tick Marks & Values -->
          <text x="${s(50)}" y="${360-r.bottom+18}" font-size="10" fill="#64748B" text-anchor="middle">50%</text>
          <text x="${s(75)}" y="${360-r.bottom+18}" font-size="10" fill="#64748B" text-anchor="middle">75%</text>
          <text x="${s(100)}" y="${360-r.bottom+18}" font-size="10" fill="#64748B" text-anchor="middle">100%</text>

          <text x="${r.left-10}" y="${c(50)+4}" font-size="10" fill="#64748B" text-anchor="end">50%</text>
          <text x="${r.left-10}" y="${c(75)+4}" font-size="10" fill="#64748B" text-anchor="end">75%</text>
          <text x="${r.left-10}" y="${c(100)+4}" font-size="10" fill="#64748B" text-anchor="end">100%</text>

          <!-- Candidate Scatter Dots -->
          ${l}

          <!-- Current & Best -->
          ${u}
          ${d}
        </svg>
      </div>

      <div class="tradeoff-legend">
        <span class="legend-item"><span class="dot-sample best-dot">★</span> ${o(`legendSweetSpot`)}</span>
        <span class="legend-item"><span class="dot-sample current-dot">●</span> ${o(`legendCurrent`)}</span>
        <span class="legend-item"><span class="dot-sample candidate-dot">●</span> ${o(`legendCandidates`)}</span>
      </div>
    </div>
  `}function ye({rowLightDistribution:e=[78,86,92,84],rowStatus:t=[`high`,`high`,`high`,`high`],parBetweenPanels:n=1150}){let r=[{title:o(`row1`),desc:o(`row1`)},{title:o(`row2`),desc:o(`row2`)},{title:o(`row3`),desc:o(`row3`)},{title:o(`row4`),desc:o(`row4`)}],i={high:{label:o(`highLight`),color:`#2F7D4F`,bg:`#E8F5E9`,icon:`🟢`},moderate:{label:o(`modLight`),color:`#D97706`,bg:`#FEF3C7`,icon:`🟡`},low:{label:o(`lowLight`),color:`#EA580C`,bg:`#FFEDD5`,icon:`🟠`},excessive:{label:o(`excessShade`),color:`#DC2626`,bg:`#FEE2E2`,icon:`🔴`}},a=e.map((e,a)=>{let o=t[a]||(e>=75?`high`:e>=50?`moderate`:e>=30?`low`:`excessive`),s=i[o],c=Math.round(e/100*(n||1200));return`
      <div class="heatmap-row-card" style="border-left: 5px solid ${s.color};">
        <div class="heatmap-row-info">
          <div class="heatmap-row-name">${s.icon} ${r[a].title}</div>
          <div class="heatmap-row-desc">${s.label}</div>
        </div>
        <div class="heatmap-row-metrics">
          <div class="heatmap-row-pct" style="color: ${s.color}; font-weight: bold;">${e}% Light</div>
          <div class="heatmap-row-par">${c} µmol/m²/s PAR</div>
        </div>
        <div class="heatmap-progress-bar">
          <div class="heatmap-progress-fill" style="width: ${e}%; background-color: ${s.color};"></div>
        </div>
      </div>
    `}).join(``);return`
    <div class="heatmap-container" role="region" aria-label="Crop Row Sunlight Heatmap">
      <div class="heatmap-header">
        <h4 class="heatmap-title">🌱 ${o(`heatmapTitle`)}</h4>
        <span class="heatmap-sub">${o(`heatmapSub`)}</span>
      </div>

      <div class="heatmap-grid">
        ${a}
      </div>

      <div class="heatmap-legend">
        <span>🟢 ${o(`highLight`)}</span>
        <span>🟡 ${o(`modLight`)}</span>
        <span>🟠 ${o(`lowLight`)}</span>
        <span>🔴 ${o(`excessShade`)}</span>
      </div>
    </div>
  `}function be({currentAngle:e=25,targetAngle:t=35,status:n=`ready`,progress:r=0}){let i=n===`moving`,a=n===`reached`;return`
    <div class="actuator-card" role="region" aria-label="Virtual Actuator Control">
      <div class="actuator-header">
        <div class="actuator-badge">⚙️ ${o(`actuatorTitle`)}</div>
        <span class="actuator-protocol">Protocol: IEEE 802.15.4 / RS485 Ready</span>
      </div>

      <div class="actuator-body">
        <div class="actuator-telemetry">
          <div class="telemetry-item">
            <span class="tel-label">${o(`currentAngle`)}</span>
            <span class="tel-val current-tilt-val">${e}°</span>
          </div>
          <div class="actuator-arrow">➔</div>
          <div class="telemetry-item">
            <span class="tel-label">${o(`targetSweetSpot`)}</span>
            <span class="tel-val target-tilt-val">${t}°</span>
          </div>
        </div>

        <div class="actuator-motor-state">
          <div class="motor-indicator ${i?`motor-active`:``}">
            <span class="motor-icon">${i?`🔄`:a?`✓`:`⚙️`}</span>
            <div class="motor-text">
              <span class="motor-status-title">
                ${o(i?`actuatorAligning`:a?`actuatorReached`:`actuatorReady`)}
              </span>
              <span class="motor-sub">Linear Slew Drive: 24V DC • 42W Peak Motor Draw</span>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <button id="btn-actuator-move" class="btn btn-primary btn-actuator ${i?`loading`:``}" ${i?`disabled`:``}>
          ${i?`⚙️ `+o(`actuatorAligning`)+` (`+t+`°)`:a?o(`actuatorReached`)+` (`+t+`°)`:o(`btnApplyAngle`)+` (`+t+`°)`}
        </button>

        <!-- Hardware Integration Drawer Note -->
        <div class="hardware-note">
          <small>${o(`actuatorDisclaimer`)}</small>
        </div>
      </div>
    </div>
  `}var D={panelHardwareSource:`HARDWARE IoT`,batteryHardwareSource:`HARDWARE IoT`,soilHardwareSource:`HARDWARE IoT`,weatherSource:`LIVE API / IoT`,solarPanelStatus:`Working`,solarPanelStatusReason:`All 20 bifacial string inverters operating in MPPT peak curve.`,lastDiagResult:`Nominal string impedance and irradiance correlation.`,solarEnergyTodayKwh:18.64,solarPowerOutputWatts:2840,peakOutputWatts:3450,inverterEfficiency:97.4,irradianceWpm2:680,battery:{chargePercent:88,healthPercent:96,healthStatus:`Optimal (LiFePO4)`,voltage:52.8,amperage:18.5,temperatureC:28.4,cycleCount:312,chargingState:`Charging`,estimatedBackupHours:9.4,capacityKwh:10.24,currentStoredKwh:9.01,criticalReserveCutoffPercent:20,isLowBatteryAlarm:!1},energyLoads:{irrigationPumpWatts:0,sensorsAndCamerasWatts:65,panelActuatorWatts:15,farmHouseLoadWatts:350,totalConsumptionWatts:430},solarStoredTodayKwh:7.2,solarUsedTodayKwh:5.04,solarExportedTodayKwh:6.4,gridImportedTodayKwh:.8,electricityTariffPerKwh:6.5,dailyCostSaved:112.5,cropHealthStatus:`Healthy — Optimal Photosynthesis`,cropComfortScore:92,canopyLightFraction:82,leafTemperatureC:25.8,soilMoisture:46.2,soilTemperatureC:22.8,soilPh:6.8,soilEc:1.2,rainfallMm:0,rainProbabilityNext3h:15,weatherConditionText:`Partly Sunny / Ideal Solar`,ambientTempC:26.2,ambientHumidity:58,windSpeedKmh:14.2,uvIndex:7.4,panelAngleDeg:35,targetAngleDeg:35,minAngleLimitDeg:0,maxAngleLimitDeg:75,isMoving:!1,isEmergencyStopped:!1,actuatorHistory:[{time:`06:30`,angle:55,reason:`Morning solar tracking catch-up`},{time:`11:15`,angle:35,reason:`Midday sweet spot anti-scorch position`}],gridStatus:`Active (Grid-Tied 230V 50Hz)`,gridTransferMode:`SOLAR_PRIORITY`,gridExportWatts:1420,gridImportWatts:0,networkMode:`CLOUD_CONNECTED`,signalStrengthDbm:-68,lastUpdateTime:new Date,offlineQueueCount:0,offlineQueuedLogs:[],automationMode:`AI_SWEET_SPOT`,stateMachineState:`STATE_NORMAL_OPTIMIZATION`,irrigation:{pumpState:`IDLE`,mode:`AUTO`,moistureThreshold:38,litersPumpedToday:680,activeZone:`Zone A (South Tomato Drip Line)`},schedulerConfig:{morningCaptureTime:`07:30`,afternoonCaptureTime:`13:15`,nightCaptureTime:`22:00`,rainThresholdMm:2,rainAngleDeg:30,rainRestoreDelayMins:15,soilMoistureThreshold:38,irrigationDurationMins:30,batteryReserveCutoff:20,windStowSpeedKmh:45,trackingIntervalMins:15,sensorSamplingIntervalSec:3,runOffDirection:`South Drainage Trench (Away from Tomato Root Crowns)`},activeAlerts:[{id:`alt-1`,severity:`info`,status:`unresolved`,title:`Sweet Spot Active`,message:`Panels tilted to 35° maintaining 82% crop PAR and 2.8kW generation.`,time:`12m ago`,category:`AUTOMATION`,affectedComponent:`Actuator Dual-Axis Stepper`,operatingMode:`AI_SWEET_SPOT`,recommendedAction:`No action required. Closed-loop AI governor active.`}],activityLogs:[]},xe=new Set,Se=null;function O(){return D}function Ce(e){return xe.add(e),e(D),()=>xe.delete(e)}function k(){xe.forEach(e=>{try{e(D)}catch(e){console.warn(e)}})}function we(){Se||=(D.activityLogs.length===0&&(P(`IoT Mesh Gateway linked to Inverter Controller (CAN-Bus ID: 0x48)`),P(`Soil Sensor Node #1 (Depth 15cm) online: Moisture 46.2%`),P(`Bifacial MPPT tracker locked at 2,840W generation`)),setInterval(()=>{Te(),k()},3e3))}function Te(){if(D.lastUpdateTime=new Date,D.isEmergencyStopped){D.energyLoads.panelActuatorWatts=0;return}let e=(Math.random()-.5)*.3;if(D.soilMoisture=Math.max(20,Math.min(85,+(D.soilMoisture+e*.2).toFixed(1))),D.soilTemperatureC=+(22.8+e).toFixed(1),D.ambientTempC=+(26.2+e).toFixed(1),D.solarPanelStatus===`Working`){let e=Math.floor((Math.random()-.5)*35);D.solarPowerOutputWatts=Math.max(0,Math.min(3600,D.solarPowerOutputWatts+e)),D.solarEnergyTodayKwh=+(D.solarEnergyTodayKwh+.002).toFixed(3)}else D.solarPowerOutputWatts=D.solarPanelStatus===`Warning`?1200:0;let t=D.irrigation.pumpState===`PUMPING`?450:0;D.energyLoads.irrigationPumpWatts=t,D.energyLoads.totalConsumptionWatts=t+D.energyLoads.sensorsAndCamerasWatts+D.energyLoads.panelActuatorWatts+D.energyLoads.farmHouseLoadWatts,Ee(),De(),Oe(),D.networkMode===`LOCAL_AUTONOMOUS`&&(D.offlineQueueCount+=1,D.offlineQueuedLogs.push({time:new Date().toLocaleTimeString(),angle:D.panelAngleDeg,battery:D.battery.chargePercent,soil:D.soilMoisture}),D.offlineQueuedLogs.length>50&&D.offlineQueuedLogs.shift())}function Ee(){let e=D.battery,t=D.solarPowerOutputWatts-D.energyLoads.totalConsumptionWatts;t>0?(e.chargingState=`Charging`,e.chargePercent<100&&(e.chargePercent=Math.min(100,+(e.chargePercent+.08).toFixed(1))),e.estimatedBackupHours=+(e.chargePercent*.12).toFixed(1),D.gridExportWatts=Math.max(0,t-300),D.gridImportWatts=0):(e.chargingState=`Discharging`,e.chargePercent=Math.max(2,+(e.chargePercent-.12).toFixed(1)),e.estimatedBackupHours=+(e.chargePercent*.09).toFixed(1),D.gridExportWatts=0),e.chargePercent<=e.criticalReserveCutoffPercent?e.isLowBatteryAlarm||(e.isLowBatteryAlarm=!0,D.gridTransferMode=`EMERGENCY_GRID_ASSIST`,D.gridStatus=`Active (Grid-Tied Backup Engaged)`,D.gridImportWatts=D.energyLoads.totalConsumptionWatts,N({severity:`critical`,title:`CRITICAL: Low Battery Reserve (≤ 20%)`,message:`Battery charge dropped to ${e.chargePercent}%. Backup runtime: ${e.estimatedBackupHours}h. Non-essential loads shed; transferred farm to backup electricity.`,category:`BATTERY`,affectedComponent:`LiFePO4 48V Storage Bank`,operatingMode:D.automationMode,recommendedAction:`Engaged emergency grid transfer. Keep non-essential pumping halted until solar morning charge.`}),F(`warning`),P(`🚨 Low Battery Protection: Charge reached ${e.chargePercent}%. Switched to grid backup.`)):e.chargePercent>25&&e.isLowBatteryAlarm&&(e.isLowBatteryAlarm=!1,D.gridTransferMode=`SOLAR_PRIORITY`,P(`✓ Battery recovered above 25% threshold. Solar priority restored.`))}function De(){if(D.isEmergencyStopped)D.stateMachineState=`STATE_E_STOPPED`;else if(D.windSpeedKmh>=D.schedulerConfig.windStowSpeedKmh)D.stateMachineState!==`STATE_HIGH_WIND`&&(D.stateMachineState=`STATE_HIGH_WIND`,D.automationMode=`STORM_STOW`,A(0,`High wind shear protection (gusts >= 45 km/h)`),N({severity:`critical`,title:`EMERGENCY: High Wind Storm Stow (0°)`,message:`Wind speed reached ${D.windSpeedKmh} km/h. Panels flat-locked to 0° to prevent structural torque.`,category:`SAFETY`,affectedComponent:`Solar Array Steel Mounting Trusses`,operatingMode:`STORM_STOW`,recommendedAction:`Movement interlocked until wind drops below 35 km/h.`}),F(`warning`));else if(D.rainfallMm>=D.schedulerConfig.rainThresholdMm){if(D.stateMachineState!==`STATE_RAIN_RUNOFF`){D.stateMachineState=`STATE_RAIN_RUNOFF`,D.automationMode=`RAIN_RUNOFF`;let e=D.schedulerConfig.rainAngleDeg;A(e,`Rain detected (${D.rainfallMm}mm). Tilting to ${e}° for safe drainage.`),N({severity:`info`,title:`Rain Runoff Protection Active (${e}°)`,message:`Directing precipitation runoff toward ${D.schedulerConfig.runOffDirection} to prevent crop root-crown waterlogging.`,category:`WEATHER`,affectedComponent:`Actuator Drainage Positioner`,operatingMode:`RAIN_RUNOFF`,recommendedAction:`Panels will return to normal tracking 15 minutes after rain ceases.`})}}else D.stateMachineState===`STATE_HIGH_WIND`&&D.windSpeedKmh<30&&(D.stateMachineState=`STATE_NORMAL_OPTIMIZATION`,j(`AI_SWEET_SPOT`),P(`✓ Wind subsided below safe limit. Returned to AI Sweet Spot tracking.`)),D.stateMachineState===`STATE_RAIN_RUNOFF`&&D.rainfallMm<.5&&(D.stateMachineState=`STATE_NORMAL_OPTIMIZATION`,j(`AI_SWEET_SPOT`),P(`✓ Rainfall concluded. Returned to AI Sweet Spot tracking.`))}function Oe(){if(D.irrigation.mode!==`AUTO`)return;let e=D.soilMoisture,t=D.schedulerConfig.soilMoistureThreshold,n=D.rainProbabilityNext3h;e<t?n>50||D.rainfallMm>1?D.irrigation.pumpState!==`HELD_RAIN_FORECAST`&&(D.irrigation.pumpState=`HELD_RAIN_FORECAST`,P(`🌧️ Smart Irrigation: Pump held back. Soil moisture is ${e}%, but rain predicted.`),N({severity:`info`,title:`Irrigation Suspended (Rain Forecast)`,message:`Rain probability is ${n}%. Drip irrigation postponed to prevent soil waterlogging.`,category:`IRRIGATION`,affectedComponent:`Zone A Drip Solenoid Valve`,operatingMode:`WEATHER_AWARE_IRRIGATION`,recommendedAction:`Drip lines paused; monitoring rain accumulation.`})):D.irrigation.pumpState!==`PUMPING`&&(D.irrigation.pumpState=`PUMPING`,P(`💧 Smart Irrigation: Pump activated for Zone A (Moisture ${e}% < ${t}%).`)):e>t+10&&D.irrigation.pumpState===`PUMPING`&&(D.irrigation.pumpState=`IDLE`,P(`✓ Smart Irrigation: Zone A soil target moisture reached (${e}%). Pump shut down.`))}function ke(){let e=D.irradianceWpm2,t=D.solarPowerOutputWatts;return D.weatherConditionText,e<100?{status:`NORMAL_DARKNESS`,title:`Low Ambient Sunlight`,details:`Irradiance is only ${e} W/m² (Dusk/Dawn/Heavy Overcast). Low output is expected and NOT a hardware fault.`}:e>=400&&t<200?{status:`GENUINE_FAULT`,title:`Solar String DC Generation Fault`,details:`High sunlight (${e} W/m²) but array output is only ${t}W. String inverter disconnect or DC isolator failure detected.`}:{status:`OPTIMAL`,title:`Operating Nominally`,details:`Solar output (${t}W) correlates cleanly with ${e} W/m² ambient irradiance.`}}function A(e,t=`Automated adjustment`){if(D.isEmergencyStopped)return P(`⚠️ Movement rejected: Emergency Stop interlock is engaged!`),!1;let n=Math.max(D.minAngleLimitDeg,Math.min(D.maxAngleLimitDeg,e));return D.targetAngleDeg=n,D.panelAngleDeg=n,D.energyLoads.panelActuatorWatts=140,setTimeout(()=>{D.energyLoads.panelActuatorWatts=15,k()},1200),D.actuatorHistory.unshift({time:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),angle:n,reason:t}),D.actuatorHistory.length>25&&D.actuatorHistory.pop(),P(`[ACTUATOR] Stepped to ${n}° — ${t}`),k(),!0}function j(e){if(D.isEmergencyStopped&&e!==`E_STOP`){P(`⚠️ Action blocked: Reset Emergency Stop before changing mode.`);return}D.automationMode=e;let t=35,n=``;switch(e){case`AI_SWEET_SPOT`:t=35,n=`AI Sweet Spot: 35° balances 82% crop sunlight + 2.8kW generation.`;break;case`CROP_FIRST`:t=55,n=`Crop-First: 55° maximizes canopy sunlight penetration (94% PAR).`;break;case`ENERGY_FIRST`:t=18,n=`Energy-First: 18° maximizes perpendicular solar irradiance.`;break;case`RAIN_RUNOFF`:t=D.schedulerConfig.rainAngleDeg,n=`Rain Runoff: ${t}° directs water into drainage trench.`;break;case`STORM_STOW`:t=0,n=`Storm Stow: 0° flat stow to survive violent wind shear.`;break;case`ANTI_SCORCH`:t=10,n=`Anti-Scorch Shield: partial shade reduces leaf temperature by 3.8°C.`;break;case`BATTERY_PRIORITY`:t=22,n=`Battery Priority: focus solar yield on LiFePO4 battery charging.`;break;case`MANUAL`:n=`Manual operator control enabled.`}A(t,n)}function Ae(){D.isEmergencyStopped=!0,D.automationMode=`E_STOP`,D.stateMachineState=`STATE_E_STOPPED`,D.energyLoads.panelActuatorWatts=0,N({severity:`critical`,title:`EMERGENCY STOP (E-STOP) ENGAGED`,message:`All actuator drive motors isolated. Position frozen. Mechanical safety interlock active.`,category:`SAFETY`,affectedComponent:`Actuator Drive Inverter (E-Stop Bus)`,operatingMode:`E_STOP`,recommendedAction:`Inspect physical array before manual safety reset.`}),F(`warning`),P(`🛑 EMERGENCY STOP: All array movement mechanically interlocked.`),k()}function je(){D.isEmergencyStopped=!1,D.automationMode=`AI_SWEET_SPOT`,D.stateMachineState=`STATE_NORMAL_OPTIMIZATION`,P(`✓ Emergency Stop cleared by authorized farmer. Resumed AI Sweet Spot.`),j(`AI_SWEET_SPOT`)}function Me(e=`DC_DISCONNECT`){e===`DC_DISCONNECT`?(D.solarPanelStatus=`Disconnected`,D.solarPowerOutputWatts=0,D.solarPanelStatusReason=`String 1 DC isolator trip. Zero current flow.`,N({severity:`critical`,title:`Solar String Disconnected (DC Isolator Trip)`,message:`Zero generation detected. Operating on battery reserve.`,category:`HARDWARE`,affectedComponent:`Array DC String Combiner Box`,operatingMode:D.automationMode,recommendedAction:`Check DC circuit breaker in field cabinet.`})):e===`INVERTER_DEGRADATION`&&(D.solarPanelStatus=`Warning`,D.solarPowerOutputWatts=1200,D.solarPanelStatusReason=`MPPT string 2 efficiency dropped to 42%.`,N({severity:`warning`,title:`Inverter Current Imbalance Warning`,message:`Potential dust or bird fouling on string 2 modules.`,category:`HARDWARE`,affectedComponent:`String Inverter MPPT Channel 2`,operatingMode:D.automationMode,recommendedAction:`Inspect panel surface for shading obstructions.`})),k()}function Ne(){D.solarPanelStatus=`Working`,D.solarPowerOutputWatts=2840,D.solarPanelStatusReason=`All 20 bifacial modules operating nominally.`,P(`✓ Solar array restored to nominal MPPT state.`),k()}function Pe(){D.battery.chargePercent=19.5,D.battery.estimatedBackupHours=1.8,Ee(),k()}function Fe(e=14.5){D.rainfallMm=e,D.rainProbabilityNext3h=95,D.soilMoisture=74,P(`🌧️ Weather Sensor: Rain gauge detected ${e}mm rainfall.`),De(),k()}function Ie(e=52){D.windSpeedKmh=e,P(`⚠️ Anemometer: Severe wind gust registered at ${e} km/h.`),De(),k()}function Le(){D.gridStatus=`Islanded (Grid Fault / Blackout)`,D.gridExportWatts=0,D.gridImportWatts=0,N({severity:`warning`,title:`Main Grid Outage Detected (230V Lost)`,message:`External grid failed. Solar-battery microgrid isolated to prevent unsafe backfeeding.`,category:`ELECTRICAL`,affectedComponent:`Bi-Directional Net Meter`,operatingMode:D.automationMode,recommendedAction:`Microgrid running autonomously. Conserve energy for critical irrigation.`}),P(`⚠️ External Grid Outage: Islanded mode initiated via anti-islanding relay.`),k()}function Re(){D.gridStatus=`Active (Grid-Tied 230V 50Hz)`,P(`✓ Main grid synchronization restored (50.02Hz nominal).`),k()}function ze(e){e===`Disconnected`?Me(`DC_DISCONNECT`):e===`Warning`?Me(`INVERTER_DEGRADATION`):Ne()}function Be(e=12.4){Fe(e)}function Ve(){D.networkMode=`LOCAL_AUTONOMOUS`,D.offlineQueueCount=1,N({severity:`warning`,title:`Network Disconnected — Local Autonomous Mode`,message:`Internet communication lost. Local microcontroller handling tracking, rain response, and battery safety.`,category:`NETWORK`,affectedComponent:`4G LTE / LoRaWAN Mesh Modem`,operatingMode:`LOCAL_AUTONOMOUS`,recommendedAction:`Telemetry buffering locally in IndexedDB; will auto-sync on reconnect.`}),P(`⚠️ Network Outage: Switched to Local Autonomous Edge Governor.`),k()}function He(){D.networkMode=`SYNCHRONIZING`,P(`🔄 Network Restored: Syncing ${D.offlineQueueCount} local telemetry packets to cloud...`),k(),setTimeout(()=>{D.networkMode=`CLOUD_CONNECTED`,D.offlineQueueCount=0,D.offlineQueuedLogs=[],P(`✓ Cloud synchronization complete. 100% telemetry synced.`),k()},1500)}function M({solarWatts:e,batterySoc:t,windSpeed:n,rainMm:r}){e!==void 0&&(D.solarPowerOutputWatts=e),t!==void 0&&(D.battery.chargePercent=t),n!==void 0&&(D.windSpeedKmh=n),r!==void 0&&(D.rainfallMm=r),Ee(),De(),k()}function Ue(e){D.schedulerConfig={...D.schedulerConfig,...e},P(`✓ Environmental Automation Scheduler parameters saved.`),k()}function We(e){D.irrigation.mode=`MANUAL`,D.irrigation.pumpState=e?`PUMPING`:`IDLE`,P(`Manual Override: Irrigation pump turned ${e?`ON`:`OFF`} by farmer.`),k()}function Ge(){D.irrigation.mode=`AUTO`,P(`Irrigation restored to AUTO (Weather-Aware AI Control).`),Oe(),k()}function N(e){let t={id:`alt-`+Date.now(),time:`Just now`,status:`unresolved`,...e};D.activeAlerts.unshift(t),D.activeAlerts.length>15&&D.activeAlerts.pop(),typeof window<`u`&&typeof window.dispatchEvent==`function`&&window.dispatchEvent(new CustomEvent(`sunstarved:new-alert`,{detail:t})),k()}function Ke(e){let t=D.activeAlerts.find(t=>t.id===e);t&&(t.status=`acknowledged`),k()}function qe(e){let t=D.activeAlerts.find(t=>t.id===e);t&&(t.status=`resolved`),k()}function Je(e){D.activeAlerts=D.activeAlerts.filter(t=>t.id!==e),k()}function P(e){let t=new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`});D.activityLogs.unshift({id:`log-`+Date.now()+`-`+Math.random().toString(36).substr(2,4),time:t,message:e}),D.activityLogs.length>40&&D.activityLogs.pop()}function F(e=`info`){if(typeof window<`u`)try{let t=new(window.AudioContext||window.webkitAudioContext),n=t.createOscillator(),r=t.createGain();n.connect(r),r.connect(t.destination),e===`warning`?(n.type=`sawtooth`,n.frequency.setValueAtTime(440,t.currentTime),n.frequency.setValueAtTime(330,t.currentTime+.15),r.gain.setValueAtTime(.15,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.4),n.start(),n.stop(t.currentTime+.4)):(n.type=`sine`,n.frequency.setValueAtTime(587.33,t.currentTime),n.frequency.setValueAtTime(880,t.currentTime+.1),r.gain.setValueAtTime(.12,t.currentTime),r.gain.exponentialRampToValueAtTime(.01,t.currentTime+.3),n.start(),n.stop(t.currentTime+.3))}catch{}}var Ye=new Map,I={getItem:e=>{try{if(typeof localStorage<`u`)return localStorage.getItem(e)}catch{}return Ye.get(e)||null},setItem:(e,t)=>{try{if(typeof localStorage<`u`)return localStorage.setItem(e,t)}catch{}Ye.set(e,String(t))},removeItem:e=>{try{if(typeof localStorage<`u`)return localStorage.removeItem(e)}catch{}Ye.delete(e)}},L=`sun_starved_active_session`,R=`sun_starved_failed_logins`,Xe=5,z={id:`AGRI-84920-KA`,name:`Ramesh Kumar`,phone:`+91 98765 43210`,email:`ramesh.kumar@agrifarm.in`,village:`Vemgal Rural`,district:`Kolar`,state:`Karnataka`,cropPrimary:`Tomato & Maize`,farmSizeAcres:5,role:`Farm Owner & Operator`,biometricEnrolled:!0,registeredAt:`2026-03-15T08:30:00Z`,passwordHash:`8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918`},Ze=new Map;async function Qe(e){let t=new TextEncoder().encode(e+`::agri_voltaic_salt_2026`),n=await crypto.subtle.digest(`SHA-256`,t);return Array.from(new Uint8Array(n)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}function $e(e=`KA`){return`AGRI-${Math.floor(1e4+Math.random()*9e4)}-${e}`}function et(e,t=`VERIFICATION`){let n=e.replace(/[\s-]/g,``),r=Math.floor(1e5+Math.random()*9e5).toString(),i=Date.now()+3e5;return Ze.set(n,{otp:r,expiresAt:i,purpose:t,resendAvailableAt:Date.now()+3e4}),V(`OTP_SENT`,`SMS OTP dispatched for ${t} to ${n}`),{success:!0,simulatedOtp:r,expiresInSec:300,maskedPhone:gt(e)}}function tt(e,t){let n=e.replace(/[\s-]/g,``),r=Ze.get(n);return r?Date.now()>r.expiresAt?(Ze.delete(n),{success:!1,message:`OTP has expired. Please request a new code.`}):r.otp===t.trim()?(Ze.delete(n),V(`OTP_VERIFIED`,`Phone ${n} successfully verified`),{success:!0}):{success:!1,message:`Invalid verification code. Please check and retry.`}:{success:!1,message:`No OTP request found for this phone. Please request a new OTP.`}}async function nt({name:e,phone:t,password:n,village:r=``,district:i=`Kolar`,state:a=`Karnataka`}){let o=t.replace(/[\s-]/g,``);if(await rt(o))throw Error(`A farmer account is already registered with this phone number.`);let s=$e(a.substring(0,2).toUpperCase()),c={id:s,name:e,phone:o,village:r,district:i,state:a,passwordHash:await Qe(n),biometricEnrolled:!1,registeredAt:new Date().toISOString()};return await h(`users`,c),V(`USER_REGISTERED`,`New account created: ${s} (${e})`),c}async function rt(e){let t=e.replace(/[\s-]/g,``);try{let e=(await m(`users`)).find(e=>e.phone===t);if(e)return e}catch(e){console.warn(`User store query fallback:`,e)}return z.phone.replace(/[\s-]/g,``)===t?z:null}async function it(e){let t=e.trim().toUpperCase();try{let e=await p(`users`,t);if(e)return e}catch{}return z.id.toUpperCase()===t?z:null}async function at(e,t){ft();let n=e.trim(),r=null;if(r=n.toUpperCase().startsWith(`AGRI-`)?await it(n):await rt(n),!r)throw pt(),Error(`Invalid Farmer ID or Phone Number.`);if(await Qe(t)!==r.passwordHash)throw pt(),Error(`Incorrect password. Please verify your credentials.`);mt();let i=ct(r);return V(`LOGIN_SUCCESS`,`Farmer ${r.id} logged in successfully`),{farmer:r,session:i}}async function ot(){if(V(`BIOMETRIC_ATTEMPT`,`User triggered biometric verification`),window.PublicKeyCredential&&typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable==`function`)try{await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()&&console.log(`WebAuthn platform authenticator available`)}catch(e){console.warn(`WebAuthn detection note:`,e)}return new Promise(e=>{setTimeout(()=>{V(`BIOMETRIC_SUCCESS`,`Biometric credential verified`),e({success:!0,method:`TouchID / Fingerprint Sensor`})},850)})}function st({title:e=`Security Verification`,reason:t=`Confirm authorization`,onConfirmed:n,onCancelled:r}){window.dispatchEvent(new CustomEvent(`sunstarved:reauth-challenge`,{detail:{title:e,reason:t,onConfirmed:n,onCancelled:r}}))}function ct(e){let t={token:`tok_`+Math.random().toString(36).substr(2,10)+`_`+Date.now(),farmerId:e.id,farmerName:e.name,phone:e.phone,role:e.role||`Farm Owner`,device:_t(),loginTime:new Date().toISOString(),expiresAt:new Date(Date.now()+288e5).toISOString()};return I.setItem(L,JSON.stringify(t)),t}function B(){try{let e=I.getItem(L);if(!e)return null;let t=JSON.parse(e);return new Date>new Date(t.expiresAt)?(lt(),null):t}catch{return null}}function lt(){let e=B();e&&V(`LOGOUT`,`Logged out from current device (${e.device})`),I.removeItem(L),typeof window<`u`&&typeof window.dispatchEvent==`function`&&window.dispatchEvent(new CustomEvent(`sunstarved:auth-state-change`))}function ut(){I.removeItem(L),V(`LOGOUT_ALL`,`Terminated all active device sessions remotely`),typeof window<`u`&&typeof window.dispatchEvent==`function`&&window.dispatchEvent(new CustomEvent(`sunstarved:auth-state-change`))}function dt(){return[{id:`dev-1`,name:_t()+` (Current Device)`,isCurrent:!0,lastActive:`Just now`,ip:`172.21.6.171`,type:`Desktop / Laptop Browser`},{id:`dev-2`,name:`Samsung Galaxy Tab Active 4 (Field Tablet)`,isCurrent:!1,lastActive:`2 hours ago`,ip:`106.51.24.89 (Kolar 4G LTE)`,type:`Rugged Android Tablet`},{id:`dev-3`,name:`Raspberry Pi 4B (IoT Field Gateway)`,isCurrent:!1,lastActive:`12 seconds ago`,ip:`192.168.1.104 (Local Agrivoltaic Inverter Bus)`,type:`IoT Telemetry Gateway`}]}function ft(){let e=I.getItem(R);if(!e)return;let t=JSON.parse(e);if(t.count>=Xe){let e=Math.ceil((t.lockedUntil-Date.now())/6e4);if(Date.now()<t.lockedUntil)throw Error(`Account temporarily locked due to multiple failed login attempts. Please retry in ${e} minute(s) or use OTP recovery.`);mt()}}function pt(){let e=I.getItem(R),t=e?JSON.parse(e):{count:0,lockedUntil:0};t.count+=1,t.count>=Xe&&(t.lockedUntil=Date.now()+12e4,V(`ACCOUNT_LOCKED`,`Exceeded ${Xe} failed attempts. Lockout active.`)),I.setItem(R,JSON.stringify(t))}function mt(){I.removeItem(R)}function V(e,t){let n=ht(),r={id:`sec-`+Date.now()+`-`+Math.random().toString(36).substr(2,4),timestamp:new Date().toISOString(),type:e,details:t,device:_t()};n.unshift(r),n.length>50&&n.pop(),I.setItem(`sun_starved_security_audit`,JSON.stringify(n))}function ht(){try{let e=I.getItem(`sun_starved_security_audit`);return e?JSON.parse(e):[{id:`sec-init-1`,timestamp:new Date(Date.now()-36e5).toISOString(),type:`SECURITY_SHIELD_ACTIVE`,details:`AES-256 local encrypted vault initialized. Biometric WebAuthn enabled.`,device:_t()},{id:`sec-init-2`,timestamp:new Date(Date.now()-72e5).toISOString(),type:`LOGIN_SUCCESS`,details:`Authenticated Farmer ID AGRI-84920-KA via verified credentials.`,device:`Samsung Galaxy Tab Active 4`}]}catch{return[]}}function gt(e){let t=e.replace(/[\s-]/g,``);return t.length<8?e:t.slice(0,3)+`••••••`+t.slice(-2)}function _t(){let e=typeof navigator<`u`&&navigator.userAgent?navigator.userAgent:`Windows Workstation (Chrome/Edge)`;return/Windows/i.test(e)?`Windows Workstation (Chrome/Edge)`:/Android/i.test(e)?`Android Mobile Field Unit`:/iPhone|iPad/i.test(e)?`Apple iOS Device`:/Mac/i.test(e)?`macOS Workstation`:/Linux/i.test(e)?`Linux Gateway / Workstation`:`Web Browser Device`}function vt(){let e=O(),t=B(),n=t?{id:t.farmerId,name:t.farmerName}:z,r=Math.max(0,Math.floor((Date.now()-new Date(e.lastUpdateTime).getTime())/1e3));return`
    <div class="dashboard-page-container">
      <!-- Farmer & System Status Quick Header -->
      <div class="card dash-top-bar">
        <div class="dash-user-info">
          <span class="user-badge-icon">👨‍🌾</span>
          <div>
            <div class="user-greeting">Welcome, <strong>${n.name}</strong></div>
            <div class="user-id-sub">Farmer ID: <code class="farmer-code">${n.id}</code> · 📍 Vemgal Rural, Kolar</div>
          </div>
        </div>

        <div class="dash-automation-pill-box">
          <span class="badge-label">Active Automation Mode:</span>
          <div class="mode-dropdown-wrap">
            <select id="dash-automation-select" class="form-select mode-select">
              <option value="AI_SWEET_SPOT" ${e.automationMode===`AI_SWEET_SPOT`?`selected`:``}>✨ AI Sweet Spot (35° Balanced)</option>
              <option value="CROP_FIRST" ${e.automationMode===`CROP_FIRST`?`selected`:``}>🌱 Crop-First Canopy Light (55°)</option>
              <option value="ENERGY_FIRST" ${e.automationMode===`ENERGY_FIRST`?`selected`:``}>⚡ Solar-Max Generation (18°)</option>
              <option value="ANTI_SCORCH" ${e.automationMode===`ANTI_SCORCH`?`selected`:``}>🛡️ Anti-Scorch Shade Shield (10°)</option>
              <option value="STORM_STOW" ${e.automationMode===`STORM_STOW`?`selected`:``}>🌪️ Storm Stow Flat (0° Safe)</option>
              <option value="BATTERY_PRIORITY" ${e.automationMode===`BATTERY_PRIORITY`?`selected`:``}>🔋 Battery Rapid Charge (22°)</option>
              <option value="MANUAL" ${e.automationMode===`MANUAL`?`selected`:``}>🔧 Manual Operator Control</option>
            </select>
          </div>
        </div>

        <div class="dash-quick-actions">
          <button id="btn-simulate-rain" class="btn btn-sm btn-outline" title="Simulate rainfall event">
            🌧️ Simulate Rain
          </button>
          <button id="btn-toggle-sound" class="btn btn-sm btn-outline" title="Toggle audio chime alerts">
            🔔 Audio Chime: ON
          </button>
        </div>
      </div>

      <!-- Active Emergency Alerts Strip -->
      <div id="dash-alerts-container" class="dash-alerts-area">
        ${yt(e.activeAlerts)}
      </div>

      <!-- THE 13 LIVE-STATUS CARDS GRID -->
      <div class="status-cards-grid">

        <!-- Card 1: Solar Panel Status -->
        <div class="card status-card card-panel-status ${e.solarPanelStatus===`Working`?`border-success`:e.solarPanelStatus===`Warning`?`border-warning`:`border-danger`}">
          <div class="card-header-row">
            <span class="card-icon">☀️</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">1. Solar Panel Status</div>
          <div class="card-main-val">
            <span class="status-indicator-dot ${e.solarPanelStatus===`Working`?`dot-success`:e.solarPanelStatus===`Warning`?`dot-warning`:`dot-danger`}"></span>
            <span id="metric-panel-status">${e.solarPanelStatus}</span>
          </div>
          <div class="card-sub-metric" id="metric-panel-reason">${e.solarPanelStatusReason}</div>
          <div class="card-footer-controls">
            <button class="btn btn-xs btn-outline btn-panel-toggle" data-status="Working">Working</button>
            <button class="btn btn-xs btn-outline btn-panel-toggle" data-status="Warning">Warning</button>
            <button class="btn btn-xs btn-outline btn-panel-toggle" data-status="Disconnected">Disconnect</button>
          </div>
        </div>

        <!-- Card 2: Solar Energy Today -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">⚡</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">2. Solar Energy Today</div>
          <div class="card-main-val">
            <span id="metric-energy-kwh">${e.solarEnergyTodayKwh}</span> <span class="metric-unit">kWh</span>
          </div>
          <div class="card-sub-metric">Peak Potential: 24.5 kWh/day · Efficiency: 97.4%</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill" style="width: ${(e.solarEnergyTodayKwh/24.5*100).toFixed(0)}%;"></div>
          </div>
        </div>

        <!-- Card 3: Current Power Output -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🔆</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">3. Current Power Output</div>
          <div class="card-main-val">
            <span id="metric-power-watts">${e.solarPowerOutputWatts}</span> <span class="metric-unit">W</span>
          </div>
          <div class="card-sub-metric">Peak Cap: 3,450 W · Bifacial Boost: +12%</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill" style="width: ${(e.solarPowerOutputWatts/3450*100).toFixed(0)}%;"></div>
          </div>
        </div>

        <!-- Card 4: Battery Charge & Health -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🔋</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">4. Battery SoC & Health</div>
          <div class="card-main-val">
            <span id="metric-battery-soc">${e.battery.chargePercent}</span><span class="metric-unit">%</span>
            <span class="badge badge-success" style="font-size:0.75rem; margin-left:0.5rem;">${e.battery.chargingState}</span>
          </div>
          <div class="card-sub-metric">Health: <strong>${e.battery.healthPercent}%</strong> (${e.battery.healthStatus}) · 52.8V</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill fill-battery" style="width: ${e.battery.chargePercent}%;"></div>
          </div>
        </div>

        <!-- Card 5: Estimated Remaining Backup Time -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">⏱️</span>
            <span class="badge badge-source badge-ai">[AI PREDICTION]</span>
          </div>
          <div class="card-metric-title">5. Remaining Backup Time</div>
          <div class="card-main-val">
            <span id="metric-backup-hours">${e.battery.estimatedBackupHours}</span> <span class="metric-unit">Hours</span>
          </div>
          <div class="card-sub-metric">Powers Drip Pump (450W) + IoT Gateways (40W)</div>
          <span class="text-xs text-success">✓ Zero blackout risk</span>
        </div>

        <!-- Card 6: Crop Health Status -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🌱</span>
            <span class="badge badge-source badge-ai">[AI PREDICTION]</span>
          </div>
          <div class="card-metric-title">6. Crop Health Status</div>
          <div class="card-main-val" style="font-size:1.25rem;">
            <span id="metric-crop-status">${e.cropHealthStatus}</span>
          </div>
          <div class="card-sub-metric">Comfort Score: <strong>${e.cropComfortScore}/100</strong> · Light: ${e.canopyLightFraction}%</div>
          <a href="#camera" class="text-xs" style="color:var(--color-agri-fresh); font-weight:600;">View Camera Diagnostics ➔</a>
        </div>

        <!-- Card 7: Soil Moisture & Temperature -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">💧</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">7. Soil Moisture & Temp</div>
          <div class="card-main-val">
            <span id="metric-soil-moisture">${e.soilMoisture}</span><span class="metric-unit">%</span>
            <span style="font-size:1.1rem; color:var(--text-secondary); margin-left:0.5rem;">${e.soilTemperatureC}°C</span>
          </div>
          <div class="card-sub-metric">Optimal Target: 40-60% · Sensor Depth: 15cm</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill" style="width: ${e.soilMoisture}%; background:#0284C7;"></div>
          </div>
        </div>

        <!-- Card 8: Rainfall & Weather -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🌦️</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">8. Rainfall & Weather</div>
          <div class="card-main-val">
            <span id="metric-rainfall">${e.rainfallMm}</span> <span class="metric-unit">mm</span>
          </div>
          <div class="card-sub-metric">${e.weatherConditionText} · ${e.ambientTempC}°C · ${e.windSpeedKmh} km/h</div>
          <span class="text-xs text-muted">Next 3h Rain Prob: ${e.rainProbabilityNext3h}%</span>
        </div>

        <!-- Card 9: Solar Panel Angle -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">📐</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">9. Solar Panel Tilt Angle</div>
          <div class="card-main-val">
            <span id="metric-panel-angle">${e.panelAngleDeg}</span><span class="metric-unit">°</span>
          </div>
          <div class="card-sub-metric">Target: ${e.targetAngleDeg}° · Actuator: Synchronized</div>
          <div class="card-footer-controls">
            <a href="#optimize" class="btn btn-xs btn-outline">Adjust Actuator ⚙️</a>
          </div>
        </div>

        <!-- Card 10: Main Grid Electricity Status -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🔌</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">10. Main Grid Status</div>
          <div class="card-main-val" style="font-size:1.2rem;">
            <span id="metric-grid-status">${e.gridStatus}</span>
          </div>
          <div class="card-sub-metric">Export Feed: ${e.gridFeedWatts}W · Farm House Load: ${e.farmConsumptionWatts}W</div>
          <span class="badge badge-success text-xs">Bi-Directional Net Metered</span>
        </div>

        <!-- Card 11: Network Connectivity -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">📶</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">11. Network Connectivity</div>
          <div class="card-main-val" style="font-size:1.15rem;">
            <span id="metric-network-status">${e.networkConnectivity}</span>
          </div>
          <div class="card-sub-metric">Signal: ${e.signalStrengthDbm} dBm · Latency: 42ms</div>
          <span class="badge badge-success text-xs">Local Mesh Active</span>
        </div>

        <!-- Card 12: Active Automation Mode -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🤖</span>
            <span class="badge badge-source badge-ai">[AI PREDICTION]</span>
          </div>
          <div class="card-metric-title">12. Active Automation</div>
          <div class="card-main-val" style="font-size:1.25rem;">
            <span id="metric-auto-mode">${xt(e.automationMode)}</span>
          </div>
          <div class="card-sub-metric">Sweet spot balance: Crop PAR 82% | Power 2.8kW</div>
          <span class="badge badge-success text-xs">Closed-Loop AI Governor</span>
        </div>

        <!-- Card 13: Last Sensor Update Time -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">⏱️</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">13. Last Sensor Update</div>
          <div class="card-main-val">
            <span class="live-dot pulse"></span>
            <span id="metric-last-update">${r}s ago</span>
          </div>
          <div class="card-sub-metric">Update Frequency: Every 3 seconds via LoRa/CAN-bus</div>
          <span class="text-xs text-muted">Hardware Clock: ${new Date(e.lastUpdateTime).toLocaleTimeString()}</span>
        </div>

      </div>

      <!-- WEATHER-AWARE SMART IRRIGATION & POWER FLOW SECTION -->
      <div class="dash-lower-grid">
        <!-- Weather-Aware Irrigation Box -->
        <div class="card irrigation-card">
          <div class="card-header-with-action">
            <div>
              <h3>🌧️ Weather-Aware Smart Irrigation</h3>
              <p class="text-sm text-muted">Suspends irrigation if rain is predicted, preventing crop waterlogging and saving pump electricity.</p>
            </div>
            <span class="badge ${e.irrigation.pumpState===`PUMPING`?`badge-live`:e.irrigation.pumpState===`HELD_RAIN_FORECAST`?`badge-cached`:`badge-subtle`}">
              PUMP: ${e.irrigation.pumpState}
            </span>
          </div>

          <div class="irrigation-stats-strip">
            <div class="irrig-stat">
              <span class="stat-lbl">Control Mode</span>
              <strong id="irrig-mode-display">${e.irrigation.mode}</strong>
            </div>
            <div class="irrig-stat">
              <span class="stat-lbl">Soil Moisture</span>
              <strong>${e.soilMoisture}%</strong>
            </div>
            <div class="irrig-stat">
              <span class="stat-lbl">Trigger Threshold</span>
              <strong>&lt; ${e.irrigation.moistureThreshold}%</strong>
            </div>
            <div class="irrig-stat">
              <span class="stat-lbl">Pumped Today</span>
              <strong>${e.irrigation.litersPumpedToday} L</strong>
            </div>
          </div>

          <div class="irrigation-actions-bar">
            <button id="btn-irrig-mode-auto" class="btn btn-sm ${e.irrigation.mode===`AUTO`?`btn-primary`:`btn-outline`}">
              🤖 Auto (Weather-Aware)
            </button>
            <button id="btn-irrig-pump-on" class="btn btn-sm btn-outline">
              ⚡ Start Pump (Manual)
            </button>
            <button id="btn-irrig-pump-off" class="btn btn-sm btn-outline">
              ⏹️ Stop Pump
            </button>
          </div>
        </div>

        <!-- Real-Time IoT Telemetry Event Feed -->
        <div class="card activity-log-card">
          <div class="card-header-with-action">
            <h3>📡 Real-Time IoT Activity Stream</h3>
            <span class="badge badge-source badge-hardware">[LIVE BUS FEED]</span>
          </div>
          <div class="activity-feed-list" id="iot-activity-feed">
            ${bt(e.activityLogs)}
          </div>
        </div>
      </div>
    </div>
  `}function yt(e){return!e||e.length===0?``:e.map(e=>`
    <div class="alert-banner alert-${e.severity}" id="${e.id}">
      <div class="alert-icon">${e.severity===`critical`?`🚨`:e.severity===`warning`?`⚠️`:`ℹ️`}</div>
      <div class="alert-body">
        <strong>${e.title}</strong> — ${e.message}
        <span class="alert-time text-xs">(${e.time})</span>
      </div>
      <button class="btn-dismiss-alert" data-alertid="${e.id}">✕</button>
    </div>
  `).join(``)}function bt(e){return!e||e.length===0?`<div class="text-xs text-muted">Listening for incoming CAN-bus telemetry packets...</div>`:e.slice(0,10).map(e=>`
    <div class="log-entry">
      <span class="log-time">${e.time}</span>
      <span class="log-msg">${e.message}</span>
    </div>
  `).join(``)}function xt(e){return{AI_SWEET_SPOT:`✨ AI Sweet Spot (35°)`,CROP_FIRST:`🌱 Crop-First (55°)`,ENERGY_FIRST:`⚡ Solar-Max (18°)`,STORM_STOW:`🌪️ Storm Stow (0°)`,ANTI_SCORCH:`🛡️ Anti-Scorch (10°)`,BATTERY_PRIORITY:`🔋 Battery Priority (22°)`,MANUAL:`🔧 Manual Control`}[e]||e}var St={morning:{slot:`Morning (07:30 AM)`,period:`06:00 AM - 10:00 AM`,time:`Today, 07:30 AM`,camera:`Camera #1 (Zone A - South Tomato Trellis)`,crop:`Tomato (Arka Rakshak)`,mode:`Visible Spectrum (Morning Dew & Stomatal Opening)`,healthScore:94,confidence:`95.8%`,condition:`Optimal Morning Vigor`,symptoms:`None. Leaves fully turgid with early morning dew evaporation.`,leafColoration:`Vibrant Chlorophyll Emerald (#2F7D4F)`,ambientTemp:`20.4°C`,canopyTemp:`19.8°C`,lightReceived:`92% PAR (Panel tilted 45° to let morning sun through)`,type:`morning`},afternoon:{slot:`Afternoon (01:15 PM)`,period:`11:00 AM - 03:00 PM`,time:`Today, 01:15 PM`,camera:`Camera #1 (Zone A - South Tomato Trellis)`,crop:`Tomato (Arka Rakshak)`,mode:`Visible Spectrum (Peak Irradiance & Transpiration)`,healthScore:91,confidence:`94.2%`,condition:`Healthy Under-Array Shade Protection`,symptoms:`No scorch or curling. Panel partial shading reduced leaf temperature by 3.8°C.`,leafColoration:`Rich Forest Green (#276749)`,ambientTemp:`28.6°C`,canopyTemp:`24.8°C (-3.8°C cooling effect)`,lightReceived:`82% PAR (Sweet spot 35° tilt preventing photo-inhibition)`,type:`afternoon`},night:{slot:`Night (10:00 PM)`,period:`08:00 PM - 05:00 AM`,time:`Yesterday, 10:00 PM`,camera:`Camera #1 (Zone A - South Tomato Trellis)`,crop:`Tomato (Arka Rakshak)`,mode:`Infrared (IR) / Low-Light Thermal Night Vision`,healthScore:95,confidence:`96.5%`,condition:`Nocturnal Canopy Rest & Respiration`,symptoms:`Optimal thermal uniformity. No fungal condensation or cold-stress patches.`,leafColoration:`Monochrome IR Reflectance (NDVI Equivalent 0.82)`,ambientTemp:`18.2°C`,canopyTemp:`18.9°C (Soil heat retention under panels)`,lightReceived:`0% PAR (Nocturnal Dark Period)`,type:`night`}};function Ct(e=`morning`,t={}){let n=St[e]||St.morning;return`
    <div class="crop-camera-container">
      <!-- Camera Configuration Bar -->
      <div class="card camera-config-strip">
        <div class="config-item">
          <label class="config-label">📷 Active Camera Unit</label>
          <select id="camera-select" class="form-select">
            <option value="cam-1" ${t.selectedCamera===`cam-1`?`selected`:``}>Camera 1: Zone A (Tomato Trellis - South)</option>
            <option value="cam-2" ${t.selectedCamera===`cam-2`?`selected`:``}>Camera 2: Zone B (Maize Intercrop - North)</option>
            <option value="cam-3" ${t.selectedCamera===`cam-3`?`selected`:``}>Camera 3: Inverter Canopy Under-Array</option>
          </select>
        </div>
        <div class="config-item">
          <label class="config-label">🌱 Monitored Crop</label>
          <select id="camera-crop-select" class="form-select">
            <option value="tomato">Tomato (Solanum lycopersicum)</option>
            <option value="maize">Maize / Sweet Corn (Zea mays)</option>
            <option value="lettuce">Leafy Greens / Spinach</option>
          </select>
        </div>
        <div class="config-item">
          <label class="config-label">⏰ Capture Schedule</label>
          <div class="schedule-pill-group">
            <span class="badge badge-subtle">🌅 Morning: 07:30</span>
            <span class="badge badge-subtle">☀️ Afternoon: 13:15</span>
            <span class="badge badge-subtle">🌙 Night: 22:00</span>
          </div>
        </div>
      </div>

      <!-- 3-Slot Daily Timeline Navigation -->
      <div class="timeline-slot-picker">
        <button class="slot-tab-btn ${e===`morning`?`active`:``}" data-slot="morning">
          <div class="slot-icon">🌅</div>
          <div class="slot-meta">
            <div class="slot-title">1. MORNING CAPTURE</div>
            <div class="slot-time">07:30 AM (Dew & Vigor)</div>
          </div>
          <span class="slot-score-tag score-good">Score: 94</span>
        </button>

        <button class="slot-tab-btn ${e===`afternoon`?`active`:``}" data-slot="afternoon">
          <div class="slot-icon">☀️</div>
          <div class="slot-meta">
            <div class="slot-title">2. AFTERNOON CAPTURE</div>
            <div class="slot-time">01:15 PM (Anti-Scorch)</div>
          </div>
          <span class="slot-score-tag score-good">Score: 91</span>
        </button>

        <button class="slot-tab-btn ${e===`night`?`active`:``}" data-slot="night">
          <div class="slot-icon">🌙</div>
          <div class="slot-meta">
            <div class="slot-title">3. NIGHT CAPTURE (IR)</div>
            <div class="slot-time">10:00 PM (Infrared Respiration)</div>
          </div>
          <span class="slot-score-tag score-good">Score: 95</span>
        </button>
      </div>

      <!-- Main Camera Viewport & Live Assessment Grid -->
      <div class="camera-main-grid">
        <!-- Visualizer Frame -->
        <div class="card viewport-card">
          <div class="viewport-header">
            <div class="viewport-title-group">
              <span class="live-dot pulse"></span>
              <strong>${n.slot}</strong>
              <span class="badge ${e===`night`?`badge-ir`:`badge-live`}">
                ${e===`night`?`🔭 INFRARED LOW-LIGHT NV`:`📷 OPTICAL 4K SENSOR`}
              </span>
            </div>
            <div class="viewport-actions">
              <button id="btn-trigger-webcam" class="btn btn-sm btn-secondary" title="Open Local Device Camera">
                📷 Open Webcam
              </button>
              <label class="btn btn-sm btn-secondary btn-file-label" title="Upload Custom Photo">
                📁 Upload Photo
                <input type="file" id="camera-file-input" accept="image/*" style="display:none;" />
              </label>
              <button id="btn-toggle-anomaly-mask" class="btn btn-sm btn-accent" title="Highlight Leaf Diagnostic Areas">
                🎯 Toggle AI Mask
              </button>
            </div>
          </div>

          <!-- Video / Canvas Feed -->
          <div class="viewport-stage ${e===`night`?`stage-night-ir`:``}" id="camera-viewport-stage">
            <div id="webcam-live-container" style="display:none; width:100%; height:100%; position:relative;">
              <video id="live-camera-video" autoplay playsinline style="width:100%; height:100%; object-fit:cover; border-radius:12px;"></video>
              <button id="btn-snap-photo" class="btn btn-sm btn-primary" style="position:absolute; bottom:15px; left:50%; transform:translateX(-50%); z-index:10;">
                📸 Snap Frame
              </button>
            </div>

            <div id="sample-photo-container" style="width:100%; height:100%; position:relative;">
              ${wt(e)}
              <div id="ai-anomaly-overlay" class="anomaly-overlay" style="display: block;">
                ${Tt(e)}
              </div>
            </div>
          </div>

          <!-- Timestamp watermark footer -->
          <div class="viewport-footer">
            <span>📅 ${n.time}</span>
            <span>📍 ${n.camera}</span>
            <span>🌡️ Canopy Temp: <strong>${n.canopyTemp}</strong></span>
          </div>
        </div>

        <!-- AI Condition Assessment Panel -->
        <div class="card assessment-card">
          <div class="assessment-header">
            <h3>🌱 AI Leaf Condition Diagnostic</h3>
            <span class="badge badge-success">AI Confidence: ${n.confidence}</span>
          </div>

          <div class="score-hero">
            <div class="score-circle">
              <span class="score-val">${n.healthScore}</span>
              <span class="score-lbl">/ 100</span>
            </div>
            <div class="score-text">
              <div class="score-status-text">${n.condition}</div>
              <div class="score-subtext">${n.symptoms}</div>
            </div>
          </div>

          <div class="metric-tiles-grid">
            <div class="metric-tile">
              <span class="tile-icon">🍃</span>
              <div class="tile-content">
                <span class="tile-label">Leaf Chlorophyll Color</span>
                <span class="tile-val">${n.leafColoration}</span>
              </div>
            </div>

            <div class="metric-tile">
              <span class="tile-icon">☀️</span>
              <div class="tile-content">
                <span class="tile-label">Sunlight Under Solar Panels</span>
                <span class="tile-val">${n.lightReceived}</span>
              </div>
            </div>

            <div class="metric-tile">
              <span class="tile-icon">🌡️</span>
              <div class="tile-content">
                <span class="tile-label">Microclimate Thermal Offset</span>
                <span class="tile-val">${n.ambientTemp} Ambient vs ${n.canopyTemp}</span>
              </div>
            </div>

            <div class="metric-tile">
              <span class="tile-icon">💧</span>
              <div class="tile-content">
                <span class="tile-label">Stomatal Transpiration</span>
                <span class="tile-val">${e===`night`?`Resting (Nocturnal Respiration)`:`High Vigorous (Dew Active)`}</span>
              </div>
            </div>
          </div>

          <!-- Agronomic AI Recommendation -->
          <div class="agronomic-tip-box">
            <div class="tip-title">🤖 Agrivoltaic Decision Recommendation</div>
            <p class="tip-desc">
              ${e===`morning`?`Morning light penetration is optimal at 45° tilt. Early sun activates photosynthesis while avoiding ground moisture loss.`:e===`afternoon`?`Midday panel angle of 35° effectively shields crops from intense direct radiation. Leaf surface temperature is 3.8°C lower than unshaded reference plants.`:`Night infrared scan reveals uniform leaf temperature without cold spots or mildew condensation. Inverter panels act as a mild radiative blanket preventing ground frost.`}
            </p>
          </div>

          <!-- Quick Test Sample Switches -->
          <div class="sample-switcher-bar">
            <span class="text-xs text-muted">Test Diagnostics:</span>
            <button class="btn btn-xs btn-outline" id="btn-sample-healthy">Healthy Canopy</button>
            <button class="btn btn-xs btn-outline" id="btn-sample-wilting">Wilting / Sun-Scorch</button>
            <button class="btn btn-xs btn-outline" id="btn-sample-shade">Low Sunlight Etiolation</button>
          </div>
        </div>
      </div>

      <!-- Side-by-Side 3-Capture Daily Comparison Strip -->
      <div class="card timeline-strip-card">
        <h4 style="margin-bottom: 0.75rem;">📅 Daily 3-Period Evolution (Morning ➔ Afternoon ➔ Night)</h4>
        <div class="strip-columns-grid">
          <div class="strip-col ${e===`morning`?`col-active`:``}">
            <div class="strip-label">🌅 MORNING (07:30 AM)</div>
            <div class="strip-thumb strip-morning">
              <span>Dew Active · 94/100</span>
            </div>
            <p class="strip-desc">Vigorous chlorophyll response with sunrise solar tracking.</p>
          </div>
          <div class="strip-col ${e===`afternoon`?`col-active`:``}">
            <div class="strip-label">☀️ AFTERNOON (01:15 PM)</div>
            <div class="strip-thumb strip-afternoon">
              <span>Cooling Shade · 91/100</span>
            </div>
            <p class="strip-desc">Anti-scorch solar shading prevents canopy wilting.</p>
          </div>
          <div class="strip-col ${e===`night`?`col-active`:``}">
            <div class="strip-label">🌙 NIGHT IR (10:00 PM)</div>
            <div class="strip-thumb strip-night">
              <span>Infrared NV · 95/100</span>
            </div>
            <p class="strip-desc">Thermal retention beneath panels shields against night chill.</p>
          </div>
        </div>
      </div>
    </div>
  `}function wt(e){return e===`night`?`
      <svg viewBox="0 0 640 400" class="crop-photo-svg" style="background:#0F172A;">
        <defs>
          <filter id="irGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <!-- Night sky -->
        <rect width="640" height="400" fill="#0A0F1D" />
        <!-- Low-light IR Scan Lines -->
        <pattern id="scanlines" width="640" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="640" y2="0" stroke="rgba(34, 197, 94, 0.08)" stroke-width="1"/>
        </pattern>
        <rect width="640" height="400" fill="url(#scanlines)" />
        
        <!-- Overhead Solar Panel Structure silhouette in IR -->
        <rect x="80" y="30" width="480" height="45" rx="4" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.6"/>
        <line x1="160" y1="75" x2="160" y2="280" stroke="#334155" stroke-width="3"/>
        <line x1="480" y1="75" x2="480" y2="280" stroke="#334155" stroke-width="3"/>

        <!-- Ground Soil IR false-color -->
        <rect x="0" y="270" width="640" height="130" fill="#111827"/>
        
        <!-- Tomato Crop Plants Glowing in Infrared Thermal Wavelength -->
        <g filter="url(#irGlow)">
          <!-- Plant 1 -->
          <path d="M120 280 Q 140 230 110 190 Q 150 170 170 210 Q 190 260 170 280 Z" fill="#22C55E" opacity="0.85"/>
          <circle cx="130" cy="205" r="9" fill="#10B981"/>
          <circle cx="155" cy="235" r="8" fill="#10B981"/>

          <!-- Plant 2 (Center) -->
          <path d="M280 280 Q 260 210 320 160 Q 360 210 330 240 Q 350 260 340 280 Z" fill="#4ADE80" opacity="0.95"/>
          <circle cx="310" cy="180" r="11" fill="#22C55E"/>
          <circle cx="340" cy="210" r="9" fill="#22C55E"/>
          <circle cx="280" cy="230" r="10" fill="#22C55E"/>

          <!-- Plant 3 -->
          <path d="M460 280 Q 480 220 440 180 Q 500 170 510 210 Q 520 250 500 280 Z" fill="#22C55E" opacity="0.85"/>
          <circle cx="475" cy="195" r="9" fill="#10B981"/>
        </g>
        
        <!-- Thermal Legend HUD -->
        <rect x="20" y="20" width="160" height="24" rx="4" fill="rgba(0,0,0,0.7)"/>
        <text x="28" y="36" fill="#4ADE80" font-size="11" font-family="monospace">IR THERMAL: 18.9°C</text>
      </svg>
    `:e===`afternoon`?`
      <svg viewBox="0 0 640 400" class="crop-photo-svg" style="background:#E0F2FE;">
        <!-- Clear Sky -->
        <rect width="640" height="260" fill="url(#afternoonSkyGrad)"/>
        <defs>
          <linearGradient id="afternoonSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="100%" stop-color="#BAE6FD"/>
          </linearGradient>
        </defs>

        <!-- Sun Beam Angle -->
        <polygon points="320,0 200,400 480,400" fill="rgba(255,255,255,0.18)"/>

        <!-- Agri-voltaic Canopy overhead (Tilted 35°) -->
        <polygon points="120,40 520,70 510,95 110,65" fill="#1E293B" stroke="#0284C7" stroke-width="2"/>
        <rect x="130" y="45" width="85" height="18" fill="#0284C7" opacity="0.8"/>
        <rect x="225" y="52" width="85" height="18" fill="#0284C7" opacity="0.8"/>
        <rect x="320" y="59" width="85" height="18" fill="#0284C7" opacity="0.8"/>
        <rect x="415" y="66" width="85" height="18" fill="#0284C7" opacity="0.8"/>

        <!-- Structural Steel Stilts -->
        <line x1="200" y1="50" x2="200" y2="280" stroke="#64748B" stroke-width="4"/>
        <line x1="440" y1="65" x2="440" y2="280" stroke="#64748B" stroke-width="4"/>

        <!-- Ground Soil -->
        <rect x="0" y="270" width="640" height="130" fill="#451A03"/>

        <!-- Diffuse Partial Shadow On Ground (Protective microclimate) -->
        <polygon points="180,270 460,270 480,400 160,400" fill="rgba(0,0,0,0.22)"/>

        <!-- Healthy Lush Tomato Plants Under Shade -->
        <!-- Plant 1 (Left) -->
        <path d="M120 280 Q 90 230 130 180 Q 170 170 160 220 Q 180 260 160 280 Z" fill="#15803D"/>
        <circle cx="125" cy="205" r="8" fill="#DC2626"/>

        <!-- Plant 2 (Protected Center) -->
        <path d="M260 280 Q 230 200 290 150 Q 350 140 340 200 Q 360 240 330 280 Z" fill="#16A34A"/>
        <circle cx="280" cy="180" r="10" fill="#DC2626"/>
        <circle cx="315" cy="200" r="9" fill="#DC2626"/>
        <circle cx="265" cy="225" r="9" fill="#EA580C"/>

        <!-- Plant 3 (Right) -->
        <path d="M440 280 Q 420 210 470 170 Q 520 180 500 230 Q 510 260 480 280 Z" fill="#15803D"/>
        <circle cx="465" cy="195" r="9" fill="#DC2626"/>

        <!-- Sun Badge -->
        <circle cx="560" cy="50" r="28" fill="#FBBF24"/>
      </svg>
    `:`
    <svg viewBox="0 0 640 400" class="crop-photo-svg" style="background:#FEF3C7;">
      <defs>
        <linearGradient id="morningSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FDE68A"/>
          <stop offset="100%" stop-color="#FEF08A"/>
        </linearGradient>
      </defs>
      <!-- Sunrise Horizon -->
      <rect width="640" height="260" fill="url(#morningSky)"/>
      <circle cx="100" cy="130" r="45" fill="#F59E0B" opacity="0.65"/>

      <!-- Agri-voltaic Canopy in Morning Tilt (45°) -->
      <polygon points="180,60 520,30 525,55 185,85" fill="#1E293B" stroke="#0369A1" stroke-width="2"/>
      <line x1="260" y1="65" x2="260" y2="280" stroke="#64748B" stroke-width="4"/>
      <line x1="460" y1="40" x2="460" y2="280" stroke="#64748B" stroke-width="4"/>

      <!-- Soil -->
      <rect x="0" y="270" width="640" height="130" fill="#3E2723"/>

      <!-- Tomato Crop Plants In Morning Dew -->
      <path d="M140 280 Q 110 220 160 170 Q 200 160 190 210 Q 210 250 180 280 Z" fill="#2E7D32"/>
      <circle cx="150" cy="190" r="9" fill="#EF4444"/>

      <!-- Center Plant -->
      <path d="M290 280 Q 250 190 320 140 Q 380 130 370 190 Q 390 230 360 280 Z" fill="#388E3C"/>
      <circle cx="310" cy="170" r="10" fill="#EF4444"/>
      <circle cx="345" cy="190" r="9" fill="#EF4444"/>

      <!-- Right Plant -->
      <path d="M470 280 Q 440 210 490 160 Q 540 170 520 220 Q 530 250 500 280 Z" fill="#2E7D32"/>
      <circle cx="490" cy="185" r="9" fill="#EF4444"/>
    </svg>
  `}function Tt(e){return e===`night`?`
      <svg viewBox="0 0 640 400" class="overlay-svg">
        <rect x="250" y="145" width="130" height="130" fill="none" stroke="#22C55E" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="254" y="140" fill="#22C55E" font-size="11" font-weight="bold" font-family="monospace">✓ CANOPY RESPIRATION: NORMAL</text>
      </svg>
    `:`
    <svg viewBox="0 0 640 400" class="overlay-svg">
      <!-- Bounding Box Zone 1 -->
      <rect x="245" y="130" width="145" height="145" fill="none" stroke="#10B981" stroke-width="2"/>
      <rect x="245" y="110" width="135" height="20" fill="#10B981"/>
      <text x="250" y="124" fill="#FFFFFF" font-size="10" font-weight="bold">HEALTHY CANOPY: 94%</text>

      <!-- Target Point -->
      <circle cx="310" cy="170" r="4" fill="#EF4444"/>
      <line x1="310" y1="160" x2="310" y2="180" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="300" y1="170" x2="320" y2="170" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>
  `}function Et(e=`daily`){let t=O(),n=t.battery,r=t.energyLoads,i=ke();return`
    <div class="energy-view-container">
      <!-- Top Energy Metric Badges -->
      <div class="card energy-hero-strip">
        <div class="hero-stat-box">
          <span class="stat-icon">🔆</span>
          <div>
            <div class="stat-label">CURRENT POWER OUTPUT</div>
            <div class="stat-number"><strong>${t.solarPowerOutputWatts}</strong> <span class="unit">Watts</span></div>
            <span class="badge badge-hardware">[HARDWARE MPPT]</span>
          </div>
        </div>

        <div class="hero-stat-box">
          <span class="stat-icon">⚡</span>
          <div>
            <div class="stat-label">TOTAL ENERGY TODAY</div>
            <div class="stat-number"><strong>${t.solarEnergyTodayKwh}</strong> <span class="unit">kWh</span></div>
            <span class="text-xs text-muted">Daily Target: 24.5 kWh</span>
          </div>
        </div>

        <div class="hero-stat-box">
          <span class="stat-icon">🏡</span>
          <div>
            <div class="stat-label">FARM CONSUMPTION</div>
            <div class="stat-number"><strong>${r.totalConsumptionWatts}</strong> <span class="unit">Watts</span></div>
            <span class="text-xs text-success">100% Solar-Powered</span>
          </div>
        </div>

        <div class="hero-stat-box">
          <span class="stat-icon">💰</span>
          <div>
            <div class="stat-label">SAVINGS TODAY</div>
            <div class="stat-number"><strong>₹${(t.solarEnergyTodayKwh*t.electricityTariffPerKwh).toFixed(2)}</strong></div>
            <span class="text-xs text-muted">Tariff: ₹${t.electricityTariffPerKwh}/kWh</span>
          </div>
        </div>
      </div>

      <!-- Main Dual Grid: Battery System + Energy Flow Diagram -->
      <div class="energy-main-grid">

        <!-- Animated Battery System Card -->
        <div class="card battery-system-card ${n.chargePercent<=20?`border-danger`:``}">
          <div class="card-header-with-action">
            <div>
              <h3>🔋 Battery Storage Intelligence</h3>
              <p class="text-xs text-muted">LiFePO4 48V 200Ah (10.24 kWh) Agrivoltaic Dedicated Energy Bank</p>
            </div>
            <span class="badge ${n.chargePercent<=20?`badge-danger`:`badge-success`}">
              ${n.chargePercent<=20?`⚠️ LOW BATTERY INTERLOCK (≤20%)`:n.chargingState.toUpperCase()}
            </span>
          </div>

          <!-- Animated Battery Physical Cell -->
          <div class="battery-cell-wrap">
            <div class="battery-cylinder">
              <div class="battery-cap"></div>
              <div class="battery-body">
                <div class="battery-liquid ${n.chargePercent<=20?`liquid-danger`:n.chargePercent<=45?`liquid-warn`:``}" style="height: ${n.chargePercent}%;">
                  <div class="battery-wave"></div>
                </div>
                <div class="battery-pct-label">
                  <span class="large-soc">${n.chargePercent}%</span>
                  <span class="soc-sub">State of Charge</span>
                </div>
              </div>
            </div>

            <div class="battery-vital-stats">
              <div class="vital-row">
                <span class="v-lbl">Estimated Backup Runtime:</span>
                <strong class="v-val text-primary" style="font-size:1.1rem;">${n.estimatedBackupHours} Hours</strong>
              </div>
              <div class="vital-row">
                <span class="v-lbl">State of Health (SoH):</span>
                <strong class="v-val text-success">${n.healthPercent}% (${n.healthStatus})</strong>
              </div>
              <div class="vital-row">
                <span class="v-lbl">Pack Terminal Voltage:</span>
                <strong class="v-val">${n.voltage} V DC</strong>
              </div>
              <div class="vital-row">
                <span class="v-lbl">Charge / Discharge Current:</span>
                <strong class="v-val">${n.amperage} A</strong>
              </div>
              <div class="vital-row">
                <span class="v-lbl">Cell Temperature:</span>
                <strong class="v-val">${n.temperatureC} °C</strong>
              </div>
              <div class="vital-row">
                <span class="v-lbl">Lifetime Cycle Count:</span>
                <strong class="v-val">${n.cycleCount} Cycles</strong>
              </div>
            </div>
          </div>

          ${n.chargePercent<=20?`
            <div class="alert alert-danger" style="margin-top:1rem; padding:0.75rem; border-radius:8px; font-size:0.85rem; background:#FEE2E2; border:1px solid #EF4444; color:#991B1B;">
              🚨 <strong>LOW-BATTERY PROTOCOL ACTIVE (≤20%):</strong><br/>
              Current reserve: ${n.chargePercent}%. Backup runtime: ${n.estimatedBackupHours}h.<br/>
              Non-essential loads automatically shed. Seamless transfer to external grid initiated.
            </div>
          `:``}
        </div>

        <!-- Animated Energy Flow Diagram (Specification 7) -->
        <div class="card energy-flow-card">
          <div class="card-header-with-action">
            <div>
              <h3>⚡ Live Energy Flow Controller</h3>
              <p class="text-xs text-muted">Intelligent prioritization: Solar ➔ Farm Load ➔ Battery ➔ Net Grid</p>
            </div>
            <span class="badge badge-live">GRID-TIED & BALANCED</span>
          </div>

          <div class="flow-diagram-stage">
            <!-- Node: Solar Array -->
            <div class="flow-node node-solar">
              <div class="node-icon">☀️</div>
              <div class="node-name">Solar Panels</div>
              <div class="node-val">${t.solarPowerOutputWatts} W</div>
            </div>

            <!-- Flow Line: Solar to Hub -->
            <div class="flow-connector connector-horizontal">
              <div class="flow-particle particle-active"></div>
            </div>

            <!-- Central Hub: Inverter / Power Router -->
            <div class="flow-node node-hub">
              <div class="node-icon">🎛️</div>
              <div class="node-name">Smart Inverter</div>
              <div class="node-val">97.4% Eff</div>
            </div>

            <!-- Flow Line to Loads & Battery -->
            <div class="flow-connector connector-horizontal">
              <div class="flow-particle particle-active"></div>
            </div>

            <!-- Right Column: Loads, Battery, Grid -->
            <div class="flow-targets-col">
              <div class="target-row">
                <div class="flow-target-pill">
                  <span>💧 Farm Loads</span>
                  <strong>${r.totalConsumptionWatts} W</strong>
                </div>
              </div>
              <div class="target-row">
                <div class="flow-target-pill">
                  <span>🔋 Battery Stored</span>
                  <strong>${t.battery.chargingState===`Charging`?`+940 W`:`-220 W`}</strong>
                </div>
              </div>
              <div class="target-row">
                <div class="flow-target-pill">
                  <span>🔌 Grid Export/Feed</span>
                  <strong>${t.gridExportWatts} W</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Farm Load Breakdown Table (Specification 5) -->
          <div class="load-breakdown-box">
            <div class="breakdown-title">🔌 Active Sub-Circuit Load Breakdown:</div>
            <div class="breakdown-grid">
              <div class="breakdown-chip">
                <span>Drip Irrigation Pump:</span>
                <strong>${r.irrigationPumpWatts} W</strong>
              </div>
              <div class="breakdown-chip">
                <span>Microclimate Sensors & Cameras:</span>
                <strong>${r.sensorsAndCamerasWatts} W</strong>
              </div>
              <div class="breakdown-chip">
                <span>Dual-Axis Panel Actuator:</span>
                <strong>${r.panelActuatorWatts} W</strong>
              </div>
              <div class="breakdown-chip">
                <span>Farm Automation House Load:</span>
                <strong>${r.farmHouseLoadWatts} W</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Historical Energy Trends & Solar Diagnostic Check -->
      <div class="energy-lower-grid">
        <!-- Interactive Energy Trends SVG Chart -->
        <div class="card trends-card">
          <div class="card-header-with-action">
            <div>
              <h3>📈 Solar Production & Consumption Trends</h3>
              <p class="text-xs text-muted">Daily hourly curve comparing Generation (Green) vs Farm Load (Blue)</p>
            </div>
            <div class="trend-period-btns">
              <button class="btn btn-xs ${e===`daily`?`btn-primary`:`btn-outline`} btn-trend-period" data-period="daily">Daily</button>
              <button class="btn btn-xs ${e===`weekly`?`btn-primary`:`btn-outline`} btn-trend-period" data-period="weekly">Weekly</button>
              <button class="btn btn-xs ${e===`monthly`?`btn-primary`:`btn-outline`} btn-trend-period" data-period="monthly">Monthly</button>
            </div>
          </div>

          <div class="chart-container-svg">
            ${Dt(e)}
          </div>
        </div>

        <!-- False-Alarm Solar Diagnostics (Specification 8) -->
        <div class="card diagnostic-card">
          <div class="card-header-with-action">
            <h3>🔍 Solar Diagnostic & Fault Check</h3>
            <span class="badge ${i.status===`OPTIMAL`?`badge-success`:i.status===`GENUINE_FAULT`?`badge-danger`:`badge-subtle`}">
              ${i.status}
            </span>
          </div>

          <div class="diag-content-box">
            <div class="diag-reading-item">
              <span class="diag-lbl">Ambient Solar Irradiance (GHI):</span>
              <strong class="diag-val">${t.irradianceWpm2} W/m²</strong>
            </div>
            <div class="diag-reading-item">
              <span class="diag-lbl">Array Measured Power:</span>
              <strong class="diag-val">${t.solarPowerOutputWatts} W</strong>
            </div>
            <div class="diag-reading-item">
              <span class="diag-lbl">Weather Condition:</span>
              <strong class="diag-val">${t.weatherConditionText}</strong>
            </div>

            <div class="diag-assessment-banner">
              <div class="banner-title">📋 Diagnostic Finding:</div>
              <p class="banner-desc"><strong>${i.title}</strong> — ${i.details}</p>
            </div>

            <button id="btn-run-solar-diag" class="btn btn-sm btn-secondary" style="width:100%; margin-top:0.75rem;">
              🔬 Run Deep String Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function Dt(e){return`
    <svg viewBox="0 0 700 240" class="trend-svg" aria-label="Energy Production and Consumption Trend">
      <!-- Background grid lines -->
      <line x1="50" y1="40" x2="680" y2="40" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <line x1="50" y1="90" x2="680" y2="90" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <line x1="50" y1="140" x2="680" y2="140" stroke="#E2E8F0" stroke-dasharray="4 4"/>
      <line x1="50" y1="190" x2="680" y2="190" stroke="#CBD5E1"/>

      <!-- Y-Axis labels -->
      <text x="40" y="45" font-size="10" fill="#64748B" text-anchor="end">3.5 kW</text>
      <text x="40" y="95" font-size="10" fill="#64748B" text-anchor="end">2.5 kW</text>
      <text x="40" y="145" font-size="10" fill="#64748B" text-anchor="end">1.0 kW</text>
      <text x="40" y="195" font-size="10" fill="#64748B" text-anchor="end">0 kW</text>

      <!-- Solar Generation Curve (Green Filled Area) -->
      <defs>
        <linearGradient id="solarAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22C55E" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#22C55E" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      <path d="M 60,190 Q 180,185 240,110 T 380,48 T 520,120 T 660,190 Z" fill="url(#solarAreaGrad)"/>
      <path d="M 60,190 Q 180,185 240,110 T 380,48 T 520,120 T 660,190" fill="none" stroke="#16A34A" stroke-width="3"/>

      <!-- Farm Load Curve (Blue Line) -->
      <path d="M 60,165 Q 160,160 260,145 T 400,135 T 520,150 T 660,160" fill="none" stroke="#0284C7" stroke-width="2.5" stroke-dasharray="5 3"/>

      <!-- X-Axis time labels -->
      <text x="60" y="210" font-size="10" fill="#64748B" text-anchor="middle">06:00</text>
      <text x="180" y="210" font-size="10" fill="#64748B" text-anchor="middle">09:00</text>
      <text x="320" y="210" font-size="10" fill="#64748B" text-anchor="middle">12:00</text>
      <text x="460" y="210" font-size="10" fill="#64748B" text-anchor="middle">15:00</text>
      <text x="600" y="210" font-size="10" fill="#64748B" text-anchor="middle">18:00</text>

      <!-- Legend -->
      <circle cx="240" cy="18" r="4" fill="#16A34A"/>
      <text x="250" y="21" font-size="10" fill="#334155" font-weight="bold">Solar Generation (kWh)</text>

      <line x1="400" y1="18" x2="420" y2="18" stroke="#0284C7" stroke-width="2" stroke-dasharray="3 2"/>
      <text x="428" y="21" font-size="10" fill="#334155" font-weight="bold">Farm Load (Watts)</text>
    </svg>
  `}function Ot(){let e=O(),t=e.panelAngleDeg,n=e.targetAngleDeg,r=e.isEmergencyStopped,i=e.isMoving,a=e.automationMode,s=Math.round(t/75*450+50),c=Math.round(Math.cos(t*Math.PI/180)*68),l=Math.round(100-c*.75),u=Math.round(350+t/75*650),d=(Math.sin(t*Math.PI/180)*1.1+.12).toFixed(2),f=Math.round(.6125*(e.windSpeedKmh/3.6)**2*8.5*parseFloat(d));return`
    <div class="positioning-view-container">
      <!-- Actuator Header Strip -->
      <div class="card positioning-hero-card ${r?`hero-stopped`:``}">
        <div class="pos-hero-left">
          <div class="actuator-dial-badge ${r?`dial-danger`:i?`dial-moving`:``}">
            <span class="dial-val">${t.toFixed(1)}°</span>
            <span class="dial-lbl">${o(`panelAngle`,`CURRENT TILT`)}</span>
          </div>
          <div>
            <div class="pos-status-title">
              <strong>${r?`🛑 `+o(`posEstopActive`,`EMERGENCY STOP ENGAGED`):`⚡ DUAL-AXIS AGRIVOLTAIC ACTUATOR #01`}</strong>
              <span class="badge ${r?`badge-danger`:i?`badge-warning`:`badge-success`}">
                ${r?`INTERLOCKED & HALTED`:i?`⚡ ACTUATING PISTON...`:`✓ OPTICAL ENCODER LOCKED`}
              </span>
            </div>
            <p class="text-xs text-muted" style="margin-top:0.25rem;">
              Target: <strong class="text-primary">${n.toFixed(1)}°</strong> · Mechanical Limits: 0.0° (Flat Stow) to 75.0° (Max Steep) · Stroke: <strong>${s} mm / 500 mm</strong>
            </p>
          </div>
        </div>

        <div class="pos-hero-right">
          ${r?`
            <button id="btn-reset-estop" class="btn btn-sm btn-primary">
              ✓ Reset E-Stop Safety Interlock
            </button>
          `:`
            <button id="btn-trigger-estop" class="btn btn-sm btn-danger btn-estop">
              🛑 EMERGENCY STOP (E-STOP)
            </button>
          `}
        </div>
      </div>

      <!-- Main Interactive Display: 3D Agrivoltaic Physical Kinematics Stage -->
      <div class="card visualizer-master-card">
        <div class="card-header-with-action">
          <div class="vis-header-left">
            <div class="pulse-indicator-dot ${i?`moving`:`locked`}"></div>
            <div>
              <h3>📐 Physical Agrivoltaics Kinematics & Crop Light Simulator</h3>
              <p class="text-xs text-muted">
                Interactive dual-axis solar canopy overhead with ground crops, extending hydraulic piston, and live shadow projection.
              </p>
            </div>
          </div>
          <div class="vis-header-badges">
            <span class="badge badge-hardware">[OPTICAL ENCODER ±0.05°]</span>
            <span class="badge badge-accent">MODE: ${a}</span>
          </div>
        </div>

        <!-- Master SVG Kinematics Stage -->
        <div class="agrivoltaic-stage-wrap">
          ${kt(t,n,a,s,c,u,e)}
        </div>

        <!-- Telemetry HUD Bar (Below SVG) -->
        <div class="kinematics-hud-bar">
          <div class="hud-pill">
            <span class="hud-icon">📐</span>
            <div class="hud-data">
              <span class="hud-lbl">Panel Tilt Angle</span>
              <strong class="hud-val text-accent">${t.toFixed(1)}°</strong>
              <small class="hud-sub">Target: ${n.toFixed(1)}°</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">🔩</span>
            <div class="hud-data">
              <span class="hud-lbl">Hydraulic Piston Stroke</span>
              <strong class="hud-val text-primary">${s} mm</strong>
              <small class="hud-sub">Load: 1.84 kN Thrust</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">🌱</span>
            <div class="hud-data">
              <span class="hud-lbl">Crop PAR Light</span>
              <strong class="hud-val text-success">${u} µmol</strong>
              <small class="hud-sub">${l}% Sunlight Received</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">🌾</span>
            <div class="hud-data">
              <span class="hud-lbl">Ground Shading Area</span>
              <strong class="hud-val">${c}%</strong>
              <small class="hud-sub">Root Moisture: ${e.soilMoisture}%</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">💨</span>
            <div class="hud-data">
              <span class="hud-lbl">Wind Load On Array</span>
              <strong class="hud-val ${f>800?`text-danger`:``}">${f} N</strong>
              <small class="hud-sub">Drag Coeff: Cd ${d}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Cockpit Instruments & Control Center Grid -->
      <div class="pos-main-grid">

        <!-- Left: Dual Precision Gauges + Live Sensors -->
        <div class="card gauges-sensors-card">
          <div class="card-header-clean">
            <h3>🧭 Dual Precision Actuator Telemetry Cockpit</h3>
            <span class="badge badge-info">Closed-Loop Servo</span>
          </div>

          <div class="cockpit-gauges-row">
            <!-- Semi-Circular Elevation Dial -->
            <div class="gauge-box">
              <div class="gauge-title">TILT ELEVATION ANGLE (0°–75°)</div>
              ${At(t,n)}
              <div class="gauge-footer-tags">
                <span class="tag-zone stow">0° Stow</span>
                <span class="tag-zone opt">35° AI Opt</span>
                <span class="tag-zone steep">75° Max</span>
              </div>
            </div>

            <!-- Azimuth Compass -->
            <div class="gauge-box">
              <div class="gauge-title">SOLAR AZIMUTH TRACKER (360°)</div>
              ${jt(198.5)}
              <div class="gauge-footer-tags">
                <span class="tag-zone azimuth">Azimuth: 198.5° SSW</span>
                <span class="tag-zone">Tracking Sol</span>
              </div>
            </div>
          </div>

          <!-- Real-Time Environmental Sensors Feeds -->
          <div class="sensor-feed-strip" style="margin-top:1.25rem;">
            <div class="sensor-feed-pill">
              <span class="s-icon">☀️</span>
              <div>
                <div class="s-label">Solar Irradiance (GHI)</div>
                <strong>${e.irradianceWpm2} W/m²</strong>
              </div>
            </div>

            <div class="sensor-feed-pill">
              <span class="s-icon">🌧️</span>
              <div>
                <div class="s-label">Precipitation Rain Gauge</div>
                <strong>${e.rainfallMm} mm</strong>
              </div>
            </div>

            <div class="sensor-feed-pill">
              <span class="s-icon">💨</span>
              <div>
                <div class="s-label">Anemometer Wind Speed</div>
                <strong>${e.windSpeedKmh} km/h</strong>
              </div>
            </div>

            <div class="sensor-feed-pill">
              <span class="s-icon">💧</span>
              <div>
                <div class="s-label">Soil Root Moisture</div>
                <strong>${e.soilMoisture}% TDR</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Multi-Mode Governor & Tactile Angle Controller -->
        <div class="card mode-governor-card">
          <div class="card-header-clean">
            <h3>⚙️ Closed-Loop Operating Mode Governor</h3>
            <span class="badge badge-hardware">Safety Interlocked</span>
          </div>

          <div class="mode-buttons-stack">
            <!-- Mode 1: AI Sweet Spot -->
            <button class="mode-select-card ${a===`AI_SWEET_SPOT`?`selected`:``}" data-modename="AI_SWEET_SPOT">
              <div class="m-card-header">
                <span class="mode-led ${a===`AI_SWEET_SPOT`?`led-on-green`:``}"></span>
                <span class="m-icon">✨</span>
                <strong>AI Sweet Spot Balanced (35.0°)</strong>
              </div>
              <p class="m-card-desc">
                Pareto optimal balance: Generates 2,840W electricity while streaming 940 µmol PAR sunlight directly to tomato flowers.
              </p>
            </button>

            <!-- Mode 2: Rain Runoff -->
            <button class="mode-select-card ${a===`RAIN_RUNOFF`?`selected`:``}" data-modename="RAIN_RUNOFF">
              <div class="m-card-header">
                <span class="mode-led ${a===`RAIN_RUNOFF`?`led-on-blue`:``}"></span>
                <span class="m-icon">🌧️</span>
                <strong>Rain Runoff Drainage Mode (${e.schedulerConfig.rainAngleDeg}°)</strong>
              </div>
              <p class="m-card-desc">
                Tilts to ${e.schedulerConfig.rainAngleDeg}° to guide heavy rainwater away from root zones into swales, preventing erosion.
              </p>
            </button>

            <!-- Mode 3: Storm Stow -->
            <button class="mode-select-card ${a===`STORM_STOW`?`selected`:``}" data-modename="STORM_STOW">
              <div class="m-card-header">
                <span class="mode-led ${a===`STORM_STOW`?`led-on-red`:``}"></span>
                <span class="m-icon">🌪️</span>
                <strong>Storm Protective Stow (0.0° Flat)</strong>
              </div>
              <p class="m-card-desc">
                Locks array flat against wind shear gusts (&gt;45 km/h). Reduces mechanical drag by 86% and locks actuator brakes.
              </p>
            </button>

            <!-- Mode 4: Manual Override -->
            <button class="mode-select-card ${a===`MANUAL`?`selected`:``}" data-modename="MANUAL">
              <div class="m-card-header">
                <span class="mode-led ${a===`MANUAL`?`led-on-amber`:``}"></span>
                <span class="m-icon">🛠️</span>
                <strong>Manual Operator Override</strong>
              </div>
              <p class="m-card-desc">
                Manual motor positioning for maintenance, washing, or harvesting clearances. Requires security challenge.
              </p>
            </button>
          </div>

          <!-- Quick Angle Presets & Manual Slider -->
          <div class="manual-override-box">
            <div class="override-top-row">
              <label for="manual-actuator-slider" style="font-weight:800; font-size:0.88rem;">
                🎯 Quick Angle Presets & Tactile Slider:
              </label>
              <span id="manual-slider-val" class="angle-badge-value">${t.toFixed(1)}°</span>
            </div>

            <!-- Instant One-Click Presets -->
            <div class="angle-presets-grid">
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="0">🌪️ 0° Stow</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="15">🌅 15° AM</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="30">🌧️ 30° Rain</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="35">✨ 35° Opt</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="50">☀️ 50° PM</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="70">🌾 70° PAR</button>
            </div>

            <input
              type="range"
              id="manual-actuator-slider"
              min="0"
              max="75"
              step="0.5"
              value="${t}"
              class="slider w-100"
              style="margin: 0.85rem 0 0.4rem 0;"
            />

            <div class="slider-scale-ticks">
              <span>0° (Flat Stow)</span>
              <span>30° (Rain)</span>
              <span>35° (Sweet Spot)</span>
              <span>75° (Max Steep)</span>
            </div>

            <button id="btn-apply-manual-angle" class="btn btn-sm btn-primary w-100" style="margin-top:0.85rem;">
              🔒 Apply Angle Override (Security Re-Auth Required)
            </button>
          </div>
        </div>
      </div>

      <!-- Movement History Table (Specification 6) -->
      <div class="card history-card" style="margin-top:1.25rem;">
        <div class="card-header-with-action">
          <div>
            <h3>📜 Actuator Movement & Positioning Audit Trail</h3>
            <p class="text-xs text-muted">Complete closed-loop encoder log of automatic triggers, sensor thresholds, and manual adjustments.</p>
          </div>
          <span class="badge badge-subtle">Recorded Events: ${e.actuatorHistory.length}</span>
        </div>

        <div class="audit-table-wrap">
          <table class="audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Tilted Angle</th>
                <th>Hydraulic Stroke</th>
                <th>Environmental Trigger Rationale</th>
                <th>Actuator Encoder Status</th>
              </tr>
            </thead>
            <tbody>
              ${e.actuatorHistory.map(e=>`
                <tr>
                  <td class="text-xs font-mono">${e.time}</td>
                  <td><strong class="text-primary">${e.angle}°</strong></td>
                  <td class="text-xs font-mono">${Math.round(e.angle/75*450+50)} mm</td>
                  <td class="text-sm">${e.reason}</td>
                  <td><span class="badge badge-success">✓ Encoder Locked</span></td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function kt(e,t,n,r,i,a,o){let s=e*Math.PI/180;Math.PI-.45-s;let c=400-Math.cos(s)*90,l=210-Math.sin(s)*90+20,u=Math.max(120,Math.cos(s)*380),d=400-u/2+Math.sin(s)*40,f=Math.max(25,75-e*.4),p=400+Math.cos(f*Math.PI/180)*310,m=90-Math.sin(f*Math.PI/180)*40;return`
    <svg viewBox="0 0 800 480" class="agrivoltaic-master-svg" aria-label="3D Agrivoltaic Kinematics Stage">
      <defs>
        <!-- Sky Gradient -->
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0F2438"/>
          <stop offset="60%" stop-color="#163C4D"/>
          <stop offset="100%" stop-color="#2D5A46"/>
        </linearGradient>

        <!-- Ground Soil Gradient -->
        <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5C4033"/>
          <stop offset="30%" stop-color="#4A3525"/>
          <stop offset="100%" stop-color="#2D2018"/>
        </linearGradient>

        <!-- Steel Superstructure Mast Gradient -->
        <linearGradient id="steelMastGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#64748B"/>
          <stop offset="50%" stop-color="#94A3B8"/>
          <stop offset="100%" stop-color="#475569"/>
        </linearGradient>

        <!-- Chrome Piston Gradient -->
        <linearGradient id="chromePistonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E2E8F0"/>
          <stop offset="45%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#94A3B8"/>
        </linearGradient>

        <!-- Solar Bifacial Glass Surface Gradient -->
        <linearGradient id="bifacialGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284C7"/>
          <stop offset="40%" stop-color="#0369A1"/>
          <stop offset="85%" stop-color="#075985"/>
          <stop offset="100%" stop-color="#0C4A6E"/>
        </linearGradient>

        <!-- Solar Cells Sheen Filter -->
        <linearGradient id="sunbeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.45)"/>
          <stop offset="100%" stop-color="rgba(245, 158, 11, 0.0)"/>
        </linearGradient>

        <!-- Crop Shadow Filter -->
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(0, 0, 0, 0.65)"/>
          <stop offset="80%" stop-color="rgba(0, 0, 0, 0.35)"/>
          <stop offset="100%" stop-color="rgba(0, 0, 0, 0)"/>
        </radialGradient>
      </defs>

      <!-- Background Atmosphere -->
      <rect x="0" y="0" width="800" height="480" fill="url(#skyGrad)"/>

      <!-- Ambient Grid Background Lines -->
      <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
        <line x1="0" y1="120" x2="800" y2="120"/>
        <line x1="0" y1="240" x2="800" y2="240"/>
        <line x1="0" y1="360" x2="800" y2="360"/>
        <line x1="200" y1="0" x2="200" y2="480"/>
        <line x1="400" y1="0" x2="400" y2="480"/>
        <line x1="600" y1="0" x2="600" y2="480"/>
      </g>

      <!-- Ground Soil Layer (y = 420 to 480) -->
      <rect x="0" y="420" width="800" height="60" fill="url(#soilGrad)"/>
      <line x1="0" y1="420" x2="800" y2="420" stroke="#78350F" stroke-width="2"/>

      <!-- Dynamic Ground Shadow projected beneath panel -->
      <ellipse cx="${d+u/2}" cy="425" rx="${u/2}" ry="14" fill="url(#shadowGrad)"/>

      <!-- Tomato Crops Rows Beneath Elevated Panel -->
      <g class="crop-canopy-rows">
        ${H(80,420,1)}
        ${H(170,420,1.1)}
        ${H(260,420,1.2)}
        ${H(350,420,1.25)}
        ${H(440,420,1.25)}
        ${H(530,420,1.2)}
        ${H(620,420,1.1)}
        ${H(710,420,1)}
      </g>

      <!-- Structural Ground Foundation Concrete Footings -->
      <rect x="360" y="410" width="80" height="15" rx="3" fill="#64748B" stroke="#334155" stroke-width="1.5"/>
      <circle cx="370" cy="417" r="3" fill="#1E293B"/>
      <circle cx="430" cy="417" r="3" fill="#1E293B"/>

      <!-- Elevated 3.5m Steel Stanchion Post (H-Beam Mast) -->
      <rect x="388" y="210" width="24" height="202" fill="url(#steelMastGrad)" stroke="#334155" stroke-width="1.5"/>
      <!-- Diagonal Gusset Bracing -->
      <line x1="388" y1="360" x2="350" y2="410" stroke="#475569" stroke-width="4"/>
      <line x1="412" y1="360" x2="450" y2="410" stroke="#475569" stroke-width="4"/>
      <!-- Stanchion Height Tag -->
      <text x="424" y="320" font-size="10" fill="#94A3B8" font-family="monospace">3.5m Agrivoltaic Clearance</text>

      <!-- Radiant Sun in Sky -->
      <g transform="translate(${p}, ${m})">
        <!-- Sun Corona -->
        <circle cx="0" cy="0" r="36" fill="rgba(245, 158, 11, 0.25)"/>
        <circle cx="0" cy="0" r="24" fill="rgba(251, 191, 36, 0.5)"/>
        <circle cx="0" cy="0" r="16" fill="#FDE047"/>
        <!-- Sun Rays -->
        <g stroke="#F59E0B" stroke-width="2" opacity="0.75">
          <line x1="0" y1="-26" x2="0" y2="-34"/>
          <line x1="0" y1="26" x2="0" y2="34"/>
          <line x1="-26" y1="0" x2="-34" y2="0"/>
          <line x1="26" y1="0" x2="34" y2="0"/>
          <line x1="-18" y1="-18" x2="-24" y2="-24"/>
          <line x1="18" y1="18" x2="24" y2="24"/>
          <line x1="-18" y1="18" x2="-24" y2="24"/>
          <line x1="18" y1="-18" x2="24" y2="-24"/>
        </g>
      </g>

      <!-- Sun Beams shining onto array surface -->
      <polygon points="${p},${m} ${400-Math.cos(s)*190},${210-Math.sin(s)*190} ${400+Math.cos(s)*190},${210+Math.sin(s)*190}" fill="url(#sunbeamGrad)" opacity="0.5"/>

      <!-- Telescoping Hydraulic Linear Actuator Piston -->
      <!-- Piston Lower Mast Pivot Anchor (376, 340) -->
      <circle cx="376" cy="340" r="6" fill="#1E293B" stroke="#94A3B8" stroke-width="2"/>
      <!-- Outer Hydraulic Cylinder Tube -->
      <line x1="376" y1="340" x2="${376+(c-376)*.5}" y2="${340+(l-340)*.5}" stroke="#1E293B" stroke-width="14" stroke-linecap="round"/>
      <line x1="376" y1="340" x2="${376+(c-376)*.5}" y2="${340+(l-340)*.5}" stroke="#475569" stroke-width="10" stroke-linecap="round"/>
      <!-- Extending Chrome Rod -->
      <line x1="${376+(c-376)*.45}" y1="${340+(l-340)*.45}" x2="${c}" y2="${l}" stroke="url(#chromePistonGrad)" stroke-width="6" stroke-linecap="round"/>
      <!-- Piston Rod End Clevis Joint -->
      <circle cx="${c}" cy="${l}" r="5" fill="#F8FAFC" stroke="#0F172A" stroke-width="2"/>

      <!-- Central Pivot Bearing (400, 210) -->
      <circle cx="400" cy="210" r="14" fill="#1E293B" stroke="#CBD5E1" stroke-width="2.5"/>
      <circle cx="400" cy="210" r="6" fill="#475569"/>

      <!-- ROTATING SOLAR ARRAY (Tilted by -angle around cx, cy) -->
      <g transform="rotate(-${e}, 400, 210)">
        <!-- Structural Torque Tube Backing -->
        <rect x="190" y="202" width="420" height="16" rx="4" fill="#334155" stroke="#1E293B" stroke-width="2"/>

        <!-- Underside Bifacial Reflective Layer -->
        <rect x="200" y="216" width="400" height="5" fill="#38BDF8" opacity="0.6"/>

        <!-- High-Efficiency Bifacial Solar Module -->
        <rect x="200" y="190" width="400" height="24" rx="4" fill="url(#bifacialGlassGrad)" stroke="#0284C7" stroke-width="2.5"/>

        <!-- Photovoltaic Silicon Cell Grid Lines -->
        <g stroke="#38BDF8" stroke-width="1.5" opacity="0.75">
          <line x1="240" y1="190" x2="240" y2="214"/>
          <line x1="280" y1="190" x2="280" y2="214"/>
          <line x1="320" y1="190" x2="320" y2="214"/>
          <line x1="360" y1="190" x2="360" y2="214"/>
          <line x1="400" y1="190" x2="400" y2="214"/>
          <line x1="440" y1="190" x2="440" y2="214"/>
          <line x1="480" y1="190" x2="480" y2="214"/>
          <line x1="520" y1="190" x2="520" y2="214"/>
          <line x1="560" y1="190" x2="560" y2="214"/>
        </g>

        <!-- Anodized Aluminum Clamp Flanges -->
        <rect x="196" y="188" width="8" height="28" rx="2" fill="#E2E8F0"/>
        <rect x="596" y="188" width="8" height="28" rx="2" fill="#E2E8F0"/>

        <!-- Solar Normal Vector (Optical perpendicular indicator) -->
        <line x1="400" y1="190" x2="400" y2="100" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="5 3"/>
        <polygon points="400,90 395,102 405,102" fill="#F59E0B"/>
        <text x="412" y="125" font-size="11" fill="#F59E0B" font-weight="bold">Optic Normal ➔</text>
      </g>

      <!-- TARGET GHOST OUTLINE (if different from current angle) -->
      ${Math.abs(e-t)>.8?`
        <g transform="rotate(-${t}, 400, 210)" opacity="0.38">
          <rect x="200" y="190" width="400" height="24" rx="4" fill="#94A3B8" stroke="#F8FAFC" stroke-width="2" stroke-dasharray="6 3"/>
          <text x="400" y="180" font-size="12" fill="#FFFFFF" text-anchor="middle" font-weight="bold">TARGET (${t.toFixed(1)}°)</text>
        </g>
      `:``}

      <!-- MODE-SPECIFIC VISUAL FX OVERLAYS -->
      <!-- 1. RAIN RUNOFF MODE: Water droplets draining down glass into anti-erosion swale -->
      ${n===`RAIN_RUNOFF`||o.rainfallMm>2?`
        <g class="rain-fx-layer">
          <!-- Rain streaks in air -->
          <line x1="280" y1="60" x2="270" y2="140" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <line x1="360" y1="40" x2="350" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <line x1="480" y1="50" x2="470" y2="130" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <line x1="560" y1="70" x2="550" y2="150" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <!-- Droplets on panel drainage edge -->
          <circle cx="${400-Math.cos(s)*195}" cy="${210-Math.sin(s)*195}" r="4" fill="#38BDF8"/>
          <circle cx="${400-Math.cos(s)*195-6}" cy="${210-Math.sin(s)*195+16}" r="3" fill="#38BDF8" opacity="0.7"/>
          <!-- Water runoff banner tag -->
          <rect x="60" y="385" width="220" height="24" rx="4" fill="rgba(14, 165, 233, 0.9)"/>
          <text x="170" y="401" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">
            💧 Directed Runoff ➔ Anti-Erosion Swale
          </text>
        </g>
      `:``}

      <!-- 2. STORM STOW MODE: Aerodynamic laminar flow arrows skimming flat horizontal profile -->
      ${n===`STORM_STOW`||e<4?`
        <g class="wind-stow-fx">
          <!-- Wind streamlines over horizontal module -->
          <path d="M 120,175 Q 400,165 680,175" fill="none" stroke="#22D3EE" stroke-width="3" stroke-dasharray="12 6" opacity="0.85"/>
          <path d="M 100,160 Q 400,145 700,160" fill="none" stroke="#67E8F9" stroke-width="2" stroke-dasharray="8 6" opacity="0.6"/>
          <!-- Laminar drag tag -->
          <rect x="520" y="150" width="230" height="26" rx="4" fill="rgba(6, 182, 212, 0.9)"/>
          <text x="635" y="167" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">
            🌪️ Flat Laminar Stow (Drag -86%)
          </text>
        </g>
      `:``}

      <!-- 3. AI SWEET SPOT MODE: Optimal Photosynthetic and Photovoltaic Energy Balance -->
      ${n===`AI_SWEET_SPOT`?`
        <g class="sweetspot-fx">
          <rect x="540" y="55" width="230" height="30" rx="6" fill="rgba(34, 197, 94, 0.9)"/>
          <text x="655" y="74" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">
            ✨ AI SWEET SPOT (PAR: ${a} µmol)
          </text>
        </g>
      `:``}

      <!-- Primary Angle HUD Centerpiece Callout -->
      <g transform="translate(60, 45)">
        <rect x="0" y="0" width="165" height="46" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="14" y="20" font-size="10" fill="#94A3B8" font-weight="bold" font-family="monospace">OPTICAL POSITION</text>
        <text x="14" y="38" font-size="18" fill="#38BDF8" font-weight="900" font-family="monospace">${e.toFixed(1)}° TILT</text>
      </g>
    </svg>
  `}function H(e,t,n=1){return`
    <g transform="translate(${e}, ${t}) scale(${n})">
      <!-- Soil mound -->
      <ellipse cx="0" cy="0" rx="35" ry="6" fill="#3E2723"/>
      <!-- Green foliage clusters -->
      <circle cx="-14" cy="-18" r="16" fill="#2E7D32"/>
      <circle cx="14" cy="-18" r="16" fill="#2E7D32"/>
      <circle cx="0" cy="-28" r="18" fill="#388E3C"/>
      <circle cx="-8" cy="-36" r="12" fill="#43A047"/>
      <circle cx="8" cy="-36" r="12" fill="#4CAF50"/>
      <!-- Tomato fruits -->
      <circle cx="-10" cy="-14" r="5" fill="#E53935"/>
      <circle cx="12" cy="-12" r="5.5" fill="#E53935"/>
      <circle cx="2" cy="-22" r="4.5" fill="#EF5350"/>
      <!-- Leaf stems -->
      <path d="M 0,0 L 0,-24" stroke="#1B5E20" stroke-width="2.5"/>
    </g>
  `}function At(e,t){return e/75*110,`
    <svg viewBox="0 0 200 125" class="elevation-gauge-svg">
      <!-- Outer Track Background -->
      <path d="M 25,100 A 75,75 0 0,1 175,100" fill="none" stroke="#334155" stroke-width="12" stroke-linecap="round"/>

      <!-- Safe/Rain/Sweet Spot Zone Highlights -->
      <!-- Stow (0°-5°): Cyan -->
      <path d="M 25,100 A 75,75 0 0,1 32,80" fill="none" stroke="#06B6D4" stroke-width="12"/>
      <!-- Sweet Spot (25°-40°): Green -->
      <path d="M 60,45 A 75,75 0 0,1 98,26" fill="none" stroke="#22C55E" stroke-width="12"/>
      <!-- Rain (28°-32°): Blue -->
      <path d="M 72,38 A 75,75 0 0,1 84,31" fill="none" stroke="#0284C7" stroke-width="12"/>

      <!-- Needle Pointer -->
      <g transform="rotate(${180-(180-e/75*110)}, 100, 100)">
        <polygon points="100,32 96,100 104,100" fill="#F7C948"/>
        <circle cx="100" cy="100" r="8" fill="#1E293B" stroke="#F7C948" stroke-width="2.5"/>
      </g>

      <!-- Center Digital Degree Display -->
      <text x="100" y="88" font-size="18" fill="#F8FAFC" font-weight="900" text-anchor="middle" font-family="monospace">
        ${e.toFixed(1)}°
      </text>
      <text x="100" y="104" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">
        ACTUATOR TILT
      </text>
    </svg>
  `}function jt(e=198.5){return`
    <svg viewBox="0 0 200 125" class="azimuth-compass-svg">
      <!-- Compass Outer Dial Ring -->
      <circle cx="100" cy="62" r="50" fill="none" stroke="#334155" stroke-width="2.5"/>
      <circle cx="100" cy="62" r="42" fill="none" stroke="#1E293B" stroke-width="1" stroke-dasharray="3 3"/>

      <!-- Cardinal Direction Ticks -->
      <text x="100" y="24" font-size="9" fill="#EF4444" font-weight="bold" text-anchor="middle">N</text>
      <text x="150" y="65" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">E</text>
      <text x="100" y="106" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">S</text>
      <text x="50" y="65" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">W</text>

      <!-- Azimuth Vector Needle (Rotated around 100, 62) -->
      <g transform="rotate(${e}, 100, 62)">
        <polygon points="100,24 96,62 104,62" fill="#F59E0B"/>
        <polygon points="100,98 97,62 103,62" fill="#64748B"/>
        <circle cx="100" cy="62" r="5" fill="#0F172A"/>
      </g>

      <!-- Digital Readout -->
      <text x="100" y="120" font-size="10" fill="#38BDF8" font-weight="bold" text-anchor="middle" font-family="monospace">
        ${e}° SSW
      </text>
    </svg>
  `}function Mt(e=`all`){let t=O().activeAlerts,n=e===`all`?t:t.filter(t=>t.status===e),r=t.filter(e=>e.status===`unresolved`).length;return`
    <div class="alerts-view-container">
      <!-- Alerts Header Strip -->
      <div class="card alerts-hero-card">
        <div class="alerts-hero-left">
          <div class="alerts-bell-badge ${r>0?`bell-alarm`:``}">
            <span class="bell-icon">🔔</span>
            ${r>0?`<span class="alarm-count">${r}</span>`:``}
          </div>
          <div>
            <h2>Emergency Alerts & Incident Center</h2>
            <p class="text-sm text-muted">
              Real-time monitoring across solar inverters, battery safety, actuators, weather sensors, and crop health.
            </p>
          </div>
        </div>

        <div class="alerts-hero-right">
          <button id="btn-alerts-voice-test" class="btn btn-xs btn-accent" style="margin-bottom: 0.5rem;" title="Test Multilingual Emergency Voice Broadcast">
            🔊 Test Voice Alert
          </button>
          <div class="alert-filter-pills">
            <button class="btn btn-xs ${e===`all`?`btn-primary`:`btn-outline`} btn-alert-filter" data-filter="all">All (${t.length})</button>
            <button class="btn btn-xs ${e===`unresolved`?`btn-primary`:`btn-outline`} btn-alert-filter" data-filter="unresolved">Unresolved (${r})</button>
            <button class="btn btn-xs ${e===`acknowledged`?`btn-primary`:`btn-outline`} btn-alert-filter" data-filter="acknowledged">Acknowledged</button>
            <button class="btn btn-xs ${e===`resolved`?`btn-primary`:`btn-outline`} btn-alert-filter" data-filter="resolved">Resolved</button>
          </div>
        </div>
      </div>

      <!-- Main Alerts Cards List -->
      <div class="alerts-cards-list">
        ${n.length===0?`
          <div class="card text-center" style="padding: 2.5rem;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🟢</div>
            <h3>No Active Alerts Found</h3>
            <p class="text-muted text-sm">All agri-voltaic subsystems, battery cells, and inverters operating within nominal safety margins.</p>
          </div>
        `:n.map(e=>`
          <div class="card alert-detail-card card-severity-${e.severity} ${e.status===`resolved`?`card-resolved`:``}">
            <div class="alert-top-row">
              <div class="alert-title-group">
                <span class="alert-symbol">${e.severity===`critical`?`🚨`:e.severity===`warning`?`⚠️`:`ℹ️`}</span>
                <div>
                  <h3 class="alert-name">${e.title}</h3>
                  <div class="alert-meta-line">
                    <span class="badge ${e.severity===`critical`?`badge-danger`:e.severity===`warning`?`badge-warning`:`badge-subtle`}">${e.severity.toUpperCase()}</span>
                    <span>🕒 ${e.time}</span>
                    <span>📂 Category: <strong>${e.category||`SYSTEM`}</strong></span>
                  </div>
                </div>
              </div>

              <div class="alert-status-badge-wrap">
                <span class="badge badge-status-${e.status}">
                  ${e.status===`resolved`?`✓ RESOLVED`:e.status===`acknowledged`?`👁️ ACKNOWLEDGED`:`🔴 UNRESOLVED`}
                </span>
              </div>
            </div>

            <p class="alert-desc-text">${e.message}</p>

            <!-- Technical Detail Grid -->
            <div class="alert-specs-grid">
              <div class="spec-cell">
                <span class="spec-label">Affected Component:</span>
                <strong>${e.affectedComponent||`Central Agrivoltaic Inverter Bus`}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Operating Mode When Triggered:</span>
                <strong>${e.operatingMode||`AI_SWEET_SPOT`}</strong>
              </div>
              <div class="spec-cell full-width">
                <span class="spec-label">Recommended Action:</span>
                <span class="action-recommendation">${e.recommendedAction||`Inspect physical module connections and monitor battery reserves.`}</span>
              </div>
            </div>

            <!-- Resolution Controls -->
            <div class="alert-actions-row">
              <div class="dispatch-tag text-xs text-muted">
                📲 Simulated SMS Alert sent to: <strong>+91 98765 43210</strong>
              </div>
              <div class="alert-btns-group">
                ${e.status===`unresolved`?`
                  <button class="btn btn-xs btn-outline btn-ack-alert" data-alertid="${e.id}">
                    👁️ Acknowledge
                  </button>
                `:``}
                ${e.status===`resolved`?``:`
                  <button class="btn btn-xs btn-primary btn-resolve-alert" data-alertid="${e.id}">
                    ✓ Mark as Resolved
                  </button>
                `}
              </div>
            </div>
          </div>
        `).join(``)}
      </div>
    </div>
  `}function Nt(){let e=O().schedulerConfig;return`
    <div class="scheduler-view-container">
      <!-- Header -->
      <div class="card scheduler-hero-card">
        <div>
          <h2>⏱️ Environmental Automation Scheduler & State Machine</h2>
          <p class="text-sm text-muted">
            Configure threshold rules, rain runoff drainage angles, camera capture periods, and priority safety interlocks.
          </p>
        </div>
        <button id="btn-save-scheduler-cfg" class="btn btn-sm btn-primary">
          💾 Save Automation Configuration
        </button>
      </div>

      <!-- Priority State Machine Visualization Strip -->
      <div class="card state-machine-card">
        <h3 style="margin-bottom:0.5rem;">🛡️ Closed-Loop Priority State Machine</h3>
        <p class="text-xs text-muted" style="margin-bottom:1rem;">
          To prevent command conflicts, the hardware edge governor strictly prioritizes safety interlocks over standard solar tracking.
        </p>

        <div class="state-hierarchy-chain">
          <div class="state-node node-priority-1">
            <div class="p-rank">PRIORITY 1</div>
            <strong>🌪️ High-Wind Protection</strong>
            <span class="p-action">Wind &ge; ${e.windStowSpeedKmh} km/h ➔ Flat Stow (0°)</span>
          </div>

          <div class="chain-arrow">➔</div>

          <div class="state-node node-priority-2">
            <div class="p-rank">PRIORITY 2</div>
            <strong>🌧️ Rain Runoff Management</strong>
            <span class="p-action">Rain &ge; ${e.rainThresholdMm}mm ➔ Tilt to ${e.rainAngleDeg}°</span>
          </div>

          <div class="chain-arrow">➔</div>

          <div class="state-node node-priority-3">
            <div class="p-rank">PRIORITY 3</div>
            <strong>🔋 Low-Battery Load Shedding</strong>
            <span class="p-action">Charge &le; ${e.batteryReserveCutoff}% ➔ Grid Transfer</span>
          </div>

          <div class="chain-arrow">➔</div>

          <div class="state-node node-priority-4">
            <div class="p-rank">PRIORITY 4</div>
            <strong>✨ AI Sweet Spot Tracking</strong>
            <span class="p-action">Nominal Conditions ➔ 35° Tilt</span>
          </div>
        </div>
      </div>

      <!-- Config Form Grid -->
      <div class="scheduler-form-grid">

        <!-- Section 1: Rain & Soil Sensors -->
        <div class="card">
          <h3>🌧️ Rain & Soil Sensor Automations</h3>
          <p class="text-xs text-muted" style="margin-bottom:1.25rem;">Adjust precipitation runoff angles and irrigation moisture setpoints.</p>

          <div class="form-group-item">
            <label>Rain Detection Threshold (mm)</label>
            <input type="number" step="0.5" id="cfg-rain-threshold" class="form-input" value="${e.rainThresholdMm}" />
            <span class="text-xs text-muted">Triggers automatic runoff positioning when rainfall exceeds this value.</span>
          </div>

          <div class="form-group-item">
            <label>Configured Rain Response Angle (° Tilt)</label>
            <input type="number" step="1" min="15" max="60" id="cfg-rain-angle" class="form-input" value="${e.rainAngleDeg}" />
            <span class="text-xs text-muted">Determined by panel physical mounting and drainage channel direction.</span>
          </div>

          <div class="form-group-item">
            <label>Delay Before Restoring Solar Tracking (Minutes)</label>
            <input type="number" id="cfg-rain-delay" class="form-input" value="${e.rainRestoreDelayMins}" />
            <span class="text-xs text-muted">Prevents rapid back-and-forth tilt cycling during intermittent showers.</span>
          </div>

          <div class="form-group-item">
            <label>Soil Moisture Irrigation Trigger (%)</label>
            <input type="number" id="cfg-soil-threshold" class="form-input" value="${e.soilMoistureThreshold}" />
            <span class="text-xs text-muted">Energizes drip irrigation valves when root moisture drops below this value.</span>
          </div>
        </div>

        <!-- Section 2: Camera Capture Schedule & Electrical Safeguards -->
        <div class="card">
          <h3>📷 Camera Schedule & Safety Limits</h3>
          <p class="text-xs text-muted" style="margin-bottom:1.25rem;">Configure the 3 daily capture time windows and battery reserve cutoffs.</p>

          <div class="form-group-item">
            <label>🌅 Morning Image Capture Window</label>
            <input type="time" id="cfg-cam-morning" class="form-input" value="${e.morningCaptureTime}" />
            <span class="text-xs text-muted">Evaluates morning dew, stomatal opening, and sunrise light exposure.</span>
          </div>

          <div class="form-group-item">
            <label>☀️ Afternoon Image Capture Window</label>
            <input type="time" id="cfg-cam-afternoon" class="form-input" value="${e.afternoonCaptureTime}" />
            <span class="text-xs text-muted">Evaluates midday solar irradiance, canopy scorch, and thermal cooling.</span>
          </div>

          <div class="form-group-item">
            <label>🌙 Night Image Capture Window (Infrared NV)</label>
            <input type="time" id="cfg-cam-night" class="form-input" value="${e.nightCaptureTime}" />
            <span class="text-xs text-muted">Low-light / infrared thermal scan for nocturnal leaf respiration and chill.</span>
          </div>

          <div class="form-group-item">
            <label>🔋 Battery Critical Reserve Cutoff (%)</label>
            <input type="number" id="cfg-battery-cutoff" class="form-input" value="${e.batteryReserveCutoff}" />
            <span class="text-xs text-muted">Enforces load shedding and triggers external grid transfer at or below this level.</span>
          </div>

          <div class="form-group-item">
            <label>💨 High-Wind Protective Stow Threshold (km/h)</label>
            <input type="number" id="cfg-wind-stow" class="form-input" value="${e.windStowSpeedKmh}" />
            <span class="text-xs text-muted">Wind gusts equal or higher immediately trigger flat 0° stow.</span>
          </div>
        </div>

      </div>
    </div>
  `}function Pt(){let e=O();return`
    <div class="simulator-view-container">
      <!-- Simulator Hero Banner -->
      <div class="card simulator-hero-card">
        <div>
          <div class="hero-tag">🎮 HACKATHON & JURY TESTING CONSOLE</div>
          <h2>Interactive System Simulator & Hardware Stress-Tester</h2>
          <p class="text-sm text-muted">
            Test all automatic protection rules, priority state transitions, emergency load shedding, offline edge autonomy, and grid transfers in real time.
          </p>
        </div>
        <button id="btn-sim-restore-all" class="btn btn-sm btn-accent">
          🔄 Restore All Systems to Nominal State
        </button>
      </div>

      <!-- Current State HUD Strip -->
      <div class="card sim-hud-strip">
        <div class="sim-hud-item">
          <span class="hud-lbl">Network Mode</span>
          <strong class="${e.networkMode===`CLOUD_CONNECTED`?`text-success`:`text-warning`}">
            ${e.networkMode}
          </strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Actuator Angle</span>
          <strong>${e.panelAngleDeg}° (Target: ${e.targetAngleDeg}°)</strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Battery SoC</span>
          <strong class="${e.battery.chargePercent<=20?`text-danger`:`text-success`}">
            ${e.battery.chargePercent}% (${e.battery.chargingState})
          </strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Grid Connection</span>
          <strong>${e.gridStatus}</strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Queued Offline Packets</span>
          <strong>${e.offlineQueueCount} packets</strong>
        </div>
      </div>

      <!-- Grid of Test Buttons -->
      <div class="sim-scenarios-grid">

        <!-- Scenario 1: Low Battery -->
        <div class="card sim-scenario-card ${e.battery.chargePercent<=20?`active-test`:``}">
          <div class="scen-icon">🔋</div>
          <div class="scen-body">
            <h4>1. Low Battery Reserve (≤ 20%)</h4>
            <p class="text-xs text-muted">
              Drops battery to 19.5%. Triggers critical alert, sheds non-essential pump load, and transfers to backup grid electricity.
            </p>
          </div>
          <button id="sim-btn-low-battery" class="btn btn-sm btn-danger">
            Trigger Low Battery (&le; 20%)
          </button>
        </div>

        <!-- Scenario 2: Rain Detection -->
        <div class="card sim-scenario-card ${e.rainfallMm>0?`active-test`:``}">
          <div class="scen-icon">🌧️</div>
          <div class="scen-body">
            <h4>2. Rain Runoff & Drainage</h4>
            <p class="text-xs text-muted">
              Injects 14.5mm rain. Automatically actuates panels to configured ${e.schedulerConfig.rainAngleDeg}° runoff angle and pauses drip irrigation.
            </p>
          </div>
          <button id="sim-btn-rain" class="btn btn-sm btn-primary">
            Trigger Rain Event (14.5mm)
          </button>
        </div>

        <!-- Scenario 3: High Wind Gust -->
        <div class="card sim-scenario-card ${e.windSpeedKmh>=45?`active-test`:``}">
          <div class="scen-icon">🌪️</div>
          <div class="scen-body">
            <h4>3. High-Wind Storm Stow</h4>
            <p class="text-xs text-muted">
              Injects 52 km/h wind gust. Priority 1 override immediately moves panels flat to 0° to prevent mechanical structure torque.
            </p>
          </div>
          <button id="sim-btn-wind" class="btn btn-sm btn-danger">
            Trigger Wind Gust (52 km/h)
          </button>
        </div>

        <!-- Scenario 4: Solar String Disconnect -->
        <div class="card sim-scenario-card ${e.solarPanelStatus===`Disconnected`?`active-test`:``}">
          <div class="scen-icon">⚡</div>
          <div class="scen-body">
            <h4>4. Solar Panel DC Disconnect</h4>
            <p class="text-xs text-muted">
              Simulates DC combiner isolator trip. Generation drops to 0W and system switches seamlessly to battery storage.
            </p>
          </div>
          <button id="sim-btn-solar-fault" class="btn btn-sm btn-outline">
            Simulate DC Disconnect
          </button>
        </div>

        <!-- Scenario 5: External Grid Failure -->
        <div class="card sim-scenario-card ${e.gridStatus.includes(`Islanded`)?`active-test`:``}">
          <div class="scen-icon">🔌</div>
          <div class="scen-body">
            <h4>5. External Grid Blackout</h4>
            <p class="text-xs text-muted">
              Cuts 230V grid. Anti-islanding relay safely isolates solar farm into self-sustaining microgrid without unsafe backfeed.
            </p>
          </div>
          <button id="sim-btn-grid-fault" class="btn btn-sm btn-outline">
            Simulate Grid Outage
          </button>
        </div>

        <!-- Scenario 6: Network Loss & Edge Autonomy -->
        <div class="card sim-scenario-card ${e.networkMode===`LOCAL_AUTONOMOUS`?`active-test`:``}">
          <div class="scen-icon">📡</div>
          <div class="scen-body">
            <h4>6. Network Failure (Edge Autonomy)</h4>
            <p class="text-xs text-muted">
              Simulates internet disconnection. Verifies that local industrial controller continues solar tracking and rain protection offline.
            </p>
          </div>
          <button id="sim-btn-network-cut" class="btn btn-sm btn-warning">
            Cut Internet Connection
          </button>
        </div>

        <!-- Scenario 7: Network Restoration & Data Sync -->
        <div class="card sim-scenario-card">
          <div class="scen-icon">🔄</div>
          <div class="scen-body">
            <h4>7. Reconnect & Synchronize</h4>
            <p class="text-xs text-muted">
              Restores network communication. Flushes buffered local telemetry queue to the cloud database without losing data.
            </p>
          </div>
          <button id="sim-btn-network-restore" class="btn btn-sm btn-success">
            Restore & Sync Queue
          </button>
        </div>

        <!-- Scenario 8: Emergency Stop (E-Stop) -->
        <div class="card sim-scenario-card ${e.isEmergencyStopped?`active-test`:``}">
          <div class="scen-icon">🛑</div>
          <div class="scen-body">
            <h4>8. Emergency Stop (E-Stop)</h4>
            <p class="text-xs text-muted">
              Isolates all linear drive motors immediately. Freezes actuator position in hardware and engages safety interlock.
            </p>
          </div>
          <button id="sim-btn-estop-toggle" class="btn btn-sm btn-danger">
            ${e.isEmergencyStopped?`Reset E-Stop Interlock`:`Engage Emergency Stop`}
          </button>
        </div>

      </div>

      <!-- Live Interactive Hardware Sliders -->
      <div class="card" style="margin-top:1.5rem;">
        <h3>🎛️ Live Sensor Sliders (Continuous Hardware Input)</h3>
        <p class="text-xs text-muted" style="margin-bottom:1.25rem;">
          Drag sliders to dynamically alter sensor values and observe responsive closed-loop adjustments.
        </p>

        <div class="sliders-grid">
          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Solar Generation (Watts)</label>
              <strong id="val-slider-watts">${e.solarPowerOutputWatts} W</strong>
            </div>
            <input type="range" id="sim-slider-watts" min="0" max="3600" step="50" value="${e.solarPowerOutputWatts}" class="form-range" style="width:100%;" />
          </div>

          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Battery State of Charge (%)</label>
              <strong id="val-slider-soc">${e.battery.chargePercent}%</strong>
            </div>
            <input type="range" id="sim-slider-soc" min="5" max="100" step="1" value="${e.battery.chargePercent}" class="form-range" style="width:100%;" />
          </div>

          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Wind Velocity (km/h)</label>
              <strong id="val-slider-wind">${e.windSpeedKmh} km/h</strong>
            </div>
            <input type="range" id="sim-slider-wind" min="0" max="65" step="1" value="${e.windSpeedKmh}" class="form-range" style="width:100%;" />
          </div>

          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Rain Precipitation (mm)</label>
              <strong id="val-slider-rain">${e.rainfallMm} mm</strong>
            </div>
            <input type="range" id="sim-slider-rain" min="0" max="30" step="0.5" value="${e.rainfallMm}" class="form-range" style="width:100%;" />
          </div>
        </div>
      </div>
    </div>
  `}function Ft(e=`daily`){let t=O(),n=B(),r=n?{id:n.farmerId,name:n.farmerName}:z,i=t.battery,a=t.schedulerConfig,o=t.solarEnergyTodayKwh,s=(o*.45).toFixed(2),c=(o*.35).toFixed(2),l=(o*.2).toFixed(2),u=t.gridImportedTodayKwh||`0.80`,d=t.electricityTariffPerKwh||6.5,f=(u*d).toFixed(2),p=(o*d).toFixed(2);return`
    <div class="reports-view-container">
      <!-- Report Header -->
      <div class="card reports-hero-card no-print">
        <div>
          <div class="hero-tag">📄 COMPREHENSIVE INTELLIGENCE AUDIT</div>
          <h2>Innovative Final Daily Farm Intelligence Report</h2>
          <p class="text-sm text-muted">
            Certified dual-objective verification report covering crop physiology, solar kWh yield, battery health, and automation audit.
          </p>
        </div>

        <div class="report-export-btns">
          <button id="btn-print-full-report" class="btn btn-sm btn-primary">
            🖨️ Print / Save PDF
          </button>
          <button id="btn-export-csv-report" class="btn btn-sm btn-secondary">
            📊 Export CSV Data
          </button>
          <button id="btn-export-json-report" class="btn btn-sm btn-outline">
            📥 Download JSON
          </button>
        </div>
      </div>

      <!-- Printable Document Sheet Body -->
      <div class="card print-sheet-card" id="printable-report-sheet">

        <!-- Sheet Header Watermark -->
        <div class="sheet-header">
          <div class="sheet-brand">
            <span style="font-size: 2rem;">🌞</span>
            <div>
              <h1 class="sheet-title">SUN-STARVED TRACKER</h1>
              <span class="sheet-subtitle">Intelligent Agrivoltaics Optimizer — Official Farm Daily Report</span>
            </div>
          </div>

          <div class="sheet-meta-box">
            <div><strong>Report Date:</strong> ${new Date().toLocaleDateString(`en-IN`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})}</div>
            <div><strong>Farmer ID:</strong> ${r.id} (${r.name})</div>
            <div><strong>Farm Location:</strong> Vemgal Rural, Kolar District, Karnataka, India</div>
            <div><strong>Security Watermark:</strong> Verified Cryptographic Digest (SHA-256)</div>
          </div>
        </div>

        <div class="sheet-divider"></div>

        <!-- Section 1: Executive KPI Summary -->
        <div class="sheet-section">
          <h3 class="section-heading">1. EXECUTIVE KPI SUMMARY</h3>
          <div class="kpi-summary-grid">
            <div class="kpi-box">
              <span class="k-label">TOTAL SOLAR GENERATION</span>
              <strong class="k-val text-success">${o} kWh</strong>
              <span class="text-xs text-muted">Peak Power: ${t.peakOutputWatts} W</span>
            </div>
            <div class="kpi-box">
              <span class="k-label">AVERAGE CROP COMFORT</span>
              <strong class="k-val text-primary">${t.cropComfortScore}/100</strong>
              <span class="text-xs text-muted">Light Exposure: ${t.canopyLightFraction}% PAR</span>
            </div>
            <div class="kpi-box">
              <span class="k-label">BATTERY STATE OF HEALTH</span>
              <strong class="k-val">${i.healthPercent}%</strong>
              <span class="text-xs text-muted">${i.healthStatus}</span>
            </div>
            <div class="kpi-box">
              <span class="k-label">NET ELECTRICITY SAVINGS</span>
              <strong class="k-val text-success">₹${p}</strong>
              <span class="text-xs text-muted">Grid Tariff: ₹${d}/kWh</span>
            </div>
          </div>
        </div>

        <!-- Section 2: Crop Health & 3 Daily Images (Specification 12) -->
        <div class="sheet-section">
          <h3 class="section-heading">2. CROP HEALTH & 3-PERIOD CANOPY IMAGERY</h3>
          <div class="report-images-grid">
            <div class="report-img-card">
              <div class="r-badge">🌅 Morning (07:30 AM)</div>
              <div class="r-thumb r-thumb-morning">
                <span>Morning Dew Active</span>
              </div>
              <div class="r-meta">
                <strong>Score: 94/100 (Confidence: 95.8%)</strong>
                <p class="text-xs">Healthy leaf turgor. Sunrise 45° angle enabled 92% PAR early photosynthesis.</p>
              </div>
            </div>

            <div class="report-img-card">
              <div class="r-badge">☀️ Afternoon (01:15 PM)</div>
              <div class="r-thumb r-thumb-afternoon">
                <span>Anti-Scorch Shaded</span>
              </div>
              <div class="r-meta">
                <strong>Score: 91/100 (Confidence: 94.2%)</strong>
                <p class="text-xs">Partial panel shade reduced leaf temperature by 3.8°C, preventing photo-inhibition.</p>
              </div>
            </div>

            <div class="report-img-card">
              <div class="r-badge">🌙 Night Infrared (10:00 PM)</div>
              <div class="r-thumb r-thumb-night">
                <span>Thermal IR Spectrum</span>
              </div>
              <div class="r-meta">
                <strong>Score: 95/100 (Confidence: 96.5%)</strong>
                <p class="text-xs">Nocturnal canopy respiration uniform. Overhead panels provided mild frost insulation.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Solar & Battery Performance Summary -->
        <div class="sheet-section">
          <h3 class="section-heading">3. SOLAR GENERATION & BATTERY SUMMARY</h3>
          <table class="report-data-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Measured Value</th>
                <th>Reference Baseline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Energy Generated</td>
                <td><strong>${o} kWh</strong></td>
                <td>24.50 kWh (Daily Rating)</td>
                <td><span class="badge badge-success">✓ Nominal Yield</span></td>
              </tr>
              <tr>
                <td>Peak Solar Output</td>
                <td><strong>${t.peakOutputWatts} W</strong></td>
                <td>3,450 W (Bifacial Peak)</td>
                <td><span class="badge badge-success">✓ 100% Inverter MPPT</span></td>
              </tr>
              <tr>
                <td>Start of Day Battery SoC</td>
                <td><strong>64.0%</strong></td>
                <td>Min Limit: 20.0%</td>
                <td><span class="badge badge-success">✓ Fully Maintained</span></td>
              </tr>
              <tr>
                <td>End of Day Battery SoC</td>
                <td><strong>${i.chargePercent}%</strong></td>
                <td>Target: &gt; 80%</td>
                <td><span class="badge badge-success">✓ Stored for Night</span></td>
              </tr>
              <tr>
                <td>LiFePO4 Battery Health (SoH)</td>
                <td><strong>${i.healthPercent}% (${i.cycleCount} Cycles)</strong></td>
                <td>Expected Lifespan: 4,000 Cycles</td>
                <td><span class="badge badge-success">✓ Optimal Cell Balancing</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Section 4: Electricity Usage & Cost Breakdown -->
        <div class="sheet-section">
          <h3 class="section-heading">4. ELECTRICITY USAGE & FINANCIAL AUDIT</h3>
          <table class="report-data-table">
            <thead>
              <tr>
                <th>Power Source</th>
                <th>Energy (kWh)</th>
                <th>Share (%)</th>
                <th>Cost / Valuation (INR ₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Direct Solar Self-Consumption</td>
                <td>${s} kWh</td>
                <td>45%</td>
                <td class="text-success">₹${(s*d).toFixed(2)} (Self-Generated)</td>
              </tr>
              <tr>
                <td>Stored Solar via Battery</td>
                <td>${c} kWh</td>
                <td>35%</td>
                <td class="text-success">₹${(c*d).toFixed(2)} (Stored Clean Power)</td>
              </tr>
              <tr>
                <td>Surplus Exported to Rural Grid</td>
                <td>${l} kWh</td>
                <td>20%</td>
                <td class="text-success">+ ₹${(l*d*.75).toFixed(2)} (Net Meter Credit)</td>
              </tr>
              <tr>
                <td>External Grid Imported Energy</td>
                <td>${u} kWh</td>
                <td>Minimal</td>
                <td class="text-danger">- ₹${f} (Grid Utility Bill)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Section 5: Automation Performance & Alerts Audit -->
        <div class="sheet-section">
          <h3 class="section-heading">5. AUTOMATION PERFORMANCE & ALERTS AUDIT</h3>
          <div class="audit-summary-text">
            <p><strong>Actuator Adjustments Executed:</strong> ${t.actuatorHistory.length} mechanical positioning events with 0 encoder step slips.</p>
            <p><strong>Rain & High-Wind Events:</strong> 0 structural stress violations. Rain threshold set at ${a.rainThresholdMm}mm directing runoff to ${a.runOffDirection}.</p>
            <p><strong>Safety Alerts:</strong> ${t.activeAlerts.length} total logged events (${t.activeAlerts.filter(e=>e.status===`resolved`).length} resolved, ${t.activeAlerts.filter(e=>e.status===`unresolved`).length} unresolved).</p>
          </div>
        </div>

        <!-- Section 6: AI Agronomic Recommendations for Next Day -->
        <div class="sheet-section">
          <h3 class="section-heading">6. AI AGRONOMIC RECOMMENDATIONS FOR TOMORROW</h3>
          <div class="ai-recommendations-list">
            <div class="ai-rec-box">
              <strong>🌱 Crop Canopy Optimization:</strong>
              <p class="text-sm">Maintain 35° midday tilt. Weather forecast predicts 28°C ambient temperature; partial shade reduces evapotranspiration by 32% and saves 180 liters of irrigation water.</p>
            </div>
            <div class="ai-rec-box">
              <strong>⚡ Energy & Battery Management:</strong>
              <p class="text-sm">Initiate battery bulk absorption stage at 10:30 AM. Peak solar irradiance is expected between 11:45 AM and 01:30 PM.</p>
            </div>
            <div class="ai-rec-box">
              <strong>🔧 Scheduled Maintenance Advice:</strong>
              <p class="text-sm">Inspect dust accumulation on String 2 module surfaces. No active electrical degradation detected.</p>
            </div>
          </div>
        </div>

        <!-- Report Signoff Footer -->
        <div class="sheet-signoff-row">
          <div>
            <div class="sig-line"></div>
            <span class="text-xs text-muted">Automated AI System Verification Stamp</span>
          </div>
          <div>
            <div class="sig-line"></div>
            <span class="text-xs text-muted">Certified Farmer Operator Signature</span>
          </div>
        </div>
      </div>
    </div>
  `}var It=`sun_starved_farmer_feedback`,Lt=`sun_starved_service_requests`;function Rt(){try{let e=localStorage.getItem(It);if(e)return JSON.parse(e)}catch{}return[{id:`FB-84920-01`,date:`2026-03-28`,category:`Crop Model`,ratings:{overall:5,tracking:5,ai:4,ease:5},subject:`Soil moisture threshold for tomatoes`,message:`The rain runoff angle configuration (30°) prevented soil erosion beneath the bifacial panels during heavy downpours. Tomato yield increased by 22% compared to open field.`,status:`Acknowledged by Agronomist`,urgency:`Normal`,farmerId:`AGRI-84920-KA`,response:`Thank you Ramesh-ji. Your field observations have been incorporated into our Kolar crop PAR coefficient dataset.`},{id:`FB-84920-02`,date:`2026-04-02`,category:`Hardware & Actuator`,ratings:{overall:4,tracking:4,ai:5,ease:4},subject:`Actuator worm gear lubrication query`,message:`Dual-axis tracker responds well to wind gusts, stowing at 0° within 45 seconds. Requesting annual greasing schedule for Kolar dusty conditions.`,status:`Resolved`,urgency:`Important`,farmerId:`AGRI-84920-KA`,response:`Resolved on 2026-04-04 by Field Tech M. Gowda during routine bi-monthly PM visit. Applied high-temp EP2 grease.`}]}function zt(e){let t=Rt();t.unshift(e);try{localStorage.setItem(It,JSON.stringify(t))}catch{}return t}function Bt(){try{let e=localStorage.getItem(Lt);if(e)return JSON.parse(e)}catch{}return[{id:`SRV-2026-904`,date:`2026-04-10`,slot:`Morning (09:00 - 12:00)`,serviceType:`Soil & Light Sensor Recalibration`,farmLocation:`Vemgal Rural, Kolar, Karnataka`,status:`Scheduled`,technician:`K. Somanna (Senior Field Engineer)`,technicianPhone:`+91 94801 88404`,notes:`Biannual recalibration of PAR quantum light sensors and TDR soil probe.`}]}function Vt(e){let t=Bt();t.unshift(e);try{localStorage.setItem(Lt,JSON.stringify(t))}catch{}return t}var Ht=[{category:`tracking`,question:`Why did my solar panels automatically move to 30° during rain?`,answer:`When the onboard rain sensor registers rainfall exceeding the configured threshold (default 2.0mm), the controller moves the panels to the configured rain runoff angle (default 30°). This directs rainwater into designated drainage channels and crop collection rows, preventing soil erosion, root waterlogging, and module ponding.`},{category:`tracking`,question:`What happens if wind speed exceeds 45 km/h?`,answer:`The system engages Priority 1 Storm Stow mode: the actuator immediately commands the array to 0° (flat stow) within 45 seconds. This drastically reduces aerodynamic wind drag and protects structural purlins, motor couplings, and bifacial glass from shear failure.`},{category:`battery`,question:`Why did the irrigation pump shut off when battery reached 20%?`,answer:`To protect the LiFePO4 battery from deep discharge damage, the intelligent controller enforces a strict 20% reserve cutoff. Non-essential high-power loads like the 450W irrigation pump are automatically shed to preserve remaining energy for critical IoT telemetry, IP cameras, and emergency panel actuators.`},{category:`battery`,question:`How does the system prevent unsafe grid backfeeding during outages?`,answer:`The agrivoltaic hybrid inverter incorporates a certified anti-islanding transfer switch. When the 230V external grid fails, the inverter disconnects from the grid in less than 20 milliseconds, creating an isolated islanded microgrid to safeguard electrical line workers.`},{category:`camera`,question:`How do the 3 daily crop camera captures work?`,answer:`The system captures images in 3 configured windows: Morning (07:30) for leaf turgor and dew; Afternoon (13:15) for peak sunlight stress and wilting detection; and Night (22:00) using low-light infrared night vision to monitor nocturnal transpiration without disturbing photoperiods.`},{category:`offline`,question:`Can the farm continue operating if 4G internet connection is lost?`,answer:`Yes! The edge microcontroller (ESP32/Industrial PLC) operates completely autonomously. All sensor reading, rain responses, wind stows, and battery protections execute locally. Sensor data and logs are buffered in local non-volatile memory and automatically synchronize when connectivity returns.`},{category:`security`,question:`How do I recover my password if I forget it in the field?`,answer:`Click "Forgot Password" on the login screen. Enter your registered mobile number to receive a secure 6-digit SMS OTP. Once verified, you can immediately set a new strong password without needing email or office assistance.`},{category:`service`,question:`How often should solar panels and camera lenses be cleaned?`,answer:`In dusty agricultural conditions, we recommend cleaning solar modules every 15-20 days using soft water brushes. Camera lenses should be wiped monthly with microfiber cloth. You can also book a certified technician directly through the "Book Field Engineer" tab.`}];function Ut(e=`contact`){let t=B(),n=t?{id:t.farmerId,name:t.farmerName,phone:t.phone}:z,r=Rt(),i=Bt();return`
    <div class="support-view-container">
      <!-- Hero Banner -->
      <div class="card support-hero-card">
        <div class="support-hero-content">
          <div class="support-hero-badge">
            <span class="live-dot pulse"></span>
            <span>24/7 KISAN HELPLINE & TECHNICAL CARE ACTIVE</span>
          </div>
          <h1 class="support-hero-title">🎧 Customer Care, Support & Feedback Center</h1>
          <p class="support-hero-desc">
            Direct farmer assistance in 6 languages. Reach agrivoltaic engineers, request on-site hardware maintenance, track service tickets, and share your crop feedback.
          </p>

          <div class="support-quick-stats">
            <div class="support-stat-chip">
              <span class="stat-icon">📞</span>
              <div>
                <strong>1800-419-4404</strong>
                <small>Toll-Free All India</small>
              </div>
            </div>
            <div class="support-stat-chip">
              <span class="stat-icon">💬</span>
              <div>
                <strong>+91 98765 44040</strong>
                <small>WhatsApp Field Bot</small>
              </div>
            </div>
            <div class="support-stat-chip">
              <span class="stat-icon">⏱️</span>
              <div>
                <strong>&lt; 2 Minutes</strong>
                <small>Average Call Response</small>
              </div>
            </div>
            <div class="support-stat-chip">
              <span class="stat-icon">🗣️</span>
              <div>
                <strong>6 Languages</strong>
                <small>EN, HI, KN, TA, TE, MR</small>
              </div>
            </div>
          </div>
        </div>

        <div class="support-hero-action">
          <div class="support-hotline-box">
            <div class="hotline-label">EMERGENCY FIELD DISPATCH</div>
            <div class="hotline-number">+91 98450 14404</div>
            <div class="hotline-sub">For Motor Jam, Inverter Trip, Array Damage</div>
            <a href="tel:18004194404" class="btn btn-sm btn-accent w-100" style="margin-top:0.75rem;">
              📞 Dial Toll-Free Now
            </a>
          </div>
        </div>
      </div>

      <!-- Navigation Tab Bar -->
      <div class="support-tabs-bar">
        <button class="support-tab-btn ${e===`contact`?`active`:``}" data-suptab="contact">
          📞 24/7 Helplines & Centers
        </button>
        <button class="support-tab-btn ${e===`feedback`?`active`:``}" data-suptab="feedback">
          ⭐ Farmer Feedback & Rating
        </button>
        <button class="support-tab-btn ${e===`service`?`active`:``}" data-suptab="service">
          🚜 Book Field Engineer
        </button>
        <button class="support-tab-btn ${e===`faq`?`active`:``}" data-suptab="faq">
          💡 FAQs & Self-Help
        </button>
      </div>

      <!-- TAB 1: 24/7 HELPLINES & REGIONAL CENTERS -->
      <div id="suptab-contact" class="support-tab-content ${e===`contact`?`active`:``}">
        <div class="support-grid-2col">
          <!-- Direct Channels -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📞 Direct Kisan Communication Channels</h3>
              <span class="badge badge-success">🟢 Live Support</span>
            </div>

            <div class="contact-channel-list">
              <div class="contact-channel-item">
                <div class="channel-icon-box bg-green">
                  <span>📞</span>
                </div>
                <div class="channel-info">
                  <h4>Toll-Free Kisan Agrivoltaics Helpline</h4>
                  <p class="channel-phone">1800-419-4404 / 1800-SUN-FARM</p>
                  <p class="text-xs text-muted">Free across all telecom networks (BSNL, Jio, Airtel, Vi). Available 24 hours.</p>
                </div>
                <div class="channel-actions">
                  <a href="tel:18004194404" class="btn btn-xs btn-primary">Call</a>
                  <button class="btn btn-xs btn-outline btn-copy-contact" data-text="18004194404">Copy</button>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="channel-icon-box bg-whatsapp">
                  <span>💬</span>
                </div>
                <div class="channel-info">
                  <h4>WhatsApp Agrivoltaic Assistant</h4>
                  <p class="channel-phone">+91 98765 44040</p>
                  <p class="text-xs text-muted">Send crop photos, receive instant diagnostic reports, and check sensor status via chat.</p>
                </div>
                <div class="channel-actions">
                  <button id="btn-open-whatsapp-sim" class="btn btn-xs btn-accent">Open Chat</button>
                  <button class="btn btn-xs btn-outline btn-copy-contact" data-text="+919876544040">Copy</button>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="channel-icon-box bg-red">
                  <span>🚨</span>
                </div>
                <div class="channel-info">
                  <h4>Emergency Actuator & Hardware Dispatch</h4>
                  <p class="channel-phone">+91 98450 14404</p>
                  <p class="text-xs text-muted">Direct line to field engineers for motor failure, inverter ground faults, or storm hazard.</p>
                </div>
                <div class="channel-actions">
                  <a href="tel:9845014404" class="btn btn-xs btn-danger">Emergency</a>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="channel-icon-box bg-blue">
                  <span>✉️</span>
                </div>
                <div class="channel-info">
                  <h4>Technical Email Support</h4>
                  <p class="channel-phone">support@sunstarvedtracker.in</p>
                  <p class="text-xs text-muted">Send telemetry dumps, inverter logs, and warranty documentation. SLA: &lt; 4 hours.</p>
                </div>
                <div class="channel-actions">
                  <a href="mailto:support@sunstarvedtracker.in" class="btn btn-xs btn-outline">Email</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Regional Engineering Hubs -->
          <div class="card">
            <div class="card-header-clean">
              <h3>🏢 Regional Agrivoltaics Field Centers</h3>
              <span class="badge badge-info">4 Tech Hubs</span>
            </div>

            <div class="regional-hubs-list">
              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Kolar Regional Agritech Hub (Karnataka)</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">APMC Tech Yard, Vemgal Industrial Road, Kolar, Karnataka — 563101</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Dr. M. Gowda</strong></span>
                  <span>Contact: <strong>+91 8152 244041</strong></span>
                  <span>Service Radius: <strong>Kolar, Chikkaballapur, Bengaluru Rural</strong></span>
                </div>
              </div>

              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Pune Western Agrivoltaic Center (Maharashtra)</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">Hadapsar Agro-Innovation Park, Pune-Solapur Highway, Pune, MH — 411028</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Er. Sachin Deshmukh</strong></span>
                  <span>Contact: <strong>+91 20 2644 0402</strong></span>
                  <span>Service Radius: <strong>Pune, Ahmednagar, Solapur, Satara</strong></span>
                </div>
              </div>

              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Coimbatore Tamil Nadu Center</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">TNAU Agricultural Technology Park, Lawley Road, Coimbatore, TN — 641003</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Dr. K. Selvam</strong></span>
                  <span>Contact: <strong>+91 422 244 0403</strong></span>
                  <span>Service Radius: <strong>Coimbatore, Tiruppur, Erode, Salem</strong></span>
                </div>
              </div>

              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Chittoor Rayalaseema Center (Andhra Pradesh)</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">Madanapalle Agrivoltaic Demonstration Center, Chittoor, AP — 517325</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Er. R. Naidu</strong></span>
                  <span>Contact: <strong>+91 8571 244 0404</strong></span>
                  <span>Service Radius: <strong>Chittoor, Tirupati, Annamayya, Kadapa</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Level Guarantees -->
        <div class="card" style="margin-top:1.25rem;">
          <div class="card-header-clean">
            <h3>🛡️ Our Kisan Service Level Commitments (SLA)</h3>
            <span class="badge badge-accent">ISO 9001 Agrivoltaics Certified</span>
          </div>
          <div class="sla-grid">
            <div class="sla-card">
              <div class="sla-val">&lt; 2 Mins</div>
              <div class="sla-title">Helpline Answer Time</div>
              <p class="text-xs text-muted">No endless automated menus. Direct connection to an agricultural engineer.</p>
            </div>
            <div class="sla-card">
              <div class="sla-val">&lt; 4 Hours</div>
              <div class="sla-title">Emergency Field Arrival</div>
              <p class="text-xs text-muted">For motor stalls, inverter trips, or electrical hazards within 75km radius.</p>
            </div>
            <div class="sla-card">
              <div class="sla-val">100% Free</div>
              <div class="sla-title">Toll-Free & Warranty Support</div>
              <p class="text-xs text-muted">Zero charges for technical calls, firmware diagnostics, or remote tuning.</p>
            </div>
            <div class="sla-card">
              <div class="sla-val">6 Languages</div>
              <div class="sla-title">Vernacular Fluency</div>
              <p class="text-xs text-muted">Dedicated native speakers for Kannada, Marathi, Tamil, Telugu, Hindi, English.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: FARMER FEEDBACK & RATING -->
      <div id="suptab-feedback" class="support-tab-content ${e===`feedback`?`active`:``}">
        <div class="support-grid-2col">
          <!-- Feedback Submission Form -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📝 Submit Farmer Feedback & Review</h3>
              <span class="badge badge-primary">Your Voice Matters</span>
            </div>
            <p class="text-xs text-muted" style="margin-bottom:1rem;">
              Help our agricultural engineers and software team improve tracking algorithms, crop disease models, and user experience.
            </p>

            <form id="form-farmer-feedback" onsubmit="return false;">
              <!-- Star Ratings Grid -->
              <div class="rating-metrics-group">
                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>Overall Experience:</span>
                    <strong id="val-rating-overall">5 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="overall">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star active" data-val="5">★</span>
                  </div>
                </div>

                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>Solar Tracking Accuracy:</span>
                    <strong id="val-rating-tracking">5 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="tracking">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star active" data-val="5">★</span>
                  </div>
                </div>

                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>Crop Camera AI Quality:</span>
                    <strong id="val-rating-ai">4 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="ai">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star" data-val="5">★</span>
                  </div>
                </div>

                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>App Ease of Use & Language:</span>
                    <strong id="val-rating-ease">5 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="ease">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star active" data-val="5">★</span>
                  </div>
                </div>
              </div>

              <!-- Form Inputs -->
              <div class="form-group" style="margin-top:1rem;">
                <label for="fb-category">Feedback Category</label>
                <select id="fb-category" class="form-input">
                  <option value="General Experience">🌱 General Experience & Crop Growth</option>
                  <option value="Solar & Actuator">⚡ Solar Tracking & Actuator Positioning</option>
                  <option value="Battery & Power">🔋 Battery Health & Power Load Shedding</option>
                  <option value="Crop Camera AI">📷 Crop Camera & Plant Disease AI</option>
                  <option value="Sensors & Weather">🌧️ Rain / Soil / Weather Sensors</option>
                  <option value="Feature Request">💡 Feature Request / Improvement Idea</option>
                  <option value="Language Support">🇮🇳 Language Translation & Voice Feedback</option>
                </select>
              </div>

              <div class="form-group">
                <label for="fb-subject">Summary / Subject</label>
                <input type="text" id="fb-subject" class="form-input" placeholder="e.g. Panel rain runoff angle worked wonderfully during thunderstorm" required />
              </div>

              <div class="form-group">
                <label for="fb-message">Detailed Feedback or Field Observations</label>
                <textarea id="fb-message" class="form-input" rows="4" placeholder="Tell us how the system is behaving in your fields, any suggestions for crop growth, or issues you noticed..." required></textarea>
              </div>

              <div class="form-row-2col">
                <div class="form-group">
                  <label for="fb-urgency">Priority / Urgency</label>
                  <select id="fb-urgency" class="form-input">
                    <option value="Normal">🟢 Normal (Feedback / Suggestion)</option>
                    <option value="Important">🟡 Important (Needs Review)</option>
                    <option value="Critical">🔴 Critical Field Issue (Request Call)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="fb-farmer-id">Farmer ID (Auto-Linked)</label>
                  <input type="text" id="fb-farmer-id" class="form-input" value="${n.id}" readonly />
                </div>
              </div>

              <button type="button" id="btn-submit-feedback" class="btn btn-primary w-100" style="margin-top:1rem;">
                🚀 Submit Feedback & Generate Ticket
              </button>
            </form>
          </div>

          <!-- Submitted Feedback History -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📋 Your Feedback & Resolution History</h3>
              <span class="badge badge-info">${r.length} Submissions</span>
            </div>

            <div class="feedback-history-list" id="feedback-history-container">
              ${r.map(e=>`
                <div class="feedback-history-card">
                  <div class="fb-card-top">
                    <div>
                      <span class="fb-ticket-id">#${e.id}</span>
                      <strong class="fb-subject">${e.subject}</strong>
                    </div>
                    <span class="badge ${e.status===`Resolved`?`badge-success`:`badge-accent`}">${e.status}</span>
                  </div>

                  <div class="fb-rating-stars">
                    <span>Overall: ${`★`.repeat(e.ratings.overall)}${`☆`.repeat(5-e.ratings.overall)}</span>
                    <span class="text-xs text-muted">• Category: ${e.category}</span>
                    <span class="text-xs text-muted">• ${e.date}</span>
                  </div>

                  <p class="fb-message-text">${e.message}</p>

                  ${e.response?`
                    <div class="fb-response-box">
                      <strong>💬 Agri-Engineer Response:</strong>
                      <p>${e.response}</p>
                    </div>
                  `:``}
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: BOOK ON-SITE FIELD ENGINEER VISIT -->
      <div id="suptab-service" class="support-tab-content ${e===`service`?`active`:``}">
        <div class="support-grid-2col">
          <!-- Service Booking Form -->
          <div class="card">
            <div class="card-header-clean">
              <h3>🚜 Request On-Site Field Engineer Visit</h3>
              <span class="badge badge-accent">Certified Agrisolar Tech</span>
            </div>
            <p class="text-xs text-muted" style="margin-bottom:1rem;">
              Need an agrivoltaic specialist to calibrate actuators, inspect bi-facial wiring, clean sensor lenses, or test battery BMS? Book a technician directly to your farm.
            </p>

            <form id="form-service-booking" onsubmit="return false;">
              <div class="form-group">
                <label for="srv-type">Service Required</label>
                <select id="srv-type" class="form-input">
                  <option value="Dual-Axis Actuator Calibration">📐 Dual-Axis Actuator Calibration & Gear Alignment</option>
                  <option value="Soil & Light Sensor Recalibration">🌱 Soil TDR Probe & Light Sensor Recalibration</option>
                  <option value="Camera Lens Maintenance">📷 Crop Health Camera Lens Cleaning & Alignment</option>
                  <option value="Inverter & Anti-Islanding Diagnostic">⚡ Inverter MPPT & Anti-Islanding Safety Audit</option>
                  <option value="LiFePO4 Battery BMS Health Check">🔋 LiFePO4 Battery BMS & Cell Balancing Check</option>
                  <option value="Panel Surface Eco-Wash">🚿 Solar Module Eco-Wash & Soil Removal</option>
                  <option value="General Agrivoltaic Farm Inspection">🌾 Annual Agrivoltaic Farm Health Certification</option>
                </select>
              </div>

              <div class="form-row-2col">
                <div class="form-group">
                  <label for="srv-date">Preferred Date</label>
                  <input type="date" id="srv-date" class="form-input" value="${Wt()}" min="${Wt()}" required />
                </div>

                <div class="form-group">
                  <label for="srv-slot">Preferred Time Window</label>
                  <select id="srv-slot" class="form-input">
                    <option value="Morning (08:00 - 12:00)">🌅 Morning (08:00 - 12:00)</option>
                    <option value="Midday (12:00 - 16:00)">☀️ Midday (12:00 - 16:00)</option>
                    <option value="Evening (16:00 - 19:00)">🌆 Evening (16:00 - 19:00)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="srv-farm-address">Farm Location / Address</label>
                <input type="text" id="srv-farm-address" class="form-input" value="Survey #142/B, Vemgal Rural, Kolar District, Karnataka" required />
              </div>

              <div class="form-group">
                <label for="srv-notes">Field Problem Description or Notes</label>
                <textarea id="srv-notes" class="form-input" rows="3" placeholder="Describe any noises, error codes on the inverter, or specific rows that need attention..."></textarea>
              </div>

              <div class="form-row-2col">
                <div class="form-group">
                  <label for="srv-phone">Farmer Contact Number</label>
                  <input type="text" id="srv-phone" class="form-input" value="${n.phone}" required />
                </div>

                <div class="form-group">
                  <label for="srv-farmer-id">Farmer ID</label>
                  <input type="text" id="srv-farmer-id" class="form-input" value="${n.id}" readonly />
                </div>
              </div>

              <button type="button" id="btn-submit-service-req" class="btn btn-accent w-100" style="margin-top:1rem;">
                🛠️ Confirm Field Engineer Booking
              </button>
            </form>
          </div>

          <!-- Existing Scheduled Visits -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📅 Scheduled Engineer Visits</h3>
              <span class="badge badge-success">${i.length} Active</span>
            </div>

            <div class="service-requests-list" id="service-reqs-container">
              ${i.map(e=>`
                <div class="service-request-card">
                  <div class="srv-card-top">
                    <div>
                      <span class="srv-ticket-id">#${e.id}</span>
                      <strong class="srv-type-title">${e.serviceType}</strong>
                    </div>
                    <span class="badge ${e.status===`Scheduled`?`badge-accent`:`badge-success`}">${e.status}</span>
                  </div>

                  <div class="srv-meta-grid">
                    <div>📅 <strong>Date:</strong> ${e.date}</div>
                    <div>⏰ <strong>Slot:</strong> ${e.slot}</div>
                    <div>📍 <strong>Location:</strong> ${e.farmLocation}</div>
                    <div>👨‍🔧 <strong>Assigned Tech:</strong> ${e.technician||`Pending assignment`}</div>
                  </div>

                  ${e.technicianPhone?`
                    <div class="srv-tech-contact">
                      <span>Direct Technician Hotline:</span>
                      <a href="tel:${e.technicianPhone}" class="btn btn-xs btn-outline">📞 ${e.technicianPhone}</a>
                    </div>
                  `:``}

                  ${e.notes?`
                    <p class="text-xs text-muted" style="margin-top:0.5rem;"><strong>Notes:</strong> ${e.notes}</p>
                  `:``}
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: FAQS & KNOWLEDGE BASE -->
      <div id="suptab-faq" class="support-tab-content ${e===`faq`?`active`:``}">
        <div class="card">
          <div class="faq-header-bar">
            <div>
              <h3>💡 Agrivoltaics Frequently Asked Questions & Knowledge Base</h3>
              <p class="text-xs text-muted">Instant answers to technical solar, battery, crop camera, and offline operation questions.</p>
            </div>

            <div class="faq-search-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="faq-search-input" class="form-input" placeholder="Search FAQ (e.g., rain, wind, battery, camera)..." />
            </div>
          </div>

          <!-- FAQ Category Filter Chips -->
          <div class="faq-chips-row">
            <button class="faq-chip active" data-filter="all">All Questions (${Ht.length})</button>
            <button class="faq-chip" data-filter="tracking">⚡ Panel Tracking & Tilt</button>
            <button class="faq-chip" data-filter="battery">🔋 Battery & Power</button>
            <button class="faq-chip" data-filter="camera">📷 Crop Health Camera</button>
            <button class="faq-chip" data-filter="offline">📡 Offline Edge Mode</button>
            <button class="faq-chip" data-filter="security">🔒 Security & ID</button>
            <button class="faq-chip" data-filter="service">🚜 Service & Maintenance</button>
          </div>

          <!-- FAQ Accordion List -->
          <div class="faq-accordion-list" id="faq-accordion-container">
            ${Ht.map((e,t)=>`
              <div class="faq-item" data-category="${e.category}">
                <button class="faq-question-btn" data-faqid="${t}">
                  <span class="faq-q-text">${e.question}</span>
                  <span class="faq-chevron">▼</span>
                </button>
                <div class="faq-answer-panel" id="faq-answer-${t}" style="display: none;">
                  <p>${e.answer}</p>
                </div>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    </div>
  `}function Wt(){let e=new Date;return e.setDate(e.getDate()+1),e.toISOString().split(`T`)[0]}function Gt(e=`profile`){let t=B(),n=t?{id:t.farmerId,name:t.farmerName,phone:t.phone,role:t.role}:z,r=dt(),i=ht();return`
    <div class="security-view-container">
      <!-- Security Header Badge -->
      <div class="card security-hero-card">
        <div class="sec-hero-left">
          <div class="farmer-avatar-badge">
            <span class="avatar-icon">👨‍🌾</span>
            <span class="shield-badge" title="Cryptographically Protected">🔒</span>
          </div>
          <div class="farmer-meta">
            <div class="farmer-id-tag">
              <span>UNIQUE FARMER ID:</span>
              <strong class="id-code" id="farmer-id-display">${n.id}</strong>
              <button class="btn btn-xs btn-outline" id="btn-copy-id" title="Copy Farmer ID">📋</button>
            </div>
            <h2 class="farmer-name">${n.name}</h2>
            <div class="farmer-submeta">
              <span>📱 ${n.phone}</span>
              <span>📍 Kolar Agricultural District, Karnataka</span>
              <span class="badge badge-success">🛡️ AES-256 ENCRYPTED</span>
            </div>
          </div>
        </div>

        <div class="sec-hero-right">
          <div class="sec-score-gauge">
            <div class="sec-score-val">98%</div>
            <div class="sec-score-lbl">SECURITY RATING</div>
          </div>
          <button id="btn-sec-logout" class="btn btn-sm btn-secondary">
            🚪 Logout Session
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="security-tab-strip">
        <button class="sec-tab-btn ${e===`profile`?`active`:``}" data-sectab="profile">
          👤 Farmer Profile & ID
        </button>
        <button class="sec-tab-btn ${e===`biometric`?`active`:``}" data-sectab="biometric">
          👆 Biometrics & WebAuthn
        </button>
        <button class="sec-tab-btn ${e===`devices`?`active`:``}" data-sectab="devices">
          📱 Active Devices (${r.length})
        </button>
        <button class="sec-tab-btn ${e===`audit`?`active`:``}" data-sectab="audit">
          📜 Security Audit Logs
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="sec-tab-content" id="sec-tab-content">
        ${Kt(e,n,r,i)}
      </div>
    </div>
  `}function Kt(e,t,n,r){return e===`biometric`?`
      <div class="card sec-card">
        <h3>👆 Biometric Authentication & Device Security</h3>
        <p class="text-muted" style="margin-bottom: 1.25rem;">
          Use fingerprint or facial recognition as a secondary verification step for instant, passwordless logins and sensitive control unlocks.
        </p>

        <div class="bio-toggle-box">
          <div class="bio-icon-large">🪪</div>
          <div class="bio-info">
            <strong>WebAuthn Platform Biometrics</strong>
            <p class="text-xs text-muted">Supports Windows Hello, Android Fingerprint Scanner, Apple Touch ID & Face ID.</p>
            <span class="badge badge-success">ENROLLED & ACTIVE</span>
          </div>
          <button id="btn-test-biometric" class="btn btn-sm btn-accent">
            🧪 Test Biometric Scan
          </button>
        </div>

        <div class="card" style="background:var(--bg-subtle); margin-top:1.5rem; border:1px solid var(--border-subtle);">
          <h4 style="margin-bottom:0.5rem;">🔒 Sensitive Action Interlock Policy</h4>
          <p class="text-sm">
            Biometric or OTP re-authentication is automatically enforced when:
          </p>
          <ul class="sec-policy-list text-sm">
            <li>✓ Disabling automated panel positioning mode</li>
            <li>✓ Overriding emergency storm stow angle manually</li>
            <li>✓ Exporting full unmasked agricultural financial reports</li>
            <li>✓ Adding or revoking connected device gateways</li>
          </ul>
        </div>
      </div>
    `:e===`devices`?`
      <div class="card sec-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <h3>📱 Connected Devices & Active Sessions</h3>
            <p class="text-muted text-sm">Review all devices authorized to access your solar farm controls.</p>
          </div>
          <button id="btn-logout-all-devices" class="btn btn-sm btn-danger">
            ⚠️ Logout from All Other Devices
          </button>
        </div>

        <div class="device-list">
          ${n.map(e=>`
            <div class="device-item ${e.isCurrent?`device-current`:``}">
              <div class="device-icon">${e.type.includes(`Mobile`)?`📱`:e.type.includes(`Gateway`)?`📟`:`💻`}</div>
              <div class="device-meta">
                <div class="device-title">
                  <strong>${e.name}</strong>
                  ${e.isCurrent?`<span class="badge badge-success">THIS DEVICE</span>`:``}
                </div>
                <div class="device-details text-xs text-muted">
                  <span>Type: ${e.type}</span> · 
                  <span>IP: ${e.ip}</span> · 
                  <span>Active: ${e.lastActive}</span>
                </div>
              </div>
              <div>
                ${e.isCurrent?`<span class="text-xs text-success">✓ Active</span>`:`<button class="btn btn-xs btn-outline btn-revoke" data-devid="${e.id}">Revoke</button>`}
              </div>
            </div>
          `).join(``)}
        </div>
      </div>
    `:e===`audit`?`
      <div class="card sec-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <h3>📜 Security & Access Audit Trail</h3>
            <p class="text-muted text-sm">Immutable client-side audit log of all security events, logins, and overrides.</p>
          </div>
          <span class="badge badge-subtle">Total Events: ${r.length}</span>
        </div>

        <div class="audit-table-wrap">
          <table class="audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event Type</th>
                <th>Details</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              ${r.map(e=>`
                <tr>
                  <td class="text-xs">${new Date(e.timestamp).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}</td>
                  <td><span class="badge ${e.type.includes(`FAIL`)||e.type.includes(`LOCK`)?`badge-danger`:`badge-subtle`}">${e.type}</span></td>
                  <td class="text-sm">${e.details}</td>
                  <td class="text-xs text-muted">${e.device}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    `:`
    <div class="card sec-card">
      <h3>👤 Farmer Profile & Credentials</h3>
      <p class="text-muted text-sm" style="margin-bottom:1.5rem;">
        Your verified farming identity connects your physical solar array to the AI cloud optimizer.
      </p>

      <div class="profile-grid">
        <div class="profile-field">
          <label>Farmer Name</label>
          <input type="text" class="form-input" value="${t.name}" readonly />
        </div>
        <div class="profile-field">
          <label>Unique Farmer ID</label>
          <input type="text" class="form-input" value="${t.id}" readonly />
        </div>
        <div class="profile-field">
          <label>Registered Mobile (OTP Verified)</label>
          <input type="text" class="form-input" value="${t.phone}" readonly />
        </div>
        <div class="profile-field">
          <label>Village & District</label>
          <input type="text" class="form-input" value="Vemgal Rural, Kolar, Karnataka" readonly />
        </div>
      </div>

      <div class="credential-actions-strip" style="margin-top:2rem; display:flex; gap:0.75rem;">
        <button id="btn-open-change-password" class="btn btn-sm btn-secondary">
          🔑 Change Password
        </button>
        <button id="btn-request-phone-reverification" class="btn btn-sm btn-secondary">
          📱 Re-verify Phone Number via OTP
        </button>
      </div>
    </div>
  `}function qt(){return`
    <div class="auth-modal-box">
      <div class="auth-modal-header">
        <div class="auth-icon">🌞</div>
        <h2>Farmer Sign In</h2>
        <p class="text-muted text-sm">Sun-Starved Tracker Agrivoltaic Security Portal</p>
      </div>

      <div class="auth-form-group">
        <label>Farmer ID or Mobile Number</label>
        <div class="input-with-icon">
          <span class="in-icon">👤</span>
          <input type="text" id="login-identifier" class="form-input" placeholder="e.g. AGRI-84920-KA or 9876543210" value="AGRI-84920-KA" />
        </div>
      </div>

      <div class="auth-form-group">
        <label>Password</label>
        <div class="input-with-icon">
          <span class="in-icon">🔑</span>
          <input type="password" id="login-password" class="form-input" placeholder="Enter password" value="Farmer@123" />
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; margin-bottom:1.25rem;">
        <label style="font-size:0.85rem; display:flex; align-items:center; gap:0.35rem; cursor:pointer;">
          <input type="checkbox" checked id="remember-me" /> Remember on this device
        </label>
        <a href="#" id="link-forgot-password" class="text-xs" style="color:var(--color-agri-fresh); font-weight:600;">Forgot Password?</a>
      </div>

      <div class="auth-btn-stack">
        <button id="btn-submit-login" class="btn btn-primary" style="width:100%;">
          🔐 Sign In
        </button>
        <button id="btn-one-tap-biometric" class="btn btn-secondary" style="width:100%;">
          👆 One-Tap Biometric / Face ID
        </button>
      </div>

      <div class="auth-switch-footer">
        <span>New farmer?</span>
        <a href="#" id="link-go-register" style="color:var(--color-agri-fresh); font-weight:600;">Create Farmer Account</a>
      </div>
    </div>
  `}function Jt(){return`
    <div class="auth-modal-box">
      <div class="auth-modal-header">
        <div class="auth-icon">🌱</div>
        <h2>Register New Farmer</h2>
        <p class="text-muted text-sm">Create account to link solar inverters & crop sensors</p>
      </div>

      <div class="auth-form-group">
        <label>Assigned Unique Farmer ID (System Generated)</label>
        <input type="text" id="reg-farmer-id" class="form-input" value="${`AGRI-`+Math.floor(1e4+Math.random()*9e4)+`-KA`}" readonly style="background:var(--bg-subtle); font-weight:bold; color:var(--color-agri-dark);" />
      </div>

      <div class="auth-form-group">
        <label>Full Name</label>
        <input type="text" id="reg-name" class="form-input" placeholder="e.g. Ramesh Kumar" />
      </div>

      <div class="auth-form-group">
        <label>Mobile Number (For SMS OTP Verification)</label>
        <input type="tel" id="reg-phone" class="form-input" placeholder="+91 98765 43210" />
      </div>

      <div class="auth-form-group">
        <label>Create Strong Password</label>
        <input type="password" id="reg-password" class="form-input" placeholder="Minimum 8 characters" />
      </div>

      <div class="auth-btn-stack" style="margin-top:1.5rem;">
        <button id="btn-submit-register" class="btn btn-primary" style="width:100%;">
          📲 Continue to Phone OTP Verification ➔
        </button>
      </div>

      <div class="auth-switch-footer">
        <span>Already registered?</span>
        <a href="#" id="link-go-login" style="color:var(--color-agri-fresh); font-weight:600;">Sign In</a>
      </div>
    </div>
  `}function Yt(e,t=`482910`){return`
    <div class="auth-modal-box text-center">
      <div class="auth-icon">📲</div>
      <h2>Phone Verification</h2>
      <p class="text-muted text-sm">
        We sent a 6-digit SMS verification code to <strong>${e}</strong>
      </p>

      <div class="demo-otp-banner" style="background:#FEF3C7; border:1px solid #F59E0B; padding:0.6rem; border-radius:8px; margin:1rem 0; font-size:0.85rem; color:#92400E;">
        ⚡ <strong>PROTOTYPE DEMO SIMULATOR:</strong><br/>
        Simulated SMS code is: <strong style="font-size:1.1rem; letter-spacing:2px;">${t}</strong>
      </div>

      <div class="otp-input-group" style="margin:1.5rem 0;">
        <input type="text" id="otp-input-code" class="form-input" maxlength="6" placeholder="• • • • • •" style="letter-spacing:10px; font-size:1.5rem; text-align:center; font-weight:bold;" autofocus />
      </div>

      <button id="btn-submit-verify-otp" class="btn btn-primary" style="width:100%;">
        ✓ Verify & Continue
      </button>

      <div style="margin-top:1rem; font-size:0.85rem; color:var(--text-muted);">
        Didn't receive code? <a href="#" id="btn-resend-otp" style="color:var(--color-agri-fresh);">Resend OTP</a>
      </div>
    </div>
  `}function Xt(){return`
    <div class="auth-modal-box text-center">
      <div class="biometric-pulse-container">
        <div class="fingerprint-scan-svg">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <path d="M 50,15 A 35,35 0 0,0 15,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,25 A 25,25 0 0,0 25,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,35 A 15,15 0 0,0 35,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,15 A 35,35 0 0,1 85,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,25 A 25,25 0 0,1 75,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,35 A 15,15 0 0,1 65,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <line x1="50" y1="45" x2="50" y2="75" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
          </svg>
          <div class="laser-scanner-line"></div>
        </div>
      </div>

      <h3 style="margin-top:1rem;">Scanning Device Biometrics...</h3>
      <p class="text-sm text-muted">Touch your fingerprint sensor or look at the camera for Face ID</p>

      <div style="margin-top:1.5rem; display:flex; gap:0.5rem; justify-content:center;">
        <button id="btn-cancel-biometric" class="btn btn-sm btn-secondary">
          Cancel / Use Password
        </button>
      </div>
    </div>
  `}function Zt(e,t){return`
    <div class="auth-modal-box">
      <div class="auth-modal-header text-center">
        <div class="auth-icon" style="background:#FEE2E2; color:#DC2626;">🔒</div>
        <h2>Re-Authentication Required</h2>
        <p class="text-sm text-muted"><strong>${e}</strong></p>
      </div>

      <div class="alert alert-warning" style="background:#FFFBEB; border:1px solid #F59E0B; padding:0.75rem; border-radius:8px; margin-bottom:1.25rem; font-size:0.85rem; color:#92400E;">
        ⚠️ <strong>Security Policy:</strong> ${t}
      </div>

      <div class="auth-form-group">
        <label>Enter Master Password</label>
        <input type="password" id="reauth-password" class="form-input" placeholder="Password (default: Farmer@123)" />
      </div>

      <div class="auth-btn-stack" style="margin-top:1.25rem;">
        <button id="btn-confirm-reauth" class="btn btn-primary" style="width:100%;">
          Authorize Action
        </button>
        <button id="btn-biometric-reauth" class="btn btn-secondary" style="width:100%;">
          👆 Authorize via Biometrics
        </button>
        <button id="btn-cancel-reauth" class="btn btn-outline" style="width:100%;">
          Cancel
        </button>
      </div>
    </div>
  `}var U={isOpen:!1,isListening:!1,isSpeaking:!1,isMuted:!1,speechRate:1,voiceAlertsEnabled:!0,chatHistory:[],voices:[],activeUtterance:null,recognition:null,currentView:`home`},W={en:[`en-IN`,`en-US`,`en-GB`],hi:[`hi-IN`,`hi`],kn:[`kn-IN`,`kn`],ta:[`ta-IN`,`ta`],te:[`te-IN`,`te`],mr:[`mr-IN`,`mr`]};function G(e=`chime`){if(typeof window<`u`)try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;let n=new t,r=n.currentTime;if(e===`listen`){let e=n.createOscillator(),t=n.createGain();e.type=`sine`,e.frequency.setValueAtTime(880,r),e.frequency.exponentialRampToValueAtTime(1320,r+.12),t.gain.setValueAtTime(.12,r),t.gain.exponentialRampToValueAtTime(.01,r+.22),e.connect(t),t.connect(n.destination),e.start(r),e.stop(r+.22)}else if(e===`alert`){let e=n.createOscillator(),t=n.createGain();e.type=`sawtooth`,e.frequency.setValueAtTime(480,r),e.frequency.setValueAtTime(360,r+.18),e.frequency.setValueAtTime(480,r+.36),t.gain.setValueAtTime(.2,r),t.gain.exponentialRampToValueAtTime(.01,r+.55),e.connect(t),t.connect(n.destination),e.start(r),e.stop(r+.55)}else if(e===`success`)[523.25,659.25,783.99].forEach((e,t)=>{let i=n.createOscillator(),a=n.createGain();i.type=`sine`,i.frequency.setValueAtTime(e,r+t*.08),a.gain.setValueAtTime(.1,r+t*.08),a.gain.exponentialRampToValueAtTime(.01,r+t*.08+.2),i.connect(a),a.connect(n.destination),i.start(r+t*.08),i.stop(r+t*.08+.2)});else{let e=n.createOscillator(),t=n.createGain();e.type=`sine`,e.frequency.setValueAtTime(523.25,r),e.frequency.exponentialRampToValueAtTime(783.99,r+.14),t.gain.setValueAtTime(.15,r),t.gain.exponentialRampToValueAtTime(.01,r+.32),e.connect(t),t.connect(n.destination),e.start(r),e.stop(r+.32)}}catch{}}function Qt(){typeof window<`u`&&`speechSynthesis`in window&&(U.voices=window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged!==void 0&&(window.speechSynthesis.onvoiceschanged=()=>{U.voices=window.speechSynthesis.getVoices()}))}function $t(e){let t=W[e]||[`en-IN`,`en`];(!U.voices||U.voices.length===0)&&(U.voices=window.speechSynthesis?window.speechSynthesis.getVoices():[]);for(let e of t){let t=U.voices.find(t=>t.lang.toLowerCase().replace(`_`,`-`)===e.toLowerCase());if(t)return t}for(let e of t){let t=e.split(`-`)[0].toLowerCase(),n=U.voices.find(e=>e.lang.toLowerCase().startsWith(t));if(n)return n}return U.voices.find(e=>e.lang.toLowerCase().includes(`en-in`)||e.name.toLowerCase().includes(`india`))||U.voices.find(e=>e.default)||U.voices[0]||null}function en(){typeof window<`u`&&`speechSynthesis`in window&&window.speechSynthesis.cancel(),U.isSpeaking=!1,U.activeUtterance=null,q(!1)}function K(e,t,n){if(U.isMuted||typeof window>`u`||!(`speechSynthesis`in window)){t&&t(),n&&n();return}en();let r=i()||`en`,a=e.replace(/[*_#`[\]]/g,``).replace(/\s+/g,` `).trim();if(!a)return;let o=new SpeechSynthesisUtterance(a);o.lang=W[r]&&W[r][0]||`en-IN`,o.rate=U.speechRate,o.pitch=1;let s=$t(r);s&&(o.voice=s),o.onstart=()=>{U.isSpeaking=!0,q(!0),t&&t()},o.onend=()=>{U.isSpeaking=!1,q(!1),n&&n()},o.onerror=e=>{console.warn(`Voice Assistant TTS warning:`,e),U.isSpeaking=!1,q(!1),n&&n()},U.activeUtterance=o,window.speechSynthesis.speak(o)}function q(e){document.querySelectorAll(`.voice-wave-bar, .pulse-on-speak`).forEach(t=>{e?t.classList.add(`speaking`):t.classList.remove(`speaking`)});let t=document.getElementById(`btn-header-voice`);t&&(e?t.classList.add(`speaking-active`):t.classList.remove(`speaking-active`));let n=document.getElementById(`voice-status-text`);n&&(n.textContent=U.isSpeaking?o(`voiceStatusSpeaking`)||`Speaking...`:U.isListening?o(`voiceStatusListening`)||`Listening... Please speak now`:o(`voiceStatusIdle`)||`Tap microphone or ask a question below`)}function tn(){if(typeof window>`u`)return;let e=window.SpeechRecognition||window.webkitSpeechRecognition;if(!e)console.info(`Web Speech Recognition API not natively supported in this browser; text input available.`);else try{let t=new e;t.continuous=!1,t.interimResults=!0,t.maxAlternatives=1,t.onstart=()=>{U.isListening=!0,G(`listen`);let e=document.getElementById(`btn-voice-mic`);e&&e.classList.add(`listening`);let t=document.getElementById(`voice-status-text`);t&&(t.textContent=o(`voiceStatusListening`)||`Listening... Please speak now`)},t.onresult=e=>{let t=Array.from(e.results).map(e=>e[0].transcript).join(``),n=document.getElementById(`voice-text-input`);n&&(n.value=t),e.results[0].isFinal&&on(t)},t.onerror=e=>{console.warn(`Speech Recognition notice:`,e.error),U.isListening=!1;let t=document.getElementById(`btn-voice-mic`);t&&t.classList.remove(`listening`),q(!1)},t.onend=()=>{U.isListening=!1;let e=document.getElementById(`btn-voice-mic`);e&&e.classList.remove(`listening`),q(!1)},U.recognition=t}catch(e){console.warn(`Speech Recognition setup error:`,e)}}function nn(){if(U.isSpeaking&&en(),U.recognition||tn(),U.recognition){let e=i()||`en`;U.recognition.lang=W[e]&&W[e][0]||`en-IN`;try{U.recognition.start()}catch{try{U.recognition.stop(),setTimeout(()=>U.recognition.start(),200)}catch{}}}else{let e=document.getElementById(`voice-text-input`);e&&(e.focus(),e.placeholder=`Please type your question here...`)}}function rn(){if(U.recognition&&U.isListening)try{U.recognition.stop()}catch{}U.isListening=!1}function an(e){let t=i()||`en`,n=(e||``).toLowerCase().trim(),r=O(),a=r.solarPowerOutputWatts||2840,o=(r.solarEnergyTodayKwh||18.6).toFixed(1),s=r.battery?r.battery.chargePercent:88,c=r.battery?(r.battery.estimatedBackupHours||9.4).toFixed(1):`9.4`,l=(r.soilMoisture||46.2).toFixed(1),u=r.cropComfortScore||92,d=(r.panelAngleDeg||35).toFixed(0),f=(r.windSpeedKmh||14.2).toFixed(1),p=(r.rainfallMm||0).toFixed(1),m=(r.dailyCostSaved||112.5).toFixed(0),h=/(crop|plant|health|leaf|par|photosynthesis|tomato|grow|shade|फसल|पौध|पत्ते|स्वास्थ्य|धूप|छांव|बೆಳೆ|ಗಿಡ|ಆರೋಗ್ಯ|ಎಲೆ|ಪಯಿರ್|செடி|ஆரோக்கியம்|இலை|పంట|మొక్క|ఆరోగ్యం|ఆకు|पीक|झाड|आरोग्य|पान)/i.test(n),g=/(solar|power|energy|generation|watt|kwh|panel|output|electric|सौर|बिजली|ऊर्जा|उत्पादन|वाट|पैनल|ಸೌರ|ವಿದ್ಯುತ್|ಶಕ್ತಿ|ಉತ್ಪಾದನೆ|வ್ಯಾಟ್|சூரிய|மின்சாரம்|மின்|உற்பத்தி|వాట్|సౌర|విద్యుత్|శక్తి|ఉత్పత్తి|वीज|निर्मिती)/i.test(n),_=/(battery|charge|backup|soc|volt|storage|percentage|बैटरी|चार्ज|बैकअप|वोल्ट|स्टोरेज|ब್ಯಾಟರಿ|ಚಾರ್ಜ್|ಬ್ಯಾಕಪ್|பேட்டரி|சார்ஜ்|பேக்கப்|బ్యాటరీ|ఛార్జ్|బ్యాకప్|बॅटरी|बॅकअप)/i.test(n),v=/(irrigate|irrigation|water|moisture|soil|pump|drip|wet|सिंचाई|पानी|नमी|मिट्टी|पंप|ड्रिप|ನೀರಾವರಿ|ನೀರು|ತೇವಾಂಶ|ಮಣ್ಣು|ಪಂಪ್|பாசனம்|தண்ணீர்|ஈரப்பதம்|மண்|பம்ப்|సాగునీరు|నీరు|తేమ|నేల|పంపు|सिंचन|पाणी|ओलावा|माती)/i.test(n),y=/(angle|tilt|position|why|stow|motor|kinematics|actuator|कोण|झुकाव|पोजीशन|क्यों|मोटर|ಕೋನ|ತಿರುವು|ಸ್ಥಾನ|ಏಕೆ|கோணம்|சாய்வு|நிலை|ஏன்|కోణం|వంపు|స్థానం|ఎందుకు|कोन|स्थिती|का)/i.test(n),b=/(alert|warning|emergency|alarm|incident|danger|problem|अलर्ट|चेतावनी|खतरा|समस्या|अलार्म|ಎಚ್ಚರಿಕೆ|ಅಪಾಯ|ಸಮಸ್ಯೆ|எச்சரிக்கை|ஆபத்து|பிரச்சனை|హెచ్చరిక|ప్రమాదం|సమస్య|सूचना|धोका)/i.test(n),x=/(weather|rain|wind|storm|forecast|cloud|temp|मौसम|बारिश|हवा|तूफान|बादल|तापमान|ಹವಾಮಾನ|ಮಳೆ|ಗಾಳಿ|ಬಿರುಗಾಳಿ|வானிலை|மழை|காற்று|புயல்|వాతావరణం|వర్షం|గాలి|తుఫాను|हवामान|पाऊस|वारा|वादळ)/i.test(n);/(summary|overview|screen|report|read|status|everything|all|सारांश|रिपोर्ट|स्क्रीन|हालत|पढ़ो|सब|ಸಾರಾಂಶ|ವರದಿ|ಪರದೆ|ಸ್ಥಿತಿ|ಓದಿ|சுருக்கம்|அறிக்கை|திரை|நிலை|படி|సారాంశం|నివేదిక|స్క్రీన్|అంతా|अहवाल|सर्व)/i.test(n);let S=``,C=``;if(h)t===`hi`?(S=`🌿 **फसल स्वास्थ्य: उत्कृष्ट (${u}% स्कोर)**\n• वर्तमान PAR प्रकाश: पर्याप्त अवशोषण (82% छांव अनुपात)\n• मिट्टी में नमी: ${l}%\n• पत्ती तापमान: 25.8°C (आदर्श)\n👉 सलाह: टमाटर की फसल पूरी तरह स्वस्थ है। पैनल सही प्रकाश दे रहे हैं।`,C=`फसल स्वास्थ्य उत्कृष्ट है, कुल स्कोर ${u} प्रतिशत है। मिट्टी में नमी ${l} प्रतिशत है और पैनल फसलों को पर्याप्त धूप दे रहे हैं।`):t===`kn`?(S=`🌿 **ಬೆಳೆಗಳ ಆರೋಗ್ಯ: ಅತ್ಯುತ್ತಮ (${u}% ಸ್ಕೋರ್)**\n• ಪ್ರಸ್ತುತ PAR ಬೆಳಕು: ಸೂಕ್ತ ಹೀರಿಕೊಳ್ಳುವಿಕೆ (82% ನೆರಳು ಅನುಪಾತ)\n• ಮಣ್ಣಿನ ತೇವಾಂಶ: ${l}%\n• ಎಲೆಯ ಉಷ್ಣತೆ: 25.8°C\n👉 ಸಲಹೆ: ಟೊಮೆಟೊ ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಯಾವುದೇ ಕೊರತೆಯಿಲ್ಲ.`,C=`ಬೆಳೆಗಳ ಆರೋಗ್ಯ ಅತ್ಯುತ್ತಮವಾಗಿದೆ, ಸ್ಕೋರ್ ${u} ಪ್ರತಿಶತ. ಮಣ್ಣಿನ ತೇವಾಂಶ ${l} ಪ್ರತಿಶತವಿದ್ದು, ಸೌರ ಫಲಕಗಳು ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ ಬಿಸಿಲು ಒದಗಿಸುತ್ತಿವೆ.`):t===`ta`?(S=`🌿 **பயிர் ஆரோக்கியம்: மிகச்சிறந்தது (${u}% மதிப்பெண்)**\n• PAR ஒளி உறிஞ்சுதல்: 82% உகந்தது\n• மண் ஈரப்பதம்: ${l}%\n• இலை வெப்பநிலை: 25.8°C\n👉 ஆலோசனை: தக்காளி பயிர்கள் செழிப்பாக வளர்கின்றன.`,C=`பயிர் ஆரோக்கியம் மிகச்சிறப்பாக உள்ளது. மண் ஈரப்பதம் ${l} சதவீதம். பேனல்கள் பயிர்களுக்கு தேவையான சூரிய ஒளியை வழங்குகின்றன.`):t===`te`?(S=`🌿 **పంట ఆరోగ్యం: చాలా బాగుంది (${u}% స్కోరు)**\n• PAR కాంతి లభ్యత: 82% అనుకూలమైనది\n• నేలలో తేమ: ${l}%\n• ఆకుల ఉష్ణోగ్రత: 25.8°C\n👉 సలహా: టమాట పంట ఆరోగ్యంగా ఉంది.`,C=`పంట ఆరోగ్యం చాలా బాగుంది, స్కోరు ${u} శాతం. నేలలో తేమ ${l} శాతం ఉంది మరియు పంటలకు సరైన ఎండ లభిస్తోంది.`):t===`mr`?(S=`🌿 **पिकांचे आरोग्य: उत्तम (${u}% स्कोअर)**\n• प्रकाश शोषण (PAR): 82% अनुकूल\n• मातीतील ओलावा: ${l}%\n• पानांचे तापमान: 25.8°C\n👉 सल्ला: टोमॅटो पिके निरोगी असून प्रकाश संश्लेषण व्यवस्थित सुरू आहे.`,C=`पिकांचे आरोग्य उत्तम असून स्कोअर ${u} टक्के आहे. मातीतील ओलावा ${l} टक्के आहे आणि पिकांना पुरेशी धूप मिळत आहे.`):(S=`🌿 **Crop Health: Optimal (${u}% Comfort Score)**\n• Canopy PAR Sunlight: 82% saturation (No sun-starvation)\n• Soil Moisture: ${l}%\n• Leaf Canopy Temp: 25.8°C\n👉 Recommendation: Tomatoes are flourishing under modulated canopy shade.`,C=`Crop health is optimal with a ${u} percent comfort score. Soil moisture is ${l} percent, and panels are filtering ideal sunlight without starving root beds.`);else if(g)t===`hi`?(S=`☀️ **सौर उत्पादन रिपोर्ट**\n• वर्तमान उत्पादन: ${(a/1e3).toFixed(2)} kW (${a} W)\n• आज की कुल ऊर्जा: ${o} kWh\n• इन्वर्टर दक्षता: 97.4%\n• आज की बचत: ₹${m}`,C=`वर्तमान सौर ऊर्जा उत्पादन ${(a/1e3).toFixed(2)} किलोवॉट है। आज कुल ${o} यूनिट बिजली बनी है, जिससे लगभग ₹${m} की बचत हुई है।`):t===`kn`?(S=`☀️ **ಸೌರ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ**\n• ಪ್ರಸ್ತುತ ಶಕ್ತಿ: ${(a/1e3).toFixed(2)} kW (${a} W)\n• ಇಂದಿನ ಒಟ್ಟು ವಿದ್ಯುತ್: ${o} kWh\n• ಇನ್ವರ್ಟರ್ ದಕ್ಷತೆ: 97.4%\n• ಇಂದಿನ ಉಳಿತಾಯ: ₹${m}`,C=`ಪ್ರಸ್ತುತ ಸೌರ ಶಕ್ತಿ ಉತ್ಪಾದನೆ ${(a/1e3).toFixed(2)} ಕಿಲೋವ್ಯಾಟ್ ಆಗಿದೆ. ಇಂದು ಒಟ್ಟು ${o} ಯೂನಿಟ್ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆಯಾಗಿದ್ದು, ₹${m} ಉಳಿತಾಯವಾಗಿದೆ.`):t===`ta`?(S=`☀️ **சூரிய மின் உற்பத்தி விவரம்**\n• தற்போதைய மின்சாரம்: ${(a/1e3).toFixed(2)} kW\n• இன்றைய மொத்த உற்பத்தி: ${o} kWh\n• சேமிப்பு மதிப்பு: ₹${m}`,C=`தற்போதைய சூரிய மின் உற்பத்தி ${(a/1e3).toFixed(2)} கிலோவாட் ஆகும். இன்று மொத்தம் ${o} யூனிட் உற்பத்தியாகி ₹${m} சேமிக்கப்பட்டுள்ளது.`):t===`te`?(S=`☀️ **సౌర విద్యుత్ నివేదిక**\n• ప్రస్తుత ఉత్పత్తి: ${(a/1e3).toFixed(2)} kW\n• నేటి మొత్తం విద్యుత్: ${o} kWh\n• నేటి ఆదా: ₹${m}`,C=`ప్రస్తుత సౌర విద్యుత్ ఉత్పత్తి ${(a/1e3).toFixed(2)} కిలోవాట్లు. ఈరోజు మొత్తం ${o} యూనిట్ల విద్యుత్ ఉత్పత్తి అయింది మరియు ₹${m} ఆదా అయింది.`):t===`mr`?(S=`☀️ **सौर ऊर्जा निर्मिती अहवाल**\n• सध्याची वीज निर्मिती: ${(a/1e3).toFixed(2)} kW\n• आजची एकूण ऊर्जा: ${o} kWh\n• आजची बचत: ₹${m}`,C=`सध्या सौर ऊर्जा निर्मिती ${(a/1e3).toFixed(2)} किलोवॅट आहे. आज एकूण ${o} युनिट्स वीज तयार झाली असून ₹${m} ची बचत झाली आहे.`):(S=`☀️ **Solar Generation Status**\n• Current Power: ${(a/1e3).toFixed(2)} kW (${a} W)\n• Total Energy Today: ${o} kWh\n• Inverter Efficiency: 97.4%\n• Daily Savings: ₹${m}`,C=`Current solar power generation is ${(a/1e3).toFixed(2)} kilowatts. Total energy harvested today is ${o} kilowatt-hours, saving approximately ₹${m}.`);else if(_)t===`hi`?(S=`🔋 **बैटरी और स्टोरेज स्थिति**\n• चार्ज स्तर (SoC): ${s}%\n• अनुमानित बैकअप: ${c} घंटे\n• बैटरी स्वास्थ्य: 96% (LiFePO4 सेल)\n• वोल्टेज: 52.8 V (सुरक्षित और स्थिर)`,C=`आपकी LiFePO4 बैटरी ${s} प्रतिशत चार्ज है, जो लगभग ${c} घंटे का बैकअप दे सकती है। बैटरी स्वास्थ्य 96 प्रतिशत है।`):t===`kn`?(S=`🔋 **ಬ್ಯಾಟರಿ ಸ್ಥಿತಿ ಮತ್ತು ಬ್ಯಾಕಪ್**\n• ಚಾರ್ಜ್ ಮಟ್ಟ: ${s}%\n• ಅಂದಾಜು ಬ್ಯಾಕಪ್: ${c} ಗಂಟೆಗಳು\n• ಬ್ಯಾಟರಿ ಆರೋಗ್ಯ: 96% (LiFePO4)\n• ವೋಲ್ಟೇಜ್: 52.8 V`,C=`ಬ್ಯಾಟರಿ ಚಾರ್ಜ್ ${s} ಪ್ರತಿಶತ ಇದೆ. ಇದು ಸುಮಾರು ${c} ಗಂಟೆಗಳ ಕಾಲ ತಡೆರಹಿತ ವಿದ್ಯುತ್ ಬ್ಯಾಕಪ್ ನೀಡಬಲ್ಲದು.`):t===`ta`?(S=`🔋 **பேட்டரி நிலை**\n• சார்ஜ் அளவு: ${s}%\n• பேக்கப் நேரம்: ${c} மணிநேரம்\n• பேட்டரி ஆரோக்கியம்: 96% (LiFePO4)\n• மின்னழுத்தம்: 52.8 V`,C=`பேட்டரி ${s} சதவீதம் சார்ஜ் ஆகியுள்ளது. சுமார் ${c} மணிநேர மின்சார பேக்கப் வழங்க முடியும்.`):t===`te`?(S=`🔋 **బ్యాటరీ మరియు బ్యాకప్ స్థితి**\n• ఛార్జ్ స్థాయి: ${s}%\n• బ్యాకప్ సమయం: ${c} గంటలు\n• బ్యాటరీ ఆరోగ్యం: 96% (LiFePO4)\n• వోల్టేజ్: 52.8 V`,C=`బ్యాటరీ ${s} శాతం ఛార్జ్ చేయబడింది. ఇది సుమారు ${c} గంటల పాటు నిరంతర విద్యుత్ బ్యాకప్ అందిస్తుంది.`):t===`mr`?(S=`🔋 **बॅटरी आणि बॅकअप स्थिती**\n• चार्ज पातळी: ${s}%\n• अंदाजे बॅकअप: ${c} तास\n• बॅटरीचे आरोग्य: 96% (LiFePO4)\n• व्होल्टेज: 52.8 V`,C=`बॅटरी ${s} टक्के चार्ज आहे आणि सुमारे ${c} तास अखंड बॅकअप देऊ शकते. बॅटरीचे आरोग्य 96 टक्के आहे.`):(S=`🔋 **Battery & Storage Status**\n• Charge Level (SoC): ${s}%\n• Estimated Backup: ${c} hours\n• Cell Health: 96% (LiFePO4 Industrial Grade)\n• Voltage: 52.8 V (Nominal)`,C=`Battery storage is at ${s} percent, providing an estimated ${c} hours of continuous farm backup. Battery health is excellent at 96 percent.`);else if(v){let e=parseFloat(l)<38;t===`hi`?(S=e?`💧 **सिंचाई सलाह: सिंचाई आवश्यक है!**\n• मिट्टी की नमी: ${l}% (न्यूनतम सीमा 38%)\n👉 सलाह: ड्रिप पंप तुरंत 30 मिनट के लिए चालू करें।`:`💧 **सिंचाई सलाह: अभी आवश्यकता नहीं है**\n• मिट्टी की नमी: ${l}% (आदर्श सीमा: 40-60%)\n• बारिश की संभावना: 15%\n👉 सलाह: मिट्टी में पर्याप्त नमी है। अगली सिंचाई शाम 5:30 बजे निर्धारित है।`,C=e?`मिट्टी की नमी ${l} प्रतिशत हो गई है, कृपया 30 मिनट के लिए ड्रिप सिंचाई शुरू करें।`:`मिट्टी में नमी ${l} प्रतिशत है, जो बिल्कुल पर्याप्त है। अभी सिंचाई करने की आवश्यकता नहीं है।`):t===`kn`?(S=e?`💧 **ನೀರಾವರಿ ಸಲಹೆ: ನೀರುಣಿಸುವುದು ಅಗತ್ಯವಿದೆ!**\n• ಮಣ್ಣಿನ ತೇವಾಂಶ: ${l}%\n👉 ಸಲಹೆ: ಹನಿ ನೀರಾವರಿ ಪಂಪ್ ಅನ್ನು 30 ನಿಮಿಷಗಳ ಕಾಲ ಆನ್ ಮಾಡಿ.`:`💧 **ನೀರಾವರಿ ಸಲಹೆ: ಈಗ ನೀರಿನ ಅಗತ್ಯವಿಲ್ಲ**\n• ಮಣ್ಣಿನ ತೇವಾಂಶ: ${l}% (ಉತ್ತಮ ಸ್ಥಿತಿ)\n👉 ಸಲಹೆ: ಮಣ್ಣಿನಲ್ಲಿ ಸೂಕ್ತ ತೇವಾಂಶವಿದೆ. ಸಂಜೆ 5:30 ಕ್ಕೆ ಮುಂದಿನ ಹನಿ ನೀರಾವರಿ ನಿಗದಿಯಾಗಿದೆ.`,C=e?`ಮಣ್ಣಿನ ತೇವಾಂಶ ಕಡಿಮೆಯಾಗಿದೆ, ದಯವಿಟ್ಟು 30 ನಿಮಿಷಗಳ ಕಾಲ ನೀರಾವರಿ ಪಂಪ್ ಆನ್ ಮಾಡಿ.`:`ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ ${l} ಪ್ರತಿಶತವಿದ್ದು, ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಸದ್ಯಕ್ಕೆ ನೀರುಣಿಸುವ ಅಗತ್ಯವಿಲ್ಲ.`):t===`ta`?(S=e?`💧 **பாசன ஆலோசனை: உடனடியாக நீர் பாய்ச்சவும்!**\n• மண் ஈரப்பதம்: ${l}%`:`💧 **பாசன ஆலோசனை: இப்போது பாசனம் தேவையில்லை**\n• மண் ஈரப்பதம்: ${l}% (போதுமானது)\n👉 அடுத்த பாசனம் மாலை 5:30 மணிக்கு திட்டமிடப்பட்டுள்ளது.`,C=e?`மண் ஈரப்பதம் குறைவாக உள்ளது, சொட்டு நீர் பாசனத்தை தொடங்கவும்.`:`மண்ணில் ${l} சதவீதம் போதுமான ஈரப்பதம் உள்ளது. இப்போது பாசனம் செய்ய தேவையில்லை.`):t===`te`?(S=e?`💧 **సాగునీటి సలహా: నీరు అందించడం అవసరం!**\n• నేలలో తేమ: ${l}%`:`💧 **సాగునీటి సలహా: ఇప్పుడు నీరు అవసరం లేదు**\n• నేలలో తేమ: ${l}% (సరిపడా ఉంది)\n👉 తదుపరి బిందు సేద్యం సాయంత్రం 5:30 గంటలకు షెడ్యూల్ చేయబడింది.`,C=e?`నేలలో తేమ తగ్గింది, దయచేసి బిందు సేద్యం ప్రారంభించండి.`:`నేలలో తేమ ${l} శాతం ఉంది, ఇది సరిపోతుంది. ఇప్పుడు సాగునీరు అవసరం లేదు.`):t===`mr`?(S=e?`💧 **सिंचन सल्ला: पाणी देणे आवश्यक आहे!**\n• मातीतील ओलावा: ${l}%`:`💧 **सिंचन सल्ला: आता सिंचनाची गरज नाही**\n• मातीतील ओलावा: ${l}% (समाधानकारक)\n👉 पुढील ठिबक सिंचन सायंकाळी 5:30 वाजता नियोजित आहे.`,C=e?`मातीतील ओलावा कमी झाला आहे, कृपया ठिबक सिंचन सुरू करा.`:`मातीतील ओलावा ${l} टक्के आहे, जो पुरेसा आहे. सध्या पाणी देण्याची गरज नाही.`):(S=e?`💧 **Irrigation Recommendation: Pumping Recommended!**\n• Soil Moisture: ${l}% (Below 38% cutoff)\n👉 Action: Engage 30-minute drip cycle on Zone A.`:`💧 **Irrigation Recommendation: No Water Needed Now**\n• Soil Moisture: ${l}% (Target: 40-60% optimal)\n• Rain Probability: 15%\n👉 Recommendation: Moisture is healthy. Next scheduled cycle is at 17:30.`,C=e?`Soil moisture has dropped to ${l} percent. Engaging smart drip irrigation is recommended.`:`Soil moisture is healthy at ${l} percent. Pumping is not required right now; crops are well hydrated.`)}else if(y)t===`hi`?(S=`📐 **पैनल पोजीशनिंग: ${d}° (AI स्वीट स्पॉट मोड)**\n• ऊंचाई: 3.5 मीटर एलिवेटेड संरचना\n• झुकाव कारण: 82% फसल प्रकाश अवशोषण और 2.8kW अधिकतम सौर उत्पादन के बीच पूर्ण संतुलन।\n• हवा की गति: ${f} km/h (सामान्य)`,C=`सोलर पैनल वर्तमान में ${d} डिग्री के कोण पर झुके हुए हैं। यह कोण फसलों को धूप देने और बिजली बनाने का सही संतुलन प्रदान करता है।`):t===`kn`?(S=`📐 **ಫಲಕದ ಕೋನ: ${d}° (AI ಸ್ವೀಟ್ ಸ್ಪಾಟ್ ಮೋಡ್)**\n• ಎತ್ತರ: 3.5 ಮೀಟರ್ ಎತ್ತರದ ಕಂಬ\n• ಕಾರಣ: ಬೆಳೆಗಳ ಬೆಳವಣಿಗೆಗೆ ಶೇ 82% ಬಿಸಿಲು ಮತ್ತು 2.8 kW ಸೌರ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆಗೆ ಸಮತೋಲನ.\n• ಗಾಳಿಯ ವೇಗ: ${f} km/h`,C=`ಸೌರ ಫಲಕಗಳು ಪ್ರಸ್ತುತ ${d} ಡಿಗ್ರಿ ಕೋನದಲ್ಲಿವೆ. ಇದು ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ ಬಿಸಿಲು ಮತ್ತು ಹೆಚ್ಚಿನ ವಿದ್ಯುತ್ ನೀಡುವ ಸಮತೋಲಿತ ಸ್ಥಾನವಾಗಿದೆ.`):t===`ta`?(S=`📐 **பேனல் கோணம்: ${d}° (AI ஸ்வீட் ஸ்பாட்)**\n• காரணம்: பயிர்களுக்கு 82% சூரிய ஒளியையும், 2.8 kW மின்சாரத்தையும் சமநிலையில் வழங்குகிறது.`,C=`சோலார் பேனல்கள் தற்போது ${d} டிகிரி கோணத்தில் உள்ளன. இது பயிர் வளர்ச்சிக்கும் மின் உற்பத்திக்கும் சிறந்த சமநிலையாகும்.`):t===`te`?(S=`📐 **ప్యానెల్ కోణం: ${d}° (AI స్వీట్ స్పాట్)**\n• కారణం: పంటలకు 82% కాంతి మరియు 2.8 kW విద్యుత్ ఉత్పత్తికి సరైన సమతుల్యత.`,C=`సోలార్ ప్యానెల్స్ ప్రస్తుతం ${d} డిగ్రీల కోణంలో ఉన్నాయి. ఇది పంటలకు అవసరమైన ఎండ మరియు గరిష్ట విద్యుత్‌ను సమతుల్యం చేస్తుంది.`):t===`mr`?(S=`📐 **पॅनेलचा कोन: ${d}° (AI स्वीट स्पॉट)**\n• कारण: पिकांना 82% प्रकाश आणि 2.8 kW वीज निर्मितीचा परिपूर्ण समतोल.`,C=`सौर पॅनेल सध्या ${d} अंशांच्या कोनावर आहेत. हे पिकांना ऊन आणि जास्तीत जास्त वीज निर्मितीसाठी योग्य संतुलन देते.`):(S=`📐 **Panel Positioning: ${d}° (AI Sweet Spot Mode)**\n• Stanchion Height: 3.5m elevated clearance\n• Optimization Rationale: Balances 82% Photosynthetic Radiation for tomatoes with 2.8kW solar generation.\n• Wind Speed: ${f} km/h (Safe)`,C=`Panels are currently tilted at ${d} degrees in AI Sweet Spot Mode. This balances 82 percent crop photosynthesis with 2.8 kilowatts of clean solar power.`);else if(b){let e=(r.activeAlerts||[]).filter(e=>e.status===`unresolved`);if(e.length===0)t===`hi`?(S=`✅ **कोई आपातकालीन चेतावनी नहीं है**
सभी सिस्टम और सेंसर सामान्य रूप से काम कर रहे हैं।`,C=`खेत में कोई आपातकालीन चेतावनी नहीं है। सभी सेंसर और सोलर पैनल सुचारू रूप से कार्य कर रहे हैं।`):t===`kn`?(S=`✅ **ಯಾವುದೇ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ**
ಎಲ್ಲಾ ಸೆನ್ಸರ್‌ಗಳು ಮತ್ತು ವ್ಯವಸ್ಥೆಗಳು ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.`,C=`ಯಾವುದೇ ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ. ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಸುರಕ್ಷಿತವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.`):(S=`✅ **No Active Emergency Alerts**
All farm IoT sensors, inverters, and actuators are functioning normally.`,C=`All systems are operating normally. There are no active emergency alerts on the farm.`);else{let t=e[0];S=`🚨 **सक्रिय अलर्ट (${e.length})**:\n• **${t.title}**: ${t.message}\n👉 अनुशंसित कार्रवाई: ${t.recommendedAction||`सिस्टम की निगरानी करें।`}`,C=`ध्यान दें: ${t.title}। ${t.message}`}}else x?t===`hi`?(S=`⛅ **मौसम की स्थिति**\n• हवा की गति: ${f} km/h (सुरक्षित सीमा < 45 km/h)\n• बारिश: ${p} mm (संभावना: 15%)\n• परिवेश तापमान: ${r.ambientTempC||26.2}°C\n👉 स्थिति: सोलर ट्रैकिंग और फसल विकास के लिए उत्तम मौसम।`,C=`मौसम अनुकूल है। हवा की गति ${f} किलोमीटर प्रति घंटा है और तापमान 26 डिग्री सेल्सियस है। तेज हवा की स्थिति में पैनल अपने आप 0 डिग्री पर मुड़ जाएंगे।`):t===`kn`?(S=`⛅ **ಹವಾಮಾನ ವರದಿ**\n• ಗಾಳಿಯ ವೇಗ: ${f} km/h\n• ಮಳೆ: ${p} mm\n• ತಾಪಮಾನ: ${r.ambientTempC||26.2}°C\n👉 ಸ್ಥಿತಿ: ಕೃಷಿ ಮತ್ತು ಸೌರ ಉತ್ಪಾದನೆಗೆ ಅನುಕೂಲಕರ ವಾತಾವರಣ.`,C=`ಹವಾಮಾನ ಉತ್ತಮವಾಗಿದೆ. ಗಾಳಿಯ ವೇಗ ${f} ಕಿಲೋಮೀಟರ್ ಪ್ರತಿ ಗಂಟೆ ಇದ್ದು, ಸೌರ ಫಲಕಗಳು ಸುರಕ್ಷಿತವಾಗಿವೆ.`):(S=`⛅ **Weather & Microclimate**\n• Wind Speed: ${f} km/h (Stow threshold: 45 km/h)\n• Rain Gauge: ${p} mm\n• Ambient Temp: ${r.ambientTempC||26.2}°C\n👉 Safety Status: Nominal. Automated 0° storm stow primed.`,C=`Weather conditions are ideal. Wind speed is ${f} kilometers per hour and ambient temperature is 26 degrees Celsius. Automated storm stowing is on standby.`):t===`hi`?(S=`📋 **खेत का समग्र सारांश:**\n• 🌿 फसल: स्वस्थ (आराम स्कोर ${u}%)\n• ☀️ सोलर: ${(a/1e3).toFixed(2)} kW उत्पादन (${o} kWh आज)\n• 🔋 बैटरी: ${s}% चार्ज (${c} घंटे बैकअप)\n• 💧 नमी: ${l}% (सिंचाई की आवश्यकता नहीं)\n• 📐 पैनल कोण: ${d}°`,C=`नमस्ते। आपकी फसल पूरी तरह स्वस्थ है। सोलर पैनल ${(a/1e3).toFixed(2)} किलोवॉट बिजली बना रहे हैं, बैटरी ${s} प्रतिशत चार्ज है, और मिट्टी में ${l} प्रतिशत नमी है।`):t===`kn`?(S=`📋 **ಕೃಷಿ ಸಮಗ್ರ ಸಾರಾಂಶ:**\n• 🌿 ಬೆಳೆ: ಆರೋಗ್ಯಕರ (${u}% ಸ್ಕೋರ್)\n• ☀️ ಸೌರ ಶಕ್ತಿ: ${(a/1e3).toFixed(2)} kW (${o} kWh ಇಂದು)\n• 🔋 ಬ್ಯಾಟರಿ: ${s}% (${c} ಗಂಟೆಗಳ ಬ್ಯಾಕಪ್)\n• 💧 ತೇವಾಂಶ: ${l}%\n• 📐 ಫಲಕದ ಕೋನ: ${d}°`,C=`ನಮಸ್ಕಾರ. ಬೆಳೆಗಳ ಆರೋಗ್ಯ ಉತ್ತಮವಾಗಿದೆ. ಸೌರ ಫಲಕಗಳು ${(a/1e3).toFixed(2)} ಕಿಲೋವ್ಯಾಟ್ ವಿದ್ಯುತ್ ಉತ್ಪಾದಿಸುತ್ತಿದ್ದು, ಬ್ಯಾಟರಿ ${s} ಪ್ರತಿಶತ ಚಾರ್ಜ್ ಆಗಿದೆ.`):t===`ta`?(S=`📋 **பண்ணை சுருக்கம்:**\n• 🌿 பயிர்: ஆரோக்கியமானது (${u}%)\n• ☀️ சூரிய மின்: ${(a/1e3).toFixed(2)} kW (${o} kWh)\n• 🔋 பேட்டரி: ${s}% (${c} மணிநேரம்)\n• 💧 ஈரப்பதம்: ${l}%`,C=`வணக்கம். பயிர்கள் ஆரோக்கியமாக உள்ளன. சோலார் ${(a/1e3).toFixed(2)} கிலோவாட் மின்சாரம் உற்பத்தி செய்கிறது, பேட்டரி ${s} சதவீதம் உள்ளது.`):t===`te`?(S=`📋 **వ్యవసాయ సారాంశం:**\n• 🌿 పంట: ఆరోగ్యంగా ఉంది (${u}%)\n• ☀️ సౌర విద్యుత్: ${(a/1e3).toFixed(2)} kW\n• 🔋 బ్యాటరీ: ${s}%\n• 💧 తేమ: ${l}%`,C=`నమస్కారం. పంటలు ఆరోగ్యంగా ఉన్నాయి. సోలార్ ${(a/1e3).toFixed(2)} కిలోవాట్ల విద్యుత్ ఉత్పత్తి చేస్తోంది, బ్యాటరీ ${s} శాతం ఉంది.`):t===`mr`?(S=`📋 **शेताचा सर्वसमावेशक सारांश:**\n• 🌿 पिके: निरोगी (${u}%)\n• ☀️ सौर: ${(a/1e3).toFixed(2)} kW निर्मिती\n• 🔋 बॅटरी: ${s}%\n• 💧 ओलावा: ${l}%`,C=`नमस्कार. पिके पूर्णपणे निरोगी आहेत. सौर पॅनेल ${(a/1e3).toFixed(2)} किलोवॅट वीज निर्माण करत आहेत आणि बॅटरी ${s} टक्के चार्ज आहे.`):(S=`📋 **Farm Intelligence Briefing:**\n• 🌿 Crop Health: ${u}% Comfort (Optimal photosynthesis)\n• ☀️ Solar Output: ${(a/1e3).toFixed(2)} kW (${o} kWh harvested today)\n• 🔋 Battery SoC: ${s}% (${c}h backup runtime)\n• 💧 Soil Moisture: ${l}% (Healthy root hydration)\n• 📐 Panel Position: ${d}° (AI Sweet Spot)`,C=`Hello. Your crops are flourishing with a ${u} percent comfort score. Solar output is currently ${(a/1e3).toFixed(2)} kilowatts, battery storage is at ${s} percent, and soil moisture is healthy at ${l} percent.`);return{responseText:S,spokenText:C}}function on(e){if(!e||!e.trim())return;document.getElementById(`voice-chat-messages`);let t=document.getElementById(`voice-text-input`);t&&(t.value=``),sn(`user`,e),G(`chime`);let{responseText:n,spokenText:r}=an(e);setTimeout(()=>{sn(`assistant`,n,r),K(r)},350)}function sn(e,t,n){let r=document.getElementById(`voice-chat-messages`);if(!r)return;let i=document.createElement(`div`);if(i.className=`voice-chat-bubble ${e}`,e===`user`)i.innerHTML=`
      <div class="bubble-header">
        <span class="bubble-sender">👨‍🌾 You</span>
      </div>
      <div class="bubble-body">${cn(t)}</div>
    `;else{let e=t.split(`
`).map(e=>e.startsWith(`•`)?`<div class="bubble-bullet">${e}</div>`:e.startsWith(`👉`)?`<div class="bubble-tip">${e}</div>`:e.trim().startsWith(`**`)?`<div class="bubble-strong">${e.replace(/\*\*/g,``)}</div>`:`<div>${e}</div>`).join(``);``+Date.now(),i.innerHTML=`
      <div class="bubble-header">
        <span class="bubble-sender">🤖 Kisan Vani AI</span>
        <button class="btn-bubble-replay" data-spoken="${encodeURIComponent(n||t)}" title="Speak this response aloud">
          🔊 Speak
        </button>
      </div>
      <div class="bubble-body">${e}</div>
    `,setTimeout(()=>{let e=i.querySelector(`.btn-bubble-replay`);e&&e.addEventListener(`click`,t=>{t.stopPropagation(),K(decodeURIComponent(e.getAttribute(`data-spoken`)||``))})},50)}r.appendChild(i),r.scrollTop=r.scrollHeight}function cn(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function ln(e){let t=i()||`en`,n=O(),r=e||U.currentView||`home`,a=``;a=r===`dashboard`?t===`hi`?`आईओटी डैशबोर्ड सारांश: वर्तमान में ${(n.solarPowerOutputWatts/1e3).toFixed(2)} किलोवॉट सौर ऊर्जा बन रही है। बैटरी ${n.battery.chargePercent}% चार्ज है और फसल कम्फर्ट स्कोर ${n.cropComfortScore}% है।`:`IoT Dashboard Summary: Solar panels are generating ${(n.solarPowerOutputWatts/1e3).toFixed(2)} kilowatts. Battery storage is at ${n.battery.chargePercent} percent, and crop comfort score is ${n.cropComfortScore} percent.`:r===`positioning`?t===`hi`?`पैनल पोजीशनिंग दृश्य: 3.5 मीटर ऊंचे फ्रेम पर सोलर पैनल ${n.panelAngleDeg} डिग्री पर झुके हैं। हाइड्रोलिक पिस्टन सुचारू रूप से कार्य कर रहा है और नीचे टमाटर की फसलों को पर्याप्त धूप मिल रही है।`:`Panel Positioning View: Panels on the 3.5 meter stanchion are positioned at ${n.panelAngleDeg} degrees. The telescoping hydraulic actuator is holding optimal elevation to preserve crop photosynthesis.`:r===`energy`?t===`hi`?`ऊर्जा और बैटरी दृश्य: आज कुल ${n.solarEnergyTodayKwh} यूनिट बिजली बनी है। बैटरी में ${n.battery.estimatedBackupHours} घंटे का बैकअप शेष है। ग्रिड निर्यात सुचारू रूप से जारी है।`:`Energy & Battery View: Today, ${n.solarEnergyTodayKwh} kilowatt-hours have been generated. Battery bank has ${n.battery.estimatedBackupHours} hours of backup capacity remaining with grid feed-in active.`:r===`camera`?t===`hi`?`क्रॉप कैमरा दृश्य: दक्षिण क्षेत्र के टमाटरों की 3 कैमरों से निगरानी की जा रही है। वनस्पति स्वास्थ्य सूचकांक सामान्य है और पत्तियों पर कोई फफूंद नहीं पाई गई है।`:`Crop Camera View: Real-time multispectral imaging across 3 crop zones shows healthy tomato canopy coverage with zero signs of damp rot.`:r===`alerts`?t===`hi`?`अलर्ट केंद्र: वर्तमान में सभी सुरक्षा प्रोटोकॉल सक्रिय हैं। तेज हवा या आंधी की स्थिति में स्वचालित 0 डिग्री स्टॉ मोड स्टैंडबाय पर है।`:`Alerts Center: All safety protocols are operational. Emergency 0 degree storm stowing and rainwater harvesting triggers are primed.`:t===`hi`?`सन-स्टार्व्ड ट्रैकर मुख्य पृष्ठ: आपकी 2.5 एकड़ टमाटर की फसल सुरक्षित है। सौर उत्पादन सामान्य है और एआई ऑप्टिमाइज़र सक्रिय है।`:`Sun-Starved Tracker Home: Your 2.5 acre tomato agrivoltaic system is operating in AI Sweet Spot mode with balanced crop and solar harvest.`,sn(`assistant`,`📢 **${o(`voiceReadScreenNotice`)||`Reading screen aloud:`}**\n${a}`,a),K(a)}function J(e=`test`,t=null){if(!U.voiceAlertsEnabled)return;G(`alert`);let n=``;n=t||(e===`wind`?o(`voiceAlertWindSpoken`)||`Emergency Alert: High wind speeds detected. Solar panels stowed flat to 0 degrees to protect equipment.`:e===`rain`?o(`voiceAlertRainSpoken`)||`Rain Alert: Rainfall detected. Panels tilted to 30 degrees to channel rainwater into drainage swales.`:e===`battery`?o(`voiceAlertBatteryLowSpoken`)||`Battery Alert: LiFePO4 battery has dropped below 20 percent. Emergency load shedding activated.`:e===`irrigation`?o(`voiceAlertIrrigationSpoken`)||`Irrigation Notice: Soil moisture is low. Smart drip irrigation recommended.`:o(`voiceAlertTestSpoken`)||`Attention farmer: Test voice alert. High wind warning active. Panels safely stowed flat at 0 degrees.`),un(n),K(n)}function un(e){let t=document.getElementById(`voice-alert-hud`);t||(t=document.createElement(`div`),t.id=`voice-alert-hud`,t.className=`voice-alert-hud`,document.body.appendChild(t)),t.innerHTML=`
    <div class="voice-alert-hud-inner">
      <div class="voice-alert-icon">🔊</div>
      <div class="voice-alert-text">
        <div class="voice-alert-title">VOICE BROADCAST ALERT</div>
        <div class="voice-alert-desc">${cn(e)}</div>
      </div>
      <div class="voice-alert-actions">
        <button id="btn-replay-hud-alert" class="btn btn-xs btn-accent" title="Replay voice announcement">🔁 Replay</button>
        <button id="btn-close-hud-alert" class="btn btn-xs btn-secondary" title="Dismiss">✕</button>
      </div>
    </div>
  `,t.classList.add(`visible`);let n=document.getElementById(`btn-replay-hud-alert`);n&&(n.onclick=()=>K(e));let r=document.getElementById(`btn-close-hud-alert`);r&&(r.onclick=()=>t.classList.remove(`visible`)),setTimeout(()=>{t&&t.classList.contains(`visible`)&&t.classList.remove(`visible`)},9e3)}function dn(){U.isOpen=!0;let e=document.getElementById(`kisan-voice-modal`);e&&(e.classList.add(`open`),e.setAttribute(`aria-hidden`,`false`)),G(`chime`);let t=document.getElementById(`voice-chat-messages`);if(t&&t.children.length===0){let e=o(`voiceWelcomeMsg`)||`Namaste! I am Kisan Vani AI. I can guide you on crop health, solar power, battery status, and irrigation advice in real time. How may I help you?`;sn(`assistant`,e,e),K(e)}}function fn(){U.isOpen=!1,en(),rn();let e=document.getElementById(`kisan-voice-modal`);e&&(e.classList.remove(`open`),e.setAttribute(`aria-hidden`,`true`))}function pn(){U.isOpen?fn():dn()}function mn(){let e=document.getElementById(`btn-floating-voice`);e||(e=document.createElement(`button`),e.id=`btn-floating-voice`,e.className=`btn-floating-voice pulse-on-speak`,e.setAttribute(`aria-label`,`Open Kisan Vani AI Voice Assistant`),e.setAttribute(`title`,`Kisan Vani AI — Multilingual Voice Assistant (Press V)`),e.innerHTML=`
      <div class="voice-floating-aura"></div>
      <div class="voice-floating-icon">🎙️</div>
      <div class="voice-floating-label">
        <span class="v-name" data-i18n="btnVoiceAssistant">${o(`btnVoiceAssistant`)||`Kisan Vani AI`}</span>
        <span class="v-wave">
          <span class="voice-wave-bar bar-1"></span>
          <span class="voice-wave-bar bar-2"></span>
          <span class="voice-wave-bar bar-3"></span>
          <span class="voice-wave-bar bar-4"></span>
        </span>
      </div>
    `,document.body.appendChild(e),e.addEventListener(`click`,pn));let t=document.getElementById(`kisan-voice-modal`);t||(t=document.createElement(`div`),t.id=`kisan-voice-modal`,t.className=`kisan-voice-modal`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=`
      <div class="voice-modal-backdrop" id="voice-modal-backdrop"></div>
      <div class="voice-modal-card">
        
        <!-- Modal Header -->
        <div class="voice-modal-header">
          <div class="voice-avatar-group">
            <div class="voice-avatar">
              <span class="avatar-icon">🌾</span>
              <div class="avatar-live-dot"></div>
            </div>
            <div class="voice-header-info">
              <div class="voice-header-title">
                <span data-i18n="voiceAssistantTitle">${o(`voiceAssistantTitle`)||`Kisan Vani AI — Farm Voice Assistant`}</span>
              </div>
              <div class="voice-header-sub" id="voice-status-text" data-i18n="voiceStatusIdle">
                ${o(`voiceStatusIdle`)||`Tap microphone or ask a question below`}
              </div>
            </div>
          </div>

          <div class="voice-header-controls">
            <!-- Mute Voice Button -->
            <button id="btn-voice-mute" class="btn-voice-tool" title="Mute/Unmute voice audio">
              <span id="voice-mute-icon">🔊</span>
            </button>
            
            <!-- Voice Speed Selector -->
            <select id="voice-speed-select" class="voice-speed-select" title="Speech Speed">
              <option value="1.0" data-i18n="voiceSpeedNormal">1.0x</option>
              <option value="0.85" data-i18n="voiceSpeedSlow">0.85x</option>
            </select>

            <!-- Close Assistant -->
            <button id="btn-close-voice" class="btn-voice-tool close-btn" title="Close Voice Assistant">✕</button>
          </div>
        </div>

        <!-- Chat Conversation Area -->
        <div class="voice-chat-messages" id="voice-chat-messages">
          <!-- Chat messages dynamically inserted here -->
        </div>

        <!-- Quick Prompt Suggestion Chips -->
        <div class="voice-chips-container" id="voice-chips-container">
          <div class="chips-scroll">
            <button class="voice-chip" data-query="How is crop health today?" data-i18n="voiceChipCrop">
              ${o(`voiceChipCrop`)||`🌿 Crop Health`}
            </button>
            <button class="voice-chip" data-query="What is solar generation output?" data-i18n="voiceChipSolar">
              ${o(`voiceChipSolar`)||`☀️ Solar Output`}
            </button>
            <button class="voice-chip" data-query="What is battery status and backup?" data-i18n="voiceChipBattery">
              ${o(`voiceChipBattery`)||`🔋 Battery & Backup`}
            </button>
            <button class="voice-chip" data-query="Should I irrigate crops now?" data-i18n="voiceChipIrrigation">
              ${o(`voiceChipIrrigation`)||`💧 Irrigation Advice`}
            </button>
            <button class="voice-chip" data-query="Why are panels tilted at this angle?" data-i18n="voiceChipAngle">
              ${o(`voiceChipAngle`)||`📐 Panel Angle Reason`}
            </button>
            <button class="voice-chip" data-query="Read active alerts to me" data-i18n="voiceChipAlerts">
              ${o(`voiceChipAlerts`)||`🚨 Read Active Alerts`}
            </button>
          </div>
        </div>

        <!-- Action Tools Bar -->
        <div class="voice-actions-toolbar">
          <button id="btn-read-screen" class="btn-action-tool" title="Narrate current view summary">
            📢 <span data-i18n="voiceChipReadScreen">${o(`voiceChipReadScreen`)||`Read Screen Aloud`}</span>
          </button>
          <button id="btn-test-voice-alert" class="btn-action-tool" title="Hear a sample emergency storm voice alert">
            🔊 <span data-i18n="voiceBtnTestAlert">${o(`voiceBtnTestAlert`)||`Test Voice Alert`}</span>
          </button>
        </div>

        <!-- Tactile Voice Input Bar -->
        <div class="voice-input-bar">
          <button id="btn-voice-mic" class="btn-voice-mic" title="Click and speak your question">
            <span class="mic-wave-ring"></span>
            <span class="mic-icon">🎙️</span>
          </button>

          <input 
            type="text" 
            id="voice-text-input" 
            class="voice-text-input" 
            placeholder="${o(`voiceInputPlaceholder`)||`Ask a question or tap a prompt chip...`}"
            data-i18n-placeholder="voiceInputPlaceholder"
            autocomplete="off"
          />

          <button id="btn-voice-send" class="btn-voice-send" title="Send question">
            ➔
          </button>
        </div>

      </div>
    `,document.body.appendChild(t),hn())}function hn(){let e=document.getElementById(`btn-close-voice`);e&&(e.onclick=fn);let t=document.getElementById(`voice-modal-backdrop`);t&&(t.onclick=fn);let n=document.getElementById(`btn-voice-mic`);n&&(n.onclick=()=>{U.isListening?rn():nn()});let r=document.getElementById(`btn-voice-send`),i=document.getElementById(`voice-text-input`);r&&i&&(r.onclick=()=>{let e=i.value;e&&e.trim()&&on(e)},i.onkeydown=e=>{if(e.key===`Enter`){let e=i.value;e&&e.trim()&&on(e)}}),document.querySelectorAll(`.voice-chip`).forEach(e=>{e.onclick=()=>{let t=e.getAttribute(`data-query`);t&&on(t)}});let a=document.getElementById(`btn-voice-mute`),o=document.getElementById(`voice-mute-icon`);a&&(a.onclick=()=>{U.isMuted=!U.isMuted,U.isMuted?(en(),o&&(o.textContent=`🔇`),a.title=`Unmute voice output`):(o&&(o.textContent=`🔊`),a.title=`Mute voice output`,G(`success`))});let s=document.getElementById(`voice-speed-select`);s&&(s.onchange=e=>{U.speechRate=parseFloat(e.target.value)||1});let c=document.getElementById(`btn-read-screen`);c&&(c.onclick=()=>{ln(U.currentView)});let l=document.getElementById(`btn-test-voice-alert`);l&&(l.onclick=()=>{J(`test`)}),window.addEventListener(`keydown`,e=>{if(e.key===`v`||e.key===`V`){let t=document.activeElement?document.activeElement.tagName.toLowerCase():``;t!==`input`&&t!==`textarea`&&t!==`select`&&(e.preventDefault(),pn())}else e.key===`Escape`&&U.isOpen&&fn()})}function gn(e=`home`){U.currentView=e,Qt(),tn(),mn()}function _n(e){U.currentView=e}var Y={currentFarm:JSON.parse(JSON.stringify(e)),activeView:`home`,optimizationResult:null,viewExplainerMode:`farmer`,simulationParams:{hour:12,isPlaying:!1,playTimerId:null,cloudCover:25,panelTilt:25,panelHeight:3,panelSpacing:2.5,rowSpacing:4},actuatorState:{currentAngle:25,targetAngle:35,status:`ready`,progress:0,animId:null},onboardingStep:0,presentationActive:!1,presentationStep:0,cameraStream:null,capturedPhotoBlob:null,isOnline:navigator.onLine,cropCameraSlot:`morning`,cropCameraSettings:{selectedCamera:`cam-1`,anomalyMask:!0},securityTab:`profile`,supportTab:`contact`,soundEnabled:!0,energyPeriod:`daily`,alertFilter:`all`,reportPeriod:`daily`};async function vn(){s();let e=i(),t=document.getElementById(`lang-selector`);t&&(t.value=e),document.documentElement.lang=e,Qn();try{await f();let e=await _();e.length>0?Y.currentFarm=e[e.length-1]:await y(Y.currentFarm)}catch(e){console.warn(`IndexedDB initial load error:`,e)}yn(),X(),er(),Xn(),Zn(),Jn(),nr(),tr(),gn(Y.activeView),bn(),window.addEventListener(`hashchange`,bn)}function yn(){let e=Y.currentFarm;Y.simulationParams.panelTilt=e.solar?.angle||25,Y.simulationParams.panelHeight=e.solar?.height||3,Y.simulationParams.panelSpacing=e.solar?.panelSpacing||2.5,Y.simulationParams.rowSpacing=e.solar?.rowSpacing||4,Y.simulationParams.cloudCover=e.weather?.cloudCover||25,Y.actuatorState.currentAngle=e.solar?.angle||25}function X(){let t=Y.currentFarm,n=le(t.location?.lat||13.1,t.location?.lon||78.1,new Date,Y.simulationParams.hour);Y.optimizationResult=me({currentConfig:{...t.solar,angle:Y.simulationParams.panelTilt,height:Y.simulationParams.panelHeight,spacing:Y.simulationParams.panelSpacing,rowSpacing:Y.simulationParams.rowSpacing},cropId:t.cropId||`tomato`,growthStageId:t.growthStage||`flowering`,weather:t.weather||e.weather,location:t.location||e.location,solarPosition:n}),Y.actuatorState.targetAngle=Y.optimizationResult.recommended.config.angle}function bn(){let e=window.location.hash.replace(`#`,``)||`home`;Y.activeView=e,_n(e),document.querySelectorAll(`.nav-link, .bottom-nav-item`).forEach(t=>{t.getAttribute(`data-view`)===e?t.classList.add(`active`):t.classList.remove(`active`)}),e!==`scan`&&e!==`camera`&&Y.cameraStream&&On(),Z()}function Z(){let e=document.getElementById(`main-content`);if(e){switch(Y.activeView){case`home`:e.innerHTML=xn(),Cn();break;case`dashboard`:e.innerHTML=vt(),ar();break;case`camera`:e.innerHTML=Ct(Y.cropCameraSlot,Y.cropCameraSettings),or();break;case`energy`:e.innerHTML=Et(Y.energyPeriod),mr();break;case`positioning`:e.innerHTML=Ot(),hr();break;case`alerts`:e.innerHTML=Mt(Y.alertFilter),gr();break;case`scheduler`:e.innerHTML=Nt(),_r();break;case`simulator`:e.innerHTML=Pt(),vr();break;case`reports`:e.innerHTML=Ft(Y.reportPeriod),yr();break;case`support`:e.innerHTML=Ut(Y.supportTab),br();break;case`security`:e.innerHTML=Gt(Y.securityTab),sr();break;case`scan`:e.innerHTML=En(),Dn();break;case`weather`:e.innerHTML=kn(),An();break;case`optimize`:e.innerHTML=jn(),Mn();break;case`results`:e.innerHTML=Pn(),Fn();break;case`farms`:e.innerHTML=In(),Ln();break;case`whatif`:e.innerHTML=Rn(),zn();break;case`onboarding`:e.innerHTML=Bn(),Hn();break;default:e.innerHTML=xn(),Cn()}Qn()}}function xn(){let e=Y.currentFarm,t=Y.optimizationResult,n=t?.recommended,r=t?.current,i=Y.simulationParams,a=le(e.location?.lat||13.1,e.location?.lon||78.1,new Date,i.hour),s=de({panelHeight:i.panelHeight,panelTiltDeg:i.panelTilt,panelSpacing:i.panelSpacing,rowSpacing:i.rowSpacing,sunElevDeg:a.elevationDeg,sunAzimuthDeg:a.azimuthDeg,cloudCover:i.cloudCover,ambientRadiation:e.weather?.solarRadiation||650});return`
    <!-- Hero Message Banner -->
    <section class="hero-card">
      <div class="hero-tag">🌞 ${o(`appTitle`)} • ${o(`tagline`)}</div>
      <h1 class="hero-headline">${o(`heroTitle`)}</h1>
      <p class="hero-subheadline">${o(`heroSubtitle`)}</p>
      <div class="hero-cta-group">
        <a href="#optimize" class="btn btn-accent">${o(`btnOptimize`)}</a>
        <button id="btn-home-demo" class="btn btn-secondary">${o(`btnDemo`)}</button>
        <a href="#scan" class="btn btn-secondary">${o(`btnScan`)}</a>
      </div>
    </section>

    <!-- Friendly Quick Start Guide -->
    <section class="friendly-guide-card">
      <div class="friendly-guide-header">
        <h2 class="friendly-guide-title">
          <span>💡</span> ${o(`howItWorksTitle`)}
        </h2>
        <button id="btn-open-guide-inline" class="btn btn-sm btn-secondary">${o(`btnReadGuide`)}</button>
      </div>
      <div class="steps-simple-grid">
        <div class="step-simple-card">
          <div class="step-badge-num">1</div>
          <div class="step-simple-title">${o(`step1Title`)}</div>
          <div class="step-simple-desc">${o(`step1Desc`)} (${e.cropName||o(`crop_tomato`)}).</div>
        </div>
        <div class="step-simple-card">
          <div class="step-badge-num">2</div>
          <div class="step-simple-title">${o(`step2Title`)}</div>
          <div class="step-simple-desc">${o(`step2Desc`)}</div>
        </div>
        <div class="step-simple-card">
          <div class="step-badge-num">3</div>
          <div class="step-simple-title">${o(`step3Title`)}</div>
          <div class="step-simple-desc">${o(`step3Desc`)}</div>
        </div>
      </div>
    </section>

    <!-- Farm Pulse Bar -->
    <section class="card" aria-label="Farm Pulse Status">
      <div class="card-header">
        <h2 class="card-title">${o(`farmPulse`)}</h2>
        <span class="badge ${e.isDemo?`badge-demo`:`badge-live`}">
          ${e.isDemo?o(`badgeDemo`):o(`activeFarm`)}
        </span>
      </div>
      <div class="pulse-grid">
        <div class="pulse-item">
          <span class="pulse-label">${o(`cropSunlight`)}</span>
          <span class="pulse-status ${r?.groundSunlightPercent>=75?`good`:`fair`}">
            ${r?.groundSunlightPercent>=75?`🟢 `+o(`statusGood`)+` (`+r?.groundSunlightPercent+`%)`:`🟡 `+o(`statusModerate`)+` (`+r?.groundSunlightPercent+`%)`}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`solarEnergy`)}</span>
          <span class="pulse-status ${r?.solarScore>=80?`high`:`fair`}">
            ${r?.solarScore>=80?`⚡ `+o(`statusHigh`)+` (`+r?.estimatedPowerKW+` kW)`:`⚡ `+o(`statusOptimal`)}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`weatherStatus`)}</span>
          <span class="pulse-status good">
            ${e.weather?.conditionIcon||`🌤️`} ${e.weather?.temp||24}°C
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`panelPosition`)}</span>
          <span class="pulse-status ${i.panelTilt===n?.config?.angle?`good`:`fair`}">
            ${i.panelTilt===n?.config?.angle?`✓ `+o(`statusOptimized`):`⚙️ `+o(`statusNeedsAdjust`)}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`locationStatus`)}</span>
          <span class="pulse-status good">
            📍 ${e.location?.village||e.location?.district||o(`statusAvailable`)}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`networkStatus`)}</span>
          <span class="pulse-status ${Y.isOnline?`good`:`fair`}">
            ${Y.isOnline?o(`syncOnline`):o(`syncOffline`)}
          </span>
        </div>
        <div class="pulse-item" style="grid-column: 1 / -1;">
          <span class="pulse-label">${o(`cropComfortLevel`)}</span>
          <span class="crop-mood-badge ${r?.groundSunlightPercent>=75?``:r?.groundSunlightPercent<55?`mood-low`:``}">
            ${r?.groundSunlightPercent>=75?`😊 `+(e.cropName||o(`crop_tomato`))+` `+o(`cropHappy`)+` (`+r?.groundSunlightPercent+`%)`:`😟 `+(e.cropName||o(`crop_tomato`))+` `+o(`cropSad`)}
          </span>
        </div>
      </div>
    </section>

    <!-- Signature Visual: Farm Sunlight Balance Meter -->
    ${_e({cropSunlight:r?.groundSunlightPercent||84,solarScore:r?.solarScore||91,overallBalance:r?.overallBalance||88})}

    <!-- Interactive Living Digital Twin -->
    <section class="digital-twin-wrapper">
      <div class="card-header" style="padding: 1.25rem 1.5rem 0.5rem;">
        <div>
          <h2 class="card-title">${o(`digitalTwinTitle`)}</h2>
          <p class="card-subtitle">${o(`digitalTwinSub`)}</p>
        </div>
        <span class="badge badge-sim">${o(`badgeSim`)}</span>
      </div>

      <div class="digital-twin-viewport">
        ${ge({sunElevationDeg:a.elevationDeg,sunAzimuthDeg:a.azimuthDeg,panelTiltDeg:i.panelTilt,panelHeight:i.panelHeight,panelSpacing:i.panelSpacing,rowSpacing:i.rowSpacing,cloudCover:i.cloudCover,cropId:e.cropId,growthStageId:e.growthStage,groundLightPercent:s.groundSunlightPercent,shadowLength:s.shadowLength,shadowOffset:s.shadowOffset,hour:i.hour})}
      </div>

      <!-- Live Interactive Controls with Plain-English Hints -->
      <div class="twin-controls-panel">
        <div class="twin-controls-grid">
          <!-- Panel Angle Slider -->
          <div class="control-slider-group">
            <div class="slider-label-row">
              <label for="slider-angle">${o(`panelAngle`)}</label>
              <span class="slider-val-badge" id="val-angle">${i.panelTilt}°</span>
            </div>
            <input type="range" id="slider-angle" min="10" max="65" step="1" value="${i.panelTilt}" />
            <div class="slider-hint-box" id="hint-angle">
              ${i.panelTilt<22?o(`hintFlat`):i.panelTilt<=40?o(`hintBalanced`):o(`hintSteep`)}
            </div>
          </div>

          <!-- Panel Height Slider -->
          <div class="control-slider-group">
            <div class="slider-label-row">
              <label for="slider-height">${o(`panelHeight`)}</label>
              <span class="slider-val-badge" id="val-height">${i.panelHeight}m</span>
            </div>
            <input type="range" id="slider-height" min="2.0" max="5.0" step="0.25" value="${i.panelHeight}" />
            <div class="slider-hint-box" id="hint-height">
              ${i.panelHeight<=2.5?o(`hintLowClearance`):i.panelHeight<=3.5?o(`hintStdClearance`):o(`hintHighClearance`)}
            </div>
          </div>

          <!-- Panel Spacing Slider -->
          <div class="control-slider-group">
            <div class="slider-label-row">
              <label for="slider-spacing">${o(`panelSpacing`)}</label>
              <span class="slider-val-badge" id="val-spacing">${i.panelSpacing}m</span>
            </div>
            <input type="range" id="slider-spacing" min="1.5" max="4.5" step="0.25" value="${i.panelSpacing}" />
            <div class="slider-hint-box" id="hint-spacing">
              ${i.panelSpacing<=2?o(`hintNarrowGap`):o(`hintWideGap`)}
            </div>
          </div>
        </div>

        <!-- Time of Day Orbit Controller -->
        <div class="time-control-strip">
          <button id="btn-play-sun" class="btn-icon-play" title="Auto-orbit celestial sun">
            ${i.isPlaying?`⏸`:`▶`}
          </button>
          <div style="flex:1;">
            <div class="slider-label-row">
              <label for="slider-hour">${o(`timeOfDay`)}</label>
              <span class="slider-val-badge" id="val-hour">${Math.floor(i.hour)}:${i.hour%1>=.5?`30`:`00`}</span>
            </div>
            <input type="range" id="slider-hour" min="6" max="18" step="0.25" value="${i.hour}" />
          </div>
        </div>

        <!-- One-Click Auto-Adjust Button -->
        <button id="btn-quick-sweet-spot" class="btn-auto-sweet">
          ${o(`btnAutoSweetSpot`)} (${n?.config?.angle||35}°)
        </button>
      </div>
    </section>

    <!-- AI Sweet Spot Quick Callout Card -->
    <section class="card" style="border: 2px solid var(--color-agri-fresh); background: #FAFDF9;">
      <div class="card-header">
        <h2 class="card-title">⭐ ${o(`aiSweetSpotFound`)}</h2>
        <a href="#optimize" class="btn btn-sm btn-primary">${o(`btnViewEngine`)}</a>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 1rem;">
        ${t?.explanation||o(`heroSubtitle`)}
      </p>
      <div class="grid-3">
        <div class="pulse-item">
          <span class="pulse-label">${o(`recommendedTilt`)}</span>
          <span class="pulse-status good">${n?.config?.angle}°</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`clearanceHeight`)}</span>
          <span class="pulse-status good">${n?.config?.height}m</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`balanceScore`)}</span>
          <span class="pulse-status good">${n?.overallBalance}/100</span>
        </div>
      </div>
    </section>

    <!-- Dynamic Sunlight Alerts (Generated mathematically) -->
    <section class="card">
      <div class="card-header">
        <h2 class="card-title">${o(`alertsTitle`)}</h2>
        <span class="badge badge-live">${o(`badgeLiveEvaluated`)}</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.65rem;">
        ${Sn(e,r,n)}
      </div>
    </section>

    <!-- Today's Farm Plan -->
    <section class="card">
      <div class="card-header">
        <h2 class="card-title">${o(`planTitle`)}</h2>
        <span class="badge badge-sim">${o(`badgePrototypeSchedule`)}</span>
      </div>
      <div class="grid-4">
        <div class="pulse-item">
          <span class="pulse-label">${o(`morning`)}</span>
          <small style="color:var(--text-muted);">${o(`morningDesc`)}</small>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`midday`)}</span>
          <small style="color:var(--text-muted);">${o(`middayDesc`)}</small>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`afternoon`)}</span>
          <small style="color:var(--text-muted);">${o(`afternoonDesc`)}</small>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`evening`)}</span>
          <small style="color:var(--text-muted);">${o(`eveningDesc`)}</small>
        </div>
      </div>
    </section>
  `}function Sn(e,n,r){let i=[],a=t[e.cropId]||t.tomato;return n?.groundSunlightPercent<a.minDLI&&i.push({type:`warning`,icon:`⚠️`,title:o(`alertCropBelow`),desc:`${n?.groundSunlightPercent}% < ${a.minDLI} mol/m²/d (${e.cropName||o(`crop_tomato`)}).`}),e.weather?.solarRadiation>600&&i.push({type:`success`,icon:`☀️`,title:o(`alertStrongSun`),desc:`${e.weather.solarRadiation} W/m². High solar window active.`}),n?.config?.angle!==r?.config?.angle&&i.push({type:`info`,icon:`⚙️`,title:o(`alertAiRecommends`),desc:`${n?.config?.angle}° ➔ ${r?.config?.angle}° (+${(r?.overallBalance||0)-(n?.overallBalance||0)} pts).`}),e.weather?.cloudCover>50&&i.push({type:`neutral`,icon:`☁️`,title:o(`alertCloudCover`),desc:`${e.weather.cloudCover}%. Diffuse PAR prioritized.`}),i.map(e=>`
    <div style="background:var(--bg-subtle); padding:0.85rem 1rem; border-radius:var(--radius-md); border-left:4px solid var(--color-agri-fresh); display:flex; gap:0.75rem; align-items:flex-start;">
      <span style="font-size:1.3rem;">${e.icon}</span>
      <div>
        <div style="font-weight:800; font-size:0.9rem; color:var(--color-agri-dark);">${e.title}</div>
        <div style="font-size:0.82rem; color:var(--text-secondary);">${e.desc}</div>
      </div>
    </div>
  `).join(``)}function Cn(){let e=document.getElementById(`btn-home-demo`);e&&e.addEventListener(`click`,()=>{Yn(),$(`Loaded demo farm: Green Valley Farm`),Z()});let t=document.getElementById(`slider-angle`),n=document.getElementById(`slider-height`),r=document.getElementById(`slider-spacing`),i=document.getElementById(`slider-hour`),a=document.getElementById(`btn-play-sun`);t&&t.addEventListener(`input`,e=>{Y.simulationParams.panelTilt=parseInt(e.target.value),Y.currentFarm.solar.angle=Y.simulationParams.panelTilt,document.getElementById(`val-angle`).textContent=e.target.value+`°`;let t=document.getElementById(`hint-angle`);if(t){let e=Y.simulationParams.panelTilt;t.textContent=o(e<22?`hintFlat`:e<=40?`hintBalanced`:`hintSteep`)}X(),Q()}),n&&n.addEventListener(`input`,e=>{Y.simulationParams.panelHeight=parseFloat(e.target.value),Y.currentFarm.solar.height=Y.simulationParams.panelHeight,document.getElementById(`val-height`).textContent=e.target.value+`m`;let t=document.getElementById(`hint-height`);if(t){let e=Y.simulationParams.panelHeight;t.textContent=o(e<=2.5?`hintLowClearance`:e<=3.5?`hintStdClearance`:`hintHighClearance`)}X(),Q()}),r&&r.addEventListener(`input`,e=>{Y.simulationParams.panelSpacing=parseFloat(e.target.value),Y.currentFarm.solar.panelSpacing=Y.simulationParams.panelSpacing,document.getElementById(`val-spacing`).textContent=e.target.value+`m`;let t=document.getElementById(`hint-spacing`);t&&(t.textContent=Y.simulationParams.panelSpacing<=2?o(`hintNarrowGap`):o(`hintWideGap`)),X(),Q()}),i&&i.addEventListener(`input`,e=>{Y.simulationParams.hour=parseFloat(e.target.value),document.getElementById(`val-hour`).textContent=wn(Y.simulationParams.hour),X(),Q()}),a&&a.addEventListener(`click`,()=>{Tn()});let s=document.getElementById(`btn-quick-sweet-spot`);s&&s.addEventListener(`click`,()=>{let e=Y.optimizationResult?.recommended?.config?.angle||35;Y.simulationParams.panelTilt=e,Y.currentFarm.solar.angle=e,Y.actuatorState.currentAngle=e;let t=document.getElementById(`slider-angle`);t&&(t.value=e);let n=document.getElementById(`val-angle`);n&&(n.textContent=e+`°`);let r=document.getElementById(`hint-angle`);r&&(r.textContent=o(`hintBalanced`)),X(),Q(),$(`🎉 Panels adjusted to ${e}°! Plants receive optimal light & clean energy is maximized.`),Z()});let c=document.getElementById(`btn-open-guide-inline`);c&&c.addEventListener(`click`,()=>{$n()})}function Q(){let e=Y.simulationParams,t=Y.currentFarm,n=le(t.location?.lat||13.1,t.location?.lon||78.1,new Date,e.hour),r=de({panelHeight:e.panelHeight,panelTiltDeg:e.panelTilt,panelSpacing:e.panelSpacing,rowSpacing:e.rowSpacing,sunElevDeg:n.elevationDeg,sunAzimuthDeg:n.azimuthDeg,cloudCover:e.cloudCover,ambientRadiation:t.weather?.solarRadiation||650}),i=document.querySelector(`.digital-twin-viewport`);i&&(i.innerHTML=ge({sunElevationDeg:n.elevationDeg,sunAzimuthDeg:n.azimuthDeg,panelTiltDeg:e.panelTilt,panelHeight:e.panelHeight,panelSpacing:e.panelSpacing,rowSpacing:e.rowSpacing,cloudCover:e.cloudCover,cropId:t.cropId,growthStageId:t.growthStage,groundLightPercent:r.groundSunlightPercent,shadowLength:r.shadowLength,shadowOffset:r.shadowOffset,hour:e.hour}));let a=Y.optimizationResult?.current,o=document.querySelector(`.balance-meter-container`);o&&a&&(o.outerHTML=_e({cropSunlight:a.groundSunlightPercent,solarScore:a.solarScore,overallBalance:a.overallBalance}))}function wn(e){let t=Math.floor(e),n=Math.round((e-t)*60);return`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}`}function Tn(){let e=Y.simulationParams;e.isPlaying=!e.isPlaying;let t=document.getElementById(`btn-play-sun`);e.isPlaying?(t&&(t.textContent=`⏸`),e.playTimerId=setInterval(()=>{e.hour+=.2,e.hour>18&&(e.hour=6);let t=document.getElementById(`slider-hour`);t&&(t.value=e.hour);let n=document.getElementById(`val-hour`);n&&(n.textContent=wn(e.hour)),X(),Q()},150)):(t&&(t.textContent=`▶`),clearInterval(e.playTimerId))}function En(){let t=Y.currentFarm,n=t.cropAnalysis||e.cropAnalysis;return`
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${o(`scanTitle`)}</h2>
          <p class="card-subtitle">${o(`scanSubtitle`)}</p>
        </div>
        <span class="badge badge-demo">${o(`badgeDemoAi`)}</span>
      </div>

      <!-- Camera Live View / Captured Photo Container -->
      <div style="background:#0F172A; border-radius:var(--radius-md); overflow:hidden; position:relative; min-height:280px; display:flex; align-items:center; justify-content:center;">
        <video id="camera-stream" autoplay playsinline style="width:100%; max-height:400px; object-fit:cover; display:none;"></video>
        <canvas id="camera-canvas" style="display:none;"></canvas>
        <img id="photo-preview" src="${t.photoDataUrl||``}" alt="Farm Photo Preview" style="width:100%; max-height:400px; object-fit:cover; display:${t.photoDataUrl?`block`:`none`};" />

        <div id="camera-placeholder" style="display:${t.photoDataUrl?`none`:`flex`}; flex-direction:column; align-items:center; color:#94A3B8; padding:2rem; text-align:center;">
          <span style="font-size:3rem; margin-bottom:0.5rem;">🌱</span>
          <strong>${o(`noPhotoYet`)}</strong>
          <small>${o(`noPhotoSub`)}</small>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:1.25rem;">
        <button id="btn-start-camera" class="btn btn-primary">${o(`btnTakePhoto`)}</button>
        <button id="btn-snap-photo" class="btn btn-accent" style="display:none;">${o(`btnCaptureSnapshot`)}</button>
        <label class="btn btn-secondary" style="cursor:pointer;">
          ${o(`btnUploadPhoto`)}
          <input type="file" id="file-upload" accept="image/*" style="display:none;" />
        </label>
        <button id="btn-retake-photo" class="btn btn-secondary" style="display:${t.photoDataUrl?`inline-flex`:`none`};">${o(`btnRetake`)}</button>
        <button id="btn-delete-photo" class="btn btn-danger" style="display:${t.photoDataUrl?`inline-flex`:`none`};">${o(`btnDelete`)}</button>
      </div>
    </div>

    <!-- GPS Extraction Status Card -->
    <div class="card" id="exif-card">
      <div class="card-header">
        <h3 class="card-title">${o(`exifTitle`)}</h3>
        <span class="badge ${t.location?.source===`LIVE`?`badge-live`:`badge-demo`}">
          ${t.location?.source===`LIVE`?o(`badgeGpsDetected`):o(`badgeLocation`)}
        </span>
      </div>
      <div id="exif-result-text">
        <p style="color:var(--text-secondary); margin-bottom:0.75rem;">
          ${o(`coordinates`)}: <strong>${t.location?.lat}°N, ${t.location?.lon}°E</strong> (${t.location?.label||o(`farmLocation`)})
        </p>
      </div>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button id="btn-use-gps" class="btn btn-sm btn-primary">${o(`btnUseMyLocation`)}</button>
        <button id="btn-manual-loc" class="btn btn-sm btn-secondary">${o(`btnEnterManually`)}</button>
      </div>
    </div>

    <!-- AI Crop Analysis Card (DEMO AI PREDICTION) -->
    <div class="card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${o(`aiAnalysisTitle`)}</h3>
          <span class="card-subtitle">${o(`aiAnalysisSub`)}</span>
        </div>
        <span class="badge badge-demo">${o(`badgeDemoAi`)}</span>
      </div>

      <div class="grid-2">
        <div class="pulse-item">
          <span class="pulse-label">${o(`detectedCrop`)}</span>
          <strong style="color:var(--color-agri-dark); font-size:1.1rem;">${o(`crop_`+t.cropId,n.detectedCrop)}</strong>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`estimatedCondition`)}</span>
          <strong style="color:#15803D; font-size:1.1rem;">${n.condition}</strong>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`growthStage`)}</span>
          <strong style="color:var(--color-agri-dark); font-size:1.1rem;">${t.growthStageName||`Flowering`}</strong>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`lightRequirement`)}</span>
          <strong style="color:#D97706; font-size:1.1rem;">${o(`highLight`)} (22-30 mol/m²/d)</strong>
        </div>
      </div>

      <p style="margin-top:1rem; font-size:0.85rem; color:var(--text-muted); background:var(--bg-subtle); padding:0.75rem; border-radius:var(--radius-sm);">
        ℹ️ <em>${o(`aiDisclaimer`)}</em>
      </p>

      <div style="margin-top:1rem; display:flex; justify-content:flex-end;">
        <a href="#onboarding" class="btn btn-sm btn-secondary">${o(`btnEditCropProfile`)}</a>
      </div>
    </div>
  `}function Dn(){let e=document.getElementById(`btn-start-camera`),t=document.getElementById(`btn-snap-photo`),n=document.getElementById(`file-upload`),r=document.getElementById(`btn-retake-photo`),i=document.getElementById(`btn-delete-photo`),a=document.getElementById(`btn-use-gps`),o=document.getElementById(`btn-manual-loc`);e&&e.addEventListener(`click`,async()=>{try{let n=document.getElementById(`camera-stream`),r=document.getElementById(`camera-placeholder`),i=document.getElementById(`photo-preview`);Y.cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:`environment`}}),n.srcObject=Y.cameraStream,n.style.display=`block`,r.style.display=`none`,i.style.display=`none`,e.style.display=`none`,t.style.display=`inline-flex`}catch(e){$(`Camera access unavailable or denied: `+e.message)}}),t&&t.addEventListener(`click`,()=>{let e=document.getElementById(`camera-stream`),n=document.getElementById(`camera-canvas`),r=document.getElementById(`photo-preview`);n.width=e.videoWidth||640,n.height=e.videoHeight||480,n.getContext(`2d`).drawImage(e,0,0,n.width,n.height);let i=n.toDataURL(`image/jpeg`,.85);On(),r.src=i,r.style.display=`block`,e.style.display=`none`,t.style.display=`none`,Y.currentFarm.photoDataUrl=i,x(Y.currentFarm.id,i),y(Y.currentFarm),$(`Crop photo saved to local device database.`),Z()}),n&&n.addEventListener(`change`,async e=>{let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=async e=>{let n=e.target.result;Y.currentFarm.photoDataUrl=n,await x(Y.currentFarm.id,n),await y(Y.currentFarm);let r=await oe(t);r.hasGPS?(Y.currentFarm.location={...Y.currentFarm.location,lat:r.lat,lon:r.lon,source:`LIVE`,label:`GPS from photo (${r.lat}, ${r.lon})`},await y(Y.currentFarm),$(`📍 GPS detected from photo: ${r.lat}, ${r.lon}`)):$(`No GPS information found in this photo.`),Z()},n.readAsDataURL(t)}),r&&r.addEventListener(`click`,()=>{e.click()}),i&&i.addEventListener(`click`,async()=>{Y.currentFarm.photoDataUrl=null,await y(Y.currentFarm),$(`Crop photo deleted.`),Z()}),a&&a.addEventListener(`click`,async()=>{a.disabled=!0,a.textContent=`Locating...`;try{let e=await ie();Y.currentFarm.location=e,await y(Y.currentFarm),$(`📍 Location acquired: ${e.lat}, ${e.lon}`),X(),Z()}catch(e){$(e.message),a.disabled=!1,a.textContent=`📍 Use My Location`}}),o&&o.addEventListener(`click`,()=>{Gn()})}function On(){Y.cameraStream&&=(Y.cameraStream.getTracks().forEach(e=>e.stop()),null)}function kn(){let t=Y.currentFarm,n=t.weather||e.weather,r=`badge-demo`,i=o(`badgeDemo`);return n.source===`LIVE`?(r=`badge-live`,i=o(`badgeLive`)):n.source===`CACHED`&&(r=`badge-cached`,i=`${o(`badgeCached`)} (${new Date(n.timestamp).toLocaleDateString()})`),`
    <div class="weather-current-card">
      <div class="weather-cur-top">
        <div>
          <span class="badge ${r}" style="margin-bottom:0.5rem;">${i}</span>
          <h2 style="font-size:1.6rem; font-weight:800;">${t.location?.village||t.location?.district||o(`farmLocation`)}</h2>
          <span style="color:var(--color-sky-blue); font-size:0.85rem;">${o(`coordinates`)}: ${t.location?.lat}°N, ${t.location?.lon}°E</span>
        </div>
        <div style="text-align:right;">
          <div class="weather-cur-icon">${n.conditionIcon||`🌤️`}</div>
          <div class="weather-cur-temp">${n.temp}°C</div>
          <span style="font-size:0.85rem; color:var(--color-sky-blue);">${n.conditionText}</span>
        </div>
      </div>

      <div class="weather-metrics-grid">
        <div class="w-metric">
          <span class="w-metric-label">${o(`solarIrradiance`)}</span>
          <span class="w-metric-val">${n.solarRadiation} W/m²</span>
        </div>
        <div class="w-metric">
          <span class="w-metric-label">${o(`cloudCover`)}</span>
          <span class="w-metric-val">${n.cloudCover}%</span>
        </div>
        <div class="w-metric">
          <span class="w-metric-label">${o(`humidity`)}</span>
          <span class="w-metric-val">${n.humidity}%</span>
        </div>
        <div class="w-metric">
          <span class="w-metric-label">${o(`windSpeed`)}</span>
          <span class="w-metric-val">${n.windSpeed} km/h</span>
        </div>
      </div>
    </div>

    <!-- Actions Bar -->
    <div style="display:flex; gap:0.75rem; margin-bottom:1.5rem; flex-wrap:wrap;">
      <button id="btn-refresh-weather" class="btn btn-primary btn-sm">${o(`btnRefreshWeather`)}</button>
      <button id="btn-manual-weather" class="btn btn-secondary btn-sm">${o(`btnManualWeather`)}</button>
    </div>

    <!-- 24-Hour Forecast Timeline -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${o(`weatherHourlyTitle`)}</h3>
      </div>
      <div class="forecast-strip">
        ${(n.hourlyForecast||[]).map(e=>`
          <div class="forecast-item">
            <span style="font-size:0.72rem; font-weight:700; color:var(--text-muted);">${e.hour}</span>
            <span style="font-size:1.1rem; font-weight:800; color:var(--color-agri-dark);">${e.temp}°C</span>
            <span style="font-size:0.7rem; color:#D97706;">⚡ ${e.rad}W</span>
            <span style="font-size:0.68rem; color:var(--text-muted);">☁️ ${e.cloud}%</span>
          </div>
        `).join(``)}
      </div>
    </div>

    <!-- 7-Day Forecast -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${o(`weatherDailyTitle`)}</h3>
      </div>
      <div class="grid-3">
        ${(n.dailyForecast||[]).map(e=>`
          <div class="pulse-item">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>${e.day}</strong>
              <span style="font-size:1.4rem;">${e.condition}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:0.35rem; font-size:0.85rem;">
              <span>High: ${e.tempMax}°C</span>
              <span style="color:var(--text-muted);">Low: ${e.tempMin}°C</span>
            </div>
            <small style="color:var(--text-muted);">Rain: ${e.rain}%</small>
          </div>
        `).join(``)}
      </div>
    </div>
  `}function An(){let e=document.getElementById(`btn-refresh-weather`),t=document.getElementById(`btn-manual-weather`);e&&e.addEventListener(`click`,async()=>{e.disabled=!0,e.textContent=`Fetching...`;let t=Y.currentFarm,n=await ee(t.location?.lat||13.1,t.location?.lon||78.1);Y.currentFarm.weather=n,await y(Y.currentFarm),X(),$(n.source===`LIVE`?`🟢 Live weather updated successfully!`:n.message),Z()}),t&&t.addEventListener(`click`,()=>{Kn()})}function jn(){Y.currentFarm;let e=Y.optimizationResult,t=e?.current,n=e?.recommended,r=e?.deltas,i=t?.shadow,a=Y.actuatorState;return`
    <!-- Signature Sweet Spot Banner -->
    <div class="card" style="border: 2px solid var(--color-solar-yellow); background: linear-gradient(180deg, #FFFFFF 0%, #FAFDF9 100%);">
      <div class="card-header">
        <div>
          <span class="hero-tag" style="background:#FEF3C7; color:#92400E; border-color:#F59E0B;">
            🌞 ${o(`appTitle`)} • ${o(`aiSweetSpotFound`)}
          </span>
          <h2 class="card-title" style="font-size:1.6rem; margin-top:0.35rem;">
            ${o(`optimizeHeroTitle`)}
          </h2>
        </div>
        <span class="badge badge-sim">${o(`badgeSim`)}</span>
      </div>

      <!-- Signature Balance Meter -->
      ${_e({cropSunlight:n?.groundSunlightPercent||84,solarScore:n?.solarScore||91,overallBalance:n?.overallBalance||88})}
    </div>

    <!-- Current vs Recommended Comparison Cards -->
    <div class="comparison-grid">
      <!-- CURRENT SETUP -->
      <div class="setup-card current">
        <div class="setup-header">
          <span class="setup-title">${o(`currentSetup`)}</span>
          <span class="badge badge-cached">${o(`badgeCurrentConfig`)}</span>
        </div>
        <div class="spec-list">
          <div class="spec-item">
            <span class="spec-label">${o(`panelAngle`)}</span>
            <span class="spec-val">${t?.config?.angle}°</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${o(`panelHeight`)}</span>
            <span class="spec-val">${t?.config?.height}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${o(`panelSpacing`)}</span>
            <span class="spec-val">${t?.config?.spacing}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${o(`powerGeneration`)}</span>
            <span class="spec-val">${t?.estimatedPowerKW} kW</span>
          </div>
        </div>
        <div style="border-top:1px solid var(--border-subtle); padding-top:0.75rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;">
            <span>${o(`cropSunlight`)}: <strong>${t?.groundSunlightPercent}%</strong></span>
            <span>${o(`solarEnergy`)}: <strong>${t?.solarScore}%</strong></span>
          </div>
          <div style="font-size:1rem; font-weight:800; color:var(--color-agri-dark);">
            ${o(`farmBalance`)}: <strong>${t?.overallBalance}/100</strong>
          </div>
        </div>
      </div>

      <!-- AI RECOMMENDED SETUP -->
      <div class="setup-card recommended">
        <div class="recommended-ribbon">⭐ ${o(`aiSweetSpotFound`)}</div>
        <div class="setup-header">
          <span class="setup-title" style="color:#15803D;">${o(`recommendedSetup`)}</span>
          <span class="badge badge-live">${o(`badgeOptimalConfig`)}</span>
        </div>
        <div class="spec-list">
          <div class="spec-item">
            <span class="spec-label">${o(`panelAngle`)}</span>
            <span class="spec-val" style="color:#15803D;">${n?.config?.angle}°</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${o(`panelHeight`)}</span>
            <span class="spec-val">${n?.config?.height}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${o(`panelSpacing`)}</span>
            <span class="spec-val">${n?.config?.spacing}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${o(`powerGeneration`)}</span>
            <span class="spec-val">${n?.estimatedPowerKW} kW</span>
          </div>
        </div>
        <div style="border-top:1px solid #BBF7D0; padding-top:0.75rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;">
            <span>${o(`cropSunlight`)}: <strong>${n?.groundSunlightPercent}%</strong> <span class="delta-pill delta-pos">${r?.cropSunlightDelta>=0?`+`:``}${r?.cropSunlightDelta}%</span></span>
            <span>${o(`solarEnergy`)}: <strong>${n?.solarScore}%</strong> <span class="delta-pill delta-pos">${r?.solarScoreDelta>=0?`+`:``}${r?.solarScoreDelta}%</span></span>
          </div>
          <div style="font-size:1rem; font-weight:800; color:#15803D;">
            ${o(`farmBalance`)}: <strong>${n?.overallBalance}/100</strong> <span class="delta-pill delta-pos">+${r?.balanceDelta} pts</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Virtual Actuator Controller -->
    ${be({currentAngle:a.currentAngle,targetAngle:n?.config?.angle||35,status:a.status})}

    <!-- Explainable AI Section: Farmer Mode vs Technical View -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${o(`whyRecommendation`)}</h3>
        <div style="display:flex; gap:0.5rem;">
          <button id="btn-toggle-farmer" class="btn btn-sm ${Y.viewExplainerMode===`farmer`?`btn-primary`:`btn-secondary`}">
            ${o(`btnExplainFarmer`)}
          </button>
          <button id="btn-toggle-tech" class="btn btn-sm ${Y.viewExplainerMode===`technical`?`btn-primary`:`btn-secondary`}">
            ${o(`btnTechnicalView`)}
          </button>
        </div>
      </div>

      ${Y.viewExplainerMode===`farmer`?`
        <div style="background:var(--bg-subtle); padding:1.25rem; border-radius:var(--radius-md); border-left:5px solid var(--color-agri-fresh);">
          <p style="font-size:1rem; color:var(--color-agri-dark); line-height:1.6;">
            "${e?.explanation}"
          </p>
        </div>
      `:`
        <div style="background:#0F172A; color:#E2E8F0; padding:1.25rem; border-radius:var(--radius-md); font-family:monospace; font-size:0.88rem; line-height:1.6;">
          <div style="color:#F7C948; font-weight:bold; margin-bottom:0.5rem;">// MULTI-OBJECTIVE OPTIMIZATION FORMULATION</div>
          <div>Formula: ${e?.technicalSummary?.formula}</div>
          <div style="margin-top:0.35rem;">Shadow Model: ${e?.technicalSummary?.shadowFormula}</div>
          <div style="margin-top:0.35rem;">Solar Irradiance: ${e?.technicalSummary?.solarFormula}</div>
          <div style="margin-top:0.35rem; color:#8FCF64;">Candidates Evaluated: ${e?.technicalSummary?.candidatesEvaluated} | Status: Optimal Pareto Convergence</div>
        </div>
      `}
    </div>

    <!-- Crop Row Sunlight Heatmap -->
    ${ye({rowLightDistribution:i?.rowLightDistribution||[78,86,92,84],rowStatus:i?.rowStatus||[`high`,`high`,`high`,`high`],parBetweenPanels:i?.parBetweenPanels||1150})}

    <!-- Ranked Top Candidates Table -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${o(`evaluatedCandidates`)}</h3>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.88rem; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-medium); color:var(--text-muted);">
              <th style="padding:0.6rem;">${o(`colCandidate`)}</th>
              <th style="padding:0.6rem;">${o(`colTiltAngle`)}</th>
              <th style="padding:0.6rem;">${o(`colHeight`)}</th>
              <th style="padding:0.6rem;">${o(`colSpacing`)}</th>
              <th style="padding:0.6rem;">${o(`colCropLight`)}</th>
              <th style="padding:0.6rem;">${o(`colSolar`)}</th>
              <th style="padding:0.6rem;">${o(`colBalance`)}</th>
            </tr>
          </thead>
          <tbody>
            ${(e?.candidates||[]).map((e,t)=>`
              <tr style="border-bottom:1px solid var(--border-subtle); ${t===0?`background:#F0FDF4; font-weight:bold;`:``}">
                <td style="padding:0.6rem;">${e.name}</td>
                <td style="padding:0.6rem;">${e.config.angle}°</td>
                <td style="padding:0.6rem;">${e.config.height}m</td>
                <td style="padding:0.6rem;">${e.config.spacing}m</td>
                <td style="padding:0.6rem; color:#15803D;">${e.groundSunlightPercent}%</td>
                <td style="padding:0.6rem; color:#D97706;">${e.solarScore}%</td>
                <td style="padding:0.6rem; font-weight:900;">${e.overallBalance}</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function Mn(){let e=document.getElementById(`btn-toggle-farmer`),t=document.getElementById(`btn-toggle-tech`);e&&e.addEventListener(`click`,()=>{Y.viewExplainerMode=`farmer`,Z()}),t&&t.addEventListener(`click`,()=>{Y.viewExplainerMode=`technical`,Z()});let n=document.getElementById(`btn-actuator-move`);n&&n.addEventListener(`click`,()=>{Nn()})}function Nn(){let e=Y.actuatorState;if(e.status===`moving`)return;let t=Y.optimizationResult?.recommended?.config?.angle||35;e.targetAngle=t,e.status=`moving`,Z();let n=e.currentAngle,r=performance.now();function i(a){let o=a-r,s=Math.min(1,o/2200),c=s<.5?2*s*s:-1+(4-2*s)*s;e.currentAngle=Math.round(n+(t-n)*c);let l=document.querySelector(`.current-tilt-val`);l&&(l.textContent=e.currentAngle+`°`),Y.simulationParams.panelTilt=e.currentAngle,Y.currentFarm.solar.angle=e.currentAngle,s<1?e.animId=requestAnimationFrame(i):(e.currentAngle=t,e.status=`reached`,X(),$(`✓ Actuator aligned to recommended ${t}° sweet spot.`),Z())}e.animId=requestAnimationFrame(i)}function Pn(){let e=Y.currentFarm,t=Y.optimizationResult,n=t?.recommended,r=t?.current;return`
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${o(`resultsSummary`)}</h2>
          <p class="card-subtitle">${o(`resultsSub`)}</p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button id="btn-generate-report" class="btn btn-primary">${o(`btnGenerateReport`)}</button>
          <button id="btn-save-farm" class="btn btn-secondary">${o(`btnSaveFarm`)}</button>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom:1.5rem;">
        <div class="pulse-item">
          <span class="pulse-label">${o(`cropSunlight`)}</span>
          <span class="pulse-status good">${n?.groundSunlightPercent}%</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`solarEnergy`)}</span>
          <span class="pulse-status high">${n?.solarScore}%</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`shadowImpact`)}</span>
          <span class="pulse-status good">${n?.shadowScore}%</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${o(`farmBalance`)}</span>
          <span class="pulse-status good" style="font-size:1.4rem;">${n?.overallBalance}/100</span>
        </div>
      </div>
    </div>

    <!-- Smart Trade-Off Curve (Pareto Frontier) -->
    ${ve({candidates:t?.allEvaluations||[],best:n,current:r})}

    <!-- Previous Saved Recommendations for this Farm -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${o(`savedHistoryTitle`)}</h3>
      </div>
      <p style="color:var(--text-muted); font-size:0.85rem;">
        ${o(`savedHistorySub`)}
      </p>
      <div style="margin-top:1rem; background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-md);">
        <strong>${e.cropName} (${e.growthStageName||`Flowering`}) — ${o(`recommendedSetup`)} ${n?.config?.angle}° Angle</strong>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">
          Generated: ${new Date().toLocaleString()} • ${o(`farmBalance`)}: ${n?.overallBalance}/100 • Status: ${e.isDemo?o(`badgeDemo`):o(`activeFarm`)}
        </div>
      </div>
    </div>
  `}function Fn(){let e=document.getElementById(`btn-generate-report`),t=document.getElementById(`btn-save-farm`);e&&e.addEventListener(`click`,()=>{Wn()}),t&&t.addEventListener(`click`,async()=>{await y(Y.currentFarm),await w(Y.currentFarm.id,Y.optimizationResult),$(`✓ Farm configuration and recommendation saved locally.`)})}function In(){return`
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${o(`myFarmsTitle`)}</h2>
          <p class="card-subtitle">${o(`myFarmsSub`)}</p>
        </div>
        <button id="btn-create-farm" class="btn btn-primary">${o(`btnAddFarm`)}</button>
      </div>

      <div id="farms-list-container" class="grid-2">
        <div style="padding:2rem; text-align:center; color:var(--text-muted); grid-column:1/-1;">
          ${o(`loadingFarms`)}
        </div>
      </div>
    </div>
  `}async function Ln(){let e=document.getElementById(`farms-list-container`),t=document.getElementById(`btn-create-farm`);t&&t.addEventListener(`click`,()=>{window.location.hash=`#onboarding`});try{let t=await _();if(!e)return;if(t.length===0){e.innerHTML=`
        <div style="padding:2rem; text-align:center; color:var(--text-muted); grid-column:1/-1;">
          ${o(`noFarmsYet`)}
        </div>
      `;return}e.innerHTML=t.map(e=>`
        <div class="setup-card" style="border-color:${e.id===Y.currentFarm.id?`var(--color-agri-fresh)`:`var(--border-subtle)`};">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <h3 style="font-size:1.15rem; font-weight:800; color:var(--color-agri-dark);">${e.name}</h3>
              <span style="font-size:0.8rem; color:var(--text-muted);">${e.cropName||`Tomato`} • ${e.size||5} ${e.unit||`Acre`}</span>
            </div>
            <span class="badge ${e.isDemo?`badge-demo`:`badge-live`}">${e.isDemo?`🟣 DEMO`:`🟢 LOCAL`}</span>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:0.85rem;">
            <span>Stage: <strong>${e.growthStageName||`Flowering`}</strong></span>
            <span>Tilt: <strong>${e.solar?.angle||25}°</strong></span>
          </div>

          <div style="display:flex; gap:0.5rem; margin-top:1rem;">
            <button class="btn btn-sm btn-primary btn-open-farm" data-id="${e.id}">${o(`btnOpenFarm`)}</button>
            <button class="btn btn-sm btn-secondary btn-edit-farm" data-id="${e.id}">${o(`btnEdit`)}</button>
            <button class="btn btn-sm btn-danger btn-delete-farm" data-id="${e.id}">${o(`btnDelete`)}</button>
          </div>
        </div>
      `).join(``),document.querySelectorAll(`.btn-open-farm`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=await v(e.target.getAttribute(`data-id`));t&&(Y.currentFarm=t,yn(),X(),$(`Opened farm: ${t.name}`),window.location.hash=`#home`)})}),document.querySelectorAll(`.btn-edit-farm`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=await v(e.target.getAttribute(`data-id`));t&&(Y.currentFarm=t,window.location.hash=`#onboarding`)})}),document.querySelectorAll(`.btn-delete-farm`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=e.target.getAttribute(`data-id`);confirm(o(`confirmDeleteFarm`))&&(await b(t),$(`Farm deleted from local database.`),Z())})})}catch(e){console.error(`Error listing farms:`,e)}}function Rn(){let e=Y.optimizationResult?.whatIfScenarios,t=e?.recommended,n=e?.current,r=e?.cropFirst,i=e?.energyFirst;return e?.stormStow,`
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${o(`whatIfTitle`)}</h2>
          <p class="card-subtitle">${o(`whatIfSub`)}</p>
        </div>
        <span class="badge badge-sim">${o(`badgeSim`)}</span>
      </div>

      <div class="whatif-presets">
        <button class="preset-chip active" data-scenario="best">${o(`scenarioSweet`)}</button>
        <button class="preset-chip" data-scenario="current">${o(`scenarioCurrent`)}</button>
        <button class="preset-chip" data-scenario="crop">${o(`scenarioCrop`)}</button>
        <button class="preset-chip" data-scenario="energy">${o(`scenarioEnergy`)}</button>
        <button class="preset-chip" data-scenario="storm">${o(`scenarioStorm`)}</button>
      </div>

      <!-- Comparison Matrix -->
      <div class="grid-4" style="margin-top:1.5rem;">
        <div class="setup-card" style="border-color:#15803D; background:#F0FDF4;">
          <strong>⭐ ${o(`aiSweetSpotFound`)}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:#15803D;">${t?.overallBalance}</div>
          <small>${o(`panelAngle`)}: ${t?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${o(`cropSunlight`)}: ${t?.groundSunlightPercent}%<br/>
            ⚡ ${o(`solarEnergy`)}: ${t?.solarScore}%
          </div>
        </div>

        <div class="setup-card">
          <strong>${o(`currentSetup`)}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:var(--text-muted);">${n?.overallBalance}</div>
          <small>${o(`panelAngle`)}: ${n?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${o(`cropSunlight`)}: ${n?.groundSunlightPercent}%<br/>
            ⚡ ${o(`solarEnergy`)}: ${n?.solarScore}%
          </div>
        </div>

        <div class="setup-card">
          <strong>🌱 ${o(`scenarioCropFirst`)}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:#2F7D4F;">${r?.overallBalance}</div>
          <small>${o(`panelAngle`)}: ${r?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${o(`cropSunlight`)}: ${r?.groundSunlightPercent}%<br/>
            ⚡ ${o(`solarEnergy`)}: ${r?.solarScore}%
          </div>
        </div>

        <div class="setup-card">
          <strong>⚡ ${o(`scenarioEnergyFirst`)}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:#D97706;">${i?.overallBalance}</div>
          <small>${o(`panelAngle`)}: ${i?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${o(`cropSunlight`)}: ${i?.groundSunlightPercent}%<br/>
            ⚡ ${o(`solarEnergy`)}: ${i?.solarScore}%
          </div>
        </div>
      </div>
    </div>
  `}function zn(){document.querySelectorAll(`.preset-chip`).forEach(e=>{e.addEventListener(`click`,t=>{document.querySelectorAll(`.preset-chip`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let n=e.getAttribute(`data-scenario`),r={best:Y.optimizationResult?.recommended,current:Y.optimizationResult?.current,crop:Y.optimizationResult?.whatIfScenarios?.cropFirst,energy:Y.optimizationResult?.whatIfScenarios?.energyFirst,storm:Y.optimizationResult?.whatIfScenarios?.stormStow}[n];r&&(Y.simulationParams.panelTilt=r.config.angle,Y.currentFarm.solar.angle=r.config.angle,X(),$(`Simulating scenario: ${e.textContent.trim()}`))})})}function Bn(){let e=[`01 `+o(`stepFarm`),`02 `+o(`stepCrop`),`03 `+o(`stepLocation`),`04 `+o(`stepWeather`),`05 `+o(`stepSolar`),`06 `+o(`stepSimulation`),`07 `+o(`stepOptimization`),`08 `+o(`stepResults`)],t=Y.onboardingStep,n=Y.currentFarm;return`
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">${o(`onboardingTitle`)}</h2>
        <span class="badge badge-live">${o(`step`)} ${t+1} ${o(`of`)} 8</span>
      </div>

      <!-- Step Navigation Nodes -->
      <div class="wizard-progress-bar">
        ${e.map((e,n)=>`
          <div class="wizard-step-node ${n===t?`active`:n<t?`completed`:``}" data-step="${n}">
            ${n<t?`✓`:``} ${e}
          </div>
        `).join(``)}
      </div>

      <!-- Step Content Area -->
      <div id="wizard-step-content" style="margin: 1.5rem 0;">
        ${Vn(t,n)}
      </div>

      <!-- Navigation Footer -->
      <div style="display:flex; justify-content:space-between; margin-top:1.5rem; border-top:1px solid var(--border-subtle); padding-top:1.25rem;">
        <button id="btn-wiz-back" class="btn btn-secondary" ${t===0?`disabled`:``}>${o(`btnBack`)}</button>
        <button id="btn-wiz-skip" class="btn btn-secondary">${o(`btnSkip`)}</button>
        <button id="btn-wiz-next" class="btn btn-primary">${o(t===7?`btnCompleteSetup`:`btnNextStep`)}</button>
      </div>
    </div>
  `}function Vn(e,n){switch(e){case 0:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">01. ${o(`farmProfile`)}</h3>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`farmName`)}</label>
            <input type="text" id="wiz-farm-name" value="${n.name}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`farmSize`)}</label>
            <div style="display:flex; gap:0.5rem; margin-top:0.35rem;">
              <input type="number" id="wiz-farm-size" value="${n.size}" style="flex:1; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium);" />
              <select id="wiz-farm-unit" style="padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium);">
                <option value="Acre" ${n.unit===`Acre`?`selected`:``}>${o(`unitAcre`)}</option>
                <option value="Hectare" ${n.unit===`Hectare`?`selected`:``}>${o(`unitHectare`)}</option>
              </select>
            </div>
          </div>
        </div>
      `;case 1:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">02. ${o(`selectCropStage`)}</h3>
        <div class="crop-select-grid" style="margin-bottom:1.5rem;">
          ${Object.values(t).map(e=>`
            <div class="crop-card ${n.cropId===e.id?`selected`:``}" data-crop="${e.id}">
              <div class="crop-card-icon">${e.icon}</div>
              <div class="crop-card-name">${o(`crop_`+e.id,e.name)}</div>
              <div class="crop-card-category">${e.lightCategory}</div>
            </div>
          `).join(``)}
        </div>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`growthStage`)}</label>
            <select id="wiz-crop-stage" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;">
              <option value="seedling">${o(`stageSeedling`)}</option>
              <option value="vegetative">${o(`stageVegetative`)}</option>
              <option value="flowering" selected>${o(`stageFlowering`)}</option>
              <option value="fruiting">${o(`stageFruiting`)}</option>
              <option value="mature">${o(`stageMature`)}</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`irrigationMethod`)}</label>
            <select id="wiz-irrigation" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;">
              <option value="Drip Irrigation">${o(`irrigDrip`)}</option>
              <option value="Sprinkler">${o(`irrigSprinkler`)}</option>
              <option value="Flood Irrigation">${o(`irrigFlood`)}</option>
              <option value="Rainfed">${o(`irrigRainfed`)}</option>
            </select>
          </div>
        </div>
      `;case 2:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">03. ${o(`farmLocationTitle`)}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${o(`farmLocationDesc`)}</p>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`latitude`)}</label>
            <input type="number" step="0.0001" id="wiz-lat" value="${n.location?.lat||13.1368}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`longitude`)}</label>
            <input type="number" step="0.0001" id="wiz-lon" value="${n.location?.lon||78.1292}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
        </div>
      `;case 3:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">04. ${o(`weatherBaseline`)}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${o(`weatherBaselineDesc`)}</p>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`temperature`)}</label>
            <input type="number" id="wiz-temp" value="${n.weather?.temp||24}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`cloudCoverPercent`)}</label>
            <input type="number" id="wiz-cloud" value="${n.weather?.cloudCover||25}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
        </div>
      `;case 4:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">05. ${o(`existingSolar`)}</h3>
        <div class="grid-3">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`initialTilt`)}</label>
            <input type="number" id="wiz-angle" value="${n.solar?.angle||25}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`panelHeight`)}</label>
            <input type="number" step="0.1" id="wiz-height" value="${n.solar?.height||3}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${o(`panelWattage`)}</label>
            <input type="number" id="wiz-wattage" value="${n.solar?.wattage||450}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
        </div>
      `;case 5:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">06. ${o(`twinVerification`)}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${o(`twinVerifDesc`)}</p>
        <div style="background:#F0FDF4; padding:1.25rem; border-radius:var(--radius-md); border:1px solid #BBF7D0;">
          ✓ ${n.solar?.height||3}m • 4 ${o(`row`)}<br/>
          ✓ ${o(`cropSunlight`)}: ${n.cropName||o(`crop_tomato`)}.
        </div>
      `;case 6:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">07. ${o(`aiReadyTitle`)}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${o(`aiReadyDesc`)}</p>
        <div style="padding:1.5rem; background:#FAF5FF; border-radius:var(--radius-md); border:1px solid #E9D5FF; text-align:center;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🤖</div>
          <strong style="color:#6B21A8;">${o(`aiSweetSpotFound`)}</strong>
          <p style="font-size:0.85rem; color:#7E22CE; margin-top:0.25rem;">${o(`aiReadyDesc`)}</p>
        </div>
      `;case 7:return`
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">08. ${o(`setupComplete`)}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${o(`setupCompleteDesc`)}</p>
        <div style="background:#E8F5E9; padding:1.25rem; border-radius:var(--radius-md); border:1px solid #A7F3D0;">
          ✓ ${o(`farmProfile`)} ${o(`setupComplete`)}.<br/>
          ✓ ${o(`digitalTwinTitle`)} & ${o(`recommendedSetup`)} ready.
        </div>
      `}}function Hn(){let e=document.getElementById(`btn-wiz-back`),n=document.getElementById(`btn-wiz-next`),r=document.getElementById(`btn-wiz-skip`);document.querySelectorAll(`.crop-card`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.crop-card`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`);let n=e.getAttribute(`data-crop`);Y.currentFarm.cropId=n,Y.currentFarm.cropName=t[n].name})}),e&&e.addEventListener(`click`,()=>{Y.onboardingStep>0&&(Y.onboardingStep--,Z())}),r&&r.addEventListener(`click`,()=>{Yn(),$(`Loaded demo parameters for instant presentation.`),window.location.hash=`#home`}),n&&n.addEventListener(`click`,async()=>{Un(),Y.onboardingStep<7?(Y.onboardingStep++,Z()):(await y(Y.currentFarm),yn(),X(),$(`✓ Farm setup completed and saved!`),window.location.hash=`#home`)})}function Un(){let e=Y.currentFarm;if(Y.onboardingStep===0){let t=document.getElementById(`wiz-farm-name`),n=document.getElementById(`wiz-farm-size`),r=document.getElementById(`wiz-farm-unit`);t&&(e.name=t.value),n&&(e.size=parseFloat(n.value)),r&&(e.unit=r.value)}else if(Y.onboardingStep===1){let t=document.getElementById(`wiz-crop-stage`);t&&(e.growthStage=t.value,e.growthStageName=t.options[t.selectedIndex].text)}else if(Y.onboardingStep===2){let t=document.getElementById(`wiz-lat`),n=document.getElementById(`wiz-lon`);t&&n&&(e.location.lat=parseFloat(t.value),e.location.lon=parseFloat(n.value))}else if(Y.onboardingStep===4){let t=document.getElementById(`wiz-angle`),n=document.getElementById(`wiz-height`),r=document.getElementById(`wiz-wattage`);t&&(e.solar.angle=parseInt(t.value)),n&&(e.solar.height=parseFloat(n.value)),r&&(e.solar.wattage=parseInt(r.value))}}function Wn(){let e=Y.currentFarm,t=Y.optimizationResult,n=t?.recommended,r=t?.current,i=document.getElementById(`modal-container`),a=document.getElementById(`modal-content`);a.innerHTML=`
    <div class="modal-header">
      <h3 class="modal-title">📄 ${o(`reportTitle`)}</h3>
      <button class="modal-close" id="modal-close-btn">&times;</button>
    </div>

    <div class="print-header">
      <h2 style="color:var(--color-agri-dark); font-size:1.4rem;">${e.name}</h2>
      <p style="color:var(--text-muted); font-size:0.85rem;">
        ${o(`reportSub`)} • ${o(`reportDate`)}: ${new Date().toLocaleString()}
      </p>
    </div>

    <table class="print-table">
      <tr>
        <th>${o(`reportFarmCrop`)}</th>
        <td>${e.cropName||`Tomato`} (${e.growthStageName||`Flowering`})</td>
        <th>${o(`reportFarmArea`)}</th>
        <td>${e.size||5} ${e.unit||`Acre`}</td>
      </tr>
      <tr>
        <th>${o(`reportLocation`)}</th>
        <td>${e.location?.lat}°N, ${e.location?.lon}°E</td>
        <th>${o(`reportWeatherStatus`)}</th>
        <td>${e.weather?.temp}°C (${e.weather?.source||`LIVE`})</td>
      </tr>
      <tr>
        <th>${o(`reportSolarArray`)}</th>
        <td>${e.solar?.panelCount||20} Panels (${e.solar?.wattage||450}W)</td>
        <th>${o(`reportDataQuality`)}</th>
        <td>${e.isDemo?o(`badgeDemo`):o(`activeFarm`)}</td>
      </tr>
    </table>

    <h4 style="margin:1rem 0 0.5rem; color:var(--color-agri-dark);">${o(`reportSetupComparison`)}</h4>
    <table class="print-table">
      <thead>
        <tr>
          <th>${o(`reportMetric`)}</th>
          <th>${o(`currentSetup`)}</th>
          <th>${o(`recommendedSetup`)}</th>
          <th>${o(`reportDelta`)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${o(`panelAngle`)}</td>
          <td>${r?.config?.angle}°</td>
          <td>${n?.config?.angle}°</td>
          <td>+${n?.config?.angle-r?.config?.angle}°</td>
        </tr>
        <tr>
          <td>${o(`panelHeight`)}</td>
          <td>${r?.config?.height}m</td>
          <td>${n?.config?.height}m</td>
          <td>+${(n?.config?.height-r?.config?.height).toFixed(1)}m</td>
        </tr>
        <tr>
          <td>${o(`cropSunlight`)}</td>
          <td>${r?.groundSunlightPercent}%</td>
          <td>${n?.groundSunlightPercent}%</td>
          <td>+${n?.groundSunlightPercent-r?.groundSunlightPercent}%</td>
        </tr>
        <tr>
          <td>${o(`powerGeneration`)}</td>
          <td>${r?.estimatedPowerKW} kW</td>
          <td>${n?.estimatedPowerKW} kW</td>
          <td>+${(n?.estimatedPowerKW-r?.estimatedPowerKW).toFixed(2)} kW</td>
        </tr>
        <tr>
          <td><strong>${o(`farmBalance`)}</strong></td>
          <td><strong>${r?.overallBalance}/100</strong></td>
          <td><strong>${n?.overallBalance}/100</strong></td>
          <td><strong>+${n?.overallBalance-r?.overallBalance} pts</strong></td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top:1rem; font-size:0.85rem; line-height:1.5;">
      <strong>${o(`reportWhySelected`)}</strong><br/>
      ${t?.explanation}
    </div>

    <div class="report-disclaimer">
      ⚠️ <strong>${o(`reportDisclaimer`)}</strong>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;">
      <button class="btn btn-secondary" id="btn-print-report">${o(`btnPrintPdf`)}</button>
      <button class="btn btn-primary" id="btn-download-json">${o(`btnDownloadJson`)}</button>
    </div>
  `,i.classList.add(`active`),document.getElementById(`modal-close-btn`).addEventListener(`click`,()=>{i.classList.remove(`active`)}),document.getElementById(`btn-print-report`).addEventListener(`click`,()=>{window.print()}),document.getElementById(`btn-download-json`).addEventListener(`click`,()=>{let n=new Blob([JSON.stringify({farm:e,opt:t},null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`Farm_Report_${e.name.replace(/\s+/g,`_`)}.json`,i.click(),URL.revokeObjectURL(r),$(`Report downloaded as JSON`)})}function Gn(){let e=document.getElementById(`modal-container`),t=document.getElementById(`modal-content`);t.innerHTML=`
    <div class="modal-header">
      <h3 class="modal-title">📝 ${o(`manualLocTitle`)}</h3>
      <button class="modal-close" id="modal-close-btn">&times;</button>
    </div>

    <div class="grid-2" style="margin-top:1rem;">
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`villageTown`)}</label>
        <input type="text" id="manual-village" value="${Y.currentFarm.location?.village||``}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`district`)}</label>
        <input type="text" id="manual-district" value="${Y.currentFarm.location?.district||``}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`latitude`)}</label>
        <input type="number" step="0.0001" id="manual-lat" value="${Y.currentFarm.location?.lat||13.1}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`longitude`)}</label>
        <input type="number" step="0.0001" id="manual-lon" value="${Y.currentFarm.location?.lon||78.1}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;">
      <button class="btn btn-secondary" id="btn-cancel-modal">${o(`btnCancel`)}</button>
      <button class="btn btn-primary" id="btn-save-loc">${o(`btnSaveLoc`)}</button>
    </div>
  `,e.classList.add(`active`);let n=()=>e.classList.remove(`active`);document.getElementById(`modal-close-btn`).addEventListener(`click`,n),document.getElementById(`btn-cancel-modal`).addEventListener(`click`,n),document.getElementById(`btn-save-loc`).addEventListener(`click`,async()=>{Y.currentFarm.location={...Y.currentFarm.location,village:document.getElementById(`manual-village`).value,district:document.getElementById(`manual-district`).value,lat:parseFloat(document.getElementById(`manual-lat`).value),lon:parseFloat(document.getElementById(`manual-lon`).value),source:`MANUAL`,label:`${document.getElementById(`manual-village`).value||`Farm`}, ${document.getElementById(`manual-district`).value||``}`},await y(Y.currentFarm),X(),n(),$(`Location updated manually.`),Z()})}function Kn(){let t=document.getElementById(`modal-container`),n=document.getElementById(`modal-content`),r=Y.currentFarm.weather||e.weather;n.innerHTML=`
    <div class="modal-header">
      <h3 class="modal-title">📝 ${o(`manualWeatherTitle`)}</h3>
      <button class="modal-close" id="modal-close-btn">&times;</button>
    </div>

    <div class="grid-2" style="margin-top:1rem;">
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`temperature`)}</label>
        <input type="number" id="manual-w-temp" value="${r.temp}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`cloudCoverPercent`)}</label>
        <input type="number" id="manual-w-cloud" value="${r.cloudCover}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`solarIrradiance`)} (W/m²)</label>
        <input type="number" id="manual-w-rad" value="${r.solarRadiation}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${o(`humidity`)} (%)</label>
        <input type="number" id="manual-w-hum" value="${r.humidity}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;">
      <button class="btn btn-secondary" id="btn-cancel-w-modal">${o(`btnCancel`)}</button>
      <button class="btn btn-primary" id="btn-save-w">${o(`btnSaveWeather`)}</button>
    </div>
  `,t.classList.add(`active`);let i=()=>t.classList.remove(`active`);document.getElementById(`modal-close-btn`).addEventListener(`click`,i),document.getElementById(`btn-cancel-w-modal`).addEventListener(`click`,i),document.getElementById(`btn-save-w`).addEventListener(`click`,async()=>{Y.currentFarm.weather={...Y.currentFarm.weather,temp:parseFloat(document.getElementById(`manual-w-temp`).value),cloudCover:parseFloat(document.getElementById(`manual-w-cloud`).value),solarRadiation:parseFloat(document.getElementById(`manual-w-rad`).value),humidity:parseFloat(document.getElementById(`manual-w-hum`).value),source:`MANUAL`,timestamp:new Date().toISOString()},Y.simulationParams.cloudCover=Y.currentFarm.weather.cloudCover,await y(Y.currentFarm),X(),i(),$(`Weather updated manually.`),Z()})}var qn=[{name:`1. Farm Profile`,view:`home`,desc:`Overview of Green Valley Farm & live health pulse.`},{name:`2. Crop Light Target`,view:`scan`,desc:`Crop canopy photos, EXIF GPS reading & prototype CV diagnosis.`},{name:`3. Weather Intelligence`,view:`weather`,desc:`Open-Meteo live solar irradiance, cloud cover & forecast.`},{name:`4. Sun & Shadow Physics`,view:`home`,desc:`Interactive celestial sun orbit with dynamic 2D ground shadows.`},{name:`5. Multi-Objective AI`,view:`optimize`,desc:`Evaluating 35+ candidate configurations balancing crop PAR & PV energy.`},{name:`6. The Sweet Spot`,view:`optimize`,desc:`Signature balance meter, heatmaps, and explainable farmer reasoning.`},{name:`7. Virtual Actuator`,view:`optimize`,desc:`Motorized slew drive simulation executing real angle adjustment.`},{name:`8. What-If Scenarios`,view:`whatif`,desc:`Side-by-side trade-off comparison proving dual-objective balance.`},{name:`9. Farm Report`,view:`results`,desc:`Comprehensive printable decision-support document.`}];function Jn(){let e=document.getElementById(`btn-toggle-presentation`),t=document.getElementById(`presentation-banner`),n=document.getElementById(`btn-pres-prev`),r=document.getElementById(`btn-pres-next`),i=document.getElementById(`btn-close-presentation`),a=document.getElementById(`btn-reset-demo`),o=document.getElementById(`pres-step-name`);e&&e.addEventListener(`click`,()=>{Y.presentationActive=!Y.presentationActive,t.style.display=Y.presentationActive?`flex`:`none`,Y.presentationActive&&(Y.presentationStep=0,s())}),i&&i.addEventListener(`click`,()=>{Y.presentationActive=!1,t.style.display=`none`}),a&&a.addEventListener(`click`,()=>{Yn(),$(`Demo reset to initial Green Valley Farm baseline.`),Z()}),n&&n.addEventListener(`click`,()=>{Y.presentationStep>0&&(Y.presentationStep--,s())}),r&&r.addEventListener(`click`,()=>{Y.presentationStep<qn.length-1&&(Y.presentationStep++,s())});function s(){let e=qn[Y.presentationStep];o&&(o.textContent=e.name),window.location.hash=`#`+e.view,$(`Step ${Y.presentationStep+1}: ${e.desc}`)}}function Yn(){Y.currentFarm=JSON.parse(JSON.stringify(e)),yn(),X(),y(Y.currentFarm)}function Xn(){let e=document.getElementById(`sync-banner`),t=document.getElementById(`sync-status-icon`),n=document.getElementById(`sync-status-text`);function r(r){Y.isOnline=r,r?(e.className=`sync-banner online`,t.textContent=`🟢`,n.textContent=o(`syncOnline`),$(o(`syncRestored`))):(e.className=`sync-banner offline`,t.textContent=`🟠`,n.textContent=o(`syncOffline`),$(o(`syncOffline`)))}window.addEventListener(`online`,()=>r(!0)),window.addEventListener(`offline`,()=>r(!1))}function Zn(){let e=document.getElementById(`lang-selector`);e&&e.addEventListener(`change`,e=>{let t=e.target.value;a(t),document.documentElement.lang=t,Z(),Qn(),rr(),$(o(`langSwitchedNotice`,`Interface language updated successfully`))})}function Qn(){document.querySelectorAll(`[data-i18n]`).forEach(e=>{let t=e.getAttribute(`data-i18n`);if(t){let n=o(t);n&&n!==t&&(e.textContent=n)}}),document.querySelectorAll(`[data-i18n-title]`).forEach(e=>{let t=e.getAttribute(`data-i18n-title`);t&&(e.title=o(t))}),document.querySelectorAll(`[data-i18n-placeholder]`).forEach(e=>{let t=e.getAttribute(`data-i18n-placeholder`);t&&(e.placeholder=o(t))});let e=document.getElementById(`sync-status-text`);e&&(e.textContent=Y.isOnline?o(`syncOnline`):o(`syncOffline`))}function $n(){let e=document.getElementById(`modal-container`),t=document.getElementById(`modal-content`);t.innerHTML=`
    <div class="modal-header">
      <h3 class="modal-title">❓ ${o(`faqTitle`)}</h3>
      <button class="modal-close" id="modal-close-guide">&times;</button>
    </div>

    <div style="margin-bottom:1.15rem; color:var(--text-secondary); font-size:0.92rem; line-height:1.5;">
      ${o(`faqIntro`)}
    </div>

    <div class="faq-item">
      <div class="faq-q">${o(`faqQ1`)}</div>
      <div class="faq-a">${o(`faqA1`)}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${o(`faqQ2`)}</div>
      <div class="faq-a">${o(`faqA2`)}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${o(`faqQ3`)}</div>
      <div class="faq-a">${o(`faqA3`)}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${o(`faqQ4`)}</div>
      <div class="faq-a">${o(`faqA4`)}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${o(`faqQ5`)}</div>
      <div class="faq-a">${o(`faqA5`)}</div>
    </div>

    <div style="display:flex; justify-content:flex-end; margin-top:1.25rem;">
      <button class="btn btn-primary" id="btn-close-guide-ok">${o(`btnGotIt`)}</button>
    </div>
  `,e.classList.add(`active`);let n=()=>e.classList.remove(`active`),r=document.getElementById(`modal-close-guide`),i=document.getElementById(`btn-close-guide-ok`);r&&r.addEventListener(`click`,n),i&&i.addEventListener(`click`,n)}function er(){document.getElementById(`brand-link`).addEventListener(`click`,e=>{e.preventDefault(),window.location.hash=`#home`});let e=document.getElementById(`btn-open-guide`);e&&e.addEventListener(`click`,()=>{$n()}),document.getElementById(`btn-header-voice`)?.addEventListener(`click`,()=>{pn()}),document.getElementById(`nav-link-voice`)?.addEventListener(`click`,()=>{dn()})}function tr(){`serviceWorker`in navigator&&window.location.protocol.startsWith(`http`)&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./service-worker.js`).then(e=>{console.log(`PWA ServiceWorker registered with scope:`,e.scope)}).catch(e=>{console.warn(`ServiceWorker registration error:`,e)})})}function nr(){we(),rr();let e=document.getElementById(`btn-open-support`);e&&e.addEventListener(`click`,()=>{window.location.hash=`#support`});let t=document.getElementById(`btn-open-security`);t&&t.addEventListener(`click`,()=>{window.location.hash=`#security`}),window.addEventListener(`sunstarved:new-alert`,e=>{Y.soundEnabled&&F(e.detail.severity===`critical`?`warning`:`info`),$(`${e.detail.title}: ${e.detail.message}`)}),window.addEventListener(`sunstarved:auth-state-change`,()=>{rr(),(Y.activeView===`security`||Y.activeView===`dashboard`)&&Z()}),window.addEventListener(`sunstarved:reauth-challenge`,e=>{cr(e.detail)}),Ce(e=>{Y.activeView===`dashboard`&&ir(e)})}function rr(){let e=B(),t=document.getElementById(`header-farmer-name`);t&&(t.textContent=e?`${e.farmerName} (${e.farmerId.slice(0,10)})`:`${z.name} (${z.id.slice(0,10)})`)}function ir(e){let t=document.getElementById(`metric-last-update`);t&&(t.textContent=`${Math.max(0,Math.floor((Date.now()-new Date(e.lastUpdateTime).getTime())/1e3))}s ago`);let n=document.getElementById(`metric-power-watts`);n&&(n.textContent=e.solarPowerOutputWatts);let r=document.getElementById(`metric-energy-kwh`);r&&(r.textContent=e.solarEnergyTodayKwh);let i=document.getElementById(`metric-battery-soc`);i&&(i.textContent=e.battery.chargePercent);let a=document.getElementById(`metric-soil-moisture`);a&&(a.textContent=e.soilMoisture);let o=document.getElementById(`metric-rainfall`);o&&(o.textContent=e.rainfallMm);let s=document.getElementById(`metric-panel-angle`);s&&(s.textContent=e.panelAngleDeg);let c=document.getElementById(`iot-activity-feed`);c&&e.activityLogs&&(c.innerHTML=e.activityLogs.slice(0,10).map(e=>`
      <div class="log-entry">
        <span class="log-time">${e.time}</span>
        <span class="log-msg">${e.message}</span>
      </div>
    `).join(``))}function ar(){let e=document.getElementById(`dash-automation-select`);e&&e.addEventListener(`change`,e=>{let t=e.target.value;if(t===`MANUAL`)st({title:`Manual Actuator Override`,reason:`Disabling automated closed-loop AI positioning requires farmer authorization.`,onConfirmed:()=>{j(t),$(`Manual actuator mode engaged`)},onCancelled:()=>{Z()}});else{j(t),$(`Automation set to: `+t);let e=O();Y.simulationParams.panelTilt=e.panelAngleDeg}}),document.querySelectorAll(`.btn-panel-toggle`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-status`);ze(t),$(`Solar array status set to ${t}`),Z()})});let t=document.getElementById(`btn-simulate-rain`);t&&t.addEventListener(`click`,()=>{Be(),$(`🌧️ Simulated 12.4mm rain event dispatched`),Z()});let n=document.getElementById(`btn-toggle-sound`);n&&n.addEventListener(`click`,()=>{Y.soundEnabled=!Y.soundEnabled,n.textContent=Y.soundEnabled?`🔔 Audio Chime: ON`:`🔕 Audio Chime: OFF`,$(Y.soundEnabled?`Audio alerts enabled`:`Audio alerts muted`)});let r=document.getElementById(`btn-irrig-mode-auto`);r&&r.addEventListener(`click`,()=>{Ge(),$(`Irrigation set to Weather-Aware Auto mode`),Z()});let i=document.getElementById(`btn-irrig-pump-on`);i&&i.addEventListener(`click`,()=>{We(!0),$(`Irrigation pump started (Manual)`),Z()});let a=document.getElementById(`btn-irrig-pump-off`);a&&a.addEventListener(`click`,()=>{We(!1),$(`Irrigation pump stopped`),Z()}),document.querySelectorAll(`.btn-dismiss-alert`).forEach(e=>{e.addEventListener(`click`,e=>{Je(e.target.getAttribute(`data-alertid`)),Z()})})}function or(){document.querySelectorAll(`.slot-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{Y.cropCameraSlot=e.getAttribute(`data-slot`),Z()})});let e=document.getElementById(`camera-select`);e&&e.addEventListener(`change`,e=>{Y.cropCameraSettings.selectedCamera=e.target.value,$(`Switched to `+e.target.selectedOptions[0].text)});let t=document.getElementById(`btn-toggle-anomaly-mask`);t&&t.addEventListener(`click`,()=>{let e=document.getElementById(`ai-anomaly-overlay`);if(e){let t=e.style.display===`none`;e.style.display=t?`block`:`none`,$(t?`AI Diagnostic Mask Enabled`:`AI Diagnostic Mask Hidden`)}});let n=document.getElementById(`btn-trigger-webcam`);n&&n.addEventListener(`click`,async()=>{try{let e=document.getElementById(`live-camera-video`),t=document.getElementById(`webcam-live-container`),r=document.getElementById(`sample-photo-container`);if(Y.cameraStream){On(),t.style.display=`none`,r.style.display=`block`,n.textContent=`📷 Open Webcam`;return}let i=await navigator.mediaDevices.getUserMedia({video:{facingMode:`environment`}});Y.cameraStream=i,e.srcObject=i,t.style.display=`block`,r.style.display=`none`,n.textContent=`⏹️ Close Webcam`,$(`Connected to local optical camera sensor`)}catch(e){console.warn(`Camera access:`,e),$(`Webcam not available on this device. Using field camera simulation.`)}});let r=document.getElementById(`btn-snap-photo`);r&&r.addEventListener(`click`,()=>{$(`📸 Field snapshot captured! Running AI leaf diagnosis (Score: 93/100)...`)});let i=document.getElementById(`camera-file-input`);i&&i.addEventListener(`change`,e=>{let t=e.target.files[0];t&&$(`Uploaded ${t.name}. AI evaluated canopy health at 92/100.`)});let a=document.getElementById(`btn-sample-healthy`);a&&a.addEventListener(`click`,()=>{$(`Loaded Sample A: Healthy Vegetative Canopy (Score 94)`)});let o=document.getElementById(`btn-sample-wilting`);o&&o.addEventListener(`click`,()=>{$(`⚠️ Loaded Sample B: Midday Heat-Scorch Detected (Score 71)`)});let s=document.getElementById(`btn-sample-shade`);s&&s.addEventListener(`click`,()=>{$(`⚠️ Loaded Sample C: Low-Light Etiolation Detected (Score 68)`)})}function sr(){document.querySelectorAll(`.sec-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{Y.securityTab=e.getAttribute(`data-sectab`),Z()})});let e=document.getElementById(`btn-sec-logout`);e&&e.addEventListener(`click`,()=>{lt(),$(`Logged out of session. Switched to guest mode.`),dr()});let t=document.getElementById(`btn-copy-id`);t&&t.addEventListener(`click`,()=>{let e=document.getElementById(`farmer-id-display`)?.textContent||z.id;navigator.clipboard?.writeText(e),$(`Copied Farmer ID: ${e}`)});let n=document.getElementById(`btn-test-biometric`);n&&n.addEventListener(`click`,()=>{lr(()=>{$(`✓ Biometric credential verified successfully!`)})});let r=document.getElementById(`btn-logout-all-devices`);r&&r.addEventListener(`click`,()=>{ut(),$(`All remote device sessions terminated.`),Z()});let i=document.getElementById(`btn-open-change-password`);i&&i.addEventListener(`click`,()=>{pr()});let a=document.getElementById(`btn-request-phone-reverification`);a&&a.addEventListener(`click`,()=>{let e=B()||z,t=et(e.phone,`PHONE_REVERIFY`);ur(e.phone,t.simulatedOtp,()=>{$(`✓ Mobile number successfully re-verified!`)})})}function cr({title:e,reason:t,onConfirmed:n,onCancelled:r}){let i=document.getElementById(`modal-container`),a=document.getElementById(`modal-content`);if(!i||!a)return;a.innerHTML=Zt(e,t),i.classList.add(`active`);let o=document.getElementById(`btn-confirm-reauth`),s=document.getElementById(`btn-biometric-reauth`),c=document.getElementById(`btn-cancel-reauth`),l=document.getElementById(`reauth-password`);o&&o.addEventListener(`click`,()=>{l?.value?(i.classList.remove(`active`),$(`✓ Authorization confirmed`),n&&n()):$(`Please enter password to authorize`)}),s&&s.addEventListener(`click`,()=>{lr(()=>{i.classList.remove(`active`),$(`✓ Biometric authorization confirmed`),n&&n()})}),c&&c.addEventListener(`click`,()=>{i.classList.remove(`active`),$(`Action cancelled`),r&&r()})}function lr(e){let t=document.getElementById(`modal-container`),n=document.getElementById(`modal-content`);if(!t||!n)return;n.innerHTML=Xt(),t.classList.add(`active`);let r=document.getElementById(`btn-cancel-biometric`);r&&r.addEventListener(`click`,()=>{t.classList.remove(`active`)}),ot().then(()=>{F(`info`),setTimeout(()=>{t.classList.remove(`active`),e&&e()},400)})}function ur(e,t,n){let r=document.getElementById(`modal-container`),i=document.getElementById(`modal-content`);if(!r||!i)return;i.innerHTML=Yt(e,t),r.classList.add(`active`);let a=document.getElementById(`btn-submit-verify-otp`),o=document.getElementById(`otp-input-code`),s=document.getElementById(`btn-resend-otp`);o&&(o.value=t),a&&a.addEventListener(`click`,()=>{let t=tt(e,o?.value?.trim()||``);t.success?(r.classList.remove(`active`),$(`✓ Phone successfully verified!`),n&&n()):$(t.message)}),s&&s.addEventListener(`click`,t=>{t.preventDefault();let n=et(e,`RESEND`);$(`Simulated SMS sent! Code: ${n.simulatedOtp}`),o&&(o.value=n.simulatedOtp)})}function dr(){let e=document.getElementById(`modal-container`),t=document.getElementById(`modal-content`);if(!e||!t)return;t.innerHTML=qt(),e.classList.add(`active`);let n=document.getElementById(`btn-submit-login`),r=document.getElementById(`btn-one-tap-biometric`),i=document.getElementById(`link-go-register`),a=document.getElementById(`link-forgot-password`);n&&n.addEventListener(`click`,async()=>{let t=document.getElementById(`login-identifier`)?.value?.trim(),n=document.getElementById(`login-password`)?.value;try{let{farmer:r}=await at(t,n);e.classList.remove(`active`),$(`Welcome back, ${r.name}!`),window.location.hash=`#dashboard`}catch(e){$(e.message)}}),r&&r.addEventListener(`click`,()=>{lr(async()=>{try{let{farmer:t}=await at(z.id,`Farmer@123`);e.classList.remove(`active`),$(`Biometric match verified for ${t.name}!`),window.location.hash=`#dashboard`}catch{$(`Login verification complete`)}})}),i&&i.addEventListener(`click`,e=>{e.preventDefault(),fr()}),a&&a.addEventListener(`click`,e=>{e.preventDefault(),pr()})}function fr(){let e=document.getElementById(`modal-container`),t=document.getElementById(`modal-content`);if(!e||!t)return;t.innerHTML=Jt(),e.classList.add(`active`);let n=document.getElementById(`btn-submit-register`),r=document.getElementById(`link-go-login`);n&&n.addEventListener(`click`,async()=>{let e=document.getElementById(`reg-name`)?.value?.trim(),t=document.getElementById(`reg-phone`)?.value?.trim(),n=document.getElementById(`reg-password`)?.value;!e||!t||!n?$(`Please fill in all registration fields`):ur(t,et(t,`REGISTRATION`).simulatedOtp,async()=>{try{let r=await nt({name:e,phone:t,password:n});$(`Account created: ${r.id}!`),await at(r.id,n),window.location.hash=`#dashboard`}catch(e){$(e.message)}})}),r&&r.addEventListener(`click`,e=>{e.preventDefault(),dr()})}function pr(){let e=B()||z,t=et(e.phone,`PASSWORD_RESET`);ur(e.phone,t.simulatedOtp,()=>{$(`✓ Phone verified. Password updated to standard credentials.`)})}function mr(){document.querySelectorAll(`.btn-trend-period`).forEach(e=>{e.addEventListener(`click`,e=>{Y.energyPeriod=e.target.getAttribute(`data-period`),Z()})});let e=document.getElementById(`btn-run-solar-diag`);e&&e.addEventListener(`click`,()=>{$(`Diagnostic Complete: ${ke().title}`)})}function hr(){let e=document.getElementById(`btn-trigger-estop`);e&&e.addEventListener(`click`,()=>{Ae(),Z()});let t=document.getElementById(`btn-reset-estop`);t&&t.addEventListener(`click`,()=>{je(),Z()}),document.querySelectorAll(`.mode-select-card`).forEach(e=>{e.addEventListener(`click`,()=>{j(e.getAttribute(`data-modename`)),Z()})}),document.querySelectorAll(`.btn-angle-preset`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseFloat(e.getAttribute(`data-angle`)),n=document.getElementById(`manual-actuator-slider`),r=document.getElementById(`manual-slider-val`);n&&(n.value=t),r&&(r.textContent=`${t.toFixed(1)}°`),A(t,`Preset commanded: ${t}°`),F(`info`),$(`⚡ Actuator commanded to ${t}°`),Z()})});let n=document.getElementById(`manual-actuator-slider`),r=document.getElementById(`manual-slider-val`);n&&r&&n.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);r.textContent=`${t.toFixed(1)}°`});let i=document.getElementById(`btn-apply-manual-angle`);i&&n&&i.addEventListener(`click`,()=>{let e=parseFloat(n.value);st({title:`Manual Actuator Tilt Override`,reason:`Manual adjustment bypasses automated closed-loop solar tracking.`,onConfirmed:()=>{A(e,`Manual angle override`),F(`info`),$(`✓ Actuator locked at ${e.toFixed(1)}°`),Z()},onCancelled:()=>{Z()}})})}function gr(){document.querySelectorAll(`.btn-alert-filter`).forEach(e=>{e.addEventListener(`click`,e=>{Y.alertFilter=e.target.getAttribute(`data-filter`),Z()})}),document.querySelectorAll(`.btn-ack-alert`).forEach(e=>{e.addEventListener(`click`,e=>{Ke(e.target.getAttribute(`data-alertid`)),$(`Alert acknowledged`),Z()})}),document.querySelectorAll(`.btn-resolve-alert`).forEach(e=>{e.addEventListener(`click`,e=>{qe(e.target.getAttribute(`data-alertid`)),$(`✓ Alert marked as resolved`),Z()})}),document.getElementById(`btn-alerts-voice-test`)?.addEventListener(`click`,()=>{J(`test`)})}function _r(){let e=document.getElementById(`btn-save-scheduler-cfg`);e&&e.addEventListener(`click`,()=>{Ue({rainThresholdMm:parseFloat(document.getElementById(`cfg-rain-threshold`)?.value||2),rainAngleDeg:parseFloat(document.getElementById(`cfg-rain-angle`)?.value||30),rainRestoreDelayMins:parseInt(document.getElementById(`cfg-rain-delay`)?.value||15),soilMoistureThreshold:parseFloat(document.getElementById(`cfg-soil-threshold`)?.value||38),morningCaptureTime:document.getElementById(`cfg-cam-morning`)?.value||`07:30`,afternoonCaptureTime:document.getElementById(`cfg-cam-afternoon`)?.value||`13:15`,nightCaptureTime:document.getElementById(`cfg-cam-night`)?.value||`22:00`,batteryReserveCutoff:parseFloat(document.getElementById(`cfg-battery-cutoff`)?.value||20),windStowSpeedKmh:parseFloat(document.getElementById(`cfg-wind-stow`)?.value||45)}),$(`✓ Environmental Automation Scheduler configuration saved!`),Z()})}function vr(){document.getElementById(`sim-btn-low-battery`)?.addEventListener(`click`,()=>{Pe(),J(`battery`),$(`🚨 Low Battery Rule (≤20%) Triggered! Load shedding engaged.`),Z()}),document.getElementById(`sim-btn-rain`)?.addEventListener(`click`,()=>{Fe(14.5),J(`rain`),$(`🌧️ Rain Event (14.5mm) Injected! Auto-actuating to runoff angle.`),Z()}),document.getElementById(`sim-btn-wind`)?.addEventListener(`click`,()=>{Ie(52),J(`wind`),$(`🌪️ High Wind Gust (52 km/h) Injected! Emergency flat stow (0°) active.`),Z()}),document.getElementById(`sim-btn-solar-fault`)?.addEventListener(`click`,()=>{Me(`DC_DISCONNECT`),$(`⚡ DC String Disconnect Simulated! Switched to battery storage.`),Z()}),document.getElementById(`sim-btn-grid-fault`)?.addEventListener(`click`,()=>{Le(),$(`🔌 External Grid Blackout Simulated! Microgrid isolated.`),Z()}),document.getElementById(`sim-btn-network-cut`)?.addEventListener(`click`,()=>{Ve(),$(`📡 Network Disconnected! Running in Local Autonomous Edge mode.`),Z()}),document.getElementById(`sim-btn-network-restore`)?.addEventListener(`click`,()=>{He(),$(`🔄 Network Restored! Synchronizing buffered local logs to cloud...`),setTimeout(()=>Z(),1600)}),document.getElementById(`sim-btn-estop-toggle`)?.addEventListener(`click`,()=>{O().isEmergencyStopped?(je(),$(`✓ Emergency Stop Cleared`)):(Ae(),$(`🛑 EMERGENCY STOP ENGAGED`)),Z()}),document.getElementById(`btn-sim-restore-all`)?.addEventListener(`click`,()=>{Ne(),Re(),He(),je(),M({solarWatts:2840,batterySoc:88,windSpeed:14.2,rainMm:0}),$(`✓ All systems restored to nominal state.`),Z()});let e=document.getElementById(`sim-slider-watts`),t=document.getElementById(`sim-slider-soc`),n=document.getElementById(`sim-slider-wind`),r=document.getElementById(`sim-slider-rain`);e&&e.addEventListener(`input`,e=>{let t=parseInt(e.target.value);document.getElementById(`val-slider-watts`).textContent=`${t} W`,M({solarWatts:t})}),t&&t.addEventListener(`input`,e=>{let t=parseInt(e.target.value);document.getElementById(`val-slider-soc`).textContent=`${t}%`,M({batterySoc:t})}),n&&n.addEventListener(`input`,e=>{let t=parseInt(e.target.value);document.getElementById(`val-slider-wind`).textContent=`${t} km/h`,M({windSpeed:t})}),r&&r.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);document.getElementById(`val-slider-rain`).textContent=`${t} mm`,M({rainMm:t})})}function yr(){document.getElementById(`btn-print-full-report`)?.addEventListener(`click`,()=>{window.print()}),document.getElementById(`btn-export-csv-report`)?.addEventListener(`click`,()=>{let e=O(),t=`Timestamp,SolarWatts,SolarKwhToday,BatterySoC,BatterySoH,SoilMoisture,PanelAngle,GridStatus\n${new Date().toISOString()},${e.solarPowerOutputWatts},${e.solarEnergyTodayKwh},${e.battery.chargePercent},${e.battery.healthPercent},${e.soilMoisture},${e.panelAngleDeg},"${e.gridStatus}"\n`,n=new Blob([t],{type:`text/csv`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`SunStarved_Farm_Report_${Date.now()}.csv`,i.click(),URL.revokeObjectURL(r),$(`CSV Report Downloaded`)}),document.getElementById(`btn-export-json-report`)?.addEventListener(`click`,()=>{let e=O(),t=new Blob([JSON.stringify({farm:Y.currentFarm,iotState:e,generatedAt:new Date().toISOString()},null,2)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`SunStarved_Farm_Report_${Date.now()}.json`,r.click(),URL.revokeObjectURL(n),$(`JSON Report Downloaded`)})}function br(){document.querySelectorAll(`.support-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{Y.supportTab=e.getAttribute(`data-suptab`),Z()})}),document.querySelectorAll(`.btn-copy-contact`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-text`);t&&(navigator.clipboard?.writeText(t),$(`Copied to clipboard: ${t}`))})});let e=document.getElementById(`btn-open-whatsapp-sim`);e&&e.addEventListener(`click`,()=>{$(`Opening WhatsApp Agrivoltaic Kisan Bot (+91 98765 44040)...`),setTimeout(()=>{$(`💬 WhatsApp Kisan Bot connected! Type "STATUS" or send leaf photo.`)},1e3)});let t={overall:5,tracking:5,ai:4,ease:5};document.querySelectorAll(`.star-rating-picker`).forEach(e=>{let n=e.getAttribute(`data-metric`),r=e.querySelectorAll(`.star`);r.forEach(e=>{e.addEventListener(`click`,()=>{let i=parseInt(e.getAttribute(`data-val`),10);t[n]=i;let a=document.getElementById(`val-rating-${n}`);a&&(a.textContent=`${i} / 5`),r.forEach(e=>{parseInt(e.getAttribute(`data-val`),10)<=i?e.classList.add(`active`):e.classList.remove(`active`)})})})});let n=document.getElementById(`btn-submit-feedback`);n&&n.addEventListener(`click`,()=>{let e=document.getElementById(`fb-subject`)?.value?.trim(),n=document.getElementById(`fb-message`)?.value?.trim(),r=document.getElementById(`fb-category`)?.value,i=document.getElementById(`fb-urgency`)?.value,a=document.getElementById(`fb-farmer-id`)?.value;if(!e||!n){$(`⚠️ Please enter both a subject and your feedback message.`);return}let o=`FB-${Math.floor(1e4+Math.random()*9e4)}`;zt({id:o,date:new Date().toISOString().split(`T`)[0],category:r,ratings:{...t},subject:e,message:n,status:i===`Critical`?`Priority Triage`:`Under Review by Agronomist`,urgency:i,farmerId:a,response:i===`Critical`?`Urgent triage initiated. Field engineer will contact via registered phone within 15 minutes.`:`Thank you! Your field feedback has been submitted to the regional Agrisolar operations desk.`}),F(`info`),$(`🎉 Feedback Submitted! Ticket #${o} created.`),Z()});let r=document.getElementById(`btn-submit-service-req`);r&&r.addEventListener(`click`,()=>{let e=document.getElementById(`srv-type`)?.value,t=document.getElementById(`srv-date`)?.value,n=document.getElementById(`srv-slot`)?.value,r=document.getElementById(`srv-farm-address`)?.value?.trim(),i=document.getElementById(`srv-notes`)?.value?.trim(),a=document.getElementById(`srv-phone`)?.value?.trim();if(!t||!r||!a){$(`⚠️ Please provide date, farm location, and phone number.`);return}let o=`SRV-2026-${Math.floor(100+Math.random()*900)}`;Vt({id:o,date:t,slot:n,serviceType:e,farmLocation:r,status:`Confirmed & Dispatched`,technician:`Er. Somanna / Kolar Regional Agrisolar Hub`,technicianPhone:`+91 94801 88404`,notes:i||`Scheduled field maintenance inspection.`}),F(`info`),$(`🛠️ Service Booked! Engineer dispatched under #${o}`),Z()}),document.querySelectorAll(`.faq-question-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-faqid`),n=document.getElementById(`faq-answer-${t}`);if(n){let t=n.style.display===`none`;n.style.display=t?`block`:`none`,t?e.classList.add(`expanded`):e.classList.remove(`expanded`)}})}),document.querySelectorAll(`.faq-chip`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.faq-chip`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=e.getAttribute(`data-filter`);document.querySelectorAll(`.faq-item`).forEach(e=>{let n=e.getAttribute(`data-category`);t===`all`||n===t?e.style.display=`block`:e.style.display=`none`})})});let i=document.getElementById(`faq-search-input`);i&&i.addEventListener(`input`,e=>{let t=e.target.value.toLowerCase().trim();document.querySelectorAll(`.faq-item`).forEach(e=>{let n=e.textContent.toLowerCase();!t||n.includes(t)?e.style.display=`block`:e.style.display=`none`})})}function $(e){let t=document.getElementById(`toast-container`);if(!t)return;let n=document.createElement(`div`);n.className=`toast`,n.innerHTML=`<span>🌱</span> <span>${e}</span>`,t.appendChild(n),setTimeout(()=>{n.style.opacity=`0`,n.style.transform=`translateY(12px)`,setTimeout(()=>n.remove(),300)},3500)}document.addEventListener(`DOMContentLoaded`,vn);