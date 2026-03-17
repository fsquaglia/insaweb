const buildEmailHtml = ({ userName, userEmail, message, contactNumber }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
    <div style="background-color: #4f46e5; padding: 20px; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 20px;">Nueva consulta desde insarafaela.com.ar</h1>
    </div>
    <div style="background-color: white; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 16px;">
        <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Nombre</span>
        <p style="margin: 4px 0 0 0; font-size: 16px; color: #111827;">${userName}</p>
      </div>
      <div style="margin-bottom: 16px;">
        <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Email</span>
        <p style="margin: 4px 0 0 0; font-size: 16px; color: #4f46e5;">${userEmail}</p>
      </div>
      <div style="margin-bottom: 16px;">
        <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Mensaje</span>
        <p style="margin: 4px 0 0 0; font-size: 15px; color: #374151; line-height: 1.6; background-color: #f3f4f6; padding: 12px; border-radius: 6px;">
          ${message}
        </p>
      </div>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 8px;">
        <span style="font-size: 11px; color: #9ca3af;">Consulta #${contactNumber}</span>
      </div>
    </div>
  </div>
`;

export default buildEmailHtml;
