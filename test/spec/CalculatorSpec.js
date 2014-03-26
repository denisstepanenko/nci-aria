/// <reference path="../lib/_references.js" />

describe("Calculation Test", function () {
    var conv;

    beforeEach(function () {
        conv = new Calculator();
    });

    afterEach(function () {
    });
    
    it("Should take an expression", function () {
        var expr = "1+2+3+4";
        
        conv.expression(expr);
              
        expect(conv.expression()).toEqual(expr);
    });

    it("Should calculate expression (addition)", function () {
        var expr = "1+2+3+4";

        conv.expression(expr);

        conv.functionButtonClick(CalcUtils.FUNCTION_BUTTON_TYPES.EQUALS)

        expect(conv.resultValue()).toEqual(10);

    });

    it("Should calculate expression (division)", function () {
        var expr = "1+2+3/4";

        conv.expression(expr);

        conv.functionButtonClick(CalcUtils.FUNCTION_BUTTON_TYPES.EQUALS)

        expect(conv.resultValue()).toEqual(eval(expr));

    });

    it("Should calculate expression (division by zero)", function () {
        var expr = "1/0";

        conv.expression(expr);

        conv.functionButtonClick(CalcUtils.FUNCTION_BUTTON_TYPES.EQUALS)
        
        expect(conv.resultValue()).toEqual(Infinity);

    });

    it("Should create a valid expression", function () {
        
        
        conv.functionButtonClick(CalcUtils.FUNCTION_BUTTON_TYPES.EQUALS)
        conv.functionButtonClick(CalcUtils.FUNCTION_BUTTON_TYPES.MINUS)

        conv.numberButtonClick(CalcUtils.NUMBER_BUTTON_TYPES.ONE)
        conv.functionButtonClick(CalcUtils.FUNCTION_BUTTON_TYPES.PLUS)
        conv.numberButtonClick(CalcUtils.NUMBER_BUTTON_TYPES.TWO)
        conv.functionButtonClick(CalcUtils.FUNCTION_BUTTON_TYPES.EQUALS)

        expect(conv.expression()).toEqual("-1+2=1");

    });

});