export async function getUserCountry() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Error fetching country:', error);
    return 'US'; // fallback
  }
}