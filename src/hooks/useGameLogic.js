import React from "react"

export const useGameLogic =  (cardsValue) => {
    const [cards,setCards] = React.useState([])
  const [flippedCards, setFlippedCards] = React.useState([])
  const [matchedCards,setMatchedCards] = React.useState([])
  const [score, setScore ] = React.useState(0)
  const [ move , setMove ] =React.useState(0)
  const [isLocked, setIsLocked] = React.useState(false)

  function shuffleArray(array){
    const shuffled =  [...array]
    for(let i = shuffled.length -1 ; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i] , shuffled[j]] =[shuffled[j] , shuffled[i]];
    }
    return shuffled;
  }
  
  function initializeGame(){
    //shuffle the cards
    const shuffled = shuffleArray(cardsValue)
    const finalCards = shuffled.map((value,index)=> (
      {
        id:index,
        value,
        isFlipped:false,
        isMatched:false,
      }
    ))

    setCards(finalCards)
    setMatchedCards([])
    setFlippedCards([])
    setMove(0)
    setScore(0)
    setIsLocked(false)
    
  }

  React.useEffect(()=>{
    initializeGame()
  },[])


  function handelClicking(card){

    //don't allow if it's flipped or matched 
    if(card.isFlipped || card.isMatched || isLocked || flippedCards.length===2){
      return
    }
    
    

    
    //Update card flipped state 
    const newCards = cards.map((c) => {
      if(c.id === card.id){
        return {...c, isFlipped:true}
      }else{
        return c
      }
    })
    setCards(newCards)

    const newFlippedCards = [...flippedCards,card.id]
    setFlippedCards(newFlippedCards)

    //check for match if two cards are flipped
    if(flippedCards.length ===1 ){
      setIsLocked(true)
      const firstCard = cards[flippedCards[0]]

      if(firstCard.value === card.value){
      setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id])
          setScore((prev) => prev+ 1)
        const newMatchedCards = cards.map((c)=>{
          if(c.id === card.id || firstCard.id === c.id){
            return {...c, isMatched:true}
          }else{
            return c
          }
        })
        setCards((prev) => 
        prev.map((c)=>{
          if(c.id === card.id || firstCard.id === c.id){
            return {...c, isMatched:true}
          }else{
            return c
          }
        }))
        setFlippedCards([])
        setIsLocked(false)
        },500)
        
      }else{
        //flip back card 1 ,2
        setTimeout(()=>{
            const flippedBackCards = newCards.map((c) => {
            if(newFlippedCards.includes(c.id) || c.id === card.id){
              return {...c,isFlipped:false}
            }else{
                return c
            }
            })
            setCards(flippedBackCards)
            setFlippedCards([])//cuz we're looking at the first two cards, we need to rest them
            setIsLocked(false)
        },1000)
      }
      setMove((prev) => prev + 1)
    }

  }

  const isCompleted = matchedCards.length === cardsValue.length;

  return {cards , score , move , isCompleted , handelClicking , initializeGame}
}