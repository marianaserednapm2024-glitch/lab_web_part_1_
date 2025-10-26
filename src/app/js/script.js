document.addEventListener('DOMContentLoaded', () => {
    fetch('data-base/data.json')
        .then(response => response.json())
        .then(data => {
            const nameElement = document.getElementById("personName");
            const lastNameElement = document.getElementById("lastName");

            if (nameElement) nameElement.textContent = data.firstName;
            if (lastNameElement) lastNameElement.textContent = data.lastName;

            function renderProgressItems(items, containerId, color = "red") {
                const container = document.getElementById(containerId);
                if (!container) return;
                container.innerHTML = "";

                items.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("skill");

                    div.innerHTML = `
                        <label>${item.name}</label>
                        <input type="range" class="slider" value="${item.value}">
                    `;

                    const slider = div.querySelector(".slider");
                    slider.disabled = true;
                    slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${item.value}%, #ddd ${item.value}%, #ddd 100%)`;

                    container.appendChild(div);
                });
            }

            function renderLanguageCircles(languages, containerSelector, color = "red") {
                const container = document.querySelector(containerSelector);
                if (!container) return;
                container.innerHTML = "";

                const radius = 52;
                const circumference = 2 * Math.PI * radius;

                languages.forEach(lang => {
                    const colDiv = document.createElement("div");
                    colDiv.classList.add("col-4", "d-flex", "justify-content-center");

                    colDiv.innerHTML = `
                        <div class="progress-circle">
                            <svg>
                                <circle class="bg" cx="60" cy="60" r="${radius}"></circle>
                                <circle class="track" cx="60" cy="60" r="${radius}"></circle>
                                <circle class="progress" cx="60" cy="60" r="${radius}"
                                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: calc(${circumference} - (${circumference} * ${lang.value}) / 100); stroke: ${color};"></circle>
                            </svg>
                            <div class="circle-content">
                                <div class="percent">${lang.value}%</div>
                                <div class="lang">${lang.name}</div>
                            </div>
                        </div>
                    `;

                    container.appendChild(colDiv);
                });
            }

            renderProgressItems(data.skills, "skillsContainer", "red");
            renderProgressItems(data.hobbies, "hobbiesContainer", "red");
            renderLanguageCircles(data.languages, ".pad-2 .row", "red");

            const sectionTitles = document.querySelectorAll('.section-title');

            sectionTitles.forEach(title => {
                const arrow = title.querySelector('.arrow');
                const content = title.nextElementSibling;

                title.addEventListener('click', () => {
                    if (content) {
                        content.classList.toggle('show');
                        if (arrow) arrow.classList.toggle('rotated');
                    }
                });
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
