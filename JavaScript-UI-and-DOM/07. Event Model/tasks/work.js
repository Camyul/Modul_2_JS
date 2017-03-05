function solve() {
    return function(selector) {
        if (typeof selector !== "string" && typeof selector !== "object") {
            throw new Error("Incorrect selector type!");
        }
        var container;
        if (typeof selector === "string") {
            container = document.getElementById(selector);
        } else {
            container = selector;
        }

        if (container === null) {
            throw new Error("The provided DOM element doesn`t existant");
        }
        var buttons = container.getElementsByClassName('button');
        var contents = container.getElementsByClassName('content');

        [].forEach.call(buttons, x => x.innerHTML = 'hide');

        //   for (var i = 0; i < buttons.length; i += 1){
        //       buttons[i].innerHTML = 'hide';
        //   }

        container.addEventListener("click", function(ev) {
            var target = ev.target,
                targetClass = target.getAttribute('class');

            if (targetClass === "button") {
                var nextSibling = target.nextElementSibling,
                    nextSiblingClass = nextSibling.getAttribute('class');
                if (nextSiblingClass === "content") {
                    if (target.innerHTML === "hide") {
                        target.innerHTML = "show";
                        nextSibling.setAttribute("style", "display: none");
                    } else {
                        target.innerHTML = "hide";
                        nextSibling.removeAttribute("style");
                    }
                }
            }
        });
    };
}

module.exports = solve;