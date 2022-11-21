// Start loading template of page1 (game rules + choosing emote hand)
    let header= document.getElementsByClassName("header")[0];
    let template1 = document.getElementById("choose-hand-emote");
    let content1=  template1.content.cloneNode(true);
    header.after(content1)
// End loading template of page1 (game rules + choosing emote hand)
    
// Start loading rules button template 
    let buttonRulesTemplate = document.querySelector("#button-template")
    let buttonRulesTemplate__content= buttonRulesTemplate.content.cloneNode(true);
    let nextElement = document.querySelector(".header").nextElementSibling;
    nextElement.after(buttonRulesTemplate__content)
// End loading rules button template 

// Start opening the rules guide
    let rulesButton = document.querySelector(".rules-button");
    let gameRulesPage = document.querySelector(".game-rules");
    function openRules() {
        gameRulesPage.style.display="block";
    }/* the function is called in HTML element */ 
// End opening the rules guide 

// Start Closing the rules guide 
    let closeButton = document.querySelector(".game-rules-card__close");
    let closeButton_mobileVersion = document.querySelector(".game-rules-card__close[aria-hidden]");
    let outOfCardBlock = document.querySelector(".game-rules--mask");

    outOfCardBlock.addEventListener("click",()=>{
        gameRulesPage.style.display="none";
    })
    closeButton.addEventListener("click",()=>{
        gameRulesPage.style.display="none";
    })
    closeButton_mobileVersion.addEventListener("click",()=>{
        gameRulesPage.style.display="none";
    })
// End Closing the rules guide

// Start show the score number 
    let scoreNumberElement = document.querySelector(".score-box__number");
    let scoreNumberElement_content=scoreNumberElement.textContent;
    if(sessionStorage.scoreNumber){
        scoreNumberElement.textContent= sessionStorage.scoreNumber;
    }else{
        scoreNumberElement.textContent=0;
        sessionStorage.scoreNumber = +scoreNumberElement_content;
    }
// End show the score number 

// Start results game page
    let pattern = document.querySelectorAll(".pattern")
    pattern.forEach((hand_emote)=>{
        hand_emote.addEventListener("click",function(){
            /* removing the template of id="choose-hand-emote" */
            removeOldTemplate("main1")
            removeOldTemplate("rules-button")

            // Start loading template of id="show-both-choices"
                let header= document.getElementsByClassName("header")[0];
                let template2 = document.getElementById("show-both-choices");
                let content2=  template2.content.cloneNode(true);
                header.after(content2)
                /* add rules button in the second page */
                document.querySelector(".main2").appendChild(buttonRulesTemplate.content.cloneNode(true))
            // End loading template of id="show-both-choices"
            
            // Start showing what the user choose
                /*removing shadow emote*/
                removeShadowEmote(".user-choice > div");
                // start replacing shadow_emote with the user choice
                    document.querySelector(".pattern").style.cssText="\
                    width: 9rem;\
                    height: 9rem;";
                    let user_emote = hand_emote.classList.item("0")
                    replacingShadowEmote(".user-choice",user_emote)
                // start replacing shadow_emote with the user choice
            // End showing what the user choose

            // Start choose random emote for computer 
                let random = Math.floor((Math.random()*5)+1)//this random variable represnt the key name of the randomChoice object
                randomChoice={
                    1:{
                        className:"scissors"
                    },
                    2 :{
                        className:"paper"
                    },
                    3 :{
                        className:"rock"
                    },
                    4 :{
                        className:"lizard"
                    },
                    5 :{
                        className:"spock"
                    }
                }
            // End choose random emote for computer 

            // Start showing what the computer choose
                /*remove the old shadow emote*/
                removeShadowEmote(".computer-choice > div")
                /*replace the old shadow emote with the computer choice*/
                let computerChoiceClassName=randomChoice[random]["className"];
                replacingShadowEmote(".computer-choice",computerChoiceClassName)
            // End showing what the computer choose
        
            // Start showing result game and "try again" button 
            let mediaQuery = window.matchMedia("(min-width: 50em)");
            let gameResultsTemplate = document.getElementById("game-result")
            let gameResultsTemplate__content = gameResultsTemplate.content.cloneNode(true);
            let userChoice = document.querySelector(".user-choice")
            if(mediaQuery.matches){
                userChoice.after(gameResultsTemplate__content);
            }else{
                document.querySelector(".main2__block-container").after(gameResultsTemplate__content)
            }
            let result = document.querySelector(".result");
            if(gameRules(user_emote,computerChoiceClassName)===true){result.textContent =  "YOU WIN"}
            else if(gameRules(user_emote,computerChoiceClassName)===false){result.textContent =  "YOU LOSE"}
            else{result.textContent =  "equality"};
            // End showing result game and "try again" button  
            // start update the score number 
                if(gameRules(user_emote,computerChoiceClassName)===true){
                    sessionStorage.scoreNumber = +sessionStorage.scoreNumber + 1;
                    scoreNumberElement.textContent= sessionStorage.scoreNumber;
                };
            // End update the score number
        })
    })
    // Start writing function for top script
        /*removing the old template content Function*/
            function removeOldTemplate(templateContentName){
                document.getElementsByClassName(templateContentName)[0].remove();
            }
        /*removing shadow emote Function*/ 
            function removeShadowEmote(x){
                let shadow_emote = document.querySelector(x);
                shadow_emote.remove();
            }
        /*replacing shadow emote with what user and computer choose Function*/
            let mediaQuery = window.matchMedia("(min-width: 50em)");
            function replacingShadowEmote(x,className){
                let element = document.createElement("div");
                element.classList.add(className)
                element.classList.add("pattern")
                    if(mediaQuery.matches){
                        element.style.cssText="\
                        width:  15rem;\
                        height: 15rem;\
                        border-width: 1.5rem;\
                        transform: none;\
                        -webkit-transoform: none;\
                        ";
                    }else{
                        element.style.cssText="\
                        width:  9rem;\
                        height: 9rem;\
                        border-width: 1rem;\
                        transform: none;\
                        -webkit-transoform: none;\
                        ";
                    }
                document.querySelector(x).appendChild(element)
            }
            /* the game rules (who win who)*/
            function gameRules(x,y){
                if (x==y){
                    return "equality";
                }
                switch(x){
                    case "scissors": return (y=="paper" || y=="lizard")? true: false;   break;          
                    case "paper": return (y=="rock" || y=="spock")? true: false;        break;
                    case "rock": return (y=="lizard" || y=="scissors")? true: false;    break;
                    case "lizard": return (y=="spock" || y=="paper")? true: false;      break;
                    case "spock": return (y=="scissors" || y=="rock")? true: false;     break;
                }
            }
    // End writing function for top
    
// End results game page
  