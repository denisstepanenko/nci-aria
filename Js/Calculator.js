function Calculator() {
    //PRIVATE STUFF
    var self = this;
    var clearExpr = false;

    function isFunctionLast() {
        if (!self.expression()) {
            self.expression("");
            return false;
        }

        var currentExpr = self.expression().toString().trim();
        var lastChar = currentExpr[currentExpr.length - 1];

        if (lastChar == CalcUtils.FUNCTION_BUTTON_TYPES.PLUS ||
            lastChar == CalcUtils.FUNCTION_BUTTON_TYPES.MINUS ||
            lastChar == CalcUtils.FUNCTION_BUTTON_TYPES.DEVIDE ||
            lastChar == CalcUtils.FUNCTION_BUTTON_TYPES.MULTIPLY ||
            lastChar == CalcUtils.FUNCTION_BUTTON_TYPES.EQUALS ||
            lastChar == CalcUtils.FUNCTION_BUTTON_TYPES.DECIMAL_POINT) {
            //last char is a function char
            return true;
        }

        return false;
    }

    //INSTANCE STUFF

    self.expression = ko.observable("");
    self.result = ko.observable();
    self.resultValue = ko.observable();
    self.error = ko.observable("");
    self.error.subscribe(function (newVal) { alert(newVal);});

    self.functionButtonClick = function (buttonID) {
        var functionDescription = "";

        if (clearExpr) {
            self.expression("");
            clearExpr = false;
        }

        //determine what to append
        if (buttonID == CalcUtils.FUNCTION_BUTTON_TYPES.PLUS) {
            functionDescription = "+";
        }
        else if (buttonID == CalcUtils.FUNCTION_BUTTON_TYPES.MINUS) {
            functionDescription = "-";
        }
        else if (buttonID == CalcUtils.FUNCTION_BUTTON_TYPES.DEVIDE) {
            functionDescription = "/";
        }
        else if (buttonID == CalcUtils.FUNCTION_BUTTON_TYPES.MULTIPLY) {
            functionDescription = "*";
        }
        else if (buttonID == CalcUtils.FUNCTION_BUTTON_TYPES.EQUALS) {
            //evaluate

            if (self.expression().trim().length == 0) {
                return;//nothing to calculate
            }

            var success = true;
            try {
                var result = eval(self.expression());

                if (isNaN(result)) {
                    self.resultValue(null);
                    throw { message: "Result not numeric." };
                }

                self.resultValue(result);
            }
            catch (ex) {
                success = false;
                console.log(ex.message);
            }
            
            if (success) {
                self.expression(self.expression() + "=" + result);
                clearExpr = true;
            }
            else {
                self.error("Cannot evaluate, check expression.");
            }

            return;
        }
        else if (buttonID == CalcUtils.FUNCTION_BUTTON_TYPES.RESET) {
            //reset expr
            self.expression("");
            return;
        }
        else if (buttonID == CalcUtils.FUNCTION_BUTTON_TYPES.DECIMAL_POINT) {
            functionDescription = ".";
        }

        
        
        if (isFunctionLast()) {
            //replace the last character
            var expr = self.expression();
            expr[expr.length - 1] = functionDescription;
            self.expression(expr);
        }
        else {
            //append function character
            self.expression(self.expression() + functionDescription);
        }
    }

    self.numberButtonClick = function (buttonID) {
        self.expression(self.expression() + buttonID);
    }

    
}