// The tour is driven by the reader: no timer, and only the picture they
// asked for is fetched.
(function () {
    var shot = document.getElementById("tour-shot");
    var caption = document.getElementById("tour-caption");
    var tabs = document.querySelectorAll(".tour-tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function (e) {
            for (var j = 0; j < tabs.length; j++)
                tabs[j].classList.remove("is-active");
            e.currentTarget.classList.add("is-active");
            shot.srcset = e.currentTarget.dataset.srcset;
            shot.src = e.currentTarget.dataset.shot;
            caption.textContent = e.currentTarget.dataset.caption;
        });
    }
})();
