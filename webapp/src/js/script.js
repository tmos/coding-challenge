"use strict";

window.addEventListener("load", function () {
    const submit_button = document.getElementById("Submit");
    const buzzword_field = document.getElementById("Buzzword");

    const ninja_card = document.getElementById("ninja_card");
    const ninja_name = document.getElementById("NinjaName");
    const ninja_avatar = document.getElementById("NinjaAvatar");
    const ninja_description = document.getElementById("NinjaDescription");

    submit_button.addEventListener('click', (event) => {
        event.preventDefault();
        const user_input = buzzword_field.value;

        fetch(`./ninjify/${user_input}`)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    response.json().then(function (data) {
                        let generated_name = `${data.first.name} ${data.second.name} ${data.third.name}`;
                        ninja_name.innerHTML = generated_name;
                        ninja_avatar.style.backgroundImage = `url('https://api.adorable.io/avatars/90/${generated_name}.png')`;
                        ninja_description.innerHTML = data.first.name;
                        ninja_card.classList.remove("NinjaIDempty");
                        console.log(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    });

});