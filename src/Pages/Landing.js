import react from "react";
import axios from "axios";
import $ from "jquery";

import "../Stylesheet/global.css"
import "../Stylesheet/extras/text.css"
import "../Stylesheet/pages/pages.landing.css"

export default function Landing() {

     function LoadRooms() {
          axios.get("https://zeditruco.herokuapp.com/partidas/list")
          .then(resp => {
               console.log(resp.data)

               document.getElementById("matchListDiv").hidden = false;
               document.getElementById("matchListDiv").style.opacity = "100%";

               var partidas = resp.data

               partidas.forEach(partida => {
                    $("#matchList").append(` <li> <a href="/jogar/${partida.id}"> ${partida.nome} </a> </li> `)
               })
          })
     }

     return (
          <div className="main">
               <div className="centered" style={{marginTop:"150px", marginBottom:"200px"}}>
                         <div class="perspective-text">
                              <div class="perspective-line">
                                   <p></p>
                                   <p>Simulador</p>
                              </div>
                              <div class="perspective-line">
                                   <p>Simulador</p>
                                   <p>De truco</p>
                              </div>
                              <div class="perspective-line">
                                   <p>De truco</p>
                                   <p>Oficial do ZDN</p>
                              </div>
                              <div class="perspective-line">
                                   <p>Oficial do ZDN</p>
                                   <p>Por Igor Duca</p>
                              </div>
                              <div class="perspective-line">
                                   <p>Por Igor Duca</p>
                              <p></p>
                         </div>
                    </div>
               </div>

               <div className="centered">
                    <div className="container">
                         <h1>Aplicativo original Zé di Nena - Feito em 2021 pelo integrante <a class="highlight" href="https://www.instagram.com/igor_ducca"><span>Igor Duca</span></a></h1>
                    </div>
               </div>

               <hr/>

               <div className="centered"> 
                    <h1>Procurar partidas</h1>
               </div>

               <div className="centered"> 
                    <div className="matchSearchDiv" id="matchSearchDiv">
                         <div className="centered">
                              <button>Entrar por link</button>
                         </div>

                         <div className="centered" style={{marginTop:"20px"}}>
                              <button type="button" onClick={LoadRooms}>Procurar sala</button>
                         </div>

                         <div className="centered">
                              <div className="matchListDiv" id="matchListDiv" style={{opacity:"0%"}} hidden>
                                   <ul id="matchList" />
                              </div>
                         </div>
                    </div>
               </div>

               <hr style={{marginTop:"20px"}}/>

               <div className="centered"> 
                    <h1>Criar partida</h1>
               </div>

               <div className="centered"> 
                    <div className="matchCreateDiv">
                         <div className="centered">
                              <button>Criar nova sala</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}