(function(){
    let header= document.getElementsByClassName("header")[0];
    let template1 = document.getElementById("choose-emote-hand");
    let content1=  template1.content.cloneNode(true);
    header.after(content1)
}());
// Start Closing the rules guide 
let close_button = document.querySelector(".game-rules_card_close");
let close_button_mobile_version = document.querySelector(".game-rules_card_close[aria-hidden]");
let out_of_the_card = document.querySelector(".game-rules-mask");
let game_rules_page = document.querySelector(".game-rules");

out_of_the_card.addEventListener("click",()=>{
    game_rules_page.style.display="none";
})
close_button.addEventListener("click",()=>{
    game_rules_page.style.display="none";
})
close_button_mobile_version.addEventListener("click",()=>{
    game_rules_page.style.display="none";
})
// End Closing the rules guide

// Start opening the rules guide
let rules_button = document.querySelector(".rules-button");

rules_button.addEventListener("click",()=> {
    game_rules_page.style.display="block";
})
// End opening the ruels guide 