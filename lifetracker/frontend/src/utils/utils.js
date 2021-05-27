
export function getColors() {
    var colors = ["#84dcc6", "#ade5e3", "#c2e9f1", "#d6edff", "#acd7ec", "#8b95c9", "#8093bc", "#7491ae", "#698fa1", "#478978"]
    return colors;
}

export function formatTime(time) {
    return time.toISOString().slice(0, 19).replace('T', ' ')
}