import './WaitingScreen.css'
import WaitingScreenPlayer from "../waitingScreenPlayer/WaitingScreenPlayer"
import WaitingScreenButton from "../waitingScreenButton/WaitingScreenButton"
import Chat from "../chat/Chat"

export default function WaitingScreen(props){
    return (
        <div className='waiting-container' id={"waiting-container-"+props.theme}>
            <div className='waiting-container-players' id={"waiting-container-players-"+props.theme}>
                <p className="number-of-players">6/8</p>
                <WaitingScreenPlayer theme={props.theme} foto={"llama"}/>
                <hr className="line"/>
                <WaitingScreenPlayer theme={props.theme} foto={"rabbit2"}/>
                <hr className="line"/>
                <WaitingScreenPlayer theme={props.theme} foto={"penguin"}/>
                <hr className="line"/>
                <WaitingScreenPlayer theme={props.theme} foto={"owl"}/>
                <hr className="line"/>
                <WaitingScreenPlayer theme={props.theme} foto={"dog1"}/>
                <hr className="line"/>
                <WaitingScreenPlayer theme={props.theme} foto={"cat2"}/>
                <hr className="line"/>
                <WaitingScreenPlayer theme={props.theme} foto={"deer1"}/>
                <hr className="line"/>
                <WaitingScreenPlayer theme={props.theme} foto={"deer1"}/>
            </div>
            <div className='waiting-container-right'>
                <div className='waiting-container-options' id={"waiting-container-options-"+props.theme}>

                    <WaitingScreenButton theme={props.theme}  conteudo={"EDITAR"} img='user'/>
                    <WaitingScreenButton theme={props.theme}  conteudo={"JOGAR"} img='play'/>

                </div>
                
                <div className='waiting-container-chat' id = {'waiting-container-chat-'+props.theme}>
                    <Chat theme = {props.theme} />
                </div>
            </div>
            
        </div>
    )
}