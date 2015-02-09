var Q = require("q");

module.exports = {
    commands: {
        APP_WINDOW_RESIZE: 'APP_WINDOW_RESIZE',
        APP_TOGGLE_TIMEFRAME_OPTIONS: 'APP_TOGGLE_TIMEFRAME_OPTIONS',
        APP_TOGGLE_DURATION_OPTIONS: 'APP_TOGGLE_DURATION_OPTIONS',
        APP_TOGGLE_CHARTLAYOUT_OPTIONS: 'APP_TOGGLE_CHARTLAYOUT_OPTIONS',

        CHART_UPDATE_TICKER: 'CHART_CHANGE_TICKER',
        CHART_UPDATE_DURATION: 'CHART_UPDATE_DURATION',
        CHART_UPDATE_TIMEFRAME: 'CHART_UPDATE_TIMEFRAME',
        CHART_UPDATE_ACTIVECHART: 'CHART_UPDATE_ACTIVECHART',
        CHART_DATA_FETCHED: 'CHART_DATA_FETCHED',
        CHART_DATA_LOADING: 'CHART_DATA_LOADING',
        CHART_DATA_ERROR: 'CHART_DATA_ERROR',
        CHART_UPDATE_LAYOUT: 'CHART_UPDATE_LAYOUT',
        CHART_PREVIEW_STATUS_CHANGE: 'CHART_PREVIEW_STATUS_CHANGE'
    },

    deferredActions: {
        chartPreview: {
            start: Q.defer(),
            pause: Q.defer(),
            stop: Q.defer()
        }
    }
};