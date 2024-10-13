//http://api.weatherapi.com/v1/current.json?key=2822d1ae34fc41b6b0f95703241310&q=mumbai&aqi=no

const temperatureField = document.querySelector("#temperature");
const locationField = document.querySelector("#location");
const dateAndTimeField = document.querySelector("#dateAndTime");
const conditionField = document.querySelector("#conditionText");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Delhi, IN';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=2822d1ae34fc41b6b0f95703241310&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {
    temperatureField.innerText = `${temp}°C`;  // Add °C for clarity
    locationField.innerText = locationName;
    
    // Extract the date and time
    const [date, timeOfDay] = time.split(" "); // Split into 'YYYY-MM-DD' and 'HH:MM'

    // Get the formatted date with the weekday name
    const formattedDate = formatDateWithWeekday(date);

    // Display the date with the weekday and time
    dateAndTimeField.innerText = `${formattedDate}, ${timeOfDay}`;  // E.g., "Wednesday, 2023-10-11, 12:58"

    conditionField.innerText = condition;
}

function formatDateWithWeekday(dateString) {
    const dateObject = new Date(dateString);  // Convert 'YYYY-MM-DD' to Date object
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[dateObject.getDay()];  // Get the name of the day

    // Return the formatted date as "Day, YYYY-MM-DD"
    return `${dayName}, ${dateString}`;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

fetchResults(target);  // Initial call for 'Lucknow'
