import jQuery from "jquery";
import { useEffect } from "react";

function openSidebar(eventUrl, baseUrl = "https://www.livetickets.ro") {
  var overlay = "<div class='sidebar-overlay' style='display:none'></div>";
  jQuery("body").append(overlay);

  var sidebar = "<aside class='app-sidebar fancy-scroll' style='display:none'>";
  sidebar += "<div class='header'>";
  sidebar +=
    "<a style='color:#f7941d' onClick=\"{jQuery('.sidebar-overlay').remove(); jQuery('.app-sidebar').remove(); }\"><i class='fa fa-chevron-right'></i></a>";
  sidebar += "</div>";
  sidebar += "<div style='height:100%'>";
  sidebar +=
    "<iframe frameborder='0' style='height:100%; width: 100%; border:none' src='" +
    baseUrl +
    "/embed-sidebar/" +
    encodeURIComponent(eventUrl) +
    "'></iframe>";
  sidebar += "</div>";
  sidebar += "</aside>";
  jQuery("body").append(sidebar);
  jQuery(".app-sidebar").fadeIn("normal");
  jQuery(".sidebar-overlay").fadeIn("normal");
}

export { openSidebar };
