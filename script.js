// name, gender, height
const url = 'https://swapi.dev/api/people';
const characterDetails = document.querySelector('.character-details');

const characterImg = {
    'Luke Skywalker': 'img/Luke-Skywalker.jpg',
    'C-3PO': 'img/C-3PO.jpg',
    'Darth Vader': 'img/Darth Vader.png',
    'Leia Organa': 'img/Leia Organa.jpg',
    'Owen Lars': 'img/Owen Lars.png',
    'R2-D2': 'img/R2-D2.jpg',
    'Beru Whitesun lars': 'img/Beru Whitesun lars.jpg',
    'R5-D4': 'img/R5-D4.png',
    'Biggs Darklighter': 'img/Biggs Darklighter.jpg'
}
fetchData();

function sanitizeClassName(name) {
    return name.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and convert to lowercase
}

async function fetchData() {
    try{
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        // console.log(data.results[0].height)

        const charactersData = data.results;

        for (let i = 0; i < charactersData.length; i++) {
            let currData = charactersData[i];
            const [name, gender, height] = [currData.name, currData.gender, currData.height];
            console.log(name)

            // name.classList.add('strong');
            // gender.classList.add('strong');
            // height.classList.add('strong');

            // create div element
            const characterDiv = document.createElement('div')
            // assign class to the divElement
            characterDiv.classList.add('characters')
            
            const imageElement = document.createElement('img');
            imageElement.src = characterImg[name] || 'img/default.jpeg';
            imageElement.alt = name;

            // change the name to a single format name use the sanitize function to reconstruct the character name
            const sanitizedClassName = sanitizeClassName(name);
            imageElement.classList.add(sanitizedClassName);

            const hrElement = document.createElement('hr');
            hrElement.classList.add('character-hr')

            const nameElement = document.createElement('h2');
            nameElement.classList.add('character-name')
            nameElement.innerText = `Name: ${name}`;
            

            const genderElement = document.createElement('p');
            genderElement.classList.add('character-gender', 'hidden');
            genderElement.innerHTML = `Gender: <span class="character-gender-bold"> ${gender} </span>`;
            // nameElement.innerHTML = `Name: <span class="character-name-bold">${name}</span>`;

            const heightElement = document.createElement('p');
            heightElement.classList.add('character-height', 'hidden');
            // heightElement.innerText = `Height: ${height}`
            heightElement.innerHTML = `Gender: <span class="character-height-bold"> ${height} </span>`;

            nameElement.addEventListener('click', () => {
                genderElement.classList.toggle('hidden')
                heightElement.classList.toggle('hidden')
            })
            
            //append element to characterDiv
            characterDiv.appendChild(imageElement);
            characterDiv.appendChild(nameElement);
            characterDiv.appendChild(hrElement);
            characterDiv.appendChild(genderElement);
            characterDiv.appendChild(heightElement);

            //append divElement to characterDetamils
            characterDetails.appendChild(characterDiv)
        }
        

    }
    catch(error){
        console.error(error)
    }
}
