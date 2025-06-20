// ====================================================================================
// GAME DATA
// ====================================================================================
const ENEMY_TIERS = [
    { color: 'maroon',        healthMod: 1.0, speedMod: 1.0, damageMod: 1.0, expMod: 1.0 },
    { color: 'darkslateblue', healthMod: 1.5, speedMod: 1.1, damageMod: 1.2, expMod: 1.5 },
    { color: 'darkgreen',     healthMod: 2.0, speedMod: 1.2, damageMod: 1.5, expMod: 2.0 },
    { color: 'rebeccapurple', healthMod: 3.0, speedMod: 1.3, damageMod: 2.0, expMod: 2.5 },
    { color: 'darkgoldenrod', healthMod: 5.0, speedMod: 1.5, damageMod: 2.5, expMod: 3.5 }
];

const ENEMY_DATA = {
    Circle:   { shape: 'circle',   health: 30,   speed: 1.3, damage: 10, experienceValue: 30,    gemValue: 1,   gemChance: 0.1,  spawnWeight: 50 },
    Triangle: { shape: 'triangle', health: 20,   speed: 2.0, damage: 8,  experienceValue: 20,    gemValue: 2,   gemChance: 0.25, spawnWeight: 15 },
    Square:   { shape: 'square',   health: 65,   speed: 0.8, damage: 15, experienceValue: 50,    gemValue: 1,   gemChance: 0.05, spawnWeight: 30 },
    Losango:  { shape: 'losango',  health: 100,  speed: 0.6, damage: 20, experienceValue: 100,   gemValue: 3,   gemChance: 0.15, spawnWeight: 4,  shoots: true, shootCooldown: 3000, projectileData: { type: 'standard',  damage: 10, speed: 2,   size: 8 } },
    Octagon:  { shape: 'octagon',  health: 150,  speed: 0.4, damage: 35, experienceValue: 250,   gemValue: 8,   gemChance: 0.5,  spawnWeight: 1,  shoots: true, shootCooldown: 4000, projectileData: { type: 'exploding', damage: 0,  speed: 1.5, size: 16, fuse: 2000, explosionRadius: 70, explosionDamage: 40 } },
    Boss:     { shape: 'star6',    health: 1600, speed: 1.2, damage: 50, experienceValue: 10000, gemValue: 100, gemChance: 1.0,  isBoss: true }
};

