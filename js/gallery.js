  AOS.init();

        const lightbox = GLightbox({ touchNavigation: true });

        // FILTER SYSTEM
        const buttons = document.querySelectorAll(".filter-btns button");
        const items = document.querySelectorAll(".gallery-item");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                let filter = btn.getAttribute("data-filter");

                items.forEach(item => {
                    item.style.display = (filter === "all" || item.classList.contains(filter))
                        ? "block"
                        : "none";
                });
            });
        });