import axios from "axios";

export const WhatsAppMessage = async (to, work, startTime, endTime, place) => {
  const accessToken = "EAAUDEG5l18cBOyrx5zlFdUYlj1JSJ15vZBMZAsuff1vQJJzLeJwhztO4F9k3GxPPsh0PeRkqQyvcw40WcI06fyopJzjdqwZAWF0PKVXjhirRA9aMG71EhdXpxsPZB3zwpWCpADL1uCbv4ytLLCwIS4JmQyRZCdAqmfnKZAI7ggzByDEjcpyZBTN0PdZBgHrV03JeWvIFqDNRVPd8Soco34zHYWQ323w3PN3FXVvBTGTL"; 

  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: "smmanpower", 
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: work },
            { type: "text", text: startTime },
            { type: "text", text: endTime },
            { type: "text", text: place }
          ]
        }
      ]
    }
  };

  try {
    const res = await axios.post(
      "https://graph.facebook.com/v19.0/591274674073198/messages",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    console.error("WhatsApp message error:", err);
    return { success: false, error: err.response?.data || err.message };
  }
};


