IronRouterGA = undefined;

IronRouterGA = {
    initGA: function(gaSettings) {

        if (gaSettings.id) {
            initPreloadAnalyticsHelper();
            initTracker();
            applySettings();
            applyRequires();
        } else {
            initFakeTracker();
        }


        function initPreloadAnalyticsHelper() {
            window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments);};
            ga.l = +new Date();
        }

        function initTracker() {
            var createOptions = gaSettings.create || "auto";

            window.ga("create", gaSettings.id, createOptions);
        }

        function initFakeTracker() {
            var hasRun = false;
            window.ga = function() {
                if (!hasRun) {
                    hasRun = true;
                    console.log("iron-router-ga settings not found");
                }
            };
        }

        function applySettings() {
            if (!gaSettings.set) { return; }

            for (var key in gaSettings.set) {
                if (gaSettings.set.hasOwnProperty(key)) {
                    window.ga("set", key, gaSettings.set[key]);
                }
            }
        }

        function applyRequires() {
            var requireValue;

            if (!gaSettings.require) { return; }

            for (var key in gaSettings.require) {
                if (gaSettings.require.hasOwnProperty(key)) {
                    requireValue = gaSettings.require[key];
                    if (typeof requireValue === "string") {
                        window.ga("require", key, requireValue);
                    } else {
                        window.ga("require", key);
                    }
                }
            }
        }
    }
};

if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.ga) {
    IronRouterGA.initGA(Meteor.settings.public.ga);
}
