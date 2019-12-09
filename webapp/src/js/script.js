"use strict";

window.addEventListener("load", function () {
    const submit_button = document.getElementById("submit-button");
    const buzzword_field = document.getElementById("buzzword");
    const ninja_card = document.getElementById("ninja-card");
    const ninja_name = document.getElementById("ninja-name");
    const ninja_avatar = document.getElementById("ninja-avatar");

    function generate_avatar_url(keyword) {
        keyword = keyword.replace(/\s/g,'')
        return `http://tinygraphs.com/spaceinvaders/${keyword}?theme=heatwave&numcolors=4&size=220&fmt=png`;
    }

    submit_button.addEventListener('click', (event) => {
        event.preventDefault();
        const user_input = buzzword_field.value;

        fetch(`./ninjify/${user_input}`)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        buzzword_field.classList.add('is-invalid');
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    
                    buzzword_field.classList.remove('is-invalid');
                    response.json().then(function (data) {
                        let generated_name = `${data.first.name} ${data.second.name} ${data.third.name}`;
                        ninja_name.innerHTML = generated_name;
                        ninja_avatar.style.backgroundImage = `url(${generate_avatar_url(generated_name)})`;
                        ninja_card.classList.remove("ninja-id_empty");
                        console.log(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    });

});