import "./style.css";

import { ICharacter, ICharacterResult } from "./interfaces/ICharacter";
import { IEpisode, IEpisodeResult } from "./interfaces/IEpisode";
import { ILocation, ILocationResult } from "./interfaces/ILocation";

const BASE_URL = "https://rickandmortyapi.com/api";

const CHARACTER_ROUTE = `${BASE_URL}/character`;
const LOCATION_ROUTE = `${BASE_URL}/location`;
const EPISODE_ROUTE = `${BASE_URL}/episode`;

const outputElement = document.getElementById("output") as HTMLDivElement;
const characterElement = document.getElementById(
  "api-character"
) as HTMLAnchorElement;
const locationElement = document.getElementById(
  "api-location"
) as HTMLAnchorElement;
const episodeElement = document.getElementById(
  "api-episode"
) as HTMLAnchorElement;

characterElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(CHARACTER_ROUTE);
    const data = await response.json();
    outputElement.innerHTML = "";
    const result = data.results as ICharacterResult[];

    result.forEach((result: ICharacterResult) => {
      const characterDiv = document.createElement("div") as HTMLDivElement;
      characterDiv.innerHTML = displayCharacter(result);
      outputElement.appendChild(characterDiv);
    });
  } catch (err) {
    console.error(err);
  }
});

function displayCharacter(character: ICharacterResult): string {
  const resultAsString = `
  <h4>Name: ${character.name}</h4>
<p>Status: ${character.status}</p>
<p>Gender: ${character.gender}</p>
<p>Location: ${character.location?.name}</p>
<img src="${character.image}" alt="${character.name}">
  `;
  return resultAsString;
}

locationElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(LOCATION_ROUTE);
    const data = await response.json();
    outputElement.innerHTML = "";
    for (const result of data.results) {
      const locationDiv = document.createElement("div") as HTMLDivElement;
      locationDiv.innerHTML = await displayLocation(result);
      outputElement.appendChild(locationDiv);
    }
  } catch (err) {
    console.error(err);
  }
});

async function displayLocation(location: ILocationResult): Promise<string> {
  const residents = await fetchResidents(location.residents);
  const resultAsString = `
  <p>Name:${location.name}</p>
  <p>Type:${location.type}</p>
  <p>Residents:${residents}</p>
  `;

  return resultAsString;
}

async function fetchResidents(locationResidents: string[]): Promise<string> {
  const resultArray: string[] = [];
  for (const resident of locationResidents) {
    try {
      const response = await fetch(resident);
      const data: ICharacterResult = await response.json();

      resultArray.push(data.name);
    } catch (err) {
      console.error(err);
    }
  }

  return resultArray.join(", ");
}

episodeElement?.addEventListener("click", async () => {
  try {
    const response = await fetch(EPISODE_ROUTE);
    const data = await response.json();
    outputElement.innerHTML = "";

    await Promise.all(
      data.results.map(async (result: IEpisodeResult) => {
        const episodeDiv = document.createElement("div") as HTMLDivElement;
        episodeDiv.innerHTML = await displayEpisode(result);
        outputElement.appendChild(episodeDiv);
      })
    );
  } catch (error) {
    console.error(error);
  }
});

async function displayEpisode(episode: IEpisodeResult): Promise<string> {
  const residents = await fetchResidents(episode.characters);
  const resultAsString = `
  <p>Name:${episode.name}</p>
  <p>Air date:${episode.air_date}</p>
  <p>Characters:${residents}</p>

  `;
  return resultAsString;
}
