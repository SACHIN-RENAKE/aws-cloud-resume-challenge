const counter = document.querySelector(".counter-number");

async function updateCounter() {
    try {
        const response = await fetch("https://5pc56z7ji5xsnp4ytctdgsv4a40cvgdp.lambda-url.ap-south-1.on.aws/");
        const data = await response.json();
        counter.textContent = data;
    } catch (err) {
        console.error("Counter failed:", err);
    }
}

updateCounter();