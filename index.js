// import * as htmlToImage from 'html-to-image';
// const htmlToImage = require("htmlToImage")

const IMAGE_PREVIEW           = document.getElementById("image_preview");
const EMOJI_IMAGE             = document.getElementById("emoji_image");
const DOWNLOAD                = document.getElementById("download");
const HTML_PREVIEW            = document.getElementById("html_preview");
const SETTING                 = document.getElementById("setting");
const TEXT_AREA               = document.getElementById("text");
const FONT_FAMILY             = document.getElementById("font_family");
// const BOLD_ENABLE             = document.getElementById("bold_enable");
// const ITALIC_ENABLE           = document.getElementById("italic_enable");
// const BODY_COLOR_ENABLE       = document.getElementById("body_color_enable");
// const BODY_COLOR              = document.getElementById("body_color");
// const EDGE_ENABLE             = document.getElementById("edge_enable");
// const EDGE_COLOR              = document.getElementById("edge_color");
// const EDGE_WIDTH              = document.getElementById("edge_width");
// const BACKGROUND_COLOR_ENABLE = document.getElementById("background_color_enable");
// const BACKGROUND_COLOR        = document.getElementById("background_color");
// const PADDING_TOP             = document.getElementById("padding_top");
// const PADDING_RIGHT           = document.getElementById("padding_right");
// const PADDING_LEFT            = document.getElementById("padding_left");
// const PADDING_BOTTOM          = document.getElementById("padding_bottom");

let setting_dict = {
    text: "",
    font_family: "Meiryo",
    bold_enable: false,
    italic_enable: false,
    body_color_enable: true,
    body_color: "",
    edge_enable: false,
    edge_color: "",
    edge_width: "1",
    background_color_enable: false,
    background_color: "",
    padding_top: 0,
    padding_right: 0,
    padding_left: 0,
    padding_bottom: 0,
}

let image_url;


function detectOS() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("windows nt") >= 0) {
        return "windows";
    }
    else if (ua.indexOf("mac os x") >= 0) {
        return "mac";
    }
    else if (ua.indexOf("iphone") >= 0 || ua.indexOf("ipad") >= 0) {
        return "ios";
    }
    else{
        return "";
    }
}


function previewUpdate() {
    let preview_width = HTML_PREVIEW.getBoundingClientRect().width;

    let val_arr = [];
    let size_arr = [];

    let value = TEXT_AREA.value;

    value.split("\n").forEach(item => {
        val_arr.push("<span>" + item + "</span>");
        size_arr.push(item.length);
    });

    HTML_PREVIEW.innerHTML = val_arr.join("<br>");
    size_arr.forEach((row, i) => {
        HTML_PREVIEW.querySelectorAll("span")[i].style.fontSize = String(preview_width / row - 5) + "px";
    });

    HTML_PREVIEW.querySelectorAll("span").forEach(row => {
        row.style.font_family = "";
        row.style.fontWeight = "";
        row.style.fontStyle = "";
        row.style.color = "";
        row.style.webkitTextStrokeColor = "";
        row.style.webkitTextStrokeWidth = "";
        row.style.background_color = "";
        row.style.padding_top    = "";
        row.style.padding_right  = "";
        row.style.padding_left   = "";
        row.style.padding_bottom = "";

        row.style.font_family = setting_dict["font_family"];

        if (setting_dict["bold_enable"]) {
            row.style.fontWeight = "bold";
        }
        if (setting_dict["italic_enable"]) {
            row.style.fontStyle = "italic";
        }
        if (setting_dict["body_color_enable"]) {
            row.style.color = setting_dict["body_color"];
        }
        if (setting_dict["edge_enable"]) {
            row.style.webkitTextStrokeColor = setting_dict["edge_color"];
            row.style.webkitTextStrokeWidth = setting_dict["edge_width"] + "px";
        }
        if (setting_dict["background_color_enable"]) {
            row.style.background_color = setting_dict["background_color"];
        }
        row.style.padding_top    = setting_dict["padding_top"] + "px";
        row.style.padding_right  = setting_dict["padding_right"] + "px";
        row.style.padding_left   = setting_dict["padding_left"] + "px";
        row.style.padding_bottom = setting_dict["padding_bottom"] + "px";
    });

    htmlToImage.toSvg(HTML_PREVIEW, { canvasWidth: "100px", canvasHeight: "100px" }).then(function (dataUrl) {
        image_url = dataUrl;
        EMOJI_IMAGE.src = image_url;
    });
}





