import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
	const [ started, setStarted ] = useState(false);
	const [ atual, setAtual ] = useState(0);
	const [ count, setCount ] = useState(0);
	const [ option, setOption ] = useState('');
	const [ timer, setTimer ] = useState(0)
	const questions = [
		{
			question: 'What is the capital of Canada?',
			options: ['São Paulo','Madrid','Ottawa','Cairo'],
			answer: 'Ottawa'
		},
		{
			question: 'What is the capital of Sweeden?',
			options: ['Tokyio','Estocolmo','Moscow','Havana'],
			answer: 'Estocolmo'
		},
		{
			question: 'What is the capital of Germany?',
			options:['Berlim','Paris','Lyon','Montevidéu'],
			answer: 'Berlim'
		},
		{
			question: 'What is the capital of Argentina?',
			options:['Munique','Kiev','New York','Buenos Aires'],
			answer: 'Buenos Aires'
		},
		{
			question: 'What is the capital of Norway?',
			options:['Beijing','Oslo','Sidney','Seattle'],
			answer: 'Oslo'
		}
	]
	let timerId;
	useEffect(() => {
		if(started && atual < 5){
			let timeLeft = 10;
			setTimer(timeLeft);
			const countdown = () => {
				if (timeLeft === 0) {
					clearTimeout(timerId);
					setAtual(atual + 1);
				} else {
					timeLeft--;
					setTimer(timeLeft);
				}
			}
			timerId = setInterval(countdown, 1000);
		}
		return () => {
			clearTimeout(timerId);
		}
	}, [atual, started])

	const handleStart = () => {
		setStarted(true);
	}

	const handleOption = ev => {
		setOption(ev.target.value);
	}

	const handleAnswer = () => {
		if(option !== ''){
			option === questions[atual].answer && setCount(count + 1)
			setAtual(atual + 1);
		}
	}

  return (
		<div className="container">
			<div className="title">
				<h1 className="text">Awesome WebApp</h1>
				<h2 className="text">Quiz</h2>
			</div>
			<div className="content">
				{!started ? (
					<div className="present">
						<p>Test your knowledge here...</p>
						<button onClick={() => handleStart()}>Start</button>
					</div>
				) : (
					<div>
						{atual >= 5 ? (
							<div className="present">
								<p>Congratulations you have finished the Quiz!</p>
								<p>Your score is {count} out of 5</p>
							</div>
						) : (
							<div className="present">
								<p>{questions[atual].question}</p>
								{questions[atual].options.map((op, i) => (
									<div className="option" key={i}>
										<input type="radio" name="options" value={op} onClick={ev => handleOption(ev)} checked={option === op}/>
										<label>{op}</label>
									</div>
								))}
								<button onClick={() => handleAnswer()}>Submit</button>
								<p>
									{
										timer >= 2 ?
											`${timer} seconds remaining...`
											:timer === 1 ?
												`${timer} second remaining...`
											: `Time finished :'(`
									}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
  );
};
export default App;
