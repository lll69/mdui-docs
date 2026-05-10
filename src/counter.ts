export default function () {
    const goatcounter: any = (window as any).goatcounter = {
        allow_frame: true,
        path: function (p) { return location.host + p }
    };
    function filter() {
        if ('visibilityState' in document && (document.visibilityState as string) === 'prerender')
            return 'visibilityState';
        if (!goatcounter.allow_frame && location !== parent.location)
            return 'frame';
        if (!goatcounter.allow_local && location.hostname.match(/(localhost$|^127\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\.|^0\.0\.0\.0$)/))
            return 'localhost';
        if (!goatcounter.allow_local && location.protocol === 'file:')
            return 'localfile';
        if (localStorage && localStorage.getItem('skipgc') === 't')
            return 'disabled with #toggle-goatcounter';
        return false;
    }
    const filterResult = filter();
    if (!filterResult && !sessionStorage.getItem("doNotTrack") && !localStorage.getItem("doNotTrack")) {
        const s = document.createElement("script");
        s.src = "/mdui-docs/count.js";
        s.dataset.goatcounter = "https://lll69.goatcounter.com/count";
        s.defer = true;
        s.async = true;
        document.head.appendChild(s);
        if (localStorage.getItem("skipgc") !== "t" && !sessionStorage.getItem("doNotTrack") && !localStorage.getItem("doNotTrack")) {
            if (!sessionStorage.getItem("_swa") && document.referrer.indexOf(location.protocol + "//" + location.host) !== 0) {
                sessionStorage.setItem("_swa", "1");
                fetch("https://counter.dev/track?" + new URLSearchParams({ referrer: document.referrer, screen: screen.width + "x" + screen.height, id: "c2474bae-9e6c-48ea-9a93-39ae3f9dbdae", utcoffset: "0" }));
            };
            navigator.sendBeacon(
                "https://counter.dev/trackpage",
                new URLSearchParams({
                    id: "c2474bae-9e6c-48ea-9a93-39ae3f9dbdae",
                    page: window.location.pathname,
                }),
            );
        }
    } else {
        console.log(filterResult);
    }
};
