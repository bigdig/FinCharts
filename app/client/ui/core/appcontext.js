// https://github.com/stample/atom-react/blob/master/src/atomReactContext.js

var React = require("react/addons");
var Atom  = require("./atom");
var AtomStoreManager = require("./atomstoremanager"),
var Logger = require("./utils/logger");

var _ = window.server.lodash;


function AppContext () {
    var enableLogging = "false",
        beforeRenderCallback = _.noop,
        afterRenderCallback = _.noop,
        lastRenderedState,
        mountConfig;

    this.atom = null;

    this.init = function () {
        this.atom = new Atom({
            beforeCommit: this.beforeAtomCommit.bind(this),
            afterCommit: this.afterAtomCommit.bind(this)
        });

        this.storeManager = new AtomStoreManager(this.atom);
    };

    this.setMountConfig = function (reactClass, domNode) {
        this.mountConfig = {
            reactElementClass: reactClass,
            reactElementFactory: React.createFactory(reactClass),
            domNode: domNode
        };
    };

    this.beforeAtomCommit = function () {

    };

    this.afterAtomCommit = function (newState, previousState) {
        var shouldRender = (newState !== previousState);
        var self;
        if ( shouldRender ) {
            this.printReactPerfMesuresAround(
               function () {
                    self.renderAtomState(newState);
               }
            );
        }
    };

    this.publishCommand = function (atomCommand) {
        this.storeManager.handleCommand(atomCommand);
    };

    this.renderAtomState = function (state) {
        var self = this;

        var props = {
            atom: this.atom,
            appContext: this
        };

        var reactContext = {
            appContext: this /*,
            publishEvent: this.publishEvent.bind(this),
            publishEvents: this.publishEvents.bind(this),
            publishCommand: this.publishCommand.bind(this),
            addEventListener: this.addEventListener.bind(this),
            removeEventListener: this.addEventListener.bind(this) */
        };
        try {
            this.logStateBeforeRender();

            console.time("Rendered");

            this.atom.lock("Render");

            React.withContext(context,function() {
                React.render(
                    self.mountConfig.reactElementFactory(props),
                    self.mountConfig.domNode,
                    function () {
                        console.timeEnd("Rendered");
                        self.atom.unlock();
                    }
                );
            });
        } catch (e) {
            Logger.error("Could not render application with state ", state.toJS(), e);
            this.atom.unlock();
            throw e;
        }
    };

    this.printReactPerfMesuresAround = function(task) {
        React.addons.Perf.start();
        task();
        React.addons.Perf.stop();
        try {
            React.addons.Perf.printWasted();
            React.addons.Perf.printInclusive();
            React.addons.Perf.printExclusive();
        }
        catch (e) {
            Logger.error("Can't print React perf mesures: " + e.message);
        }
    }

    this.logStateBeforeRender = function() {
        var previousState = lastRenderedState;
        var currentState = this.atom.get();
        lastRenderedState = currentState;
        console.debug(
            "####\n# Previous state\n#",
            previousState.toJS(),
             "####\n# Current state\n#",
            currentState.toJS()
        );
    }
};


module.exports = AppContext;