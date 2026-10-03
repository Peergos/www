// Lead with the platform the visitor is on; everything stays visible below.
(function () {
    var ua = navigator.userAgent;
    var platforms = [
        {test: /Android/i, name: "Android", label: "GET IT ON GOOGLE PLAY",
         href: "https://play.google.com/store/apps/details?id=peergos.android",
         note: "Or the APK below."},
        {test: /Windows/i, name: "Windows", label: "DOWNLOAD FOR WINDOWS",
         href: "https://github.com/Peergos/web-ui/releases/latest", asset: "-windows-amd64.msi",
         note: "Installer."},
        {test: /Mac OS X|Macintosh/i, name: "macOS", label: "DOWNLOAD FOR MACOS",
         href: "#macos", note: "Apple silicon or Intel, below."},
        {test: /Linux|X11/i, name: "Linux", label: "INSTALL ON LINUX",
         href: "#linux", note: "Two commands, below."}
    ];
    for (var i = 0; i < platforms.length; i++) {
        if (!platforms[i].test.test(ua))
            continue;
        var link = document.getElementById("detected-link");
        link.href = platforms[i].href;
        if (platforms[i].asset)
            link.setAttribute("data-asset", platforms[i].asset);
        document.getElementById("detected-label").textContent = platforms[i].label;
        document.getElementById("detected-note").textContent = platforms[i].note;
        document.getElementById("detected").hidden = false;
        return;
    }
})();

// The links above go to the release page, which is always right. Once GitHub says
// which release is the latest, point them at its files instead. If it never says
// (offline, or its rate limit of 60 an hour per address), they stay as they are.
(function () {
    fetch("https://api.github.com/repos/Peergos/web-ui/releases/latest")
        .then(function (response) {
            if (!response.ok)
                throw new Error("GitHub said " + response.status);
            return response.json();
        })
        .then(function (release) {
            var version = release.tag_name.replace(/^v/, "");
            var links = document.querySelectorAll("[data-asset]");
            for (var i = 0; i < links.length; i++) {
                var ending = links[i].getAttribute("data-asset");
                for (var j = 0; j < release.assets.length; j++) {
                    if (release.assets[j].name.endsWith(ending)) {
                        links[i].href = release.assets[j].browser_download_url;
                        break;
                    }
                }
            }
            document.getElementById("release-number").textContent = version;
            document.getElementById("release").hidden = false;
            var note = document.getElementById("detected-note");
            if (note.textContent === "Installer.")
                note.textContent = "Installer, version " + version + ".";
        })
        .catch(function () {});
})();
