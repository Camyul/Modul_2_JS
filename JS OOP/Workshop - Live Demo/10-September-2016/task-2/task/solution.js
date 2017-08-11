function solve() {

    /*function getId() {        
        let id = 0;

        return function(id) {
            id += 1;
            return id;
        }
    }*/

    function* getId() {
        let id = 0;

        while (true) {
            id += 1;
            yield id;
        }
    }

    const idGenerator = getId();

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    const Validator = {
        validateNameExist(str, name) {
            if (str === null || typeof str !== 'string') {
                throw new Error(`${name} must be string!`);
            }
        },
        validateStringLength(str, name) {
            if (str.length < 2 || str.length > 20) {
                throw new Error(`${name} must be between between 2 and 20 symbols long!`);
            }
        },
        validateOnlyLatin(str, name) {
            if (str.match(/[^A-Za-z ]/)) {
                throw new Error(`${name} can contain only latin symbols and whitespaces!`);
            }
        },
        validatePositiveInteger(num, name) {
            if (num < 0 || typeof num !== 'number' || num !== (num | 0) ||  Number.isNaN(num)) {
                throw new Error(`${name} must be a positive integer number!`);
            }
        },

        validateAlignment(alignment, name) {
            if (alignment !== 'good' && alignment !== 'neutral' && alignment !== 'evil') {
                throw Error(`${name} must be good, neutral or evil!`);
            }
        },

        validatePositiveValue(num, name, maxValue) {
            if (typeof num !== 'number' && (num < 0 || num > maxValue || Number.isNaN(num))) {
                throw new Error(`${name} must be a positive number that is at most ${maxValue}!`)
            }
        },

        validateValidEffect(effect){
            if (typeof effect !== 'function' || effect.length !== 1) {
                throw new Error(`Effect must be a function with 1 parameter!`);
            }

            if (effect === null) {
                throw new Error(`Passed objects must be Spell-like objects!`);
            }
        }

    };

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name() {
            return this._name;
        }
        set name(newName) {
            Validator.validateNameExist(newName, 'Name');
            Validator.validateStringLength(newName, 'Name');
            Validator.validateOnlyLatin(newName, 'Name');

            this._name = newName;
        }

        get manaCost() {
            return this._manaCost;
        }
        set manaCost(newMana) {
            Validator.validatePositiveInteger(newMana, 'Mana');

            this._manaCost = newMana;
        }

        get effect() {
            return this._effect;
        }
        set effect(effect) {
            Validator.validateValidEffect(effect);

            this._effect = effect;
            
        }
    }

    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }

        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateStringLength(name, 'Name');
            Validator.validateNameExist(name, 'Name');
            Validator.validateOnlyLatin(name, 'Name');

            this._name = name;
        }

        get alignment() {
            return this._alignment;
        }
        set alignment(alignment) {
            Validator.validateAlignment(alignment, 'Alignment');

            this._alignment = alignment;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);

            this._id = idGenerator.next().value;
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }

        get id() {
            return this._id;
        }

        get damage() {
            return this._damage;
        }
        set damage(newDamage) {
            Validator.validatePositiveValue(newDamage, 'Damage', 100);

            this._damage = newDamage;
        }

        get health() {
            return this._health;
        }
        set health(newHealth) {
            Validator.validatePositiveValue(newHealth, 'Health', 200);

            this._health = newHealth;
        }

        get count() {
            return this._count;
        }
        set count(count) {
            Validator.validatePositiveInteger(count, 'Count');

            this._count = count;
        }

        get speed() {
            return this._speed;
        }
        set speed(speed) {
            Validator.validatePositiveInteger(speed, 'Speed');

            this._speed = speed;
        }

    }

    class Commander extends Unit {
        constructor(name, alignment, mana) {
            super(name, alignment);

            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }

        get mana() {
            return this._mana;
        }
        set mana(mana) {
            Validator.validatePositiveInteger(mana, 'Mana');

            this._mana = mana;
        }
    }



    class BattleManager {
        constructor() {
            this._commanders = [];
            this._army_units = [];
        }

        getCommander(name, alignment, mana) {
            return new Commander(name, alignment, mana)
        }

        getArmyUnit(opt) {
       
                return new ArmyUnit(opt.name, opt.alignment, opt.damage,
                    opt.health, opt.count, opt.speed);
          
        }

        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        }

        addCommanders(...args) {
            this._commanders.push(...args);
            return this;
        }

        addArmyUnitTo(commanderName, armyUnit) {

            let commander = this._commanders.find(x => x.name === commanderName);
            if (commander === undefined) {
                throw Error(`No such commander`);
            }

            commander.army.push(armyUnit);
            this._army_units.push(armyUnit);
            return this;
        }

        addSpellsTo(commanderName, ...spells) {
            /*let commander = this._commanders.find(x => x.name === commanderName);
            if (commander === undefined) {
                throw new Error(`No such commander`);
            };

            commander.spellbook.push(...spells);
            return this;*/

            let commander = this._commanders.find(c => c.name === commanderName);

            if (commander === undefined) {
                throw new Error(`No such commander`);
            };


            try {
                this._commanders.find(c => c.name === commanderName)
            .spellbook.push(...spells.map(s => new Spell(s.name, s.manaCost, s.effect)));

           
            }
            catch(e){
                throw new Error(`Passed objects must be Spell-like objects!`)
            }
            return this;
        }

        findCommanders(query) {

            //query is an object that can have properties name and/or alignment
            //returns all commanders that have the same values of the passed properties

            
                /*Array.prototype.filterByProperty = function(quer, nameProp){
                    if (!quer.hasOwnProperty('nameProp')) {
                        return this;
                    }

                    const findObj = quer[nameProp];
                    this.filter(x => x[nameProp] === findObj);
                }

             return this._commanders
                                .slice()
                                .filterByProperty(query, 'name')
                                .filterByProperty(query, 'alignment')
                                .sort(x => x.name);*/

        return this._commanders       //Work
                .filter(commander => Object.keys(query).every(prop => query[prop] === commander[prop]));
        }

        findArmyUnitById(id) {
            let armyUnit = this._army_units.find(x => x.id === id);

            return armyUnit;
        }


        //query is an object that can have properties id, name, alignment
        //returns an array of all ArmyUnits in the Battlemanager that have the same values for the passed properties
        findArmyUnits(query) {
            /*return this._army_units
                .filter(army => Object.keys(query).every(prop => query[prop] === army[prop]));*/
                let armyUnits = this._army_units
                .filter(army => Object.keys(query).every(prop => query[prop] === army[prop]));

                armyUnits = armyUnits.sort((x, y) => y.speed - x.speed); //Sort Descending
                return armyUnits;
        }

        spellcast(casterName, spellName, targetUnitId) {
            let commander = this._commanders.find(c => c.name === casterName);
            if (commander === undefined) {
                throw new Error(`Can't cast with non-existant commander ${casterName}!`)
            };

            let spell = commander.spellbook.find(s => s.name === spellName);
            if (spell === undefined) {
                throw new Error(`${casterName} doesn't know ${spellName}`)
            }

            if (commander.mana < spell.manaCost) {
                throw new Error(`Not enough mana!`);
            }

            let unit = this._army_units.find(u => u.id === targetUnitId);
            if (unit === undefined) {
                throw new Error(`Target not found!`);
            }


            commander.mana -= spell.manaCost;

            spell.effect(unit);

            return this;
        }

        battle(attacker, defender) {
            const properties = ['name', 'alignment', 'damage', 'health', 'count', 'speed'];

            [attacker, defender].forEach(unit => properties.forEach(p => {
                if (typeof unit[p] === 'undefined') {
                    throw new Error('Battle participants must be ArmyUnit-like!');
                }
            }));

            let attackerTotalDamage = attacker.damage * attacker.count,
                defenderTotalHealth = defender.health * defender.count;

            defenderTotalHealth -= attackerTotalDamage;

            let newCount = Math.ceil(defenderTotalHealth / defender.health);
            
            defender.count = newCount < 0 ? 0 : newCount;
            

            return this;
        }
    }


    return new BattleManager;

}
module.exports = solve;