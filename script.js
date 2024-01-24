var Cards = document.querySelectorAll(".card");
var CardTexts = document.querySelectorAll(".card-text");
var CardBtns = document.querySelectorAll(".card-button");
var CardTextShow = document.querySelectorAll(".show-text");
var CardsImg = document.querySelectorAll(".card-img");

var Modal = document.getElementById("popup");
var BtnClose = document.getElementsByClassName("close")[0];
var ModalBigImage = document.querySelector("#modal-big-image");
var ModalWrapperImageSmall = document.getElementById("modal-wrapper-image-small");
var ModalText = document.querySelector("#modal-text");
var ModalHeader = document.querySelector("#modal-header");

function SplitText(text) {
    return text.split(/(?<=^(?:.{230})+)(?!$)/)[0];
}  

function AddClass(Card){
    Card.querySelector(".show-text").classList.add('show');
    Card.querySelector("img").classList.add('showImg');
    Card.querySelector(".card-button").classList.add('show');
    Card.classList.add('shadow');
}

function RemoveClass(Card){
    Card.querySelector(".show-text").classList.remove('show');
    Card.querySelector("img").classList.remove('showImg');
    Card.querySelector(".card-button").classList.remove('show');
    Card.classList.remove('shadow');
}

function OpenModal(input) {
    var Card = input.parentNode;
    AddClass(Card);
    Modal.style.display = "block"; 
} 

function CloseModal() {
    ModalText.textContent = " "
    Modal.style.display = "none"; 
    ModalBigImage.src = " ";
    while (ModalWrapperImageSmall.hasChildNodes()) {
        ModalWrapperImageSmall.removeChild(ModalWrapperImageSmall.lastChild);
      }
    CardTextShow.forEach(CardText => {
        CardText.classList.remove('show');
    });
    CardBtns.forEach(CardBtn => {
        CardBtn.classList.remove('show');
    });
    CardsImg.forEach(CardImg => {
        CardImg.classList.remove('showImg');
    });
} 

function ContentModal(input){
    var WrapperImage = input.parentNode.getElementsByClassName("wrapper-image")[0];
    var images = WrapperImage.querySelectorAll("img");
    for(var i in images){
        if(i==0){
            ModalBigImage.src = images[i].src;
        }else{
            if(images[i].tagName == 'IMG'){
                const img = document.createElement("img");
                img.src = images[i].src;
                ModalWrapperImageSmall.appendChild(img);
            }  
        }
    } 
    ModalText.textContent = input.parentNode.getElementsByClassName("card-text")[0].textContent;
    ModalHeader.textContent = input.parentNode.querySelector("h2").textContent;
}

function SliderImage(){
    var ImageSmalls = ModalWrapperImageSmall.querySelectorAll("img");
    var NumofSmallChild = ImageSmalls.length;
    if(NumofSmallChild > -1){
        ImageSmalls.forEach(ImageSmall => {
            ImageSmall.onclick = () => {
                ImgSrc = ImageSmall.src;
                ImageSmall.src = ModalBigImage.src
                ModalBigImage.src = ImgSrc
            }
        })
    }
}

Cards.forEach(Card => {
    Card.onmouseover = function(event) {
        AddClass(Card)
      };
    Card.onmouseout = function(event) {
        if(Modal.style.display != 'block') {
            RemoveClass(Card)
        }
      };
});

CardTexts.forEach(CardText => {
    var Text = CardText.textContent.trim();
    var CountText = Text.length;
    if(CountText => 230){
        CardText.previousElementSibling.innerText = SplitText(Text);
    }
});

CardBtns.forEach(CardBtn => {
    CardBtn.onclick = function() {  
        OpenModal(this);
        ContentModal(this);
        SliderImage();
    };  
});

window.onclick = function(event) {
    if (event.target == Modal) {
        CloseModal();
    }
}

BtnClose.onclick = function() {
    CloseModal();
}

