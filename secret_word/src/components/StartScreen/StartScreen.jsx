import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className='start'>
      <h2>Secret Word</h2>
      <p>Clique no botão abaixo para começar a jogar.</p>
      <button onClick={startGame}>Começar a jogar</button>
    </div>
  )
}

export default StartScreen