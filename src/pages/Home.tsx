import { useEffect, useState } from "react";
import './Home.scss'

const Home = () => {

    const [rounds, setRounds] = useState<number>(0);
    const [roundsOutput, setRoundsOutput] = useState<number>(0);
    const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);
    
    const [playerMove, setPlayerMove] = useState<string>("");
    const [computerMove, setComputerMove] = useState<string>("");
    const [randomNum, setRandomNum] = useState(0);
    console.log("round", roundsPlayed);
    
    console.log("player:", playerMove);
    console.log("computer", computerMove);
    console.log("playerScore", playerScore);
    console.log("computerScore", computerScore);
    
    
    const [displayText, setDisplayText] = useState<string>("Let's play");

    // randomize computer move
    const getComputerMove = (num: number) => {
    
            if (num === 1) {
                setComputerMove("✂️");
                
            }else if (num === 2) {
                setComputerMove("🪨");
                
            }else if (num === 3) {
                setComputerMove("📄");
            }
    };

    // get winner for every round
    useEffect(() => {
        if(rounds > 0){
            if( playerMove === "✂️" && computerMove === "🪨"){
                setDisplayText("🪨 beats ✂️. You lose!");
                setComputerScore(computerScore + 1);
            } else if (playerMove === "🪨" && computerMove === "✂️") {
                setDisplayText("🪨 beats ✂️. You win!");
                setPlayerScore(playerScore + 1);
            } else if (playerMove === "✂️" && computerMove === "📄") {
                setDisplayText("✂️ beats 📄. You win!");
                setPlayerScore(playerScore + 1);
            } else if (playerMove === "📄" && computerMove === "✂️") {
                setDisplayText("✂️ beats 📄. You lose!");
                setComputerScore(computerScore + 1);
            }else if (playerMove === "📄" && computerMove === "🪨") {
                setDisplayText("📄 beats 🪨. You win!")
                setPlayerScore(playerScore + 1);
            }else if (playerMove === "🪨" && computerMove === "📄") {
                setDisplayText("📄 beats 🪨. You lose!")
                setComputerScore(computerScore + 1);
            }else{
                setDisplayText(`It was a draw. You both chose ${playerMove} `)
            }
        }
        
    }, [roundsPlayed]);

    // game logic
    const handleRound = (event: React.MouseEvent<HTMLButtonElement>) => {

        setRoundsOutput(rounds);
        setRandomNum(Math.ceil(Math.random() * 3));

        if (roundsPlayed < rounds && !gameOver) {
            if (rounds > 1 && rounds - roundsPlayed > 1)
            {
                setRoundsPlayed(roundsPlayed + 1);       
                getComputerMove(randomNum);
                setPlayerMove(event.currentTarget.textContent || "");  
            } else if (rounds - roundsPlayed === 1) {
                setRoundsPlayed(roundsPlayed + 1);
                getComputerMove(randomNum);
                setPlayerMove(event.currentTarget.textContent || "");
                setGameOver(true);
            }
        } else if (!gameOver){
        setDisplayText("Choose rounds and make your move to start the game!");
        }
    }

    // restart game
    const handleRestart = () => {
        setRoundsPlayed(0);
        setRoundsOutput(0);
        setRounds(0);
        setComputerScore(0);
        setPlayerScore(0);
        setPlayerMove("");
        setComputerMove("");
        setDisplayText("Let's play");
        setGameOver(false);
    }

    return ( 
        <main>
            <section className="round_settings_wrapper">
                <p>How many rounds?</p>
                {roundsOutput > 0 ? (
                <>
                <p>{`${roundsPlayed}/${roundsOutput}`}</p>
                </>
                ) : (
                    <>
                    <article className="round_settings">
                        <div>
                            <input onClick={(event: React.MouseEvent<HTMLInputElement>) => setRounds(Number(event.currentTarget.value))} type="radio" value={5} name="round"/>
                            <label htmlFor="">5</label>
                        </div>
                        <div>
                            <input onClick={(event: React.MouseEvent<HTMLInputElement>) => setRounds(Number(event.currentTarget.value))} type="radio" value={10} name="round"/>
                            <label htmlFor="">10</label>
                        </div>
                        <div>
                            <input onClick={(event: React.MouseEvent<HTMLInputElement>) => setRounds(Number(event.currentTarget.value))} type="radio" value={15} name="round"/>
                            <label htmlFor="">15</label>
                        </div>
                        <div>
                            <input onClick={(event: React.MouseEvent<HTMLInputElement>) => setRounds(Number(event.currentTarget.value))} type="radio" value={20} name="round"/>
                            <label htmlFor="">20</label>
                        </div>
                    </article>
                    </>
                )}
                

            </section>
            <section className="score_display_wrapper">
                    <div className="players">
                        <p>Player</p>
                        <p>{playerMove}</p>
                    </div>
                    <div>
                        <p>{playerScore}</p> : <p>{computerScore}</p>
                    </div>
                    <div className="players">
                    <p>Computer</p>
                        <p>{computerMove}</p>
                    </div>
            </section>
            <section className="controls_wrapper">
                {gameOver ? (
                    <>
                        <h2>{playerScore > computerScore ? "You Win 🥳. Play again!" : playerScore < computerScore ? "You lose 🥺. Try again." : "It's a tie 😐. Play again."}</h2>
                        <p className="pointer_restart">👇</p>
                    </>
                ) : (
                    <>
                        <h2>{displayText}</h2>
                        <button onClick={handleRound}>✂️</button>
                        <button onClick={handleRound}>🪨</button>
                        <button onClick={handleRound}>📄</button>
                        <p>MAKE YOUR MOVE.</p>
                    </>
                )}
                <button onClick={handleRestart}>restart</button>
            </section>
        </main>
    );
}

export default Home;