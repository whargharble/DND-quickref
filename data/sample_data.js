// Example content – edit freely or replace later.
window.QUICKREF_DATA = {
  character: {
    name: "Lyra",
    level: 3,
    cls: "Cleric",
    ac: 15,
    hp_current: 5,
    hp_max: 6,
    slots_total: 4,
    slots_used: 1
  },
  spells: [
    { name: "Cure Wounds", meta: "Touch • 1st level • Heals 1d8 + mod", desc: "Restore hit points to a creature you touch." },
    { name: "Guiding Bolt", meta: "120 ft • 1st level • 4d6 radiant", desc: "On hit, grants advantage to the next attack against the target." },
    { name: "Bless", meta: "Concentration • 1st level • 30 ft", desc: "Add 1d4 to allies’ attack rolls and saves while you maintain concentration." }
  ],
  conditions: [
    { name: "Prone", desc: "You’re on the ground. Ranged attacks are harder. Melee attackers have an easier time hitting you." },
    { name: "Restrained", desc: "You’re tangled/held. Your speed is 0, attacks against you have advantage." },
    { name: "Concentration", desc: "Maintaining a spell. If you take damage, you must make a save to keep the spell going." }
  ],
  actions: [
    { name: "Attack", desc: "Make a weapon attack or a spell attack against a target." },
    { name: "Dash", desc: "Double your movement this turn." },
    { name: "Dodge", desc: "Enemies have a harder time hitting you until your next turn." },
    { name: "Help", desc: "Give an ally advantage on their next relevant roll." },
    { name: "Use Item", desc: "Drink a potion, pull a lever, apply a healer’s kit, etc." }
  ],
  personality: {
    traits: ["Optimistic", "Soft-spoken"],
    ideals: ["Justice"],
    bonds: ["Protect the party"],
    flaws: ["Overconfident"]
  }
};