const WEAPON_LEVEL_DATA = {
    // AREA:
    "Machado":             [ { damage: 20,  cooldown:  1500, range: 75,  description_key: "desc_Machado_1" }, 
                             { damage: 30,  cooldown:  1400, range: 85,  description_key: "desc_Machado_2" }, 
                             { damage: 40,  cooldown:  1300, range: 95,  description_key: "desc_Machado_3" }, 
                             { damage: 55,  cooldown:  1200, range: 105, description_key: "desc_Machado_4" }, 
                             { damage: 70,  cooldown:  1000, range: 120, description_key: "desc_Machado_5" } ],
    "Espada":              [ { damage: 35,  cooldown:  1000, range: 60,  description_key: "desc_Espada_1" }, 
                             { damage: 45,  cooldown:  950,  range: 65,  description_key: "desc_Espada_2" }, 
                             { damage: 60,  cooldown:  900,  range: 70,  description_key: "desc_Espada_3" }, 
                             { damage: 75,  cooldown:  800,  range: 75,  description_key: "desc_Espada_4" }, 
                             { damage: 90,  cooldown:  700,  range: 80,  description_key: "desc_Espada_5" } ],
    "Chicote":             [ { damage: 15,  cooldown:  1200, range: 150, description_key: "desc_Chicote_1" }, 
                             { damage: 20,  cooldown:  1100, range: 170, description_key: "desc_Chicote_2" }, 
                             { damage: 25,  cooldown:  1000, range: 190, description_key: "desc_Chicote_3" },
                             { damage: 30,  cooldown:  900,  range: 210, description_key: "desc_Chicote_4" },
                             { damage: 40,  cooldown:  800,  range: 230, description_key: "desc_Chicote_5" } ],
    "Pés Quentes":         [ { damage: 5,   cooldown:  250,  duration: 2000, description_key: "desc_Pés Quentes_1" }, 
                            { damage: 8,   cooldown:  250,  duration: 2500, description_key: "desc_Pés Quentes_2" }, 
                            { damage: 12,  cooldown:  200,  duration: 3000, description_key: "desc_Pés Quentes_3" }, 
                            { damage: 18,  cooldown:  200,  duration: 4000, description_key: "desc_Pés Quentes_4" }, 
                            { damage: 25,  cooldown:  150,  duration: 5000, description_key: "desc_Pés Quentes_5" } ],
    // PROJECTILE:
    "Projetil Mágico":     [ { damage: 15,  cooldown:  800,  projectileSpeed: 5,   projectileSize: 8,  numProjectiles: 1, description_key: "desc_Projetil Mágico_1" }, 
                             { damage: 15,  cooldown:  750,  projectileSpeed: 5.5, projectileSize: 8,  numProjectiles: 2, description_key: "desc_Projetil Mágico_2" }, 
                             { damage: 20,  cooldown:  700,  projectileSpeed: 6,   projectileSize: 10, numProjectiles: 2, description_key: "desc_Projetil Mágico_3" }, 
                             { damage: 22,  cooldown:  650,  projectileSpeed: 6,   projectileSize: 10, numProjectiles: 3, description_key: "desc_Projetil Mágico_4" }, 
                             { damage: 28,  cooldown:  500,  projectileSpeed: 7,   projectileSize: 12, numProjectiles: 4, description_key: "desc_Projetil Mágico_5" } ],
    "Fragmento de Gelo":   [ { damage: 5,   cooldown:  1000, projectileSpeed: 5,   projectileSize: 8,  numProjectiles: 1, freezeDuration:  1500, description_key: "desc_Fragmento de Gelo_1" }, 
                             { damage: 5,   cooldown:  900,  projectileSpeed: 5,   projectileSize: 8,  numProjectiles: 1, freezeDuration:  2000, description_key: "desc_Fragmento de Gelo_2" }, 
                             { damage: 8,   cooldown:  900,  projectileSpeed: 5.5, projectileSize: 10, numProjectiles: 2, freezeDuration:  2000, description_key: "desc_Fragmento de Gelo_3" }, 
                             { damage: 8,   cooldown:  800,  projectileSpeed: 6,   projectileSize: 10, numProjectiles: 2, freezeDuration:  2500, description_key: "desc_Fragmento de Gelo_4" }, 
                             { damage: 10,  cooldown:  700,  projectileSpeed: 6,   projectileSize: 12, numProjectiles: 3, freezeDuration:  3000, description_key: "desc_Fragmento de Gelo_5" } ],
    "Tiro Envenenado":     [ { damage: 2,   cooldown:  1200, projectileSpeed: 4,   projectileSize: 8,  numProjectiles: 1, poisonDamage:    10,   poisonDuration:  3000, description_key: "desc_Tiro Envenenado_1" }, 
                             { damage: 2,   cooldown:  1100, projectileSpeed: 4,   projectileSize: 8,  numProjectiles: 1, poisonDamage:    15,   poisonDuration:  3500, description_key: "desc_Tiro Envenenado_2" }, 
                             { damage: 3,   cooldown:  1100, projectileSpeed: 4.5, projectileSize: 10, numProjectiles: 2, poisonDamage:    15,   poisonDuration:  4000, description_key: "desc_Tiro Envenenado_3" }, 
                             { damage: 3,   cooldown:  1000, projectileSpeed: 5,   projectileSize: 10, numProjectiles: 2, poisonDamage:    20,   poisonDuration:  5000, description_key: "desc_Tiro Envenenado_4" }, 
                             { damage: 4,   cooldown:  900,  projectileSpeed: 5,   projectileSize: 12, numProjectiles: 3, poisonDamage:    25,   poisonDuration:  5000, description_key: "desc_Tiro Envenenado_5" } ],
    "Bumerangue":          [ { damage: 15,  cooldown:  1500, projectileSpeed: 4,   projectileSize: 18, numProjectiles: 1, range: 250, description_key: "desc_Bumerangue_1" }, 
                             { damage: 25,  cooldown:  1400, projectileSpeed: 4,   projectileSize: 20, numProjectiles: 1, range: 300, description_key: "desc_Bumerangue_2" }, 
                             { damage: 30,  cooldown:  1300, projectileSpeed: 4.5, projectileSize: 22, numProjectiles: 1, range: 350, description_key: "desc_Bumerangue_3" }, 
                             { damage: 35,  cooldown:  1200, projectileSpeed: 5,   projectileSize: 24, numProjectiles: 2, range: 350, description_key: "desc_Bumerangue_4" }, 
                             { damage: 45,  cooldown:  1000, projectileSpeed: 5,   projectileSize: 26, numProjectiles: 2, range: 400, description_key: "desc_Bumerangue_5" } ],
    "Perfuradora":         [ { damage: 10,  cooldown:  1200, projectileSpeed: 6,   projectileSize: 10, numProjectiles: 1, pierceCount: 3,   description_key: "desc_Perfuradora_1" }, 
                             { damage: 12,  cooldown:  1100, projectileSpeed: 6,   projectileSize: 12, numProjectiles: 1, pierceCount: 5,   description_key: "desc_Perfuradora_2" }, 
                             { damage: 18,  cooldown:  1000, projectileSpeed: 7,   projectileSize: 12, numProjectiles: 1, pierceCount: 7,   description_key: "desc_Perfuradora_3" }, 
                             { damage: 20,  cooldown:  1000, projectileSpeed: 7,   projectileSize: 14, numProjectiles: 2, pierceCount: 10,  description_key: "desc_Perfuradora_4" }, 
                             { damage: 25,  cooldown:  900,  projectileSpeed: 8,   projectileSize: 16, numProjectiles: 2, pierceCount: 999, description_key: "desc_Perfuradora_5" } ],
    "Raio":                [ { damage: 25,  cooldown:  1800, chains: 2, description_key: "desc_Raio_1" },
                             { damage: 30,  cooldown:  1700, chains: 3, description_key: "desc_Raio_2" }, 
                             { damage: 35,  cooldown:  1600, chains: 3, description_key: "desc_Raio_3" }, 
                             { damage: 40,  cooldown:  1500, chains: 4, description_key: "desc_Raio_4" }, 
                             { damage: 50,  cooldown:  1300, chains: 5, description_key: "desc_Raio_5" } ],
    // ORBITAL:
    "Esfera Orbitante":    [ { damage: 10,  cooldown:  100,  numSpheres: 2, orbitRadius: 50, rotationSpeed: 2,   sphereSize: 12, description_key: "desc_Esfera Orbitante_1" }, 
                             { damage: 12,  cooldown:  100,  numSpheres: 3, orbitRadius: 60, rotationSpeed: 2.2, sphereSize: 12, description_key: "desc_Esfera Orbitante_2" }, 
                             { damage: 18,  cooldown:  100,  numSpheres: 3, orbitRadius: 70, rotationSpeed: 2.5, sphereSize: 14, description_key: "desc_Esfera Orbitante_3" }, 
                             { damage: 22,  cooldown:  100,  numSpheres: 4, orbitRadius: 80, rotationSpeed: 2.8, sphereSize: 14, description_key: "desc_Esfera Orbitante_4" }, 
                             { damage: 30,  cooldown:  100,  numSpheres: 4, orbitRadius: 90, rotationSpeed: 3.5, sphereSize: 16, description_key: "desc_Esfera Orbitante_5" } ],
    "Chamas Orbitais":     [ { damage: 5,   cooldown:  100,  numSpheres: 1, orbitRadius: 55, rotationSpeed: 1.8, sphereSize: 14, fireDuration:   1500, description_key: "desc_Chamas Orbitais_1" }, 
                             { damage: 7,   cooldown:  100,  numSpheres: 2, orbitRadius: 65, rotationSpeed: 2.0, sphereSize: 14, fireDuration:   2000, description_key: "desc_Chamas Orbitais_2" }, 
                             { damage: 10,  cooldown:  100,  numSpheres: 2, orbitRadius: 75, rotationSpeed: 2.2, sphereSize: 16, fireDuration:   2000, description_key: "desc_Chamas Orbitais_3" }, 
                             { damage: 12,  cooldown:  100,  numSpheres: 3, orbitRadius: 85, rotationSpeed: 2.5, sphereSize: 16, fireDuration:   2500, description_key: "desc_Chamas Orbitais_4" }, 
                             { damage: 15,  cooldown:  100,  numSpheres: 3, orbitRadius: 95, rotationSpeed: 3,   sphereSize: 18, fireDuration:   3000, description_key: "desc_Chamas Orbitais_5" } ],
    "Frio Orbital":        [ { damage: 5,   cooldown:  100,  numSpheres: 1, orbitRadius: 55, rotationSpeed: 1.8, sphereSize: 14, freezeDuration: 500,  description_key: "desc_Frio Orbital_1" }, 
                             { damage: 7,   cooldown:  100,  numSpheres: 2, orbitRadius: 65, rotationSpeed: 2.0, sphereSize: 14, freezeDuration: 750,  description_key: "desc_Frio Orbital_2" }, 
                             { damage: 10,  cooldown:  100,  numSpheres: 2, orbitRadius: 75, rotationSpeed: 2.2, sphereSize: 16, freezeDuration: 750,  description_key: "desc_Frio Orbital_3" }, 
                             { damage: 12,  cooldown:  100,  numSpheres: 3, orbitRadius: 85, rotationSpeed: 2.5, sphereSize: 16, freezeDuration: 1000, description_key: "desc_Frio Orbital_4" }, 
                             { damage: 15,  cooldown:  100,  numSpheres: 3, orbitRadius: 95, rotationSpeed: 3,   sphereSize: 18, freezeDuration: 1500, description_key: "desc_Frio Orbital_5" } ],
    "Veneno Orbital":      [ { damage: 5,   cooldown:  100,  numSpheres: 1, orbitRadius: 55, rotationSpeed: 1.8, sphereSize: 14, poisonDamage: 8,  poisonDuration: 2000, description_key: "desc_Veneno Orbital_1" }, 
                             { damage: 7,   cooldown:  100,  numSpheres: 2, orbitRadius: 65, rotationSpeed: 2.0, sphereSize: 14, poisonDamage: 10, poisonDuration: 2500, description_key: "desc_Veneno Orbital_2" }, 
                             { damage: 10,  cooldown:  100,  numSpheres: 2, orbitRadius: 75, rotationSpeed: 2.2, sphereSize: 16, poisonDamage: 12, poisonDuration: 2500, description_key: "desc_Veneno Orbital_3" }, 
                             { damage: 12,  cooldown:  100,  numSpheres: 3, orbitRadius: 85, rotationSpeed: 2.5, sphereSize: 16, poisonDamage: 15, poisonDuration: 3000, description_key: "desc_Veneno Orbital_4" }, 
                             { damage: 15,  cooldown:  100,  numSpheres: 3, orbitRadius: 95, rotationSpeed: 3,   sphereSize: 18, poisonDamage: 20, poisonDuration: 3500, description_key: "desc_Veneno Orbital_5" } ],
    // BOMBAS:
    "Bomba":               [ { damage: 50,  cooldown:  4000, radius: 80,  description_key: "desc_Bomba_1" }, 
                             { damage: 60,  cooldown:  3800, radius: 100, description_key: "desc_Bomba_2" }, 
                             { damage: 80,  cooldown:  3500, radius: 110, description_key: "desc_Bomba_3" }, 
                             { damage: 100, cooldown:  3000, radius: 130, description_key: "desc_Bomba_4" }, 
                             { damage: 150, cooldown:  2500, radius: 150, description_key: "desc_Bomba_5" } ],
    "Bomba Incendiária":   [ { damage: 10,  fireDot:   15,   cooldown: 4500, radius: 70,  fireDuration: 2000, description_key: "desc_Bomba Incendiária_1" }, 
                             { damage: 15,  fireDot:   15,   cooldown: 4200, radius: 80,  fireDuration: 2500, description_key: "desc_Bomba Incendiária_2" }, 
                             { damage: 20,  fireDot:   20,   cooldown: 4000, radius: 90,  fireDuration: 3000, description_key: "desc_Bomba Incendiária_3" }, 
                             { damage: 25,  fireDot:   20,   cooldown: 3500, radius: 100, fireDuration: 3500, description_key: "desc_Bomba Incendiária_4" }, 
                             { damage: 30,  fireDot:   25,   cooldown: 3000, radius: 120, fireDuration: 4000, description_key: "desc_Bomba Incendiária_5" } ],
    "Bomba Congelada":     [ { damage: 10,  cooldown:  4500, radius: 70,  freezeDuration: 1000, description_key: "desc_Bomba Congelada_1" }, 
                             { damage: 15,  cooldown:  4200, radius: 80,  freezeDuration: 1500, description_key: "desc_Bomba Congelada_2" }, 
                             { damage: 20,  cooldown:  4000, radius: 90,  freezeDuration: 1500, description_key: "desc_Bomba Congelada_3" }, 
                             { damage: 25,  cooldown:  3500, radius: 100, freezeDuration: 2000, description_key: "desc_Bomba Congelada_4" }, 
                             { damage: 30,  cooldown:  3000, radius: 120, freezeDuration: 2500, description_key: "desc_Bomba Congelada_5" } ],
    "Bomba de Veneno":     [ { damage: 10,  poisonDot: 15,   cooldown: 4500, radius: 70,  poisonDuration: 2000, description_key: "desc_Bomba de Veneno_1" }, 
                             { damage: 15,  poisonDot: 15,   cooldown: 4200, radius: 80,  poisonDuration: 2500, description_key: "desc_Bomba de Veneno_2" }, 
                             { damage: 20,  poisonDot: 20,   cooldown: 4000, radius: 90,  poisonDuration: 3000, description_key: "desc_Bomba de Veneno_3" }, 
                             { damage: 25,  poisonDot: 20,   cooldown: 3500, radius: 100, poisonDuration: 3500, description_key: "desc_Bomba de Veneno_4" }, 
                             { damage: 30,  poisonDot: 25,   cooldown: 3000, radius: 120, poisonDuration: 4000, description_key: "desc_Bomba de Veneno_5" } ],
    "Bombinhas":           [ { damage: 15,  cooldown:  2500, radius: 40, numBombs: 3, description_key: "desc_Bombinhas_1" }, 
                             { damage: 20,  cooldown:  2400, radius: 45, numBombs: 4, description_key: "desc_Bombinhas_2" }, 
                             { damage: 25,  cooldown:  2200, radius: 45, numBombs: 4, description_key: "desc_Bombinhas_3" }, 
                             { damage: 25,  cooldown:  2000, radius: 50, numBombs: 5, description_key: "desc_Bombinhas_4" }, 
                             { damage: 30,  cooldown:  1800, radius: 60, numBombs: 6, description_key: "desc_Bombinhas_5" } ],
    // PETS:
    "Espirito da Luz":     [ { damage: 10,  cooldown:  1500, projectileSpeed: 4,   projectileSize: 7, orbitRadius: 70, rotationSpeed: 1,   description_key: "desc_Espirito da Luz_1" }, 
                             { damage: 15,  cooldown:  1300, projectileSpeed: 4,   projectileSize: 7, orbitRadius: 70, rotationSpeed: 1,   description_key: "desc_Espirito da Luz_2" }, 
                             { damage: 20,  cooldown:  1100, projectileSpeed: 4.5, projectileSize: 8, orbitRadius: 80, rotationSpeed: 1.2, description_key: "desc_Espirito da Luz_3" }, 
                             { damage: 25,  cooldown:  1000, projectileSpeed: 5,   projectileSize: 8, orbitRadius: 80, rotationSpeed: 1.2, description_key: "desc_Espirito da Luz_4" }, 
                             { damage: 20,  cooldown:  1000, projectileSpeed: 5,   projectileSize: 10, orbitRadius: 80, rotationSpeed: 1.2, explosionRadius: 40, explosionDamage: 20, description_key: "desc_Espirito da Luz_5" } ],
    "Espirito das Trevas": [ { damage: 10,  cooldown:  1500, projectileSpeed: 4,   projectileSize: 7, orbitRadius: 70, rotationSpeed: -1,   description_key: "desc_Espirito das Trevas_1" }, 
                             { damage: 15,  cooldown:  1300, projectileSpeed: 4,   projectileSize: 7, orbitRadius: 70, rotationSpeed: -1,   description_key: "desc_Espirito das Trevas_2" }, 
                             { damage: 20,  cooldown:  1100, projectileSpeed: 4.5, projectileSize: 8, orbitRadius: 80, rotationSpeed: -1.2, description_key: "desc_Espirito das Trevas_3" }, 
                             { damage: 25,  cooldown:  1000, projectileSpeed: 5,   projectileSize: 8, orbitRadius: 80, rotationSpeed: -1.2, description_key: "desc_Espirito das Trevas_4" }, 
                             { damage: 20,  cooldown:  1000, projectileSpeed: 5,   projectileSize: 10, orbitRadius: 80, rotationSpeed: -1.2, explosionRadius: 40, explosionDamage: 20, description_key: "desc_Espirito das Trevas_5" } ],
    "Aranha":              [ { damage: 8,   cooldown:  100,  speed: 1.5, petSize: 15, webCooldown: 5000, webDuration: 3000, webSize: 60,  numSpiders: 1, description_key: "desc_Aranha_1" }, 
                             { damage: 10,  cooldown:  100,  speed: 1.5, petSize: 15, webCooldown: 5000, webDuration: 3500, webSize: 70,  numSpiders: 2, description_key: "desc_Aranha_2" }, 
                             { damage: 12,  cooldown:  100,  speed: 1.8, petSize: 18, webCooldown: 4000, webDuration: 4000, webSize: 80,  numSpiders: 2, description_key: "desc_Aranha_3" }, 
                             { damage: 18,  cooldown:  100,  speed: 2.0, petSize: 18, webCooldown: 4000, webDuration: 4500, webSize: 90,  numSpiders: 2, description_key: "desc_Aranha_4" }, 
                             { damage: 25,  cooldown:  100,  speed: 2.0, petSize: 20, webCooldown: 3000, webDuration: 5000, webSize: 120, numSpiders: 3, description_key: "desc_Aranha_5" } ],
    "Touro":               [ { damage: 40,  cooldown:  3000, speed: 8,   petSize: 30, pierceCount: 3,  description_key: "desc_Touro_1" }, 
                             { damage: 50,  cooldown:  2800, speed: 8,   petSize: 30, pierceCount: 5,  description_key: "desc_Touro_2" }, 
                             { damage: 60,  cooldown:  2500, speed: 9,   petSize: 35, pierceCount: 7,  description_key: "desc_Touro_3" }, 
                             { damage: 80,  cooldown:  2500, speed: 9,   petSize: 35, pierceCount: 10, description_key: "desc_Touro_4" }, 
                             { damage: 100, cooldown:  2000, speed: 10,  petSize: 40, pierceCount: 99, description_key: "desc_Touro_5" } ],
    "Lobos":               [ { damage: 12,  cooldown:  100,  speed: 3,   petSize: 20, numWolves:   1,  description_key: "desc_Lobos_1" }, 
                             { damage: 15,  cooldown:  100,  speed: 3,   petSize: 20, numWolves:   2,  description_key: "desc_Lobos_2" }, 
                             { damage: 18,  cooldown:  100,  speed: 3.5, petSize: 22, numWolves:   2,  description_key: "desc_Lobos_3" }, 
                             { damage: 25,  cooldown:  100,  speed: 3.5, petSize: 22, numWolves:   2,  description_key: "desc_Lobos_4" }, 
                             { damage: 30,  cooldown:  100,  speed: 4,   petSize: 25, numWolves:   3,  description_key: "desc_Lobos_5" } ],
};

