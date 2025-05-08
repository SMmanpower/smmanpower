import axios from "axios";

export const WhatsAppMessage = async (to, name, work, startTime, endTime, place) => {
  const accessToken = "EAAUSZAO6ZB5WUBO2aioz2563UQTArdlUAt0EvYGKdJwicHrv8sX9H7vlR0OnGTtl7yYVUVsN2LmRnXn1snkRCemZApmeS47tapxynbww8i63y3jVFM7aFPksnwZAMvZAodHTC4UE2uaAhlTz5LpSN7K5ZBtQvf2IYUcimn1D6ykLOUZBRuQEUQ6A4aOTj4T3TyyWAZDZD"; 


  let dress = "";
  if (["odc", "odcservice"].includes(work)) {
    dress = "White Shirt, Black Pant, Formal Black Shoes";
  } else if (work === "barodc") {
    dress = "Black Shirt, Black Pant, Formal Black Shoes";
  } else if (["decorationhelpingwork", "pamphlet", "distribution"].includes(work)) {
    dress = "Normal Dress";
  } else if (["catering", "driverwork", "promoters"].includes(work)) {
    dress = "White Shirt, Black Pant, Formal Black Shoes";
  } else if (["refree", "umpire"].includes(work)) {
    dress = "T-shirt, Black Lower, Sports Whistle";
  } else {
    dress = "To be informed";
  }



  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: "assginment_notification", 
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: name },
            { type: "text", text: work },
            { type: "text", text: startTime },
            { type: "text", text: endTime },
            { type: "text", text: place },
            { type: "text", text: dress },
            { type: "text", text: "01" }
          ]
        }
      ]
    }
  };

  try {
    const res = await axios.post(
      "https://graph.facebook.com/v22.0/652786447910319/messages",
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

