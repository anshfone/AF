<?php
session_start();

// $client = new MongoDB\Client('mongodb://mongodb-deployment:27017');

// Initialize game variables
$choices = ['rock', 'paper', 'scissors'];
$userChoice = isset($_POST['user_choice']) ? $_POST['user_choice'] : '';
$computerChoice = '';

// Function to get computer's choice
function getComputerChoice()
{
    global $choices;
    return $choices[array_rand($choices)];
}

// Function to determine the winner
function determineWinner($user, $computer)
{
    if ($user == $computer) {
        return 'It\'s a tie!';
    } elseif (($user == 'rock' && $computer == 'scissors') ||
              ($user == 'paper' && $computer == 'rock') ||
              ($user == 'scissors' && $computer == 'paper')) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

// Process user's choice
if ($userChoice) {
    $computerChoice = getComputerChoice();
    $result = determineWinner($userChoice, $computerChoice);

    // Save game progress in session
    $_SESSION['game_progress'][] = [
        'user_choice' => $userChoice,
        'computer_choice' => $computerChoice,
        'result' => $result,      
    ];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rock, Paper, Scissors Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        #container {
            text-align: center;
        }

        #game-results {
            display: inline-block;
            vertical-align: top;
            margin-left: 20px;
        }

        .game-round {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

<div id="container">
    <h1>Rock, Paper, Scissors Game</h1>

    <form method="post">
        <label for="user_choice">Choose: </label>
        <select name="user_choice" id="user_choice">
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
        </select>
        <button type="submit">Play</button>
    </form>

    <?php if ($userChoice): ?>
        <div id="game-results">
            <h2>Last Game Results</h2>
            <?php foreach ($_SESSION['game_progress'] as $round): ?>
                <div class="game-round">
                    <strong>Your Choice:</strong> <?php echo ucfirst($round['user_choice']); ?><br>
                    <strong>Computer's Choice:</strong> <?php echo ucfirst($round['computer_choice']); ?><br>
                    <strong>Result:</strong> <?php echo $round['result']; ?>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

</body>
</html>
