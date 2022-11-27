import React from 'react'
import ReactStars from 'react-stars'
import { render } from 'react-dom'
import { Feed } from 'semantic-ui-react'

const Feedback = (newRating) => {
    console.log(newRating)
  }
  
  render(
    <div>
  <ReactStars
    count={5}
    onChange={Feedback}
    size={24}
    color2={'#ffd700'} />
    </div>,
  
    document.getElementById('where-to-render')
  );

  export default Feedback; 