exports.registerStudent = (name, enrollment, password) =>{
    
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .welcome-text {
            font-size: 16px;
            line-height: 1.6;
            text-align: center;
            margin-bottom: 10px;
        }
        .credentials {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .credentials strong {
            display: inline;
            margin-bottom: 5px;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            background-color: #3498db;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #2980b9;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Welcome to LNCT TNP Portal</h1>
        <p class="welcome-text">Helllo ${name},</p>
        <p class="welcome-text">Your are registered successfully in TNP portal. Please keep them safe and secure.</p>

        <div class="credentials">
            <strong>Username:</strong> ${enrollment} <br>
            <strong>Password:</strong> ${password}
        </div>

        <a href="https://lnct-campus.vercel.app/" class="button" target = "_blank">Login Now</a>

        <p class="welcome-text">If you have any questions or need assistance, feel free to reach out to our support team.</p>

        <div class="footer">
            <p>&copy; [Year] [Your Website]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`

}