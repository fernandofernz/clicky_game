import React, { Component } from "react";
import EmojiCard from "./components/EmojiCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import emoji from "./emojis.json";
import "./App.css";


let topScore = 0;
let guessesCorrect = 0;
let message = "";

class App extends Component {

  state = {
    emoji,
    topScore,
    guessesCorrect,
    message
  };


  setClicked = id => {
		const emoji = this.state.emoji;
    const cardClicked = emoji.filter(emoji => emoji.id === id);
    
		if (cardClicked[0].clicked) {
      
            guessesCorrect = 0;
            message = 'Whoops. Start over';
      
            for (let i = 0; i < emoji.length; i++) {
              emoji[i].clicked = false;
            }
      
            this.setState({message});
            this.setState({guessesCorrect});
            this.setState({emoji});
      
          } else {
            cardClicked[0].clicked = true;
      
            guessesCorrect = guessesCorrect + 1;
            message = "Good Job!"
      
            if (guessesCorrect > topScore) {
              topScore = guessesCorrect;
              this.setState({topScore});
          
            }
      
            emoji.sort((a, b) => {
              return 0.5 - Math.random();
            });
      
            this.setState({emoji});
            this.setState({guessesCorrect});
            this.setState({message});
          }
        };

  removeFriend = id => {

    const emoji = this.state.emoji.filter(emoji => emoji.id !== id);
    this.setState({ emoji });
  };

  render() {
    return (
      <Wrapper>
        <Title>Clicky Emoji Game! 
        <h4>Score: {this.state.guessesCorrect}</h4>
           </Title>
       
       
        {this.state.emoji.map(emoji => (
          <EmojiCard
            setClicked={this.setClicked}
            id={emoji.id}
            key={emoji.id}
            image={emoji.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