window.addEventListener("load", () => {

    let os = detectOS();
    if (os != "") {
        FONT_FAMILY.querySelectorAll("option").forEach(opt => {
            if (opt.dataset.os != os) {
                opt.style.display = "none";
            }
        });
    }

    Object.keys(setting_dict).forEach(key => {
        let el = document.getElementById(key);
        if (el.type == "checkbox") {
            el.checked = setting_dict[key];
        }
        else if (el.type == "selectbox") {
            el.querySelectorAll("option").forEach(opt => {
                if (opt.value == setting_dict[key]) {
                    opt.setAttribute("selected");
                }
            });
        }
        else {
            el.value = setting_dict[key];
        }
    });

    DOWNLOAD.addEventListener("click", () => {
        let a = document.createElement("a");
        a.href = image_url;
        a.download = "aaa.svg";
        a.click();
    });

    SETTING.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", () => {
            if (input.type == "checkbox") {
                setting_dict[input.id] = input.checked;
            }
            else {
                setting_dict[input.id] = input.value;
            }
            console.log(setting_dict)
            previewUpdate();
        })
    });

    // 文字
    TEXT_AREA.addEventListener("input", () => {
        previewUpdate();
    });

    /*

    // フォント
    FONT_FAMILY.addEventListener("change", () => {
        HTML_PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.fontFamily = FONT_FAMILY.value;
        });
    });

    // 太字
    BOLD_ENABLE.addEventListener("change", () => {
        let prop = "";
        if (BOLD_ENABLE.checked) {
            prop = "bold";
        }
        HTML_PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.fontWeight = prop;
        });
    });

    // 斜体
    ITALIC_ENABLE.addEventListener("change", () => {
        let prop = "";
        if (ITALIC_ENABLE.checked) {
            prop = "italic";
        }
        HTML_PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.fontStyle = prop;
        });
    });

    // 文字の色
    BODY_COLOR_ENABLE.addEventListener("change", () => {
        if (BODY_COLOR_ENABLE.checked) {
            HTML_PREVIEW.querySelectorAll("span").forEach(row => {
                row.style.color = BODY_COLOR.value;
            });
        }
        else {
            HTML_PREVIEW.querySelectorAll("span").forEach(row => {
                row.style.color = "";
            });
        }
    });
    BODY_COLOR.addEventListener("change", () => {
        BODY_COLOR_ENABLE.checked = true;

        HTML_PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.color = BODY_COLOR.value;
        });
    });

    // 文字の輪郭
    EDGE_ENABLE.addEventListener("change", () => {
        if (EDGE_ENABLE.checked) {
            HTML_PREVIEW.querySelectorAll("span").forEach(row => {
                row.style.webkitTextStrokeColor = EDGE_COLOR.value;
                row.style.webkitTextStrokeWidth = String(EDGE_WIDTH.value) + "px";
            });
        }
        else {
            HTML_PREVIEW.querySelectorAll("span").forEach(row => {
                row.style.webkitTextStrokeColor = "";
                row.style.webkitTextStrokeWidth = "";
            });
        }
    });

    // 色
    EDGE_COLOR.addEventListener("change", () => {
        EDGE_ENABLE.checked = true;

        HTML_PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.webkitTextStrokeColor = EDGE_COLOR.value;
            row.style.webkitTextStrokeWidth = String(EDGE_WIDTH.value) + "px";
        });
    });

    // 太さ
    EDGE_WIDTH.addEventListener("change", () => {
        EDGE_ENABLE.checked = true;

        HTML_PREVIEW.querySelectorAll("span").forEach(row => {
            row.style.webkitTextStrokeColor = EDGE_COLOR.value;
            row.style.webkitTextStrokeWidth = String(EDGE_WIDTH.value) + "px";
        });
    });

    // 背景色
    BACKGROUND_COLOR_ENABLE.addEventListener("change", () => {
        if (BACKGROUND_COLOR_ENABLE.checked) {
            HTML_PREVIEW.style.backgroundColor = BACKGROUND_COLOR.value;
        }
        else {
            HTML_PREVIEW.style.backgroundColor = "";
        }
    });
    BACKGROUND_COLOR.addEventListener("change", () => {
        BACKGROUND_COLOR_ENABLE.checked = true;

        HTML_PREVIEW.style.backgroundColor = BACKGROUND_COLOR.value;
    });

    // 余白
    PADDING_TOP.addEventListener("change", () => {
        HTML_PREVIEW.style.paddingTop = String(PADDING_TOP.value) + "px";
    });
    PADDING_RIGHT.addEventListener("change", () => {
        HTML_PREVIEW.style.paddingRight = String(PADDING_RIGHT.value) + "px";
    });
    PADDING_LEFT.addEventListener("change", () => {
        HTML_PREVIEW.style.paddingLeft = String(PADDING_LEFT.value) + "px";
    });
    PADDING_BOTTOM.addEventListener("change", () => {
        HTML_PREVIEW.style.paddingBottom = String(PADDING_BOTTOM.value) + "px";
    });*/

});
