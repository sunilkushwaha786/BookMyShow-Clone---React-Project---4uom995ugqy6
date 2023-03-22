import axios from "axios";

async function apicalls(url) {
  try {
    const res = await axios.get(url);
  return res;
  } catch (error) {
    return true;
  }
}

export default apicalls;
