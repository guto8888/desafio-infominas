import style from './card.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { PropsChar } from '@/app/types/types';

export default function CharCard({ props }: PropsChar ) {
    const {select, name, id, appearance, image, publisher, power } = props
    
    let bgColor = { background: 'white'}

    switch(publisher){
      case "Marvel Comics": 
        bgColor.background = 'linear-gradient(#DC143C, #8B0000, #000000)'
        break
      case "DC Comics": 
        bgColor.background = 'linear-gradient(#0000FF, #000080, #000000)'
        break
      case "George Lucas": 
        bgColor.background = 'linear-gradient(#757575, #4F4F4F, #000000)'
        break
      case "Dark Horse Comics": 
        bgColor.background = 'linear-gradient(#C0C0C0, #696969, #000000)'
        break
      case "Shueisha": 
        bgColor.background = 'linear-gradient(#FFFF00, #FF8C00, #000000)'
        break
      case "NBC - Heroes": 
        bgColor.background = 'linear-gradient(#8A2BE2, #7B68EE, #000000)'
        break
      case "ABC Studios": 
        bgColor.background = 'linear-gradient(#00FA9A, #2F4F4F, #000000)'
        break
      case "Star Trek": 
        bgColor.background = 'linear-gradient(#1E90FF, #4682B4, #000000)'
        break
      case "Image Comics": 
        bgColor.background = 'linear-gradient(#6A5ACD, #483D8B, #000000)'
        break
      case "J. R. R. Tolkien": 
        bgColor.background = 'linear-gradient(#48D1CC, #008080, #000000)'
        break
      case "Icon Comics": 
        bgColor.background = 'linear-gradient(#F0E68C, #DAA520, #000000)'
        break
      case "IDW Publishing": 
        bgColor.background = 'linear-gradient(#DB7093, #C71585, #000000)'
        break
      case "SyFy": 
        bgColor.background = 'linear-gradient(#00BFFF, #4169E1, #000000)'
        break
      case "Sony Pictures": 
        bgColor.background = 'linear-gradient(#6495ED, #0000CD, #000000)'
        break
      case "Microsoft": 
        bgColor.background = 'linear-gradient(#8FBC8F, #2E8B57, #000000)'
        break
      case "Titan Books": 
        bgColor.background = 'linear-gradient(#D3D3D3, #708090, #000000)'
        break
      case "J. K. Rowling": 
        bgColor.background = 'linear-gradient(#836FFF, #483D8B, #000000)'
        break
      case "Universal Studios": 
        bgColor.background = 'linear-gradient(#90EE90, #191970, #000000)'
        break
      case "South Park": 
        bgColor.background = 'linear-gradient(#0000FF, #B22222, #000000)'
        break
      default: 
        bgColor.background = 'linear-gradient(#A9A9A9, #DCDCDC, #000000)'
        break
    }

    return (
      <>
        <Card component="button" 
          onClick={()=> select({power, name, image, id})}
          style={bgColor} 
          className={style.card} 
          sx={{ maxWidth: 200 }}>
          <CardMedia className={style.image}
            component="img"
            alt="green iguana"
            height="200"
            image={image}/>
          <CardContent className={style.content}>
            <Typography className={style.name} gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <div className={style.icons}>
              <Typography gutterBottom variant='h3' component="div">
                {appearance.gender === "Male" ? <MaleIcon/> : <FemaleIcon />}
              </Typography>
              <Typography gutterBottom variant='h6' component="div">
                {id}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </>
    )
}