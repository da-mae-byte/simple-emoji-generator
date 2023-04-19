function previewUpdate(value) {
    const PREVIEW = document.getElementById("preview");
    const PREVIEW_WIDTH = PREVIEW.getBoundingClientRect().width;
    let val_arr = [];
    let size_arr = [];
    value.split("\n").forEach(item => {
        val_arr.push("<span>" + item + "</span>");
        size_arr.push(item.length);
    });
    console.log(val_arr)
    PREVIEW.innerHTML = val_arr.join("<br>");
    size_arr.forEach((row, i) => {
        console.log(PREVIEW.style.width / row);
        PREVIEW.querySelectorAll("span")[i].style.fontSize = String(PREVIEW_WIDTH / row - 5) + "px";
        // PREVIEW.querySelectorAll("span")[i].style.background = "#r00";
        // console.log(PREVIEW.querySelectorAll("span")[i].textContent);
    });
}

window.addEventListener("load", () => {
    const PREVIEW = document.getElementById("preview");
    const TEXT_AREA = document.getElementById("text");
    const BODY_COLOR_SETTING = document.getElementById("body_color")
    const EDGE_COLOR_SETTING = document.getElementById("edge_color")
    const EDGE_WIDTH_SETTING = document.getElementById("edge_width")
    const BACKGROUND_COLOR_SETTING = document.getElementById("background_color")

    TEXT_AREA.addEventListener("input", () => {
        previewUpdate(TEXT_AREA.value);
    });

    BODY_COLOR_SETTING.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.color = BODY_COLOR_SETTING.value;
        });
    });

    EDGE_COLOR_SETTING.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.webkitTextStrokeColor = EDGE_COLOR_SETTING.value;
        });
    });

    EDGE_WIDTH_SETTING.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.webkitTextStrokeWidth = String(EDGE_WIDTH_SETTING.value) + "px";
        });
    });

    BACKGROUND_COLOR_SETTING.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.backgroundColor = BACKGROUND_COLOR_SETTING.value;
        });
    });

});
