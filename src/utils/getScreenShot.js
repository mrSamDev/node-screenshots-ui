import config from "../config";

const getScreenShot = async (options) => {
  try {

    let URL = config.apiUrl + "/screen-shot";
    let response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });

    if (response.status !== 200) throw new Error("Something went wrong");

    if(response.error) throw new Error(response.message);

    const blob = await response.blob();
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = options.name + "." + options.extension || "fileName.jpg";
    a.click();
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    throw error;
  }
};

export default { getScreenShot };
