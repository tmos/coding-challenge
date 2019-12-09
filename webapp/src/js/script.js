"use strict";

window.addEventListener("load", function () {
    const submit_button = document.getElementById("submit-button");
    const buzzword_field = document.getElementById("buzzword");
    const ninja_card = document.getElementById("ninja-card");
    const ninja_name = document.getElementById("ninja-name");
    const ninja_avatar = document.getElementById("ninja-avatar");
    const share = document.getElementById("share");

    /**
     * Get the url params
     */
    function getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    /**
     * @param {string} keyword: will generate a random picture 
     */
    function generate_avatar_url(keyword) {
        keyword = keyword.replace(/\s/g, '')
        return `http://tinygraphs.com/spaceinvaders/${keyword}?theme=heatwave&numcolors=4&size=220&fmt=png`;
    }

    /**
     * @param {string} buzz: user favorite tech buzzword that will generate his ninja name
     */
    function generate_ninja(buzz) {
        console.log("generation!");
        fetch(`./ninjify/${buzz}`)
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
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }


    /**
     * @param {string} string_to_copy: what to copy in clipboard
     */
    function copy_to_clipboard(string_to_copy) {
        const el = document.createElement('textarea');
        el.value = string_to_copy;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    /**
     * Generate ninja if there is an url param
     */
    let url_buzzword = getUrlVars()["buzzword"];
    if (url_buzzword) {
        buzzword_field.value = url_buzzword;
        generate_ninja(url_buzzword);
    }

    /**
     * Generate ninja at user's click
     */
    submit_button.addEventListener('click', (event) => {
        event.preventDefault();
        let user_input = buzzword_field.value;
        generate_ninja(user_input);
    });

    /**
     * Allow user to share his war name!
     */
    share.addEventListener('click', (event) => {
        event.preventDefault();
        const base_url = location.protocol + '//' + location.host + location.pathname;
        const user_input = buzzword_field.value;
        copy_to_clipboard(`${base_url}?buzzword=${user_input}`);
        share.innerHTML = "⚔️ War name copied! ⚔️";
    })

});