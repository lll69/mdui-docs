import initCounter from "./counter";

const A = [
    "0.1.1",
    "0.1.2",
    "0.2.0",
    "0.2.1",
    "0.3.0",
    "0.4.0",
    "0.4.1",
    "0.4.2",
    "0.4.3",
];

const FILE_VERSIONS = {
    "appbar": A,
    "bottom_nav": A,
    "button": A,
    "card": A,
    "chip": A,
    "collapse": A,
    "color": A,
    "compatibility": A,
    "dialog": A,
    "divider": A,
    "download": A,
    "drawer": A,
    "fab": A,
    "font": A,
    "global": [
        "0.4.0",
        "0.4.1",
        "0.4.2",
        "0.4.3",
    ],
    "grid": A,
    "grid_list": A,
    "headroom": A,
    "helper": A,
    "icon": A,
    "index": A,
    "jq": [
        "0.2.0",
        "0.2.1",
        "0.3.0",
        "0.4.0",
        "0.4.1",
        "0.4.2",
        "0.4.3",
    ],
    "list": A,
    "list_control": A,
    "material_icon": A,
    "media": A,
    "menu": A,
    "panel": A,
    "progress": A,
    "ripple": A,
    "select": [
        "0.3.0",
        "0.4.0",
        "0.4.1",
        "0.4.2",
        "0.4.3",
    ],
    "selection_control": A,
    "shadow": A,
    "slider": A,
    "snackbar": A,
    "specs": [
        "0.1.1",
        "0.1.2",
        "0.2.0",
        "0.2.1",
        "0.3.0",
    ],
    "tab": A,
    "table": A,
    "textfield": A,
    "toolbar": A,
    "tooltip": A,
    "typo": A
};

const gotoVersion = (versions: string[], newVersion: string) => {
    const oldUrl = location.href;
    const splitHref = oldUrl.split("/");
    const versionPart = splitHref[splitHref.length - 2];
    if (versions.indexOf(versionPart) >= 0) {
        splitHref[splitHref.length - 2] = newVersion;
    } else {
        splitHref[splitHref.length - 2] += "/" + newVersion;
    }
    const newUrl = splitHref.join("/");
    if (newUrl !== oldUrl) {
        location.href = newUrl;
    }
}

export default (currentVer: string) => {
    const splitHref = location.href.split("/");
    const file = splitHref[splitHref.length - 1].toLowerCase().replace(".html", "");
    const versions: string[] | undefined = FILE_VERSIONS[file || "index"];
    if (versions) {
        const verIndex = versions.indexOf(currentVer);
        if (verIndex >= 0) {
            const select = document.createElement("select");
            for (let i = versions.length - 1; i >= 0; i--) {
                const version = versions[i];
                const option = document.createElement("option");
                option.value = option.textContent = version;
                option.selected = version === currentVer;
                select.appendChild(option);
            }
            select.addEventListener("change", () => {
                const newVersion = select.value;
                select.value = currentVer;
                gotoVersion(versions, newVersion);
            });
            if (currentVer >= "0.3.0") {
                select.className = "mdui-select";
                select.style.color = "inherit";
            }
            const spacer = document.querySelector(".mdui-toolbar-spacer");
            if (spacer) {
                spacer.parentElement!.insertBefore(select, spacer);
            }
        }
    }
    document.title = document.title.replace("MDUI 开发文档", "MDUI " + currentVer + " 开发文档");
    initCounter();
}
