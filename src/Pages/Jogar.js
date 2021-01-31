import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { Helmet } from "react-helmet";

import "../Stylesheet/pages/pages.jogar.css"

export default function Jogar() {

     let { id } = useParams();

     const [ roomName, setName ] = useState("")
     const [ nick, setNick ] = useState("")
     const [ chatMessage, setMessage ] = useState("")

     function useQuery() {
          return new URLSearchParams(useLocation().search);
     
     }

     let query = useQuery();

     var Qnick = query.get("us")

     useEffect(() => {
          axios.get("https://zeditruco.herokuapp.com/partidas/list")
          .then(resp => {
               var partidas = resp.data

               partidas.forEach(partida => {
                    if(partida.id == id) {
                         setName(partida.nome)
                    }
               })
          })

          if(Qnick) {

               function yourFunction(){
                    axios.get("https://zeditruco.herokuapp.com/partidas/list")
                    .then(resp => {

                         var partidas = resp.data
          
                         partidas.forEach(partida => {
                              if(partida.id == id) {
                                   var chat = partida.chat

                                   chat.forEach(mensagem => {
                                        var markerDiv = document.createElement("li");
                                        markerDiv.innerHTML = `<li id='MyCoolDiv'> <h3>${mensagem.autor}:</h3> <p id='messageBaloon'>${mensagem.mensagem}</p> </div>`;
                                        document.getElementById("chatList").appendChild(markerDiv.firstChild);
                         
                                        setTimeout(function(){ 
                                        var myCoolDiv = document.getElementById("MyCoolDiv");
                                             document.getElementById("chatList").removeChild(myCoolDiv);
                                        }, 5000);
                                   })
                              }
                         })

                         console.log("recarregando mensagens")
                    })
                    setTimeout(yourFunction, 5000);
               }
                
               yourFunction();
          }
     }, [])

     function nickSubmit(event) {
          event.preventDefault()

          window.location.href=`/jogar/${id}?us=${nick}`
     }

     function functionChatMessageSend(event) {
          event.preventDefault();

          axios.post("https://zeditruco.herokuapp.com/mensagens/postar", {
               "id":id,
               "autor":Qnick,
               "mensagem":chatMessage
          })
          .then(resp => {
               console.log("Mensagem enviada com sucesso!")

               setMessage("")
          })
     }

     if(!Qnick) {
          return (
               <body>
                    <div className="centered">
                    <Helmet>
                         <link rel="stylesheet" href="../Stylesheet/pages/pages.jogar.css" />
                         <title>{roomName}</title>
                    </Helmet>

                    <div className="centered" style={{position:"absolute"}}>
                         <div className="content">
                              <div className="centered">
                                   <h1 style={{fontSize:"48px"}}>{roomName}</h1>
                              </div>
               
                              <hr style={{marginTop:"20px"}}/>

                              <div className="centered"> 
                                   <h1>Escolha seu nome para jogar</h1>
                              </div>

                              <div className="centered">
                                   <form onSubmit={nickSubmit}>
                                        <input className="nickNameInput" onChange={(key) => { setNick(key.target.value) }} value={nick} />
                                   </form>
                              </div>

                              <div className="centered" style={{marginTop:"20px"}}>
                                   <img src="https://media.giphy.com/media/3ov9jUCYetT3GVwcy4/giphy.gif" style={{borderRadius:"50%"}}/>     
                              </div> 
                         </div>
                    </div> 
               </div> 
               </body>
          )
     }
     else {
          return (
               <div>
                    <div className="centered" style={{maxWitdh:"500px"}}>
                         <h1 style={{fontSize:"48px"}}>{Qnick}, espere o host iniciar a partida</h1>
                    </div>

                    <div className="centered">
                         <div className="container">
                              <h1>Enquanto isso você pode conversar com os outros jogadores pelo <a className="highlight" style={{cursor:"pointer"}}  onClick={() => { document.getElementById("chatList").scrollIntoView() }}><span>chat</span></a></h1>
                         </div>
                    </div>

                    <div className="centered">
                         <div className="chatHolder">
                              <div className="centered">
                                   <h1>Chat da partida</h1>
                              </div>

                              <ul id="chatList" />

                              <div className="centered">
                                   <form onSubmit={functionChatMessageSend}>
                                        <input id="chatMessageInput" onChange={(key) => { setMessage(key.target.value) }} value={chatMessage} />
                                   </form>
                              </div>
                         </div>     
                    </div> 
               </div>
          )
     }
}