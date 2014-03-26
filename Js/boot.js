(function (window, $) {
    //private stuff goes here

    //skelJS configuration
    skel.init({
        prefix: "/css/style",
        resetCSS: true,
        boxModel: "border",
        grid: { gutters: 30 },
        breakpoints: {
            wide: { range: "1200-", containers: 1140, grid: { gutters: 50 } },
            middle: { range: "800-1199", containers: 960 },
            narrow: { range: "481-799", containers: 720 },
            mobile: { range: "-480", containers: "fluid", lockViewport: true, grid: { collapse: true } }
        }
    });

    $(function () {
        var viewModel = new Calculator();
        ko.applyBindings(viewModel);
    });
})(window, $);