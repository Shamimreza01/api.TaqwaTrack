const homePage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaqwaTrack API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
        }
        p {
            font-size: 18px;
            color: #555;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .endpoint {
            background: #2c3e50;
            color: white;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 10px;
        }
        .endpoint a {
            color: #fff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to TaqwaTrack API</h1>
        <p>Your source for Islamic resources and motivational ayahs.</p>
        <p>Explore our endpoints:</p>
        <div class="endpoint">
            <a href="/FortyMotivationalAyah">View 40 Motivational Ayahs</a>
        </div>
         <div class="endpoint">
            <a href="/FortyRabbanaDua">View 40 Rabbana Dua</a>
        </div>
         <div class="endpoint">
            <a href="/QuranArBnEnAudio">View Full Quran</a>
        </div>
         <div class="endpoint">
            <a href="/AfterSalahDua">After Salah Dua</a>
        </div>
    </div>
</body>
</html>
`;

export default homePage;
