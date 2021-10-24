import React from 'react'
import './Cards.css'
import CardList from './CardList'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

const Cards = ({ category }) => {
  return (
    <div className='cards-div'>
      <h5>{category}</h5>
      <div className='cards'>
        {CardList.map((list) => {
          return (
            <div className='main-cards' key={list.id}>
              <a href='/sd' className='a'>
                <div className='cards-image'>
                  <img
                    src='/assets/optician.jpg'
                    alt='events'
                    className='img'
                  />
                </div>
                <div className='card-content'>
                  <p className='card-p'>{list.name}</p>
                  <h4 className='card-h4'>{list.text}</h4>
                  <p className='card-p2'>{list.name}</p>
                  <p className='card-p3'>{list.text}</p>
                </div>
              </a>
            </div>
          )
        })}
      </div>
      <div className='showmore-button'>
        <Button
          type='button'
          variant='contained'
          sx={{ mt: 1, mb: 2 }}
          className='button1'
        >
          Show More
        </Button>
      </div>
      <Divider />
    </div>
  )
}

export default Cards

// import * as React from 'react'
// import './Cards.css'
// import CardList from './CardList'

// import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
// import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'

// export default function Cards() {
//   return (
//     <div className='cards'>
//       {CardList.map((list) => {
//         return (
//           <Card sx={{ maxWidth: 250 }} key={list.id}>
//             <CardMedia
//               component='img'
//               alt='green iguana'
//               height='140'
//               image='https://thumbs.dreamstime.com/b/event-planning-working-desk-notebook-events-word-computer-pencil-notepad-clock-concept-98612010.jpg'
//               className='card-skew'
//             />
//             <CardContent>
//               <Typography gutterBottom variant='h5' component='div'>
//                 {list.name}
//               </Typography>
//               <Typography variant='body2' color='text.secondary'>
//                 {list.text}
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button size='small'>Share</Button>
//               <Button size='small'>Learn More</Button>
//             </CardActions>
//           </Card>
//         )
//       })}
//     </div>
//   )
// }