const BASE_STAT_UPGRADES = [
    { type: "stat", stat: "speed",             value: 0.5,  name_key: 'upgrade_speed_name',             desc_key: 'upgrade_speed_desc' },
    { type: "stat", stat: "maxHealth",         value: 20,   name_key: 'upgrade_maxHealth_name',         desc_key: 'upgrade_maxHealth_desc' },
    { type: "stat", stat: "collectionRadius" , value: 25,   name_key: 'upgrade_collectionRadius_name',  desc_key: 'upgrade_collectionRadius_desc' },
    { type: "stat", stat: "healthRegen",       value: 0.25, name_key: 'upgrade_healthRegen_name',       desc_key: 'upgrade_healthRegen_desc' },
    { type: "stat", stat: "geralDamage",       value: 0.05, name_key: 'upgrade_geralDamage_name',       desc_key: 'upgrade_geralDamage_desc' },
    { type: "stat", stat: "physicalDamage",    value: 0.1,  name_key: 'upgrade_physicalDamage_name',    desc_key: 'upgrade_physicalDamage_desc' },
    { type: "stat", stat: "magicDamage",       value: 0.1,  name_key: 'upgrade_magicDamage_name',       desc_key: 'upgrade_magicDamage_desc' },
    { type: "stat", stat: "explosiveDamage",   value: 0.1,  name_key: 'upgrade_explosiveDamage_name',   desc_key: 'upgrade_explosiveDamage_desc' },
    { type: "stat", stat: "fireDamage",        value: 0.1,  name_key: 'upgrade_fireDamage_name',        desc_key: 'upgrade_fireDamage_desc' },
    { type: "stat", stat: "iceDamage",         value: 0.1,  name_key: 'upgrade_iceDamage_name',         desc_key: 'upgrade_iceDamage_desc' },
    { type: "stat", stat: "poisonDamage",      value: 0.1,  name_key: 'upgrade_poisonDamage_name',      desc_key: 'upgrade_poisonDamage_desc' },
    { type: "stat", stat: "petDamage",         value: 0.15, name_key: 'upgrade_petDamage_name',         desc_key: 'upgrade_petDamage_desc' },
    { type: "stat", stat: "durationBonus",     value: 0.1,  name_key: 'upgrade_durationBonus_name',     desc_key: 'upgrade_durationBonus_desc' },
    { type: "stat", stat: "cooldownReduction", value: 0.05, name_key: 'upgrade_cooldownReduction_name', desc_key: 'upgrade_cooldownReduction_desc' },
    { type: "stat", stat: "attackSpeed",       value: 0.08, name_key: 'upgrade_attackSpeed_name',       desc_key: 'upgrade_attackSpeed_desc' },
];