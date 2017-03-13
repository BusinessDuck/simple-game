/*
 * app.module.js
 * Main file of app.
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "app.style.css";

import Routes from "app.routes";
import Services from "services.module";
import "angular-timeline";
import "angular-timeline/dist/angular-timeline.css";
import Components from "components/components.module";

export default angular.module('app', [
    Routes.name,
    Services.name,
    Components.name,
    "angular-timeline"
]);
