

export default function WinMessage({move}) {
  return (
    <div className='win-message'>
      <h2>Congratulation!</h2>
      <p>You completed the game in {move} moves!</p>
    </div>
  )
}
