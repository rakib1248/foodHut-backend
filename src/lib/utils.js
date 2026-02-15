export const emailTemp = (url) => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 0; width: 100% !important; }
    .container { width: 100%; max-width: 570px; margin: 0 auto; padding: 30px; }
    .content { background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); }
    .header { text-align: center; padding-bottom: 25px; }
    .logo { font-size: 24px; font-weight: bold; color: #333; text-decoration: none; }
    h1 { color: #333333; font-size: 22px; font-weight: bold; text-align: left; margin-top: 0; }
    p { font-size: 16px; line-height: 1.6; color: #51545e; }
    .button-container { text-align: center; margin: 30px 0; }
    .button { background-color: #2563eb; border-radius: 5px; color: #ffffff !important; display: inline-block; font-size: 16px; font-weight: bold; padding: 12px 25px; text-decoration: none; }
    .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #9ca3af; }
    .hr { border: none; border-top: 1px solid #e5e7eb; margin: 25px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="#" class="logo">YourBrand</a>
    </div>
    <div class="content">
      <h1>Verify your email address</h1>
      <p>Hi there,</p>
      <p>Thanks for signing up! We're excited to have you on board. To get started, please confirm your email address by clicking the button below:</p>
      
      <div class="button-container">
        <a href="${url}" class="button">Confirm Email Address</a>
      </div>

      <p>If you did not create an account, no further action is required.</p>
      
      <div class="hr"></div>
      
      <p style="font-size: 13px;">If you’re having trouble clicking the button, copy and paste the URL below into your web browser:</p>
      <p style="font-size: 13px; word-break: break-all;"><a href="${url}">${url}</a></p>
    </div>
    <div class="footer">
      &copy; 2026 Rakibbai. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};
