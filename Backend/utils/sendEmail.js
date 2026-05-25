const sendEmail = async (options) => {
  try {

    const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();

    if (!BREVO_API_KEY) {
      console.error("Brevo API Key is missing");
      throw new Error("Missing Email Service API Key");
    }

    const data = {
      sender: {
        name: "Real Estate Platform",
        email: process.env.EMAIL_USER,
      },

      to: [
        {
          email: options.email,
        },
      ],

      subject: options.subject,

      htmlContent: options.message,
    };

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    // SUCCESS
    if (response.ok) {

      console.log(
        "Email sent successfully via Brevo:",
        result.messageId
      );

      return result;

    } else {

      console.error(
        "Failed to send email via Brevo:",
        result
      );

      throw new Error(
        result.message || "Could not send email via Brevo"
      );
    }

  } catch (error) {

    console.error(
      "Email Sending Error:",
      error.message
    );

    throw error;
  }
};

export default sendEmail;