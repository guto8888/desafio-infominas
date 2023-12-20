import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import style from './modal.module.css'
import { CharModal, PropsModal, WinnerType } from "@/app/types/types";
import { forwardRef, useEffect, useState } from 'react';

const Backdrop = forwardRef<HTMLDivElement,{ open?: boolean; className: string }>(function backForward(props, ref) {
  const { open, className, ...other } = props;
  
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    height: 80%;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
    ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 25px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    
    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }
    
    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);



export default function ModalComponent({ props }: PropsModal) {
  const { char, closeModal } = props
  let draw: WinnerType =  {'name': '', 'id': 0}
  const [winner, setWinner] = useState<WinnerType>()

  useEffect(() => {
    setWinner(draw)
  }, [])

  return(
    <>
      <div>
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={true}
          onClose={closeModal}
          slots={{ backdrop: StyledBackdrop }}>
            <ModalContent className={style.content} sx={{ width: 900 }}>
              <div className={style.divModal}>
                {char.map(({ name, id, image, colorScheme, power, winner }: CharModal) => {
                  if(winner === true) {
                    draw = {name, id}
                  }
                  return (
                    <div key={id * (Math.random() * 100)} className={style.details}>
                      <div>
                        <CardMedia className={style.image}
                          component="img"
                          alt="green iguana"
                          height="100"
                          image={image}/>
                        <h1 className={style.name}>{ name }</h1>
                      </div>
                      <ul id="unstyled-modal-title" className={style.modalTitle}>
                        <li>Combate: <span style={{ color: colorScheme!.combat}}>{ power.combat}</span> </li>
                        <li>Durabilidade: <span style={{ color: colorScheme!.durability}}>{ power.durability}</span> </li>
                        <li>Inteligência: <span style={{ color: colorScheme!.intelligence}}> { power.intelligence}</span></li>
                        <li>Poder: <span style={{ color: colorScheme!.power}}>{ power.power}</span> </li>
                        <li>Velocidade: <span style={{ color: colorScheme!.speed}}>{ power.speed}</span> </li>
                        <li>Força: <span style={{ color: colorScheme!.strength}}>{power.strength}</span> </li>
                      </ul>
                    </div>
                )})}
              </div>
                {winner?.name != "" ? 
                  (<h1 key={winner?.id} className={style.winner} id="unstyled-modal-description">
                    O vencedor é: <span>{winner?.name}</span></h1> 
                  ) : (<h1 key={winner?.id} className={style.draw} id="unstyled-modal-description">
                  O resultado é: <span>Empate</span></h1> 
                  ) }
              <Button 
                onClick={closeModal} 
                color="error" variant="contained">Criar outro combate
              </Button>
            </ModalContent>
        </Modal>
      </div>
    </>
  )
}
