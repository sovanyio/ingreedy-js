'use strict';

var ingreedyMatchers = {
  toBeParsedAs: function(util, customEqualityTesters) {
    return {
      compare: function(inputString, expected) {
        var parserResult;
        var specResult = {};

        try {
          parserResult = Ingreedy.parse(inputString);
        } catch(err) {
          specResult.pass = false;
        }

        if(specResult.pass !== false) {
          specResult.pass = util.equals(parserResult, expected);
        }

        if(specResult.pass) {
          specResult.message = 'Ingreedy successfully parsed "' + inputString + '"';
        } else {
          specResult.message = 'Ingreedy parsed \n' + JSON.stringify(parserResult) + '\ninstead of \n' + JSON.stringify(expected);
        }

        return specResult;
      }
    }
  }
};

describe("Ingreedy", function() {
  var parser = Ingreedy;

  beforeEach(function() {
    jasmine.addMatchers(ingreedyMatchers);
  });

  describe('simple ingredient additions', function() {
    it('parses the correct values', function() {
      expect('1 lb potatoes').toBeParsedAs({
        amount: '1',
        unit: 'lb',
        ingredient: 'potatoes'
      });
    });
  });

  describe('ingredient additions with a container', function() {
    it('parses the correct values', function() {
      expect('2 28 oz can tomatoes').toBeParsedAs({
        amount: '2',
        ingredient: 'can tomatoes',
        container: {
          amount: '28',
          unit: 'oz'
        }
      });
    });
  });

  describe('ingredient additions with a parenthetical multiplier', function() {
    it('parses the correct values', function() {
      expect('(2) 28 oz can tomatoes').toBeParsedAs({
        amount: '2',
        ingredient: 'can tomatoes',
        container: {
          amount: '28',
          unit: 'oz'
        }
      });
    });
  });

  describe('ingredient additions with a multiplier', function() {
    it('parses the correct values', function() {
      expect('2 (28 oz) cans tomatoes').toBeParsedAs({
        amount: '2',
        ingredient: 'cans tomatoes',
        container: {
          amount: '28',
          unit: 'oz'
        }
      });
    });
  });

  describe('ingredient additions with non-letter ingredient characters', function() {
    it('parses the correct values', function() {
      expect('2 (8 oz) Sirloin steaks 1" thick').toBeParsedAs({
        amount: '2',
        ingredient: 'Sirloin steaks 1" thick',
        container: {
          amount: '8',
          unit: 'oz'
        }
      });
    });
  });

});
