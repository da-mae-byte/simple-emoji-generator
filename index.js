
const PREVIEW           = document.getElementById("preview");
const TEXT_AREA         = document.getElementById("text");
const FONT_FAMILY       = document.getElementById("font_family");
const BOLD_ENABLE       = document.getElementById("bold_enable");
const ITALIC_ENABLE     = document.getElementById("italic_enable");
const BODY_COLOR_ENABLE = document.getElementById("body_color_enable");
const BODY_COLOR        = document.getElementById("body_color");
const EDGE_ENABLE       = document.getElementById("edge_enable");
const EDGE_COLOR        = document.getElementById("edge_color");
const EDGE_WIDTH        = document.getElementById("edge_width");
const BACKGROUND_ENABLE = document.getElementById("background_enable");
const BACKGROUND_COLOR  = document.getElementById("background_color");
const PADDING_TOP       = document.getElementById("padding_top");
const PADDING_RIGHT     = document.getElementById("padding_right");
const PADDING_LEFT      = document.getElementById("padding_left");
const PADDING_BOTTOM    = document.getElementById("padding_bottom");


function previewUpdate(value) {
    let preview_width = PREVIEW.getBoundingClientRect().width;

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
        PREVIEW.querySelectorAll("span")[i].style.fontSize = String(preview_width / row - 5) + "px";
        // PREVIEW.querySelectorAll("span")[i].style.background = "#r00";
        // console.log(PREVIEW.querySelectorAll("span")[i].textContent);
    });
}


window.addEventListener("load", () => {

    // 文字
    TEXT_AREA.addEventListener("input", () => {
        previewUpdate(TEXT_AREA.value);
    });

    // フォント
    FONT_FAMILY.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.fontFamily = FONT_FAMILY.value;
        });
    });

    // 太字
    BOLD_ENABLE.addEventListener("change", () => {
        let prop = "";
        if(BOLD_ENABLE.checked){
            prop = "bold";
        }
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.fontWeight = prop;
        });
    });

    // 斜体
    ITALIC_ENABLE.addEventListener("change", () => {
        let prop = "";
        if(ITALIC_ENABLE.checked){
            prop = "italic";
        }
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.fontStyle = prop;
        });
    });

    // 文字の色
    BODY_COLOR.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.color = BODY_COLOR.value;
        });
    });

    // 文字の輪郭の色
    EDGE_COLOR.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.webkitTextStrokeColor = EDGE_COLOR.value;
        });
    });

    // 文字の輪郭の太さ
    EDGE_WIDTH.addEventListener("change", () => {
        PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.webkitTextStrokeWidth = String(EDGE_WIDTH.value) + "px";
        });
    });

    // 背景色
    BACKGROUND_COLOR.addEventListener("change", () => {
        PREVIEW.style.backgroundColor = BACKGROUND_COLOR.value;
    });

    // 余白
    PADDING_TOP.addEventListener("change", () => {
        PREVIEW.style.paddingTop = String(PADDING_TOP.value) + "px";
    });
    PADDING_RIGHT.addEventListener("change", () => {
        PREVIEW.style.paddingRight = String(PADDING_RIGHT.value) + "px";
    });
    PADDING_LEFT.addEventListener("change", () => {
        PREVIEW.style.paddingLeft = String(PADDING_LEFT.value) + "px";
    });
    PADDING_BOTTOM.addEventListener("change", () => {
        PREVIEW.style.paddingBottom = String(PADDING_BOTTOM.value) + "px";
    });

});
