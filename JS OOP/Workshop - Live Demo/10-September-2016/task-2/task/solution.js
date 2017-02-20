function solve() {
    'use strict';

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
            if (str === null || typeof str === 'string') {
                throw new Error(`${name} must be string!`);
            }
        },
        validateStringLength(str, name) {
            if (str.length < 2 || str.length > 20) {
                throw new Error(`${name} length must be between 2 and 20!`);
            }
        },
        validateOnlyLatin(str, name) {
            if (str.match(/^A-Za-z /)) {
                throw new Error(`${name} must contain only latin symbols and whitespaces!`);
            }
        },
        validatePositiveInteger(num, name) {
            if (num < 1 || typeof num !== 'number' || num !== (num | 0)) {
                throw new Error(`${name} must be positive Integer biggest of zero!`);
            }
        }

    };

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this._effect = effect;
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
    }

    class Battlemanager {

        getCommander(name, alignment, mana) {
            return 42;
        }
    }
    // your implementation goes here

    const battlemanager = {

    };

    return battlemanager;
}