export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
	return `
	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="UTF-8">
	  <title>Reset Your Password</title>
	</head>
	<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
	  
	  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
		<tr>
		  <td align="center">
			
			<table width="500" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; padding:30px;">
			  
			  <tr>
				<td align="center" style="padding-bottom:20px;">
				  <h2 style="color:#333;">🔐 FYPM SYSTEM PASSWORD RESET</h2>
				</td>
			  </tr>
  
			  <tr>
				<td style="color:#555; font-size:14px; line-height:22px;">
				  <p>Hello,</p>
				  <p>
					We received a request to reset your password. Click the button below to set a new password.
				  </p>
				</td>
			  </tr>
  
			  <tr>
				<td align="center" style="padding:20px 0;">
				  <a href="${resetPasswordUrl}" 
					 style="background-color:#4CAF50; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:14px; display:inline-block;">
					 Reset Password
				  </a>
				</td>
			  </tr>
  
			  <!-- Fallback Link -->
			  <tr>
				<td style="color:#555; font-size:13px; line-height:20px;">
				  <p>If the button above does not work, copy and paste the following link into your browser:</p>
				  <p style="word-break:break-all;">
					<a href="${resetPasswordUrl}" style="color:#4CAF50;">${resetPasswordUrl}</a>
				  </p>
				</td>
			  </tr>
  
			  <tr>
				<td style="color:#777; font-size:12px; line-height:18px;">
				  <p>This link will expire in 15 minutes.</p>
				  <p>If you did not request a password reset, please ignore this email.</p>
				</td>
			  </tr>
  
			  <tr>
				<td style="padding-top:20px; font-size:12px; color:#aaa; text-align:center;">
				  © 2026 FYPM-System. All rights reserved.
				</td>
			  </tr>
  
			</table>
  
		  </td>
		</tr>
	  </table>
  
	</body>
	</html>
	`;
}
  

