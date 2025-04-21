import axios from "axios";

export const WhatsAppMessage = async (to, name, work, startTime, endTime, place) => {
  const accessToken = "EAATMiZA8lgvIBO2LaJGrINvz4xlNrD88ipC7Jk3iA1xMKb4FjpWUyYVbc1tAux1D2TSdvC4rT5lWb5HcXQhR1Gqbar6IY15lDpdGzJz01fjbcplbj9ZAoIattUYOqwKNnYfASycQJrv0nU9B16WZAxa6B4lbpaSZAR2RuUjDpOD110eXCAPmcxrTNQOQs0j88gZDZD"; 


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
      name: "hello_world", 
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: name },
            { type: "text", text: work },
            { type: "text", text: startTime },
            { type: "text", text: endTime },
            { type: "text", text: place },
            { type: "text", text: dress }
          ]
        }
      ]
    }
  };

  try {
    const res = await axios.post(
      "https://graph.facebook.com/v22.0/549847038222953/messages",
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

